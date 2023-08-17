<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-07-24 17:01:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-17 13:24:32
 * @FilePath: \jichao_app_2\src\pages\act\forumDraw\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="content">
    <transitionNav title=" " :customBack="true">
      <template v-slot:slotBack>
        <view class="actBack flexCenter">
          <image class="back" src="/static/index/v3/back.png" />
        </view>
      </template>
      <template v-slot:slotRight>
        <view class="detailButton flexCenter" @click="pageJump('/pages/act/forumDraw/log')">抽奖记录</view>
      </template>
    </transitionNav>
    <view class="topBanner">
      <view class="hide" :style="{ height: navHeight + 'px' }"></view>
    </view>
    <view class="luckContainer">
      <view class="dot" style="margin-right: 14rpx"></view>
      <view class="dot dot_mask"></view>
      <view class="title">幸运播报</view>
      <view class="noticContainer">
        <u-notice-bar icon="" fontSize="24rpx" bgColor="rgba(0,0,0,0)" color="#ffffff" :text="luckList"
          direction="column"></u-notice-bar>
      </view>
      <view class="dot dot_mask_left" style="margin-right: 14rpx; margin-left: 30rpx"></view>
      <view class="dot"></view>
    </view>
    <view class="pageBackBg" :style="{ top: gapTop + 'px' }"></view>
    <view class="drawContainer">
      <view class="drawBlock" :class="[
        `drawBlock${index + 1}`,
        index == nowHeightLight ? `heightLight` : '',
      ]" v-for="(item, index) in drawList">
        <image :src="$parsePic(decodeURIComponent(item.pic))" style="width: 100%; height: 100%" mode="aspectFill">
        </image>
        <view class="innerShaow" v-if="index === nowHeightLight"></view>
      </view>
      <view class="centerBlock">
        <view class="drawButton" @click="onClickDraw(1)">抽奖一次</view>
        <view class="num">
          可用次数：<text>{{ drawNum }}</text>
        </view>
        <view class="drawButton" style="position: relative; top: 10rpx" @click="onClickDraw(5)">抽奖五次</view>
      </view>
    </view>
    <view class="taskContainer">
      <view class="taskTop">
        <view class="taskTitle" style="display: flex;align-items: center;">任务进度<text style="font-size: 24rpx;color:#fff;margin-left: 10rpx;font-family: PingFang SC;">(活动截止至9/16 0:00)</text></view>
        <view class="taskRule" @click="pageJump('/pages/act/forumDraw/rule')">规则说明</view>
      </view>
      <view class="taskWrap">
        <view class="top">
          <view class="taskTitle">每篇卡圈动态累计获得20赞（循环）</view>
          <view class="taskButton flexCenter" @click="
            pageJump(
              dtLike.code
                ? `/pages/cardForum/detail?code=${dtLike.code}`
                : `/pages/cardForum/personHomePage?isMine=1`
            )
            ">
            查看动态
          </view>
        </view>
        <view class="info">
          <view class="left">已完成{{ dtLike.getTotalNum || 0 }}次</view>
          <view class="right">距下次抽奖还需<text class="red">{{
            dtLike.nextNum || 0
          }}</text>/15</view>
        </view>
        <view class="bar">
          <view class="bar_width" :style="{ width: dtPercent() + '%' }"></view>
        </view>
      </view>
      <view class="taskWrap">
        <view class="top">
          <view class="taskTitle">补充图鉴每获得50卡币（循环）</view>
          <view class="taskButton flexCenter" @click="goTuj">补充图鉴 </view>
        </view>
        <view class="info">
          <view class="left">已完成{{ cxPoint.getTotalNum || 0 }}次</view>
          <view class="right">距下次抽奖还需<text class="red">{{ cxPoint.nextNum || 0 }}</text>/15</view>
        </view>
        <view class="bar">
          <view class="bar_width" :style="{ width: tjPercent() + '%' }"></view>
        </view>
      </view>
    </view>
    <u-overlay class="overlay" :duration="500" :opacity="0.8" :show="showSwiper" @click="showSwiper = false">
      <view class="preTitle">恭喜抽中以下奖品</view>
      <view class="preSwiper_container">
        <swiper class="preSwiper" :indicator-dots="false" :autoplay="false" :circular="false" :current="current"
          @change="swiperChange">
          <swiper-item class="preSwiper_item" v-for="(item, index) in resRewardList" :key="index">
            <view class="img">
              <image mode="widthFix" :src="$parsePic(decodeURIComponent(item.pic))" />
              <view class="imageName">{{ item.name }}</view>
            </view>
          </swiper-item>
        </swiper>
        <view class="dotContainer">
          <view class="dot" :class="{ dot_current: index === current }" v-for="(item, index) in resRewardList">
          </view>
        </view>
        <view class="goBag flexCenter" @click.stop="
          pageJump('/pages/act/forumDraw/log'), (showSwiper = false)
          ">去背包查看
        </view>
      </view>
    </u-overlay>
  </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "@/base/BaseNode.vue";
