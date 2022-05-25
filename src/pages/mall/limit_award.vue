<template>
	<view>
		<view class="menu uni-flex">
			<view class="menu-item" @click="menuChange(item,index)" :class="{selectItem:index==tagMenu.index}"
				v-for='(item,index) in tagMenu.list' :key='index'>{{item.name}}</view>
		</view>
		<view class="commodity">
			<view class="commodity-image"></view>
			<view class="commodity-right">
				<view class="title oneLineOver">iphone 13 Pro MAXiphone 13 Pro MAXiphone 13 Pro MAXiphone 13 Pro MAX
				</view>
				<view class="normal" style="margin-top: 20rpx;">5/1 19:00开抢</view>
				<view class="normal" style="margin-top: 10rpx;">限量10份</view>
				<view class="commodity-bottom">
					<view class="normal" style="color: #EF3333;font-weight: 600;">200000卡币</view>
					<view class="startPanicBuying" v-if='tagMenu.index==0'>即将开抢</view>
					<view class="participation" v-if='tagMenu.index==1'>
						<view class="avatar"></view>
						<view class="avatar"></view>
						<view class="avatar"></view>
						<view class="normal" style="font-size: 21rpx;">等用户已抢</view>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		app
	} from "@/app";
	import {
		Component
	} from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		tagMenu: any = {
			index: 0,
			list: [{
				name: '即将开抢'
			}, {
				name: '兑奖历史'
			}]
		}
		onLoad(query: any) {


		}
		onShow() {

		}
		menuChange(item: any, index: number) {
			if (this.tagMenu.index == index) return
			this.tagMenu.index = index
		}

	}
</script>

<style lang="scss">
	page {
		font-family: PingFang SC;
	}

	.menu {
		width: 750rpx;
	}

	.menu-item {
		width: 50%;
		text-align: center;
		line-height: 96rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #959699;
	}

	.selectItem {
		font-weight: 600;
		color: #333333;
	}

	.commodity {
		padding: 0 26rpx;
		display: flex;
		justify-content: space-between;
		margin: 20rpx 0;
	}

	.commodity-image {
		width: 188rpx;
		height: 188rpx;
		background: #333333;
		border-radius: 3rpx;
	}

	.commodity-right {
		width: 70%;

		.title {
			font-size: 29rpx;
			font-weight: 600;
			color: #333333;
		}

		.normal {
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}
	}

	.commodity-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10rpx;

		.participation {
			display: flex;
			align-items: center;

			.avatar {
				width: 35rpx;
				height: 35rpx;
				background: #DBDBDB;
				display: block;
				border-radius: 50%;
				margin-right: 6rpx;
			}
		}

		.startPanicBuying {
			width: 181rpx;
			height: 39rpx;
			background: #DBDBDB;
			border-radius: 3rpx;
			font-size: 25rpx;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
			line-height: 39rpx;
		}
	}
</style>
