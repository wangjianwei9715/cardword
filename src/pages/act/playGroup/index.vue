<template>
  <view class='playContent'>
    <view class="back">
      <image src="/static/act/playGroup/background.png" />
    </view>
    <view class="rightTag">
      <view class="rightTagItem" @click='pageJump("/pages/act/playGroup/rule")'>
        <text>活动<br />规则</text>
      </view>
      <view class="rightTagItem rightTagItemTwo" @click='pageJump("/pages/act/playGroup/logList")'>
        <text>参与<br />记录</text>
      </view>

    </view>
    <view class="drawButtonContainer">
      <view class="drawButton" @click="$u.throttle(()=>{onClickDraw(1)},500)">抽1次</view>
      <view class="drawButton" @click="$u.throttle(()=>{onClickDraw(5)},500)">抽5次</view>
    </view>
    <view class="drawMsgContainer">
      <view class="drawMsg-left">
        抽奖次数:
        <text>{{myLotteryNum}}</text>次
      </view>
      <view class="drawMsg-right" @click='taskShow=true'>免费获取></view>
    </view>
    <view class="centerTitle">球员组合</view>
    <view class="collectContainer" v-for="(item,index) in groupList" :key='index'>
      <view class="collect-top">
        <view class="collect-msg">
          <view class="collect-msg-title">{{item.name}}</view>
          <view class="collect-msg-howMany">已有199人集齐</view>
        </view>
        <view class="collect-coupon" :class="{collectCouponGray:item.exchangeNum==0}" @click="onClickExchange(item)">
          <view class="collect-coupon-top">兑
            <text>5</text>元
          </view>
          <view class="collect-coupon-bottom">上组券</view>
        </view>
      </view>
      <view class="collect-card">
        <view class="cardItem" v-for="(man,manIndex) in item.players" :key='manIndex'>
          <image class='cardItem-img' :class="{noneImg:man.haveNum==0}" :src="parsePic(man.pic)" alt="" srcset="aspectFill">
            <view class="cardName">{{man.name}}</view>
            <view class="cardItem-badge">{{man.haveNum}}</view>
        </view>
      </view>
    </view>
    <view class="giveBlock" @click='pageJump("/pages/act/playGroup/give")'></view>
    <!-- <u-popup :show.sync="taskShow" @close='taskShow=false' :closeable='true'>
      <view class="popuContainer">
        <view class="taskItem" v-for='(item,index) in taskList' :key='index'>
          <image :src='item.icon' class='taskItem-icon' mode='widthFix' />
          <view class="taskItem-center">
            <view class="taskItem-name">{{item.name}}</view>
            <view class="taskItem-tips">
              <view class="tips-left">抽奖次数
                <text>+1</text>
              </view>
              <view class="tips-right">完成
                <text>{{item.getNum || 0}}</text>/{{item.dayGetNum || 0}}
              </view>
            </view>
          </view>
          <view class="taskItem-right" :class="{taskItemGray:item.isFinish}" @click="onClickTask(item)">{{item.buttonText}}</view>
        </view>
      </view>
    </u-popup> -->
    <bottomDrawer title='每日任务' :height='571' heightType='rpx' :showDrawer.sync='taskShow'>
      <view class="taskItem" v-for='(item,index) in taskList' :key='index'>
        <image :src='item.icon' class='taskItem-icon' mode='widthFix' />
        <view class="taskItem-center">
          <view class="taskItem-name">{{item.name}}</view>
          <view class="taskItem-tips">
            <view class="tips-left">抽奖次数
              <text>+1</text>
            </view>
            <view class="tips-right">完成
              <text>{{item.getNum || 0}}</text>/{{item.dayGetNum || 0}}
            </view>
          </view>
        </view>
        <view class="taskItem-right" :class="{taskItemGray:item.isFinish}" @click="onClickTask(item)">
          {{item.buttonText}}</view>
      </view>
    </bottomDrawer>
    <pedometerPop :show.sync='pedometerShow' :value.sync='selectItem.needExchangeNum' :maxValue.sync='selectItem.exchangeNum' @confirm="exchangeConfirm" />
    <view class="drawCardMask" v-if='maskShow'></view>
    <view class="drawCard" v-if='drawShow'>
      <view class='transitionAll transitionDelay opacity0' :class="{opacity1:drawCard.index==drawCard.list.length-1}">
        <view class="congratulations">恭喜获得</view>
        <view class="teamList">{{drawAllName}}</view>
      </view>
      <template v-if="drawType==5">
        <view class="fiveCardContainer">
          <view class='fiveCardBlock' v-for='(item,index) in drawCard.list' :key='index'>
            <image class="fiveCardImage transitionAll" :class="{show:index<=drawCard.index}" :src="parsePic(decodeURIComponent(item.pic))" alt="" srcset="" @click='previewImage(drawCard.list,index)' mode='aspectFill' />
          </view>
        </view>
      </template>
      <template v-if="drawType==1">
        <image class="singleImage transitionAll" :class="{show:index<=drawCard.index}" :src="parsePic(decodeURIComponent(drawCard.list[0].pic))" alt="" srcset="" @click='previewImage(drawCard.list,0)' mode='aspectFill' />
      </template>
      <view class='transitionAll transitionDelay opacity0' :class="{opacity1:drawCard.index==drawCard.list.length-1}">
        <view class="againButton" @click="onClickDraw(drawType)">再抽{{drawType==1?'一':'五'}}次</view>
        <view class="close" @click='drawShow=false'></view>
      </view>

    </view>
    <share :operationShow.sync='operationShow' :shareData="shareData" />
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script lang="ts">
let UIImpactFeedbackGenerator: any = null;
let impact: any = null;
const mockList = [
  {
    pic:
      "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.13/seller/info/1660373770287v85gaxwzph.jpg",
    name: "詹姆斯"
  },
  {
    pic:
      "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.13/seller/info/1660373770287v85gaxwzph.jpg",
    name: "詹姆斯"
  },
  {
    pic:
      "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.13/seller/info/1660373770287v85gaxwzph.jpg",
    name: "詹姆斯"
  },
  {
    pic:
      "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.13/seller/info/1660373770287v85gaxwzph.jpg",
    name: "詹姆斯"
  },
  {
    pic:
      "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.13/seller/info/1660373770287v85gaxwzph.jpg",
    name: "詹姆斯"
  }
];
import { app } from "@/app";
import { Component, Watch } from "vue-property-decorator";
import BaseNode from "../../../base/BaseNode.vue";
import { parsePic } from "@/tools/util";
@Component({})
export default class ClassName extends BaseNode {
  operationShow: boolean = false;
  pedometerShow: boolean = false;
  taskShow: boolean = false;
  drawType: number = 1;
  drawShow: boolean = false;
  exchangeShow: boolean = false;
  myLotteryNum: any = 0;
  platform: string = app.platform.systemInfo.platform;
  selectItem: any = {
    needExchangeNum: 1,
    exchangeNum: 3
  };
  taskList: any = [
    {
      icon: "/static/act/playGroup/share.png",
      name: "分享活动页",
      buttonText: "去分享",
      action: "goShare"
    },
    {
      icon: "/static/act/playGroup/pullMan.png",
      name: "好友助力",
      buttonText: "去分享",
      action: ""
    },
    {
      icon: "/static/act/playGroup/goOut.png",
      name: "赠送一次卡密",
      buttonText: "去完成",
      action: ""
    },
    {
      icon: "/static/act/playGroup/money.png",
      name: "每上组98元",
      buttonText: "去完成",
      action: "pageJump",
      params: "/pages/goods/goods_find_list?classType=100"
    }
  ];
  groupList: any = [];
  drawCard: any = {
    index: -1,
    list: []
  };
  drawTimer: any = null;
  parsePic: any = parsePic;
  shareData: any = {
    shareUrl: "",
    title: "集球员组合，兑海量上足券",
    summary: "集球员组合，兑海量上足券",
    thumb: ""
  };
  helpCode: string = "";
  onLoad(query: any) {
    if (!app.token.accessToken) {
      uni.redirectTo({
        url: `/pages/login/login?redirect=/pages/act/playGroup/index?${
          query.helpCode ? "helpCode=" + query.helpCode : ""
        }`
      });
      return;
    }
    if (query.helpCode) {
      this.helpCode = query.helpCode;
      this.helpPost();
    }

    /* #ifdef APP-PLUS */
    if (this.platform == "ios") {
      UIImpactFeedbackGenerator = plus.ios.importClass(
        "UIImpactFeedbackGenerator"
      );
      impact = new UIImpactFeedbackGenerator();
    }
    /* #endif */
    this.reqNewData();
  }
  //   加载更多数据
  onReachBottom() {}
  //   下拉刷新
  @Watch("drawShow")
  onDrawShowChange(val: boolean, oldVal: boolean) {
    if (val) this.drawAnimationTimer();
  }
  private get drawAllName() {
    const { list } = this.drawCard;
    const nameList = list.map((item: any) => item.name);
    return nameList.join("、");
  }
  private get maskShow() {
    //  || this.exchangeShow
    return this.drawShow;
  }
  onPullDownRefresh() {}
  //抽卡动画
  drawAnimationTimer() {
    this.drawTimer && clearInterval(this.drawTimer);
    this.drawTimer = setInterval(() => {
      if (this.drawCard.index + 1 >= this.drawCard.list.length) {
        this.drawTimer && clearInterval(this.drawTimer);
        return;
      }
      this.drawCard.index += 1;
    }, 150);
  }
  onClickDraw(type: number) {
    if (!app.token.accessToken) {
      uni.redirectTo({
        url: `/pages/login/login?redirect=/pages/act/playGroup/index?${
          this.helpCode ? "helpCode=" + this.helpCode : ""
        }`
      });
      return;
    }
    this.drawShow = false;
    this.UIClickFeedBack();
    this.postDraw(type);
  }
  goShare() {
    this.taskShow = false;
    this.operationShow = true;
  }
  getHelpCode() {
    uni.showLoading({
      title: ""
    });
    app.http.Get("activity/playerGroup/share/help", {}, (res: any) => {
      const { helpCode } = res;
      uni.hideLoading();
      uni.share({
        provider: "weixin",
        scene: "WXSceneSession",
        href: `?helpCode=${helpCode}`,
        title: "集球员组合,兑海量上足券",
        summary: "为我助力",
        imageUrl: ""
      });
    });
  }
  helpPost() {
    app.http.Post(
      "activity/playerGroup/help/" + this.helpCode,
      {},
      (res: any) => {
        this.$nextTick(() => {
          this.$refs.uToast.show({
            type: "success",
            message: "成功助力",
            iconUrl: "https://cdn.uviewui.com/uview/demo/toast/success.png"
          });
        });
      }
    );
  }
  postDraw(type: number) {
    uni.showLoading({
      title: ""
    });
    app.http.Post(
      "activity/playerGroup/lottery/go",
      { goLotteryNum: type },
      (res: any) => {
        uni.hideLoading();
        this.$nextTick(() => {
          this.drawType = type;
          this.drawCard.index = -1;
          this.drawCard.list = res.players;
          this.myLotteryNum = res.lotteryNum;
          this.drawShow = true;
          this.reqNewData();
        });
      },
      (err: any) => {
        uni.hideLoading();
      }
    );
  }
  onClickExchange(item: any) {
    if (item.exchangeNum <= 0) {
      uni.showToast({
        title: "可兑换数量不足",
        icon: "none"
      });
      return;
    }
    item.needExchangeNum = 1;
    this.selectItem = JSON.parse(JSON.stringify(item));
    this.pedometerShow = true;
  }
  exchangeConfirm() {
    uni.showModal({
      title: "提示",
      content: `确认兑换${this.selectItem.needExchangeNum}份${
        this.selectItem.name
      }对应的奖励吗?`,
      success: (res: any) => {
        if (res.confirm) this.exchangePost();
      }
    });
  }
  exchangePost() {
    if (!this.selectItem.groupId) {
      uni.showToast({
        title: "信息核对错误,请重试",
        icon: "none"
      });
      return;
    }
    uni.showLoading({
      title:''
    });
    app.http.Post(
      "activity/playerGroup/exchange/" + this.selectItem.groupId,
      { exchangeNum: this.selectItem.needExchangeNum },
      (res: any) => {
        uni.showToast({
          title: "兑换成功",
          icon: "success"
        });
        this.reqNewData();
        uni.hideLoading();
      }
    );
  }
  onClickTask(task: any) {
    if (task.isFinish) {
      uni.showToast({
        title: "今日完成次数已上限",
        icon: "none"
      });
      return;
    }
    if (task.action) {
      const _this: any = this;
      _this[task.action](task.params || undefined);
    }
  }
  //ui触感反馈(单次)
  UIClickFeedBack() {
    /* #ifdef APP-PLUS */
    if (this.platform == "ios") {
      impact.prepare();
      impact.init(1);
      impact.impactOccurred();
    }
    /* #endif */
  }
  pageJump(url: string) {
    if (!app.token.accessToken) {
      uni.redirectTo({
        url: `/pages/login/login?redirect=/pages/act/playGroup/index?${
          this.helpCode ? "helpCode=" + this.helpCode : ""
        }`
      });
      return;
    }
    uni.navigateTo({
      url
    });
  }
  previewImage(list: any, index: number) {
    const urls = list.map((item: any) => this.parsePic(item.src));
    uni.previewImage({
      urls,
      current: index
    });
  }
  assignTaskList(taskList: any) {
    if (!taskList.length) return;
    this.taskList.forEach((item: any, index: number) => {
      const findItem: any = taskList.find((taskItem: any) => {
        return item.name == taskItem.name;
      });
      if (findItem) {
        this.taskList[index] = {
          ...item,
          ...findItem
        };
      }
    });
  }
  reqNewData(cb?: Function) {
    app.http.Get("activity/playerGroup/home", {}, (res: any) => {
      console.log(res);
      // const data: any = res.data;
      const { myLotteryNum, taskList, groupList } = res.data;
      this.myLotteryNum = myLotteryNum;
      this.groupList = groupList;
      this.assignTaskList(taskList);
    });
  }
}
</script>

