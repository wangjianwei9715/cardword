<template>
	<view class="content">
		<view class="card-index">
			<buyCardId :cardList="cardList" :showImg="true"/>
		</view>	
		<view class="card-bottom">
			<view class="small-btn" @click="onClickMore">加载更多</view>
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
		pageSize = 15;
		noMoreData = false;
		onLoad(query:any) {
			this.orderCode = query.code;
			this.reqNewData()
		}
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		onClickMore(){
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
					uni.showToast({
						title:'已经到底了',
						icon:'none'
					})
				}
				if(data.list){
					this.cardList = this.cardList.concat(data.list);
					uni.showToast({
						title:'加载成功',
						icon:'none'
					})
				}else{
					this.noMoreData = true;
					uni.showToast({
						title:'已经到底了',
						icon:'none'
					})
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
		padding:20rpx;
		padding-bottom: 140rpx;
	}
	.card-bottom{
		width: 100%;
		height:120rpx;
		position: fixed;
		bottom:0;
		left:0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background:#fff;
		box-sizing: border-box;
		padding:0 20rpx
	}
	.small-btn{
		width: 100%;
		height: 80rpx;
		border-radius: 4rpx;
		border: 1px solid #14151B;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151B;
	}
</style>
