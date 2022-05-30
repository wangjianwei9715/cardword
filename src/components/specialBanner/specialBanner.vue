<template>
  <view class="banner-container">
    <view class="banner-container-header">
      <view class="swiper-left-icon" @click="onClickSwiperTab('left')"></view>
      <view class="swiper-number"><text>{{index}}</text>/{{total}}</view>
      <view class="swiper-right-icon" @click="onClickSwiperTab('right')"></view>
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
    <view class="desc-wrap" v-if="bannerList!=''">
      <view class="title">{{ bannerList.goodTitle}}</view>
      <view class="desc">{{ bannerList.name }}</view>
      <view class="time" v-if="merchant!=''">
        <image class="avatar" :src="decodeURIComponent(merchant.logo)" />
        {{merchant.name+' '+dateFormat(bannerList.time)+' 拆出'}}
      </view>
    </view>
    <view class="special-bottom" >
      <view class="special-bottom-inedx" v-for="(item,index) in shareData" :key="index" @click="onClickShare(item.scene)">
        <image class="special-icon" :src="item.icon"/>
        <view class="special-name">{{item.name}}</view>
      </view>
    </view>

    
    <!-- 绘制海报canvas -->
    <canvas canvas-id="mycanvas" class="canvas-box"></canvas>
  </view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
  import { dateFormat } from "@/tools/util"
  import { app } from "@/app";
  import * as imgUtils from '@/tools/imgUtils';
  const DesignWidth = 750;
	@Component({})
	export default class ClassName extends BaseComponent {
    dateFormat = dateFormat;
		@Prop({default:[]})
		bannerList:any;
    @Prop({default:[]})
		merchant:any;
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
      {icon:'../../../static/userinfo/winningCard/icon_wechat.png',name:'微信',scene:'WXSceneSession'},
      {icon:'../../../static/userinfo/winningCard/icon_pyq.png',name:'朋友圈',scene:'WXSenceTimeline'},
      {icon:'../../../static/userinfo/winningCard/icon_save.png',name:'保存图片',scene:''},
    ]
    // 合成海报
    canvasBg = 'https://ka-world.oss-cn-shanghai.aliyuncs.com/app/canvas/bg.jpg';
    canvasLogo = 'https://ka-world.oss-cn-shanghai.aliyuncs.com/app/canvas/logo.png';
    canvasEwm = 'https://ka-world.oss-cn-shanghai.aliyuncs.com/app/canvas/erweima.png';
    canvasTitle = 'https://ka-world.oss-cn-shanghai.aliyuncs.com/app/canvas/title.png';
    canvasImg = '';
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
      // console.log('e.detail.dx=',e.detail)
      // if(this.swiperIng) return;
      // if(e.detail.dx>=80 && this.swiperIndex+1>=this.listLen() ){
      //   this.swiperRight = true;
      //   this.swiperIng = true;
      //   this.swiperLeft = false;
      // }
      // if(e.detail.dx<=-80 && this.swiperIndex==0 ){
      //   this.swiperLeft = true;
      //   this.swiperIng = true;
      //   this.swiperRight = false;
      // }
    }
    changeSwiperIndex(e:any){
      this.curIndex = e.detail.current
      setTimeout(()=>{
        this.swiperIndex = e.detail.current
      },500)
    }
    animationfinish(e:any) {
      let index = 0;
      if(this.swiperRight&&this.swiperIndex+1>=this.listLen()&&this.index<this.total){
        index = Number(this.index)+1
      }
      if(this.swiperLeft&&this.swiperIndex==0&&this.index>1){
        index = Number(this.index)-1
      }
      if(index>0) this.emitSwiper(index)
      
      this.swiperIng = false;
    }
    onClickSwiperTab(type:string){
      let index = 0;
      if(type=='right'&&Number(this.index)<Number(this.total)) index = Number(this.index)+1
      if(type=='left'&&this.index>1) index = Number(this.index)-1
      if(index>0) this.emitSwiper(index)
    }
    emitSwiper(index:number){
      this.$emit('swiperRefresh',{index:index})
      this.refresh()
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
    async onClickShare(scene:string){
      let imageSrc:any = await this.getShareAppImg();
      if(scene==''){
        app.platform.saveImageToPhotosAlbum(imageSrc,(res:any)=>{})
      }else{
        uni.share({
          provider:'weixin',
          type:2,
          scene:scene,
          imageUrl:imageSrc
        });
      }
    }
    // 生成海报
    getShareAppImg(){
      return new Promise( async (resolve, reject) => {
        uni.showLoading({title: "图片生成中"});
        let ctx = uni.createCanvasContext("mycanvas");
        
        ctx.drawImage(this.canvasBg, 0, 0, uni.upx2px(750), uni.upx2px(1334));
        ctx.drawImage(this.canvasTitle, uni.upx2px(38), uni.upx2px(48), uni.upx2px(205), uni.upx2px(50));
        imgUtils.darwRoundRect(uni.upx2px(36), uni.upx2px(134), uni.upx2px(679), uni.upx2px(861), 0, ctx,"#FFFFFF");
        imgUtils.darwRoundRect(uni.upx2px(51), uni.upx2px(147), uni.upx2px(650), uni.upx2px(833), 0, ctx,"#383a49");
        
        await this.setTailorImage(ctx);
        ctx.drawImage(this.canvasLogo, uni.upx2px(50), uni.upx2px(1143), uni.upx2px(131), uni.upx2px(131));
        ctx.drawImage(this.canvasEwm, uni.upx2px(197), uni.upx2px(1143), uni.upx2px(131), uni.upx2px(131));
        
        ctx.setFontSize(uni.upx2px(31));
        ctx.fillStyle = "#383a49";
        let strObj:any = imgUtils.getTwoLineStr(ctx, this.bannerList.name, uni.upx2px(650));
        for(let i = 0; i<strObj.length;i++){
          ctx.fillText(strObj[i] , uni.upx2px(51) , uni.upx2px(1060+(50*i)));
        }
        ctx.setFontSize(uni.upx2px(29))
        ctx.setFillStyle('#777777')
        ctx.fillText("长按识别二维码了解更多", uni.upx2px(357), uni.upx2px(1220));

        setTimeout(()=>{
          ctx.draw(true, () => {
              setTimeout(() => {
                  app.platform.canvasToTempFilePath('mycanvas', (res: any) => {
                      this.canvasImg = res.tempFilePath;
                      resolve(res.tempFilePath);
                  });
              }, 200)
          });
        },500)
      })
    }
    setTailorImage(ctx:any){
      return new Promise((resolve, reject) => {
        let imgUrl = decodeURIComponent(this.bannerList.pic[this.curIndex]);
        uni.getImageInfo({
          src:imgUrl,
          success (res) {
            let imgX = uni.upx2px(51) //图片在画布上的x轴坐标
            let imgY = uni.upx2px(147) //图片在画布上的y轴坐标
            let imgW = uni.upx2px(650) //图片在画布上的宽度
            let imgH = uni.upx2px(833) //图片在画布上的高度
            let visibleW = res.width//截取的图片的宽度
            let visibleH = res.height//截取的图片的高度
            let visibleX = null // 所截取的图片的x轴坐标
            let visibleY = null // 所截取的图片的y轴坐标
            let imgBili = imgW / imgH
            let visibleBili = visibleW / visibleH
            if(imgBili < visibleBili){
              visibleH = uni.upx2px(650) / visibleBili;
              visibleY = imgY+((imgH-visibleH)/2) // 所截取的图片的y轴坐标
              ctx.drawImage(imgUrl, imgX, visibleY, imgW, visibleH)
            }else {
              visibleX = 0
              let newH = (imgW * visibleH) / visibleW
              const bili = newH / visibleH
              visibleY = Math.abs(imgH - newH) /2 / bili
              visibleH = visibleW * imgH / imgW
              ctx.drawImage(imgUrl, visibleX, visibleY, visibleW, visibleH,imgX, imgY, imgW, imgH)
            }
            resolve(true)
            
          },
          fail (e) {
            uni.showToast({
              title:'图片生成失败',
              icon:'none'
            })
          }
          
        })
      })
    }
	}