<style lang="scss">
page {
  height: 100%;
  background: #123a85;
}

@font-face {
  font-family: HYLiLiangHeiJ;
  src: url("https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.12/seller/info/16602943088150ns2974oh.ttf");
}

@font-face {
  font-family: YouSheBiaoTiHei;
  src: url("/static/act/playGroup/YouSheBiaoTiHei-2.ttf");
}

@font-face {
  font-family: BDZongYi-A001;
  src: url("/static/act/playGroup/BDZongYi.ttf");
}

.playContent {
  width: 750rpx;
  background-color: #123a85;
  height: 100%;

  .back {
    pointer-events: none;
    position: absolute;
    top: 0;
    z-index: 0;
    background-color: #123a85;

    image {
      pointer-events: none;
      z-index: 0;
      width: 750rpx;
      height: 990rpx;
    }
  }
}

.rightTag {
  position: absolute;
  right: 0rpx;
  top: -8rpx;
  width: 118rpx;
  z-index: 2;

  .rightTagItem {
    width: 118rpx;
    height: 169rpx;
    background-size: 100% 100%;
    position: relative;
    background-image: url("/static/act/playGroup/ruleIcon.png");
    text-align: center;
    line-height: 30rpx;
    letter-spacing: 2rpx;

    text {
      font-size: 23rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      position: relative;
      top: 60rpx;
      left: 30rpx;
    }
  }

  .rightTagItemTwo {
    height: 176rpx;
    bottom: 24rpx;
    background-image: url("/static/act/playGroup/ruleIconTwo.png");
  }
}

