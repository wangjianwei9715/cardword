<template>
	<view class="content">
		<!-- 头部状态 -->
		<view class="header" v-if="orderData.good">
			<view v-if="orderData.state==1" class="header-waitpay">订单将于 {{countDownStr}} 后关闭</view>
			<view v-else-if="orderData.state<0" class="header-close">{{orderData.desc?orderData.desc:''}}</view>
			<view v-else-if="orderData.state>=2" class="header-orther">
				<view class="header-statestr">{{orderData.desc?orderData.desc:''}}</view>
				<view class="header-btn-content">
					<view class="header-btn-pintuan" @click="onClcikResult(0)">拼团结果</view>
					<view class="header-btn-chaika" @click="onClcikResult(1)">拆卡报告</view>
				</view>
			</view>
		</view>
		<!-- 商品信息 -->
		<view class="order-index" v-if="orderData.seller" @click="onClickGoodDetail"> 
			<view class="order-index-header">
				<view class="header-left">
					<image class="seller-image" :src="orderData.seller.avatar?decodeURIComponent(orderData.seller.avatar):defaultAvatar" mode="aspectFill"></image>
					<view class="seller-name">{{orderData.seller.name}}</view>
				</view>
				<view class="header-right">
					<view :class="['header-right-index','state'+orderData.state]">{{orderData.good.stateName}}</view>
				</view>
			</view>
			<view class="order-index-center">
				<image class="goods-image" :src="getGoodsImg(decodeURIComponent(orderData.good.pic))" mode="aspectFill"></image>
				<view class="goods-content">
					<view class="title">{{orderData.good.title}}</view>
					<view class="desc">
						<view class="price">￥{{orderData.price}}</view>
						<view class="total-num">共{{orderData.num}}件</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 金额计算 -->
		<view class="order-desc">
			<view class="order-desc-index" v-for="item in orderDesc" :key="item.id" v-show="item.desc!='- ¥0'">
				<view class="name">{{item.name}}</view><view class="info">{{item.desc}}</view>
			</view>
			<view class="order-desc-bottom">
				合计：<view class="price-index">￥<text class="price-num">{{orderData.price}}</text></view>
			</view>
		</view>
		<view class="buyer-cotnent" v-if="cartList!=''">
			<view class="card-header">
				<view class="card-header-title">已选编号</view>
			</view>
			<buyCardId :cardList="cartList" :waitPay="true" />
		</view>
		<!-- 我的编号 -->
		<view class="buyer-cotnent" v-if="cardList!=''">
			<view class="card-header">
				<view class="card-header-title">我的编号</view>
				<view class="card-header-right" @click="onClickAllCard">查看全部<view class="icon-right"></view></view>
			</view>
			<buyCardId :cardList="cardList"/>
		</view>
		<!-- 收货地址 -->
		<view class="address-content" v-if="orderData.receiver">
			<view class="title">收货地址</view>
			<view class="index">
				<view class="address-icon"></view>
				<view class="address-desc">{{orderData.receiver.address}}</view>
			</view>
			<view class="address-info">
				<view class="name">{{orderData.receiver.name}}</view>{{orderData.receiver.phone}}
			</view>
		</view>
		<!-- 订单详细信息 -->
		<view class="order-info" v-if="orderInfo.orderNo.desc!=''">
			<view class="title">订单信息</view>
			<view class="index" v-for="item in orderInfo" :key="item.id" v-show="item.desc!=0">
				<text v-if="item.title=='订单编号'||item.title=='支付方式'">{{item.title}}:{{item.desc}}</text>
				<text v-else>{{item.title}}:{{item.desc>0?dateFormat(item.desc):''}}</text>
				<view v-if="item.title=='订单编号'" class="copy" @click="onClickCopyInfo(item.desc)">复制</view>
			</view>
			<view class="info-tab">
				<view class="tab-index" @click="onClickKefu"><view class="icon-lianxi"></view>联系客服</view>
				<view class="tab-index" @click="onClickComplain"><view class="icon-tousu"></view>投诉订单</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="bottom-btn" v-if="orderData.operate">
			
			<view class="small-btn-content" v-if="orderData.operate.length>1">
				<view class="small-btn left" v-for="(item,index) in orderData.operate" :key="index" @click="onClickOperate(item.cmd)">{{item.name}}</view>
			</view>
			<view v-else class="big-btn" @click="onClickOperate(orderData.operate[0].cmd)">{{orderData.operate[0].name}}</view>
		</view>

		<payment :showPayMent="showPayMent" @cancelPay="onClickCancelPay" :payPrice="orderData.price" :countTime="countDown" @pay="onClickPayGoods" />

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
	@Component({})
	export default class ClassName extends BaseNode {
		getGoodsImg = getGoodsImg;
		dateFormat = dateFormat;
		defaultAvatar = app.defaultAvatar;
		countDownInter:any;
		countDown = 300;
		countDownStr = '';
		orderCode = '';
		orderData:{[x:string]:any} = [];
		orderDesc = [
			{id:1,name:'商品金额',desc:''},
			{id:2,name:'优惠',desc:''},
			{id:3,name:'运费',desc:'包邮'},
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
		showPayMent = false;
		cartList:any = [];
		showPaySuccess = false;
		clickToPay = false;
		onLoad(query:any) {
			if(query.code){
				this.orderCode = query.code;
			}
			if(query.waitPay){
				setTimeout(()=>{
					this.clickToPay = true
				},1000)
			}
			this.initEvent();

			this.onEventUI('orderchange',()=>{
				this.initEvent();
			})

			this.onEventUI('paySuccess',()=>{
				this.showPaySuccess = true;
				this.clickPayShowLoading()
			})
		}
		onShow(){
			if(this.clickToPay){
				this.clickPayShowLoading()
			}
			
		}
		onHide(){
			clearInterval(this.countDownInter);
		}
		clickPayShowLoading(){
			uni.showLoading({
				title: '获取订单状态中',
				mask:true
			})
			setTimeout(()=>{
				this.initEvent();
				uni.hideLoading();
				this.clickToPay = false;
			},2000)
		}
		initEvent(cb?:Function){
			app.http.Get('me/orderInfo/buyer/'+this.orderCode,{},(res:any)=>{
				this.orderData = res.data
				this.countDown = res.data.leftSec
				this.getCountDown()
				uni.setNavigationBarTitle({
					title: res.data.stateName
				});
				this.getGoodDesc(res.data)
				this.cartList = [];
				if(res.data.showSelectNo){
					app.http.Get('me/orderInfo/buyer/'+this.orderCode+'/selectList',{pageIndex:1,pageSize:50},(res:any)=>{
						if(res.list){
							this.cartList = res.list
						}
					})
				}
				if(res.data.state>=2){
					app.http.Get('me/orderInfo/buyer/'+this.orderCode+'/noList',{pageIndex:1,pageSize:5},(res:any)=>{
						if(res.list){
							this.cardList = res.list
						}
					})
				}
				if(cb) cb()
			})

			
		}
		getGoodDesc(data:any){
			this.orderDesc[0].desc ='¥'+(data.price+data.discount);
			this.orderDesc[1].desc ='- ¥'+data.discount;
			for (const key in this.orderInfo) {
				if (Object.prototype.hasOwnProperty.call(data.payInfo, key)) {
					this.orderInfo[key].desc = data.payInfo[key];
				}
			}
			this.orderInfo['orderNo'].desc = this.orderData.code
		}
		getCountDown(){
			this.countDownStr = getCountDownTime(this.countDown);
			console.log(this.countDownStr)
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
				url:'/pages/userinfo/order_myCard?code='+this.orderCode
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
				uni.navigateTo({
					url: '/pages/goods/goods_details?id='+this.orderData.good.goodCode
				})
			}

			if(cmd.indexOf('wuliu')!=-1){
				let wuliucode = cmd.slice(6)
				uni.navigateTo({
					url:'/pages/userinfo/order_logistics?code='+wuliucode
				})
			}

			if(cmd=='toPay'){
				// #ifdef MP
				params= {
					channel:'mini',
					delivery:0,
					num:Number(this.orderData.num)
				}
				uni.showLoading({
					title: '加载中'
				});
				app.http.Post('order/topay/'+this.orderData.code,params,(res:any)=>{
					uni.hideLoading()
					app.payment.paymentMini(res.wechat,(data:any)=>{
						uni.$emit('orderchange')
					})
				})
				// #endif
				// #ifndef MP
				this.showPayMent = true
				
				// #endif
				
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
							console.log('用户点击取消');
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
							console.log('用户点击取消');
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
				success: function () {
					uni.showToast({
						title:'复制成功',
						icon:'none'
					})
				}
			});
		}
		onClcikResult(chooseID:any){
			uni.navigateTo({
				url: '/pages/userinfo/goods_result_list?chooseIds=' + chooseID+'&code='+this.orderData.good.goodCode+'&order='+this.orderData.code
			})
		}
		// 取消支付
		onClickCancelPay(){
			this.showPayMent = false;
		}
		onClickPayGoods(type:any){
			// 1：支付宝 2：微信
			if(type==0){
				return;
			}
			uni.showLoading({
				title: '加载中'
			});

			
			let params = {
				channel:'',
				delivery:0,
				num:Number(this.orderData.num)
			}
			if(type==1){
				params.channel = 'alipay';
				app.http.Post('order/topay/'+this.orderData.code,params,(res:any)=>{
					if(res.alipay.orderInfo!=''){
						this.clickToPay = true;
						uni.hideLoading()
						app.payment.paymentAlipay(res.pay_type,res.alipay.orderInfo)
						this.onClickCancelPay()
					}
				})
			}else if(type==2){
				// uni.showToast({
				// 	title:'暂时无法使用微信支付，请使用支付宝支付',
				// 	icon:'none'
				// })
				// return;
				params.channel = 'weixin';
				app.http.Post('order/topay/'+this.orderData.code,params,(res:any)=>{
					if(res.wechat){
						this.clickToPay = true;
						uni.hideLoading()
						app.payment.paymentWxpay(res.pay_type,res.wechat)
						this.onClickCancelPay()
					}
				})
			}
		}
		// 支付成功弹窗关闭
		onClickcancelPaySuccess(){
			this.showPaySuccess = false;
		}
	}
