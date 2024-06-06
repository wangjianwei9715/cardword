<template>
	<u-popup mode="bottom" :show="show" @close="showPopup=false" :round="5" :safeAreaInsetBottom="false">
		<view class="payment-header">
			<view class="icon-close" @click="showPopup=false"></view>
			优惠券
		</view>
		<view class="content">
			<view class="coupon-content" v-for="(item,index) in couponList" :key="item.id">
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
							<!-- <view :class="checkCoupon(item.id)?'coupon-right-checked':'coupon-right-check'" @click="onClickselectCoupon(item.id,index)"></view> -->
							<view :class="checkCoupon(item.id)?'coupon-right-checked':'coupon-right-check'" @click="onClickselectCoupon(item,index)"></view>
						</view>
						<view class="coupon-right-bottom">
							<view class="coupon-right-detail">{{item.goodCode!=''?'指定商品':(item.merchantName&&item.merchantName!=''?'指定店铺':'平台通用')}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="coupon-btn-content">
			<view class="coupon-btn" @click="onClickConfirmCoupon">确定</view>
		</view>
	</u-popup>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch,PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { dateFormatYMS } from '@/tools/util'
	import { app } from "@/app";
	const everyData = [
		{ name: 'tp', val: 1, errMsg: '不同类型优惠券不能叠加使用' },
		{ name: 'overlay', val:true, errMsg: '此优惠券不能叠加使用' }
	]
	@Component({})
	export default class ClassName extends BaseComponent {
		@PropSync('show',{type:Boolean})
		showPopup!:Boolean
		@Prop({default:[]})
		couponList?:any
		@PropSync('selectList',{type:Array})
		selectCoupon!:number[]
		dateFormatYMS=dateFormatYMS;
		isPullDown = app.platform.isPullDown;
		@Watch('show')
		onShowChanged(val: any, oldVal: any){
			if(val){
				setTimeout(()=>{
					this.isPullDown(false)
				},100)
			}else{
				this.isPullDown(true)
			}
			
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
		}
		public get selectCouponId() : number[] {
			return this.selectCoupon.map((x:any)=>x.id)
		}
		public get allowOverlay() : boolean {
			return this.selectCoupon.every((x:any)=>{
				return (x.tp==1 && x.overlay)
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
		getTotalPrice(){
			const totalPrice = this.selectCoupon.reduce((total:number,item:any)=>total+item.amount,0);
			return totalPrice
		}
		onClickConfirmCoupon(){
			this.showPopup = false
			this.$emit('confirm',{price:this.getTotalPrice()})
		}
		checkCoupon(id:number){
			return this.selectCouponId.includes(id)
		}
		onClickselectCoupon(item:any,index:number){
			let checkindex = this.selectCouponId.indexOf(item.id)
			// 还未选择该优惠券
			if(checkindex == -1){
				const data = this.couponList[index];
				if(this.allowOverlay){
					if(this.selectCoupon.length>0){
						for (const i of everyData) {
							if (!data[i.name] === i.val) {
								uni.showToast({ title:i.errMsg, position:'top', icon:'none' })
								return false;
							}
						}
					}
					this.selectCoupon.push(item);
				}else{
					this.selectCoupon = [item];
				}
			}else{
				this.selectCoupon.splice(checkindex,1)
			}
		}
	}
</script>

<style lang="scss">
	.payment-header{
		width: 100%;
		height:90rpx;
		box-sizing: border-box;
		padding: 26rpx 0 20rpx 0;
		font-size: 26rpx;
		
		font-weight: 600;
		color: #14151A;
		text-align: center;
		position: relative;
		background:#fff;
		z-index:2
	}
	.content{
		width: 100%;
		height:1000rpx;
		box-sizing: border-box;
		padding:0 20rpx 132rpx 20rpx;
		display: block;
		z-index: 1;
		overflow-y: auto;
		
	}
	.icon-close{
		width: 32rpx;
		height:32rpx;
		background:url(@/static/pay/guanbi@2x.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left:34rpx;
		top:26rpx;
	}
	.payment-popup-show{
		transform: translateY(0);
	}
	.coupon-content{
		width: 710rpx;
		box-sizing: border-box;
		position: relative;
		margin-bottom: 24rpx;
	}
	.coupon-index{
		width: 708rpx;
		height:195rpx;
		background:url(@/static/userinfo/coupon_bg.png) no-repeat center;
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
				
				font-weight: 600;
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
			}
		}
	}
	
	.coupon-right-check{
		width: 27rpx;
		height:27rpx;
		background:url(@/static/pay/weixuan@2x.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		right:10rpx;
		top:22rpx
	}
	.coupon-right-checked{
		width: 27rpx;
		height:27rpx;
		background:url(@/static/pay/coupon_xz.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		right:10rpx;
		top:22rpx
	}
	.coupon-btn-content{
		width: 100%;
		height:calc(120rpx );
		height:calc(120rpx + constant(safe-area-inset-bottom));
		height:calc(120rpx + env(safe-area-inset-bottom));
		background: #fff;
		position: fixed;
		left:0;
		bottom:0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 3;
	}
	.coupon-btn{
		width: 694rpx;
		height: 85rpx;
		background: #FA1644;
		border-radius: 5rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 33rpx;
		
		font-weight: 600;
		color: #F6F7FB;
		line-height: 40rpx;
	}
</style>
