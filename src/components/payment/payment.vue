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
			<view class="payment-list">
				<view class="payment-list-left">
					<view class="icon-zfb"></view>支付宝支付
				</view>
				<view class="payment-list-right" @click="checkPay=1">
					<view :class="checkPay==1?'payment-checked':'payment-check'"></view>
				</view>
			</view>
			<view class="payment-list">
				<view class="payment-list-left">
					<view class="icon-wx"></view>微信支付
				</view>
				<view class="payment-list-right" @click="checkPay=2">
					<view :class="checkPay==2?'payment-checked':'payment-check'"></view>
				</view>
			</view>
			<view class="payment-btn" @click="onClickPay">立即支付{{countTimeCopy==0?'':countStr}}</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {getCountDownTime} from '@/tools/util';
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		showPayMent!:boolean;
		@Prop({default:300})
		countTime!:number;
		@Prop({default:0})
		payPrice!:number;
		
		showPopup = false;
		checkPay = 1;
		countStr = '';
		countInterval:any;
		countTimeCopy = 300
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
		created(){//在实例创建完成后被立即调用
			
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
			this.$emit("pay",this.checkPay)
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
			height:626rpx;
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
			padding-top: 36rpx;
			font-size: 26rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #14151A;
			text-align: center;
			position: relative;
		}
		.payment-center{
			width: 100%;
			height:84rpx;
			margin-top: 46rpx;
			line-height: 84rpx;
			font-size: 48rpx;
			font-family:'DIN';
			font-weight: bold;
			color: #14151B;
			text-align: center;
			margin-bottom: 48rpx;
			.payment-price{
				font-size: 72rpx;
			}
		}
		.payment-tip{
			width: 100%;
			padding-left: 30rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #14151A;
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
				font-size: 26rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #14151A;
			}
			.icon-zfb{
				width: 44rpx;
				height:44rpx;
				box-sizing: border-box;
				margin-right: 16rpx;
				background:url(../../static/pay/zhifubao@2x.png) no-repeat center;
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
			width: 720rpx;
			height: 88rpx;
			background: #14151B;
			border-radius: 4rpx;
			text-align: center;
			line-height: 88rpx;
			box-sizing: border-box;
			margin:0 auto;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			margin-top: 46rpx;
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
