<template>
	<view>
		<view class="operation-shadow" v-show="teamRandomShow" @click="onClickTeamRandomCancel"></view>
		<view class="operation-content" :class="teamRandomShow?'operation-show':''">
			

		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {getCountDownTimeHour} from '@/tools/util';
	@Component({})
	export default class ClassName extends BaseComponent {
		// 自选球队随机 显示隐藏
		@Prop({ default: false })
		teamRandomShow:boolean|undefined;
		
		created(){//在实例创建完成后被立即调用
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickTeamRandomCancel(){
			this.$emit('teamRandomCancel')
		}
		getPlan(lock:number,now:number,all:number){
			let width = Math.floor((Number(lock)+Number(now))/Number(all)*100);
			return width
		}
	}
</script>

<style lang="scss">
	.operation-content{
		width: 100%;
		height:86%;
		position: fixed;
		left:0;
		bottom:0;
		border-radius: 5rpx 5rpx 0px 0px;
		box-sizing: border-box;
		transition: all 0.3s linear;
		-webkit-transition: -webkit-transform 0.3s;
		transform: translateY(100%);
		z-index:99;
		background:#fff;
		
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
		transform: translateY(0);
	}
	.teamtion-top{
		width: 100%;
		height:280rpx;
		box-sizing: border-box;
		padding:37rpx  22rpx 0 22rpx;
		position: absolute;
		left:0;
		top:0;
		z-index: 22;
		background:#fff;
		border-radius: 5rpx 5rpx 0px 0px;
	}
	
</style>
