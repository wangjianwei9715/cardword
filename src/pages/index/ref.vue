<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="tab-header">
				<view class="header-search">
					<view class="search-icon"></view>
					<input class="search-input" type="text"  v-model="searchTetxt" placeholder="搜索" @confirm="onClickSearch(searchTetxt)" confirm-type="search"/>
				</view>
			</view>
		</view>
		
		<view class="top-center" :style="'margin-top:'+statusBarHeight+'px'">
			<view class="search-title">历史记录<view class="icon-delete" @click="onClickDelete"></view></view>
			<view class="search-list">
				<view class="search-index" @click="onClickSearch(item)" v-for="item in historyList" :key="item">{{item}}</view>
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
		statusBarHeight = app.statusBarHeight;
		searchTetxt = ''
		historyList:{[x:string]:any} = []
		onLoad(query:any) {
			let refData = uni.getStorageSync("refData");
			if(refData){
				this.historyList = refData
			}
			
		}
		onClickBack(){
			uni.navigateBack({
			    delta: 1
			});
		}
		onClickDelete(){
			this.historyList = []
			uni.removeStorageSync("refData")
		}
		onClickSearch(text:string){
			if(text==''){
				return
			}
			// 保存本地搜索记录
			let searchText = text
			
			let refData = this.historyList
			if(refData.indexOf(searchText) == -1){
				// if(refData.length>=5){
				// 	refData.splice(4,1)
				// }else if(!refData){
				// 	refData = []
				// }
				refData.unshift(searchText)
				uni.setStorageSync("refData",refData)
			}
			
			let date:any = new Date()
			let params={
				highlight:1,
				q:encodeURIComponent(text),
				timeStamp:Date.parse(date)/1000
			}
			uni.navigateTo({
				url:'/pages/goods/goods_ref?q='+text
			})
			// app.http.Get('dataApi/search',params,(res:any)=>{
			// 	uni.redirectTo({
			// 		url: '/pages/goods/index?data='+encodeURIComponent(JSON.stringify(res))+'&q='+text
			// 	})
			// })
		}
	}
</script>

<style>
	.content{
		width: 100%;
		box-sizing: border-box;
		background:#fff;
	}
	.header-banner{
		width: 100%;
		background:#fff;
		position: fixed;
		left:0;
		top:0;
		box-sizing: border-box ;
		z-index: 9;
		padding-bottom:10rpx;
	}
	.tab-header{
		width: 100%;
		height:104rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 20rpx;
		z-index: 10;
		align-items: center;
		justify-content: space-between;
	}
	.header-search{
		width: 710rpx;
		height:64rpx;
		background: #F5F5F8;
		border-radius: 4rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: relative;
	}
	.search-input{
		width: 710rpx;
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
	.header-right{
		height:50rpx;
		line-height: 50rpx;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #14151A;
	}
	.top-center{
		width: 100%;
		box-sizing: border-box;
		padding:0 30rpx;
		padding-top: 124rpx;
	}
	.search-title{
		width: 100%;
		height:40rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		font-family: HYQiHei;
		font-weight: bold;
		color: #3B3B3B;
		display: flex;
		align-items: center;
		justify-content:space-between
	}
	.icon-delete{
		width: 29rpx;
		height:29rpx;
		/* background:url(../../static/goods/details/icon_delete.png) no-repeat center; */
		background-size: 100% 100%;
	}
	.search-list{
		width: 100%;
		box-sizing: border-box;
		margin:20rpx auto;
		display: flex;
		flex-wrap: wrap;
	}
	.search-index{
		height:56rpx;
		line-height: 56rpx;
		box-sizing: border-box;
		padding:0 24rpx;
		background: #F6F6F7;
		border-radius: 4rpx;
		text-align: center;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #767880;
		margin-right: 16rpx;
		margin-bottom: 16rpx;
	}
</style>