</script>

<style lang="scss">
	.page{
		background:#fff;
	}
	.content{
		width: 100%;
		box-sizing: border-box;
	}
	.header{
		width: 100%;
		&-waitpay{
			width: 100%;
			height:60rpx;
			background:#FFF7E4;
			text-align: center;
			line-height: 60rpx;
			font-size: 26rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #DAAC61;
		}
		&-close{
			width: 100%;
			height:100rpx;
			background: linear-gradient(180deg, #E6E6E6 0%, #FFFFFF 100%);
			box-sizing: border-box;
			padding:0 32rpx;
			line-height: 100rpx;
			font-size: 26rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #828292;
		}
		&-orther{
			width: 100%;
			height:100rpx;
			background: linear-gradient(180deg, #FFEDE2 0%, #FFFFFF 100%);
			box-sizing: border-box;
			padding:0 32rpx;
			font-size: 26rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #393939;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		&-statestr{
			height:100rpx;
			line-height: 100rpx;
			font-size: 26rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			background: linear-gradient(90deg, #FE7348 0%, #FF9353 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
		&-btn-content{
			height:60rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.header-btn-pintuan{
				width: 148rpx;
				height: 60rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #FFF8F4;
				border-radius: 4rpx;
				border: 1px solid #FE7348;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FE7348;
			}
			.header-btn-chaika{
				width: 148rpx;
				height: 60rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #FFF8F4;
				border-radius: 4rpx;
				border: 1px solid #FF9353;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #FF9353;
				margin-left: 28rpx;
			}
		}
	}
	.order{
		&-index{
			width: 710rpx;
			height:270rpx;
			border-radius: 4rpx;
			background:#fff;
			box-sizing: border-box;
			margin-bottom: 20rpx;
			&-header{
				width: 100%;
				height:80rprx;
				display: flex;
				box-sizing: border-box;
				padding:0 20rpx 0 28rpx;
				align-items: center;
				justify-content: space-between;
				.header-left{
					height:80rpx;
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
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #14151A;
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
						font-size: 24rpx;
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
				height:160rpx;
				display: flex;
				box-sizing: border-box;
				padding:0 20rpx;
				align-items: center;
				.goods-image{
					width: 160rpx;
					height:160rpx;
					border-radius: 4rprx;
					margin-right: 24rpx;
				}
				.goods-content{
					width: 486rpx;
					height:160rpx;
					box-sizing: border-box;
					padding:12rpx 0;
					.title{
						width: 100%;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #14151A;
						margin-bottom: 20rpx;
					}
					.desc{
						width: 100%;
						height:40rpx;
						display: flex;
						box-sizing: border-box;
						align-items: center;
						justify-content: space-between;
						.price{
							height:40rpx;
							line-height: 40rpx;
							font-size: 30rpx;
							font-family: DINAlternate-Bold, DINAlternate;
							font-weight: bold;
							color: #14151A;
						}
						.total-num{
							height:40rpx;
							line-height: 40rpx;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #AAAABB;
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
		border-top:20rpx solid #F2F2F2;
		border-bottom: 20rpx solid #F2F2F2;
		padding: 20rpx 32rpx 0 32rpx;
		&-index{
			width: 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #14151A;
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
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #14151A;
		}
		&-right{
			height:40rpx;
			display: flex;
			align-items: center;
			font-size: 22rpx;
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
		border-bottom: 20rpx solid #F2F2F2;
	}
	.address-content{
		width: 100%;
		box-sizing: border-box;
		border-bottom: 20rpx solid #F2F2F2;
		padding:20rpx 32rpx;
		.title{
			width: 100%;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
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
				width: 32rpx;
				height:38rpx;
				background:url(../../static/goods/icon_location.png) no-repeat center;
				background-size: 100% 100%;
				margin-right: 24rpx;
			}
			.address-desc{
				width: 620rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #14151A;
				line-height: 34rpx;
			}
		}
		.address-info{
			width: 100%;
			box-sizing: border-box;
			padding-left: 56rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #7F7F8E;
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
		padding:20rpx 32rpx;
		border-bottom: 20rpx solid #F2F2F2;
		margin-bottom: 110rpx;
		.title{
			width: 100%;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #14151A;
			margin-bottom: 24rpx;
		}
		.index{
			width: 100%;
			display: flex;
			align-items: center;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #14151A;
			margin-bottom: 20rpx;
		}
		.copy{
			width: 64rpx;
			height: 38rpx;
			border-radius: 4rpx;
			border: 1px solid #D2D2DB;
			box-sizing: border-box;
			margin-left: 16rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #828292;
		}
		.info-tab{
			width: 100%;
			height:84rpx;
			box-sizing: border-box;
			border-top: 1px solid #F1F1F4;
			display: flex;
			align-items: center;
			padding:0 120rpx;
			justify-content: space-between;
			.tab-index{
				height:80rpx;
				display: flex;
				align-items: center;
				.icon-lianxi{
					width: 34rpx;
					height:32rpx;
					background:url(../../static/userinfo/liaotian.png) no-repeat center;
					background-size: 100% 100%;
					margin-right:16rpx
				}
				.icon-tousu{
					width: 34rpx;
					height:32rpx;
					background:url(../../static/userinfo/tousu@2x.png) no-repeat center;
					background-size: 100% 100%;
					margin-right:16rpx
				}
			}
		}
	}
	.bottom-btn{
		width: 100%;
		height:110rpx;
		box-sizing: border-box;
		position: fixed;
		bottom:0;
		left:0;
		background:#fff;
		z-index: 9;
		display: flex;
		align-items: center;
		justify-content: center;
		.big-btn{
			width: 718rpx;
			height: 88rpx;
			border:1px solid #FB4E3E;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FB4E3E;
			border-radius: 20rpx;
		}
		.small-btn-content{
			width: 100%;
			height:110rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			.small-btn{
				width: 352rpx;
				height: 88rpx;
				border-radius: 4rpx;
				border: 1px solid #14151B;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #14151B;
				margin:0 7rpx
			}
			.right{
				background: #14151B;
				color: #fff;
			}
		}
	}
	.yunfei-info {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-bottom: 20rpx solid #f2f2f2;
	}

.yunfei-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 24rpx 36rpx 0 0;
}
.item-name {
  font-size: 24rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #14151a;
  line-height: 34rpx;
  margin-left: 36rpx;
}
.check-team{
	box-sizing: border-box;
	padding:20rpx 0;
}
</style>
