<template>
	<view class="content">
		<view class="mall-top">
			<view class="mall-bt">卡币商城</view>
			<view class="mall-my-point">我的卡币</view>
			<navigator url="/pages/mall/record_point" hover-class="none" class="mall-point">
				<view class="point-num">{{toThousands(meBeanPoint)}}</view>
				<view class="point-right"></view>
			</navigator>
			<view class="mall-top-right">
				<view class="mall-top-btn" @click="showDrawer=true">
					<image class="mall-top-img" src="../../static/mall/icon_rule.png" />兑换规则
				</view>
				<navigator url="/pages/mall/record_award" hover-class="none" class="mall-top-btn">
					<image class="mall-top-img" src="../../static/mall/icon_award.png" />奖品明细
				</navigator>
			</view>
		</view>

		<view class="mall-center">
			<view class="mall-limit">
				<view class="mall-limit-header">
					<view class="limit-header-left">
						<image class="limit-bg" src="../../static/mall/limit.png" />
					</view>
					<navigator url="/pages/mall/limit_award" hover-class="none" class="limit-header-right">
						查看全部
						<image class="limit-right" src="../../static/mall/limit_right.png" />
					</navigator>
				</view>
				<view class="award-box">
					<scroll-view class="award-box-scroll" :scroll-x="true" @scrolltolower='awardScrolltolower'>
						<view class="award-scroll-index" v-for="(item,index) in award.list" :key="index">
							<view class="award-top">
								<view class="award-num">{{item.leftNum}}份</view>
								<view class="award-pic-box">
									<!-- <image class="award-pic" mode="aspectFit" :src="decodeURIComponent(item.logo)"/> -->
									<muqian-lazyLoad class="award-pic" :src="decodeURIComponent(item.logo)">
									</muqian-lazyLoad>
								</view>
								<view class="award-status buying" v-if="(item.start_at-countDown<=0)">开抢中</view>
								<view class="award-status" v-else>距开始{{getTime(item.start_at-countDown)}}</view>
							</view>
							<view class="award-bottom">
								<view class="award-title oneLineOver">{{item.name}}</view>
								<view class="award-price">{{item.price}}卡币</view>
								<view class="award-exbtn buying" v-if="(item.start_at-countDown<=0)"
									@click="onClickExchange(item)">兑 换</view>
								<view class="award-exbtn" v-else>即将开抢</view>
							</view>
						</view>

					</scroll-view>
				</view>
			</view>

			<!-- 卡币兑换 -->
			<view class="point-header">
				<view class="point-title">卡币兑换</view>
				<view calss="point-tips">不定期上新</view>
			</view>
			<view class="point-box">
				<view class="point-index" v-for="(item,index) in cardBean.list" :key="index">
					<view class="point-pic-box">
						<muqian-lazyLoad class="point-pic" :src="decodeURIComponent(item.logo)">
						</muqian-lazyLoad>
						<!-- <image class="point-pic" :src="decodeURIComponent(item.logo)" mode="aspectFit" /> -->
					</view>
					<view class="point-name">{{item.name}}</view>
					<view class="point-price">{{item.price}}卡币</view>
					<view class="point-btn" @click="onClickExchange(item)">兑 换</view>
				</view>
			</view>
		</view>

		<!-- 弹窗 -->
		<mallPopup :showPopup="showPopup" :awardData="awardData" @popupClose="showPopup = false"
			@popupConfirm="onClickExConfirm"></mallPopup>
		<mallPopup :showPopup="showPopupToast" :popupType="'toast'" @popupClose="showPopupToast = false"
			@popupConfirm="onClickGoAward"></mallPopup>
		<!-- 规则 -->
		<bottomDrawer :showDrawer="showDrawer" :title="'兑换规则'" @closeDrawer="showDrawer=false">
			<view class="drawer-box" v-for="(item,index) in mallExchangeRule" :key="index">
				<view class="drawer-help" v-html="item.content"></view>
			</view>
		</bottomDrawer>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from "../../base/BaseNode.vue";
	import { mallExchangeRule } from "@/net/DataRules";
	import { toThousands } from "@/tools/util";
	@Component({})
	export default class ClassName extends BaseNode {
		toThousands = toThousands;
		count_down: any;
		countDown: any = Math.round(+new Date() / 1000);
		showPopup = false;
		requestLock: boolean = false;
		awardData: { [x: string]: any } = {
			id: 0,
			logo: "",
			price: 12000
		};
		award: any = {
			list: [],
			totalPage: 0,
			queryParams: {
				pageIndex: 1,
				pageSize: 10,
				tp: 11, //1 兑换奖品，11 限时好礼
				state: 1 //1 兑换中，2 已兑完
			}
		};
		cardBean: any = {
			list: [],
			totalPage: 0,
			queryParams: {
				pageIndex: 1,
				pageSize: 10,
				tp: 1, //1 兑换奖品，11 限时好礼
				state: 1 //1 兑换中，2 已兑完
			}
		};
		meBeanPoint: number = 0;
		showPopupToast = false;
		showDrawer = false;
		mallExchangeRule = mallExchangeRule;

		onLoad(query: any) {
			if (app.token.accessToken == "") {
				uni.navigateTo({
					url: "/pages/login/login"
				});
				return;
			}
			this.reqTimeLimitData();
			this.reqKdData();
			this.reqMeCardBean();
			this.getCountDown();
		}
		onShow() { }
		onPullDownRefresh() {
			this.cardBean.queryParams.pageIndex = 1;
			this.award.queryParams.pageIndex=1
			this.reqTimeLimitData();
			this.reqKdData(() => {
				setTimeout(() => {
					uni.stopPullDownRefresh();
				}, 500);
			});
		}
		onReachBottom() {
			if (this.cardBean.queryParams.pageIndex < this.cardBean.totalPage) {
				this.cardBean.queryParams.pageIndex += 1;
				this.reqKdData();
			}
		}
		onClickExConfirm() {
			if(this.requestLock) return
			this.requestLock=true
			app.http.Post(
				"point/exchange/exchange/" + this.awardData.id,
				{},
				(res: any) => {
					this.requestLock=false
					this.meBeanPoint = res.point;
					this.showPopup = false;
					this.showPopupToast = true;
				},(err:any)=>{
					this.requestLock=false
				}
			);
		}
		onClickExchange(item: { [x: string]: any }) {
			for (const key in this.awardData) {
				if (Object.prototype.hasOwnProperty.call(item, key)) {
					this.awardData[key] = item[key];
				}
			}
			this.showPopup = true;
		}
		onClickGoAward() {
			uni.navigateTo({
				url: "/pages/mall/record_award"
			});
			this.showPopupToast = false;
		}
		// 倒计时定时器
		getCountDown() {
			this.count_down = this.scheduler(() => {
				this.countDown++;
			}, 1);
		}
		// 倒计时时间计算
		getTime(countDown: number) {
			if (countDown <= 0) {
				// 有商品可以兑换以后重新请求数据
				clearInterval(this.count_down);
				return;
			}
			let day = String(Math.floor(countDown / 3600 / 24));
			let day_num = countDown - 3600 * 24 * Number(day);
			let hour =
				Math.floor(day_num / 3600) < 10
					? "0" + Math.floor(day_num / 3600)
					: Math.floor(day_num / 3600);
			let minute =
				Math.floor((day_num - 3600 * Number(hour)) / 60) < 10
					? "0" + Math.floor((day_num - 3600 * Number(hour)) / 60)
					: Math.floor((day_num - 3600 * Number(hour)) / 60);
			let second =
				Math.floor((day_num - 3600 * Number(hour)) % 60) < 10
					? "0" + Math.floor((day_num - 3600 * Number(hour)) % 60)
					: Math.floor((day_num - 3600 * Number(hour)) % 60);
			return (
				(Number(day) > 0 ? day + "天 " : "") + hour + ":" + minute + ":" + second
			);
		}
		awardScrolltolower() {
			if (this.award.queryParams.pageIndex < this.award.totalPage) {
				this.award.queryParams.pageIndex += 1;
				this.reqTimeLimitData();
			}
		}
		//获取个人卡币
		reqMeCardBean(cb?: Function) {
			app.http.Get("dataApi/point/index", {}, (res: any) => {
				this.meBeanPoint = res.point || 0;
				cb && cb();
			});
		}
		//限时兑换
		reqTimeLimitData(cb?: Function) {
			app.http.Get(
				"dataApi/point/exchange/goodlist",
				this.award.queryParams,
				(res: any) => {
					this.award.totalPage = res.totalPage;
					const reqList = res.list || [];
					this.award.queryParams.pageIndex == 1
						? (this.award.list = reqList)
						: this.award.list.push(...reqList);
					cb && cb();
				}
			);
		}
		//卡币兑换
		reqKdData(cb?: Function) {
			app.http.Get(
				"dataApi/point/exchange/goodlist",
				this.cardBean.queryParams,
				(res: any) => {
					this.cardBean.totalPage = res.totalPage;
					const reqList = res.list || [];
					this.cardBean.queryParams.pageIndex == 1
						? (this.cardBean.list = reqList)
						: this.cardBean.list.push(...reqList);
					cb && cb();
				}
			);
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f7fb;
	}

	.buying {
		background: #e84f5e !important;
	}

	.drawer-box {
		width: 100%;
		box-sizing: border-box;
	}

	.drawer-help {
		width: 100%;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #7d8288;
		line-height: 38rpx;
		margin-bottom: 50rpx;
	}

	.mall-top {
		width: 100%;
		height: 667rpx;
		background: url(../../static/mall/bg.png) no-repeat center;
		background-size: 100% 100%;
		position: relative;
		box-sizing: border-box;
		padding-top: 170rpx;
		padding-left: 47rpx;

		.mall-bt {
			width: 100%;
			box-sizing: border-box;
			font-size: 69rpx;
			font-family: hei;
			font-weight: 400;
			color: #ffffff;
			margin-bottom: 49rpx;
		}

		.mall-my-point {
			font-size: 27rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ffffff;
			letter-spacing: 5rpx;
		}

		.mall-point {
			display: flex;
			height: 80rpx;
			align-items: center;

			.point-num {
				height: 80rpx;
				font-size: 50rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #ffffff;
				text-shadow: 3px 3px 6rpx rgba(50, 46, 164, 0.8);
			}

			.point-right {
				width: 35rpx;
				height: 47rpx;
				background: url(../../static/mall/right.png) no-repeat center;
				background-size: 100% 100%;
				margin-left: 15rpx;
			}
		}

		.mall-top-right {
			width: 175rpx;
			position: absolute;
			right: 0;
			top: 170rpx;
			box-sizing: border-box;
		}

		.mall-top-btn {
			width: 175rpx;
			height: 57rpx;
			border: 3rpx solid #ffffff;
			border-right: none;
			border-top-left-radius: 27rpx;
			border-bottom-left-radius: 27rpx;
			background: #9eaeff;
			margin-bottom: 27rpx;
			box-sizing: border-box;
			padding-left: 10rpx;
			display: flex;
			align-items: center;
			font-size: 23rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ffffff;

			.mall-top-img {
				width: 42rpx;
				height: 43rpx;
				margin-right: 14rpx;
			}
		}
	}

	.mall-center {
		width: 100%;
		height: 100rpx;
		box-sizing: border-box;
		padding: 0 14rpx;
		margin-top: -240rpx;
		position: relative;
		z-index: 9;

		.mall-limit {
			width: 100%;
			background: #ffffff;
			border-radius: 5rpx;
			padding: 37rpx 19rpx;
			box-sizing: border-box;

			.mall-limit-header {
				width: 100%;
				height: 32rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 36rpx;

				.limit-header-left {
					height: 32rpx;
					display: flex;
					align-items: center;
					font-size: 23rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 32rpx;

					.limit-bg {
						width: 140rpx;
						height: 32rpx;
						margin-right: 8rpx;
					}
				}

				.limit-header-right {
					height: 32rpx;
					font-size: 23rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 32rpx;

					.limit-right {
						width: 12rpx;
						height: 20rpx;
						margin-left: 10rpx;
						margin-bottom: -3rpx;
					}
				}
			}

			.award-box {
				width: 100%;
				height: 390rpx;
				box-sizing: border-box;

				&-scroll {
					width: 100%;
					height: 390rpx;
					display: flex;
					white-space: nowrap;
					align-items: center;
				}

				.award-scroll-index {
					width: 240rpx;
					height: 390rpx;
					margin-right: 20rpx;
					box-sizing: border-box;
					display: inline-block;

					.award-top {
						width: 240rpx;
						height: 240rpx;
						box-sizing: border-box;
						position: relative;

						.award-num {
							width: 65rpx;
							height: 22rpx;
							background: url(../../static/mall/limit_num.png) no-repeat center;
							background-size: 100% 100%;
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #ffffff;
							text-align: center;
							line-height: 22rpx;
							position: absolute;
							left: 0;
							top: 0;
							z-index: 8;
						}

						.award-pic-box {
							width: 240rpx;
							height: 210rpx;
							background: rgba(226, 232, 255, 0.14);
							display: flex;
							align-items: center;
							justify-content: center;
						}

						.award-pic {
							width: 240rpx;
							height: 210rpx;
						}

						.award-status {
							width: 240rpx;
							height: 30rpx;
							position: absolute;
							bottom: 0;
							left: 0;
							text-align: center;
							background: #b9d7ef;
							line-height: 30rpx;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #ffffff;
						}
					}

					.award-bottom {
						width: 240rpx;
						height: 150rpx;

						.award-title {
							width: 100%;
							height: 70rpx;
							line-height: 70rpx;
							font-size: 27rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
							text-align: center;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.award-price {
							width: 100%;
							height: 34rpx;
							font-size: 25rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #ef3333;
							text-align: center;
							line-height: 20rpx;
						}

						.award-exbtn {
							width: 100%;
							height: 46rpx;
							background: #dbdbdb;
							border-radius: 3rpx;
							text-align: center;
							line-height: 46rpx;
							font-size: 27rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #ffffff;
						}
					}
				}
			}
		}
	}

	.point-header {
		width: 100%;
		height: 62rpx;
		margin-top: 14rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 19rpx;

		.point-title {
			font-size: 31rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}

		.point-tips {
			font-size: 23rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}
	}

	.point-box {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;

		.point-index {
			width: 235rpx;
			height: 326rpx;
			background: #ffffff;
			border-radius: 5rpx;
			margin-right: 8;
			box-sizing: border-box;
			padding: 0 12rpx;
		}

		.point-index:nth-child(3n) {
			margin-right: 0;
		}

		.point-pic-box {
			width: 100%;
			height: 170rpx;
			display: flex;
			justify-content: center;
			box-sizing: border-box;
			padding-top: 24rpx;

			.point-pic {
				width: 158rpx;
				height: 131rpx;
			}
		}

		.point-name {
			width: 100%;
			height: 36rpx;
			line-height: 36rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.point-price {
			width: 100%;
			height: 50rpx;
			line-height: 50rpx;
			font-size: 23rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ef3333;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.point-btn {
			width: 203rpx;
			height: 43rpx;
			background: #e84f5e;
			border-radius: 3rpx;
			text-align: center;
			line-height: 43rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #ffffff;
			margin: 0 auto;
		}
	}
</style>