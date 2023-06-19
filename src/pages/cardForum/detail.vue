
<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-12 16:06:41
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-19 18:10:37
 * @FilePath: \card-world\src\pages\cardForum\release.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="navBar">
            <view :style="{ paddingTop: app.statusBarHeight + 'px', }"></view>
            <view class="nav">
                <view class="back" @click="goBack"></view>
                <view @click="goPersonHome" style="display:flex">
                    <image :src="forumDetail.avatar ? $parsePic(decodeURIComponent(forumDetail.avatar)) : app.defaultAvatar"
                        class="topAvatar"></image>
                    <view class="topName u-line-1">{{ forumDetail.userName || "获取中" }}</view>
                </view>
                <view class="flex1"></view>
                <view class="follow flexCenter" :class="{ follow_dis: isFollow }" @click="onClickFollow">{{ isFollow ? '已关注'
                    : '关注' }}</view>
                <!-- <view @click="actionSheetShow = true" v-if="isMy">
                    <u-icon size="46rpx" color="#737070" name="more-dot-fill"></u-icon>
                </view> -->
            </view>
        </view>
        <view style="height:88rpx" :style="{ paddingTop: app.statusBarHeight + 'px', }"></view>
        <view class="swiper">
            <!-- @click="onClickSwiper -->
            <u-swiper imgMode="aspectFit" :indicator="true" bgColor="#000" height="750rpx" :interval="3000" radius="1rpx"
                :list="pics"></u-swiper>
        </view>
        <view class="contentContainer">
            <view class="title">{{ forumDetail.title || "获取中" }}</view>
            <u-read-more :showHeight="180" closeText="全部" color="#000">
                <view class="desc">{{ forumDetail.content || "" }}</view>
            </u-read-more>

            <view class="time">发布于 {{ $u.timeFormat(forumDetail.created_at, 'mm-dd hh:MM') }}</view>
            <view class="line"></view>
        </view>
        <view class="commentContainer">
            <view class="comTop">
                <view class="commentNum">{{ forumDetail.commentNum }}条评论</view>
                <view class="tips">*请勿在评论区泄露您的个人信息以及交易信息</view>
            </view>
            <!--  -->
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
                                <view class="name u-line-1" style="max-width: 350rpx;">{{ item.userName }}</view>
                                <view class="time">{{ getDateDiff(item.created_at * 1000) }}</view>
                                <view style="display: flex;align-items: center;">
                                    <view class="dz" :class="{ dzs: item.isLiked }"></view>
                                    <view class="num">{{ formatNumber(item.likeNum, 2, "en") }}</view>
                                </view>
                            </view>
                            <view class="contentMsg">{{ item.content }}</view>
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
                                <view class="name u-line-1" style="max-width: 350rpx;">{{ son.userName }}</view>
                                <view class="time">{{ getDateDiff(son.created_at * 1000) }}</view>
                                <view style="display: flex;align-items: center;">
                                    <view class="dz" :class="{ dzs: son.isLiked }"></view>
                                    <view class="num">{{ formatNumber(son.likeNum, 2, "en") }}</view>
                                </view>
                            </view>
                            <view class="contentMsg">
                                <template v-if="son.replyUserName">
                                    回复
                                    <text class="replyName">{{ son.replyUserName }}</text>
                                </template>
                                {{ son.content }}
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
                    <view class="toolsItem" @click="rewardShow = true">
                        <image src="@/static/act/portable/talk.png" />
                        <view class="num">{{ formatNumber(forumDetail.commentNum || 0, 2, "en") }}(打赏)</view>
                    </view>
                    <view class="toolsItem">
                        <image src="@/static/act/portable/talk.png" />
                        <view class="num">{{ formatNumber(forumDetail.commentNum || 0, 2, "en") }}(点赞)</view>
                    </view>
                    <view class="toolsItem">
                        <image src="@/static/act/portable/talk.png" />
                        <view class="num">{{ formatNumber(forumDetail.commentNum || 0, 2, "en") }}(评论)</view>
                    </view>
                    <view class="toolsItem" @click="$u.throttle(() => { }, 1000)">
                        <image v-if="!isLike" src="@/static/act/portable/dz_black.png" />
                        <image v-else src="@/static/act/portable/dz_red.png" />
                        <view class="num">{{ formatNumber(forumDetail.likeNum || 0, 2, "en") }}(收藏)</view>
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
import { followActionByUser } from "./func/index"
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
@Component({
    components: {
        rewardPop
    }
})
export default class ClassName extends BaseNode {
    app = app
    getDateDiff = getDateDiff
    keyBoardHeigh: number = -2
    focus: boolean = false
    showVote: boolean = true
    rewardShow: boolean = false
    code: string = ""
    sayContent: string = ""
    formatNumber = formatNumber
    forumDetail: CardForum.ForumDetail = {} as CardForum.ForumDetail
    authorInfo: CardForum.RewardUserInfo = {} as CardForum.RewardUserInfo
    pics: Array<string> = []
    queryParams: CardForum.QueryByFetch = queryParams
    commList: Array<CardForum.CommentFather> = []
    isFetchEnd: boolean = true
    clickCom: CardForum.CommentFather = {} as CardForum.CommentFather
    clickSon: CardForum.Comment = {} as CardForum.Comment
    touchId: number = 0
    onClickTap: boolean = false
    isScrollEnd: boolean = false
    tapTimer: number = 0
    lontapTimer: number = 0
    userInfo: UserStreamline = {} as UserStreamline
    onLoad(query: any) {
        app.platform.hasLoginToken(async () => {
            this.code = query.code || "mockCode"
            this.getCommByWorks()
            this.userInfo = await app.user.getUserInfo()
        })

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
    keyBoardHeightChange(obj: any) {
        this.keyBoardHeigh = obj.detail.height
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
    //发布评论或回复
    pushOrReply(id: number, item: CardForum.CommentFather) {
        // cardCircle/comment
        const requestUrl = `portableCard/works/${id == 0 ? "issue" : "reply"}/comment/${id || this.code}`
        app.http.Post(requestUrl, { content: this.sayContent }, (res: any) => {
            const same = {
                id: res.lastCommentId as number,
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
        uni.navigateTo({
            url: "/pages/cardForum/personHome?userId="
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
        let buttons = [
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
                    // this.pickUpActionSheet(item)
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
    nonAction() {
        return
    }
    goBack() {
        app.platform.pageBack()
    }
    onClickLike() {
        app.http.Post(`cardCircle/${this.isLike ? 'un/' : ''}like/${this.code}`, {}, (res: any) => {
            this.forumDetail.bit ^= ForumBit.IS_LIKE;
        })
    }
    onClickCollect() {
        app.http.Post(`cardCircle/${this.isCollection ? 'un/' : ''}collect/${this.code}`, {}, (res: any) => {
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
        // dataApi/cardCircle/comment/more/
        app.http.Get(`dataApi/portableCard/draft/comment/more/${item.id}`, params, (res: any) => {
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
    getCommByWorks() {
        // `dataApi/cardCircle/comment/list/` + this.code
        app.http.Get(`dataApi/portableCard/works/comment/39`, this.queryParams, (res: any) => {
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
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/cardCircle/detail/` + this.code, {}, (res: any) => {
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
        width: 19rpx;
        height: 35rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/portable/pageBack.png");
    }

    .topAvatar {
        width: 42rpx;
        height: 42rpx;
        border-radius: 50%;
        margin-left: 50rpx;
        margin-right: 20rpx;
    }

    .topName {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        flex: 1;
    }
}

.swiper {
    width: 750rpx;
    height: 750rpx;
}

.flex1 {
    flex: 1;
}

.follow {
    width: 80rpx;
    height: 40rpx;
    color: #fff;
    background-color: #fb374e;
}

.follow_dis {
    color: #fff;
    background-color: #c9d0d7;
}

.contentContainer {
    width: 750rpx;
    box-sizing: border-box;
    padding: 0rpx 43rpx;

    .title {
        font-size: 27rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-bottom: 30rpx;
        margin-top: 35rpx;
        letter-spacing: 2rpx;
    }

    .desc {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 33rpx;
        letter-spacing: 2rpx;
        text-align: left;
        white-space: pre-wrap;
    }

    .time {
        font-size: 21rpx;
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

    .wrap {
        height: 124rpx;
        width: inherit;
        box-sizing: border-box;
        padding: 0 44rpx;
        display: flex;
        align-items: center;

        .fakerInput {
            width: 340rpx;
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

            image {
                width: 35rpx;
                height: 34rpx;
            }

            .num {
                position: absolute;
                font-size: 23rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 30rpx;
                bottom: 0;
            }
        }
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
    padding: 0 43rpx;
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
                    white-space: pre-wrap;

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
</style>
