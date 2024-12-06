<template>
	<view>
		<view class="coupon-list" v-if="list!=''">
			<view class="coupon-list-left">
				<view class="coupon-box" v-for="(item,index) in list" :key="index">
					<view class="coupon-item">{{item}}</view>
				</view>
			</view>
			<view class="coupon-list-right" @click="onClickMoreCoupon">
				<image class="coupon-line" src="@/static/goods/v3/coupon_line.png"/>
				<text class="coupon-text">去领券</text>
			</view>
		</view>

		<couponGetDrawer :showDrawer.sync="showDrawer" :goodPage="goodPage" :couponList="couponList" @lower="getCouponList"/>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	const paramsInit = {
		fetchFrom:1,
		fetchSize:10,
		isFetchEnd:false
	}
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:''})
		goodCode?:string
		@Prop({
			default: []
		})
		list: any;
		@Prop({default:false}) 
        goodPage!:Boolean;

		getParams = {...paramsInit};
		couponList:any = [];
		showDrawer = false;
		created() {
			
		}
		onClickMoreCoupon(){
			app.platform.hasLoginToken(()=>{
				this.getParams = {...paramsInit}
				this.getCouponList(()=>{
					this.showDrawer = true;
				})
			})
		}
		getCouponList(cb?:Function){
			const params = this.getParams;
			if (params.isFetchEnd) return;

			app.http.Get(`coupon/merchant/online/good/${this.goodCode}/list`,params,(res:any)=>{
				params.isFetchEnd = res.isFetchEnd;

				if(res.list){
					let list = params.fetchFrom == 1 ? res.list : [...this.couponList,...res.list];
					this.couponList = app.platform.removeDuplicate(list,'cateId');
				};
				params.fetchFrom += params.fetchSize;
				cb && cb()
			})
		}
		
	}
</script>

<style lang="scss">
	.coupon-list{
		width: 100%;
		height:36rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10rpx;
		.coupon-list-left{
			width:550rpx;
			height:36rpx;
			overflow: hidden;
			display: flex;
			align-items: center;
			.coupon-box{
				height:36rpx;
				position: relative;
				overflow: hidden;
				margin-right: 27rpx;
			}
			.coupon-item{
				height:36rpx;
				background: url(@/static/goods/v3/coupon_bg.png) no-repeat center / 100% 100%;
				border-radius: 2rpx;
				box-sizing: border-box;
				padding: 0 10rpx;
				font-size: 18rpx;
				color: #FA1545;
				text-align: center;
				display: flex;
				align-items: center;
			}
		}
		.coupon-list-right{
			height:30rpx;
			display: flex;
			align-items: center;
			font-family: YouSheBiaoTiHei;
			font-size: 24rpx;
			color: #333333;
			box-sizing: border-box;
			position: relative;
			.coupon-line{
				width: 44rpx;
				height:6rpx;
				position: absolute;
				bottom:4rpx;
				left:50%;
				margin-left: -22rpx;
				z-index: 1;
			}
			.coupon-text{
				height:30rpx;
				font-family: YouSheBiaoTiHei;
				font-size: 24rpx;
				color: #333333;
				position: relative;
				z-index: 2;
			}
		}
	}
</style>
