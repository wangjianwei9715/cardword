<template>
  <view class="content">
    <view class="header" @click="onClickAddress">
      <view class="header-left">
        <view class="icon-address"></view>
        <view v-if="addressData != ''" class="header-address">
          <view class="address-desc"
            >{{ addressData.district }}{{ addressData.detail }}</view
          >
          <view class="address-name"
            >{{ addressData.name }}<text>{{ addressData.phone }}</text></view
          >
        </view>
        <view v-else class="header-address">
          <view class="address-tips">请选择收货地址</view>
        </view>
      </view>
      <button class="header-right">&#xe470;</button>
    </view>

    

    <view class="order-detail" v-if="goodsData.pic">
      <view class="goods-info">
        <image
          :src="getGoodsImg(decodeURIComponent(goodsData.pic.carousel))"
          style="width: 200rpx; height: 200rpx; padding: 16rpx; margin: 20rpx"
        ></image>
        <view class="goods-info2">
          <text class="goods-info2-title">{{ goodsData.title }}</text>
          <view class="goods-money-info" v-if="cartData == ''">
            <text class="goods-money">¥{{ goodsData.price }}</text>
            <view class="goods-money-right" v-if="baoduiId == 0">
              <view class="goods-money-right-header">
                {{
                  goodsData.buyLimit && goodsData.buyLimit.maxNumPerOrder > 0
                    ? "限购" + goodsData.buyLimit.maxNumPerOrder + "份"
                    : ""
                }}
              </view>
              <view class="goods-money-add">
                <view class="img-jian" @click="onClickCutDown()"></view>
                <input
                  class="money-add"
                  @input="onInputMoney"
                  v-model="moneyNum"
                  type="number"
                />
                <view class="img-add" @click="onClickAdd()"></view>
              </view>
            </view>
          </view>
          <view class="goods-money-info" v-else>
            <text class="goods-money">¥{{ cartData.amount }}</text>
            <view class="goods-money-right">
              <view class="goods-money-right-header"> </view>
              <view class="goods-money-add">
                <view class="goods-money-availa"
                  >共{{ cartData.available }}件</view
                >
              </view>
            </view>
          </view>
        </view>
      </view>
   
      <!-- 自选球队编号 -->
      <view class="yunfei-info check-team top-order" v-if="cartData != ''">
        <view class="item-title">已选编号</view>
        <view v-for="(item, index) in cartData.list" :key="item.id">
          <view class="yunfei-item" v-show="!item.soldOut && !item.lock">
            <text class="item-teamname">{{ index + 1 }}.{{ item.name }}</text>
            <text class="item-teamname">¥{{ item.price }}</text>
          </view>
        </view>
      </view>
      <!--  -->
    
      <!-- 包队编号 -->
      <view class="yunfei-info check-team top-order" v-if="baoduiName != ''">
        <view class="item-title">已选编号</view>
        <view>
          <view class="yunfei-item">
            <text class="item-teamname">1.{{ baoduiName }} 全队</text>
            <text class="item-teamname">¥{{ keepTwoDecimal(onePrice) }}</text>
          </view>
        </view>
      </view>
      <!--  -->

      <!-- 预测卡密 -->
      <!-- freeNum 免单次数  checkTeam 预测球队  guessList 球队列表  teamCheck 球队选择-->
      <confirmorderGuess v-if="getBitDisableGuess()"  :freeNum="freeNum>=moneyNum?(freeNum-moneyNum):0" :checkTeam="guessCheckTeam" :teamList="guessList" :lastGuess="lastGuess" @teamCheck="onClickGuessTeamCheck" @onScrolltolower="onScrolltolower" />
      <!-- 预测卡密 -->

      
      <view
        class="huo-dong-bg top-order"
        v-show="goodsData.discount && cartData.length == 0"
      >
        <text class="item-name">活动</text>
        <view
          class="item-youhui-bg"
          v-for="(item, index) in goodsData.discount"
          :key="index"
        >
          {{ item.content }}
        </view>
      </view>

      <!-- 普通商品金额 -->
      <view class="yunfei-info top-order" v-if="cartData == ''">
        <view class="yunfei-item">
          <text class="item-name">商品金额</text>
          <text class="item-name"
            >¥{{ keepTwoDecimal(goodsData.price * moneyNum) }}</text
          >
        </view>
        <view class="yunfei-item">
          <text class="item-name">优惠券</text>

          <view class="item-name" v-if="getBitDisableCoupon(goodsData.bit)">
            此商品优惠券不可用
          </view>
          <view class="item-name" v-else @click="onClickCheckCoupon">
            <text class="coupon-num">{{
              checkCouponPrice > 0 ? "-¥" + checkCouponPrice : couponNum
            }}</text
            >{{ checkCouponPrice > 0 ? "" : "张可用"
            }}<view class="item-name-right"></view>
          </view>
        </view>
        <view class="yunfei-item" v-show="freeNum > 0">
          <text class="item-name">免单优惠</text>
          <text class="item-name"
            >- ¥{{
              keepTwoDecimal(freeNum>=moneyNum?moneyNum * goodsData.price:freeNum * goodsData.price)
            }}</text
          >
        </view>
        <view class="yunfei-item" v-show="goodsData.price - onePrice > 0">
          <text class="item-name">优惠</text>
          <text class="item-name"
            >- ¥{{
              keepTwoDecimal(freeNum>0?(freeNum>=moneyNum?0:((moneyNum - freeNum) * (goodsData.price - onePrice))):(moneyNum * (goodsData.price - onePrice)))
            }}</text
          >
        </view>
        <view class="yunfei-item">
          <text class="item-name">运费</text>
          <text class="item-name">包邮</text>
        </view>
        <view class="cross-line"></view>
        <view class="yunfei-item">
          <text class="item-name"></text>
          <view class="heji-money">
            <text class="heji-text">合计:</text>
            <text class="heji-money2"
              >¥{{
                keepTwoDecimal(freeNum>0?(freeNum>=moneyNum?0:((moneyNum - freeNum)*(onePrice - couponTotalPrice))):(moneyNum * onePrice - couponTotalPrice))
              }}</text
            >
          </view>
        </view>
      </view>
      <!-- 自选球队金额 -->
      <view class="yunfei-info" v-if="cartData != ''">
        <view class="yunfei-item">
          <text class="item-name">商品金额</text>
          <text class="item-name">¥{{ cartData.amount }}</text>
        </view>
        <view class="yunfei-item">
          <text class="item-name">优惠券</text>
          <view class="item-name" v-if="getBitDisableCoupon(goodsData.bit)">
            此商品优惠券不可用
          </view>
          <view class="item-name" v-else @click="onClickCheckCoupon">
            <text class="coupon-num">{{
              checkCouponPrice > 0 ? "-¥" + checkCouponPrice : couponNum
            }}</text
            >{{ checkCouponPrice > 0 ? "" : "张可用"
            }}<view class="item-name-right"></view>
          </view>
        </view>
        <view class="yunfei-item">
          <text class="item-name">运费</text>
          <text class="item-name">包邮</text>
        </view>
        <view class="cross-line"></view>
        <view class="yunfei-item">
          <text class="item-name"></text>
          <view class="heji-money">
            <text class="heji-text">合计:</text>
            <text class="heji-money2"
              >¥{{ keepTwoDecimal(cartData.amount - couponTotalPrice) }}</text
            >
          </view>
        </view>
      </view>
      <!--  -->
      <view v-show="orderRich != 0" class="kami-title" >
        <view
          @click="setNoRichShow"
          class="kami-gx"
          :class="{ 'kami-check': orderRich == 1 }"
        ></view>
        开启卡密效果
      </view>

      <view class="bottom-gm">
        <view class="bottom-gm-title" @click="gmCheck = !gmCheck">
          <view
            class="bottom-gm-gx"
            :class="{ 'bottom-gm-check': gmCheck }"
          ></view>
          购买须知:
        </view>
        <view class="bottom-gm-tips">
          除拼团时限届满未满员外，所购商品因其商品属性及价值的特殊性，不支持退款、退货服务。本次拼团可能存在未中卡情形，请卡迷理性消费
        </view>
        <view class="bottom-gm-btn" @click="operationCardShow = true"
          >查看详情<view class="bottom-gm-right"></view
        ></view>
      </view>
      <view class="bottom-content-box">
        <view class="bottom-content">
          <view class="heji-money-pay">
            <text class="heji-text-b" style="color: #ff4349">合计:</text>
            <text class="heji-money2-b" style="color: #ff4349"
              >¥{{
                cartData == ""
                  ? (keepTwoDecimal(freeNum>0?(freeNum>=moneyNum?0:((moneyNum - freeNum)*(onePrice - couponTotalPrice))):(moneyNum * onePrice - couponTotalPrice)))
                  : keepTwoDecimal(cartData.amount - couponTotalPrice)
              }}</text
            >
          </view>
          <view class="btn-payment2" @click="onClickToPay()">去支付</view>
        </view>
      </view>
    </view>

    <cardplay
      :operationShow="operationCardShow"
      :operaType="3"
      @operacancel="onClickCardCancel"
    />
    <payment
      :showPayMent="showPayMent"
      :payChannel="payChannel"
      @cancelPay="onClickCancelPay"
      :payPrice="
        cartData == ''
          ? (keepTwoDecimal(freeNum>0?(freeNum>=moneyNum?0:((moneyNum - freeNum)*(onePrice - couponTotalPrice))):(moneyNum * onePrice - couponTotalPrice)))
          : keepTwoDecimal(cartData.amount - couponTotalPrice)
      "
      :countTime="countTime"
      @pay="onClickPayGoods"
    />

    <paymentCoupon
      :showPayMentCoupon="showPayMentCoupon"
      :couponList="couponList"
      @cancelCoupon="onClickcCancelCoupon"
      @couponConfirm="onClickCouponConfirm"
    />
  </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "../../base/BaseNode.vue";
