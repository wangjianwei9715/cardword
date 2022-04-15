<template>
  <view class="banner-container">
    <view class="banner-container-header">
      <view class="swiper-number">
        <text>{{index}}</text>/{{total}}
      </view>
    </view>
    <swiper
      :style="{ width: '100vw', height: '810rpx' }"
      :current = "curIndex"
      :indicator-dots="swiperConfig.indicatorDots"
      :indicator-color="swiperConfig.indicatorColor"
      :indicator-active-color="swiperConfig.indicatorActiveColor"
      :autoplay="swiperConfig.autoplay"
      :interval="swiperConfig.interval"
      :duration="swiperConfig.duration"
      :circular="swiperConfig.circular"
      :previous-margin="swiperConfig.previousMargin"
      :next-margin="swiperConfig.nextMargin"
      @change="changeSwiperIndex"
      @transition="swiperChange"
      @animationfinish="animationfinish"
    >
      <swiper-item v-for="(item, i) in bannerList.pic" :key="i">
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
              :src="decodeURIComponent(item)"
              class="slide-image"
              mode="widthFix"
              @click="getBannerDetail(i)"
            />
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="desc-wrap">
      <view class="title">{{ bannerList.goodTitle?bannerList.goodTitle:'' }}</view>
      <view class="desc">{{ bannerList.name?bannerList.name:'' }}</view>
      <view class="time">{{ bannerList.time?dateFormat(bannerList.time):'' }}</view>
    </view>
    <view class="special-bottom" >
      <view class="special-bottom-inedx" v-for="(item,index) in shareData" :key="index">
        <image class="special-icon" :src="item.icon"/>
        <view class="special-name">{{item.name}}</view>
      </view>
    </view>

    
    <!-- 绘制海报canvas -->
    <canvas canvas-id="mycanvas" style="width: 750rpx;height:1334rpx;position: absolute;top: 0;left: 10000rpx;"></canvas>
  </view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
  import { dateFormat } from "@/tools/util"
  const DesignWidth = 750;
	@Component({})
	export default class ClassName extends BaseComponent {
    dateFormat = dateFormat;
		@Prop({default:[]})
		bannerList:any;
    @Prop({default:[]})
		swiperConfig:any;
    @Prop({default:0})
		index:any;
    @Prop({default:0})
		total:any;
    @Prop({default:(634 / 550).toFixed(4)})
		scaleX!:string;
    @Prop({default:(378 / 328).toFixed(4)})
		scaleY!:string;
    
		curIndex = 0;
    swiperRight = false;
    swiperLeft = false;
    swiperIng = false;
    swiperIndex = 0;
    shareData = [
      {icon:'../../../static/userinfo/winningCard/icon_wechat.png',name:'微信'},
      {icon:'../../../static/userinfo/winningCard/icon_pyq.png',name:'朋友圈'},
      {icon:'../../../static/userinfo/winningCard/icon_save.png',name:'保存图片'},
    ]
    // 合成海报
    canvasBg = 'https://ka-world.oss-cn-shanghai.aliyuncs.com/app/canvas/bg.jpg';
		created(){
		}
		mounted(){
    }
		destroyed(){
		}
    listLen() {
      return this.bannerList.pic.length;
    }
    onClickBack(){
			uni.navigateBack({
				delta: 1
			});
		}
    swiperChange(e:any) {
      if(this.swiperIng) return;
      if(e.detail.dx>=80 && this.swiperIndex+1>=this.listLen() ){
        this.swiperRight = true;
        this.swiperIng = true;
        this.swiperLeft = false;
      }
      if(e.detail.dx<=-80 && this.swiperIndex==0 ){
        this.swiperLeft = true;
        this.swiperIng = true;
        this.swiperRight = false;
      }
    }
    changeSwiperIndex(e:any){
      this.curIndex = e.detail.current
      setTimeout(()=>{
        this.swiperIndex = e.detail.current
      },500)
    }
    animationfinish(e:any) {
      if(this.swiperRight&&this.swiperIndex+1>=this.listLen()&&this.index<this.total){
        this.$emit('swiperRefresh',{index:Number(this.index)+1})
        this.refresh()
      }
      if(this.swiperLeft&&this.swiperIndex==0&&this.index>1){
        this.$emit('swiperRefresh',{index:Number(this.index)-1})
        this.refresh()
      }
      this.swiperIng = false;
    }
    getBannerDetail(index:number) {
      let data = this.bannerList.pic.map((x:any)=>{
        return decodeURIComponent(x)
      })
      uni.previewImage({
				urls: data,
				current:index,
				indicator: "number" 
			});
    }
    refresh(){
      this.swiperRight = false;
      this.swiperLeft = false;
      this.curIndex = 0
    }

    // 生成海报
    getShareAppImg(){
      return new Promise((resolve, reject) => {
        // 获取屏幕尺寸
        let systemInfo = uni.getSystemInfoSync();
        // 屏幕宽高 宽度比
        let ratio = systemInfo.windowWidth / DesignWidth;
        let ctx = uni.createCanvasContext("mycanvas");

        ctx.drawImage(this.canvasBg, 0, 0, 750 * ratio, 1334* ratio);
      })
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
      font-family: PingFangSC-Regular;
      font-weight: 500;
      color: #333333;
    }
    .swiper-number text{
      font-size: 63rpx;
      font-family: PingFangSC-Medium;
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
      overflow: hidden;
    }
    .slide-image {
      width: 510rpx;
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
      font-family: PingFangSC-Regular;
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
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #595959;
      line-height: 35rpx;
    }
    .time{
      width: 100%;
      font-size: 23rpx;
      font-family: PingFangSC-Regular;
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
    .special-icon{
      width: 73rpx;
      height:74rpx;
    }
    .special-name{
      width: 100%;
      font-size: 25rpx;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #333333;
      text-align: center;
      margin-top: 13rpx;
    }
  }
}
</style>
