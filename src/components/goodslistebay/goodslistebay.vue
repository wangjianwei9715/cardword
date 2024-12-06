<template name="goodslist">
	<view class="content">
		<view class="goodslist-index" v-for="item in goodsList" :key="item.goodCode" >
			<muqian-lazyLoad class="goodslist-pic" :src="item.thumb" mode="aspectFill" @click="onClickPic(item.pic)"></muqian-lazyLoad>
			<view class="goodslist-right">
				<view>
					<view class="goodslist-tip" :class="item.saleType=='拍卖'?'icon-paimai':'icon-yikou'" >{{item.saleType}}</view>
					Id:{{item.ebayId}}
				</view>
				<view class="goodslist-title">{{item.title}}</view>
				<view>成交日期:{{$u.timeFormat(item.saleAt,'yyyy-mm-dd hh:MM')}}</view>
				<view class="goodslist-bottom">
					<view class="goodslist-price-content">
						￥<text class="goodslist-price">{{item.rmb}}</text>
					</view>
					<image class="goodslist-yibei" src="../../static/goods/ebay@2x.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		goodsList:any;
	
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
		}
		getPlan(now:number,all:number){
			let width = Math.floor(Number(now)/Number(all)*100);
			return width
		}
		onClickPic(pic:any){
			this.$emit("send", pic);
		}
		
	}
</script>

<style lang="scss">
	.goodslist{
		&-index{
			width: 100%;
			background: #FFFFFF;
			border-radius: 4rpx;
			box-sizing: border-box;
			padding:16rpx;
			display: flex;
			align-items: center;
			margin-bottom: 16rpx;
		}
		&-pic{
			width: 200rpx;
			height:200rpx;
			border-radius: 4rpx;
			margin-right: 24rpx;
		}
		&-right{
			width: 440rpx;
			box-sizing: border-box;
		}
		&-title{
			width: 100%;
			font-size: 28rpx;
			
			
			color: #14151A;
			margin-bottom: 12rpx;
			word-break:break-all;
		}
		&-plan-content{
			width: 440rpx;
			height:20rpx;
			background: #FFD1BE;
			border-radius: 12rpx;
			overflow: hidden;
			position: relative;
			margin-bottom: 20rpx;
		}
		&-plan-desc{
			width: 100%;
			height:20rpx;
			position: absolute;
			left:0;
			top:0;
			z-index: 2;
			text-align: center;
			line-height: 20rpx;
			font-size: 16rpx;
			
			font-weight: 600;
			color: #FFFFFF;
		}
		&-plan-now{
			height:20rpx;
			background: linear-gradient(90deg, #FD8339 0%, #F24B28 100%);
			border-radius: 12rpx;
			position: absolute;
			left:0;
			top:0;
			z-index: 1;
		}
		&-bottom{
			width: 100%;
			height:40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		&-price-content{
			font-size: 24rpx;
			font-weight: bold;
			color: #14151A;
		}
		&-price{
			font-size: 32rpx;
		}
		&-tip{
			width: 72rpx;
			height:36rpx;
			border-radius: 4rpx;
			margin-bottom: 10rpx;
		}
		&-yibei{
			width: 60rpx;
			height:40rpx;
		}
	}
	.icon-paimai{
		width: 72rpx;
		height:38rpx;
		background:url(../../static/goods/paimai@2x.png) no-repeat center;
		background-size: 100% 100%;
		font-size: 20rpx;
		
		
		color: #FFFFFF;
		text-align: center;
		line-height: 38rpx;
	}
	.icon-yikou{
		width: 72rpx;
		height:38rpx;
		background:url(../../static/goods/yikou@2x.png) no-repeat center;
		background-size: 100% 100%;
		font-size: 20rpx;
		
		
		color: #FFFFFF;
		text-align: center;
		line-height: 38rpx;
	}
</style>
