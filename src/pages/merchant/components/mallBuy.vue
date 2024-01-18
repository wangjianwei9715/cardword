<template>
	<view class="content">
		<u-popup mode="center" :show="popupShow" @close="show = false" :round="5" :safeAreaInsetBottom="false">
			<view class="popup-content">
				<view class="header">
					<view class="title">商品信息</view>
					<view class="special" v-if="detail.limit_num > 0">限购:{{ detail.limit_num }}</view>
				</view>
				<view class="goods">
					<view class="desc" v-for="(item, index) in detail.sonNameList" :key="index">
						{{ item }}
					</view>
				</view>
				<u-divider class="widthMax"></u-divider>
				<view class="tips">{{ needPayMoney ? "￥" : "所需积分" }}：<text>{{ price }}</text></view>
				<view class="tips buyNum">购买份数：
					<u-number-box v-model="buyNum">
						<view slot="minus" class="minus">
							<u-icon name="minus" size="18rpx"></u-icon>
						</view>
						<text slot="input" style="width: 50rpx;text-align: center;color: #fa1545;font-size: 24rpx;" class="input">{{ buyNum
						}}</text>
						<view slot="plus" class="plus">
							<u-icon name="plus" color="#FFFFFF" size="18rpx"></u-icon>
						</view>
					</u-number-box>


				</view>
				<view class="tips" v-if="detail.buy_require > 0">门槛：{{ requireStr }}</view>
				<view class="btn" @click="onClickConfirm">{{ needPayMoney ? '购买' : '确认兑换' }}</view>
				<view class="ex">确认兑换后积分将不予退回</view>
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
import { Component, Prop, PropSync, Watch } from "vue-property-decorator";
import BaseComponent from "@/base/BaseComponent.vue";
import { app } from "@/app";
import { payTypeMap } from '../constants/constants'
@Component({})
export default class ClassName extends BaseComponent {
	@PropSync("popupShow", { type: Boolean })
	show!: Boolean
	@Prop({ default: 0 })
	id!: any
	exchangeShow = false;
	detail: any = {};
	buyNum: number = 1
	@Watch('show')
	onChangeShow(val: boolean) {
		if (val) {
			this.buyNum=1
			this.detail = {};
			app.http.Get(`dataApi/merchant/mall/goodsDetail/${this.id}`, {}, (res: any) => {
				this.detail = res.data || {}
			})
		}
	}
	public get needPayMoney(): boolean {
		return this.detail.pay_type == payTypeMap.money;
	}
	public get requireStr(): string {
		const { buy_require, require_num } = this.detail
		return buy_require == 1 ? `入驻时间不超过${require_num}天` : `上月销售额不超过${require_num}元`
	}
	public get price():number{
		return this.detail.price*this.buyNum
	}
	onClickConfirm() {
		app.platform.UIClickFeedBack();
		if (this.needPayMoney) {
			this.exchangeClose();
			uni.navigateTo({
				url: `/pages/merchant/mall/pay?id=${this.id}&buyNum=${this.buyNum}`,
			});
			return;
		}
		app.http.Post(`merchant/exchange/${this.id}`, {
			buyNum:this.buyNum
		}, (res: any) => {
			this.$emit("exchangeSuccess")
			this.exchangeShow = true;
		})
	}
	exchangeClose() {
		this.exchangeShow = false;
		this.show = false;
	}
	onClickGoSale() {
		this.exchangeClose();
		uni.navigateTo({ url: "/pages/merchant/goods_sale" })
	}
}
</script>

<style lang="scss" scoped>
@mixin lineBox {
	width: 100%;
	box-sizing: border-box;
	padding: 0 33rpx;
	display: flex;
}

.widthMax {
	width: 100%;
	margin-top: 40rpx
}

.popup-content {
	@include lineBox;
	width: 482rpx;
	border-radius: 15rpx;
	padding: 26rpx 0;
	flex-direction: column;
	align-items: center;
}

.header {
	@include lineBox;
	justify-content: space-between;

	.title {
		font-size: 28rpx;
		font-weight: bold;
		color: #333
	}

	.special {
		font-size: 21rpx;
		color: #999999
	}
}

.goods {
	@include lineBox;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 50rpx;
	min-height: 150rpx;
	align-items: center;

	.desc {
		width: 100%;
		text-align: center;
		font-size: 28rpx;
		color: #333;
		margin-bottom: 6rpx;
	}
}

.tips {
	@include lineBox;
	justify-content: flex-start;
	padding: 0 33rpx;
	font-size: 21rpx;
	margin-bottom: 18rpx;
	color: #333;

	text {
		color: #E6374C
	}
}

.btn {
	width: 416rpx;
	height: 60rpx;
	background: #FA1545;
	border-radius: 5rpx;
	color: #fff;
	font-size: 25rpx;
	font-weight: 500;
	margin: 14rpx auto;
	display: flex;
	align-items: center;
	justify-content: center;
}

.exchange-success {
	@include lineBox;
	justify-content: flex-start;
	padding: 100rpx 30rpx;
	font-size: 26rpx;
	color: #333;
}

.ex {
	font-size: 21rpx;
	color: #AAAAAA;
	width: 100%;
	text-align: center;
}
.buyNum{
	align-items: center;
}
.minus {
	width: 28rpx;
	height: 28rpx;
	border-width: 1rpx;
	border-color: #E6E6E6;
	border-style: solid;
	border-top-left-radius: 100rpx;
	border-top-right-radius: 100rpx;
	border-bottom-left-radius: 100rpx;
	border-bottom-right-radius: 100rpx;
	@include flex;
	justify-content: center;
	align-items: center;
}

.input {
	padding: 0 10rpx;
}

.plus {
	width: 28rpx;
	height: 28rpx;
	background-color: #fa1545;
	border-radius: 50%;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	align-items: center;
}
</style>