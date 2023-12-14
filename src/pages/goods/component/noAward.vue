<template>
	<view v-if="awardList.length">
		<view class="cardCode" @click="onClickAward">
			<view class="text"><text>搓卡密掉好物</text></view>
			<view class="flex1" style="position: relative;height: 64rpx;justify-content: flex-end;display: flex;">
				<swiper class="swiper" autoplay="true" circular="true">
					<swiper-item class="swiper-item" v-for="(item,index) in awardList" :key="index">
						<image mode="aspectFit" v-for="(items,indexs) in item" :key="`card_${indexs}`" :src="parsePic(items)" class="pic"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="cardCode-right"></view>
		</view>
		
		<awardPopup ref="rAwardPopup"/>
	</view>
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { parsePic } from "@/tools/util";
	import awardPopup from "./awardPopup.vue"
	import { app } from "@/app";
	@Component({
		components:{
			awardPopup
		}
	})
	export default class ClassName extends BaseComponent {
		parsePic=parsePic;
		awardList:any = [];
		goodCode = "";
		mounted(){
		}
		destroyed(){
		}
		getLamp(goodCode:string){
			this.goodCode=goodCode;
			app.http.GetWithCrypto(`dataApi/good/${goodCode}/noAward/lamp`,{},({list}:any)=>{
				this.setAwardList(list)
			})
		}
		splitArray(arr:any[], chunkSize:number):any[] {
			var result = [];
			for (var i = 0; i < arr.length; i += chunkSize) {
				result.push(arr.slice(i, i + chunkSize));
			}
			return result;
		}
		setAwardList(list:string[]){
			this.awardList = this.splitArray(list,3) ;
		}
		onClickAward(){
			this.$refs.rAwardPopup.showAwardPopup(this.goodCode)
		}
		
	}
</script>

<style lang="scss" scoped>
	.cardCode{
		width: 710rpx;
		height:93rpx;
		background-size: 100% 100%;
		background-image: url("/static/act/luckyBag/goodsLucky.png");
		// margin-bottom: 6rpx;
		display: flex;
		align-items: center;
		position: relative;
		margin-top: -8rpx;
		box-sizing: border-box;
		padding-top: 7rpx;
		.swiper{
			position: absolute;
			width: 240rpx;
			height: 64rpx;
			justify-content: flex-end;
			flex-wrap: nowrap;
			.swiper-item{
				display: inline-flex;
				justify-content: flex-end;
			}
		}
		.text{
			font-size: 26rpx;
			font-family: PingFang SC;
			// font-weight: bold;
			color: #333333;
			margin-left: 144rpx;
			
			text{
				font-size: 32rpx;
				// color: #fdb927;
				font-weight: bold;
			}
		}
		.flex1{
			flex: 1;
		}
		.pic{
			width: 64rpx;
			height: 64rpx;
			border-radius: 2rpx;
			margin-left: 16rpx;
		}
		&-right {
			width: 11rpx;
			height:17rpx;
			background:url(@/static/goods/v2/icon_right_new.png) no-repeat center;
			background-size: 100% 100%;
			margin-right: 31rpx;
			margin-left: 30rpx;
		}
	}

</style>