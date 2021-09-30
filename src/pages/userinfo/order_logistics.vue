<template>
	<!-- <logistics></logistics> -->
	<view class="contents">
		<view class="order-status">
			<text>运输中</text>
		</view>
		<view class="order-content">
			<view class="order-info">
				<text>快递公司：顺丰快递</text>
				<view class="order-num">
					<text>快递单号：45614512121454561</text>
					<button class="btn-copy">复制</button>
				</view>
			</view>
			<view class="cross-line"></view>

			<!-- 物流信息展示 -->
			<view class="order-step" v-if="isShowOrderAddress">
				<view class="transport-info" v-for="(item,index) in orderAddressList" :key="index">
					<view class="desc">
						<view class="dot-bg" v-if="item.status==4"></view>
						<view :class="item.status==1?'car-bg':'car-bg2'" v-else>
							<text class="order-receive" v-if="item.status==0">收</text>
							<image class="pic-car" v-else-if="item.status==1||item.status==2"></image>
							<image class="pic-order" v-else-if="item.status==3"></image>
						</view>
						<view
							:class="item.status==4?'cross-line-column3':(item.status==1?'cross-line-column2':'cross-line-column')"
							v-if="item.status!=3"></view>
					</view>
					<view class="desc">
						<view class="transport-info-bg" v-if="item.status!=0">
							<text :class="item.status==1?'transport-status':'transport-status2'"
								v-if="item.status!=4">{{item.transport_status}}</text>
							<text
								:class="item.status==1?'transport-time':'transport-time2'">{{item.transport_time}}</text>
						</view>
						<text :class="item.status==1?'transport-desc':'transport-desc2'">{{item.transport_desc}}</text>
					</view>
				</view>
			</view>

			<view class="express" v-else>
				<view class="title">暂无物流信息</view>
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
		isShowOrderAddress = true;
		orderAddressList = [{
				status: 0,
				transport_status: '',
				transport_time: '09-18 11:12',
				transport_desc: '[收货地址]杭州转运中心公司 已出发，下一站 浙江省杭 州市余杭区城西交换站 185*****1542',
			},
			{
				status: 1,
				transport_status: '运输中',
				transport_time: '09-18 11:12',
				transport_desc: '杭州转运中心公司 已出发，下一站 浙江省杭州市余杭区 城西交换站',
			},
			{
				status: 4,
				transport_status: '',
				transport_time: '09-18 11:12',
				transport_desc: '杭州转运中心公司 已出发，下一站 浙江省杭州市余杭区 城西交换站',
			},
			{
				status: 4,
				transport_status: '',
				transport_time: '09-18 11:12',
				transport_desc: '杭州转运中心公司 已出发，下一站 浙江省杭州市余杭区 城西交换站',
			},
			{
				status: 2,
				transport_status: '已发货',
				transport_time: '09-18 11:12',
				transport_desc: '商品已发货',
			},
			{
				status: 3,
				transport_status: '已下单',
				transport_time: '09-18 11:12',
				transport_desc: '商品已下单',
			}
		];

		onLoad(query: any) {

		}
	}
</script>

<style lang="scss">
	$font-20:20rpx;
	$font-22:22rpx;
	$font-24:24rpx;
	$font-26:26rpx;
	$font-28:28rpx;

	.contents {
		width: 100%;
		background: #FFFFFF;
	}

	.order-status {
		width: 100%;
		height: 60rpx;
		background: #FFF7E4;
		display: flex;
		align-items: center;
		justify-content: start;
	}

	.order-status text {
		font-size: $font-26;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #DAAC61;
		margin-left: 32rpx;
	}

	.order-content {
		width: 100%;
		font-size: $font-24;
		background-color: #FFFFFF;
	}

	.order-info {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 32rpx;
		margin-bottom: 26rpx;
	}

	.order-info text {
		font-size: $font-24;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
		line-height: 34rpx;
		margin-left: 32rpx;
	}

	.order-num {
		width: 100%;
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
	}

	.btn-copy {
		width: 64rpx;
		height: 38rpx;
		border-radius: 4rpx;
		border: 2rpx solid #D2D2DB;

		font-size: $font-20;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #828292;
		line-height: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 16rpx;
	}

	.cross-line {
		width: 100%;
		height: 20rpx;
		background: #F6F7F8;
	}

	.order-step {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: column;
		margin: 40rpx 0;
	}

	.address {
		width: 100%;
		height: auto;
		display: flex;
		flex-direction: row;
	}

	.info-address {
		display: flex;
		flex-direction: column;
	}

	.order-address {
		margin-left: 28rpx;
		margin-right: 50rpx;
		font-size: $font-24;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #AAAABB;
		line-height: 34rpx;
	}

	.address-name {
		width: 52rpx;
		height: 52rpx;
		background: #D6D6DA;
		border-radius: 50%;
		margin-left: 32rpx;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.address-name text {
		font-size: $font-24;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 34rpx;
	}

	.cross-line-column {
		width: 2rpx;
		height: 66rpx;
		background: #F1F1F4;
		margin-left: 54rpx;
	}

	.transport-info {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.order-receive {
		font-size: $font-24;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 34rpx;
	}

	.transport-info-bg {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.car-bg {
		width: 52rpx;
		height: 52rpx;
		background: #14151A;
		border-radius: 50%;
		margin-left: 28rpx;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pic-car {
		width: 28rpx;
		height: 20rpx;
		background: url(../../static/userinfo/huoche@2x.png) no-repeat center;
		background-size: cover;
	}

	.transport-status {
		font-size: $font-28;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
		line-height: 40rpx;
		margin-left: 28rpx;
	}

	.transport-time {
		font-size: $font-22;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #14151A;
		line-height: 32rpx;
		margin-left: 28rpx;
	}

	.desc {
		display: flex;
		flex-direction: column;
	}

	.cross-line-column2 {
		width: 2rpx;
		height: 124rpx;
		background: #F1F1F4;
		margin-left: 54rpx;
	}

	.cross-line-column3 {
		width: 2rpx;
		height: 142rpx;
		background: #F1F1F4;
		margin-left: 54rpx;
	}

	.transport-desc {
		margin: 0 28rpx;
		font-size: $font-24;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #14151A;
		line-height: 34rpx;
		margin-top: 8rpx;
	}

	.dot-bg {
		width: 12rpx;
		height: 12rpx;
		background: #D6D6DA;
		border-radius: 50%;
		margin-left: 48rpx;
		margin-right: 20rpx;
	}

	.car-bg2 {
		width: 52rpx;
		height: 52rpx;
		background: #D6D6DA;
		border-radius: 50%;
		margin-left: 28rpx;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.transport-status2 {
		font-size: $font-28;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #AAAABB;
		line-height: 40rpx;
		margin-left: 28rpx;
	}

	.transport-time2 {
		font-size: $font-22;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #AAAABB;
		line-height: 32rpx;
		margin-left: 28rpx;
	}

	.transport-time3 {
		font-size: $font-22;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #AAAABB;
		line-height: 32rpx;
		margin-left: 16rpx;
	}

	.transport-desc2 {
		font-size: $font-24;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #AAAABB;
		line-height: 34rpx;
		margin: 8rpx 28rpx 0 28rpx;
	}

	.pic-order {
		width: 16rpx;
		height: 22rpx;
		background: url(../../static/userinfo/dingdan@2x.png) no-repeat center;
		background-size: cover;
	}

	.express {
		margin: 30rpx 20rpx 30rpx 20rpx;
		padding: 15rpx 30rpx 20rpx 30rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		color: #999
	}
</style>
