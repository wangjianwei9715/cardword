<template>
	<view v-if="awardList.length">
		<view class="cardCode" :style="{width}" @click="onClickAward">
			<view class="text">搓卡密 掉好物</view>
			<view class="flex1" style="position: relative;height: 90rpx;justify-content: center;display: flex;">
				<swiper class="swiper" autoplay="true" circular="true">
					<swiper-item class="swiper-item" v-for="(item,index) in awardList" :key="index">
						<image mode="aspectFit" v-for="(items,indexs) in item" :key="`card_${indexs}`" :src="parsePic(items)" class="pic"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="cardCode-right"></view>
		</view>
		
		<awardPopup ref="rAwardPopup" :price="price" :state="state" @goBuy="onGoBuy"/>
	</view>
</template>

<script lang="ts">
	import { Component,Prop } from "vue-property-decorator";
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
		@Prop({ default: "718rpx" })
		width?: string;
		@Prop({ default: 0 })
		price?: number;
		@Prop({ default: 0 })
		state?: number;
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
			this.awardList = this.splitArray(list,4) ;
		}
		onClickAward(){
			this.$refs.rAwardPopup.showAwardPopup(this.goodCode)
		}
		onGoBuy(){
			this.$emit("buy")
		}
		
	}
</script>

<style lang="scss" scoped>
	.cardCode{
		width: 718rpx;
		height:120rpx;
		background-size: 100% 100%;
		background-image: url("/static/goods/v3/cuoka_bg.png");
		// margin-bottom: 6rpx;
		display: flex;
		align-items: center;
		position: relative;
		box-sizing: border-box;
		padding-left: 26rpx;
		.swiper{
			position: absolute;
			width: 510rpx;
			height: 90rpx;
			justify-content: flex-end;
			flex-wrap: nowrap;
			background:rgba(0,0,0,0);
			.swiper-item{

				display: inline-flex;
				justify-content: flex-end;
			}
		}
		.text{
			width: 90rpx;
			display: flex;
			align-items: flex-start;
			font-family: YouSheBiaoTiHei;
			font-size: 30rpx;
			color: #606B88;
			line-height: 26rpx;
		}
		.flex1{
			flex: 1;
		}
		.pic{
			width: 90rpx;
			height: 90rpx;
			border-radius: 2rpx;
			margin-left: 36rpx;
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