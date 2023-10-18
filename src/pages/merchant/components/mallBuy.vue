<template>
	<view class="content">
		<u-popup mode="center" :show="popupShow" @close="show=false" :round="5" :safeAreaInsetBottom="false">
			<view class="popup-content">
				<view class="header">
					<view class="title">商品信息</view>
					<view class="special" v-if="detail.limit_num>0">限购:{{detail.limit_num}}</view>
				</view>
				<view class="goods">
					<view class="desc" v-for="(item,index) in detail.sonNameList" :key="index">
						{{item}}
					</view>
				</view>
				<u-divider class="widthMax"></u-divider>
				<view class="tips">{{needPayMoney?"￥":"所需积分"}}：<text>{{detail.price}}</text></view>
				<view class="tips" v-if="detail.buy_require>0">门槛：{{requireStr}}</view>
				<view class="btn" @click="onClickConfirm">{{needPayMoney?'购买':'确认兑换'}}</view>
			</view>
		</u-popup>

		<u-popup mode="center" :show="exchangeShow" @close="exchangeClose" :round="5" :safeAreaInsetBottom="false">
			<view class="popup-content">
				<view class="exchange-success">兑换成功，可在在售管理中选择商品使用</view>
				<view class="btn" @click="onClickGoSale">查看在售管理</view>
			</view>
		</u-popup>
	</view>
</template>

<script lang="ts">
	import { Component,Prop,PropSync,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	import { payTypeMap } from '../constants/constants'
	@Component({})
	export default class ClassName extends BaseComponent {
		@PropSync("popupShow",{type:Boolean})
		show!:Boolean
		@Prop({default:0})
		id!:any
		exchangeShow = false;
		detail:any = {};
		@Watch('show')
		onChangeShow(val:boolean){
			if(val){
				this.detail = {};
				app.http.Get(`dataApi/merchant/mall/goodsDetail/${this.id}`, {}, (res: any) => {
					this.detail = res.data || {}
				})
			}
		}
		public get needPayMoney() : boolean {
			return this.detail.pay_type==payTypeMap.money;
		}
		public get requireStr() : string {
			const { buy_require, require_num } = this.detail
			return buy_require==1?`入驻时间不超过${require_num}天`:`上月销售额不超过${require_num}元`
		}
		onClickConfirm(){
			app.platform.UIClickFeedBack(); 
			if(this.needPayMoney){
				this.exchangeClose();
				uni.navigateTo({
					url: `/pages/merchant/mall/pay?id=${this.id}`,
				});
				return;
			}
			app.http.Post(`merchant/exchange/${this.id}`,{},(res:any)=>{
				this.$emit("exchangeSuccess")
				this.exchangeShow=true;
			})
		}
		exchangeClose(){
			this.exchangeShow=false;
			this.show=false;
		}
		onClickGoSale(){
			this.exchangeClose();
			uni.navigateTo({ url:"/pages/merchant/goods_sale" })
		}
	}
</script>

<style lang="scss" scoped>
@mixin lineBox{
	width: 100%;
	box-sizing: border-box;
	padding: 0 20rpx;
	display: flex;
}
.widthMax{
	width: 100%;
}
.popup-content{
	@include lineBox;
	width: 525rpx;
	border-radius: 3rpx;
	padding: 20rpx 0 ;
	flex-direction: column;
	align-items: center;
}
.header{
	@include lineBox;
	justify-content: space-between;
	.title{
		font-size: 30rpx;
		font-weight: bold
	}
	.special{
		font-size: 26rpx;
	}
}
.goods{
	@include lineBox;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 50rpx;
	.desc{
		width: 100%;
		text-align: center
	}
}
.tips{
	@include lineBox;
	justify-content: flex-start;
	padding:0 40rpx;
	font-size: 22rpx;
	color:#666;
	text{
		color:#E6374C
	}
}
.btn{
	width: 450rpx;
	height:60rpx;
	background:#E6374C;
	border-radius: 10rpx;
	color:#fff;
	font-size: 36rpx;
	font-weight: bold;
	margin:20rpx auto;
	display: flex;
	align-items: center;
	justify-content: center;
}
.exchange-success{
	@include lineBox;
	justify-content: flex-start;
	padding:100rpx 30rpx;
	font-size: 26rpx;
	color:#333;
}

</style>