.drawButtonContainer {
  display: flex;
  padding: 0 113rpx;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  padding-top: 538rpx;

  .drawButton {
    width: 235rpx;
    height: 97rpx;
    background-size: 100% 100%;
    background-image: url("/static/act/playGroup/blueBlock.png");
    font-size: 42rpx;
    font-family: HYLiLiangHeiJ;
    font-weight: 400;
    color: #ffffff;
    text-shadow: 2rpx 5rpx 4rpx rgba(18, 60, 122, 0.7);
    display: flex;
    line-height: 78rpx;
    justify-content: center;
    letter-spacing: 2rpx;
    cursor: pointer;
  }
}

.drawMsgContainer {
  display: flex;
  padding: 90rpx 40rpx 0 37rpx;
  /* margin-top: 90rpx; */
  justify-content: space-between;
  position: relative;
  align-items: center;

  .drawMsg-left {
    font-size: 29rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    /* line-height: 345rpx; */
    text-shadow: 2rpx 5rpx 7rpx #123c7a;
    position: relative;
    bottom: 8rpx;

    text {
      font-size: 42rpx;
      font-family: PingFang SC;
      font-weight: 600;
      color: #ffffff;
      /* line-height: 345rpx; */
      text-shadow: 2rpx 5rpx 7rpx #123c7a;
      margin: 0 6rpx;
      margin-left: 10rpx;
      position: relative;
      top: 4rpx;
    }
  }

  .drawMsg-right {
    width: 266rpx;
    height: 69rpx;
    background-size: 100% 100%;
    background-image: url("/static/act/playGroup/radiosBlock.png");
    font-size: 29rpx;
    font-family: HYLiLiangHeiJ;
    font-weight: 400;
    color: #ffffff;
    /* line-height: 345px; */
    text-shadow: 2rpx 5rpx 4rpx rgba(18, 60, 122, 0.7);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding-bottom: 10rpx;
  }
}

