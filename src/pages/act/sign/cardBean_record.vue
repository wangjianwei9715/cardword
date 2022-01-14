<template>
	<view>
		<view class="header-tab">
			<tabc :tabc="tab" :tabsCheck="tabCheck" @tabsClick="onClickListTabs"></tabc>
		</view>
		<view class="content">
			
			
			<empty v-show="showEmpty" />
		</view>
	</view>
	
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import { dateFormatYMSHM } from '@/tools/util'
	@Component({})
	export default class ClassName extends BaseNode {
		dateFormatYMSHM = dateFormatYMSHM;
		showExplain:any = [];
		recordList:any = [];
		currentPage = 1;
        pageSize = 20;
		noMoreData = false;
 		showEmpty = false;
		tab = [
			{id:1,name:'卡豆兑换'},
			{id:2,name:'卡豆抽奖'}
		];
		tabCheck = 1;
		onLoad(query:any) {
			this.reqNewData();
			
		}
		
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		onClickListTabs(id:number){
			if(id==this.tabCheck){
				return;
			}
			this.tabCheck = id;
			this.noMoreData = false;
			this.currentPage = 1;
			this.recordList = [];
			this.reqNewData()
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			
			let params:{[x:string]:any} = {
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
				state:this.tabCheck
			}
			app.http.Get('me/coupon/list',params,(data:any)=>{
				console.log(data)
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(this.currentPage==1){
					this.recordList = [];
					if(!data.list){
						this.showEmpty = true
					}
				}

				if(data.list){
					this.showEmpty = false;
					this.recordList = this.recordList.concat(data.list)
				}
				this.currentPage++;
				if(cb) cb()
				
			})
		}
		
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#F2F2F2;
	}
	.content{
		width: 100%;
		box-sizing: border-box;
		padding:28rpx 20rpx 120rpx 20rpx
	}
	.header-tab{
		width: 100%;
		height:90rpx;
		padding:0 150rpx;
		box-sizing: border-box;
		background:#fff;
	}
</style>
