<template>
  <view>
    <!-- 启动动画 -->
    <view v-if="startIng" class="drawcard-start">
      <view class="drawcard-start-box">
        <image
          class="drawcard-start-pic"
          src="https://ka-world.oss-cn-shanghai.aliyuncs.com/app/goods_drawCard/start.png"
        ></image>
        <view class="drawcard-start-time"
          >卡密即将开启（{{ startTime }}%）</view
        >
      </view>
    </view>
    <!-- 拆卡内容 -->
    <view  :class="[bgType == 1 ? 'black-bg' : 'white-bg',!startIng?'content':'']">
      <view
        v-if="iosY > 0"
        style="width: 100%"
        :style="
          'height:' + statusBarHeight + 'rpx;margin-bottom:30px'
        "
      ></view>
      <view class="drawcard-box-header">
        <view class="drawcard-box-header-left"
          ><text>{{ stepIndex }}</text
          >/{{ totalNum }}</view
        >
        <button
          class="drawcard-box-header-right"
          v-if="stepIndex == totalNum && noInterval"
          @click="onClickAgain"
        >
          重新体验
        </button>
        <button
          class="drawcard-box-header-right"
          v-else-if="noInterval"
          @click="onClickShowPopup"
        >
          自动解锁
        </button>
        <button
          class="drawcard-box-header-right"
          v-else
          @click="clearIntervalCard"
        >
          暂停
        </button>
      </view>

      <!-- 卡片拖动控件 -->
      <movable-area class="movable-area">
        <movable-view
          class="movable-content"
          :disabled="
            index != stepIndex || index == totalNum || !noInterval
          "
          :class="{ 'end-pic': index < stepIndex}"
          
          v-for="(item, index) in picData"
          :key="index"
          :animation="false"
          @change="onChangeMovable"
          direction="all"
          :x="index == stepIndex ? moveX : '611rpx'"
          :y="index == stepIndex ? moveY : moveYe"
          :style="'z-index:' + (999 - index)"
        >
          <view
            v-if="index == 0"
			
            class="movable-box dangban"
            @touchstart.prevent="picTouchStart"
            @touchend.prevent="picTouchEnd"
          ></view>
          
          <view
            v-else
            v-show="index < stepIndex + 6"
            class="movable-box"
            :class="[(index == stepIndex + 1)&&item.color=='gold'?'container':'',item.color==''?'movable-box-silver':'movable-box-' + item.color]"
            @touchstart.prevent="picTouchStart"
            @touchend.prevent="picTouchEnd"
          >
            <view
              v-if="item.color == 'gold'"
              class="movable-gold"
              v-show="index == stepIndex + 1 || index == stepIndex"
            >
            </view>
            <view v-if="item.rc" class="icon-rc"></view>
            <image
              class="movable-pic"
              mode="aspectFill"
              @load="onLoadMovablePic(index)"
              :lazy-load="true"
              :src="index < stepIndex + 6 || complete ? (item.pic!=''?decodeURIComponent(item.pic):'../../static/goods/drawcard/default.png') : ''"
            ></image>
            
            <view
              class="movable-box-name"
              :class="[item.color==''?'movable-box-name-silver':'movable-box-name-' + item.color,getNameLength(item.player)?'lang-name':'']"
              >{{ item.player }}</view
            >
            
          </view>
        </movable-view>
      </movable-area>

      <view
        v-if="stepIndex == 0"
        class="tips-start"
        :style="'top:' + (1050 + statusBarHeight + iosY) + 'rpx'"
        ><view class="icon-help"></view>拖动卡片解锁卡密</view
      >
      <view
        v-else
        class="tips-desc"
        :style="'top:' + (1050 + statusBarHeight + iosY) + 'rpx'"
        >{{ picData[stepIndex].nameNoEnglish?picData[stepIndex].nameNoEnglish:picData[stepIndex].name}}</view
      >

      <view class="drawcard-bottom">
        <view class="drawcard-bottom-tips"
          >*图片可能存在误差，请以卡密为准（卡片类型:金-红-蓝-银）</view
        >
        <button class="drawcard-bh-btn" @click="onClickDrawerShow"></button>
      </view>
    </view>

    <!-- 自动遮罩 -->
    <view class="draw-shadow" v-show="shadowShow">
      <view class="draw-shadow-box">
        <view class="draw-shadow-close" @click="onClickShadowClose"></view>
        <button class="draw-shadow-btn" @click="onClickSetIntervalCard(200)">
          快 速
        </button>
        <button class="draw-shadow-btn" @click="onClickSetIntervalCard(2000)">
          慢 速
        </button>
      </view>
    </view>

    <bottomDrawer :showDrawer="showDrawer" :title="'已解锁卡密'" @closeDrawer="onClickCloseDrawer">
      <view class="drawer-box">
        <view class="drawer-box-header">
          <view
            @click="onClickDrawerType(item.id)"
            class="drawer-box-header-btn"
            v-for="(item, index) in drawerData"
            :key="index"
            :class="{
              'drawer-box-header-check': drawerCheck == item.id,
              'drawer-box-header-btn-right': item.id == 2,
            }"
            >{{ item.name }}</view
          >
        </view>
        <view
          class="drawer-box-item"
          :class="{ 'border-bottom': index != stepIndex }"
          v-for="(item, index) in cardData"
          :key="index"
        >
          <view class="drawer-box-item-left">{{ item.name }}</view>
          <view class="drawer-box-item-right">{{ index+1 }}</view>
        </view>
      </view>
    </bottomDrawer>
  </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "../../base/BaseNode.vue";
