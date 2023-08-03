<template>
  <view class="content">
    <!-- 地址 -->
    <payAddress :addressData="addressData"/>

    <view class="order-detail" v-if="goodsData.pic">
      <payInfo :goodsData="goodsData" :normalRandomGoods="normalRandomGoods" :baoduiId="baoduiId" :payNum.sync="payNum" :maxNum="maxNum" :randomTeam.sync="payRandomTeamData" :cartData="cartData" :baoduiName="baoduiName" :onePrice="keepTwoDecimal(onePrice)" @getOnePrice="getOnePrice"/>
      
      <confirmorderGuess v-if="getBitDisableGuess"  :freeNum="freeNum>=payNum?(freeNum-payNum):0" :checkTeam.sync="guessCheckTeam" :teamList="guessList" :lastGuess="lastGuess" @onScrolltolower="onScrolltolower" />

      <view class="yunfei-info top-order" >
        <view class="yunfei-item">
          <text class="item-name">商品金额</text>
          <text class="item-name">¥{{ totalAmount }}</text>
        </view>
        <view class="yunfei-item">
          <text class="item-name">优惠券</text>
          <view class="item-name" v-if="getBitDisableCoupon">
            {{ couponText }}
          </view>
          <view class="item-name" v-else @click="onClickCheckCoupon">
            <text class="coupon-num">{{ couponText }}</text>
            {{ checkCouponPrice > 0 ? "" : "张可用"}}
            <view class="item-name-right"></view>
          </view>
        </view>
        <view class="yunfei-item" v-show="freeNum > 0">
          <text class="item-name">免单优惠</text>
          <text class="item-name">- ¥{{freeDiscount}}</text>
        </view>
        <view class="yunfei-item" v-show="cartData == ''&&(goodsData.price - onePrice > 0)">
          <text class="item-name">优惠</text>
          <text class="item-name">- ¥{{allDiscount}}</text>
        </view>
        <view class="yunfei-item">
          <text class="item-name">运费</text>
          <text class="item-name">包邮</text>
        </view>
        <view class="yunfei-item">
          <text class="item-name">合计:</text>
          <view class="item-name">¥<view class="item-totalprice">{{getTotalPrice}}</view></view>
        </view>
      </view>

      <payNeedKnow :check.sync="gmCheck"/>

      <view v-show="(goodsData.bit&32) == 32" class="kami-title" >
        <view @click="cuokaSet(!cuokaOpne)" class="kami-gx" :class="{ 'kami-check': cuokaOpne}"></view>商家代搓
      </view>
      <view class="bottom-content-box">
        <view class="bottom-content">
          <view class="heji-money-pay">
            <text class="heji-text-b">合计:</text>
            <view class="heji-money2-b">¥<text>{{getTotalPrice}}</text></view>
          </view>
          <view class="btn-payment2" @click="onClickToPay()">去支付</view>
        </view>
      </view>
    </view>
    
    <payment
      :showPayMent="showPayMent"
      :payChannel="payChannel"
      :payPrice="getTotalPrice"
      :countTime="countTime"
      @pay="onClickPayGoods"
      @cancelPay="onClickCancelPay"
    />
    <paymentCoupon
      :showPayMentCoupon="showPayMentCoupon"
      :couponList="couponList"
      @couponConfirm="onClickCouponConfirm"
      @cancelCoupon="showPayMentCoupon=false"
    />
  </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Md5 } from "ts-md5";
