<template>
  <view class="pay-content">
    <navigationbar title="确认订单" borderBottom="0px"/>
    <!-- 地址 -->
    <payAddress :addressData="addressData"/>
    <view class="order-detail" v-if="goodsData.pic">
      <payInfo :goodsData="goodsData" :normalRandomGoods="normalRandomGoods" :baoduiId="baoduiId" :payNum.sync="payNum" :maxNum="maxNum" :randomTeam.sync="payRandomTeamData" :cartData="cartData" :baoduiName="baoduiName" :onePrice="keepTwoDecimal(onePrice)" @getOnePrice="getOnePrice"/>
      
      <confirmorderGuess v-if="getBitDisableGuess"  :freeNum="freeNum>=payNum?(freeNum-payNum):0" :checkTeam.sync="guessCheckTeam" :teamList="guessList" :lastGuess="lastGuess" @onScrolltolower="onScrolltolower" />

      <view class="yunfei-info top-order" >
        <view class="yunfei-item">
          <text class="item-name">运费</text>
          <text class="item-name fontBold" >包邮</text>
        </view>
        <view class="yunfei-item">
          <text class="item-name">商品金额</text>
          <text class="item-name">¥{{ totalAmount }}</text>
        </view>
        <!-- 优惠券 -->
        <payCoupon ref="rPayCoupon" :disable="getBitDisableCoupon" :totalAmount="(totalAmount-allDiscount)" :totalPrice="getTotalPrice" @couponConfirm="onClickCouponConfirm"/>
        <view class="yunfei-item" v-show="freeNum > 0">
          <text class="item-name">免单优惠</text>
          <text class="item-name discounts">- ¥{{freeDiscount}}</text>
        </view>
        <view class="yunfei-item" v-show="cartData == ''&&(goodsData.price - onePrice > 0)">
          <text class="item-name">优惠</text>
          <text class="item-name discounts">- ¥{{allDiscount}}</text>
        </view>
        <view class="yunfei-item">
          <text class="item-name">匿名购买:</text>
          <view class="item-name" @click="onClickAnonymity">
            <view class="btn-anonymity" :class="{ 'btn-anonymityed': anonymity }"></view>
          </view>
        </view>
      </view>

      <payNeedKnow :check.sync="gmCheck"/>

      <view v-show="(goodsData.bit&32) == 32" class="kami-title" >
        <view @click="cuokaSet(!cuokaOpne)" class="kami-gx" :class="{ 'kami-check': cuokaOpne}"></view>商家代搓
      </view>

      <view class="bottom-content-box">
        <view class="bottom-content">
          <view class="total-price">
            ¥<text class="price-text">{{ filterPrice(getTotalPrice).integer }}</text>
						<text class="decimal"
								v-if="filterPrice(getTotalPrice).decimal">{{ filterPrice(getTotalPrice).decimal }}</text>
          </view>
          <view class="btn-payment" @click="onClickToPay()">提交订单</view>
        </view>
      </view>

    </view>
    
    <payment :showPayMent="showPayMent" :payChannel="payChannel" :payPrice="getTotalPrice" :countTime="0" @pay="onClickPayGoods" @cancelPay="showPayMent=false" />
  </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "@/base/BaseNode.vue";
