<template>
	<view class="container">
		<view class="contestContainer">
			<view class="contest-teamCard-container uni-flex" style="margin-bottom: 65rpx;">
				<view class="contest-smallCard">
					<view class="contest-topScoreBoard uni-flex">
						<view class="avatar noneAvatar">
						</view>
						<view class="scoreContent">
							<view class="scoreContent-left none">0</view>
							<view class="scoreContent-right none">0</view>
						</view>
						<view class="avatar noneAvatar">
						</view>
					</view>
					<view class="contest-noStart">暂未开始</view>
				</view>
				<view class="contest-smallCard">
					<view class="contest-topScoreBoard uni-flex">
						<view class="avatar noneAvatar">
						</view>
						<view class="scoreContent">
							<view class="scoreContent-left none">0</view>
							<view class="scoreContent-right none">0</view>
						</view>
						<view class="avatar noneAvatar">
						</view>
					</view>
					<view class="contest-noStart">暂未开始</view>
					<!-- <view class="contest-supportButton">立即支持</view> -->
				</view>
				<view class="line lineOne"></view>
			</view>
			<view class="contest-teamCard-container uni-flex just-center" style="margin-bottom: 52rpx;">
				<view class="contest-smallCard">
					<view class="contest-topScoreBoard uni-flex">
						<view class="avatar noneAvatar">
						</view>
						<view class="scoreContent">
							<view class="scoreContent-left none">0</view>
							<view class="scoreContent-right none">0</view>
						</view>
						<view class="avatar noneAvatar">
						</view>
					</view>
					<view class="contest-noStart">暂未开始</view>
				</view>
			</view>
			<view class="contest-teamCard-container uni-flex just-center" style="margin-bottom: 55rpx;">
				<view class="contest-bigCard">
					<image src="../../../static/act/teamContest/bigVs.png" class="vsIcon" mode="widthFix"></image>
					<view class="contest-topScoreBoard uni-flex">
						<view class="avatar noneAvatar">
						</view>
						<view class="scoreContent">
							<view class="scoreContent-left none">0</view>
							<view class="scoreContent-right none">0</view>
						</view>
						<view class="avatar noneAvatar">
						</view>
					</view>
					<view class="contest-noStart">暂未开始</view>
				</view>
				<view class="line lineTwo"></view>
			</view>
			<view class="contest-teamCard-container uni-flex just-center" style="margin-bottom: 66rpx;">
				<view class="contest-smallCard">
					<view class="contest-topScoreBoard uni-flex">
						<view class="avatar noneAvatar">
						</view>
						<view class="scoreContent">
							<view class="scoreContent-left none">0</view>
							<view class="scoreContent-right none">0</view>
						</view>
						<view class="avatar noneAvatar">
						</view>
					</view>
					<view class="contest-noStart">暂未开始</view>
				</view>
			</view>
			<view class="contest-teamCard-container uni-flex">
				<view class="contest-smallCard">
					<view class="contest-topScoreBoard uni-flex">
						<view class="avatar noneAvatar">
						</view>
						<view class="scoreContent">
							<view class="scoreContent-left none">0</view>
							<view class="scoreContent-right none">0</view>
						</view>
						<view class="avatar noneAvatar">
						</view>
					</view>
					<view class="contest-noStart">暂未开始</view>
				</view>
				<view class="contest-smallCard">
					<view class="contest-topScoreBoard uni-flex">
						<view class="avatar noneAvatar">
						</view>
						<view class="scoreContent">
							<view class="scoreContent-left none">0</view>
							<view class="scoreContent-right none">0</view>
						</view>
						<view class="avatar noneAvatar">
						</view>
					</view>
					<view class="contest-noStart">暂未开始</view>
				</view>
				<view class="line lineThree"></view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Prop,
		Vue
	} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {

	}
</script>

<style lang='scss'>
	page {
		background-color: #472256;
	}

	.container {
		width: 750rpx;
		height: 1334rpx;
		background-size: 100% 100%;
		background-image: url(../../../static/act/teamContest/back_img.png);
	}



	.contestContainer {
		padding: 0 47rpx;
		padding-top: 240rpx;
		position: relative;
		padding-bottom: calc(134rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(134rpx + env(safe-area-inset-bottom));
	}

	.contest-teamCard-container {
		align-items: center;
		justify-content: space-between;
		position: relative;

		.line {
			background-size: 100% 100%;
			position: absolute;
			z-index: 1;
		}

		.lineOne {
			width: 408rpx;
			height: 102rpx;
			background-image: url(../../../static/act/teamContest/lineOne.png);
			bottom: -54rpx;
			left: 0;
			right: 0;
			margin: auto;
		}

		.lineTwo {
			width: 40rpx;
			height: 656rpx;
			background-size: 100% 100%;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background-image: url(../../../static/act/teamContest/lineTwo.png);
			position: absolute;
		}
		.lineThree{
			width: 408rpx;
			height: 102rpx;
			background-image: url(../../../static/act/teamContest/lineThree.png);
			top: -54rpx;
			left: 0;
			right: 0;
			margin: auto;
		}
	}

	.contest-smallCard {
		width: 296rpx;
		height: 148rpx;
		background: #FFFFFF;
		border-radius: 5rpx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		overflow: hidden;
		z-index: 2;
	}

	.contest-bigCard {
		width: 661rpx;
		height: 161rpx;
		background: #FFFFFF;
		border-radius: 5rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		overflow: hidden;
		z-index: 2;

		.vsIcon {
			width: 138rpx;
			height: 105rpx;
			position: absolute;
			left: -33rpx;
			top: -18rpx;
		}
	}

	.contest-topScoreBoard {
		margin: 0 auto;
		align-items: center;
		justify-content: center;
		position: relative;
		flex: 1;

		.avatar {
			width: 59rpx;
			height: 59rpx;
			background: #B7B7B7;
			border-radius: 50%;
			overflow: hidden;
			display: block;
			position: relative;
		}

		.noneAvatar::after {
			content: ' ';
			display: block;
			width: 29rpx;
			height: 40rpx;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			background-size: 100% 100%;
			background-image: url(../../../static/act/teamContest/smallVs.png);
		}

		.scoreContent {

			font-family: Impact;
			font-weight: 400;
			display: flex;
			margin: 0 31rpx;
			position: relative;

			&-left {
				color: #EF3333;
				font-size: 39rpx;
				margin-right: 30rpx;
			}

			&-right {
				font-size: 39rpx;
				color: #245BE7;
			}

			.none {
				color: #333333;
			}
		}

		.scoreContent::after {
			content: ':';
			position: absolute;
			font-size: 33rpx;
			font-family: Impact;
			font-weight: 400;
			color: #333333;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			text-align: center;
			margin: auto;
		}
	}

	.contest-supportButton {
		width: 100%;
		height: 54rpx;
		background: #EF3333;
		border-radius: 0px 0px 5rpx 5rpx;
		font-size: 27rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 54rpx;
		text-align: center;
		letter-spacing: 2rpx;
	}

	.contest-noStart {
		width: 100%;
		height: 53rpx;
		background: #B7B7B7;
		border-radius: 0px 0px 5rpx 5prx;
		font-size: 27rpx;
		font-family: PingFang SC;
		text-align: center;
		line-height: 53rpx;
		font-weight: 400;
		color: #595959;
		letter-spacing: 2rpx;
	}

	.just-center {
		justify-content: center;
	}
</style>
