<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="header-top">
				<view class="header-back" @click="onClickBack"></view>
				<view class="header-search">
					<view class="search-icon"></view>
					<input class="search-input" type="text"  v-model="searchText" placeholder="搜索" @confirm="onInputSearch" confirm-type="search" />
				</view>
			</view>
			<view class="header-tab">
				<tabc :tabs="orderTab" :tabsCheck="cardTabCheck" @tabsClick="onClickListTabs"></tabc>
			</view>
		</view>

		<view class="order-list">
			<statusbar/>
			<cardNolist :cardNoData="cardNoData" />
			<empty v-show="cardNoData.length==0"/>
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
		cardTabCheck = 1;
		orderTab = [
			{id:1,name:'全部'},
			{id:2,name:'进行中'},
			{id:3,name:'已购得'},
			{id:4,name:'未够得'}
		];
		cardNoData:{[x:string]:any} = [];
		currentPage = 1;
		pageSize = 20;
		noMoreData = false;
	
		onLoad(query:any) {
			this.reqNewData()
		}
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			
			let params:{[x:string]:any} = {
				
				tp:this.cardTabCheck-1,
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
			}
			if(this.searchText!=''){
				params.q = encodeURIComponent(this.searchText)
			}
			app.http.Get('me/cardNo', params, (data: any) => {
				console.log('idndead',data)
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(data.list){
					this.cardNoData = this.cardNoData.concat(data.list);
				}else if(this.currentPage==1){
					this.cardNoData = []
				}
				this.currentPage++;
				if(cb) cb()
			});
		}
		onInputSearch(){
			this.currentPage = 1;
			this.noMoreData = false;
			this.cardNoData = []
			this.reqNewData()
		}
		onClickBack(){
			uni.navigateBack({
			    delta: 1
			});
		}
		
		onClickListTabs(id:number){
			if(id==this.cardTabCheck){
				return;
			}
			this.cardTabCheck = id;
			this.currentPage = 1;
			this.noMoreData = false;
			this.cardNoData = []
			this.reqNewData() 
		}
	}
</script>

<style lang="scss">
	page{
		background:#F6F7F8;
	}
	.content{
		width: 100%;
		box-sizing: border-box;
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
