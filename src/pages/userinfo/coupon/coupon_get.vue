<template>
	<view class="content">
		<view class="bg-top"></view>
		<u-sticky style="width:100%;background:#F6F7FB"><tabc :tabc="tabData" :tabsCheck="tabCurrent" @tabsClick="onClickTab"></tabc></u-sticky>
		
		<view class="list-box">
			<view class="list-index" v-for="(item,index) in couponList" :key="index">
				<view class="box-left">
					<muqian-lazyLoad v-if="item.good||item.merchant" class="coupon-pic" :src="decodeURIComponent(item.tp==1?item.good.pic:item.merchant.merchantLogo)" />
					<view class="left-info">
						<view class="info-title u-line-2">{{item.tp==1?item.good.title:'店铺通用券'}}</view>
						<view class="info-m">
							<image class="logo-m" src="@/static/userinfo/v2/coupon_m.png"/>
							{{item.tp==1?item.good.merchantName:item.merchant.merchantName}}
						</view>
						<view class="info-bottom" v-if="item.tp==1">
							<text>￥</text><text class="price-text">{{item.good.price}}</text>{{goodsManaager.hasLowestPrice(item.good)?' 起':''}}
						</view>
						<view class="info-bottom" v-else>店铺全商品通用</view>
					</view>
				</view>
				<view class="box-right">
					<view class="right-p">￥<text>{{item.amount}}</text></view>
					<view class="right-min">{{item.minUseAmount>0?`满${item.minUseAmount}可用`:'无门槛券'}}</view>
					<view :class="{'right-btn':true,'btn-white':item.state!=1}" @click="$u.throttle(()=>{onClickGetCoupon(item)},1000)">{{getBtnMsg(item)}}</view>
				</view>
			</view>
		</view>
		<empty v-show="showEmpty" />
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
import { Md5 } from "ts-md5";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		goodsManaager = app.goods;
		tabData = [
			{id:'all',name:'全部'},
			{id:'merchant',name:'店铺券'},
			{id:'basketball',name:'篮球'},
			{id:'football',name:'足球'},
			{id:'other',name:'其他'}
		];
		tabCurrent = 'all';
		listParams:any = {
			fetchFrom:1,
			fetchSize:10,
			noMoreData:false,
			requestIng:false
		}
		couponList:any = [];
		showEmpty = false
		onLoad(query:any) {
			this.reqNewData()
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData() 
		}
		reqNewData(cb?:Function) {
			const params = this.listParams;
			// 获取更多商品
			if (params.noMoreData||params.requestIng) {
				return;
			}
			let ts = Math.floor(new Date().getTime() / 1000);
			const params_t = {
				ts,
				s: Md5.hashStr(`kww_coupon_sign_${this.tabCurrent}_${params.fetchFrom}_${params.fetchSize}_${ts}_2022`)
			}
			params.requestIng = true;
			app.http.Get(`dataApi/coupon/merchant/online/tp/${this.tabCurrent}`,{...params,...params_t},(data:any)=>{
				params.requestIng = false;
				params.noMoreData = data.isFetchEnd;
				this.showEmpty = !data.list && params.fetchFrom == 1;
				if(data.list){
					let list = params.fetchFrom == 1 ? data.list : [...this.couponList,...data.list];
					this.couponList = app.platform.removeDuplicate(list,'cateId');
				}
				params.fetchFrom+=params.fetchSize;
				if(cb) cb()
			},()=>{
				params.requestIng = false;
			})
		}
		onClickTab(msg:string){
			if(this.tabCurrent != msg){
				this.tabCurrent = msg;
				this.reqGetList()
			}
		}
		reqGetList(){
			this.listParams = {
				fetchFrom:1,
				fetchSize:10,
				noMoreData:false
			}
			this.couponList = [];
			this.reqNewData()
		}
		onClickGetCoupon(item:any){
			if(item.state==1){
				app.http.Post(`coupon/merchant/online/draw/${item.cateId}`,{},(res:any)=>{
					uni.showToast({
						title:'领取成功',
						icon:'none'
					});
					item.state = 2;
				})
			}else if(item.state==2){
				if(item.tp==1){
					app.navigateTo.goGoodsDetails(item.good.goodCode)
				}else{
					this.goMerchantPage(item.merchant.merchantAlias)
				}
			}
		}
		getBtnMsg(item:any):string{
			if(item.state == 3) return '已使用';
			let msg = item.state == 1? '领券' : (item.tp==1?'去使用':'进店使用');
			return msg;
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
		padding-bottom: calc(50rpx);
		padding-bottom: calc(50rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(50rpx + env(safe-area-inset-bottom));
	}
	.bg-top{
		width: 750rpx;
		height:421rpx;
		background:url(@/static/userinfo/v2/coupon.png) no-repeat center / 100% 100%;
	}
	.list-box{
		width: 730rpx;
		box-sizing: border-box;
		margin:0rpx 8rpx 0 12rpx;
		.list-index{
			width: 730rpx;
			height:221rpx;
			box-sizing: border-box;
			margin-bottom: 5rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: url(@/static/userinfo/v2/coupon_bg.png) no-repeat center / 100% 100%;
			.box-left{
				width: 540rpx;
				height:171rpx;
				box-sizing: border-box;
				padding:0 30rpx;
				display: flex;
				align-items: center;
				.left-info{
					width: 300rpx;
					height:170rpx;
					box-sizing: border-box;
					margin-left: 29rpx;
					position: relative;
				}
				.info-title{
					font-size: 25rpx;
					
					
					color: #333333;
					line-height: 34rpx;
				}
				.info-m{
					display: flex;
					align-items: center;
					margin-top: 10rpx;
					font-size: 23rpx;
					
					
					color: #7C7C7C;
				}
				.logo-m{
					width: 21rpx;
					height:19rpx;
					margin-right: 7rpx;
				}
				.info-bottom{
					width: 100%;
					position: absolute;
					bottom:0;
					left:0;
					font-size: 21rpx;
					
					
					color: #7C7C7C;
				}
				.info-bottom text{
					font-size: 21rpx;
					
					font-weight: 600;
					color: #333333;
				}
				.info-bottom .price-text{
					font-size: 33rpx;
				}
				.price-text{
					font-size: 33rpx;
					
					font-weight: 600;
					color: #333333;
				}
			}
			.coupon-pic{
				width: 171rpx;
				height:171rpx;
			}
			.box-right{
				width: 190rpx;
				height:171rpx;
				box-sizing: border-box;
				padding-right:8rpx;
				position: relative;
				.right-p{
					width: 100%;
					text-align: center;
					font-size: 32rpx;
					
					font-weight: 600;
					color: #FA1545;
				}
				.right-p text{
					font-size: 54rpx;
				}
				.right-min{
					width: 100%;
					text-align: center;
					font-size: 20rpx;
					
					
					color: #7C7C7C;
				}
				.right-btn{
					width: 118rpx;
					height: 42rpx;
					border: 1px solid #FA1545;
					background: #FA1545;
					border-radius: 3rpx;
					box-sizing: border-box;
					position: absolute;
					bottom:12rpx;
					left:50%;
					margin-left: -61rpx;
					font-size: 25rpx;
					
					font-weight: 600;
					color: #F6F7FB;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.btn-white{
					background: #FFFFFF;
					color:#FA1545
				}
			}
		}
		
	}
</style>
