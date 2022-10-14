<template>
	<view class="good-act-content" >
		<!-- 车队排行榜 -->
		<bottomDrawer :showDrawer="showChedui" :title="'车队排行榜'" @closeDrawer="cheduiShowDrawer=false" :needSafeArea="true" :padding="'0rpx 0rpx'">
			<view class="drawer-chedui" v-for="(item,index) in cheduiData.list" :key="index">
				<view class="chedui-rank-item">
					<view class="chedui-rank-item-left">
						<view class="chedui-rank-item-num" :class="`chedui-rank-item-num-${item.index}`">{{item.index}}</view>
						<image class="chedui-rank-avatar" :src="decodeURIComponent(item.avatar)"/>
						<view class="chedui-rank-name u-line-1">{{item.userName}}</view>
					</view>
					<view class="chedui-rank-item-reward u-line-1">-</view>
				</view>
			</view>
			<view class="drawer-bottom">
				<view class="chedui-rank-item">
					<view class="chedui-rank-item-left">
						<view class="chedui-rank-item-num">{{cheduiData.myRank>0?cheduiData.myRank:'-'}}</view>
						<image class="chedui-rank-avatar" :src="decodeURIComponent(userData.avatar)"/>
						<view class="chedui-rank-name u-line-1">{{userData.name}}</view>
					</view>
					<view class="chedui-rank-item-reward u-line-1">-</view>
				</view>
			</view>
		</bottomDrawer>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch,PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({ default: {} })
		cheduiData: any;
		@Prop({ default: {} })
		userData: any;
		@PropSync("showChedui",{
			type:Boolean
		}) cheduiShowDrawer!: Boolean;

		created() {
		}
	}
</script>

<style lang="scss">
	.good-act-content{
		width: 710rpx;
		border-radius: 3rpx;
		background:#fff;
	}
	.detail-act-box{
		width: 100%;
		box-sizing: border-box;
		padding:10rpx 30rpx 0 30rpx;
		.act-box{
			width: 100%;
			min-height:76rpx;
			display: flex;
			.act-box-name{
				height:76rpx;
				width:82rpx;
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #333333;
				display: flex;
				align-items: center;
			}
			.chedui-name{
				color:#FA1545
			}
			.act-box-desc{
				width: 550rpx;
				min-height:76rpx;
			}
			.flex-between{
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.act-box-desc-item{
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				margin:22rpx 0;
			}
		}
		.detail-act-index{
			width: 100%;
			height:40rpx;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
		}
	}
	.detail-act-left{
		width: 600rpx;
		height:40rpx;
		display: flex;
		align-items: center;
	}
	.detail-act-name{
		width: 110rpx;
		height:40rpx;
		line-height: 40rpx;
		font-size: 27rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #C0C0C0;
	}
	.detail-act-desc{
		width: 550rpx;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #333333;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.discount-box{
		display: flex;
		align-items: center;
	}
	.detail-act-guess{
		width: 130rpx;
		height:28rpx;
		margin-right: 20rpx;
		background:url(../../pages/act/static/guess/guess_icon.png) no-repeat center;
		background-size: 100% 100%;
	}
	
	.detail-discount{
		height:40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding:0 13rpx;
		border:1px solid #F4919F;
		margin-right: 24rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #EA4055;
	}
	.drawer-helpmsg{
		width: 100%;
		box-sizing: border-box;
		line-height: 40rpx;
	}
	.drawer-help-title{
		font-size: 27rpx;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		color:#333333;
		margin:15rpx 0rpx;
	}
	.drawer-help-content{
		width: 100%;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #7D8288;
		white-space: pre-wrap;
		line-height: 35rpx;
		margin-bottom: 50rpx;
	}
	.drawer-help-cd{
		width: 100%;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 46rpx;
		white-space: pre-wrap;
		margin-bottom: 15rpx;
	}
	.detail-act-right{
		width: 13rpx;
		height:21rpx;
		background:url(../../static/index/v2/icon_right.png) no-repeat center;
		background-size: 100% 100%;
		margin-left: 10rpx;
		margin-top: 27.5rpx;
	}
	.drawer-header{
		width: 100%;
		height:60rpx;
		background:#F5F5F5;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding:0 20rpx;
	}
	.drawer-header-name{
		font-size: 23rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #959695;
	}
	.drawer-chedui{
		margin-bottom: 40rpx;
	}
	.drawer-bottom{
		width: 100%;
		position: absolute;
		border-top: 1px solid #E2E2E2;
		left:0;
		bottom:0;
		display: flex;
		height: calc(118rpx);
		height: calc(118rpx + constant(safe-area-inset-bottom));
		height: calc(118rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;
		padding-top: 20rpx;
	}
	.chedui-rank-item{
		width: 100%;
		height:78rpx;
		padding-right: 50rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.chedui-rank-item-left{
		height:78rpx;
		display: flex;
		align-items: center;
	}
	.chedui-rank-item-num{
		width: 69rpx;
		height:78rpx;
		font-size: 38rpx;
		font-family: Impact;
		font-weight: 400;
		color: #908D8B;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.chedui-rank-item-num-1{
		color:#F1CB6F
	}
	.chedui-rank-item-num-2{
		color:#B9B8B8
	}
	.chedui-rank-item-num-3{
		color:#E0B48D
	}
	.chedui-rank-avatar{
		width: 78rpx;
		height: 78rpx;
		border-radius: 50%;
		margin-right: 29rpx;
	}
	.chedui-rank-name{
		width: 300rpx;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.chedui-rank-item-reward{
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.font-bold{
		font-weight: bold;
	}
</style>
