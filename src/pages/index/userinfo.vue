<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="tab-header">
				<view class="icon-sett" @click="onClickSet"><text>&#xe502;</text></view>
			</view>
		</view>
		
		<view class="user-content" :style="'padding-top:'+statusBarHeight+'px'">
			<view class="user-header">
				<view class="header-top" @click="onClickGoMyInfo">
					<view class="header-top-left">
						<image class="user-avatar" :src="infoData.avatar?decodeURIComponent(infoData.avatar):defaultAvatar" mode=""></image>
						<view class="user-desc">
							<view class="user-name">{{infoData.name}}</view>
						</view>
					</view>
					<text class="icon-ui">&#xe470;</text>
				</view>
				<view class="user-level" @click="onClickVipLevel" v-if="infoData.buyer">{{infoData.buyer.title}}</view>
				<view class="header-tab-content">
					<view class="header-tab" v-for="(item,index) in tabData" :key="index" @click="onClickGoTab(item.url)">
						<view class="header-tab-num">{{item.num}}</view>
						<view class="header-tab-text">{{item.text}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="my-btn-content">
			<view class="button r-border" @click="onClickBidbuyer()">
				我的竞拍
				<view class="font-r">
					{{infoData.buyer?infoData.buyer.bid:''}}
					<text class="icon-ui">&#xe470;</text>
				</view>
			</view>
			<view class="button" @click="onClickNegobuyer()">
				我的议价
				<view class="font-r">
					{{infoData.buyer?infoData.buyer.negotiate:''}}
					<text class="icon-ui">&#xe470;</text>
				</view>
			</view>
		</view>
		<view class="manager-content">
			<view class="manager-title" @click="onClickJumpOrderBuyer(0)">购买<text class="icon-ui">&#xe470;</text></view>
			<view class="buttons-content">
				<button class="button-item" v-for="(item,index) in buyerBtns" :key="index" @click="onClickJumpOrderBuyer(item.id+1)">
					<view v-if="item.num>0" class="icon-yuan" :class="item.num>=10?'icon-yuans':''">{{item.num}}</view>
					<image class="icon-image" :src="item.url"/>
					<text class="des">{{item.name}}</text>
				</button>
			</view>
		</view>
		<view class="manager-content manager-border">
			<view class="manager-title"  @click="onClickJumpOrderSeller(0)">出售<text class="icon-ui">&#xe470;</text></view>
			<view class="buttons-content">
				<button class="button-item" v-for="(item,index) in sellerBtns" :key="index" @click="onClickJumpOrderSeller(item.id+1)">
					<view class="button-num">{{item.num>0?item.num:0}}</view>
					<text class="des">{{item.name}}</text>
				</button>
			</view>
			<view class="seller-in" @click="onClickShopIn">
				<view class="seller-in-title">卖家入驻</view>
				<view class="seller-in-right"><view class="seller-in-desc">获得更多权限和福利</view><text class="icon-ui">&#xe470;</text></view>
			</view>
		</view>
		<view class="manager-content  manager-border">
			<view class="manager-title">其他</view>
			<view class="buttons-content">
				<button class="button-item" @click="onClickGoTab(item.url_)" v-for="(item,index) in otherBtns" :key="index">
					<image class="icon-image" :src="item.url"/>
					<text class="des">{{item.name}}</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script lang="js">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import {userinfo,index} from '../../net/DataDefine';
	@Component({})
	export default class ClassName extends BaseNode {
		statusBarHeight = app.statusBarHeight;
		defaultAvatar = app.defaultAvatar
		tabData = {
			money:{num:0,text:'趣币',url:'/pages/userinfo/payindex'},
			coupon:{num:0,text:'优惠券',url:'/pages/userinfo/coupon'},
			favorite:{num:0,text:'收藏',url:'/pages/userinfo/userfavorite'},
			history:{num:0,text:'足迹',url:'/pages/userinfo/userstrack'}
		}
		infoData = {};
		buyerBtns = {
			toPay:{id:0,name:'待支付',url:'/static/userinfo/0.png',num:0},
			toDeliver:{id:1,name:'待发货',url:'/static/userinfo/1.png',num:0},
			toTake:{id:2,name:'待收货',url:'/static/userinfo/2.png',num:0},
			toAppraise:{id:3,name:'待评价',url:'/static/userinfo/3.png',num:0}
		}
		sellerBtns = {
			toPay:{id:0,name:'待支付',url:'/static/userinfo/0.png',num:0},
			toDeliver:{id:1,name:'待发货',url:'/static/userinfo/1.png',num:0},
			toTake:{id:2,name:'待收货',url:'/static/userinfo/2.png',num:0},
			toAppraise:{id:3,name:'待评价',url:'/static/userinfo/3.png',num:0},
			toware:{id:5,name:'商品仓库',url:'/static/userinfo/5.png',num:0},
			onNegotiate:{id:4,name:'收到议价',url:'/static/userinfo/4.png',num:0},
			sellerPersonal:{id:7,name:'卖家中心',url:'',num:0}
		}
		otherBtns = [
			{name:'客服中心',url:'/static/userinfo/6.png',url_:'/pages/userinfo/contact_service'},
			{name:'BUG反馈',url:'/static/userinfo/7.png',url_:'/pages/userinfo/bug_complain'},
			{name:'邀请有奖',url:'/static/userinfo/8.png'},
		]
		onLoad(query) {
			if(app.token.accessToken == ''){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		}
		onShow(){
			this.initPageData();
		}
		//   下拉刷新
		onPullDownRefresh(){
			this.initPageData(()=>{
				setTimeout(()=>{
					uni.stopPullDownRefresh();
				},1000)
			})
		}
		initPageData(cb){
			app.http.Get('me/home',{},(res)=>{
				console.log(res)
				let data = res.data;
				this.infoData = data;
				this.infoData.avatar = this.infoData.avatar
				for (const key in this.tabData) {
					if (Object.prototype.hasOwnProperty.call(data, key)) {
						this.tabData[key].num = data[key];
					}
				}
				let buyerData = data.buyer 
				for (const key in this.buyerBtns) {
					if (Object.prototype.hasOwnProperty.call(buyerData, key)) {
						this.buyerBtns[key].num = buyerData[key];	
					}
				}
				let sellData = data.seller
				for (const key in this.sellerBtns) {
					if (Object.prototype.hasOwnProperty.call(sellData, key)) {
						this.sellerBtns[key].num = sellData[key];	
					}
				}
				if(cb) cb()
			});
		}
		onClickGoMyInfo(){
			uni.navigateTo({
				url:'/pages/userinfo/userinfo?data='+encodeURIComponent(JSON.stringify(this.infoData))
			})
		}
		onClickGoTab(url){
			uni.navigateTo({
				url:url
			})
		}
		onClickVipLevel(){
			uni.navigateTo({
				url:'/pages/userinfo/vip_level?level='+this.infoData.buyer.title+'&num='+this.infoData.buyer.bought
			})
		}
		onClickSet(){
			uni.navigateTo({
				url:'/pages/userinfo/setting'
			})
		}
		onClickNegobuyer(){
			uni.navigateTo({
				url: '/pages/userinfo/negobuyer'
			})
		}
		onClickBidbuyer(){
			uni.navigateTo({
				url: '/pages/userinfo/bidbuyer'
			})
		}
		onClickJumpOrderBuyer(index){
			uni.navigateTo({
				url: '/pages/userinfo/orderlistbuyer?tp='+index
			})
		}
		onClickJumpOrderSeller(index){
			if(index == 5){
				uni.navigateTo({
					url: '/pages/userinfo/negoseller'
				})
				return;
			}
			
			if(index == 6){
				uni.navigateTo({
					url: '/pages/userinfo/orderware'
				})
				return;
			}
			
			if(index==8){
				uni.navigateTo({
					url: '/pages/userinfo/seller_personal?data='+encodeURIComponent(JSON.stringify(this.infoData))
				})
				return;
			}
			uni.navigateTo({
				url: '/pages/userinfo/orderlistseller?tp='+index
			})
		}
		onClickShopIn(){
			uni.navigateTo({
				url: '/pages/userinfo/shop_enter'
			})
		}
	}
</script>

<style>
	page{
		background: #Fff;
	}
	.icon-ui{
		width: 30rpx;
		height: 50rpx;
		background-color: rgba(0, 0, 0, 0);
		font-family: uniicons;
		font-size: 28rpx;
		font-weight: normal;
		font-style: normal;
		line-height: 50rpx;
		color: #C4C3C8;
		margin: 0
	}
	.icon-image{
		width: 52.2rpx;
		height: 48.6rpx;
		margin-bottom: 10rpx;
	}
	.button-num{
		width: 100%;
		text-align: center;
		font-size: 36rpx;
		font-family: Arial Rounded MT Bold;
		font-weight: bold;
		color: #3B3B3B;
		margin-bottom: 10rpx;
	}
	.icon-text{
		width: auto;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 30rpx;
		font-family: Arial Rounded MT Bold;
		font-weight: bold;
		color: #3B3B3B;
	}
	.button-item{
		width: 120rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10rpx;
		background: #fff;
		margin: 10rpx 30rpx;
		position: relative;
		overflow: initial;
	}
	.button-item .des{
		font-size: 24rpx;
		line-height: 40rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #3B3B3B;
	}
	.icon-yuan{
		width: 30rpx;
		height:30rpx;
		line-height: 30rpx;
		text-align: center;
		background:#FD0000;
		border-radius: 40rpx;
		position: absolute;
		right:15rpx;
		top:-10rpx;
		font-size: 20rpx;
		color:#fff;
		z-index: 10;
		border:1px solid #fff;
		font-weight: bold;
	}
	.icon-yuans{
		padding:0 6rpx
	}
	.buttons-content{
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: start;
		box-sizing: border-box;
		padding-bottom: 30rpx;
	}
	.header-banner{
		width: 100%;
		background:#fff;
		position: fixed;
		left:0;
		top:0;
		box-sizing: border-box ;
		z-index: 9;
	}
	.tab-header{
		width: 100%;
		height:80rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 30rpx;
		z-index: 10;
		position: relative;
	}
	.icon-sett{
		position: absolute;
		right:30rpx;
		bottom:12rpx;

		font-family:uniicons;
		color: #0c0c0c;
		font-weight: bold;
		font-size: 40rpx;
	}
	.user-content{
		width: 100%;
		box-sizing: border-box;
		margin-top: 88rpx;
	}
	.user-header{
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
		border-bottom: 14rpx solid #F5F5F9;
		background:#fff;
		position: relative;
	}
	.header-top{
		width: 100%;
		box-sizing: border-box;
		height:110rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 40rpx;
	}
	.header-top-left{
		width: 100%;
		height:110rpx;
		display: flex;
		align-items: center;
	}
	.user-avatar{
		width: 110rpx;
		height:110rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.user-desc{
		height:100rpx;
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
	}
	.user-name{
		width: 100%;
		height:44rpx;
		line-height: 44rpx;
		font-size: 36rpx;
		font-family: HYQiHei;
		font-weight: bold;
		color: #3B3B3B;
		display: flex;
		align-items: center;
	}

	.user-hp{
		width: 100%;
		font-size: 22rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #7B7B7B;
	}
	.header-tab-content{
		width: 100%;
		height:80rpx;
		margin-bottom: 50rpx;
		box-sizing: border-box;
		padding:0 14rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.header-tab{
		width:100rpx;
		height:80rpx;
		justify-content: center;
		flex-wrap: wrap;
	}
	.header-tab-num{
		width: 100%;
		font-size: 36rpx;
		font-family: Arial Rounded MT Bold;
		font-weight: bold;
		color: #3B3B3B;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 10rpx;
	}
	.header-tab-text{
		width: 100%;
		text-align: center;
		font-size: 24rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #7B7B7B;
	}

	.my-btn-content{
		width: 100%;
		height: 100rpx;
		background: #F0F0F0;
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid #F0F0F0;
	}
	.my-btn-content .button{
		width: 50%;
		height: 100rpx;
		background: #fff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		font-size: 30rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #3B3B3B;
	}
	.r-border{
		border-right:1px solid #F0F0F0;
	}

	.manager-title{
		width: 100%;
		height: 96rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		font-family: HYQiHei;
		font-weight: bold;
		color: #3B3B3B;
	}
	.manager-content{
		width: 100%;
		height: auto;
		background: #fff;
	}
	.manager-border{
		border-top: 14rpx solid #F5F5F9;
	}
	.seller-in{
		width: 100%;
		height:100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid #F5F5F9;
		box-sizing: border-box;
		padding:0 30rpx;
	}
	.seller-in-title{
		height:100rpx;
		line-height: 100rpx;
		font-size: 32rpx;
		font-family: HYQiHei;
		font-weight: bold;
		color: #3B3B3B;
	}
	.seller-in-right{
		height:100rpx;
		display: flex;
		align-items: center;
	}
	.seller-in-desc{
		font-size: 22rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #7B7B7B;
		height:100rpx;
		line-height: 100rpx;
		margin-right: 10rpx;
	}
	.font-r{
		font-size: 30rpx;
		font-family: Arial Rounded MT Bold;
		font-weight: 400;
		color: #7B7B7B;
	}
	.user-level{
		height:36rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding:0 20rpx;
		background: #000000;
		border-radius: 30rpx;
		font-size: 19rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #FFFFFF;
		position: absolute;
		left:160rpx;
		top:44rpx;
	}
</style>