const ROUND_NUM = 6;
const navHeight = app.statusBarHeight + uni.upx2px(88);
const gapTop = uni.upx2px(436) + uni.upx2px(74);
@Component({})
export default class ClassName extends BaseNode {
  drawList: any = [];
  navHeight = navHeight;
  luckList: Array<string> = [];
  drawNum: number = 0;
  nowHeightLight: number = 0;
  loopBol: boolean = true;
  fastNum: number = 0;
  slowNum: number = 0;
  exSlowNum: number = 0;
  time: number = 50;
  resRewardIds: any = [];
  resRewardList: any = [];
  onDraw: boolean = false;
  showSwiper: boolean = false;
  current: number = 0;
  gapTop = gapTop;
  defaultLoopTimer: any = null;
  loopTimer: any = null;
  dtLike: any = {};
  cxPoint: any = {};
  public dtPercent() {
    if (this.dtLike.nextNum == undefined) return 0
    const num = this.dtLike.nextNum || 0
    return (15 - num) * 100 / 15
  }
  public tjPercent() {
    if (this.cxPoint.nextNum == undefined) return 0
    const num = this.cxPoint.nextNum || 0
    return (15 - num) * 100 / 15
  }
  onLoad(query: any) {
    app.platform.hasLoginToken(() => {
      this.reqAward();
      this.reqLucky();
      this.initConf();
      this.defautLoop();
    });
  }
  onShow() {
    app.platform.hasLoginToken(() => {
      this.reqUserData();
    });
  }
  beforeDestroy() {
    this.loopTimer && clearTimeout(this.loopTimer);
    this.defaultLoopTimer && clearInterval(this.defaultLoopTimer);
  }
  initConf() {
    this.loopBol = true;
    this.fastNum = 0;
    this.slowNum = 0;
    this.exSlowNum = 0;
    this.time = 50;
  }
  onClickDraw(num: number) {
    if (this.onDraw) {
      app.platform.UINotificationFeedBack("error");
      uni.showToast({
        title: "请等待抽奖结束",
        icon: "none",
      });
      return;
    }
    if (num > this.drawNum) {
      app.platform.UINotificationFeedBack("error");
      uni.showModal({
        title: "提示",
        content: "次数不足，可补充图鉴或者发布动态收集点赞获得",
        cancelText: "我知道了",
        confirmText: "去卡圈",
        success: (res: any) => {
          if (res.confirm) {
            app.navigateTo.switchTab(2);
          }
        },
      });
      return;
    }
    uni.showModal({
      title: "确认抽奖",
      content: `本次抽奖将消耗${num}次抽奖次数`,
      cancelText: "我再想想",
      success: (res: any) => {
        if (res.confirm) {
          app.platform.UIClickFeedBack(0);
          this.postGetDrawResult(num);
        }
      },
    });
  }
  //获取抽奖结果
  async postGetDrawResult(num: number) {
    this.resRewardIds = [];
    this.current = 0
    this.onDraw = true;
    uni.showLoading({
      title: ""
    })
    app.http.Post(`activity/cardCircleDraw/proceed`, {
      tp: num == 5 ? 2 : 1
    }, async (res: any) => {
      uni.hideLoading()
      this.resRewardIds = res.award || [];

      this.drawNum -= num
      for (let i = 0; i < this.resRewardIds.length; i++) {
        await this.startDraw(
          this.resRewardIds[i],
          i === this.resRewardIds.length - 1 ? 0 : 1500,
          num == 5 ? 4 : 12
        );
        if (i == this.resRewardIds.length - 1) {
          this.onDraw = false;
          setTimeout(() => {
            this.showDrawRes();
          }, 300);
        }
      }
    }, () => {
      uni.hideLoading()
      this.onDraw = false
    });
    //=============mock================
    // for (let i = 0; i < num; i++) {
    //     const randomId = Math.round(Math.random() * 8)
    //     this.resRewardIds.push(randomId || 1)
    // }
    // //=============mock================
    // for (let i = 0; i < this.resRewardIds.length; i++) {
    //     await this.startDraw(this.resRewardIds[i], (i === this.resRewardIds.length - 1) ? 0 : 1500)
    //     if (i == this.resRewardIds.length - 1) {
    //         this.onDraw = false
    //         setTimeout(() => {
    //             this.showDrawRes()
    //         }, 300)
    //     }
    // }
  }
  startDraw(id: number, delay: number, slowNum: number) {
    return new Promise((re: any, rj) => {
      this.stopDefaultLoop();
      this.initConf();
      const index = this.drawList.findIndex((item: any) => {
        return item.id === id;
      });
      if (index < 0) {
        uni.showToast({
          title: `未知奖励:${id}`,
          icon: "none",
        });
      }
      this.loop(index, slowNum, () => {
        setTimeout(() => {
          re();
        }, delay,);
      });
    });
  }
  loop(endIndex: number, slowNum: number ,cb?: Function) {
    if (!this.nowHeightLight || this.nowHeightLight < 8) {
      // app.platform.UIClickFeedBack()
      if (this.nowHeightLight == 7) {
        this.nowHeightLight = 0;
      } else {
        this.nowHeightLight++;
      }
      this.fastNum++;
      if (this.fastNum == 4) {
        this.fastNum = 0;
        this.time = 50;
        this.slowNum++;
      }
      if (this.slowNum == slowNum) {
        this.slowNum = 0;
        this.time = 200;
        this.fastNum = 5;
      }
      if (this.fastNum > 5) {
        if (this.nowHeightLight == endIndex) {
          this.initConf();
          this.loopBol = false;
          cb && cb(endIndex);
        }
      }
      if (this.loopBol) {
        this.loopTimer = setTimeout(() => {
          this.loop(endIndex,slowNum, cb);
        }, this.time);
      }
    }
  }
  defautLoop() {
    this.defaultLoopTimer && clearInterval(this.defaultLoopTimer);
    this.defaultLoopTimer = setInterval(() => {
      if (this.nowHeightLight == 7) {
        this.nowHeightLight = 0;
        return;
      }
      this.nowHeightLight += 1;
    }, 1000);
  }
  stopDefaultLoop() {
    this.defaultLoopTimer && clearInterval(this.defaultLoopTimer);
  }
  //展示抽奖的结果
  showDrawRes() {
    console.log("展示抽奖的结果");
    this.resRewardList = this.resRewardIds.map((id: any) => {
      const findItem: any = this.drawList.find((draw: any) => {
        return draw.id === id;
      });
      return findItem;
    });
    console.log(this.resRewardList);
    this.showSwiper = true;
    this.reqUserData()
  }
  goTuj() {
    app.navigateTo.switchTab(1);
  }
  pageJump(url: string) {
    uni.navigateTo({
      url,
    });
  }
  swiperChange(event: any) {
    this.current = event.detail.current;
  }
  reqUserData() {
    app.http.Get(
      `dataApi/activity/cardCircleDraw/user/data`,
      {},
      (res: any) => {
        this.drawNum = res.data.drawNum;
        this.dtLike = res.data.dtLike;
        this.cxPoint = res.data.cxPoint;
      }
    );
  }
  reqLucky() {
    app.http.Get(
      `dataApi/activity/cardCircleDraw/broadcast`,
      {},
      (res: any) => {
        this.luckList = res.list || [];
      }
    );
  }
  reqAward(cb?: any) {
    app.http.Get(`dataApi/activity/cardCircleDraw/award`, {}, (res: any) => {
      this.drawList = res.list || [];
    });
  }
}
</script>

