<template>
	<view class="content">
		<view class="header" @click="onClickAddress">
			<view class="header-left">
				<view class="icon-address"></view>
				<view v-if="addressData!=''" class="header-address">
					<view class="address-desc">{{addressData.district}}{{addressData.detail}}</view>
					<view class="address-name">{{addressData.name}}<text>{{addressData.phone}}</text></view>
				</view>
				<view v-else  class="header-address">
					<view class="address-tips">请选择收货地址</view>
				</view>
			</view>
			<button class="header-right">&#xe470;</button>
		</view>
		<image src="../../static/goods/icon_xinfeng.png" style="width: 748rpx; height: 4rpx;"></image>

		<view class="order-detail" v-if="goodsData.pic">
			<view class="goods-info">
				<image :src="decodeURIComponent(getGoodsImg(goodsData.pic.carousel))"
					style="width: 200rpx; height: 200rpx; padding: 16rpx; margin: 20rpx;"></image>
				<view class="goods-info2">
					<text class="goods-info2-title">{{goodsData.title}}</text>
					<view class="goods-money-info">
						<text class="goods-money">¥{{goodsData.price}}</text>
						<view class="goods-money-add">
							<view class="img-jian" @click="onClickCutDown()"></view>
							<input class="money-add" @input="onInputMoney" v-model="moneyNum" type="number" />
							<view class="img-add" @click="onClickAdd()"></view>
						</view>
					</view>
				</view>
			</view>

			<view style="width: 750rpx; height: 20rpx; background: #F6F7F8;"></view>
			<view class="huo-dong-bg" v-show="goodsData.discount!=''">
				<text class="item-name">活动</text>
				<view class="item-youhui-bg" v-for="(item,index) in goodsData.discount" :key="index">
					{{item.content}}
				</view>
			</view>

			<view style="width: 750rpx; height: 20rpx; background: #F6F7F8;"></view>
			<view class="yunfei-info">
				<view class="yunfei-item">
					<text class="item-name">商品金额</text>
					<text class="item-name">¥{{goodsData.price}}</text>
				</view>
				<view class="yunfei-item" v-show="youhuiPrice>0">
					<text class="item-name">优惠</text>
					<text class="item-name">- ¥{{youhuiPrice}}</text>
				</view>
				<view class="yunfei-item">
					<text class="item-name">运费</text>
					<text class="item-name">包邮</text>
				</view>
				<view class="cross-line"></view>
				<view class="yunfei-item">
					<text class="item-name"></text>
					<view class="heji-money">
						<text class="heji-text">合计:</text>
						<text class="heji-money2">¥{{moneyNum*goodsData.price-youhuiPrice}}</text>
					</view>
				</view>
			</view>

			<view class="bottom-content">
				<view class="heji-money-pay">
					<text class="heji-text" style="color: #FF4349;">合计:</text>
					<text class="heji-money2" style="color: #FF4349;">¥{{moneyNum*goodsData.price-youhuiPrice}}</text>
				</view>
				<view class="btn-payment2" @click="onClickToPay()">去支付</view>
			</view>

		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
import {
		Component
	} from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import {
		getGoodsImg
	} from "../../tools/util";
	@Component({})
	export default class ClassName extends BaseNode {
		addressData:any = [];
		getGoodsImg = getGoodsImg;
		moneyNum = 1;
		goodsData:{[x:string]:any} = [];
		youhuiPrice = 0;
		onLoad(query: any) {
			if(query.data){
				// #ifndef MP 
				this.goodsData = JSON.parse(query.data)
				// #endif
				// #ifdef MP
				this.goodsData = JSON.parse(decodeURIComponent(query.data))
				// #endif
				
			}

			this.onEventUI('addressSelect',(data)=>{
				this.addressData = data.data
			})
		}
		onInputMoney(event:any){
			
			if(this.youhuiPrice>0&&this.moneyNum<this.goodsData.discount[0].minNum){
				this.youhuiPrice = 0;
			}
			this.onChangeMoneyNum()
		}
		
		onClickCutDown(){
			if(this.moneyNum>1){
				this.moneyNum--;
			}
			if(this.youhuiPrice>0&&this.moneyNum<this.goodsData.discount[0].minNum){
				this.youhuiPrice = 0;
			}
			console.log('减')
		}
		
		onClickAdd(){
			this.moneyNum++;
			this.onChangeMoneyNum()
			console.log('加',this.youhuiPrice)
		}
		onChangeMoneyNum(){
			if(this.goodsData.discount!=''){
				for(let i of this.goodsData.discount){
					if(this.moneyNum>=i.minNum){
						this.youhuiPrice = i.discount
					}
				}		
			}
		}
		onClickAddress(){
			uni.navigateTo({
				url:'/pages/userinfo/setting_addresses?type=order'
			})
		}
		onClickToPay(){
			if(this.addressData==''){
				uni.showToast({
					title:'请先选择地址',
					icon:'none',
				})
				return;
			}
			let params:{[x:string]:any}
			// #ifdef MP
			params= {
				channel:'mini',
				delivery:this.addressData.id,
				num:Number(this.moneyNum)
			}
			app.http.Post('good/topay/'+this.goodsData.goodCode,params,(res:any)=>{
				app.platform.payment(res.wechat,(data:any)=>{
					
				})
				uni.redirectTo({
					url:'/pages/userinfo/order_list'
				})
			})
			
			// #endif
			// #ifndef MP
			params = {
				channel:'alipay',
				delivery:this.addressData.id,
				num:Number(this.moneyNum)
			}
			app.http.Post('good/topay/'+this.goodsData.goodCode,params,(res:any)=>{
				if(res.alipay.orderInfo!=''){
					app.payment.paymentAlipay(res.alipay.orderInfo,()=>{
						
					})
					uni.redirectTo({
						url:'/pages/userinfo/order_list'
					})
				}
			})
			// #endif
		}
	}