@Component({})
export default class ClassName extends BaseNode {
  statusBarHeight = app.statusBarHeight;
  // 启动动画
  startIng = true;
  startTime = 0;
  startTimeFnc: any;
  // 遮罩
  shadowShow = false;
  // 背景 1黑2白
  bgType = 1;
  // 完成体验
  complete = false;
  picData: any = [''];
  drawData: any = [];
  cardData:any = [];
  stepIndex = 0;
  moveY: any = "";
  moveX: any = "611rpx";

  moveYe: any = "";
  moveYs: any = "";
  // 分页
  goodOrder = '';
  currentPage = 2;
  pageSize = 30;
  totalNum = 0;
  noMoreData = false;
  // windowWidth 可使用窗口宽度
  // windowHeight 可使用窗口高度
  windowWidth = 0;
  windowHeight = 0;
  boxWidth = 0;
  boxHeight = 0;
  boxTop = 0;
  boxleft = 0;
  MovableDetail: any = {};
  setTimeFnc: any;
  noInterval = true;
  // 底部抽屉
  showDrawer = false;
  drawerData = [
    { id: 1, name: "默认排序" }
  ];
  drawerCheck = 1;
  iosY: number = 0;
  picOnloadEd = false;
  picOnloadNum = 0;
  onloadPic:any = [];
  onLoad(query: any) {
    uni.getSystemInfo({
      success: (res) => {
        // 根据 model 进行判断
        uni.getSystemInfo({
          success: (res:any) => {
            if (res.safeArea.top > 20) {
              //x及以上的异形屏top为44，非异形屏为20
              // 可以将结果存到globalData：
              this.iosY = 80
            }
            this.moveY = 750 + app.statusBarHeight + this.iosY + "rpx";
            this.moveYe = 750 + app.statusBarHeight + this.iosY + "rpx";
            this.moveYs = 755 + app.statusBarHeight + this.iosY + "rpx";
            if(query.code){
              this.picData = this.picData.concat(JSON.parse(query.data));
              this.totalNum = query.num;
              if(query.hasNumber){ this.drawerData.push({ id: 2, name: "按限编排序" }) }
              this.goodOrder = query.code;
              if(this.totalNum<=30){
                this.initFnc()
              }else{
                this.reqNewData(()=>{
                  this.initFnc()
                })
              }
              
            }
          },
          fail(err) {
            console.error(err);
          },
        });
      },
    });
    
  }
  destroyed(){
		clearInterval(this.startTimeFnc)
    clearInterval(this.setTimeFnc);
	}
  initFnc(){
    this.startTimeFnc = setInterval(() => {
      if (this.startTime < 100) {
        if(this.startTime <95){
          this.startTime++;
        }else if(this.picOnloadEd && (this.noMoreData || this.totalNum<=30)){
          this.startTime++;
        }
      } else {
        clearInterval(this.startTimeFnc);
        setTimeout(() => {
          this.startIng = false;
          if(this.picData[this.stepIndex+1].color == 'gold'){
            uni.vibrateLong({
              success: function() {
              }
            });
          }
        }, 1000);
      }
    }, 10);

    
  }
  initEvent() {
    if (this.windowWidth != 0) return;

    // 获取设备宽高以及图片宽高距离
    uni.getSystemInfo({
      success: (res) => {
        // res - 各种参数
        this.windowWidth = res.windowWidth;
        this.windowHeight = res.windowHeight;
        let obj = uni.createSelectorQuery().select(".movable-content");

        obj
          .boundingClientRect((data) => {
            // data - 各种参数
            this.boxWidth = data.width ? data.width : 0;
            this.boxHeight = data.height ? data.height : 0;
            this.boxTop = data.top
              ? (data.top / (270 + this.iosY)) * (770 + this.iosY)
              : 0;
            this.boxleft = data.left ? (data.left / 111) * 611 : 0;
          })
          .exec();
      },
    });
  }
  reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData||this.totalNum<=30) {
				return;
			}
			
			let params:{[x:string]:any} = {
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
			}
			
			app.http.Get('me/orderInfo/buyer/'+this.goodOrder+'/noShowList', params, (data: any) => {
				if(data.list){
					this.picData = this.picData.concat(data.list);
				}
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
          if(cb) cb()
				}else{
          this.currentPage++;
          setTimeout(()=>{
            this.reqNewData(cb)
          },10)
        }
				
			});
		}
  // 图片加载
  onLoadMovablePic(index:number){
    this.picOnloadNum ++;
    if(this.totalNum>5 && this.picOnloadNum ==5 ){
      this.picOnloadEd = true;
    }else if(this.picOnloadNum == this.totalNum){
      this.picOnloadEd = true;
    }
    this.onloadPic.push(index)
    
  }
  getOnloadPicIndex(index:number){
    let onloadEnd = false;
    for(let i in this.onloadPic){
      if(this.onloadPic[i] === index){
        onloadEnd = true;
      }
    }
    return onloadEnd
  }
  // 换肤
  onClickChangePifu() {
    this.bgType = this.bgType == 1 ? 2 : 1;
  }
  onClickShowPopup() {
    this.shadowShow = true;
  }
  getNameLength(name:string){
    if(this.startIng) return;
	  return name.length>8?true:false

  }
  // 已解锁卡密
  onClickDrawerShow() {
    this.showDrawer = true;
    this.drawerDataSort()
  }
  onClickCloseDrawer() {
    this.showDrawer = false;
  }
  // 解锁卡密排序切换
  onClickDrawerType(index: number) {
    if (this.drawerCheck != index) {
      this.drawerCheck = index;
      this.drawerDataSort();
    }
  }
  drawerDataSort(){
    let data:any = JSON.parse(JSON.stringify(this.picData));
    data.splice(this.stepIndex+1);
    data.splice(0,1);
    if(this.drawerCheck == 2){
      data.sort((a:any, b:any) => {
        if(b.number == 0 || a.number == 0){
          return b.number - a.number
        }else{
          return a.number - b.number
        }
      } );
    }
    this.cardData = data
  }
  // 遮罩
  onClickShadowClose() {
    this.shadowShow = false;
  }
  // 重新体验
  onClickAgain() {
    this.stepIndex = 0;
  }
  // 拖拽动画
  onChangeMovable(event: any) {
    // 获取拖拽坐标
    if (this.boxleft == 0 && event.detail.source == "") {
      this.boxleft = event.detail.x;
    }
    this.MovableDetail = event.detail;
  }
  picTouchStart() {
    // 拖拽开始 记录位置
    if (this.stepIndex  >= this.totalNum || !this.noInterval) {
      return;
    }
    this.initEvent();
    this.moveY = this.moveYs;
    this.moveX = "616rpx";
  }
  picTouchEnd() {
    
    // 拖拽结束 计算位置
    let data = JSON.parse(JSON.stringify(this.MovableDetail));
    setTimeout(() => {
      if (
        data.x < this.boxleft - this.boxWidth / 5*2 ||
        data.x > this.boxleft + this.boxWidth / 5*2 ||
        data.y < this.boxTop - this.boxHeight / 3 ||
        data.y > this.boxTop + this.boxHeight / 3
      ) {
        if (this.stepIndex  >= this.totalNum || !this.noInterval) {
          return;
        }
        if(this.picOnloadNum<this.stepIndex+1){
          uni.showToast({
              title: '图片正在加载中',
              icon:'loading',
              duration: 2000
          });
          return;
        }
        if(this.stepIndex<this.totalNum){
          this.stepIndex++;
        }
        if(this.stepIndex<this.totalNum&&this.picData[this.stepIndex+1].color == 'gold'){
          uni.vibrateLong({
            success: function() {
              console.log('success');
            }
          });
        }
      }
      this.moveY = this.moveYe;
      this.moveX = "611rpx";
      if (this.stepIndex == this.totalNum) {
        this.complete = true;
      }
    }, 10);
  }
  // 倒计时自动拆卡
  onClickSetIntervalCard(time: number) {
    this.onClickShadowClose();
    this.initEvent();
    this.noInterval = false;
    this.setTimeFnc = setInterval(() => {
      if(this.picOnloadNum<this.stepIndex+1){
        uni.showToast({
            title: '图片正在加载中',
            icon:'loading',
            duration: 2000
        });
        this.clearIntervalCard()
        return;
      }
      if(this.stepIndex<this.totalNum){
        this.stepIndex++;
      }
      if (this.stepIndex >= this.totalNum) {
        this.complete = true;
        this.clearIntervalCard();
        this.onClickDrawerShow()
        return;
      }
    }, time);
  }
  clearIntervalCard() {
    this.noInterval = true;
    clearInterval(this.setTimeFnc);
  }
}
</script>

