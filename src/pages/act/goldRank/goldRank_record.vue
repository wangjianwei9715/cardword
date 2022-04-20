<template>
	<view>
		<scroll-view class="goods-scroll" scroll-x="true">
			<view class="scrollItem" :class="{selectDay:index==nowDayIndex}" v-for="(item,index) in dayList"
				:key='index' @click="tagChange(item,index)">
				<view class="dayname">
					<text>{{item.topName}}</text>
				</view>
			</view>
		</scroll-view>
		<view class="residueRank uni-flex" v-for="(item,index) in recordList" :key='index'>
			<view class="residueRank-index">{{item.ranking}}</view>
			<image class="residueRank-avart" :src="decodeURIComponent(item.userAvatar)">
			</image>
			<view class="residueRank-name oneLineOver">{{item.userName}}</view>
			<view class="integral uni-flex" style="flex: 1;justify-content: start;margin-top: 0;">
				<image src="../../../static/act/goldRank/integral_icon.png" mode="widthFix" style="width: 22rpx;">
				</image>
				<text>{{formatNumber(item.gold_value,2)}}</text>
			</view>
			<view class="residueRank-prize oneLineOver">{{item.awardName}}</view>
		</view>
		<view class="noneBlock"></view>
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
		recordList: any = [];
		formatNumber: any = formatNumber;
		dayList: any = [];
		nowDayIndex: number = 0;
		queryParams: any = {
			day: ''
		}
		onLoad() {
			this.reqDayData()
			// this.reqNewData()
		}
		onPullDownRefresh() {
			this.reqNewData()
			// this.reqDayData()
		}
		tagChange(item: any, index: number) {
			if (this.nowDayIndex == index) return
			this.nowDayIndex = index
			this.queryParams.day = item.value
			this.reqNewData()
		}
		//获取期数
		reqDayData() {
			app.http.Get(
				"activity/goodNoShowGoldValue/home",
				this.queryParams,
				(res: any) => {
					this.dayList = res.data.oldListTop || []
					this.nowDayIndex = 0
					this.queryParams.day = this.dayList[0].value
					this.reqNewData()
				}
			);
		}
		//往期记录
		reqNewData() {
			app.http.Get(
				"activity/goodNoShowGoldValue/old/ranklist",
				this.queryParams,
				(res: any) => {
					this.recordList = res.list || []
					setTimeout(() => {
						uni.stopPullDownRefresh();
					}, 500);
				}
			);
		}
	}
</script>

<style lang="scss">
	.noneBlock {
		width: 750rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.goods-scroll {
		width: 96%;
		height: 90rpx;
		display: flex;
		margin-top: 20rpx;
		// margin:0 auto;
		margin-left: 12rpx;
		white-space: nowrap;

		.scrollItem {
			display: inline-block;
			width: 116rpx;
			position: relative;
			margin-right: 20rpx;
			font-size: 31rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #88878C;
			text-align: center;
		}

		.selectDay {
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
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
			color: #333333;
			;
		}
	}

	.residueRank {
		width: 720rpx;
		margin: 0 auto;
		align-items: center;
		height: 111rpx;
		position: relative;

		&-index {
			width: 10%;
			font-size: 29rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
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
			color: #333333;
			;
			// text-align: center;
			font-weight: 500;
			font-size: 29rpx;
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
			color: #333333;
			margin-right: 10rpx;
		}
	}
</style>
