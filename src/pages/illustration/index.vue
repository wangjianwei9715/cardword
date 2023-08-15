<template>
	<view class="view-content" :class="{'body-hidden':illustrationGuide}">
		<transitionNav :showBack="false" :needIconShadow="false" :transition="false" title="图鉴">
		</transitionNav>
		<view class="fakeTop" :style="{ height: navHeight + 'px' }"></view>
		<view class="hot" :class="{'guide-show':guideShowStep(1)}">
			<u-cell :disabled="illustrationGuide||disabledCell" url="seriesSelect" title="热门图鉴" :titleStyle="titleStyle" :border="false">
				<view slot="value" class="cell-value" :class="{'guide-show':guideShowStep(3)}">
					全部图鉴<image class="cell-right" src="@/static/goods/v2/icon_right_new.png"/>
					<guideStep :step="3" :show="guideShowStep(3)" @next="guideEnd"/>
				</view>
			</u-cell>
			<view class="hot-box">
				<view class="hot-index" v-for="(item,index) in showHotSeriesList" :key="index" @click="onClickGoDetail(item.code)">
					<view class="hot-pic">
						<muqian-lazyLoad class="pic" borderRadius="3rpx" :src="decodeURIComponent(item.logo||defaultSeriesLogo)" />
					</view>
					<view class="hot-desc">{{item.year}}</view>
					<view class="hot-desc desc-name">{{item.name}}</view>
					<view class="hot-percent">{{item.uploadNum>0?item.uploadNum+"张":"待补充"}}</view>
				</view>
			</view>
			<guideStep :step="1" :show="guideShowStep(1)" @next="guideStep=2"/>
		</view>
		<view class="series" :class="{'guide-show':guideShowStep(2)&&index==0}" v-for="(item,index) in seriesLst" :key="index">
			<view class="series-header" @click="onClickGoDetail(item.serieCode)">
				<muqian-lazyLoad class="series-logo" borderRadius="3rpx" :src="decodeURIComponent(item.logo||defaultSeriesLogo)" />
				<view class="series-header-right">
					<u-cell :title="`${item.year} ${item.serie}`" :titleStyle="titleStyle" :border="false">
						<view slot="value" class="cell-value">详细图鉴<image class="cell-right" src="@/static/goods/v2/icon_right_new.png"/></view>
					</u-cell>
					<view class="series-card u-line-1">{{item.name}}</view>
				</view>
			</view>
			<view class="series-nolist">
				<scroll-view class="scroll-box" scroll-x="true">
					<view class="scroll-index" v-for="(pitem,pindex) in item.noList" :key='pindex'>
						<muqian-lazyLoad @click="onClickPreviewImage(item.noList,pindex)" class="series-pic" borderRadius="3rpx" :src="decodeURIComponent(pitem.pic)" mode="aspectFit"/>
					</view>
				</scroll-view>
			</view>
			<guideStep :step="2" :show="guideShowStep(2)&&index==0" @next="guideStep=3"/>
		</view>
		<u-loadmore v-show="listParams.isFetchEnd" status="nomore" line/>

		<view v-show="illustrationGuide" class="guide-shadow"></view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import { parsePic } from '@/tools/util'
	import { illustration } from './constants/constants'
	import guideStep from "./components/guideStep.vue";
	class ListParams {
		noSize=10;
		fetchFrom=1;
		fetchSize=10;
		isFetchEnd=false
	}
	const navHeight: number = app.statusBarHeight + uni.upx2px(88)
	@Component({
		components:{guideStep}
	})
	export default class ClassName extends BaseNode {
		navHeight = navHeight;
		defaultSeriesLogo = illustration.defaultSeriesLogo;
		parsePic = parsePic;
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
		illustrationGuide = app.guide.illustration;
		disabledCell = app.guide.illustration;
		guideStep = 1;
		onShow(){
			uni.showTabBar({ animation: false })
		}
		onLoad(query: any) {
			this.initEvent()
			if(app.guide.illustration){
				uni.hideTabBar()
				app.guide.illustration = false;
				app.platform.finishGuideData(1);
			}
		}
		//   加载更多数据
		onReachBottom() {
			this.getSeries() 
		}
		public get showHotSeriesList() : any[] {
			return this.illustrationGuide&&this.guideStep==1 ? this.hotSeriesList.slice(0,4) : this.hotSeriesList;
		}
		guideShowStep(step:number){
			return this.illustrationGuide&&step===this.guideStep;
		}
		guideEnd(){
			this.illustrationGuide=false;
			uni.showTabBar({ animation: false })
			setTimeout(()=>{
				this.disabledCell = false;
			},200)
		}
		initEvent(){
			this.getHotSeries();
			this.getSeries();
		}
		onClickGoDetail(code:string){
			if(this.illustrationGuide) return;
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
			uni.showLoading({ title: '加载中' });
			app.http.Get('dataApi/cardIllustration/list/cardSet/hot',this.listParams,(res:any)=>{
				if(res.list){
					this.seriesLst = this.listParams.fetchFrom==1 ? res.list : [...this.seriesLst,...res.list];
				};
				this.listParams.isFetchEnd = res.isFetchEnd;
				this.listParams.fetchFrom += this.listParams.fetchSize;
				setTimeout(() => {
					uni.hideLoading();
				}, 100);
			})
		}
		onClickPreviewImage(pic:any[],index: number) {
			if(this.illustrationGuide) return;
			const urls = pic.map((x)=> this.parsePic(x.pic));
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
	.body-hidden {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: fixed;
	}
	.fakeTop {
		opacity: 0;
		pointer-events: none;
	}
	.view-content{
		width: 100%;
		box-sizing: border-box;
	}
	.hot{
		width: 710rpx;
		box-sizing: border-box;
		padding:20rpx 20rpx 0 20rpx;
		background:#fff;
		border-radius: 3rpx;
		margin: 20rpx auto;
	}
	.cell-value{
		font-size: 23rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #C0C0C0;
		background: #fff;
	}
	.cell-right{
		width: 11rpx;
		height:17rpx;
		margin-left: 6rpx;
	}
	.view-content /deep/ .u-cell__body{
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
			margin-right: 55rpx;
			margin-bottom: 40rpx;
		}
		.hot-index:nth-child(4n){
			margin-right: 0;
		}
		.hot-pic{
			width: 126rpx;
			height:126rpx;
			margin-bottom: 10rpx;
			border-radius: 3rpx;
			background:$pic-bg;
			.pic{
				width: 126rpx;
				height:126rpx;
			}
		}
		.hot-desc{
			width: 100%;
			height:30rpx;
			text-align: center;
			font-size: 23rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-bottom: 2rpx;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		.desc-name{
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 600;
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
		width: 710rpx;
		box-sizing: border-box;
		padding:26rpx 0 44rpx 20rpx;
		margin:0 auto;
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
			color: #767880;
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
			margin-right: 20rpx;
		}
		.series-pic{
			width: 130rpx;
			height:181rpx;
		}
	}
	.view-content{
		.guide-shadow{
			width: 100%;
			height:100%;
			position: fixed;
			top:0;
			left:0;
			bottom: 0;
			right:0;
			z-index: 998;
			background:rgba(0,0,0,0.5)
		}
		.guide-show{
			position: relative;
			z-index: 999;
		}
	}
	
</style>
