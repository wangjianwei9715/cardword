<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-03-24 14:26:01
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-04-07 15:35:50
 * @FilePath: \card-world\src\pages\act\portable\exhibition\my.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <transitionNav ref='transitionNav' :needIconShadow="false" title="线上卡展" />
        <view class="topBanner">
            <view class="textBanner textBanner1"></view>
        </view>
        <view class="pointBlock flexCenter">
            <image class="logo" src="@/static/act/portable/logo2.png"></image>
            <view class="title" style="font-size: 25rpx;margin: 0 4rpx;">X</view>
            <image class="logo" src="@/static/act/portable/logo1.png" style="margin-right: 14rpx;"></image>
            <view class="title">好卡征集!发布优质卡片内容赢取奖励</view>
        </view>
        <view class="tagContainer">
            <view class="tag" :class="{ tag_select: index == tag.index }" @click="onclickTag(item, index)"
                v-for="(item, index) in tag.list">{{ item.title }}</view>
        </view>
        <view class="contentContainer">
            <template v-if="tag.index == 0">
                <view class="workWrap" v-for="(item, index) in nowList" @click="goToDetail(item.id, true)">
                    <view class="imgWrap flexCenter">
                        <muqian-lazyLoad class="img" borderRadius="3rpx" :src="$parsePic(decodeURIComponent(item.url))" />
                    </view>
                    <view class="userWrap">
                        <view class="title u-line-2">{{ item.title || "标题获取中" }}
                        </view>
                        <view class="userInfo uni-flex">
                            <muqian-lazyLoad borderRadius="50%" class="avatar"
                                :src="item.avatar ? $parsePic(decodeURIComponent(item.avatar)) : defaultAvatar" />
                            <view class="name">{{ item.userName || "小卡迷" }}</view>
                            <view class="loading" v-if="item.status == 0">审核中</view>
                            <view class="rightMsg" v-if="item.status == 1">
                                <view class="rightMsg_1">
                                    <view class="dz" :class="{ dzs: item.isLiked }"></view>
                                    <view class="num">{{ formatNumber(item.likeNum, 2, 'en') }}</view>
                                </view>
                                <view class="rightMsg_2">
                                    <view class="look"></view>
                                    <view class="num">{{ formatNumber(item.viewNum, 2, 'en') }}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="errorWrap" v-if="item.status == 2">
                        <view class="errorCircle flexCenter">未通过审核</view>
                        <view class="errorReason u-line-3">原因：{{ item.rejectMsg }}</view>
                    </view>
                    <view class="jbLefTop" v-if="item.cornerMarkTp == 1"></view>
                </view>
            </template>
            <template v-if="tag.index == 1">
                <view class="allMessage">
                    <view class="left">累计{{ formatNumber(total, 2, 'en') }}条</view>
                    <!-- <view class="left right">一键已读</view> -->
                </view>
                <view class="messageWrap" v-for="(item, index) in nowList">
                    <muqian-lazyLoad class="avatar" borderRadius="50%"
                        :src="item.avatar ? $parsePic(decodeURIComponent(item.avatar)) : defaultAvatar" />
                    <view class="infoWrap">
                        <view class="name u-line-1">{{ item.userName || "小卡迷" }}</view>
                        <view class="action">{{ showWhat(item).tips }} {{ getDateDiff(item.created_at * 1000) }}</view>
                        <view class="content u-line-1">{{ showWhat(item).content }}</view>
                        <view class="look" @click="onClickLook(item)">点击查看</view>
                    </view>
                    <muqian-lazyLoad class="pic" borderRadius="3rpx" :src="$parsePic(decodeURIComponent(item.url))" />
                </view>
            </template>
            <template v-if="tag.index == 2">
                <view class="detailWrap" v-for="(item, index) in nowList">
                    <muqian-lazyLoad borderRadius="3rpx" class="pic" :src="$parsePic(decodeURIComponent(item.url))" />
                    <view class="titleInfo">
                        <view class="title u-line-1">{{ item.title || "标题获取中..." }}</view>
                        <view class="time">{{ $u.timeFormat(item.created_at, 'mm-dd hh:MM') }}</view>
                    </view>
                    <view class="rewardInfo">
                        <view class="why">{{ item.sourceName || "" }}</view>
                        <view class="point">+{{ item.score || 0 }}</view>
                    </view>
                </view>
            </template>

        </view>
        <view class="noMore" v-if="tag.list[tag.index].isFetchEnd">-没有更多了-</view>
    </view>
