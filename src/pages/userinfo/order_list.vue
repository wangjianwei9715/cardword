<template>
	<view class="content">
		<view class="header-banner">
			<statusbar />
			<view class="header-top">
				<view class="header-back" @click="onClickBack">
					<view class="icon-back"></view>
				</view>
				<view class="header-search">
					<view class="search-icon"></view>
					<input class="search-input" type="text" v-model="listParams.q" placeholder="搜索" confirm-type="search"
						@confirm="onInputSearch" />
				</view>
				<view class="icon-kf" @click="onClickHeliService"></view>
			</view>
			<view class="header-tab">
				<u-tabs :itemStyle="{width:'125rpx',height:'90rpx',lineHeight:'86rpx',padding:0,background:'#fff'}" :activeStyle="activeStyle" :inactiveStyle="inactiveStyle" lineColor="#FA1545" lineHeight="2" :list="orderTab" :current="orderTabCheck" @click="onClickListTabs"></u-tabs>
			</view>
		</view>

		<view class="order-list">
			<statusbar />
			<orderlist :orderList="orderList" @send="onClickOrder" @operate="onClickOperate" @onFinish="onCodeFinish"/>
		</view>
		<empty v-show="showEmpty" />
		<payment :showPayMent="showPayMent" :payChannel="payChannel" :payPrice="payItem.price"
			@cancelPay="onClickCancelPay" :countTime="countTime" @pay="onClickPayGoods" />
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from "../../base/BaseNode.vue";
	//@ts-ignore
	import { KwwConfusion } from "@/net/kwwConfusion.js"
	const OperateMap:{[x:string]:any} = {
		"receive_good":{
			content:'是否确认已经收货？',
			url:'me/order/buyer/receive_good',
			toast:'收货成功'
		},
		"cancel":{
			content:'是否取消支付该订单？',
			url:'me/order/buyer/cancel',
			toast:'取消成功'
		},
		"buy_delete_order":{
			content:'是否删除该订单？',
			url:'me/order/buyer/delete_order',
			toast:'删除成功'
		},
	}
	@Component({})
	export default class ClassName extends BaseNode {
		activeStyle={
			"font-size": "30rpx",
			"font-weight": 500,
			"color":" #333333",
		}
		inactiveStyle={
			"font-size": "26rpx",
			"font-weight": 400,
			"color":" #999999",
		}
		orderTab = [
			{ id: 0, name: "全部" },
			{ id: 1, name: "待支付" },
			{ id: 2, name: "已付款" },
			{ id: 3, name: "待发货" },
			{ id: 4, name: "待收货" },
			{ id: 5, name: "已完成" }, 
		];
		orderTabCheck = 0;
		listParams = {
			q:'',
			pageIndex:1,
			pageSize:20,
			noMoreData:false
		}
		orderList: { [x: string]: any } = [];
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
				this.orderTabCheck = Number(query.type);
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
			this.listParams.pageIndex = 1;
			this.listParams.noMoreData = false;
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
			const { q, noMoreData, ...rest } = this.listParams;
			if (noMoreData) return;

			const params = {
				tp: this.orderTabCheck,
				...rest,
				q:encodeURIComponent(q)
			}
			app.http.Get("me/order/buyer/orderList", params, (data: any) => {
				if (rest.pageIndex == 1) this.orderList = [];
				if (data.list) {
					this.showEmpty = false;
					this.orderList = this.orderList.concat(data.list);
				}
				if (!data.list && rest.pageIndex == 1) {
					this.showEmpty = true;
				}
				if (!data.list || data.list.length < rest.pageSize) {
					this.listParams.noMoreData = true;
				}
				this.listParams.pageIndex++;
				if (cb) cb();
			});
		}
		againReqNewData() {
			this.listParams.pageIndex = 1;
			this.orderList = [];
			this.listParams.noMoreData = false;
			this.reqNewData();
		}
		onInputSearch() {
			const { q } = this.listParams;
			let hideGoods = /[0-9]{12}/g
			if(hideGoods.test(q)){
				const code:any = q.match(hideGoods);
				app.navigateTo.goOrderDetails(code)
				return;
			}
			this.againReqNewData();
		}
		onClickOrder(code: any) {
			app.navigateTo.goOrderDetails(code)
		}
		onClickOperate(item: any, cmd: any, leftSec:number) {
			const { code:orderCode, zitiWuliuExplain="", good, num=0, price=0 } = item;
			if (cmd == "view") {
				this.onClickOrder(orderCode)
			} else if (cmd.indexOf("wuliu") != -1) {
				let wuliucode = cmd.slice(6);
				uni.navigateTo({
					url: `/pages/userinfo/order_logistics?code=${wuliucode}&zitiWuliuExplain=${zitiWuliuExplain}`,
				});
			}
			if (cmd == "toPay") {
				this.payChannel = good.payChannel;
				this.countTime = leftSec;
				this.payItem = {
					num:Number(num),
					code:orderCode,
					price
				}
				this.showPayMent = true;
			}
			if (cmd == "appraise") {
				uni.navigateTo({
					url:`/pages/userinfo/orderevaluate?code=${orderCode}&data=${decodeURIComponent(JSON.stringify(good))}`
				});
			}
			if (cmd == "resultCard") {
				uni.navigateTo({
					url:`/pages/userinfo/goods_result_list?chooseIds=1&code=${good.goodCode}&order=${orderCode}&random=${good.state>0}`
				});
			}
			if (["receive_good","cancel","buy_delete_order"].includes(cmd)) {
				const data = OperateMap[cmd];
				uni.showModal({
					title: "提示",
					content: data.content,
					success: (res) => {
						if (res.confirm) {
							app.http.Post(data.url, {code:orderCode}, (res: any) => {
								uni.showToast({ title: data.toast, icon: "none", });
								this.againReqNewData();
							});
						}
					},
				});
			}
		}
		onClickBack() {
			app.navigateTo.navigateBack()
		}
		onClickListTabs({id}:any) {
			if (id == this.orderTabCheck) {
				return;
			}
			this.orderTabCheck = id;
			this.againReqNewData();
		}
		onCodeFinish(item:any){
			this.listParams.pageIndex = 1;
			this.listParams.noMoreData = false;
			this.reqNewData(() => {
				uni.stopPullDownRefresh();
			});
		}
		// 取消支付
		onClickCancelPay() {
			this.showPayMent = false;
			this.againReqNewData();
		}
		async onClickPayGoods({channelId="",channel}: any) {
			// 1：支付宝 2：微信
			if (channel == "")  return;
			const userId = await app.user.getAppDataUserId();
			uni.showLoading({ title: "加载中" });
			let params: any = {
				channelId,
				channel,
				delivery: 0,
				num: this.payItem.num,
			};
			const hash = KwwConfusion.toPayForGoodOrder(userId,this.payItem.code)
			if (uni.getSystemInfoSync().platform === "android") {
				params.nativeSdk = "qmf_android";
			}
			app.http.Pay("order/topay/" + this.payItem.code, {...params,...hash}, (res: any) => {
				//data.channel=='alipay' (before)
				if (['alipay','alipay_h5'].includes(channel)) {
					this.clickToPay = true;
					uni.hideLoading();
					app.payment.paymentAlipay(res.h5CashierAddress, res.alipay.orderInfo);
					this.onClickCancelPay();
				} else {
					if (res.wechat) {
						this.clickToPay = true;
						uni.hideLoading();
						app.payment.paymentWxpay(res.wechat);
						this.onClickCancelPay();
					}
				}
			});
		}
		onClickHeliService(){
			app.platform.heliService({agentExten:''})
		}
	}
