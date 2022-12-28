<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-12-19 14:15:54
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-12-22 11:44:47
 * @FilePath: \card-world\src\pages\mall\orderDetail.vue
 * @Description: 订单详情
-->
<template>
  <view class="content" v-if="orderDetail.code">
    <view class="pageTop">
      <view class="bigState">{{ topTip }}</view>
      <view class="smallTips" v-if="orderDetail.status == 1">订单将于{{ closeCountDown }}秒后关闭</view>
      <view class="smallTips" v-if="introduction">{{ introduction }}</view>
    </view>
    <view class="publickBlock goodsContainer">
      <image class="goodsImg" mode="aspectFill" :src="$parsePic(decodeURIComponent(orderDetail.logo))"></image>
      <view class="goodsRightInfo">
        <view class="goodsName">
          <view class="name u-line-2">{{ orderDetail.name }}</view>
          <view class="state">{{ userTip }}</view>
        </view>
        <view class="goodsPrice">
          <text class="symbol" v-if="pay_tp == 2">￥</text>
          <!-- 5555+99999999卡币 -->
          {{
            pay_tp == 2
              ? `${orderDetail.payMoney}+${orderDetail.point}卡币`
              : `${orderDetail.point}卡币`
          }}
        </view>
      </view>
    </view>
    <view class="publickBlock priceContainer" v-if="pay_tp == 2">
      <view class="priceItem">
        <view>商品金额</view>
        <view>￥{{ orderDetail.payMoney }}</view>
      </view>
      <view class="priceItem">
        <view>运费</view>
        <view>包邮</view>
      </view>
      <view class="priceItem">
        <view>合计</view>
        <view>{{ `￥${orderDetail.payMoney}+${orderDetail.point}卡币` }}</view>
      </view>
    </view>
    <!-- @click="onClickChangeAddress" -->
    <view class="publickBlock addressContainer" v-if="orderDetail.goodTp == 2">
      <view class="addressIcon"></view>
      <view class="addressInfo">
        <template>
          <view class="addressInfo_lineone">{{ orderDetail.receiver.name }} {{ orderDetail.receiver.phone }}</view>
          <view class="addressInfo_linetwo">{{ orderDetail.receiver.address }}</view>
        </template>
      </view>
      <!-- <view class="dotRight"></view> -->
    </view>
    <view class="publickBlock priceContainer" :class="{ payInfoContainer: orderDetail.goodTp == 2 }">
      <view class="priceItem">
        <view>订单编号</view>
        <view>{{ orderCode }}</view>
      </view>
      <view class="priceItem">
        <view>支付方式</view>
        <view>{{ pay_tp == 1 ? "卡币支付" : "支付宝" }}</view>
      </view>
      <view class="priceItem">
        <view>创建时间</view>
        <view style="color: #949494">{{
          $u.timeFormat(orderDetail.created_at, "yyyy-mm-dd hh:MM:ss")
        }}</view>
      </view>
      <view class="priceItem" v-if="orderDetail.goodTp == 2">
        <view>发货时间</view>
        <view style="color: #949494">{{
          orderDetail.deliver_at > 0
            ? $u.timeFormat(orderDetail.deliver_at, "yyyy-mm-dd hh:MM:ss")
            : "-"
        }}</view>
      </view>
    </view>
    <view class="bottomFixedPay">
      <view class="payContainer">
        <template v-if="orderDetail.status == 1 && pay_tp == 2">
          <view class="exchangeButton flexCenter" @click="cancelOrderHandle">取消订单</view>
          <view class="exchangeButton exchangeButton_red flexCenter" @click="showPayMent = true">立即支付</view>
        </template>
        <template v-if="orderDetail.status == 2 && orderDetail.goodTp == 2">
          <view class="exchangeButton flexCenter" @click="onClickWuliu">查看物流</view>
          <view v-if="orderDetail.state == 2" class="exchangeButton exchangeButton_red flexCenter" @click="confirmReceipt">确认收货</view>
        </template>
      </view>
      <view class="bottomSafeArea"></view>
    </view>
    <payment :showPayMent="showPayMent" :payChannel="mallPayChannel" @cancelPay="showPayMent = false" :payPrice="orderDetail.payMoney" :countTime="closeCountDown < 0 ? 0 : closeCountDown" @pay="onClickPayGoods" />
    <logisticsPop :visible.sync="visible" :code="orderDetail.wuliuCode" />
  </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "@/base/BaseNode.vue";