</script>

<style lang="scss">
	$font-16:16rpx;
	$font-20:20rpx;
	$font-24:24rpx;
	$font-28:28rpx;

	page {
		background: #F6F7F8;
	}
	.order-detail{
		background:#fff;
	}
	.header{
		width: 100%;
		height:200rpx;
		background:#fff;
		box-sizing: border-box;
		padding:0 30rpx;
		border-bottom: 14rpx solid #F5F5F9;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.header-left{
		width: 630rpx;
		height:100rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.header-right{
		width: 72rpx;
		height:72rpx;
		background-color: rgba(0, 0, 0, 0);
		font-family: uniicons;
		font-size: 48rpx;
		font-weight: normal;
		font-style: normal;
		line-height: 72rpx;
		color: #C4C3C8;
		margin: 0
	}
	.icon-address{
		width: 32rpx;
		height:38rpx;
		background:url(../../static/goods/icon_location.png) no-repeat center;
		background-size: 100% 100%;
		margin-right: 24rpx;
	}
	.header-address{
		width: 570rpx;
		height:100rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	.address-desc{
		width: 100%;
		font-size: 28rpx;
		font-family: HYQiHei;
		font-weight: bold;
		color: #3B3B3B;
	}
	.address-name{
		width: 100%;
		font-size: 24rpx;
		font-family: HYQiHei;
		font-weight: bold;
		color: #3B3B3B;
	}
	.address-tips{
		height:100rpx;
		line-height: 100rpx;
		font-size: 28rpx;
		font-family: HYQiHei;
		font-weight: bold;
		color: #3B3B3B;
	}
	.goods-info {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.goods-info2 {
		width: 478rpx;
		margin: 28rpx 0;
		display: flex;
		flex-direction: column;
	}

	.goods-info2-title {
		margin-right: 30rpx;
		margin-left: 8rpx;
		font-size: $font-28;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #14151A;
		line-height: 40rpx;
	}

	.goods-money-info {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.goods-money {
		margin-left: 8rpx;
		margin-top: 58rpx;
		font-size: $font-24;
		font-family: 'DIN';
		font-weight: bold;
		color: #14151A;
		line-height: 28rpx;
	}

	.goods-money-add {
		margin-top: 50rpx;
		margin-right: 12rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.img-add{
		width: 48rpx;
		height:48rpx;
		background: url(../../static/goods/icon_add_price.png) no-repeat center;
		background-size: cover;
	}
	
	.img-jian {
		width: 48rpx;
		height: 48rpx;
		background: url(../../static/goods/icon_jian_price.png) no-repeat center;
		background-size: cover;
	}

	.money-add {
		width: 66rpx;
		height: 48rpx;
		border: 2rpx solid #EEEEEE;
		text-align: center;

		font-size: $font-24;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #14151A;
		line-height: 34rpx;
	}

	.huo-dong-bg {
		width: 100%;
		height: 72rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
	}

	.item-name {
		font-size: $font-24;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
		line-height: 34rpx;
		margin-left: 36rpx;
	}

	.item-youhui-bg {
		width: 130rpx;
		height: 40rpx;
		background: url(../../static/goods/icon_discounts_bg.png) no-repeat center;
		background-size: cover;
		display: flex;
		align-items: center;
		justify-content: center;

		font-size: $font-20;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #E6D188;
		line-height: 28rpx;
		margin-left: 32rpx;

	}

	.item-youhui-bg2 {
		width: 130rpx;
		height: 40rpx;
		background: url(../../static/goods/icon_discounts_bg2.png) no-repeat center;
		background-size: cover;
		display: flex;
		align-items: center;
		justify-content: center;

		font-size: $font-20;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #14151A;
		line-height: 28rpx;
		margin-left: 16rpx;
	}

	.yunfei-info {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.yunfei-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 24rpx 36rpx 0 0;
	}

	.cross-line {
		width: 678rpx;
		height: 2rpx;
		background: #F1F1F4;
		margin: 24rpx 36rpx 0 36rpx;
	}

	.heji-money {
		display: flex;
		flex-direction: row;
		margin-bottom: 24rpx;
	}

	.heji-text {
		font-size: $font-20;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #14151A;
		line-height: 28rpx;
	}

	.heji-money2 {
		font-size: $font-24;
		font-family: 'DIN';
		font-weight: bold;
		color: #14151A;
		line-height: 28rpx;
		margin-left: 12rpx;
	}

	.bottom-content {
		width: 100%;
		height: 112rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		position: fixed;
		bottom: 0;
	}

	.heji-money-pay {
		margin-left: 36rpx;
	}

	.btn-payment {
		width: 360rpx;
		height: 88rpx;
		background: #CECFD3;
		border-radius: 4rpx;
		margin-right: 16rpx;

		display: flex;
		align-items: center;
		justify-content: center;
		font-size: $font-28;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 40rpx;
	}

	.btn-payment2 {
		width: 360rpx;
		height: 88rpx;
		background: #14151B;
		border-radius: 4rpx;
		margin-right: 16rpx;

		display: flex;
		align-items: center;
		justify-content: center;
		font-size: $font-28;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 40rpx;
	}
</style>
