<!--
 * @FilePath: \jichao_app_2\src\pages\act\collectSpCard\components\rewardScroll.vue
 * @Author: wjw
 * @Date: 2023-05-26 16:52:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-07 13:52:52
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="reward-content">
		<image class="reward-icon-s" src="@/static/act/collectSpCard/icon_s.png"/>
		<view class="reward-box">
			<view class="reward-title">集齐奖励</view>
			<view class="reward-scroll">
				<scroll-view class="scroll-box" scroll-x="true">
					<view class="scroll-index" v-for="(item,index) in groupReward" :key='index'>
						<view class="scroll-pic-box" @click="previewImage(item)">
							<muqian-lazyLoad class="reward-pic" :src="decodeURIComponent(item.pic)" mode="aspectFill"></muqian-lazyLoad>
						</view>
						<view class="scroll-name">{{item.name}}</view>
						<view class="scroll-rank">{{rewardRankText(item)}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<previewImage ref="previewImage" />
	</view>
</template>

<script lang="ts">
	import { Component, Prop} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		groupReward!:any[]
		created(){
		}
		mounted(){
		}
		destroyed(){
		}
		rewardRankText(item:any):string{
			return `第${item.rankStart}${item.rankEnd==0?'+':(item.rankEnd==item.rankStart?'':`-${item.rankEnd}`)}名`
		}
		previewImage(item: any) {
			this.$refs.previewImage.show({
				urls: [{ src: decodeURIComponent(item.pic), title: item.name }]
			})
		}
    
	}
</script>

<style lang="scss" scoped>
	.reward-content{
		width: 100%;
		box-sizing: border-box;
		position: relative;
		margin-top: 82rpx;
		padding-left: 49rpx;
		.reward-icon-s{
			width: 88rpx;
			height:154rpx;
			position: absolute;
			right:0;
			top:3rpx;
			z-index: 4;
		}
		.reward-box{
			width: 668rpx;
			height:276rpx;
			background: url(@/static/act/collectSpCard/reward_bg.png) no-repeat center / 100% 100%;
			position: relative;
			z-index: 3;
		}
		.reward-title{
			width: 46rpx;
			height: 184rpx;
			font-size: 42rpx;
			font-family: MINI;
			font-weight: 400;
			font-style: italic;
			color: #9BF1FF;
			line-height: 46rpx;
			text-shadow: 1px 2px 9px rgba(0,0,0,0.7);
			position: absolute;
			left:6rpx;
			top:26rpx;
		}
		.reward-scroll{
			width: 590rpx;
			height:180rpx;
			position: absolute;
			left:60rpx;
			top:40rpx;
		}
		.scroll-box{
			width: 100%;
			height:180rpx;
			white-space: nowrap;
			padding-left: 30rpx;
			box-sizing: border-box;
		}
		.scroll-index{
			display: inline-block;
			width: 104rpx;
			margin-right: 28rpx;
		}
		.scroll-pic-box{
			width: 103rpx;
			height: 103rpx;
			background: #fff;
			border-radius: 3rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.reward-pic{
				width: 103rpx;
				height:103rpx;
			}
		}
		.scroll-name{
			width: 100%;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			text-align: center;
			margin-top: 6rpx;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		.scroll-rank{
			width: 100%;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
		}
	}
</style>
