<template>
	<view>
		<view class="liveItem">
			<view class="liveItem-top uni-flex">
				<image class='avatar'></image>
				<view class="name">卡皇球星社</view>
			</view>
			<view class="liveItem-message uni-flex">
				<image class="goodsImage"></image>
				<view class="live-right">
					<view>
						<view class='goodsName'>20-21 panini prizm prizm...</view>
						<view class='startTime'>开播时间：04-05 11:11:11</view>
					</view>
					<view class='uni-flex' style='justify-content: space-between;align-items:center'>
						<view class='state'>待直播</view>
						<view class='startButton'>进入直播间</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		app
	} from "@/app";
	import {
		Component
	} from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		dataList: any = []
		onLoad() {

		}
	}
</script>

<style lang='scss'>
	.liveItem {
		padding: 0 26rpx;
		margin-top: 33rpx;
	}

	.liveItem-top {
		align-items: center;

		.avatar {
			width: 48rpx;
			height: 48rpx;
			background: #D9D8DB;
			display: block;
			border-radius: 50%;
		}

		.name {
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
			margin-left: 17rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.liveItem-message {
		margin-top: 13rpx;
		justify-content: space-between;

		.goodsImage {
			width: 188rpx;
			height: 188rpx;
			background: #333333;
			border-radius: 3rpx;
			display: block;
		}

		.live-right {
			width: 69%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		.goodsName {
			font-size: 29rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.startTime {
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #88878C;
			margin-top: 18rpx;
		}
		.startButton{
			width: 161rpx;
			height: 52rpx;
			background: #F5162B;
			border-radius: 3rpx;
			text-align:center;
			line-height:52rpx;
			color:#fff;
		}
		.state{
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}
	}
</style>