.centerTitle {
  font-size: 42rpx;
  font-family: PingFang SC;
  font-weight: 600;
  color: #ffffff;
  width: 750rpx;
  text-align: center;
  position: relative;
  letter-spacing: 3rpx;
  margin-top: 40rpx;
  margin-bottom: 24rpx;
}

.collectContainer {
  width: 743rpx;
  height: 443rpx;
  position: relative;
  margin: 0 auto;
  background-size: 100% 100%;
  background-image: url("/static/act/playGroup/box.png");
  box-sizing: border-box;
  padding: 0 42rpx;
  padding-top: 36rpx;

  .collect-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .collect-coupon {
    width: 169rpx;
    height: 69rpx;
    background-size: 100% 100%;
    background-image: url("/static/act/playGroup/couponRed.png");
    box-sizing: border-box;
    padding: 11rpx 0 11rpx 68rpx;
    color: #d8162e;
    text-align: center;
    font-size: 19rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #d8162e;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: flex-start;
  }

  .collectCouponGray {
    background-image: url("/static/act/playGroup/couponGray.png");
  }

  .collect-coupon-top {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 600;
    color: #d8162e;
    line-height: 14rpx;

    text {
      font-size: 33rpx;
    }
  }

  .collect-coupon-bottom {
    font-size: 19rpx;
  }

  .collect-card {
    display: flex;
    justify-content: space-between;
    margin-top: 20rpx;

    .cardItem {
      width: 153rpx;
      height: 215rpx;
      //   background: #333333;
      position: relative;
    }

    .cardName {
      font-size: 25rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #7a7a7a;
      width: 100%;
      text-align: center;
      //   white-space: nowrap;
      //   overflow: hidden;
      //   text-overflow: ellipsis;
      margin-top: 14rpx;
    }

    .cardItem-badge {
      width: 28rpx;
      height: 28rpx;
      background: linear-gradient(0deg, #d8162e 0%, #fb4e66 100%);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 21rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #fffefe;
      position: absolute;
      top: 0;
      right: 0;
    }

    .cardItem-img {
      width: 153rpx;
      height: 215rpx;
      display: block;
      position: relative;
    }

    .noneImg::after {
      content: " ";
      display: block;
      width: 153rpx;
      height: 215rpx;
      position: absolute;
      top: 0;
      left: 0;
      background: #ffffff;
      opacity: 0.63;
    }
  }

  .collect-coupon-gray {
    background-image: url("/static/act/playGroup/couponGray.png");
  }

  .collect-msg {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .collect-msg-title {
    font-size: 29rpx;
    font-family: PingFang SC;
    font-weight: 600;
    color: #333333;
    letter-spacing: 4rpx;
    font-size: 33rpx;
    font-family: BDZongYi-A001;
    font-weight: normal;
    font-style: italic;
    color: #333333;
    // line-height: 345px;

    background: linear-gradient(to right, #9e2dd8, #ffd200);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .collect-msg-howMany {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
  }
}

.popuContainer {
  width: 750rpx;
  height: 571rpx;
  background: #ffffff;
}

.taskItem {
  // width: 750rpx;
  // flex-wrap: nowrap;
  // background: red;
  display: flex;
  align-items: center;
  flex-direction: row !important;
  margin-bottom: 44rpx;

  .taskItem-icon {
    display: block;
    width: 42rpx;
    margin-right: 31rpx;
  }

  .taskItem-center {
    flex: 1;
  }

  .taskItem-right {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 27rpx;
    font-family: FZLanTingHeiS-R-GB;
    font-weight: 400;
    color: #ffffff;
    flex-direction: row !important;
    width: 138rpx;
    height: 53rpx;
    background: #1b5ab6;
    border-radius: 3rpx;
  }

  .taskItemGray {
    width: 138rpx;
    height: 53rpx;
    background: #b5b5b5;
    border-radius: 3rpx;
  }

  .taskItem-name {
    font-size: 29rpx;
    font-family: PingFang SC;
    font-weight: 600;
    color: #333333;
    margin-bottom: 4rpx;
  }

  .taskItem-tips {
    display: flex;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #757575;

    text {
      color: #ff0016;
      margin-left: 8rpx;
    }
  }

  .tips-left {
    font-size: 25rpx;
  }

  .tips-right {
    font-size: 25rpx;
    margin-left: 40rpx;
  }
}

.taskItem:first-child {
  margin-top: 10rpx;
}

.giveBlock {
  width: 153rpx;
  height: 99rpx;
  background-size: 100% 100%;
  background-image: url("/static/act/playGroup/ball.png");
  position: fixed;
  right: 9rpx;
  bottom: calc(45rpx + constant(safe-area-inset-bottom));
  bottom: calc(45rpx + env(safe-area-inset-bottom));
}

.drawCardMask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.61);
  z-index: 9;
}

.drawCard {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.singleImage {
  width: 358rpx;
  height: 504rpx;
  display: block;
  margin: 0 auto;
  margin-bottom: 30rpx;
}

.transitionAll {
  transition: all 0.3s;
}

.transitionDelay {
  transition-delay: 0.3s;
}

.opacity0 {
  opacity: 0;
  pointer-events: none;
}

.opacity1 {
  opacity: 1;
  pointer-events: auto;
}

.congratulations {
  font-size: 67rpx;
  font-family: YouSheBiaoTiHei;
  margin-top: 160rpx;
  font-weight: 400;
  color: #ffffff;
  width: 100%;
  text-align: center;
  letter-spacing: 2rpx;
  margin-bottom: 12rpx;
}

.teamList {
  font-size: 35rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
  //   margin: 36rpx 0;
  margin-bottom: 36rpx;
  width: 100%;
  text-align: center;
  letter-spacing: 2rpx;
}

.againButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 358rpx;
  height: 80rpx;
  background: #1b5ab6;
  border-radius: 3rpx;
  font-size: 33rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
  margin: 0 auto;
  margin-top: 20rpx;
  letter-spacing: 2rpx;
}

.close {
  width: 47rpx;
  height: 47rpx;
  background-size: 100% 100%;
  background-image: url("/static/act/playGroup/close.png");
  margin: 0 auto;
  margin-top: 49rpx;
}

.fiveCardContainer {
  box-sizing: border-box;
  width: 710rpx;
  margin: 0rpx auto;
  //   margin-top: 165rpx;
  //   background-color: red;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  .fiveCardBlock {
    width: 211rpx;
    height: 296rpx;
    // background: #ffffff;
    margin: 0 9rpx;
    margin-bottom: 30rpx;
  }

  .fiveCardImage {
    width: 211rpx;
    height: 296rpx;
    transform: scale(0);
  }

  .show {
    transform: scale(1);
  }
}
</style>