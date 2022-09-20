<template>
	<view class="content">
		<view class="empty"></view>
		<view class="empty-text">空空如也…</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		

		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
	}
</script>

<style>
	.content{
		width: 100%;
		box-sizing: border-box;
		pointer-events: none;
	}
	.empty{
		width: 294rpx;
		height:256rpx;
		background:url(../../static/index/empty@2x.png) no-repeat center;
		background-size: 100% 100%;
		margin:0 auto;
		margin-top: 240rpx;
		margin-bottom: 12rpx;

	}
	.empty-text{
		width: 100%;
		text-align: center;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #BABDC7;
	}
</style>
