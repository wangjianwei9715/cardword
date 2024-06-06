<template>
	<view class="index-hot">
		<view class="hot-box" @click="onClickHot()">
			<swiper class="hot-p-b" :current="transIndex" @change="$event=>transIndex=$event.detail.current" :autoplay="true" :interval="5000" :duration="500" :circular="true">
				<swiper-item v-for="(item,index) in hot" :key="index">
					<image class="hot-pic" :src="decodeURIComponent(item.icon)" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<image class="hot-name" src="@/static/index/hot/title_h.png"/>
			<view class="hot-desc">大家都在玩～</view>
		</view>
		<view class="right">
			<view class="live-box">
				<view class="live-title">
					<image class="live-name" src="@/static/index/hot/title_live.png"/>
					<view class="live-desc">一起来围观</view>
				</view>
				<view class="live-index">
					<view class="tab-hot-boxpic-box live-border" v-for="(item,index) in broadCastList" :key="index" @click="onClickLive(item)">
						<view v-if="item.state == 2 || item.state == 1" class="live-ing"></view>
						<muqian-lazyLoad :src="decodeURIComponent(item.pic)" class="tab-hot-boxpic broadcast-box" mode="aspectFill" borderRadius="50%" width="100rpx" height="100rpx" :viewBg="true"/>
						<view class="tab-hot-live-state u-line-1">{{item.merchantName}}</view>
					</view>
				</view>
			</view>
			<view class="bottom">
				<navigator url="/pages/goods/goods_assign_list?type=cheap" hover-class="none" class="bottom-box1">
					<image class="p1" src="@/static/index/hot/p_1.png"/>
					<image class="title1" src="@/static/index/hot/title_x.png"/>
				</navigator>
				<navigator url="/pages/goods/goods_progressRank" hover-class="none"  class="bottom-box2">
					<image class="p2" src="@/static/index/hot/p_2.png"/>
					<image class="title2" src="@/static/index/hot/title_j.png"/>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		hot:any;
		@Prop({default:[]})
		broadCastList:any;

		transIndex = 0;
		onClickLive(item:any){
			if(app.token.accessToken == ''){
				app.login.arouseLogin()
				return;
			}
			if (item.third && item.third === 1001) {
				app.platform.goZgLive({
					roomID: item.roomId,
					merchantId: item.merchantId,
					playCode:item.playCode,
					isAnchor: false,
					...item
				})
				return
			}
			app.platform.goWeChatLive({playCode:item.playCode,goodCode:item.goodCode})
		}
		onClickHot(){
			uni.navigateTo({
				url:`/pages/goods/goods_seriesDetail?seriesId=${this.hot[this.transIndex].id}`
			})
		}
	}
</script>
<style lang="scss">
$swiperWidth:180rpx;
$swiperHeight:180rpx;
.index-hot{
	width: 100%;
	height:360rpx;
	box-sizing: border-box;
	padding:0 20rpx;
	display: flex;
	justify-content: space-between;
	.hot-box{
		width: 260rpx;
		height:360rpx;
		background: url(@/static/index/hot/bg_1.png) no-repeat center / 100% 100%;
		position:relative;
		box-sizing: border-box;
		padding-top: 272rpx;
		padding-left: 25rpx;
		.hot-p-b{
			width: $swiperWidth;
			height:$swiperHeight;
			position: absolute;
			top:34rpx;
			left:40rpx;
			z-index: 2;
		}
		.hot-pic{
			width: $swiperWidth;
			height:$swiperHeight;
		}
		.hot-name{
			width: 108rpx;
			height:26rpx;
		}
		.hot-desc{
			margin-top: 5rpx;
			font-size: 21rpx;
			
			font-weight: 400;
			color: #C0C0C0;
		}
	}
	.right{
		width: 442rpx;
		height:360rpx;
		.live-box{
			width: 442rpx;
			height:176rpx;
			background: url(@/static/index/hot/bg_2.png) no-repeat center / 100% 100%;
			margin-bottom: 8rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 28rpx;
		}
		.live-title{
			width: 150rpx;
			height:176rpx;
			box-sizing: border-box;
			padding-top: 58rpx;
		}
		.live-name{
			width: 109rpx;
			height:26rpx;
		}
		.live-desc{
			font-size: 21rpx;
			
			font-weight: 400;
			color: #C0C0C0;
			margin-top: 6rpx;
		}
		.live-index{
			width: 240rpx;
			height:176rpx;
			box-sizing: border-box;
			padding-top: 38rpx;
			display: flex;
			justify-content: space-between;
		}
		.tab-hot-boxpic-box{
			width: 97rpx;
			height:97rpx;
			position: relative;
		}
		.tab-hot-live-state{
			width: 104rpx;
			height: 25rpx;
			background: #FA1545;
			border: 2rpx solid #FFFFFF;
			border-radius: 5rpx;
			font-size: 16rpx;
			
			font-weight: 400;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			left:-7rpx;
			bottom:-12rpx;
			z-index:3;
		}
		.live-border{
			border:4rpx solid #FA1545;
			border-radius: 50%;
		}
		.broadcast-box{
			width: 97rpx;
			height:97rpx;
			border-radius: 50%;
			overflow: hidden;
		}
		.live-ing{
			width: 97rpx;
			height:97rpx;
			position: absolute;
			left:50%;
			top:50%;
			z-index: 2;
			border:2rpx solid #FA1545;
			border-radius: 50%;
			-webkit-animation: animate 1s linear infinite;
		}

		@keyframes animate {
			0%{
				transform: translate(-50%, -50%) scale(1);
				opacity: 1;  
			}
			50%{
				transform: translate(-50%, -50%) scale(1.1);  
				opacity: 0.5;   /*圆形放大的同时，透明度逐渐减小为0*/
			}
			100%{
				transform: translate(-50%, -50%) scale(1.2);  
				opacity: 0;   /*圆形放大的同时，透明度逐渐减小为0*/
			}
		}
	}
	.bottom{
		width: 442rpx;
		height:176rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.bottom-box1{
			width: 217rpx;
			height:176rpx;
			background: url(@/static/index/hot/bg_3.png) no-repeat center / 100% 100%;
			position: relative;
		}
		.bottom-box2{
			width: 217rpx;
			height:176rpx;
			background: url(@/static/index/hot/bg_4.png) no-repeat center / 100% 100%;
			position: relative;
		}
		.p1{
			width: 132rpx;
			height:95rpx;
			position: absolute;
			top:23rpx;
			left:44rpx
		}
		.p2{
			width: 157rpx;
			height:80rpx;
			position: absolute;
			top:28rpx;
			left:37rpx;
		}
		.title1{
			width: 109rpx;
			height:26rpx;
			position: absolute;
			left:54rpx;
			bottom:24rpx
		}
		.title2{
			width: 108rpx;
			height:26rpx;
			position: absolute;
			left:55rpx;
			bottom:24rpx
		}
	}
}
</style>
