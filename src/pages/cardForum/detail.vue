
<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-12 16:06:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-04 10:48:35
 * @FilePath: \jichao_app_2\src\pages\cardForum\detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="navBar">
            <view :style="{ paddingTop: app.statusBarHeight + 'px', }"></view>
            <view class="nav">
                <view class="back" @click="goBack">
                    <image src="@/static/index/v3/icon_back.png"></image>
                </view>
                <view @click="goPersonHome" style="display:flex">
                    <image
                        :src="forumDetail.avatar ? $parsePic(forumDetail.avatar) : (isColumn ? '/static/userinfo/logo.png' : app.defaultAvatar)"
                        class="topAvatar">
                    </image>
                    </image>
                    <view class="topName u-line-1">{{ forumDetail.userName || "获取中" }}</view>
                </view>
                <view class="flex1"></view>
                <view class="follow flexCenter" v-if="!isPerson && !isColumn" :class="{ follow_dis: isFollow }"
                    @click="onClickFollow">{{
                        isFollow ? '已关注'
                        : '关注' }}</view>
                <view @click="actionSheetShow = true" v-if="isPerson" style="margin-right: 20rpx;">
                    <u-icon size="46rpx" color="#464646" name="more-dot-fill"></u-icon>
                </view>
                <image src="/static/goods/v2/icon_share.png" style="width:38rpx;height:38rpx" @click="operationShow = true">
                </image>
            </view>
        </view>
        <view style="height:88rpx" :style="{ paddingTop: app.statusBarHeight + 'px', }"></view>

        <albumSwiper v-if="isAlbum" :forumDetail="forumDetail" :code="code" :swiperCurrent.sync="swiperCurrent" />
        <view class="swiper" v-if="!isColumn && !isAlbum">
            <!-- @click="onClickSwiper -->
            <u-swiper imgMode="aspectFit" @click="onClickSwiper" :current="swiperCurrent" :indicator="false" bgColor="#fff"
                :height="picHeight || 400" :interval="3000" radius="1rpx" :list="pics" @change="swiperChange"></u-swiper>
        </view>
        <view class="dotContainer" v-if="pics.length > 1 && !isAlbum" :style="{ width: dotContainerWidth + 'px' }">
            <view class="indicatorScroll" :style="{ left: scrollLeft + 'px' }">
                <view :id="`dot${index}`" class="dot" v-for="(item, index) in pics.length" :key="index">
                    <image v-if="index === swiperCurrent" style="width:16rpx;height:13rpx"
                        src="@/static/cardForum/dot_red.png">
                    </image>
                    <image v-else style="width:16rpx;height:13rpx" src="@/static/cardForum/dot.png"></image>
                </view>
            </view>
        </view>

        <view class="contentContainer">
            <view class="title">{{ forumDetail.title }}</view>
            <view class="desc" v-if="forumDetail.content && !isColumn" v-html="forumDetail.content">
            </view>
            <template v-if="isColumn">
                <view v-for="(content, index) in contentArr" :key="index">
                    <rich-text class="desc ql-editor ql-container" style="width: 100%;min-height: 0;" :nodes="content"
                        @itemclick="articlePreviewImage" />
                    <view class="videoContainer" @click="onClickVideoPlay(videoArr[index])" v-if="videoArr[index] !== null">
                        <image class="desc-video" mode="aspectFill"
                            :src="`${videoArr[index]}?x-oss-process=video/snapshot,t_0,f_jpg`"></image>
                        <image src="/static/live/play.png" class="playIcon" mode="widthFix"></image>
                    </view>
                </view>
            </template>
            <view class="topicsContainer"
                v-if="(forumDetail.topic && forumDetail.topic.length) || (forumDetail.merAt && forumDetail.merAt.length)">
                <text v-for="(item, index) in forumDetail.topic" :key="index"
                    @click.stop="pageJump(`/pages/cardForum/topics/detailPage?id=${item.topicId}`)">{{ item.topicName
                    }}</text>
                <text v-for="(item, index) in (forumDetail.merAt || [])" :key="index"
                    @click.stop="pageJump(`/pages/merchant/core?alias=${item.alias}`)">@{{ item.merName
                    }}</text>
            </view>
            <view class="haowuGoodsWrap" v-if="forumDetail.good && forumDetail.good.goodCode"
                @click="app.navigateTo.goGoodsDetails(forumDetail.good.goodCode)">
                <view class="goodsItem flexCenter">
                    <image class="pic" mode="aspectFill" :src="$parsePic(forumDetail.good.cover)">
                    </image>
                    <view class="goodsInfo u-line-2">{{ forumDetail.good.title }}</view>
                </view>
            </view>
            <view class="time">编辑于 {{ $u.timeFormat(forumDetail.created_at, 'yyyy-mm-dd hh:MM') }} {{ forumDetail.location ||
                "未知" }}</view>
            <view class="line"></view>
            <view class="voteContainer" v-if="forumDetail.vote && forumDetail.vote.voteTitle">
                <view class="voteTitle">投票：{{ forumDetail.vote.voteTitle }}</view>
                <view class="voteOption" v-for="(item, index) in forumDetail.vote.options" :key="index"
                    @click="onClickVote(item)">
                    <view class="voteGray" :style="{ width: (item.poll / voteTotal) * 100 + '%' }"
                        :class="{ voteGray_select: forumDetail.vote.myOption === item.optionId }"></view>
                    <view class="voteFont" :class="{ voteFont_select: forumDetail.vote.myOption === item.optionId }">{{
                        item.content }}
                    </view>
                    <view class="voteNum" v-if="forumDetail.vote.myOption"
                        :class="{ voteFont_select: forumDetail.vote.myOption === item.optionId }">{{ item.poll }}
                    </view>
                </view>
            </view>
        </view>
        <view class="commentContainer">
            <view class="comTop">
                <view class="commentNum">{{ forumDetail.commentNum || 0 }}条评论</view>
                <!-- <view class="tips">*请勿在评论区泄露您的个人信息以及交易信息</view> -->
            </view>
            <view class="comWrap" v-for="(item, index) in commList" :key="index"
                @touchstart="touchAction($event, item, {}, index, false)"
                @touchend="touchAction($event, item, {}, index, false)">
                <view class=" comBlock" :id="`commId_${item.id}`" :class="{
                    heightLight_an: queryParams.noteCommentId && item.id == queryParams.noteCommentId && isScrollEnd,
                    hold: onClickTap && touchId == item.id
                }">
                    <muqian-lazyLoad class="avatar" :src="item.avatar ? $parsePic(item.avatar) : app.defaultAvatar"
                        borderRadius="50%" @click="app.navigateTo.goPersonHome(item.userId)"/>
                    <view class="rightWrap">
                        <view class="msgInfo">
                            <view class="top">
                                <view class="name u-line-1" @click="app.navigateTo.goPersonHome(item.userId)">{{ item.userName }}</view>
                                <medalIcon v-if="item.medal" :src="item.medal.pic" :userId="item.userId"/>
                            </view>
                            <view class="contentMsg">{{ item.content }}</view>
                            <view class="timeInfo" @click.stop="onClickCom(item, null)">
                                {{ getDateDiff(item.created_at * 1000) }} {{ item.location || "未知" }} <text
                                    class="huifuText">回复</text>
                                <view style="display: flex;align-items: center;"
                                    @click.stop="$u.throttle(() => { onClickCommLike(item) }, 500)">
                                    <view class="dz" :class="{ dzs: item.isLiked }"></view>
                                    <view class="num">{{ formatNumber(item.likeNum, 2, "en") }}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view :id="`commId_${son.id}`" class="comBlock comBlock_son" v-for="(son, sonIndex) in item.lower"
                    :key="sonIndex" @touchstart.stop="touchAction($event, son, item, sonIndex, true)"
                    @touchend.stop="touchAction($event, son, item, sonIndex, true)" @click.stop="onClickCom(item, son)"
                    :class="{
                        heightLight_an: queryParams.noteCommentId && son.id == queryParams.noteCommentId && isScrollEnd,
                        hold: onClickTap && touchId == son.id
                    }">
                    <muqian-lazyLoad class="avatar" :src="son.avatar ? $parsePic(son.avatar) : app.defaultAvatar"
                        borderRadius="50%" @click="app.navigateTo.goPersonHome(son.userId)"/>
                    <view class="rightWrap">
                        <view class="msgInfo">
                            <view class="top">
                                <view class="name u-line-1" @click="app.navigateTo.goPersonHome(son.userId)">{{ son.userName }}</view>
                                <medalIcon v-if="son.medal" :src="son.medal.pic" :userId="son.userId"/>
                                <!-- <view class="time">{{ getDateDiff(son.created_at * 1000) }}</view> -->

                            </view>
                            <view class="contentMsg" style="font-size: 27rpx;">
                                <template v-if="son.replyUserName">
                                    回复
                                    <text class="replyName" style="color:#959695">{{ son.replyUserName }}</text>
                                </template>
                                {{ son.content }}
                            </view>
                            <view class="timeInfo">
                                {{ getDateDiff(son.created_at * 1000) }} {{ item.location || "未知" }} <text
                                    class="huifuText">回复</text>
                                <view style="display: flex;align-items: center;"
                                    @click.stop="$u.throttle(() => { onClickCommLike(son) }, 500)">
                                    <view class="dz" :class="{ dzs: son.isLiked }"></view>
                                    <view class="num">{{ formatNumber(son.likeNum, 2, "en") }}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="loadMore" v-if="item.remainNum && item.remainNum > 0">
                    <view class="wrap" v-if="!item.loading" @click="onClickLoadMore(item)">
                        <template v-if="item.queryParams.fetchFrom == -9">
                            展开{{ item.remainNum }}条评论
                            <image style="width:16rpx;height:11rpx;margin-left:8rpx"
                                src="@/static/information/icon_down.png" />
                        </template>
                        <template v-else>
                            展开更多
                            <image style="width:16rpx;height:11rpx;margin-left:8rpx"
                                src="@/static/information/icon_down.png" />
                        </template>
                    </view>
                    <u-loading-icon mode="circle" color="#ff013d" style="position: relative;right:60rpx"
                        v-if="item.loading"></u-loading-icon>
                </view>
            </view>
        </view>
        <forumEmpty @onClickButton="onClickFakerInput" v-if="!commList.length"></forumEmpty>
        <u-loadmore lineLength="20rpx" style="margin-top: 20rpx;" fontSize="24rpx" v-if="commList && commList.length"
            :status="isFetchEnd ? 'nomore' : 'loading'" line />
        <view class="fixInputContainer">
            <view class="wrap">
                <view class="fakerInput u-line-1" @click="onClickFakerInput">{{ fakerInputVal }}</view>
                <view class="toolsWrap">
                    <view class="toolsItem" @click="onClickGift" style="position: relative;bottom: 4rpx;"
                        :style="{ opacity: isColumn ? 0 : 1 }">
                        <image src="@/static/cardForum/gift.png" style="width:37rpx;height:40rpx;transform: scale(1.15);" />
                        <view class="num" style="position: relative;top: 8rpx;font-size: 21rpx;">打赏</view>
                    </view>
                    <view class="toolsItem" @click="$u.throttle(() => { onClickLike() }, 500)">
                        <image v-if="!isLike" src="@/static/cardForum/detail_dz.png" style="width:41rpx;height:34rpx" />
                        <image v-else src="@/static/cardForum/detail_dz_s.png" style="width:41rpx;height:34rpx" />
                        <view class="num">{{ formatNumber(forumDetail.likeNum || 0, 2, "en") }}</view>
                    </view>
                    <view class="toolsItem" @click="onClickFakerInput">
                        <image src="@/static/cardForum/comm.png" style="width:37rpx;height:35rpx" />
                        <view class="num">{{ formatNumber(forumDetail.commentNum || 0, 2, "en") }}</view>
                    </view>
                    <view class="toolsItem" @click="$u.throttle(() => { onClickCollect() }, 500)">
                        <image v-if="!isCollection" src="@/static/cardForum/sc.png" style="width:39rpx;height:36rpx" />
                        <image v-else src="@/static/cardForum/sc_s.png" style="width:39rpx;height:36rpx" />
                        <view class="num">{{ formatNumber(forumDetail.collectNum || 0, 2, "en") }}</view>
                    </view>
                </view>
            </view>
            <view class="bottomSafeArea"></view>
        </view>
        <view class="safeBottom"></view>
        <u-overlay :zIndex="1000" :opacity="0.4" :show="focus && keyBoardHeigh > 0" @click="inputHide"></u-overlay>
        <view class="trueFixInput" :class="{ pointerAuto: keyBoardHeigh > 0 }"
            :style="{ bottom: 0, transform: `translateY(-${keyBoardHeigh}px)`, opacity: keyBoardHeigh > 0 ? 1 : 0 }">
            <textarea confirm-type="send" class="input" type="text" :placeholder="inputPlaceholder" :adjust-position="false"
                :focus="focus" :auto-height="true" :maxlength="-1" :auto-blur="true"
                @keyboardheightchange="keyBoardHeightChange" v-model="sayContent" @confirm="$u.throttle(sendCom, 1000)" />
            <view class="send flexCenter" @click.stop="$u.throttle(sendCom, 1000)">发送</view>
        </view>
        <reward-pop :code="code" :userInfo="authorInfo" :show.sync="rewardShow"></reward-pop>
        <recGift :code="code" :show.sync="recGiftShow"></recGift>
        <share
            @report="pageJump(`/pages/cardForum/report?code=${code}&byInformer=${forumDetail.userId}&source=${forumDetail.tp == 3 ? 1 : 2}`)"
            :shareData="shareData" :report="true" :operationShow.sync="operationShow" @shareSuccess="shareSuccess"></share>
        <u-action-sheet :actions="PersonSheet" :show="actionSheetShow" cancelText="取消" :closeOnClickAction="true"
            @close="actionSheetShow = false" @select="onSelectActionSheet"></u-action-sheet>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { formatNumber, getDateDiff } from "@/tools/util"
