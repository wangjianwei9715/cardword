<template>
	<view class="content">
		<view class="header-banner">
			<statusbar />
			<view class="header-top">
				<view class="header-back" @click="onClickBack">
					<image style="width:19rpx;height:35rpx" src="@/static/index/v3/icon_back.png"/>
				</view>
				<view class="header-search">
					<view class="search-icon"></view>
					<input class="search-input" type="text" v-model="searchText" placeholder="搜索" confirm-type="search"
						@confirm="onInputSearch" />
				</view>
			</view>
			<view class="header-tab">
				<tabc :tabc="orderTab" :tabsCheck="orderTabCheck" @tabsClick="onClickListTabs"></tabc>
			</view>
		</view>

		<view class="order-list">
			<statusbar />
			<orderlist :orderList="orderList" @send="onClickOrder" @operate="onClickOperate" />
		</view>
		<empty v-show="showEmpty" />
		<payment :showPayMent="showPayMent" :payChannel="payChannel" :payPrice="payItem.price"
			@cancelPay="onClickCancelPay" :countTime="countTime" @pay="onClickPayGoods" />
	</view>
</template>

<script lang="ts">
	import {
		app
	} from "@/app";
	import {
		Component
	} from "vue-property-decorator";
	import BaseNode from "../../base/BaseNode.vue";
	@Component({})
	export default class ClassName extends BaseNode {
		searchText = "";
		orderTab = [{
				id: 0,
				name: "全部"
			},
			{
				id: 1,
				name: "待支付"
			},
			{
				id: 2,
				name: "已付款"
			},
			{
				id: 3,
				name: "待发货"
			},
			{
				id: 4,
				name: "待收货"
			},
			{
				id: 5,
				name: "已完成"
			},
		];
		orderTabCheck = 0;
		currentPage = 1;
		pageSize = 20;
		noMoreData = false;
		orderList: {
			[x: string]: any
		} = [];
		showPayMent = false;
		countTime = 0;
		payItem = {
			num: 0,
			code: "",
			price: 0,
		};
		clickToPay = false;
		showEmpty = false;
		payChannel: any = [];
		onLoad(query: any) {
			if (query.type) {
				this.orderTabCheck = query.type;
			}
			this.againReqNewData();
		}
		onShow() {
			if (this.clickToPay) {
				this.clickPayShowLoading();
			}
		}
		//   下拉刷新
		onPullDownRefresh() {
			this.currentPage = 1;
			this.noMoreData = false;
			this.reqNewData(() => {
				uni.stopPullDownRefresh();
			});
		}
		onReachBottom() {
			this.reqNewData();
		}
		clickPayShowLoading() {
			uni.showLoading({
				title: "获取订单状态中",
				mask: true,
			});
			setTimeout(() => {
				this.againReqNewData();
				uni.hideLoading();
				this.clickToPay = false;
			}, 2000);
		}
		reqNewData(cb ? : Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			let params: {
				[x: string]: any
			} = {
				tp: this.orderTabCheck,
				pageIndex: this.currentPage,
				pageSize: this.pageSize,
			};
			if (this.searchText != "") {
				params.q = encodeURIComponent(this.searchText);
			}
			app.http.Get("me/order/buyer/orderList", params, (data: any) => {
				if (this.currentPage == 1) this.orderList = [];
				if (data.list) {
					this.showEmpty = false;
					this.orderList = this.orderList.concat(data.list);
				}
				if (!data.list && this.currentPage == 1) {
					this.showEmpty = true;
				}
				if (!data.list || data.list.length < this.pageSize) {
					this.noMoreData = true;
				}
				this.currentPage++;
				if (cb) cb();
			});
		}
		againReqNewData() {
			this.currentPage = 1;
			this.orderList = [];
			this.noMoreData = false;
			this.reqNewData();
		}

		onInputSearch() {
			this.againReqNewData();
		}
		onClickOrder(code: any) {
			uni.navigateTo({
				url: "/pages/userinfo/order_details?code=" + code,
			});
		}
		onClickOperate(item: any, cmd: any) {
			let code = item.code;
			let params: {
				[x: string]: any
			};
			if (cmd == "view") {
				uni.navigateTo({
					url: "/pages/userinfo/order_details?code=" + code,
				});
			} else if (cmd.indexOf("wuliu") != -1) {
				let wuliucode = cmd.slice(6);
				uni.navigateTo({
					url: `/pages/userinfo/order_logistics?code=${wuliucode}&zitiWuliuExplain=${item.zitiWuliuExplain || ""}`,
				});
			}
			if (cmd == "toPay") {
				this.payChannel = item.good.payChannel;
				this.countTime = item.leftSec;
				this.payItem.num = Number(item.num);
				this.payItem.code = code;
				this.payItem.price = item.price;
				this.showPayMent = true;
			}
			if (cmd == "appraise") {
				uni.navigateTo({
					url: "/pages/userinfo/orderevaluate?code=" +
						code +
						"&data=" +
						decodeURIComponent(JSON.stringify(item.good)),
				});
			}
			if (cmd == "resultCard") {
				let random = item.good.state > 0 ? true : false;
				uni.navigateTo({
					url: "/pages/userinfo/goods_result_list?chooseIds=1&code=" +
						item.good.goodCode +
						"&order=" +
						item.code +
						"&random=" +
						random,
				});
			}
			if (cmd == "receive_good") {
				uni.showModal({
					title: "提示",
					content: "是否确认已经收货？",
					success: (res) => {
						if (res.confirm) {
							params = {
								code: code,
							};
							app.http.Post("me/order/buyer/receive_good", params, (res: any) => {
								uni.showToast({
									title: "收货成功",
									icon: "none",
								});
								this.againReqNewData();
							});
						} else if (res.cancel) {}
					},
				});
			}
			if (cmd == "cancel") {
				uni.showModal({
					title: "提示",
					content: "是否取消支付该订单？",
					success: (res) => {
						if (res.confirm) {
							params = {
								code: code,
							};
							app.http.Post("me/order/buyer/cancel", params, (res: any) => {
								uni.showToast({
									title: "取消成功",
									icon: "none",
								});
								this.againReqNewData();
							});
						} else if (res.cancel) {}
					},
				});
			}

			if (cmd == "buy_delete_order") {
				uni.showModal({
					title: "提示",
					content: "是否删除该订单？",
					success: (res) => {
						if (res.confirm) {
							params = {
								code: code,
							};
							app.http.Post("me/order/buyer/delete_order", params, (res: any) => {
								uni.showToast({
									title: "删除成功",
									icon: "none",
								});
								this.againReqNewData();
							});
						} else if (res.cancel) {}
					},
				});
			}
		}
		onClickBack() {
			uni.navigateBack({
				delta: 1,
			});
		}

		onClickListTabs(id: number) {
			if (id == this.orderTabCheck) {
				return;
			}
			this.orderTabCheck = id;
			this.againReqNewData();
		}

		// 取消支付
		onClickCancelPay() {
			this.showPayMent = false;
			this.againReqNewData();
		}
		onClickPayGoods(data: any) {
			// 1：支付宝 2：微信
			if (data == "") {
				return;
			}
			uni.showLoading({
				title: "加载中",
			});
			let params: any = {
				channelId: data.channelId ? data.channelId : "",
				channel: data.channel,
				delivery: 0,
				num: this.payItem.num,
			};
			if (uni.getSystemInfoSync().platform === "android") {
				params.nativeSdk = "qmf_android";
			}
			app.http.Post("order/topay/" + this.payItem.code, params, (res: any) => {
				//data.channel=='alipay' (before)
				if (data.channel == "alipay_h5" || data.channel == "alipay") {
					if (res.appPayRequest) {
						app.payment.paymentAlipayQmfSdk(JSON.stringify(res.appPayRequest));
						this.onClickCancelPay();
					} else if (res.alipay.orderInfo != "") {
						this.clickToPay = true;
						uni.hideLoading();
						app.payment.paymentAlipay(res.pay_type, res.alipay.orderInfo);
						this.onClickCancelPay();
					}
				} else {
					if (res.wechat) {
						this.clickToPay = true;
						uni.hideLoading();
						app.payment.paymentWxpay(res.pay_type, res.wechat);
						this.onClickCancelPay();
					}
				}
			});
		}
	}
