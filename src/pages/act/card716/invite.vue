<template>
	<view class="content">
		<view class="invite-header">
			<image class="invite-logo" src="@/static/act/card716/invite_logo.png"/>
			THE CARDS WORLD
		</view>
		<view class="invite-bg">
			<view class="invite-center">
				<view class="invite-title">亲爱的<text>{{app.data.name}}：</text></view>
				<view class="invite-msg">卡世界诚邀您参加2022北京首届国际收藏卡博览会！届时现场将有高端收藏卡展览与大量福利活动。卡世界期待您的到来！</view>
				<view class="invite-b">
					<view class="invite-a">· 時间 ·</view>
					<view class="invite-c">7.16-7.17</view>
					<view class="invite-a">· 地址 ·</view>
					<view class="invite-c">北京报国寺</view>
				</view>
			</view>
			
			<view class="sm">
				<view class="sm1">因防疫需要请扫码预约</view>
				<view class="sm1">凭码入场</view>
				<view class="sj"></view>
			</view>

		</view>
		<view class="btn" @click="shareData.show=true">分享至微信即领30-5优惠券</view>
		<share :operationShow="shareData.show" :shareData="shareData"  @operacancel="shareData.show=false,shareCoupon()"></share>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		app = app;
		shareData:any = {
			show:false,
			shareUrl:'share/h5/index.html#/pages/act/invite',  
			title:'卡展邀请函',      
			summary:'7.16-7.17卡世界邀您参与北京首届国际收藏卡博览会',    
			thumb:'https://ka-world.oss-cn-shanghai.aliyuncs.com/app/wxShare/20220712155051.jpg'       
		}
		onLoad(query:any) {
		}
		shareCoupon(){
			app.http.Post('activity/cardShow/share',{})
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		background: linear-gradient(0deg, #1E1E2F 0%, #4B4962 99%);
	}
	.content{
		width: 100%;
		box-sizing: border-box;
	}
	.invite-bg{
		width: 750rpx;
		height:985rpx;
		background: url(@/static/act/card716/invite_bg.png) no-repeat center;
		background-size: 100% 100%;
		margin:0 auto;
		position: relative;
		box-sizing: border-box;
	}
	.invite-header{
		width: 100%;
		height:80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 23rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #FFFFFE;
		.invite-logo{
			width: 45rpx;
			height:45rpx;
			margin-right: 19rpx;
		}
	}
	.invite-center{
		width: 420rpx;
		height:460rpx;
		position: absolute;
		top:290rpx;
		left:50%;
		margin-left: -210rpx;
		.invite-title{
			font-size: 27rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333246;
		}
		.invite-title text{
			color:#B58D64
		}
		.invite-msg{
			font-size: 27rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333246;
			line-height: 50rpx;
			margin-top: 10rpx;
			text-indent: 60rpx;
			letter-spacing:1rpx
		}
		.invite-b{
			margin-top: 30rpx;
		}
		.invite-a{
			width: 100%;
			text-align: center;
			color:#8E5C37;
			font-size: 25rpx;
			margin-bottom: 5rpx;
		}
		.invite-c{
			width: 100%;
			text-align: center;
			font-size: 25rpx;
			color:#333246;
			margin-bottom: 15rpx;
		}
	}
	.sm{
		position: absolute;
		right:313rpx;
		top:880rpx;
		.sm1{
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #313244;
			line-height: 25rpx;
			text-align: right;
			margin-bottom: 4rpx;
		}
		.sj{
			display: block;
			width: 0;
			height: 0;
			border:10rpx solid transparent;
			border-left-color:#313244;
			position: absolute;
			right:-34rpx;
			top:3rpx;
		}
	}
	.btn{
		width: 641rpx;
		height:88rpx;
		font-size: 38rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #F5D9B1;
		text-align: center;
		line-height: 88rpx;
		background: url(@/static/act/card716/invite_btn.png) no-repeat center;
		background-size: 100% 100%;
		margin: 29rpx auto;
	}
</style>
