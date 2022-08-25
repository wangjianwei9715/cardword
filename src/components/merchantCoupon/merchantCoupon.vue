<template>
    <view class='content'>
        <bottomDrawer title='店铺通用券' :height='571' heightType='rpx' :needSafeArea='true'
            :showDrawer.sync='showValue'>
            <!-- <view class="sendCouponItem">
                <text class="sendCoupon-left">选择商品</text>
                <text class="couponInput">请选择</text>
                <image class="rightCoin" src="/static/live/rightCoin.png" mode="scaleToFill" />
            </view> -->
            <view class="sendCouponItem">
                <text class="sendCoupon-left">优惠券面额</text>
                <input class="couponInput" placeholder="请输入优惠券面额" type="digit">
                <image class="rightCoin" src="/static/live/rightCoin.png" mode="scaleToFill" />
            </view>
            <view class="sendCouponItem">
                <text class="sendCoupon-left">使用条件</text>
                <input class="couponInput" placeholder="小于面额视为无门槛券" type="digit">
                <image class="rightCoin" src="/static/live/rightCoin.png" mode="scaleToFill" />
            </view>
            <view class="sendCouponItem">
                <text class="sendCoupon-left">数量</text>
                <input class="couponInput" placeholder="请输入" type="digit">
                <image class="rightCoin" src="/static/live/rightCoin.png" mode="scaleToFill" />
            </view>
            <view class="sendCouponItem">
                <text class="sendCoupon-left">有效期</text>
                <input class="couponInput" placeholder="请输入（天）" type="number">
                <image class="rightCoin" src="/static/live/rightCoin.png" mode="scaleToFill" />
            </view>
            <view class="submit flexCenter">
                创建
            </view>
        </bottomDrawer>
    </view>
</template>

<script lang="ts">
    import { app } from "@/app";
    import { Component, Watch,PropSync } from "vue-property-decorator";
    import BaseComponent from "../../base/BaseComponent.vue";
    import { parsePic } from "@/tools/util";
    @Component({})
    export default class ClassName extends BaseComponent {
        @PropSync("showDrawer",{
			type:Boolean
		}) showValue!: Boolean;
        parsePic: any = parsePic;
        createCouponShow: boolean = true;

    }
</script>

<style lang="scss">
    .sendCouponItem {
        width: 100%;
        box-sizing: border-box;
        padding: 0 24rpx;
        /* justify-content: space-between; */
        flex-direction: row;
        align-items: center;
        margin-bottom: 46rpx;
        display: flex;
    }

    .sendCoupon-left {
        font-size: 29rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #000;
        flex: 1;
    }

    .couponInput {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000;
        text-align: right;
        width: 340rpx;
        /* background-color: #fff; */
    }

    .submit {
        width: 702rpx;
        height: 92rpx;
        background: #ff404d;
        border-radius: 5rpx;
        color:#fff;
        
    }

    .rightCoin {
        width: 14rpx;
        height: 22rpx;
        margin-left: 15rpx;
    }

    .placeholder {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
    }
</style>