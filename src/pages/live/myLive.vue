<template>
	<view class="liveContent">
		<view class="liveItem" v-for='(item,index) in dataList' :key='index'>
			<view class="liveItem-top uni-flex">
				<muqian-lazyLoad class='avatar' :src='decodeURIComponent(item.merchantLogo)' mode='aspectFill' :borderRadius="'50%'"></muqian-lazyLoad>
				<view class="name">{{item.merchantName}}</view>
			</view>
			<view class="liveItem-message uni-flex">
				<muqian-lazyLoad class="goodsImage" :src='decodeURIComponent(item.cover)' mode='aspectFill'></muqian-lazyLoad>
				<view class="live-right">
					<view>
						<view class='goodsName'>{{item.title}}</view>
						<view class='startTime'>开播时间：{{dateFormatYMSHM(item.startAt)}}</view>
					</view>
					<view class='uni-flex' style='justify-content: space-between;align-items:center'>
						<view class='state'>{{stateData[String(item.state)]}}</view>
						<view class='startButton' @click='toAnchor(item)' v-if='item.push'>
							{{item.state===2?'重新进入':'进入直播间'}}</view>
						<!-- <view class='startButton' @click='toAnchor(item,true)' v-if='item.state===2'>重新进入</view> -->
					</view>
				</view>
			</view>
		</view>
		<empty v-if='!dataList.length'></empty>
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
	import {
		dateFormatYMSHM
	} from '@/tools/util'
	@Component({})
	export default class ClassName extends BaseNode {
		queryParams: any = {
			fetchFrom: 1,
			fetchSize: 10
		}
		dataList: any = []
		isFetchEnd: boolean = true;
		dateFormatYMSHM: any = dateFormatYMSHM
		stateData: any = {
			"0": '待直播',
			"1": '即将直播',
			"2": '正在直播',
			"3": '直播完成',
			"-1": '过期',
			"-2": '已取消'
		}
		onLoad() {
			if (app.token.accessToken == "") {
				uni.navigateTo({
					url: "/pages/login/login"
				});
				return;
			}
			this.getList()
		}
		onPullDownRefresh() {
			this.queryParams.fetchFrom = 1
			this.getList(() => {
				uni.stopPullDownRefresh()
			})
		}
		onReachBottom() {
			if (this.isFetchEnd) return
			this.queryParams.fetchFrom += this.queryParams.fetchSize
			this.getList()
		}
		toAnchor(item: any, isReenter: boolean = false) {
			console.log(item);
			
			app.platform.goZgLive({
				roomID: item.id,
				merchantId: item.merchantId,
				merchantAlias:item.merchantAlias,
				isAnchor: true,
				type:item.type
			})
			// uni.navigateTo({
			// 	url: `/pages/live/zgLive?roomID=${item.id}&merchantId=${item.merchantId}&isAnchor=true`
			// })
		}
		getList(cb ? : Function) {
			app.http.Get('funcApi/brodcast/third/1001/achor/roomlist', this.queryParams, (res: any) => {
				this.isFetchEnd = res.isFetchEnd
				const dataList = res.list || []
				this.dataList = this.queryParams.fetchFrom == 1 ? dataList : [...this.dataList, ...dataList]
				cb && cb()
			})
		}
	}
</script>

<style lang='scss'>
	.liveContent {
		padding-bottom:20rpx;
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
	}

	.liveItem {
		padding: 0 26rpx;
		margin-top: 33rpx;
	}

	.liveItem-top {
		align-items: center;

		.avatar {
			width: 48rpx;
			height: 48rpx;
			background: #D9D8DB;
			display: block;
			border-radius: 50%;
		}

		.name {
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
			margin-left: 17rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}

	.liveItem-message {
		margin-top: 13rpx;
		justify-content: space-between;

		.goodsImage {
			width: 188rpx;
			height: 188rpx;
			background: #333333;
			border-radius: 3rpx;
			display: block;
		}

		.live-right {
			width: 69%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		.goodsName {
			font-size: 29rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.startTime {
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #88878C;
			margin-top: 18rpx;
		}

		.startButton {
			width: 161rpx;
			height: 52rpx;
			background: #F5162B;
			border-radius: 3rpx;
			text-align: center;
			line-height: 52rpx;
			color: #fff;
		}

		.state {
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}
	}
</style>