import { getGoodsImg } from "../../tools/util";
@Component({})
export default class ClassName extends BaseNode {
  addressData: any = [];
  getGoodsImg = getGoodsImg;
  moneyNum = 1;
  goodsData: { [x: string]: any } = [];
  youhuiPrice = 0;
  onePrice = 0;
  cartData: any = [];
  gmCheck = true;
  operationCardShow = false;
  // 支付方式组件相关
  showPayMent = false;
  countTime = 0;
  maxNum = 0;

  // 优惠券组件相关
  couponNum = 0;
  couponList: any = [];
  showPayMentCoupon = false;
  checkCouponList: any = [];
  checkCouponPrice = 0;
  couponTotalPrice = 0;
  // 随机模式金额
  payRandomPrice = 0;
  couponNumNo = false;
  payChannel: any = [];
  baoduiId = 0;
  baoduiName = "";

  // 卡密效果开关
  orderRich = 0;
  // 预测卡密
  freeNum = 0;
  guessCheckTeam = 0;
  guessList:any = [];
  lastGuess = '';
  guessCurrentPage = 2;
  guessPageSize = 30;
  guessNoMoreData = false;
  onLoad(query: any) {
    if (query.data) {
      // #ifndef MP
      this.goodsData = JSON.parse(query.data);
      // #endif
      // #ifdef MP
      this.goodsData = JSON.parse(decodeURIComponent(query.data));
      // #endif
      this.payChannel = JSON.parse(query.payChannel);
      
      if (query.payRandomPrice) {
        this.payRandomPrice = query.payRandomPrice;
        this.goodsData.price = query.payRandomPrice;
      }
      if (query.baodui) {
        this.baoduiId = Number(query.baodui);
        this.goodsData.price = query.price;
        this.baoduiName = query.baoduiName;
      }
      if (query.cart) {
        this.cartData = JSON.parse(query.cart);
        console.log(this.cartData);
      }
      this.getOnePrice();
      this.maxNum =
        this.goodsData.totalNum -
        (this.goodsData.currentNum + this.goodsData.lockNum);

      this.getNoRichShow();
    }
    app.http.Get("me/delivery", {}, (res: any) => {
      if (res.list) {
        for (let i in res.list) {
          if (res.list[i].default) {
            this.addressData = res.list[i];
            return;
          }
        }
        if (this.addressData == "") {
          this.addressData = res.list[0];
        }
      }
    });
    this.onEventUI("addressSelect", (data) => {
      this.addressData = data.data;
    });
  }
  onInputMoney(event: any) {
    if (Number(event.detail.value) > this.maxNum) {
      console.log(this.maxNum);
      setTimeout(() => {
        this.moneyNum = this.maxNum;
      }, 100);
    }
    this.getOnePrice();
  }
  // 判断是否禁用优惠券
  getBitDisableCoupon(bit: any) {
    if ((bit & 1) == 1) {
      return true;
    } else {
      return false;
    }
  }
  // 是否开启预测球队
  getBitDisableGuess() {
    if ((this.goodsData.bit & 8) == 8) {
      return true;
    } else {
      return false;
    }
  }
  // 预测球队列表分页
  onScrolltolower(){
    if(this.guessNoMoreData){
      return
    }
    let params:{[x:string]:any} = {
      pageIndex: this.guessCurrentPage,
      pageSize:this.guessPageSize,
    }
    
    app.http.Get("me/order/guess/option/"+this.goodsData.goodCode, params, (data: any) => {
      if(data.totalPage<=this.guessCurrentPage){
        this.guessNoMoreData = true;
      }
      if(data.list){
        this.guessList = this.guessList.concat(data.list);
      }
      
      this.guessCurrentPage++;
    });
  }
  // 获取卡密效果开关
  getNoRichShow() {
    app.http.Get(
      "me/order/confirm/" + this.goodsData.goodCode,
      {},
      (res: any) => {
        if(res.data.guess){
          this.freeNum = res.data.guess.freeNoNum;
          this.guessList = res.data.guess.option.list;
          this.lastGuess = res.data.guess.lastGuess;
          this.guessNoMoreData = res.data.guess.option.totalPage>=2?false:true;
          console.log('guessList==',this.guessList)
        }
        this.orderRich = res.data.noRichShowState;
        if (this.orderRich != 0) {
          let orderRich = this.orderRich == 1 ? true : false;
          uni.setStorageSync("orderRich", orderRich);
        }
      }
    );
  }
  // 订单卡密效果开关
  setNoRichShow() {
    let open = this.orderRich == 1 ? false : true;
    app.http.Post("me/order/noRichShow/switch", { open: open }, (res: any) => {
      this.orderRich = open == true ? 1 : -1;
      uni.setStorageSync("orderRich", open);
    });
  }
  getOnePrice() {
    if (this.goodsData.discount) {
      if (this.moneyNum < this.goodsData.discount[0].minNum) {
        this.onePrice = this.goodsData.price;
      } else {
        for (let i in this.goodsData.discount) {
          if (this.moneyNum >= this.goodsData.discount[i].minNum) {
            this.onePrice = this.goodsData.discount[i].price;
          }
        }
      }
    } else {
      this.onePrice = this.goodsData.price;
    }

    if (this.getBitDisableCoupon(this.goodsData.bit) || this.couponNumNo) {
      return;
    }
    // 获取可用优惠券数量
    let params: any = {
      goodCode: this.goodsData.goodCode,
    };
    // 普通支付 || 自选球队
    if (this.baoduiId != 0) {
      params.price = this.goodsData.price;
    } else if (this.cartData == "") {
      params.num = Number(this.moneyNum);
      if (Number(this.moneyNum) <= 0) return;
      params.price = this.keepTwoDecimal(this.moneyNum * this.onePrice);
    } else {
      params.price = this.cartData.amount;
    }
    app.http.Get("me/coupon/condition/list", params, (res: any) => {
      // 可用优惠券发生变化 清空已选择的优惠券
      if (this.couponNum != 0 && this.couponNum != res.count) {
        this.checkCouponList = [];
        this.checkCouponPrice = 0;
        this.couponTotalPrice = 0;
      }
      this.couponNum = res.count;
      if (res.total == 0) {
        this.couponNumNo = true;
      }
      this.couponList = res.list ? res.list : [];
      this.getConditionPrice();
    });
  }
  onClickCutDown() {
    if (this.moneyNum > 1) {
      this.moneyNum--;
    } else {
      return;
    }
    this.getOnePrice();
  }

