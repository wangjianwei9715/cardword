<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-03-24 13:35:49
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-04-12 15:02:00
 * @FilePath: \card-world\src\pages\act\portable\exhibition\detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="navBar">
            <view :style="{ paddingTop: app.statusBarHeight + 'px', }"></view>
            <view class="nav">
                <view class="back" @click="goBack"></view>
                <image :src="formData.avatar ? $parsePic(decodeURIComponent(formData.avatar)) : defaultAvatar"
                    class="topAvatar"></image>
                <view class="topName u-line-1">{{ formData.userName || "获取中" }}</view>
                <view @click="actionSheetShow = true" v-if="isMy">
                    <u-icon size="46rpx" color="#737070" name="more-dot-fill"></u-icon>
                </view>
            </view>
        </view>
        <view style="height:88rpx" :style="{ paddingTop: app.statusBarHeight + 'px', }"></view>
        <view class="swiper">
            <u-swiper imgMode="aspectFit" bgColor="#000" height="750rpx" :interval="3000" radius="1rpx" :list="pics" @click="onClickSwiper"></u-swiper>
        </view>
        <view class="contentContainer">
            <view class="title">{{ formData.title || "获取中" }}</view>
            <view class="desc">{{ formData.content || "获取中" }}</view>
            <view class="time">发布于 {{ $u.timeFormat(formData.created_at, 'mm-dd hh:MM') }}</view>
            <view class="line"></view>
        </view>

        <view class="commentContainer">
            <view class="comTop">
                <view class="commentNum">{{ formatNumber(formData.commentNum || 0, 2, "en") }}条评论</view>
                <view class="tips">*请勿在评论区泄露您的个人信息以及交易信息</view>
            </view>
            <view class="comWrap" v-for="(item, index) in commList"
                @touchstart="touchAction($event, item, {}, index, false)"
                @touchend="touchAction($event, item, {}, index, false)">
                <view class="comBlock" :id="`commId_${item.id}`" :class="{
                    heightLight_an: queryParams.noteCommentId && item.id == queryParams.noteCommentId && isScrollEnd,
                    hold: onClickTap && touchId == item.id
                }">
                    <muqian-lazyLoad class="avatar"
                        :src="item.avatar ? $parsePic(decodeURIComponent(item.avatar)) : defaultAvatar"
                        borderRadius="50%" />
                    <view class="rightWrap">
                        <view class="msgInfo" @click.stop="onClickCom(item, {})">
                            <view class="top">
                                <view class="name u-line-1" style="max-width: 350rpx;">{{ item.userName }}</view>
                                <view class="time">{{ getDateDiff(item.created_at * 1000) }}</view>
                                <view style="display: flex;align-items: center;"
                                    @click.stop="$u.throttle(() => { likeComment(item.id, item) }, 1000)">
                                    <view class="dz" :class="{ dzs: item.isLiked }"></view>
                                    <view class="num">{{ formatNumber(item.likeNum, 2, "en") }}</view>
                                </view>
                            </view>
                            <view class="contentMsg">{{ item.content }}</view>
                        </view>
                    </view>
                </view>
                <view :id="`commId_${son.id}`" class="comBlock comBlock_son"
                    @touchstart.stop="touchAction($event, son, item, sonIndex, true)"
                    @touchend.stop="touchAction($event, son, item, sonIndex, true)" @click.stop="onClickCom(item, son)"
                    v-for="(son, sonIndex) in item.lower" :class="{
                        heightLight_an: queryParams.noteCommentId && son.id == queryParams.noteCommentId && isScrollEnd,
                        hold: onClickTap && touchId == son.id
                    }">
                    <muqian-lazyLoad class="avatar"
                        :src="son.avatar ? $parsePic(decodeURIComponent(son.avatar)) : defaultAvatar" borderRadius="50%" />
                    <view class="rightWrap">
                        <view class="msgInfo">
                            <view class="top">
                                <view class="name u-line-1" style="max-width: 350rpx;">{{ son.userName }}</view>
                                <view class="time">{{ getDateDiff(son.created_at * 1000) }}</view>
                                <view style="display: flex;align-items: center;"
                                    @click.stop="$u.throttle(() => { likeComment(son.id, son) }, 1000)">
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
                <view class="loadMore" v-if="item.remainNum > 0" @touchstart.stop="nonAction" @touchend.stop="nonAction">
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
        <template v-if="formData.status == 0 || formData.status == 2">

            <view class="bigTips">
                <view class="title">{{ formData.status == 0 ? "审核中" : "审核驳回" }}</view>
                <view class="tips" v-if="formData.status == 2">{{ formData.rejectMsg }}</view>
            </view>
            <template v-if="formData.status == 2">
                <view style="height:260rpx"></view>
                <view class="buttonFix flexCenter" style="bottom:140rpx" @click="toEdit">
                    <view class="reset"></view>
                    <view class="title">编辑重新提交</view>
                </view>
                <view class="buttonFix flexCenter buttonFix_continue" @click.stop="delWorks('确认取消发布?')">
                    <view class="close"></view>
                    <view class="title">取消发布</view>
                </view>
            </template>
        </template>
        <template v-if="formData.status == 1">
            <view class="noMore" v-if="isFetchEnd">- 没有更多了 -</view>
            <view class="fixInputContainer">
                <view class="wrap">
                    <view class="fakerInput" @click="onClickFakerInput">{{ fakerInputVal }}</view>
                    <view style="flex: 1;"></view>
                    <view class="toolsItem">
                        <image src="@/static/act/portable/talk.png" />
                        <view class="num">{{ formatNumber(formData.commentNum || 0, 2, "en") }}</view>
                    </view>
                    <view class="toolsItem" style="margin-left: 70rpx;"
                        @click="$u.throttle(() => { likeAction(formData.isLiked ? -1 : 1) }, 1000)">
                        <image v-if="!formData.isLiked" src="@/static/act/portable/dz_black.png" />
                        <image v-else src="@/static/act/portable/dz_red.png" />
                        <view class="num">{{ formatNumber(formData.likeNum || 0, 2, "en") }}</view>
                    </view>
                </view>

            </view>
        </template>
        <view class="safeBottom"></view>
        <u-overlay :zIndex="1000" :opacity="0.4" :show="focus" @click="inputHide"></u-overlay>
        <view class="trueFixInput" :class="{ pointerAuto: keyBoardHeigh > 0 }"
            :style="{ bottom: 0, transform: `translateY(-${keyBoardHeigh}px)`, opacity: keyBoardHeigh > 0 ? 1 : 0 }">
            <textarea confirm-type="send" class="input" type="text" :placeholder="inputPlaceholder" :adjust-position="false"
                :focus="focus" :auto-height="true" :maxlength="-1" :auto-blur="true"
                @keyboardheightchange="keyBoardHeightChange" v-model="sayContent" @confirm="$u.throttle(sendCom, 1000)" />
            <view class="send flexCenter" @click.stop="$u.throttle(sendCom, 1000)">发送</view>
        </view>
        <u-action-sheet :actions="actionList" :title="''" :cancelText="'关闭'" @select="onClickAction"
            :closeOnClickOverlay="true" @close="actionSheetShow = false" :show="actionSheetShow"></u-action-sheet>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { formatNumber, getDateDiff } from "@/tools/util"
