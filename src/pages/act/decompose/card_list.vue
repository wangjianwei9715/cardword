<template>
	<view class="content">
		<view class="card-list" v-for="(item,index) in goodsList" :key="index">
			<view class="order-code">订单编号：{{item.orderCode}}</view>
			<view class="card-box">
				<view class="card-index" v-for="(items,indexs) in item.noList" :key="indexs">
					<view class="index-left">{{items.name}}</view>
					<view  :class="{'index-right':true,'red-color':reqType==1}" @click="onClickGetPic(items)">
						{{reqType==1?'已中卡':'已分解'}}
						<view class="index-right-red"></view>
					</view>
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
		picList:any = []
		onLoad(query:any) {
			if(query.type){
				this.reqType = Number(query.type);
				this.goodCode = query.code
			}
			this.reqNewData()
		}
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		onClickGetPic(item:any){
			app.http.Get(`me/cardNo/${item.uuid&&item.uuid!=''?item.uuid:item.id}/hit/pic`,{},(res:any)=>{
				this.picList = [];
				for(let i in res.list){
					this.picList.push(decodeURIComponent(res.list[i]))
				}
				uni.previewImage({
					urls: this.picList,
					current:0,
					indicator: "number" 
				});
			})
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			
			let params:{[x:string]:any} = {
				tp:this.reqType,
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
			}
			app.http.Get('function/decompose/good/'+this.goodCode+'/orderlist', params, (data: any) => {
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(this.currentPage==1) this.goodsList = [];
				if(data.list){
					this.goodsList = this.goodsList.concat(data.list);
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
		padding:30rpx 20rpx;
	}
	.card-list{
		width: 100%;
		box-sizing: border-box;
		padding:10rpx 14rpx;
		background: #FFFFFF;
		border-radius: 10px;
		margin-bottom: 22rpx;
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
		margin-bottom: 5rpx;
	}
	.index-left{
		width: 540rpx;
		height: 113rpx;
		background: #F6F7F8;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 22rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		padding:0 13rpx;
	}
	.index-right{
		width: 140rpx;
		height: 113rpx;
		background: #F6F7F8;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color:#666666;
	}
	.red-color{
		color:#FB4E3E
	}
	.index-right-red{
		width: 12rpx;
		height:22rpx;
		background:url(../static/pingtai/icon_red.png) no-repeat center;
		background-size: 100% 100%;
		margin-left:6rpx;
	}
</style>
