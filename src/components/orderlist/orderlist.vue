<template>
	<view class="content">
		<view class="orderlist-index" v-for="item in orderList" :key="item.code" >
			<view class="orderlist-index-header">
				<view class="header-left" @click="onClickJumpMerchant(item)">
					<muqian-lazyLoad class="seller-image" :src="decodeURIComponent(item.seller.avatar)" :borderRadius="'50%'"></muqian-lazyLoad>
					<view class="seller-name">{{item.seller.name}}</view>
				</view>
				<view class="header-right">
					<view class="header-right-index state">
						{{item.stateName}}
						<u-count-down class="count-down" v-if="(item.state==1&&item.leftSec>0)" :time="item.leftSec*1000" format="mm:ss" fontSize="26rpx" @change="onChangeTime($event,item)" @finish="onFinish(item)"></u-count-down>
						<u-count-down class="count-down" v-if="item.good.liveCountdownSecs>0" :time="item.good.liveCountdownSecs*1000" format="mm:ss" fontSize="26rpx"></u-count-down>
					</view>
				</view>
			</view>
			<view class="orderlist-index-center" @click="onClickJumpUrl(item.code)">
				<muqian-lazyLoad class="goods-image" :src="getGoodsImg(decodeURIComponent(item.good.pic))"></muqian-lazyLoad>
				<view class="goods-content">
					<view class="title">{{item.good.title}}</view>
					<view class="desc">
						<view class="price">￥{{item.price}}<text class="total-num">共{{item.num}}件</text></view>
						<view ></view>
					</view>
				</view>
			</view>
			<view class="orderlist-index-bottom">
				<view v-if="item.hitNum>0" style="width:200rpx">恭喜中卡</view>
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
	import { getGoodsImg } from "../../tools/util";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		orderList:any;
		
		getGoodsImg = getGoodsImg;
		countDownData:any = {};
		onClickJumpMerchant(item:any){
			this.goMerchantPage(item.seller.alias)
		}
		onClickJumpUrl(id:any){
			this.$emit("send", id);
		}
		onClickOperate(item:any,cmd:any){
			this.$emit("operate", item,cmd,this.countDownData[item.code]||0);
		}
		onFinish(item:any){
			this.$emit("onFinish", item);
		}
		onChangeTime({minutes,seconds}:any,item:any){
			this.countDownData[item.code] = (minutes*60) + seconds;
		}
	}
</script>

<style lang="scss">
	.count-down{
		margin-left: 10rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
	}
	.orderlist{
		&-index{
			width: 100%;
			border-radius: 5rpx;
			background:#fff;
			box-sizing: border-box;
			margin-bottom: 14rpx;
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
						font-family: PingFangSC-Medium, PingFang SC;
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
				height:137rpx;
				display: flex;
				box-sizing: border-box;
				padding:0 20rpx;
				align-items: center;
				.goods-image{
					width: 178rpx;
					height:137rpx;
					border-radius: 5rpx;
					margin-right: 24rpx;
				}
				.goods-content{
					width: 486rpx;
					height:137rpx;
					box-sizing: border-box;
					padding:0;
					.title{
						width: 100%;
						height:40rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #14151A;
						margin-bottom: 0;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						box-sizing: border-box;
					}
					.state{
						height:35rpx;
						margin-top: 5rpx;
						font-size: 23rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #F63D47;
						box-sizing: border-box;
						padding:0 18rpx;
						background: #FFEDEE;
						display: inline-flex;
						align-items: center;
					}
					.no-bg{
						background:none
					}
					.desc{
						width: 100%;
						margin-top: 20rpx;
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
				padding:15rpx 0 38rpx 20rpx;
				display: flex;
				justify-content: space-between;
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
						width: 146rpx;
						height:60rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius:5rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 400;
						margin-right: 20rpx;
						background:#fff;
						border:1rpx solid #DADADA;
						color:#88878c
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
