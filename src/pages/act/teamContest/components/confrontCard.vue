<template>
	<view :class="{'contest-smallCard':!isBig,'contest-bigCard':isBig}">
		<image src="../../../../static/act/teamContest/bigVs.png" class="vsIcon" v-if='isBig' mode="widthFix"></image>
		<view class="contest-topScoreBoard uni-flex">
			<view class="avatar" :style='{backgroundImage:`url("${decodeURIComponent(propItem.avatar_1)}")`}'
				:class="{selectAvatar:propItem.supportTeam==1,noneAvatar:!propItem.avatar_1}">
			</view>
			<view class="scoreContent">
				<view class="scoreContent-left"
					:class="{none:scoreBothZero(propItem),red:includesDon_tForZero(propItem)}">
					{{propItem.score_1||0}}
				</view>
				<view class="scoreContent-right"
					:class="{none:scoreBothZero(propItem),blue:includesDon_tForZero(propItem)}">
					{{propItem.score_2||0}}
				</view>
			</view>
			<view class="avatar" :style='{backgroundImage:`url("${decodeURIComponent(propItem.avatar_2)}")`}'
				:class="{selectAvatar:propItem.supportTeam==2,noneAvatar:!propItem.avatar_2}">
			</view>
		</view>
		<view class="contest-noStart" v-if="propItem.supportTeam==-1&&!bothTeamFull(propItem)">暂未开始</view>
		<view class="contest-supportButton" v-if="bothTeamFull(propItem)&&propItem.supportTeam==0"
			@click="actionSupot(propItem)">
			立即支持</view>
		<view class="contest-proportion" v-if="supportability(propItem)">
			<view class="proportionBlock contest-proportion-left">
			</view>
			<view class="proportionBlock contest-proportion-right">
			</view>
			<view class="support-percent support-percent-left">
				<text>{{caclPercent(propItem.supportNum_1,propItem.supportNum_2)}}%</text>
				<text>{{formatNumber(propItem.supportNum_1,2)}}人支持</text>
			</view>
			<view class="support-percent support-percent-right">
				<text>{{caclPercent(propItem.supportNum_2,propItem.supportNum_1)}}%</text>
				<text>{{formatNumber(propItem.supportNum_2,2)}}人支持</text>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		app
	} from "@/app";
	import {
		Component,
		Prop,
		Vue
	} from "vue-property-decorator";
	import {
		formatNumber
	} from '@/tools/util'
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({
			default: () => {
				return {}
			}
		})
		item: any;
		@Prop({ default: false })
		isBig?: boolean;

		copyItem: any = {}
		formatNumber: any = formatNumber;
		mounted() {}
		actionSupot(item: any) {
			if (app.token.accessToken == "") {
				uni.navigateTo({
					url: "/pages/login/login"
				});
				return;
			}
			this.$emit('onClickSup', item)
		}
		//计算百分比
		caclPercent(num1: number, num2: number) {
			if (num1 || num1 + num2 == 0) return 0
			const num = (num1 * 100 / (num1 + num2)).toFixed(2)
			return num
		}
		//是展示比例界面
		supportability(item: any) {
			if (item.supportTeam == undefined) return false
			return this.bothTeamFull(item) && item.supportTeam != 0
		}
		//两只队伍信息是否都完整存在
		bothTeamFull(item: any) {
			return item.name_1 && item.name_2 && item.avatar_1 && item.avatar_2
		}
		//分值是否都为0
		scoreBothZero(item: any) {
			return !item.score_1 && !item.score_2
		}
		//是否有一支队伍分数不为0
		includesDon_tForZero(item: any) {
			return item.score_1 || item.score_2
		}
		private get propItem() {
			return this.item
		}
	}
</script>

<style lang='scss'>
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
			background-color: #B7B7B7;
			border-radius: 50%;
			background-size: 100% 100%;
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
			background-image: url(../../../../static/act/teamContest/smallVs.png);
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
			width: calc(50% - 18rpx);
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
</style>
