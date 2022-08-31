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
      <view class="drawMsg-right" @click='getTaskList(),taskShow=true'>免费获取></view>
    </view>
    <view class="centerTitle">球员组合</view>
    <view class="collectContainer" v-for="(item,index) in groupList" :key='index'>
      <view class="collect-top">
        <view class="collect-msg">
          <view class="collect-msg-title" :style="lineColor(item)">{{item.name}}</view>
          <view class="collect-msg-howMany">已有{{item.totalExchangeNum}}人集齐</view>
        </view>
        <view class="collect-coupon" :class="{collectCouponGray:item.exchangeNum==0}" @click="onClickExchange(item)">
          <view class="collect-coupon-top" :class="{noneColorTop:item.exchangeNum==0}">兑
            <text>{{item.couponAmount}}</text>元
          </view>
          <!-- <view class="collect-coupon-bottom">上组券</view> -->
        </view>
      </view>
      <view class="collect-card" :class="{noFourCollect:item.players.length<4}">
        <view class="cardItem" v-for="(man,manIndex) in item.players" :key='manIndex'>
          <muqian-lazyLoad class='cardItem-img' :class="{noneImg:man.haveNum==0}" @click='previewImage(item.players,manIndex,"pic")' :src="decodeURIComponent(man.pic)" alt="" mode="aspectFill" />
          <view class="cardName">{{man.name}}</view>
          <view class="cardItem-badge">{{man.haveNum}}</view>
        </view>
      </view>
    </view>

    <bottomDrawer title='每日任务' :height='571' heightType='rpx' :needSafeArea='true' :showDrawer.sync='taskShow'>
      <view class="taskItem" v-for='(item,index) in taskList' :key='index'>
        <image :src='item.icon' class='taskItem-icon' mode='widthFix' />
        <view class="taskItem-center">
          <view class="taskItem-name">{{item.name}}
            <text v-if='item.upGroupPlan'>{{item.upGroupPlan}}</text>
          </view>
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
            <image class="fiveCardImage transitionAll" :class="{show:index<=drawCard.index}" :src="item.pic || ''" alt="" srcset="" @click='previewImage(drawCard.list,index)' mode='aspectFill' />
          </view>
        </view>
      </template>
      <template v-if="drawType==1">
        <image class="singleImage transitionAll" :class="{show:drawCard.index>=0}" :src="drawCard.list[0].pic || ''" alt="" srcset="" @click='previewImage(drawCard.list,0)' mode='aspectFill' />
      </template>
      <view class='transitionAll transitionDelay opacity0' :class="{opacity1:drawCard.index==drawCard.list.length-1}">
        <view class="againButton" @click="onClickDraw(drawType)">再抽{{drawType==1?'一':'五'}}次</view>
        <view class="close" @click='drawShow=false'></view>
      </view>

    </view>
    <view style="z-index:-1;opacity:0;position:absolute;top:0;transform: scale(0);">
      <image v-for="(item,index) in drawCard.list" :key="index" :src="item.pic" mode="scaleToFill" @load='loadNum+=1' @error='loadNum+=1' />
    </view>
    <share :operationShow.sync='operationShow' @delyCallBack="shareCallBack" :shareData="shareData" />
    <u-toast ref="uToast"></u-toast>
    <view class="giveBlock" :class="{iosGiveBlock:platform=='ios'}" @click='pageJump("/pages/act/playGroup/give")'></view>
  </view>
</template>

