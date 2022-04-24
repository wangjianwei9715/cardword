<template>
	<view class="content">
		<view class="coupon-content" v-for="item in couponList" :key="item.id">
			<view class="coupon-index">
				<view class="coupon-left">
					<view class="coupon-price">￥<text>{{item.amount}}</text></view>
					<view class="coupon-condition">{{item.goodCode!=''?'指定商品':getCouponType(item.tp,(item.minUseAmount?item.minUseAmount:0))}}</view>
				</view>
				<view class="coupon-right">
					<view class="coupon-right-header">
						<view class="coupon-right-header-left">
							<view class="coupon-name"><image class="coupon-icon" src="../../../static/userinfo/coupon_icon.png"/>{{item.name}}</view>
							<view class="coupon-time">{{dateFormatYMS(item.startAt)}}-{{dateFormatYMS(item.overAt)}}</view>
						</view>
						<button class="coupon-right-header-btn" @click="onClickGoIndex(item)">去使用</button>
					</view>
					<view class="coupon-right-bottom" @click="onClickCheckExplain(item.id)">
						<view class="coupon-right-detail">查看详情</view>
						<view :class="checkShowExplain(item.id)?'coupon-right-up':'coupon-right-down'"></view>
					</view>
				</view>
			</view>
			<view class="coupon-explain" :class="{'show-explain':checkShowExplain(item.id)}">
				<view class="explain-content">
					<view v-if="item.goodCode!=''" class="explain-index">1.该券只能用于商品：{{item.goodCode}}</view>
					<view v-else class="explain-index">1.{{item.tp==1?'卡享券':'满减券'}}可用于平台所有商品，用户下单时，可选择{{item.tp==1?'卡享券':'满减券'}}按面值抵减商品金额</view>
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
				console.log(data)
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
					return '全平台无门槛';
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
				uni.navigateTo({
					url: '/pages/goods/goods_details?id='+decodeURIComponent(goodCode)
				})
			}else{
				uni.switchTab({
					url:'/pages/index/index'
				})
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
		padding-bottom: calc(120rpx);
		padding-bottom: calc(120rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
	}
	.coupon-content{
		width: 710rpx;
		box-sizing: border-box;
		position: relative;
		margin-bottom: 24rpx;
	}
	.coupon-index{
		width: 710rpx;
		height:216rpx;
		background:url(../../../static/userinfo/coupon_bg.png) no-repeat center;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.coupon-left{
			width: 216rpx;
			height:216rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			padding:45rpx 0 49rpx 0;
			.coupon-price{
				width: 100%;
				font-size: 30rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
				font-weight: bold;
			}
			.coupon-price text{
				font-size: 70rpx;
			}
			.coupon-condition{
				width: 100%;
				text-align: center;
				font-size: 20rpx;
				font-family: Microsoft YaHei;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
		.coupon-right{
			width: 491rpx;
			height:216rpx;
			box-sizing: border-box;
			padding: 0 24rpx 0 29rpx;
			.coupon-right-header{
				width: 100%;
				height:160rpx;
				border-bottom: 1rpx solid #E7E7E7;
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
				.coupon-right-header-left{
					width: 350rpx;
					height:84rpx;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
				}
				.coupon-name{
					width: 100%;
					height:42rpx;
					display: flex;
					align-items: center;
					font-size: 30rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #666666;
				}
				.coupon-icon{
					width: 42rpx;
					height:42rpx;
					margin-right: 7rpx;
				}
				.coupon-time{
					width: 100%;
					font-size: 20rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #999999;
					margin-top: 20rpx;
				}
				.coupon-right-header-btn{
					width: 100rpx;
					height:34rpx;
					background: url(../../../static/userinfo/coupon_btn.png) no-repeat center;
					background-size: 100% 100%;
					text-align: center;
					line-height: 34rpx;
					font-size: 20rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #666666;
					border-radius: 30rpx;
					position: absolute;
					right:0;
					top:35rpx
				}
			}
			.coupon-right-bottom{
				width: 100%;
				height:50rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.coupon-right-detail{
					height:50rpx;
					line-height: 50rpx;
					font-size: 20rpx;
					font-family: Microsoft YaHei;
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
		height:calc(100rpx );
		height:calc(100rpx + constant(safe-area-inset-bottom));
		height:calc(100rpx + env(safe-area-inset-bottom));
		position: fixed;
		left:0;
		bottom:0;
		background:#fff;
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
		padding:0 42rpx;
		padding-top: 15rpx;
	}
	.coupon-btn{
		width: 308rpx;
		height: 70rpx;
		background: #FFFFFF;
		border: 1rpx solid #545659;
		border-radius: 40rpx;
		text-align: center;
		line-height: 70rpx;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #545659;
	}
	.btn-exchange{
		background:#FB4E3E;
		border:1rpx solid #FB4E3E;
		color:#fff;
	}
	.coupon-explain{
		width: 100%;
		height:0;
		background:#fff;
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
		box-sizing: border-box;
		transition:all 0.1s linear;
		overflow: hidden;
		padding: 0 25rpx;
	}
	.explain-content{
		width: 100%;
		padding: 30rpx 0;
	}
	.explain-index{
		width: 100%;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #B8B7B7;
		line-height: 36rpx;
	}
	.show-explain{
		height:225rpx
	}
</style>
