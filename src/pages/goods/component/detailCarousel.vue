<template>
	<view class="pic-content">
		<swiper class="swiper" :current="swiperData.swiperCurrent" autoplay="true" circular="true"
			indicator-active-color="#ffffff" @change="onChangeSwiperCurrent">
			<swiper-item v-for="(item,index) in carousel" :key="index" @click="onClickPreviewImage(index)">
				<view class="goods-img-content">
					<image class="goods-img" :src="item" mode="aspectFill" />
				</view>
			</swiper-item>
		</swiper>
		<view class="swiper-popup">
			<view class="swiper-dots">{{swiperData.swiperCurrent+1}}/{{carousel.length}}</view>
			<view class="swiper-btn" v-show="yfLength>0"
				:class="{'swiper-btn-current':swiperData.swiperTabCurrent==index}" v-for="(item,index) in swiperData.swiperTab"
				:key="index" @click="onClickSwiperTab(index)">{{item}}</view>
		</view>
	</view>
			
</template>
<script lang="ts">
	import { app } from "@/app";
	import { Component, Prop, PropSync} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { Goods } from "../utils/class";
	@Component({
		components:{}
	})
	export default class ClassName extends BaseComponent {
		@Prop({ default: [] })
		carousel: any;
		@Prop({ default: 0 })
		yfLength: Number;
		@PropSync("current",{
			type:Number
		}) swiperCurrent: Number;

		swiperData:any = Goods.Swiper();
		// 观看大图
		onClickPreviewImage(index: number) {
			uni.previewImage({
				urls: this.carousel,
				current: index,
				indicator: "number"
			});
		}
		
		public get carouselLength() : number {
			//@ts-ignore
			return (this.carousel.length - this.yfLength)
		}
		
		onChangeSwiperCurrent(event: any) {
			const { swiperData } = this
			swiperData.swiperCurrent = event.detail.current;
			swiperData.swiperTabCurrent = event.detail.current < this.carouselLength ? 0 : 1;
			this.swiperCurrent = swiperData.swiperCurrent
		}
		onClickSwiperTab(index: number) {
			const { swiperData } = this
			if (index != swiperData.swiperTabCurrent) {
				swiperData.swiperTabCurrent = index;
				swiperData.swiperCurrent = index == 0 ? 0 : this.carouselLength;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pic-content {
		width: 750rpx;
		height: 578rpx;
		box-sizing: border-box;
		position: relative;
	}
	.swiper-popup {
		height: 50rpx;
		display: inline-flex;
		align-items: center;
		position: absolute;
		right: 14rpx;
		bottom: 44rpx;
		border-radius: 40rpx;
		background: rgba(49,49,49,0.3);
		box-sizing: border-box;
		padding: 0 18rpx
	}
	.swiper-dots {
		height: 42rpx;
		line-height: 42rpx;
		font-size: 20rpx;
		color: #F4F4F4;
	}
	.swiper-btn {
		height: 42rpx;
		font-size: 21rpx;
		color: #F4F4F4;
		margin-left: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.swiper-btn-current {
		font-size: 23rpx;
		color: #333333;
	}
	.swiper {
		width: 750rpx;
		height: 578rpx;
		background: #F5F5F9;
	}
	.goods-img-content {
		width: 750rpx;
		height: 578rpx;
		background: #F5F5F9;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.goods-img {
		width: 750rpx;
		height: 578rpx;
	}

</style>
