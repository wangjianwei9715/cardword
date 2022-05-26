<template>
	<view style="padding-bottom: calc(20rpx + env(safe-area-inset-bottom))">
		<view class="menu uni-flex">
			<view class="menu-item" @click="menuChange(item,index)" :class="{selectItem:index==tagMenu.index}"
				v-for='(item,index) in tagMenu.list' :key='index'>{{item.name}}</view>
		</view>
		<view class="point" v-for="(item,index) in pointList" :key="index">
			<view class="point-left">
				<view class="name">{{item.name}}</view>
				<view class="time">{{dateFormatMSHMS(item.created_at)}}</view>
			</view>
			<view class="point-num" :style="{color:item.point<0?'#7AC04F':'#EF3333'}">{{item.point}}</view>
		</view>
		<empty v-if='!pointList.length'/>
	</view>
</template>
<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import { dateFormatMSHMS } from "@/tools/util";
	@Component({})
	export default class ClassName extends BaseNode {
		dateFormatMSHMS:any=dateFormatMSHMS
		tagMenu: any = {
			index: 0,
			list: [{
				name: '全部',
				value: 100
			}, {
				name: '收入',
				value: 1
			}, {
				name: '支出',
				value: 2
			}]
		};
		queryParams: any = {
			pageIndex: 1,
			pageSize: 20,
			tp: 100//100 全部，1 收入，2 支出
		};
		totalPage: number = 0;
		pointList: any = [];
		onLoad(query: any) {
			this.reqNewData()
		}
		onPullDownRefresh() {
			this.queryParams.pageIndex = 1
			this.reqNewData(() => {
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 500)
			})
		}
		onReachBottom() {
			if (this.queryParams.pageIndex < this.totalPage) {
				this.queryParams.pageIndex += 1
				this.reqNewData()
			}
		}
		menuChange(item: any, index: number) {
			if (this.tagMenu.index == index) return
			this.tagMenu.index = index
			this.queryParams.tp = this.tagMenu.list[index].value
			this.queryParams.pageIndex = 1
			this.reqNewData()
		}
		reqNewData(cb?: Function) {
			app.http.Get('dataApi/point/log', this.queryParams, (res: any) => {
				this.totalPage = res.totalPage
				const reqList = res.list || []
				this.queryParams.pageIndex == 1 ? this.pointList = reqList : this.pointList.push(...reqList)
				cb && cb()
			})
		}

	}
</script>

<style lang="scss">
	page {
		font-family: PingFang SC;
	}

	.menu {
		width: 750rpx;
		margin-bottom: 50rpx;
	}

	.menu-item {
		width: 33.33%;
		text-align: center;
		line-height: 96rpx;
		font-size: 29rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}

	.selectItem {
		font-weight: 600;
		font-size: 31rpx;
		color: #E23737;
	}

	.point {
		margin-bottom: 70rpx;
		padding: 0 56rpx 0 49rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&-left {
			.name {
				font-size: 29rpx;

				font-weight: 600;
				color: #333333;
			}

			.time {
				margin-top: 8rpx;
				font-size: 25rpx;
				font-weight: 400;
				color: #88878C;
			}
		}

		&-num {
			font-size: 42rpx;
			font-weight: 600;
			color: #7AC04F;
		}
	}
</style>