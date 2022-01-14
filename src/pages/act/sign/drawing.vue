<template>
	<view class="content">
		<!-- 转盘 -->
		<lotteryTurntable :drawingList="drawingList" :rewardId="rewardId" @turntableStart="onClickDrawing" @turntableEnd="onTurntableEnd" />

		<!-- 弹窗 -->
		<lotteryPopup :popupTitle="'抽奖成功'" :showLotteryPopup="showLotteryPopup" @cancelLotteryPopup="onClickCancelLotteryPopup"/>
	</view>
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		drawingList = [
			{pic:'',name:'1',id:1},
			{pic:'',name:'2',id:2},
			{pic:'',name:'3',id:3},
			{pic:'',name:'4',id:4},
			{pic:'',name:'5',id:5},
			{pic:'',name:'6',id:6},
			{pic:'',name:'7',id:7},
			{pic:'',name:'8',id:8},
		];
		rewardId = 0;
		showLotteryPopup = false;
		onLoad(query:any) {
			
		}
		// 转盘开始
		onClickDrawing(){
			this.rewardId = 5;
		}
		// 转盘结束
		onTurntableEnd(){
			this.showLotteryPopup = true;
		}
		onClickCancelLotteryPopup(){
			this.showLotteryPopup = false;
			this.rewardId = 0;
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#F2F2F2
	}
	.content{
		width: 100%;
		box-sizing: border-box;
	}
</style>
