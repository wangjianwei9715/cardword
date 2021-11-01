<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="header-top">
				<view class="header-back" @click="onClickBack"></view>
				<view class="header-search">
					<view class="search-icon"></view>
					<input class="search-input" type="text" v-model="searchText" placeholder="搜索" @confirm="onInputSearch" confirm-type="search"/>
				</view>
			</view>
			<view class="header-tab">
				<tabc :tabs="orderTab" :tabsCheck="orderTabCheck" @tabsClick="onClickListTabs"></tabc>
			</view>
		</view>

		<view class="order-list">
			<statusbar/>
			<orderlist :orderList="orderList"  @send="onClickOrder" @operate="onClickOperate" />
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		searchText = '';
		orderTab = [
			{id:0,name:'全部'},
			{id:1,name:'待支付'},
			{id:2,name:'进行中'},
			{id:3,name:'待发货'},
			{id:4,name:'待收货'},
			{id:10,name:'未中卡'}
		];
		orderTabCheck = 0;
		currentPage = 1;
		pageSize = 10;
		noMoreData = false;
		orderList:{[x:string]:any} = [];
		onLoad(query:any) {
			if(query.type){
				this.orderTabCheck = query.type
			}
			this.onEventUI('orderchange',()=>{
				this.reqNewData()
			})
		}
		onShow(){
			this.currentPage = 1;
			this.noMoreData = false;
			this.reqNewData() 
		}
		onReachBottom(){
			this.reqNewData()
		}
		reqNewData(cb?:Function) {
		  // 获取更多商品
		  if (this.noMoreData) {
		    return;
		  }
		  let params:{[x:string]:any} = {
			tp:this.orderTabCheck,
			pageIndex: this.currentPage,
			pageSize:this.pageSize
		  }
		  if(this.searchText!=''){
			params.q = encodeURIComponent(this.searchText)
		  }
		  app.http.Get("me/order/buyer/orderList", params, (data: any) => {
			if(data.list){
				if(this.currentPage==1){
					this.orderList = data.list;
				}else{
					this.orderList = this.orderList.concat(data.list);
				}
			}
			if(!data.list || data.list.length<this.pageSize){
				this.noMoreData = true;
			}
			console.log(this.orderList)
		    this.currentPage++;
			if(cb) cb()
		  });
		}
		againReqNewData(){
			this.currentPage = 1;
			this.noMoreData = false;
			this.orderList = []
			this.reqNewData() 
		}
		
		onInputSearch(){
			this.againReqNewData()
		}
		onClickOrder(code:any){
			uni.navigateTo({
				url:'/pages/userinfo/order_details?code='+code
			})
		}
		onClickOperate(item:any,cmd:any){
			let code = item.code
			let params:{[x:string]:any}
			if(cmd=='view'){
				uni.navigateTo({
					url:'/pages/userinfo/order_details?code='+code
				})
			}else if(cmd.indexOf('wuliu')!=-1){
				let wuliucode = cmd.slice(6)
				uni.navigateTo({
					url:'/pages/userinfo/order_logistics?code='+wuliucode
				})
			}
			if(cmd=='toPay'){
				params= {
					channel:'alipay',
					delivery:0,
					num:Number(item.num)
				}
				console.log(params)
				app.http.Post('order/topay/'+code,params,(res:any)=>{
					app.payment.paymentAlipay(res.alipay.orderInfo,()=>{
						this.reqNewData()
					})
				})
			}
			if(cmd=='receive_good'){
				uni.showModal({
					title: '提示',
					content: '是否确认已经收货？',
					success: (res)=> {
						if (res.confirm) {
							params = {
								code:code
							}
							app.http.Post('me/order/buyer/receive_good',params,(res:any)=>{
								uni.showToast({
									title:'收货成功',
									icon:'none'
								})
								this.againReqNewData()
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			}
			if(cmd=='appraise'){
				uni.navigateTo({
					url:'/pages/userinfo/orderevaluate?code='+code+'&data='+decodeURIComponent(JSON.stringify(item.good))
				})
			}
			if(cmd=='resultCard'){
				uni.navigateTo({
					url: '/pages/goods/goods_result_list?chooseIds=1&code='+item.good.goodCode
				})
			}
			if(cmd=='cancel'){
				uni.showModal({
					title: '提示',
					content: '是否取消支付该订单？',
					success: (res)=> {
						if (res.confirm) {
							params = {
								code:code
							}
							app.http.Post('me/order/buyer/cancel',params,(res:any)=>{
								uni.showToast({
									title:'取消成功',
									icon:'none'
								})
								this.againReqNewData()
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
		onClickBack(){
			uni.navigateBack({
			    delta: 1
			});
		}
		
		onClickListTabs(id:number){
			if(id==this.orderTabCheck){
				return;
			}
			this.orderTabCheck = id;
			this.againReqNewData()
		}
		
		
	}
</script>

<style lang="scss">
	page{
		background:#F6F7F8;
	}
	.header-banner{
		width: 100%;
		background:#fff;
		position: fixed;
		left:0;
		top:0;
		box-sizing: border-box ;
		z-index: 9;
	}
	.header-top{
		width: 100%;
		height:104rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 32rpx 0 0;
		z-index: 10;
		align-items: center;
		justify-content: space-between;
	}
	.header-search{
		width: 626rpx;
		height:64rpx;
		background: #F5F5F8;
		border-radius: 4rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: relative;
	}
	.header-back{
		width: 80rpx;
		height:88rpx;
		background:url(../../static/goods/back@2x.png) no-repeat center;
		background-size: 100% 100%;
	}
	.header-tab{
		width: 100%;
		height:90rpx;
		margin-top: -10rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #F1F1F4;
	}
	.order-list{
		width: 100%;
		box-sizing: border-box;
		padding: 204rpx 20rpx 20rpx 20rpx;
	}
	.search-input{
		width: 626rpx;
		height:64rpx;
		background: #F5F5F8;
		border-radius: 4rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #14151A;
		padding-left:76rpx ;
	}
	.search-icon{
		width: 28rpx;
		height:28rpx;
		background:url(../../static/index/sousuo@2x.png) no-repeat center;
		background-size:100% 100%;
		position: absolute;
		left:28rpx;
		top:50%;
		margin-top: -14rpx;
	}
</style>
