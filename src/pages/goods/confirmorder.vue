<template>
  <view class="content">
    <view class="header" @click="onClickAddress">
      <view class="header-left">
        <view class="icon-address"></view>
        <view v-if="addressData != ''" class="header-address">
          <view class="address-desc" >{{ addressData.name }}{{ addressData.phone }}</view >
          <view class="address-name" >{{ addressData.district }}{{ addressData.detail }}</view >
        </view>
        <view v-else class="header-address">
          <view class="address-tips">请选择收货地址</view>
        </view>
      </view>
      <button class="header-right">&#xe470;</button>
      <image class="header-order-line"  src="../../static/goods/v2/buy.png" />
    </view>

    <view class="order-detail" v-if="goodsData.pic">
      <view class="goods-info">
        <image  class="goods-info-logo" :src="$parsePic(getGoodsImg(decodeURIComponent(goodsData.pic.carousel)))" mode="aspectFill"/>
        <view class="goods-info2">
          <text class="goods-info2-title">{{ goodsData.title }}</text>
          <view class="goods-money-info" v-if="cartData == '' && payRandomTeamData == ''">
            <view class="goods-money">¥<text>{{ goodsData.price }}</text></view>
            <view class="goods-money-right" v-if="baoduiId == 0">
              <view class="goods-money-right-header"> {{  goodsData.buyLimit && goodsData.buyLimit.maxNumPerOrder > 0 ? "限购" + goodsData.buyLimit.maxNumPerOrder + "份" : "" }} </view>
              <view class="goods-money-add">
                <view class="goods-money-max" v-if="payRandomTeamData != ''" @click="moneyNum = maxNum">MAX</view>
                <view class="num-box" @click="onClickCutDown()">  <view class="img-jian" ></view> </view>
                <input class="money-add" @input="onInputMoney" v-model="moneyNum" type="number" />
                <view class="num-box" @click="onClickAdd()"> <view class="img-add" ></view> </view>
              </view>
            </view>
          </view>
          <view class="goods-money-info" v-else>
            <view class="goods-money" v-if="payRandomTeamData==''">¥<text>{{ cartData.amount }}</text></view>
            <view class="goods-money select-team-title" v-else>{{getGoodsPintuan(goodsData.pintuan_type)}}</view>
            <view class="goods-money-right" v-if="payRandomTeamData == ''">
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
      <scroll-view class="huo-dong-bg" :scroll-x="true" v-show="goodsData.discount && cartData.length == 0" >
        <view
          class="item-youhui-bg"
          v-for="(item, index) in goodsData.discount"
          :key="index"
          :class="{'current-discount':(moneyNum>=item.minNum)&&(goodsData.discount[index+1]?(moneyNum>=goodsData.discount[index+1].minNum?false:true):true)}"
        >
          {{ item.content }}
        </view>
      </scroll-view>
      <!-- 选队随机 自选卡种 -->
      <view class="randomh-box" v-show="payRandomTeamData!=''" >
        <view class="randomh-index" v-for="(item,index) in payRandomTeamData" :key="index">
          <view class="randomh-index-left">
            <view class="randomh-name">{{item.name}}</view>
            <view class="randomh-price">￥{{item.price}}</view>
          </view>
          <view class="randomh-index-right">
            <view class="randohm-max" @click="onClickRandomMax(item)">MAX</view>
            <view class="randomh-num-box">
              <view class="randomh-num-btn" @click="onClickRandomNum(item,'reduce')">
                <image class="icon-randomReduce" src="../../static/pay/v2/icon_reduce_.png" />
              </view>
              <input class="randomh-num" v-model="item.num" @input="onInputMoneyRandom($event,item)" />
              <view class="randomh-num-btn" @click="onClickRandomNum(item,'add')">
                <image class="icon-randomAdd" src="../../static/pay/v2/icon_add_.png" />
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
      <view class="yunfei-info top-order" >
        <view class="yunfei-item">
          <text class="item-name">商品金额</text>
          <!-- cartData 自选商品  -->
          <text class="item-name" v-if="cartData != ''">¥{{ cartData.amount }}</text>
          <text class="item-name" v-else-if="payRandomTeamData!=''">¥{{ keepTwoDecimal(getRandomTotalPrice()) }}</text>
          <text class="item-name" v-else>¥{{ keepTwoDecimal(goodsData.price * moneyNum) }}</text>
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
        <view class="yunfei-item" v-show="cartData == ''&&(goodsData.price - onePrice > 0)">
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
        <view class="yunfei-item">
          <text class="item-name">合计:</text>
          <view class="item-name">¥<view class="item-totalprice">{{getTotalPrice()}}</view></view>
        </view>
        
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
          除拼团时限届满未满员外，所购商品因其商品属及价值特性，不支持退款、退货服务。本次拼团可能存在未中卡情形，请卡迷理解
          <view class="bottom-gm-btn" @click="operationCardShow = true">查看详情<text>《购买须知》</text></view>
        </view>
      </view>
      
      <view v-show="(goodsData.bit&32) == 32" class="kami-title" >
        <view
          @click="cuokaSet(!cuokaOpne)"
          class="kami-gx"
          :class="{ 'kami-check': cuokaOpne}"
        ></view>
        商家代搓
      </view>
      
      <view class="bottom-content-box">
        <view class="bottom-content">
          <view class="heji-money-pay">
            <text class="heji-text-b">合计:</text>
            <view class="heji-money2-b">¥<text>{{getTotalPrice()}}</text></view>
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
      :payPrice="getTotalPrice()"
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
import { getGoodsPintuan } from "@/tools/switchUtil";
import { Component } from "vue-property-decorator";
import BaseNode from "../../base/BaseNode.vue";
import { getGoodsImg } from "../../tools/util";
@Component({})
export default class ClassName extends BaseNode {
  getGoodsPintuan = getGoodsPintuan;
  addressData: any = [];
  getGoodsImg = getGoodsImg;
  moneyNum = 1;
  goodsData: { [x: string]: any } = [];
  onePrice = 0;
  cartData: any = [];
  gmCheck = false;
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

