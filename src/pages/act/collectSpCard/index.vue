<template>
	<view class="content">
        
        <spSwiper :current.sync="group.current" :list="group.list" @change="onChangeGroupCurrent"/>
		<view v-for="(item,index) in reawrdRank" :key="index">
			<view>{{item.rank}} {{item.reward}}</view>
			<!-- <view v-for="(x,y) in "></view> -->
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
    import spSwiper from './spSwiper.vue'
	@Component({
        components:{spSwiper}
    })
	export default class ClassName extends BaseNode {
		group = {
			current:0,
			list:[
				{pic:'../../../static/act/dewu/card1.png',num1:0,num2:10},
				{pic:'../../../static/act/dewu/card2.png',num1:0,num2:10},
				{pic:'../../../static/act/dewu/card3.png',num1:0,num2:10},
				{pic:'../../../static/act/dewu/card4.png',num1:0,num2:10},
				{pic:'../../../static/act/dewu/card5.png',num1:0,num2:10},
				{pic:'../../../static/act/dewu/card6.png',num1:0,num2:10},
				{pic:'../../../static/act/dewu/card7.png',num1:0,num2:10},
				{pic:'../../../static/act/dewu/card8.png',num1:0,num2:10},
			]
		}
		reawrdRank = [
			{rank:'第1名',reward:'iphone 8',rewardId:1},
			{rank:'第2~5名',reward:'100元券',rewardId:2},
			{rank:'第6~10名',reward:'50元券',rewardId:3}
		];
		userRank = [
			{name:'haha',reward:'iphone 8',rewardId:1},
			{name:'haha2',reward:'100元券',rewardId:2},
			{name:'haha3',reward:'100元券',rewardId:2},
			{name:'haha4',reward:'100元券',rewardId:2},
			{name:'haha5',reward:'100元券',rewardId:2},
			{name:'haha6',reward:'50元券',rewardId:3},
			{name:'haha7',reward:'50元券',rewardId:3},
			{name:'haha8',reward:'50元券',rewardId:3},
			{name:'haha9',reward:'50元券',rewardId:3},
		];
        onLoad(query:any) {
		}
		// public get rewardUserRank() :  {
		// 	return 
		// }
		onChangeGroupCurrent(){
			console.log('changeSp-',this.group.current);
		}
		
	}
</script>

<style lang="scss">
    page{
        background:#fff
    }
	.content{
		width: 100%;
		box-sizing:border-box;
        background:#fff
	}
	
</style>