</script>

<style lang="scss" scoped>
.banner-container {
  width: 100%;
  height: 950rpx;
  box-sizing: border-box;
  font-family: Helvetica, Tahoma, Arial, 'PingFang SC', 'Hiragino Sans GB', 'Heiti SC', STXihei, 'Microsoft YaHei', SimHei;
  .banner-container-header{
    width: 100%;
    height:140rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    .swiper-left-icon{
      width: 62rpx;
      height:62rpx;
      background:url(../../static/userinfo/winningCard/icon_left.png) no-repeat center;
      background-size: 100% 100%;
      position: absolute;
      left:160rpx;
      top:50%;
      margin-top: -31rpx;
    }
    .swiper-right-icon{
      width: 62rpx;
      height:62rpx;
      background:url(../../static/userinfo/winningCard/icon_right.png) no-repeat center;
      background-size: 100% 100%;
      position: absolute;
      right:160rpx;
      top:50%;
      margin-top: -31rpx;
    }
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
      height:40rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #777777;
      margin-top: 20rpx;
      display: flex;
      align-items: center;
      .avatar{
        width: 40rpx;
        height:40rpx;
        border-radius: 50%;
        margin-right: 6rpx;
      }
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
  bottom:30rpx;
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
.canvas-box{
  width: 750rpx;
  height:1334rpx;
  position: absolute;
  top: 0;
  font-size: 25rpx;
  left: 10000rpx;
  font-family: Helvetica, Tahoma, Arial, 'PingFang SC', 'Hiragino Sans GB', 'Heiti SC', STXihei, 'Microsoft YaHei', SimHei;
}
.canvas-img{
  width: 100%;
  height:1334rpx;
  position: fixed;
  left:0;
  top:0;
  z-index: 999;
}
</style>
