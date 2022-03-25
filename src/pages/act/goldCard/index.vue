<template>
	<view class="content">
		
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		userRanking:any = '';
		rankList:any = [];
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
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
			}
			
			app.http.Get("activity/userGoodNoShowGold/index", params, (res: any) => {
				if(res.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				this.userRanking = res.data.userRanking
				if(res.data.list){
					this.rankList = this.rankList.concat(res.data.list);
				}
				this.currentPage++;
				if(cb) cb()
			});
		}
		
		
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
	}
</style>
