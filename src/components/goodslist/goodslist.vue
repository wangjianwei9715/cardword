<template name="goodslist">
	<view class="goodsContent">
		<view class="goods-container" v-for="(item,index) in goodsList" :key="index">
			<view class="goods-content">
				<muqian-lazyLoad v-if="item.pic!=''" class="goods-pic" :src="getGoodsImg(decodeURIComponent(item.pic))" borderRadius="5rpx 5rpx 0 0" @click="onClickJumpUrl(item.goodCode)"></muqian-lazyLoad>
				<view class="goods-index">
					<view class="goods-progress" :style="progressStyle(item.pintuan_type)">
						<view class="progressMask" :style="{width:(100-goodsManaager.listPlan(item,'num'))+'%'}"></view>
					</view>
					<view class="goods-header u-line-2" @click="onClickJumpUrl(item.goodCode)">
						<view class="cardicon">
							<text class="icon-text" :style="{color:gameplayType[item.pintuan_type].color}">{{goodsData(item).typeName1}}</text>
							<text class="icon-text">{{goodsData(item).typeName2}}</text>
						</view>
						<text class="title-text u-line-2" style="text-indent: 70rpx;">{{item.title}}</text>
					</view>
					<view class="goods-merchant" @click="onClickSellerShop(item)">
						<merchantAvatar width="30rpx" height="30rpx" :level="item.merchantLevel" :src="decodeURIComponent(item.merchantLogo)"/>
						<text class="bussName">{{item.merchantName}}</text>
					</view>
					<view class="goods-priceMsg" @click="onClickJumpUrl(item.goodCode)">
						<view class="goods-priceMsg-left">
							<text class="price-icon">￥</text>
							<text class="price-text">{{ filterPrice(item.price).integer }}</text>
							<text class="decimal"
								v-if="filterPrice(item.price).decimal">{{ filterPrice(item.price).decimal }}</text>
							<text class="lowest">{{goodsManaager.hasLowestPrice(item)?'起':''}}</text>
						</view>
						<text v-if="[0,-1].includes(item.state)" class="goods-priceMsg-right">
							{{$u.timeFormat(item.startAt)}}开售
						</text>
						<text v-else :id="item.goodCode" class="goods-priceMsg-right">
							{{goodsManaager.listPlan(item,'str')}}
						</text>
					</view>
				</view>
			</view>
		</view>
		<empty v-show="empty"/>
		<view class="loadmore">
			<u-loadmore v-show="nomore&&goodsList.length>0" :line="true" status="nomore" lineLength="20rpx"/>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { getGoodsImg,filterPrice } from "@/tools/util";
	import { gameplayType } from "@/tools/DataExchange"
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		goodsManaager = app.goods;
		@Prop({ default: [] })
		goodsList: any;
		@Prop({ default: '' })
		indexAddList ? : any;
		@Prop({ default: false })
		indexSwiper ? : any;
		@Prop({ default: false })
		pagescroll: any;
		@Prop({ default: false })
		presell: any;
		@Prop({ default: false })
		mini: any;
		@Prop({ default: false })
		empty?: any;
		@Prop({ default: false })
		nomore?: any;
		@Prop({ default: "" })
		progressColor?: string;
		getGoodsImg = getGoodsImg;
		filterPrice = filterPrice;
		screenHeight = uni.getSystemInfoSync().windowHeight
		showPlan: any = []
		valid = true;
		gameplayType = gameplayType;
		created() { //在实例创建完成后被立即调用
			
		}
		mounted() { //挂载到实例上去之后调用
		}
		public get progressBg() : any {
			if(this.progressColor=="") return {}
			return {
				background:this.progressColor
			}
		}
		goodsData(item){
			const { pintuan_type, saleMode, state } = item;
			const remainingRandom = saleMode==1&&state==1;
			const name = gameplayType[item.pintuan_type].name
			return {
				typeName1: remainingRandom ? '剩余' : (name.slice(0,2) || ''),
				typeName2: remainingRandom ? '随机' : (name.slice(2) || '')
			}
		}
		progressStyle(type){
			const { progressLeft, progressRight } = gameplayType[type]
			return {
				'background': `linear-gradient(to right,${progressLeft},${progressRight})`
			}
		}
		onClickJumpUrl(id: any) {
			this.$emit("send", id);
		}
		onClickSellerShop(item: any) {
			if(!item.merchantName) return;
			this.goMerchantPage(item.merchantAlias)
		}
		onClickTopJumpUrl(target: any) {
			app.navigateTo.navigateToAD(target)
		}
	}
