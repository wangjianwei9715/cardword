<!--
 * @FilePath: \jichao_app_2\src\components\navigationSearch\navigationSearch.vue
 * @Author: wjw
 * @Date: 2022-08-10 11:07:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-17 16:34:08
 * Copyright: 2022 .
 * @Descripttion: 
-->
<template>
	<view class="navigation-header">
		<statusbar/>
		<view class="tab-header">
			<view class="icon-back" @click="onClickBack">
				<image style="width:19rpx;height:35rpx" src="@/static/index/v3/icon_back.png"/>
			</view>
			<view class="header-title">{{navigatetoTitle}}</view>
			<view class="icon-search" @click="onClickSearch"></view>
		</view>
	</view>
	
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class navigationbar extends BaseComponent {
		@Prop({ default: '' })
		navigatetoTitle!: string;
		@Prop({ default: '' })
		searchText!: string;
		@Prop({ default: '' })
		searchEmit!: string;
		
		created(){//在实例创建完成后被立即调用
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickBack(){
			uni.navigateBack({
				delta:1
			})
		}
		onClickSearch(){
			uni.navigateTo({
				url:'/pages/act/ref/ref?searchText='+this.searchText+'&searchEmit='+this.searchEmit
			})
		}
		
	}
</script>

<style lang="scss">
	.navigation-header{
		width: 100%;
		background:#fff;
		position: fixed;
		left:0;
		top:0;
		box-sizing: border-box ;
		z-index: 10;
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
			font-size: 18px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333;
		}
		.icon-search{
			width: 42rpx;
			height:42rpx;
			position: absolute;
			right:32rpx;
			top:50%;
			margin-top: -21rpx;
			background:url(../../static/userinfo/v2/icon_search.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
</style>
