<template>
	<view class="desc-container">
		<view class="book-box">
			<view class="book-tips">预售</view>
			{{`该产品正式发售时间为${$u.timeFormat(book.saleAt,'yyyy年mm月dd日')}，最晚拆卡时间为${$u.timeFormat(book.latestLiveAt,'yyyy年mm月dd日')}。超过最晚拆卡时间且距拼成时间＞${book.hour1}小时未拆卡补偿订单实付金额${book.compensate1}%无门槛优惠券；＞${book.hour2}小时未拆卡则拼团失败全额退款。`}}
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
		book: any;
	}
</script>

<style lang="scss" scoped>
	.desc-container{
		width: 718rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 4rpx;
		margin-bottom: 14rpx;
		.book-box{
			width: 100%;
			box-sizing: border-box;
			padding:24rpx 20rpx 24rpx 20rpx;
			font-size: 21rpx;
			color: #949494;
			line-height: 36rpx;
			.book-tips{
				width: 60rpx;
				height: 30rpx;
				background: #5BC64E;
				border-radius: 4rpx;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				font-weight: 600;
				color: #FFFFFF;
				margin-right: 10rpx;
			}
		}
	}
	
</style>
