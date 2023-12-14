<!--
 * @FilePath: \jichao_app_2\src\pages\drawCard\components\cardBox\cardBox.vue
 * @Author: wjw
 * @Date: 2022-11-17 15:05:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-11-21 15:22:52
 * Copyright: 2022 .
 * @Descripttion: 
-->
<template>
	<view class="card-content">
		<view
			v-show="item.picTp!=2&&(bit&1)!=1"
			class="movable-box"
			:class="[animation?'container':'',item.color==''?'movable-box-silver':'movable-box-' + item.color]"
		>
			<view class="movable-pic-bg"></view>
			<view v-if="item.rc" class="movable-rc" :class="`icon-rc-${item.color}`" />
			<image class="movable-pic" :src="item.newPic||defultPic" @error="error"/>
			<view class="movable-name" :class="{'long-name':ifNameTooLong(item.player)}">{{item.player}}</view>
		</view>
		<image v-show="item.picTp==2||(bit&1)==1" mode="aspectFit" :src="item.newPic||defultPic" @error="error" class="sp-card-image"></image>
	</view>
</template>

<script lang="ts">
	import { Component,Prop } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:{}})
		item!:any
		@Prop({default:''})
		defultPic!:string
		@Prop({default:false})
		animation?:boolean
		@Prop({default:0})
		bit!:number
		mounted(){
			
		}
		error(){
			this.$emit('errorPic')
		}
		ifNameTooLong(name:string):boolean{
			return name.length>8?true:false
		}
	}
</script>

<style lang="scss" scoped>
	.card-content{
		width: 528rpx;
		height: 795rpx;
		position: relative;
	}
	.movable-box {
		width: 528rpx;
		height: 795rpx;
		position: relative;
	}
	.movable-rc{
		width: 80rpx;
		height:80rpx;
		position: absolute;
		top:29rpx;
		right:27rpx;
		z-index: 2;
	}
	.icon-rc-blue{
		background:url(@/static/drawCard/rc_blue.png) no-repeat center / 100% 100%;
	}
	.icon-rc-gold{
		background:url(@/static/drawCard/rc_gold.png) no-repeat center / 100% 100%;
	}
	.movable-pic-bg{
		width:508rpx;
		height: 722rpx;
		position: absolute;
		top:8rpx;
		right:10rpx;
		background: url(@/static/drawCard/pic_bg_silver.png) no-repeat center / 100% 100%;
		z-index: 1;
	}
	.sp-card-image{
		width:508rpx;
		height: 722rpx;
		position: absolute;
		top:8rpx;
		right:10rpx;
		z-index: 1;
	}
	.movable-pic {
		width:496rpx;
		height:662rpx;
		margin: 10rpx 0 0 16rpx;
		position: relative;
		z-index: 2;
	}
	.movable-name{
		width: 484rpx;
		box-sizing: border-box;
		height: 96rpx;
		text-align: center;
		line-height: 90rpx;
		color:#fff;
		font-size: 41rpx;
		font-family: PingFang SC;
		font-weight: 600;
		position: absolute;
		z-index: 4;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		bottom:67rpx;
		left:16rpx;
		background: url(@/static/drawCard/card_b_silver.png) no-repeat center / 100% 100%;
	}
	.movable-box-red .movable-name{
		background: url(@/static/drawCard/card_b_red.png) no-repeat center / 100% 100%;
	}
	.movable-box-blue .movable-name{
		background: url(@/static/drawCard/card_b_blue.png) no-repeat center / 100% 100%;
	}
	.movable-box-gold .movable-name{
		background: url(@/static/drawCard/card_b_gold.png) no-repeat center / 100% 100%;
	}
	.long-name{
		font-size: 34rpx;
	}
	.movable-box-silver {
		background: url(@/static/drawCard/card_silver.png) no-repeat center -30rpx;
		background-size: 100% 100%;
	}
	.movable-box-red {
		background: url(@/static/drawCard/card_red.gif) no-repeat center -30rpx;
		background-size: 100% 100%;
	}
	.movable-box-blue{
		background: url(@/static/drawCard/card_blue.gif) no-repeat center -30rpx;
		background-size: 100% 100%;
	}
	.movable-box-gold {
		background: url(@/static/drawCard/card_gold.gif) no-repeat center -30rpx;
		background-size: 100% 100%;
	}
	.movable-box-red .movable-pic-bg{
		background: url(@/static/drawCard/pic_bg_red.png) no-repeat center / 100% 100%;
	}
	.movable-box-blue .movable-pic-bg{
		background: url(@/static/drawCard/pic_bg_blue.png) no-repeat center / 100% 100%;
	}
	.movable-box-gold .movable-pic-bg{
		background: url(@/static/drawCard/pic_bg_gold.png) no-repeat center / 100% 100%;
	}
	.container{
		animation-name:container; 
		animation-duration:1s; /*动画时间*/
	}

	@keyframes container{
		0%,
		100%,
		20%,
		50%,
		80% {
		transition-timing-function: cubic-bezier(0.215,.61,.355,1); /*贝塞尔曲线 ： X1 Y1 X2 Y2*/
		transform: translate3d(0,0,0); /*设置只在Z轴上移动*/
		}
		40%,
		43%{
		transition-timing-function: cubic-bezier(0.755,0.50,0.855,0.060);
		transform: translate3d(0,-30px,0);
		}
		70%{
		transition-timing-function: cubic-bezier(0.755,0.050,0.855,0.060);
		transform: translate3d(0,-15px,0);
		}
		90%{
		transform: translate3d(0,-3px,0);
		}
	}
	.flip-vertical-right {
		animation: flip-vertical-right 1s linear;
	}
	@keyframes flip-vertical-right {
		0% {
			-webkit-transform: rotateY(0);
					transform: rotateY(0);
		}
		100% {
			-webkit-transform: rotateY(360deg);
					transform: rotateY(360deg);
		}
	}

</style>