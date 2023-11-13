<template>
	<u-popup mode="center" bgColor="transparent" :show="show" @close="show=false">
		<view class="popup-content">
			<view class="title">恭喜，您得到了一个福袋！</view>
			<image class="image" src="/static/act/luckyBag/bag_open.png"></image>
			<view class="btn" @click="show=false">我知道了</view>
			<view class="tips">
				<image class="icon" src="/static/act/luckyBag/i.png"/>
				请在拼团完成后前往活动页面开启奖励
			</view>
		</view>
	</u-popup>
</template>

<script lang="ts">
	import { Component,PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@PropSync("popupShow",{type:Boolean})
		show!:Boolean
	}
</script>

<style lang="scss" scoped>
@mixin lineBox{
	width: 100%;
	box-sizing: border-box;
	display: flex;
}
@mixin font($size){
	font-size: $size;
	font-family: PingFang SC;
	font-weight: 600;
	color: #FFFFFF;
}
.popup-content{
	@include lineBox;
	width: 588rpx;
	flex-direction: column;
	align-items: center;
	.title{
		@include font(36rpx)
	}
	.image{
		width: 292rpx;
		height:235rpx;
		margin:56rpx 0 60rpx 0
	}
	.btn{
		@include font(40rpx);
		width: 480rpx;
		height: 110rpx;
		background: #FA1545;
		border-radius: 3rpx;
		text-align: center;
		line-height: 110rpx;
	}
	.tips{
		@include lineBox;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #E6E6E6;
		margin-top: 70rpx;
		justify-content: center;
		align-items: center;
		.icon{
			width: 24rpx;
			height:24rpx;
			margin-right: 10rpx;
		}
	}
}
</style>