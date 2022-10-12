<template name="goodslist">
	<view class="goodsContent">
		<!-- 首页轮播 -->
		<view class="index-swiper" v-if="indexSwiper&&topAddList!=''">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500"
				:circular="true" :indicator-active-color="'#fff'" :indicator-color="'rgba(170, 170, 170, .75)'">
				<swiper-item v-for="(item,index) in topAddList" :key="index">
					<muqian-lazyLoad class="swiper-image" :src="decodeURIComponent(item.pic)"
						@click="onClickTopJumpUrl(item.target)" borderRadius="5rpx"></muqian-lazyLoad>
				</swiper-item>
			</swiper>
		</view>
		<view class="goodslist-index-show" v-for="(item,index) in goodsList" :key="index">
			<view class="goodslist-index">
				<muqian-lazyLoad v-if="item.mark&&item.mark!=''" class="select-team" :src="decodeURIComponent(item.mark)"/>
				<view @click="onClickJumpUrl(item.goodCode)">
					<view class="goodslist-pic">
						<muqian-lazyLoad v-if="item.pic!=''" class="goodslist-pic-image" :src="getGoodsImg(decodeURIComponent(item.pic))" ></muqian-lazyLoad>
					</view>
					<view class="goodslist-title u-line-2 goodslist-padding">
						<view v-if="item.saleMode==1&&item.state==1" class="goodslist-remainder">剩余随机</view>
						{{item.title}}
					</view>
					<view class="goodslist-priceMsg uni-flex goodslist-padding">
						<view class="goodslist-priceMsg-left">
							￥<text class="price-text">{{item.price}}</text><text>{{getPriceStart(item)?' 起':''}}</text>
						</view>
						<view v-if="item.state==0 || item.state == -1" class="goodslist-priceMsg-right">
							{{dateFormatMSHMS(item.startAt)}}开售
						</view>
						<view v-else :id="item.goodCode" class="goodslist-priceMsg-right goodslist-plan-desc">
							{{getPlan(item,'str')}}
						</view>
					</view>
					<view class="goodslist-padding">
						<view class="goodslist-progress" :class="{'goodslist-progress-select':getSelectType(item)}">
							<view class="progressMask"
								:style="{width:(100-getPlan(item,'num'))+'%'}"></view>
						</view>
					</view>
				</view>
				<view class="goodslist-bottom goodslist-padding" @click="onClickSellerShop(item)">
					<view class="bottom-left" :class="{'bottom-left-shu':item.merchantName}">{{getGoodsPintuan(item.pintuan_type)}}</view>
					<view class="bottom-right" v-show="item.merchantName">
						<muqian-lazyLoad v-if="item.merchantLogo!=''" class="avart" :src="decodeURIComponent(item.merchantLogo)" borderRadius="50%"/>
						<view class="bussName">{{item.merchantName}}</view>
						<view class="cores"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Prop,
		Vue
	} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {
		dateFormatMSHMS
	} from "@/tools/util"
	import {
		getGoodsImg
	} from "../../tools/util";
	import {
		app
	} from "@/app";
	import {
		getGoodsPintuan
	} from '@/tools/switchUtil';
	import {
		Md5
	} from "ts-md5";
	@Component({})
	export default class ClassName extends BaseComponent {
		getGoodsPintuan = getGoodsPintuan
		@Prop({ default: [] })
		goodsList: any;
		@Prop({ default: '' })
		topAddList ? : any;
		@Prop({ default: false })
		indexSwiper ? : any;
		@Prop({ default: false })
		pagescroll: any;
		@Prop({ default: false })
		presell: any;
		@Prop({ default: false })
		mini: any;
		dateFormatMSHMS = dateFormatMSHMS;
		getGoodsImg = getGoodsImg;
		screenHeight = uni.getSystemInfoSync().windowHeight
		showPlan: any = []
		valid = true
		created() { //在实例创建完成后被立即调用
		}
		mounted() { //挂载到实例上去之后调用
		}
		getPlan(item:any,type:string){
			const width = Math.round((Number(item.lockNum) + Number(item.currentNum)) / Number(item.totalNum) * 10000)/100;
			const saleRatio = item.saleRatio>0&&item.saleRatio<1?Math.round((item.saleRatio)*10000)/100:0;
			const str = saleRatio > width ? 
			`${saleRatio}%`:
			`${item.totalNum-(item.currentNum+item.lockNum)}/${item.totalNum}`
			return type=='str' ? str : Math.max(width,saleRatio)
		}
		getPriceStart(item: any) {
			return item.isSelect || item.discount != '' || item.pintuan_type == 11
		}
		onClickJumpUrl(id: any) {
			this.$emit("send", id);
		}
		getSelectType(item: any) {
			return item.pintuan_type == 10 || item.pintuan_type == 11 || item.pintuan_type == 12
		}
		onClickSellerShop(item: any) {
			if(!item.merchantName) return;
			console.log(item);
			this.goMerchantPage(item.merchantAlias)
		}
		onClickTopJumpUrl(url: any) {
			if (url.goodCode != '') {
				app.navigateTo.goGoodsDetails(url.goodCode)
				return;
			} else if (url.url != '') {
				uni.navigateTo({
					url: '/pages/act/outLink/outLink?url=' + decodeURIComponent(url.url)
				})
				return;
			} else if (url.page != '') {
				if (decodeURIComponent(url.page) == '社群') {
					uni.$emit('showPaySuccess')
					return;
				}
				uni.navigateTo({
					url: decodeURIComponent(url.page)
				})
				return;
			}
		}
	}
