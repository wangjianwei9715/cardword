<template>
	<view class="content">
		<!-- 头部状态 -->
		<view class="header">
			<view v-if="orderData.state==0" class="header-waitpay">订单将于 {{countDownStr}} 后关闭</view>
			<view v-else-if="orderData.state==-1" class="header-close">拼团未成功订单关闭，款项已原路退回…</view>
			<view v-else class="header-orther">
				<view class="header-statestr">{{getStateStr(orderData.state)}}</view>
				<view class="header-btn-content">
					<view class="header-btn-pintuan">拼团结果</view>
					<view class="header-btn-chaika">拆卡报告</view>
				</view>
			</view>
		</view>
		<!-- 商品信息 -->
		<view class="order-index">
			<view class="order-index-header">
				<view class="header-left">
					<image class="seller-image" :src="orderData.seller.avatar" mode="aspectFill"></image>
					<view class="seller-name">{{orderData.seller.name}}</view>
				</view>
				<view class="header-right">
					<view :class="['header-right-index','state'+orderData.state]">{{stateStr[orderData.state]}}</view>
				</view>
			</view>
			<view class="order-index-center">
				<image class="goods-image" :src="orderData.goods.img" mode="aspectFill"></image>
				<view class="goods-content">
					<view class="title">{{orderData.goods.title}}</view>
					<view class="desc">
						<view class="price">￥{{orderData.goods.price}}</view>
						<view class="total-num">共{{orderData.num}}件</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 金额计算 -->
		<view class="order-desc">
			<view class="order-desc-index" v-for="item in orderDesc" :key="item.id">
				<view class="name">{{item.name}}</view><view class="info">{{item.desc}}</view>
			</view>
			<view class="order-desc-bottom">
				合计：<view class="price-index">￥<text class="price-num">{{orderData.goods.price}}</text></view>
			</view>
		</view>
		<!-- 我的编号 -->
		<view class="buyer-cotnent">
			<view class="card-header">
				<view class="card-header-title">我的编号</view>
				<view class="card-header-right">查看全部<view class="icon-right"></view></view>
			</view>
			<buyCardId :cardList="cardList"/>
		</view>
		<!-- 收货地址 -->
		<view class="address-content">
			<view class="title">收货地址</view>
			<view class="index">
				<view class="address-icon"></view>
				<view class="address-desc">浙江省杭州市西湖区数字娱乐产业园7号楼401室巴拉巴拉巴拉巴拉芭芭拉</view>
			</view>
			<view class="address-info">
				<view class="name">梅超风</view>183****7451
			</view>
		</view>
		<!-- 订单详细信息 -->
		<view class="order-info">
			<view class="title">订单信息</view>
			<view class="index" v-for="item in orderInfo" :key="item.id">
				<text>{{item.title}}:{{item.desc}}</text>
				<view v-if="item.title=='订单编号'" class="copy" @click="onClickCopyInfo(item.desc)">复制</view>
			</view>
			<view class="info-tab">
				<view class="tab-index"><view class="icon-lianxi"></view>联系客服</view>
				<view class="tab-index"><view class="icon-tousu"></view>投诉订单</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="bottom-btn">
			<!-- <view class="big-btn">查看商品</view> -->
			<view class="small-btn-content">
				<view class="small-btn left">查看物流</view>
				<view class="small-btn right">我的中卡</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import {getCountDownTime} from '@/tools/util';
	@Component({})
	export default class ClassName extends BaseNode {
		countDownInter:any;
		countDown = 300;
		countDownStr = ''
		orderData:{[x:string]:any} = {
			id:4,
			state:1,
			coun_down:250,
			num:5,
			seller:{
				avatar:'',
				name:'皇球星社'
			},
			goods:{
				img:'../../static/goods/zhutu@2x.png',
				title:'20-21 National Treasures Hobby原箱*3',
				price:149
			},
			operate:[
				{cmd:'wuliuu',name:'查看物流'},
				{cmd:'reward',name:'我的中卡'}
			]
		};
		stateStr = {
			'-1':'订单关闭',
			'0':'待支付',
			'1':'进行中',
			'2':'未中卡',
			'3':'待发货',
			'4':'待收货',
			'5':'已完成'
		};
		orderDesc = [
			{id:1,name:'商品金额',desc:'¥56.00'},
			{id:2,name:'优惠',desc:'- ¥5.00'},
			{id:3,name:'运费',desc:'包邮'},
		];
		cardList:{[x:string]:any} = [
			{id:1,title:'圣安东尼奥马刺 帕特里克·威廉姆斯49编 Apprentice Lnk #11',desc:'中卡*1',state:1},
			{id:2,title:'圣安东尼奥马刺 帕特里克·威廉姆斯49编 Apprentice Lnk #11',desc:'中卡*1',state:1},
			{id:3,title:'圣安东尼奥马刺 帕特里克·威廉姆斯49编 Apprentice Lnk #11',desc:'未中卡',state:0},
			{id:4,title:'圣安东尼奥马刺 帕特里克·威廉姆斯49编 Apprentice Lnk #11',desc:'未中卡',state:0},
			{id:5,title:'圣安东尼奥马刺 帕特里克·威廉姆斯49编 Apprentice Lnk #11',desc:'未中卡',state:0},
		];
		orderInfo:any = [
			{id:1,title:'订单编号',desc:'8445645465145'},
			{id:2,title:'支付方式',desc:'支付宝'},
			{id:3,title:'创建时间',desc:'2021-08-21 16:00'},
			{id:4,title:'拼成时间',desc:'2021-08-21 16:00'},
			{id:5,title:'开卡时间',desc:'2021-08-21 16:00'},
			{id:6,title:'发货时间',desc:'2021-08-21 16:00'},
			{id:7,title:'收货时间',desc:'2021-08-21 16:00'},
		];
		onLoad(query:any) {
		}
		onReady(){
			uni.setNavigationBarTitle({
				title: '待支付'
			});
		}
		getStateStr(state:number){
			switch(state){
				case 1:
					return '拼团中：商品拼团中xxx/xxx';
				case 2:
					return '待直播：等待商品直播';
				case 3:
					return '直播中：商品正在直播';
				case 4:
					return '订单已完成，未购得卡片'
			}
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
							font-size: 24rpx;
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
		border-top:20rpx solid #F6F7F8;
		border-bottom: 20rpx solid #F6F7F8;
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
		border-bottom: 20rpx solid #F6F7F8;
	}
	.address-content{
		width: 100%;
		box-sizing: border-box;
		border-bottom: 20rpx solid #F6F7F8;
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
		border-bottom: 20rpx solid #F6F7F8;
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
			border-radius: 4rpx;
			border:1px solid #14151B;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #14151B;
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
</style>
