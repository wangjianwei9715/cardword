<template>
	<view>
		<view class="coupon-list" v-if="list!=''">
			<view class="coupon-list-left">
				<view class="coupon-box" v-for="(item,index) in list" :key="index">
					<view class="coupon-item">{{item}}</view>
				</view>
			</view>
			<view class="coupon-list-right" @click="onClickMoreCoupon">领券<image class="icon-r" src="@/static/goods/v2/icon_r.png"/></view>
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
			if (app.token.accessToken == '') {
				uni.navigateTo({ url: '/pages/login/login' })
				return;
			}
			this.getParams = {...paramsInit}
			this.getCouponList(()=>{
				this.showDrawer = true;
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
		height:40rpx;
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
			width: 600rpx;
			height:40rpx;
			overflow: hidden;
			display: flex;
			align-items: center;
			.coupon-box{
				height:38rpx;
				position: relative;
				overflow: hidden;
				margin-right: 20rpx;
			}
			.coupon-item{
				height:38rpx;
				box-sizing: border-box;
				padding:0 20rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				border: 1px solid #fba8b6;
				border-radius: 5rpx;
				font-size: 23rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #F53756;
			}
			.coupon-box::after{
				content: '';
				width: 18rpx;
				height:18rpx;
				background:#fff;
				border-radius: 50%;
				border:1px solid #fba8b6;
				position: absolute;
				left:-9rpx;
				top:50%;
				margin-top: -9rpx;
				box-sizing: border-box;
			}
			.coupon-box::before{
				content: '';
				width: 18rpx;
				height:18rpx;
				background:#fff;
				border-radius: 50%;
				border:1px solid #fba8b6;
				position: absolute;
				right:-9rpx;
				top:50%;
				margin-top: -9rpx;
				box-sizing: border-box;
			}
		}
		.coupon-list-right{
			height:38rpx;
			display: flex;
			align-items: center;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #949398;
		}
	}
</style>
