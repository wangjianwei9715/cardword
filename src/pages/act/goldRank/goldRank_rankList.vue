<template>
	<view>
		<view class="header-banner">
			<statusbar />
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
				<view class="header-title">金卡积分榜单</view>
				<view class="header-icon">
					<!-- <view :class="['icon-collect',{'icon-favored':favorType}]" @click="onClickFavor"></view> -->
					<view class="icon-share" @click="onClickShare"></view>
				</view>
			</view>
		</view>

		<view style="padding-top:88rpx">
			<statusbar />
		</view>
		<view class="topBanner">
			<view class="topTitle"></view>
			<view class="rightFloat" @click="pageJump('/pages/act/goldRank/goldRank_rule')">
				<text>活动<br>规则</text>
			</view>
			<view class="rightFloat" style="top: 120rpx;" @click="pageJump('/pages/act/goldRank/goldRank_record')">
				<text>往期<br>记录</text>
			</view>
			<view class="rightFloat" style="top: 240rpx;" @click="pageJump('/pages/act/goldRank/goldRank_rewardList')">
				<text>奖品<br>列表</text>
			</view>
		</view>
		<view class="rollStaticContent">
			<view class="rollContent" id='rollContent'>
				<view class="rollItem" v-for="(item) in awardList">
					<image :src="decodeURIComponent(item.pic)" mode="aspectFill">
					</image>
				</view>
				<view class="rollItem" v-for="(item) in awardList">
					<image :src="decodeURIComponent(item.pic)" mode="aspectFill">
					</image>
				</view>
			</view>
		</view>
		<view class="tips">·金卡积分=金卡x卡密单价</view>
		<view class="tagContent" :class="{selectTag:tag.index===1}">
			<view class="tagContent-item" v-for="(item,index) in tag.list" :key='index' @click="tagChange(item,index)">
				<view class="tagName">{{item.name}}</view>
				<view class="smallName" v-if="index==0">本轮倒计时: {{countDown(nowDateStamp,endTimeStamp)}}</view>
				<view class="smallName" v-if="index==1">活动时间: 4.20-5.4 </view>
			</view>
			<view class="luxuryGifts"><text>豪礼</text></view>
		</view>
		<view class="rankContent">
			<image src="../../../static/act/goldRank/despite_light.png" class="light" mode="widthFix"></image>
			<view class="rankContent-despite">
				<view class="topThreeItem" :class="{rankOne:index==0,rankTwo:index==1,rankThree:index==2}"
					v-for="(item,index) in rankMockList" :key='index'>
					<view class="frame">
						<view class="avartContainer">
							<image v-if="getTopRankItem(index)&&getTopRankItem(index).userAvatar"
								:src="decodeURIComponent(getTopRankItem(index).userAvatar)" mode=""></image>
						</view>
						<image :src="item.avartFrame" mode="widthFix"></image>
					</view>
					<view class="prizewinner">{{getTopRankItem(index)?getTopRankItem(index).userName:'虚位以待'}}</view>
					<view class="integral uni-flex">
						<image src="../../../static/act/goldRank/integral_icon.png" mode="widthFix"></image>
						<text>{{getTopRankItem(index)?formatNumber(getTopRankItem(index).gold_value,2):'-'}}</text>
					</view>
					<view class="prizeName">{{getTopRankItem(index)?getTopRankItem(index).awardName:'-'}}</view>
				</view>
			</view>
			<template>
				<view class="residueRank uni-flex" v-for="(item) in getTopThreeList">
					<view class="residueRank-index">{{item.ranking}}</view>
					<image class="residueRank-avart" :src="decodeURIComponent(item.userAvatar)">
					</image>
					<view class="residueRank-name oneLineOver">{{item.userName}}</view>
					<view class="integral uni-flex" style="flex: 1;justify-content: start;margin-top: 0;">
						<image src="../../../static/act/goldRank/integral_icon.png" mode="widthFix"
							style="width: 22rpx;">
						</image>
						<text>{{formatNumber(item.gold_value,2)}}</text>
					</view>
					<view class="residueRank-prize oneLineOver">{{item.awardName}}</view>
				</view>
			</template>
			<!-- <template v-if="getUnoccupied">
				<view class="residueRank uni-flex" v-for="(item,index) in getUnoccupied" :key='"none"+index'>
					<view class="residueRank-index">{{rankList.length>3?index+rankList.length+1:index+4}}</view>
					<view class="residueRank-none">虚位以待</view>
				</view>
			</template> -->
		</view>
		<view class="noneBlock"></view>
		<view class="bottomBlock">
			<view class="bottomBlock-rank white">{{myData.ranking||'未上榜'}}</view>
			<image class="bottomBlock-avart" :src="decodeURIComponent(myData.avatar)" mode=""></image>
			<view class="bottomBlock-me white">我</view>
			<view class="integral uni-flex" style="flex: 1;justify-content: start;margin-top: 0;">
				<image src="../../../static/act/goldRank/integral_icon.png" mode="widthFix">
				</image>
				<text style="font-size: 28rpx;">{{formatNumber(myData.gold_value||0,2)}}</text>
			</view>
			<view class="bottomBlock-prize white">{{myData.awardName||'——'}}</view>
		</view>
		<!--   -->
		<share :operationShow="operationShow" :shareData="shareData" @operacancel="operationShow=false" />
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
	} from '@/tools/util'
	@Component({})
	export default class ClassName extends BaseComponent {
		queryParams: any = {
			tp: 1, //1 今日榜单数据，2 总榜数据
			pageIndex: 1,
			pageSize: 50
		};
		totalPage: number = 1;
		endTimeStamp: number = 0;
		operationShow: boolean = false;
		shareData: any = false;
		countDown: any = countDown;
		dateTimer: any = 0;
		nowDateStamp: number = +new Date() / 1000;
		unoccupied: any = 0;
		formatNumber: any = formatNumber;
		tag: any = {
			index: 0,
			list: [{
				name: '金卡积分日榜',
				value: 1
			}, {
				name: '金卡积分总榜',
				value: 2
			}]
		}
		rankMockList: any = [{
			name: '第一名',
			avartFrame: '../../../static/act/goldRank/rank_one.png'
		}, {
			name: '第二名',
			avartFrame: '../../../static/act/goldRank/rank_two.png'
		}, {
			name: '第三名',
			avartFrame: '../../../static/act/goldRank/rank_three.png'
		}]
		awardList: any = []; //奖品列表
		myData: any = {}; //个人rank数据
		rankList: any = [];
		onLoad() {
			this.reqNewData()
			this.$nextTick(() => {
				// const query: any = uni.createSelectorQuery().in(this);
				// query.select('#rollContent').boundingClientRect((data: any) => {
				// 	console.log(data.width)
				// }).exec();
				this.startCountDown()
			})
		}
		onReachBottom() {
			if (this.queryParams.pageIndex < this.totalPage) {
				this.queryParams.pageIndex += 1
				this.reqNewData(false)
			}
		}
		onPullDownRefresh() {
			this.queryParams.pageIndex = 1
			this.reqNewData(false)
		}
		tagChange(item: any, index: number) {
			if (this.tag.index == index) return
			this.tag.index = index
			this.queryParams.tp = item.value
			this.reqNewData(false)
		}
		startCountDown() {
			this.dateTimer && clearInterval(this.dateTimer)
			this.endTimeStamp = Math.round((new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 -
				1) / 1000)
			this.dateTimer = setInterval(() => {
				this.nowDateStamp = +new Date() / 1000
				//倒计时结束,刷新列表；
				if (this.nowDateStamp === this.endTimeStamp) {
					this.delayRefresh()
					clearInterval(this.dateTimer)
				}
			}, 1000)
		}
		delayRefresh() {
			setTimeout(() => {
				this.startCountDown()
				this.reqNewData(true)
			}, 1000)
		}
		getTopRankItem(rankIndex: number = 0) {
			const rankItem: any = this.rankList[rankIndex]
			// console.log(rankItem)
			if (!rankItem) return undefined
			// if (rankItem.userName == '虚位以待' && rankItem.gold_value == 0) return undefined
			return rankItem
		}
		pageJump(url: string) {
			if (!url) return
			uni.navigateTo({
				url
			})
		}
		onClickBack() {
			uni.navigateBack({
				delta: 1
			});
		}
		// 分享
		onClickShare() {
			if (!this.operationShow) {
				this.shareData = {
					// shareUrl: 'http://192.168.8.26:8081/#/pages/goldRank/goldRank_rankList',
					shareUrl: 'https://www.ka-world.com/share/h5/#/pages/goldRank/goldRank_rankList',
					title: '寻找金色卡密',
					summary: '积分榜单送豪礼',
					thumb: 'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.04.18/loot/loot_sw/0/165026087575216790gc9vr.png'
				}
				this.operationShow = true
			}
		}
		//获取rank榜以及个人rank数据
		reqNewData(isRefreshAward: boolean = true) {
			app.http.Get(
				"activity/goodNoShowGoldValue/home",
				this.queryParams,
				(res: any) => {
					this.totalPage = res.totalPage
					const arr = res.data.rankingList || []
					this.rankList = this.queryParams.pageIndex == 1 ? arr : [...this.rankList, ...arr]
					// console.log(this.rankList)
					if (isRefreshAward) this.awardList = res.data.awardList || []
					this.myData = res.data.myData || {}
					// this.unoccupied = res.data.unoccupied
					uni.hideLoading()
					setTimeout(() => {
						uni.stopPullDownRefresh();
					}, 500);
				}
			);
		}
		private get getUnoccupied() {
			let unoccupied: number = 0
			let len: number = this.rankList.length
			if (len <= 3) unoccupied = this.unoccupied - (3 - len)
			if (len > 3) unoccupied = this.unoccupied
			return unoccupied < 0 ? 0 : unoccupied
		}
		private get getTopThreeList() {
			return this.rankList.slice(3)
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
		bottom: 0rpx;
		padding-bottom: calc(0rpx + constant(safe-area-inset-bottom) - 40rpx);
		padding-bottom: calc(0rpx + env(safe-area-inset-bottom) - 40rpx);
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
			width: 15%;
			margin-left: 20rpx;
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
			font-size: 26rpx;
			text-align: center;
			width: 34%;
			margin-right: 20rpx;
		}
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
			background: url(../../../static/goods/back@2x.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			left: 0;
			top: 0;
		}

		.header-title {
			height: 88rpx;
			line-height: 88rpx;
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
			width: 38rpx;
			height: 37rpx;
			background: url(../../../static/goods/v2/icon_collect.png) no-repeat center;
			background-size: 100% 100%;
			margin-right: 40rpx;
		}

		.icon-favored {
			background: url(../../../static/goods/v2/icon_collect_.png) no-repeat center;
			background-size: 100% 100%;
		}

		.icon-share {
			width: 40rpx;
			height: 39rpx;
			background: url(../../../static/goods/v2/icon_share.png) no-repeat center;
			background-size: 100% 100%;
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

				top: 28rpx;
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
			top: 0rpx;
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
				right: 1rpx;
				top: 10rpx;
			}
		}
	}

	.selectTag {
		background-image: url(../../../static/act/goldRank/tag_two.png);
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

			&-none {
				color: #fff;
				width: 72%;
				text-align: center;
				font-weight: 500;
				font-size: 26rpx;
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
			background-color: rgba(89, 154, 226, .32);
			// background-size: 100% 100%;
			// background-image: url(../../../static/act/goldRank/rank_line.png);
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
						width: 130rpx;
						height: 130rpx;
						position: absolute;
						left: 0;
						top: 0;
						bottom: 0;
						right: 0;
						margin: auto;
						overflow: hidden;
						// background-color: red;
						-webkit-clip-path: polygon(0rpx 50%, 50% 0rpx, 100% 50%, 50% 100%, 0rpx 50%);

						image {
							width: 130rpx;
							height: 130rpx;
							display: block;
							position: absolute;
							top: 0;bottom: 0;
							// transform: rotate(-45deg);
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
					transform: translate(-50%, 10rpx);
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
			-webkit-animation: 65s rowup linear infinite normal;
			animation: 65s rowup linear infinite normal;
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
