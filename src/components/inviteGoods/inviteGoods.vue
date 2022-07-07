<template name="goodslist">
	<view class="content" >
		<view class="goodslist-index" @click="onClickJumpUrl(goodsData.goodCode)">
			<view class="goodslist-pic">
				<muqian-lazyLoad class="goodslist-pic-image" :src="getGoodsImg(decodeURIComponent(goodsData.pic))" mode="aspectFill"></muqian-lazyLoad>
			</view>
			<view class="goodslist-right">
				<view class="goodslist-title">{{goodsData.title}}</view>
				<view class="goodslist-bottom">
					<view class="goodslist-price-content">
						¥<text class="goodslist-price">{{goodsData.price}}</text>
					</view>
					<view v-if="goodsData.state!=0" class="goodslist-bottom-right" >
						<view :id="goodsData.goodCode" class="goodslist-plan-desc">余{{goodsData.totalNum-(goodsData.currentNum+goodsData.lockNum)}}/共{{goodsData.totalNum}}</view>
						<view class="goodslist-plan-content">
							<view class="goodslist-plan-now" :style="'width:'+getPlan(goodsData.lockNum,goodsData.currentNum,goodsData.totalNum)+'%'"></view>
						</view>
					</view>
					<view v-else class="goodslist-bottom-right-time">
						<view class="goodslist-plan-desc-time">已结束</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {
		getGoodsImg
	} from "../../tools/util";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		goodsData:any;
		
		getGoodsImg = getGoodsImg;
		
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		getPlan(lock:number,now:number,all:number){
			let width = Math.floor((Number(lock)+Number(now))/Number(all)*100);
			return width
		}
		onClickJumpUrl(code:any){
			this.$emit("send", code);
		}
		
	}
</script>

<style lang="scss">
	.goodslist{
	
		&-index{
			width: 673rpx;
			height:200rpx;
			background: #FFFFFF;
			box-sizing: border-box;
			padding:0 28rpx;
			display: flex;
			align-items: center;
			position: relative;
		}
		&-pic{
			width: 200rpx;
			height:200rpx;
			border-radius:10rpx;
			margin-right: 24rpx;
			overflow: hidden;
			position: relative;
		}
		&-pic-image{
			width: 200rpx;
			height:200rpx;
		}
		&-right{
			width: 420rpx;
			height:200rpx;
			box-sizing: border-box;
			position: relative;
		}
		&-title{
			width: 100%;
			max-height:90rpx;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #545659;
			margin-bottom: 16rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			line-height: 45rpx;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		&-plan-content{
			width: 150rpx;
			height:12rpx;
			background: #FEE5E3;
			overflow: hidden;
			position: relative;
			border-radius: 6rpx;
		}
	
		&-plan-desc{
			width: 100%;
			height:20rpx;
			text-align: right;
			line-height: 20rpx;
			font-size: 18rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #AAAABB;;
			margin-bottom:10rpx			
		}
		&-plan-desc-time{
			width: 100%;
			height:20rpx;
			text-align: right;
			line-height: 20rpx;
			font-size:22rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #AAAAAA;;
			margin-bottom:10rpx
		}
		&-plan-now{
			height:12rpx;
			background: #FF504F;
		}
		&-bottom{
			width: 100%;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			position: absolute;
			bottom:0;
			left:0;
		}
		&-bottom-right{
			width: 300rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-end;
		}
		&-bottom-right-time{
			width:250rpx;
			display: flex;
			flex-wrap: wrap;
			box-sizing: border-box;
			padding-right: 20rpx;
			color:#AAAAAA;
			font-size:30rpx ;
			justify-content: flex-end;
		}
		&-price-content{
			font-size: 26rpx;
			font-family:  Microsoft YaHei;
			font-weight: normal;
			color: #14151A;
			margin-top: -10rpx;
		}
		&-price{
			font-size: 36rpx;
		}
		
		&-tips{
			text-align: center;
			line-height: 34rpx;
			margin-right: 16rpx;
			height: 34rpx;
			background: #FFFFFF;
			border: 1rpx solid #FB4E3E;
			border-radius: 3rpx;
			font-size: 20rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FB4E3E;
			padding:0 11rpx;
			width: fit-content;
			display: inline-flex;
		}
	}
</style>
