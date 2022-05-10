<template>
	<view class="content">
		<navigationSearch :navigatetoTitle="'该商品的卡密'" :searchText="searchText" :searchEmit="searchEmit"/>
		<statusbar/>
		<view class="header-banner" >
			<view class="order-type">
				<view class="order-type-index" :class="{'type-current':item.type==typeTabCurrent}" v-for="(item,index) in typeTab" :key="index" @click="onClickTypeCurrent(item.type)">{{item.name}}</view>
			</view>
			<sortTab v-if="sortData!=''" :sortData="sortData" @postSort="postSort" />
		</view>
		<view class="card-box">
			<view class="card-index" v-for="(items,indexs) in cardList" :key="indexs">
				<view class="index-left" :class="{'bingo-name':items.bingo}" v-html="getNameReward(items.name)"></view>
				<view  class="index-right" :class="{'winning-card':items.state==2}" @click="onClickLookCard(items)">
					{{items.content}}
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
		typeTab = [
			{name:'当前订单',type:1},
			{name:'全部订单',type:2}
		]
		typeTabCurrent = 1;
		orderCode = '';
		goodCode = '';
		currentPage = 1;
		pageSize = 30;
		noMoreData = false;
		picList:any = [];
		pintuanType = 0;
		listSort = '';
		sortData:any = [];
		searchText = '';
		searchEmit = 'orderMyCard';
		typeTabClick = false;
		onLoad(query:any) {
			this.orderCode = query.code;
			this.goodCode = query.goodCode;
			this.pintuanType = Number(query.pintuanType);
			this.sortData = this.myCardGoodsType(this.pintuanType)
			this.reqNewData()

			this.onEventUI(this.searchEmit,(res)=>{
				this.searchText = res;
				this.reqSearchList()
			})
		}
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		getNameReward(name:string){
			return name
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
		onClickTypeCurrent(type:number){
			if(type == this.typeTabCurrent) return;
			if(this.typeTabClick){
				uni.showToast({
					title:'请勿连续点击',
					icon:'none'
				})
				return;
			}
			this.typeTabClick = true;
			setTimeout(()=>{
				this.typeTabClick = false;
			},1000)
			this.typeTabCurrent = type;
			this.reqSearchList()
		}
		postSort(val:string){
			this.listSort = val;
			this.reqSearchList()
		}
		reqSearchList(){
			this.currentPage = 1;
			this.noMoreData = false;
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
			// 排序方式
			if(this.listSort!='') params.sort = this.listSort;
			if(this.typeTabCurrent == 1) params.leadOrderCode = this.orderCode;
			if(this.searchText!='') params.q = this.searchText;
			
			app.http.Get('me/good/'+this.goodCode+'/orderNoList', params, (data: any) => {
				if(data.empty){
					this.currentPage++;
					return;
				}
				if(data.totalPage<=this.currentPage) this.noMoreData = true;
				if(this.currentPage==1) this.cardList = [];

				if(data.list){
					this.cardList = this.cardList.concat(data.list);
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
		z-index: 9;
		margin-bottom: 10rpx;
	}
	.order-type{
		width: 685rpx;
		height:62rpx;
		background:#F2F2F2;
		margin:0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding:0 4rpx;
		margin-bottom: 20rpx;
	}
	
	.content{
		width: 100%;
		box-sizing:border-box;
		padding-top: 108rpx;
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
		color: $btn-red;
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
		padding:0 14rpx;
	}
	.card-index{
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		background:#fff;
		margin-top: 10rpx;
		
	}
	.order-type-index{
		width: 338rpx;
		height:54rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 29rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #959699;
	}
	.type-current{
		background:#fff;
		color:#333;
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
		width: 610rpx;
		min-height: 96rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 22rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #333333;
		line-height: 32rpx;
		padding:10rpx 20rpx;
		background: #F6F7F8;
	}
	.index-right{
		width: 86rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 21rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color:#fff;
		background:#CCCCCC;
		margin-right: 8rpx;
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
	.winning-card{
		background:#ef3333;
		color:#fff;
	}
</style>
