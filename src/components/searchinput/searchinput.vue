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

<style lang="scss">
	.header-search-input{
		width: 100%;
		height: 65rpx;
		background: #FFFFFF;
		border: 2rpx solid $btn-red;
		border-radius: 40rpx;
		position: relative;
		font-size: 28rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #A3A3A3;
		line-height: 65rpx;
		box-sizing: border-box;
		padding-left: 34rpx;
		display: flex;
		align-items: center;
	}
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
		background: $btn-red;
		border-radius: 30rpx;
		position: absolute;
		right:3rpx;
		top:50%;
		margin-top: -27rpx;
		text-align: center;
		line-height: 54rpx;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		box-sizing: border-box;
	}
</style>
