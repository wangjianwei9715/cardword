<template>
  <view class="content">
    <view class="searchContainer topWhich">
      <view class="searchItem flexCenter" @click="onClickShowPicker('goodTpShow')">
        {{ leftText }}
        <u-icon name="arrow-down" style="margin-left: 6rpx" color="#000" size="24rpx"></u-icon>
      </view>
      <view class="searchItem flexCenter" @click="onClickShowPicker('stateShow')">
        {{ rightText }}
        <u-icon name="arrow-down" style="margin-left: 6rpx" color="#000" size="24rpx"></u-icon>
      </view>
    </view>
    <view class="fakerZw"></view>
    <view class="logWrap" v-for="(item, index) in awardList" :key="index" @click="
  pageJump(`/pages/mall/orderDetail?orderCode=${item.code}&pay_tp=${item.pay_tp}`)
">
      <view class="goodsInfoWrap">
        <muqian-lazyLoad borderRadius="3rpx" @click.stop="onClickPreviewImage($parsePic(item.logo))"
          class="img" :src="$parsePic(item.logo)" />
        <view class="goodsInfoWrap_right">
          <view class="goodsInfoWrap_right_goodsName">
            <view class="name u-line-1">{{ item.name }}</view>
            <view class="state">{{
    item.status == 2
      ? mallStateMap[String(item.state)].tip
      : mallStatusMap[String(item.status)]
}}</view>
          </view>
          <view class="goodsInfoWrap_right_exchangeTime">{{
    dateFormatMSHMS(item.exchangeAt)
}}</view>
          <view class="goodsInfoWrap_right_price">{{ goodsPrice(item) }}</view>
        </view>
      </view>
      <view class="buttonWrap">
        <template v-if="item.status == 2 && item.goodTp == 2">
          <view class="normalButton flexCenter" @click.stop="onClickWuliu(item)">查看物流</view>
          <view class="normalButton redButton flexCenter" @click.stop="onClickConfirmReceipt(item)"
            v-if="item.state == 2">确认收货</view>
        </template>
      </view>
    </view>
    <empty v-if="!awardList.length" />
    <u-picker ref="goodTpShowPicker" keyName="label" @confirm="confirmSelect($event, 'goodTp')" :show="goodTpShow"
      :columns="goodTpOption" @close="goodTpShow = false" @cancel="goodTpShow = false"></u-picker>
    <u-picker ref="stateShowPicker" keyName="label" @confirm="confirmSelect($event, 'state')" :show="stateShow"
      :columns="stateOption" @close="stateShow = false" @cancel="stateShow = false"></u-picker>
    <logisticsPop :visible.sync="visible" :code="wuliuCode" />
  </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "@/base/BaseNode.vue";
