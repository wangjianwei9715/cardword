<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-11-13 16:59:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-31 09:17:24
 * @FilePath: \jichao_app_2\src\pages\act\flawImmAct\components\popup.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<u-popup mode="center" :closeOnClickOverlay="false" :overlayOpacity="0.7" bgColor="transparent" :show="show" @close="onClose">
		<view class="popup-content">
			<image class="image" src="/static/act/immfl/popup.png"></image>
			<view class="btn" @click="onClickBtn"></view>
			<view class="close" @click="onClose"></view>
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
	width: 508rpx;
	height:900rpx;
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
		width: 508rpx;
		height: 471rpx;
		margin-left: -24rpx;
	}

	.btn {
		width: 379rpx;
		height:87rpx;
		margin:0 auto;
		background: url(@/static/act/immfl/popup_btn.png) no-repeat center / 100% 100%;
		margin-top: 33rpx
	}
	.close{
		width: 36rpx;
		height:36rpx;
		background: url(@/static/act/immfl/popup_close.png) no-repeat center / 100% 100%;
		margin:30rpx auto;
	}
}
</style>