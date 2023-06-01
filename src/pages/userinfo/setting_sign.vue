<!--
 * @FilePath: \jichao_app_2\src\pages\userinfo\setting_sign.vue
 * @Author: wjw
 * @Date: 2022-08-24 16:29:43
 * @LastEditors: 
 * @LastEditTime: 2023-05-29 11:24:52
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="content">
		<navigationBar title='个性签名' rightText='保存' @onClickRightText="onClickConfirm"/>
		<textarea class="initiate-desc" :maxlength='100' v-model="newSign" placeholder="请输入个性签名..." />

	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		newSign = '';
		onLoad(query:any) {
			if(query.sign){
				this.newSign = query.sign
			}
		}
		onClickConfirm(){
			let params = {
				sign:this.newSign
			}
			if(this.newSign.length>100){
				uni.showToast({
					title: '长度不能超过100',
					icon: 'none'
				})
				return
			}
			app.http.Post('me/editSign',params,(res:any)=>{
				uni.$emit('finishSign',{sign:this.newSign});
				uni.navigateBack({
				    delta: 1
				});
			})
		}
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		box-sizing: border-box;
	}
	.initiate-desc{
		width: 686rpx;
		height: 240rpxrpx !important;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: #14151A;
		margin: 20rpx auto;
		box-sizing: border-box;
		padding:28rpx 32rpx;
		background:#F3F5F6;
	}
	.explain{
		width: 688rpx;
		margin:0 auto;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #C4C4CF;
	}
</style>