import payAddress from "./component/payAddress.vue";
import payInfo from "./component/payInfo.vue";
import payNeedKnow from "./component/payNeedKnow.vue";
import payCoupon from "./component/payCoupon.vue"
import { filterPrice } from "@/tools/util";
//@ts-ignore
import { KwwConfusion } from "@/net/kwwConfusion.js"
const parseJSONIfPresent = (value:any) => {
  return value ? JSON.parse(value) : null;
}
@Component({
  components:{
    payAddress,
    payInfo,
    payNeedKnow,
    payCoupon
  }
})
export default class ClassName extends BaseNode {
  filterPrice = filterPrice;
  addressData: any = [];
  payNum = 1;
  goodsData: { [x: string]: any } = [];
  onePrice = 0;
  cartData: any = '';
  gmCheck = false;
  // 支付方式组件相关
  showPayMent = false;
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
  AD_id=null;
  anonymity=false
  onLoad(query: any) {
    if (!query.data) return;

    this.AD_id = query.AD_id ?? null; 
    this.goodsData = parseJSONIfPresent(query.data); 
    this.payChannel = parseJSONIfPresent(query.payChannel);
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
      this.cartData = parseJSONIfPresent(query.cart);
    }
    // 选队随机
    if(query.payRandomTeam){
      this.payRandomTeamData = parseJSONIfPresent(query.payRandomTeam)
    }
    if(query.selectRanId){
      this.selectRanId = Number(query.selectRanId);
      this.goodsData.price = Number(query.randomPrice);
    }
    this.initEvent();
  }
  
  public get goodType() : any {
    return {
      baodui:this.baoduiId !== 0,
      selectCart:this.cartData !== '',
      selectRan:this.selectRanId !== 0,
      randomTeam:this.payRandomTeamData !== ''
    }
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
    this.gmCheck = uni.getStorageSync("confirmPurchaseNotes") || false;
    this.anonymity = uni.getStorageSync("anonymityState") || false;
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
    const { baodui, selectCart, selectRan, randomTeam } = this.goodType;
    // 获取可用优惠券数量
    let params: any = {
      goodCode: this.goodsData.goodCode,
    };
    if (baodui) {
      params.price = this.goodsData.price;
    } else if (randomTeam) {
      params.num = 1;
      params.price = this.keepTwoDecimal(this.getRandomTotalPrice)
    } else if (selectCart) {
      params.price = this.cartData.amount;
    } else if(selectRan){
      params.num = 1;
      params.price = this.keepTwoDecimal(this.payNum * this.onePrice)
    } else {
      params.num = Number(this.payNum);
      if (Number(this.payNum) <= 0) return;
      params.price = this.keepTwoDecimal(this.payNum * this.onePrice)
    }
    this.$nextTick(()=>{
      this.$refs.rPayCoupon.setData(params);
    })
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
  async onClickPayGoods(data: any) { 
    if (data == '') return; 
    uni.showLoading({ title: '加载中' });

    const { goodCode } = this.goodsData; 
    const ts = Math.floor(new Date().getTime()/1000);
    const userId = await app.user.getAppDataUserId();
    const { baodui, selectCart, selectRan, randomTeam } = this.goodType;
    let snName = "ToPayForGood";
    let params: any = { 
      channelId: data.channelId ?? '', 
      channel: data.channel, 
      delivery: this.addressData.id, 
      anonymous:this.anonymity,
      ts
    }; 
    let url = `good/topay/${goodCode}`;
    if(baodui||selectCart||this.payRandomPrice>0){
      url = `good/topay/${goodCode}/select`;
      snName = "ToPayForSelectGood"
    }

    if(baodui){  //包队
      params.teamId = this.baoduiId; 
      params.num = 1; 
    }else if(selectCart){  // 自选球队
      params.id = this.cartData.list.map((x:any) => { if (!x.soldOut && !x.lock) return x.noId; }); 
    }else if(randomTeam){ // 选队随机 
      params.list = this.payRandomTeamData.map((x:any) => { return { id: x.id, num: Number(x.num) }; });
      url = `good/topay/${goodCode}/optional`; 
      snName = "ToPayForOptionGood";
    }else{ // 普通支付
      if (selectRan) params.teamId = this.selectRanId;
      params.num = Number(this.payNum); 
    }

    params.sn = KwwConfusion.confirmOrder(ts,snName,userId,goodCode);
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
    app.http.Pay(url, params, async (res: any) => {
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
  // 确认选择优惠券
  onClickCouponConfirm(data: any) {
    this.checkCouponList = data.list;
    this.couponTotalPrice = data.totalPrice;
    this.$nextTick(()=>{
      this.$refs.rPayCoupon.refreshCouponList()
    })
  }
  // 预测球队
  onClickGuessTeamCheck(index:number){
    if(this.guessCheckTeam!=index){
      this.guessCheckTeam = index;
    }
  }
  onClickAnonymity(){
    uni.setStorageSync("anonymityState",!this.anonymity);
		this.anonymity = !this.anonymity;
  }
}
</script>

<style lang="scss" >
$font-16: 16rpx;
$font-20: 20rpx;
$font-24: 24rpx;
$font-28: 28rpx;

page {
  background: $content-bg;
}
.pay-content {
  width: 100%;
  box-sizing: border-box;
  padding: 0 14rpx;
  padding-bottom: calc(150rpx) !important;
  padding-bottom: calc(150rpx + constant(safe-area-inset-bottom)) !important;
  padding-bottom: calc(150rpx + env(safe-area-inset-bottom)) !important;
}
.order-detail {
  width: 100%;
}
.top-order{
  border-top: 14rpx solid $content-bg;
}


// 
.item-name {
  font-size: 26rpx;
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
  color: #FA1545;
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
  padding:10rpx 26rpx;
  background: #ffffff;
  border-radius: 5rpx;
}
.yunfei-item {
  width: 100%;
  height:68rpx;
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
.total-price{
  height:40rpx;
  font-size: 36rpx;
  font-family: PingFangSC-Regular;
  font-weight: 600;
  color: #FA1545;
  line-height: 40rpx;
  margin-left: 12rpx;
}
.total-price .price-text{
  font-size: 48rpx;
  font-family: PingFangSC-Regular;
  font-weight: 600;
}
.total-price .decimal{
  font-size: 38rpx;
  font-family: PingFangSC-Regular;
  font-weight: 600;
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
  display: flex;
  align-items: flex-end;
  line-height: 80rpx;
}

.btn-payment {
  width: 332rpx;
  height:84rpx;
  border-radius: 5rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
  background: #FA1545;
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
.btn-anonymity {
  width: 28rpx;
  height: 28rpx;
  background: url(@/static/userinfo/weixuan@2x.png) no-repeat center/ 100% 100%;
  margin-right: 10rpx;
}
.btn-anonymityed {
  background: url(@/static/userinfo/pay_gou.png) no-repeat center/ 100% 100%;
}
.discounts{
  font-size: 26rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  color: #FA1545;
}
.fontBold{
  font-weight: bold;
}
</style>
