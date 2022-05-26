<template >
	<view class="content" >
		<!-- 头部状态 -->
		<view class="header">
			<view class="header-state">{{orderState[orderData.state]}}</view>
			<view class="header-state-desc">{{orderData.state==1?'订单将于'+countDownStr+'后关闭':orderStateDesc(orderData)}}</view>
		</view>
		
		<view class="order-box">
			<!-- 商品信息 -->
			<view class="order-index" v-if="orderData.seller" @click="onClickGoodDetail"> 
				<view class="order-index-header">
					<view class="header-left">
						<image class="seller-image" :src="orderData.seller.avatar?decodeURIComponent(orderData.seller.avatar):defaultAvatar" mode="aspectFill"></image>
						<view class="seller-name">{{orderData.seller.name}}</view>
					</view>
					<view class="header-right">
						<view :class="['header-right-index','state'+orderData.state]">{{orderGoodsStateStr(orderData)}}</view>
					</view>
				</view>
				<view class="order-index-center">
					<image class="goods-image" :src="getGoodsImg(decodeURIComponent(orderData.good.pic))" mode="aspectFill"></image>
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
			<!-- 选队随机 自选卡种 -->
			<view class="randomh-box" v-show="optionList!=''" >
				<view class="randomh-index" v-for="(item,index) in optionList" :key="index">
					<view class="randomh-index-left">{{item.name}}</view>
					<view class="randomh-index-right">
						<view class="randomh-index-price">￥{{item.amount}}</view>
						<view class="randomh-index-num">x{{item.num}}件</view>
					</view>
				</view>
			</view>
			<!-- 金额计算 -->
			<view class="order-desc">
				<view class="order-desc-index" v-for="item in orderDesc" :key="item.id" v-show="item.desc!='- ¥0'">
					<view class="name">{{item.name}}</view><view class="info">{{item.desc}}</view>
				</view>
				<view class="order-desc-index">
					<view class="name">合计：</view><view class="info order-totalprice">￥{{orderData.price}}</view>
				</view>
			</view>
			<view class="buyer-cotnent" v-if="cartList!=''">
				<view class="card-header">
					<view class="card-header-title">已选编号</view>
				</view>
				<buyCardId :cardList="cartList" :waitPay="true" />
			</view>

			<!-- 预测卡密 -->
			<!-- order 订单 state 订单状态  guessFreeNum 剩余免单次数 guessNum 预测正确数量 guessName 预测球队名字-->
			<stepGuess v-if="guessType" :state="orderData.good.state" :guessState="guessState" :order="true" :freeNum="guessFreeNum" :guessNum="guessNum" :guessName="guessName" :surplusNum="surplusNum" :guessSuccess="guessSuccess" @onClickSuccessHide="onClickSuccessHide"/>
			<!-- 预测卡密 -->

			<!-- 我的编号 -->
			<view class="buyer-cotnent" v-if="cardList!='' && !clickToPay">
				<view class="card-header">
					<view class="card-header-title">我的卡密<view class="card-header-title-desc">{{orderData.state>2?'+'+orderData.point:'未中卡可获得卡币'}}<image class="order-gold" src="../../static/order/gold.png" /></view></view>
					<view class="card-header-right" @click="onClickAllCard">查看全部<view class="icon-right"></view></view>
				</view>
				<buyCardId :cardList="cardList"/>
			</view>
			<!-- 收货地址 -->
			<view class="address-content" v-if="orderData.receiver">
				<view class="index">
					<view class="address-icon"></view>
					<view class="address-desc">{{orderData.receiver.name}} {{orderData.receiver.phone}}</view>
				</view>
				<view class="address-info">
					{{orderData.receiver.address}}
				</view>
			</view>
			<!-- 订单详细信息 -->
			<view class="order-info" v-if="orderInfo.orderNo.desc!=''">
				<view class="title">订单信息</view>
				<view class="index" v-for="item in orderInfo" :key="item.id" v-show="item.desc!=0">
					<view class="index-left">{{item.title}}</view>
					<view class="index-right">
						{{item.title=='订单编号'||item.title=='支付方式'?item.desc:(item.desc>0?dateFormat(item.desc):'')}}
						<view v-if="item.title=='订单编号'" class="copy" @click="onClickCopyInfo(item.desc)"></view>
					</view>
				</view>
			</view>

			<view class="info-tab">
				<view class="tab-index" @click="onClickKefu"><view class="icon-lianxi"></view>联系客服</view>
				<view class="tab-index" @click="onClickComplain"><view class="icon-tousu"></view>投诉订单</view>
			</view>
		
		</view>

		<!-- 底部按钮 -->
		<view class="bottom-btn" v-if="operateData!=''">
			<view class="small-btn-content" >
				<view class="mini-btn left" :class="{'right':index+1==operateData.length}" v-for="(item,index) in operateData" :key="index" @click="onClickOperate(item.cmd)">{{item.name}}</view>
			</view>
		</view>

		<payment :showPayMent="showPayMent" :payChannel="payChannel" @cancelPay="onClickCancelPay" :payPrice="orderData.price" :countTime="countDown" @pay="onClickPayGoods" />

		<paymentSuccess :showPaySuccess="showPaySuccess" @cancelPaySuccess="onClickcancelPaySuccess"/>
	</view>
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import {getCountDownTime} from '@/tools/util';
	import { app } from "@/app";
	import {
		getGoodsImg,dateFormat
	} from "../../tools/util";
	import {orderState} from "@/net/DataExchange"
	import { orderStateDesc,orderGoodsStateStr,orderSetOperate, getGoodsPintuan } from "@/tools/switchUtil"
	@Component({})
	export default class ClassName extends BaseNode {
		getGoodsImg = getGoodsImg;
		dateFormat = dateFormat;
		orderState = orderState;
		orderStateDesc = orderStateDesc;
		orderGoodsStateStr = orderGoodsStateStr;
		orderSetOperate = orderSetOperate;
		getGoodsPintuan = getGoodsPintuan;

		defaultAvatar = app.defaultAvatar;
		countDownInter:any;
		countDown = 300;
		countDownStr = '';
		orderCode = '';
		orderData:{[x:string]:any} = [];
		orderDesc = [
			{id:1,name:'商品金额',desc:''},
			{id:2,name:'优惠（阶梯奖励）',desc:''},
			{id:3,name:'优惠券',desc:''},
			{id:4,name:'运费',desc:'包邮'},
		];
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
		onLoad(query:any) {
			if(query.code){
				this.orderCode = query.code;
			}
			if(query.waitPay){
				this.clickToPay = true
			}
			setTimeout(()=>{
				this.initEvent(()=>{
					if(this.clickToPay){
						this.getNoShowList();
						if(this.guessNum>0){
							this.guessSuccess = true
						}
					}
				});
			},200)

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
					this.getNoShowList();
					if(this.guessNum>0){
						this.guessSuccess = true
					}
				})
			}
			
		}
		onHide(){
			clearInterval(this.countDownInter);
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
			app.http.Get('me/orderInfo/buyer/'+this.orderCode,{},(res:any)=>{
				this.onceLoad = false;
				this.orderData = res.data
				this.payChannel = res.data.good.payChannel?res.data.good.payChannel:[]
				this.countDown = res.data.leftSec
				this.getCountDown();
				uni.setNavigationBarTitle({
					title: res.data.stateName
				});
				this.getGoodDesc(res.data);
				this.operateData = this.orderSetOperate(res.data);
				if(res.data.good.pintuanType>10){
					app.http.Get('me/orderInfo/buyer/'+this.orderCode+'/option',{},(res:any)=>{
						this.optionList = res.list || []
					})
				}
				this.cartList = [];
				if(res.data.showSelectNo){
					app.http.Get('me/orderInfo/buyer/'+this.orderCode+'/selectList',{pageIndex:1,pageSize:50},(res:any)=>{
						if(res.list){
							this.cartList = res.list
						}
					})
				}
				// 预测卡密
				if(res.data.guess){
					this.guessType = true;
					this.guessFreeNum = res.data.guess.leftNum;
					this.guessNum = res.data.guess.bingoNum;
					this.guessName = res.data.guess.guess;
					this.surplusNum = res.data.good.state>=2? res.data.guess.surplusNum:0;
					this.guessState = res.data.guess.state
					if(res.data.guess.state == 0 && res.data.state != 1){
						setTimeout(()=>{
							this.initEvent();
						},500)
					}
				}
				if(res.data.state==1){
					console.log('订单待支付')
					return;
				}
				setTimeout(()=>{
					this.clickToPay = !res.data.wait ? false : true
				},1000)
				if(res.data.wait){
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
				if(res.data.noList){
					this.cardList = res.data.noList.length>5?res.data.noList.splice(0,5):res.data.noList
				}
				if(cb && !res.data.wait) cb()
			})

			
		}
		// 获取解锁卡密效果
		getNoShowList(){
			let orderRich = app.orderRich;
			if(!orderRich) {
				uni.showToast({
					title:'卡密特效未开启',
					icon:'none'
				})
				return
			};

			app.http.Get('me/orderInfo/buyer/'+this.orderCode+'/noShowList',{pageIndex:1,pageSize:30},(res:any)=>{
				if(res.total>0){
					let type = this.orderData.good.title.indexOf('足球')!=-1?1:0
					uni.navigateTo({
						url:'/pages/goods/drawCard?code='+this.orderCode+'&data='+ encodeURIComponent(JSON.stringify(res.list))+'&num='+res.total+'&hasNumber='+res.hasNumber+'&picType='+type
					})
				}
			})
		}
		
		getGoodDesc(data:any){
			this.orderDesc[0].desc ='¥'+(data.price+data.discount+(data.coupon?data.coupon:0));
			this.orderDesc[1].desc ='- ¥'+data.discount;
			this.orderDesc[2].desc ='- ¥'+(data.coupon?data.coupon:0);
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
			uni.navigateTo({
				url:'/pages/userinfo/order_myCard?code='+this.orderCode+'&goodCode='+this.orderData.good.goodCode+'&pintuanType='+this.orderData.good.pintuanType
			})
		}
		onClickGoodDetail(){
			uni.navigateTo({
				url: '/pages/goods/goods_details?id='+this.orderData.good.goodCode
			})
		}
		onClickKefu(){
			if(this.orderData.kefu>0){
				uni.navigateTo({
					url: '/pages/userinfo/talk?targetUserId='+this.orderData.kefu+'&goodCode='+this.orderData.good.goodCode
				})
			}else{
				uni.showToast({
					title:'当前商品暂无客服',
					icon:'none'
				})
			}
		}
		onClickOperate(cmd:any){
			let params:{[x:string]:any}
			if(cmd=='viewGood'){
				uni.redirectTo({
					url: '/pages/goods/goods_details?id='+this.orderData.good.goodCode
				})
			}
			if(cmd=='resultCard'){
				this.onClcikResult(1)
			}
			if(cmd=='giving'){
				uni.navigateTo({
					url:'/pages/userinfo/giving/giving_list?code='+this.orderData.good.goodCode+'&pintuanType='+this.orderData.good.pintuanType+'&orderCode='+this.orderData.code
				})
			}
			if(cmd == 'wuliu'){
				uni.navigateTo({
					url:'/pages/userinfo/order_logistics?code='+this.orderData.wuliuCode
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
			let random = this.orderData.good.state>0?true:false
			uni.navigateTo({
				url: '/pages/userinfo/goods_result_list?chooseIds=' + chooseID+'&code='+this.orderData.good.goodCode+'&order='+this.orderData.code+'&random='+random
			})
		}
		// 取消支付
		onClickCancelPay(){
			this.showPayMent = false;
		}
		onClickPayGoods(data:any){
			// 1：支付宝 2：微信
			if (data == '') {
				return;
			}
			uni.showLoading({
				title: '加载中'
			});

			
			let params:any = {
				channelId:data.channelId?data.channelId:'',
      			channel: data.channel,
				delivery:0,
				num:Number(this.orderData.num)
			}
			if(uni.getSystemInfoSync().platform === "android"){
				params.nativeSdk = 'qmf_android'
			}
			app.http.Post('order/topay/'+this.orderData.code,params,(res:any)=>{
				if(data.channel=='alipay'){
					if(res.appPayRequest){
						app.payment.paymentAlipayQmfSdk(JSON.stringify(res.appPayRequest));
					}else if(res.alipay.orderInfo!=''){
						this.clickToPay = true;
						uni.hideLoading()
						app.payment.paymentAlipay(res.pay_type,res.alipay.orderInfo)
						this.onClickCancelPay()
					}
				}else{
					if(res.wechat){
						this.clickToPay = true;
						uni.hideLoading()
						app.payment.paymentWxpay(res.pay_type,res.wechat)
						this.onClickCancelPay()
					}
				}
			})
			
		}
		// 支付成功弹窗关闭
		onClickcancelPaySuccess(){
			this.showPaySuccess = false;
		}
		onClickSuccessHide(){
			this.guessSuccess = false;
		}
	}
</script>

<style lang="scss">
	page{
		background:$content-bg;
	}
	.content{
		width: 100%;
		box-sizing: border-box;
		background:$content-bg;
	}
	.header{
		width: 100%;
		height:354rpx;
		background:url(../../static/order/top_bg.png);
		background-size: 100% 100%;
		box-sizing: border-box;
		padding:40rpx 40rpx;
		&-state{
			width: 100%;
			font-size: 37rpx;
			font-family: PingFangSC-Regular;
			font-weight: 600;
			color: #FFFFFF;
			margin-bottom: 5rpx;
		}
		&-state-desc{
			width: 100%;
			font-size: 27rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
	.order-box{
		width: 100%;
		box-sizing: border-box;
		padding:0 14rpx;
	}
	.order{
		&-index{
			width: 100%;
			// height:305rpx;
			padding:0 22rpx 31rpx 22rpx;
			border-radius: 4rpx;
			background:#fff;
			box-sizing: border-box;
			margin-top: -188rpx;
			&-header{
				width: 100%;
				height:93rprx;
				display: flex;
				box-sizing: border-box;
				align-items: center;
				justify-content: space-between;
				.header-left{
					height:93rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					.seller-image{
						width: 40rpx;
						height:40rpx;
						border-radius: 50%;
						margin-right: 16rpx;
					}
					.seller-name{
						height:40rpx;
						line-height: 40rpx;
						font-size: 27rpx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: #333333;
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
						font-family: PingFangSC-Medium, PingFang SC;
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
				height:137rpx;
				display: flex;
				box-sizing: border-box;
				align-items: center;
				.goods-image{
					width: 178rpx;
					height:137rpx;
					border-radius: 4rprx;
					margin-right: 24rpx;
				}
				.goods-content{
					width: 480rpx;
					height:137rpx;
					box-sizing: border-box;
					position: relative;
					.title{
						width: 100%;
						font-size: 28rpx;
						font-family: PingFangSC-Regular;
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
							font-family: PingFang SC;
							font-weight: 400;
							color: #F6F7FB;
							margin-left: 0;
						}
						.price{
							height:40rpx;
							line-height: 40rpx;
							font-size: 25rpx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: #333333;
						}
						.price text{
							font-size: 32rpx;
							font-family: PingFangSC-Medium;
							font-weight: bold;
						}
						.total-num{
							height:40rpx;
							line-height: 40rpx;
							font-size: 25rpx;
							font-family: PingFangSC-Regular;
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
					font-family: PingFangSC-Regular, PingFang SC;
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
		border-top:13rpx solid $content-bg;
		border-bottom: 13rpx solid $content-bg;
		padding: 20rpx 22rpx 0 22rpx;
		background: #fff;
		&-index{
			width: 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20rpx;
			font-size: 25rpx;
			font-weight: 400;
			color: #333333;
		}
		.order-totalprice{
			font-size: 27rpx;
			font-family: PingFangSC-Medium;
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
			font-family: PingFangSC-Regular, PingFang SC;
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
			font-family: PingFangSC-Medium;
			font-weight: 600;
			color: #333333;
			display: flex;
			.card-header-title-desc{
				height:40rpx;
				display: flex;
				align-items: center;
				line-height: 40rpx;
				font-size: 25rpx;
				font-family: PingFangSC-Regular;
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
			font-family: PingFangSC-Regular, PingFang SC;
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
		padding:20rpx;
		border-bottom: 13rpx solid $content-bg;
		background: #fff;
	}
	.address-content{
		width: 100%;
		box-sizing: border-box;
		border-bottom: 13rpx solid $content-bg;
		padding:30rpx 25rpx;
		background: #fff;
		.title{
			width: 100%;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
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
				font-family: PingFangSC-Regular;
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
			font-family: PingFangSC-Regular;
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
		padding:30rpx 22rpx 10rpx 22rpx;
		border-bottom: 13rpx solid $content-bg;
		
		.title{
			width: 100%;
			font-size: 31rpx;
			font-family: PingFangSC-Medium;
			font-weight: 600;
			color: #333333;
			margin-bottom: 30rpx;
		}
		.index{
			width: 100%;
			display: flex;
			height:40rpx;
			align-items: center;
			margin-bottom: 20rpx;
			justify-content: space-between;
			.index-left{
				height:40rpx;
				display: flex;
				align-items: center;
				font-size: 25rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #333333;
			}
			.index-right{
				height:40rpx;
				display: flex;
				align-items: center;
				font-size: 25rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #C6C6C8;
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
		padding:0 96rpx;
		justify-content: space-between;
		margin-bottom: calc(120rpx);
		margin-bottom: calc(120rpx + constant(safe-area-inset-bottom));
		margin-bottom: calc(120rpx + env(safe-area-inset-bottom));
		.tab-index{
			height:80rpx;
			display: flex;
			align-items: center;
			font-size: 27rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #333333;
			.icon-lianxi{
				width: 42rpx;
				height:40rpx;
				background:url(../../static/order/kefu.png) no-repeat center;
				background-size: 100% 100%;
				margin-right:16rpx
			}
			.icon-tousu{
				width: 36rpx;
				height:38rpx;
				background:url(../../static/order/tousu.png) no-repeat center;
				background-size: 100% 100%;
				margin-right:16rpx
			}
		}
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
				width: 180rpx;
				border:1px solid #DADADA;
				display: flex;
				align-items: center;
				justify-content: center;
				font-family: PingFangSC-Regular;
				color: #88878c;
				margin-left: 15rpx;
				height: $btn-height;
				line-height: $btn-height;
				font-size: $btn-fontSize;
				border-radius:$btn-radius;
				font-weight: $btn-weight;
			}
			.right{
				width: 180rpx;
				background: $btn-red;
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
  font-family: PingFangSC-Medium, PingFang SC;
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
	font-family: PingFang SC;
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
	font-family: PingFang SC;
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
	font-family: PingFang SC;
	font-weight: 400;
	color: #88878C;
  }
}
// 
</style>
