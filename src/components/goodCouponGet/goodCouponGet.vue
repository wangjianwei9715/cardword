<template>
	<view>
		<view class="coupon-list" v-if="list!=''">
			<view class="coupon-list-left">
				<view class="coupon-box" v-for="(item,index) in list" :key="index">
					<view class="coupon-item u-border">{{item}}</view>
				</view>
			</view>
			<view class="coupon-list-right" @click="onClickMoreCoupon">领券<image class="icon-r" src="@/static/goods/v2/icon_right_new.png"/></view>
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
		height:42rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
		.icon-r{
			width: 11rpx;
			height:17rpx;
			margin-left: 11rpx;
		}
		.coupon-list-left{
			width:550rpx;
			height:42rpx;
			overflow: hidden;
			display: flex;
			align-items: center;
			.coupon-box{
				height:42rpx;
				position: relative;
				overflow: hidden;
				margin-right: 20rpx;
				margin-left: 2rpx;
			}
			.coupon-item{
				height:37rpx;
				background: #FBF2F3;
				box-sizing: border-box;
				padding:0 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border-color: #F2C9CE !important;
				border-radius: 3rpx;
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FA1545;
			}
		}
		.coupon-list-right{
			height:38rpx;
			display: flex;
			align-items: center;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #c0c0c0;
		}
	}
</style>
