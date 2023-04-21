<!--
 * @FilePath: \jichao_app_2\src\pages\drawCard\drawCard.vue
 * @Author: wjw
 * @Date: 2022-11-16 11:38:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-04-20 15:40:53
 * Copyright: 2022 .
 * @Descripttion: 
-->
<template>
  <view>
    <!-- 启动动画 -->
    <view v-if="!initData.start" class="drawcard-start">
      <view class="drawcard-start-box">
        <image
          class="drawcard-start-pic"
          src="@/static/drawCard/card_dangban.png"
        ></image>
        <view class="drawcard-start-time">卡密即将开启（{{ initData.startTime }}%）</view>
      </view>
    </view>
    <image class="video-bg" :src="bgImage"/>
    <l-svga v-if="!sceneData.showDefault&&animationSwitch" class="video-bg" ref="svga"></l-svga>
    
    <view class="draw-box"> 
      <!-- 顶部导航 -->
      <view class="draw-navigation">
        <view class="draw-back" @click="onClickBack()"><view class="icon-back"></view></view>
        <view class="draw-navigation-right">
          <view class="draw-navigation-tab" v-for="item in navigationTab" :key="item.type" @click="onClickNavigation(item)">
            <view v-if="item.type=='ani'&&!animationSwitch" class="icon-anin"></view>
            <view v-else :class="`icon-${item.type}`" ></view>
            <view class="draw-navigation-msg u-line-1">{{item.type=='music'?musicData.name:item.name}}</view>
          </view>
        </view>
      </view>
      <!-- 场景选择 -->
      <scene :popupShow.sync="sceneData.show" :picType="sceneData.picType" @sceneChange="sceneChange"/>
      <!-- 音乐选择 -->
      <!-- <music :popupShow.sync="musicData.show" @musicChange="musicData.name=$event"/> -->
      <!-- 卡片拖动控件 -->
			<movable-area class="movable-area">
				<movable-view
					class="movable-content"
          :disabled=" item.index != cardData.step || DrawCardOver || animationStart"
          v-for="item in showList"
					:key="item.index"
					direction="all"
          :animation="true"
          :x="item.index == cardData.step ? moveData.x : moveData.x_init"
					:y="item.index == cardData.step ? moveData.y : moveData.y_init"
          :style="'z-index:' + (999 - item.index)"
          @change="onChangeMovable"
          @touchstart.prevent="picTouchStart"
          @touchend.prevent="picTouchEnd"
				>
          <view v-if="item.index == 0" class="movable-box dangban" ></view>
          <view v-else-if="item.index==cardData.step+1&&animationStart"></view>
          <animationCard v-else-if="item.color=='gold'&&animationSwitch" :start="item.index==cardData.step&&animationStart" :cardMove="item.index==cardData.step+1&&cardMove" :animationData="{team:item.cartoonCfg.team,position:item.cartoonCfg.posit,rc:item.rc}" @animationOver="animationStart=false">
            <view class="movable-box movable-box-gold">
              <view class="movable-pic-bg"></view>
              <image class="movable-pic" :src="item.pic||defultPic"/>
              <view class="movable-name" :class="{'long-name':ifNameTooLong(item.player)}">{{item.player}}</view>
            </view>
          </animationCard>
					<view 
            v-else 
            class="movable-box"
            :class="[(item.index == cardData.step + 1)&&item.color=='gold'?'container':'',item.color==''?'movable-box-silver':'movable-box-' + item.color]"
          >
            <view class="movable-pic-bg"></view>
            <image class="movable-pic" :src="item.pic||defultPic"/>
            <view class="movable-name" :class="{'long-name':ifNameTooLong(item.player)}">{{item.player}}</view>
          </view>
				</movable-view>
			</movable-area>
      
      <view class="bottom-box">
        <view class="cardname">{{this.cardname}}</view>
        <view class="cardstep">
          <view class="card-step-box" @click="drawerDataSort(),drawerData.show=true">
            {{cardData.step}}/<text class="card-step-num">{{cardData.total}}</text>
            <image class="card-step-icon" src="@/static/drawCard/icon_step.png"/>
          </view>
          <view class="card-step-tips">*图片、动画可能存在误差，请以实际卡密为准</view>
        </view>
      </view>

      <bottomDrawer :showDrawer.sync="drawerData.show" :title="'已解锁卡密'">
        <view class="drawer-box">
          <view class="drawer-box-header">
            <view
              @click="onClickDrawerType(item.id)"
              class="drawer-box-header-btn"
              v-for="(item, index) in drawerData.tab"
              :key="index"
              :class="{ 'drawer-box-header-check': drawerData.check == item.id, 'drawer-box-header-btn-right': item.id == 2, }">{{ item.name }}</view>
          </view>
          <view class="drawer-box-item" :class="{ 'border-bottom': index != cardData.step }" v-for="(item, index) in drawerData.code" :key="index">
            <view class="drawer-box-item-left">{{ item.name }}</view>
            <view class="drawer-box-item-right">{{ index+1 }}</view>
          </view>
        </view>
      </bottomDrawer>
    </view>
  </view>
