<template>
	<view class="content">
		<view class="user-header">
			<view class="header-top">
				<view class="header-top-left" @click="onClickUserInfo">
					{{infoData.name}}
					<view class="header-icon-right"></view>
				</view>
				<view class="header-top-right">
					<view class="icon-setting" @click="navigateTo('/pages/userinfo/setting')"></view>
					<view class="icon-xiaoxi" @click="navigateTo('/pages/userinfo/message')"><view class="xiaoxi-num" v-if="infoData.unReadMsg>0">{{infoData.unReadMsg>99?'99+':infoData.unReadMsg}}</view></view>
				</view>
			</view>
			<view class="header-center">
				<view class="avatar-border">
					<muqian-lazyLoad @click="onClickUserInfo" class="user-avatar" :src="infoData.avatar?infoData.avatar:defaultAvatar" mode="aspectFit" :borderRadius="'50%'" />
				</view>
				<view class="header-tab-box">
					<view class="header-tab-index" v-for="item in headerTab" :key="item.id" @click="onClickServiceTab(item)">
						<view class="header-tab-index-num">{{item.num}}</view>
						<view class="header-tab-index-name">{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="user-v2-box">
			<view class="user-v2-langtab">
				<view class="user-v2-langtab-index" @click="onClickServiceTab(item)" v-for="item in walletTab" :key="item.id">
					<view class="langtab-left">
						<!-- <image class="langtab-left-pic" :src="item.pic" /> -->
						{{item.name}}
					</view>
					<view class="langtab-right">
						{{item.num}}<view class="icon-right"></view>
					</view>
				</view>
			</view>

			<view class="user-order">
				<view class="header">
					<view class="title">我的订单</view>
					<view class="right" @click="onClickOrderList(0)">查看全部<view class="icon-right"></view></view>
				</view>
				<view class="tab-content">
					<view class="tab" v-for="(item,index) in orderTab" :key="item.id" @click="onClickOrderList(item.id)">
						<view v-if="item.num>0&&item.name!='已完成'" class="icon-yuan" :class="item.num>=10?'icon-yuans':''">{{item.num>99?'99+':item.num}}</view>
						<view class="icon-content">
							<image class="tab-icon" :src="'../../static/userinfo/v2/icon_user_'+index+'.png'" />
						</view>
						<view class="name">{{item.name}}</view>
					</view>
				</view>
				
			</view>

			<view class="user-order">
				<view class="header">
					<view class="title">更多功能</view>
				</view>
				<view class="tab-content">
					<view class="tab" v-for="(item,index) in serviceTab" :key="item.id" @click="onClickServiceTab(item)">
						<view v-if="item.num&&item.num>0" class="icon-yuan" :class="item.num>=10?'icon-yuans':''">{{item.num>99?'99+':item.num}}</view>
						<view class="icon-content">
							<image class="tab-icon" :src="'../../static/userinfo/v2/icon_user_'+index+'.png'" />
						</view>
						<view class="name">{{item.name}}</view>
					</view>
				</view>
			</view>

			<view class="orther-setting">
				
				<view class="setting" v-if='infoData.merchantActor' @click="onClickNavigateto({url:`/pages/merchant/core?alias=${infoData.merchantActor}&isMerchant=1`})">
					<view class="name">
						<image class="setting-icon" src="../../static/userinfo/v2/liveCamera.png" />
						商家主页
					</view>
					<view class="icon-right"></view>
				</view>
				<view class="setting" v-for="item in settingTab" :key="item.id" @click="onClickNavigateto(item)">
					<view class="name">
						<image class="setting-icon" :src="item.pic" />
						{{item.name}}
					</view>
					<view class="icon-right"></view>
				</view>
				<view class="setting" v-if='infoData.merchantActor'  @click="onClickNavigateto({url:`/pages/merchant/guide`})">
					<view class="name">
						<image class="setting-icon" src="../../static/userinfo/v2/guide.png" />
						商家指南
					</view>
					<view class="icon-right"></view>
				</view>
				<navigator v-if="invoice.open" url="/pages/userinfo/invoice/index" hover-class="none">
					<view class="setting">
						<view class="name">
							<image class="setting-icon" src="@/static/userinfo/v2/icon_b_invoice.png" />开票入口
						</view>
						<view class="icon-right"></view>
					</view>
				</navigator>
			</view>

		</view>
		

		<paymentSuccess :showPaySuccess.sync="showPaySuccess" :showJoin="true"/>
	</view>
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseNode {
		infoData:{[x:string]:any} = [];
		defaultAvatar = app.defaultAvatar;
		broadcastActor=app.broadcastActor;
		headerTab:{[x: string]: any} = {
			follows:{id:1,name:'关注',num:0,url:'/pages/userinfo/user_follow'},
			favorite:{id:2,name:'收藏',num:0,url:'/pages/userinfo/user_collect'},
			// cabinetCard:{id:3,name:'寄存柜',num:0,url:'/pages/userinfo/locker/fancy'}
		};
		walletTab:{[x: string]: any} = {
			point:{id:1,name:'卡币',num:0,pic:'../../static/userinfo/v2/icon_tab_gold.png',url:'/pages/mall/mallIndex'},
			hitNo:{id:2,name:'我的中卡',num:0,pic:'../../static/userinfo/v2/icon_tab_card.png',url:'/pages/userinfo/winningCard/index'}
		}
		orderTab:{[x: string]: any} = {
			toPay:{id:1,name:'待支付',num:0},
			go:{id:2,name:'已付款',num:0},
			toDeliver:{id:3,name:'待发货',num:0},
			toTake:{id:4,name:'待收货',num:0},
			finish:{id:5,name:'已完成',num:0}
		};
		serviceTab:{[x: string]: any} = {
			coupon:{id:1,name:'优惠券',url:'/pages/userinfo/coupon/coupon'},
			giving:{id:2,name:'收赠卡密',url:'/pages/userinfo/giving/index',num:0},
			decompose:{id:3,name:'卡片分解',url:'',tips:'暂未开放'},
			kefu:{id:4,name:'联系客服'},
			address:{id:5,name:'地址管理',url:'/pages/userinfo/setting_addresses'}
		};
		settingTab = [
			{id:1,name:'加入群聊',url:'',pic:'../../static/userinfo/v2/icon_b_groupchat.png'},
			{id:2,name:'商家入驻',url:'/pages/userinfo/merchant_join',pic:'../../static/userinfo/v2/icon_b_merchant.png'},
			{id:3,name:'关于我们',url:'/pages/userinfo/about_us',pic:'../../static/userinfo/v2/icon_b_us.png'},
			{id:4,name:'用户协议',url:'/pages/userinfo/user_agreement',pic:'../../static/userinfo/v2/icon_b_agreement.png'},
		]
		showPaySuccess = false;
		invoice = {
			open:false,
			request:false
		}
		onLoad(query:any) {
			this.onEventUI('updateToken',()=>{
				this.initPageData();
			})
		}
		onShow(){
			this.initPageData();
			this.broadcastActor=app.broadcastActor
		}
		onHide(){
		}
		initPageData(cb?:Function){
			if(app.token.accessToken == ''){
				this.navigateTo('/pages/login/login')
				return;
			}
			app.http.Get('me/home',{},(res:any)=>{
				const data = res.data;
				this.infoData = data;
				app.familial = data.familial;
				this.$set(this.infoData, 'avatar', decodeURIComponent(res.data.avatar));
				this.$set(this.serviceTab.giving, 'num', res.data.unReadGoodNo);
				for (const key in data) {
					if (this.walletTab.hasOwnProperty(key)) {
						this.walletTab[key].num = data[key];
					}
					if (this.orderTab.hasOwnProperty(key)) {
						this.orderTab[key].num = key == 'toPay'? data[key].num:data[key];
					}
					if (this.headerTab.hasOwnProperty(key)) {
						this.headerTab[key].num = data[key];
					}
				}
				if(!data.toPay){
					this.orderTab['toPay'].num = 0
				}
				if(!this.invoice.request){
					app.http.Post('me/invoice/ask/open',{},(res:any)=>{
						this.invoice.request = true;
						this.invoice.open = res.open
					})
				}
				if(cb) cb()
			});
		}
		onClickNavigateto(item:any){
			if(item.name=='加入群聊'){
				this.showPaySuccess = true
			}else{
				this.navigateTo(item.url)
			}
		}
		navigateTo(url:string) {
			uni.navigateTo({ url: url });
		}
		onClickUserInfo(){
			this.navigateTo(`/pages/userinfo/user_info?data=${encodeURIComponent(JSON.stringify(this.infoData))}`)
		}
		onClickOrderList(id:number){
			this.navigateTo(`/pages/userinfo/order_list?type=${id}`)
		}
		onClickOrderListMp(item:any){
			this.navigateTo(`/pages/userinfo/order_list?type=${this.orderTab[item].id}`)
		}
		onClickServiceTab(item:any){
			if(item.name=='联系客服'){
				let params = { agentExten:'' }
				app.platform.heliService(params)
			}
			if(item.url!=''){
				this.navigateTo(item.url)
			}else{
				uni.showToast({
					title:item.tips,
					icon:'none'
				})
			}
		}
		
	}
</script>

<style lang="scss">
	page{
		background:$content-bg
	}
	.icon-right{
		width: 12rpx;
		height:18rpx;
		background:url(../../static/userinfo/v2/icon_right_gray.png) no-repeat center;
		background-size: 100% 100%;
		margin-left: 14rpx;			
	}
	.user-header{
		width: 750rpx;
		height:396rpx;
		background:url(@/static/userinfo/bg.png) no-repeat center;
		background-size: 100% 100%;
		box-sizing: border-box;
		padding-top: 112rpx;
		.header-top{
			width: 100%;
			height:42rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding: 0 30rpx;
			justify-content: space-between;
			margin-bottom: 47rpx;
			.header-top-left{
				height:42rpx;
				display: flex;
				align-items: center;
				font-size: 33rpx;
				font-family: PingFangSC-Semibold;
				font-weight: 600;
				color: #FFFFFF;
			}
			.header-icon-right{
				width: 17rpx;
				height:27rpx;
				background:url(../../static/userinfo/v2/icon_right.png) no-repeat center;
				background-size: 100% 100%;
				margin-left: 20rpx;
			}
			.header-top-right{
				height:42rpx;
				display: flex;
				align-items: center;
				.icon-setting{
					width: 42rpx;
					height:42rpx;
					background:url(../../static/userinfo/v2/icon_setting.png) no-repeat center;
					background-size: 100% 100%;
					margin-right: 40rpx;
				}
				.icon-xiaoxi{
					width: 39rpx;
					height:42rpx;
					background:url(../../static/userinfo/v2/icon_message.png) no-repeat center;
					background-size: 100% 100%;
					position:relative;
					.xiaoxi-num{
						width: 32rpx;
						height:32rpx;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 20rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FB4E3E;
						background:#FFFFFF;
						position: absolute;
						right:-10rpx;
						top:-10rpx;
					}
				}
			}
		}
		.header-center{
			width: 100%;
			height:145rpx;
			display: flex;
			box-sizing: border-box;
			align-items: center;
			padding:0 30rpx;
			.avatar-border{
				width: 146rpx;
				height:146rpx;
				border:2px solid #BBBBBB;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 50rpx;
			}
			.user-avatar{
				width: 125rpx;
				height:125rpx;
				border-radius: 50%;
			}
			.header-tab-box{
				height:80rpx;
				box-sizing: border-box;
				display: flex;
			}
			.header-tab-index{
				height:80rpx;
				margin-right: 80rpx;
			}
			.header-tab-index-num{
				font-size: 33rpx;
				font-family: PingFangSC-Medium;
				font-weight: bold;
				color: #FFFFFF;
				margin-bottom: 10rpx;
				text-align: center;
			}
			.header-tab-index-name{
				font-size: 27rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #FFD2D9;
			}
		}
	}

	.user-v2-box{
		width: 100%;
		box-sizing: border-box;
		padding: 13rpx;
		background:$content-bg;
	}
	.user-v2-langtab{
		width: 100%;
		height:91rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.user-v2-langtab-index{
			width: 356rpx;
			height:91rpx;
			background:#fff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding:0 26rpx;
			.langtab-left{
				height:63rpx;
				display: flex;
				align-items: center;
				font-size: 29rpx;
				font-family: PingFangSC-Medium;
				font-weight: 600;
				color: #333333;
				.langtab-left-pic{
					width: 63rpx;
					height:63rpx;
					margin-right: 22rpx;
				}
			}
			.langtab-right{
				height:63rpx;
				display: flex;
				align-items: center;
				font-size: 25rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #333333;
				
			}
		}
	}

	.user-order{
		width: 100%;
		box-sizing: border-box;
		background:#fff;
		padding:35rpx 22rpx;
		margin-top: 13rpx;
		.header{
			width: 100%;
			height:40rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 30rpx;
			.title{
				height:40rpx;
				line-height: 40rpx;
				font-size: 31rpx;
				font-family: PingFangSC-Regular;
				font-weight: 600;
				color: #333333;
			}
			.right{
				height:40rpx;
				display: flex;
				align-items: center;
				font-size: 25rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #88878C;
				
			}
		}
		.tab-content{
			width: 100%;
			height:84rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.tab{
				width: 100rpx;
				height:84rpx;
				box-sizing: border-box;
				position: relative;
				.icon-content{
					width: 100rpx;
					height:50rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 12rpx;
				}
				.name{
					width: 100rpx;
					height:32rpx;
					text-align: center;
					font-size: 23rpx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: #333333;
				}
				.tab-icon{
					width: 45rpx;
					height:45rpx;
				}
			}
		}
		.order-tip{
			width: 100%;
			height: 60rpx;
			background: linear-gradient(90deg, #FD8339 0%, #F24B28 100%);
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			margin-top: 10rpx;
			.right{
				width: 10rpx;
				height:16rpx;
				background:url(../../static/userinfo/jinru@2x.png) no-repeat center;
				background-size: 100% 100%;
				margin-left:12rpx;
				margin-top: 2px;
			}
		}
	}
	.orther-setting{
		width: 100%;
		box-sizing: border-box;
		background:#fff;
		padding:40rpx 20rpx 1rpx 20rpx;
		margin-top: 14rpx;
		.setting{
			width: 100%;
			height:36rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 46rpx;
			.name{
				height:36rpx;
				display: flex;
				align-items: center;
				font-size: 27rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #5B5B5B;
				.setting-icon{
					width: 45rpx;
					height:45rpx;
					margin-right: 15rpx;
				}
			}
		}
	}
	.update-info-button{
		width: 200rpx;
		height:100rpx;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		font-size: 30rpx;
		background:rgba(0,0,0,0);
		margin:0;
		justify-content: center;
	}
	.icon-yuan{
		width: 30rpx;
		height:30rpx;
		line-height: 30rpx;
		text-align: center;
		background:#FF504F;
		border-radius: 40rpx;
		position: absolute;
		right:0;
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
</style>
