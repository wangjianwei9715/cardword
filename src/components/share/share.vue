<template>
	<view >
		<view class="operation-shadow" v-show="operationShow" @click="onClickOperaCancel"></view>
		<view class="operation-content" :class="operationShow?'operation-show':''">
			<view class="operation-index">
				<view class="operation-btn" @click="operationStart(item.id)" v-for="item in operationData" :key="item.id"> 
					<image class="operation-img" :src="item.img" mode=""></image>
					<view class="operation-text">{{item.text}}</view>
				</view>
			</view>
			<view class="operation-cancel" @click="onClickOperaCancel">取消</view>
		</view>
	</view>
	
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({ default: false })
		operationShow:boolean|undefined;
		@Prop({ default: [] })
		operationData:any;
		
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		operationStart(id:any){
			this.$emit("operaclick",id);
		}
		onClickOperaCancel(){
			this.$emit("operacancel");
		}
	}
</script>

<style>
	.operation-content{
		width: 100%;
		height:340rpx;
		position: fixed;
		bottom:-340rpx;
		left:0;
		border-radius: 12rpx 12rpx 0px 0px;
		box-sizing: border-box;
		border-top: 1px solid #F4F3F2;
		transition: all 0.2s linear;
		z-index:99;
		background:#fff
	}
	.operation-shadow{
		width: 100%;
		height:100%;
		position: fixed;
		top:0;
		left:0;
		z-index: 88;
		background: rgba(0, 0, 0, 0.5);
	}
	.operation-show{
		bottom:0
	}
	.operation-index{
		width: 100%;
		height:232rpx;
		box-sizing: border-box;
		padding: 0 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.operation-btn{
		width: 120rpx;
		height:170rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.operation-img{
		width: 120rpx;
		height:120rpx;
		margin-bottom: 14rpx;
	}
	.operation-text{
		width: 100%;
		text-align: center;
		font-size: 22rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #3B3B3B;
	}
	.operation-cancel{
		width: 100%;
		height:106rpx;
		line-height: 106rpx;
		text-align: center;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #A9ABB4;
		border-top: 1px solid #F4F3F2;
	}
</style>
