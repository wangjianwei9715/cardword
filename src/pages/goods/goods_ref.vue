<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="tab-header">
				<view class="header-search">
					<searchinput :searchText="searchText" @clicksearch="onClickSearch"></searchinput>
				</view>
				<view class="header-right" @click="onClickBack">取消</view>
			</view>
		</view>
		<view class="goods-lists">
			<statusbar/>
			<goodslistebay  :goodsList="goodsList" @send="onClickJumpDetails"/>
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
		goodsList:{[x:string]:any} = [];
		searchData:{[x:string]:any} = [];
		scrollId = '';
		noMoreData = false;

		onLoad(query:any) {
			if(query.q){
				this.searchText = query.q
				// #ifndef MP 
				this.searchData = JSON.parse(query.data)
				// #endif
				// #ifdef MP
				this.searchData = JSON.parse(decodeURIComponent(query.data))
				// #endif
				this.goodsList = this.searchData.list
				this.scrollId = this.searchData.scrollId
			}
		}
		onClickBack(){
			uni.navigateBack({
			    delta: 1
			});
		}
		onReachBottom(){
			this.reqNewData()
		}
		reqNewData(cb?:Function) {
		  // 获取更多商品
		  if (this.noMoreData) {
		    return;
		  }
		  let params:{[x:string]:any} = {
			scrollId:this.scrollId
		  }
		  uni.showLoading({
			title: '加载中'
		  });
		  app.http.Get("search/query_price", params, (data: any) => {
			uni.hideLoading();
			if(data.end){
				this.noMoreData = true
			}
			if(data.list){
				this.goodsList = this.goodsList.concat(data.list);
			}else{
				this.noMoreData = true;
			}
			if(cb) cb()
		  });
		}
		onClickJumpDetails(id:number){

		}
		onClickSearch(){
			uni.$emit('refBack',{text:this.searchText})
			uni.navigateBack({
				delta: 1
			});
		}
	}
</script>

<style lang="scss">
	$font-24:24rpx;
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
		width: 640rpx;
		height:64rpx;
	}
	.header-right{
		height:50rpx;
		line-height: 50rpx;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #14151A;
	}
	
	.goods-lists{
		width: 100%;
		box-sizing: border-box;
		padding: 122rpx 20rpx 60rpx 20rpx;
		background:#F6F7F8
	}
</style>