</script>

<style lang="scss">
	page {
		background: $content-bg;
	}
	/deep/.u-tabs__wrapper__nav__line{
		border-radius: 0 !important;
		bottom:14rpx !important
	}
	.content{
		width: 100%;
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
		height: 98rpx;
		display: flex;
		box-sizing: border-box;
		padding: 0 32rpx 0 0;
		z-index: 10;
		align-items: center;
		justify-content: space-between;
	}

	.header-search {
		width:570rpx;
		height: 72rpx;
		background: #F6F6F6;
		border-radius: 4rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: relative;
	}
	.icon-kf{
		width: 40rpx;
		height:34rpx;
		background: url(@/static/goods/detail/kf.png) no-repeat center / 100% 100%;
	}
	.header-back {
		width: 80rpx;
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-back {
		width: 56rpx;
		height:56rpx;
		background: url(@/static/index/back_b.png) no-repeat center / 100% 100%;
	}
	.header-tab {
		width: 100%;
		margin-top: -10rpx;
		box-sizing: border-box;
	}

	.order-list {
		width: 100%;
		box-sizing: border-box;
		padding: 190rpx 14rpx 14rpx 14rpx;
	}

	.search-input {
		width: 626rpx;
		height: 64rpx;
		background: #F6F6F6;
		border-radius: 4rpx;
		font-size: 24rpx;
		
		font-weight: 500;
		color: #DDDDDD;
		padding-left: 64rpx;
	}

	.search-icon {
		width: 26rpx;
		height: 27rpx;
		background: url(@/static/cardForum/sousuo@2x.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left: 16rpx;
		top: 50%;
		margin-top: -13rpx;
	}
</style>
