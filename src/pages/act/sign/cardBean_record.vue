<template>
	<view>
		<view class="header-tab">
			<tabc :tabc="tab" :tabsCheck="tabCheck" @tabsClick="onClickListTabs"></tabc>
		</view>
		<view class="content">
			<view class="record-list">
				<view class="record-index" v-for="(item,index) in recordList" :key="index">
					<image class="record-image" :src="decodeURIComponent(item.logo)" mode="aspectFit" />
					<view class="record-right">
						<view class="detail-top">
							<view class="detail-name">{{item.name}}</view>
							<view class="detail-text">兑换时间：{{dateFormatYMSHM(item.exchangeAt)}}</view>
							<view class="detail-text">消耗卡币：{{item.price}}</view>
						</view>
						<view class="detail-state">
							{{item.goodTp==1?'券编号：'+item.couponCode:(item.goodTp==3?'已发放':switchState(item.state))}}
							<button class="wuliu-btn" v-if="item.wuliuCode!=''" @click="onClickWuliu(item.wuliuCode)">查看物流</button>
						</view>
					</view>
				</view>
			</view>
			
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
			{id:1,name:'卡币兑换'},
			{id:2,name:'卡币抽奖'}
		];
		tabCheck = 1;
		onLoad(query:any) {
			this.reqNewData();
			
		}
		
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		onClickWuliu(wuliucode:string){
			uni.navigateTo({
				url:'/pages/userinfo/order_logistics?code='+wuliucode
			})
		}
		onClickListTabs(id:number){
			if(id==this.tabCheck){
				return;
			}
			this.tabCheck = id;
			this.noMoreData = false;
			this.currentPage = 1;
			this.reqNewData()
		}
		switchState(state:number){
			switch(state){
				case 0:
					return '已发放';
				case 1:
					return '待发货';
				case 2:
					return '已发货';
				case 3:
					return '已收货' 
			}
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			
			let params:{[x:string]:any} = {
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
				tp:this.tabCheck
			}
			app.http.Get('point/exchange/myRecordlist',params,(data:any)=>{
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
		background:$content-bg;
	}
	.content{
		width: 100%;
		box-sizing: border-box;
		padding:118rpx 20rpx 20rpx 20rpx
	}
	.header-tab{
		width: 100%;
		height:90rpx;
		padding:0 150rpx;
		box-sizing: border-box;
		background:#fff;
		position: fixed;
		left:0;
		top:0;
	}
	.record-list{
		width: 100%;
		box-sizing: border-box;
	}
	.record-index{
		width: 710rpx;
		height:196rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin-bottom: 26rpx;
		display: flex;
		box-sizing: border-box;
		padding:20rpx 30rpx;
		align-items: center;
		justify-content: space-between;
	}
	.record-image{
		width: 140rpx;
		height:154rpx;
	}
	.record-right{
		width: 475rpx;
		height:156rpx;
	}
	.detail-top{
		width: 100%;
		height:110rpx;
		border-bottom: 1rpx solid #E7E7E7;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding-bottom: 10rpx;
		box-sizing: border-box;
	}
	.detail-name{
		width: 100%;
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	.detail-text{
		width: 100%;
		font-size: 20rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #B8B7B7;
	}
	.detail-state{
		width: 100%;
		height:46rpx;
		box-sizing: border-box;
		padding-top: 20rpx;
		font-size: 20rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FB4E3E;
		position: relative;
	}
	.wuliu-btn{
		box-sizing: border-box;
		padding:0 10rpx;
		position: absolute;
		right:0;
		bottom:0;
		height: 35rpx;
		background: #FB4E3E;
		border-radius: 30rpx;
		text-align: center;
		line-height: 35rpx;
		font-size: 20rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #fff
	}
</style>