  onClickAdd() {
    if (this.moneyNum >= this.maxNum) {
      this.moneyNum = this.maxNum;
      return;
    } else {
      this.moneyNum++;
    }
    this.getOnePrice();
  }
  onClickAddress() {
    uni.navigateTo({
      url: "/pages/userinfo/setting_addresses?type=order",
    });
  }
  onClickToPay() {
    if (this.addressData == "") {
      uni.showToast({
        title: "请先选择地址",
        icon: "none",
      });
      return;
    }
    if (!this.gmCheck) {
      uni.showToast({
        title: "请先确认购买须知",
        icon: "none",
      });
      return;
    }
    let params: { [x: string]: any };
    // #ifdef MP
    params = {
      channel: "mini",
      delivery: this.addressData.id,
      num: Number(this.moneyNum),
    };
    uni.showLoading({
      title: "加载中",
    });
    app.http.Post(
      "good/topay/" + this.goodsData.goodCode,
      params,
      (res: any) => {
        uni.hideLoading();
        app.payment.paymentMini(res.wechat, (data: any) => {});
        uni.redirectTo({
          url: "/pages/userinfo/order_list",
        });
      }
    );

    // #endif
    // #ifndef MP
    this.showPayMent = true;

    // #endif
  }
  keepTwoDecimal(num: any) {
    var result = parseFloat(num);
    if (isNaN(result)) {
      alert("传递参数错误，请检查！");
      return false;
    }
    result = Math.round(num * 100) / 100;
    return result > 0 ? result : 0;
  }
  // 取消支付
  onClickCancelPay() {
    this.showPayMent = false;
    this.countTime = 0;
  }
  onClickPayGoods(data: any) {
    // 1：支付宝 2：微信
    if (data == "") {
      return;
    }
    uni.showLoading({
      title: "加载中",
    });
    let params: any = {
      channelId: data.channelId ? data.channelId : "",
      channel: data.channel,
      delivery: this.addressData.id,
    };
    let url = "good/topay/" + this.goodsData.goodCode;
    if(uni.getSystemInfoSync().platform === "android"){
      params.nativeSdk = 'qmf_android'
    }
    console.log(params)
    if (this.baoduiId != 0) {
      // 包队
      params.teamId = this.baoduiId;
      params.num = 1;
      url = "good/topay/" + this.goodsData.goodCode + "/select";
    } else if (this.cartData == "") {
      // 普通支付
      params.num = Number(this.moneyNum);
      if (this.payRandomPrice > 0) {
        url = "good/topay/" + this.goodsData.goodCode + "/select";
      }
    } else {
      // 自选球队
      let id = [];
      for (let i in this.cartData.list) {
        if (!this.cartData.list[i].soldOut && !this.cartData.list[i].lock) {
          id.push(this.cartData.list[i].noId);
        }
      }
      params.id = id;
      url = "good/topay/" + this.goodsData.goodCode + "/select";
    }

    // 是否使用优惠券
    if (this.checkCouponList != "") {
      params.couponIdList = this.checkCouponList;
    }

    app.http.Post(url, params, (res: any) => {
      // 预测球队
      if(this.getBitDisableGuess()){
        app.http.Post('me/order/guess/name/'+res.goodOrderCode,{name:this.guessList[this.guessCheckTeam].name})
      }
      uni.$emit('confirmorderPay')
      if(res.price<=0){
         uni.redirectTo({
            url:
              "/pages/userinfo/order_details?code=" +
              res.goodOrderCode +
                "&waitPay=true",
          });
      }else{
        if (data.channel == "alipay") {
          console.log("alipay==", res);
          if(res.appPayRequest){
            app.payment.paymentAlipayQmfSdk(JSON.stringify(res.appPayRequest));
          }else if (res.alipay.orderInfo != "") {
            app.payment.paymentAlipay(res.pay_type, res.alipay.orderInfo);
          }
          uni.hideLoading();
          uni.redirectTo({
            url:
              "/pages/userinfo/order_details?code=" +
              res.goodOrderCode +
              "&waitPay=true",
          });
        } else {
          if (res.wechat) {
            uni.hideLoading();
            app.payment.paymentWxpay(res.pay_type, res.wechat, () => {});
            uni.redirectTo({
              url:
                "/pages/userinfo/order_details?code=" +
                res.goodOrderCode +
                "&waitPay=true",
            });
          }
        }
      }
      
    });
  }
  onClickCardCancel() {
    this.operationCardShow = false;
  }
  // 选择优惠券
  onClickCheckCoupon() {
    if (this.couponNum > 0) {
      this.showPayMentCoupon = true;
    }
  }
  // 取消选择优惠券
  onClickcCancelCoupon() {
    this.showPayMentCoupon = false;
  }
  // 确认选择优惠券
  onClickCouponConfirm(data: any) {
    this.showPayMentCoupon = false;

    if (data == "") {
      return;
    }
    this.checkCouponList = data.list;
    this.checkCouponPrice = data.price;
    this.getConditionPrice();
  }
  getConditionPrice() {
    if (this.checkCouponList == "") {
      this.checkCouponList = [];
      this.checkCouponPrice = 0;
      this.couponTotalPrice = 0;
      return;
    }
    let price = 0;
    for (let i in this.checkCouponList) {
      for (let t in this.couponList) {
        if (this.checkCouponList[i] == this.couponList[t].id) {
          price += Number(this.couponList[t].amount);
        }
      }
    }
    this.couponTotalPrice = price;
  }

