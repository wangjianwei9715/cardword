<!--
 * @FilePath: \jichao_app_2\src\pages\userinfo\locker\fancy.vue
 * @Author: wjw
 * @Date: 2023-05-09 11:07:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-05-10 17:32:11
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="content">
		<view class="header-tab">
			<tabc :tabc="tabData" :tabsCheck="tabCheck" @tabsClick="onClickListTabs"></tabc>
		</view>
		<view class="box-content">
			<view class="locker-index" v-for="(item,index) in lockerList" :key="index" v-show="tabCheck==0">
				<view class="locker-left">
					<view class="locker-left-info">
						<muqian-lazyLoad v-if="item.logo!=''" class="locker-logo" :src="decodeURIComponent(item.logo)" borderRadius="50%"></muqian-lazyLoad>
						{{item.merchantName}}
					</view>
					<view class="locker-left-num">
						寄存卡片：<text>{{item.num}}张</text>
					</view>
				</view>
				<view class="locker-btn" @click="onClickGoPay(item)">发货</view>
			</view>

			<view class="order-index" v-for="(item,index) in lockerList" :key="index" v-show="tabCheck!=0">
				<view class="order-index-top">
					<view class="order-top-left">
						<muqian-lazyLoad v-if="item.logo!=''" class="order-logo" :src="decodeURIComponent(item.logo)" borderRadius="50%"></muqian-lazyLoad>
						{{item.merchantName}}
					</view>
					<view class="order-top-state">{{item.stateName}}</view>
				</view>
				<view class="order-center">
					<image class="order-bg" :src="item.pic"  mode="aspectFill"/>
					<view class="order-info">
						<view class="order-info-title">球星卡 base</view>
						<view class="order-info-freight">运费:{{item.freight}}元</view>
						<view class="order-info-num">{{item.num}}张</view>
					</view>
				</view>
				<view class="order-bottom">
					<view class="order-btn" @click="onClickOrderDetail(item)">详情</view>
					<view class="order-btn wuliu-btn" v-show="item.wuliuCode!=''" @click="onClickGoWuliu(item)">查看物流</view>
				</view>
			</view>
		</view>
		<empty v-show="empty" />
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	const urlMap:{[key:number]:string} = {
		0:'me/cabinet/card/list',
		1:'me/cabinet/card/deliver/list',
		2:'me/cabinet/card/deliver/list'
	}
	const tab = [
		{id:0,name:'寄存中'},
		{id:1,name:'待发货'},
		{id:2,name:'已发货'}
	]
	@Component({})
	export default class ClassName extends BaseNode {
		tabCheck:number = 0;
		tabData = tab;
		listParams = {
			fetchFrom: 1,
			fetchSize: 10,
			noMoreData:false
		}
		empty = false;
		lockerList = [];
		onLoad(query:any) {
			this.reqNewData();
			uni.$on('fancyOrderDel',()=>{
				this.refreshList()
			})
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData() 
		}
		//   下拉刷新
		onPullDownRefresh() {
			this.refreshList(() => {
				uni.stopPullDownRefresh();
			})
		}
		refreshList(cb?:Function){
			this.empty = false;
			this.lockerList = [];
			this.listParams.fetchFrom = 1;
			this.listParams.noMoreData = false;
			this.reqNewData(cb&&cb())
		}
		onClickListTabs(id:number){
			if(id==this.tabCheck){
				return;
			}
			this.tabCheck = id;
			this.refreshList()
		}
		reqNewData(cb?: Function) {
			// 获取更多商品
			const { fetchFrom, fetchSize, noMoreData } = this.listParams;
			if (noMoreData)  return;

			app.http.Get(urlMap[this.tabCheck], {fetchFrom,fetchSize,state:this.tabCheck}, (data: any) => {
				let arr = data.list || [];
				this.lockerList = fetchFrom == 1 ? arr : [...this.lockerList, ...arr];
				this.empty = this.lockerList.length == 0;
				this.listParams.noMoreData = data.isFetchEnd;
				this.listParams.fetchFrom+=fetchSize;
				if (cb) cb();
			});
		}
		onClickOrderDetail(item:any){
			uni.navigateTo({
				url: `/pages/userinfo/locker/fancy_order?code=${item.orderCode}`
			});
		}
		onClickGoPay(item:any){
			uni.navigateTo({
				url: `/pages/userinfo/locker/fancy_pay?data=${encodeURIComponent(JSON.stringify(item))}`
			});
		}
		onClickGoWuliu(item:any){
			uni.navigateTo({
				url:`/pages/userinfo/order_logistics?code=${item.wuliuCode}`
			})
		}

	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#F6F7F8;
	}
	.header-tab{
		width: 100%;
		background:#fff;
		height:90rpx;
		margin-top: -10rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #F1F1F4;
		padding:0 60rpx;
	}
	.box-content{
		width: 100%;
		box-sizing: border-box;
		padding:14rpx;
	}
	.locker-index{
		width: 100%;
		height:153rpx;
		background: #FFFFFF;
		border-radius: 3px;
		box-sizing: border-box;
		padding:30rpx 40rpx;
		display: flex;
		align-items: center;
		margin-bottom: 14rpx;
	}
	.locker-left{
		width: 506rpx;
		height:93rpx;
	}
	.locker-left-info{
		height:50rpx;
		display: flex;
		align-items: center;
		font-size: 25rpx;
		
		font-weight: 400;
		color: #333333;
	}
	.locker-logo{
		width: 50rpx;
		height:50rpx;
		margin-right: 14rpx;
	}
	.locker-left-num{
		margin-top: 18rpx;
		font-size: 23rpx;
		
		font-weight: 400;
		color: #949494;
	}
	.locker-left-num text{
		color:#333333
	}
	.locker-btn{
		width: 137rpx;
		height: 50rpx;
		background: #FA1545;
		border-radius: 3rpx;
		text-align: center;
		line-height: 50rpx;
		font-size: 25rpx;
		
		font-weight: 600;
		color: #FFFFFF;
	}
	.order-index{
		width: 100%;
		background: #FFFFFF;
		border-radius: 3rpx;
		margin-bottom: 14rpx;
		box-sizing: border-box;
		padding:30rpx 40rpx;
	}
	.order-index-top{
		width: 100%;
		height:45rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.order-top-left{
			height:45rpx;
			display: flex;
			align-items: center;
			font-size: 21rpx;
			
			font-weight: 400;
			color: #959695;
		}
		.order-logo{
			width: 45rpx;
			height:45rpx;
			margin-right: 11rpx;
		}
	}
	.order-center{
		width: 100%;
		height:165rpx;
		margin-top: 17rpx;
		display: flex;
		align-items: center;
		.order-bg{
			width: 165rpx;
			height: 165rpx;
			border-radius: 3rpx;
		}
		.order-info{
			width: 477rpx;
			height:165rpx;
			box-sizing: border-box;
			padding:10rpx 0 10rpx 40rpx;
		}
		.order-info-title{
			font-size: 25rpx;
			
			font-weight: 600;
			color: #333333;
		}
		.order-info-freight{
			font-size: 21rpx;
			
			font-weight: 400;
			color: #959695;
			margin:15rpx 0 46rpx 0;
		}
		.order-info-num{
			font-size: 25rpx;
			
			font-weight: 600;
			color: #333333;
		}
	}
	.order-bottom{
		width: 100%;
		height:54rpx;
		margin-top: 16rpx;
		display: flex;
		justify-content: flex-end;
		.order-btn{
			width: 138rpx;
			height: 51rpx;
			border: 1px solid #959699;
			border-radius: 3rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 25rpx;
			
			font-weight: 400;
			color: #333333;
			margin-left: 28rpx;
		}
		.wuliu-btn{
			background:#FA1545;
			border:1px solid #FA1545;
			color:#FFFFFF;
		}
	}
</style>
