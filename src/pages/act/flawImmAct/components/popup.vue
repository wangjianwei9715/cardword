<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-11-13 16:59:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-29 11:15:23
 * @FilePath: \jichao_app_2\src\pages\act\flawImmAct\components\popup.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<u-popup mode="center" :closeOnClickOverlay="false" :overlayOpacity="0.7" bgColor="transparent" :show="show" @close="onClose">
		<view class="popup-content">
			<view class="tipsTitle">温馨提示</view>
			<view class="title">您有已集齐未领取的卡片</view>
			<image class="image" src="/static/act/luckyBag/bag_open.png"></image>
			<view class="tips" style="position:relative;bottom:40rpx;" @click.stop="onClose">
				晚点再说
			</view>
			<view class="btn" @click="onClickBtn">去领取</view>
		</view>
	</u-popup>
</template>

<script lang="ts">
import { Component, PropSync, Prop } from "vue-property-decorator";
import BaseComponent from "@/base/BaseComponent.vue";
@Component({})
export default class ClassName extends BaseComponent {
	@PropSync("popupShow", { type: Boolean })
	show!: Boolean;
	@Prop({ default: 0 })
	type!: number;
	@Prop({ default: 0 })
	num!: number;

	onClickBtn(){
		uni.navigateTo({
			url: `/pages/act/flawImmAct/index`
		})
		this.onClose()
	}
	onClickNoShow(){
		this.$emit("noShow");
		this.show = false
	}
	onClose(){
		this.show = false
		this.$emit("close");
	}
}
</script>

<style lang="scss" scoped>
@mixin lineBox {
	width: 100%;
	box-sizing: border-box;
	display: flex;
}

@mixin font($size) {
	font-size: $size;
	font-family: PingFang SC;
	font-weight: 600;
	color: #FFFFFF;
}

.popup-content {
	@include lineBox;
	width: 588rpx;
	flex-direction: column;
	align-items: center;

	.title {
		@include font(42rpx)
	}
	.tipsTitle{
		color:#fff;
		font-weight:bold;
		@include font(30rpx);
		position:relative;
		bottom:12rpx;
	}
	.image {
		width: 292rpx;
		height: 235rpx;
		transform: scale(1.2);
		margin: 76rpx 0 100rpx 0
	}

	.btn {
		@include font(36rpx);
		width: 480rpx;
		height: 80rpx;
		background: #fdb927;
		border-radius: 3rpx;
		text-align: center;
		line-height: 80rpx;
		margin-top:30rpx;
	}

	.tips {
		@include lineBox;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #E6E6E6;
		justify-content: center;
		align-items: center;
		.icon {
			width: 24rpx;
			height: 24rpx;
			margin-right: 10rpx;
		}
	}
	.tips-btn{
		font-size: 28rpx;
		margin-top: 20rpx;
	}
}
</style>