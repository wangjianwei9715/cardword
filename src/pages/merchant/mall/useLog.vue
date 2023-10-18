<template>
  <view class="content">
    <view class="searchContainer topWhich">
      <view class="searchItem flexCenter" @click="onClickShowPicker('tpShow')">
        {{ leftText }}
        <u-icon name="arrow-down" style="margin-left: 6rpx" color="#000" size="24rpx"></u-icon>
      </view>
      <view class="searchItem flexCenter" @click="onClickShowPicker('stateShow')">
        {{ rightText }}
        <u-icon name="arrow-down" style="margin-left: 6rpx" color="#000" size="24rpx"></u-icon>
      </view>
    </view>
    <view class="fakerZw"></view>
    <view class="logWrap" v-for="(item, index) in awardList" :key="index">
      <view class="goodsInfoWrap">
        <muqian-lazyLoad class="img" borderRadius="3rpx" :src="cardImg[item.tp]"></muqian-lazyLoad>
        <view class="goodsInfoWrap_right">
          <view class="goodsInfoWrap_right_goodsName">
            <view class="name u-line-1">
              {{ item.tp==1 ? `广告卡` : `${item.weight}权重卡`}}{{item.hour+'小时 * '+item.num}}
            </view>
            <view class="state">{{
                logStateMap[String(item.logState)]
            }}</view>
          </view>
          <view class="goodsInfoWrap_right_exchangeTime">
            {{item.goodsCode!=""?`商品ID：${item.goodsCode}`:"用于商家主页"}}
          </view>
          <view class="goodsInfoWrap_right_price">
            开始结束时间{{ $u.timeFormat(item.failure_at,"mm-dd hh:MM") }}-{{ $u.timeFormat(item.effective_at,"mm-dd hh:MM") }}
          </view>
        </view>
      </view>
    </view>
    <empty v-if="!awardList.length" />
    <u-picker ref="goodTpShowPicker" keyName="label" @confirm="confirmSelect($event, 'tp')" :show="tpShow"
      :columns="goodTpOption" @close="tpShow = false" @cancel="tpShow = false"></u-picker>
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
import { mall } from '../constants/constants'
const goodTpOption = mall.useLog.tpOption;
const stateOption = mall.useLog.stateOption;
@Component({})
export default class ClassName extends BaseNode {
  pageJump = app.navigateTo.pageJump;
  dateFormatMSHMS: any = dateFormatMSHMS;
  logStateMap: any = mall.logStateMap;
  cardImg = mall.cardImg;
  queryParams: any = {
    pageIndex: 1,
    pageSize: 20,
    tp: 100,
    state: 100,
  };
  totalPage: number = 0;
  awardList: any = [];
  goodTpOption: any = [[], goodTpOption, []];
  tpShow: boolean = false;
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
      (item: any) => item.value == this.queryParams.tp
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
  toOrderDetail(item: any) {
    if (!item.code) return;
    uni.navigateTo({
      url: `/pages/mall/orderDetail?orderCode=${item.code}`,
    });
  }
  reqNewData(cb?: Function) {
    app.http.Get("dataApi/merchant/me/cards/useLog", this.queryParams, (res: any) => {
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
      display: flex;
      align-items: center;
      justify-content: center;
      color:#333333;
      font-size: 28rpx;
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
      font-size: 20rpx;
      font-family: PingFang SC;
      font-weight: 400;
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
