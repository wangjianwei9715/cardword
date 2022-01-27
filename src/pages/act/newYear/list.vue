<template>
	<view class="content">
        <view class="list-title">Hit一览</view>
        <view class="pic-list">
            <image class="reward-pic"/>
        </view>
        <view class="list-title">全部奖品清单<text>(共200份)</text></view>
        <view class="list-desc"></view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		
		rewardList:any = [
			{item:[]},
			{item:[]},
		];

		onLoad(query:any) {
			
		}
		onShow(){
			
		}
		

	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background: #F6F7F8
	}
	.content{
        width: 100%;
        box-sizing: border-box;
        padding:30rpx 25rpx;
    }
    .list-title{
        width: 100%;
        font-size: 36rpx;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #5D5D5D;
        margin-bottom: 30rpx;
    }
    .list-title text{
        font-size: 30rpx;
    }
    .pic-list{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .reward-pic{
        width: 158rpx;
        height:221rpx;
    }
    .list-desc{
        font-size: 28rpx;
        color:#5D5D5D;
        font-family: MicrosoftYaHei;
        margin-bottom: 6rpx;
    }
</style>