import { mallStatusMap, mallStateMap } from "@/tools/DataExchange";
const mallPayChannel: any = [
  {
    android: true,
    channel: "alipay",
    channelId: 1702,
    ios: true,
    name: "支付宝支付",
  },
  {
    android: true,
    channel: "alipay_h5",
    channelId: 1704,
    ios: true,
    name: "支付宝H5支付",
  },
];
@Component({})
export default class ClassName extends BaseNode {
  orderCode: string = "";
  orderDetail: any = {};
  pay_tp: number = 1;
  mallStatusMap: any = mallStatusMap;
  mallStateMap: any = mallStateMap;
  nowTimeStamp: any = Math.round(+new Date() / 1000);
  stampTimer: any = null;
  showPayMent: boolean = false;
  mallPayChannel: any = mallPayChannel;
  visible:boolean=false
  onLoad(query: any) {
    this.orderCode = query.orderCode;
    this.pay_tp = +query.pay_tp;
  }
  onShow() {
    this.reqNewData();
    this.startStampTimer();
  }
  onHide() {
    this.stampTimer && clearInterval(this.stampTimer);
  }
  private get closeCountDown() {
    const num: number = this.orderDetail.payExpire_at - this.nowTimeStamp;
    if (num <= 0 && this.orderDetail.status == 1) this.orderDetail.status = -1;
    return num;
  }
  private get topTip() {
    return this.orderDetail.status == 2
      ? mallStateMap[String(this.orderDetail.state)].tip
      : mallStatusMap[String(this.orderDetail.status)];
  }
  private get userTip() {
    if (this.orderDetail.goodTp != 2 && this.pay_tp == 1) return "已完成";
    return this.orderDetail.status == 2
      ? mallStateMap[String(this.orderDetail.state)].userTip
      : mallStatusMap[String(this.orderDetail.status)];
  }
  private get introduction() {
    if (this.orderDetail.status != 2) return "";
    return this.mallStateMap[String(this.orderDetail.state)].introduction;
  }
  onUnload() {
    this.stampTimer && clearInterval(this.stampTimer);
    uni.$emit("mallOrderChange", {
      code: this.orderCode,
      orderDetail: this.orderDetail,
    });
  }
  startStampTimer() {
    this.stampTimer && clearInterval(this.stampTimer);
    this.nowTimeStamp = Math.round(+new Date() / 1000);
    this.stampTimer = setInterval(() => {
      this.nowTimeStamp = Math.round(+new Date() / 1000);
    }, 1000);
  }
  cancelOrderHandle() {
    uni.showModal({
      title: "提示",
      content: "确认取消订单?",
      success: (res: any) => {
        if (res.confirm) this.cancelOrder();
      },
    });
  }
  onClickWuliu() {
    if (!this.orderDetail.wuliuCode) {
      uni.showToast({
        title: "暂未发货,请联系客服发货",
        icon: "none",
      });
      return;
    }
    this.visible=true
    // uni.navigateTo({
    //   url: "/pages/userinfo/order_logistics?code=" + this.orderDetail.wuliuCode,
    // });
  }
  confirmReceipt() {
    uni.showModal({
      title: "提示",
      content: "确认收到货了吗?",
      success: (res: any) => {
        if (res.confirm) this.receiptAction();
      },
    });
  }
  onClickPayGoods(event: any) {
    if (this.orderDetail.status == -1) {
      uni.showToast({
        title: "订单已超时",
        icon: "none",
      });
      this.showPayMent = false;
      return;
    }
    //进入创建支付订单流程
    this.onClickPay(event.channel == "alipay" ? "default" : event.channel);
  }
  onClickPay(channel?: string) {
    uni.showLoading({
      title: "",
    });
    app.http.Post(
      `point/order/toBuy/${this.orderCode}`,
      {
        channel,
        deliveryId: this.orderDetail.deliveryId,
      },
      (res: any) => {
        uni.hideLoading();
        this.showPayMent = false;
        //订单创建成功跳转支付宝支付
        app.payment.paymentAlipay(res.sdk, res.alipay.orderInfo, res.orderCode);
        this.reqNewData();
      }
    );
  }
  receiptAction() {
    app.http.Post(
      `point/exchange/order/receive/${this.orderCode}`,
      {},
      (res: any) => {
        this.orderDetail.state = 3;
        this.reqNewData();
      }
    );
  }
  cancelOrder() {
    app.http.Post(
      `point/exchange/order/cancel/${this.orderCode}`,
      {},
      (res: any) => {
        this.orderDetail.status = -2;
        this.reqNewData();
      }
    );
  }
  reqNewData(cb?: any) {
    app.http.Get(
      `dataApi/point/order/detail/${this.orderCode}`,
      {},
      (res: any) => {
        this.orderDetail = res.data;
      }
    );
  }
}
</script>

