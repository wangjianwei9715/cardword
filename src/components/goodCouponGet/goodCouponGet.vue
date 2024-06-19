<template>
	<view>
		<view class="coupon-list" v-if="list!=''">
			<view class="coupon-list-left">
				<view class="coupon-box" v-for="(item,index) in list" :key="index">
					<view class="coupon-item">{{item}}</view>
				</view>
			</view>
			<view class="coupon-list-right" @click="onClickMoreCoupon">领券<image class="icon-r" src="@/static/goods/detail/right.png"/></view>
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
			width: 22rpx;
			height:22rpx;
			margin-left: 6rpx;
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
				margin-right: 16rpx;
				margin-left: 2rpx;
			}
			.coupon-item{
				height:42rpx;
				border-radius: 4rpx;
				box-sizing: border-box;
				padding: 0 8rpx;
				background: linear-gradient(90deg, #FFE2E7 0%, #F1D4FA 100%);
				font-size: 24rpx;
				
				
				color: #FA1545;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.coupon-list-right{
			height:34rpx;
			display: flex;
			align-items: center;
			font-size: 24rpx;
			
			
			color: rgba(255,255,255,0.9);
			box-sizing: border-box;
			border-radius: 4rpx;
			padding: 0 8rpx;
			background: linear-gradient(90deg, #FF007A 0%, #FF0054 100%);
		}
	}
</style>
