<template>
    <view class="content">
        <!-- <navigationbar title="规则说明" rightText="奖励预览" rightFont="12" @onClickRightText="onClickAward" /> -->
        <view class="descriptionContainer">
            <view class="des_title">
                规则说明:
            </view>
            <!-- <view class="sTitle">卡圈等级</view> -->
            <view class="des_content">
                1、活动期间，部分22~23 国宝商品参与本活动，玩家获得卡密时有机会掉落商家福袋和卡世界福袋
                <br />
                2、拼团成功后可前往活动页面开启福袋并获得对应奖品（拼成前福袋为待计入状态且不可开启，若拼团失败待计入的福袋将扣除）
                <br />
                3、本活动的商品对应的福袋数量和奖励各不相同，具体内容请在商品详情中查看，掉落概率为当前商品的福袋总数/卡密总数
                <br />
                4、计入的福袋请在活动结束前开始，活动截止后未开启的福袋将作废
            </view>
            <br /><br />
            <view class="des_title">
                奖品说明:
            </view>
            <view class="des_content">
                1、每件参与活动的商品均有独立奖池，可能开出：卡片、卡盒、商家优惠券、全平台通用券等，请在商品详情中查看
                <br />
            </view>
            <view class="des_content">
                2、优惠券类奖品自动发放，实物类奖品请联系对应商家领取
                <br />
                <br />
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '../../../base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    onLoad(query: any) {
    }
    onReachBottom() {

    }
    onPulldDownRefresh() {

    }
}
</script>

<style lang="scss">
page {
    background: $content-bg;
    width: 750rpx;
    overflow-x: hidden;
}

.descriptionContainer {
    width: 710rpx;
    box-sizing: border-box;
    padding: 38rpx 30rpx 34rpx 30rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    margin-top: 20rpx;

    .des_title {
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-bottom: 10rpx;
    }

    .des_content {
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 36rpx;
        letter-spacing: 2rpx;

        view {
            font-size: inherit;
        }


    }

    .sTitle {
        color: #333333;
        font-weight: bold;
        font-family: PingFang SC;
        font-size: 23rpx;
        letter-spacing: 2rpx;
        margin-top: 20rpx;
    }

    .des_gray {
        font-size: 19rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #949494;
        margin-top: 25rpx;
    }

    .red {
        color: #FA1545;
    }
}


</style>
