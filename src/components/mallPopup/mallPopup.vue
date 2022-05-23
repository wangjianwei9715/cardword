<template>
	<view>	
		<view class="exchange-popup" v-show="showPopup"></view>
		<view v-if="popupStep==1" class="popup-box" :class="{'showbox':showPopup}">
			<view class="popup-close" @click="onClickClose"></view>
			<view class="popup-title">确认兑换</view>
			<view class="pic-box">
				<image class="popup-pic" mode="aspectFill" :src="awardData.pic" />
			</view>
			<view class="popup-explain">兑换后无法取消，可在"奖品明细"中查看兑换记录。</view>
			<view class="popup-ts">(兑换实物将使用您的默认地址发货，请提前确认)</view>
			<view class="popup-btn" @click="onClickConfirm">确认兑换（{{awardData.price}}卡币）</view>
		</view>

		<view v-else class="popup-box popup-toast" :class="{'showbox':showPopup}">
			<view class="popup-close" @click="onClickClose"></view>
			<view class="popup-title">兑换成功</view>
			<view class="popup-btn" @click="onClickGoAward">查看奖品</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		showPopup!:boolean;
		@Prop({default:{}})
		awardData!:object;
		@Prop({default:1})
		popupStep!:number;
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickClose(){
			this.$emit('popupClose')
		}
		onClickConfirm(){
			this.$emit('popupConfirm')
		}
	}
</script>

<style lang="scss">
	.exchange-popup{
		width: 100%;
		height:100%;
		box-sizing: border-box;
		background: rgba(0,0,0,0.61);
		position: fixed;
		left:0;
		top:0;
	}
	.popup-box{
		width: 442rpx;
		height:592rpx;
		position: fixed;
		left:50%;
		top:45%;
		margin-left: -221rpx;
		margin-top: -300rpx;
		background:#fff;
		transition: all 0.3s;
		transform: scale(0);
		box-sizing: border-box;
		padding:0 43rpx;
		.popup-title{
			width: 100%;
			text-align: center;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
			height:88rpx;
			padding-top: 28rpx;
			box-sizing: border-box;
		}
		.pic-box{
			width: 246rpx;
			height:204rpx;
			margin:0 auto;
			overflow: hidden;
			background:#324176;
		}
		.popup-pic{
			width: 246rpx;
			height:204rpx;
		}
		.popup-explain{
			width: 100%;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-top: 25rpx;
			line-height: 30rpx;
		}
		.popup-ts{
			width: 100%;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #E34B4B;
			line-height: 30rpx;
			margin-top: 15rpx;
		}
		.popup-btn{
			width: 355rpx;
			height: 69rpx;
			background: #E84F5E;
			border-radius: 3rpx;
			margin:0 auto;
			margin-top: 44rpx;
			font-size: 27rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 69rpx;
			text-align: center;
		}
		.popup-close{
			width: 29rpx;
			height:27rpx;
			background:url(../../static/mall/close.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			right:0;
			top:-52rpx
		}
	}
	.popup-toast{
		height:243rpx;
		margin-top: -122rpx;
		transition: none;
		.popup-title{
			width: 100%;
			text-align: center;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
			height:125rpx;
			padding-top: 46rpx;
			box-sizing: border-box;
		}
		.popup-btn{
			margin-top: 0;
		}
	}
	.showbox{
		transform: scale(1);
	}
</style>
