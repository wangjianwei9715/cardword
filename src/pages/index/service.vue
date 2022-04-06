<template>
	<view class="content">
		<view class="index" @click="onClickGoCalendar">
			<view class="header">
				<view class="header-left">发售日历</view>
				<view class="header-right"><view class="icon-right2"></view></view>
			</view>
			<view class="header-tips">新品发售  抢先知晓~</view>
			<view class="reward">
				<view class="reward-index" v-for="(item,index) in calendarList" :key="index">
					<image class="reward-img" :src="decodeURIComponent(item.pic_url_cover)" mode="aspectFill"></image>
					<view class="reward-name">{{dateFormatMSCustom(item.public_day,'/')}}</view>
				</view>
			</view>
		</view>
		<!-- <button type="primary" @click="testSyncFunc">testSyncFunc</button> -->
		<!-- <view class="index" @click="onClickGoDecompose">
			<view class="header">
				<view class="header-left">卡片分解(测试版)</view>
				<view class="header-right">{{decomposeNum}}件可分解</view>
			</view>
			<view class="header-tips">分解中得卡片 获得各种奖品</view>
			<view class="reward">
				<view class="reward-index" v-for="(item,index) in rewardList" :key="index">
					<image class="reward-img" :src="item.icon"></image>
					<view class="reward-name">{{item.name}}</view>
				</view>
			</view>
		</view> -->
		
		<view class="index" @click="onClickGoRef">
			<view class="header">
				<view class="header-left">卡片查询</view>
			</view>
			<view class="header-tips">卡片价格快速查询~</view>
			<view class="icon-search"></view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import { dateFormatMSCustom } from "../../tools/util"
	@Component({})
	export default class ClassName extends BaseNode {
		dateFormatMSCustom = dateFormatMSCustom;
		decomposeNum = 0;
		rewardList:{[x:string]:any} = [
			{icon:'../act/static/pingtai/icon1.png',name:'卡豆'},
			{icon:'../act/static/pingtai/icon.png',name:'优惠券'}
		];
		calendarList:{[x:string]:any} = [];
		testModule:any;
		noData = true;
		onLoad(query:any) {
			this.initEvent()

			this.onEventUI("loginSuccess", () => {
				if(this.noData){
					this.initEvent()
				}
			});
		}
		initEvent(){
			if(app.token.accessToken == ''){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}
			this.noData = false;
			// this.testModule = uni.requireNativePlugin("TestModule");
			app.http.Get('function/calendar/index',{},(res:any)=>{
				this.calendarList = res.data.calendar
			})
			// app.http.Get('function/decompose/index',{},(res:any)=>{
			// 	this.decomposeNum = res.data.goodNum
			// })
		}
		testSyncFunc(){
			
			
			var ret = this.testModule.testSyncFunc()
			console.log('testmodule==',ret)
			uni.showToast({
				title:'调用同步方法 ' + ret,
				icon: "none"
			})

		}
		onClickGoCalendar(){
			uni.navigateTo({
				url:'/pages/act/calendar/list'
			})
		}
		onClickGoDecompose(){
			uni.navigateTo({
				url:'/pages/act/decompose/index'
			})
		}
		onClickGoRef(){
			uni.navigateTo({
				url:'/pages/act/service/ref'
			})
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
		padding:13rpx
	}
	.index{
		width: 100%;
		background: #FFFFFF;
		box-sizing: border-box;
		padding:32rpx 25rpx;
		margin-bottom: 17rpx;
		position:relative
	}
	.header{
		width: 100%;
		height:30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12rpx;
	}
	.header-left{
		height:30rpx;
		line-height: 30rpx;
		font-size: 28rpx;
		font-family: Alibaba PuHuiTi;
		font-weight: 500;
		color: #333333;
	}
	.header-right{
		height:40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: normal;
		color: #9E9E9E;
		display: flex;
		align-items: center;
	}
	.header-tips{
		width: 100%;
		font-size: 26rpx;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		color: #87868B;
	}
	.reward{
		width: 100%;
		height:170rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: 24rpx;

	}
	.reward-index{
		width: 162rpx;
		height:170rpx;
		margin-right: 7rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.reward-img{
		width: 162rpx;
		height:124rpx;
	}
	.reward-name{
		width: 130rpx;
		height:30rpx;
		line-height: 30rpx;
		margin-top: 10rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #5D5D5D;
		text-align: center;
	}
	.service-tips{
		width: 100%;
		text-align: center;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #B0B0B0;
		margin-top: 30rpx;
	}
	.icon-right2{
		width: 13rpx;
		height:21rpx;
		background:url(../../static/index/v2/icon_right.png) no-repeat center;
		background-size: 100% 100%;
	}
	.icon-search{
		width: 31rpx;
		height:32rpx;
		position: absolute;
		right:28rpx;
		top:50%;
		margin-top: -20rpx;
		background:url(../../static/index/v2/sousuo.png) no-repeat center;
		background-size: 100% 100%;

	}
</style>
