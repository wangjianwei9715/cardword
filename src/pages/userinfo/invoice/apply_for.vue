<!--
 * @FilePath: \jichao_app_2\src\pages\userinfo\invoice\apply_for.vue
 * @Author: wjw
 * @Date: 2023-03-24 11:12:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-03-24 14:53:45
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="content">
		<view class="apply-box">
			<u-cell-group :border="false">
				<u-cell :border="false" :titleStyle="titleStyle" title="开票商家" :value="data.merchantName"></u-cell>
				<u-cell :border="false" :titleStyle="titleStyle" title="可开票金额" :value="data.amount"></u-cell>
				<u-cell :border="false" :titleStyle="titleStyle" title="发票类型" value="普通发票"></u-cell>
				<u-cell :border="false" :titleStyle="titleStyle" title="发票抬头" value="个人"></u-cell>
				<u-cell :border="false" :titleStyle="titleStyle" title="申请开票金额">
					<input slot="value" type="digit" class="search-input" v-model="applyAmount" />
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
			color:'#909399',
			fontSize:'16rpx'
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
		width: 690rpx;
		background: $btn-red;
		text-align: center;
		font-family: PingFangSC-Semibold;
		color: #FFFFFF;
		height: $btn-height;
		line-height: $btn-height;
		font-size: $btn-fontSize;
		border-radius: $btn-radius;
		font-weight: 600;
	}
	.apply-box{
		width: 690rpx;
		box-sizing: border-box;
		padding:10rpx 20rpx;
		background:#fff;
		margin:30rpx auto;
		border-radius: 5rpx;
	}
	.search-input{
		text-align: right;
	}
</style>
