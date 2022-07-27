<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="tab-header">
				<searchinput :searchText="searchText==''?'搜索商品':searchText" @clicksearch="onClickSearch"></searchinput>
			</view>
			<view class="tabc-content">
				<tabc :tabc="goodTab" :tabsCheck="goodTabCheck" @tabsClick="onClickListTabs"></tabc>
			</view>
		</view>

		<view class="live-content">
			<statusbar/>
			<liveslist :liveList="liveList" />
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
		goodTab = [
			{id:0,name:'全部'},
			{id:5,name:'我的拆卡'},
			{id:2,name:'拆卡中'},
			{id:1,name:'待拆卡'},
			{id:3,name:'已完成'}
		];
		goodTabCheck = 0;
		currentPage = 1;
		pageSize = 20;
		noMoreData = false;
		liveList:any = []
		onLoad(query:any) {
			this.onEventUI('liveFind',(res:any)=>{
				this.searchText = res.text;
				this.reqSearch()
			})
		}
		onShow(){
			this.reqSearch()
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData()
		}
		//   下拉刷新
		onPullDownRefresh(){
			this.reqSearch(()=>{
				setTimeout(()=>{
					uni.stopPullDownRefresh();
				},1000)
			})
		}
		onClickListTabs(id:any){
			if(id==this.goodTabCheck) return;
			
			if(id==5){
				if(app.token.accessToken == ''){
					uni.navigateTo({
						url:'/pages/login/login'
					})
					return;
				}
			}
			this.goodTabCheck = id;
			this.reqSearch()
		}
		onClickSearch(){
			// 搜索
			uni.navigateTo({
				url: '/pages/live/live_find?q='+this.searchText
			})
		}
		reqSearch(cb?:Function){
			this.currentPage = 1;
			this.noMoreData = false;
			this.reqNewData(()=>{
				if(cb) cb()
			})
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) return ;
			
			let params:any = {
				pageIndex:this.currentPage,
				pageSize:this.pageSize
			}
			let url = this.goodTabCheck<5 ? 'dataApi/broadcast' : 'me/broadcast';
			if(this.goodTabCheck<5){
				params.tp = this.goodTabCheck;
				if(this.searchText) params.q = this.searchText
			}
			app.http.Get(url,params,(data:any)=>{
				if(data.totalPage<=this.currentPage) this.noMoreData = true;
				if(this.currentPage==1) this.liveList = []
				if(data.list) this.liveList = this.liveList.concat(data.list);
				this.currentPage++;
				if(cb) cb()
			})
			
		}
	}
</script>

<style lang="scss">
	page{
		background:$content-bg;
	}
	.content{
		width: 100%;
	}
	.header-banner{
		width: 100%;
		background:#FFFFFF;
		position: fixed;
		left:0;
		top:0;
		box-sizing: border-box ;
		z-index: 9;
	}
	.tab-header{
		width: 100%;
		height:104rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 20rpx;
		z-index: 10;
		align-items: center;
	}
	.tabc-content{
		width: 100%;
		margin-top: -20rpx;
	}
	.live-content{
		width: 100%;
		box-sizing: border-box;
		padding:190rpx 13rpx 20rpx 13rpx;
		
		position: relative;
		z-index: 2;
	}
</style>
