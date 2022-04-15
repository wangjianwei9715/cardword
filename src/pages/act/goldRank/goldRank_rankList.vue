<template>
	<view>
		<view class="topBanner">
			<view class="topTitle"></view>
			<view class="rightFloat" @click="pageJump('/pages/act/goldRank/goldRank_rule')">
				<text>活动<br>规则</text>
			</view>
			<view class="rightFloat" style="top: 140rpx;" @click="pageJump('/pages/act/goldRank/goldRank_record')">
				<text>往期<br>记录</text>
			</view>
		</view>
		<view class="rollStaticContent">
			<view class="rollContent" id='rollContent'>
				<view class="rollItem" v-for="(item,index) in 20">
					<image src="../../../static/act/goldRank/topBanner.png" mode="aspectFill">
					</image>
				</view>
				<view class="rollItem" v-for="(item,index) in 20">
					<image src="../../../static/act/goldRank/topBanner.png" mode="aspectFill">
					</image>
				</view>
			</view>
		</view>
		<view class="tips">·金卡积分=金卡x卡密单价</view>
		<view class="tagContent">
			<view class="tagContent-item">
				<view class="tagName">金卡积分日榜</view>
				<view class="smallName">倒计时: {{countDown(endTimeStamp)}}</view>
			</view>
			<view class="tagContent-item">
				<view class="tagName">金卡积分总榜</view>
				<view class="smallName">活动时间: 4.20-5.4 </view>
			</view>
			<view class="luxuryGifts"><text>豪礼</text></view>
		</view>
		<view class="rankContent">
			<image src="../../../static/act/goldRank/despite_light.png" class="light" mode="widthFix"></image>
			<view class="rankContent-despite">
				<!-- 第一名 -->
				<view class="topThreeItem rankOne">
					<view class="frame">
						<view class="avartContainer">
							<image
								src="https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.04.15/loot/loot_sw/0/1650011575014s6jqldisvv.jpg"
								mode=""></image>
						</view>
						<image src="../../../static/act/goldRank/rank_one.png" mode="widthFix"></image>
					</view>
					<view class="prizewinner">二***蛋</view>
					<view class="integral uni-flex">
						<image src="../../../static/act/goldRank/integral_icon.png" mode="widthFix"></image>
						<text>{{formatNumber(1000,2)}}</text>
					</view>
					<view class="prizeName">150元卡券分享</view>
				</view>
				<!-- 第二名 -->
				<view class="topThreeItem rankTwo">
					<view class="frame">
						<view class="avartContainer">
							<image
								src="https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.04.15/loot/loot_sw/0/1650011575014s6jqldisvv.jpg"
								mode=""></image>
						</view>
						<image src="../../../static/act/goldRank/rank_two.png" mode="widthFix"></image>
					</view>
					<view class="prizewinner">二***蛋</view>
					<view class="integral uni-flex">
						<image src="../../../static/act/goldRank/integral_icon.png" mode="widthFix"></image>
						<text>{{formatNumber(1000,2)}}</text>
					</view>
					<view class="prizeName">150元卡券分享</view>
				</view>
				<!-- 第三名 -->
				<view class="topThreeItem rankThree">
					<view class="frame">
						<view class="avartContainer">
							<image
								src="https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.04.15/loot/loot_sw/0/1650011575014s6jqldisvv.jpg"
								mode=""></image>
						</view>
						<image src="../../../static/act/goldRank/rank_three.png" mode="widthFix"></image>
					</view>
					<view class="prizewinner">二***蛋</view>
					<view class="integral uni-flex">
						<image src="../../../static/act/goldRank/integral_icon.png" mode="widthFix"></image>
						<text>{{formatNumber(1000,2)}}</text>
					</view>
					<view class="prizeName">150元卡券分享</view>
				</view>

			</view>
			<view class="residueRank uni-flex" v-for="(item,index) in 97" :key='index'>
				<view class="residueRank-index">{{index+4}}</view>
				<image class="residueRank-avart"
					src="https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.04.15/loot/loot_sw/0/1650011575014s6jqldisvv.jpg">
				</image>
				<view class="residueRank-name oneLineOver">短*{{index*20}}笛</view>
				<view class="integral uni-flex" style="flex: 1;justify-content: start;margin-top: 0;">
					<image src="../../../static/act/goldRank/integral_icon.png" mode="widthFix" style="width: 22rpx;">
					</image>
					<text>{{formatNumber((97-index)*100,2)}}</text>
				</view>
				<view class="residueRank-prize oneLineOver">150元卡券分享</view>
			</view>
		</view>
		<view class="noneBlock"></view>
		<view class="bottomBlock">
			<view class="bottomBlock-rank white">未上榜</view>
			<image class="bottomBlock-avart"
				src="https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.04.15/loot/loot_sw/0/1650011575014s6jqldisvv.jpg"
				mode=""></image>
			<view class="bottomBlock-me white">我</view>
			<view class="integral uni-flex" style="flex: 1;justify-content: start;margin-top: 0;">
				<image src="../../../static/act/goldRank/integral_icon.png" mode="widthFix">
				</image>
				<text style="font-size: 28rpx;">{{formatNumber(1000,2)}}</text>
			</view>
			<view class="bottomBlock-prize white">——</view>
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
		Vue,
		Watch
	} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {
		dateFormatMSHMS,
		formatNumber,
		countDown
	} from '@/tools/util.ts'
	@Component({})
	export default class ClassName extends BaseComponent {
		queryParams: any = {
			tp: 1 //1 今日榜单数据，2 总榜数据
		};
		endTimeStamp: number = 0;
		countDown: any = countDown;
		dateTimer: any = 0;
		nowDateStamp: number = +new Date() / 1000;
		formatNumber: any = formatNumber;
		tag: any = {
			index: 0,
			list: [{
				name: '今日榜单',
				value: 1
			}, {
				name: '积分总榜',
				value: 2
			}]
		}
		awardList: any = []; //奖品列表
		myData: any = {}; //个人rank数据
		rankList: any = [];
		onLoad() {
			this.$nextTick(() => {
				const query: any = uni.createSelectorQuery().in(this);
				query.select('#rollContent').boundingClientRect((data: any) => {
					console.log(data.width)
				}).exec();
				this.startCountDown()
			})
		}
		tagChange(item: any, index: number) {
			this.tag.index = index
			this.queryParams.tp = item.value
			this.reqNewData(false)
		}
		startCountDown() {
			this.dateTimer && clearInterval(this.dateTimer)
			this.endTimeStamp = Math.round((new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 -
				1) / 1000)
			// this.dateTimer = setInterval(() => {
			// 	this.nowDateStamp = +new Date() / 1000
			// })
		}
		pageJump(url: string) {
			if (!url) return
			uni.navigateTo({
				url
			})
		}
		//获取rank榜以及个人rank数据
		reqNewData(isRefreshAward: boolean = true) {
			app.http.Get(
				"activity/goodNoShowGoldValue/home",
				this.queryParams,
				(res: any) => {
					this.rankList = res.rankingList || []
					if (isRefreshAward) this.awardList = res.awardList || []
					this.myData = res.myData || {}
					setTimeout(() => {
						uni.stopPullDownRefresh();
					}, 500);
				}
			);
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #1b1263;
	}

	.noneBlock {
		width: 750rpx;
		opacity: 0;
		height: calc(123rpx + constant(safe-area-inset-bottom));
		height: calc(123rpx + env(safe-area-inset-bottom));
	}

	.bottomBlock {
		width: 750rpx;
		height: 123rpx;
		background-size: 100% 100%;
		background-image: url(../../../static/act/goldRank/bottom.png);
		position: fixed;
		bottom: 0;
		padding-bottom: calc(0rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(0rpx + env(safe-area-inset-bottom));
		display: flex;
		// padding-right:28rpx;
		align-items: center;

		.white {
			color: #fff;
			font-size: 30rpx;
			font-family: Alibaba PuHuiTi;
			font-weight: bold;

		}

		&-rank {
			text-align: center;
			width: 23%;
		}

		&-avart {
			width: 60rpx;
			height: 60rpx;
			display: block;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 36rpx;
		}

		&-me {
			margin-right: 60rpx;
		}

		&-prize {
			text-align: center;
			width: 34%;
		}
	}

	.topBanner {
		width: 750rpx;
		height: 652rpx;
		position: relative;
		background-size: 100% 100%;
		background-image: url(../../../static/act/goldRank/topBanner.png);

		.topTitle {
			background-size: 100% 100%;
			background-image: url(../../../static/act/goldRank/topBanner.png);
		}

		.rightFloat {
			width: 118rpx;
			height: 114rpx;
			position: absolute;
			right: 4rpx;
			top: 4rpx;
			background-size: 100% 100%;
			background-image: url(../../../static/act/goldRank/active_rule.png);
			font-size: 24rpx;
			font-family: Alibaba PuHuiTi;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
			letter-spacing: 2rpx;
			line-height: 30rpx;

			text {
				position: relative;

				top: 26rpx;
			}
		}
	}

	.rollStaticContent {
		width: 750rpx;
		height: 208rpx;
		background-size: 100% 100%;
		background-image: url(../../../static/act/goldRank/roll_back.png);
		overflow: hidden;
	}

	.tips {
		text-align: center;
		color: #fff;
		letter-spacing: 3rpx;
		font-size: 20rpx;
		// font-weight: bold;
		margin: 14rpx auto;
		font-family: Alibaba PuHuiTi;
	}

	.tagContent {
		width: 694rpx;
		height: 91rpx;
		background-size: 100% 100%;
		margin: 20rpx auto;
		background-image: url(../../../static/act/goldRank/tag_one.png);
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.tagContent-item {
			height: 91rpx;
			width: 300rpx;
			text-align: center;
			color: #fff;
			font-family: Alibaba PuHuiTi;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.tagName {
				font-weight: bolder;
				font-size: 34rpx;
			}

			.smallName {
				font-size: 18rpx;
			}
		}

		.luxuryGifts {
			position: absolute;
			right: 0;
			top: 2rpx;
			width: 81rpx;
			height: 87rpx;
			background-size: 100% 100%;
			background-image: url(../../../static/act/goldRank/luxuryGifts.png);
			font-family: Alibaba PuHuiTi;
			font-size: 20rpx;
			color: #fff;

			text {
				display: block;
				transform: rotate(45deg);
				letter-spacing: 2rpx;
				position: absolute;
				right: 4rpx;
				top: 2rpx;
			}
		}
	}

	.integral {
		align-items: center;
		justify-content: center;
		margin-top: 12rpx;

		image,
		text {
			display: block;
		}

		image {
			width: 27rpx;
			height: 28rpx;
			margin-right: 6rpx;
		}

		text {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 300;
			color: #FFFFFF;
		}
	}

	.rankContent {
		width: 694rpx;
		background-size: 100% 100%;
		margin: 0rpx auto;
		background-image: url(../../../static/act/goldRank/klein_back.png);
		padding: 20rpx 0;
		position: relative;

		.light {
			width: 694rpx;
			position: absolute;
			top: 0;
		}

		.residueRank {
			width: 656rpx;
			margin: 0 auto;
			align-items: center;
			height: 120rpx;
			position: relative;

			&-index {
				width: 15%;
				font-weight: bold;
				font-size: 36rpx;
				color: #eaa73b;
				text-align: center;
			}

			&-avart {
				width: 56rpx;
				height: 56rpx;
				display: block;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 36rpx;
			}

			&-name {
				color: #fff;
				// text-align: center;
				font-weight: 500;
				font-size: 26rpx;
				width: 23%;
				// text-align: center;
			}

			&-prize {
				text-align: right;
				color: #fff;
				width: 34%;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 300;
				color: #FFFFFF;
			}
		}

		.residueRank::after {
			content: '';
			display: block;
			width: 640rpx;
			height: 2rpx;
			background-size: 100% 100%;
			background-image: url(../../../static/act/goldRank/rank_line.png);
			position: absolute;
			left: 50%;
			transform: translate(-50%, 0);
			bottom: 0;
		}



		&-despite {
			width: 656rpx;
			height: 546rpx;
			background-size: 100% 100%;
			margin: 0rpx auto;
			background-image: url(../../../static/act/goldRank/despite.png);
			position: relative;

			.topThreeItem {
				position: absolute;
				width: 155rpx;

				.frame {
					width: 155rpx;
					height: 155rpx;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;

					.avartContainer {
						width: 110rpx;
						height: 110rpx;
						transform: rotate(45deg);
						overflow: hidden;

						image {
							width: 110rpx;
							height: 110rpx;
							display: block;
							transform: rotate(-45deg);
						}
					}

					image {
						position: absolute;
						width: inherit;
						height: inherit;
						top: 0;
						right: 0;
					}
				}

				.prizewinner {

					width: 145rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					font-size: 26rpx;
					font-family: Alibaba PuHuiTi;
					font-weight: 800;
					color: #FFFFFF;
					background-size: 100% 100%;
					margin: 0rpx auto;
					margin-top: 4rpx;
					background-image: url(../../../static/act/goldRank/prizewinner.png);
				}



				.prizeName {
					white-space: nowrap;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #FFFFFF;
					text-align: center;
					position: absolute;
					left: 50%;
					transform: translate(-50%, 16rpx);
				}
			}

			.rankOne {
				left: 0;
				right: 0;
				top: 36rpx;
				margin: auto;
			}

			.rankTwo {
				left: 40rpx;
				top: 112rpx;
			}

			.rankThree {
				right: 40rpx;
				top: 130rpx;
			}
		}
	}

	.rollStaticContent {
		width: 100%;
		position: relative;
		height: 208rpx;

		@keyframes rowup {
			0% {
				-webkit-transform: translate3d(0, 0, 0);
				transform: translate3d(0, 0, 0);
			}

			100% {
				-webkit-transform: translate3d(-3560rpx, 0, 0);
				transform: translate3d(-3560rpx, 0, 0);
			}
		}

		.rollContent {
			position: absolute;
			display: flex;
			-webkit-animation: 40s rowup linear infinite normal;
			animation: 40s rowup linear infinite normal;
			top: 0;
			bottom: 0;
			height: 158rpx;
			margin: auto;

			.rollItem {
				flex-wrap: nowrap;

				image {
					margin-right: 20rpx;
					display: block;
					width: 158rpx;
					height: 158rpx;
					margin-bottom: 10rpx;
				}
			}
		}


	}
</style>
