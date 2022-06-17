<template>
	<view class="content">
		<navigationShare :navigatetoTitle="'超级补贴'" @navigateShare="onClickShare" @navigateBack="onClickBack"/>
		<view style="padding-top:88rpx">
			<statusbar/>
		</view>
		<view class="top-bg">
			<navigator url="/pages/act/mysticalCode/mysticalCode" hover-class="none" class="coupon-box" >
				<view class="coupon-box-left">
					<view class="coupon-title">动动手指领优惠券</view>
					<view class="coupon-go">
						GO<view class="coupon-sj"></view>
					</view>
				</view>
				<image class="coupon-pic" src="../../../static/act/618/coupon.png"/>
			</navigator>
		</view>
		
		<view class="list-title">
			<image class="title-icon" src="../../../static/act/618/icon1.png"/>
			商品特惠
			<image class="title-icon" src="../../../static/act/618/icon2.png" />
		</view>

		<view class="list-box">
			<view class="list-index" v-for="(item,index) in goodsList" :key="index" @click="onClickJumpDetails(item.goodCode)">
				<muqian-lazyLoad class="list-pic" :src="decodeURIComponent(item.pic)" mode="aspectFill"/>
				<view class="list-info">
					<view class="info-title">{{item.title}}</view>
					<view class="info-pro" v-if="item.state==0 || item.state == -1">
						{{dateFormatMSHMS(item.startAt)}}开售
					</view>
					<view class="info-pro" v-else>
						<view class="goodslist-progress">
							<view class="progressMask"
								:style="{width:item.state>1?0:(100-getPlan(item.lockNum,item.currentNum,item.totalNum))+'%'}"></view>
						</view>
						{{item.state>1?'已售罄':(item.totalNum-(item.currentNum+item.lockNum)) +'/'+item.totalNum}}
					</view>
					<view class="info-bottom">
						<view class="info-price">￥<text>{{item.price}}</text>{{getPriceStart(item)?' 起':''}}</view>
						<view class="info-sell">
							<muqian-lazyLoad class="sell-avatar" :src="decodeURIComponent(item.merchantLogo)" borderRadius="50%"/>
							{{item.merchantName}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<share :operationShow="operationShow" :shareData="shareData"  @operacancel="operationShow = false"></share>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { dateFormatMSHMS } from "@/tools/util";
	import { Md5 } from "ts-md5";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		dateFormatMSHMS = dateFormatMSHMS;
		goodsList:{[x:string]:any} = [];
		fetchFrom = 1;
		fetchSize = 10;
		noMoreData = false;
		// 分享
		operationShow=false;
		shareData:any = {
			shareUrl:'',  
			title:'',      
			summary:'',    
			thumb:''       
		}
		onLoad(query:any) {
			this.reqNewData()
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData()
		}
		reqNewData(cb ? : Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			let ts = Math.floor(new Date().getTime() / 1000);
			let params: {
				[x: string]: any
			} = {
				fetchFrom: this.fetchFrom,
				fetchSize: this.fetchSize,
				ts: ts,
				s: Md5.hashStr('kww_goodlist_sign_2022618_' + this.fetchFrom + '_' + this.fetchSize + '_' +
					ts + '_2022')
			}
			app.http.Get("dataApi/goodlist/forsale/2022618" , params, (data: any) => {
				if (data.isFetchEnd) {
					this.noMoreData = true;
				}
				if (data.goodList) {
					this.fetchFrom == 1 ? this.goodsList = data.goodList : this.goodsList.push(...data
						.goodList);
				}
				this.fetchFrom += this.fetchSize;
				if (cb) cb()
			});
		}
		onClickJumpDetails(id: any) {
			uni.navigateTo({
			url: "/pages/goods/goods_details?id=" + id
			});
		}
		getPriceStart(item: any) {
			return item.isSelect || item.discount != '' || item.pintuan_type == 11
		}
		getPlan(lock: number, now: number, all: number) {
			let width = Math.floor((Number(lock) + Number(now)) / Number(all) * 100);
			return width
		}
		onClickBack(){
			uni.navigateBack({
				delta: 1
			});
		}
		// 分享
		onClickShare(){
			if(!this.operationShow){
				if(this.shareData.shareUrl==''){
					this.shareData = {
						shareUrl:"https://www.ka-world.com/share/h5/index.html#/pages/act/2022618",  
						title:'卡世界618超级补贴',      
						summary:'海量商品 限时回馈',    
						thumb:'https://ka-world.oss-cn-shanghai.aliyuncs.com/app/goods_drawCard/2022618.jpg'
					}
				}
				this.operationShow = true
			}
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#FEE8E9;
	}
	.top-bg{
		width: 750rpx;
		height:670rpx;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
		background: url(../../../static/act/618/top_bg.jpg) no-repeat 0rpx -17rpx;
		background-size: 100% 687rpx;
		.coupon-box{
			width: 718rpx;
			height: 160rpx;
			background: url(../../../static/act/618/coupon_bg.png) no-repeat center;
			background-size: 100% 100%;
			border-top-right-radius: 3rpx;
			border-top-right-radius: 3rpx;
			position: absolute;
			bottom:0;
			left:50%;
			margin-left: -359rpx;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 40rpx 0 50rpx;
			.coupon-box-left{
				width: 330rpx;
				height:141rpx;
				padding-top: 25rpx;
				box-sizing: border-box;
				.coupon-title{
					font-size: 38rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #F6EBEC;
				}
				.coupon-go{
					width: 100rpx;
					height: 45rpx;
					background: #F6EBEC;
					border-radius: 3rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #DF3131;
					box-sizing: border-box;
					padding-left: 10rpx;
					margin-top: 10rpx;
				}
				.coupon-sj{
					border: 12rpx solid transparent;
					border-left: 12rpx solid #DF3131;
					margin-left: 8rpx;
				}
			}
			.coupon-pic{
				width: 294rpx;
				height:128rpx;
				margin-top: 16rpx;
			}			
		}
	}

	.list-title{
		width: 100%;
		height:41rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 206rpx;
		margin:36rpx 0rpx 26rpx 0rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #333333;
		.title-icon{
			width: 70rpx;
			height:41rpx
		}
	}	
	
	.list-box{
		width: 100%;
		box-sizing: border-box;
		padding: 0rpx 16rpx 30rpx 17rpx;
		.list-index{
			width: 100%;
			height:217rpx;
			background: #FFFFFF;
			border-radius: 3rpx;
			margin-bottom: 14rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0rpx 20rpx 0rpx 16rpx;
			.list-pic{
				width: 230rpx;
				height:185rpx;
			}
			.list-info{
				width: 430rpx;
				height:185rpx;
				position: relative;
				.info-title{
					width: 100%;
					font-size: 29rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					word-break:break-all;
				}
				.info-pro{
					width: 100%;
					height:20rpx;
					margin-top: 15rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 21rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 20rpx;
				}
				.goodslist-progress {
					background-image: url('../../../static/goods/v2/progeessBg.png');
					background-size: 100% 100%;
					width:300rpx;
					height: 8rpx;
					position: relative;
					display: flex;
					justify-content: flex-end;

					.progressMask {
						height: inherit;
						background-color: #F6F7FB;
						width: 30%;
					}
				}
				.info-bottom{
					width: 100%;
					height:40rpx;
					position: absolute;
					bottom:4rpx;
					left:0;
					display: flex;
					box-sizing: border-box;
					justify-content: space-between;
					.info-price{
						font-size: 18rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #333333;
					}
					.info-price text{
						font-size: 33rpx;
					}
					.info-sell{
						height:50rpx;
						display: flex;
						align-items: center;
						font-size: 21rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 50rpx;
						.sell-avatar{
							width: 50rpx;
							height:50rpx;
							margin-right: 11rpx;
						}
					}
				}
			}
		}
	}
</style>