import { Component } from "vue-property-decorator";
import BaseNode from "@/base/BaseNode.vue";
import payAddress from "./component/payAddress.vue";
import payInfo from "./component/payInfo.vue";
import payNeedKnow from "./component/payNeedKnow.vue";
@Component({
  components:{
    payAddress,
    payInfo,
    payNeedKnow
  }
})
export default class ClassName extends BaseNode {
  addressData: any = [];
  payNum = 1;
  goodsData: { [x: string]: any } = [];
  onePrice = 0;
  cartData: any = '';
  gmCheck = false;
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
  payRandomTeamData:any = '';
  // 代搓卡
  cuokaOpne = false;
  AD_id=null
  onLoad(query: any) {
    if (!query.data) return;
    this.AD_id = query.AD_id ?? null; 
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
      this.selectRanId = Number(query.selectRanId);
      this.goodsData.price = Number(query.randomPrice);
    }
    this.initEvent();
  }
  // 普通随机商品 非自选及选队随机
  public get normalRandomGoods() : boolean {
    return this.cartData == '' && this.payRandomTeamData == ''
  }
  // 商品金额
  public get totalAmount() {
    let totalPrice = 0; 
    if (this.cartData !== '') { 
      totalPrice = this.cartData.amount; 
    } else if (this.payRandomTeamData !== '') { 
      totalPrice = this.getRandomTotalPrice; 
    } else { 
      totalPrice = this.goodsData.price * this.payNum; 
    } 
    return this.keepTwoDecimal(totalPrice);
  }
  // 实付金额
  public get getTotalPrice() {
    let amount = this.totalAmount;
    if (this.normalRandomGoods) {
      if (this.freeNum >= this.payNum) {
        return 0;
      }
      amount = (this.payNum - this.freeNum||0) * this.onePrice
    }
    return this.keepTwoDecimal(amount - this.couponTotalPrice);
  }
  // 优惠券
  public get couponText() {
    if (this.getBitDisableCoupon) {
      return '此商品优惠券不可用';
    } else {
      const couponPrice = this.checkCouponPrice > 0 ? `-¥${this.checkCouponPrice}`  : this.couponNum;
      return couponPrice;
    }
  }
  // 优惠金额
  public get freeDiscount() {
    // 计算折扣价格 
    const {freeNum, payNum, onePrice} = this; 
    const discountedPrice = Math.min(freeNum,payNum) * onePrice;
    return this.keepTwoDecimal(discountedPrice); 
  }
  public get allDiscount() : number {
    // 计算折扣价格 
    const {payNum, goodsData, onePrice} = this; 
    const remainingDiscount = payNum * (goodsData.price - onePrice);
    return this.keepTwoDecimal(remainingDiscount);
  }
  public get getRandomTotalPrice() : number {
    const priceData = this.payRandomTeamData.map((x:any) => x.price * x.num);
    const price = priceData.reduce((total:number, curr:number) => total + curr, 0);
    return price;
  }
  // 预测免单
  public get getBitDisableGuess() : boolean {
    return (this.goodsData.bit & 8) == 8
  }
  // 判断是否禁用优惠券
  public get getBitDisableCoupon() : boolean {
    return (this.goodsData.bit & 1) == 1
  }
  keepTwoDecimal(num: any) {
    var result = parseFloat(num);
    if (isNaN(result)) {
      return 0;
    }
    result = Math.round(num * 100) / 100;
    return result > 0 ? result : 0;
  }
  initEvent(){
    const { totalNum, currentNum, lockNum } = this.goodsData
    this.maxNum =  totalNum -(currentNum+lockNum);
    this.getOnePrice();
    this.getNoRichShow();
    app.http.Get("me/delivery", {}, (res: any) => {
      if (res.list) {
        this.addressData = res.list.find((x:any)=>x.default) || res.list[0];
      }
    });
    this.onEventUI("addressSelect", (data) => {
      this.addressData = data.data;
    });
  }
  // 预测球队列表分页
  onScrolltolower(){
    if(this.guessNoMoreData) return;

    let params:{[x:string]:any} = {
      pageIndex: this.guessCurrentPage,
      pageSize:this.guessPageSize,
    }
    app.http.Get(`me/order/guess/option/${this.goodsData.goodCode}`, params, (data: any) => {
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
      `me/order/confirm/${this.goodsData.goodCode}`,
      {},
      ({data}: any) => {
        if(data.guess){
          const { freeNoNum, option, lastGuess } = data.guess;
          this.freeNum = freeNoNum;
          this.guessList = option.list;
          this.lastGuess = lastGuess;
          this.guessNoMoreData = option.totalPage>=2?false:true;
        }
        if(data.cuokaState){
          this.cuokaOpne = data.cuokaState == 1 ? true : false
        }
        if(data.cuokaWindow){
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
    const { price, discount } = this.goodsData;
    this.onePrice = price;
    if(discount){
      discount.forEach((x:any)=>{
        if(this.payNum >= x.minNum){
          this.onePrice = x.price;
        }
      })
    }
    this.conditionList()
  }
  conditionList(){
    if (this.getBitDisableCoupon || this.couponNumNo) {
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
      params.price = this.keepTwoDecimal(this.getRandomTotalPrice)
    } else if (this.cartData != "") {
      params.price = this.cartData.amount;
    } else if(this.selectRanId!=0){
      params.num = 1;
      params.price = this.keepTwoDecimal(this.payNum * this.onePrice)
    } else {
      params.num = Number(this.payNum);
      if (Number(this.payNum) <= 0) return;
      params.price = this.keepTwoDecimal(this.payNum * this.onePrice)
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
      this.couponList = res.list ?? [];
      this.getConditionPrice();
    });
  }
  onClickToPay() {
    if (this.addressData == "") {
      uni.showToast({ title: "请先选择地址", icon: "none"});
      return;
    }
    if (!this.gmCheck) {
      uni.showToast({ title: "请先确认购买须知", icon: "none"});
      return;
    }
    this.showPayMent = true;
  }
  // 取消支付
  onClickCancelPay() {
    this.showPayMent = false;
    this.countTime = 0;
  }
  onClickPayGoods(data: any) { 
    if (data == '') return; 
    uni.showLoading({ title: '加载中' });

    const { goodCode } = this.goodsData; 
    const ts = Math.floor(new Date().getTime()/1000);
    const userId = uni.getStorageSync('ksjUserId');
    let snName = "ToPayForGood";
    let params: any = { 
      channelId: data.channelId ?? '', 
      channel: data.channel, 
      delivery: this.addressData.id, 
      ts
    }; 
    let url = `good/topay/${goodCode}`;
    if(this.baoduiId != 0||this.cartData != ""||this.payRandomPrice>0){
      url = `good/topay/${goodCode}/select`;
      snName = "ToPayForSelectGood"
    }
    switch (true) { 
      case this.baoduiId !== 0: 
        // 包队 
        params.teamId = this.baoduiId; 
        params.num = 1; 
        break; 
      case this.cartData !== '': 
        // 自选球队 
        params.id = this.cartData.list.map((x:any) => { if (!x.soldOut && !x.lock) return x.noId; }); 
        break; 
      case this.payRandomTeamData !== '': 
        // 选队随机 
        params.list = this.payRandomTeamData.map((x:any) => { return { id: x.id, num: Number(x.num) }; });
        url = `good/topay/${goodCode}/optional`; 
        snName = "ToPayForOptionGood";
        break; 
      default: 
        // 普通支付 
        if (this.selectRanId !== 0) params.teamId = this.selectRanId;
        params.num = Number(this.payNum); 
        break; 
    }
    params.sn = Md5.hashStr(`${snName}_${ts}_${userId}_${goodCode}`)
    if (uni.getSystemInfoSync().platform === 'android') { 
      params.nativeSdk = 'qmf_android'; 
    }
    // 是否使用优惠券 
    if (this.checkCouponList != '') { 
      params.couponIdList = this.checkCouponList; 
    }
    this.postPay(url, params, data); 
  }
  postPay(url:string,params:any,data:any){
    app.http.Post(url, params, async (res: any) => {
      const goodOrderCode = res.goodOrderCode
      uni.hideLoading();
      // 订单额外数据
      await this.supplyOrderData(goodOrderCode);
      if(res.price<=0){
        this.redirectToOrder(goodOrderCode)
      }else{
        if (['alipay','alipay_h5'].includes(data.channel)) {
          app.payment.paymentAlipay(res.h5CashierAddress, res.alipay.orderInfo,()=>{
            this.redirectToOrder(goodOrderCode)
          });
        } else {
          if (res.wechat) {
            if(res.appPayRequest){
              app.payment.paymentWxQmfSdk(JSON.stringify(res.appPayRequest));
            }else{
              app.payment.paymentWxpay(res.wechat, () => {});
            }
            this.redirectToOrder(goodOrderCode)
          }
        }
      }
    });
  }
  supplyOrderData(orderCode:string){
    return new Promise((resolve, reject) => {
      const { getBitDisableGuess, guessList, guessCheckTeam, AD_id } = this;
      // 订单额外数据
      const guessName = getBitDisableGuess?guessList[guessCheckTeam].name:''
      const params:any = {
        guessName,
        source:AD_id?{tp:1,sourceId:String(AD_id)}:undefined
      }
      if(app.platform.objectValueAllEmpty(params)){
        resolve(true)
      }else{
        app.http.Post(`me/order/supply/${orderCode}`,params,(res:any)=>{
          resolve(res)
        },(error:any)=>{
          uni.showToast({
            title:`错误信息：${error}，请联系客服处理。订单号：${orderCode}，${getBitDisableGuess?'预测球队：'+guessName:''}`,
            icon:'none',
            duration:10000
          });
        })
        
      }
    });
  }
  cuokaSet(state:boolean){
    app.http.Post('my/cuoka/state/good/switch/'+this.goodsData.goodCode,{state:state?1:-1},()=>{
      this.cuokaOpne = state
    })
  }
  redirectToOrder(order:string){
    app.navigateTo.goOrderDetails(order,'&waitPay=true',true)
  }
  // 选择优惠券
  onClickCheckCoupon() {
    if (this.couponNum > 0) {
      this.showPayMentCoupon = true;
    }
  }
  // 确认选择优惠券
  onClickCouponConfirm(data: any) {
    this.showPayMentCoupon = false;
    if (data == "") return;
    
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
  background: url(@/static/goods/jinru@2x.png) no-repeat center;
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
	background: url(@/static/userinfo/weixuan@2x.png) no-repeat center;
	background-size: 100% 100%;
	margin-right: 10rpx;
}
.kami-check {
	width: 28rpx;
	height: 28rpx;
	background: url(@/static/userinfo/pay_gou.png) no-repeat center;
	background-size: 100% 100%;
	margin-right: 10rpx;
}
</style>
