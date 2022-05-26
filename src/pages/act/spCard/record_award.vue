<template>
	<view class="content">
		<view class="tab-header">
			<view class="tab-index" :class="{'current-tab':tabCurrent==index}" v-for="(item,index) in tabData" :key="index" @click="onClickTab(index)">{{item.name}}</view>
		</view>

		<view class="list-box">
			<view class="ex-index" v-for="(item,index) in awardList" :key="index">
				<image class="ex-pic" :src="decodeURIComponent(item.pic_url)" @click="onClickPreviewImage(decodeURIComponent(item.pic_url))"/>
				<view class="ex-right">
					<view class="ex-title">{{item.name}}</view>
					<view class="ex-time" v-if="item.total_num!=0">剩{{item.total_num-item.get_num}}份</view>
					<view class="ex-sp">sp消耗：{{item.exchange_num}}</view>
					<view class="ex-btn" v-if="tabCurrent==0" @click="onClickExchange(item)">立即兑换</view>
					<view class="ex-btn ex-btned" v-else>已兑完</view>
				</view>
			</view>
		</view>

		<popupSp :showPopup="showPopup" :award="awardData" :popupType="popupType" @popupClose="showPopup=false" @popupConfirm="onClickConfirmEx"></popupSp>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		tabCurrent = 0;
		tabData:{[x:string]:any} = [
			{name:'兑换中'},
			{name:'已兑完'}
		];
		awardList:{[x:string]:any} = [];
		currentPage = 1;
		pageSize = 20;
		noMoreData = false;
		showPopup = false;
		popupType = '';
		awardData:{[x:string]:any} = {};
		exIng = false;
		onLoad(query:any) {
			this.reqNewData()
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData()
		}
		// 观看大图
		onClickPreviewImage(img: string) {
			uni.previewImage({
				urls: [img],
				current: 0,
				indicator: "number"
			});
		}
		onClickTab(index:number){
			if(this.tabCurrent == index ) return;
			
			this.tabCurrent = index;
			this.currentPage = 1;
			this.noMoreData = false;
			this.reqNewData();
		}
		onClickExchange(item:any){
			this.awardData = item;
			this.popupType = '';
			this.showPopup = true;
		}
		onClickConfirmEx(){
			if(this.exIng) return;
			this.exIng = true;
			this.showPopup = false;
			setTimeout(()=>{
				this.exIng = false;
			},1000)
			app.http.Post('activity/SP/exchange/award/'+this.awardData.id,{},(res:any)=>{
				this.awardData.total_num = res.total_num;
				this.awardData.get_num = res.get_num;
				uni.$emit('spChange',{mySP:res.mySP})
				this.popupType = 'totas';
				this.showPopup = true;
			})
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) return ;
			
			let params:any = {
				pageIndex:this.currentPage,
				pageSize:this.pageSize,
				status:this.tabCurrent+1
			}
			app.http.Get('activity/award/list',params,(data:any)=>{
				if(data.totalPage<=this.currentPage) this.noMoreData = true;
				if(this.currentPage==1) this.awardList = [];
				if(data.list) this.awardList = this.awardList.concat(data.list);
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
		background:#F6F7FB;
	}
	.tab-header{
		width: 100%;
		height:95rpx;
		background:#fff;
		position: fixed;
		// #ifdef H5
		top:80rpx;
		// #endif
		// #ifndef H5
		top:0;
		// #endif
		left:0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding:0 120rpx;
		z-index: 2;
		.tab-index{
			height:95rpx;
			line-height: 95rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #959699;
		}
		.current-tab{
			font-size: 31rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}
	}
	.list-box{
		width: 100%;
		box-sizing: border-box;
		padding:109rpx 14rpx 14rpx 14rpx;
		.ex-index{
			width: 100%;
			height:208rpx;
			background:#fff;
			border-radius: 5rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding:0 12rpx;
			margin-bottom: 14rpx;
			.ex-pic{
				width: 165rpx;
				height: 165rpx;
				border-radius: 3rpx;
			}
			.ex-right{
				width: 500rpx;
				height:208rpx;
				box-sizing: border-box;
				position: relative;
			}
			.ex-title{
				width: 100%;
				font-size: 29rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #333333;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				padding-top: 35rpx;
			}
			.ex-time{
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #EFBE35;
			}
			.ex-sp{
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				position: absolute;
				bottom:28rpx;
				left:0
			}
			.ex-btn{
				width: 181rpx;
				height: 43rpx;
				background: #5846B2;
				border-radius: 3rpx;
				text-align: center;
				line-height: 43rpx;
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				position: absolute;
				bottom:20rpx;
				right:17rpx;
			}
			.ex-btned{
				background:#DBDBDB;
			}
			
		}
	}

	
</style>
