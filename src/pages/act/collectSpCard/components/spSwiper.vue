<!--
 * @FilePath: \jichao_app_2\src\pages\act\collectSpCard\components\spSwiper.vue
 * @Author: wjw
 * @Date: 2023-05-26 16:52:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-07 14:02:00
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="banner-container">
		<view class="swiper-icon">
			<image class="icon-choois" src="@/static/act/collectSpCard/icon_choois.png"/>
		</view>
		<swiper
			:style="{ width: '100vw', height: '180rpx' }"
			:current="swiperCurrent"
			:circular="true"
			previous-margin="308rpx"
			next-margin="308rpx"
			@change="changeSwiperIndex"
		>
			<swiper-item v-for="(item, i) in list" :key="i">
				<view class="swiper-box" @click="changeSwiperIndex({detail:{current:i}})">
					<image class="swiper-pic" :class="{'init-pic':i!==current}" :src="item.pic" mode="aspectFill"/>
					<view class="swiper-desc" v-if="item.start">
						<text class="swiper-desc-text">{{item.collectedSetNum}}</text>/{{item.maxSetNum==0?'∞':item.maxSetNum}}
					</view>
					<view class="swiper-desc" v-else>暂未开始</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue ,PropSync} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		list!:any[]
		@PropSync("current",{
			type:Number
		}) swiperCurrent!: Number;
		
		created(){
		}
		mounted(){
		}
		destroyed(){
		}
		swiperDesc({start, collectedSetNum, maxSetNum}:any){
			return start ? `${collectedSetNum}/${maxSetNum==0?'∞':maxSetNum}` : '暂未开始';
		}
		changeSwiperIndex(e:any){
			if(this.swiperCurrent===e.detail.current) return;
			this.swiperCurrent = e.detail.current;
			this.$emit('change');
		}
    
	}
</script>

<style lang="scss" scoped>
	.banner-container{
		margin-top: -88rpx;
	}
	.swiper-box{
		width: 135rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		position: relative;
	}
	.current-box{
		margin:0 5rpx;
	}
	.swiper-icon{
		width: 100%;
		display: flex;
		justify-content: center;
		margin-bottom: 5rpx;
	}
	.icon-choois{
		width: 73rpx;
		height:94rpx;
		animation: float 2s ease-in-out infinite;
	}
	.swiper-pic{
		width: 134rpx;
		height:134rpx;
		transition: all 0.3s;
		position: relative;
		z-index: 1;
	}
	.init-pic{
		transform: scale(0.8);
	}
	.init-pic::before{
		content:"";
		width: 100%;
		height: 100%;
		position: absolute;
		left:0;
		top:0;
		right: 0;
		background:rgba(0,0,0,0.6);
	}
	.swiper-desc{
		margin-top: 10rpx;
		text-align: center;
		font-size: 23rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	.swiper-desc-text{
		font-size: 27rpx;
		font-weight: bold;
	}
	@keyframes float {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(6rpx);
		}
		100% {
			transform: translateY(0);
		}
	}
</style>
