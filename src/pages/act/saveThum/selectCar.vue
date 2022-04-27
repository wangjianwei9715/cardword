<template>
	<view class="carContent">
		<view class="tips">可选择最近获得的10条金色卡密</view>
		<view class="cmItem " v-for="item in cardList" @click="cardClick(item)">
			<view class="cmItem-content">{{item.noName}}</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		app
	} from "@/app";
	import {
		Component,
		Prop,
		Vue
	} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		cardList: any = []
		totalPage: number = 0;
		centerModalShow: boolean = false;
		queryParams: any = { 
			pageIndex: 1,
			pageSize: 20
		}

		created() { //在实例创建完成后被立即调用

		}
		mounted() { //挂载到实例上去之后调用

		}
		destroyed() {

		}
		onLoad() {
			this.reqNewData()
		}
		onReachBottom() {
			// if (this.queryParams.pageIndex < this.totalPage) {
			// 	this.queryParams.pageIndex += 1;
			// 	this.reqNewData();
			// }
		}
		onPullDownRefresh() {
			this.queryParams.pageIndex = 1
			this.reqNewData();
		}
		cardClick(item: any) {
			uni.$emit('cardClick', item)
			uni.navigateBack({
				delta: 1
			})
		}
		reqNewData() {
			app.http.Get(
				"activity/goldNoShare/latestGoldList",
				this.queryParams,
				(res: any) => {
					// this.totalPage = res.totalPage || 0;
					const arr = res.list || [];
					if (this.queryParams.pageIndex === 1) this.cardList = [];
					this.cardList = [...this.cardList, ...arr];
					setTimeout(() => {
						uni.stopPullDownRefresh();
					}, 500);
				}
			);
		}
	}
</script>

<style lang="scss">
	page {
		background: $content-bg;
	}

	.carContent {
		padding: 0 14rpx;

		.tips {
			font-size: 29rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #6A6A6A;

			margin: 24rpx 0;
			margin-left: 25rpx;
		}

		.cmItem {
			height: 101rpx;
			margin-bottom: 10rpx;
			background-size: 100% 100%;
			background-image: url('../../../static/act/saveThum/cmBlock.png');
			display: flex;
			align-items: center;

			&-content {
				font-size: 27rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #333333;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				line-height: 36rpx;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
				padding: 0 48rpx 0 20rpx;
			}
		}
	}
</style>
