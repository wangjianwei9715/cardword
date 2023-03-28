<!--
 * @FilePath: \jichao_app_2\src\pages\drawCard\drawCard.vue
 * @Author: wjw
 * @Date: 2022-11-16 11:38:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-03-28 14:50:05
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
    <image class="video-bg" :src="sceneData.bg"/>
    
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
      <scene :popupShow.sync="sceneData.show" :picType="sceneData.picType" @sceneChange="sceneData.bg=$event"/>
      <!-- 音乐选择 -->
      <music :popupShow.sync="musicData.show" @musicChange="musicData.name=$event"/>
      <!-- 卡片拖动控件 -->
			<movable-area class="movable-area">
				<movable-view
					class="movable-content"
          :class="{ 'end-pic': index < cardData.step}"
          :disabled=" index != cardData.step || index >= cardData.total || animationStart"
          v-for="(item, index) in codeList"
					:key="index"
					direction="all"
          :animation="true"
          :x="index == cardData.step ? moveData.x : moveData.x_init"
					:y="index == cardData.step ? moveData.y : moveData.y_init"
          :style="'z-index:' + (999 - index)"
          @change="onChangeMovable"
          @touchstart.prevent="picTouchStart"
          @touchend.prevent="picTouchEnd"
				>
          <view v-if="index == 0" class="movable-box dangban" ></view>
          <animationCard v-else-if="item.color=='gold'&&animationSwitch&&index<cardData.step+5" :start="index==cardData.step&&animationStart" :cardMove="index==cardData.step+1&&cardMove" :animationData="[item.color,item.name,item.rc]" @animationOver="animationStart=false">
            <view class="movable-box movable-box-gold">
              <view class="movable-pic-bg"></view>
              <image class="movable-pic" :src="item.pic||defultPic"/>
              <view class="movable-name" :class="{'long-name':ifNameTooLong(item.player)}">{{item.player}}</view>
            </view>
          </animationCard>
					<view 
            v-else-if="index<cardData.step+5" 
            class="movable-box"
            :class="[(index == cardData.step + 1)&&item.color=='gold'?'container':'',item.color==''?'movable-box-silver':'movable-box-' + item.color]"
          >
            <view class="movable-pic-bg"></view>
            <image class="movable-pic" :src="item.pic||defultPic"/>
            <view class="movable-name" :class="{'long-name':ifNameTooLong(item.player)}">{{item.player}}</view>
          </view>
				</movable-view>
			</movable-area>
      
      <view class="bottom-box">
        <view class="cardname">{{animationStart?'':codeList[cardData.step].name}}</view>
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
      {type:'music',name:'音乐'}
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
    sceneData = { show:false, picType:0, bg:'' };
    musicData = { show:false, name:'' };
    moveData = { x:0, y:0, x_init:0, y_init:0, };
    changeMove:any = {};
    cardMove:boolean = false;
    cardData = { step:0, total:0 };
    codeList:Array<string|DarwCard.Code>=[];
    drawerData = {
      show:false,
      check:1,
      tab:[{ id: 1, name: "默认排序" }],
      code:[]
    };
    defultPic:string = '../../static/goods/drawcard/default.png';
    onLoad(query:any){
      const initCode = JSON.parse(query.data);
      initCode.forEach((x:DarwCard.Code)=>{
        x.pic = parsePic(decodeURIComponent(x.pic))
      });
      this.codeList = ['',...initCode]
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
      if(typeof(storageSwitch) === 'boolean') { this.animationSwitch = storageSwitch; } 
    }
    // 封装初始化 startTime 的方法 private 
    initStartTime(): void { 
      const { initData } = this; 
      initData.initInterval = setInterval(() => { 
        if (initData.startTime < 100) { 
          if(initData.startTime <95){ 
            initData.startTime++; 
          }else if(initData.noMoreData || this.cardData.total<=30){ 
            initData.startTime++; 
          } 
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
    // 封装点击动画按钮的方法 private 
    onClickAnimation(): void { 
      if(this.animationStart) { return; } 
      uni.showModal({ 
        title: '提示', 
        content: `是否${this.animationSwitch ? '关闭' : '开启'}动画`, 
        success: (res) => { 
          if (res.confirm) { 
            this.animationSwitch = !this.animationSwitch; 
            uni.setStorageSync('animationSwitch',this.animationSwitch); 
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
      !this.animationStart && (this.cardMove=true)
    }
    /**移动中 */
    onChangeMovable(event:any) {
      this.changeMove = event.detail;
    }
    /**移动结束 计算位置 */
    picTouchEnd() {
      const { x_init: iX, y_init: iY } = this.moveData; 
      const { x: mX, y: mY } = this.changeMove; 
      this.moveData.x = mX;
      this.moveData.y = mY;
      setTimeout(() => {
        let move_x = Math.abs(mX - iX);
        let move_Y = Math.abs(mY - iY);
        if(move_x>uni.upx2px(220) || move_Y>uni.upx2px(300)){
          if(!this.DrawCardOver){
            this.cardData.step++;
            const nextItem = this.codeList[this.cardData.step]
            if(['gold','SP'].includes((nextItem as DarwCard.Code).color)) uni.vibrateLong({});
            // 特效卡并且动画开启
            if((nextItem as DarwCard.Code).color=='gold'&&this.animationSwitch){
              this.animationStart = true;
            }
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
      let data:[] = JSON.parse(JSON.stringify(this.codeList)).slice(1,this.cardData.step+1);
      if(this.drawerData.check == 2){
        data.sort((a:DarwCard.Code, b:DarwCard.Code) => {
          if(b.number == 0 || a.number == 0){
            return b.number - a.number
          }else{
            return a.number - b.number
          }
        } );
      }
      this.drawerData.code = data
    }
    reqNewData(cb?:Function){
      const { initData } = this;
      // 获取更多商品
      if (initData.noMoreData||this.cardData.total<=30) {
        return;
      }
      let params:{[x:string]:number} = {
        pageIndex: initData.pageIndex,
        pageSize:initData.pageSize
      }
      app.http.Get(`me/orderInfo/buyer/${initData.goodOrder}/noShowList`, params, (data: any) => {
        if(data.list){
          let listData = data.list.map((x:DarwCard.Code)=>{
            x.pic = parsePic(decodeURIComponent(x.pic))
          })
          this.codeList = [...this.codeList,...listData];
        }
        if(data.totalPage<=initData.pageIndex){
          initData.noMoreData = true;
          if(cb) cb()
        }else{
          initData.pageIndex++;
          setTimeout(()=>{
            this.reqNewData(cb)
          },10)
        }
      });
    }
    ifNameTooLong(name:string):boolean{
      return name.length>8?true:false
    }
    /**是否最后一张卡片 */
    public get DrawCardOver():boolean {
      return this.cardData.step  >= this.cardData.total;
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
    background: url(@/static/drawCard/pic_bg.png) no-repeat center / 100% 100%;
    z-index: 1;
  }
  .movable-pic {
    width:428rpx;
    height:626rpx;
    margin: 10rpx 43rpx 0 57rpx;
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
    font-size: 46rpx;
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
