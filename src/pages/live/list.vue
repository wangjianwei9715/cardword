<template>
	<view class="content">
		<view class="header-banner">
			<statusbar />
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack">&#xe582;</view>
				<view class="header-search" @click="onClickLiveSearch">
					<view class="sousuo-icon"></view>
					<view style="padding-left:80rpx;color:#A3A3A3;font-size:25rpx">{{liveData.q||'商品/商家/直播'}}</view>
					<view class="search-btn">搜索</view>
				</view>
			</view>
			<tabc class="live-tabc" :tabc="tabData" :tabsCheck="liveData.liveTabCheck" @tabsClick="onClickListTabs"></tabc>
		</view>
		<view class="tab-center">
			<statusbar />
			<view class="live-content">
				<liveslist :liveList="liveList" />
			</view>
			<empty style="background:#F6F7FB" v-show="empty"/>
			<view style="width:750rpx;margin-top:20rpx">
				<u-loadmore v-show="liveData.noMoreData&&liveList.length>0" :line="true" status="nomore" />
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		tabData = [
			{id:1,name:'直播拆卡',http:'dataApi/broadcast/list/living'},
			{id:2,name:'拆卡回放',http:'dataApi/broadcast/list/playback'},
			{id:3,name:'我的拆卡',http:'me/broadcast'}
		];
		liveList = [];
		liveData = {
			pageIndex:1,
			pageSize:10,
			noMoreData:false,
			q:'',
			liveTabCheck:1,
			httpUrl:'dataApi/broadcast/list/living',
			once:true
		}
		empty = false;
		onLoad(query:any) {
			this.onEventUI("liveFind",(res)=>{
				this.initLiveData(res.text)
				this.reqNewLiveList()
			})
			this.reqNewLiveList()
		}
		onReachBottom() {
			this.reqNewLiveList();
		}
		private initLiveData(q=''){
			this.liveData.pageIndex = 1;
			this.liveData.q = q;
			this.liveData.noMoreData = false
		}
		onClickBack() {
			app.platform.pageBack()
		}
		refreshStart(cb?:Function){
			uni.$u.throttle(()=>{
				this.reqNewLiveList(() => {
					cb&&cb()
				})
			},1000)
		}
		onClickLiveSearch(){
			uni.navigateTo({
				url: `/pages/live/live_find?q=${this.liveData.q}`
			})
		}
		onClickListTabs(id: any) {
			if (id == this.liveData.liveTabCheck) {
				return;
			}
			if (id == 3 && app.token.accessToken == ''){
				app.login.arouseLogin()
				return;
			}
			this.liveData = {
				pageIndex:1,
				pageSize:10,
				noMoreData:false,
				q:this.liveData.q,
				liveTabCheck:id,
				httpUrl:this.tabData[id-1].http,
				once:false
			}
			this.reqNewLiveList()
		}
		reqNewLiveList(cb?:Function) {
			const { q, pageIndex, pageSize, noMoreData, httpUrl, once, liveTabCheck } = this.liveData; 
			if (noMoreData) return ;
			app.http.Get(httpUrl,{q,pageIndex,pageSize},(data:any)=>{
				this.liveData.once = false;
				if(data.totalPage<=pageIndex) this.liveData.noMoreData = true;
				if(pageIndex==1) this.liveList = []
				if(data.list) this.liveList = this.liveList.concat(data.list);
				this.empty = data.total == 0;
				if(once && liveTabCheck==1 && data.total == 0){
					this.onClickListTabs(2)
					return
				}
				this.liveData.pageIndex++;
				if(cb) cb()
			})
		}
	}
</script>

<style lang="scss">
	page {
		background: $content-bg
	}
	.content{
		width: 100%;
		box-sizing: border-box;
		background:#fff;
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
	.icon-back {
		width: 50rpx;
		height: 50rpx;
		background-color: rgba(255, 255, 255,0);
		font-family: uniicons;
		font-size: 46rpx;
		font-weight: normal;
		font-style: normal;
		color: #000;
	}
	.tab-header {
		width: 750rpx;
		height: 104rpx;
		display: flex;
		box-sizing: border-box;
		padding: 0 35rpx 0 20rpx;
		z-index: 10;
		align-items: center;
		justify-content: space-between;
	}
	.header-search {
		width: 614rpx;
		height: 71rpx;
		border: 3rpx solid #333333;
		border-radius: 5rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		position: relative;
		box-sizing: border-box;
		padding-right: 10rpx;
	}
	.search-btn{
		width: 100rpx;
		height: 52rpx;
		background: #FA1545;
		border-radius: 5rpx;
		font-size: 29rpx;
		
		font-weight: 600;
		color: #FFFFFF;
		text-align: center;
		line-height: 52rpx;
		position: absolute;
		right:10rpx;
		top:50%;
		margin-top: -26rpx;
	}
	.sousuo-icon {
		position: absolute;
		left:32rpx;
		top:50%;
		margin-top: -13rpx;
		width: 26rpx;
		height: 26rpx;
		background: url(../../static/index/v3/search.png) no-repeat center /100% 100%;
	}

	.search-icon {
		width: 113rpx;
		height: 54rpx;
		background: $btn-red;
		border-radius: 30rpx;
		position: absolute;
		right: 3rpx;
		top: 50%;
		margin-top: -27rpx;
		text-align: center;
		line-height: 54rpx;
		font-size: 28rpx;
		
		
		color: #FFFFFF;
		box-sizing: border-box;
	}
	.tab-center {
		width: 100%;
		height:100%;
		box-sizing: border-box;
		padding-top: 194rpx;
		background: $content-bg
	}
	.live-tabc{
		padding:0 70rpx;
		background:#fff;
		box-sizing:border-box;
	}
	.live-content{
		width: 100%;
		box-sizing: border-box;
		background:$content-bg;
		padding:20rpx 20rpx 20rpx 20rpx;
	}
</style>
