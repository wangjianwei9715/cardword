<template>
	<view class="content">
		<navigationbarTabs ref="rNavigationbarTabs" :colorBlack="true" :titles="titles" :current="headerCurrent" backColor="#fff" backgroundColor="rgba(0,0,0,0)" @tabsClisk="onClickListTabs"/>
		<view class="header-container">
			<view class="search-container">
				<view class="search-box" @click="onClickLiveSearch">
					<image class="search-icon" src="@/static/index/v3/icon_search.png"></image>
					<text class="search-text">{{liveData.q||'商品/商家/直播'}}</text>
				</view>
			</view>
		</view>
		<view class="tab-center">
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
	import navigationbarTabs from "@/components/navigationbarTabs/navigationbarTabs.vue"
	const titles = [
		{id:0,name:'我的',http:'me/broadcast'},
		{id:1,name:'直播',http:'dataApi/broadcast/list/living'},
		{id:2,name:'回放',http:'dataApi/broadcast/list/playback'},
	]
	@Component({
		components:{navigationbarTabs}
	})
	export default class ClassName extends BaseNode {
		titles = titles;
		tabData = [
			{id:1,name:'直播拆卡',http:'dataApi/broadcast/list/living'},
			{id:2,name:'拆卡回放',http:'dataApi/broadcast/list/playback'},
			{id:3,name:'我的拆卡',http:'me/broadcast'}
		];
		headerCurrent = 1;
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
		onPageScroll(data: any) {
			//@ts-ignore
			this.$refs.rNavigationbarTabs.setPageScroll(data)
		}
		onReachBottom() {
			this.reqNewLiveList();
		}
		private initLiveData(q=''){
			this.liveData.pageIndex = 1;
			this.liveData.q = q;
			this.liveData.noMoreData = false
		}
		onTabsClick(e:any){
			if(e.index == this.headerCurrent) return;
			this.headerCurrent = e.index;
			console.log('this.headerCurrent=',this.headerCurrent)
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
		onClickListTabs({index,http}: any) {
			if (index == this.liveData.liveTabCheck) {
				return;
			}
			this.headerCurrent = index;
			if (index == 0 && app.token.accessToken == ''){
				app.login.arouseLogin()
				return;
			}
			this.liveData = {
				pageIndex:1,
				pageSize:10,
				noMoreData:false,
				q:this.liveData.q,
				liveTabCheck:index,
				httpUrl:http,
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
	.tab-center {
		width: 100%;
		height:100%;
		box-sizing: border-box;
		background: $content-bg;
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
	.header-container{
		width: 750rpx;
		height:288rpx;
		background: url(@/static/index/v3/bg/live.png) no-repeat top/100% 288rpx;
		position: relative;
	}
	.search-container{
		width: 100%;
		height: 105rpx;
		background: #fff; 	
		position: absolute;
		bottom:0;
		left:0;
	}
	.search-box{
		width: 726rpx;
		height: 65rpx;
		background: #F6F7FB; 	
		border-radius: 5rpx;
		position: absolute;
		bottom:20rpx;
		left:50%;
		margin-left: -363rpx;
		padding-left: 81rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.search-icon {
		position: absolute;
		left:33rpx;
		top:20rpx;
		width: 28rpx;
		height: 29rpx;
	}
	.search-text{
		font-size: 26rpx;
		color: #B0B0B0;
	}
</style>