</template>
<script lang="ts">
  import { app } from "@/app";
	import { Component } from "vue-property-decorator";
  import { DarwCard } from './utils/interface'
  import { parsePic } from "@/tools/util";
	import BaseNode from '../../base/BaseNode.vue';
  import music from './components/music/music.vue'
  import scene from './components/scene/scene.vue'
  import animationCard from './components/animationCard/animationCard.vue'
  @Component({
    components:{music,scene,animationCard}
  })
	export default class ClassName extends BaseNode {
    parsePic = parsePic;
    navigationTab:Array<{
        type:string;
        name:string;
    }> = [
      {type:'scene',name:'场景'},
      {type:'ani',name:'动画'},
      // {type:'music',name:'音乐'}
    ];
    initData:DarwCard.Init = {
      initInterval:'',
      start:false,
      startTime:0,
      noMoreData:false,
      goodOrder:'',
      pageIndex:2,
      pageSize:30
    };
    /**动画开关 */
    animationSwitch:boolean = true;
    animationStart:boolean = false;
    sceneData = { show:false, picType:0, bg:'', showDefault:false, firstLoad:true,svgaOpen:false };
    musicData = { show:false, name:'' };
    moveData = { x:0, y:0, x_init:0, y_init:0, };
    changeMove:any = {};
    cardMove:boolean = false;
    cardData = { step:0, total:0 };
    codeList:Array<any|DarwCard.Code>=[];
    drawerData = {
      show:false,
      check:1,
      tab:[{ id: 1, name: "默认排序" }],
      code:[]
    };
    defultPic:string = '../../static/goods/drawcard/default.png';
    /**是否最后一张卡片 */
    public get DrawCardOver():boolean {
      return this.cardData.step  >= this.cardData.total;
    }
    public get cardname() : string {
      if(this.cardData.step===0) return '拖动卡片解锁卡密';
      return this.animationStart?'':this.codeList[this.cardData.step].name
    }
    public get showList(): Array<any|DarwCard.Code>{
      const endNum = this.codeList.length;
      const list = this.codeList.slice(this.cardData.step,Math.min(this.cardData.step+2,endNum));
      return list
    }
    public get bgImage() : string {
      const _default = '/static/goods/drawcard/black_bg.jpg';
      if(!this.sceneData.showDefault && !this.sceneData.svgaOpen){
        return `/static/drawCard/${this.sceneData.bg}.jpg`
      }
      return _default
    } 
    onLoad(query:any){
      const initCode = JSON.parse(query.data);
      initCode.forEach((x:DarwCard.Code,index:number)=>{
        x.pic = parsePic(decodeURIComponent(x.pic))
        x['index'] = index+1
      });
      this.codeList = [{index:0},...initCode]
      this.cardData.total = query.num;
      this.initData.goodOrder = query.code;
      
      if(query.num<=30){
        this.initEvent(query)
      }else{
        this.reqNewData(()=>{
          this.initEvent(query)
        })
      }
      if(query.picType == 1){
        this.defultPic = '../../static/goods/drawcard/default_.png';
      }      
      this.$nextTick(() => {
        this.InitMoveData();
      })
    }
    destroyed(){
      clearInterval(this.initData.initInterval)
    }
    onClickBack(){
      uni.navigateBack({delta:1})
    }
    initEvent(query: any): void { 
      this.initDrawerTab(query);
      this.sceneData.picType = query.picType || 0;
      this.initAnimationSwitch();
      this.initStartTime(); 
    }
    // 封装初始化抽屉标签的方法 private 
    initDrawerTab(query: any): void { 
      if(query.hasNumber) { this.drawerData.tab.push({ id: 2, name: "按限编排序" }); } 
    }
    // 封装初始化动画开关的方法 private 
    initAnimationSwitch(): void { 
      const storageSwitch = uni.getStorageSync('animationSwitch'); 
      if(typeof(storageSwitch) === 'boolean') { 
        this.animationSwitch = storageSwitch; 
      }else if(app.platform.systemInfo.platform == 'android'){
        this.animationSwitch = false
      } 
      
    }
    // 封装初始化 startTime 的方法 private 
    initStartTime(): void { 
      const { initData } = this; 
      initData.initInterval = setInterval(() => { 
        if (initData.startTime < 100) { 
          initData.startTime++; 
        } else { 
          clearInterval(initData.initInterval); setTimeout(() => { initData.start = true; }, 1000); 
        } 
      }, 10); 
    }
    onClickNavigation(item:{ type:string; name:string; }){
      if(item.type=='scene') this.sceneData.show=true ;
      if(item.type=='music') this.musicData.show=true ;
      if(item.type=='ani') this.onClickAnimation();
    }
    // 背景选择
    sceneChange(event:string){
      const { firstLoad } = this.sceneData;
      if( !firstLoad && event!='' && this.animationSwitch ){
        uni.showLoading({title: "场景生成中"});
      }
      this.sceneData.showDefault = (event=='');
      this.sceneData.firstLoad = false;
      this.sceneData.svgaOpen = false
      if(!this.sceneData.showDefault){
        this.sceneData.bg=event;
        if(this.animationSwitch){
          setTimeout(()=>{
            this.svgaRender(`/static/drawCard/${event}.svga`);
          },500)
        }
      }
    }
		svgaRender(svgaSrc:any) { 
			this.$refs['svga'].render(async (parser:any, player:any) => {
				const videoItem = await parser.load(svgaSrc);
				await player.setVideoItem(videoItem);
        player.clearsAfterStop = true
				player.startAnimation();
        uni.hideLoading();
        this.sceneData.svgaOpen = true
			})
		}
    // 封装点击动画按钮的方法 private 
    onClickAnimation(): void { 
      if(this.animationStart) { return; } 
      uni.showModal({ 
        title: '提示', 
        content: `是否${this.animationSwitch ? '关闭' : '开启'}动画`, 
        success: (res) => { 
          if (res.confirm) { 
            this.animationSwitch = !this.animationSwitch; 
            if(!this.animationSwitch){
              this.sceneData.svgaOpen = false;
            }
            uni.setStorageSync('animationSwitch',this.animationSwitch); 
            if(this.animationSwitch &&!this.sceneData.showDefault){
              setTimeout(()=>{
                uni.showLoading({title: "动画开启中"});
                this.svgaRender(`/static/drawCard/${this.sceneData.bg}.svga`);
              },500)
            }
          } 
        } 
      }); 
    }
    /**移动数据初始化 */
    InitMoveData(){
      let x = uni.upx2px(611);
      let y = uni.upx2px(880);
      this.moveData = { x:x, y:y, x_init:x, y_init:y }
    }
    picTouchStart(){
      if(this.DrawCardOver){
        uni.$u.throttle(()=>{
          uni.showToast({ title:'已经是最后一张了', icon:'none' })
        },3000)
      }
      
      !this.animationStart && (this.cardMove=true)
    }
    /**移动中 */
    onChangeMovable(event:any) {
      if(event.detail.source=='touch'){
        this.changeMove = event.detail;
      }
    }
    /**移动结束 计算位置 */
    picTouchEnd() {
      if(this.DrawCardOver || this.animationStart) return;
      const { x_init: iX, y_init: iY } = this.moveData; 
      const { x: mX, y: mY } = this.changeMove; 
      this.moveData.x = mX;
      this.moveData.y = mY;
      
      setTimeout(() => {
        const move_x = Math.abs(mX - iX);
        const move_Y = Math.abs(mY - iY);
        if(move_x>uni.upx2px(220) || move_Y>uni.upx2px(300)){
          this.cardData.step++;
          const nextItem = this.codeList[this.cardData.step]
          if(['gold','SP'].includes((nextItem as DarwCard.Code).color)) uni.vibrateLong({});
          // 特效卡并且动画开启
          if((nextItem as DarwCard.Code).color=='gold'&&this.animationSwitch){
            this.animationStart = true;
          }
        }
        this.moveData.x = this.moveData.x_init;
        this.moveData.y = this.moveData.y_init;
        this.cardMove = false;
      }, 50);
    }
    // 解锁卡密排序切换
    onClickDrawerType(index: number){
      if (this.drawerData.check != index) {
        this.drawerData.check = index;
        this.drawerDataSort();
      }
    }
    drawerDataSort(){
      const data:any = this.codeList.slice(1,this.cardData.step+1);
      if(this.drawerData.check == 2){
        data.sort((a:DarwCard.Code, b:DarwCard.Code) => {
          if(b.number === 0 || a.number === 0){
            return b.number - a.number
          }else{
            return a.number - b.number
          }
        } );
      }
      this.drawerData.code = data
    }
    reqNewData(cb?:Function){
      const { pageIndex, pageSize, noMoreData, goodOrder } = this.initData;
      // 获取更多商品
      if (noMoreData||this.cardData.total<=30)  return;

      app.http.Get(`me/orderInfo/buyer/${goodOrder}/noShowList`, { pageIndex, pageSize }, (data: any) => {
        if (data.list) {
          const index = this.codeList.length;
          this.codeList.push(
            ...data.list.map(({ pic, ...rest }:DarwCard.Code, i:number) => ({
              ...rest,
              pic: parsePic(decodeURIComponent(pic)),
              index: index + i
            }))
          );
        }
        if(data.totalPage<=pageIndex){
          this.initData.noMoreData = true;
          if(cb) cb()
        }else{
          this.initData.pageIndex++;
          setTimeout(()=>{
            this.reqNewData();
            cb && cb();
          },100)
        }
      });
    }
    ifNameTooLong(name:string):boolean{
      return name.length>8?true:false
    }
    
  }
  

