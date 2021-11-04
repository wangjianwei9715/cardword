<template>
	<view class="content">
		<view class="about-top"> 
			<view class="about-icon"></view>
			<view class="about-ver">V {{version}}</view>
		</view>
		<view class="orther-setting">
			<view class="setting" v-for="item in settingTab" :key="item.id" @click="onClickNavigateto(item)">
				<view class="name">{{item.name}}</view>
				<view class="icon-right"></view>
			</view>
		</view>
		<view class="about-bottom">
			<view class="about-tip">Hangzhou card world Technology Co., Ltd</view>
			<view class="about-tip">ka-world.com</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		settingTab = [
			{id:1,name:'给我们评分',url:''},
			{id:2,name:'公司信息',url:''},
			{id:3,name:'隐私政策',url:''},
		
		]
		version = ''
		onLoad(query:any) {
			this.version = app.version
		}
	}
</script>

<style lang="scss">
	.icon-right{
		width: 10rpx;
		height:16rpx;
		background:url(../../static/goods/jinru@2x.png)	no-repeat center;
		background-size: 100% 100%;
		margin-left: 8rpx;			
	}
	.content{
		width: 100%;
		box-sizing: border-box;
	}
	.about-top{
		width: 100%;
		box-sizing: border-box;
		padding:60rpx 0;
		.about-icon{
			width: 124rpx;
			height:124rpx;
			background:url(../../static/userinfo/logo@2x.png) no-repeat center;
			background-size: 100% 100%;
			margin:0 auto;
			margin-bottom: 20rpx;
		}
		.about-ver{
			width: 100%;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #14151A;
		}
	}
	.orther-setting{
		width: 100%;
		box-sizing: border-box;
		padding:0 32rpx;
		.setting{
			width: 100%;
			height:98rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #F1F1F4;
			.name{
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #14151A;
			}
		}
	}
	.about-bottom{
		width: 100%;
		position: fixed;
		bottom:40rpx;
		left:0;
		.about-tip{
			width: 100%;
			text-align: center;
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #AAAABB;
			line-height: 28rpx;
			margin-top: 12rpx;
		}
	}
</style>
