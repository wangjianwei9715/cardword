<template>
	<view class="livewicket">
		<image class="livewicket-img" :src="liveImg" mode="aspectFill"></image>
		<view class="livewicket-content">
			<view class="icon-bofang"></view>
			<view class="livewicket-content-status">{{liveStatus}}</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:''})
		liveImg:any
		@Prop({default:''})
		liveStatus:any

		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
	}
</script>

<style lang="scss">
	.livewicket{
		width: 200rpx;
		height: 150rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		border: 2rpx solid #F7632F;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		position: relative;
		&-img{
			width: 196rpx;
			height:146rpx;
		}
		&-content{
			width: 196rpx;
			height:146rpx;
			box-sizing: border-box;
			position: absolute;
			left:2rpx;
			top:2rpx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			padding:24rpx 0;
			
			.icon-bofang{
				width: 42rpx;
				height:48rpx;
				background:url(../../static/goods/bofang@2x.png) no-repeat center;
				background-size: 100% 100%;
				margin-bottom: 10rpx;
			}
			&-status{
				width: 100%;
				text-align: center;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
		
	}
</style>
