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
							<view class="coupon-condition">{{item.goodCode!=''?'指定商品':getCouponType(item.tp,(item.minUseAmount?item.minUseAmount:0))}}</view>
						</view>
						<view class="coupon-right">
							<view class="coupon-right-header">
								<view class="coupon-right-header-left">
									<view class="coupon-name"><image class="coupon-icon" src="../../static/userinfo/coupon_icon.png"/>{{item.name}}</view>
									<view class="coupon-time">{{dateFormatYMS(item.startAt)}}-{{dateFormatYMS(item.overAt)}}</view>
								</view>
								<view :class="checkCoupon(item.id)?'coupon-right-checked':'coupon-right-check'" @click="onClickcheckCoupon(item.id,index)"></view>
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
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		showPayMentCoupon!:boolean;
		@Prop({default:[]})
		couponList!:any

		dateFormatYMS = dateFormatYMS;
		showPopup = false;
		checkCouponList:any = [];
		checkTp = 0;
		checkPrice = 0;
		confirmList:any = [];
		confirmPrice = 0;
		confirmTp = 0;
		@Watch('showPayMentCoupon')
		onShowChanged(val: any, oldVal: any){
			if(val){
				setTimeout(()=>{
					this.showPopup = true
				},100)
			}else{
				this.checkCouponList= JSON.parse(JSON.stringify(this.confirmList))
				this.checkTp = this.confirmTp
				this.checkPrice = this.confirmPrice
				this.showPopup = false
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
					return '全平台无门槛';
				case 2:
					return '满'+minUseAmount+'减';
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

			// 是否已选择优惠券
			if(checkindex == -1){
				// 同类型不可以叠加
				if(!this.couponList[index].overlay){
					if(this.checkTp == 0){
						this.checkTp = this.couponList[index].tp
						this.checkCouponList = [id];
						this.checkPrice = this.couponList[index].amount
						return;
					}else{
						uni.showToast({
							title:'此优惠券不能叠加使用',
							position:'top',
							icon:'none'
						})
						return;
					}
				}

				if(this.checkTp == 0){
					this.checkTp = this.couponList[index].tp
				}else if(this.checkTp!=this.couponList[index].tp){
					uni.showToast({
						title:'不同类型优惠券不能叠加使用',
						position:'top',
						icon:'none'
					})
					return;
				}
				

				// 满减不能叠加
				if(this.checkTp==2){
					this.checkCouponList = [id];
					this.checkPrice = this.couponList[index].amount
					return;
				}

				if(this.checkTp==1){
					this.checkPrice+=this.couponList[index].amount
				}
				this.checkCouponList.push(id);
				
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
			font-family: PingFangSC-Semibold, PingFang SC;
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
		width: 710rpx;
		height:216rpx;
		background:url(../../static/userinfo/coupon_bg.png) no-repeat center;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.coupon-left{
			width:216rpx;
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
				font-family:LTGBK;
				font-size: 70rpx;
			}
			.coupon-condition{
				width: 100%;
				text-align: center;
				font-size: 19rpx;
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
				height:120rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
				.coupon-right-header-left{
					width: 350rpx;
					height:60rpx;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					box-sizing: border-box;
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
			}
		}
	}
	
	.coupon-right-check{
		width: 36rpx;
		height:36rpx;
		background:url(../../static/pay/weixuan@2x.png) no-repeat center;
		background-size: 100% 100%;
	}
	.coupon-right-checked{
		width: 36rpx;
		height:36rpx;
		background:url(../../static/pay/xuanzhong@2x.png) no-repeat center;
		background-size: 100% 100%;
	}
	.coupon-btn-content{
		width: 100%;
		height:110rpx;
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
		width: 710rpx;
		height: 88rpx;
		background: #ff504f;
		border-radius: 44rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #ffffff;
		line-height: 40rpx;
	}
</style>