<script lang="ts">
let UIImpactFeedbackGenerator: any = null;
let impact: any = null;
const lineColorArray = {
  one: ["#8C94A4", "#403F3F"],
  two: ["#65B583", "#21753C"],
  three: ["#34B0FF", "#E9662D"],
  four: ["#3C78E5", "#EF9536"],
  five: ["#FFCD03", "#EF9536"],
  six: ["#F8D447", "#9136D0"],
  seven: ["#EA3337", "#F09737"]
};
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
  shareUrl: string = app.localTest
    ? "https://www.ka-world.com/share/testH5/#/pages/act/playGroup"
    : "https://www.ka-world.com/share/h5/#/pages/act/playGroup";
  selectItem: any = {
    needExchangeNum: 1,
    exchangeNum: 3
  };
  loadNum: number = 0;
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
      action: "getHelpCode"
    },
    {
      icon: "/static/act/playGroup/goOut.png",
      name: "赠送一次卡密",
      buttonText: "去完成",
      action: "goSendKam"
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
    shareUrl: `${this.shareUrl}`,
    title: "集球员组合，兑海量上足券",
    summary: "集球员组合，兑海量上足券",
    thumb:
      "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.31/active/playGroup/0/1661928072908myo8o7ownl.jpg"
  };
  helpCode: string = "";
  queryParams: any = {
    pageIndex: 1,
    pageSize: 5
  };
  totalPage: number = 0;
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
    this.reqNewData(null, true);
    this.getTaskList();
  }
  //   加载更多数据
  onReachBottom() {
    if (this.queryParams.pageIndex < this.totalPage) {
      this.queryParams.pageIndex += 1;
      this.reqNewData(null, false);
    }
  }

  //   下拉刷新
  onPullDownRefresh() {
    this.getTaskList();
    this.reqNewData(() => {
      uni.stopPullDownRefresh();
    }, true);
  }
  @Watch("drawShow")
  onDrawShowChange(val: boolean, oldVal: boolean) {
    if (val) this.drawAnimationTimer();
  }
  @Watch("loadNum")
  onLoadNumChange(val: number, oldVal: number) {
    if (!val) return;
    if (val == this.drawCard.list.length) {
      console.log("开始动画");
      uni.hideLoading();
      this.drawCard.index = -1;
      this.drawShow = true;
      this.reqNewData(null, true);
    }
  }
  private get drawAllName() {
    const list: any = this.drawCard.list;
    const nameList = list.map((item: any) => item.name);
    return nameList.join("、");
  }
  private get maskShow() {
    return this.drawShow;
  }

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
  lineColor(item: any) {
    let colorArr: any = [];
    const couponAmount: any = item.couponAmount;
    if (couponAmount <= 5) {
      colorArr = lineColorArray.one;
    } else if (couponAmount > 5 && couponAmount <= 8) {
      colorArr = lineColorArray.two;
    } else if (couponAmount > 8 && couponAmount <= 20) {
      colorArr = lineColorArray.three;
    } else if (couponAmount > 20 && couponAmount <= 30) {
      colorArr = lineColorArray.four;
    } else if (couponAmount > 30 && couponAmount <= 60) {
      colorArr = lineColorArray.five;
    } else if (couponAmount > 60 && couponAmount <= 88) {
      colorArr = lineColorArray.six;
    } else {
      colorArr = lineColorArray.seven;
    }
    // const [firstColor, endColor] = colorArr;
    const firstColor: any = colorArr[0];
    const endColor: any = colorArr[1];
    return `
    background: linear-gradient(to right, ${firstColor}, ${endColor});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;`;
  }
  goShare() {
    this.taskShow = false;
    this.operationShow = true;
  }
  shareCallBack() {
    app.http.Post("activity/playerGroup/share/wechat", {}, (res: any) => {
      this.myLotteryNum = res.myLotteryNum;
      this.getTaskList();
    });
  }
  goSendKam() {
    uni.navigateTo({
      url: "/pages/userinfo/giving/index"
    });
  }
  getHelpCode() {
    uni.showLoading({
      title: ""
    });
    app.http.Post("activity/playerGroup/share/help", {}, (res: any) => {
      const helpCode = res.helpCode;
      uni.hideLoading();
      uni.share({
        provider: "weixin",
        scene: "WXSceneSession",
        href: `${this.shareUrl}?helpCode=${helpCode}`,
        title: "集球员组合,兑海量上足券",
        summary: "为我助力",
        imageUrl:
          "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.31/active/playGroup/0/1661928072908myo8o7ownl.jpg"
      });
    });
  }
  helpPost() {
    app.http.Post(
      "activity/playerGroup/help/" + this.helpCode,
      {},
      (res: any) => {
        this.$nextTick(() => {
          //@ts-ignore
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
      title: "",
      mask: true
    });
    app.http.Post(
      "activity/playerGroup/lottery/go",
      { goLotteryNum: type },
      (res: any) => {
        this.parsePicList(res.players).then((players: any) => {
          this.myLotteryNum = res.lotteryNum;
          this.$nextTick(() => {
            this.drawType = type;
            // this.reqNewData(null, true);
          });
        });
      },
      (err: any) => {
        uni.hideLoading();
      }
    );
  }
  async parsePicList(picList: any) {
    try {
      this.loadNum = 0;
      const promiseList = picList.map((item: any) => {
        return {
          name: item.name,
          pic: this.parsePic(decodeURIComponent(item.pic))
        };
      });
      this.drawCard.list = promiseList;
      return promiseList;
    } catch (err) {
      console.log(err);
    }
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
      content: `确认兑换${this.selectItem.needExchangeNum}份“${
        this.selectItem.name
      }”对应的奖励吗?`,
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
      title: ""
    });
    app.http.Post(
      "activity/playerGroup/exchange/" + this.selectItem.groupId,
      { exchangeNum: this.selectItem.needExchangeNum },
      (res: any) => {
        uni.showToast({
          title: "兑换成功",
          icon: "success"
        });
        this.reqNewData(null, true);
        // uni.hideLoading();
        // setTimeout(() => {
        //   const index = this.groupList.findIndex(
        //     (item: any) => item.groupId == this.selectItem.groupId
        //   );
        //   if (index < 0) return;
        //   this.groupList[index].exchangeNum = res.exchangeNum;
        //   this.groupList[index].totalExchangeNum = res.totalExchangeNum;
        //   this.groupList[index].players = this.selectItem.players.map(
        //     (item: any, index: number) => {
        //       const syNum = item.haveNum - this.selectItem.needExchangeNum;
        //       return {
        //         ...item,
        //         haveNum: syNum
        //       };
        //     }
        //   );
        // }, 500);
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
  previewImage(list: any, index: number, key: string = "src") {
    const urls = list.map((item: any) => this.parsePic(item[key]));
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
  getTaskList() {
    app.http.Get("activity/playerGroup/home/task/list", {}, (res: any) => {
      const list: any = res.list;
      this.assignTaskList(list);
    });
  }
  reqNewData(cb?: any, refresh?: boolean) {
    if (refresh) this.queryParams.pageIndex = 1;
    app.http.Get(
      "activity/playerGroup/home/group/list",
      this.queryParams,
      (res: any) => {
        // uni.hideLoading();
        // const { myLotteryNum, groupList } = res.data;
        const myLotteryNum: any = res.data.myLotteryNum;
        let groupList: any = res.data.groupList;
        this.totalPage = res.totalPage;
        this.myLotteryNum = myLotteryNum;
        this.queryParams.pageIndex == 1
          ? (this.groupList = groupList)
          : this.groupList.push(...groupList);
        cb && cb();
      }
    );
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
  // src: url("../../../static/act/playGroup/BDZongYi.ttf");
  src: url("https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.26/seller/info/1661506714192c1fus35zzh.ttf");
}

.playContent {
  width: 750rpx;
  background-color: #123a85;
  height: 100%;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
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
    height: 175rpx;
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
      font-weight: bold;
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
  font-weight: bold;
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
  padding: 0 36rpx 0 42rpx;
  padding-top: 36rpx;
  z-index: 8;
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
    padding: 11rpx 0 11rpx 50rpx;
    color: #d8162e;
    text-align: center;
    font-size: 19rpx;
    font-family: PingFang SC;
    font-weight: 400;

    display: flex;
    // flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }

  .collectCouponGray {
    background-image: url("/static/act/playGroup/couponGray.png");
  }

  .collect-coupon-top {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #d8162e;
    // line-height: 14rpx;
    text-align: center;
    width: 120rpx;
    margin-right: 10rpx;
    height: 100%;
    // background-color: red;
    // margin-top: 6rpx;
    text {
      font-size: 33rpx;
    }
  }
  .noneColorTop{
    color:#757575;
  }
  .collect-coupon-bottom {
    margin-top: 2rpx;
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
      pointer-events: none;
      opacity: 0.63;
    }
  }
  .noFourCollect {
    justify-content: start;
    .cardItem {
      margin-right: 16rpx;
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
    text {
      font-size: 25rpx;
      font-weight: 400;
      margin-left: 20rpx;
    }
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
  bottom: 45rpx;
  z-index: 8;
}
.iosGiveBlock {
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
  transform: scale(0);
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
.show {
  transform: scale(1);
}
</style>