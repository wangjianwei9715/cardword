<template>
	<view>
		<view class="yunfei-item" v-for="(item,index) in couponData" :key="index">
			<text class="item-name">{{item.name}}</text>
			<view class="item-name" v-if="disable">此商品优惠券不可用</view>
			<view class="item-name" v-else @click="onClickShowPopup(item.data)">
				<text class="coupon-num">{{ couponText(item.data) }}</text>
				{{ item.data.price > 0 ? "" : "张可用"}}
				<view class="item-name-right"></view>
			</view>
        </view>

		<payCouponPopup v-for="(item,index) in couponData" :key="`popup_${index}`" :show.sync="item.data.show" :couponList="item.data.list" :selectList.sync="item.data.selectList" @confirm="onConfirm($event,index)"/>
	</view>
</template>

<script lang="ts">
	import { Component,Prop } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import payCouponPopup from "./payCouponPopup.vue"
	import { app } from "@/app";
	class CouponData {
		show:boolean = false;
		price:number = 0;
		num:number = 0;
		list:any[] = [];
		selectList:any[] = [];
	}
	@Component({
		components:{payCouponPopup}
	})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		disable?:boolean
		@Prop({default:0})
		totalAmount!:number
		@Prop({default:0})
		totalPrice!:number

		couponData:{[x:string]:any} = {
			couponMerchant:{
				name:"商家优惠券",
				data:new CouponData()
			},
			couponOfficial:{
				name:"平台优惠券",
				data:new CouponData()
			}
		}
		orderParams = {
			goodCode:"",
			num:0,
			price:0
		}
		selectedCoupon:any = []
		listOfMerchant:any = [];
		listOfPlat:any = [];
		couponText({price,num}:any){
			return price > 0 ? `-¥${price}`  : num;
		}
		onClickShowPopup(item:any) {
			if(item.num<=0) return;
			item.show=true
		}
		setData(data:any){
			this.orderParams = data;
			this.getCouponList();
		}
		refreshCouponList(){
			this.initCouponData("couponMerchant",this.listOfMerchant)
			this.initCouponData("couponOfficial",this.listOfPlat)
		}
		refreshSelect(){
			if(this.selectedCoupon.length>1){
				const { couponMerchant, couponOfficial } = this.couponData;
				const length = this.selectedCoupon.length-1;
				const frontId = this.selectedCoupon.slice(0,length);
				const frontCouponAmount = frontId.reduce((total:number,item:any)=>total+(item.amount||0),0);
				const lastCoupon = this.selectedCoupon[length];
				const mCoupon = couponMerchant.data.list.some((x:any)=>x.id==lastCoupon.id);
				const oCoupon = couponOfficial.data.list.some((x:any)=>x.id==lastCoupon.id);
				if(frontCouponAmount>=this.totalAmount || (lastCoupon.minUseAmount>(this.totalAmount-frontCouponAmount))){
					if(mCoupon){
						couponMerchant.data.selectList = [];
						couponMerchant.data.price = 0
					}else if(oCoupon){
						couponOfficial.data.selectList = [];
						couponOfficial.data.price = 0
					}
					this.selectedCoupon.splice(length,1)
					this.onConfirm({price:0},mCoupon?"couponMerchant":"couponOfficial")
				}
			}
		}
		getCouponList(){
			app.http.Get(`me/coupon/condition/select/${this.orderParams.goodCode}`, this.orderParams, (res: any) => {
				this.listOfMerchant = res.listOfMerchant || [];
				this.listOfPlat = res.listOfPlat || [];
				this.refreshSelect();
				this.refreshCouponList()
			});
		}
		initCouponData(ctp:string,list:any){
			const data = this.couponData[ctp].data;
			if(data.selectList.length){
				const idLists = list.map((x:any)=>x.id)
				const has = data.selectList.every((x:any)=>{
					return idLists.includes(x.id)
				})
				if ( has ) return;
				data.price = 0;
				data.selectList = []
				this.onConfirm({price:0},ctp)
			}
			const usableList = (list||[]).filter((x:any)=>{
				return (this.totalPrice>0) && (x.tp==1 || (x.minUseAmount<=this.totalPrice))
			})
			data.num = usableList.length || 0;
			data.list = usableList;
		}
		onConfirm(data:any,ctp:string){
			const { couponMerchant, couponOfficial } = this.couponData;
			const coupon =  this.couponData[ctp].data;
			coupon.price = data.price;
			const setIdList = app.platform.removeDuplicate([...this.selectedCoupon,...coupon.selectList],'id') 	
			const sList = this.selectIdList([...couponMerchant.data.selectList,...couponOfficial.data.selectList]);
			const totalPrice = Number(couponMerchant.data.price) + Number(couponOfficial.data.price);
			this.selectedCoupon = setIdList.filter((x:any)=>sList.includes(x.id));
			this.$emit("couponConfirm",{
				list:this.selectedCoupon.map((x:any)=>x.id),
				totalPrice,
			})
		}
		selectIdList(list:any[]){
			return list.map((x:any)=>x.id)
		}
		
	}
</script>

<style lang="scss">
.yunfei-item {
	width: 100%;
	height:68rpx;
	align-items: center;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.item-name {
	font-size: 26rpx;
	font-family: PingFangSC-Regular;
	font-weight: 400;
	color: #333333;
	line-height: 34rpx;
	display: flex;
	align-items: baseline;
}
.coupon-num {
	font-size: 24rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 600;
	color: #FA1545;
}
.item-name-right {
	width: 10rpx;
	height: 16rpx;
	background: url(@/static/goods/jinru@2x.png) no-repeat center;
	background-size: 100% 100%;
	margin-left: 6rpx;
}
</style>