<style lang="scss">
.luckContainer {
  width: 750rpx;
  background-size: 100% 100%;
  height: 120rpx;
  background-image: url("@/static/act/forumDraw/titleWrap.png");
  margin-top: -20rpx;
  z-index: 2;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 26rpx;

  .dot {
    border-radius: 50%;
    width: 22rpx;
    height: 22rpx;
    background-color: #ffdbff;
  }

  .dot_mask {
    -webkit-mask-image: -webkit-linear-gradient(right,
        rgba(0, 0, 0, 0) 2%,
        rgba(0, 0, 0, 1) 90%);
  }

  .dot_mask_left {
    -webkit-mask-image: -webkit-linear-gradient(left,
        rgba(0, 0, 0, 0) 2%,
        rgba(0, 0, 0, 1) 90%);
  }

  .title {
    font-size: 45rpx;
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    color: #ffffff;
    margin-left: 23rpx;
    white-space: nowrap;
  }

  .noticContainer {
    width: 340rpx;
    box-sizing: border-box;
    height: 100rpx;
    margin-left: 38rpx;
    display: flex;
    align-items: center;
  }
}

.topBanner {
  width: 750rpx;
  height: 436rpx;
  background-size: 100% 100%;
  background-image: url("@/static/act/forumDraw/topBanner.png");
}

