<template name="goodslist">
	<view class="content" >
		<view class="goodslist-index-show" v-for="item in goodsList" :key="item.goodCode" @click="onClickJumpUrl(item.goodCode)">
			<view class="goodslist-index">
				<view class="goodslist-pic">
					<image v-if="item.mark&&item.mark!=''" class="select-team" :src="decodeURIComponent(item.mark)"/>
					<image class="goodslist-pic-image" :src="getGoodsImg(decodeURIComponent(item.pic))" mode="aspectFill"></image>
				</view>
				<view class="goodslist-right">
					<view class="goodslist-title">{{item.title}}</view>
					<view v-if="item.discount&&item.discount!=''">
						<view class="goodslist-tips" v-for="(items,indexs) in typeof (item.discount) =='string'?item.discount.split(','):item.discount" :key="indexs">
						{{typeof (item.discount) =='string'?items:items.content}}
						</view>
					</view>
					<view class="goodslist-bottom">
						<view class="goodslist-price-content">
							¥<text class="goodslist-price">{{item.price}}</text>
							<text class="price-qi">{{item.isSelect?'起':''}}</text>
						</view>
						<view v-if="mini"></view>
						<view v-else-if="!presell&&item.state!=0" class="goodslist-bottom-right" >
							<view :id="item.goodCode" class="goodslist-plan-desc">余{{item.totalNum-(item.currentNum+item.lockNum)}}/共{{item.totalNum}}</view>
							<view class="goodslist-plan-content">
								<view class="goodslist-plan-now" :style="'width:'+getPlan(item.lockNum,item.currentNum,item.totalNum)+'%'"></view>
								<view class="goodslist-plan-num">
									{{getPlan(item.lockNum,item.currentNum,item.totalNum)}}<text class="plan-baifen">%</text>
								</view>
							</view>
						</view>
						<view v-else class="goodslist-bottom-right-time">
							<view class="goodslist-plan-desc-time">{{dateFormatMSHMS(item.startAt)}}开售</view>
						</view>
						
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
    import { dateFormatMSHMS } from "@/tools/util"
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
		@Prop({default:false})
		presell:any;
		@Prop({default:false})
		mini:any;
		dateFormatMSHMS = dateFormatMSHMS
		getGoodsImg = getGoodsImg;
		screenHeight = uni.getSystemInfoSync().windowHeight
		showPlan:any = []
		@Watch('pagescroll')
		onPagescrollChanged(val: any, oldVal: any){
			this.selectory()
		}
		@Watch('goodsList')
		onGoodsListChanged(val: any, oldVal: any){
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
			return;
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
			
			this.selectory()
		}
	}
</script>

<style lang="scss">
	.goodslist{
		&-index-show{
			
		}
		&-index{
			width: 100%;
			background: #FFFFFF;
			border-radius: 4rpx;
			box-sizing: border-box;
			padding:24rpx 20rpx 24rpx 24rpx;
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			border-radius: 20rpx;
			position: relative;
		}
		&-pic{
			width: 230rpx;
			height:230rpx;
			border-radius:15rpx;
			margin-right: 24rpx;
			overflow: hidden;
			position: relative;
		}
		&-pic-image{
			width: 230rpx;
			height:230rpx;
		}
		&-right{
			width: 420rpx;
			height:230rpx;
			box-sizing: border-box;
			position: relative;
		}
		&-title{
			width: 100%;
			max-height:90rpx;
			font-size: 30rpx;
			font-family: 'ali-Light';
			font-weight: 400;
			color: #14151A;
			margin-bottom: 16rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			line-height: 45rpx;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		&-plan-content{
			width: 112rpx;
			height:40rpx;
			background: #F9D0CC;
			overflow: hidden;
			position: relative;
			border-radius: 8rpx;
			
		}
		&-plan-num{
			position: absolute;
			left:0;
			top:0;
			width: 112rpx;
			height:40rpx;
			line-height: 40rpx;
			font-size: 22rpx;
			font-family:PingFangSC-Regular, PingFang SC;
			font-weight: bold;
			color: #fff;
			text-align: center;
		}
		&-plan-desc{
			width: 100%;
			height:20rpx;
			text-align: right;
			line-height: 20rpx;
			font-size: 18rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #AAAABB;;
			margin-bottom:10rpx			
		}
		&-plan-desc-time{
			width: 100%;
			height:20rpx;
			text-align: right;
			line-height: 20rpx;
			font-size:22rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #AAAAAA;;
			margin-bottom:10rpx
		}
		&-plan-now{
			height:40rpx;
			background: #FB4E3E;
		}
		&-bottom{
			width: 100%;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			position: absolute;
			bottom:0;
			left:0;
		}
		&-bottom-right{
			width: 300rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-end;
		}
		&-bottom-right-time{
			width:250rpx;
			display: flex;
			flex-wrap: wrap;
			box-sizing: border-box;
			padding-right: 20rpx;
			color:#AAAAAA;
			font-size:30rpx ;
			justify-content: flex-end;
		}
		&-price-content{
			font-size: 26rpx;
			font-family:  Microsoft YaHei;
			font-weight: normal;
			color: #14151A;
			margin-top: -10rpx;
		}
		&-price{
			font-size: 36rpx;
		}
		
		&-tips{
			text-align: center;
			line-height: 34rpx;
			margin-right: 16rpx;
			height: 34rpx;
			background: #FFFFFF;
			border: 1rpx solid #FB4E3E;
			border-radius: 3rpx;
			font-size: 20rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FB4E3E;
			padding:0 11rpx;
			width: fit-content;
			display: inline-flex;
			margin-left: 1rpx;
		}
	}
	.plan-baifen{
		font-weight:0;
		font-size:18rpx;
		font-family:Microsoft YaHei;
	}
	.select-team{
		width: 81rpx;
		height: 37rpx;
		position: absolute;
		left:0;
		top:0;
		z-index: 1;
		box-sizing: border-box;
	}
	.price-qi{
		font-size: 20rpx !important;
		color:#ACAEB7 !important;
	}
</style>
