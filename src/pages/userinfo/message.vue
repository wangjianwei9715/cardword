<template>
	<view class="content">
		<view class="top">
			<view class="index border">
				<view class="left">
					<view class="icon"><view class="icon-zx"></view></view>
					<view class="desc">
						<view class="desc-title">交易消息</view>
						<view class="desc-message">您的订单“20-21 National”已发货</view>
					</view>
				</view>
				<view class="right">
					<view class="time">15:21</view>
					<view class="new-message">6</view>
				</view>
			</view>
			<view class="index">
				<view class="left">
					<view class="icon"><view class="icon-tz"></view></view>
					<view class="desc">
						<view class="desc-title">平台通知</view>
						<view class="desc-message">欢迎平台入驻呜呼啦呼商圈</view>
					</view>
				</view>
				<view class="right">
					<view class="time">15:21</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="index">
				<view class="left">
					<view class="icon"><view class="icon-kf"></view></view>
					<view class="desc">
						<view class="desc-title">在线客服</view>
						<view class="desc-message">亲，请问有什么问题需要帮助？</view>
					</view>
				</view>
				<view class="right">
					<view class="time">15:21</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		
		onLoad(query:any) {
			
		}
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		box-sizing: border-box;
	}
	.top{
		width: 100%;
		border-bottom: 20rpx solid #F6F7F8;
		box-sizing: border-box;
		padding: 0 32rpx;
	}
	.bottom{
		width: 100%;
		box-sizing: border-box;
		padding: 0 32rpx;
	}
	.index{
		width: 100%;
		height:148rpx;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;
		.left{
			width: 600rpx;
			height:148rpx;
			display: flex;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			.icon{
				width: 84rpx;
				height:84rpx;
				border-radius: 50%;
				background:#F6F6F7;
				display: flex;
				box-sizing: border-box;
				align-items: center;
				justify-content: center;
				margin-right: 24rpx;
				.icon-zx{
					width: 42rpx;
					height:34rpx;
					background:url(../../static/userinfo/zaixian@2x.png) no-repeat center;
					background-size: 100% 100%;
				}
				.icon-tz{
					width: 46rpx;
					height:44rpx;
					background:url(../../static/userinfo/tongzhi@2x.png) no-repeat center;
					background-size: 100% 100%;
				}
				.icon-kf{
					width: 42rpx;
					height:44rpx;
					background:url(../../static/userinfo/kefu@2x.png) no-repeat center;
					background-size: 100% 100%;
				}
			}
			.desc{
				width: 490rpx;
				height:148rpx;
				box-sizing: border-box;
				padding:32rpx 0;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				.desc-title{
					width: 100%;
					font-size: 28rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
				}
				.desc-message{
					width: 100%;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #767880;
				}
			}
		}
		.right{
			width: 86rpx;
			height:84rpx;
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-end;
			.time{
				width: 100%;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #AAAABB;
				margin-bottom: 6rpx;
				text-align: end;
			}
			.new-message{
				width: 32rpx;
				height: 32rpx;
				background: #FF4349;
				border-radius: 50%;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
	}
	
	.border{
		border-bottom: 1px solid #F1F1F4;
	}
</style>
