<template>
	<view class="winning" v-show="showWinningCrad">
		<view class="winning-showdow" ></view>
		<view class="winning-popup">
			<image class="winning-img" :class="{'img-show':showImg}" src="../../static/index/v2/drawCard.png" />
			<view v-show="showBtn" class="winning-btn" @click="onClickJumpWinning">点击查看</view>
			<view v-show="showBtn" class="winning-close" @click="onClickCloseWinning"></view>
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
		showWinningCrad!:boolean;

		showImg = false;
		showBtn = false;
		@Watch('showWinningCrad')
		onGoodsDataChanged(val: any, oldVal: any) {
			if(val){
				setTimeout(()=>{
					this.showImg = true;
					setTimeout(()=>{
						this.showBtn = true;
					},800)
				},100)
			}
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickJumpWinning(){
			this.onClickCloseWinning();
			uni.navigateTo({
				url:'/pages/userinfo/winningCard/index'
			})
		}
		onClickCloseWinning(){
			this.showImg = false;
			this.showBtn = false;
			this.$emit('closeWinning')
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
		&-popup{
			width: 100%;
			height:600rpx;
			position: fixed;
			top:50%;
			margin-top: -350rpx;
			z-index: 99999999;
			.winning-img{
				width: 100%;
				height:486rpx;
				transition: all 0.5s;
				transform: scale(0);
			}
			.img-show{
				transform: scale(1);
			}
			.winning-btn{
				width: 249rpx;
				height:64rpx;
				font-size: 33rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FEFEFE;
				text-shadow: 0rpx 0rpx 8rpx #194647;
				text-align: center;
				line-height: 64rpx;
				margin:0 auto;
				background:url(../../static/index/v2/drawCard_btn.png) no-repeat center;
				background-size: 100% 100%;
			}
			.winning-close{
				width: 29rpx;
				height:32rpx;
				background:url(../../static/goods/drawcard/close.png) no-repeat center;
				background-size: 100% 100%;
				margin:0 auto;
				margin-top: 50rpx;
			}
		}
		
	}
	
</style>