.pageBackBg {
  width: 750rpx;
  // height: 100%;
  // flex: 1;
  height: 1485rpx;
  background-size: 100% 100%;
  position: absolute;
  // top: 536rpx;
  background-image: url("@/static/act/forumDraw/back.png");
  z-index: 1;
}

.drawContainer {
  display: grid;
  width: 722rpx;
  height: 723rpx;
  background-size: 100% 100%;
  background-image: url("@/static/act/forumDraw/drawContainer.png");
  flex-wrap: wrap;
  grid-template-columns: repeat(3, 180rpx);
  grid-template-rows: repeat(3, 180rpx);
  grid-column-gap: 42rpx;
  grid-row-gap: 42rpx;
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-items: center;
  margin-top: 0rpx;
  z-index: 3;
  box-sizing: border-box;
}

.drawBlock {
  width: 180rpx;
  height: 180rpx;
  background-color: #e6e6e6;
  // background-color: rgba(255, 0, 0, .4);
  border-radius: 5rpx;

  position: relative;
  transition: transform 0.2s linear;
  box-shadow: 0rpx 0rpx 21rpx 3rpx rgba(146, 146, 146, 0.73);

  .innerShaow {
    width: 180rpx;
    height: 180rpx;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    box-shadow: inset 0px 0px 14rpx 6rpx rgba(153, 95, 253, 0.8);
  }
}

.heightLight {
  transform: scale(1.1);
  border: 2rpx solid #9862f5;
  box-shadow: 0rpx 0rpx 21rpx 3rpx rgba(153, 95, 253, 0.9);
}

.drawBlock1 {
  grid-area: 1 / 1 / 2 / 2;
}

.drawBlock2 {
  grid-area: 1 / 2 / 2 / 3;
}

.drawBlock3 {
  grid-area: 1 / 3 / 2 / 4;
}

.drawBlock4 {
  grid-area: 2 / 3 / 3 / 4;
}

.drawBlock5 {
  grid-area: 3 / 3 / 4 / 4;
}

.drawBlock6 {
  grid-area: 3 / 2 / 4 / 3;
}

.drawBlock7 {
  grid-area: 3 / 1 / 4 / 2;
}

.drawBlock8 {
  grid-area: 2 / 1 / 3 / 2;
}

.centerBlock {
  width: 180rx;
  height: 180rx;
  color: #000;
  display: flex;
  align-items: center;
  // justify-content: center;
  justify-content: space-between;
  grid-area: 2 / 2 / 3 / 3;
  flex-direction: column;

  .drawButton {
    font-size: 30rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    width: 186rpx;
    height: 76rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/forumDraw/button.png");
    text-align: center;
    line-height: 60rpx;
    letter-spacing: 2rpx;
  }

  .num {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #000000;
    // margin-bottom: 8rpx;
    margin-top: 4rpx;

    text {
      color: #fa1545;
      margin-left: 3rpx;
    }
  }
}