<style lang="scss">
page {
  background-color: #f6f7fb;
}
.pageTop {
  box-sizing: border-box;
  padding: 0 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 750rpx;
  height: 158rpx;
  background-size: 100% 100%;
  background-image: url("@/static/mall/orderTop.png");

  .bigState {
    font-size: 33rpx;
    font-family: PingFang SC;
    font-weight: 600;
    color: #ffffff;
  }
  .smallTips {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
}
.publickBlock {
  width: 710rpx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 3rpx;
  margin-top: 14rpx;
}

.goodsContainer {
  padding: 25rpx 30rpx 30rpx 30rpx;
  display: flex;
  align-items: center;

  .goodsImg {
    width: 173rpx;
    height: 133rpx;
    border-radius: 3rpx;
  }

  .goodsRightInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 133rpx;
    margin-left: 27rpx;
    flex: 1;

    .goodsName {
      font-size: 25rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      display: flex;
      .name {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        flex: 1;
      }
      .state {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #fa1545;
        margin-left: 10rpx;
      }
    }

    .goodsPrice {
      font-size: 29rpx;
      font-family: PingFang SC;
      font-weight: 600;
      color: #333333;

      .symbol {
        font-size: 21rpx;
      }
    }
  }
}
.priceContainer {
  padding: 35rpx 30rpx 36rpx 33rpx;
  display: flex;
  height: 195rpx;
  justify-content: space-between;
  flex-direction: column;
  .priceItem {
    display: flex;
    justify-content: space-between;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
  }
}
.payInfoContainer {
  height: 244rpx;
}
.addressContainer {
  height: 140rpx;
  padding: 34rpx 34rpx 36rpx 30rpx;
  display: flex;
  align-items: center;

  .addressIcon {
    background-size: 100% 100%;
    background-image: url("@/static/mall/address.png");
    width: 50rpx;
    height: 65rpx;
  }

  .addressInfo {
    flex: 1;
    margin-left: 22rpx;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    &_lineone {
      font-size: 29rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
    }

    &_linetwo {
      font-size: 25rpx;
      color: #999999;
      font-family: PingFang SC;
      font-weight: 400;
    }
  }

  .dotRight {
    background-size: 100% 100%;
    background-image: url("@/static/mall/dotRight_pay.png");
    width: 21rpx;
    height: 29rpx;
  }
}
.bottomFixedPay {
  width: 750rpx;
  position: fixed;
  bottom: 0;
  background-color: #fff;

  .payContainer {
    display: flex;
    box-sizing: border-box;
    width: inherit;
    // height: 130rpx;
    align-items: center;
    padding: 0 34rpx 0 34rpx;
    justify-content: space-between;
    .exchangeButton {
      margin: 20rpx 0;
      width: 311rpx;
      height: 83rpx;
      border: 2rpx solid rgba(148, 148, 148, 0.4);
      font-size: 33rpx;
      font-family: PingFang SC;
      font-weight: 600;
      color: #333333;
      border-radius: 3rpx;
      letter-spacing: 4rpx;
    }
    .exchangeButton_red {
      background: #e53b4b;
      border: 2rpx solid #e53b4b;
      color: #fff;
    }
  }
}
</style>