</script>

<style lang="scss">
  .drawcard-start {
    width: 100%;
    height: 100%;
    position: fixed;
    background:#fff;
    z-index: 9999;
    &-box {
      width: 287rpx;
      height: 483rpx;
      position: fixed;
      top: 50%;
      margin-top: -300rpx;
      left: 50%;
      margin-left: -143.5rpx;
    }
    &-pic {
      width: 287rpx;
      height: 403rpx;
    }
    &-time {
      width: 100%;
      margin-top: 30rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #a3a3a3;
      text-align: center;
    }
  }
  .video-bg{
    width: 100%;
    height:100%;
    position: fixed;
    left:0;
    bottom:0;
    top:0;
    right:0;
    z-index: 0;
  }
  .draw-box{
    width: 100%;
    height:100%;
    position: fixed;
    left:0;
    bottom:0;
    top:0;
    right:0;
    z-index: 9;
    padding-top: 80rpx;
  }
  .draw-navigation{
    width: 100%;
    height:100rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding:0 35rpx;
    .draw-back{
      width: 49rpx;
      height: 49rpx;
      background: linear-gradient(0deg, #FFFFFF, rgba(255,255,255,0.01), #FFFFFF);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon-back{
      width: 17rpx;
      height:30rpx;
      background: url(@/static/drawCard/icon_back.png) no-repeat center / 100% 100%;
      margin-left: -2rpx;
    }
    .draw-navigation-right{
      height:100rpx;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .draw-navigation-tab{
      display: flex;
      align-items: center;
      padding:0 18rpx 0 16rpx;
      height:49rpx;
      line-height: 49rpx;
      box-sizing: border-box;
      background: linear-gradient(0deg, #FFFFFF, rgba(255,255,255,0.01), #FFFFFF);
      border-radius: 24rpx;
      font-size: 25rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      margin-left: 29rpx;
    }
    .draw-navigation-msg{
      max-width: 160rpx;
      height:49rpx;
      line-height: 49rpx;
      margin-left: 8rpx;
    }
    .icon-scene{
      width: 28rpx;
      height:26rpx;
      background: url(@/static/drawCard/icon_scene.png) no-repeat center / 100% 100%;
    }
    .icon-ani{
      width: 31rpx;
      height:30rpx;
      background: url(@/static/drawCard/icon_ani.png) no-repeat center / 100% 100%;
    }
    .icon-anin{
      width: 31rpx;
      height:30rpx;
      background: url(@/static/drawCard/icon_ani_.png) no-repeat center / 100% 100%;
    }
    .icon-music{
      width: 26rpx;
      height:25rpx;
      background: url(@/static/drawCard/icon_music.png) no-repeat center / 100% 100%;
    }
  }
  .movable-area {
    position: fixed;
    left: -500rpx;
    top: -500rpx;
    width: 1750rpx;
    height: calc(100% + 1000rpx);
    pointer-events: none;
    z-index:3;
  }
  .movable-content {
    pointer-events: auto;
    width: 528rpx;
    height: 795rpx;
  }
  .movable-box {
    width: 528rpx;
    height: 795rpx;
    position: relative;
  }
  .movable-pic-bg{
    width:508rpx;
    height: 722rpx;
    position: absolute;
    top:8rpx;
    right:10rpx;
    background: url(@/static/drawCard/pic_bg_silver.png) no-repeat center / 100% 100%;
    z-index: 1;
  }
  .movable-pic {
    width:454rpx;
    height:626rpx;
    margin: 10rpx 10rpx 0 42rpx;
    position: relative;
    z-index: 2;
  }
  .movable-name{
    width: 100%;
    box-sizing: border-box;
    padding:0 50rpx;
    height: 90rpx;
    text-align: center;
    line-height: 90rpx;
    color:#fff;
    font-size: 43rpx;
    font-family: PingFang SC;
    font-weight: 600;
    position: relative;
    z-index: 2;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .long-name{
    font-size: 34rpx;
  }
  .dangban {
    background: url("../../static/drawCard/card_dangban.png") no-repeat 8rpx 8rpx;
    background-size: 513rpx 722rpx;
  }
  .movable-box-silver {
    background: url(../../static/drawCard/card_silver.png) no-repeat center -30rpx;
    background-size: 100% 100%;
  }
  .movable-box-red {
    background: url(../../static/drawCard/card_red.gif) no-repeat center -30rpx;
    background-size: 100% 100%;
  }
  .movable-box-blue{
    background: url(../../static/drawCard/card_blue.gif) no-repeat center -30rpx;
    background-size: 100% 100%;
  }
  .movable-box-gold {
    background: url(../../static/drawCard/card_gold.gif) no-repeat center -30rpx;
    background-size: 100% 100%;
  }
  .movable-box-red .movable-pic-bg{
    background: url(@/static/drawCard/pic_bg_red.png) no-repeat center / 100% 100%;
  }
  .movable-box-blue .movable-pic-bg{
    background: url(@/static/drawCard/pic_bg_blue.png) no-repeat center / 100% 100%;
  }
  .movable-box-gold .movable-pic-bg{
    background: url(@/static/drawCard/pic_bg_gold.png) no-repeat center / 100% 100%;
  }
  .container{
    animation-name:container; 
    animation-duration:1s; /*动画时间*/
  }

  @keyframes container{
    0%,
    100%,
    20%,
    50%,
    80% {
    transition-timing-function: cubic-bezier(0.215,.61,.355,1); /*贝塞尔曲线 ： X1 Y1 X2 Y2*/
    transform: translate3d(0,0,0); /*设置只在Z轴上移动*/
    }
    40%,
    43%{
    transition-timing-function: cubic-bezier(0.755,0.50,0.855,0.060);
    transform: translate3d(0,-30px,0);
    }
    70%{
    transition-timing-function: cubic-bezier(0.755,0.050,0.855,0.060);
    transform: translate3d(0,-15px,0);
    }
    90%{
    transform: translate3d(0,-3px,0);
    }
  }
  .bottom-box{
    width: 524rpx;
    position: fixed;
    bottom:160rpx;
    left:50%;
    margin-left: -262rpx;
  }
  .cardname{
    width: 524rpx;
    height: 152rpx;
    background: rgba(0,0,0,0.36);
    border: 2rpx solid #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 400;
    box-sizing: border-box;
    color: #FFFFFF;
    line-height: 38rpx;
    padding:0 28rpx;
    overflow: hidden;
    word-break:break-all
  }
  .cardstep{
    width: 100%;
    height:100rpx;
    box-sizing: border-box;
    padding-top: 20rpx;
  }
  .card-step-box{
    width: 259rpx;
    height: 46rpx;
    background: linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,0.99), rgba(0,0,0,0.01));
    border-radius: 2rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 46rpx;
    font-family: DIN;
    font-weight: bold;
    color: #FFFFFF;
    margin:0 auto;
  }
  .card-step-num{
    font-size: 37rpx;
    font-weight: bold;
  }
  .card-step-icon{
    width: 12rpx;
    height:22rpx;
    margin-left:13rpx
  }
  .card-step-tips{
    width: 100%;
    text-align: center;
    margin-top: 18rpx;
    font-size: 17rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
  }
  // 抽屉内容
  .drawer-box {
    width: 100%;
    box-sizing: border-box;
  }
  .drawer-box-header {
    width: 100%;
    height: 40rpx;
    display: flex;
  }
  .drawer-box-header-btn {
    height: 40rpx;
    line-height: 40rpx;
    font-size: 24rpx;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #9b9b9b;
    margin-right: 15rpx;
    position: relative;
  }
  .drawer-box-header-btn-right {
    margin-left: 15rpx;
  }
  .drawer-box-header-btn-right::after {
    content: "";
    width: 2rpx;
    height: 20rpx;
    background: #9b9b9b;
    position: absolute;
    left: -16rpx;
    top: 50%;
    margin-top: -10rpx;
  }
  .drawer-box-header-check {
    color: #333333;
    font-family: PingFangSC-Regular;
    font-size: 30rpx;
  }
  .drawer-box-item {
    width: 670rpx;
    box-sizing: border-box;
    padding: 24rpx 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .border-bottom {
    border-bottom: 1rpx dashed #9b9b9b;
  }

  .drawer-box-item-left {
    width: 580rpx;
    font-size: 20rpx;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #333333;
    line-height: 30rpx;
  }
  .drawer-box-item-right {
    width: 90rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 88rpx;
    font-family: PingFangSC-Medium;
    font-weight: bold;
    color: #333333;
  }
  .end-pic {
    position: fixed;
    left: -9999;
    top: -9999;
    display: none;
  }
</style>