</script>

<style lang="scss">
	.goodsContent {
		width: 710rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.goodslist-index-show {
		// width: 20rpx;
		// width: 300rpx;
	}
	.goodslist-padding{
		box-sizing: border-box;
		padding:0 16rpx
	}
	.goodslist {
		&-index {
			width: 349rpx !important;
			height:500rpx;
			background: #FFFFFF;
			border-radius: 5rpx;
			box-sizing: border-box;
			margin-bottom: 14rpx;
			position: relative;
			padding:0;
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
			height: 80rpx;
			font-size: 25rpx;
			font-family: PingFangSC-Regular;
			font-weight: 600;
			color: #333333;
			margin-top: 19rpx;
			display: -webkit-box;
			line-height: 38rpx;
			
		}
		&-remainder{
			width: 87rpx;
			text-align: center;
			height: 27rpx;
			background: #754DE2;
			opacity: 0.88;
			border-radius: 3rpx;
			box-sizing: border-box;
			display: inline-block;
			font-size: 19rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFEFE;
			line-height: 27rpx;
			margin-right: 6rpx;
			overflow: hidden;
			margin-bottom: -2rpx;
		}
		&-progress {
			background: linear-gradient(90deg, #FFB6C5 0%, #FA1545 100%);
			width: 100%;
			height: 8rpx;
			margin-bottom: 19rpx;
			position: relative;
			display: flex;
			justify-content: flex-end;
			.progressMask {
				height: inherit;
				background-color: #F6F7FB;
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
			margin-bottom: 11rpx;
			margin-top: 11rpx;
			align-items: flex-end;

			.goodslist-priceMsg-left {
				font-size: 18rpx;
				font-family: PingFangSC-Regular;
				font-weight: 600;
				color: #333333;
				height: 40rpx;
				display: flex;
				align-items: flex-end;

				text.price-text {
					font-size: 33rpx;
					font-family: FZLanTingHeiS-B-GB;
					font-weight: 600;
					color: #333333;
					line-height: 38rpx;
					margin-right: 10rpx;
				}

				text:last-child {
					font-size: 23rpx;
					font-family: PingFangSC-Regular;
					font-weight: 500;
					color: #959695;
				}
			}

			.goodslist-priceMsg-right {
				height: 40rpx;
				display: flex;
				align-items: flex-end;
				font-size: 23rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #959695;
			}
		}

		&-bottom {
			justify-content: space-between;
			align-items: center;
			display: flex;
			width: 100%;
			padding-bottom: 12rpx;

			.bottom-left {
				width: 102rpx;
				font-size: 23rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #959695;
				position: relative;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.bottom-left-shu::after{
				content: '';
				width: 2rpx;
				height:20rpx;
				position: absolute;
				right:0;
				top:50%;
				margin-top: -10rpx;
				background:#DADADA;
			}
			.bottom-right {
				width: 200rpx;
				display: flex;
				align-items: center;

				.avart {
					width: 26rpx;
					height: 26rpx;
					display: block;
					overflow: hidden;
					border-radius: 50%;
					margin-right: 10rpx;
				}

				.bussName {
					width: 160rpx;
					position: relative;
					font-size: 23rpx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: #333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.cores {
					display: block;
					width: 13rpx;
					height: 21rpx;
					background-image: url('../../static/goods/v2/icon_right.png');
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
			font-family: PingFangSC-Regular, PingFang SC;
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
			font-family: Microsoft YaHei;
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
			font-family: Microsoft YaHei;
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
		font-family: Microsoft YaHei;
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

	.price-qi {
		font-size: 20rpx !important;
		color: #ACAEB7 !important;
	}

	// 活动轮播
	.index-swiper {
		width: 348rpx;
		height: 500rpx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}

	.swiper {
		width: 348rpx;
		height: 500rpx;
		box-sizing: border-box;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		border-radius: 5rpx;
	}

	.swiper-image {
		width: 348rpx;
		height: 500rpx;
		box-sizing: border-box;
		border-radius: 5rpx;
	}
</style>
