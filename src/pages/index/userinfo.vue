<template>
	<view class="content">
		<view class="user-header">
			
			<view class="setting-content">
				<view class="icon-setting" @click="onClickSetting"></view>
				<view class="icon-xiaoxi" @click="onClickMessage"><view class="xiaoxi-num">6</view></view>
			</view>
			<view class="userinfo"  @click="onClickUserInfo">
				<view class="left">
					<image class="user-avatar" :src="infoData.avatar" mode="aspectFit"></image>
					<view class="userinfo-index">
						<view class="userinfo-name">{{infoData.name}}</view>
						<view class="userinfo-sign">{{infoData.sign}}</view>
					</view>
				</view>
				<view class="right"></view>
			</view>
			<view class="header-tab">
				<view class="tab" v-for="item in headerTab" :key="item.id" @click="onClickNavigateto(item.url)">
					<view class="num">{{item.num}}</view>
					<view class="name">{{item.name}}</view>
				</view>
			</view>
		</view>

		<view class="user-order">
			<view class="header">
				<view class="title">我的订单</view>
				<view class="right" @click="onClickOrderList(1)">全部<view class="icon-right"></view></view>
			</view>
			<view class="tab-content">
				<view class="tab" v-for="item in orderTab" :key="item.id" @click="onClickOrderList(item.id)">
					<view class="icon-content">
						<view :class="'icon-'+item.icon"></view>
					</view>
					<view class="name">{{item.name}}</view>
				</view>
			</view>
			<view class="order-tip" v-show="countTime>0"  @click="onClickOrderList(2)">您有{{countNum}}个未支付订单 {{countStr}} 后失效<view class="right"></view></view>
		</view>

		<view class="orther-setting">
			<view class="setting" v-for="item in settingTab" :key="item.id" @click="onClickNavigateto(item.url)">
				<view class="name">{{item.name}}</view>
				<view class="icon-right"></view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import {getCountDownTime} from '@/tools/util';
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseNode {
		infoData:{[x:string]:any} = [];
		headerTab:{[x: string]: any} = {
			no:{id:1,name:'我的编号',num:1591,url:'/pages/userinfo/card_no'},
			broadcast:{id:2,name:'我的直播',num:66,url:'/pages/userinfo/user_live'},
			favorite:{id:3,name:'我的收藏',num:0,url:'/pages/userinfo/user_collect'}
		};
		orderTab = [
			{id:3,name:'进行中',icon:'jx'},
			{id:4,name:'待发货',icon:'fh'},
			{id:5,name:'待收货',icon:'sh'},
			{id:6,name:'未中卡',icon:'zk'}
		];
		settingTab = [
			{id:1,name:'地址管理',url:'/pages/userinfo/setting_addresses'},
			{id:2,name:'联系客服',url:''},
			{id:3,name:'常见问题',url:''},
			{id:4,name:'用户协议',url:''},
			{id:5,name:'关于我们',url:''},
			{id:6,name:'加入群聊',url:''},
		]
		countInterval:any;
		countTime = 0;
		countNum = 0;
		countStr = '';
		
		onLoad(query:any) {
			
			
		}
		onShow(){
			this.initPageData();
			
		}
		onHide(){
			clearInterval(this.countInterval)
		}
		initPageData(cb?:Function){
			if(app.token.accessToken == ''){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}
			app.http.Get('me/home',{},(res:any)=>{
				let data = res.data;
				this.infoData = data;
				this.infoData.avatar = decodeURIComponent(data.avatar)
				console.log(this.infoData)
				// 我的直播、编号、收藏
				for (const key in this.headerTab) {
					if (Object.prototype.hasOwnProperty.call(data, key)) {
						this.headerTab[key].num = data[key];
					}
				}
				// 未支付订单
				if(data.toPay){
					this.countNum = data.toPay.num;
					this.countTime = data.toPay.leftSec;
					this.countDownTime()
				}
				if(cb) cb()

			});
		}
		onClickNavigateto(url:any){
			uni.navigateTo({
				url:url
			})
		}
		onClickSetting(){
			uni.navigateTo({
				url:'/pages/userinfo/setting'
			})
		}
		onClickMessage(){
			uni.navigateTo({
				url:'/pages/userinfo/message'
			})
		}
		onClickUserInfo(){
			uni.navigateTo({
				url:'/pages/userinfo/user_info?data='+encodeURIComponent(JSON.stringify(this.infoData))
			})

		}
		onClickOrderList(id:number){
			uni.navigateTo({
				url:'/pages/userinfo/order_list?type='+id
			})
		}
		countDownTime(){
			this.countStr = getCountDownTime(this.countTime);
			this.countInterval = this.scheduler(()=>{
				if(this.countTime>0){
					console.log(this.countTime)
					this.countTime--;
					this.countStr = getCountDownTime(this.countTime);
				}else{
					clearInterval(this.countInterval)
				}
			},1)
		}
		
	}
</script>

