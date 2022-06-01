<template>
	<view class="wincode" v-show="showWinningCode">
		<view class="wincode-popup" :class="{'wincode-showbox':showWinningCode}">
			<view class="wincode-close" @click="onClickCloseWinning()"></view>
			<view class="wincode-title">恭 喜！</view>
			<view class="wincode-msg">您发现了一条</view>
			<view class="wincode-msg">神秘的专属代码!</view>
			<view class="wincode-code">{{code}}</view>
			<view class="wincode-btn" @click="onClickJumpCode()">立即破解</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		showWinningCode!:boolean;
		@Prop({default:''})
		code!:string;
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickJumpCode(){
			uni.setClipboardData({
				data: this.code,
				showToast: false,
				success: () => {
					this.$emit('closeWinCode')
					uni.navigateTo({
						url:'/pages/act/mysticalCode/mysticalCode'
					})
				}
			});
			
		}
		onClickCloseWinning(){
			this.$emit('closeWinCode')
		}
	}
</script>

<style lang="scss" >
	.wincode{
		width: 100%;
		height:100%;
		position: fixed;
		top:0;
		left:0;
		z-index:999;
		background: rgba(0, 0, 0, 0.8);
		&-popup{
			width: 508rpx;
			height:643rpx;
			position: fixed;
			top:50%;
			background:url(../../static/act/mysticalCode/index_bg.png) no-repeat center;
			background-size: 100% 100%;
			box-sizing: border-box;
			margin-top: -400rpx;
			left:50%;
			margin-left: -254rpx;
			transition: all 0.3s;
			transform: scale(0);
			z-index: 99999999;
			
		}
		&-showbox{
			transform: scale(1);
		}
		&-close{
			width: 29rpx;
			height:27rpx;
			background:url(../../static/act/mysticalCode/close.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			bottom:-99rpx;
			left:50%;
			margin-left: -14.5rpx;
		}
		&-title{
			width: 100%;
			text-align: center;
			font-size: 75rpx;
			font-family: hei;
			font-weight: 400;
			color: #77CAE5;
			box-sizing: border-box;
			padding-left: 50rpx;
			padding-top: 100rpx;
			margin-bottom: 70rpx;
		}
		&-msg{
			width: 100%;
			text-align: center;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #77CAE5;
			line-height: 54rpx;
			letter-spacing:2rpx
		}
		&-code{
			width: 100%;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			margin-top: 50rpx;
		}
		&-btn{
			width: 249rpx;
			height:64rpx;
			background:url(../../static/act/mysticalCode/index_btn.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			left:50%;
			margin-left: -124.5rpx;
			bottom:97rpx;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FEFEFE;
			text-shadow: 0px 0px 8px #194647;
			text-align: center;
			line-height: 64rpx;
		}
	}
	
</style>
