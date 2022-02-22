<template>
	<view class="content">
		<view class="index" @click="onClickGoDecompose">
			<view class="header">
				<view class="header-left">卡片分解(测试版)</view>
				<view class="header-right">{{decomposeNum}}件可分解</view>
			</view>
			<view class="header-tips">分解中得卡片 获得各种奖品</view>
			<view class="reward">
				<view class="reward-index" v-for="(item,index) in rewardList" :key="index">
					<image class="reward-img" :src="item.icon"></image>
					<view class="reward-name">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="service-tips">更多服务敬请期待~</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		decomposeNum = 0;
		rewardList = [
			{icon:'../static/pingtai/icon1.png',name:'卡豆'},
			{icon:'../static/pingtai/icon.png',name:'优惠券'}
		]
		onLoad(query:any) {
			this.initEvent()
		}
		initEvent(){
			app.http.Get('function/decompose/index',{},(res:any)=>{
				this.decomposeNum = res.data.goodNum
			})
		}
		onClickGoDecompose(){
			uni.navigateTo({
				url:'/pages/act/decompose/index'
			})
		}
		
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#F6F7F8;
	}
	.content{
		width: 100%;
		box-sizing:border-box;
		padding:20rpx
	}
	.index{
		width: 100%;
		background: #FFFFFF;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding:36rpx;
	}
	.header{
		width: 100%;
		height:40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}
	.header-left{
		height:40rpx;
		line-height: 40rpx;
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #5D5D5D;
	}
	.header-right{
		height:40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #9E9E9E;
	}
	.header-tips{
		width: 100%;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #5D5D5D;
		margin-bottom: 50rpx;
	}
	.reward{
		width: 100%;
		height:170rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.reward-index{
		width: 130rpx;
		height:170rpx;
		margin-right: 38rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.reward-img{
		width: 130rpx;
		height:130rpx;
	}
	.reward-name{
		width: 130rpx;
		height:30rpx;
		line-height: 30rpx;
		margin-top: 10rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #5D5D5D;
		text-align: center;
	}
	.service-tips{
		width: 100%;
		text-align: center;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #B0B0B0;
		margin-top: 30rpx;
	}
</style>
