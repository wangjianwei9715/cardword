<template>
	<view class="content">
		<view class="record-top">
			<view class="record-top-title">
				<view class="free-star"></view>
				<view class="free-top-time">日期：{{recordDay}}</view>
				<view class="free-star"></view>
				<view>王牌：{{todayData.keyName}}</view>
			</view>
			<view class="record-top-exp">满足{{todayData.limit_good}}商品并且小于{{todayData.limit_seq}}限量编号的签字卡</view>
		</view>
		<view class="record-table">
			<view class="record-table-header">
				<view class="header-tab">免单用户</view>
				<view class="header-tab">免单编号</view>
				<view class="header-tab">免单金额</view>
			</view>
			<view v-show="recordList!=''" class="record-table-center" v-for="(item,index) in recordList" :key="index">
				<view class="center-tab">{{item.userName}}</view>
				<view class="center-tab">{{item.no}}</view>
				<view class="center-tab">{{item.amount}}</view>
			</view>
			<view v-show="recordList==''" class="record-null">
				暂无数据
			</view>
		</view>
		<view class="record-bottom">
			<view class="record-button button-before" @click="onClickBefore">前一天</view>
			<view class="record-button button-after" @click="onClickAfter">后一天</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import { dateFormatYMS } from "@/tools/util";
	@Component({})
	export default class ClassName extends BaseNode {
		todayData:{[x:string]:any} = {
			none:false,//是否没有配置
			keyName: "",
			point:0,
			pic:"",
			limit_good: "",
			limit_seq: ""
		};
		recordList:any = [];
		recordDay = '';
		newDay = '';
		currentPage = 1;
		pageSize = 15;
		noMoreData = false;
		dateFormatYMS = dateFormatYMS
		onLoad(query:any) {
			if(query.day){
				this.recordDay = query.day;
				this.newDay = query.day
				this.reqNewData()
			}
		}
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		reqNewData(){
			if(this.noMoreData){
				return;
			}
			let params = {
				day:this.newDay,
				pageIndex:this.currentPage,
				pageSize:this.pageSize
			}
			app.http.Get('activity/free/noList',params,(res:any)=>{
				if(res.data.none){
					uni.showToast({
						title:'暂无数据',
						icon:'none'
					})
					return;
				}
				this.recordDay = this.newDay
				if(this.currentPage==1){
					this.recordList = []
				}
				if(res.data){
					this.todayData = res.data
				}
				if(res.list){
					this.recordList.concat(res.list)
				}else{
					this.noMoreData = true
				}
				if(this.currentPage>=res.totalPage){
					this.noMoreData = true
				}
				this.currentPage++;
				
			})
		}
		getYMS(type:any,cb?:Function){
			let today = Date.parse(this.recordDay)/1000;
			if(type=='after'){
				this.newDay = dateFormatYMS(today+24*60*60)
			}else{
				this.newDay = dateFormatYMS(today-24*60*60)
			}
			if(cb) cb()

		}
		onClickBefore(){
			this.currentPage = 1;
			this.noMoreData = false;
			this.getYMS('before',()=>{
				this.reqNewData()
			})		
		}
		onClickAfter(){
			this.currentPage = 1;
			this.noMoreData = false;
			this.getYMS('after',()=>{
				this.reqNewData()
			})	
		}
	}
</script>

<style lang="scss">
	.free-star{
		width: 20rpx;
		height:20rpx;
		background:url(../static/free/star.png) no-repeat center;
		background-size: 100% 100%;
		margin-left: 20rpx;
	}
	.content{
		box-sizing: border-box;
		width:100%;
	}
	.record-top{
		width: 750rpx;
		height:148rpx;
		background: #181C1F;
		box-sizing: border-box;
		padding: 38rpx 0;
		&-title{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #53FBEE;
		}
		&-time{
			margin-right: 20rpx;
		}
		&-exp{
			width: 100%;
			text-align: center;
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			margin-top: 10rpx;
		}
	}
	.record-table{
		width: 100%;
		box-sizing: border-box;
		padding-bottom: 124rpx;
		&-header{
			width: 750rpx;
			height:97rpx;
			display: flex;
			align-items: center;
			background:#F1EBE7;
			.header-tab{
				height:97rpx;
				line-height: 97rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #886C5A;
				text-align: center;
				width: 250rpx;
			}
			
		}
		&-center{
			width: 750rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #DBDDDF;
			padding:26rpx 0;
			.center-tab{
				width: 250rpx;
				font-size: 24px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #353535;
				text-align: center;
			}
		}
		.record-null{
			width: 100%;
			color:#886C5A;
			font-size: 20rpx;
			text-align: center;
			height:100rpx;
			line-height: 100rpx;
		}
	}
	.record-bottom{
		width: 100%;
		height:124rpx;
		position: fixed;
		bottom:0;
		left:0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 16rpx;
		.record-button{
			width: 352rpx;
			height:88rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			border: 1px solid #181C1F;
		}
		.button-before{
			background:#fff;
			color: #181C1F;
		}
		.button-after{
			background:#181C1F;
			color:#fff
		}
	}
</style>