import { dateFormatMSHMS } from "@/tools/util";
import { mallStateMap, mallStatusMap } from "@/tools/DataExchange";
import { mall } from '../constants/constants'
const goodTpOption = mall.exchange.goodTpOption;
const stateOption = mall.exchange.stateOption;
@Component({})
export default class ClassName extends BaseNode {
  dateFormatMSHMS: any = dateFormatMSHMS;
  mallStateMap: any = mallStateMap;
  mallStatusMap: any = mallStatusMap;
  queryParams: any = {
    pageIndex: 1,
    pageSize: 20,
    goodTp: 100,
    state: 100,
  };
  totalPage: number = 0;
  awardList: any = [];
  goodTpOption: any = [[], goodTpOption, []];
  goodTpShow: boolean = false;
  stateOption: any = [[], stateOption, []];
  stateShow: boolean = false;
  visible: boolean = false
  wuliuCode: string = ""
  onLoad(query: any) {
    this.reqNewData();
    this.onEventUI("mallOrderChange", (res: any) => {
      if (res.code) this.changeOrderDetail(res.code, res.orderDetail)
    });
  }
  onPullDownRefresh() {
    this.queryParams.pageIndex = 1;
    this.reqNewData(() => {
      setTimeout(() => {
        uni.stopPullDownRefresh();
      }, 500);
    });
  }
  onReachBottom() {
    if (this.queryParams.pageIndex < this.totalPage) {
      this.queryParams.pageIndex += 1;
      this.reqNewData();
    }
  }
  onShow() { }
  private get leftText() {
    const findItem: any = goodTpOption.find(
      (item: any) => item.value == this.queryParams.goodTp
    );
    return findItem.label;
  }
  private get rightText() {
    const findItem: any = stateOption.find(
      (item: any) => item.value == this.queryParams.state
    );
    return findItem.label;
  }
  changeOrderDetail(code: string, orderDetail: any) {
    const index: number = this.awardList.findIndex((item: any) => {
      return item.code == code
    })
    if (index == -1) return
    this.awardList[index].state = orderDetail.state
    this.awardList[index].status = orderDetail.status
  }
  goodsPrice(item: any) {
    return `${item.pay_tp == 2 ? `￥${item.money}+` : ""}${item.price}卡币`;
  }
  onClickShowPicker(key: string) {
    //@ts-ignore
    this[key] = true;
  }
  confirmSelect(event: any, key: string) {
    //@ts-ignore
    this[key + "Show"] = false;
    const item: any = event.value[1];
    if (this.queryParams[key] == item.value) return;
    this.queryParams[key] = item.value;
    uni.pageScrollTo({
      scrollTop: 0, //滚动的距离
      duration: 0, //过渡时间
    });
    this.queryParams.pageIndex = 1;
    this.reqNewData();
  }
  // 观看大图
  onClickPreviewImage(img: string) {
    uni.previewImage({
      urls: [img],
      current: 0,
      indicator: "number",
    });
  }
  pageJump(url: string) {
    uni.navigateTo({
      url,
    });
  }
  toOrderDetail(item: any) {
    if (!item.code) return;
    uni.navigateTo({
      url: `/pages/mall/orderDetail?orderCode=${item.code}`,
    });
  }
  setCopy(item: any) {
    if (item.goodTp !== 1) return;
    uni.setClipboardData({
      data: item.couponCode,
      success: (res: any) => {
        uni.showToast({
          title: "卷编号复制成功",
          duration: 2000,
        });
      },
    });
  }
  onClickConfirmReceipt(item: any) {
    uni.showModal({
      title: "提示",
      content: "确认收到货了吗?",
      success: (res: any) => {
        if (res.confirm) {
          app.http.Post(`point/exchange/order/receive/${item.code}`, {}, (res: any) => {
            item.state = 3;
          });
        }
      },
    });
  }
  onClickWuliu(item: any) {
    if (!item.wuliuCode) {
      uni.showToast({
        title: "暂未发货,请联系客服发货",
        icon: "none",
      });
      return;
    }
    this.wuliuCode = item.wuliuCode
    this.visible = true
  }
  reqNewData(cb?: Function) {
    app.http.Get("dataApi/point/exchange/myRecordlist", this.queryParams, (res: any) => {
      this.totalPage = res.totalPage;
      const reqList = res.list || [];
      this.queryParams.pageIndex == 1
        ? (this.awardList = reqList)
        : this.awardList.push(...reqList);
      cb && cb();
    });
  }
}
</script>

<style lang="scss">
page {
  font-family: PingFang SC;
  background-color: #f6f7fb;
}

.fakerZw {
  opacity: 0;
  height: 94rpx;
  margin-bottom: 14rpx;
}

.searchContainer {
  padding: 0 40rpx;
  width: 750rpx;
  height: 94rpx;
  background: #ffffff;
  position: fixed;
  top: 0rpx;
  z-index: 3;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  .searchItem {
    width: 50%;
    font-size: 27rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
  }
}

/* #ifndef APP-PLUS */
.topWhich {
  top: 88rpx;
}

/* #endif */
/* #ifdef APP-PLUS */
.topWhich {
  top: 0rpx;
}

/* #endif */

.logWrap {
  width: 710rpx;
  //   height: 281rpx;
  background: #ffffff;
  border-radius: 3rpx;
  box-sizing: border-box;
  padding: 25rpx 30rpx 34rpx 30rpx;
  margin-bottom: 14rpx;
  position: relative;
  .goodsInfoWrap {
    height: 133rpx;
    display: flex;

    .img {
      width: 173rpx;
      height: 133rpx;
      border-radius: 3rpx;
      margin-right: 27rpx;
    }
  }

  .goodsInfoWrap_right {
    display: flex;
    flex: 1;
    flex-direction: column;

    &_exchangeTime {
      flex: 1;
      font-size: 23rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #949494;
    }

    &_goodsName {
      display: flex;
      align-items: center;

      .name {
        flex: 1;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
      }

      .state {
        height:30rpx;
        background:#fa1545;
        position: absolute;
        right:0;
        top:0;
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color:#fff ;
        box-sizing: border-box;
        line-height: 30rpx;
        padding:0 15rpx;
        border-bottom-left-radius: 3rpx;
      }
    }

    &_price {
      font-size: 25rpx;
      font-family: PingFang SC;
      font-weight: 600;
      color: #fa1545;
    }
  }

  .buttonWrap {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .normalButton {
      margin-top: 34rpx;
      width: 205rpx;
      height: 54rpx;
      border: 2rpx solid rgba(148, 148, 148, 0.4);
      border-radius: 3rpx;
      font-size: 25rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      margin-left: 35rpx;
    }

    .redButton {
      color: #fff;
      background: #fa1545;
      border: 2rpx solid #fa1545;
    }
  }
}
</style>
