<template>
	<view class="content">
		<view class="top-content">
			<view class="address-content">
				<image class="img-location"></image>
				<text class="order-address" v-if="isHasAdress">浙江省杭州市西湖区数字娱乐产业园7号楼401室巴拉 巴拉巴拉巴拉芭芭拉
					巴拉巴拉巴拉芭芭拉巴拉巴拉巴拉芭芭拉巴拉巴拉巴拉芭芭拉巴拉巴拉巴拉芭芭拉</text>
				<text class="order-address" v-else>请填写收货地址</text>
				<image class="img-fanhui"></image>
			</view>
			<view class="phone-info" v-if="isHasAdress">
				<text class="phone-name">梅超风 </text>
				<text class="phone-num">183****7451</text>
			</view>
		</view>
		<image src="../../static/goods/icon_xinfeng.png" style="width: 748rpx; height: 4rpx;"></image>

		<view class="order-detail">
			<view class="goods-info">
				<image src="../../static/index/tab0.png"
					style="width: 200rpx; height: 200rpx; padding: 16rpx; margin: 20rpx;"></image>
				<view class="goods-info2">
					<text class="goods-info2-title">20-21 National Treasures Hobby 原箱*3</text>
					<view class="goods-money-info">
						<text class="goods-money">¥149</text>
						<view class="goods-money-add">
							<view class="img-add">1</view>
							<input class="money-add" @input="onInputMoney" v-model="moneyNum" type="number" />
							<view class="img-jian"></view>
						</view>
					</view>
				</view>
			</view>

			<view style="width: 750rpx; height: 20rpx; background: #F6F7F8;"></view>
			<view class="huo-dong-bg">
				<text class="item-name">活动</text>
				<view class="item-youhui-bg">
					满10组减5元
				</view>
				<view class="item-youhui-bg2">
					满10组减5元
				</view>
			</view>

			<view style="width: 750rpx; height: 20rpx; background: #F6F7F8;"></view>
			<view class="yunfei-info">
				<view class="yunfei-item">
					<text class="item-name">商品金额</text>
					<text class="item-name">¥56.00</text>
				</view>
				<view class="yunfei-item">
					<text class="item-name">优惠</text>
					<text class="item-name">- ¥5.00</text>
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
						<text class="heji-money2">¥14452354832625879</text>
					</view>
				</view>
			</view>

			<view class="bottom-content">
				<view class="heji-money-pay">
					<text class="heji-text" style="color: #FF4349;">合计:</text>
					<text class="heji-money2" style="color: #FF4349;">¥14452354832625879</text>
				</view>
				<view :class="isAbleBtn==true?'btn-payment2':'btn-payment'" @click="onClickToPay()">去支付</view>
			</view>

		</view>
	</view>
</template>

<script lang="ts">
	import {
		Component
	} from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		isHasAdress = true; //是否存在收货地址
		moneyNum = 1;
		isAbleBtn = false; //是否可以支付

		onLoad(query: any) {

		}

		onClickToPay() {
			console.log('去支付')
		}
		
		onInputMoney(event:any){
			
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

	.top-content {
		width: 100%;
		height: auto;
		background: #FFFFFF;
	}

	.address-content {
		display: flex;
		flex-direction: row;
		margin: 48rpx 0 16rpx 0;
	}

	.img-location {
		width: 32rpx;
		height: 38rpx;
		background: url(../../static/goods/icon_location.png) no-repeat center;
		background-size: cover;
		margin-left: 32rpx;
	}

	.img-fanhui {
		width: 10rpx;
		height: 22rpx;
		margin-top: 8rpx;
		background: url(../../static/goods/icon_righ_back.png) no-repeat center;
		background-size: cover;
		margin-right: 32rpx;
	}

	.order-address {
		width: 556rpx;
		height: auto;
		margin-left: 24rpx;
		margin-right: 64rpx;

		font-size: $font-24;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
		line-height: 34rpx;
	}

	.phone-info {
		width: 100%;

		font-size: $font-24;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #7F7F8E;
		line-height: 34rpx;
		padding-bottom: 20rpx;
	}

	.phone-name {
		margin-left: 88rpx;
	}

	.phone-num {
		margin-left: 40rpx;
	}

	.order-detail {
		width: 100%;
		margin-top: 20rpx;
		background: #FFFFFF;
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
	}

	.img-add{
		width: 48rpx;
		height:48rpx;
		background: url(../../static/goods/‭‭icon_add_price.png) no-repeat center;
		background-size: 100% 100%;
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
