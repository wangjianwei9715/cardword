<template>
	<view class="content">
		<view class="header-banner">
			<view class="tabc-content">
				<tabc :tabc="goodTab" :tabsCheck="goodTabCheck" @tabsClick="onClickListTabs" />
			</view>
		</view>

		<view class="live-content">
			<liveslist :liveList="liveList"   @send="onClickLive"/>
			<empty v-if="liveList.length==0"/>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		goodTab = [
			{id:0,name:'全部'},
			{id:1,name:'待直播'},
			{id:2,name:'直播中'},
			{id:3,name:'已完成'}
		];
		goodTabCheck = 0;
		liveList:{[x:string]:any} = []
		currentPage = 1;
		pageSize = 20;
		noMoreData = false;
		onLoad(query:any) {
			this.reqNewData()
		}
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			let params:{[x:string]:any} = {
				
				tp:this.goodTabCheck,
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
			}
			app.http.Get('me/broadcast', params, (data: any) => {
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(data.list){
					this.liveList = this.liveList.concat(data.list);
				}else if(this.currentPage==1){
					this.liveList = []
				}
				this.currentPage++;
				if(cb) cb()
			});
		}
		onClickListTabs(id:any){
			if(id==this.goodTabCheck){
				return;
			}
			this.goodTabCheck = id
			this.currentPage = 1;
			this.noMoreData = false;
			this.liveList = []
			this.reqNewData()
		}
		onClickLive(item:any){
			console.log(item)
			return;
			
			
		}
		
	}
</script>

<style lang="scss">
	page{
		background:#F2F2F2;
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
	.tabc-content{
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
