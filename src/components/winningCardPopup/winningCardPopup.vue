<template>
	<view class="winning" v-show="showWinningCrad">
		<view class="winning-showdow" ></view>
		<view class="payment-popup">
			
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {getCountDownTime} from '@/tools/util';
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		showPaySuccess!:boolean;
		@Prop({default:false})
		showJoin!:boolean|undefined;



		
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickCancelPay(){
			this.$emit("cancelPaySuccess");
		}
		
	}
</script>

<style lang="scss">
	.winning{
		width: 100%;
		box-sizing: border-box;
		&-showdow{
			width: 100%;
			height:100%;
			position: fixed;
			top:0;
			left:0;
			z-index:999;
			background: rgba(0, 0, 0, 0.8);
		}
		
		
	}
	
</style>
