<template>
	<view>
		<view class="header-banner">
			<statusbar />
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
				<view class="header-title"></view>
				精英收藏卡
				<view class="header-icon">
					<!-- <view :class="['icon-collect',{'icon-favored':favorType}]" @click="onClickFavor"></view> -->
					<view class="icon-share" @click="onClickShare"></view>
				</view>
			</view>
		</view>
		<view style="padding-top:88rpx">
			<statusbar />
		</view>
		<!-- <view class="back"></view> -->
		<image class='back' src='../../static/mall/content.jpg' mode='widthFix'></image>
		<view class="button" @click='onClickGo'>卡币商城特惠兑换GO</view>
		<share :operationShow="operationShow" :shareData="shareData" @operacancel="onClickShareCancel" />
	</view>
</template>

<script lang='ts'>
	import {
		app
	} from "@/app";
	import {
		Component
	} from "vue-property-decorator";
	import BaseNode from "../../base/BaseNode.vue";
	import {
		mallExchangeRule
	} from "@/net/DataRules";
	import {
		toThousands
	} from "@/tools/util";
	@Component({})
	export default class ClassName extends BaseNode {
		// 分享
		operationShow = false;
		shareData: any = {
			shareUrl: '',
			title: '',
			summary: '',
			thumb: ''
		}
		operationCardShow = false;
		// 分享
		onClickShare() {
			if (!this.operationShow) {
				if (this.shareData.shareUrl == '') {
					this.shareData = {
						shareUrl: "https://www.ka-world.com/share/h5/#/pages/act/mallDiscount",
						title:'精英收藏卡',
						summary:'精英收藏卡',
						thumb: 'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.07.01/template/0/16566434613160af8woxid.png'
					}
				}
				this.operationShow = true
			}
		}
		onClickShareCancel() {
			this.operationShow = false
		}
		onClickBack() {
			uni.navigateBack({
				delta: 1
			});
		}
		onClickGo(){
			uni.navigateTo({
				url:'/pages/mall/index'
			})
		}
	}
</script>

<style lang='scss'>
	$color-F:#ffffff;
	$font-20:20rpx;
	$font-22:22rpx;
	$font-24:24rpx;
	$font-28:28rpx;
	$font-34:34rpx;
	$font-40:40rpx;
	$font-60:60rpx;

	.back {
		width: 100%;
		/* 		background-size:100% 100%;
		background-image:url() */
	}

	.button {
		width: 678rpx;
		height: 108rpx;
		background: linear-gradient(0deg, #B81B1B 0%, #EF3333 44%, #FF7E7E 100%);
		border-radius: 3rpx;
		color: #fff;
		text-align: center;
		font-size: 33rpx;
		font-family: Alibaba PuHuiTi;
		font-weight: bold;
		line-height: 108rpx;
		letter-spacing: 4rpx;
		position: fixed;
		bottom: calc(30rpx + env(safe-area-inset-bottom));
		z-index: 9;
		left:0;right:0;margin:auto;
	}

	.header-banner {
		width: 100%;
		background: #fff;
		position: fixed;
		left: 0;
		top: 0;
		box-sizing: border-box;
		z-index: 10;
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
			width: 80rpx;
			height: 88rpx;
			background: url(../../static/goods/back@2x.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			left: 0;
			top: 0;
		}

		.header-title {
			height: 88rpx;
			line-height: 88rpx;
			/* font-size: $font-34; */
			font-size: 34rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
		}

		.header-icon {
			height: 88rpx;
			display: flex;
			align-items: center;
			position: absolute;
			right: 40rpx;
			top: 0;
		}

		.icon-collect {
			width: 44rpx;
			height: 41rpx;
			background: url(../../static/goods/v2/icon_collect.png) no-repeat center;
			background-size: 100% 100%;
			margin-right: 40rpx;
		}

		.icon-favored {
			background: url(../../static/goods/v2/icon_collect_.png) no-repeat center;
			background-size: 100% 100%;
		}

		.icon-share {
			width: 38rpx;
			height: 37rpx;
			background: url(../../static/goods/v2/icon_share.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
</style>