</script>

<style lang="scss">
	page {
		background: $content-bg;
	}

	.header-banner {
		width: 100%;
		background: #fff;
		position: fixed;
		left: 0;
		top: 0;
		box-sizing: border-box;
		z-index: 9;
	}

	.header-top {
		width: 100%;
		height: 88rpx;
		display: flex;
		box-sizing: border-box;
		padding: 0 32rpx 0 0;
		z-index: 10;
		align-items: center;
		justify-content: space-between;
	}

	.header-search {
		width: 626rpx;
		height: 64rpx;
		background: #f5f5f8;
		border-radius: 4rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: relative;
		border-radius: 29rpx;
	}

	.header-back {
		width: 80rpx;
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.header-tab {
		width: 100%;
		height: 90rpx;
		margin-top: -10rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #f1f1f4;
	}

	.order-list {
		width: 100%;
		box-sizing: border-box;
		padding: 196rpx 14rpx 14rpx 14rpx;
	}

	.search-input {
		width: 626rpx;
		height: 64rpx;
		background: #f5f5f8;
		border-radius: 4rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #14151a;
		padding-left: 76rpx;
		border-radius: 29rpx;
	}

	.search-icon {
		width: 28rpx;
		height: 28rpx;
		background: url(../../static/index/sousuo@2x.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left: 28rpx;
		top: 50%;
		margin-top: -14rpx;
	}
</style>
