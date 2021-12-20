<template>
	<view class="header-search" @click="onClickSearch"><view class="search-icon"></view>{{searchText}}</view>
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
	.header-search{
		width: 100%;
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
	/* #ifdef MP */
	.header-search{
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
	.search-icon{
		width: 28rpx;
		height:28rpx;
		background:url(../../static/index/sousuo@2x.png) no-repeat center;
		background-size:100% 100%;
		margin-right: 20rpx;
	}
</style>
