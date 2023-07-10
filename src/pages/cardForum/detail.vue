
<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-12 16:06:41
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-07-10 10:17:56
 * @FilePath: \jichao_app_2\src\pages\cardForum\detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="navBar">
            <view :style="{ paddingTop: app.statusBarHeight + 'px', }"></view>
            <view class="nav">
                <view class="back" @click="goBack">
                    <image src="@/static/act/portable/pageBack.png"></image>
                </view>
                <view @click="goPersonHome" style="display:flex">
                    <image :src="forumDetail.avatar ? $parsePic(decodeURIComponent(forumDetail.avatar)) : app.defaultAvatar"
                        class="topAvatar"></image>
                    <view class="topName u-line-1">{{ forumDetail.userName || "获取中" }}</view>
                </view>
                <view class="flex1"></view>
                <view class="follow flexCenter" v-if="!isPerson" :class="{ follow_dis: isFollow }" @click="onClickFollow">{{
                    isFollow ? '已关注'
                    : '关注' }}</view>
                <!-- v-if="!isPerson"
                v-if="isPerson" -->
                <view @click="actionSheetShow = true" v-if="isPerson" style="margin-right: 20rpx;">
                    <u-icon size="46rpx" color="#737070" name="more-dot-fill"></u-icon>
                </view>
                <u-icon name="share-square" color="#6c6969" size="28" @click="operationShow = true"></u-icon>
                <!-- <view @click="actionSheetShow = true" v-if="isMy">
                    <u-icon size="46rpx" color="#737070" name="more-dot-fill"></u-icon>
                </view> -->
            </view>
        </view>
        <view style="height:88rpx" :style="{ paddingTop: app.statusBarHeight + 'px', }"></view>

        <albumSwiper v-if="isAlbum" :forumDetail="forumDetail" :code="code" :swiperCurrent.sync="swiperCurrent" />
        <view class="swiper" v-else>
            <!-- @click="onClickSwiper -->
            <u-swiper imgMode="aspectFit" :current="swiperCurrent" :indicator="false" bgColor="#000" height="946rpx"
                :interval="3000" radius="1rpx" :list="pics" @change="swiperChange"></u-swiper>
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
            <view class="desc" v-if="forumDetail.content" v-html="forumDetail.content"></view>
            <!-- <u-read-more :showHeight="180" closeText="全部" color="#000">
                
            </u-read-more> -->
            <view class="topicsContainer" v-if="forumDetail.topic && forumDetail.topic.length">
                <text v-for="item in forumDetail.topic"
                    @click.stop="pageJump(`/pages/cardForum/topics/detailPage?id=${item.topicId}`)">{{ item.topicName
                    }}</text>
            </view>
            <view class="haowuGoodsWrap" v-if="forumDetail.good && forumDetail.good.goodCode"
                @click="app.navigateTo.goGoodsDetails(forumDetail.good.goodCode)">
                <view class="goodsItem flexCenter">
                    <image class="pic" mode="aspectFill" :src="$parsePic(decodeURIComponent(forumDetail.good.cover))">
                    </image>
                    <view class="goodsInfo u-line-2">{{ forumDetail.good.title }}</view>
                </view>
            </view>
            <view class="time">编辑于 {{ $u.timeFormat(forumDetail.created_at, 'mm-dd hh:MM') }} {{ forumDetail.location ||
                "未知" }}</view>
            <view class="line"></view>
            <view class="voteContainer" v-if="forumDetail.vote && forumDetail.vote.voteTitle">
                <view class="voteTitle">投票：{{ forumDetail.vote.voteTitle }}</view>
                <view class="voteOption" v-for="(item, index) in forumDetail.vote.options" @click="onClickVote(item)">
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
            <view class="comWrap" v-for="(item, index) in commList"
                @touchstart="touchAction($event, item, {}, index, false)"
                @touchend="touchAction($event, item, {}, index, false)">
                <view class=" comBlock" :id="`commId_${item.id}`" :class="{
                    heightLight_an: queryParams.noteCommentId && item.id == queryParams.noteCommentId && isScrollEnd,
                    hold: onClickTap && touchId == item.id
                }">
                    <muqian-lazyLoad class="avatar"
                        :src="item.avatar ? $parsePic(decodeURIComponent(item.avatar)) : app.defaultAvatar"
                        borderRadius="50%" />
                    <view class="rightWrap">
                        <view class="msgInfo" @click.stop="onClickCom(item, null)">
                            <view class="top">
                                <view class="name u-line-1" style="flex:1">{{ item.userName }}</view>
                            </view>
                            <view class="contentMsg">{{ item.content }}</view>
                            <view class="timeInfo">
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
                    @touchstart.stop="touchAction($event, son, item, sonIndex, true)"
                    @touchend.stop="touchAction($event, son, item, sonIndex, true)" @click.stop="onClickCom(item, son)"
                    :class="{
                        heightLight_an: queryParams.noteCommentId && son.id == queryParams.noteCommentId && isScrollEnd,
                        hold: onClickTap && touchId == son.id
                    }">
                    <muqian-lazyLoad class="avatar"
                        :src="son.avatar ? $parsePic(decodeURIComponent(son.avatar)) : app.defaultAvatar"
                        borderRadius="50%" />
                    <view class="rightWrap">
                        <view class="msgInfo">
                            <view class="top">
                                <view class="name u-line-1" style="flex:1">{{ son.userName }}</view>
                                <!-- <view class="time">{{ getDateDiff(son.created_at * 1000) }}</view> -->

                            </view>
                            <view class="contentMsg">
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
                <view class="line" v-if="index + 1 < commList.length"></view>
            </view>
        </view>
        <view class="fixInputContainer">
            <view class="wrap">
                <view class="fakerInput u-line-1" @click="onClickFakerInput">{{ fakerInputVal }}</view>
                <view class="toolsWrap">
                    <view class="toolsItem" @click="isPerson ? recGiftShow = true : rewardShow = true"
                        style="position: relative;bottom: 4rpx;">
                        <image src="@/static/cardForum/gift.png" style="width:34rpx;height:37rpx" />
                        <view class="num" style="position: relative;top: 5rpx;">打赏</view>
                    </view>
                    <view class="toolsItem" @click="$u.throttle(() => { onClickLike() }, 500)">
                        <image v-if="!isLike" src="@/static/cardForum/detail_dz.png" style="width:38rpx;height:32rpx" />
                        <image v-else src="@/static/cardForum/detail_dz_s.png" style="width:38rpx;height:32rpx" />
                        <view class="num">{{ formatNumber(forumDetail.likeNum || 0, 2, "en") }}</view>
                    </view>
                    <view class="toolsItem" @click="onClickFakerInput">
                        <image src="@/static/cardForum/comm.png" style="width:35rpx;height:33rpx" />
                        <view class="num">{{ formatNumber(forumDetail.commentNum || 0, 2, "en") }}</view>
                    </view>
                    <view class="toolsItem" @click="$u.throttle(() => { onClickCollect() }, 500)">
                        <image v-if="!isCollection" src="@/static/cardForum/sc.png" style="width:36rpx;height:34rpx" />
                        <image v-else src="@/static/cardForum/sc_s.png" style="width:36rpx;height:34rpx" />
                        <view class="num">{{ formatNumber(forumDetail.collectNum || 0, 2, "en") }}</view>
                    </view>
                </view>
            </view>

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
            :shareData="{}" :report="true" :operationShow.sync="operationShow"></share>
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
import { followActionByUser, getForumDetail } from "./func/index"
import { comment_reason_tp } from "@/tools/DataExchange"
import recGift from "./components/recGift.vue"
import albumSwiper from "./components/album/albumSwiper.vue"
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
enum ForumBit {
    IS_PERSON = 1,//本人
    IS_FOLLOW = 2,//关注
    IS_LIKE = 4,//点赞
    IS_COLLECTION = 8//收藏
}
const queryParams: CardForum.QueryByFetch = {
    fetchFrom: 1,
    fetchSize: 10
}
const dotWidth = uni.upx2px(24)
@Component({
    components: {
        rewardPop,
        recGift,
        albumSwiper
    }
})
export default class ClassName extends BaseNode {
    comment_reason_tp = comment_reason_tp
    app = app
    getDateDiff = getDateDiff
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
    onLoad(query: any) {
        this.userBack = query.back == "true"
        this.private = query.private == "1"
        if (query.fromUserId) this.fromUserId = +query.fromUserId
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
        return this.forumDetail.tp == 3
    }
    public get isPerson(): boolean {
        return (this.forumDetail.bit & ForumBit.IS_PERSON) === ForumBit.IS_PERSON
    }
    public get isFollow(): boolean {
        return (this.forumDetail.bit & ForumBit.IS_FOLLOW) === ForumBit.IS_FOLLOW
    }
    public get isLike(): boolean {
        return (this.forumDetail.bit & ForumBit.IS_LIKE) === ForumBit.IS_LIKE
    }
    public get isCollection(): boolean {
        return (this.forumDetail.bit & ForumBit.IS_COLLECTION) === ForumBit.IS_COLLECTION
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
        // cardCircle/comment
        const requestUrl = `cardCircle/comment/${id == 0 ? "issue" : "reply"}/${id || this.code}`
        app.http.Post(requestUrl, { content: this.sayContent }, (res: any) => {
            const same = {
                id: res.commentId as number,
                userName: this.userInfo.userName || "小卡迷",
                avatar: this.userInfo.avatar || app.defaultAvatar,
                isLiked: false,
                likeNum: 0,
                created_at: Math.round(+new Date() / 1000),
                content: res.content,
                host: true,
                location: res.location as string
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
        })
    }
    goPersonHome() {
        if (this.userBack && this.fromUserId == this.authorInfo.userId) {
            app.platform.pageBack()
            return
        }
        uni.navigateTo({
            url: "/pages/cardForum/personHomePage?userId=" + this.forumDetail.userId
        })
    }
    onClickCom(item: CardForum.CommentFather, son: CardForum.Comment | null) {
        console.log(item, son);
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
                console.log("按住了0.7s");
                // if (item.host || this.isMy) this.longtapCom(item, fatherItem, index, isSon) 
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
        console.log("longtapCom", item);
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
        //#ifdef APP-PLUS
        plus.nativeUI.actionSheet({
            cancel: "取消",
            buttons: this.comment_reason_tp.map((item: any) => {
                return {
                    title: item.label
                }
            })
        }, (e: any) => {
            if (e.index == 0) return
            const value = this.comment_reason_tp[e.index - 1].value
            if (!value || !item.id) {
                uni.showToast({
                    title: "举报失败",
                    icon: "none"
                })
                return
            }
            app.http.Post("comment/report/" + item.id, { tp: 3, reason_tp: value }, (res: any) => {
                uni.showToast({
                    title: "举报成功",
                    icon: "none"
                })
            })
        })
        //#endif
    }
    delCom(item: CardForum.CommentFather, fatherItem: CardForum.CommentFather, index: number, isSon: boolean) {
        uni.showModal({
            title: "提示",
            content: `是否删除"${item.content.length <= 15 ? item.content : item.content.slice(0, 15) + "..."}"评论?`,
            success: (res: any) => {
                if (res.confirm) {
                    // cardCircle/comment/delete/
                    // portableCard/works/comment/delete/
                    app.http.Post("cardCircle/comment/delete/" + item.id, {}, () => {
                        if (isSon) {
                            fatherItem.lower.splice(index, 1)
                            this.forumDetail.commentNum -= 1
                        } else {
                            const delNum = 1 + (item.lower ? item.lower.length : 0) + (item.remainNum ?? 0)
                            this.forumDetail.commentNum -= delNum
                            this.commList.splice(index, 1)
                        }
                    })
                }
            }
        })
    }
    onSelectActionSheet(item: Sheet) {
        console.log(item);
        if (item.behavior) {
            //@ts-ignore
            this[item.behavior] && this[item.behavior]()
            return
        }
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
            this.forumDetail.bit ^= ForumBit.IS_LIKE;
            uni.$emit("cardForumLike", { code: this.code, bit: this.forumDetail.bit, likeNum: this.forumDetail.likeNum })
        })
    }
    onClickCollect() {
        app.http.Post(`cardCircle/${this.isCollection ? 'un/' : ''}collect/${this.code}`, {}, (res: any) => {
            if (this.isCollection) this.forumDetail.collectNum -= 1
            if (!this.isCollection) this.forumDetail.collectNum += 1
            this.forumDetail.bit ^= ForumBit.IS_COLLECTION;
        })
    }
    onClickFollow() {
        followActionByUser(this.forumDetail.userId, this.isFollow).then(() => {
            this.forumDetail.bit ^= ForumBit.IS_FOLLOW;
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
            // if (this.queryParams.noteCommentId && !this.isScrollEnd) {
            //     this.$nextTick(() => {
            //         this.scrollToAnyBlock()
            //     })
            // }
        })
    }
    onEditCardForum(res: any) {
        if (res.code == this.code) this.reqNewData()
    }
    reqNewData(cb?: any) {
        getForumDetail(this.code).then((res: any) => {
            if (res.data.tp === 2) {
                uni.redirectTo({
                    url: `/pages/cardForum/video/index?code=${this.code}&fromMine=1`
                })
                return
            }
            this.forumDetail = res.data as CardForum.ForumDetail || {}
            this.authorInfo = {
                userId: this.forumDetail.userId,
                userName: this.forumDetail.userName,
                avatar: this.forumDetail.avatar
            }
            this.pics = res.data.url.split(",").filter(Boolean).map((url: string) => {
                //@ts-ignore
                return this.$parsePic(decodeURIComponent(url))
            })
            if (res.state == 2 && (res.data.bit & ForumBit.IS_PERSON) == ForumBit.IS_PERSON) {
                this.private = true
            }
            this.dotContainerWidth = this.dotWidth * (this.pics.length > 5 ? 5 : this.pics.length)
            this.getCommByWorks()
        }).catch((err: any) => {
            uni.showModal({
                title: "提示",
                content: err.msg,
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
        image{
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
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        flex: 1;
        line-height: 61rpx;
    }
}

.swiper {
    width: 750rpx;
    height: 946rpx;
}

.flex1 {
    flex: 1;
}

.follow {
    width: 128rpx;
    height: 50rpx;
    background: #FA1545;
    border-radius: 3rpx;
    font-size: 29rpx;
    margin-right: 34rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
}

.follow_dis {
    color: #fff;
    background-color: #c9d0d7;
}

.topicsContainer {
    width: 100%;
    box-sizing: border-box;
    margin-top: 16rpx;

    // padding: 0 20rpx;
    text {
        margin-right: 10rpx;
        font-size: 29rpx;
        font-family: PingFang SC;
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
            font-family: PingFang SC;
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
        font-family: PingFang SC;
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
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            flex: 1;
            z-index: 4;
        }

        .voteNum {
            font-size: 23rpx;
            font-family: PingFang SC;
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
    padding: 0rpx 21rpx;

    .title {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-bottom: 30rpx;
        margin-top: 25rpx;
        letter-spacing: 2rpx;
    }

    .desc {
        width: 100%;
        font-size: 29rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 33rpx;
        letter-spacing: 2rpx;
        text-align: left;
        white-space: pre-wrap;
    }

    .time {
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #949494;
        margin-top: 40rpx;
        margin-bottom: 20rpx;
    }

    .line {
        width: 662rpx;
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
            width: 313rpx;
            height: 63rpx;
            background: #EFEFEF;
            border-radius: 3rpx;
            box-sizing: border-box;
            padding: 0 30rpx;
            line-height: 63rpx;
            // display: flex;
            // align-items: center;
            font-size: 25rpx;
            font-family: PingFang SC;
            margin-right: 30rpx;
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
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 30rpx;
                bottom: 0;
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
    padding: 0 21rpx;
}

.commentNum {
    font-size: 29rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    flex: 1;
}

.tips {
    font-size: 19rpx;
    font-family: PingFang SC;
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
                        font-size: 25rpx;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: #636363;

                    }

                    .time {
                        font-size: 21rpx;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: #AAAAAA;
                        margin-left: 22rpx;
                        flex: 1;
                    }


                }

                .contentMsg {
                    font-size: 25rpx;
                    font-family: PingFang SC;
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
                    font-family: PingFang SC;
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
            font-family: PingFang SC;
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
    font-family: PingFang SC;
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
        width: 500rpx;
        // height: 63rpx;
        background: #EFEFEF;
        border-radius: 3rpx;
        box-sizing: border-box;
        padding: 10rpx 30rpx;
        display: flex;
        align-items: center;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
    }

    .send {
        width: 140rpx;
        height: 54rpx;
        color: #fff;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        border-radius: 3rpx;
        background-color: #FA1545;
    }
}

.pointerAuto {
    pointer-events: auto;
}

.timeInfo {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #AAAAAA;
    margin-top: 20rpx;
    display: flex;
    align-content: center;

    .num {
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #AAAAAA;
        margin-left: 12rpx;
    }

    .dz {
        width: 23rpx;
        height: 23rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/portable/dz.png");
    }

    .dzs {
        background-image: url("@/static/act/portable/dzs.png");
    }

    // margin-left: 22rpx;
}

.huifuText {
    font-size: 23rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #707070;
    margin-left: 28rpx;
    flex: 1;
}
</style>
