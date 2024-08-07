<template>
	<view class="merchant-container">
		<view class="merchant-header">本商品由{{publisher.name}}寄售，该商家为您提供服务。</view>
		<view class="merchant-info">
			<view class="merchant-left">
				<muqian-lazyLoad class="merchant-avatar"
					:src="publisher.avatar!=''?decodeURIComponent(publisher.avatar):defaultAvatar" mode="aspectFill" :borderRadius="'50%'"/>
				<view class="merchant-box">
					<view class="merchant-name u-line-1">
						{{publisher.name}}
						<!-- <merchantLevel :level="publisher.level"/> -->
					</view>
					<view class="merchant-fanssale">
						<view class="merchant-desc">粉丝<text>{{publisher.fans}}</text></view>
						<view class="merchant-desc">在售<text>{{publisher.sale}}</text></view>
					</view>
				</view>
			</view>
			<view class="merchant-right">
				<view v-show="!publisher.followed" class="merchant-btn merchant-nofollow" @click="onClickFollow">
					<view class="icon-mfollowed"></view>
					<text>关注</text>
				</view>
				<view class="merchant-btn" @click="onClickShops">
					<text>进店</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script lang="ts">
	import { app } from "@/app";
	import { Component, Prop} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({
		components:{}
	})
	export default class ClassName extends BaseComponent {
		@Prop({ default: {} })
		publisher: any;
		defaultAvatar = app.defaultAvatar;

		onClickFollow(){
			app.platform.hasLoginToken(()=>{
				app.http.Post( `merchant/1/follow/${this.publisher.alias}`,{},res => {
					this.$emit('publisherFollowed',res.data.follow)
				});
			})
		}
		onClickShops() {
			app.platform.hasLoginToken(()=>{
				this.goMerchantPage(this.publisher.alias)
			})
		}
	}
</script>

<style lang="scss" scoped>
	.merchant-container{
		width: 718rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 4rpx;
		margin-bottom: 12rpx;
		.merchant-header{
			width: 100%;
			height: 46rpx;
			background: #F2F2F7;
			border-radius: 4rpx 4rpx 0rpx 0rpx;
			box-sizing: border-box;
			padding-left: 20rpx;
			font-size: 18rpx;
			color: #AEAEB2;
			line-height: 46rpx;
			font-weight: 300;
		}
		.merchant-info {
			width: 100%;
			height:140rpx;
			box-sizing: border-box;
			border-radius: 0rpx 0rpx 4rpx 4rpx;
			padding:24rpx 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			.merchant-left{
				width: 400rpx;
				height:92rpx;
				display: flex;
				align-items: center;
			}
			.merchant-avatar{
				width: 92rpx;
				height:92rpx;
				border-radius: 50%;
				margin-right: 24rpx;
			}
			.merchant-box{
				width: 300rpx;
				height:92rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				padding:10rpx 0 8rpx 0;
			}
			.merchant-name{
				width: 100%;
				display: flex;
				font-weight: 600;
				font-size: 26rpx;
				color: #333333;
			}
			.merchant-fanssale{
				width: 100%;
				display: flex;
			}
			.merchant-desc{
				font-size: 18rpx;
				color: #999999;
				margin-right: 30rpx;
			}
			.merchant-desc text{
				font-size: 22rpx;
				color: #333333;
				margin-left: 10rpx;
			}
			.merchant-right{
				width: 278rpx;
				height:52rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
			.merchant-btn{
				width: 122rpx;
				height: 54rpx;
				background: #FFFFFF;
				border-radius: 3rpx;
				border: 1rpx solid #E5E5EA;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 16rpx;
			}
			.merchant-btn text{
				font-size: 22rpx;
				color: #333333;
			}
			.icon-mfollowed{
				width: 20rpx;
				height:20rpx;
				margin-right: 10rpx;
				background: url(@/static/goods/v3/icon_step.png) no-repeat center / 100% 100%;
			}
			.merchant-nofollow{
				background:#FA1545;
				border: 1rpx solid #FA1545;
			}
			.merchant-nofollow text{
				color: #FFFFFF;
			}
		}
	}
	
</style>
