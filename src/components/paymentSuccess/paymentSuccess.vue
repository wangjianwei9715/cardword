<template>
	<view class="payment" v-show="showPaySuccess">
		<view class="payment-showdow" ></view>
		<view class="payment-popup">
			<view class="popup-icon1"></view>
			<view class="popup-text1">支付成功</view>
			<view class="popup-icon2"></view>
			<view class="popup-icon3"></view>
			<view class="popup-text2">截图微信扫码加入社群</view>
			<view class="popup-text3">不定期送福利</view>
			<view class="popup-close" @click="onClickCancelPay"></view>
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
		showPaySuccess!:boolean;




		
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickCancelPay(){
			this.$emit("cancelPaySuccess");
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
			width:606rpx;
			height:820rpx;
			position: fixed;
			box-sizing: border-box;
			background:#fff;
			border-radius: 40rpx;
			z-index: 1000;
			position: absolute;
			left:50%;
			top:50%;
			margin-left: -303rpx;
			margin-top: -510rpx;
			padding-top: 57rpx;
			.popup-text1{
				width: 100%;
				text-align: center;
				font-size: 32rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				color: #34363A;
				margin-bottom: 47rpx;
			}
			.popup-text2{
				width: 100%;
				text-align: center;
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				color: #34363A;
				margin-bottom: 18rpx;
			}
			.popup-text3{
				width: 100%;
				text-align: center;
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				color: #FB4E3E;
			}
			.popup-icon1{
				width: 48rpx;
				height:48rpx;
				background:url(../../static/userinfo/pay_gou.png) no-repeat center;
				background-size: 100% 100%;
				margin:0 auto;
				margin-bottom: 14rpx;
			}
			.popup-icon2{
				width: 283rpx;
				height:52rpx;
				background:url(../../static/userinfo/pay_title.png) no-repeat center;
				background-size: 100% 100%;
				margin:0 auto;
				margin-bottom: 22rpx;
			}
			.popup-icon3{
				width: 372rpx;
				height:373rpx;
				background:url(../../static/userinfo/pay_erweima.png) no-repeat center;
				background-size: 100% 100%;
				margin:0 auto;
				margin-bottom: 31rpx;
			}
			.popup-close{
				width: 63rpx;
				height:63rpx;
				position: absolute;
				bottom:-86rpx;
				left:50%;
				margin-left: -31.5rpx;
				background:url(../../static/goods/close.png) no-repeat center;
				background-size: 100% 100%;
			}
		}
		
		
	}
	
</style>
