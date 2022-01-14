<template>
	<view class="content">
		<view class="header">
			<!-- 卡豆签到区域 -->
			<view class="header-content">
				<view class="header-top">
					<view class="user-bean">我的卡豆：<text>{{signInfo.point}}</text></view>
					<view class="user-mx">奖品明细></view>
				</view>
				<view class="header-line"></view>
				<view class="header-sign">
					<view class="sign-explain">签到15天领券</view>
					<button class="sign-btn" :class="{'signed-btn':signInfo.todaySignIned}" :disabled="signInfo.todaySignIned" @click="onClickSignIn">{{signInfo.todaySignIned?'今日已签到':'立即签到'}}</button>
				</view>
				<view class="header-step">
					<view class="step-index" v-for="(item,index) in signInfo.pointList" :key="index">
						<view class="step-bg" :class="{'step-complete':signInfo.consecutiveNum>=item.minDay}">{{item.coupon?item.coupon:item.point}}</view>
						<view class="step-minday">第{{item.minDay}}天</view>
						<view class="step-line" :class="{'line-complete':signInfo.consecutiveNum>=item.minDay}" v-if="index<3"></view>
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
		signInfo:any = {};
		onLoad(query:any) {
			this.getSignInfo()
		}
		// 获取签到信息
		getSignInfo(){
			app.http.Get('point/sign/info',{},(res:any)=>{
				this.signInfo = res;
				console.log('signInfo=====',res)
			})
		}
		// 获取签到日期获取的奖励
		getPointReward(day:number){
			for(let i in this.signInfo.pointList){
				if(day>=this.signInfo.pointList[i].minDay&&day<=this.signInfo.pointList[i].MaxDay){
					if(day == 15){
						return this.signInfo.pointList[i].coupon
					}
					return this.signInfo.pointList[i].point
				}
			}
		}
		// 今日签到
		onClickSignIn(){
			if(this.signInfo.todaySignIned) return;

			app.http.Post('point/sign/request',{},(res:any)=>{
				this.signInfo.point = res.point;
				this.signInfo.todaySignIned = res.todaySignIned;
				this.signInfo.consecutiveNum = res.consecutiveNum;
			})
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#F4F5F9
	}
	.header{
		width: 100%;
		height:717rpx;
		background:url(../static/sign/sign_bg.jpg) no-repeat center;
		background-size: 100% 100%;
		box-sizing:border-box;
		padding-top: 335rpx;
		.header-content{
			width: 710rpx;
			height: 350rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			margin:0 auto;
			box-sizing: border-box;
			padding:0 14rpx;
		}
		.header-top{
			width: 100%;
			height:71rpx;
			box-sizing: border-box;
			padding:0 17rpx 0 22rpx;
			display: flex;
			align-items: flex-end;
			flex-wrap: wrap;
			justify-content: space-between;
		}
		.user-bean{
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #4A4A4A;
		}
		.user-bean text{
			font-size: 30rpx;
			font-family: LTGBK;
			color:#FB4E3E;
		}
		.user-mx{
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #C5C5C5;
			padding-bottom: 11rpx;
		}
		.header-line{
			width: 682rpx;
			height:34rpx;
			background:url(../static/sign/header_line.png) no-repeat center;
			background-size: 100% 100%;
		}
		.header-sign{
			width: 100%;
			height:62rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding:0 10rpx 0 22rpx;
		}
		.sign-explain{
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #4A4A4A;
		}
		.sign-btn{
			width: 180rpx;
			height: 50rpx;
			background: #FB4E3E;
			border-radius: 25rpx;
			text-align: center;
			line-height: 50rpx;
			font-size: 26rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			margin:0;
		}
		.signed-btn{
			background:#F4F5F9;
			color:#C5C5C5
		}
		.header-step{
			width: 100%;
			height:120rpx;
			margin-top: 23rpx;
			box-sizing: border-box;
			padding:0 10rpx 0 22rpx;
			display: flex;
			justify-content: space-between;
		}
		
		.step-index{
			width: 80rpx;
			height:120rpx;
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			position: relative;
		}
		.step-bg{
			width: 66rpx;
			height:66rpx;
			background:url(../static/sign/step_bg1.png) no-repeat center;
			background-size: 100% 100%;
			display: flex;
			box-sizing: border-box;
			align-items: center;
			justify-content: center;
			font-size: 22rpx;
			font-family: LTGBK;
			font-weight: 400;
			color: #A29E9F;
		}
		.step-complete{
			background:url(../static/sign/step_bg2.png) no-repeat center;
			background-size: 100% 100%;
			color:#fff;
		}
		.step-minday{
			width: 100%;
			text-align: center;
			font-size: 22rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #4A4A4A;
			padding-left: 5rpx;
			margin-top: 10rpx;
		}
		.step-line{
			width: 93rpx;
			height: 4rpx;
			background: #F2F2F2;
			position: absolute;
			right:-108rpx;
			top:31rpx;
		}
		.line-complete{
			background:#FB4E3E
		}
	}

</style>
