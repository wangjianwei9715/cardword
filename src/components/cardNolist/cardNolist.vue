<template>
	<view class="content">
		<view class="card-index" v-for="item in cardNoData" :key="item.id">
			<view class="left">
				<view class="title">{{item.title}}</view>
				<view class="desc">{{item.desc}}</view>
				<view class="time">{{item.time}}</view>
			</view>
			<view class="right">未中卡</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		cardNoData:any;

		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
	}
</script>

<style lang="scss">
	.card-index{
		width: 710rpx;
		height:192rpx;
		background:url(../../static/userinfo/NUMBER@2x.png) no-repeat center;
		background-size: 100% 100%;
		margin-bottom: 20rpx;
		border-radius: 4rpx;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		.left{
			width: 538rpx;
			height:192rpx;
			box-sizing: border-box;
			padding:20rpx 22rpx 20rpx 32rpx;
			.title{
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #7F7F8E;
				margin-bottom: 8rpx;
			}
			.desc{
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #14151A;
				line-height: 34rpx;
				margin-bottom: 8rpx;
			}
			.time{
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #AAAABB;
			}
		}
		.right{
			width: 172rpx;
			height: 192rpx;
			background: linear-gradient(180deg, #E6E6E6 0%, #FFFFFF 100%);
			border-radius: 4rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #828292;
		}
		.state1{
			background: linear-gradient(180deg, #FFEDE2 0%, #FFFFFF 100%);
			color: #FE7348;
		}
		.state2{
			background: linear-gradient(180deg, #FFF7E4 0%, #FFFFFF 100%);
			color: #EBBF7C;
		}
	}
</style>
