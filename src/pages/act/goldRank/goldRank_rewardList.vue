<template>
	<view>
		<view class="tagContent uni-flex">
			<view class="tagContent-item" :class='{selectTagItem:tag.index==index}' v-for="(item,index) in tag.list"
				:key='index'>{{item.name}}</view>
		</view>
		<view class="prizeCard uni-flex" v-for="(item,index) in 100" :key='index'>
			<view class="prizeCard-index">NO.{{index+1}}</view>
			<view class="prizeCard-prize">
				<view class="prizeName">黑曜石HOBBY*1盒</view>
				<view class="prizeImage uni-flex">
					<view class="discountCoupon">
						<view class="price block">150</view>
						<view class="name block">卡享券</view>
						<view class="scope block">平台通用</view>
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
		Component,
		Prop,
		Vue,
		Watch
	} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {
		dateFormatMSHMS
	} from '@/tools/util.ts'
	@Component({})
	export default class ClassName extends BaseComponent {
		rewardList: any = [];
		queryParams: any = {
			tp: 1
		}
		tag: any = {
			index: 0,
			list: [{
				name: '日榜奖品'
			}, {
				name: '总榜奖品'
			}]
		}
		onLoad() {
			this.reqNewData()
		}
		//奖励列表
		reqNewData(isRefreshAward: boolean = true) {
			app.http.Get(
				"activity/goodNoShowGoldValue/prize/list",
				this.queryParams,
				(res: any) => {
					this.rewardList = res.list || []
					setTimeout(() => {
						uni.stopPullDownRefresh();
					}, 500);
				}
			);
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #f6f7fb;
	}

	.prizeCard {
		width: 722rpx;
		height: 271rpx;
		margin: 14rpx auto;
		background-size: 100% 100%;
		background-image: url(../../../static/act/prize/card.png);
		align-items: center;

		&-index {
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			text-align: center;
			width: 26%;
		}

		&-prize {
			.prizeImage {
				justify-content: space-between;
margin-top: 24rpx;
				.discountCoupon {
					width: 160rpx;
					height: 160rpx;
					background-size: 100% 100%;
					background-image: url(../../../static/act/prize/discountCoupon.png);
					position: relative;
					
					.block {
						position: absolute;
						left: 50%;
						white-space: nowrap;
					}

					.price {
						font-size: 52rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #CAE2FF;

						transform: translate(-50%, 10rpx);
					}

					.name {
						transform: translate(-50%, 76rpx);
						font-size: 21rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #CDD1D1;
					}

					.scope {
						font-size: 21rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #FFFFFF;
						transform: translate(-50%, 117rpx);
					}

					.price::before {
						content: '￥';
						display: block;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #CAE2FF;
						position: absolute;
						left: -16rpx;
						bottom: 8rpx;
					}
				}
			}
		}
	}

	.tagContent {
		width: 748rpx;
		height: 78rpx;
		border-top: 1rpx solid rgba(136, 135, 140, .1);

		&-item {
			width: 50%;
			text-align: center;
			height: 80rpx;
			line-height: 80rpx;
			background-color: #fff;
			font-size: 31rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #88878C;
			border-bottom: 1rpx solid rgba(136, 135, 140, .1);
		}

		.selectTagItem {
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}
	}
</style>
