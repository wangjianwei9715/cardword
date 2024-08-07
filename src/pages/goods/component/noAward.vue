<template>
	<view v-if="awardList.length">
		<view class="cardCode" :style="boxStyle" @click="onClickAward" >
			<swiper class="swiper" autoplay="true" circular="true">
				<swiper-item class="swiper-item" v-for="(item,index) in awardList" :key="index">
					<image mode="aspectFit" v-for="(items,indexs) in item" :key="`card_${indexs}`" :src="parsePic(items)" class="pic"></image>
				</swiper-item>
			</swiper>
			<view class="cardCodr-more">
				查看更多<view class="cardCode-right"></view>
			</view>
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
		
		public get boxStyle() : any {
			return {
				'width':this.width,
				'background-image':`url(/static/goods/v3/noaward_bg${this.width=='718rpx'?'_718':''}.png)`
			}
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
			this.awardList = this.splitArray(list,6) ;
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
		height:178rpx;
		background-size: 100% 100%;
		// margin-bottom: 6rpx;
		position: relative;
		box-sizing: border-box;
		padding-top: 68rpx;
		.cardCodr-more{
			position: absolute;
			right:16rpx;
			top:16rpx;
			font-size: 20rpx;
			color: #7A88AB;
			display: flex;
			align-items: center;
		}
		.swiper{
			width: 100%;
			box-sizing: border-box;
			height: 90rpx;
			justify-content: flex-start;
			flex-wrap: nowrap;
			background:rgba(0,0,0,0);
			padding-left: 24rpx;
			.swiper-item{
				display: inline-flex;
				justify-content: flex-start;
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
			margin-right: 34rpx;
		}
		&-right {
			width: 11rpx;
			height:17rpx;
			background:url(@/static/goods/v2/icon_right_new.png) no-repeat center;
			background-size: 100% 100%;
			margin-left: 12rpx;
		}
	}

</style>