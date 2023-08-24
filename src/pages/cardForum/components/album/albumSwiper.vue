<!--
 * @FilePath: \jichao_app_2\src\pages\cardForum\components\album\albumSwiper.vue
 * @Author: wjw
 * @Date: 2023-07-03 16:16:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-24 09:34:30
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="swiper-box" @click="onClickGoCardList()">
		<swiper v-if="onGrid" class="swiper" :current="current" @change="$event=>current=$event.detail.current">
			<swiper-item v-for="(noItem,noIndex) in swiperLength" :key="noIndex">
				<u-grid class="grid-box" :border="false">
                    <u-grid-item
						v-for="(item, index) in gridList(noIndex)"
						:index="index"
						:key="index"
						class="grid-item"
                    >
						<image v-if="item.frontPic" class="grid-pic" mode="aspectFit" :src="$thumbnail(item.frontPic,300)"/>
                    </u-grid-item>
                </u-grid>
			</swiper-item>
		</swiper>
		<swiper v-else class="swiper" :current="current" @change="$event=>current=$event.detail.current">
			<swiper-item v-for="(item,index) in nolist" :key="index">
				<image class="pic" mode="aspectFit" :src="$thumbnail(item.frontPic,400)"/>
			</swiper-item>
		</swiper>
		<view class="percent">卡册完整度：{{detail.percent}}%({{detail.uploadedNoNum}}/{{detail.noNum}})<view class="right"></view></view>
		<view class="dotContainer" :style="{ width: dotContainerWidth + 'px' }" v-if="swiperLength > 1">
            <view class="indicatorScroll" :style="{ left: scrollLeft + 'px' }">
                <view :id="`dot${index}`" class="dot" :class="{ dot_big: swiperLength > 5 && current === index }"
                    v-for="(item, index) in swiperLength" :key="index"> 
                    <image v-if="index === current" style="width:16rpx;height:13rpx"
                        src="@/static/cardForum/dot_red.png">
                    </image>
                    <image v-else style="width:16rpx;height:13rpx" src="@/static/cardForum/dot.png"></image>
                </view>
            </view>
        </view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,PropSync} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	class ListParams {
		tp=1;
		fetchFrom=1;
		fetchSize=81;
		isFetchEnd=false;
	}
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:""})
		code!:string;
		@Prop({default:{}})
		forumDetail!:any;
		@PropSync("swiperCurrent",{type:Number})
		current!:number
		
		nolist = [];
		listParams = new ListParams();
		detail = {};
		dotWidth: any = uni.upx2px(24)
		dotContainerWidth: any = uni.upx2px(24) * 5
		mounted(){
			this.getDetail();
			this.getNoList();
		}
		public get onGrid() : boolean {
			return this.nolist.length>=7
		}
		public get swiperLength() : number {
			return this.onGrid?Math.ceil(this.nolist.length/9):this.nolist.length;
		}
		public get scrollLeft() {
			if (this.current <= 3) return 0
			if (this.current == this.swiperLength - 1 && this.swiperLength > 5) {
				return -(this.dotWidth * (this.current - 4))
			}
			if (this.current > 3 && this.swiperLength > 5) return -(this.dotWidth * (this.current - 3))
		}
		gridList(listIndex:number) : any[] {
			return Array.from({ length: 9 }, (_, i) => this.nolist[i+((listIndex)*9)] || '');
		}
		getDetail(){
			app.http.Get(`dataApi/cardIllustration/album/detail/${this.code}`,{},(res:any)=>{
				this.detail = res.data;
			})
		}
		getNoList(){
			if(this.listParams.isFetchEnd) return;
			app.http.Get(`dataApi/cardIllustration/album/detail/${this.code}/nolist`,this.listParams,(res:any)=>{
				this.nolist = res.list;
				this.listParams.fetchFrom += this.listParams.fetchSize;
				this.listParams.isFetchEnd = res.isFetchEnd;
			})
		}
		onClickGoCardList(){
			uni.navigateTo({
				url:`/pages/cardForum/albumCodeList?code=${this.code}&forumDetail=${encodeURIComponent(JSON.stringify(this.forumDetail))}`
			})
		}
	}
</script>

<style lang="scss">
.swiper-box{
	width: 100%;
	position: relative;
	.swiper{
		width: 750rpx;
		height: 946rpx;
		.grid-box{
			width: 750rpx;
			height: 946rpx;
			.grid-item{
				width: 250rpx;
				height:315rpx;
			}
		}
		.pic{
			width: 750rpx;
			height: 946rpx;
		}
		.grid-pic{
			width: 240rpx;
			height:305rpx;
		}
	}
	.percent{
		width: 100%;
		height:43rpx;
		background:rgba(0, 0, 0, 0.51);
		position: absolute;
		top:903rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 21rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFEFE;
		.right{
			width: 12rpx;
			height:21rpx;
			background: url(@/static/illustration/icon_right.png) no-repeat center / 100% 100%;
			margin-left: 22rpx;
		}
	}
	.dotContainer {
		// background-color: rgba(0, 0, 0, .3);
		// width: 116rpx;
		margin:0 auto;
		margin-top: 27rpx;
		height: 13rpx;
		position: relative;
		overflow: hidden;
	}

	.indicatorScroll {
		// width: 114rpx;
		white-space: nowrap;

		// height: 16rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: absolute;
		left: 0;
		transition: left 0.3s;

		.dot {
			width: 24rpx;
			height: 13rpx;
			display: inline-block;
			position: relative;
			transition: transform 0.5s;

			image {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				margin: auto;
			}
		}

		.dot_big {
			transform: scale(1.3);
		}

		.dot_select {
			background-image: url("@/static/cardForum/dot_red.png");
		}

	}
}


</style>
