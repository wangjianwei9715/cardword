<template>
	<view class="payment" v-show="showPayMent">
		<view class="payment-showdow" @click="onClickCancelPay"></view>
		<view class="payment-popup" :class="{'payment-popup-show':showPopup}">
			<view class="payment-header">
				<view class="icon-close" @click="onClickCancelPay"></view>
				实付金额
			</view>
			<view class="payment-center">¥<text class="payment-price">{{payPrice}}</text></view>
			<view class="payment-tip">支付方式</view>
			<view class="payment-list" v-for="(item,index) in newPayChannel" :key="index">
				<view class="payment-list-left">
					<view :class="item.name=='支付宝支付'?'icon-zfb':'icon-wx'"></view>{{item.name}}
				</view>
				<view class="payment-list-right" @click="checkPay=index">
					<view :class="checkPay==index?'payment-checked':'payment-check'"></view>
				</view>
			</view>
			<!-- <view class="payment-list">
				<view class="payment-list-left">
					<view class="icon-wx"></view>微信支付
				</view>
				<view class="payment-list-right" @click="checkPay=2">
					<view :class="checkPay==2?'payment-checked':'payment-check'"></view>
				</view>
			</view> -->
			<view class="payment-btn" @click="onClickPay">立即支付{{countTimeCopy==0?'':countStr}}</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {getCountDownTime} from '@/tools/util';
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		showPayMent!:boolean;
		@Prop({default:300})
		countTime!:number;
		@Prop({default:0})
		payPrice!:number;
		@Prop({default:[]})
		payChannel!:any;

		newPayChannel:any = [];
		showPopup = false;
		checkPay = 0;
		countStr = '';
		countInterval:any;
		countTimeCopy = 300;
		platform = '';
		@Watch('showPayMent')
		onShowChanged(val: any, oldVal: any){
			if(val){
				this.countTimeCopy = this.countTime
				this.countDownTime()
				setTimeout(()=>{
					this.showPopup = true
				},100)
			}else{
				clearInterval(this.countInterval);
				this.showPopup = false
			}
			
		}
		@Watch('payChannel')
		onPayChanged(val: any, oldVal: any){
			if(app.platform.systemInfo.platform == 'android'){
				this.platform = 'android'
			}else{
				this.platform = 'ios'
			}
			this.newPayChannel = []
			for(let i in this.payChannel){
				if(this.payChannel[i].ios == undefined || this.payChannel[i].ios == null){
					this.newPayChannel = this.payChannel
					return;
				};

				if(this.platform == 'ios' && this.payChannel[i].ios){
					this.newPayChannel.push(this.payChannel[i])
				}else if(this.platform == 'android' && this.payChannel[i].android){
					this.newPayChannel.push(this.payChannel[i])
				}
			}
			
		}
		created(){//在实例创建完成后被立即调用
			if(app.platform.systemInfo.platform == 'android'){
				this.platform = 'android'
			}else{
				this.platform = 'ios'
			}
			for(let i in this.payChannel){
				if(this.payChannel[i].ios == undefined || this.payChannel[i].ios == null){
					this.newPayChannel = this.payChannel
					return;
				};

				if(this.platform == 'ios' && this.payChannel[i].ios){
					this.newPayChannel.push(this.payChannel[i])
				}else if(this.platform == 'android' && this.payChannel[i].android){
					this.newPayChannel.push(this.payChannel[i])
				}
				
			}
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			clearInterval(this.countInterval)
		}
		onClickCancelPay(){
			this.$emit("cancelPay");
		}
		onClickPay(){
			if(this.checkPay<0){
				return;
			}
			this.$emit("pay",this.payChannel[this.checkPay])
		}
		countDownTime(){
			this.countStr = getCountDownTime(this.countTimeCopy);
			this.countInterval = setInterval(()=>{
				if(this.countTimeCopy>0){
					this.countTimeCopy--;
					this.countStr = getCountDownTime(this.countTimeCopy);
				}else{
					clearInterval(this.countInterval)
				}
			},1000)
		}
	}
</script>

<style lang="scss">
	.payment{
		width: 100%;
		box-sizing: border-box;
		&-showdow{
			width: 100%;
			height:100%;
			position: fixed;
			top:0;
			left:0;
			z-index:999;
			background: rgba(0, 0, 0, 0.5);
		}
		&-popup{
			width: 100%;
			height:calc(626rpx + env(safe-area-inset-bottom));
			position: fixed;
			box-sizing: border-box;
			background:#fff;
			border-radius: 12rpx 12rpx 0px 0px;
			z-index: 1000;
			bottom:0;
			left:0;
			transition:transform 0.2s;
			-webkit-transition: -webkit-transform 0.2s;
			transform: translateY(626rpx);
		}
		.payment-header{
			width: 100%;
			box-sizing: border-box;
			padding-top: 50rpx;
			font-size: 33rpx;
			font-family: PingFangSC-Medium;
			font-weight: 500;
			color: #333333;
			text-align: center;
			position: relative;
		}
		.payment-center{
			width: 100%;
			height:84rpx;
			margin-top: 46rpx;
			line-height: 84rpx;
			font-size: 50rpx;
			font-family: PingFangSC-Regular;
			font-weight: 600;
			color: #333333;
			text-align: center;
			margin-bottom: 48rpx;
			.payment-price{
				font-size: 73rpx;
			}
		}
		.payment-tip{
			width: 686rpx;
			margin:0 auto;
			box-sizing: border-box;
			font-size: 27rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #333333;
			padding-bottom: 30rpx;
			border-bottom: 1px solid #EDEDED;
		}
		.payment-list{
			width:100%;
			height:44rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding:0 30rpx;
			margin-top: 32rpx;
			&-left{
				height:44rpx;
				display: flex;
				box-sizing: border-box;
				align-items: center;
				font-size: 31rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #333333;
			}
			.icon-zfb{
				width: 44rpx;
				height:44rpx;
				box-sizing: border-box;
				margin-right: 20rpx;
				background:url(../../static/pay/v2/zhifubao@2x.png) no-repeat center;
				background-size: 100% 100%;
			}
			.icon-wx{
				width: 42rpx;
				height:38rpx;
				box-sizing: border-box;
				margin-right: 18rpx;
				background:url(../../static/pay/weixinzhifu@2x.png) no-repeat center;
				background-size: 100% 100%;
			}
			.payment-check{
				width: 36rpx;
				height:36rpx;
				background:url(../../static/pay/weixuan@2x.png) no-repeat center;
				background-size: 100% 100%;
			}
			.payment-checked{
				width: 36rpx;
				height:36rpx;
				background:url(../../static/pay/xuanzhong@2x.png) no-repeat center;
				background-size: 100% 100%;
			}
		}
		.payment-btn{
			width: 690rpx;
			height: 84rpx;
			background: #FF0016;
			border-radius: 4rpx;
			text-align: center;
			line-height: 84rpx;
			box-sizing: border-box;
			margin:0 auto;
			font-size: 33rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #FFFFFF;
			position:absolute;
			bottom:calc(18rpx + env(safe-area-inset-bottom));
			left:50%;
			margin-left: -345rpx;
		}
	}
	.icon-close{
		width: 32rpx;
		height:32rpx;
		background:url(../../static/pay/guanbi@2x.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left:34rpx;
		top:36rpx;
	}
	.payment-popup-show{
		transform: translateY(0);
	}
</style>
