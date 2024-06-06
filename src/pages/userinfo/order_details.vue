<!--
 * @FilePath: \jichao_app_2\src\pages\userinfo\order_details.vue
 * @Author: wjw
 * @Date: 2023-12-14 14:35:27
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-06 10:12:00
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template >
	<view class="content" >
		<transitionNav ref='transitionNav' :whiteTitle="true" :needIconShadow="false" :title="orderData.stateName"/>
		<!-- 头部状态 -->
		<view class="header">
			<view class="header-statename" @click="onClickStateDesc">
				{{orderData.state==1?'订单将于'+countDownStr+'后关闭':orderData.desc}}
				<view v-if="orderData.state==2&&orderData.good.state==1">
					<view class="good-progress">
						<view class="progressMask" :style="{width:(100-goodsManaager.listPlan(orderData.good,'num'))+'%'}"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="order-box" v-if="orderData.good">
			<!-- 商品信息 -->
			<view class="order-index padding-lr"> 
				<view class="order-index-header">
					<view class="header-left">
						<muqian-lazyLoad class="seller-image" :src="orderData.seller.avatar?decodeURIComponent(orderData.seller.avatar):defaultAvatar" mode="aspectFill" :borderRadius="'50%'"></muqian-lazyLoad>
						<view class="seller-name">{{orderData.seller.name}}</view>
					</view>
				</view>
				<view class="order-index-center" @click="onClickGoodDetail">
					<view class="goods-pic-box">
						<image class="goods-image blur-bg" :src="detailPic" mode="heightFix"></image>
						<image class="goods-image" :src="detailPic" mode="aspectFit"></image>
					</view>
					<view class="goods-content">
						<view class="title">{{orderData.good.title}}</view>
						<view class="desc" v-if="orderData.good.pintuanType>10">
							<view class="select-team-title">{{getGoodsPintuan(orderData.good.pintuanType)}}</view>
						</view>
						<view class="desc" v-else>
							<view class="price">￥<text>{{orderData.price}}</text></view>
							<view class="total-num">共{{orderData.num}}件</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 金额计算 -->
			<view class="order-desc padding-lr">
				<u-divider lineColor="#F6F6F6" style="margin-top:0;margin-bottom:15rpx"></u-divider>
				<view class="orderPInfo" :class="{'show-pinfo':showPriceInfo}">
					<view class="order-desc-index" v-for="item in orderDesc" :key="item.id" v-show="item.desc!='- ¥0'">
						<view class="name">{{item.name}}</view><view class="info" :class="{'redfont':item.desc.indexOf('-')!=-1}">{{item.desc}}</view>
					</view>
				</view>
				<view class="order-desc-index" @click="showPriceInfo=!showPriceInfo">
					<view></view>
					<view class="price">
						实付款
						<view class="total-price">
							¥<text class="price-text">{{ filterPrice(orderData.price).integer }}</text>
							<text class="decimal" v-if="filterPrice(orderData.price).decimal">{{ filterPrice(orderData.price).decimal }}</text>
						</view>
						<view class="icon-up" :class="{'icon-down':!showPriceInfo}"></view>
					</view>
				</view>
			</view>
			<!-- 选队随机 自选卡种 -->
			<view class="randomh-box" v-show="optionList!=''" >
				<view class="randomh-index" v-for="(item,index) in optionList" :key="index">
					<view class="randomh-index-left">{{item.name}}</view>
					<view class="randomh-index-right">
						<view class="randomh-index-price">￥{{item.amount}}</view>
						<view class="randomh-index-num">x{{item.num}}</view>
					</view>
				</view>
			</view>
			
			<view class="buyer-cotnent padding-lr" v-if="cartList.length && cardList.length==0">
				<view class="card-header">
					<view class="card-header-title">已选编号</view>
				</view>
				<buyCardId :cardList="cartList" :waitPay="true" />
			</view>

			<!-- 预测卡密 -->
			<!-- order 订单 state 订单状态  guessFreeNum 剩余免单次数 guessNum 预测正确数量 guessName 预测球队名字-->
			<stepGuess v-if="guessType" :state="orderData.good.state" :guessState="guessState" :order="true" :freeNum="guessFreeNum" :guessNum="guessNum" :guessName="guessName" :surplusNum="surplusNum" :guessSuccess="guessSuccess" @onClickSuccessHide="guessSuccess=false"/>
			<!-- 预测卡密 -->

			<!-- 我的编号 -->
			<view class="buyer-cotnent padding-lr" v-if="cardList!='' && !clickToPay">
				<view class="card-header">
					<u-tabs :list="cardTabs" :itemStyle="{padding:0,paddingRight:'28rpx'}" :activeStyle="activeStyle" :inactiveStyle="inactiveStyle" :current="cardTabsCurrent" lineHeight="0" @click="clickCurrentCardTab"></u-tabs>
					<view class="card-header-right" @click="onClickAllCard">
						{{cardTabsCurrent==0?`查看全部${orderData.num}条`:"查看全部"}}
						<view class="icon-right"></view>
					</view>
				</view>
				<!-- 卡密信息|购入信息 -->
				<buyCardId v-show="cardTabsCurrent==0" :cardList="cardList"/>
				<buyInfo v-show="cardTabsCurrent==1" ref="rBuyInfo" :orderCode="orderCode" :num="orderData.buyNoNum" :point="orderData.point" @goResult="onClcikResult(1)"/>
			</view>
			<!-- 订单详细信息 -->
			<view class="order-info padding-lr" v-if="orderInfo.orderNo.desc!=''">
				<view class="title">订单信息</view>
				<view class="index">
					<view class="index-left">收货信息</view>
					<view class="index-right">
						<view class="index-right-address">{{orderData.receiver.address}}</view>
						<view class="index-right-address">{{orderData.receiver.name}} {{orderData.receiver.phone}}</view>
					</view>
				</view>
				<view class="index" v-for="item in orderInfo" :key="item.id" v-show="item.desc!=0">
					<view class="index-left">{{item.title}}</view>
					<view class="index-right">
						{{item.title=='订单编号'||item.title=='支付方式'?item.desc:(item.desc>0?$u.timeFormat(item.desc,"yyyy-mm-dd hh:MM:ss"):'')}}
						<view v-if="item.title=='订单编号'" class="copy" @click="onClickCopyInfo(item.desc)"></view>
					</view>
				</view>
			</view>

			<view class="info-tab">
				<view class="tab-index" @click="onClickKefu"><view class="icon-lianxi"></view>联系客服</view>
				<view class="tab-index" @click="onClickComplain"><view class="icon-tousu"></view>投诉订单</view>
			</view>

			<!-- 猜你喜欢 -->
			<guessYouLikeIt v-if="orderData.good&&orderData.good.goodCode" :goodCode="orderData.good.goodCode" />
		</view>

		<!-- 底部按钮 -->
		<view class="bottom-btn" v-if="operateData!='' && !orderRefund">
			<view class="small-btn-content" >
				<view class="mini-btn left" :class="{'right':index+1==operateData.length}" v-for="(item,index) in operateData" :key="index" @click="onClickOperate(item.cmd)">{{item.name}}</view>
			</view>
		</view>

		<payment :showPayMent="showPayMent" :payChannel="payChannel" @cancelPay="onClickCancelPay" :payPrice="orderData.price" :countTime="countDown" @pay="onClickPayGoods" />

		<paymentSuccess :showPaySuccess.sync="showPaySuccess"/>
	</view>
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import {getCountDownTime, parsePic} from '@/tools/util';
	import { app } from "@/app";
	import { getGoodsImg, filterPrice } from "@/tools/util";
	import {orderState} from "@/tools/DataExchange"
	import { orderStateDesc,orderSetOperate, getGoodsPintuan } from "@/tools/switchUtil"
	//@ts-ignore
	import { KwwConfusion } from "@/net/kwwConfusion.js"
	import buyInfo from "./component/buyInfo.vue"
	@Component({
		components:{
			buyInfo
		}
	})
	export default class ClassName extends BaseNode {
		goodsManaager = app.goods;
		parsePic = parsePic;
		getGoodsImg = getGoodsImg;
		filterPrice = filterPrice;
		orderState = orderState;
		orderStateDesc = orderStateDesc;
		orderSetOperate = orderSetOperate;
		getGoodsPintuan = getGoodsPintuan;

		activeStyle={
			"font-size": "31rpx",
			"font-weight": 600,
			"color":" #333333",
		}
		inactiveStyle={
			"font-size": "31rpx",
			"font-weight": 600,
			"color":" #BBBBBB",
		}
		cardTabs = [
			{id:0,name:"卡密信息"},
			{id:1,name:"购入信息"}
		]
		cardTabsCurrent = 0;
		defaultAvatar = app.defaultAvatar;
		detailPic = '';
		countDownInter:any;
		countDown = 300;
		countDownStr = '';
		orderCode = '';
		orderData:{[x:string]:any} = [];
		orderDesc = {
			price:{id:1,name:'总价',desc:''},
			discount:{id:2,name:'优惠（阶梯奖励）',desc:''},
			mCoupon:{id:3,name:'商家优惠券',desc:''},
			oCoupon:{id:4,name:'平台优惠券',desc:''},
		}
		cardList:{[x:string]:any} = [];
		orderInfo:any = {
			orderNo:{id:1,title:'订单编号',desc:''},
			payMethod:{id:2,title:'支付方式',desc:''},
			createTime:{id:3,title:'创建时间',desc:''},
			groupTime:{id:4,title:'拼成时间',desc:''},
			openTime:{id:5,title:'开卡时间',desc:''},
			deliverTime:{id:6,title:'发货时间',desc:''},
			receiveTime:{id:7,title:'收货时间',desc:''},
		};
		// 底部按钮
		operateData:{[x:string]:any} = [];
		showPayMent = false;
		cartList:any = [];
		showPaySuccess = false;
		clickToPay = false;
		payChannel:any = [];
		// 预测球队
		guessType = false;
		guessFreeNum = 0;
		guessNum = 0;
		guessName = '';
		guessSuccess = false;
		guessState = 0;
		surplusNum = 0;
		optionList:any = [];
		onceLoad = true;
		retryNum = 0;
		showPriceInfo = false
		onLoad(query:any) {
			this.orderCode = query.code ?? '';
			this.clickToPay = query.waitPay ?? false;
			setTimeout(()=>{
				this.initEvent(()=>{
					if(this.clickToPay){
						this.getNoShowList(true);
						if(this.guessNum>0){
							this.guessSuccess = true
						}
					}
				});
			},this.clickToPay?200:0)

			this.onEventUI('orderchange',()=>{
				this.initEvent();
			})

			this.onEventUI('paySuccess',()=>{
				this.showPaySuccess = true;
			})
		}
		onShow(){
			if(this.clickToPay && !this.onceLoad){
				clearInterval(this.countDownInter);
				this.clickPayShowLoading(()=>{
					this.getNoShowList(true);
					if(this.guessNum>0){
						this.guessSuccess = true
					}
				})
			}
		}
		onPageScroll(data: any) {
			//@ts-ignore
			this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
		}
		onHide(){
			clearInterval(this.countDownInter);
		}
		public get orderGoodCode() : string {
			return this.orderData.good.goodCode;
		}
		public get orderRefund() : boolean {
			return this.orderData.refund
		}
		clickCurrentCardTab({id}:any){
			this.cardTabsCurrent = id;
			if(id==1){
				this.$refs.rBuyInfo.orderInfo()
			}
		}
		clickPayShowLoading(cb?:Function){
			uni.showLoading({
				title: '获取订单状态中',
				mask:true
			})
			setTimeout(()=>{
				this.initEvent(()=>{
					if(cb) cb()
				});
				uni.hideLoading();
			},1000)
		}
		initEvent(cb?:Function){
			const {orderCode} = this;
			app.http.Get(`me/orderInfo/buyer/${orderCode}/detail`,{},(res:any)=>{
				const data = res.data;
				this.onceLoad = false;
				this.orderData = data
				this.payChannel = data.good.payChannel??[]
				this.countDown = data.leftSec
				this.getCountDown();
				this.getGoodDesc(data);
				this.operateData = this.orderSetOperate(data);
				this.detailPic = parsePic(getGoodsImg(decodeURIComponent(data.good.pic)))
				if(data.good.pintuanType>10){
					app.http.Get(`me/orderInfo/buyer/${orderCode}/option`,{},(res:any)=>{
						this.optionList = res.list || []
					})
				}
				if(data.showSelectNo){
					app.http.Get(`me/orderInfo/buyer/${orderCode}/selectList`,{pageIndex:1,pageSize:50},(res:any)=>{
						if(res.list){
							this.cartList = res.list
						}
					})
				}
				// 预测卡密
				if(data.guess){
					const { leftNum, bingoNum, guess, surplusNum, state } = data.guess;
					this.guessType = true;
					this.guessFreeNum = leftNum;
					this.guessNum = bingoNum;
					this.guessName = guess;
					this.surplusNum = data.good.state>=2?surplusNum:0;
					this.guessState = state
					if(state == 0 && data.state > 1){
						setTimeout(()=>{
							this.initEvent();
						},500)
					}
				}
				if(data.state==1){
					console.log('订单待支付')
					return;
				}
				setTimeout(()=>{
					this.clickToPay = !data.wait ? false : true
				},1000)
				if(data.wait){
					uni.showLoading({ title:'数据加载中请稍后' })
					// 继续请求数据
					setTimeout(()=>{
						this.initEvent(()=>{
							if(cb) cb()
						})
					},5000)
				}else{
					uni.hideLoading()
				}
				if(data.noList){
					const { noList } = data;
					this.cardList = noList.length>5?noList.splice(0,5):noList
				}
				if(cb && !data.wait) cb()
			})
			
		}
		// 获取解锁卡密效果
		getNoShowList(once=false){
			if(!app.orderRich) {
				uni.showToast({
					title:'卡密特效未开启',
					icon:'none'
				})
				return
			};
			if(this.orderData.isCuoka) return;

			let listtype = ''
			// if(this.orderData.good.pintuanType==2){
			// 	listtype = '/team'
			// }
			app.http.Get(`me/orderInfo/buyer/${this.orderCode}/noShowList${listtype}`,{pageIndex:1,pageSize:30},(res:any)=>{
				if(res.total>0){
					const type = this.orderData.good.title.indexOf('足球')!=-1?1:0
					uni.navigateTo({
						url:`/pages/drawCard/drawCard?code=${this.orderCode}&data=${encodeURIComponent(JSON.stringify(res.list))}&num=${res.total}&hasNumber=${res.hasNumber}&picType=${type}&sp=${res.sp}&once=${once?1:0}&bit=${res.bit||0}`
					})
				}else{
					if( res.retry && this.retryNum==0 ){
						uni.showLoading({title:'加载中'})
						setTimeout(()=>{
							this.retryNum++;
							this.getNoShowList()
							uni.hideLoading();
						},2000)
					}
				}
			})
		}
		
		getGoodDesc(data:any){
			this.orderDesc.price.desc ='¥'+this.keepTwoDecimal(data.price+data.discount+(data.coupon?data.coupon:0));
			this.orderDesc.discount.desc ='- ¥'+data.discount;
			this.orderDesc.mCoupon.desc ='- ¥'+(data.merchantCoupon?data.merchantCoupon:0);
			this.orderDesc.oCoupon.desc ='- ¥'+(data.coupon?this.keepTwoDecimal(data.coupon-data.merchantCoupon):0);
			if(data.payInfo){
				for (const key in this.orderInfo) {
					if (Object.prototype.hasOwnProperty.call(data.payInfo, key)) {
						this.orderInfo[key].desc = data.payInfo[key];
					}
				}
			}
			
			this.orderInfo['orderNo'].desc = this.orderData.code
		}
		getCountDown(){
			clearInterval(this.countDownInter)
			this.countDownStr = getCountDownTime(this.countDown);
			this.countDownInter = this.scheduler(()=>{
				
				if(this.countDown>0){
					this.countDown --;
					this.countDownStr = getCountDownTime(this.countDown);
				}else{
					clearInterval(this.countDownInter)
				}
			},1)
		}
		onClickAllCard(){
			const { good, buyNoNum, point } = this.orderData
			uni.navigateTo({
				url:`/pages/userinfo/order_myCard?code=${this.orderCode}&goodCode=${this.orderGoodCode}&pintuanType=${good.pintuanType}&num=${buyNoNum}&point=${point}&type=${this.cardTabsCurrent}&state=${good.state}&pic=${encodeURIComponent(good.pic)}`
			})
		}
		onClickGoodDetail(){
			app.navigateTo.goGoodsDetails(this.orderGoodCode)
		}
		onClickKefu(){
			let params = {
				agentExten:this.orderData.kefu||'',
				businessParam:'goodCode:'+this.orderGoodCode
			}
			app.platform.heliService(params)
		}
		onClickOperate(cmd:any){
			let params:{[x:string]:any}
			if(cmd=='viewGood'){
				uni.redirectTo({
					url: `/pages/goods/goods_details?id=${this.orderGoodCode}&referer=Order`
				})
			}
			if(cmd=='resultCard'){
				this.onClcikResult(1)
			}
			if(cmd=='giving'){
				if(this.orderData.isCuoka) {
					uni.showToast({
						title:'当前状态无法赠送',
						icon:'none'
					})
					return
				};
				
				uni.navigateTo({
					url:'/pages/userinfo/giving/giving_list?code='+this.orderGoodCode+'&pintuanType='+this.orderData.good.pintuanType+'&orderCode='+this.orderData.code
				})
			}
			if(cmd == 'wuliu'){
				uni.navigateTo({
					url:`/pages/userinfo/order_logistics?code=${this.orderData.wuliuCode}&zitiWuliuExplain=${this.orderData.zitiWuliuExplain || ""}`
				})
			}
			if(cmd == 'drawCard'){
				this.getNoShowList()
			}
			if(cmd == 'toPay'){
				this.showPayMent = true
			}
			if(cmd=='receive_good'){
				uni.showModal({
					title: '提示',
					content: '是否确认已经收货？',
					success: (res)=> {
						if (res.confirm) {
							params = {
								code:this.orderData.code
							}
							app.http.Post('me/order/buyer/receive_good',params,(res:any)=>{
								uni.showToast({
									title:'收货成功',
									icon:'none'
								})
								uni.$emit('orderchange')
							})
						} else if (res.cancel) {
						}
					}
				});
				
			}
			if(cmd=='cancel'){
				uni.showModal({
					title: '提示',
					content: '是否取消支付该订单？',
					success: (res)=> {
						if (res.confirm) {
							params = {
								code:this.orderData.code
							}
							app.http.Post('me/order/buyer/cancel',params,(res:any)=>{
								uni.showToast({
									title:'取消成功',
									icon:'none'
								})
								uni.$emit('orderchange')
							})
						} else if (res.cancel) {
						}
					}
				});
			}
		}
		onClickComplain(){
			uni.navigateTo({
				url:'/pages/userinfo/order_complain?code='+this.orderCode+'&data='+decodeURIComponent(JSON.stringify(this.orderData.good))
			})
		}
		// 复制订单号
		onClickCopyInfo(text:any){
			uni.setClipboardData({
				data: text,
				showToast:false,
				success: function () {
					uni.showToast({
						title:'复制成功',
						icon:'none'
					})
				}
			});
		}
		onClcikResult(chooseID:any){
			const random = this.orderData.good.state>0?true:false
			uni.navigateTo({
				url: '/pages/userinfo/goods_result_list?chooseIds=' + chooseID+'&code='+this.orderGoodCode+'&order='+this.orderData.code+'&random='+random
			})
		}
		// 取消支付
		onClickCancelPay(){
			this.showPayMent = false;
		}
		async onClickPayGoods(data:any){
			// 1：支付宝 2：微信
			if (data == '') {
				return;
			}
			uni.showLoading({ title: '加载中' });
			const userId = await app.user.getAppDataUserId();
			let params:any = {
				channelId:data.channelId??'',
				channel: data.channel,
				delivery:0,
				num:Number(this.orderData.num),
			}
			const hash = KwwConfusion.toPayForGoodOrder(userId,this.orderData.code)
			if(uni.getSystemInfoSync().platform === "android"){
				params.nativeSdk = 'qmf_android'
			}
			app.http.Pay('order/topay/'+this.orderData.code,{...params,...hash},(res:any)=>{
				if(['alipay','alipay_h5'].includes(data.channel)){
					this.clickToPay = true;
					uni.hideLoading()
					this.onClickCancelPay()
					app.payment.paymentAlipay(res.h5CashierAddress,res.alipay.orderInfo)
				}else{
					if(res.wechat){
						this.clickToPay = true;
						uni.hideLoading()
						app.payment.paymentWxpay(res.wechat)
						this.onClickCancelPay()
					}
				}
			})
			
		}
		keepTwoDecimal(num: any) {
			var result = parseFloat(num);
			if (isNaN(result)) {
				return 0;
			}
			result = Math.round(num * 100) / 100;
			return result > 0 ? result : 0;
		}
		onClickStateDesc(){
			app.platform.goZgLive({
				roomID: this.orderData.roomId,
				isAnchor: false,
				goodCode:this.orderData.good.goodCode
			})
		}
	}
