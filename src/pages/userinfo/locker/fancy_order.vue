<!--
 * @FilePath: \jichao_app_2\src\pages\userinfo\locker\fancy_order.vue
 * @Author: wjw
 * @Date: 2023-05-09 11:07:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-05-10 17:21:50
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view>
		<view class="content">
			<view class="order-center">
				<image class="order-bg" src="" mode="aspectFill"/>
				<view class="order-center-info">
					<view class="order-info-title">球星卡 base</view>
					<view class="order-info-logo">
						<muqian-lazyLoad v-if="orderData.logo!=''" class="order-logo" :src="decodeURIComponent(orderData.logo)" borderRadius="50%"></muqian-lazyLoad>
						{{orderData.merchantName}}
					</view>
					<view class="order-info-num">{{orderData.num}}张</view>
				</view>
			</view>
			<view class="pay-info">
				<view class="pay-info-tips" v-show="refundTips!=''">{{refundTips}}</view>
				<view class="pay-info-total">
					<view class="pay-info-view">
						<view class="pay-info-name">运费</view>
						<view class="pay-info-desc">{{freight}}</view>
					</view>
					<view class="pay-info-view margintop">
						<view class="pay-info-name">合计</view>
						<view class="pay-info-price">{{freight}}</view>
					</view>
				</view>
			</view>
			<selectAddress :data.sync="orderData.receiver" :readOnly="true"/>
			<view class="order-info">
				<view class="title">订单信息</view>
				<view class="index" v-for="item in orderInfo" :key="item.id" v-show="item.desc!=0">
					<view class="index-left">{{item.title}}</view>
					<view class="index-right">
						{{item.title=='订单编号'||item.title=='支付方式'?item.desc:(item.desc>0?dateFormat(item.desc):'-')}}
						<view v-if="item.title=='订单编号'" class="copy" @click="onClickCopyInfo(item.desc)"></view>
					</view>
				</view>
			</view>
		</view>

		<view class="bottom-btn" v-show="operateData.length">
			<view class="small-btn-content" >
				<view class="mini-btn left" :class="{'right':index+1==operateData.length}" v-for="(item,index) in operateData" :key="index" @click="onClickOperate(item.cmd)">{{item.name}}</view>
			</view>
		</view>
		
		<payment
			:showPayMent="showPayMent"
			:payChannel="payChannel"
			:payPrice="10"
			:countTime="0"
			@cancelPay="showPayMent=false"
			@pay="onClickPayFancy"
		/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import { dateFormat } from "@/tools/util";
	import { pay } from '@/tools/interface.d'
	const mallPayChannel: pay.payChannel[] = [
		{
			android: true,
			channel: "alipay",
			channelId: 1702,
			ios: true,
			name: "支付宝支付"
		},
		{
			android: true,
			channel: "alipay_h5",
			channelId: 1704,
			ios: true,
			name: "支付宝H5支付"
		}
	]
	const orderStateMap:{[x:number]:string} = {
		0:'确认订单',
		1:'待发货',
		2:'已发货'
	}
	const operateMap:{[x:number]:any[]} = {
		0:[{cmd: "toPay", name: "立即支付"}],
		1:[],
		2:[{cmd: "del", name: "删除订单"},{cmd: "wuliu", name: "查看物流"}]
	}
	@Component({})
	export default class ClassName extends BaseNode {
		dateFormat = dateFormat;
		payChannel = mallPayChannel;
		showPayMent = false;
		operateData:any =  [];
		orderInfo:any = {
			code:{id:1,title:'订单编号',desc:''},
			payMethod:{id:2,title:'支付方式',desc:'支付宝'},
			pay_at:{id:3,title:'支付时间',desc:''},
			delivery_at:{id:6,title:'发货时间',desc:''},
			refund_at:{id:7,title:'退款时间',desc:''},
		};
		orderCode = '';
		orderData:any = {};
		onLoad(query:any) {
			this.orderCode = query.code;
			this.initEven();
		}
		onShow(){
			if(this.orderData.state==0){
				uni.showLoading({
					title: '获取订单状态中',
					mask:true
				})
				this.initEven();
			}
		}
		public get refundTips() : string {
			const { isRefund, state } = this.orderData;
			if(state==2){
				return isRefund ? '该订单与中卡订单共同发货，已自动退还运费' : ''
			}else{
				return '该订单若与中卡订单共同发货，将自动退还运费'
			}
		}
		public get freight() : string {
			return `¥${this.orderData.freight}${this.orderData.isRefund?'（已退款）':''}`
		}
		onClickOperate(cmd:string){
			if(cmd=='toPay'){
				this.showPayMent = true;
			}else if(cmd=='wuliu'){
				uni.navigateTo({
					url:`/pages/userinfo/order_logistics?code=${this.orderData.wuliuCode}`
				})
			}else if(cmd=='del'){
				uni.showModal({
					title: '提示',
					content: '删除订单后无法恢复，是否确认删除？',
					success: (event) => {
						if(event.confirm){
							app.http.Post(`me/cabinet/card/order/delete/${this.orderCode}`,{},(res:any)=>{
								uni.$emit('fancyOrderDel')
								uni.navigateBack({delta:1})
							})
						}
					}
				});
				
			}
		}
		initEven(){
			app.http.Get(`me/cabinet/card/order/detail/${this.orderCode}`,{},(res:any)=>{
				uni.hideLoading();
				uni.setNavigationBarTitle({ title: orderStateMap[res.data.state] });
				this.orderData = res.data;
				for (const key in this.orderInfo) {
					if (Object.prototype.hasOwnProperty.call(res.data, key)) {
						if(typeof(res.data[key])=='number'&&res.data[key]<0){
							this.orderInfo[key].desc = 0;
						}else{
							this.orderInfo[key].desc = res.data[key];
						}
					}
				}
				this.operateData = operateMap[res.data.state];
			})
		}
		// 复制订单号
		onClickCopyInfo(text:any){
			uni.setClipboardData({
				data: text,
				showToast:false,
				success: ()=> {
					uni.showToast({
						title:'复制成功',
						icon:'none'
					})
				}
			});
		}
		onClickPayFancy(channelData:pay.payChannel){
			const params = {
				channel:channelData.channel,
			}
			app.http.Post(`me/cabinet/card/topay/order/${this.orderCode}`,params,(res:any)=>{
				if (res.alipay.orderInfo != "") {
					app.payment.paymentAlipay(res.h5CashierAddress, res.alipay.orderInfo);
					this.showPayMent = false;
				}
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
		box-sizing: border-box;
		padding:14rpx;
	}
	.order-center{
		width: 100%;
		height:225rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding:30rpx 25rpx;
		background:#fff;
		border-radius: 3rpx;
		.order-bg{
			width: 165rpx;
			height: 165rpx;
			border-radius: 3rpx;
		}
		.order-center-info{
			width: 477rpx;
			height:165rpx;
			box-sizing: border-box;
			padding:10rpx 0 10rpx 40rpx;
		}
		.order-info-title{
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}
		.order-info-logo{
			height:35rpx;
			display: flex;
			align-items: center;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #959695;
			margin-top: 15rpx;
			margin-bottom: 40rpx;
		}
		.order-logo{
			width: 35rpx;
			height:35rpx;
			margin-right: 9rpx;
		}
		.order-info-num{
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}
	}
	
	.order-info{
		width: 100%;
		box-sizing: border-box;
		background: #fff;
		padding:30rpx 22rpx 10rpx 22rpx;
		margin-top: 14rpx;
		.title{
			width: 100%;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
			margin-bottom: 30rpx;
		}
		.index{
			width: 100%;
			display: flex;
			height:40rpx;
			align-items: center;
			margin-bottom: 20rpx;
			justify-content: space-between;
			.index-left{
				height:40rpx;
				display: flex;
				align-items: center;
				font-size: 23rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #959695;
			}
			.index-right{
				height:40rpx;
				display: flex;
				align-items: center;
				font-size: 23rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}
		}
		.copy{
			width: 20rpx;
			height:26rpx;
			background:url(@/static/order/copy.png) no-repeat center;
			background-size:100% 100%;
			margin-left: 6rpx;
		}
		
	}
	.bottom-btn{
		width: 100%;
		height:calc(120rpx);
		height:calc(120rpx + constant(safe-area-inset-bottom));
		height:calc(120rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;
		position: fixed;
		bottom:0;
		left:0;
		background:#fff;
		z-index: 9;
		display: flex;
		justify-content: center;
		padding:20rpx 39rpx 0 39rpx;
		.small-btn-content{
			width: 100%;
			height:82rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			
			.mini-btn{
				width: 335rpx;
				border:1px solid #DADADA;
				display: flex;
				align-items: center;
				justify-content: center;
				height: $btn-height;
				line-height: $btn-height;
				border-radius:$btn-radius;
				font-size: 33rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #333333;
			}
			.right{
				background: $btn-red;
				border:1px solid $btn-red;
				font-size: 33rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				margin-left: 51rpx;
			}
		}
	}
	.pay-info{
		width: 722rpx;
		background: #FFFFFF;
		border-radius: 3rpx;
		margin: 14rpx 0 ;
		overflow: hidden;
		.pay-info-tips{
			width: 100%;
			height: 51rpx;
			background: #FA1545;
			border-radius: 3rpx 3rpx 0rpx 0rpx;
			box-sizing: border-box;
			padding:0 25rpx;
			display: flex;
			align-items: center;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
		.pay-info-total{
			width: 100%;
			height:127rpx;
			box-sizing: border-box;
			padding:26rpx 25rpx;
		}
		.pay-info-view{
			width: 100%;
			display: flex;
			justify-content: space-between;
		}
		.pay-info-name{
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #959695;
		}
		.pay-info-desc{
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}
		.pay-info-price{
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}
		.margintop{
			margin-top: 20rpx;
		}
	}
</style>
