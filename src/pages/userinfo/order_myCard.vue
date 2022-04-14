<template>
	<view class="content">
		<view class="header-banner" v-if="sortData!=''">
			<sortTab :sortData="sortData" @postSort="postSort" />
		</view>

		<view class="card-list"  v-show="cardList.length>0" v-for="(item,index) in cardList" :key="index">
			<view class="order-code">
				<view class="order-code-left"><view class="order-code-box">订单：{{item.orderCode}}</view><view class="order-code-now">{{orderCode==item.orderCode?'当前订单 ':''}}</view></view>
				<view class="order-code-right" v-if="item.guess && item.guess!=''">我的预测：{{item.guess}}</view>
				<!--  -->
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

		<view v-show="cardSortList!=''">
			<view class="card-index" v-for="(items,indexs) in cardSortList" :key="indexs">
				<view class="index-left" :class="{'bingo-name':items.bingo}">{{items.name}}</view>
				<view  class="index-right" @click="onClickLookCard(items)">
					{{items.content}}
					<view v-if="items.content=='已中卡'" class="index-right-pt"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import { myCardGoodsType } from '@/tools/switchUtil'
	@Component({})
	export default class ClassName extends BaseNode {
		myCardGoodsType = myCardGoodsType;
		cardList:{[x:string]:any} = [];
		cardSortList:{[x:string]:any} = [];
		orderCode = '';
		goodCode = '';
		currentPage = 1;
		pageSize = 30;
		noMoreData = false;
		picList:any = [];
		pintuanType = 0;
		listSort = '';
		sortData:any = [];
		onLoad(query:any) {
			this.orderCode = query.code;
			this.goodCode = query.goodCode;
			this.pintuanType = Number(query.pintuanType);
			this.sortData = this.myCardGoodsType(this.pintuanType)
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
		postSort(val:string){
			this.listSort = val;
			this.reqSearchList()
		}
		reqSearchList(){
			this.currentPage = 1;
			this.cardList = [];
			this.cardSortList = [];
			this.noMoreData = false;
			this.reqNewData()
		}
		reqNewCardList(orderCode:string,index:number,cb?:Function) {
			// 获取更多商品
			let pageIndex = Math.floor((this.cardList[index].noList.length-10)/10);
			
			let params:{[x:string]:any} = {
				pageIndex: pageIndex+2,
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
				leadOrderCode:this.orderCode
			}
			// 排序方式
			if(this.listSort!=''){
				params.sort = this.listSort
			}
			
			app.http.Get('me/good/'+this.goodCode+'/orderNoList', params, (data: any) => {
				if(data.empty){
					this.currentPage++;
					return;
				}
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(data.list){
					if(this.listSort == ''){
						this.cardList = this.cardList.concat(data.list);
					}else{
						this.cardSortList = this.cardSortList.concat(data.list);
					}	
				}
				this.currentPage++;
				if(cb) cb()
			});
		}
		
	}
</script>

<style lang="scss">
	.header-banner{
		width: 100%;
		background:#fff;
		box-sizing: border-box ;
		position: fixed;
		left:0;
		top:0;
		z-index: 9;
	}
	.content{
		width: 100%;
		box-sizing:border-box;
		padding-top: 80rpx;
	}
	.card-list{
		width: 100%;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 10px;
		margin-top: 14rpx;
	}
	.order-code{
		width: 100%;
		height:37rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.order-code-left{
		height:37rpx;
		display: flex;
		align-items: center;
	}
	.order-code-box{
		height:37rpx;
		line-height: 37rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #FFFFFF;
		background:#40444F;
		box-sizing: border-box;
		padding:0 15rpx;
	}
	.order-code-now{
		height:37rpx;
		line-height: 37rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #F5162B;
		margin-left: 12rpx;
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
		padding:0 15rpx;
	}
	.card-index{
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background:#fff;
		margin-top: 10rpx;
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
		width: 620rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 22rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #333333;
		line-height: 32rpx;
		padding:10rpx 20rpx;
		border-right: 1px solid #fff;
	}
	.index-right{
		width: 100rpx;
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
