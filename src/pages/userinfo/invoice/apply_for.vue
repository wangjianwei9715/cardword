<!--
 * @FilePath: \jichao_app_2\src\pages\userinfo\invoice\apply_for.vue
 * @Author: wjw
 * @Date: 2023-03-24 11:12:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-06 10:09:29
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="content">
		<view class="apply-box">
			<u-cell-group :border="false" >
				<u-cell :border="false" :titleStyle="titleStyle"  title="开票商家">
					<text slot="value" class="cell-value">{{data.merchantName}}</text>
				</u-cell>
				<u-cell :border="false" :titleStyle="titleStyle" title="可开票金额">
					<text slot="value" class="cell-value">{{data.amount}}</text>
				</u-cell>
				<u-cell :border="false" :titleStyle="titleStyle" title="发票类型">
					<text slot="value" class="cell-value">普通发票</text>
				</u-cell>
				<u-cell :border="false" :titleStyle="titleStyle" title="发票抬头">
					<text slot="value" class="cell-value">个人</text>
				</u-cell>
				<u-cell :border="false" :titleStyle="titleStyle" title="申请开票金额">
					<input slot="value" type="digit" class="search-input" v-model="applyAmount" />
					<image slot="right-icon" src="@/static/goods/rightCor.png" style="width:11rpx;height:17rpx"></image>
				</u-cell>
			</u-cell-group>
		</view>
		<view class="btn-confirm" @click="onClickApplyFor()">提交申请</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		data:any = {};
		titleStyle = {
			color:'#88878C',
			fontSize:'25rpx',
			fontFamily: 'PingFang SC'
		}
		applyAmount = 0;
		onLoad(query:any) {
			this.data = JSON.parse(query.data);
			this.applyAmount = this.data.amount
		}
		onClickApplyFor(){
			uni.showModal({
				title: '提示',
				content: '是否确认申请开票',
				success:(res)=> {
					if (res.confirm) {
						app.http.Post('me/invoice/apply',{alias:this.data.alias,amount:Number(this.applyAmount)},(res:any)=>{
							uni.showToast({ title:'操作成功', icon:'none' })
							uni.$emit('apply')
							uni.navigateBack({ delta: 1 });
						})
					}
				}
			});
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#F6F7F8;
	}
	.btn-confirm {
		width: 710rpx;
		background: $btn-red;
		text-align: center;
		color: #FFFFFF;
		height: $btn-height;
		line-height: $btn-height;
		font-size: $btn-fontSize;
		border-radius: $btn-radius;
		font-weight: 600;
	}
	.apply-box{
		width: 710rpx;
		box-sizing: border-box;
		padding:10rpx 20rpx;
		background:#fff;
		margin:15rpx auto 35rpx;
		border-radius: 5rpx;
	}
	.search-input{
		text-align: right;
		font-size: 25rpx;
		
		font-weight: 600;
		color: #333333;
	}
	.cell-value{
		font-size: 25rpx;
		
		font-weight: 400;
		color: #333333;
	}
</style>
