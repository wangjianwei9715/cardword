<template>
	<view class="content">
		<view class="yunfei-info" v-for="item in goodListInfo" :key="item.id">
			<view class="yunfei-item">
				<text class="item-name">{{item.name}}</text>
				<text class="item-name">{{item.value}}</text>
			</view>
			<view class="cross-line"></view>
			<view class="yunfei-item">
				<text class="item-name"></text>
				<view class="heji-money">
					<text class="heji-text">合计:</text>
					<text class="heji-money2">¥14452354832625879</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		data() {
			return {
				@Prop({
					default: []
				})
				goodListInfo: any;
			};
		}
	}
</script>

<style>
	.yunfei-info {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.yunfei-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 24rpx 36rpx 0 0;
	}

	.cross-line {
		width: 678rpx;
		height: 2rpx;
		background: #F1F1F4;
		margin: 24rpx 36rpx 0 36rpx;
	}

	.heji-money {
		display: flex;
		flex-direction: row;
		margin-bottom: 24rpx;
	}

	.heji-text {
		font-size: $font-20;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #14151A;
		line-height: 28rpx;
	}

	.heji-money2 {
		font-size: $font-24;
		font-family: 'DIN';
		font-weight: bold;
		color: #14151A;
		line-height: 28rpx;
		margin-left: 12rpx;
	}
</style>
