<template>
	<view>	
		<view class="exchange-popup" v-show="showPopup"></view>
		<view v-if="popupType==''" class="popup-box" :class="{'showbox':showPopup}">
			<view class="popup-title">确认兑换【{{award.name}}】</view>
			<view class="btn-content">
				<view class="btn-cancel" @click="onClickClose">取消</view>
				<view class="btn-confirm" @click="onClickConfirm">确定</view>

			</view>
			<!-- <view class="popup-btn" @click="onClickConfirm">确认兑换</view> -->
		</view>
		<view v-else class="popup-box" :class="{'showbox':showPopup}">
			<view class="popup-title">兑换成功</view>
			<view class="popup-tips">{{award.tp==1?'请您联系客服发放奖品':'请在我的-优惠券查看'}}</view>
			<view class="totas-btn" @click="onClickClose">确定</view>
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
		@Prop({default:''})
		award!:any;
		@Prop({default:''})
		popupType!:string;
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
		z-index: 99;
	}
	.popup-box{
		width: 516rpx;
		height:317rpx;
		position: fixed;
		left:50%;
		top:45%;
		margin-left: -258rpx;
		margin-top: -160rpx;
		background:#fff;
		transition: all 0.3s;
		transform: scale(0);
		box-sizing: border-box;
		padding:0 43rpx;
		z-index: 100;
		.popup-title{
			width: 100%;
			text-align: center;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
			padding-top: 70rpx;
			box-sizing: border-box;
		}
		.btn-content{
			width: 100%;
			box-sizing: border-box;
			padding: 0 60rpx;
			height:66rpx;
			position: absolute;
			bottom:76rpx;
			left:0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.btn-cancel{
				width: 167rpx;
				height: 66rpx;
				border: 1rpx solid #7B7A7A;
				border-radius: 3rpx;
				text-align: center;
				line-height: 66rpx;
				font-size: 25rpx;
				font-family: FZLanTingHeiS-R-GB;
				font-weight: 400;
				color: #333333;
			}
			.btn-confirm{
				width: 167rpx;
				height: 66rpx;
				background: #F5162B;
				border: 1rpx solid #F5162B;
				border-radius: 3rpx;
				text-align: center;
				line-height: 66rpx;
				font-size: 25rpx;
				font-family: FZLanTingHeiS-R-GB;
				font-weight: 400;
				color: #FFFFFF;
			}
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
		.popup-tips{
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			text-align: center;
			margin-top: 5rpx;
		}
		.totas-btn{
			width: 206rpx;
			height: 65rpx;
			background: #F5162B;
			border-radius: 3rpx;
			text-align: center;
			line-height: 65rpx;
			position: absolute;
			bottom:46rpx;
			left:50%;
			margin-left: -103rpx;
			font-size: 25rpx;
			font-family: FZLanTingHeiS-R-GB;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
	.showbox{
		transform: scale(1);
	}
</style>
