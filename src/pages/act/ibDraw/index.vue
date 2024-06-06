<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-07-24 17:01:39
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-11-29 17:17:27
 * @FilePath: \jichao_app_2\src\pages\act\forumDraw\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="content">
    <transitionNav title=" " :customBack="false">
      <template v-slot:slotRight>
        <view class="detailButton flexCenter" @click="pageJump('/pages/act/ibDraw/rule?activityId=' + actId)">
          <view>
            <view>规则</view>
            <view>说明</view>
          </view>
        </view>
        <view class="detailButton flexCenter" style="margin-left: 20rpx;"
          @click="pageJump('/pages/act/ibDraw/log?activityId=' + actId)">
          <view>
            <view>我的</view>
            <view>背包</view>
          </view>
        </view>
      </template>
    </transitionNav>
    <view class="pageBack"></view>
    <view class="topBanner">
      <view class="hide" :style="{ height: navHeight + 'px' }"></view>
      <image mode="aspectFill" :src="$parsePic(actInfo.banner || '')"></image>
    </view>

    <view class="machineContainer">
      <view class="noticContainer">
        <u-notice-bar icon="" fontSize="24rpx" bgColor="rgba(0,0,0,0)" color="#ffffff" :text="luckList"
          style="position: relative;bottom: 2rpx;" direction="column"></u-notice-bar>
      </view>
      <view class="luckyNum">
        剩余抽奖次数：{{ myData.num }}
      </view>
      <view class="drawContainer">
        <view class="drawBlock" v-for="(item, index) in drawList" :class="[
          `drawBlock${index + 1}`,
          index == nowHeightLight ? `heightLight` : '',
        ]">
          <image :src="awardPic(item)" style="width: 100%; height: 100%" mode="aspectFill">
          </image>
          <view class="innerShaow" v-if="index === nowHeightLight"></view>
        </view>
        <view class="centerBlock">
        </view>
      </view>

      <view class="drawButton" @click.stop="onClickDraw"></view>
    </view>
    <view class="tagContainer uni-flex">
      <view class="tag" :class="{ tagSelect: tagCurrent == 0 }" @click="changeTag(0)">图鉴榜单</view>
      <view class="tag" :class="{ tagSelect: tagCurrent == 1 }" @click="changeTag(1)">任务进度</view>
      <view class="triangle" :class="{ triangle_right: tagCurrent == 1 }"></view>
    </view>
    <view class="cardContainer">
      <view class="rankContainer" v-show="tagCurrent === 0">
        <view class="myRank uni-flex">
          <view class="left">我的排名：{{ myData.rank > 0 ? myData.rank : "未入榜" }}</view>
          <view class="right">已累计：{{ myData.point }}</view>
        </view>
        <view class="rank_th" v-for="(item, index) in rankList">
          <view class="rank_th_num" :class="['rank_th_num' + item.rank]">{{ item.rank > 3 ? item.rank : '' }}</view>
          <muqian-lazyLoad class="rank_th_avatar" borderRadius='50%'
            :src="item.wait != 0 ? (item.avatar ? $parsePic(item.avatar) : defaultAvatar) : waitAvatar"></muqian-lazyLoad>
          <view class="rank_th_name">{{ item.wait != 0 ? item.userName : "虚位以待" }}</view>
          <view class="rank_th_point">{{ item.wait != 0 ? `累计：${item.point}` : "" }}</view>
          <view class="rank_th_awardName">{{ item.awardName }}</view>
        </view>
      </view>
      <view class="taskContainer" v-show="tagCurrent === 1">
        <view class="taskItem" :class="{ taskItem_noneborder: index == taskList.length - 1 }"
          v-for="(item, index) in taskList">
          <view class="left">
            <view class="title">{{ taskTitle(item) }}</view>
            <view class="progress_text">
              <view class="progress_text_one">{{ taskLeftText(item) }}</view>
              <view class="progress_text_two">
                <template v-if="item.tp == 2">
                  距下次完成还需<text>{{ item.distanceNextNum }}卡币</text>
                </template>
              </view>
              <view class="progress_text_three">{{ item.tp == 1 && (item.canReceive ||
                item.received) ? item.point : calculate.sub(item.point, item.distanceNextNum) }}/{{ item.point }}</view>
            </view>
            <view class="progress_wrap">
              <view class="progress_wrap_hide" :style="{ width: taskHideWidth(item) }"></view>
            </view>
          </view>
          <view class="right">
            <view class="btn flexCenter" @click.stop="onClickButton(item)"
              :class="{ btn_dis: taskFinish(item) && !item.canReceive }">{{ taskFinish(item) ? (item.canReceive ? "领取" :
                "已领取")
                : "去补充" }}
            </view>
            <view class="tips" v-if="item.tp == 2">已完成{{ item.receiveNum }}次</view>
          </view>
        </view>
      </view>
    </view>
    <view class="fixButton flexCenter" @click="goTj">补充图鉴</view>
    <view class="safeBottom"></view>
    <!-- <view class="bottomSafeArea"></view> -->
    <u-overlay class="overlay" :duration="500" :opacity="0.8" :show="showSwiper" @click="showSwiper = false">
      <view class="preTitle">恭喜抽中以下奖品</view>
      <view class="preSwiper_container">
        <swiper class="preSwiper" :indicator-dots="false" :autoplay="false" :circular="false" :current="current"
          @change="swiperChange">
          <swiper-item class="preSwiper_item" v-for="(item, index) in resRewardList" :key="index">
            <view class="img">
              <image mode="widthFix" :src="$parsePic(item.pic)" />
              <view class="imageName">{{ item.name }}</view>
            </view>
          </swiper-item>
        </swiper>
        <view class="dotContainer">
          <view class="dot" :class="{ dot_current: index === current }" v-for="(item, index) in resRewardList">
          </view>
        </view>
        <view class="goBag flexCenter" @click.stop="
          pageJump('/pages/act/ibDraw/log?activityId=' + actId), (showSwiper = false)
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
import { calculate,parsePic } from "@/tools/util"
const ROUND_NUM = 6;
const navHeight = app.statusBarHeight + uni.upx2px(88);
const gapTop = uni.upx2px(436) + uni.upx2px(74);

