<template name="goodslist">
	<view class="content" >
		<view class="goodslist-index" v-for="(item,index) in goodsList" :key="item.goodCode" @click="onClickJumpUrl(item.goodCode)">
			<image class="goodslist-pic" :src="getGoodsImg(decodeURIComponent(item.pic))" mode="aspectFill"></image>
			<view class="goodslist-right">
				<view class="goodslist-title">{{item.title}}</view>
				<view class="goodslist-plan-content">
					<view class="goodslist-plan-now" :style="'width:'+getPlan(item.lockNum,item.currentNum,item.totalNum)+'%'"></view>
					<view :id="item.goodCode" class="goodslist-plan-desc">余{{item.totalNum-(item.currentNum+item.lockNum)}}/共{{item.totalNum}}</view>
				</view>
				<view class="goodslist-bottom">
					<view class="goodslist-price-content">
						¥<text class="goodslist-price">{{item.price}}</text>
					</view>
					<view class="goodslist-tips" v-show="discountList[index]" v-for="(items,indexs) in discountList[index]" :key="indexs">
						{{items}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {
		getGoodsImg
	} from "../../tools/util";
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		goodsList:any;
		@Prop({default:1})
		pageIndex:any;
		@Prop({default:false})
		pagescroll:any;

		getGoodsImg = getGoodsImg;
		discountList:any = [];
		screenHeight = uni.getSystemInfoSync().windowHeight
		showPlan:any = []
		@Watch('pagescroll')
		onPagescrollChanged(val: any, oldVal: any){
			this.selectory()
		}
		@Watch('goodsList')
		onGoodsListChanged(val: any, oldVal: any){
			if(this.pageIndex==1){
				this.discountList = []
			}
			this.getGoodsList()
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		getPlan(lock:number,now:number,all:number){
			let width = Math.floor((Number(lock)+Number(now))/Number(all)*100);
			return width
		}
		onClickJumpUrl(id:any){
			this.$emit("send", id);
		}
		selectory(){
			setTimeout(()=>{
				// 实时监控目前显示的商品列表
				let select= uni.createSelectorQuery().in(this).selectAll('.goodslist-plan-desc');
				let plan:any = []
				select.boundingClientRect( res => {
					let data:any = res
					if(data){
						for(let i in data){
							if(data[i].top< this.screenHeight &&data[i].top>0){
								plan.push(data[i].id)
							}
						}
						if(JSON.stringify(plan) != JSON.stringify(this.showPlan)){
							this.showPlan = JSON.parse(JSON.stringify(plan))
							this.getGoodProgress()
							console.log('goodP',this.showPlan)
						}
						
					}
				}).exec();
				
			},100)
		}
		getGoodProgress(){
			this.$emit('progress',this.showPlan)
		}
		getGoodsList(){
			let data = JSON.parse(JSON.stringify(this.goodsList))
			if(data==''){
				return;
			}
			for(let i in data){
				if(data[i].discount!=''){
					this.discountList[i] = data[i].discount.split(',');
				}
			}
			this.selectory()
		}
	}
</script>

<style lang="scss">
	.goodslist{
		&-index{
			width: 100%;
			height:232rpx;
			background: #FFFFFF;
			border-radius: 4rpx;
			box-sizing: border-box;
			padding:16rpx;
			display: flex;
			align-items: center;
			margin-bottom: 16rpx;
		}
		&-pic{
			width: 200rpx;
			height:200rpx;
			border-radius: 4rpx;
			margin-right: 24rpx;
		}
		&-right{
			width: 440rpx;
			height:176rpx;
			box-sizing: border-box;
		}
		&-title{
			width: 100%;
			height:80rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #14151A;
			margin-bottom: 16rpx;
		}
		&-plan-content{
			width: 440rpx;
			height:20rpx;
			background: #FFD1BE;
			border-radius: 12rpx;
			overflow: hidden;
			position: relative;
			margin-bottom: 20rpx;
		}
		&-plan-desc{
			width: 100%;
			height:20rpx;
			position: absolute;
			left:0;
			top:0;
			z-index: 2;
			text-align: center;
			line-height: 20rpx;
			font-size: 16rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
		&-plan-now{
			height:20rpx;
			background: linear-gradient(90deg, #FD8339 0%, #F24B28 100%);
			border-radius: 12rpx;
			position: absolute;
			left:0;
			top:0;
			z-index: 1;
		}
		&-bottom{
			width: 100%;
			height:40rpx;
			display: flex;
			align-items: center;
		}
		&-price-content{
			font-size: 24rpx;
			font-family: 'DIN';
			font-weight: bold;
			color: #14151A;
		}
		&-price{
			font-size: 32rpx;
		}
		&-tips{
			width: 130rpx;
			height:38rpx;
			text-align: center;
			line-height: 38rpx;
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #E6D188;
			margin-left: 16rpx;
			background:url(../../static/index/title@2x.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
</style>
