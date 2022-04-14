<template>
  <view class="banner-container">
    <view class="banner-container-header">
      <view class="swiper-number">
        <text>{{curIndex+1}}</text>/{{listLen()}}
      </view>
    </view>
    <swiper
      :style="{ width: '100vw', height: '810rpx' }"
      :indicator-dots="swiperConfig.indicatorDots"
      :indicator-color="swiperConfig.indicatorColor"
      :indicator-active-color="swiperConfig.indicatorActiveColor"
      :autoplay="swiperConfig.autoplay"
      :interval="swiperConfig.interval"
      :duration="swiperConfig.duration"
      :circular="swiperConfig.circular"
      :previous-margin="swiperConfig.previousMargin"
      :next-margin="swiperConfig.nextMargin"
      @change="swiperChange"
      @animationfinish="animationfinish"
    >
      <swiper-item v-for="(item, i) in bannerList" :key="i">
        <view
          class="image-container"
          :class="[
            curIndex === 0
              ? i === listLen - 1
                ? 'item-left'
                : i === 1
                ? 'item-right'
                : 'item-center'
              : curIndex === listLen - 1
              ? i === 0
                ? 'item-right'
                : i === listLen - 2
                ? 'item-left'
                : 'item-center'
              : i === curIndex - 1
              ? 'item-left'
              : i === curIndex + 1
              ? 'item-right'
              : 'item-center',
          ]"
        >
          <view class="slide-image-box" :style="{
                transform:
                  curIndex === i
                    ? 'scale(' + scaleX + ',' + scaleY + ')'
                    : 'scale(1,1)',
                transitionDuration: '.3s',
                transitionTimingFunction: 'ease',
              }">
            <image
              :src="item.pic"
              class="slide-image"
              mode="aspectFit"
              @click="getBannerDetail(i)"
            />
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="desc-wrap" :class="[isDescAnimating ? 'hideAndShowDesc' : '']">
      <view class="title">{{ bannerList[descIndex].title }}</view>
      <view class="desc">{{ bannerList[descIndex].desc }}</view>
      <view class="time">{{ dateFormat(bannerList[descIndex].time) }}</view>
    </view>
    <view class="special-bottom">
      <view class="special-bottom-inedx"></view>
    </view>
  </view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
  import { dateFormat } from "@/tools/util"
	@Component({})
	export default class ClassName extends BaseComponent {
    dateFormat = dateFormat;
		@Prop({default:[]})
		bannerList:any;
    @Prop({default:[]})
		swiperConfig:any;
    @Prop({default:(634 / 550).toFixed(4)})
		scaleX!:string;
    @Prop({default:(378 / 328).toFixed(4)})
		scaleY!:string;
    
		curIndex = 0
    descIndex = 0
    isDescAnimating = false
		created(){
		}
		mounted(){
    }
		destroyed(){
		}
    listLen() {
      return this.bannerList.length;
    }
    onClickBack(){
			uni.navigateBack({
				delta: 1
			});
		}
    swiperChange(e:any) {
      const that = this;
      this.curIndex = e.mp.detail.current;
      this.isDescAnimating = true;
      let timer = setTimeout(function () {
        that.descIndex = e.mp.detail.current;
        clearTimeout(timer);
      }, 150);
    }
    animationfinish(e:any) {
      this.isDescAnimating = false;
    }
    getBannerDetail(index:number) {
      let picData = this.bannerList.map((x:any)=>{
        return x.pic
      })
      uni.previewImage({
				urls: picData,
				current:index,
				indicator: "number" 
			});
    }
	}
</script>

<style lang="scss" scoped>
.banner-container {
  width: 100%;
  height: 950rpx;
  box-sizing: border-box;
  .banner-container-header{
    width: 100%;
    height:140rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    .icon-back{
      width: 80rpx;
      height:88rpx;
      background:url(../../static/goods/back@2x.png) no-repeat center;
      background-size: 100% 100%;
      position: absolute;
      left:0;
      top:0;
    }
    .swiper-number{
      font-size: 42rpx;
      font-family: Alibaba PuHuiTi;
      font-weight: 500;
      color: #333333;
    }
    .swiper-number text{
      font-size: 63rpx;
      font-family: Alibaba PuHuiTi;
      font-weight: bold;
      color: #333333;
    }
  }
  .image-container {
    box-sizing: border-box;
    width: 100%;
    height: 754rpx;
    display: flex;
    align-items: center;
    .slide-image-box{
      width: 510rpx;
      height: 655rpx;
      z-index: 200;
      background:#383a49;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      border:11rpx solid #383a49;
    }
    .slide-image {
      width: 420rpx;
      height: 620rpx;
      z-index: 200;
    }
  }
  .item-left {
    justify-content: flex-end;
    padding: 0 26rpx 0 0;
  }
  .item-right {
    justify-content: flex-start;
    padding: 0 0 0 26rpx;
  }
  .item-center {
    justify-content: center;
    padding: 0 0 0 0;
  }
  .item-center .slide-image-box{
    border:11rpx solid #fff;
  }
  .desc-wrap {
    box-sizing: border-box;
    width: 100%;
    height: 98rpx;
    padding: 0 90rpx 0;
    .title {
      width: 100%;
      font-size: 33rpx;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: #333333;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .desc {
      margin-top: 15rpx;
      width: 100%;
      font-size: 25rpx;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: #595959;
      line-height: 35rpx;
    }
    .time{
      width: 100%;
      font-size: 23rpx;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: #777777;
      margin-top: 15rpx;
    }
  }
  @keyframes descAnimation {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0.5;
    }
    50% {
      opacity: 0;
    }
    75% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes descAnimation {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0.5;
    }
    50% {
      opacity: 0;
    }
    75% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  .hideAndShowDesc {
    animation: descAnimation 0.3s ease 1;
    -webkit-animation: descAnimation 0.3s ease 1;
  }
}
.special-bottom{
  width: 100%;
  height:164rpx;
  position:fixed;
  bottom:0;
  left:0;
  box-sizing: border-box;
  padding: 0 70rpx;
  display: flex;
  justify-content: space-between;
  .special-bottom-inedx{
    width: 120rpx;
    height:110rpx;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