<style lang="scss">
	.icon-right{
		width: 10rpx;
		height:16rpx;
		background:url(../../static/goods/jinru@2x.png)	no-repeat center;
		background-size: 100% 100%;
		margin-left: 8rpx;			
	}
	.user-header{
		width: 750rpx;
		height:436rpx;
		background:url(../../static/userinfo/bg@2x.png) no-repeat center;
		background-size: 100% 100%;
		border-bottom: 20rpx solid #F6F7F8;
		box-sizing: border-box;
		padding-top: 78rpx;
		.setting-content{
			width: 100%;
			height:48rpx;
			box-sizing: border-box;
			display: flex;
			padding:0 40rpx;
			align-items: flex-end;
			justify-content: flex-end;
			margin-top: 20rpx;
			.icon-setting{
				width: 40rpx;
				height:44rpx;
				background:url(../../static/userinfo/shezhi@2x.png) no-repeat center;
				background-size: 100% 100%;
			}
			.icon-xiaoxi{
				width: 38rpx;
				height:48rpx;
				background:url(../../static/userinfo/xiaoxi@2x.png) no-repeat center;
				background-size: 100% 100%;
				margin-left: 48rpx;
				position: relative;
				.xiaoxi-num{
					width: 32rpx;
					height:32rpx;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					background:#FF4349;
					position: absolute;
					right:-10rpx;
					top:-10rpx;
				}
			}
		}
		.userinfo{
			width: 100%;
			height:100rpx;
			display: flex;
			box-sizing: border-box;
			padding:0 32rpx;
			margin-top: 32rpx;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 40rpx;
			.left{
				width: 660rpx;
				height:100rpx;
				display: flex;
				box-sizing: border-box;
				align-items: center;
				.user-avatar{
					width: 100rpx;
					height:100rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 20rpx;
				}
				.userinfo-index{
					width: 540rpx;
					height:100rpx;
					box-sizing: border-box;
					padding:8rpx 0;
					.userinfo-name{
						width: 100%;
						font-size: 32rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						color: #14151A;
						margin-bottom: 8rpx;
					}
					.userinfo-sign{
						width: 100%;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #7F7F8E;
					}
				}
			}
			.right{
				width: 14rpx;
				height:26rpx;
				background:url(../../static/goods/icon_righ_back.png) no-repeat center;
				background-size: 100% 100%;
			}
		}
		.header-tab{
			width: 100%;
			height:80rpx;
			box-sizing: border-box;
			padding:0 100rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.tab{
				height:80rpx;
				box-sizing: border-box;
				.num{
					height:42rpx;
					font-size: 36rpx;
					font-family: DINAlternate-Bold, DINAlternate;
					font-weight: bold;
					color: #14151A;
					text-align: center;
					margin-bottom: 4rpx;
				}
				.name{
					height:34rpx;
					text-align: center;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #AAAABB;
				}
			}
		}
	}
	.user-order{
		width: 100%;
		box-sizing: border-box;
		padding:24rpx 0 0 0;
		border-bottom: 20rpx solid #F6F7F8;
		.header{
			width: 100%;
			height:40rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 24rpx;
			padding:0 32rpx;
			.title{
				height:40rpx;
				line-height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #14151A;
			}
			.right{
				height:40rpx;
				display: flex;
				align-items: center;
				font-size: 22rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #A9ABB4;
				
			}
		}
		.tab-content{
			width: 100%;
			height:84rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 72rpx;
			margin-bottom: 24rpx;
			.tab{
				width: 80rpx;
				height:84rpx;
				box-sizing: border-box;
				.icon-content{
					width: 80rpx;
					height:40rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 12rpx;
					.icon-jx{
						width: 40rpx;
						height:40rpx;
						background:url(../../static/userinfo/jinxing@2x.png) no-repeat center;
						background-size: 100% 100%;
					}
					.icon-fh{
						width:34rpx;
						height:34rpx;
						background:url(../../static/userinfo/fahuo@2x.png) no-repeat center;
						background-size: 100% 100%;
					}
					.icon-sh{
						width: 40rpx;
						height:34rpx;
						background:url(../../static/userinfo/shouhuo@2x.png) no-repeat center;
						background-size: 100% 100%;
					}
					.icon-zk{
						width: 28rpx;
						height:38rpx;
						background:url(../../static/userinfo/zhongka@2x.png) no-repeat center;
						background-size: 100% 100%;
					}
				}
				.name{
					width: 80rpx;
					height:32rpx;
					text-align: center;
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #14151A;
				}
			}
		}
		.order-tip{
			width: 750rpx;
			height: 60rpx;
			background: linear-gradient(90deg, #FD8339 0%, #F24B28 100%);
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			.right{
				width: 10rpx;
				height:16rpx;
				background:url(../../static/userinfo/jinru@2x.png) no-repeat center;
				background-size: 100% 100%;
				margin-left:12rpx;
				margin-top: 2px;
			}
		}
	}
	.orther-setting{
		width: 100%;
		box-sizing: border-box;
		padding:0 32rpx;
		border-bottom: 20rpx solid 	#F6F7F8;
		.setting{
			width: 100%;
			height:98rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #F1F1F4;
			.name{
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #14151A;
			}
		}
	}
</style>
