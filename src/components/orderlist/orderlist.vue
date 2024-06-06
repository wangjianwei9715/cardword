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
						<u-count-down class="count-down" v-if="(item.state==1&&item.leftSec>0)" :time="item.leftSec*1000" format="mm:ss" fontSize="24rpx" @change="onChangeTime($event,item)" @finish="onFinish(item)"></u-count-down>
						<u-count-down class="count-down" v-if="item.good.liveCountdownSecs>0" :time="item.good.liveCountdownSecs*1000" format="mm:ss" fontSize="24rpx"></u-count-down>
					</view>
				</view>
			</view>
			<view class="orderlist-index-center" @click="onClickJumpUrl(item.code)">
				<muqian-lazyLoad class="goods-image" :src="getGoodsImg(decodeURIComponent(item.good.pic))"></muqian-lazyLoad>
				<view class="goods-content">
					<view class="title u-line-2">{{item.good.title}}</view>
					<view class="desc">
						<view class="num">数量x{{item.num}}</view>
						<view class="price">实付
							<view class="total-price">
								¥<text class="price-text">{{ filterPrice(item.price).integer }}</text>
								<text class="decimal" v-if="filterPrice(item.price).decimal">{{ filterPrice(item.price).decimal }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="orderlist-index-bottom">
				<view v-if="item.hitNum>0" class="hitnum-bg">恭喜中卡</view>
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
	import { getGoodsImg,filterPrice } from "@/tools/util";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		orderList:any;
		
		getGoodsImg = getGoodsImg;
		filterPrice = filterPrice;
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
		
		font-weight: 400;
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
				height:100rpx;
				display: flex;
				box-sizing: border-box;
				padding:0 26rpx 0 26rpx;
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
						margin-right: 8rpx;
					}
					.seller-name{
						height:40rpx;
						line-height: 40rpx;
						font-size: 28rpx;
						
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
						font-size: 26rpx;
						
						font-weight: 400;
						color: rgba(153,153,153,0.9);
					}
					&-count{
						font-size: 32rpx;
						font-family: 'DIN';
						font-weight: bold;
						color: #FF4349;
						margin-left: 14rpx;
					}
				}
			}
			&-center{
				width: 100%;
				height:148rpx;
				display: flex;
				box-sizing: border-box;
				padding:0 26rpx;
				align-items: center;
				margin-top: -10rpx;
				.goods-image{
					width: 178rpx;
					height:148rpx;
					border-radius: 5rpx;
					margin-right: 24rpx;
				}
				.goods-content{
					width: 486rpx;
					height:148rpx;
					box-sizing: border-box;
					padding:0;
					position: relative;
					.title{
						width: 100%;
						font-size: 26rpx;
						
						color: #333333;
						line-height: 34rpx;
						margin-bottom: 0;
						box-sizing: border-box;
					}
					.state{
						height:35rpx;
						margin-top: 5rpx;
						font-size: 23rpx;
						
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
						height:40rpx;
						display: flex;
						box-sizing: border-box;
						align-items: center;
						justify-content: space-between;
						position: absolute;
						bottom:0;
						left:0;
						.num{
							font-size: 22rpx;
							font-weight: 400;
							color: #C0C0C0;
						}
						.price{
							height:40rpx;
							line-height: 40rpx;
							font-size: 24rpx;
							
							font-weight: 400;
							color: rgba(0,0,0,0.9);
							display: inline-flex
						}
						.total-price{
							height:40rpx;
							font-size: 20rpx;
							
							font-weight: 600;
							color: #000000;
							line-height: 38rpx;
							margin-left: 6rpx;
						}
						.total-price .price-text{
							font-size: 28rpx;
							font-family: Impact;
							font-weight: 600;
							margin-left:2rpx;
						}
						.total-price .decimal{
							font-size: 24rpx;
							font-family: Impact;
							font-weight: 600;
						}

					}
				}
			}
			&-bottom{
				width: 100%;
				box-sizing: border-box;
				padding:25rpx 0 30rpx 26rpx;
				display: flex;
				justify-content: space-between;
				.hitnum-bg{
					width: 158rpx;
					height:60rpx;
					background: url(@/static/order/reward.png) no-repeat center / 100% 100%;
					font-size: 24rpx;
					font-family: YouSheBiaoTiHei;
					color: #FFFFFF;
					line-height: 28rpx;
					box-sizing: border-box;
					padding-left: 50rpx;
					line-height: 47rpx;
				}
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
				.operate{
					width: 100%;
					height:60rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					.btn{
						width: 140rpx;
						height:60rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius:5rpx;
						font-size: 24rpx;
						font-weight: 400;
						margin-right: 26rpx;
						background:#fff;
						border:1rpx solid #DADADA;
						color:#333333
					}
					.btn-toPay{
						background: linear-gradient(90deg, #FA1545 0%, #CF004F 100%);
						border:none;
						color:#FFFFFF
					}
					.btn-resultCard{
						background: linear-gradient(90deg, #FA1545 0%, #CF004F 100%);
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
