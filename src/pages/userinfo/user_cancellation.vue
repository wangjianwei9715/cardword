<template>
	<view class="content">
		<view class="title">注销规则</view>
		<view class="desc" v-html="html"></view>
		<view class="cance-btn" @click="onClickCancellation">同意并注销</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		html = `1、需保证账号订单均为结束状态，且保证最后一笔订单完成时间超过10天。若您的账户存在待收货、待发货、进行中的订单不可注销
		<br><br>
		2、您的账户没有未解决的交易纠纷或投诉
		<br><br>
		3、账户一旦注销，您在平台的所有权益（包括但不限于优惠券、卡币、活动奖励等）都一并失效
		<br><br>
		4、注销成功后，原账号将无法登录，如有疑问请联系客服`
		onLoad(query:any) {
			
		}
		onClickCancellation(){
			uni.showModal({
				title: '账户注销确认',
				content: '注销成功后无法撤回，是否继续',
				cancelText:'暂不注销',
				confirmText:'确认注销',
				success: function (res) {
					if (res.confirm) {
						app.http.Post('user/unRegister',{},(res:any)=>{
							uni.showToast({
								title:'操作成功'
							})
							uni.removeStorageSync("token");
							app.token = {accessToken:'',refreshToken:''};
							uni.setStorageSync('reLaunch',true);
							uni.reLaunch({
								url: "/pages/index/index",
							});
						})
					}
				}
			});
		}
		
	}
</script>

<style lang="scss">
	page{
		background:$content-bg;
	}
	.content{
		width: 100%;
		box-sizing: border-box;
		padding:50rpx 50rpx;
	}
	.title{
		width: 100%;
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 600;
		color: #000;
	}
	.desc{
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #000;
		margin:30rpx 0;
	}
	.cance-btn{
		width: 550rpx;
		height:67rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background:#FF2728;
		border-radius: 5rpx;
		font-size: 34rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		margin:0 auto;
		margin-top: 100rpx;
	}
</style>
