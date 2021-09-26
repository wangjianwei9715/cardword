<template>
	<view class="content">
		<view class="orderlist-index" v-for="item in orderOldList" :key="item.id" @click="onClickJumpUrl(item.id)">
			<view class="orderlist-index-header">
				<view class="header-left">
					<image class="seller-image" :src="item.seller.avatar" mode="aspectFill"></image>
					<view class="seller-name">{{item.seller.name}}</view>
				</view>
				<view class="header-right">
					<view :class="['header-right-index','state'+item.state]">{{stateStr[item.state]}}</view>
					<view v-if="item.state==0" class="header-right-count">{{intervalList[item.id]?intervalList[item.id].coun_down:''}}</view>
				</view>
			</view>
			<view class="orderlist-index-center">
				<image class="goods-image" :src="item.goods.img" mode="aspectFill"></image>
				<view class="goods-content">
					<view class="title">{{item.goods.title}}</view>
					<view class="desc">
						<view class="price">{{item.goods.price}}</view>
						<view class="total-num">共{{item.num}}件</view>
					</view>
				</view>
			</view>
			<view class="orderlist-index-bottom">
				<view class="price">
					合计：<view class="price-index">￥<text class="price-num">{{item.goods.price}}</text></view>
				</view>
				<view class="operate">
					<view :class="['btn','btn-'+btnitem.cmd]" v-for="btnitem in item.operate" :key="btnitem.cmd">{{btnitem.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {getCountDownTime} from '@/tools/util';
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		orderList:any;
		@Prop({default:false})
		ispullDown:any;
	
		orderOldList:any = [];
		getCountDownTime = getCountDownTime;
		intervalList:{[x:string]:any} = {};
		stateStr = {
			'-1':'订单关闭',
			'0':'待支付',
			'1':'进行中',
			'2':'未中卡',
			'3':'待发货',
			'4':'待收货',
			'5':'已完成'
		}
		@Watch('ispullDown')
		onIspullDownChanged(val: any, oldVal: any){
			this.orderOldList = []
		}
		@Watch('goodsList')
		onGoodsListChanged(val: any, oldVal: any){
			this.orderList = val;
			setTimeout(()=>{
				this.getOrderList()
			},100)
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			this.getOrderList()
		}
		destroyed(){
			for(let i in this.intervalList){
				clearInterval(this.intervalList[i].func)
			}
		}
		onClickJumpUrl(id:any){
			this.$emit("send", id);
		}
		getOrderList(){
			let data = JSON.parse(JSON.stringify(this.orderList))
			console.log(data)
			if(!data){
				return;
			}
			this.orderOldList = this.orderOldList.concat(data)
			for(let i in this.orderList){
				if(this.orderList[i].state==0&&this.orderList[i].coun_down>0){
					this.intervalList[this.orderList[i].id] = {id:this.orderList[i].id,coun_down:this.getCountDownTime(this.orderList[i].coun_down),time:this.orderList[i].coun_down,func:function(){}};
				}
			}
			this.countDownTime()
		}
		countDownTime(){
			for(let i in this.intervalList){
				this.intervalList[i].func = setInterval(()=>{
					if(this.intervalList[i].time>0){
						this.intervalList[i].time--;
						this.intervalList[i].coun_down= this.getCountDownTime(this.intervalList[i].time);
						this.$forceUpdate()
					}else{
						clearInterval(this.intervalList[i].func)
					}
				},1000)
			}
			
			
		}
	
	}
</script>

<style lang="scss">
	.orderlist{
		&-index{
			width: 710rpx;
			height:420rpx;
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
						font-size: 26rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
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
				.operate{
					width: 100%;
					height:60rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					margin-top: 20rpx;
					.btn{
						width: 148rpx;
						height:60rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						box-sizing: border-box;
						border-radius: 4rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 600;
						margin-right: 20rpx;
						background:#fff;
						border:1px solid #14151B;
						color:#14151B
					}
					.btn-pay{
						background:#14151B;
						border:none;
						color:#FFFFFF
					}
					.btn-reward{
						background: linear-gradient(90deg, #FD8339 0%, #F24B28 100%);
						border:none;
						color:#FFFFFF
					}
					.btn-del{
						border:1px solid #D2D2DB;
						color:#828292
					}
				}
			}
		}
	}
</style>
