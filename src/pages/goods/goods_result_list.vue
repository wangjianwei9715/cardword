<template>
	<view class="content">
		<view class="header-banner">
			<statusbar />
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
				<view :class="chooseId==0?'header-title':'header-title2'" @click="onClickGroupBookingResult()">拼团结果
					<view class="cross-line-down" v-if="chooseId==0" />
				</view>
				<view :class="chooseId==0?'header-title2':'header-title'" style="margin-left: 112rpx;"
					@click="onClickSplitCardsReport()">拆卡报告
					<view class="cross-line-down" v-if="chooseId==1" />
				</view>
			</view>
		</view>
		<view style="padding-top:88rpx">
			<statusbar />
		</view>

	</view>
</template>

<script lang="ts">
	import {
		Component
	} from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		chooseId = 0; //0代表选中拼团结果，展示下划线； 1代表选中拆卡报告，展示下划线 ；

		onLoad(query: any) {
			if (query.chooseIds) {
				console.log(query)
				this.chooseId = query.chooseIds;
			}
		}

		onClickBack() {
			uni.navigateBack({
				delta: 1
			});
		}

		onClickGroupBookingResult() {
			console.log('拼团结果')
			this.chooseId=0;
		}

		onClickSplitCardsReport() {
			console.log('拆卡报告')
			this.chooseId=1;
		}
	}
</script>

<style lang="scss">
	$font-32:32rpx;

	.header-banner {
		width: 100%;
		background: #fff;
		position: fixed;
		left: 0;
		top: 0;
		box-sizing: border-box;
		z-index: 10;
		// border-bottom: 1px solid #F4F3F2;

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
			font-size: $font-32;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #14151A;
			line-height: 88rpx;

			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.cross-line-down {
			width: 28rpx;
			height: 6rpx;
			background: #14151A;
			border-radius: 3rpx;
		}

		.header-title2 {
			font-size: $font-32;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #A9ABB4;
			line-height: 88rpx;

			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
</style>