<style lang="scss">
// 启动动画
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
//
.content {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  display: block;
  z-index: 9;
  padding-top: 90rpx;
  box-sizing: border-box;
}
.black-bg {
  background: url(../../static/goods/drawcard/black_bg.jpg)
    no-repeat center;
  background-size: 100% 100%;
}
// .white-bg {
//   background: url(https://ka-world.oss-cn-shanghai.aliyuncs.com/app/goods_drawCard/white_bg.jpg)
//     no-repeat center;
//   background-size: 100% 100%;
// }
.drawcard-box-header {
  width: 460rpx;
  height: 200rpx;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  .drawcard-box-header-left {
    font-size: 50rpx;
    font-family: Impact;
    font-weight: bold;
    color: #ffffff;
    word-spacing: 10rpx;
    margin-bottom: 10rpx;
  }
  .drawcard-box-header-left text {
    font-size: 100rpx;
    font-family: Impact;
    font-weight: bold;
    color: #ffffff;
  }
  .drawcard-box-header-right {
    width: 142rpx;
    height: 44rpx;
    background: url(../../static/goods/drawcard/btn_red.png) no-repeat center;
    background-size: 100% 100%;
    text-align: center;
    line-height: 44rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #f9f9f9;
    margin: 0;
    margin-bottom: 50rpx;
  }
}