  // 预测球队
  onClickGuessTeamCheck(index:number){
    if(this.guessCheckTeam!=index){
      this.guessCheckTeam = index;
    }
  }
}
</script>

<style lang="scss">
$font-16: 16rpx;
$font-20: 20rpx;
$font-24: 24rpx;
$font-28: 28rpx;

page {
  background: $content-bg;
}
.content {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: calc(300rpx + env(safe-area-inset-bottom));
  padding: 13rpx
}
.order-detail {
  width: 100%;
  background: #fff;
}
.top-order{
  border-top: 20rpx solid $content-bg;
}
.header {
  width: 100%;
  height: 170rpx;
  background: #fff;
  box-sizing: border-box;
  padding: 0 20rpx;
  border-bottom: 14rpx solid #f5f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-left {
  width: 630rpx;
  height: 100rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.header-right {
  width: 72rpx;
  height: 72rpx;
  background-color: rgba(0, 0, 0, 0);
  font-family: uniicons;
  font-size: 48rpx;
  font-weight: normal;
  font-style: normal;
  line-height: 72rpx;
  color: #c4c3c8;
  margin: 0;
}
.icon-address {
  width: 32rpx;
  height: 38rpx;
  background: url(../../static/goods/icon_location.png) no-repeat center;
  background-size: 100% 100%;
  margin-right: 24rpx;
}
.header-address {
  width: 570rpx;
  height: 100rpx;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.address-desc {
  width: 100%;
  font-size: 28rpx;
  font-family: HYQiHei;
  font-weight: bold;
  color: #3b3b3b;
}
.address-name {
  width: 100%;
  font-size: 24rpx;
  font-family: HYQiHei;
  font-weight: bold;
  color: #3b3b3b;
}
.address-tips {
  height: 100rpx;
  line-height: 100rpx;
  font-size: 28rpx;
  font-family: HYQiHei;
  font-weight: bold;
  color: #3b3b3b;
}
.goods-info {
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
}

.goods-info2 {
  width: 478rpx;
  margin: 28rpx 0;
  display: flex;
  flex-direction: column;
  position: relative;
}

.goods-info2-title {
  margin-right: 30rpx;
  margin-left: 8rpx;
  font-size: $font-28;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #14151a;
  line-height: 40rpx;
}

.goods-money-info {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 10rpx;
  left: 0;
}

.goods-money {
  margin-left: 8rpx;
  margin-top: 58rpx;
  font-size: 28rpx;
  font-family: "DIN";
  font-weight: bold;
  color: #14151a;
  line-height: 28rpx;
}
.goods-money-right {
  width: 180rpx;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.goods-money-right-header {
  width: 100%;
  height: 50rpx;
  line-height: 50rpx;
  font-size: $font-24;
  color: #ff504f;
  text-align: center;
  padding-right: 12rpx;
  padding-left: 12rpx;
}
.goods-money-add {
  margin-right: 12rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.img-add {
  width: 48rpx;
  height: 48rpx;
  background: url(../../static/goods/icon_add_price.png) no-repeat center;
  background-size: cover;
}

.img-jian {
  width: 48rpx;
  height: 48rpx;
  background: url(../../static/goods/icon_jian_price.png) no-repeat center;
  background-size: cover;
}

.money-add {
  width: 66rpx;
  height: 48rpx;
  border: 2rpx solid #eeeeee;
  text-align: center;

  font-size: $font-24;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #14151a;
  line-height: 34rpx;
}

.huo-dong-bg {
  width: 100%;
  height: 72rpx;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
}

.item-name {
  font-size: $font-24;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #14151a;
  line-height: 34rpx;
  margin-left: 36rpx;
  display: flex;
  align-items: center;
}
.coupon-num {
  font-size: $font-24;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ff504f;
}
.item-name-right {
  width: 10rpx;
  height: 16rpx;
  background: url(../../static/goods/jinru@2x.png) no-repeat center;
  background-size: 100% 100%;
  margin-left: 6rpx;
}
.item-title {
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 600;
  color: #14151a;
  line-height: 34rpx;
  margin-left: 36rpx;
}
.item-teamname {
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 200;
  color: #14151a;
  line-height: 34rpx;
  margin-left: 36rpx;
}
.item-youhui-bg {
  text-align: center;
  line-height: 34rpx;
  margin-right: 16rpx;
  height: 34rpx;
  background: #ffffff;
  border: 1rpx solid #fb4e3e;
  border-radius: 3rpx;
  font-size: 20rpx;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #fb4e3e;
  padding: 0 11rpx;
  width: fit-content;
  display: inline-flex;
  margin-left: 10rpx;
}

.item-youhui-bg2 {
  width: 130rpx;
  height: 40rpx;
  background: url(../../static/goods/icon_discounts_bg2.png) no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: $font-20;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #14151a;
  line-height: 28rpx;
  margin-left: 16rpx;
}

.yunfei-info {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.yunfei-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 24rpx 36rpx 0 0;
}

.cross-line {
  width: 678rpx;
  height: 2rpx;
  background: #f1f1f4;
  margin: 24rpx 36rpx 0 36rpx;
}

.heji-money {
  display: flex;
  flex-direction: row;
  margin-bottom: 24rpx;
}

.heji-text {
  font-size: $font-20;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #14151a;
  line-height: 28rpx;
}

.heji-money2 {
  font-size: $font-24;
  font-family: "DIN";
  font-weight: bold;
  color: #14151a;
  line-height: 28rpx;
  margin-left: 12rpx;
}

.heji-text-b {
  font-size: 26rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #14151a;
  line-height: 28rpx;
}

.heji-money2-b {
  font-size: 40rpx;
  font-family: "DIN";
  font-weight: bold;
  color: #14151a;
  line-height: 28rpx;
  margin-left: 12rpx;
}
.bottom-gm {
  width: 100%;
  height: 180rpx;
  position: fixed;
  bottom: calc(112rpx + env(safe-area-inset-bottom));
  left: 0;
  background: #fbf2f3;
  box-sizing: border-box;
  padding: 20rpx 32rpx 0 32rpx;
  .bottom-gm-title {
    width: 100%;
    height: 40rpx;
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: #ff504f;
  }
  .bottom-gm-gx {
    width: 28rpx;
    height: 28rpx;
    background: url(../../static/userinfo/weixuan@2x.png) no-repeat center;
    background-size: 100% 100%;
    margin-right: 10rpx;
  }
  .bottom-gm-check {
    width: 28rpx;
    height: 28rpx;
    background: url(../../static/userinfo/pay_gou.png) no-repeat center;
    background-size: 100% 100%;
    margin-right: 10rpx;
  }
  .bottom-gm-tips {
    width: 100%;
    font-size: 22rpx;
    color: #ff504f;
    margin-top: 10rpx;
  }
  .bottom-gm-btn {
    position: absolute;
    right: 32rpx;
    bottom: 10rpx;
    font-size: 22rpx;
    color: #aaaaaa;
    display: flex;
    align-items: center;
  }
  .bottom-gm-right {
    width: 10rpx;
    height: 16rpx;
    background: url(../../static/goods/jinru@2x.png) no-repeat center;
    background-size: 100% 100%;
    margin-left: 6rpx;
  }
}
.bottom-content-box{
  width: 100%;
  height: calc(112rpx + env(safe-area-inset-bottom));
  position: fixed;
  bottom: 0;
  left:0;
  background: #ffffff;
}
.bottom-content {
  width: 100%;
  height: 112rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  
}

.heji-money-pay {
  margin-left: 36rpx;
}

.btn-payment {
  width: 360rpx;
  height: 88rpx;
  background: #cecfd3;
  border-radius: 4rpx;
  margin-right: 16rpx;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-28;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  line-height: 40rpx;
}

.btn-payment2 {
  width: 360rpx;
  height: 88rpx;
  background: #ff504f;
  border-radius: 44rpx;
  margin-right: 16rpx;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-28;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  line-height: 40rpx;
}
.goods-money-availa {
  font-size: 24rpx;
}
.check-team {
  box-sizing: border-box;
  padding: 20rpx 0;
}

.kami-title {
  width: 100%;
  height: 60rpx;
  display: flex;
  align-items: center;
  font-size: 26rpx;
  color: #000;
  box-sizing: border-box;
  padding:0 36rpx;
  background:$content-bg
}
.kami-gx {
  width: 28rpx;
  height: 28rpx;
  background: url(../../static/userinfo/weixuan@2x.png) no-repeat center;
  background-size: 100% 100%;
  margin-right: 10rpx;
}
.kami-check {
  width: 28rpx;
  height: 28rpx;
  background: url(../../static/userinfo/pay_gou.png) no-repeat center;
  background-size: 100% 100%;
  margin-right: 10rpx;
}
</style>
