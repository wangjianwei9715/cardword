<template>
	<view class="content">
		<view class="header-banner" :style="pullDown?'position:absolute':''" >
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
		statusBarHeight = app.statusBarHeight;
		searchText = '';
		pullDown = false;
		pullDownRefresh = false;
		goodTab = [
			{id:1,name:'全部'},
			{id:2,name:'我的直播'},
			{id:3,name:'直播中'},
			{id:4,name:'待直播'},
			{id:5,name:'已完成'}
		];
		goodTabCheck = 1;
		liveList:{[x:string]:any} = [
			{
				id:1,
				status:1,
				name:'卡皇球星社',
				title:'20-21 National  Hobby原箱*3',
				pic:'../../static/goods/zhutu@2x.png'
			},
			{
				id:2,
				status:0,
				name:'卡皇球星社',
				title:'20-21 National  Hobby原箱*3',
				pic:'../../static/goods/zhutu@2x.png'
			},
			{
				id:3,
				status:1,
				name:'卡皇球星社',
				title:'20-21 National  Hobby原箱*3',
				pic:'../../static/goods/zhutu@2x.png'
			},
			{
				id:4,
				status:0,
				name:'卡皇球星社',
				title:'20-21 National  Hobby原箱*3',
				pic:'../../static/goods/zhutu@2x.png'
			},
			{
				id:5,
				status:-1,
				name:'卡皇球星社',
				title:'20-21 National  Hobby原箱*3',
				pic:'../../static/goods/zhutu@2x.png'
			},
			{
				id:6,
				status:-1,
				name:'卡皇球星社',
				title:'20-21 National  Hobby原箱*3',
				pic:'../../static/goods/zhutu@2x.png'
			},
			{
				id:7,
				status:-1,
				name:'卡皇球星社',
				title:'20-21 National  Hobby原箱*3',
				pic:'../../static/goods/zhutu@2x.png'
			},
			{
				id:8,
				status:-1,
				name:'卡皇球星社',
				title:'20-21 National  Hobby原箱*3',
				pic:'../../static/goods/zhutu@2x.png'
			}

		]
		onLoad(query:any) {
			this.onEventUI('liveFind',(res:any)=>{
				this.searchText = res
			})
		}
		onPageScroll(e:any){
			if(e.scrollTop>=0){
				this.pullDown = false
			}else{
				this.pullDown = true
			}
		}
		onClickListTabs(id:any){
			if(id==this.goodTabCheck){
				return;
			}
			this.goodTabCheck = id
		}
		onClickSearch(){
			// 搜索
			uni.navigateTo({
				url: '/pages/live/live_find?q='+this.searchText
			})
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
