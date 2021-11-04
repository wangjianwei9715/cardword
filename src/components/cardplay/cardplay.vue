<template>
	<view >
		<view class="operation-shadow" v-show="operationShow" @click="onClickOperaCancel"></view>
		<view class="operation-content" :class="operationShow&&operaType==1?'operation-show':''">
			<view class="operation-index" v-for="item in operaData" :key="item.id">
				<view class="operation-index-title">{{item.title}}</view>
				<view class="operation-index-desc">{{item.desc}}</view>
			</view>
		</view>

		<view class="operation-content2" :class="operationShow&&operaType==2?'operation-show':''">
			<view class="operation-index" v-for="item in typeData" :key="item.id">
				<view class="operation-index-title">{{item.title}}</view>
				<view class="operation-index-desc">{{item.desc}}</view>
			</view>
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
		@Prop({ default: 0 })
		operaType:number|undefined;

		operaData = [
			{
				id:1,
				title:'随机卡种',
				desc:'系统为玩家推送该商品中可能出现的随机球员的任意卡种和限编（没有限编默认为base卡）。开卡结束后，玩家获得对应球员、卡种、限编的所有球星卡。'
			},
			{
				id:2,
				title:'随机球员',
				desc:'系统为玩家推送该商品中可能出现的随机球员。开卡结束后，玩家获得对应球员的所有球星卡。'
			},
			{
				id:3,
				title:'随机卡包',
				desc:'系统为玩家推送随机编号。开卡时，会对原盒中的卡包进行编号，玩家获得对应编号卡包中的所有球星卡。'
			},{
				id:4,
				title:'随机卡盒',
				desc:'系统为玩家推送随机编号。开卡时，会对原箱中的卡盒进行编号，玩家获得对应编号卡盒中的所有球星卡。'
			}
		]
		typeData = [
			{
				id:5,
				title:'即买即随',
				desc:'购买成功后，即可获得随机结果'
			},
			{
				id:6,
				title:'拼满随机',
				desc:'拼组成功后，获得随机结果'
			},
		]
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

<style lang="scss">
	.operation-content{
		width: 100%;
		height:764rpx;
		position: fixed;
		bottom:-764rpx;
		left:0;
		border-radius: 24rpx 24rpx 0px 0px;
		box-sizing: border-box;
		transition: all 0.3s linear;
		z-index:99;
		background:#fff;
		padding:40rpx 32rpx;
	}
	.operation-content2{
		width: 100%;
		height:320rpx;
		position: fixed;
		bottom:-320rpx;
		left:0;
		border-radius: 24rpx 24rpx 0px 0px;
		box-sizing: border-box;
		transition: all 0.3s linear;
		z-index:99;
		background:#fff;
		padding:40rpx 32rpx;
	}
	.operation-index{
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 40rpx;
		&-title{
			width:100%;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #14151A;
			margin-bottom: 20rpx;
		}
		&-desc{
			width: 100%;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #7D8288;
			line-height: 36rpx;
		}
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
</style>
