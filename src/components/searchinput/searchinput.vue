<template>
	<view class="header-search-input" @click="onClickSearch">
		<view class="sousuo-icon"></view>
		{{searchText}}
		<view class="search-icon">搜索</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:''})
		searchText:any;
		
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickSearch(){
			this.$emit('clicksearch')
		}
	}
</script>

<style>
	/* #ifndef MP */
	.header-search-input{
		width: 100%;
		height: 62rpx;
		background: #FFFFFF;
		border: 2rpx solid #FB4E3E;
		border-radius: 40rpx;
		position: relative;
		font-size: 28rpx;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		color: #A3A3A3;
		line-height: 62rpx;
		box-sizing: border-box;
		padding-left: 34rpx;
		display: flex;
		align-items: center;
	}
	/* #endif */
	/* #ifdef MP */
	.header-search-input{
		width: 710rpx;
		height:64rpx;
		background: #F2F2F2;
		border-radius: 4rpx;
		box-sizing: border-box;
		display: flex;
		padding-left: 28rpx;
		align-items: center;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #AAAABB;
		border-radius: 29rpx;
	}
	/* #endif */
	.sousuo-icon{
		width: 31rpx;
		height:32rpx;
		background:url(../../static/index/v2/sousuo.png) no-repeat center;
		background-size:100% 100%;
		margin-right: 30rpx;
	}
	.search-icon{
		width: 113rpx;
		height: 54rpx;
		background: #FB4E3E;
		border-radius: 30rpx;
		position: absolute;
		right:2rpx;
		top:2rpx;
		text-align: center;
		line-height: 54rpx;
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		box-sizing: border-box;
	}
</style>