</script>

<style lang="scss">
	@mixin flexCenter{
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
		// #ifndef APP-NVUE
		box-sizing: border-box;
		align-content: baseline;
		// #endif
	}
	@mixin linePadding{
		width: 357rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	.goodsContent{
		width: 100%;
		box-sizing: border-box;
		padding:0 13rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.goods-container{
		width: 357rpx;
		height:473rpx;
		margin-top: 12rpx;
	}
	.goods-content{
		width: 357rpx;
		background: #FFFFFF;
		border-radius: 5rpx;
		overflow: hidden;
		padding:0;
		@include flexCenter;
		flex-wrap: wrap;
	}
	.goods-pic{
		width: 357rpx;
		height: 277rpx;
		border-top-left-radius: 5rpx;
		border-top-right-radius: 5rpx;
	}

	.goods-index{
		width: 357rpx;
		height:196rpx;
		background: #FFFFFF;
		padding-top: 2rpx;
		@include flexCenter;
		flex-wrap: wrap;
	}
	.goods-header{
		@include linePadding;
		height:75rpx;
		position: relative;
		// #ifndef APP-NVUE
		box-sizing: border-box;
		// #endif
		margin-top: 14rpx;
	}
	.richtext{
		width: 317rpx;
		height: 72rpx;
		line-height:34rpx;
		lines:2;
		text-overflow: ellipsis;
		word-wrap:anywhere;
		font-weight: 300;
	}
	.cardicon{
		width: 66rpx;
		height:21rpx;
		margin-right: 10rpx;
		position: absolute;
		border:1rpx solid #e8e8e8;
		border-radius: 5rpx;
		@include flexCenter;
		text-align: center;
		line-height: 19rpx;
		left:20rpx;
		top:6rpx;
		font-weight: 600;
	}
	.icon-image{
		width: 66rpx;
		height:21rpx;
		position: absolute;
		left:0;
		top:0;
	}
	.icon-text{
		height:30rpx;
		line-height:30rpx;
		font-size: 14rpx;
		color: #333;
		@include flexCenter;
	}
	.hide-text{
		font-size: 24rpx;
		background:rgba(0,0,0,0);
		color:rgba(0,0,0,0)
	}
	.title-text{
		font-size: 24rpx;
		font-weight: 300;
		color: #333333;
	}
	.goods-priceMsg{
		flex:1;
		height: 69rpx;
		@include flexCenter;
		position: relative;
		align-items: flex-end;
		padding-left: 16rpx;
		padding-right: 16rpx;
		padding-bottom:16rpx;
		justify-content: space-between;
	}
	.goods-priceMsg-left{
		height: 40rpx;
		margin-bottom: -4rpx;
		@include flexCenter;
		align-items: flex-end;
	}
	.price-icon{
		font-size: 28rpx;
		font-weight: 600;
		color: #333333;
	}
	.price-text {
		font-size: 28rpx;
		font-weight: 600;
		margin-left: -6rpx;
	}
	.decimal{
		font-size: 18rpx;
		margin-bottom: 4rpx;
	}
	.lowest {
		font-size: 18rpx;
		color: #C0C0C0;
		margin-left: 6rpx;
		margin-bottom: 4rpx;
	}
	.goods-priceMsg-right{
		align-items: flex-end;
		font-size: 22rpx;
		color: #C0C0C0;
		margin-bottom: -2rpx;
	}
	.goods-progress {
		background: linear-gradient(to right,#FFBAC9,#FA1545);
		width: 357rpx;
		height: 6rpx;
		@include flexCenter;
		justify-content: flex-end;
	}
	.progressMask {
		height: 6rpx;
		background-color: #f3f2f2;
	}
	.goods-merchant {
		@include linePadding;
		height:30rpx;
		@include flexCenter;
		position: relative;
		justify-content: flex-start;
		background:#fff;
		border-bottom-left-radius: 5rpx;
		border-bottom-right-radius: 5rpx;
	}
	.bussName {
		width: 246rpx;
		font-size: 22rpx;
		color: #9FA4B0;
		lines:1;
		text-overflow: ellipsis;
	}
	.merchant-logo{
		width: 30rpx;
		height:30rpx;
		margin-right: 10rpx;
		border-radius: 50%;
	}
	.avatar-level{
		position: absolute;
		bottom:-4rpx;
		left:36rpx;
		z-index: 1;
		width: 21rpx;
		height:17rpx;
	}
	.loadmore{
		width:750rpx;
		margin-top:20rpx;
	}
</style>
