<template>
	<view class="content">
		<view class="mall-top">
			<view class="mall-bt">卡币商城</view>
			<view class="mall-my-point">我的卡豆</view>
			<navigator url="/pages/mall/record_point" hover-class="none" class="mall-point">
				<view class="point-num">{{toThousands(8858.6)}}</view>
				<view class="point-right"></view>
			</navigator>
			<view class="mall-top-right">
				<view class="mall-top-btn" @click="showDrawer=true">
					<image class="mall-top-img" src="../../static/mall/icon_rule.png" />兑换规则
				</view>
				<navigator url="/pages/mall/record_award" hover-class="none" class="mall-top-btn">
					<image class="mall-top-img" src="../../static/mall/icon_award.png" />奖品明细
				</navigator>
			</view>
		</view>

		<view class="mall-center">
			<view class="mall-limit">
				<view class="mall-limit-header">
					<view class="limit-header-left">
						<image class="limit-bg" src="../../static/mall/limit.png"/>
					</view>
					<navigator url="/pages/mall/limit_award" hover-class="none" class="limit-header-right">
						查看全部<image class="limit-right" src="../../static/mall/limit_right.png"/>
					</navigator>
				</view>
				<view class="award-box">
					<scroll-view class="award-box-scroll" :scroll-x="true">
						<view class="award-scroll-index" v-for="(item,index) in awardList" :key="index">
							<view class="award-top">
								<view class="award-num">{{item.num}}份</view>
								<view class="award-pic-box">
									<image class="award-pic" mode="aspectFit" :src="decodeURIComponent(item.pic)"/>
								</view>
								<view class="award-status buying" v-if="(item.leftsec-countDown<=0)">开抢中</view>
								<view class="award-status" v-else>距开始{{getTime(item.leftsec-countDown)}}</view>
							</view>
							<view class="award-bottom">
								<view class="award-title">{{item.title}}</view>
								<view class="award-price">{{item.price}}卡币</view>
								<view class="award-exbtn buying" v-if="(item.leftsec-countDown<=0)" @click="onClickExchange(item)">兑 换</view>
								<view class="award-exbtn" v-else>即将开抢</view>
							</view>
						</view>
						
					</scroll-view>
				</view>
			</view>

			<!-- 卡豆兑换 -->
			<view class="point-header">
				<view class="point-title">卡豆兑换</view>
				<view calss="point-tips">不定期上新</view>
			</view>
			<view class="point-box">
				<view class="point-index">
					<view class="point-pic-box">
						<image class="point-pic" mode="aspectFit"/>
					</view>
					<view class="point-name">无门槛60元优惠券</view>
					<view class="point-price">10000卡币</view>
					<view class="point-btn">兑 换</view>
				</view>
			</view>
		</view>

		<!-- 弹窗 -->
		<mallPopup :showPopup="showPopup" :awardData="awardData" @popupClose="showPopup = false" @popupConfirm="onClickExConfirm"></mallPopup>
		<mallPopup :showPopup="showPopupToast" :popupType="'toast'" @popupClose="showPopupToast = false" @popupConfirm="onClickGoAward"></mallPopup>
		<!-- 规则 -->
		<bottomDrawer :showDrawer="showDrawer" :title="'兑换规则'" @closeDrawer="showDrawer=false">
			<view class="drawer-box" v-for="(item,index) in mallExchangeRule" :key="index">
				<view class="drawer-help" v-html="item.content"></view>
			</view>
    	</bottomDrawer>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import { mallExchangeRule } from "@/net/DataRules";
	import { toThousands } from "@/tools/util"
	@Component({})
	export default class ClassName extends BaseNode {
		toThousands = toThousands;
		awardList:{[x:string]:any} = [
			{
				num:20,
				pic:'../../static/goods/drawcard/card_gold.png',
				title:'iphone13 ProMAX',
				price:120000,
				state:1,
				leftsec:10
			},
			{
				num:10,
				pic:'../../static/goods/drawcard/card_dangban.png',
				title:'iphone13 ProMAX',
				price:110000,
				state:0,
				leftsec:20
			}
		];
		count_down:any;
		countDown = 0;
		showPopup = false;
		awardData:{[x:string]:any} = {
			pic:'',
			price:12000
		};
		showPopupToast = false;
		showDrawer = false;
		mallExchangeRule = mallExchangeRule;
		onLoad(query:any) {
			if(app.token.accessToken == ''){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}
			this.getCountDown()
		}
		onShow(){
			
		}
		onClickExConfirm(){
			this.showPopup = false;
			this.showPopupToast = true
		}
		onClickExchange(item:{[x:string]:any}){
			for (const key in this.awardData) {
				if (Object.prototype.hasOwnProperty.call(item, key)) {
					this.awardData[key] = item[key];
				}
			}
			this.showPopup = true;
		}
		onClickGoAward(){
			uni.navigateTo({
				url:'/pages/mall/record_award'
			})
			this.showPopupToast = false
		}
		// 倒计时定时器
		getCountDown(){
			this.count_down=this.scheduler(()=>{
				this.countDown ++;
			},1);
		}
		// 倒计时时间计算
		getTime(countDown:number){
			if(countDown<=0){
				// 有商品可以兑换以后重新请求数据
				clearInterval(this.count_down);
				return;
			}
			let day = String(Math.floor(countDown/3600/24));
			let day_num = countDown-3600*24*Number(day)
			let hour=Math.floor((day_num)/3600)<10?'0'+Math.floor((day_num)/3600):Math.floor((day_num)/3600);
			let minute=Math.floor((day_num-3600*Number(hour))/60)<10?'0'+Math.floor((day_num-3600*Number(hour))/60):Math.floor((day_num-3600*Number(hour))/60);
			let second=Math.floor((day_num-3600*Number(hour))%60)<10?'0'+Math.floor((day_num-3600*Number(hour))%60):Math.floor((day_num-3600*Number(hour))%60);
			return (Number(day)>0?day+'天 ':'')+hour+':'+minute+':'+second;
		}
		
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f7fb;
	}
	.buying{
		background: #E84F5E !important;
	}
	.drawer-box{
		width: 100%;
		box-sizing: border-box;
	}
	.drawer-help{
		width: 100%;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #7D8288;
		line-height: 38rpx;
		margin-bottom: 50rpx;
	}
	.mall-top{
		width: 100%;
		height:667rpx;
		background:url(../../static/mall/bg.png) no-repeat center;
		background-size: 100% 100%;
		position: relative;
		box-sizing: border-box;
		padding-top: 170rpx;
		padding-left: 47rpx;
		.mall-bt{
			width: 100%;
			box-sizing: border-box;
			font-size: 69rpx;
			font-family: hei;
			font-weight: 400;
			color: #FFFFFF;
			margin-bottom: 49rpx;
		}
		
		.mall-my-point{
			font-size: 27rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			letter-spacing:5rpx;
		}
		.mall-point{
			display: flex;
			height:80rpx;
			align-items: center;
			.point-num{
				height:80rpx;
				font-size: 50rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				text-shadow: 3px 3px 6rpx rgba(50, 46, 164, 0.8);
			}
			.point-right{
				width: 35rpx;
				height:47rpx;
				background: url(../../static/mall/right.png) no-repeat center;
				background-size: 100% 100%;
				margin-left: 15rpx;
			}
		}
		.mall-top-right{
			width: 175rpx;
			position: absolute;
			right:0;
			top:170rpx;
			box-sizing: border-box;
		}
		.mall-top-btn{
			width: 175rpx;
			height: 57rpx;
			border: 3rpx solid #FFFFFF;
			border-right: none;
			border-top-left-radius: 27rpx;
			border-bottom-left-radius: 27rpx;
			background: #9EAEFF;
			margin-bottom: 27rpx;
			box-sizing: border-box;
			padding-left: 10rpx;
			display: flex;
			align-items: center;
			font-size: 23rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			.mall-top-img{
				width: 42rpx;
				height:43rpx;
				margin-right: 14rpx;
			}
		}
	}
	.mall-center{
		width: 100%;
		height:100rpx;
		box-sizing: border-box;
		padding: 0 14rpx;
		margin-top: -240rpx;
		position: relative;
		z-index: 9;
		.mall-limit{
			width: 100%;
			background: #FFFFFF;
			border-radius: 5rpx;
			padding:37rpx 19rpx;
			box-sizing: border-box;
			.mall-limit-header{
				width: 100%;
				height:32rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 36rpx;
				.limit-header-left{
					height:32rpx;
					display: flex;
					align-items: center;
					font-size: 23rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 32rpx;
					.limit-bg{
						width: 140rpx;
						height: 32rpx;
						margin-right: 8rpx;
					}
					
				}
				.limit-header-right{
					height:32rpx;
					font-size: 23rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 32rpx;
					.limit-right{
						width: 12rpx;
						height:20rpx;
						margin-left: 10rpx;
						margin-bottom: -3rpx;
					}
				}
			}
			.award-box{
				width: 100%;
				height:390rpx;
				box-sizing: border-box;
				&-scroll{
					width: 100%;
					height:390rpx;
					display: flex;
					white-space: nowrap;
					align-items: center;
				}
				.award-scroll-index{
					width: 240rpx;
					height:390rpx;
					margin-right: 20rpx;
					box-sizing: border-box;
					display: inline-block;
					.award-top{
						width: 240rpx;
						height:240rpx;
						box-sizing: border-box;
						position: relative;
						.award-num{
							width: 65rpx;
							height:22rpx;
							background: url(../../static/mall/limit_num.png) no-repeat center;
							background-size: 100% 100%;
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
							text-align: center;
							line-height: 22rpx;
							position: absolute;
							left:0;
							top:0;
							z-index: 8;
						}
						.award-pic-box{
							width: 240rpx;
							height:210rpx;
							background:rgba(226, 232, 255, 0.14);
							display: flex;
							align-items: center;
							justify-content: center;
						}
						.award-pic{
							width: 240rpx;
							height:210rpx;
						}
						.award-status{
							width: 240rpx;
							height:30rpx;
							position: absolute;
							bottom:0;
							left:0;
							text-align: center;
							background:#B9D7EF;
							line-height: 30rpx;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
						}
						
					}
					.award-bottom{
						width: 240rpx;
						height:150rpx;
						.award-title{
							width: 100%;
							height:70rpx;
							line-height: 70rpx;
							font-size: 27rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
							text-align: center;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
						.award-price{
							width: 100%;
							height:34rpx;
							font-size: 25rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #EF3333;
							text-align: center;
							line-height: 20rpx;
						}
						.award-exbtn{
							width: 100%;
							height:46rpx;
							background: #DBDBDB;
							border-radius: 3rpx;
							text-align: center;
							line-height: 46rpx;
							font-size: 27rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
						}
					}
				}
			}
		}
	}
	.point-header{
		width: 100%;
		height:62rpx;
		margin-top: 14rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding:0 19rpx;
		.point-title{
			font-size: 31rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}
		.point-tips{
			font-size: 23rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}
	}
	.point-box{
		width: 100%;
		box-sizing: border-box;
		.point-index{
			width: 235rpx;
			height: 326rpx;
			background: #FFFFFF;
			border-radius: 5rpx;
			margin-right: 8;
			box-sizing: border-box;
			padding:0 12rpx;
		}
		.point-index:nth-child(3n){
			margin-right: 0;
		}
		.point-pic-box{
			width: 100%;
			height:170rpx;
			display: flex;
			justify-content: center;
			box-sizing: border-box;
			padding-top: 20rpx;
			.point-pic{
				width: 158rpx;
				height:131rpx;
			}
		}
		.point-name{
			width: 100%;
			height:36rpx;
			line-height: 36rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			text-align: center;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		.point-price{
			width: 100%;
			height:50rpx;
			line-height: 50rpx;
			font-size: 23rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #EF3333;
			text-align: center;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		.point-btn{
			width: 203rpx;
			height: 43rpx;
			background: #E84F5E;
			border-radius: 3rpx;
			text-align: center;
			line-height: 43rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			margin:0 auto;
		}
	}
		
</style>
