<template>
	<view>
		<view class="header-banner" :style="{ backgroundColor: backgroundColor,borderBottom:borderBottom }">
			<view class="content" :style="'height:' + statusBarHeight + 'px'"></view>
			<view class="tab-header">
				<view class="icon-back" :style="{color:backColor}" @click="onClickBack">&#xe582;</view>
				<view class="header-title">{{ title }}</view>
				<view class="header-icon" v-if="custom">
					<slot name="right"></slot>
				</view>
				<view class="icon-share" v-else-if='shareData' @click="onClickShare"></view>
				<view class='right-text' v-else @click="onClickRightText">{{ rightText }}</view>
			</view>
			<slot name="bottom"></slot>
		</view>
		<view :style="{ height: 88 + 'rpx', paddingTop: statusBarHeight + 'px' }"></view>
		<share v-if='shareData' :operationShow="operationShow" :shareData="shareData" @operacancel="onClickShareCancel">
		</share>
	</view>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseComponent from "@/base/BaseComponent.vue";
import { app } from "@/app";
@Component({})
export default class navigationbar extends BaseComponent {
	@Prop({ default: '' })
	title!: string;
	@Prop({ default: false })
	custom?: Boolean;
	@Prop({ default: '' })
	shareData?: any;
	@Prop({ default: '' })
	rightText?: string;
	@Prop({ default: '#ffffff' })
	backgroundColor?: string;
	@Prop({ default: '1px solid #F4F3F2' })
	borderBottom?:string
	@Prop({ default: '#000' })
	backColor?:string
	operationShow = false;
	statusBarHeight = app.statusBarHeight;
	created() {//在实例创建完成后被立即调用
	}
	mounted() {//挂载到实例上去之后调用

	}
	destroyed() {

	}
	onClickBack() {
		app.platform.pageBack()
	}
	// 分享
	onClickShare() {
		if (!this.operationShow) {
			this.operationShow = true
		}
	}
	onClickShareCancel() {
		this.operationShow = false
	}
	onClickRightText() {
		this.$emit('onClickRightText')
	}
}
</script>

<style lang="scss">
.header-banner {
	width: 100%;
	background: #fff;
	position: fixed;
	left: 0;
	top: 0;
	box-sizing: border-box;
	z-index: 20;
	border-bottom: 1px solid #F4F3F2;

	.tab-header {
		width: 100%;
		height: 88rpx;
		display: flex;
		box-sizing: border-box;
		padding: 0 30rpx;
		position: relative;
		z-index: 10;
		align-items: center;
		justify-content: center;
	}

	.icon-back {
		position: absolute;
		left: 18rpx;
		top: 50%;
		margin-top: -25rpx;
		width: 50rpx;
		height: 50rpx;
		background-color: rgba(255, 255, 255,0);
		font-family: uniicons;
		font-size: 46rpx;
		font-weight: normal;
		font-style: normal;
		color: #000;
	}

	.header-title {
		height: 88rpx;
		line-height: 80rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
	}

	.icon-share {
		width: 38rpx;
		height: 37rpx;
		position: absolute;
		right: 32rpx;
		top: 50%;
		margin-top: -19rpx;
		background: url(../../static/goods/v2/icon_share.png) no-repeat center;
		background-size: 100% 100%;
	}

	.right-text {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		position: absolute;
		right: 32rpx;
	}

	.header-icon {
		height: 88rpx;
		display: flex;
		align-items: center;
		position: absolute;
		right: 40rpx;
		top: 0;
	}
}</style>
