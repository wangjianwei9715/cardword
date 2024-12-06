<template>
	<view class="content">
		<input class="code-input" placeholder="请输入12位查询码" v-model="searchText" />
		<view class="code-btn" @click="onClickSearchCode">查询</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		searchText = '';
		onLoad(query:any) {
			
		}
		onClickSearchCode(){
			if(this.searchText == ''){
				uni.showToast({
					title:'请输入查询码',
					icon:'none'
				})
				return;
			}

			uni.navigateTo({
				url:'/pages/userinfo/giving/code_details?code='+this.searchText
			})
		}
		
	}
</script>

<style>
	page{
		width: 100%;
		height:100%;
		background:#FFF
	}
	.content{
		width: 100%;
		box-sizing: border-box;
		padding:25rpx
	}
	.code-input{
		width: 100%;
		height:78rpx;
		font-size: 28rpx;
		
		
		color: #88878C;
		box-sizing: border-box;
		padding: 0 24rpx;
		background: #F6F7FB;
		margin-bottom: 33rpx;
	}
	.code-btn{
		width: 100%;
		height:67rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background:#FF2728;
		border-radius: 5rpx;
		font-size: 36rpx;
		
		
		color: #FFFFFF;
	}
</style>
