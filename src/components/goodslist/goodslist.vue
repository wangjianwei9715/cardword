<template name="goodslist">
	<view class="goodsContent">
		<!-- 首页轮播 -->
		<view class="index-swiper" v-if="indexSwiper&&topAddList!=''">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500"
				:circular="true" :indicator-active-color="'#fff'" :indicator-color="'rgba(170, 170, 170, .75)'">
				<swiper-item v-for="(item,index) in topAddList" :key="index">
					<image class="swiper-image" :src="decodeURIComponent(item.pic)"
						@click="onClickTopJumpUrl(item.target)" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="goodslist-index-show" v-for="item in goodsList" :key="item.goodCode">
			<view class="goodslist-index">
				<view @click="onClickJumpUrl(item.goodCode)">
					<view class="goodslist-pic">
						<image v-if="item.mark&&item.mark!=''" class="select-team" :src="decodeURIComponent(item.mark)"/>
						<image :lazy-load="true" class="goodslist-pic-image"
							:src="getGoodsImg(decodeURIComponent(item.pic))" mode="aspectFill"></image>
					</view>
					<view class="goodslist-title">{{item.title}}</view>
					<view class="goodslist-priceMsg uni-flex">
						<view class="goodslist-priceMsg-left">
							￥<text class="price-text">{{item.price}}</text><text>{{getPriceStart(item)?' 起':''}}</text>
						</view>
						<view v-if="item.state==0 || item.state == -1" class="goodslist-priceMsg-right">
							{{dateFormatMSHMS(item.startAt)}}开售
						</view>
						<view v-else class="goodslist-priceMsg-right">
							余{{item.totalNum-(item.currentNum+item.lockNum)}}/共{{item.totalNum}}
						</view>
					</view>
					<view class="goodslist-progress" :class="{'goodslist-progress-select':getSelectType(item)}">
						<view class="progressMask"
							:style="{width:(100-getPlan(item.lockNum,item.currentNum,item.totalNum))+'%'}"></view>
					</view>
				</view>
				<view class="goodslist-bottom" @click="onClickSellerShop(item.merchantId)">
					<view class="bottom-left">{{getGoodsPintuan(item.pintuan_type)}}</view>
					<view class="bottom-right">
						<image class="avart" :src="decodeURIComponent(item.merchantLogo)" />
						<view class="bussName">{{item.merchantName}}</view>
						<view class="cores"></view>
					</view>
				</view>
				<view class="goodslist-right"></view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		Component,
		Prop,
		Vue,
		Watch
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
	@Component({})
	export default class ClassName extends BaseComponent {
		getGoodsPintuan = getGoodsPintuan
		@Prop({
			default: []
		})
		goodsList: any;
		@Prop({
			default: ''
		})
		topAddList ? : any;
		@Prop({
			default: false
		})
		indexSwiper ? : any;

		@Prop({
			default: false
		})
		pagescroll: any;
		@Prop({
			default: false
		})
		presell: any;
		@Prop({
			default: false
		})
		mini: any;
		dateFormatMSHMS = dateFormatMSHMS;
		getGoodsImg = getGoodsImg;
		screenHeight = uni.getSystemInfoSync().windowHeight
		showPlan: any = []
		valid = true
		@Watch('pagescroll')
		onPagescrollChanged(val: any, oldVal: any) {
			this.selectory()
		}
		created() { //在实例创建完成后被立即调用

		}
		mounted() { //挂载到实例上去之后调用
			setTimeout(() => {
				console.log(this.goodsList)
			}, 2000)
		}
		getPlan(lock: number, now: number, all: number) {
			let width = Math.floor((Number(lock) + Number(now)) / Number(all) * 100);
			return width
		}
		getPriceStart(item: any) {
			return item.isSelect || item.discount != '' || item.pintuan_type == 11
		}
		onClickJumpUrl(id: any) {
			this.$emit("send", id);
		}
		selectory() {
			this.throttle(1000)
		}
		throttle(delay: any) {
			if (!this.valid) {
				return false
			}
			this.valid = false
			setTimeout(() => {
				this.selectoryFnc()
				this.valid = true;
			}, delay)
		}
		selectoryFnc() {
			// 实时监控目前显示的商品列表
			let select = uni.createSelectorQuery().in(this).selectAll('.goodslist-plan-desc');
			let plan: any = []
			select.boundingClientRect(res => {
				let data: any = res
				if (data) {
					for (let i in data) {
						if (data[i].top < this.screenHeight && data[i].top > 0) {
							plan.push(data[i].id)
						}
					}

					if (JSON.stringify(plan) != JSON.stringify(this.showPlan)) {
						this.showPlan = JSON.parse(JSON.stringify(plan))
						this.getGoodProgress()
					}

				}
			}).exec();
		}
		getSelectType(item: any) {
			return item.pintuan_type == 11 || item.pintuan_type == 10
		}
		getGoodProgress() {
			this.$emit('progress', this.showPlan)
		}
		onClickSellerShop(id: number) {
			const path = `/pages/userinfo/merchant_shopsV2`;
			uni.navigateTo({
				url: path + "?id=" + id
			});
		}
		onClickTopJumpUrl(url: any) {
			if (url.goodCode != '') {
				uni.navigateTo({
					url: '/pages/goods/goods_details?id=' + decodeURIComponent(url.goodCode)
				})
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
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.goodslist-index-show {
		// width: 20rpx;
		// width: 300rpx;
	}

	.goodslist {
		&-index {
			width: 356rpx;
			height: 473rpx;
			background: #FFFFFF;
			border-radius: 5rpx;
			box-sizing: border-box;
			padding: 12rpx 13rpx 17rpx 13rpx;
			align-items: center;
			margin-bottom: 13rpx;
			// border-radius: 20rpx;
			position: relative;
		}

		&-pic {
			width: 328rpx;
			height: 253rpx;
			margin: 0 auto;
			overflow: hidden;
			position: relative;
		}

		&-pic-image {
			width: 328rpx;
			height: 253rpx;
		}

		&-right {
			// width: 420rpx;
			// height: 230rpx;
			box-sizing: border-box;
			position: relative;
		}



		&-title {
			height: 60rpx;
			font-size: 27rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #333333;
			margin-top: 16rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			line-height: 32rpx;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			word-break:break-all
		}

		&-progress {
			background-image: url('../../static/goods/v2/progeessBg.png');
			background-size: 100% 100%;
			width: 100%;
			height: 8rpx;
			margin-bottom: 10rpx;
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
			background-image: url('../../static/goods/v2/progessBgg_select.png');
			background-size: 100% 100%;
		}

		&-priceMsg {
			justify-content: space-between;
			// vertical-align: bottom;
			height: 40rpx;
			display: flex;
			align-items: flex-end;
			position: relative;
			margin-bottom: 8rpx;
			margin-top: 16rpx;
			align-items: flex-end;

			.goodslist-priceMsg-left {
				font-size: 18rpx;
				font-family: PingFangSC-Regular;
				font-weight: 500;
				color: #333333;
				height: 40rpx;
				display: flex;
				align-items: flex-end;

				text.price-text {
					font-size: 33rpx;
					font-family: FZLanTingHeiS-B-GB;
					font-weight: 400;
					color: #333333;
					line-height: 38rpx;
					margin-right: 5rpx;
				}

				text:last-child {
					font-size: 21rpx;
					font-family: PingFangSC-Regular;
					font-weight: 500;
					color: #999999;
				}
			}

			.goodslist-priceMsg-right {
				height: 40rpx;
				display: flex;
				align-items: flex-end;
				font-size: 21rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #999999;
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
				color: #999999;
				position: relative;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.bottom-left::after{
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
				width: 210rpx;
				display: flex;
				align-items: center;

				.avart {
					width: 31rpx;
					height: 31rpx;
					display: block;
					overflow: hidden;
					border-radius: 50%;
					margin-right: 6rpx;
				}

				.bussName {
					width: 160rpx;
					position: relative;
					font-size: 23rpx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: #595959;
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

		&-plan-desc {
			width: 100%;
			height: 20rpx;
			text-align: right;
			line-height: 20rpx;
			font-size: 18rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #AAAABB;
			;
			margin-bottom: 10rpx
		}

		&-plan-desc-time {
			width: 100%;
			height: 20rpx;
			text-align: right;
			line-height: 20rpx;
			font-size: 22rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #AAAAAA;
			;
			margin-bottom: 10rpx
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
		width: 81rpx;
		height: 37rpx;
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
		width: 356rpx;
		height: 473rpx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}

	.swiper {
		width: 356rpx;
		height: 473rpx;
		box-sizing: border-box;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		border-radius: 5rpx;
	}

	.swiper-image {
		width: 356rpx;
		height: 473rpx;
		box-sizing: border-box;
		border-radius: 5rpx;
	}
</style>
