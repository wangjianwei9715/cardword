<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-13 11:21:52
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-26 15:23:04
 * @FilePath: \card-world\src\pages\cardForum\components\vote.vue
 * @Description: 卡圈的话题pop组件
-->
<template>
    <view class="content">
        <u-popup :safeAreaInsetBottom="false" :show="showValue" @close="showValue = false" :closeable="false"
            :closeOnClickOverlay="true">
            <view class="giftContainer">
                <view class="vote_top flexCenter">
                    <view class="title">收到打赏</view>
                    <view class="close" @click="showValue = false"></view>
                </view>
                <scroll-view class="giftScroll" :scroll-y="true" @scrolltolower="scrolltolower">
                    <view class="giftItem">
                        <image class="avatar"></image>
                        <view class="centerInfo">
                            <view class="userName">邓格拉斯</view>
                            <view class="giftName">
                                <text class="name">赠送了你一份礼物</text>
                                <text class="time">2分钟前</text>
                            </view>
                            <view class="giftWrap">卡密:詹姆斯詹姆斯 银折银折卡是打卡大卡收到货卡11...
                                <text class="look">点击查看</text>
                            </view>
                        </view>
                        <!-- <view class="flex1"></view> -->
                        <image class="giftPic" mode="aspectFill"></image>
                    </view>

                </scroll-view>
                <view class="bottomSafeArea"></view>
            </view>
        </u-popup>
    </view>
</template>

<script lang="ts">
import { Component, PropSync, Watch } from "vue-property-decorator";
import BaseComponent from '@/base/BaseComponent.vue';
import { app } from "@/app";
import CardForum from "../interface/public";
// interface Query {
//     pageIndex: number;
//     pageSize: number;
//     q: string;
// }
@Component({})
export default class ClassName extends BaseComponent {
    @PropSync("show", {
        type: Boolean
    }) showValue!: Boolean;
    @Watch('showValue')
    onShowChanged(val: boolean) {
        if (val && !this.list.length) this.reqList()
    }
    list: Array<CardForum.Topics> = []
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 15,
        q: "",
        od: "issue_72:asc"
    }
    totalPage: number = 0
    timer: number = 0
    isFetchEnd: boolean = true
    scrolltolower() {
        if (!this.isFetchEnd) {
            this.queryParams.fetchFrom += this.queryParams.fetchSize
            this.reqList()
        }
    }
    onInput() {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.queryParams.fetchFrom = 1
            this.reqList()
        }, 500)
    }
    reqList() {
        app.http.Get("dataApi/cardCircle/topic/list", this.queryParams, (res: any) => {
            const list = res.list || []
            this.isFetchEnd = res.isFetchEnd
            this.queryParams.fetchFrom == 1 ? this.list = list : this.list.push(...list)
        })
        this.list = [
            {
                name: "秀卡-詹姆斯",
                id: 1,
                isActivity: true
            },
            {
                name: "问价",
                id: 2,
                isActivity: false
            },
            {
                name: "我的第一张卡",
                id: 3,
                isActivity: false
            },
            {
                name: "我的卡在哪里",
                id: 5,
                isActivity: false
            },
            {
                name: "我的卡屌不屌",
                id: 6,
                isActivity: false
            }
        ]
    }
}
</script>

<style lang="scss">
.giftContainer {
    width: 750rpx;
    background-color: #ffffff;
    height: 830rpx;
    position: relative;
    box-sizing: border-box;
    padding: 0 37rpx;
    display: flex;
    flex-direction: column;
}



.giftScroll {
    margin-top: 30rpx;
    flex: 1;
}

.vote_top {
    // width: 750rpx;
    width: 100%;
    // height: 100rpx;
    margin-top: 38rpx;
    margin-bottom: 56rpx;
    position: relative;

    .title {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
    }

    .close {
        width: 30rpx;
        height: 30rpx;
        background-size: 100% 100%;
        background-image: url("@/static/cardForum/popClose.png");
        position: absolute;
        right: 17rpx;
        top: 0;
        bottom: 0;
        margin: auto;
    }
}

.giftItem {
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 37rpx;
    display: flex;
    border-bottom: 1rpx solid #E6E6E6;
    padding-bottom: 47rpx;

    .avatar {
        width: 73rpx;
        height: 73rpx;
        background: #FA1545;
        border-radius: 50%;
        margin-right: 21rpx;
    }

    .centerInfo {
        // flex: 1;
        width: 440rpx;
        .userName {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
        }

        .giftName {
            .name {
                font-size: 21rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                margin-right: 21rpx;
            }

            .time {
                font-size: 19rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #C0C0C0;
            }
        }

        .giftWrap {
            max-width: 396rpx;
            // height: 64rpx;
            background: #F5F5F5;
            box-sizing: border-box;
            padding: 10rpx 12rpx;
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #707070;
            line-height: 25rpx;
            margin-top: 28rpx;

            // margin-bottom: 47rpx;
            .look {
                font-weight: bold;
                margin-left: 5rpx;
            }
        }
    }

    .giftPic {
        width: 91rpx;
        height: 91rpx;
        display: block;
        background: #FA1545;
    }
    
}
.flex1{
    flex: 1;
}
</style>
