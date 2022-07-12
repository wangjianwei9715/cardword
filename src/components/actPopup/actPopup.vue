<template>
	<view>	
		<view class="exchange-popup" v-show="showPopup"></view>
		<view v-if="popupType==''" class="popup-box" :class="{'showbox':showPopup}">
			<view class="popup-close" @click="onClickClose"></view>
			<view class="popup-title" style="font-size:33rpx">恭喜，您获得了</view>
			<view class="popup-title">{{awardData.name}}</view>
			<view class="pic-box" style="margin-top:30rpx">
				<muqian-lazyLoad class="popup-pic" mode="aspectFit" :src="decodeURIComponent(awardData.pic_url)" />
			</view>
			<view class="popup-ts">请在我的奖品中查看</view>
			
			<view class="btn-1" @click="onClickClose">开心收下</view>
		</view>

		<view v-else class="popup-box popup-toast" :class="{'showbox':showPopup}">
			<view class="popup-close" @click="onClickClose"></view>
			<view class="popup-title">提示</view>
			<view class="popup-dz">是否使用默认地址？</view>
			<view class="popup-mr">若抽中实物将以默认地址发货</view>
			<view class="btn-box">
				<view class="btn-index" @click="onClickGoAddresses">修改地址</view>
				<view class="btn-index btn-confirm" @click="onClickConfirm">确 定</view>
			</view>
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
		awardData!:any;
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
		onClickGoAddresses(){
			uni.navigateTo({
				url:'/pages/userinfo/setting_addresses'
			})
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
		position: fixed;
		left:50%;
		top:45%;
		margin-left: -258rpx;
		margin-top: -300rpx;
		background:#fff;
		transition: all 0.3s;
		transform: scale(0);
		box-sizing: border-box;
		padding:48rpx 60rpx;
		z-index: 100;
		.popup-title{
			width: 100%;
			text-align: center;
			font-size: 42rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
			box-sizing: border-box;
		}
		.pic-box{
			width: 287rpx;
			height:287rpx;
			margin:0 auto;
			overflow: hidden;
			// background:#324176;
		}
		.popup-pic{
			width: 287rpx;
			height:287rpx;
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
			text-align: center;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #797979;
			margin-top: 29rpx;
			margin-bottom: 24rpx;
		}
		.btn-index{
			width: 166rpx;
			height:66rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 27rpx;
			font-family: PingFang SC;
			font-weight: 400;
			background:#5098D5;
			color:#fff;
			margin:0 auto;
			border-radius: 3rpx;
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
	.popup-limitTips{
		height:630rpx;
	}
	.popup-toast{
		height:374rpx;
		margin-top: -122rpx;
		.popup-title{
			font-size: 42rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}
		.popup-dz{
			text-align: center;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-top: 47rpx;
		}
		.popup-mr{
			text-align: center;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #797979;
			margin-top: 9rpx;
			margin-bottom: 40rpx;
		}
		.btn-box{
			width: 100%;
			height:66rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.btn-index{
				width: 166rpx;
				height:66rpx;
				box-sizing: border-box;
				border: 1px solid #7B7A7A;
				border-radius: 3rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 27rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				background:#fff;
			}
			.btn-confirm{
				background:#5098D5;
				border: 1px solid #5098D5;
				color:#fff;
			}
		}
	}
	.showbox{
		transform: scale(1);
	}
	.btn-1{
		width: 366rpx;
		height:73rpx;
		background:url(../../static/act/card716/btn_bg.png) no-repeat center;
		background-size: 100% 100%;
		text-align: center;
		line-height: 73rpx;
		font-size: 27rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		margin:0 auto;
	}
</style>
