<template>
	<view class="content">
		<view class="card-list" v-for="(item,index) in goodsList" :key="index">
			<view class="order-code">订单编号：{{item.orderCode}}</view>
			<view class="card-box">
				<view class="card-index" v-for="(items,indexs) in item.noList" :key="indexs">
					<view class="index-left">{{item.name}}</view>
					<view class="index-right"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		currentPage = 1;
		pageSize = 15;
		noMoreData = false;
		goodsList:any = [];
		goodCode = '';
		reqType = 1;
		onLoad(query:any) {
			this.reqType = Number(query.type);
			this.goodCode = query.code
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
				type:this.reqType,
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
			}
			console.log('params==',params,'code==',this.goodCode)
			app.http.Get('function/decompose/good/'+this.goodCode+'/orderlist', params, (data: any) => {
				console.log('data===',data)
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				
				if(data.list){
					if(this.currentPage==1){
						this.goodsList = data.list;
					}else{
						this.goodsList = this.goodsList.concat(data.list);
					}
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
		background:#F6F7F8;
	}
	.content{
		width: 100%;
		box-sizing:border-box;
		padding:30rpx 20rppx;
	}
	.card-list{
		width: 100%;
		box-sizing: border-box;
		padding:10rpx 14rpx;
		background: #FFFFFF;
		border-radius: 10px;
	}
	.order-code{
		width: 100%;
		height:66rpx;
		box-sizing: border-box;
		padding-left: 12rpx;
		line-height: 66rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		border-bottom: 1rpx solid #E7E7E7;
	}
	.card-box{
		width: 100%;
		box-sizing: border-box;
		padding:20rpx 0;
	}
	.card-index{
		width: 100%;
		height: 113rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background:#fff;
	}
	.index-left{
		width: 540rpx;
		height: 113px;
		background: #F6F7F8;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 22rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	.index-right{
		width: 130rpx;
		height: 113px;
		background: #F6F7F8;
	}
</style>