.movable-area {
  position: fixed;
  left: -500rpx;
  top: -500rpx;
  width: 1750rpx;
  height: calc(100% + 1000rpx);
  pointer-events: none;
  z-index: 100;
}
.movable-content {
  pointer-events: auto;
  width: 528rpx;
  height: 741rpx;
}
.movable-box {
  width: 528rpx;
  height: 741rpx;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-rc {
  width: 82rpx;
  height: 82rpx;
  background: url(../../static/goods/drawcard/icon_rc.png) no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  left: 47rpx;
  top: 52rpx;
}
.movable-gold {
  width: 628rpx;
  height: 841rpx;
  background: url(../../static/goods/drawcard/gold_bg.png) no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  left: -50rpx;
  top: -50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.movable-box-silver {
  background: url(../../static/goods/drawcard/card_silver.png) no-repeat center;
  background-size: 100% 100%;
}
.movable-box-red {
  background: url(../../static/goods/drawcard/card_red.png) no-repeat center;
  background-size: 100% 100%;
}
.movable-box-blue{
  background: url(../../static/goods/drawcard/card_blue.png) no-repeat center;
  background-size: 100% 100%;
}
.movable-box-gold {
  background: url(../../static/goods/drawcard/card_gold.png) no-repeat center;
  background-size: 100% 100%;
}
.movable-box-name {
  width: 426rpx;
  height: 57rpx;
  font-size: 30rpx;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  position: absolute;
  bottom: 85rpx;
  left: 50%;
  margin-left: -213rpx;
  line-height: 57rpx;
}
.lang-name{
 font-size: 24rpx;
}
.movable-box-name-silver {
  background: url(../../static/goods/drawcard/card_name_silver.png) no-repeat
    center;
  background-size: 100% 100%;
}
.movable-box-name-red {
  background: url(../../static/goods/drawcard/card_name_red.png) no-repeat
    center;
  background-size: 100% 100%;
}
.movable-box-name-blue {
  background: url(../../static/goods/drawcard/card_name_blue.png) no-repeat
    center;
  background-size: 100% 100%;
}
.movable-box-name-gold {
  background: url(../../static/goods/drawcard/card_name_gold.png) no-repeat
    center;
  background-size: 100% 100%;
}
.movable-pic {
  width: 474rpx;
  height: 690rpx;
  will-change: transform;
}
.pic-noload{
  position: relative;
}
.load-text{
  width: 100%;
  text-align: center;
  position:absolute;
  left:0;
  top:50%;
  height:40rpx;
  margin-top: -20rpx;
  line-height: 40rpx;
  font-size: 26rpx;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #FFFFFF;
}
.dangban {
  background: url("../../static/goods/drawcard/card_dangban.png") no-repeat
    center;
  background-size: 100% 100%;
}
.end-pic {
  position: fixed;
  left: -9999;
  top: -9999;
  display: none;
}
.hidden{
  display: none;
}
.tips-start {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 1100rpx;
  left: 0;
  font-size: 26rpx;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #ffffff;
}
.tips-desc {
  width: 600rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 1100rpx;
  left: 50%;
  margin-left: -300rpx;
  text-align: center;
  font-size: 26rpx;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #ffffff;
  line-height: 32rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
.icon-help {
  width: 32rpx;
  height: 32rpx;
  background: url(../../static/goods/drawcard/icon_help.png) no-repeat center;
  background-size: 100% 100%;
  margin-right: 16rpx;
}
.drawcard-bottom {
  width: 100%;
  height: 150rpx;
  position: fixed;
  bottom: 30rpx;
  left: 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
}
.drawcard-bottom-tips {
  height: 30rpx;
  line-height: 30rpx;
  margin-bottom: 18rpx;
  text-align: center;
  font-size: 20rpx;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #ffffff;
}
.drawcard-bh-btn {
  width: 479rpx;
  height: 95rpx;
  background: url(../../static/goods/drawcard/button.png) no-repeat center;
  background-size: 100% 100%;
  text-align: center;
  line-height: 95rpx;
  margin: 0 auto;
}
.btn-pifu {
  width: 48rpx;
  height: 42rpx;
  background: url(https://ka-world.oss-cn-shanghai.aliyuncs.com/app/goods_drawCard/btn_pifu.png)
    no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  left: 50rpx;
  bottom: 15rpx;
}

// 遮罩
.draw-shadow {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.7);
}
.draw-shadow-box {
  width: 400rpx;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: fixed;
  top: 40%;
  left: 50%;
  margin-left: -200rpx;
}
.draw-shadow-btn {
  width: 394rpx;
  height: 69rpx;
  background: url(../../static/goods/drawcard/btn_zd.png) no-repeat center;
  background-size: 100% 100%;
  text-align: center;
  line-height: 75rpx;
  font-size: 37rpx;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #2b2b2b;
  margin-bottom: 68rpx;
}
.draw-shadow-close {
  width: 29rpx;
  height: 32rpx;
  background: url(../../static/goods/drawcard/close.png) no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  top: -100rpx;
  right: -30rpx;
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
// // 换肤白色
// .white-bg .drawcard-box-header-left,
// .white-bg .tips-start,
// .white-bg .drawcard-box-header-left text,
// .white-bg .drawcard-bottom-tips,
// .white-bg .tips-desc {
//   color: #333333;
// }
// .white-bg .icon-help {
//   background: url(../../static/goods/drawcard/icon_help_white.png) no-repeat
//     center;
//   background-size: 100% 100%;
//   margin-right: 16rpx;
// }
// .white-bg .drawcard-bh-btn {
//   background: url(../../static/goods/drawcard/btn_red_white.png) no-repeat
//     center;
//   background-size: 100% 100%;
//   color: #f9f9f9;
// }

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
</style>
