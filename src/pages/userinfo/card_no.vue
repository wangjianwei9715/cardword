<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="header-top">
				<view class="header-back" @click="onClickBack"></view>
				<view class="header-search">
					<searchinput :searchText="searchText==''?'搜索编号':searchText" @clicksearch="onClickSearch"></searchinput>
				</view>
			</view>
			<view class="header-tab">
				<tabc :tabs="orderTab" :tabsCheck="cardTabCheck" @tabsClick="onClickListTabs"></tabc>
			</view>
		</view>

		<view class="order-list">
			<statusbar/>
			<cardNolist :cardNoData="cardNoData" />
		</view>
	</view>
</template>

<script lang="ts">
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
		cardNoData:{[x:string]:any} = [
			{id:1,title:'National Treasures Hobby 原箱',desc:'圣安东尼奥马刺 帕特里克·威廉姆斯49编好事 Apprentice Lnk #11',time:'2021-08-09 16:00',status:'已中卡*3'}
		]
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
			if(id==this.cardTabCheck){
				return;
			}
			this.cardTabCheck = id
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
