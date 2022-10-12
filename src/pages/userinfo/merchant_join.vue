<template>
	<view class="content">
		<view class="title">入驻流程</view>
		<view class="step-content">
			<view class="step-index" v-for="(item,index) in stepData" :key="index">
				<view class="step-yuan" :class="{'yuan-line':index<3}"></view>
				<view class="step-desc">{{item}}</view>
			</view>
		</view>
		<view class="title">填写信息</view>
		<view class="info-content">
			<view class="info-index">
				<view class="info-left">姓名</view>
				<input class="info-input" v-model="merchant.name" placeholder="请输入姓名"/>
			</view>
			<view class="info-index">
				<view class="info-left">店铺名称</view>
				<input class="info-input" v-model="merchant.shop" placeholder="请输入店铺名称"/>
			</view>
			<view class="info-index">
				<view class="info-left">联系方式</view>
				<input class="info-input" v-model="merchant.contact" placeholder="请输入联系手机/微信"/>
			</view>
			<view class="info-tip">提交信息后我们将在1个工作日内和您取得联系</view>
		</view>
		<button class="info-btn" @click="onClickConfirm">提交</button>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		stepData = [
			'提交个人信息',
			'等待客服联系',
			'对接入驻材料',
			'入驻成功'
		]
		merchant:any = {
			name : '',
			shop : '',
			contact : '',
		}
		
		onLoad(query:any) {
			
		}
		onClickConfirm(){
			for(let i in this.merchant){
				if(this.merchant[i]==''){
					uni.showToast({
						title:'请正确填写信息',
						icon:'none'
					})	
					return;
				}
			}

			app.http.Post('user/merchant/registe',this.merchant,(res:any)=>{
				uni.showToast({
					title:'提交成功',
					icon:'none'
				})
				this.merchant = {
					name : '',
					shop : '',
					contact : '',
				}
			})
		}
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		box-sizing: border-box;
		padding:30rpx;
	}
	.title{
		width: 100%;
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #34363A;
	}
	.step-content{
		width: 100%;
		height:100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin:40rpx auto;
		margin-bottom: 80rpx;
	}
	.step-index{
		width: 100rpx;
		height:100rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.step-yuan{
		width: 20rpx;
		height: 20rpx;
		background: #FB4E3E;
		border-radius: 50%;
		position: relative;
	}
	.yuan-line::after{
		content:'';
		width: 156.6rpx;
		height:2rpx;
		background:#FB4E3E;
		position: absolute;
		left:30rpx;
		top:50%;
		margin-top: -1rpx;
	}
	.step-desc{
		width: 100%;
		height:60rpx;
		text-align: center;
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #34363A;
	}
	.info-content{
		width: 100%;
		margin-top: 15rpx;
	}
	.info-index{
		width: 100%;
		height:100rpx;
		box-sizing: border-box;
		border-bottom: 1px solid $content-bg;
		display: flex;
		align-items: center;
	}
	.info-left{
		width: 170rpx;
		height:80rpx;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #34363A;
	}
	.info-input{
		width: 520rpx;
		height:80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #34363A;
	}
	.info-tip{
		margin-top: 30rpx;
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #C7C8C8;
	}
	.info-btn{
		width: 668rpx;
		background: #FB4E3E;
		text-align: center;
		font-family: Microsoft YaHei;
		color: #FFFFFF;
		position: fixed;
		bottom:64rpx;
		left:50%;
		margin-left: -334rpx;
		height: $btn-height;
		line-height: $btn-height;
		font-size: $btn-fontSize;
		border-radius:$btn-radius;
		font-weight: $btn-weight;
	}
</style>
