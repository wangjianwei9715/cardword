<!--
 * @FilePath: \jichao_app_2\src\pages\illustration\index.vue
 * @Author: wjw
 * @Date: 2023-06-16 17:01:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-26 15:20:45
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="content">
		<view class="hot">
			<u-cell url="seriesSelect" title="热门图鉴" :titleStyle="titleStyle" :border="false">
				<view slot="value" class="cell-value">全部图鉴<image class="cell-right" src="@/static/goods/v2/icon_right_new.png"/></view>
			</u-cell>
			<view class="hot-box">
				<view class="hot-index" v-for="(item,index) in hotSeriesList" :key="index" @click="onClickGoDetail(item.code)">
					<muqian-lazyLoad class="hot-pic" borderRadius="3rpx" :src="decodeURIComponent(item.logo)" />
					<view class="hot-desc">{{item.year}}</view>
					<view class="hot-desc">{{item.name}}</view>
					<view class="hot-percent">完整度{{item.percent}}%</view>
				</view>
			</view>
		</view>
		<view class="series" v-for="(item,index) in seriesLst" :key="index">
			<view class="series-header" @click="onClickGoDetail(item.serieCode)">
				<muqian-lazyLoad class="series-logo" borderRadius="3rpx" :src="decodeURIComponent(item.logo)" />
				<view class="series-header-right">
					<u-cell :title="`${item.year} ${item.serie}`" :titleStyle="titleStyle" :border="false">
						<view slot="value" class="cell-value">详细图鉴<image class="cell-right" src="@/static/goods/v2/icon_right_new.png"/></view>
					</u-cell>
					<view class="series-card u-line-2">{{item.name}}</view>
				</view>
			</view>
			<view class="series-nolist">
				<scroll-view class="scroll-box" scroll-x="true">
					<view class="scroll-index" v-for="(pitem,pindex) in item.noList" :key='pindex'>
						<muqian-lazyLoad @click="onClickPreviewImage(item.noList,pindex)" class="series-pic" borderRadius="3rpx" :src="decodeURIComponent(pitem.pic)" />
					</view>
				</scroll-view>
			</view>
		</view>
		<u-loadmore v-show="listParams.isFetchEnd" status="nomore" />
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	class ListParams {
		noSize=5;
		fetchFrom=1;
		fetchSize=10;
		isFetchEnd=false
	}
	@Component({})
	export default class ClassName extends BaseNode {
		titleStyle = {
			color:'#333',
			fontWeight:600,
			fontSize:'29rpx',
			fontFamily: 'PingFang SC',
			padding:'0'
		}
		listParams = new ListParams()
		hotSeriesList = [];
		seriesLst = [];
		onLoad(query: any) {
			this.initEvent()
		}
		//   加载更多数据
		onReachBottom() {
			this.getSeries() 
		}
		initEvent(){
			this.getHotSeries();
			this.getSeries();
		}
		onClickGoDetail(code:string){
			uni.navigateTo({
				url:`seriesDetail?seriesCode=${code}`
			})
		}
		getHotSeries(){
			app.http.Get('dataApi/cardIllustration/list/series/hot',{},(res:any)=>{
				this.hotSeriesList = res.list || []
			})
		}
		getSeries(){
			if(this.listParams.isFetchEnd) return;
			app.http.Get('dataApi/cardIllustration/list/cardSet/hot',this.listParams,(res:any)=>{
				if(res.list){
					this.seriesLst = this.listParams.fetchFrom==1 ? res.list : [...this.seriesLst,...res.list];
				};
				this.listParams.isFetchEnd = res.isFetchEnd;
				this.listParams.fetchFrom += this.listParams.fetchSize;
			})
		}
		onClickPreviewImage(pic:any[],index: number) {
			const urls = pic.map((x)=> decodeURIComponent(x.pic));
			uni.previewImage({
				urls,
				current: index,
				indicator: "number"
			});
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
	.hot{
		width: 100%;
		box-sizing: border-box;
		padding:20rpx 20rpx 0 20rpx;
		background:#fff;
		border-radius: 3rpx;
		margin-bottom: 20rpx;
	}
	.cell-value{
		font-size: 21rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #C0C0C0;
	}
	.cell-right{
		width: 11rpx;
		height:17rpx;
		margin-left: 6rpx;
	}
	.content /deep/ .u-cell__body{
		padding: 0 !important;
	}
	.hot-box{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		margin-top: 20rpx;
		.hot-index{
			width: 126rpx;
			height:230rpx;
			margin-right: 47rpx;
			margin-bottom: 40rpx;
		}
		.hot-index:nth-child(4n){
			margin-right: 0;
		}
		.hot-pic{
			width: 126rpx;
			height:126rpx;
			margin-bottom: 10rpx;
		}
		.hot-desc{
			width: 100%;
			height:30rpx;
			text-align: center;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-bottom: 2rpx;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		.hot-percent{
			width: 100%;
			text-align: center;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #C0C0C0;
			margin-top: 10rpx;
		}
	}
	.series{
		width: 100%;
		box-sizing: border-box;
		padding:26rpx 0 44rpx 20rpx;
		margin-bottom: 20rpx;
		background: #FFFFFF;
		border-radius: 3rpx;
		.series-header{
			width: 100%;
			box-sizing: border-box;
			padding-right: 20rpx;
			height:105rpx;
			display: flex;
		}
		.series-logo{
			width: 105rpx;
			height:105rpx;
			margin-right: 20rpx;
		}
		.series-header-right{
			width: 535rpx;
			height:105rpx;
			box-sizing: border-box;
		}
		.series-card{
			width: 100%;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-top: 10rpx;
		}
		.series-nolist{
			width: 100%;
			margin-top: 30rpx;
			height:181rpx;
		}
		.scroll-box{
			width: 100%;
			height:181rpx;
			white-space: nowrap;
			box-sizing: border-box;
		}
		.scroll-index{
			display: inline-block;
			width: 130rpx;
			height:181rpx;
			margin-right: 15rpx;
		}
		.series-pic{
			width: 130rpx;
			height:181rpx;
		}
	}
</style>
