<template>
	<view class="content">
		<view class="orderlist-index" v-for="item in orderList" :key="item.code" >
			<view class="orderlist-index-header">
				<view class="header-left">
					<image class="seller-image" :src="decodeURIComponent(item.seller.avatar)" mode="aspectFill"></image>
					<view class="seller-name">{{item.seller.name}}</view>
				</view>
				<view class="header-right">
					<view :class="['header-right-index','state']">{{item.stateName}}</view>
					<view v-if="item.state==0" class="header-right-count">{{intervalList[item.code]?intervalList[item.code].coun_down:''}}</view>
				</view>
			</view>
			<view class="orderlist-index-center" @click="onClickJumpUrl(item.code)">
				<image class="goods-image" :src="getGoodsImg(decodeURIComponent(item.good.pic))" mode="aspectFill"></image>
				<view class="goods-content">
					<view class="title">{{item.good.title}}</view>
					<view class="state" :class="{'no-bg':item.good.stateName=='未中卡'}">{{item.good.stateName=='未中卡'?'':item.good.stateName}}</view>
					<view class="desc">
						<view class="price">￥{{item.price}}<text class="total-num">共{{item.num}}件</text></view>
						<view ></view>
					</view>
				</view>
			</view>
			<view class="orderlist-index-bottom">
				
				<view class="operate" v-if="item.operate" >
					<view :class="['btn','btn-'+btnitem.cmd]" @click="onClickOperate(item,btnitem.cmd)" v-for="btnitem in item.operate" :key="btnitem.cmd">{{btnitem.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {getCountDownTime} from '@/tools/util';
	import {
		getGoodsImg
	} from "../../tools/util";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		orderList:any;
		
		getGoodsImg = getGoodsImg;
		getCountDownTime = getCountDownTime;
		intervalList:{[x:string]:any} = {};
		
		@Watch('orderList')
		onGoodsListChanged(val: any, oldVal: any){
			this.orderList = val;
			this.getOrderList()
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
		}
		destroyed(){
			for(let i in this.intervalList){
				clearInterval(this.intervalList[i].func)
			}
		}
		onClickJumpUrl(id:any){
			this.$emit("send", id);
		}
		onClickOperate(item:any,cmd:any){
			this.$emit("operate", item,cmd);
		}
		getOrderList(){
			let data = JSON.parse(JSON.stringify(this.orderList))
			if(!data){
				return;
			}
			for(let i in this.orderList){
				if(this.orderList[i].state==0&&this.orderList[i].coun_down>0){
					this.intervalList[this.orderList[i].code] = {code:this.orderList[i].code,coun_down:this.getCountDownTime(this.orderList[i].coun_down),time:this.orderList[i].coun_down,func:function(){}};
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
			border-radius: 20rpx;
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
					.state{
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
					border-radius: 15rpx;
					margin-right: 24rpx;
				}
				.goods-content{
					width: 486rpx;
					height:160rpx;
					box-sizing: border-box;
					padding:0;
					.title{
						width: 100%;
						height:45rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #14151A;
						margin-bottom: 0;
						overflow: hidden;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						-ms-text-overflow: ellipsis;
						text-overflow: ellipsis;
					}
					.state{
						height:30rpx;
						margin-top: 5rpx;
						font-size: 22rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FB4E3E;
						box-sizing: border-box;
						padding:0 9rpx;
						background: #FBF2F3;
						display: inline-flex;
						align-items: center;
					}
					.no-bg{
						background:none
					}
					.desc{
						width: 100%;
						margin-top: 30rpx;
						height:40rpx;
						display: flex;
						box-sizing: border-box;
						align-items: center;
						justify-content: space-between;
						.price{
							height:40rpx;
							line-height: 40rpx;
							font-size: 34rpx;
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
							margin-left: 10rpx;
						}
					}
				}
			}
			&-bottom{
				width: 100%;
				box-sizing: border-box;
				padding:20rpx 0 20rpx 20rpx;
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
					.btn{
						width: 148rpx;
						height:60rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 30rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: 400;
						margin-right: 20rpx;
						background:#fff;
						border:1.5rpx solid #14151B;
						color:#14151B
					}
					.btn-toPay{
						background:#FB4E3E;
						border:none;
						color:#FFFFFF
					}
					.btn-resultCard{
						background: #FB4E3E;
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