@Component({})
export default class ClassName extends BaseNode {
    id: any = null
    isMy: boolean = false
    defaultAvatar: any = app.defaultAvatar
    app: any = app
    focus: boolean = false
    keyBoardHeigh: number = -2
    overlayShow: boolean = false
    formatNumber = formatNumber
    getDateDiff = getDateDiff
    sayContent: string = ""
    formData: any = {}
    pics: any = []
    commList: any = []
    moreList: any = []
    clickCom: any = {}
    clickSon: any = {}
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 10
    }
    isFetchEnd: boolean = true
    myData: any = {}
    actionList: any = [
        {
            name: "删除"
        }
    ]
    actionSheetShow: boolean = false;
    actionSheetShowByCom: boolean = false
    noteCommentId: number = 0
    isScrollEnd: boolean = false
    onClickTap: boolean = false
    tapTimer: any = null
    longtapItem: any = {}
    touchId: number = 0
    touchTime: number = 0
    lontapTimer: number = 0
    agoClickTimeStamp: number = 0
    topComIds: any = []
    onLoad(query: any) {
        if (query.id) this.id = +query.id
        if (query.isMy) this.isMy = true
        if (query.noteCommentId) this.queryParams.noteCommentId = +query.noteCommentId
        this.reqNewData()
        this.reqNewMyData()
    }
    onUnload() {
        this.tapTimer && clearTimeout(this.tapTimer)
        this.lontapTimer && clearTimeout(this.lontapTimer)
    }
    onShow() {
        this.tapTimer && clearTimeout(this.tapTimer)
        this.lontapTimer && clearTimeout(this.lontapTimer)
        this.inputHide()
    }
    onPageScroll() {
        if (this.focus) this.inputHide()
        this.tapTimer && clearTimeout(this.tapTimer)
        this.lontapTimer && clearTimeout(this.lontapTimer)
    }
    onReachBottom() {
        if (this.isFetchEnd) return
        this.queryParams.fetchFrom += this.queryParams.fetchSize
        this.getCommByWorks()
    }
    public get fakerInputVal() {
        if (this.sayContent) {
            return this.sayContent
        }
        return "说点什么..."
    }
    public get inputPlaceholder() {
        if (this.clickCom.id) {
            return `回复 ${this.clickSon.userName || this.clickCom.userName}`
        }
        return "说点什么..."
    }
    keyBoardHeightChange(obj: any) {
        this.keyBoardHeigh = obj.detail.height
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
                if (item.host || this.isMy) this.longtapCom(item, fatherItem, index, isSon)
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
        this.longtapItem = item
        //#ifdef APP-PLUS
        app.platform.UIClickFeedBack()
        plus.nativeUI.actionSheet(
            {
                cancel: "取消",
                buttons: [
                    {
                        title: "删除"
                    }
                ]
            },
            (e: any) => {
                this.touchId = 0
                this.onClickTap = false
                if (e.index == 1) {
                    this.delCom(item, fatherItem, index, isSon)
                }
            }
        );
        //#endif

        //#ifdef H5
        this.delCom(item, fatherItem, index, isSon)
        //#endif
    }
    nonAction() {
        return
    }
    onClickFakerInput() {
        if (this.sayContent == "") {
            this.clickCom = {}
            this.clickSon = {}
        }
        this.inputShow()
    }
    onClickAction(event: any) {
        // console.log(event);
        if (event.name == "删除") {
            this.delWorks("确认删除该作品?")
        }
    }
    onClickActionByCom(event: any) {
        console.log(this.longtapItem);
        if (event.name == "删除") {
            this.delWorks("确认删除该作品?")
        }
    }
    onClickSwiper(index: number) {
        uni.previewImage({
            urls: this.pics,
            current: index
        })
    }
    inputShow() {
        this.focus = true
        //#ifdef H5
        this.keyBoardHeigh = 340
        //#endif
    }
    inputHide() {
        if (this.sayContent == "") {
            this.clickCom = {}
            this.clickSon = {}
        }
        this.focus = false
        //#ifdef H5
        this.keyBoardHeigh = -2
        //#endif
    }
    goBack() {
        app.platform.pageBack()
    }
    onClickCom(item: any, son: any) {
        console.log(item, son);
        if (this.onClickTap || this.touchId) return
        this.focus = true
        if (!item.id) return
        if (item.id != this.clickCom.id || son.id != this.clickSon.id) {
            this.sayContent = ""
        }
        this.clickCom = item
        this.clickSon = son
        this.inputShow()
    }

    delCom(item: any, fatherItem: any, index: number, isSon: boolean) {
        uni.showModal({
            title: "提示",
            content: `是否删除"${item.content.length <= 15 ? item.content : item.content.slice(0, 15) + "..."}"评论?`,
            success: (res: any) => {
                if (res.confirm) {
                    app.http.Post("portableCard/works/comment/delete/" + item.id, {}, () => {
                        if (isSon) {
                            fatherItem.lower.splice(index, 1)
                            const findIndex = fatherItem.lowerIds.findIndex((id: number) => id == item.id)
                            if (findIndex >= 0) fatherItem.lowerIds.splice(findIndex, 1)
                            this.formData.commentNum -= 1
                        } else {
                            const findIndex = this.topComIds.findIndex((id: number) => id == item.id)
                            if (findIndex >= 0) this.topComIds.splice(findIndex, 1)
                            const delNum = 1 + (item.lower ? item.lower.length : 0) + item.remainNum
                            this.formData.commentNum-=delNum
                            this.commList.splice(index,1)
                            // setTimeout(() => {
                            //     this.queryParams.fetchFrom = 1
                            //     this.getCommByWorks()
                            // }, 250)
                        }
                    })
                }
            }
        })
    }
    delWorks(text: string) {
        uni.showModal({
            title: "提示",
            content: text,
            success: (res) => {
                if (res.confirm) {
                    app.http.Post("portableCard/works/delete/" + this.id, {}, () => {
                        uni.$emit("delWorks", this.id)
                        app.platform.pageBack()
                    })
                }
            }
        })
    }

    //作品点赞
    likeAction(type: number) {
        // -1取消 1点赞
        const requestUrl = `portableCard/works/${type == -1 ? "unLike" : "like"}/${this.id}`
        app.http.Post(requestUrl, {}, (res: any) => {
            if (res.award) {
                uni.showToast({
                    title: res.award,
                    icon: "none"
                })
                app.platform.UINotificationFeedBack("success")
            }
            this.formData.likeNum = this.formData.likeNum + type
            this.formData.isLiked = type !== -1
            uni.$emit("likeChange", { id: this.id, likeNum: this.formData.likeNum, isLiked: this.formData.isLiked })
        })
    }
    //发布评论或回复
    pushOrReply(id: number, item: any) {
        const requestUrl = `portableCard/works/${id == 0 ? "issue" : "reply"}/comment/${id || this.id}`
        app.http.Post(requestUrl, { content: this.sayContent }, (res: any) => {
            if (id == 0) {
                this.commList.unshift({
                    id: res.lastCommentId,
                    isLiked: false,
                    likeNum: 0,
                    remainNum: 0,
                    created_at: Math.round(+new Date() / 1000),
                    lower: [],
                    userName: this.myData.userName || "小卡迷",
                    avatar: this.myData.avatar || this.defaultAvatar,
                    content: res.content,
                    host: true
                })
                this.topComIds.push(res.lastCommentId)
            } else {
                item.lower.push({
                    id: res.lastCommentId,
                    userName: this.myData.userName || "小卡迷",
                    avatar: this.myData.avatar || this.defaultAvatar,
                    isLiked: false,
                    likeNum: 0,
                    created_at: Math.round(+new Date() / 1000),
                    content: res.content,
                    replyUserName: id == item.id ? "" : this.clickSon.userName,
                    host: true
                })
                item.lowerIds.push(res.lastCommentId)
                this.inputHide()
            }
            this.formData.commentNum += 1
            if (res.award) {
                uni.showToast({
                    title: res.award,
                    icon: "none",
                    duration: 5000
                })
                app.platform.UINotificationFeedBack("success")
            }
            this.sayContent = ""
            this.clickCom = {}
            this.inputHide()
        })
    }
    //点赞评论或取消点赞
    likeComment(id: number, item: any) {
        app.http.Post(`portableCard/works/like/or/unLike/${id}`, {}, (res: any) => {
            item.likeNum = res.likeNum
            item.isLiked = res.isLike
        })
    }
    toEdit() {
        uni.navigateTo({
            url: `/pages/act/portable/exhibition/release?id=${this.id}`
        })
    }
    onClickLoadMore(item: any) {
        if (item.remainNum <= 0) return
        item.loading = true
        item.queryParams.fetchFrom += 10
        let params = item.queryParams
        if (this.queryParams.noteCommentId) params.noteCommentId = this.queryParams.noteCommentId
        app.http.Get(`dataApi/portableCard/draft/comment/more/${item.id}`, params, (res: any) => {
            const list = (res.list || 0).filter((lowerItem: any) => {
                let has = item.lowerIds.includes(lowerItem.id)
                if (!has) {
                    item.lowerIds.push(lowerItem.id)
                }
                return !has
            })
            item.lower.push(...list || [])
            item.remainNum = res.remainNum || 0
            item.loading = false
        })
    }
    getCommByWorks() {
        app.http.Get(`dataApi/portableCard/works/comment/` + this.id, this.queryParams, (res: any) => {
            const list = (res.list || []).filter((item: any) => {
                item.isFetchEnd = item.remainNum <= 0
                item.loading = false
                item.queryParams = {
                    fetchFrom: -9,
                    fetchSize: 10
                }
                item.lower = item.lower || []
                item.lowerIds = item.lower.map((lowerItem: any) => {
                    return lowerItem.id
                })
                let has = this.topComIds.includes(item.id)
                if (!has) this.topComIds.push(item.id)
                return !has
            })
            this.isFetchEnd = res.isFetchEnd
            this.queryParams.fetchFrom == 1 ? this.commList = list : this.commList.push(...list)
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
    reqNewMyData() {
        app.http.Get("dataApi/selectRank/my/data", { activityTp: 5 }, (res: any) => {
            this.myData = res.data
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/portableCard/works/detail/` + this.id, { view: 1 }, (res: any) => {
            if (res.data.isDelete) {
                uni.$emit("delWorks", this.id)
                uni.showModal({
                    title: "提示",
                    content: "作品似乎已被作者删除",
                    showCancel: false,
                    success: (data: any) => {
                        if (data.confirm) app.platform.pageBack()
                    }
                })
                return
            }
            this.formData = res.data
            this.pics = res.data.url.split(",").filter(Boolean).map((url: string) => {
                //@ts-ignore
                return this.$parsePic(decodeURIComponent(url))
            })
            if (res.data.status && res.data.status === 1) this.getCommByWorks()
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
            width: 460rpx;
            height: 63rpx;
            background: #EFEFEF;
            border-radius: 3rpx;
            box-sizing: border-box;
            padding: 0 30rpx;
            display: flex;
            align-items: center;
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            overflow: hidden;
            color: #88878C;
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

.bigTips {

    margin-top: 80rpx;
    text-align: center;

    .title {
        font-size: 35rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #7C7C7C;
    }

    .tips {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #7C7C7C;
        margin-top: 6rpx;
    }
}

.buttonFix {
    width: 750rpx;
    height: 120rpx;
    background: #FA1545;
    position: fixed;
    bottom: 0;

    .reset {
        width: 47rpx;
        height: 42rpx;
        margin-right: 18rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/portable/reset.png");
    }

    .title {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
        letter-spacing: 2rpx;
    }

    .close {
        width: 42rpx;
        height: 42rpx;
        margin-right: 18rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/portable/close.png");
    }
}

.buttonFix_continue {
    background: #A7A7A7;
}
</style>