</script>

<style lang="scss">
	page{
		background:$content-bg;
	}
	.padding-lr{
		padding-left: 26rpx !important;
		padding-right: 26rpx !important;
	}
	.content{
		width: 100%;
		box-sizing: border-box;
		background:$content-bg;
	}
	.header{
		width: 100%;
		height:626rpx;
		background:url(@/static/order/card-bg.png);
		background-size: 100% 100%;
		box-sizing: border-box;
		padding-top:188rpx;
		.header-statename{
			width:100%;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			padding: 0 100rpx;
			font-size: 24rpx;
			
			font-weight: 400;
			color: #FFFFFF;
		}
		&-state{
			width: 100%;
			font-size: 37rpx;
			
			font-weight: 600;
			color: #FFFFFF;
			margin-bottom: 5rpx;
		}
		&-state-desc{
			width: 100%;
			font-size: 27rpx;
			
			font-weight: 400;
			color: #FFFFFF;
		}
	}
	.order-box{
		width: 100%;
		box-sizing: border-box;
		padding:0 14rpx;
		margin-top: -370rpx;
	}
	.order{
		&-index{
			width: 100%;
			// height:305rpx;
			padding:0 20rpx 0 20rpx;
			border-top-left-radius: 5rpx;
			border-top-right-radius: 5rpx;
			background:#fff;
			box-sizing: border-box;
			&-header{
				width: 100%;
				height:93rprx;
				display: flex;
				box-sizing: border-box;
				align-items: center;
				justify-content: space-between;
				.header-left{
					height:100rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					.seller-image{
						width: 40rpx;
						height:40rpx;
						border-radius: 50%;
						margin-right: 8rpx;
					}
					.seller-name{
						height:40rpx;
						line-height: 40rpx;
						font-size: 30rpx;
						
						font-weight: 400;
						color: rgba(0,0,0,0.9);
					}
				}
				.header-right{
					height:80rpx;
					display: flex;
					align-items: center;
					&-index{
						height:80rpx;
						display: flex;
						align-items: center;
						font-size: 25rpx;
						
						font-weight: 500;
						color: #EBBF7C;
					}
					&-count{
						font-size: 32rpx;
						font-family: 'DIN';
						font-weight: bold;
						color: #FF4349;
						margin-left: 14rpx;
					}
					.state0{
						color: #FF4349;
					}
					.state1{
						color: #FF9748;
					}
					.state2{
						color: #B3B3B3;
					}
					.state3{
						color: #EBBF7C;
					}
					.state4{
						color: #EBBF7C;						
					}
					.state5{
						color: #14151B;
					}
					.state-1{
						color: #14151B;	
					}
				}
			}
			&-center{
				width: 100%;
				height:178rpx;
				display: flex;
				box-sizing: border-box;
				align-items: center;
				.goods-pic-box{
					width: 178rpx;
					height:178rpx;
					border-radius: 5rpx;
					margin-right: 24rpx;
					position: relative;
					overflow: hidden;
				}
				.goods-image{
					width: 178rpx;
					height:178rpx;
					border-radius: 4rprx;
					position: relative;
					z-index: 2;
				}
				.blur-bg{
					filter: blur(2px);
					position: absolute;
					top:0;
					left:0;
					z-index: 1 !important;
				}
				.goods-content{
					width: 480rpx;
					height:178rpx;
					box-sizing: border-box;
					position: relative;
					.title{
						width: 100%;
						font-size: 26rpx;
						
						font-weight: 400;
						color: #333333;
						margin-bottom: 20rpx;
						word-break:break-all;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.desc{
						width: 100%;
						height:40rpx;
						display: flex;
						box-sizing: border-box;
						align-items: center;
						justify-content: space-between;
						position: absolute;
						bottom:0;
						left:0;
						.select-team-title{
							width: 123rpx;
							height: 36rpx;
							background: #754CE2;
							border-radius: 3rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 24rpx;
							
							font-weight: 400;
							color: #F6F7FB;
							margin-left: 0;
						}
						.price{
							height:40rpx;
							line-height: 40rpx;
							font-size: 25rpx;
							
							font-weight: 400;
							color: #333333;
						}
						.price text{
							font-size: 32rpx;
							
							font-weight: bold;
						}
						.total-num{
							height:40rpx;
							line-height: 40rpx;
							font-size: 25rpx;
							
							font-weight: 400;
							color: #88878C;
						}
					}
				}
			}
			&-bottom{
				width: 100%;
				height:156rpx;
				box-sizing: border-box;
				margin-top: 20rpx;
				padding:20rpx 0 20rpx 20rpx;
				border-top: 1px solid #F1F1F4;
				.price{
					width: 100%;
					height:40rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					font-size: 20rpx;
					
					font-weight: 400;
					color: #14151A;
					padding-right: 20rpx;
					box-sizing: border-box;
					&-index{
						font-size: 24rpx;
						font-family:'DIN';
						font-weight: bold;
						color: #14151A;
					}
					&-num{
						font-size: 32rpx;
						font-family:'DIN';
						font-weight: bold;
						color: #14151A;
					}
				}
			}
		}
	}
	.order-desc{
		width: 100%;
		box-sizing: border-box;
		border-bottom: 14rpx solid $content-bg;
		padding:20rpx 20rpx 15rpx 20rpx;
		background: #fff;
		border-bottom-left-radius: 5rpx;
		border-bottom-right-radius: 5rpx;
		.orderPInfo{
			max-height: 0;
			transition: all 0.3s linear;
			overflow: hidden;
		}
		.show-pinfo{
			max-height: 600rpx;
		}
		&-index{
			width: 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height:68rpx;
			font-size: 26rpx;
			font-weight: 400;
			color: #333333;
			.name{
				font-size: 26rpx;
				
				font-weight: 400;
				color: #333333;
			}
			.price{
				height:40rpx;
				font-size: 26rpx;
				
				font-weight: 400;
				color: rgba(0,0,0,0.9);
				line-height: 40rpx;
				display: inline-flex;
			}
			.total-price{
				height:40rpx;
				font-size: 28rpx;
				
				font-weight: 500;
				color: #000000;
				line-height: 30rpx;
				margin-left: 6rpx;
			}
			.total-price .price-text{
				font-size: 36rpx;
				font-family: Impact;
				font-weight: 500;
				margin-left:2rpx;
			}
			.total-price .decimal{
				font-size: 28rpx;
				font-family: Impact;
				font-weight: 500;
			}
			.info{
				font-weight: bold;
			}
			.redfont{
				color:#FA1545;
			}
			.icon-up{
				width: 20rpx;
				height:12rpx;
				margin-left: 8rpx;
				background:url(@/static/order/up.png) no-repeat center / 100% 100%;
				margin-top: 14rpx;
			}
			.icon-down{
				transform: rotate(180deg);
			}
		}
		.order-totalprice{
			font-size: 27rpx;
			
			font-weight: 600;
			color: #333333;
		}
		&-bottom{
			width: 100%;
			height:86rpx;
			display: flex;
			box-sizing: border-box;
			align-items: center;
			justify-content: flex-end;
			border-top: 1px solid #F1F1F4;
			font-size: 20rpx;
			
			font-weight: 400;
			color: #14151A;
			.price{
				&-index{
					font-size: 24rpx;
					font-family:'DIN';
					font-weight: bold;
					color: #FF4349;
				}
				&-num{
					font-size: 32rpx;
					font-family:'DIN';
					font-weight: bold;
					color: #FF4349;
				}
			}
		}
	}
	.card-header{
		width: 100%;
		height:40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 24rpx;
		
		&-title{
			height:40rpx;
			line-height: 40rpx;
			font-size: 31rpx;
			
			font-weight: 600;
			color: #333333;
			display: flex;
			.card-header-title-desc{
				height:40rpx;
				display: flex;
				align-items: center;
				line-height: 40rpx;
				font-size: 25rpx;
				
				font-weight: 400;
				color: #88878C;
				margin-left: 17rpx;
			}
			.order-gold{
				width: 29rpx;
				height:29rpx;
				margin-left: 6rpx;
			}
		}
		&-right{
			height:40rpx;
			display: flex;
			align-items: center;
			font-size: 23rpx;
			
			font-weight: 400;
			color: #A9ABB4;
			.icon-right{
				width: 10rpx;
				height:16rpx;
				background:url(../../static/goods/jinru@2x.png) no-repeat center;
				background-size: 100% 100%;
				margin-left: 10rpx;
				margin-top: 1rpx;
			}
		}
	}
	.buyer-cotnent{
		width: 100%;
		box-sizing: border-box;
		padding:30rpx;
		border-bottom: 14rpx solid $content-bg;
		background: #fff;
		border-radius: 5rpx;
	}
	.address-content{
		width: 100%;
		box-sizing: border-box;
		border-bottom: 14rpx solid $content-bg;
		padding:30rpx 25rpx;
		background: #fff;
		.title{
			width: 100%;
			font-size: 28rpx;
			
			font-weight: 600;
			color: #14151A;
			margin-bottom: 24rpx;
		}
		.index{
			width: 100%;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			.address-icon{
				width: 31rpx;
				height:42rpx;
				background:url(../../static/goods/icon_address.png) no-repeat center;
				background-size: 100% 100%;
				margin-right: 21rpx;
			}
			.address-desc{
				width: 620rpx;
				font-size: 31rpx;
				
				font-weight: 400;
				color: #333333;
				line-height: 34rpx;
			}
		}
		.address-info{
			width: 100%;
			box-sizing: border-box;
			padding-left: 56rpx;
			font-size: 27rpx;
			
			font-weight: 400;
			color: #88878C;
			display: flex;
			align-items: center;
			margin-top:16rpx;
			.name{
				margin-right: 40rpx;
			}
		}	
	}
	.order-info{
		width: 100%;
		box-sizing: border-box;
		background: #fff;
		padding:30rpx 22rpx 20rpx 22rpx;
		border-bottom: 14rpx solid $content-bg;
		border-radius: 5rpx;
		.title{
			width: 100%;
			font-size: 31rpx;
			
			font-weight: 600;
			color: #333333;
			margin-bottom: 30rpx;
		}
		.index{
			width: 100%;
			display: flex;
			min-height:40rpx;
			align-items: flex-start;
			margin-bottom: 20rpx;
			justify-content: space-between;
			.index-left{
				width:150rpx;
				height:40rpx;
				display: flex;
				align-items: center;
				font-size: 24rpx;
				
				font-weight: 400;
				color: #333333;
			}
			.index-right{
				min-height:40rpx;
				display: flex;
				align-items: center;
				font-size: 24rpx;
				
				font-weight: 400;
				color: #666666;
				flex-wrap: wrap;
				justify-content: flex-end;
			}
			.index-right-address{
				font-size: 24rpx;
				
				font-weight: 400;
				color: #666666;
			}
		}
		.copy{
			width: 20rpx;
			height:26rpx;
			background:url(../../static/order/copy.png) no-repeat center;
			background-size:100% 100%;
			margin-left: 6rpx;
		}
		
	}
	.info-tab{
		width: 100%;
		height:91rpx;
		box-sizing: border-box;
		background:#fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 5rpx;
		position: relative;
		.tab-index{
			width:50%;
			height:80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			
			font-weight: 400;
			color: #333333;
			.icon-lianxi{
				width: 28rpx;
				height:24rpx;
				background:url(../../static/order/kefu.png) no-repeat center;
				background-size: 100% 100%;
				margin-right:8rpx
			}
			.icon-tousu{
				width: 34rpx;
				height:30rpx;
				background:url(../../static/order/tousu.png) no-repeat center;
				background-size: 100% 100%;
				margin-right:6rpx
			}
		}
	}
	.info-tab::after{
		content: "";
		width: 2rpx;
		height: 32rpx;
		background:#EEEEEE;
		position: absolute;
		left:50%;
		top:50%;
		margin-left: -1rpx;
		margin-top: -16rpx;
	}
	.bottom-btn{
		width: 100%;
		height:calc(120rpx);
		height:calc(120rpx + constant(safe-area-inset-bottom));
		height:calc(120rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;
		position: fixed;
		bottom:0;
		left:0;
		background:#fff;
		z-index: 9;
		display: flex;
		justify-content: center;
		padding:20rpx 39rpx 0 39rpx;
		.small-btn-content{
			width: 100%;
			height:82rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			
			.mini-btn{
				width: 168rpx;
				border:1px solid #E0E0E0;
				display: flex;
				align-items: center;
				justify-content: center;
				
				color: #333333;
				margin-left: 15rpx;
				height: 72rpx;
				line-height: 72rpx;
				font-size: 28rpx;
				border-radius:$btn-radius;
				font-weight: 400;
			}
			.right{
				width: 168rpx;
				background: linear-gradient(90deg, #FA1545 0%, #CF004F 100%);
				border:1px solid $btn-red;
				color: #fff;
				margin-left: 15rpx;
			}
		}
	}
	.yunfei-info {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-bottom: 20rpx solid $content-bg;
	}

.yunfei-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 24rpx 36rpx 0 0;
}
.item-name {
  font-size: 24rpx;
  
  font-weight: 600;
  color: #14151a;
  line-height: 34rpx;
  margin-left: 36rpx;
}
.check-team{
	box-sizing: border-box;
	padding:20rpx 0;
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
  margin-bottom: 20rpx;
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
    max-width: 204rpx;
	height:40rpx;
	background:#F6F7FB;
	text-align: center;
	line-height: 40rpx;
	font-size: 23rpx;
	
	font-weight: 400;
	color: #333333;
	box-sizing: border-box;
	padding:0 12rpx;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.randomh-index-right{
  width: 468rpx;
  height:40rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  .randomh-index-price{
	height:40rpx;
	font-size: 25rpx;
	
	font-weight: 400;
	color: #333333;
	display: flex;
	align-items: center;
	justify-content: flex-end;
  }
  .randomh-index-num{
	width: 120rpx;
	height:40rpx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	font-size: 25rpx;
	
	font-weight: 400;
	color: #88878C;
  }
}
.good-progress {
	background: linear-gradient(90deg, #FF829C 0%, #FA1545 100%);
	width: 160rpx;
	height: 12rpx;
	position: relative;
	display: flex;
	justify-content: flex-end;
	margin:0 auto;
	margin-left: 12rpx;
	.progressMask {
		height: inherit;
		background-color: #FFFFFF;
		width: 0%;
	}
}

// 
</style>
