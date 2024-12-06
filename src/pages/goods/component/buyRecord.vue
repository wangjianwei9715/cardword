<template>
	<view class="container" v-if="list.length">
		<view class="title">购买记录</view>
		<view class="list">
			<view class="index" v-for="(item,index) in list" :key="index">
				<image class="user-avatar" @click="onClickGoMerchant(item)" :src="decodeURIComponent(item.avatar||defaultAvatar)" />
				<view class="info">
					<view class="info-left">
						<view class="record-name">
							<view class="name-text u-line-1" @click="onClickGoMerchant(item)">{{item.userName}}</view>
							<medalIcon v-if="!item.anonymous && item.medal" :src="item.medal.pic" :userId="item.userId"/>
						</view>
						<view class="time">{{$u.timeFrom(item.time)}}</view>
					</view>
					<view class="num">x{{item.num}}</view>
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
		@Prop({ default: [] })
		list: any;

		defaultAvatar = app.defaultAvatar;
		onClickGoMerchant(item){
			app.platform.hasLoginToken(()=>{
				app.navigateTo.goPersonHome(item.userId,item.anonymous)
			})
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		width: 718rpx;
		box-sizing: border-box;
		padding:24rpx 20rpx 0 20rpx;
		background: #FFFFFF;
		border-radius: 4rpx;
		margin-bottom: 12rpx;
		.title{
			font-weight: 600;
			font-size: 24rpx;
			color: #333333;
			margin-bottom: 16rpx;
		}
		.list{
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.index{
				width: 330rpx;
				height:64rpx;
				margin-bottom: 31rpx;
				display: flex;
				align-items: center;
			}
			.user-avatar{
				width: 64rpx;
				height:64rpx;
				border-radius: 50%;
				margin-right: 16rpx;
			}
			.info{
				width: 250rpx;
				height:64rpx;
				display: flex;
				align-items: center;
			}
			.info-left{
				width: 150rpx;
			}
			.record-name{
				display: flex;
				align-items: center;
			}
			.name-text{
				font-size: 22rpx;
				color: #333333;
			}
			.time{
				font-size: 18rpx;
				color: #C7C7CC;
			}
			.num{
				font-size: 22rpx;
				color: #333333;
			}
		}
	}
</style>
