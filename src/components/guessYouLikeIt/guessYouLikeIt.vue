<template name="goodslist">
	<view class="like-content">
		<view class="like-header">
			<view class="icon-lx"/>猜你喜欢<view class="icon-lx"/>
		</view>
		<view class="like-list">
			<view class="item" v-for="(item,index) in goodsList" :key="index" @click="goGoodsDetails(item.goodCode)">
				<view class="like-pic-box">
					<muqian-lazyLoad class="like-pic" :src="getGoodsImg(decodeURIComponent(item.pic))" borderRadius="3rpx"></muqian-lazyLoad>
				</view>
				<view class="like-title">{{item.title}}</view>
				<view class="like-bottom">
					<view class="like-price">￥<text>{{item.price}}</text></view>
					<view class="like-plan">{{getPlan(item)}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	import {
		getGoodsImg
	} from "../../tools/util";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		goodsList:any;

		getGoodsImg = getGoodsImg
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
		}
		getPlan(item:any){
			return Math.floor((Number(item.lockNum)+Number(item.currentNum))/Number(item.totalNum)*100)+'%'
		}
		goGoodsDetails(goodCode:string){
			uni.navigateTo({
				url: '/pages/goods/goods_details?id=' + decodeURIComponent(goodCode)
			})
		}
	}
</script>

<style lang="scss">
	.like-content{
		width: 100%;
		background:#F6F7FB;
		box-sizing: border-box;
		padding-bottom: calc(150rpx);
		padding-bottom: calc(150rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
	}
	.like-header{
		width: 100%;
		height:100rpx;
		display: flex;
		align-items: center;
		font-size: 23rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #A5A5AA;
		justify-content: center;
	}
	.icon-lx{
		width:10rpx;
		height:16rpx;
		background:url(@/static/goods/v2/lx.png) no-repeat center / 100% 100%;
		margin:0 16rpx;
	}
	.like-list{
		width: 722rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		margin:0 auto;
		.item{
			width: 356rpx;
			height:413rpx;
			border-radius: 5rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			padding-top:13rpx;
			margin-right: 10rpx;
			margin-bottom: 10rpx;
		}
		.item:nth-child(2n){
			margin-right: 0;
		}
		.like-pic-box{
			width: 327rpx;
			height: 252rpx;
			background: #333333;
			border-radius: 3rpx;
			margin:0 auto;
		}
		.like-pic{
			width: 327rpx;
			height: 252rpx;
		}
		.like-title{
			width: 100%;
			height:78rpx;
			padding:14rpx 18rpx 0rpx 18rpx;
			font-size: 27rpx;
			line-height: 34rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			box-sizing: border-box;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			align-items: flex-start;
			word-break:break-all
		}
		.like-bottom{
			width: 100%;
			height:70rpx;
			box-sizing: border-box;
			padding:0rpx 14rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.like-price{
				font-size: 18rpx;
				font-family: Alibaba PuHuiTi;
				font-weight: 500;
				color: #333333;
			}
			.like-price text{
				font-size: 33rpx;
			}
			.like-plan{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
			}
		}
	}
	
	

</style>
