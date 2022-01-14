<template>
	<view class="payment" v-show="showLotteryPopup">
		<view class="payment-showdow"></view>
		<view class="payment-popup">
			<view class="popup-title">{{popupTitle}}</view>
			<view class="popup-msg">{{popupTitle}}</view>
			<view class="popup-btn" @click="onClickPopupBtn()">
				
			</view>
			<view class="popup-close" @click="onClickCancelLottery"></view>
		</view>
		
		
	</view>
</template>

<script lang="ts">
	import { Component, Prop } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		showLotteryPopup!:boolean;
		@Prop({default:'提示'})
		popupTitle!:string;


		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickCancelLottery(){
			this.$emit("cancelLotteryPopup");
		}
		onClickPopupBtn(){
			this.$emit("popupBtn");
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
			width:540rpx;
			height:530rpx;
			position: fixed;
			box-sizing: border-box;
			background:#fff;
			border-radius: 40rpx;
			z-index: 1000;
			left:50%;
			top:50%;
			margin-left: -270rpx;
			margin-top: -300rpx;
			padding-top: 50rpx;
			
			.popup-close{
				width: 52rpx;
				height:52rpx;
				position: absolute;
				right:0;
				top:-94rpx;
				background:url(../../pages/act/static/invite/close.png) no-repeat center;
				background-size: 100% 100%;
			}
		}
		
		
	}
	.popup-title{
		width: 100%;
		margin-bottom: 80rpx;
		text-align: center;
		font-size: 34rpx;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #34363A;
	}
	.popup-msg{
		width: 100%;
		box-sizing: border-box;
		padding:0 50rpx;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #34363A;
		line-height: 50rpx;
		text-align: center;
	}
	.popup-btn{
		width: 462rpx;
		height: 60rpx;
		background:#FB4E3E;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		bottom:63rpx;
		left:50%;
		margin-left:-231rpx;
		border-radius: 30rpx;
		font-size: 30rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #FFFFFF;
	}
	.popup-btn-success{
		background: #16D585;
	}
	.popup-wechat{
		width: 46rpx;
		height:37rpx;
		background:url(../../pages/act/static/invite/wechat.png) no-repeat center;
		background-size: 100% 100%;
		margin-right: 10rpx;
	}

	.rules-popup{
		width:680rpx;
		height:885rpx;
		position: fixed;
		box-sizing: border-box;
		background:#fff;
		border-radius: 40rpx;
		z-index: 1000;
		left:50%;
		top:50%;
		margin-left: -340rpx;
		margin-top: -450rpx;
		padding-top: 50rpx;
		.popup-title{
			width: 100%;
			margin-bottom: 40rpx;
			text-align: center;
			font-size: 34rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #34363A;
		}
		.popup-close{
			width: 52rpx;
			height:52rpx;
			position: absolute;
			right:0;
			top:-94rpx;
			background:url(../../pages/act/static/invite/close.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
	.popup-rules{
		width: 100%;
		box-sizing: border-box;
		padding:0 50rpx;
		margin-bottom: 40rpx;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #34363A;
		line-height: 40rpx;
	}
</style>
