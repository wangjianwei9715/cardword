<template>
	<view class="content">
		<view class="coupon-content" v-for="item in couponList" :key="item.id">
			<view class="coupon-index">
				<view class="coupon-left">
					<view class="coupon-price">￥<text>{{item.amount}}</text></view>
					<view class="coupon-condition">{{getCouponType(item.tp,(item.minUseAmount?item.minUseAmount:0))}}</view>
				</view>
				<view class="coupon-right">
					<view class="coupon-right-header">
						<view class="coupon-right-header-left">
							<view class="coupon-name">{{item.name}}</view>
							<view class="coupon-time">{{dateFormatYMS(item.startAt)}}-{{dateFormatYMS(item.overAt)}}</view>
						</view>
						<button class="coupon-right-header-btn" @click="onClickGoIndex(item)">去使用</button>
					</view>
					<view class="coupon-right-bottom" @click="onClickCheckExplain(item.id)">
						<view class="coupon-right-detail">{{item.goodCode!=''?'指定商品':(item.merchantName&&item.merchantName!=''?'指定店铺':'平台通用')}}</view>
						<view :class="checkShowExplain(item.id)?'coupon-right-up':'coupon-right-down'"></view>
					</view>
				</view>
			</view>
			<view class="coupon-explain" :class="{'show-explain':checkShowExplain(item.id)}">
				<view class="explain-content">
					<view v-if="item.goodCode!=''" class="explain-index">1.该券只能用于商品：{{item.goodCode}}</view>
					<view v-else class="explain-index">1.{{item.tp==1&&!item.merchantName?'卡享券':item.name}}可用于{{item.merchantName&&item.merchantName!=''?item.merchantName:'平台'}}所有商品，用户下单时，可选择{{item.tp==1?'卡享券':'满减券'}}按面值抵减商品金额</view>
					<view class="explain-index">2.{{item.tp==1?'卡享券可叠加使用，最低可减至0.1元，但不设找零':'满减券不可叠加使用，不设找零'}}</view>
					<view class="explain-index">3.不可与其他类型优惠券叠加使用</view>
					<view class="explain-index">券编号：{{item.code}}</view>
				</view>
			</view>
		</view>
		
		<empty v-show="showEmpty" />

		<view class="coupon-btn-content">
			<button class="coupon-btn" @click="onClickGoOver">优惠券明细</button>
			<button class="coupon-btn btn-exchange" @click="onClickGoExchange">兑换优惠券</button>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import { dateFormatYMS } from '@/tools/util'
	@Component({})
	export default class ClassName extends BaseNode {
		dateFormatYMS = dateFormatYMS;
		showExplain:any = [];
		couponList:any = [];
		currentPage = 1;
        pageSize = 20;
		noMoreData = false;
		showEmpty = false
		onLoad(query:any) {
			this.reqNewData();

			this.onEventUI("couponExchange", (data) => {
				this.currentPage = 1;
				this.noMoreData = false;
				this.reqNewData() 
			});
		}
		
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		//   下拉刷新
		onPullDownRefresh(){
			this.currentPage = 1;
			this.noMoreData = false;
			this.reqNewData(()=>{
				setTimeout(()=>{
					uni.stopPullDownRefresh();
				},1000)
			})
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			
			let params:{[x:string]:any} = {
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
				state:1
			}
			app.http.Get('me/coupon/list',params,(data:any)=>{
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(this.currentPage==1){
					this.couponList = [];
					if(!data.list){
						this.showEmpty = true
					}
				}
				if(data.list){
					this.showEmpty = false;
					this.couponList = this.couponList.concat(data.list)
				}
				this.currentPage++;
				if(cb) cb()
				
			})
		}
		getCouponType(type:number,minUseAmount:number){
			switch(type){
				case 1:
					return '无门槛';
				case 2:
					return '满'+minUseAmount+'可用';
				case 3:
					return '打折'
			}
		}
		onClickGoIndex(item:any){
			if(item.goodCode!=''){
				let goodCode = ''
				if(item.goodCode.indexOf(',') == -1){
					goodCode = item.goodCode;
				}else{
					goodCode = item.goodCode.split(',')[0]
				}
				app.navigateTo.goGoodsDetails(goodCode)
			}else if(item.merchantAlias){
				this.goMerchantPage(item.merchantAlias)
			}else{
				app.navigateTo.switchTab(0)
			}
			
		}
		onClickGoOver(){
			uni.navigateTo({
				url:'/pages/userinfo/coupon/coupon_over'
			})
		}
		onClickGoExchange(){
			uni.navigateTo({
				url:'/pages/userinfo/coupon/coupon_exchange'
			})
		}
		onClickCheckExplain(id:any){
			let index = this.showExplain.indexOf(id)
			if(index == -1){
				this.showExplain.push(id)
			}else{
				this.showExplain.splice(index,1)
			}
		}
		checkShowExplain(id:any){
			return this.showExplain.indexOf(id) == -1?false:true
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:$content-bg;
	}
	.content{
		width: 100%;
		box-sizing: border-box;
		padding:28rpx 20rpx 120rpx 20rpx;
		padding-bottom: calc(140rpx);
		padding-bottom: calc(140rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
	}
	.coupon-content{
		width: 708rpx;
		box-sizing: border-box;
		position: relative;
		margin-bottom: 11rpx;
	}
	.coupon-index{
		width: 708rpx;
		height:195rpx;
		background:url(../../../static/userinfo/coupon_bg.png) no-repeat center;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.coupon-left{
			width: 200rpx;
			height:195rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			padding:35rpx 0 49rpx 0;
			.coupon-price{
				width: 100%;
				font-size: 29rpx;
				
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
				font-weight: bold;
			}
			.coupon-price text{
				font-size: 54rpx;
			}
			.coupon-condition{
				width: 100%;
				text-align: center;
				font-size: 23rpx;
				
				font-weight: 500;
				color: #FFFFFF;
			}
		}
		.coupon-right{
			width: 490rpx;
			height:195rpx;
			box-sizing: border-box;
			padding: 0 30rpx 0 0rpx;
			.coupon-right-header{
				width: 100%;
				height:120rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
				.coupon-right-header-left{
					width: 350rpx;
					height:70rpx;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
				}
				.coupon-name{
					width: 100%;
					height:29rpx;
					display: flex;
					align-items: center;
					font-size: 30rpx;
					
					font-weight: 600;
					color: #333333;
				}
				.coupon-time{
					width: 100%;
					font-size: 21rpx;
					
					font-weight: 400;
					color: #88878C;
					margin-top: 10rpx;
				}
				.coupon-right-header-btn{
					width: 127rpx;
					height: 47rpx;
					background: #FA1644;
					border-radius: 3rpx;
					text-align: center;
					line-height: 47rpx;
					font-size: 25rpx;
					
					font-weight: 500;
					color: #FFFFFF;
					position: absolute;
					right:0rpx;
					top:27rpx
				}
			}
			.coupon-right-bottom{
				width: 100%;
				height:60rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.coupon-right-detail{
					height:50rpx;
					line-height: 50rpx;
					font-size: 20rpx;
					
					font-weight: 400;
					color: #B8B7B7;
				}
				.coupon-right-down{
					width: 18rpx;
					height:10rpx;
					background:url(../../../static/userinfo/coupon_jt.png) no-repeat center;
					background-size: 100% 100%;
				}
				.coupon-right-up{
					width: 18rpx;
					height:10rpx;
					background:url(../../../static/userinfo/coupon_jt.png) no-repeat center;
					background-size: 100% 100%;
					transform: rotate(180deg);
				}
			}
		}
	}
	.coupon-btn-content{
		width: 100%;
		height:calc(120rpx );
		height:calc(120rpx + constant(safe-area-inset-bottom));
		height:calc(120rpx + env(safe-area-inset-bottom));
		position: fixed;
		left:0;
		bottom:0;
		background:#fff;
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
		padding:0 28rpx;
		padding-top: 17rpx;
	}
	.coupon-btn{
		width: 322rpx;
		height: 86rpx;
		background: #FFFFFF;
		border: 1rpx solid #AAAAAA;
		border-radius: 5rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 33rpx;
		
		font-weight: 400;
		color: #333333;
		margin:0
	}
	.btn-exchange{
		background:#FA1644;
		border:1rpx solid #FA1644;
		color: #F6F7FB;
		font-weight: bold;
	}
	.coupon-explain{
		width: 695rpx;
		height:0;
		background:#fff;
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
		box-sizing: border-box;
		transition:all 0.1s linear;
		overflow: hidden;
		padding: 0 25rpx;
		margin:0 auto;
		margin-top: -6rpx;
	}
	.explain-content{
		width: 100%;
		padding: 30rpx 0;
	}
	.explain-index{
		width: 100%;
		font-size: 24rpx;
		
		font-weight: 400;
		color: #B8B7B7;
		line-height: 36rpx;
	}
	.show-explain{
		height:225rpx
	}
</style>
