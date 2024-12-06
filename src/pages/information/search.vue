<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="tab-header">
				<view class="header-back" @click="onClickBack"></view>
				<view class="header-search">
					<view class="search-icon"></view>
					<input class="search-input"  type="text" placeholder-style="color:#AAAABB" v-model="listParams.q" placeholder="搜索" confirm-type="search" @confirm="againReqNewData"/>
				</view>
				<view class="btn-search" @click="againReqNewData">搜索</view>
			</view>
		</view>
		
		<view class="box-content">
			<statusbar/>
			<informationList class="list-box" :list="list" :type="100" :q="listParams.q"/>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	const Params = {
		pageIndex: 1,
		pageSize: 10,
		qt: 100,
		q:'',
		noMoreData:false
	}
	@Component({})
	export default class ClassName extends BaseNode {
		searchText = '';
		listParams = {...Params};
		list:any = [];
		onLoad(query:any) {
			this.onEventUI("informationChange", (res: any) => {
				if (res && res.articleCode) {
					let findItem = this.list.find((item: any) => {
						return item.articleCode == res.articleCode;
					});
					if (findItem) {
						findItem.isLikes = res.isLikes;
						findItem.likes = res.likes;
						findItem.comment = res.comment
					}
				}
			});
		}
		onReachBottom() {
			this.reqNewData() 
		}
		onClickBack(){
			uni.navigateBack({ delta: 1 });
		}
		againReqNewData(){
			this.listParams.pageIndex = 1;
			this.listParams.noMoreData = false;
			this.reqNewData()
		}
		reqNewData(cb?:Function) {
			const { listParams } = this;
 			// 获取更多商品
			if (listParams.noMoreData) {
				return;
			}
			app.http.Get('dataApi/article/homelist', listParams, (data: any) => {
				if(data.totalPage<=listParams.pageIndex){
					listParams.noMoreData = true;
				}
				if( listParams.pageIndex == 1 ) this.list = [];
				if(data.list){
					this.list = [...this.list,...data.list];
				}
				listParams.pageIndex++;
				if(cb) cb()
			});
		}
	}
</script>

<style>
	page{
		width: 100%;
		height:100%;
		background:#fff;
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
	}
	.header-back{
		width: 80rpx;
		height: 88rpx;
		background: url(../../static/goods/back@2x.png) no-repeat center;
		background-size: 100% 100%;
	}
	.header-search{
		width: 566rpx;
		height:59rpx;
		background: #F5F5F8;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: relative;
		border-radius: 29rpx;
	}
	.search-input{
		width: 500rpx;
		height:59rpx;
		background: #F5F5F5;
		border-radius: 3rpx;
		font-size: 26rpx;
		
		
		color: #14151A;
		padding-left:76rpx
	}
	.search-icon{
		width: 28rpx;
		height:28rpx;
		background:url(@/static/index/sousuo@2x.png) no-repeat center;
		background-size:100% 100%;
		position: absolute;
		left:28rpx;
		top:50%;
		margin-top: -14rpx;
	}
	.btn-search{
		font-size: 27rpx;
		
		font-weight: 600;
		color: #333333;
		margin-left:20rpx
	}
	.box-content{
		width: 100%;
		padding-top: 100rpx;
	}
	.list-box{
		width: 100%;
		background:#fff;
		box-sizing: border-box;
		margin-top: 40rpx;
	}
</style>