import rewardPop from "./components/rewardPop.vue"
import CardForum from "./interface/public";
import { UserStreamline } from "@/manager/userManager"
import { followActionByUser, getForumDetail, ossStitching } from "./func/index"
//@ts-ignore
import { ArticleTpMap, BitMap } from "./func/data.js"
import { comment_reason_tp } from "@/tools/DataExchange"
import recGift from "./components/recGift.vue"
import albumSwiper from "./components/album/albumSwiper.vue"
import forumEmpty from "./components/empty.vue"
const WIDTH = app.platform.systemInfo.screenWidth
interface Sheet {
    name: string;
    subname?: string;
    color?: string;
    behavior?: string;
}
const PersonSheet: Array<Sheet> = [
    { name: "设为可见/设为私密", behavior: "setPrivate" },
    { name: "编辑内容", behavior: "goEdit" },
    { name: "删除此动态", behavior: "deleteForum", color: "#fb374e" }
]
const queryParams: CardForum.QueryByFetch = {
    fetchFrom: 1,
    fetchSize: 10
}
const dotWidth = uni.upx2px(24)
const MaxHeight = uni.upx2px(958)
@Component({
    components: {
        rewardPop,
        recGift,
        albumSwiper,
        forumEmpty
    }
})
export default class ClassName extends BaseNode {
    comment_reason_tp = comment_reason_tp
    app = app
    getDateDiff = getDateDiff
    shareData: any = {}
    keyBoardHeigh: number = -2
    code: string = ""
    sayContent: string = ""
    formatNumber = formatNumber
    forumDetail: CardForum.ForumDetail = {} as CardForum.ForumDetail
    authorInfo: CardForum.RewardUserInfo = {} as CardForum.RewardUserInfo
    pics: Array<string> = []
    queryParams: CardForum.QueryByFetch = queryParams
    commList: Array<CardForum.CommentFather> = []
    clickCom: CardForum.CommentFather = {} as CardForum.CommentFather
    clickSon: CardForum.Comment = {} as CardForum.Comment
    touchId: number = 0
    onClickTap: boolean = false
    isScrollEnd: boolean = false
    operationShow: boolean = false
    focus: boolean = false
    rewardShow: boolean = false
    actionSheetShow: boolean = false
    recGiftShow: boolean = false
    isFetchEnd: boolean = true
    tapTimer: number = 0
    lontapTimer: number = 0
    swiperCurrent: number = 0
    userInfo: UserStreamline = {} as UserStreamline
    PersonSheet = PersonSheet
    dotWidth: any = dotWidth
    dotContainerWidth: any = 0
    userBack: boolean = false
    private: boolean = false
    fromUserId: number = 0
    picHeight: number = 0
    videoArr: any = []
    contentArr: Array<string> = []
    onLoad(query: any) {
        delete this.queryParams.noteCommentId
        this.queryParams.fetchFrom = 1
        this.userBack = query.back == "true"
        this.private = query.private == "1"
        if (query.fromUserId) this.fromUserId = +query.fromUserId
        if (query.noteCommentId) this.queryParams.noteCommentId = +query.noteCommentId
        app.platform.hasLoginToken(async () => {
            this.code = query.code || "mockCode"
            this.reqNewData()

            uni.$on("editCardForum", this.onEditCardForum)
            this.userInfo = await app.user.getUserInfo()
        })
    }
    onPageScroll() {
        if (this.focus) this.inputHide()
        this.tapTimer && clearTimeout(this.tapTimer)
        this.lontapTimer && clearTimeout(this.lontapTimer)
    }
    beforeDestroy() {
        uni.$off("editCardForum", this.onEditCardForum)
    }
    onReachBottom() {
        if (this.isFetchEnd) return
        this.queryParams.fetchFrom += this.queryParams.fetchSize
        this.getCommByWorks()
    }
    public get isAlbum(): boolean {
        return this.forumDetail.tp == ArticleTpMap.Album
    }
    public get isColumn(): boolean {
        return this.forumDetail.tp == ArticleTpMap.Column
    }
    public get isPerson(): boolean {
        return (this.forumDetail.bit & BitMap.IS_PERSON) === BitMap.IS_PERSON
    }
    public get isFollow(): boolean {
        return (this.forumDetail.bit & BitMap.IS_FOLLOW) === BitMap.IS_FOLLOW
    }
    public get isLike(): boolean {
        return (this.forumDetail.bit & BitMap.IS_LIKE) === BitMap.IS_LIKE
    }
    public get isCollection(): boolean {
        return (this.forumDetail.bit & BitMap.IS_COLLECT) === BitMap.IS_COLLECT
    }
    public get inputPlaceholder() {
        if (this.clickCom.id) {
            return `回复 ${this.clickSon.userName || this.clickCom.userName}`
        }
        return "说点什么..."
    }
    public get fakerInputVal() {
        return this.sayContent || "说点什么..."
    }
    public get scrollLeft() {
        if (this.swiperCurrent <= 3) return 0
        if (this.swiperCurrent == this.pics.length - 1 && this.pics.length > 5) {
            return -(this.dotWidth * (this.swiperCurrent - 4))
        }
        if (this.swiperCurrent > 3 && this.pics.length > 5) return -(this.dotWidth * (this.swiperCurrent - 3))

    }
    public get voteTotal() {
        if (!this.forumDetail.vote.myOption) return 0
        let total = 0
        this.forumDetail.vote.options.forEach((item => {
            total += item.poll
        }))
        return total
    }
    keyBoardHeightChange(obj: any) {
        this.keyBoardHeigh = obj.detail.height
        if (obj.detail.height <= 0) this.inputHide()
    }
    inputHide() {
        this.clearClickCom()
        this.focus = false
        //#ifdef H5
        this.keyBoardHeigh = -2
        //#endif
    }
    onClickFakerInput() {
        this.clearClickCom()
        this.inputShow()
    }
    clearClickCom() {
        if (this.sayContent == "") {
            this.clickCom = {} as CardForum.CommentFather
            this.clickSon = {} as CardForum.Comment
        }
    }
    inputShow() {
        this.focus = true
        //#ifdef H5
        this.keyBoardHeigh = 340
        //#endif
    }
    sendCom() {
        if (this.sayContent === "") {
            uni.showToast({
                title: "表达你的态度再评论吧",
                icon: "none"
            })
            return
        }
        this.pushOrReply(this.clickSon.id || this.clickCom.id || 0, this.clickCom)
    }
    onClickCommLike(item: any) {
        app.http.Post(`cardCircle/comment/${item.isLiked ? "un/" : ""}like/${item.id}`, {}, () => {
            item.isLiked ? item.likeNum -= 1 : item.likeNum += 1
            item.isLiked = !item.isLiked
        })
    }
    onClickVote(item: any) {
        if (this.forumDetail.vote.myOption) return
        app.http.Post("cardCircle/user/vote/" + this.code, { optionId: item.optionId }, () => {
            this.forumDetail.vote.myOption = item.optionId
            item.poll += 1
        })

    }
    //发布评论或回复
    pushOrReply(id: number, item: CardForum.CommentFather) {
        const requestUrl = `cardCircle/comment/${id == 0 ? "issue" : "reply"}/${id || this.code}`
        app.http.Post(requestUrl, { content: this.sayContent }, async (res: any) => {
            const same = {
                id: res.commentId as number,
                userName: this.userInfo.userName || "小卡迷",
                avatar: this.userInfo.avatar || app.defaultAvatar,
                isLiked: false,
                likeNum: 0,
                created_at: Math.round(+new Date() / 1000),
                content: res.content,
                host: true,
                location: res.location as string,
                medal:res.medal || {pic:""},
                userId:await app.user.getAppDataUserId()
            }
            if (id == 0) {
                this.commList.unshift({
                    ...same,
                    lower: [],
                    loading: false,
                    queryParams: {
                        fetchFrom: -9,
                        fetchSize: 10
                    },
                    host: true,
                    isFetchEnd: true,
                })
            } else {
                item.lower.push({
                    ...same,
                    replyUserName: id == item.id ? "" : this.clickSon.userName,
                })
                this.inputHide()
            }
            this.forumDetail.commentNum += 1
            this.sayContent = ""
            this.clickCom = {} as CardForum.CommentFather
            this.inputHide()
            uni.$emit("cardForumCommChange", { code:this.code,num: this.forumDetail.commentNum })
        })
    }
    goPersonHome() {
        if (this.isColumn) return
        if (this.userBack && this.fromUserId == this.authorInfo.userId) {
            app.platform.pageBack()
            return
        }
        uni.navigateTo({
            url: `/pages/cardForum/personHomePage?userId=${this.forumDetail.userId}&isMine=${this.isPerson ? 1 : 0}`
        })
    }
    onClickCom(item: CardForum.CommentFather, son: CardForum.Comment | null) {
        if (this.onClickTap || this.touchId) return
        this.focus = true
        if (!item.id) return
        if (son && (item.id != this.clickCom.id || son.id != this.clickSon.id)) {
            this.sayContent = ""
        }
        this.clickCom = item
        this.clickSon = son ?? {} as CardForum.Comment
        this.inputShow()
    }
    touchAction(event: any, item: any, fatherItem: any, index: number, isSon: boolean) {
        if (item.id != this.touchId && this.touchId != 0) return
        this.tapTimer && clearTimeout(this.tapTimer)
        if (event.type == 'touchend') {
            this.lontapTimer && clearTimeout(this.lontapTimer)
            this.touchId = 0
            this.onClickTap = false
            return
        }
        if (event.type == "touchstart") {
            this.lontapTimer && clearTimeout(this.lontapTimer)
            this.lontapTimer = setTimeout(() => {
                this.longtapCom(item, fatherItem, index, isSon)
            }, 700)
            this.tapTimer = setTimeout(() => {
                this.onClickTap = true
                this.touchId = item.id
                return
            }, 200)
        }

    }
    longtapCom(item: any, fatherItem: any, index: number, isSon: boolean) {
        this.touchId = item.id
        let buttons: any = [
            {
                title: "举报"
            }
        ]
        if (item.host || this.isPerson) buttons.push({ title: '删除' })
        //#ifdef APP-PLUS
        app.platform.UIClickFeedBack()
        plus.nativeUI.actionSheet(
            {
                cancel: "取消",
                buttons,
            },
            (e: any) => {
                this.touchId = 0
                this.onClickTap = false
                if (e.index == 0) return
                const title: string = buttons[e.index - 1].title
                if (title == "举报") {
                    this.pickUpActionSheet(item)
                } else if (title == "删除") {
                    this.delCom(item, fatherItem, index, isSon)
                }
            }
        );
        //#endif
        //#ifdef H5
        if (item.host || this.isPerson) this.delCom(item, fatherItem, index, isSon)
        //#endif
    }
    pickUpActionSheet(item: any) {
        uni.navigateTo({
            url: `/pages/cardForum/report?source=${3}&dtCode=${this.code}&target=${item.id}&byInformer=${item.userId}`
        })
    }
    delCom(item: CardForum.CommentFather, fatherItem: CardForum.CommentFather, index: number, isSon: boolean) {
        uni.showModal({
            title: "提示",
            content: `是否删除"${item.content.length <= 15 ? item.content : item.content.slice(0, 15) + "..."}"评论?`,
            success: (res: any) => {
                if (res.confirm) {
                    app.http.Post("cardCircle/comment/delete/" + item.id, {}, () => {
                        if (isSon) {
                            fatherItem.lower.splice(index, 1)
                            this.forumDetail.commentNum -= 1
                        } else {
                            const delNum = 1 + (item.lower ? item.lower.length : 0) + (item.remainNum ?? 0)
                            this.forumDetail.commentNum -= delNum
                            this.commList.splice(index, 1)
                        }
                        uni.$emit("cardForumCommChange", { code:this.code,num: this.forumDetail.commentNum })
                    })
                }
            }
        })
    }
    onSelectActionSheet(item: Sheet) {
        if (item.behavior) {
            //@ts-ignore
            this[item.behavior] && this[item.behavior]()
            return
        }
    }
    onClickGift() {
        if (this.isColumn) return
        this.isPerson ? this.recGiftShow = true : this.rewardShow = true
    }
    goEdit() {
        this.pageJump("/pages/cardForum/release?code=" + this.code)
    }
    //删除作品
    deleteForum() {
        uni.showModal({
            title: "提示",
            content: "是否删除该作品?",
            success: (res: any) => {
                if (res.confirm) {
                    // app.http.Post("")
                    app.http.Post("cardCircle/delete/" + this.code, {}, () => {
                        uni.showToast({
                            title: "删除成功",
                            icon: "none"
                        })
                        uni.$emit("delCardForum", this.code)
                        app.platform.pageBack()
                    })
                }
            }
        })
    }
    //设置为私密
    setPrivate() {
        uni.showModal({
            title: "提示",
            content: `是否将作品设为${this.private ? "可见" : "私密"}`,
            success: (res: any) => {
                if (res.confirm) {
                    app.http.Post(`cardCircle/set/${this.private ? 'pub' : 'pri'}/${this.code}`, {}, () => {
                        this.private = !this.private
                        uni.showToast({
                            title: "操作成功",
                            icon: "none"
                        })
                        uni.$emit("setCardForumPrivate", { code: this.code, private: this.private })
                    })
                }
            }
        })
    }
    nonAction() {
        return
    }
    goBack() {
        app.platform.pageBack()
    }
    onClickLike() {
        app.http.Post(`cardCircle/${this.isLike ? 'un/' : ''}like/${this.code}`, {}, (res: any) => {
            if (this.isLike) this.forumDetail.likeNum -= 1
            if (!this.isLike) this.forumDetail.likeNum += 1
            this.forumDetail.bit ^= BitMap.IS_LIKE;
            uni.$emit("cardForumLike", { code: this.code, bit: this.forumDetail.bit, likeNum: this.forumDetail.likeNum })
        })
    }
    onClickCollect() {
        app.http.Post(`cardCircle/${this.isCollection ? 'un/' : ''}collect/${this.code}`, {}, (res: any) => {
            if (this.isCollection) this.forumDetail.collectNum -= 1
            if (!this.isCollection) this.forumDetail.collectNum += 1
            this.forumDetail.bit ^= BitMap.IS_COLLECT;
        })
    }
    onClickFollow() {
        followActionByUser(this.forumDetail.userId, this.isFollow).then(() => {
            this.forumDetail.bit ^= BitMap.IS_FOLLOW;
        })
    }
    onClickLoadMore(item: CardForum.CommentFather) {
        if (item.remainNum && item.remainNum <= 0) return
        item.loading = true
        item.queryParams.fetchFrom += 10
        let params = item.queryParams
        if (this.queryParams.noteCommentId) params.noteCommentId = this.queryParams.noteCommentId
        app.http.Get(`dataApi/cardCircle/comment/more/${item.id}`, params, (res: any) => {
            const list = (res.list || []).filter((lowerItem: any) => {
                const index = item.lower.findIndex((item: CardForum.Comment) => {
                    return item.id == lowerItem.id
                })
                return index < 0
            })
            item.lower.push(...list || [])
            item.remainNum = res.remainNum || 0
            item.loading = false
        })
    }
    pageJump(url: string) {
        uni.navigateTo({
            url,
        })
    }
    swiperChange(event: any) {
        this.swiperCurrent = event.current
    }
    onClickSwiper(index: number) {
        uni.previewImage({
            urls: this.pics,
            current: index
        })
    }
    getCommByWorks() {
        app.http.Get(`dataApi/cardCircle/comment/list/` + this.code, this.queryParams, (res: any) => {
            const list = (res.list as Array<CardForum.CommentFather> || []).filter((item: CardForum.CommentFather) => {
                if (item.remainNum) item.isFetchEnd = item.remainNum <= 0
                if (!item.remainNum) item.isFetchEnd = true
                item.loading = false
                item.queryParams = {
                    fetchFrom: -9,
                    fetchSize: 10
                }
                item.lower = item.lower || []
                const index = this.commList.findIndex((comm: CardForum.CommentFather) => {
                    return comm.id === item.id
                })
                return index < 0
            })
            this.isFetchEnd = res.isFetchEnd
            this.queryParams.fetchFrom == 1 ? this.commList = list : this.commList.push(...list)
            //跳转至评论
            if (this.queryParams.noteCommentId && !this.isScrollEnd) {
                this.$nextTick(() => {
                    this.scrollToAnyBlock()
                })
            }
        })
    }
    scrollToAnyBlock() {
        uni
            .createSelectorQuery()
            .select("#commId_" + this.queryParams.noteCommentId)
            .boundingClientRect((res) => {
                if (res && res.top) {
                    uni.pageScrollTo({
                        duration: 150,
                        scrollTop: res.top - app.statusBarHeight - 80,
                        complete: () => {
                            setTimeout(() => {
                                this.isScrollEnd = true
                            }, 200)
                        }
                    })
                }
            }).exec();
    }
    articlePreviewImage(e: any) {
        const item = e.detail.node;
        if (item.name == 'img') {
            uni.previewImage({
                urls: [item.attrs.src]
            });
        }
    }
    onClickVideoPlay(path: string) {
        uni.navigateTo({
            url: `/pages/cardForum/videoPlay?path=${encodeURIComponent(path)}&showDel=false`
        })
    }
    onEditCardForum(res: any) {
        if (res.code == this.code) {
            setTimeout(() => {
                this.reqNewData()
            }, 500)
        }
    }
    shareSuccess() {
        app.http.Post(`cardCircle/share/${this.code}`, {}, () => { })
    }
    replacePic(str: string) {
        return str.indexOf('#thumb') == -1 ? str : str.replace('#thumb', '.thumb')
    }
    reqNewData(cb?: any) {
        getForumDetail(this.code).then((res: any) => {
            if (res.data.content) res.data.content = decodeURIComponent(res.data.content)
            this.forumDetail = res.data as CardForum.ForumDetail || {}
            this.authorInfo = {
                userId: this.forumDetail.userId,
                userName: this.forumDetail.userName,
                avatar: this.forumDetail.avatar
            }
            if (res.data.tp === ArticleTpMap.Video) {
                uni.redirectTo({
                    url: `/pages/cardForum/video/index?code=${this.code}&fromMine=1`
                })
                return
            }

            let content = res.data.content;
            this.pics = res.data.url.split(",").filter(Boolean).map((url: string) => {
                //@ts-ignore
                return this.replacePic(this.$parsePic(url))
            })
            if (res.data.tp !== ArticleTpMap.Column) {
                this.pics.forEach((pic: string, index) => {
                    uni.getImageInfo({
                        src: ossStitching(pic, 'x-oss-process=image/resize,p_1'),
                        success: (res: any) => {
                            if (res.width < WIDTH) {
                                res.height = (WIDTH / res.width) * res.height
                                res.width = WIDTH
                            }
                            let widthFixHeight = (WIDTH / res.width) * res.height
                            if (widthFixHeight > MaxHeight) widthFixHeight = MaxHeight
                            if (widthFixHeight > this.picHeight) this.picHeight = widthFixHeight
                        }
                    })
                })
                this.dotContainerWidth = this.dotWidth * (this.pics.length > 5 ? 5 : this.pics.length)
            } else {
                const arr:any[] = content.split('</iframe>');
                const reg = /<iframe([\s\S]*)/g;
                for (let i in arr) {
                    const item = arr[i];
                    const urlMatch = item.match(/<iframe[\s\S]*src=\"(.*?)\"/);
                    if (urlMatch && urlMatch.length > 1) {
                        this.videoArr[i] = urlMatch[1];
                    } else {
                        this.videoArr[i] = null;
                    }
                    this.contentArr[i] = item.replace(reg, '');
                }
            }
            if (res.state == 2 && (res.data.bit & BitMap.IS_PERSON) == BitMap.IS_PERSON) {
                this.private = true
            }

            this.shareData = {
                shareUrl: `share/${app.localTest ? 'testH5' : 'h5'}/#/pages/cardForum/detail?code=${this.code}`,
                title: res.data.title,
                summary: res.data.tp == ArticleTpMap.Column ? "" : content ? (content.length > 20 ? content.substr(0, 20) + '...' : content) : "我发现了一篇精彩动态",
                //@ts-ignore
                thumb: ossStitching(this.pics[0], 'x-oss-process=image/resize,h_100,w_100')
            }
            this.getCommByWorks()
        }).catch((err: any) => {
            uni.showModal({
                title: "提示",
                content: err.msg || err,
                showCancel: false,
                success: (res: any) => {
                    if (res.confirm) app.platform.pageBack()
                }
            })
        })
    }

}
</script>

<style lang="scss">
.content {
    width: 750rpx;
    overflow-x: hidden;
}

.navBar {
    width: 750rpx;
    position: fixed;
    top: 0;
    z-index: 999;
    background-color: #fff;

    .nav {
        box-sizing: border-box;
        padding: 0 35rpx;
        display: flex;
        align-items: center;
        height: 88rpx;
    }

    .back {
        width: 64rpx;
        height: 55rpx;
        background-size: 100% 100%;
        // background-color: red;
        display: flex;
        align-items: center;

        image {
            width: 19rpx;
            height: 35rpx;
        }

        // background-image: url("@/static/act/portable/pageBack.png");
    }

    .topAvatar {
        width: 61rpx;
        height: 61rpx;
        border-radius: 50%;
        // margin-left: 50rpx;
        margin-right: 20rpx;
    }

    .topName {
        font-size: 27rpx;
        
        font-weight: 500;
        color: #333333;
        flex: 1;
        line-height: 61rpx;
    }
}

.swiper {
    width: 750rpx;
    // height: 946rpx;
}

.flex1 {
    flex: 1;
}

.follow {
    width: 120rpx;
    height: 48rpx;
    background: #FA1545;
    border-radius: 3rpx;
    font-size: 28rpx;
    margin-right: 34rpx;
    
    border-radius: 5rpx;
    font-weight: bold;
    color: #FFFFFF;
}

.follow_dis {
    color: #fff;
    background-color: #c9d0d7;
}

.videoContainer {
    position: relative;
    padding: 0;
    margin: 0;
    width: 100%;

    .playIcon {
        width: 70rpx;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
    }
}

.topicsContainer {
    width: 100%;
    box-sizing: border-box;
    margin-top: 16rpx;

    // padding: 0 20rpx;
    text {
        margin-right: 10rpx;
        font-size: 29rpx;
        
        font-weight: bold;
        color: #333333;
        line-height: 42rpx;
        color: #1E46A1;
    }
}

.haowuGoodsWrap {
    width: 100%;
    height: 103rpx;
    margin-top: 26rpx;

    .goodsItem {
        width: 401rpx;
        height: 97rpx;
        border: 1rpx solid rgba(149, 150, 149, .6);
        background-color: #ffffff;
        border-radius: 3px;
        box-sizing: border-box;
        padding: 10rpx;
        align-items: center;
        display: flex;

        .pic {
            width: 102rpx;
            height: 79rpx;
            // background: #FA1545;
            border-radius: 1rpx;
            margin-right: 12rpx;
        }

        .goodsInfo {
            font-size: 22rpx;
            
            font-weight: 500;
            color: #333333;
            line-height: 25rpx;
            flex: 1;
            // display: flex;
        }

    }
}

.voteContainer {
    margin-top: 33rpx;

    .voteTitle {
        font-size: 29rpx;
        
        font-weight: 400;
        color: #333333;
        line-height: 35rpx;
        margin-bottom: 26rpx;
    }

    .voteOption {
        width: 710rpx;
        height: 66rpx;
        background: #F5F5F5;
        border-radius: 3rpx;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 30rpx;
        position: relative;
        margin-bottom: 15rpx;
        overflow: hidden;

        .voteFont {
            font-size: 25rpx;
            
            font-weight: 400;
            color: #333333;
            flex: 1;
            z-index: 4;
        }

        .voteNum {
            font-size: 23rpx;
            
            font-weight: bold;
            color: #333333;
            z-index: 4;
        }

        .voteFont_select {
            color: #FA1545;
        }

        .voteNum_select {
            color: #FA1545;
        }

        .voteGray {
            z-index: 2;
            width: 0%;
            height: 66rpx;
            position: absolute;
            left: 0;
            top: 0;
            background-color: #E6E6E6;
            transition: width 0.6s;
        }

        .voteGray_select {
            background-color: #FFE8E8;
        }
    }
}

.contentContainer {
    width: 750rpx;
    box-sizing: border-box;
    padding: 0rpx 32rpx;

    .title {
        font-size: 34rpx;
        
        font-weight: bold;
        color: #333333;
        margin-bottom: 30rpx;
        margin-top: 25rpx;
        letter-spacing: 2rpx;
    }

    .desc {
        width: 100%;
        font-size: 31rpx;
        
        font-weight: 400;
        color: #333333;
        line-height: 50rpx;
        letter-spacing: 2rpx;
        text-align: left;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    .desc-video {
        width: 100%;
    }

    .time {
        font-size: 20rpx;
        
        font-weight: 400;
        color: #949494;
        margin-top: 40rpx;
        margin-bottom: 20rpx;
    }

    .line {
        width: 686rpx;
        height: 1rpx;
        background: #E8E8E8;
    }
}

.fixInputContainer {
    width: 750rpx;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1rpx solid #E8E8E8;
    background-color: #fff;
    z-index: 5;

    .wrap {
        height: 124rpx;
        width: inherit;
        box-sizing: border-box;
        padding: 0 44rpx;
        display: flex;
        align-items: center;

        .fakerInput {
            width: 305rpx;
            height: 67rpx;
            background: #F5F5F5;
            border-radius: 3rpx;
            box-sizing: border-box;
            padding: 0 30rpx;
            line-height: 67rpx;
            border-radius: 5rpx;
            // display: flex;
            // align-items: center;
            font-size: 25rpx;
            
            margin-right: 50rpx;
            font-weight: 400;
            overflow: hidden;
            color: #88878C;

        }

        .toolsWrap {
            display: flex;
            flex: 1;
            justify-content: space-between;
            align-items: center;
        }

        .toolsItem {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            height: 64rpx;

            .num {
                position: absolute;
                font-size: 23rpx;
                
                font-weight: bold;
                color: #333333;
                line-height: 30rpx;
                bottom: -5rpx;
                white-space: nowrap;
            }
        }
    }
}

.dotContainer {
    // background-color: rgba(0, 0, 0, .3);
    // width: 116rpx;
    margin-top: 27rpx;
    height: 13rpx;
    position: relative;
    overflow: hidden;
}

.indicatorScroll {
    // width: 114rpx;
    white-space: nowrap;

    // height: 16rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    left: 0;
    transition: left 0.3s;

    .dot {
        width: 24rpx;
        height: 13rpx;
        display: inline-block;
        position: relative;
        transition: transform 0.5s;

        image {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            margin: auto;
        }
    }

    .dot_big {
        transform: scale(1.3);
    }

    .dot_select {
        background-image: url("@/static/cardForum/dot_red.png");
    }

}

.safeBottom {
    width: 750rpx;
    height: 124rpx;
    opacity: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    pointer-events: none;
}

.commentContainer {
    width: 750rpx;
    // box-sizing: border-box;
    // padding: 0 43rpx;


}

.comTop {
    margin-top: 35rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30rpx;
    width: inherit;
    box-sizing: border-box;
    padding: 0 32rpx;
}

.commentNum {
    font-size: 29rpx;
    
    font-weight: bold;
    color: #333333;
    flex: 1;
}

.tips {
    font-size: 19rpx;
    
    font-weight: 400;
    color: #FA1545;
}

.comWrap {
    display: flex;
    flex-direction: column;
    width: inherit;

    .comBlock {
        display: flex;
        flex: 1;
        width: inherit;
        box-sizing: border-box;
        padding: 14rpx 43rpx;

        .avatar {
            width: 62rpx;
            height: 62rpx;
            border-radius: 50%;
            margin-right: 20rpx;
        }

        .rightWrap {
            flex: 1;

            .msgInfo {
                margin-top: 10rpx;

                .top {
                    display: flex;
                    align-items: center;

                    .name {
                        font-size: 27rpx;
                        
                        font-weight: 400;
                        color: #636363;

                    }

                    .time {
                        font-size: 25rpx;
                        
                        font-weight: 400;
                        color: #AAAAAA;
                        margin-left: 22rpx;
                        flex: 1;
                    }


                }

                .contentMsg {
                    font-size: 27rpx;
                    
                    font-weight: 400;
                    color: #333333;
                    margin-top: 20rpx;
                    line-height: 33rpx;
                    // margin-bottom: 23rpx;
                    display: flex;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    // white-space: pre-wrap;
                    word-break: break-all;

                    .replyName {
                        color: #636363;
                        margin: 0 8rpx;
                    }
                }

            }

            .line {
                width: 587rpx;
                height: 1rpx;
                background: #E8E8E8;
                margin-bottom: 48rpx;
                margin-top: 20rpx;
            }

            .loadMore {
                padding-left: 62rpx;

                width: auto;

                .wrap {
                    font-size: 21rpx;
                    
                    font-weight: bold;
                    color: #636363;
                    background: #EFEFEF;
                    border-radius: 3rpx;
                    height: 41rpx;
                    vertical-align: top;
                    display: inline-block;
                    line-height: 41rpx;
                    padding: 0 15rpx;
                }
            }
        }
    }

    // .comBlock:hover{
    //     background-color: rgba(203, 203, 203, .4);
    // }
    .comBlock_son {
        padding-left: 125rpx;

        .avatar {
            width: 44rpx;
            height: 44rpx;
        }
    }

    .hold {
        background-color: rgba(203, 203, 203, .4);
    }

    .heightLight {
        animation: linerBackColor 0.5s;

    }

    .heightLight_an {
        animation: linerBackColor linear 1.5s;
    }

    @keyframes linerBackColor {
        from {
            background-color: rgba(203, 203, 203, .4);
        }

        to {
            background-color: rgba(203, 203, 203, .0);
        }
    }

    .line {
        width: 587rpx;
        height: 1rpx;
        background: #E8E8E8;
        margin-bottom: 48rpx;
        margin-top: 20rpx;
        margin-left: 125rpx;
    }

    .loadMore {
        padding-left: 144rpx;
        margin-bottom: 15rpx;
        width: auto;
        margin-top: 23rpx;

        .wrap {
            font-size: 21rpx;
            
            font-weight: bold;
            color: #636363;
            background: #EFEFEF;
            border-radius: 3rpx;
            height: 41rpx;
            vertical-align: top;
            display: inline-block;
            line-height: 41rpx;
            padding: 0 15rpx;
        }
    }
}

.noMore {
    font-size: 21rpx;
    
    font-weight: 400;
    color: #D2D2D2;
    margin: 20rpx 0;
}

.trueFixInput {
    width: 750rpx;
    // height: 100rpx;
    box-sizing: border-box;
    padding: 20rpx 26rpx;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    transition: all 0.2s linear;
    display: flex;
    // align-items: center;
    align-items: flex-end;
    justify-content: space-between;
    pointer-events: none;
    z-index: 1001;
    border-radius: 10rpx 10rpx 0 0;

    .input {
        width: 570rpx;
        // height: 63rpx;
        background: #EFEFEF;
        border-radius: 3rpx;
        box-sizing: border-box;
        padding: 10rpx 30rpx;
        display: flex;
        align-items: center;
        font-size: 25rpx;
        
        font-weight: 400;
        color: #333333;
    }

    .send {
        width: 110rpx;
        height: 54rpx;
        color: #fff;
        font-size: 25rpx;
        
        font-weight: bold;
        border-radius: 3rpx;
        background-color: #FA1545;
    }
}

.pointerAuto {
    pointer-events: auto;
}

.timeInfo {
    font-size: 24rpx;
    
    font-weight: 400;
    color: #AAAAAA;
    margin-top: 20rpx;
    display: flex;
    align-items: center;

    .num {
        font-size: 24rpx;
        
        font-weight: 400;
        color: #AAAAAA;
        margin-left: 12rpx;
    }

    .dz {
        width: 30rpx;
        height: 25rpx;
        background-size: 100% 100%;
        background-image: url("@/static/cardForum/unLike.png");
    }

    .dzs {
        background-image: url("@/static/cardForum/like.png");
    }

    // margin-left: 22rpx;
}

.huifuText {
    font-size: 24rpx;
    
    font-weight: bold;
    color: #707070;
    margin-left: 28rpx;
    flex: 1;
}
</style>
