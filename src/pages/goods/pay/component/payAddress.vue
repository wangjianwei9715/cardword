<template>
	<view class="header" @click="onClickAddress">
		<view class="header-left">
			<view class="icon-address"></view>
			<view v-if="addressData != ''" class="header-address">
				<view class="address-name u-line-1" >{{ addressData.district }}{{ addressData.detail }}</view >
				<view class="address-desc" >{{ addressData.name }}{{ addressData.phone }}</view >
			</view>
			<view v-else class="header-address">
				<view class="address-tips">请选择收货地址</view>
			</view>
		</view>
		<button class="header-right"></button>
		<image class="header-order-line"  src="@/static/goods/v2/buy.png" />
	</view>
</template>

<script lang="ts">
	import { Component, Prop} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:{}})
		addressData!:any

		onClickAddress() {
			uni.navigateTo({
			url: "/pages/userinfo/setting_addresses?type=order",
			});
		}
	}
</script>

<style lang="scss">
.header {
	width: 100%;
	min-height: 180rpx;
	background: #fff;
	box-sizing: border-box;
	padding: 0 25rpx;
	border-bottom: 14rpx solid #f5f5f9;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	border-radius: 5rpx;
	margin-top: 14rpx;
}
.header-order-line{
	width: 100%;
	height:7rpx;
	position: absolute;
	bottom:0;
	left:0;
}
.header-left {
	width: 630rpx;
	min-height: 100rpx;
	box-sizing: border-box;
	display: flex;
}
.header-right {
	width: 12rpx;
	height:20rpx;
	background:url(@/static/pay/v2/right.png) no-repeat center / 100% 100%
}
.icon-address {
	width: 40rpx;
	height: 40rpx;
	background: url(@/static/pay/v2/address.png) no-repeat center;
	background-size: 100% 100%;
	margin-right: 10rpx;
	margin-top: 10rpx;
}
.header-address {
	width: 570rpx;
	height: 100rpx;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}
.address-desc {
	width: 100%;
	font-size: 24rpx;
	
	
	color: rgba(0,0,0,0.9);
}
.address-name {
	width: 100%;
	font-size: 32rpx;
	
	font-weight: 600;
	color: rgba(0,0,0,0.9);
}
.address-tips {
	height: 100rpx;
	line-height: 100rpx;
	font-size: 28rpx;
	
	font-weight: bold;
	color: #3b3b3b;
}
</style>
