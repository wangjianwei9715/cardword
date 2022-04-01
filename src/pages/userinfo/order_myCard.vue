<template>
	<view class="content">
		<view class="card-list"  v-show="cardList.length>0" v-for="(item,index) in cardList" :key="index">
			<view class="order-code">
				<view class="order-code-left">{{orderCode==item.orderCode?'当前订单 ':''}}订单编号：{{item.orderCode}} </view>
				<view class="order-code-right" v-if="item.guess!=''">我的预测：{{item.guess}}</view>
			</view>
			<view class="card-box">
				<view class="card-index" v-for="(items,indexs) in item.noList" :key="indexs">
					<view class="index-left" :class="{'bingo-name':item.bingo}">{{items.name}}</view>
					<view  class="index-right" @click="onClickLookCard(items)">
						{{items.content}}
						<view v-if="items.content=='已中卡'" class="index-right-pt"></view>
					</view>
				</view>
				<view class="card-more-btn" v-if="item.hasMore" @click="reqNewCardList(item.orderCode,index)">查看更多</view>
			</view>
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
		goodCode = '';
		currentPage = 1;
		pageSize = 20;
		noMoreData = false;
		picList:any = [];
		onLoad(query:any) {
			this.orderCode = query.code;
			this.goodCode = query.goodCode;
			this.reqNewData()
		}
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		onClickMore(){
			this.reqNewData() 
		}
		onClickLookCard(item:any){
			if(item.state!=2) return;

			app.http.Get('me/cardNo/'+item.id+'/hit/pic',{},(res:any)=>{
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
		onClickMoreList(code:any){
			uni.navigateTo({
				url:'/pages/userinfo/order_myAllCard?code='+code
			})
		}
		reqNewCardList(orderCode:string,index:number,cb?:Function) {
			// 获取更多商品
		
			let pageIndex = Math.floor((this.cardList[index].noList.length-50)/10);
			
			let params:{[x:string]:any} = {
				pageIndex: pageIndex+6,
				pageSize:10,
			}
			
			app.http.Get('me/orderInfo/buyer/'+orderCode+'/noList', params, (data: any) => {
				if(data.list){
					this.cardList[index].noList = this.cardList[index].noList.concat(data.list);
					if(data.list.length<10){
						this.cardList[index].hasMore = false;
					}
				}
				
				if(this.cardList[index].noList.length>=data.total){
					this.cardList[index].hasMore = false;
				}
				if(cb) cb()
			});
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
			
			app.http.Get('me/good/'+this.goodCode+'/orderNoList/'+this.orderCode, params, (data: any) => {
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(data.list){
					this.cardList = this.cardList.concat(data.list);
				}else{
					this.noMoreData = true;
					
				}
				this.currentPage++;
				if(cb) cb()
			});
		}
		
	}
</script>

<style lang="scss">
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
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.order-code-left{
		height:66rpx;
		line-height: 66rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	.order-code-right{
		height:66rpx;
		line-height: 66rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	.card-box{
		width: 100%;
		box-sizing: border-box;
		padding:20rpx 0;
	}
	.card-index{
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background:#fff;
		margin-bottom: 5rpx;
		background: #F6F7F8;
	}
	.card-more-btn{
		width: 100%;
		height:60rpx;
		line-height: 60rpx;
		text-align: center;
		color:#FB4E3E;
		font-size: 26rpx;
	}
	.index-left{
		width: 540rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 22rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		padding:10rpx 13rpx;
		border-right: 1px solid #fff;
	}
	.index-right{
		width: 140rpx;
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
		background:url(../act/static/pingtai/icon_red.png) no-repeat center;
		background-size: 100% 100%;
		margin-left:6rpx;
	}
	.index-right-pt{
		width: 12rpx;
		height:22rpx;
		background:url(../act/static/pingtai/icon_right.png) no-repeat center;
		background-size: 100% 100%;
		margin-left:6rpx;
	}
	.bingo-name{
		font-weight: bold !important;
	}
</style>