  // 预测卡密
  freeNum = 0;
  guessCheckTeam = 0;
  guessList:any = [];
  lastGuess = '';
  guessCurrentPage = 2;
  guessPageSize = 30;
  guessNoMoreData = false;
  selectRanId = 0;
  payRandomTeamData:any = [];
  // 代搓卡
  cuokaOpne = false;
  AD_id=null
  onLoad(query: any) {
    if (query.data) {
      this.AD_id = query.AD_id || null;
      this.goodsData = JSON.parse(query.data);
      this.payChannel = JSON.parse(query.payChannel);
      // 剩余随机
      if (query.payRandomPrice) {
        this.payRandomPrice = query.payRandomPrice;
        this.goodsData.price = query.payRandomPrice;
      }
      // 包队
      if (query.baodui) {
        this.baoduiId = Number(query.baodui);
        this.goodsData.price = query.price;
        this.baoduiName = query.baoduiName;
      }
      // 购物车
      if (query.cart) {
        this.cartData = JSON.parse(query.cart);
      }
      // 选队随机
      if(query.payRandomTeam){
        this.payRandomTeamData = JSON.parse(query.payRandomTeam)
      }
      if(query.selectRanId){
        this.selectRanId = Number(query.selectRanId)
      }
      this.getOnePrice();
      
      this.maxNum =  this.goodsData.totalNum -(this.goodsData.currentNum + this.goodsData.lockNum);

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
      setTimeout(() => {
        this.moneyNum = this.maxNum;
        this.getOnePrice();
      }, 100);
    }else{
      this.getOnePrice();
    }
  }
  onClickRandomMax(item:any){
    item.num = item.maxNum;
    this.getOnePrice();
  }
  onClickRandomNum(item:any,type:string){
    if( type == 'add' ){
      item.num = item.num >= item.maxNum ? item.maxNum : item.num+1
    }else{
      item.num = item.num > 1 ? item.num-1 : 1
    }
    this.getOnePrice();
  }
  onInputMoneyRandom(event:any,item:any){
    if (Number(event.detail.value) > item.maxNum) {
      setTimeout(() => {
        item.num = item.maxNum;
        this.getOnePrice();
      }, 100);
    }else{
      this.getOnePrice();
    }
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
        }
        if(res.data.cuokaState){
          this.cuokaOpne = res.data.cuokaState == 1 ? true : false
        }
        if(res.data.cuokaWindow){
          uni.showModal({
            title: '提示',
            content: '是否由商家代搓卡密？(商家搓完后显示卡密)',
            success: (res)=> {
              this.cuokaSet(res.confirm)
            }
          });
        }
      }
    );
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
    if (this.baoduiId != 0 ) {
      params.price = this.goodsData.price;
    } else if (this.payRandomTeamData != '') {
      params.num = 1;
      params.price = this.keepTwoDecimal(this.getRandomTotalPrice())
    } else if (this.cartData != "") {
      params.price = this.cartData.amount;
    } else if(this.selectRanId!=0){
      params.num = 1;
      params.price = this.keepTwoDecimal(this.moneyNum * this.onePrice)
    } else {
      params.num = Number(this.moneyNum);
      if (Number(this.moneyNum) <= 0) return;
      params.price = this.keepTwoDecimal(this.moneyNum * this.onePrice)
    }
    if(params.price<=0) return;
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
  getTotalPrice(){
    let price:any = 0;
    if(this.cartData != ''){
      price = this.keepTwoDecimal(this.cartData.amount - this.couponTotalPrice)
    }else if(this.payRandomTeamData!=''){
      price = this.keepTwoDecimal(this.getRandomTotalPrice() - this.couponTotalPrice)
    }else{
      price = this.keepTwoDecimal(this.freeNum>0?(this.freeNum>=this.moneyNum?0:((this.moneyNum - this.freeNum)*(this.onePrice )- this.couponTotalPrice)):(this.moneyNum * this.onePrice - this.couponTotalPrice))
    }
    return price
  }
  getRandomTotalPrice(){
    let priceData = this.payRandomTeamData.map((x:any)=>{
      return x.price * x.num;
    })
    let price = eval(priceData.join("+"));
    return price
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
    this.showPayMent = true;
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
    if (data == "") return;
    uni.showLoading({ title: "加载中"});
    const goodCode = this.goodsData.goodCode;
    let params: any = {
      channelId: data.channelId ?? "",
      channel: data.channel,
      delivery: this.addressData.id,
    };
    let url = `good/topay/${goodCode}`;
    if(this.baoduiId != 0||this.cartData != ""||this.payRandomPrice>0){
      url = `good/topay/${goodCode}/select`;
    }
    if(uni.getSystemInfoSync().platform === "android"){
      params.nativeSdk = 'qmf_android'
    }
    if (this.baoduiId != 0) {
      // 包队
      params.teamId = this.baoduiId;
      params.num = 1;
    } else if (this.cartData != "") {
      // 自选球队
      params.id = this.cartData.list.map((x:any)=>{
        if(!x.soldOut && !x.lock) return x.noId
      });
    } else if (this.payRandomTeamData != '') {
      params.list = this.payRandomTeamData.map((x:any)=>{
        return { id:x.id, num:Number(x.num) }
      })
      url = `good/topay/${goodCode}/optional`;
    } else {
      // 普通支付
      if(this.selectRanId!=0) params.teamId = this.selectRanId;
      params.num = Number(this.moneyNum);
    }
    // 是否使用优惠券
    if (this.checkCouponList != "") {
      params.couponIdList = this.checkCouponList;
    }
    this.postPay(url,params,data)
    
  }
  postPay(url:string,params:any,data:any){
    app.http.Post(url, params, async (res: any) => {
      const goodOrderCode = res.goodOrderCode
      uni.hideLoading();
      // 订单额外数据
      await this.orderSupply(goodOrderCode);
      
      if(res.price<=0){
        this.redirectToOrder(goodOrderCode)
      }else{
		    //data.channel=='alipay' (before)
        if (data.channel == "alipay_h5" || data.channel == "alipay") {
          if(res.appPayRequest){
            app.payment.paymentAlipayQmfSdk(JSON.stringify(res.appPayRequest),()=>{
              this.redirectToOrder(goodOrderCode)
            });
          }else if (res.alipay.orderInfo != "") {
            app.payment.paymentAlipay(res.pay_type, res.alipay.orderInfo,goodOrderCode,()=>{
              this.redirectToOrder(goodOrderCode)
            });
          }
        } else {
          if (res.wechat) {
            if(res.appPayRequest){
              app.payment.paymentWxQmfSdk(JSON.stringify(res.appPayRequest));
            }else{
              app.payment.paymentWxpay(res.pay_type, res.wechat, () => {});
            }
            this.redirectToOrder(goodOrderCode)
          }
        }
      }
    });
  }
  orderSupply(orderCode:string){
    return new Promise((resolve, reject) => {
      // 订单额外数据
      const params:any = {
        guessName:this.getBitDisableGuess()?this.guessList[this.guessCheckTeam].name:'',
      }
      if(this.AD_id){
        params.source = {tp:1,sourceId:String(this.AD_id)}
      }
      app.http.Post(`me/order/supply/${orderCode}`,params,(res:any)=>{
        resolve(res)
      })
    });
    
  }
  cuokaSet(state:boolean){
    app.http.Post('my/cuoka/state/good/switch/'+this.goodsData.goodCode,{state:state?1:-1},()=>{
      this.cuokaOpne = state
    })
  }
  redirectToOrder(order:string){
    uni.redirectTo({
      url: `/pages/userinfo/order_details?code=${order}&waitPay=true`,
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
  padding-bottom: calc(150rpx) !important;
  padding-bottom: calc(150rpx + constant(safe-area-inset-bottom)) !important;
  padding-bottom: calc(150rpx + env(safe-area-inset-bottom)) !important;
  padding: 14rpx
}
.order-detail {
  width: 100%;
  background: #fff;
  
}
.top-order{
  border-top: 13rpx solid $content-bg;
}
.header {
  width: 100%;
  min-height: 180rpx;
  background: #fff;
  box-sizing: border-box;
  padding: 0 25rpx;
  border-bottom: 13rpx solid #f5f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}
.header-order-line{
  width: 100%;
  height:7rpx;
  position: absolute;
  bottom:0;
  left:0;
}
.header-left {
  width: 630rpx;
  min-height: 100rpx;
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
  width: 31rpx;
  height: 42rpx;
  background: url(../../static/goods/icon_address.png) no-repeat center;
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
  font-size: 31rpx;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #333333;
}
.address-name {
  width: 100%;
  font-size: 27rpx;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #88878C;
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
  box-sizing: border-box;
  padding:31rpx 20rpx 31rpx 20rpx;
}
.goods-info-logo{
  width: 178rpx;
  height:137rpx;
}
.goods-info2 {
  width: 480rpx;
  margin-left: 24rpx;
  display: flex;
  flex-direction: column;
  position: relative;
}

.goods-info2-title {
  font-size: 28rpx;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #333333;
  line-height: 40rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break:break-all
}

.goods-money-info {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0rpx;
  left: 0;
}

.goods-money {
  margin-left: 8rpx;
  margin-top: 58rpx;
  font-size: 25rpx;
  font-family: PingFangSC-Regular;
  font-weight: 500;
  color: #333333;
  line-height: 28rpx;
}
.goods-money text{
  font-size: 32rpx;
  font-family: PingFangSC-Semibold;
  font-weight: 400;
  color: #333333;
}
.select-team-title{
  width: 123rpx;
  height: 36rpx;
  background: #754CE2;
  border-radius: 3rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: #F6F7FB;
  margin-left: 0;
}
.goods-money-right {
  width: 200rpx;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.goods-money-right-header {
  width: 100%;
  height: 50rpx;
  box-sizing: border-box;
  line-height: 50rpx;
  font-size: 21rpx;
  color: #FF2727;
  text-align: center;
  padding-right: 12rpx;
  padding-left: 12rpx;
  padding-top: 10rpx;
}
.goods-money-add {
  margin-right: 12rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.num-box{
  width: 36rpx;
  height:36rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.goods-money-max{
  width: 78rpx;
  height: 38rpx;
  border: 1rpx solid #CCCCCC;
  border-radius: 3rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: #88878C;
  margin-right:26rpx;
}
.img-add {
  width: 28rpx;
  height: 28rpx;
  background: url(../../static/pay/v2/icon_add.png) no-repeat center;
  background-size: cover;
}

.img-jian {
  width: 28rpx;
  height: 5rpx;
  background: url(../../static/pay/v2/icon_red.png) no-repeat center;
  background-size: 100% 100%;
}

.money-add {
  height: 36rpx;
  text-align: center;
  font-size: 25rpx;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #333333;
  line-height: 36rpx;
  background:#F6F7FB;
  margin:0 21rpx;
  width: 75rpx;
}

.huo-dong-bg {
  width: 684rpx;
  height: 108rpx;
  background: #ffffff;
  display: flex;
  white-space: nowrap;
  align-items: center;
  margin:0 auto;
  border-top: 2rpx solid #F5F5F5;
  box-sizing: border-box;
  padding-top: 32rpx;
}
// 自选卡种 选队随机
.randomh-box{
  width: 100%;
  padding:26rpx 20rpx;
  box-sizing: border-box;
  background:#fff;
  border-bottom-left-radius: 5rpx;
  border-bottom-right-radius: 5rpx;
  position: relative;
}
.randomh-box::after{
  content: '';
  width: 682rpx;
  height:1px;
  position:absolute;
  top:0;
  left:50%;
  margin-left: -341rpx;
  background:#F5F5F5;
  z-index: 2;
}
.randomh-index{
  width: 100%;
  height:40rpx;
  margin-bottom: 34rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.randomh-index:last-child{
  margin-bottom: 0;
}
.randomh-index-left{
  width: 410rpx;
  height:40rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  .randomh-name{
    max-width: 204rpx;
    height:40rpx;
    background:#F6F7FB;
    text-align: center;
	  line-height: 40rpx;
    font-size: 23rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    box-sizing: border-box;
    padding:0 12rpx;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .randomh-price{
    width: 154rpx;
    height:40rpx;
    line-height: 40rpx;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
.randomh-index-right{
  width: 268rpx;
  height:40rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  .randohm-max{
    width: 78rpx;
    height: 38rpx;
    border: 1px solid #CCCCCC;
    border-radius: 3rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 23rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #88878C;
  }
  .randomh-num-box{
    width: 177rpx;
    height:40rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    .randomh-num-btn{
      width: 43rpx;
      height: 39rpx;
      background: #F6F7FB;
      border-radius: 1rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-randomReduce{
        width: 15rpx;
        height:3rpx;
      }
      .icon-randomAdd{
        width: 15rpx;
        height:15rpx;
      }
    }
    .randomh-num{
      width: 83rpx;
      height: 39rpx;
      background: #F6F7FB;
      border-radius: 1rpx;
      text-align: center;
      line-height: 39rpx;
      font-size: 25rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
    }
  }
}
// 
.item-name {
  font-size: 25rpx;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #333333;
  line-height: 34rpx;
  display: flex;
  align-items: baseline;
}
.coupon-num {
  font-size: $font-24;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: #ff504f;
}
.item-name .item-totalprice{
  font-size: 27rpx;
  font-family: PingFangSC-Medium;
  font-weight: bold;
  color: #333333;
}
.item-name-right {
  width: 10rpx;
  height: 16rpx;
  background: url(../../static/goods/jinru@2x.png) no-repeat center;
  background-size: 100% 100%;
  margin-left: 6rpx;
}
.item-title {
  font-size: 25rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: #14151a;
  line-height: 34rpx;
  margin-left: 22rpx;
  display: flex;
  justify-content: space-between;
}
.item-teamname {
  font-size: 25rpx;
  font-family: PingFangSC-Regular;
  font-weight: 600;
  color: #333333;
  line-height: 34rpx;
  margin:0 22rpx;
}
.item-youhui-bg {
  text-align: center;
  line-height: 43rpx;
  margin-right: 16rpx;
  height: 43rpx;
  background: #F1F1F1;
  font-size: 23rpx;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #88878C;
  padding: 0 22rpx;
  width: fit-content;
  display: inline-flex;
  margin-right: 28rpx;
  display: inline-block;
}
.current-discount{
  font-size: 23rpx;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #FFFFFF;
  background:#FF0003;
}


.yunfei-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding:10rpx 20rpx
}

.yunfei-item {
  width: 100%;
  height:60rpx;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  font-size: 26rpx;
  font-family: PingFangSC-Medium;
  font-weight: bold;
  color: #333333;
  line-height: 28rpx;
  margin-left: 12rpx;
}

.heji-text-b {
  font-size: 25rpx;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #88878C;
  line-height: 28rpx;
}

.heji-money2-b {
  height:40rpx;
  font-size: 29rpx;
  font-family: PingFangSC-Regular;
  font-weight: 500;
  color: $btn-red;
  line-height: 40rpx;
  margin-left: 12rpx;
}
.heji-money2-b text{
  font-size: 42rpx;
  font-family: PingFangSC-Regular;
  font-weight: 500;
}
.bottom-gm {
  width: 100%;
  background: #FFF;
  box-sizing: border-box;
  border-top: 13rpx solid #F6F7FB;
  padding: 35rpx 20rpx;
  .bottom-gm-title {
    width: 100%;
    height: 40rpx;
    display: flex;
    align-items: center;
    font-size: 29rpx;
    font-family: PingFangSC-Regular;
    font-weight: 600;
    color: #333333;
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
    font-size: 25rpx;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #88878C;
    line-height: 36rpx;
    margin-top: 10rpx;
  }
  .bottom-gm-btn {
    font-size: 25rpx;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #88878C;
    line-height: 36rpx;
  }
  .bottom-gm-btn text{
    font-size: 25rpx;
    font-family: PingFangSC-Regular;
    font-weight: 600;
    color: #333333;
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
  height: calc(120rpx);
  height: calc(120rpx + constant(safe-area-inset-bottom));
  height: calc(120rpx + env(safe-area-inset-bottom));
  position: fixed;
  bottom: 0;
  left:0;
  background: #ffffff;
  box-sizing: border-box;
  padding:0 50rpx 0 30rpx;
}
.bottom-content {
  width: 100%;
  height: 120rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  
}

.heji-money-pay {
  height:60rpx;
  margin-left: 16rpx;
  display: flex;
  align-items: flex-end;
  line-height: 80rpx;
}

.btn-payment {
  width: 360rpx;
  height: 88rpx;
  background: #cecfd3;
  border-radius: 4rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-28;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  line-height: 40rpx;
}

.btn-payment2 {
  width: 360rpx;
  background: $btn-red;
  font-family: PingFangSC-Regular;
  color: #FFFFFF;
  box-sizing: border-box;
  text-align: center;
  height: $btn-height;
  line-height: $btn-height;
  font-size: $btn-fontSize;
  border-radius:$btn-radius;
  font-weight: $btn-weight;
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
  padding:0 22rpx;
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
