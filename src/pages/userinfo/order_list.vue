<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="header-top">
				<view class="header-back" @click="onClickBack"></view>
				<view class="header-search">
					<searchinput :searchText="searchText==''?'搜索订单':searchText" @clicksearch="onClickSearch"></searchinput>
				</view>
			</view>
			<view class="header-tab">
				<tabc :tabs="orderTab" :tabsCheck="orderTabCheck" @tabsClick="onClickListTabs"></tabc>
			</view>
		</view>

		<view class="order-list">
			<statusbar/>
			<orderlist :orderList="orderList" :ispullDown="pullDownRefresh" @send="onClickOrder"/>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		searchText = '';
		orderTab = [
			{id:1,name:'全部'},
			{id:2,name:'待支付'},
			{id:3,name:'进行中'},
			{id:4,name:'待发货'},
			{id:5,name:'待收货'},
			{id:6,name:'未中卡'}
		];
		orderTabCheck = 1;
		pullDownRefresh = false;
		orderList:{[x:string]:any} = [
			{
				id:1,
				state:0,
				num:5,
				seller:{
					avatar:'',
					name:'皇球星社'
				},
				goods:{
					img:'../../static/goods/zhutu@2x.png',
					title:'20-21 National Treasures Hobby原箱*3',
					price:149
				},
				operate:[
					{cmd:'cancel',name:'取消订单'},
					{cmd:'pay',name:'立即支付'}
				]
			}
		];
		onLoad(query:any) {
			
		}
		onClickBack(){
			uni.navigateBack({
			    delta: 1
			});
		}
		onClickSearch(){
			
		}
		onClickListTabs(id:number){
			if(id==this.orderTabCheck){
				return;
			}
			this.orderTabCheck = id
		}
		onClickOrder(id:any){

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
</style>
