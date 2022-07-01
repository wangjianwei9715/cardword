<template>
	<view class="header-banner">
		<view class="content" :style="'height:'+statusBarHeight+'px'"></view>
		<view class="tab-header">
			<view class="icon-back" @click="onClickBack"></view>
			<view class="header-title">{{navigatetoTitle}}</view>
			<view class="icon-share" @click="onClickShare"></view>
		</view>

		<share :operationShow="operationShow" :shareData="shareData"  @operacancel="onClickShareCancel"></share>
	</view>
	
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	@Component({})
	export default class navigationbar extends BaseComponent {
		@Prop({ default: '' })
		navigatetoTitle!: string;
		@Prop({ default: '' })
		shareData!:any;
		// shareData:any = {
		// 	shareUrl:'',  
		// 	title:'',      
		// 	summary:'',    
		// 	thumb:''       
		// }
		// 分享
		operationShow=false;
		statusBarHeight = app.statusBarHeight;
		created(){//在实例创建完成后被立即调用
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickBack(){
			uni.navigateBack({
				delta: 1
			});
		}
		// 分享
		onClickShare(){
			if(!this.operationShow){
				this.operationShow = true
			}
		}
		onClickShareCancel(){
			this.operationShow = false
		}
		
	}
</script>

<style lang="scss">
	.header-banner{
		width: 100%;
		background:#fff;
		position: fixed;
		left:0;
		top:0;
		box-sizing: border-box ;
		z-index: 10;
		border-bottom: 1px solid #F4F3F2;
		.tab-header{
			width: 100%;
			height:88rpx;
			display: flex;
			box-sizing: border-box;
			padding:0 30rpx;
			position: relative;
			z-index: 10;
			align-items: center;
			justify-content: center;
		}
		.icon-back{
			width: 80rpx;
			height:88rpx;
			background:url(../../static/goods/back@2x.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			left:0;
			top:0;
		}
		.header-title{
			height:88rpx;
			line-height: 88rpx;
			font-size: 34rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
		}
		.icon-share{
			width: 42rpx;
			height:42rpx;
			position: absolute;
			right:32rpx;
			top:50%;
			margin-top: -21rpx;
			background:url(../../static/goods/fenxiang@2x.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
</style>
