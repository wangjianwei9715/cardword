<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="tab-header">
				<view class="header-back" @click="onClickBack"></view>
				<view class="header-search">
					<view class="search-icon"></view>
					<input class="search-input"  type="text" placeholder-style="color:#AAAABB" v-model="searchText" placeholder="搜索"  @input="againReqNewData" confirm-type="search" />
				</view>
			</view>
			<view class="header-tab">
		        <tabc :tabc="tabData" :tabsCheck="tabCheck" @tabsClick="onClickListTabs"></tabc>
		    </view>
		</view>
		
		<view class="box-content">
			<statusbar/>
			<givingCardList :codeList="codeList" :type="tabCheck" />
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		statusBarHeight = app.statusBarHeight;
		searchText = ''
		
		tabCheck = 1;
		tabData = [
			{id:1,name:'我的赠送'},
			{id:2,name:'我收到的'}
		];
		codeList:any = [];
		currentPage = 1;
		pageSize = 10;
		noMoreData = false;
		onLoad(query:any) {
			this.reqNewData() 
		}
		onReachBottom() {
		    this.reqNewData() 
		}
		onClickBack(){
			uni.navigateBack({
			    delta: 1
			});
		}
		againReqNewData(){
			this.currentPage = 1;
			this.noMoreData = false;
			this.reqNewData()
		}
		onClickListTabs(id:number){
			if(id==this.tabCheck){
				return;
			}
			this.tabCheck = id;
			this.againReqNewData();
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			// 收到 赠送
			let url = this.tabCheck==1? 'function/userNo/transfer/my/outlist' : 'function/userNo/transfer/my/inlist';

			let params:{[x:string]:any} = {
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
				q:encodeURIComponent(this.searchText )
			}
			
			app.http.Get(url, params, (data: any) => {
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if( this.currentPage == 1 ) this.codeList = [];
				if(data.list){
					this.codeList = this.codeList.concat(data.list);
				}
				this.currentPage++;
				if(cb) cb()
			});
		}
	}
</script>

<style>
	page{
		width: 100%;
		height:100%;
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
		z-index: 19;
	}
	.tab-header{
		width: 100%;
		height:88rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 20rpx 0 0;
		z-index: 10;
		align-items: center;
		justify-content: space-between;
	}
	.header-back{
		width: 80rpx;
		height:88rpx;
		background:url(../../../static/goods/back@2x.png) no-repeat center;
		background-size: 100% 100%;
	}
	.header-search{
		width: 640rpx;
		height:64rpx;
		overflow: hidden;
		background: #F5F5F8;
		border-radius: 4rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: relative;
		padding-left:28rpx ;
		border-radius: 29rpx;
	}
	.search-input{
		width: 634rpx;
		height:64rpx;
		background: #F5F5F8;
		border-radius: 4rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #14151A;
		
	}
	.search-icon{
		width: 28rpx;
		height:28rpx;
		background:url(../../../static/index/sousuo@2x.png) no-repeat center;
		background-size:100% 100%;
		margin-right: 20rpx;
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
		padding:0 32rpx;
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
	.header-tab{
		width: 100%;
	    background:#fff;
		height:90rpx;
		margin-top: -10rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #F1F1F4;
	    padding:0 100rpx;
	}
	.box-content{
        width: 100%;
        position: relative;
        z-index:10;
        box-sizing: border-box;
        padding:180rpx 20rpx 14rpx 20rpx;
    }
</style>