@Component({})
export default class ClassName extends BaseNode {
  drawList: any = [];
  navHeight = navHeight;
  luckList: Array<string> = [];
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
  actId: number = 0
  taskList: any = []
  rankList: any = []
  actInfo: any = {}
  myData: any = {}
  defaultAvatar: any = app.defaultAvatar
  waitAvatar: string = "/static/goods/v2/waitAvatar.png"
  tagCurrent: number = 0;
  calculate = calculate
  onLoad(query: any) {
    this.actId = +query.activityId
    app.platform.hasLoginToken(() => {
      this.initGetData()
      this.initConf();
      this.defautLoop();
    });
    let a: boolean = false
    // while(!a){
    //   // console.log(6666);

    //   // setTimeout(())
    // }
  }
  onShow() {
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
  changeTag(index: number) {
    this.tagCurrent = index
  }
  onClickDraw() {
    if (this.onDraw) {
      app.platform.UINotificationFeedBack("error");
      uni.showToast({
        title: "请等待抽奖结束",
        icon: "none",
      });
      return;
    }
    if (this.myData.num < 1) {
      app.platform.UINotificationFeedBack("error");
      uni.showModal({
        title: "提示",
        content: "次数不足，可补充图鉴获得",
        cancelText: "我知道了",
        confirmText: "去图鉴",
        success: (res: any) => {
          if (res.confirm) {
            app.navigateTo.switchTab(1);
          }
        },
      });
      return;
    }
    uni.showModal({
      title: "确认抽奖",
      content: `本次抽奖将消耗1次抽奖次数`,
      cancelText: "我再想想",
      success: (res: any) => {
        if (res.confirm) {
          app.platform.UIClickFeedBack(0);
          this.postGetDrawResult();
        }
      },
    });
  }
  isThankYou(id: number) {
    const findItem: any = this.drawList.find((item: any) => {
      return item.id === id
    })
    return findItem.tp === 99
  }
  //获取抽奖结果
  async postGetDrawResult() {
    this.resRewardIds = [];
    this.current = 0
    this.onDraw = true;
    uni.showLoading({
      title: ""
    })
    app.http.Post(`activity/ibDraw/draw`, {
      activityId: this.actId
    }, async (res: any) => {
      uni.hideLoading()
      this.resRewardIds = res.award || [];
      this.myData.num -= 1
      for (let i = 0; i < this.resRewardIds.length; i++) {
        await this.startDraw(
          this.resRewardIds[i],
          i === this.resRewardIds.length - 1 ? 0 : 1500,
          4
        );
        if (i == this.resRewardIds.length - 1) {
          this.onDraw = false;
          if (this.isThankYou(this.resRewardIds[i])) {
            setTimeout(() => {
              uni.showModal({
                title: "提示",
                content: "很遗憾，您没有中奖，感谢您的参与和支持。",
                showCancel: false,
                success: (choice: any) => {
                  if (choice.confirm) {
                    this.defautLoop()
                  }
                }
              })
            }, 500);
          } else {
            setTimeout(() => {
              this.showDrawRes();
            }, 300);
          }

        }
      }
    }, () => {
      uni.hideLoading()
      this.onDraw = false
    });
  }
  awardPic(item:any){
    if (item.tp===99){
      return '/static/act/ibDraw/thankyou.png'
    }else{
      return parsePic(item.pic)
    }
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
  loop(endIndex: number, slowNum: number, cb?: Function) {
    if (!this.nowHeightLight || this.nowHeightLight < 8) {
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
          this.loop(endIndex, slowNum, cb);
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
  goTj() {
    app.navigateTo.switchTab(1)
  }
  //展示抽奖的结果
  showDrawRes() {
    this.resRewardList = this.resRewardIds.map((id: any) => {
      const findItem: any = this.drawList.find((draw: any) => {
        return draw.id === id;
      });
      return findItem;
    });
    this.showSwiper = true;
  }
  taskTitle(item: any) {
    return `补充图鉴累计${item.point}卡币,抽${item.num}次（${item.tp == 1 ? '单次' : "重复"}）`
  }
  taskLeftText(item: any) {
    if (item.tp == 1) {
      if (item.canReceive) return "可领取"
      if (!item.canReceive && item.received) return "已完成"
      if (!item.canReceive && !item.received) return `距完成任务还需${item.distanceNextNum}卡币`
    }
    if (item.tp == 2) {
      return `累计卡币${this.myData.point}`
    }
  }
  taskHideWidth(item: any) {
    if (this.taskFinish(item)) return "0%"
    return (1 - (item.point - item.distanceNextNum) / item.point) * 100 + "%"
  }
  taskFinish(item: any) {
    return (item.tp == 1 && (item.canReceive || item.received))
  }
  onClickButton(item: any) {
    if (item.tp == 1 && item.canReceive) {
      app.http.Post(`activity/ibDraw/task/receive/${item.id}`, {}, (res: any) => {
        item.canReceive = false
        item.received = true
        uni.showToast({
          title: "领取成功"
        })
        this.myData.num += item.num
      })
    } else if ((item.tp == 1 && !item.canReceive && !item.received) || item.tp == 2) {
      this.goTj()
    }
  }
  goTuj() {
    this.goTj();
  }
  pageJump(url: string) {
    uni.navigateTo({
      url,
    });
  }
  swiperChange(event: any) {
    this.current = event.detail.current;
  }
  initGetData() {
    Promise.all([this.reqActInfo(), this.reqMyData(), this.reqRank()])
  }
  async reqRank() {
    app.http.Get(`dataApi/activity/ibDraw/rankList`, { activityId: this.actId }, (res: any) => {
      this.rankList = res.list || []
    })
  }
  async reqActInfo() {
    app.http.Get(`dataApi/activity/ibDraw/info`, { activityId: this.actId }, (res: any) => {
      this.actInfo = res.data
      this.drawList = res.awardList || []
      this.luckList = res.broadcastList || []
    })
  }
  async reqMyData() {
    app.http.Get(`dataApi/activity/ibDraw/myData`, { activityId: this.actId }, (res: any) => {
      if (res.data.black) {
        uni.showModal({
          title: "提示",
          content: "您已被禁止参与此活动",
          showCancel: false,
          success: (choice: any) => {
            if (choice.confirm) {
              uni.switchTab({
                url: "/pages/index/index"
              })
            }
          }
        })
      }
      this.myData = res.data
      this.taskList = res.data.taskList
    })
  }
}
</script>
  
<style lang="scss">
page {
  background-color: #ff482e;
}

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


}

.topBanner {
  width: 750rpx;
  height: 516rpx;
  background-size: 100% 100%;
  position: relative;

  image {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
  }

  // background-image: url("@/static/act/forumDraw/topBanner.png");
}

.pageBack {
  width: 750rpx;
  position: absolute;
  top: 0rpx;
  background-size: 100% 100%;
  background-image: url("@/static/act/ibDraw/back.png");
  height: 1512rpx;
}

.machineContainer {
  width: 750rpx;
  height: 1121rpx;
  background-size: 100% 100%;
  background-image: url("@/static/act/ibDraw/machine.png");
  position: relative;
  margin-top: -17rpx;
  display: flex;
  flex-direction: column;
  align-items: center;

  .noticContainer {
    width: 358rpx;
    height: 46rpx;
    box-sizing: border-box;
    // height: 100rpx;
    // margin-left: 38rpx;
    display: flex;
    align-items: center;
    background-size: 100% 100%;
    position: absolute;
    top: 8rpx;
    left: 250rpx;
    background-image: url("@/static/act/ibDraw/noticContainer.png");
  }

  .luckyNum {
    font-size: 26rpx;
    
    font-weight: 500;
    color: #FCF1E3;
    margin-top: 238rpx;
  }

  .drawButton {
    background-size: 100% 100%;
    background-image: url("@/static/act/ibDraw/button.png");
    width: 453rpx;
    height: 145rpx;
    position: absolute;
    bottom: 104rpx;
    left: 0;
    right: 0;
    margin: auto;
  }
}

.tagContainer {
  align-items: center;
  // width: 640rpx;
  padding: 0 158rpx;
  justify-content: space-between;
  width: 750rpx;
  box-sizing: border-box;
  position: relative;
  padding-bottom: 24rpx;

  .tag {
    // width: 50%;
    // text-align: center;
    font-size: 34rpx;
    
    font-weight: bold;
    color: #F8D6B7;
    text-shadow: 1rpx 2rpx 4rpx rgba(48, 20, 6, 0.76);
  }

  .tagSelect {
    font-size: 34rpx;
    
    font-weight: bold;
    color: #FFEF68;
    text-shadow: 1rpx 2rpx 4rpx rgba(48, 20, 6, 0.76);
  }

  .triangle {
    width: 16rpx;
    height: 14rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/ibDraw/triangle.png");
    position: absolute;
    bottom: 0;
    transform: translateX(64rpx);
    transition: transform 0.3s;
  }

  .triangle_right {
    transform: translateX(364rpx);
  }
}

.cardContainer {
  width: 716rpx;
  // height: 614rpx;
  border: 4rpx solid #ff6a55;
  background-color: #303030;
  border-radius: 30rpx;
  padding-bottom: 24rpx;

  .rankContainer {
    width: 100%;
    padding: 0 36rpx;
    box-sizing: border-box;

    .myRank {
      align-items: center;
      justify-content: space-between;
      margin-top: 56rpx;
      padding-bottom: 34rpx;
      border-bottom: 1rpx solid #5E5E5E;

      .left,
      .right {
        font-size: 24rpx;
        
        font-weight: 400;
        color: #F8D6B7;
      }
    }

    .rank_th {
      display: flex;
      align-items: center;
      margin-top: 24rpx;

      &_num {
        width: 42rpx;
        text-align: center;
        height: 38rpx;
        background-size: 100% 100%;
        font-size: 34rpx;
        font-family: Impact;
        font-weight: 400;
        color: #F8D6B7;
        margin-right: 18rpx;
      }

      &_num1 {
        background-image: url("@/static/act/ibDraw/1.png");
      }

      &_num2 {
        background-image: url("@/static/act/ibDraw/2.png");
      }

      &_num3 {
        background-image: url("@/static/act/ibDraw/3.png");
      }

      &_avatar {
        width: 46rpx;
        height: 46rpx;
        border-radius: 50%;
        margin-right: 18rpx;
      }

      &_name {
        width: 90rpx;
        font-size: 24rpx;
        
        font-weight: 400;
        color: #F8D6B7;
        margin-right: 28rpx;
        white-space: nowrap;
      }

      &_point {
        font-size: 24rpx;
        
        font-weight: 400;
        color: #F93042;
        flex: 1;
      }

      &_awardName {
        font-size: 24rpx;
        
        font-weight: 400;
        color: #F8D6B7;
      }
    }
  }

  .taskContainer {
    width: 100%;
    padding: 0 36rpx;
    box-sizing: border-box;
    padding-top: 16rpx;



    .taskItem {
      display: flex;
      margin-top: 42rpx;
      padding-bottom: 40rpx;
      border-bottom: 1rpx solid #5E5E5E;
      justify-content: space-between;
      align-items: center;

      .left {
        .title {
          margin-bottom: 30rpx;
          font-size: 24rpx;
          
          font-weight: bold;
          color: #F8D6B7;
        }

        .progress_text {
          display: flex;
          align-items: center;
          margin-bottom: 13rpx;

          &_one,
          &_two,
          &_three {
            font-size: 20rpx;
            
            font-weight: 400;
            color: #A88566;
          }

          &_one {
            margin-right: 14rpx;
          }

          &_two {
            flex: 1;

            text {
              color: #FA1545;
            }
          }
        }

        .progress_wrap {
          width: 457rpx;
          height: 8rpx;
          background: linear-gradient(90deg, #FA1545 0%, #FA5015 100%);
          position: relative;
          display: flex;
          justify-content: flex-end;

          &_hide {
            height: 8rpx;
            width: 30%;
            background-color: #ffffff;
          }
        }
      }

      .right {
        position: relative;
        width: 140rpx;

        .btn {
          width: 140rpx;
          height: 48rpx;
          background-color: #FA1545;
          border-radius: 4rpx;
          font-size: 22rpx;
          
          font-weight: 400;
          color: #F8D6B7;
          transition: background-color 0.3s;
        }

        .btn_dis {
          width: 140rpx;
          height: 48rpx;
          background-color: #C26B6B;
        }

        .tips {
          font-size: 20rpx;
          
          font-weight: 400;
          color: #A88566;
          text-align: center;
          position: absolute;
          width: 140rpx;
          text-align: center;
          bottom: -40rpx;
        }
      }
    }

    .taskItem_noneborder {
      border: none;
    }
  }
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
  width: 520rpx;
  height: 476rpx;
  flex-wrap: wrap;
  grid-template-columns: repeat(3, 164rpx);
  grid-template-rows: repeat(3, 33.33%);
  grid-row-gap: 0rpx;
  justify-content: space-between;
  align-items: center;
  margin-top: 90rpx;
  z-index: 3;
  box-sizing: border-box;
  position: relative;
}

.drawBlock {
  width: 164rpx;
  height: 148rpx;
  border-radius: 14rpx;
  overflow: hidden;
  position: relative;
  transition: transform 0.2s linear;
  transform: scale(0.92);
  .innerShaow {
    width: 164rpx;
    height: 148rpx;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    box-shadow: inset 0px 0px 14rpx 6rpx rgba(1255, 72, 46, 0.8);
  }
}

.heightLight {
  transform: scale(1);
  border: 2rpx solid #ff482e;
  box-shadow: 0rpx 0rpx 21rpx 3rpx rgba(1255, 72, 46, 0.9);
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
}

.detailButton {
  font-size: 22rpx;
  
  font-weight: 400;
  color: #ffffff;
  width: 76rpx;
  height: 76rpx;
  background-color: rgba(255, 255, 255, 0.78);
  border-radius: 50%;

  view {
    font-size: 18rpx;
    
    font-weight: bold;
    color: #333333;
  }

  // background: #8254cf;
  // border-radius: 5rpx;
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
    
    color: #fff;
    margin-top: 8rpx;
  }
}

.fixButton {
  width: 750rpx;
  height: 135rpx;
  background: #FA1545;
  position: fixed;
  font-size: 40rpx;
  
  font-weight: bold;
  color: #FEFEFE;
  z-index: 10;
  bottom: 0;
}

.safeBottom {
  height: 150rpx;
  width: 750rpx;

}
</style>
  