<!--
 * @FilePath: \jichao_app_2\src\pages\userinfo\locker\fancy_pay.vue
 * @Author: wjw
 * @Date: 2023-05-09 11:07:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-10-12 15:04:11
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view>
		<view class="content">
			<selectAddress :data.sync="addressData"/>

			<view class="order-center">
				<image class="order-bg" src="" mode="aspectFill"/>
				<view class="order-info">
					<view class="order-info-title">球星卡 base</view>
					<view class="order-info-logo">
						<muqian-lazyLoad v-if="fancyData.logo!=''" class="order-logo" :src="decodeURIComponent(fancyData.logo)" borderRadius="50%"></muqian-lazyLoad>
						{{fancyData.merchantName}}
					</view>
					<view class="order-info-num">{{fancyData.num}}张</view>
				</view>
			</view>

			<view class="pay-info">
				<view class="pay-info-tips">该订单若与中卡订单共同发货，将自动退还运费</view>
				<view class="pay-info-total">
					<view class="pay-info-view">
						<view class="pay-info-name">运费</view>
						<view class="pay-info-desc">¥10</view>
					</view>
					<view class="pay-info-view margintop">
						<view class="pay-info-name">合计</view>
						<view class="pay-info-price">¥10</view>
					</view>
				</view>
			</view>
		</view>

		<view class="bottom-content-box">
			<view class="bottom-content">
			<view class="money">
				<text class="money-total">合计:</text>
				<view class="money-price">¥<text>10</text></view>
			</view>
			<view class="btn-payment" @click="showPayMent=true">支付并发货</view>
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
	import { pay } from '@/tools/interface.d'
	const mallPayChannel:pay.payChannel[] = [
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
	@Component({})
	export default class ClassName extends BaseNode {
		payChannel = mallPayChannel;
		showPayMent = false;
		addressData = {
			default:false,
			detail:'',
			district:'',
			id:0,
			name:'',
			phone:'',
		};
		fancyData = {
			id:0,
			merchantName:'',
			logo:'',
			num:0
		};
		onLoad(query:any) {
			this.fancyData = JSON.parse(query.data);
		}
		//   加载更多数据
		onReachBottom() {
		}
		onClickPayFancy(channelData:pay.payChannel){
			const params = {
				channel:channelData.channel,
				deliveryId:this.addressData.id
			}
			app.http.Pay(`me/cabinet/card/topay/${this.fancyData.id}`,params,(res:any)=>{
				const order = res.orderCode;
				if (res.alipay.orderInfo != "") {
					app.payment.paymentAlipay(res.h5CashierAddress, res.alipay.orderInfo,()=>{
						this.redirectToOrder(order)
					});
				}
			})
		}
		redirectToOrder(order:string){
			uni.redirectTo({
				url: `/pages/userinfo/locker/fancy_order?code=${order}`,
			});
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
	.bottom-content-box{
		width: 100%;
		height: calc(120rpx);
		height: calc(120rpx + constant(safe-area-inset-bottom));
		height: calc(120rpx + env(safe-area-inset-bottom));
		position: fixed;
		bottom: 0;
		left:0;
		background: #ffffff;
		box-sizing: border-box;
		padding:0 14rpx 0 40rpx;
	}
	.bottom-content {
		width: 100%;
		height: 120rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.money {
		height:60rpx;
		margin-left: 16rpx;
		display: flex;
		align-items: flex-end;
		line-height: 80rpx;
	}
	.money-total {
		font-size: 25rpx;
		
		
		color: #88878C;
		line-height: 28rpx;
	}
	.money-price {
		height:40rpx;
		font-size: 29rpx;
		
		font-weight: 600;
		color: $btn-red;
		line-height: 40rpx;
		margin-left: 12rpx;
	}
	.money-price text{
		font-size: 42rpx;
		
		font-weight: 600;
	}
	.btn-payment {
		width:428rpx;
		background: $btn-red;
		color: #FFFFFF;
		box-sizing: border-box;
		text-align: center;
		height: $btn-height;
		line-height: $btn-height;
		font-size: 33rpx;
		
		font-weight: 600;
		color: #FFFFFF;
		border-radius:$btn-radius;
	}
	.order-center{
		width: 100%;
		height:225rpx;
		margin-top: 15rpx;
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
		.order-info{
			width: 477rpx;
			height:165rpx;
			box-sizing: border-box;
			padding:10rpx 0 10rpx 40rpx;
		}
		.order-info-title{
			font-size: 25rpx;
			
			font-weight: 600;
			color: #333333;
		}
		.order-info-logo{
			height:35rpx;
			display: flex;
			align-items: center;
			font-size: 21rpx;
			
			
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
			
			font-weight: 600;
			color: #333333;
		}
	}
	.pay-info{
		width: 722rpx;
		height: 178rpx;
		background: #FFFFFF;
		border-radius: 3rpx;
		margin-top: 14rpx;
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
			
			
			color: #959695;
		}
		.pay-info-desc{
			font-size: 21rpx;
			
			
			color: #333333;
		}
		.pay-info-price{
			font-size: 25rpx;
			
			font-weight: 600;
			color: #333333;
		}
		.margintop{
			margin-top: 20rpx;
		}
	}
</style>
