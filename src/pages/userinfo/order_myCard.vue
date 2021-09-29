<template>
	<view class="content">
		<view class="card-index">
			<buyCardId :cardList="cardList" :showImg="true"/>
		</view>	
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		cardList:{[x:string]:any} = [];
		orderCode = '';
		currentPage = 1;
		pageSize = 10;
		noMoreData = false;
		onLoad(query:any) {
			this.orderCode = query.code;
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
			
			app.http.Get('me/orderInfo/buyer/'+this.orderCode+'/noList', params, (data: any) => {
				console.log('idndead',data)
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(data.list){
					this.cardList = data.list;
				}
				this.currentPage++;
				if(cb) cb()
			});
		}
		
	}
</script>

<style lang="scss">
	.card-index{
		width: 100%;
		box-sizing: border-box;
		padding:20rpx
	}
</style>
