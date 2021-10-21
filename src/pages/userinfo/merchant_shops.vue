<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
				<view class="header-title">
					<image class="header-title-img" src="" mode="aspectFit"></image>
					皇球星社
				</view>
				<view class="icon-liaotian" @click="onClickLT"></view>
			</view>
			<view class="header-tab">
				<tabc :tabs="goodTab" :tabsCheck="goodTabCheck" @tabsClick="onClickListTabs"></tabc>
			</view>
		</view>
		<view style="padding-top:168rpx">
			<statusbar/>
		</view>
		<view class="goods-lists">
			<goodslist  :goodsList="goodsList" @send="onClickJumpDetails"/>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		goodTab = [
			{id:1,name:'在售'},
			{id:2,name:'已成交'}
		];
		goodTabCheck = 1;
		goodsList:{[x:string]:any} = [
			{
				id:1,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				num_all:410,
				num:120,
				price:149,
				tips:'满10组减5元'
			},
			{
				id:2,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				num_all:200,
				num:150,
				price:349,
				tips:'满10组减50元'
			},
			{
				id:3,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				num_all:300,
				num:50,
				price:1429,
				tips:'满20组减100元'
			},
			{
				id:4,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				num_all:500,
				num:220,
				price:2429,
				tips:'满20组减100元'
			},
			{
				id:5,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				num_all:300,
				num:50,
				price:1429,
				tips:'满20组减100元'
			},
			{
				id:6,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				num_all:500,
				num:220,
				price:2429,
				tips:'满20组减100元'
			}
		];
		onLoad(query:any) {
			
		}
		onClickBack(){
			uni.navigateBack({
			    delta: 1
			});
		}
		onClickLT(){

		}
		onClickListTabs(id:number){
			if(id==this.goodTabCheck){
				return;
			}
			this.goodTabCheck = id
		}
		// 跳转商品详情
		onClickJumpDetails(id:any){
			uni.navigateTo({
				url: '/pages/goods/goods_details?id='+id
			})
		}
	}
</script>

<style lang="scss">
	$font-34:34rpx;
	.content{
		width: 100%;
		box-sizing: border-box;
	}
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
			display: flex;
			align-items: center;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #14151A;
			&-img{
				width: 48rpx;
				height:48rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
		}
		.icon-liaotian{
			width: 40rpx;
			height:38rpx;
			position: absolute;
			right:32rpx;
			top:50%;
			margin-top: -21rpx;
			background:url(../../static/userinfo/liaotian@2x.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
	.header-tab{
		width: 100%;
		height:90rpx;
		margin-top: -10rpx;
		padding:0 170rpx;
		box-sizing: border-box;
	}
	.goods-lists{
		background:#F6F7F8;
		width: 100%;
		box-sizing: border-box;
		padding:16rpx 20rpx;
	}
</style>
