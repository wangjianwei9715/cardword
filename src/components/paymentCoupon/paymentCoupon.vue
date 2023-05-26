<template>
	<view class="payment" v-show="showPayMentCoupon">
		<view class="payment-showdow" @click="onClickCancelCoupon"></view>
		<view class="payment-popup" :class="{'payment-popup-show':showPopup}">
			<view class="payment-header">
				<view class="icon-close" @click="onClickCancelCoupon"></view>
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
								<view :class="checkCoupon(item.id)?'coupon-right-checked':'coupon-right-check'" @click="onClickcheckCoupon(item.id,index)"></view>
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
			
			
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { dateFormatYMS } from '@/tools/util'
	import { app } from "@/app";
	const everyData = [
		{ name: 'tp', val: 1, errMsg: '不同类型优惠券不能叠加使用' },
		{ name: 'overlay', val:true, errMsg: '此优惠券不能叠加使用' }
	]
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		showPayMentCoupon!:boolean;
		@Prop({default:[]})
		couponList!:any

		isPullDown = app.platform.isPullDown;
		dateFormatYMS = dateFormatYMS;
		showPopup = false;
		checkCouponList:any = [];
		checkTp = 0;
		checkPrice = 0;
		checkOverlay = true;
		confirmList:any = [];
		confirmPrice = 0;
		confirmTp = 0;
		@Watch('showPayMentCoupon')
		onShowChanged(val: any, oldVal: any){
			if(val){
				setTimeout(()=>{
					this.showPopup = true;
					this.isPullDown(false)
				},100)
			}else{
				this.checkCouponList= JSON.parse(JSON.stringify(this.confirmList))
				this.checkTp = this.confirmTp
				this.checkPrice = this.confirmPrice
				this.showPopup = false;
				this.isPullDown(true)
			}
			
		}
		@Watch('couponList')
		onCouponListChanged(val: any, oldVal: any){
			this.checkCouponList = [];
			this.checkTp = 0;
			this.checkPrice = 0;
			
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
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
		onClickCancelCoupon(){
			this.$emit("cancelCoupon");
		}
		onClickConfirmCoupon(){
			this.confirmList = JSON.parse(JSON.stringify(this.checkCouponList))
			this.confirmPrice = this.checkPrice;
			this.confirmTp = this.checkTp;
			this.$emit('couponConfirm',{list:this.confirmList,price:this.confirmPrice})
		}
		onClickcheckCoupon(id:any,index:any){
			let checkindex = this.checkCouponList.indexOf(id)

			// 还未选择该优惠券
			if(checkindex == -1){
				const data = this.couponList[index];
				if(this.checkTp!=1||!this.checkOverlay){
					this.checkTp = data.tp
					this.checkCouponList = [id];
					this.checkPrice = data.amount;
					this.checkOverlay = data.overlay;
					return;                            
				}else{
					for (const i of everyData) {
						if (!data[i.name] === i.val) {
							uni.showToast({ title:i.errMsg, position:'top', icon:'none' })
							return false;
						}
					}
					this.checkPrice+=data.amount;
					this.checkCouponList.push(id);
				}
			}else{
				if(this.checkTp==1||this.checkTp==2){
					this.checkPrice-=this.couponList[index].amount
				}
				this.checkCouponList.splice(checkindex,1)
				if(this.checkCouponList.length==0){
					this.checkTp = 0
				}
			}
		}
		checkCoupon(id:any){
			return this.checkCouponList.indexOf(id) == -1?false:true
		}
		
	}
</script>

<style lang="scss">
	.payment{
		width: 100%;
		box-sizing: border-box;
		&-showdow{
			width: 100%;
			height:100%;
			position: fixed;
			top:0;
			left:0;
			z-index:66;
			background: rgba(0, 0, 0, 0.5);
		}
		&-popup{
			width: 100%;
			height:1000rpx;
			position: fixed;
			box-sizing: border-box;
			background:$content-bg;
			border-radius: 12rpx 12rpx 0px 0px;
			z-index: 1000;
			bottom:0;
			left:0;
			transition:transform 0.2s;
			-webkit-transition: -webkit-transform 0.2s;
			transform: translateY(1000rpx);
		}
		.payment-header{
			width: 100%;
			height:90rpx;
			box-sizing: border-box;
			padding: 26rpx 0 20rpx 0;
			font-size: 26rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 600;
			color: #14151A;
			text-align: center;
			position: relative;
			background:#fff;
			z-index:2
		}
		
	}
	.content{
		width: 100%;
		height:1000rpx;
		overflow-y: auto;
		position: absolute;
		left:0;
		top:0;
		box-sizing: border-box;
		padding:110rpx 20rpx 132rpx 20rpx;
		display: block;
		z-index: 1;
		
	}
	.icon-close{
		width: 32rpx;
		height:32rpx;
		background:url(../../static/pay/guanbi@2x.png) no-repeat center;
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
				font-family: PingFang SC;
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
				font-family: PingFang SC;
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
					font-family: PingFang SC;
					font-weight: 600;
					color: #333333;
				}
				.coupon-time{
					width: 100%;
					font-size: 21rpx;
					font-family: PingFang SC;
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
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #B8B7B7;
				}
			}
		}
	}
	
	.coupon-right-check{
		width: 27rpx;
		height:27rpx;
		background:url(../../static/pay/weixuan@2x.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		right:10rpx;
		top:22rpx
	}
	.coupon-right-checked{
		width: 27rpx;
		height:27rpx;
		background:url(../../static/pay/coupon_xz.png) no-repeat center;
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
		font-family: PingFang SC;
		font-weight: 600;
		color: #F6F7FB;
		line-height: 40rpx;
	}
</style>
