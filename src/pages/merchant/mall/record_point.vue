<template>
	<view style="padding-bottom: calc(20rpx + env(safe-area-inset-bottom))">
		<view class="menu uni-flex">
			<view class="menu-item" @click="menuChange(item,index)" :class="{selectItem:index==tagMenu.index}"
				v-for='(item,index) in tagMenu.list' :key='index'>{{item.name}}</view>
		</view>
		<view class="point" v-for="(item,index) in pointList" :key="index">
			<view class="point-left">
				<view class="name">{{integralSourceMap[item.source]}}</view>
				<view class="time">
					{{dateFormatMSHMS(item.create_at)}}
					<view class="good-info" v-if="item.source==3"><text @click="item.showSale=!item.showSale">{{item.showSale?'隐藏':'查看'}}</text>【{{item.goodsCode}}】{{item.showSale?`销售额:${item.saleMoney}`:''}}</view>
				</view>
			</view>
			<view class="point-num" :style="{color:item.tp==1?'#EF3333':'#7AC04F'}">{{item.tp==1?'+':'-'}}{{item.integral}}</view>
		</view>
		<empty v-if='!pointList.length'/>
	</view>
</template>
<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '@/base/BaseNode.vue';
	import { dateFormatMSHMS } from "@/tools/util";
	import { mall } from "../constants/constants"
	@Component({})
	export default class ClassName extends BaseNode {
		integralSourceMap = mall.integralSourceMap;
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
			app.http.Get('dataApi/merchant/integral/record/list', this.queryParams, (res: any) => {
				this.totalPage = res.totalPage
				const reqList = res.list.map((item:any)=>{
					return {...item,showSale:false}
				})
				this.queryParams.pageIndex == 1 ? this.pointList = reqList : this.pointList.push(...reqList)
				cb && cb()
			})
		}

	}
</script>

<style lang="scss">
	page {
		
		background-color: #f6f7fb;
	}

	.menu {
		width: 750rpx;
		// margin-bottom: 50rpx;
		background-color: #fff;
	}

	.menu-item {
		width: 33.33%;
		text-align: center;
		line-height: 96rpx;
		font-size: 29rpx;
		
		
		color: #333333;
	}

	.selectItem {
		font-weight: 600;
		font-size: 31rpx;
		color: #E23737;
	}

	.point {
		width:722rpx;
		height: 140rpx;
		box-sizing: border-box;
		margin: 14rpx auto;
		border-radius: 5rpx;
		padding: 0 26rpx 0 29rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		&-left {
			.name {
				font-size: 29rpx;

				font-weight: 600;
				color: #333333;
			}

			.time {
				margin-top: 8rpx;
				font-size: 20rpx;
				
				color: #88878C;
				display: flex;
				align-items: center
			}
			.good-info{
				font-size: 20rpx;
				
				color: #88878C;
				margin-left: 20rpx;
				text{
					color:#E6374C
				}
			}
		}

		&-num {
			font-size: 25rpx;
			font-weight: 600;
			color: #7AC04F;
		}
	}
</style>