<template>
	<view>
		<view class="prizeContent">
			<view class="prizeItem" v-for="item in prizeList">
				<view class="prizeItem-top">
					<image class="prize-left" :src='decodeURIComponent(item.award_pic)'></image>
					<view class="prize-right">
						<view class="title oneLineOver">{{item.name}}</view>
						<view class="probability">
							中奖时间：{{dateFormatMSHMS(item.open_at)}}
						</view>
						<view class="actionContent uni-flex">
							<view class="yhTips" v-show="item.tp==2">已发放至我的优惠券</view>
							<view class="actionButton whiteBtn" v-show='item.tp==1' @click="linkKefu">联系客服发货</view>
						</view>
					</view>
				</view>
				<view class="prizeItem-bottom">
					<text>中奖码: </text><text>{{item.openCode}}</text>
				</view>
			</view>
		</view>
		<empty v-if='!isRequest&&prizeList&&!prizeList.length'></empty>
	</view>
</template>
	
<script lang="ts">
	import {
		app
	} from "@/app";
	import {
		dateFormatMSHMS
	} from '@/tools/util'
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
		isRequest:boolean=true;
		dateFormatMSHMS: any = dateFormatMSHMS;
		kefuUserId:any=[]
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
		linkKefu(){
			uni.navigateTo({
				url: '/pages/userinfo/talk?targetUserId='+this.kefuUserId[0]
			})
		}
		//我的奖品
		reqNewData() {
			this.isRequest=true
			app.http.Get('activity/snatchTreasure/myPrize', this.queryParams, (res: any) => {
				this.kefuUserId=res.data.kefuUserId
				this.totalPage = res.totalPage || 0
				const arr = res.data.list || []
				if (this.queryParams.pageIndex === 1) this.prizeList = [];
				this.prizeList = [...this.prizeList, ...arr];
				this.isRequest=false
				setTimeout(() => {
					uni.stopPullDownRefresh();
				}, 200)
			})
			// uni.stopPull
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #f6f7fb;
		font-family: PingFangSC-Regular;
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
						font-family: PingFangSC-Regular;
						font-weight: 500;
						color: #333333;
						margin-bottom: 16rpx;
						margin-top: 29rpx;
					}

					.probability {
						font-size: 25rpx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: #88878C;
						margin-bottom: 13rpx;
					}


					.actionContent {
						justify-content: flex-end;
						align-items: center;
						margin-top: 20rpx;
						position: relative;
						.yhTips{
							font-size: 25rpx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: #88878C;
							position: absolute;
							left: 0;
							top: 2rpx;
						}
						.actionButton {
							background-size: 100% 100%;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							text-align: center;
							line-height: 39rpx;
							background-color: #ff0016;
							height: 39rpx;
							width: 182rpx;
							font-size: 25rpx;
							color: #fff;
							border-radius: 4rpx;
							// flex: 1;
						}
					}
				}
			}

			&-bottom {
				height: 45rpx;
				background-color: #f1f1f1;
				font-size: 23rpx;
				font-family: PingFangSC-Regular;
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
