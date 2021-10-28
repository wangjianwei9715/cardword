<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="tab-header">
				<searchinput :searchText="searchText==''?'搜索商品':searchText" @clicksearch="onClickSearch"></searchinput>
			</view>
			<view class="tabs-content">
				<tabs :tabs="goodTab" :tabsCheck="goodTabCheck" @tabsClick="onClickListTabs"></tabs>
			</view>
		</view>

		<view class="live-content">
			<statusbar/>
			<liveslist :liveList="liveList" :ispullDown="pullDownRefresh" @send="onClickLive"/>
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
		pullDown = false;
		pullDownRefresh = false;
		goodTab = [
			{id:0,name:'全部'},
			{id:5,name:'我的直播'},
			{id:2,name:'直播中'},
			{id:1,name:'待直播'},
			{id:3,name:'已完成'}
		];
		goodTabCheck = 0;
		currentPage = 1;
		pageSize = 10;
		noMoreData = false;
		liveList:{[x:string]:any} = []
		searchData:any = [];
		scrollId = '';
		onLoad(query:any) {
			this.onEventUI('liveFind',(res:any)=>{
				this.searchText = res.text;
				this.currentPage = 1;
				this.liveList = [];
				this.noMoreData = false;
				this.reqNewData()
				
			})
			this.reqNewData()
		}
		//   加载更多数据
		onReachBottom() {
			if(this.scrollId==''){
				this.reqNewData()
			}else{
				this.searchReqNew()
			}
		     
		}
		onClickListTabs(id:any){
			if(id==this.goodTabCheck){
				return;
			}
			this.goodTabCheck = id;
			this.liveList = [];
			this.currentPage = 1;
			this.noMoreData = false;
			this.reqNewData()
		}
		onClickSearch(){
			// 搜索
			uni.navigateTo({
				url: '/pages/live/live_find?q='+this.searchText
			})
		}
		onClickLive(id:any){
			// #ifdef APP-PLUS
			plus.share.getServices(res => {
				let sweixin = res.find(i => i.id === 'weixin')
				if (sweixin) {
					sweixin.launchMiniProgram({
						id: 'wx15372dc7bbfb2434',
						path: '/pages/index/live?id'+id,
						type:0
					},(res:any)=>{
						console.log(res)
					})
				} else {
					// 没有获取到微信分享服务
				}
			}, err => {
				// 获取分享服务列表失败
			});
			
			// #endif
			// #ifdef MP-WEIXIN
			console.log('plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id='+id)
			wx.navigateTo({
				url: 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id='+id
			})
			// #endif
		}
		searchReqNew(){
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			let date:any = new Date()
			let params={
				highlight:1,
				timeStamp:Date.parse(date)/1000,
				scrollId:this.scrollId
			}
			
			app.http.Get('search/broadcast',params,(res:any)=>{
				this.scrollId = res.scrollId;
				this.liveList = this.liveList.concat(res.list);
				if(res.end){
					this.noMoreData = true
				}
			})
			
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			
			let params:any = {
				pageIndex:this.currentPage,
				pageSize:this.pageSize
			}
			
			if(this.goodTabCheck<5){
				params.tp = this.goodTabCheck;
				if(this.searchText){
					params.q = this.searchText
				}
				app.http.Get('broadcast',params,(data:any)=>{
					if(data.totalPage<=this.currentPage){
						this.noMoreData = true;
					}
					if(data.list){
						if(this.currentPage==1){
							this.liveList = []
						}
						this.liveList = this.liveList.concat(data.list);
						console.log('goodslist========',this.liveList)
					}
					this.currentPage++;
					if(cb) cb()
				})
			}else{
				app.http.Get('me/broadcast',params,(data:any)=>{
					if(data.totalPage<=this.currentPage){
						this.noMoreData = true;
					}
					if(data.list){
						if(this.currentPage==1){
							this.liveList = []
						}
						this.liveList = this.liveList.concat(data.list);
						console.log('goodslist========',this.liveList)
					}
					this.currentPage++;
					if(cb) cb()
				})
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		background:#F6F7F8;
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
	.tabs-content{
		width: 100%;
		margin-top: -20rpx;
	}
	.live-content{
		width: 100%;
		box-sizing: border-box;
		padding:208rpx 20rpx 20rpx 20rpx;
		
		position: relative;
		z-index: 2;
	}
</style>