</template>
<!-- 审核状态，0 待审核，1 审核通过 2 审核驳回 -->
<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { getDateDiff, formatNumber } from '@/tools/util'
@Component({})
export default class ClassName extends BaseNode {
    defaultAvatar: any = app.defaultAvatar
    getDateDiff: any = getDateDiff
    formatNumber = formatNumber
    tag: any = {
        index: 0,
        list: [{
            title: "我的作品",
            list: [],
            queryParams: {
                fetchFrom: 1,
                fetchSize: 10,
            },
            isFetchEnd: true,
            url: "dataApi/portableCard/works/my/list"
        }, {
            title: "点赞评论",
            list: [],
            queryParams: {
                fetchFrom: 1,
                fetchSize: 10,
            },
            isFetchEnd: true,
            url: "dataApi/portableCard/works/note"
        }, {
            title: "奖励明细",
            list: [],
            queryParams: {
                fetchFrom: 1,
                fetchSize: 10,
            },
            isFetchEnd: true,
            url: "dataApi/portableCard/works/get/award/record"
        }]
    }
    total: number = 0
    public get nowList() {
        return this.tag.list[this.tag.index].list || []
    }
    onLoad(query: any) {
        this.reqDataByTag()
        uni.$on("likeChange", this.likeChange)
        uni.$on("delWorks", this.onDelWorkds)
        uni.$on("refreshMyWorks",this.refreshMyWorks)
    }
    onUnload(): void {
        uni.$off("likeChange", this.likeChange)
        uni.$off("delWorks", this.onDelWorkds)
        uni.$off("refreshMyWorks",this.refreshMyWorks)
    }
    onPageScroll(data: any) {
        //@ts-ignore
        this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
    }
    onReachBottom() {
        const nowTag = this.tag.list[this.tag.index]
        if (nowTag.isFetchEnd) return
        nowTag.queryParams.fetchFrom += nowTag.queryParams.fetchSize
        this.reqDataByTag()
    }
    onPullDownRefresh() {
        const nowTag = this.tag.list[this.tag.index]
        nowTag.queryParams.fetchFrom = 1
        this.reqDataByTag(() => {
            uni.stopPullDownRefresh()
        })
    }
    refreshMyWorks(){
        this.tag.list[0].queryParams.fetchFrom=1
        this.tag.list[0].isFetchEnd=true
        this.reqDataByTag(null,0)
        // app.http.Get("dataApi/portableCard/works/my/list",this.tag.list[0].queryParams,(res:any)=>{

        // })
    }
    likeChange(data: any) {
        if (!data.id) return
        let findItem: any = this.tag.list[0].list.find((item: any) => {
            return item.id == data.id
        })
        if (findItem && findItem.id) {
            findItem.isLiked = data.isLiked
            findItem.likeNum = data.likeNum
        }
    }
    onDelWorkds(id: number) {
        if (!id) return
        const findIndex: number = this.tag.list[0].list.findIndex((item: any) => {
            return item.id == id
        })
        if (findIndex <= -1) return
        this.tag.list[0].list.splice(findIndex, 1)
    }
    onClickLook(item: any) {
        if (item.commentId) {
            uni.navigateTo({
                url: `/pages/act/portable/exhibition/detail?id=${item.worksId}&noteCommentId=${item.commentId}`
            })
            return
        }
        this.goToDetail(item.worksId, false)
    }
    goToDetail(id: number, isMy: boolean) {
        uni.navigateTo({
            url: `/pages/act/portable/exhibition/detail?id=${id || 0}${isMy ? "&isMy=1" : ""}`
        })
    }
    showWhat(item: any) {
        let data = {
            tips: "",
            content: ""
        }
        if (item.msgTp == 1) {
            data.tips = `点赞了您的作品`
            data.content = `"${item.title}"`
        } else if (item.msgTp == 2) {
            data.tips = `评论了您的作品`
            data.content = item.content
        } else if (item.msgTp == 3) {
            data.tips = `评论了您`
            data.content = item.content
        } else if (item.msgTp == 4) {
            data.tips = `点赞了您的评论`
            data.content = item.content
        }
        return data
    }
    onclickTag(item: any, index: number) {
        if (this.tag.index == index) {
            return
        }
        this.tag.index = index
        const shouldTag = this.tag.list[index]
        if (shouldTag.list.length == 0) {
            this.reqDataByTag()
        }

    }
    reqDataByTag(cb?: any,specifyIndex=-1) {
        const nowTag = this.tag.list[specifyIndex==-1?this.tag.index:specifyIndex]
        app.http.Get(nowTag.url, nowTag.queryParams, (res: any) => {
            const list = res.list || []
            nowTag.isFetchEnd = res.isFetchEnd
            nowTag.queryParams.fetchFrom == 1 ? nowTag.list = list : nowTag.list.push(...list)
            if (this.tag.index == 1) {
                this.total = res.total
            }
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #1a3439;
}

.tagContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30rpx;
    width: 750rpx;

    .tag {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        margin: 0 59rpx;
        width: 33.33%;
        text-align: center;
    }

    .tag_select {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #FA1545;
    }
}

.pointBlock {
    width: 750rpx;
    height: 75rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/portable/liveBack.png");

    .logo {
        width: 46rpx;
        height: 46rpx;
        border-radius: 50%;

    }

    .title {
        font-size: 33rpx;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #FFFFFF;
    }
}

.topBanner {
    width: 750rpx;
    height: 450rpx;
    position: relative;
    background-size: 100% 100%;
    background-image: url("@/static/act/portable/top.png");

    .textBanner {
        width: 587rpx;
        height: 202rpx;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 120rpx;
        margin: auto;
        background-image: url("@/static/act/portable/text.png");
    }

    .textBanner1 {
        width: 707rpx;
        height: 202rpx;
        background-image: url("@/static/act/portable/text1.png");
    }

}

.contentContainer {
    box-sizing: border-box;
    padding: 20rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 750rpx;

    .workWrap {
        margin-bottom: 20rpx;
        width: 348rpx;
        height: 515rpx;
        border-radius: 5rpx;
        overflow: hidden;
        position: relative;

        .imgWrap {
            width: inherit;
            height: 348rpx;

            .img {
                height: 348rpx;
                width: inherit;
            }
        }

        .userWrap {
            width: inherit;
            height: 167rpx;
            background-color: #fff;
            box-sizing: border-box;
            padding: 0 16rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .title {
                color: #fff;
                font-size: 25rpx;
                font-family: PingFang SC;
                font-weight: 600;
                color: #333333;
                margin-top: 16rpx;
                line-height: 38rpx;
            }

            .userInfo {
                align-items: center;
                margin-bottom: 8rpx;
                height: 70rpx;
            }

            .avatar {
                width: 37rpx;
                height: 37rpx;
                margin-right: 13rpx;
            }

            .name {
                font-size: 23rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                flex: 1;
            }

            .rightMsg {
                display: flex;
                flex-direction: column;
                justify-content: center;

                &_1,
                &_2 {
                    display: flex;
                    align-items: center;
                }

                .dz {
                    width: 18rpx;
                    height: 18rpx;
                    background-size: 100% 100%;
                    background-image: url("@/static/act/portable/dz.png");
                }

                .dzs {
                    background-image: url("@/static/act/portable/dzs.png");
                }

                .look {
                    width: 18rpx;
                    height: 13rpx;
                    background-size: 100% 100%;
                    background-image: url("@/static/act/portable/look.png");
                }

                .num {
                    font-size: 20rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #AAAAAA;
                    margin-left: 11rpx;
                }
            }

            .loading {
                font-size: 23rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FF0038;
            }
        }

        .jbLefTop {
            background-size: 100% 100%;
            background-image: url("@/static/act/portable/jb.png");
            width: 126rpx;
            height: 36rpx;
            position: absolute;
            left: 0;
            top: 0;
        }

        .errorWrap {
            width: inherit;
            height: inherit;
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, .71);

            .errorCircle {
                width: 186rpx;
                height: 186rpx;
                background-size: 100% 100%;
                background-image: url("@/static/act/portable/errorC.png");
                margin: auto;
                margin-top: 70rpx;
                font-size: 25rpx;
                font-family: PingFang SC;
                font-weight: 600;
                color: #FF0038;
            }

            .errorReason {
                font-size: 23rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                margin: auto;
                margin-top: 22rpx;
                width: 290rpx;
                line-height: 38rpx;
            }
        }
    }

    .detailWrap {
        width: 710rpx;
        height: 144rpx;
        background: #FFFFFF;
        border-radius: 3rpx;
        margin-bottom: 14rpx;
        display: flex;
        box-sizing: border-box;
        padding: 18rpx 30rpx;
        align-items: center;

        .pic {
            width: 108rpx;
            height: 108rpx;
            margin-right: 26rpx;
        }

        .titleInfo {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;
            height: 96rpx;

            .title {
                font-size: 25rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
            }

            .time {
                font-size: 25rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #949494;
            }
        }

        .rewardInfo {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 96rpx;

            .why {
                font-size: 25rpx;
                font-family: PingFang SC;
                font-weight: 600;
                color: #333333;
            }

            .point {
                font-size: 25rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FF003D;
                text-align: right;
            }
        }
    }

    .allMessage {
        width: 710rpx;
        height: 50rpx;
        background: rgba(255, 255, 255, .44);
        border-radius: 3rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 30rpx;
        margin-bottom: 14rpx;

        .left {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
        }

        .right {
            text-decoration: underline;
        }
    }

    .messageWrap {
        width: 710rpx;
        height: 217rpx;
        background: #FFFFFF;
        border-radius: 3rpx;
        margin-bottom: 14rpx;
        box-sizing: border-box;
        padding: 30rpx 30rpx 0 30rpx;
        display: flex;

        .avatar {
            width: 70rpx;
            height: 70rpx;
            margin-right: 25rpx;
        }

        .infoWrap {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            .name {
                font-size: 25rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                margin-bottom: 10rpx;
            }

            .action {
                font-size: 21rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #949494;
                margin-bottom: 22rpx;
            }

            .content {
                font-size: 23rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                margin-bottom: 14rpx;
                text-align: left;
            }

            .look {
                font-size: 23rpx;
                font-family: PingFang SC;
                font-weight: 400;
                text-decoration: underline;
                color: #949494;
            }
        }

        .pic {
            width: 115rpx;
            height: 115rpx;
            margin-top: 21rpx;
        }
    }
}

.noMore {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #D2D2D2;
    margin: 20rpx auto;
}
</style>
