<template>
	<view class="content">
		<view class="header">
			<!-- 卡币签到区域 -->
			<view class="header-content">
				<view class="header-top">
					<view class="user-bean">我的卡币：<text>{{signInfo.point}}</text><view class="bean-help" @click="onClickShowRule"></view></view>
					<view class="user-mx" @click="onClickGoRecord">奖品明细></view>
				</view>
				<view class="header-line"></view>
				<view class="header-sign">
					<view class="sign-explain">签到15天领券<text v-show="signInfo.consecutiveNum>0">已签到{{signInfo.consecutiveNum}}天</text></view>
					<button class="sign-btn" :class="{'signed-btn':signInfo.todaySignIned}" :disabled="signInfo.todaySignIned" @click="onClickSignIn">{{signInfo.todaySignIned?'今日已签到':'立即签到'}}</button>
				</view>
				<view class="header-step">
					<view class="step-index" v-for="(item,index) in signInfo.pointList" :key="index">
						<view class="step-bg" :class="{'step-complete':signInfo.consecutiveNum>=item.minDay}">{{item.coupon>0?item.coupon+'元':item.point}}</view>
						<view class="step-minday">第{{item.minDay}}天</view>
						<view class="step-line" :class="{'line-complete':signInfo.consecutiveNum>=item.minDay}" v-if="index<3"></view>
					</view>
				</view>
			</view>
		</view>

		<!-- 抽奖 兑换区域 -->
		<view class="center">
			<!-- 抽奖 -->
			<view class="luckydraw-content">
				<view class="luckydraw-title"></view>
				<view class="luckydraw-reward-content">
					<view class="luckydraw-reward-index" v-for="(item,index) in luckyDrawData" :key="index" @click="onClickGoLuckyDraw">
						<image class="luckydraw-pic" mode="aspectFit" :src="decodeURIComponent(item.pic)" />
						<view class="luckydraw-name">{{item.name}}</view>
					</view>
					<view class="luckydraw-reward-btn" @click="onClickGoLuckyDraw">
						<image class="luckydraw-btn-pic" src="../static/sign/reward_bean.png"/>
					</view>
				</view>
			</view>

			<!-- 兑换 -->
			<view class="exchange-content">
				<view class="exchange-header">
					<view class="left-title">卡币兑换</view>
					<view class="right-tips">不定期上新</view>
				</view>
				<view class="exchange-list">
					<view class="exchange-index" v-for="item in exchangeData" :key="item.id">
						<view class="exchange-num" v-show="item.leftNum>-1">剩{{item.leftNum}}件</view>
						<view class="exchange-pic-content"><image mode="aspectFit" class="exchange-pic" :src="decodeURIComponent(item.logo)" /></view>
						<view class="exchange-title">{{item.name}}</view>
						<view class="exchange-desc">{{item.price}}卡币</view>
						<button :class="item.leftNum!=0?'exchange-btn':'exchange-btn-over'" :disabled="item.leftNum==0" @click="onClickExchange(item)">兑换</button>
					</view>
				</view>
			</view>
		</view>
		

		<!-- 弹窗 -->
		<lotteryPopup :popupTitle="popupTitle" :showSignPopup="showSignPopup" :signReward="signReward" :distanceDay="distanceDay" :couponReward="couponReward" :showLotteryPopup="showLotteryPopup" :exchangePrice="exchangePrice" :popupPic="popupPic" @cancelLotteryPopup="onClickCancelLotteryPopup" @popupBtn="onClickExchangeConfirm"/>

		<!-- 规则弹窗 -->
		<rulePopup :showRulePopup="showRulePopup" @cancelRulePopup="onClickCancelRulePopup"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		signInfo:any = {};
		luckyDrawData = [
			{pic:'../static/sign/banner1.png',name:'iphone13pro'},
			{pic:'../static/sign/banner2.png',name:'Prizm'},
			{pic:'../static/sign/banner3.png',name:'优惠券'},
		]
		exchangeData = []
		popupTitle = '';
		// 兑换弹窗
		// 兑换需要卡币 图片
		showLotteryPopup = false;
		exchangePrice = 0;
		popupPic = '';
		exchangeId = 0;
		// 签到弹窗
		// 奖励 15天剩余天数 15天奖励
		showSignPopup = false;
		signReward = 0;
		distanceDay = 0;
		couponReward = 0;
		// 规则弹窗
		showRulePopup = false;
		onLoad(query:any) {
			if(app.token.accessToken == ''){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}
			app.http.Get('dataApi/point/index',{},(res:any)=>{})
			this.getExchangeData();
			this.getSignInfo();

			this.onEventUI('luckydrawEnd',(res:any)=>{
				this.getSignInfo()
			})	
		}
		onShow(){
			
		}
		// 获取签到信息
		getSignInfo(){
			app.http.Get('dataApi/point/sign/info',{},(res:any)=>{
				this.signInfo = res;
				this.couponReward = this.getPointReward(15)
			})
		}
		getExchangeData(){
			app.http.Get('dataApi/point/exchange/goodlist',{pageIndex:1,pageSize:30},(res:any)=>{
				this.exchangeData = res.list;
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
				this.distanceDay = 15 - res.consecutiveNum
				if(this.distanceDay>0){
					this.signReward = res.pointUpdated
				}else{
					this.signReward = this.couponReward
				}

				this.showSignPopup = true;
			})
		}
		// 记录
		onClickGoRecord(){
			uni.navigateTo({
				url:'/pages/act/sign/cardBean_record'
			})
		}
		onClickGoLuckyDraw(){
			uni.navigateTo({
				url:'/pages/act/sign/luckyDraw'
			})
		}
		// 兑换奖品弹窗
		onClickExchange(item:any){
			this.popupTitle = '兑换确认';
			this.exchangePrice = item.price;
			this.popupPic = item.logo;
			this.exchangeId = item.id;
			this.showLotteryPopup  = true;
		}
		// 确认兑换
		onClickExchangeConfirm(){
			this.showLotteryPopup = false;
			app.http.Post('point/exchange/exchange/'+this.exchangeId,{},(res:any)=>{
				this.signInfo.point = res.point;
				this.getExchangeData();
				uni.showToast({
					title:'兑换成功',
					icon:'none'
				})
				this.popupPic = '';
				this.exchangeId = 0;
				this.exchangePrice = 0
			})
		}
		// 弹窗取消
		onClickCancelLotteryPopup(){
			this.showLotteryPopup = false;
			this.showSignPopup = false;
			this.popupPic = '';
			this.exchangeId = 0;
			this.exchangePrice = 0
		}
		// 规则弹窗开启
		onClickShowRule(){
			this.showRulePopup = true
		}
		// 规则弹窗关闭
		onClickCancelRulePopup(){
			this.showRulePopup = false;
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
			position: relative;
		}
		.user-bean text{
			font-size: 30rpx;
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
		.sign-explain text{
			font-size: 20rpx;
			color:#FB4E3E;
			font-weight: normal;
			margin-left: 10rpx;
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
			background: $content-bg;
			position: absolute;
			right:-108rpx;
			top:31rpx;
		}
		.line-complete{
			background:#FB4E3E
		}
	}
	.center{
		width: 100%;
		box-sizing: border-box;
		padding: 0 20rpx 20rpx 20rpx;
		.luckydraw-content{
			width: 100%;
			box-sizing: border-box;
			height:345rpx;
			background: #CCD4F9;
			border-radius: 20rpx;
			padding:27rpx 15rpx 0 15rpx;
			.luckydraw-title{
				width: 680rpx;
				height:35rpx;
				background:url(../static/sign/drawing_title.png) no-repeat center;
				background-size: 100% 100%;
				margin-bottom: 23rpx;
			}
			.luckydraw-reward-content{
				width: 680rpx;
				height: 240rpx;
				background: #6284FF;
				border-radius: 10rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				padding:23rpx 15rpx 0 15rpx;
				.luckydraw-reward-index{
					width: 154rpx;
					height: 203rpx;
					background: #FFFFFF;
					border-radius: 10rpx;
					box-sizing: border-box;
					padding:17rpx 0;
					display: flex;
					flex-wrap: wrap;
					justify-content: center;
				}
				.luckydraw-pic{
					width: 107rpx;
					height:122rpx;
					margin-bottom: 10rpx;
				}
				.luckydraw-name{
					width: 117rpx;
					height: 32rpx;
					background: #F15B5C;
					border-radius: 2rpx;
					text-align: center;
					line-height: 32rpx;
					font-size: 16rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #FFFFFF;
				}
				.luckydraw-reward-btn{
					width: 135rpx;
					height: 203rpx;
					background: #CCD4F9;
					border-radius: 10rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.luckydraw-btn-pic{
					width: 115rpx;
					height:67rpx;
				}
			}
		}
		.exchange-content{
			width: 100%;
			box-sizing: border-box;
			margin-top: 32rpx;
			.exchange-header{
				width: 100%;
				height:72rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left-title{
					font-size: 30rpx;
					font-family: Microsoft YaHei;
					font-weight: bold;
					color: #4A4A4A;
				}
				.right-tips{
					font-size: 24rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #696969;
				}
			}
			.exchange-list{
				width: 100%;
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
			}
			.exchange-index{
				width: 348rpx;
				height: 477rpx;
				background: #FFFFFF;
				border-radius: 10rpx;
				box-sizing: border-box;
				margin-bottom:18rpx;
				overflow: hidden;
				position: relative;
			}
			.exchange-num{
				position: absolute;
				left:0;
				top:0;
				width: 98rpx;
				height: 37rpx;
				background: #FCEEC5;
				border-bottom-right-radius: 10rpx;
				text-align: center;
				line-height: 37rpx;
				font-size: 22rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #FB4E3E;
			}
			.exchange-pic-content{
				width: 100%;
				height:288rpx;
				display: flex;
				justify-content: center;
				box-sizing: border-box;
				padding: 38rpx 0 0 0;
			}
			.exchange-pic{
				width: 203rpx;
				height:250rpx;
			}
			.exchange-title{
				width: 100%;
				padding-left: 24rpx;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #4A4A4A;
				margin-top: 15rpx;
				box-sizing: border-box;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			.exchange-desc{
				width: 100%;
				padding-left: 27rpx;
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #FB4E3E;
				box-sizing: border-box;
			}
			.exchange-btn{
				width: 305rpx;
				height: 55rpx;
				background: #FB4E3E;
				border-radius: 28rpx;
				margin-top: 15rpx;
				box-sizing: border-box;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.exchange-btn-over{
				width: 305rpx;
				height: 55rpx;
				background: #D7D7D7;
				border-radius: 28rpx;
				margin-top: 15rpx;
				box-sizing: border-box;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
	.bean-help{
		width: 25rpx;
		height:25rpx;
		background:url(../static/sign/help.png) no-repeat center;
		background-size: 100% 100%;
		margin-left: 20rpx;
		position: absolute;
		right:-35rpx;
		top:50%;
		margin-top: -12.5rpx;
	}
</style>
