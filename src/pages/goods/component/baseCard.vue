<template>
	<view>
		<view class="header-base" @click="basePopupShow=true">
			基础卡片<image class="icon-base" src="@/static/goods/detail/base.png"/>
		</view>

		<!-- 基础卡片说明 -->
		<u-popup mode="bottom" closeable round="3rpx" :show="basePopupShow" @close="basePopupShow = false"
            :safeAreaInsetBottom="false">
            <view class="base-popup">
                <view class="base-popup-title">购买说明</view>
				<view class="base-center">
					<view class="base-popup-name">每份将购得由商家提供的以下内容：</view>
					<view class="base-popup-item">
						<view class="item-title">1、基础卡片随机款1张</view>
						<view class="item-desc">发货方式：(1）联系商家并向商家支付运费后发货。</view>
						<view class="item-desc">(2) 30日内累计达到商家要求张数后，按商家要求确认发货方式。</view>
					</view>
					<view class="base-popup-item">
						<view class="item-title">2、系列玩法一份（卡密）</view>
						<view class="item-desc">通过系列玩法（卡密）获得的卡片包邮，并按订单填写的收货地址发货</view>
					</view>
				</view>
            </view>
        </u-popup>
	</view>
</template>

<script lang="ts">
	import { Component, Prop} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	
	@Component({})
	export default class ClassName extends BaseComponent {
		basePopupShow=false
	}
</script>

<style lang="scss" scoped>
	.header-base{
		height:40rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		line-height: 40rpx;
	}
	.icon-base{
		width: 30rpx;
		height:30rpx;
		margin-left: 8rpx;
	}
	.base-popup{
		.base-popup-title{
			width: 100%;
			height:100rpx;
			text-align: center;
			line-height: 100rpx;
			font-size: 36rpx;
			font-family: PingFangSC, PingFang SC;
			font-weight: 600;
			color: #333333;
		}
		.base-center{
			width: 100%;
			box-sizing: border-box;
			padding: 0 36rpx 44rpx 36rpx;
			.base-popup-name{
				font-size: 28rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				color: #333333;
			}
			.item-title{
				font-size: 24rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 600;
				color: #333333;
				margin-top: 20rpx;
			}
			.item-desc{
				font-size: 20rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #666666;
				margin-top: 12rpx;
			}
		}
	}
</style>
