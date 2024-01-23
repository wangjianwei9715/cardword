<template>
	<view>
		<view class="bottom-gm">
			<view class="bottom-gm-title" @click="onClickCheck">
			<view class="bottom-gm-gx" :class="{ 'bottom-gm-check': gmCheck }"></view>购买须知:
			</view>
			<view class="bottom-gm-tips">
				除拼团时限届满未满员外，所购商品因其商品属及价值特性，不支持退款、退货服务。本次拼团可能存在未中卡情形，请卡迷理解
				<view class="bottom-gm-btn" @click="operationCardShow = true">查看详情<text>《购买须知》</text></view>
			</view>
		</view>
		
		<cardplay
			:operationShow="operationCardShow"
			:operaType="3"
			@operacancel="operationCardShow=false"
		/>
	</view>
</template>

<script lang="ts">
	import { Component, PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@PropSync('check',{type:Boolean})
		gmCheck!:Boolean

		operationCardShow = false;
		onClickCheck(){
			uni.setStorageSync("confirmPurchaseNotes",!this.gmCheck);
			this.gmCheck = !this.gmCheck;
		}
		onClickAddress() {
			uni.navigateTo({
				url: "/pages/userinfo/setting_addresses?type=order",
			});
		}
	}
</script>

<style lang="scss">
.bottom-gm {
	width: 100%;
	background: #FFF;
	box-sizing: border-box;
	border-top: 13rpx solid #F6F7FB;
	padding: 35rpx 20rpx;
	border-radius: 5rpx;
	.bottom-gm-title {
		width: 100%;
		height: 40rpx;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		font-family: PingFangSC;
		font-weight: 600;
		color: #333333;
	}
	.bottom-gm-gx {
		width: 28rpx;
		height: 28rpx;
		background: url(@/static/userinfo/weixuan@2x.png) no-repeat center;
		background-size: 100% 100%;
		margin-right: 10rpx;
	}
	.bottom-gm-check {
		width: 28rpx;
		height: 28rpx;
		background: url(@/static/userinfo/pay_gou.png) no-repeat center;
		background-size: 100% 100%;
		margin-right: 10rpx;
	}
	.bottom-gm-tips {
		width: 100%;
		font-size: 20rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(153,153,153,0.9);
		line-height: 28rpx;
		margin-top: 10rpx;
	}
	.bottom-gm-btn {
		font-size: 26rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: #88878C;
		line-height: 28rpx;
		margin-top: 10rpx;
	}
	.bottom-gm-btn text{
		font-size: 26rpx;
		font-family: PingFangSC;
		font-weight: 600;
		color: #333333;
	}
	.bottom-gm-right {
		width: 10rpx;
		height: 16rpx;
		background: url(@/static/goods/jinru@2x.png) no-repeat center;
		background-size: 100% 100%;
		margin-left: 6rpx;
	}
}

</style>
