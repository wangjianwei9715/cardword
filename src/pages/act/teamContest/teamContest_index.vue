<template>
	<view class="container">
		<view class="rightFloat" style="top:20rpx;">
			<text>规则</text>
		</view>
		<view class="topImage">

		</view>
		<view class="topTisp">每次猜对获得2点欧气，每轮比赛进行2场后不可再猜测</view>
		<view class="contestContainer">
			<view class="contest-teamCard-container uni-flex" style="margin-bottom: 66rpx;">
				<view class="contest-smallCard">
					<view class="contest-topScoreBoard uni-flex">
						<view class="avatar selectAvatar">
						</view>
						<view class="scoreContent">
							<view class="scoreContent-left none red">1</view>
							<view class="scoreContent-right none blue">1</view>
						</view>
						<view class="avatar noneAvatar">
						</view>
					</view>
					<!-- <view class="contest-noStart">暂未开始</view> -->
					<!-- <view class="contest-supportButton" @click="modalShow=true">立即支持</view> -->
					<view class="contest-proportion">
						<view class="proportionBlock contest-proportion-left">
						</view>
						<view class="proportionBlock contest-proportion-right">
						</view>
						<view class="support-percent support-percent-left">
							<text>20%</text>
							<text>222人支持</text>
						</view>
						<view class="support-percent support-percent-right">
							<text>80%</text>
							<text>888人支持</text>
						</view>
					</view>
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
					<!-- <view class="contest-noStart">暂未开始</view> -->
					<view class="contest-supportButton" @click="modalShow=true">立即支持</view>
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
		<view class="confirmModal" :class="{confirmModalShow:modalShow}">
			<view class="close" @click="modalShow=false"></view>
			<view class="tips">请选择您支持的球队</view>
			<view class="chioceContainer">
				<view class="teamChoice">篮网</view>
				<view class="teamChoice">凯尔特人</view>
			</view>
		</view>
		<view class="ruleModal" v-show="ruleShow">
			<view class="close" @click="ruleShow=false"></view>
			<view class="rule-title">规则说明</view>
			<view class="rule-particulars">
				<text>1.NBA季候赛期间，玩家在活动页面支持自己喜爱的球队就可免费获得欧气</text><br>
				<text>2.欧气获取：</text><br>
				<text>1) 首次分享活动页+5欧气数 (限1次)</text>
			</view>
		</view>
		<view class="mask" v-show="modalShow||ruleShow"></view>
		<view class="bottomContainer">
			<view class="bottom-button share">
				<text>分享</text>
				<text>首次分享欧气+5</text>
			</view>
			<view class="bottom-button goLoot" @click="pageJump('/pages/act/loot/index')">前往欧皇夺宝</view>
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
		modalShow: boolean = false; 
		ruleShow: boolean = false;
		//计算百分比
		caclPercent(){
			
		}
		pageJump(url: string) {
			if (!url) return
			uni.navigateTo({
				url
			})
		}
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

		.rightFloat {
			width: 100rpx;
			height: 96rpx;
			position: absolute;
			right: 4rpx;
			background-size: 100% 100%;
			background-image: url(../../../static/act/goldRank/active_rule.png);
			font-size: 20rpx;
			font-family: Alibaba PuHuiTi;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
			letter-spacing: 2rpx;
			line-height: 96rpx;

			text {
				/* position: relative;
				top: 30rpx; */
			}
		}
	}

	.topImage {
		width: 680rpx;
		height: 210rpx;
		background-size: 100% 100%;
		position: relative;
		background-image: url(../../../static/act/teamContest/top.png);
		position: relative;
		right: 36rpx;

	}

	.topTisp {
		text-align: center;
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		position: relative;
		letter-spacing: 2rpx;
		margin-bottom: 13rpx;
	}

	.contestContainer {
		/* padding: 0 47rpx; */
		width:660rpx ;
		margin: 0 auto;
		position: relative;
		padding-bottom: calc(140rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
	}

	.bottomContainer {
		width: 750rpx;
		background-size: 100% 100%;
		position: fixed;
		bottom: 0;
		background-image: url(../../../static/act/teamContest/white_bottom.png);
		height: calc(124rpx + constant(safe-area-inset-bottom));
		height: calc(124rpx + env(safe-area-inset-bottom));
		z-index: 3;
		display: flex;
		justify-content: center;

		.bottom-button {
			width: 343rpx;
			height: 78rpx;
			border-radius: 3rpx;
			letter-spacing: 2rpx;
			margin-top: 22rpx;
		}

		.share {
			border: 2rpx solid #DADADA;
			margin-right: 22rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			text {
				font-family: Alibaba PuHuiTi;
				color: #5E5D5D;
				font-weight: 400;
				display: block;
				width: 100%;
				text-align: center;
			}

			text:first-child {
				font-size: 31rpx;
			}

			text:last-child {
				font-size: 21rpx;
			}

		}

		.goLoot {
			background: #EF3333;
			font-size: 33rpx;
			font-family: Alibaba PuHuiTi;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
			line-height: 78rpx;
		}
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

		.lineThree {
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

			display: block;
			position: relative;
		}

		.noneAvatar::after {
			content: '';
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

		.selectAvatar::after {
			content: '';
			display: block;
			width: 68rpx;
			height: 68rpx;
			border: 2rpx solid #EF3333;
			border-radius: 50%;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
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

			.red {
				color: #EF3333;
			}

			.blue {
				color: #245BE7;
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

	.contest-proportion {
		width: 100%;
		height: 53rpx;
		background-color: #fff;
		overflow: hidden;
		display: flex;

		.proportionBlock {
			height: 53rpx;
			position: absolute;
		}

		&-left {
			background-color: #ff0023;
			left: 0;
			text-align: left;
			width:calc(50% - 18rpx);
			z-index: 2;

		}

		&-left::after {
			content: '';
			display: block;
			width: 0;
			position: absolute;
			height: 0;
			border-color: #ff0023 transparent transparent transparent;
			border-style: solid;
			border-width: 53rpx 36rpx 0 0;
			right: -35rpx;
			top: 0;
			z-index: 1;
		}

		&-right {
			background-color: #005df0;
			right: 0;
			width: calc(50% - 18rpx);
			text-align: right;

			text {
				margin-right: 10rpx;
			}
		}

		&-right::after {
			content: '';
			display: block;
			width: 0;
			position: absolute;
			height: 0;
			border-color: transparent #005df0 transparent transparent;
			border-style: solid;
			border-width: 53rpx 36rpx 0 0;
			left: -35rpx;
		}

		.support-percent {
			position: absolute;
			width: 50%;
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			display: flex;
			flex-direction: column;
			justify-content: center;
			height: 53rpx;
			z-index: 3;
			position: absolute;
			white-space: nowrap;
			line-height: 24rpx;
		}

		.support-percent-left {
			text-align: left;
			left: 14rpx;
		}

		.support-percent-right {
			text-align: right;
			right: 14rpx;
		}
	}

	.mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 8;
	}

	.confirmModal {
		width: 516rpx;
		height: 317rpx;
		background: #FFFFFF;
		border-radius: 5rpx;
		position: fixed;
		left: 0;
		right: 0;
		margin: auto;
		top: 447rpx;
		z-index: 9;
		opacity: 0;
		transform: scale(0);
		transition: all 0.3s;

		.close {
			width: 36rpx;
			height: 33rpx;
			background-size: 100% 100%;
			background-image: url(../../../static/act/teamContest/close.png);
			position: absolute;
			top: -75rpx;
			right: 0;
		}

		.tips {
			text-align: center;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-top: 89rpx;
		}

		.chioceContainer {
			padding: 0 27rpx;
			display: flex;
			justify-content: space-between;
			margin-top: 57rpx;

			.teamChoice {
				width: 221rpx;
				height: 65rpx;
				background: #E13737;
				border-radius: 3rpx;
				text-align: center;
				font-size: 29rpx;
				font-family: FZLanTingHeiS-R-GB;
				font-weight: 400;
				color: #FFFFFF;
				letter-spacing: 2rpx;
				line-height: 65rpx;
			}
		}
	}

	.confirmModalShow {
		opacity: 1;
		transform: scale(1);
	}

	.ruleModal {
		width: 750rpx;
		height: calc(950rpx + constant(safe-area-inset-bottom));
		height: calc(950rpx + env(safe-area-inset-bottom));
		background: #FFFFFF;
		border-radius: 5rpx 5rpx 0px 0px;
		position: fixed;
		bottom: 0;
		z-index: 9;

		.close {
			width: 29rpx;
			height: 27rpx;
			background-size: 100% 100%;
			background-image: url(../../../static/act/teamContest/black_close.png);
			position: absolute;
			top: 23rpx;
			right: 23rpx;
		}

		.rule-title {
			font-size: 42rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
			margin: 30rpx 0;
			text-align: center;
		}

		.rule-particulars {
			padding: 0 35rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #7D8288;

		}
	}

	.just-center {
		justify-content: center;
	}
</style>
