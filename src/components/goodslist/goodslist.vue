<template name="goodslist">
	<view class="goodsContent">
		<!-- 首页轮播 -->
		<view class="index-swiper" v-if="indexSwiper&&indexAddList!=''">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500"
				:circular="true" :indicator-active-color="'#fff'" :indicator-color="'rgba(170, 170, 170, .75)'">
				<swiper-item v-for="(item,index) in indexAddList" :key="index">
					<muqian-lazyLoad class="swiper-image" :src="decodeURIComponent(item.pic)"
						@click="onClickTopJumpUrl(item.target)" borderRadius="5rpx"></muqian-lazyLoad>
				</swiper-item>
			</swiper>
		</view>
		<view class="goodslist-index-show" v-for="(item,index) in goodsList" :key="index">
			<view class="goodslist-index">
				<!-- <muqian-lazyLoad v-else-if="item.mark&&item.mark!=''" class="select-team" :src="decodeURIComponent(item.mark)"/> -->
				<view class="goodslist-index-box" @click="onClickJumpUrl(item.goodCode)">
					<view class="goodslist-pic">
						<muqian-lazyLoad v-if="item.pic!=''" class="goodslist-pic-image" :src="getGoodsImg(decodeURIComponent(item.pic))" borderRadius="5rpx 5rpx 0 0"></muqian-lazyLoad>
					</view>
					
					<view class="goodslist-title u-line-2 goodslist-padding">
						<view v-if="item.saleMode==1&&item.state==1" class="goodslist-cardicon goodslist-cardicon-purple">剩余随机</view>
						<view v-else class="goodslist-cardicon" :class="{'goodslist-cardicon-purple':[10,11].includes(item.pintuan_type)}">{{goodsManaager.gameplayType[item.pintuan_type]}}</view>
						<text class="goodslist-title-text">{{item.title}}</text>
					</view>
					<view class="goodslist-priceMsg uni-flex goodslist-padding">
						<view class="goodslist-priceMsg-left">
							￥
							<text class="price-text">{{ filterPrice(item.price).integer }}</text>
							<text class="decimal"
								v-if="filterPrice(item.price).decimal">{{ filterPrice(item.price).decimal }}</text>
							<text>{{goodsManaager.hasLowestPrice(item)?'起':''}}</text>
						</view>
						<view v-if="item.state==0 || item.state == -1" class="goodslist-priceMsg-right">
							{{$u.timeFormat(item.startAt,"mm-dd hh:MM")}}开售
						</view>
						<view v-else :id="item.goodCode" class="goodslist-priceMsg-right goodslist-plan-desc">
							{{goodsManaager.listPlan(item,'str')}}
						</view>
					</view>
					<view class="goodslist-progress" :class="{'goodslist-progress-select':goodsManaager.ifSelectType(item)}" :style="progressBg">
						<view class="progressMask" :style="{width:(100-goodsManaager.listPlan(item,'num'))+'%'}"></view>
					</view>
				</view>
				<view class="goodslist-bottom goodslist-padding" @click="onClickSellerShop(item)">
					<view class="bottom-right" v-show="item.merchantName">
						<merchantAvatar width="36rpx" height="36rpx" :level="item.merchantLevel" :src="decodeURIComponent(item.merchantLogo)"/>
						<view class="bussName">{{item.merchantName}}</view>
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
	.goodsContent {
		width: 100%;
		box-sizing: border-box;
		padding: 6rpx 20rpx 56rpx 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.goodslist-padding{
		box-sizing: border-box;
		padding:0 16rpx
	}
	.goodslist {
		&-index {
			width: 349rpx;
			height:500rpx;
			background: #FFFFFF;
			border-radius: 5rpx;
			box-sizing: border-box;
			position: relative;
			padding:0;
			margin-bottom: 14rpx;
			// overflow: hidden;
		}
		&-index-box{
			height:430rpx;
			margin-bottom: 14rpx;
		}
		&-pic {
			width: 349rpx;
			height: 268rpx;
			margin: 0 auto;
			overflow: hidden;
			position: relative;
			display: flex;
			border-top-left-radius: 5rpx;
			border-top-right-radius: 5rpx;
		}
		&-pic-image {
			width: 349rpx;
			height: 268rpx;
		}
		&-title {
			height: 75rpx;
			font-size: 25rpx;
			font-weight: 400;
			color: #333333;
			margin-top: 15rpx;
			display: -webkit-box;
			line-height: 38rpx;
			letter-spacing:1rpx;
			position: relative;
			&-text{
				padding-left: 100rpx;
			}
		}
		
		&-cardicon{
			width: 90rpx;
			height:30rpx;
			display: inline-flex;
			line-height: 31rpx;
			align-items: center;
			justify-content: center;
			font-size: 19rpx;
			font-weight: 400;
			color: #FFFFFF;
			margin-right: 10rpx;
			background: url(@/static/goods/icon_b2.png) no-repeat center / 100% 100%;
			word-break: keep-all;
			position: absolute;
			left:16rpx;
			top:4rpx;
		}
		&-cardicon-purple{
			background: url(@/static/goods/icon_b1.png) no-repeat center / 100% 100% !important;
		}
		&-progress {
			background:#FA1545;
			width: 317rpx;
			height: 6rpx;
			position: relative;
			display: flex;
			justify-content: flex-end;
			margin:0 auto;
			.progressMask {
				height: inherit;
				background-color: #f3f2f2;
				width: 30%;
			}
		}

		&-progress-select {
			background: linear-gradient(90deg, #CFC1F3 0%, #7048DD 100%);
			background-size: 100% 100%;
		}

		&-priceMsg {
			justify-content: space-between;
			// vertical-align: bottom;
			height: 40rpx;
			display: flex;
			align-items: flex-end;
			position: relative;
			margin-bottom: 15rpx;
			margin-top: 16rpx;
			align-items: flex-end;

			.goodslist-priceMsg-left {
				font-size: 18rpx;
				font-family: ArialBold !important;
				font-weight: 600;
				color: #333333;
				height: 40rpx;
				margin-bottom: -4rpx;
				text.price-text {
					font-size: 31rpx;
					line-height: 38rpx;
				}
				text.decimal{
					font-size: 23rpx;
				}
				text:last-child {
					font-size: 21rpx;
					
					font-weight: 500;
					color: #C0C0C0;
					margin-left: 6rpx;
				}
			}

			.goodslist-priceMsg-right {
				height: 40rpx;
				display: flex;
				align-items: flex-end;
				font-size: 23rpx;
				font-weight: 400;
				color: #C0C0C0;
			}
		}

		&-bottom {
			justify-content: space-between;
			align-items: center;
			display: flex;
			width: 100%;
			padding-bottom: 8rpx;

			.bottom-right {
				width: 100%;
				display: flex;
				align-items: center;
				.bussName {
					width: 246rpx;
					position: relative;
					font-size: 23rpx;
					font-weight: 400;
					color: #707070;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.cores {
					display: block;
					width: 11rpx;
					height: 17rpx;
					background-image: url('../../static/goods/v2/icon_right_new.png');
					background-size: 100% 100%;
					position: relative;
				}
			}
		}

		&-plan-content {
			// width: 112rpx;
			height: 40rpx;
			background: #F9D0CC;
			overflow: hidden;
			position: relative;
			border-radius: 8rpx;

		}

		&-plan-num {
			position: absolute;
			left: 0;
			top: 0;
			width: 112rpx;
			height: 40rpx;
			line-height: 40rpx;
			font-size: 22rpx;
			font-weight: bold;
			color: #fff;
			text-align: center;
		}

		&-plan-now {
			height: 40rpx;
			background: #FB4E3E;
		}

		&-bottom {
			// width: 100%;
			// display: flex;
			// align-items: flex-end;
			// justify-content: space-between;
			// position: absolute;
			// bottom: 0;
			// left: 0;
		}

		&-bottom-right {
			width: 300rpx;
			// display: flex;
			// flex-wrap: wrap;
			// justify-content: flex-end;
		}

		&-bottom-right-time {
			width: 300rpx;
			display: flex;
			flex-wrap: wrap;
			box-sizing: border-box;
			padding-right: 20rpx;
			color: #AAAAAA;
			font-size: 30rpx;
			justify-content: flex-end;
		}

		&-price-content {
			font-size: 26rpx;
			font-weight: normal;
			color: #14151A;
			margin-top: -10rpx;
		}

		&-price {
			font-size: 36rpx;
		}

		&-tips-list {
			width: 100%;
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;
		}

		&-tips {
			text-align: center;
			line-height: 34rpx;
			margin-right: 17rpx;
			height: 34rpx;
			background: #FFFFFF;
			border: 1rpx solid #FB4E3E;
			border-radius: 3rpx;
			font-size: 20rpx;
			font-weight: 400;
			color: #FB4E3E;
			padding: 0 11rpx;
			width: fit-content;
			margin-left: 1rpx;
			display: block;
		}
	}

	.plan-baifen {
		font-weight: 0;
		font-size: 18rpx;
	}

	.select-team {
		width: 112rpx;
		height: 32rpx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		box-sizing: border-box;
	}
	.lucky-mark{
		width: 87rpx;
		height:87rpx;
		position: absolute;
		right: -4rpx;
		top: -4rpx;
		z-index: 1;
	}
	.price-qi {
		font-size: 20rpx !important;
		color: #ACAEB7 !important;
	}

	// 活动轮播
	.index-swiper {
		width: 349rpx;
		height: 500rpx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.swiper {
		width: 349rpx;
		height: 500rpx;
		box-sizing: border-box;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		border-radius: 5rpx;
	}

	.swiper-image {
		width: 349rpx;
		height: 500rpx;
		box-sizing: border-box;
		border-radius: 5rpx;
	}
	.loadmore{
		width:750rpx;
		margin-top:20rpx;
	}
</style>
