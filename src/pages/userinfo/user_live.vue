<template>
	<view class="content">
		<view class="header-banner">
			<view class="tabs-content">
				<tabc :tabs="goodTab" :tabsCheck="goodTabCheck" @tabsClick="onClickListTabs" />
			</view>
		</view>

		<view class="live-content">
			<liveslist :liveList="liveList"  @send="onClickLive"/>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		goodTab = [
			{id:1,name:'全部'},
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
			
		}
		onClickListTabs(id:any){
			if(id==this.goodTabCheck){
				return;
			}
			this.goodTabCheck = id
		}
		onClickLive(id:any){

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
	.tabs-content{
		width: 100%;
	}
	.live-content{
		width: 100%;
		box-sizing: border-box;
		padding:110rpx 20rpx 20rpx 20rpx;
		position: relative;
		z-index: 2;
	}
</style>
