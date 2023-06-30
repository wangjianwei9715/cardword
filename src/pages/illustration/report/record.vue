<!--
 * @FilePath: \jichao_app_2\src\pages\illustration\report\record.vue
 * @Author: wjw
 * @Date: 2023-06-26 19:47:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-27 18:18:15
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="content">
		<view class="record-index" v-for="(item,index) in recordList" :key="index" @click="onClickGoDetail(item)">
			<view class="header">
				<view class="time">{{$u.timeFormat(item.created_at,'yyyy-mm-dd hh:MM')}}</view>
				<view class="status">{{statusMsg(item)}}</view>
			</view>
			<view class="center">
				<view class="desc">{{item.content}}</view>
				<muqian-lazyLoad class="image" v-for="(item,index) in getImg(item.descPics)" :key="index" :src="decodeURIComponent(item)" borderRadius="3rpx"/>
			</view>
		</view>
		<empty v-show="empty"/>
		<u-loadmore v-show="nomore" status="nomore" line/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	class ListParams {
		pageIndex:number=1;
		pageSize:number=10;
		noMoreData:boolean=false
	}
	// const statusMap:any = {
	// 	0:"待处理",
	// 	1:"审核通过",
	// 	2:"报错成功",
	// 	3:"报错失败",
	// 	4:"报错失败"
	// }
	@Component({})
	export default class ClassName extends BaseNode {
		recordList = [];
		listParams = new ListParams();
		empty = false;
		nomore = false
		onLoad(query: any) {
			this.reqNewData();
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData() 
		}
		reqNewData(cb?: Function) {
			// 获取更多商品
			const { pageIndex, pageSize, noMoreData } = this.listParams;
			if (noMoreData)  return;

			app.http.Get('cardIllustration/err/my', {pageIndex,pageSize}, (data: any) => {
				let arr = data.list || [];
				this.recordList = pageIndex == 1 ? arr : [...this.recordList, ...arr];
				this.empty = data.total == 0;
				this.nomore = !this.empty && this.recordList.length>=data.total;
				this.listParams.noMoreData = data.isFetchEnd;
				this.listParams.pageIndex++;
				if (cb) cb();
			});
		}
		statusMsg(item:any){
			return `${item.stateName}${item.pointAward>0?`+${item.pointAward}卡币`:""}`
		}
		onClickGoDetail(item:any){
			uni.navigateTo({
				url:`/pages/illustration/report/detail?id=${item.id}`
			})
		}
		getImg(img:string){
			if (img.indexOf(',') == -1) {
				return [img]
			} else {
				const list = img.split(',')
				return list
			}
		}
	}
</script>

<style lang="scss">
	page{
        background:#F6F7F8;
    }
	.content{
		width: 100%;
		padding:20rpx;
		box-sizing: border-box;
	}
	.record-index{
		width: 100%;
		box-sizing: border-box;
		background:#fff;
		border-radius: 3rpx;
		padding:0 20rpx 35rpx 20rpx;
		margin-bottom: 20rpx;
		.header{
			width: 100%;
			height:81rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #E6E6E6;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.time{
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #959695;
			}
			.status{
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}
			.status-error{
				color:#959695 !important;
			}
		}
		.center{
			box-sizing: border-box;
			padding-top: 25rpx;
			.desc{
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 33rpx;
			}
			.image{
				width: 132rpx;
				height:132rpx;
				margin-right: 10rpx;
				display: inline-flex;
				margin-top: 10rpx;
			}
		}
	}
</style>
