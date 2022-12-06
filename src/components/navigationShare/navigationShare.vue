<template>
	<view class="header-banner">
		<view class="content" :style="'height:'+statusBarHeight+'px'"></view>
		<view class="tab-header">
			<view class="icon-back" @click="onClickBack">
				<image style="width:19rpx;height:35rpx" src="@/static/index/v3/icon_back.png"/>
			</view>
			<view class="header-title">{{navigatetoTitle}}</view>
			<view class="icon-share" v-if='shareData' @click="onClickShare"></view>
			<view class='right-text' v-else @click="onClickRightText">{{rightText}}</view>
		</view>

		<share v-if='shareData' :operationShow="operationShow" :shareData="shareData"  @operacancel="onClickShareCancel"></share>
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
		@Prop({ default: '' })
		rightText!:string;
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
			app.platform.pageBack()
			// uni.navigateBack({
			// 	delta: 1
			// });
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
		onClickRightText(){
			this.$emit('onClickRightText')
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
			height: 88rpx;
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.header-title{
			height:88rpx;
			line-height: 88rpx;
			font-size: 34rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 600;
			color: #000000;
		}
		.icon-share{
			width: 38rpx;
			height:37rpx;
			position: absolute;
			right:32rpx;
			top:50%;
			margin-top: -19rpx;
			background:url(../../static/goods/v2/icon_share.png) no-repeat center;
			background-size: 100% 100%;
		}
		.right-text{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			position: absolute;
			right:32rpx;
		}
	}
</style>
