<!--
 * @FilePath: \jichao_app_2\src\pages\drawCard\drawCard.vue
 * @Author: wjw
 * @Date: 2022-11-16 11:38:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-29 11:35:20
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
    
    <view class="draw-box"> 
      <!-- 顶部导航 -->
      <view class="draw-navigation" :class="isPokemom?'pokemom':'normal'">
        <view class="draw-back" @click="onClickBack()"><view class="icon-back"></view></view>
        <view class="draw-navigation-right">
          <view class="draw-navigation-tab" v-for="item in navigationTab" :key="item.type" @click="onClickNavigation(item)">
            <view v-if="item.type=='ani'&&!animationSwitch" class="icon-anin"></view>
            <view v-else :class="`icon-${item.type}`" ></view>
            <view class="draw-navigation-msg">{{item.type=='music'?musicData.name:item.name}}</view>
          </view>
        </view>
      </view>
      <!-- 场景选择 -->
      <scene :popupShow.sync="sceneData.show" :picType="sceneData.picType" @sceneChange="sceneData.bg=$event"/>
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
          <view v-else-if="item.index==nextStep(1)&&animationStart"></view>
          <animationCard v-else-if="item.color=='gold'&&animationSwitch" :start="item.index==cardData.step&&animationStart" :cardMove="item.index==nextStep(1)&&cardMove" :data="{team:(item.extra&&item.extra.team)?item.extra.team:'',position:(item.extra&&item.extra.position)?item.extra.position:'',rc:item.rc}" @over="onAnimationOver">
            <cardBox :item="item" :bit="cardBit" :defultPic="defultPic" @errorPic="parseImage()"/>
          </animationCard>
          <cardBox v-else :item="item" :bit="cardBit" :defultPic="defultPic" :animation="(item.index==nextStep(1))&&item.color=='gold'" @errorPic="parseImage()"/>
				</movable-view>
			</movable-area>
      
      <!-- 指定卡密奖励 -->
      <noAward :popupShow.sync="showNoAward" :award="noAwardData" @noShow="once=0"/>
      
      <view class="bottom-box" :style="{'top':`${fitPosition.boxTop}rpx`}">
        <view class="cardname"><text class="cardname-clamp">{{this.cardname}}</text></view>
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

      <u-modal :show="switchModel.show"  title="提示" :showCancelButton="true" @confirm="onConfirmSwitch" @cancel="switchModel.show=false">
        <view class="slot-content" style="text-align:center">
          <rich-text :nodes="switchModel.text"></rich-text>
        </view>
      </u-modal>
    </view>
  </view>
