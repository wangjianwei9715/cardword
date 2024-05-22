<template>
	<view class="box-content">
		<transitionNav :needIconShadow="false" navColor="29,30,34" title="" style="z-index: 999;">
        </transitionNav>
		<view class="detail-content" @touchstart="detailTouchStart" @touchend="detailTouchEnd">
			<view class="top-ray" v-show="currentLevelData.isGet"></view>
			<image class="pic" :src="currentLevelData.pic"/>
			<view class="name">{{currentLevelData.name}}</view>
			<view class="explain">
				{{currenUnlockData.front}}
				<text>{{currenUnlockData.progress}}</text>
				{{currenUnlockData.after}}
			</view>
			<view class="level">
				<view class="level-index" v-for="(item,index) in levelList" :key="index" @click="currentLevel=index">
					<view class="pic-box">
						<image class="level-pic" :class="{'current-level':currentLevel==index,'nohas':!item.isGet}" :src="item.pic"/>
						<view v-if="item.reward" class="icon-reward"></view>
					</view>
					<view v-if="index<levelList.length-1" class="icon-next"></view>
				</view>
			</view>
			<view v-if="currentLevelData.reward">
				<view class="reward-title">- 点亮奖励 -</view>
				<image class="reward-pic" :style="{'width':currentLevelData.isGet?'158rpx':'147rpx'}" :src="`/static/medal/detail/coupon${currentLevelData.isGet?'_':''}.png`"/>
				<view class="reward-name">30元优惠券</view>
			</view>
		</view>
		<view class="bottom">
			<view class="have-got" v-if="currentLevelData.isGet">{{$u.timeFormat(currentLevelData.getAt,'yyyy-mm-dd')}} 获得</view>
			<view class="button">{{currentLevelData.isGet?"":"暂未获得"}}</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '@/base/BaseNode.vue';
	@Component({
		components:{}
	})
	export default class ClassName extends BaseNode {
		app = app;
		medalId = 0;
		levelList = [];
		currentLevel = 0;
		startClientX = 0;
		onLoad(query:any) {
			this.medalId = +query.id;
			this.medalDetail()
		}
		get currentLevelData(){
			return this.levelList[this.currentLevel] || {};
		}
		get currenUnlockData(){
			const { unlock_txt, satisfy_num, progressNum }:any = this.currentLevelData;
			const regex = new RegExp(`${satisfy_num}(?=[^${satisfy_num}]*$)`);
			const txt = unlock_txt.split(regex)
			return {
				front:txt[0],
				progress:`${progressNum}/${satisfy_num}`,
				after:txt[1] || ""
			}
		}
		medalDetail(){
			app.http.Get(`medal/medal/detail/${this.medalId}`,{},(res:any)=>{
				this.levelList = res.list;
			})
		}
		detailTouchStart(event:any){
			this.startClientX = event.changedTouches[0].clientX;
		}
		detailTouchEnd(event:any){
			const moveX = this.startClientX - event.changedTouches[0].clientX;
			if(moveX > 50 && this.currentLevel < this.levelList.length-1){
				this.currentLevel+=1;
			}else if(moveX < -50 && this.currentLevel > 0){
				this.currentLevel-=1;
			}
		}
	}
</script>

<style lang="scss">
	@mixin fontSfTR($fontSize) {
		width: 100%;
		font-family: SfTR;
		color: #C0C0C0;
		font-size: $fontSize;
		letter-spacing: 2rpx;
		text-align: center;
	}
	page{
		width: 100%;
		height:100%;
		background:#1D1E22
	}
	.detail-content{
		width: 100%;
		min-height: 1311rpx;
		background:url(@/static/medal/detail/bg.png) no-repeat top / 100% 1311rpx;
		box-sizing: border-box;
		padding-top: 206rpx;
		display: flex;
		justify-content: center;
		align-content: baseline;
		flex-wrap: wrap;
		position: relative;
		.top-ray{
			width: 750rpx;
			height:540rpx;
			position: absolute;
			top:0;
			left:0;
			background:url(@/static/medal/detail/top_ray.png) no-repeat top / 100% 100%;
		}
		.pic{
			width: 336rpx;
			height:336rpx;
			border-radius: 50%;
			margin-bottom: 47rpx;
		}
		.name{
			@include fontSfTR(34rpx);
			font-weight: bold;
			margin-bottom: 27rpx;
		}
		.explain{
			@include fontSfTR(24rpx);
			box-sizing: border-box;
			padding:0 73rpx;
			line-height: 34rpx;
			text{
				color:#fff;
			}
		}
		.level{
			width: 100%;
			height:190rpx;
			display: flex;
			justify-content: center;
			box-sizing: border-box;
			padding-top: 38rpx;
			.level-index{
				height:76rpx;
				display: flex;
				align-items: center;
			}
			.pic-box{
				width: 76rpx;
				height:76rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
			}
			.level-pic{
				width: 58rpx;
				height:58rpx;
				border-radius: 50%;
			}
			.current-level{
				width: 100%;
				height:100%;
			}
			.icon-next{
				width: 20rpx;
				height:20rpx;
				background: url(@/static/medal/detail/next.png) no-repeat center / 100% 100%;
				margin:0 20rpx;
			}
			.icon-reward{
				width: 19rpx;
				height: 18rpx;
				position: absolute;
				right:2rpx;
				top:2rpx;
				background: url(@/static/medal/detail/reward.png) no-repeat center / 100% 100%;
			}
		}
		.reward-title{
			@include fontSfTR(22rpx);
			margin-bottom: 20rpx;
		}
		.reward-pic{
			width: 147rpx;
			height:132rpx;
			margin-bottom: 10rpx;
		}
		.reward-name{
			@include fontSfTR(24rpx);
			color:#fff;
			font-weight: bold;
		}
	}
	.bottom{
		width: 100%;
		position: fixed;
		bottom:50rpx;
		.button{
			@include fontSfTR(28rpx);
			width: 674rpx !important;
			height: 86rpx;
			background: rgba(176, 176, 176, 0.3);
			border-radius: 3rpx;
			margin:0 auto;
			text-align: center;
			line-height: 86rpx;
		}
		.have-got{
			@include fontSfTR(19rpx);
			margin-bottom: 10rpx;
			color: #707070;
		}
	}
	.nohas{
		filter: grayscale(1)
	}
</style>
