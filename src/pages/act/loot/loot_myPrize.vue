<template>
	<view>
		<view class="prizeContent">
			<view class="prizeItem" v-for="item in 4">
				<view class="prizeItem-top">
					<image class="prize-left" src='/static/img/back.fc566c1b.png'></image>
					<view class="prize-right">
						<view class="title oneLineOver">iphone 13 白色 32G</view>
						<view class="probability">
							中奖时间：04-05 11:11:11
						</view>
						<view class="actionContent uni-flex">
							<view class="actionButton whiteBtn">联系客服发货</view>
						</view>
					</view>
				</view>
				<view class="prizeItem-bottom">
					<text>中奖码: </text><text>1111</text>
				</view>
			</view>
		</view>
		<!-- <empty v-if='prizeList&&!prizeList.length'></empty> -->
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
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		queryParams: any = {
			pageIndex: 1,
			pageSize: 20,
		};
		prizeList: any = [];
		totalPage: number = 0;
		onLoad() {
			this.reqNewData()
		}
		onReachBottom() {
			if (this.queryParams.pageIndex < this.totalPage) {
				this.queryParams.pageIndex += 1
				this.reqNewData()
			}
		}
		onPullDownRefresh() {
			this.queryParams.pageIndex = 1
			this.reqNewData()
		}
		//我的奖品
		reqNewData() {
			app.http.Get('snatchTreasure/myPrize', this.queryParams, (res: any) => {
				this.totalPage = res.totalPage || 0
				const arr = res.list || []
				if (this.queryParams.pageIndex === 1) this.prizeList = [];
				this.prizeList = [...this.prizeList, ...arr];
				setTimeout(() => {
					uni.stopPullDownRefresh();
				}, 500)
			})
			// uni.stopPull
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f6f7fb;
		font-family: FZLanTingHeiS-R-GB;
	}

	.prizeContent {
		padding: 0 14rpx;
		// margin-top: 20rpx;
		.prizeItem {
			margin-top: 30rpx;
			&-top {
				display: flex;
				position: relative;
				height: 198rpx;
				.prize-left {
					width: 188rpx;
					height: 188rpx;
					margin-right: 29rpx;
				}

				.prize-right {
					width: 490rpx;

					.title {
						font-size: 29rpx;
						font-family: FZLanTingHeiS-R-GB;
						font-weight: 500;
						color: #333333;
						margin-bottom: 16rpx;
						margin-top: 29rpx;
					}

					.probability {
						font-size: 25rpx;
						font-family: FZLanTingHeiS-R-GB;
						font-weight: 400;
						color: #88878C;
						margin-bottom: 13rpx;
					}


					.actionContent {
						justify-content: flex-end;
						align-items: center;
						margin-top: 40rpx;
						
						.actionButton {
							background-size: 100% 100%;
							font-family: FZLanTingHeiS-R-GB;
							font-weight: 400;
							text-align: center;
							line-height: 39rpx;
							background-color: #ff0016;
							height: 39rpx;
							width: 182rpx;
							font-size: 25rpx;
							color: #fff;
							border-radius: 4rpx;
						}
					}
				}
			}

			&-bottom {
				height: 45rpx;
				background-color: #f1f1f1;
				font-size: 23rpx;
				font-family: FZLanTingHeiS-R-GB;
				font-weight: 400;
				color: #88878C;
				line-height: 45rpx;
				text{
					position:relative;
					left: 21rpx;
				}
			}
		}
	}
</style>
