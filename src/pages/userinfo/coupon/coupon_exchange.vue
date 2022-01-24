<template>
	<view class="content">
		<view class="exchange-rules" v-for="(item,index) in rules" :key="index">{{item}}</view>
		<input class="exchange-input" v-model="exchangeVal" placeholder="请输入18位兑换码" />
		<button class="exchange-btn" @click="onClickExchange">立即兑换</button>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		rules = [
			'1、兑换码获取：参与卡世界活动有机会获得优惠券兑换码。兑换码由18位数字和字母组合而成。',
			'2、兑换码使用：在当前页面输入兑换码即可兑换相应优惠券。一个兑换码只能兑换一张优惠券，不可重复使用。',
			'3、提示：输入兑换码时请使用英文输入法。'
		]
		// 兑换码
		exchangeVal = '';
		onLoad(query:any) {
			
		}
		onClickExchange(){
			if(this.exchangeVal=='') return;

			app.http.Post('me/coupon/exchange',{code:this.exchangeVal},(res:any)=>{
				uni.showToast({
					title:'兑换成功'
				});
				app.coupon ++;
				uni.$emit('couponExchange')
				this.exchangeVal = ''
			})
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#F2F2F2;
	}
	.content{
		width: 100%;
		box-sizing: border-box;
		padding:40rpx;
		background:#fff;
	}
	.exchange-rules{
		width: 100%;
		box-sizing: border-box;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #545659;
		line-height: 48rpx;
	}
	.exchange-input{
		width: 100%;
		height:58rpx;
		background: #F0EEEE;
		border: 1rpx solid #CCCCCC;
		box-sizing: border-box;
		padding:0 22rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #545659;
		margin-top: 30rpx;
	}
	.exchange-btn{
		width:100%;
		height: 60rpx;
		box-sizing: border-box;
		background: #FB4E3E;
		border-radius: 30rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		margin-top: 57rpx;
	}
</style>
