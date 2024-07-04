<template>
	<view class="specplay">
		<view class="specplay-item">
			<view class="item-title">规格</view>
			<view class="item-desc">{{data.spec}}</view>
		</view>
		<view class="specplay-item border" @click="onClickCardPlay">
			<view class="item-title">玩法<view class="icon-help"></view></view>
			<view class="item-desc">{{data.pintuan_type}}</view>
		</view>
		<view class="specplay-item">
			<view class="item-title">进度</view>
			<view class="item-desc">{{data.progress}}</view>
		</view>

		<cardplay :operationShow="gamePlayData.operaShow" :operaType="gamePlayData.operaType" @operacancel="gamePlayData.operaShow=false" />
	</view>
</template>
<script lang="ts">
	import { Component, Prop} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { Goods } from "../utils/class";
	@Component({
		components:{}
	})
	export default class ClassName extends BaseComponent {
		@Prop({ default: {} })
		data: any;

		gamePlayData:any = Goods.GamePlay();
		onClickCardPlay() {
			this.gamePlayData = {
				operaShow:true,
				operaType:1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.specplay{
		width: 750rpx;
		box-sizing: border-box;
		height: 106rpx;
		background: #FFFFFF;
		border-radius: 0rpx 0rpx 4rpx 4rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16rpx;
		.border{
			border-left: 1rpx solid #F2F2F7;
			border-right: 1rpx solid #F2F2F7;
		}
	}
	.specplay-item{
		width: 250rpx;
		box-sizing: border-box;
		height:66rpx;
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
		padding:4rpx 0;
	}
	.item-title{
		width: 100%;
		height:30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 22rpx;
		color: #333333;
	}
	.icon-help{
		width: 18rpx;
		height:22rpx;
		background: url(@/static/goods/v3/icon_help.png) no-repeat center / 100% 100%;
		margin-left: 6rpx;
	}
	.item-desc{
		width: 100%;
		text-align: center;
		font-size: 20rpx;
		color: #9FA4B0;
		font-weight: 400;
	}
</style>