.detailButton {
  font-size: 22rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
  width: 110rpx;
  height: 40rpx;
  background: #8254cf;
  border-radius: 5rpx;
}

.actBack {
  width: 55rpx;
  height: 55rpx;
  background-color: rgba(174, 120, 255, 0.63);
  border-radius: 50%;

  .back {
    width: 19rpx;
    height: 35rpx;
  }
}

.taskContainer {
  width: 722rpx;
  height: 635rpx;
  background-size: 100% 100%;
  background-image: url("@/static/act/forumDraw/taskContainer.png");
  z-index: 3;
  margin-top: 35rpx;
  box-sizing: border-box;
  padding: 0 25rpx;

  .taskTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 47rpx;
    margin-bottom: 20rpx;

    .taskTitle {
      font-size: 45rpx;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #ffffff;
    }

    .taskRule {
      font-size: 22rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }

  .taskWrap {
    width: 673rpx;
    height: 207rpx;
    background: #c0c0c0;
    box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(77, 82, 123, 0.43);
    background-color: #cacbe7;
    border-radius: 5rpx;
    margin-bottom: 31rpx;
    box-sizing: border-box;
    padding: 0 26rpx;
    padding-top: 30rpx;

    .top {
      display: flex;

      align-items: center;
      justify-content: space-between;

      // margin-top: 31rpx;
      .taskTitle {
        font-size: 27rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #626262;
      }

      .taskButton {
        width: 137rpx;
        height: 43rpx;
        background: #ffc937;
        border-radius: 5rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }
    }

    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 47rpx;
      margin-bottom: 17rpx;

      .left {
        font-size: 22rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #626262;
      }

      .right {
        font-size: 22rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #626262;

        .red {
          margin-left: 2rpx;
          color: #fa1545;
        }
      }
    }

    .bar {
      width: 625rpx;
      height: 14rpx;
      background: #ffffff;
      border-radius: 5rpx;
      position: relative;
      overflow: hidden;
    }

    .bar_width {
      // width: 559rpx;
      width: 0%;
      height: 14rpx;
      background: linear-gradient(90deg, #b453ff 0%, #c57bff 56%, #a230fa 100%);
      border-radius: 5rpx;
      transition: width 0.3s;
    }
  }
}

.overlay {
  pointer-events: auto;
}

.preTitle {
  font-weight: bold;
  font-size: 52rpx;
  text-align: center;
  color: #fff;
  margin-top: 200rpx;
  margin-bottom: 30rpx;
}

.preSwiper_container {
  width: 750rpx;
  height: 100%;
  position: relative;
}

.preSwiper {
  width: 750rpx;
  height: 830rpx;
  // background-color: red;
  position: relative;
}

.preSwiper_item {
  width: inherit;
  height: inherit;
  position: inherit;
}

.dotContainer {
  width: 750rpx;
  // height: 100rpx;
  // background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40rpx;

  .dot {
    width: 16rpx;
    height: 16rpx;
    background-color: #fff;
    border-radius: 50%;
    margin-right: 14rpx;
  }

  .dot_current {
    background-color: #fa1545;
  }
}

.goBag {
  margin: 60rpx auto;
  background-color: #fa1545;
  font-weight: bold;
  color: #fff;
  font-size: 30rpx;
  // width: ;
  border-radius: 5rpx;
  width: 400rpx;
  height: 70rpx;
  // padding: 20rpx;
}

.img {
  position: absolute;
  left: 50%;
  top: 0%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  width: inherit;
  display: flex;
  
  align-items: center;
  flex-direction: column;
  image {
    width: 87%;
    max-height: 100%;
    max-width: 100%;
    overflow-clip-margin: content-box;
    overflow: clip;
  }

  .imageName {
    text-align: center;
    font-size: 40rpx;
    font-weight: 600;
    font-family: PingFang SC;
    color: #fff;
    margin-top: 8rpx;
  }
}
</style>
