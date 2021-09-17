<template>
	<view class="goodslist-plan-content" :style="'height:'+planHeight+'rpx'">
		<view class="goodslist-plan-now" :style="'width:'+getPlan()+'%;height:'+planHeight+'rpx'"></view>
		<view class="goodslist-plan-desc" :style="'height:'+planHeight+'rpx'"></view>
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
			background: #FFD1BE;
			border-radius: 12rpx;
			overflow: hidden;
			position: relative;
			margin-bottom: 20rpx;
		}
		&-plan-desc{
			width: 100%;
			position: absolute;
			left:0;
			top:0;
			z-index: 2;
		}
		&-plan-now{
			background: linear-gradient(90deg, #FD8339 0%, #F24B28 100%);
			border-radius: 12rpx;
			position: absolute;
			left:0;
			top:0;
			z-index: 1;
		}
	}
</style>
