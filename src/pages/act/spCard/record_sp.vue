<template>
	<view class="content">
		<view class="tab-header">
			<view class="tab-index" :class="{'current-tab':tabCurrent==index}" v-for="(item,index) in tabData" :key="index" @click="onClickTab(index)">{{item.name}}</view>
		</view>

		<view class="list-box" v-show="tabCurrent == 0">
			<view class="ex-index" v-for="(item,index) in tabData[tabCurrent].list" :key="index">
				<image class="ex-pic" :src="decodeURIComponent(item.pic_url)" />
				<view class="ex-right">
					<view class="ex-title">{{item.name}}</view>
					<view class="ex-time">兑换时间：{{dateFormatMSHMS(item.created_at)}}</view>
					<view class="ex-sp">sp消耗：{{item.SP_num}}</view>
					<view class="ex-wait" v-if="item.tp ==1" @click="onClickKf">联系客服发货</view>
					<view class="ex-state" v-else>已发放</view>
				</view>
			</view>
		</view>

		<view class="list-box" v-show="tabCurrent == 1">
			<view class="sp-index" v-for="(item,index) in tabData[tabCurrent].list" :key="index">
				<view class="sp-index-left">
					<view class="sp-name">{{item.tpName}}</view>
					<view class="sp-time">{{dateFormatYMSHM(item.created_at)}}</view>
				</view>
				<view class="sp-index-right">{{item.SP_num>0?'+'+item.SP_num:item.SP_num}}</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import { dateFormatMSHMS,dateFormatYMSHM} from '@/tools/util'
	@Component({})
	export default class ClassName extends BaseNode {
		dateFormatMSHMS = dateFormatMSHMS;
		dateFormatYMSHM = dateFormatYMSHM;
		tabCurrent = 0;
		tabData:{[x:string]:any} = [
			{name:'兑换明细',url:'activity/SP/exchange/record',list:[]},
			{name:'SP值明细',url:'activity/SP/record',list:[]}
		];
		currentPage = 1;
		pageSize = 20;
		noMoreData = false;
		kefuUserId = 0;
		onLoad(query:any) {
			this.reqNewData()
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData()
		}
		onClickKf(){
			uni.navigateTo({
				url: '/pages/userinfo/talk?targetUserId='+this.kefuUserId
			})
		}
		onClickTab(index:number){
			if(this.tabCurrent == index ) return;
			
			this.tabCurrent = index;
			this.currentPage = 1;
			this.noMoreData = false;
			this.reqNewData();
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) return ;
			
			let params:any = {
				pageIndex:this.currentPage,
				pageSize:this.pageSize
			}
			app.http.Get(this.tabData[this.tabCurrent].url,params,(data:any)=>{
				if(data.totalPage<=this.currentPage) this.noMoreData = true;

				if(this.tabCurrent==0) this.kefuUserId = data.kefuUserId[0] || 0;
				if(this.currentPage==1) this.tabData[this.tabCurrent].list = [];
				if(data.list) this.tabData[this.tabCurrent].list = this.tabData[this.tabCurrent].list.concat(data.list);
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
				color: #88878C;
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
			.ex-wait{
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
			.ex-state{
				position: absolute;
				right:31rpx;
				bottom:29rpx;
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #333333;
			}
		}
	}
	.sp-index{
		width: 100%;
		height: 140rpx;
		background: #FFFFFF;
		border-radius: 5rpx;
		margin-bottom: 14rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding:0 35rpx;
		.sp-index-left{
			.sp-name{
				font-size: 29rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #333333;
			}
			.sp-time{
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #88878C;
			}
		}
		.sp-index-right{
			font-size: 42rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #EF3333;
		}
	}
	
</style>
