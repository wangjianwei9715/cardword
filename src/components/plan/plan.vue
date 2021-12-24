<template>
	<view class="goodslist-plan-content" :style="'height:'+planHeight+'rpx'">
		<view class="goodslist-plan-now" :style="'width:'+getPlan()+'%;height:'+planHeight+'rpx'"></view>
		<view class="goodslist-plan-desc" :style="'left:'+getPlan()+'%'">{{getPlan()}}<text class="baifenbi">%</text></view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:12})
		planHeight!:any;
		@Prop({default:0})
		num_ex:any;
		@Prop({default:12})
		num_all:any;
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		getPlan(){
			let width = Math.floor(Number(this.num_ex)/Number(this.num_all)*100);
			return width
		}
	}
</script>

<style lang="scss">
	.goodslist{
		&-plan-content{
			width: 100%;
			background: #F2F2F2;
			border-radius: 12rpx;
			position: relative;
			margin-bottom: 20rpx;
		}
		&-plan-desc{
			position: absolute;
			left:0;
			top:50%;
			margin-top: -15rpx;
			margin-left: -33rpx;
			z-index: 2;
			width: 66rpx;
			height: 30rpx;
			background: #FB4E3E;
			box-shadow: 0rpx 3rpx 4rpx 0rpx rgba(107, 27, 27, 0.28);
			border-radius: 15rpx;
			text-align: center;
			line-height: 30rpx;
			font-size: 18rpx;
			font-family: 'LT';
			font-weight: bold;
			color: #FFFFFF;
		}
		
		&-plan-now{
			background: #FB4E3E;
			border-radius: 12rpx;
			position: absolute;
			left:0;
			top:0;
			z-index: 1;
		}
	}
	.baifenbi{
		font-family: Microsoft YaHei;
	}
</style>