</template>
<script lang="ts">
  import { app } from "@/app";
	import { Component } from "vue-property-decorator";
  import { DarwCard } from './utils/interface'
  import { parsePic ,isDuringDate } from "@/tools/util";
	import BaseNode from '../../base/BaseNode.vue';
  import music from './components/music/music.vue'
  import scene from './components/scene/scene.vue'
  import animationCard from './components/animationCard/animationCard.vue'
  import cardBox from './components/cardBox/cardBox.vue'
  import noAward from './components/popup/noAward.vue'
  @Component({
    components:{music,scene,animationCard,cardBox,noAward}
  })
	export default class ClassName extends BaseNode {
    parsePic = parsePic;
    isDuringDate = isDuringDate;
    navigationTab:Array<{
        type:string;
        name:string;
    }> = [
      {type:'scene',name:'背景'},
      {type:'ani',name:'特效'},
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
    sceneData = { show:false, picType:0, bg:''};
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
    switchModel = {
      show:false,
      text:''
    };
    fitPosition = {
      height:880,
      boxTop:1170
    }
    showNoAward=false;
    noAwardData:any={};
    once=0;
    cardBit=0;
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
      const list = this.codeList.slice(this.cardData.step,Math.min(this.nextStep(2),endNum));
      return list
    }
    public get bgImage() : string {
      const _default = '/static/goods/drawcard/black_bg.jpg';
      if(this.sceneData.bg){
        
        return `/static/drawCard/${this.sceneData.bg}.${this.animationSwitch?'gif':'jpg'}`
      }
      return _default
    }
    public get isPokemom() : boolean {
      return this.sceneData.bg=="bj_004"
    }
    onLoad(query:any){
      this.fitCardPosition();
      this.initEvent(query)
      this.$nextTick(() => {
        this.InitMoveData();
      })
    }
    destroyed(){
      uni.hideLoading();
      clearInterval(this.initData.initInterval)
    }
    onClickBack(){
      uni.navigateBack({delta:1})
    }
    nextStep(num:number){
      return this.cardData.step + num;
    }
    fitCardPosition(){
      const { model, windowHeight, windowWidth } = app.platform.systemInfo;
      if(model.indexOf('iPhone')!==-1 && (windowHeight/windowWidth)<2){
        this.fitPosition.height = 740;
        this.fitPosition.boxTop = 1010;
      }
    }
    parseImage(){
      console.log('图片资源过期，重新生成');
      this.codeList.forEach((x:DarwCard.Code,index:number)=>{
        if(index>=this.cardData.step){
          x.newPic = parsePic(decodeURIComponent(x.pic))
        }
      });
    }
    initEvent(query: any): void { 
      this.cardBit = query.bit || 0;
      if((this.cardBit&1)==1){
        this.sceneData.picType = 3; //宝可梦
      }else{
        this.sceneData.picType = Number(query.picType) || 0;
      }
      this.once = query.once;
      
      if(query.picType == 1){
        this.defultPic = '../../static/goods/drawcard/default_.png';
      } 
      this.initDrawerTab(query);
      this.initAnimationSwitch();
      this.initStartTime(); 
      this.initCodeList(query);
    }
    initCodeList(query: any){
      const initList = JSON.parse(query.data);
      initList.forEach((x:DarwCard.Code,index:number)=>{
        x['newPic'] = parsePic(decodeURIComponent(x.pic))
        x['index'] = index+1
      });
      this.codeList = [{index:0},...initList]
      this.cardData.total = query.num;
      this.initData.goodOrder = query.code;
      query.num>30 && this.reqNewData();
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
      if(this.animationStart) return;
      if(item.type=='scene') this.sceneData.show=true ;
      if(item.type=='music') this.musicData.show=true ;
      if(item.type=='ani'){
        const text = `是否${this.animationSwitch ? '关闭' : '开启'}特效${!this.animationSwitch?'<br/>(<span style="color:red">部分机型容易导致卡顿</span>)':''}`;
        this.switchModel = {
          show:true,
          text
        }
      }
    }
    // 点击动画按钮的方法 
    onConfirmSwitch(){
      this.animationSwitch = !this.animationSwitch; 
      uni.setStorageSync('animationSwitch',this.animationSwitch); 
      this.switchModel.show = false
    }
    /**移动数据初始化 */
    InitMoveData(){
      let x = uni.upx2px(611);
      let y = uni.upx2px(this.fitPosition.height);
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
          const step = this.cardData.step;
          const item:DarwCard.Code = this.codeList[step];
          if(!this.DrawCardOver && ['gold','SP'].includes(this.codeList[step+1].color)){
            uni.vibrateLong({})
          }
          // 特效卡并且动画开启
          if(item.color=='gold'&&this.animationSwitch){
            this.animationStart = true;
          }else{
            this.setShowLuckyBox()
          }
        }
        this.moveData.x = iX;
        this.moveData.y = iY;
        this.cardMove = false;
        this.getMore();
      }, 50);
    }
    onAnimationOver(){
      this.animationStart=false;
      this.setShowLuckyBox()
    }
    setShowLuckyBox() {
      if(this.once==0) return;
      const currentItem = this.codeList[this.cardData.step];
      // 指定卡密奖励
      if(!uni.$u.test.isEmpty(currentItem.award)){
        this.noAwardData = currentItem.award;
        this.showNoAward = true
      }
    }
    // 解锁卡密排序切换
    onClickDrawerType(index: number){
      if (this.drawerData.check != index) {
        this.drawerData.check = index;
        this.drawerDataSort();
      }
    }
    drawerDataSort(){
      const data:any = this.codeList.slice(1,this.nextStep(1));
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
    getMore(){
      if(this.cardData.step==this.codeList.length-6){
        uni.$u.throttle(()=>{
          this.reqNewData();
        },1000)
      }
    }
    reqNewData(){
      const { pageIndex, pageSize, noMoreData, goodOrder } = this.initData;
      // 获取更多商品
      if (noMoreData) return;
      
      app.http.Get(`me/orderInfo/buyer/${goodOrder}/noShowList`, { pageIndex, pageSize }, (data: any) => {
        if (data.list) {
          const index = this.codeList.length;
          this.codeList.push(
            ...data.list.map(({ pic, ...rest }:DarwCard.Code, i:number) => ({
              ...rest,
              pic,
              newPic: parsePic(decodeURIComponent(pic)),
              index: index + i
            }))
          );
        }
        if(data.totalPage<=pageIndex){
          this.initData.noMoreData = true;
        }
        this.initData.pageIndex++;
      });
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
    position: relative;
    .sp-navigator{
      position: absolute;
      right:23rpx;
      bottom:-110rpx;
    }
    .sp-icon{
      width: 94rpx;
      height:93rpx;
    }
    
    .draw-navigation-right{
      height:100rpx;
      display: flex;
      justify-content: flex-end;
      align-items: center;
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
  @mixin drawBack($size) {
    width: $size;
    height: $size;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .normal .draw-back{
    @include drawBack(49rpx);
    background: linear-gradient(0deg, #FFFFFF, rgba(255,255,255,0.01), #FFFFFF);
  }
  .pokemom .draw-back{
    @include drawBack(50rpx);
    background: url(@/static/drawCard/icon_back2.png) no-repeat center / 100% 100%;
  }
  .normal .icon-back{
    width: 17rpx;
    height:30rpx;
    background: url(@/static/drawCard/icon_back.png) no-repeat center / 100% 100%;
    margin-left: -2rpx;
  }
  @mixin drawNaviTab($pLeft,$height,$color) {
    display: flex;
    height:$height;
    line-height: $height;
    align-items: center;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: $color;
    margin-left: 29rpx;
    box-sizing: border-box;
    padding:0 $pLeft 0 16rpx;
  }
  .normal .draw-navigation-tab{
    @include drawNaviTab(18rpx,49rpx,#ffffff);
    background: linear-gradient(0deg, #FFFFFF, rgba(255,255,255,0.01), #FFFFFF);
    border-radius: 24rpx;
  }
  .pokemom .draw-navigation-tab{
    @include drawNaviTab(0,48rpx,#333333);
    width: 120rpx;
    background: url(@/static/drawCard/icon_bgy.png) no-repeat center / 100% 100%;
  }
  .draw-navigation-msg{
    max-width: 160rpx;
    height:49rpx;
    line-height: 49rpx;
    margin-left: 8rpx;
  }
  .normal .icon-scene{
    width: 26rpx;
    height:26rpx;
    background: url(@/static/drawCard/icon_scene.png) no-repeat center / 100% 100%;
  }
  .normal .icon-ani{
    width: 29rpx;
    height:30rpx;
    background: url(@/static/drawCard/icon_ani.png) no-repeat center / 100% 100%;
  }
  .normal .icon-anin{
    width: 29rpx;
    height:30rpx;
    background: url(@/static/drawCard/icon_ani_.png) no-repeat center / 100% 100%;
  }
  .pokemom .icon-scene{
    width: 26rpx;
    height:26rpx;
    background: url(@/static/drawCard/bkm_scene.png) no-repeat center / 100% 100%;
  }
  .pokemom .icon-ani{
    width: 29rpx;
    height:30rpx;
    background: url(@/static/drawCard/bkm_ani.png) no-repeat center / 100% 100%;
  }
  .pokemom .icon-anin{
    width: 29rpx;
    height:30rpx;
    background: url(@/static/drawCard/bkm_ani_.png) no-repeat center / 100% 100%;
  }
  .icon-music{
    width: 26rpx;
    height:25rpx;
    background: url(@/static/drawCard/icon_music.png) no-repeat center / 100% 100%;
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
  .dangban {
		background: url(@/static/drawCard/card_dangban.png) no-repeat 8rpx 8rpx;
		background-size: 513rpx 722rpx;
	}
  .bottom-box{
    width: 524rpx;
    position: fixed;
    left:50%;
    margin-left: -262rpx;
  }
  .cardname{
    width: 520rpx;
    height: 152rpx;
    background: rgba(0,0,0,0.36);
    border: 2rpx solid #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding:0 28rpx;
    overflow: hidden;
    word-break:break-all
  }
  .cardname-clamp{
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 38rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
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
    font-size: 19rpx;
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
  .wobble-hor-bottom {
    animation: wobble-hor-bottom 1s both;
    animation-iteration-count: 1;
  }
  @keyframes wobble-hor-bottom {
    0%,
    100% {
      -webkit-transform: translateX(0%);
              transform: translateX(0%);
      -webkit-transform-origin: 50% 50%;
              transform-origin: 50% 50%;
    }
    15% {
      -webkit-transform: translateX(-20px) rotate(-6deg);
              transform: translateX(-20px) rotate(-6deg);
    }
    30% {
      -webkit-transform: translateX(10px) rotate(6deg);
              transform: translateX(10px) rotate(6deg);
    }
    45% {
      -webkit-transform: translateX(-10px) rotate(-3.6deg);
              transform: translateX(-10px) rotate(-3.6deg);
    }
    60% {
      -webkit-transform: translateX(7px) rotate(2.4deg);
              transform: translateX(7px) rotate(2.4deg);
    }
    75% {
      -webkit-transform: translateX(-3px) rotate(-1.2deg);
              transform: translateX(-3px) rotate(-1.2deg);
    }
  }
</style>
