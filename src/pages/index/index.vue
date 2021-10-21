<template>
	<view class="content">
		<view v-if="apkNeedUpdate" class="update-content">
			<view class="panel-shadow" @touchmove.stop.prevent="doNothing"></view>
			<view class="panel-bg">
				<view class="panel-title">
					版本更新公告
				</view>
				<view class="panel-content">
					<text>
						{{updateMsg}}
					</text>
				</view>
				<button v-if="!updateStart" class="download-button" @click="onClickDownload">立即更新</button>
				<view v-else class="download-text">{{downloadText}}</view>
			</view>
		</view>
		<view v-if="wgtUpdate" class="update-content">
			<view class="panel-shadow"></view>
			<view class="panel-bg">
				<view class="panel-title">
					更新进度
				</view>
				<view class="panel-content">
					<progress :percent="wgtUpNum" active-mode="forwards" active stroke-width="6" border-radius="20px" activeColor="#4DCDCC" />
				</view>
			</view>
		</view>
		
		<view class="header-banner" :style="pullDown?'position:absolute':''" >
			<statusbar/>
			<view class="tab-header">
				<searchinput :searchText="'搜索热门、球员、球队、帖子'" @clicksearch="onClickSearch"></searchinput>
			</view>
		</view>
		
		<view class="tab-center">
			<statusbar/>
			<view class="banner-content">
				<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" indicator-active-color="#ffffff"> 
					<swiper-item v-for="(item,index) in advertisingList" :key="index">
						<image class="swiper-image" :src="item.pic" mode="aspectFit" @click="onClickTopJumpUrl(item)"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="tab-type">
				<view class="tab-index" v-for="(item,index) in tabList" :key="index" @click="onClickJumpUrl(item.url)">
					<view class="tab-img-content"><image :class="'tabimg'+index" :src="item.img" mode=""></image></view>
					<view class="tabtext">{{item.text}}</view>
				</view>
			</view>
			<view class="tab-good-content">
				<view class="tab-good-inedx" v-for="item in noticeList" :key="item.id">
					<view class="tab-good-title">{{item.title}}</view>
					<view class="tab-good-bottom">
						<image class="tab-good-img" :src="item.img" mode="aspectFill"></image>
						<view class="tab-good-desc">
							<view class="tab-good-name">{{item.name}}</view>
							<view class="tab-good-btn" v-if="item.id==2">去围观</view>
							<view class="tab-price-content" v-else>
								¥<text class="tab-price">{{item.price}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tabs-content">
			<tabs :tabs="goodTab" :tabsCheck="goodTabCheck" @tabsClick="onClickListTabs"></tabs>
		</view>
		<view class="goodslist-index">
			<goodslist  :goodsList="goodsList"  @send="onClickJumpDetails"/>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '@/base/BaseNode.vue';
	@Component({})
	export default class index extends BaseNode {
		statusBarHeight = app.statusBarHeight;
		advertisingList:{[x:string]:any} = [];
		tabList = [
			{img:'../../static/index/tab0.png',text:'篮球',url:'/pages/login/login'},
			{img:'../../static/index/tab1.png',text:'足球',url:'/pages/goods/index?type=4'},
			{img:'../../static/index/tab2.png',text:'其它',url:'/pages/goods/all_good_card?type=0'},
			{img:'../../static/index/tab3.png',text:'ALL',url:'/pages/goods/index?type=1'},
		];
		noticeList = [
			{
				id:1,
				title:'每日精选',
				img:'',
				name:'2021国宝系列',
				price:149
			},
			{
				id:2,
				title:'正在直播',
				img:'',
				name:'卡皇球星社',
				price:0
			}
		];
		goodTab = [
			{id:1,name:'推荐'},
			{id:2,name:'即将拼成'},
			{id:3,name:'新品'},
			{id:4,name:'高端'},
			{id:5,name:'优惠'}
		];
		goodTabCheck = 1;
		goodsList:any = [];
		currentPage = 1;
		pageSize = 10;
		noMoreData = false;
		pullDown = false;
		apkNeedUpdate = false;
		updateStart = false;
		downloadText = '下载中：0 MB/0 MB, 0%';
		updateMsg = '暂无';
		useCache = 1;
		wgtUpdate = false;
		wgtUpNum = 0;
		onLoad(query:any) {
			// uni.$emit('reLogin')
			if (app.update.apkNeedUpdate) {
				this.updateShow();
				return;
			}
			let listeners = ['BackLogin']
			this.register(listeners);
			this.initEvent()
		}
		onPageScroll(e:any){
			if(e.scrollTop>=0){
				this.pullDown = false
			}else{
				this.pullDown = true
			}
		}
		//   下拉刷新
		onPullDownRefresh(){
			this.currentPage = 1;
			this.noMoreData = false;
			this.reqNewData(()=>{
				setTimeout(()=>{
					uni.stopPullDownRefresh();
				},1000)
			})
		}
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		initEvent(){
			app.http.Get("dataApi/home", {}, (data: any) => {
				console.log('index/home====',data)
				this.goodsList = data.goodList;
				this.advertisingList = data.topAddList;
			})
			
			this.onEventUI("apkNeedUpdate", () => {
				this.updateShow();
			});
			
			this.onEventUI("wgtNeedUpdate", () => {
				this.wgtUpdateShow();
			});
			this.onEventUI("wgtUpdateNum", (res) => {
				this.wgtUpNum = res;
			});
		}
		updateShow() {
			uni.hideTabBar();
			this.updateMsg = decodeURIComponent(app.update.apkData.msg);
			this.apkNeedUpdate = true;
		}
		wgtUpdateShow(){
			this.wgtUpdate = true;
		}
		onClickDownload() {
			let downloadTask = uni.downloadFile({
				url: app.update.apkData.pkg_url,
				success: (downloadResult) => {
					if (downloadResult.statusCode === 200) {
						let path: any = downloadResult.tempFilePath;
						plus.runtime.install(path, {
							force: true
						});
					}
				},
				fail: (result) => {
					console.error('install fail...', result);
				}
			});
			this.updateStart = true;
			downloadTask.onProgressUpdate((result: UniApp.OnProgressDownloadResult) => {
				let downMB = Math.floor(result.totalBytesWritten / 1024 / 1024) + ' MB/' + Math.floor(result
					.totalBytesExpectedToWrite / 1024 / 1024) + ' MB'
				this.downloadText = '下载中：' + downMB + ', ' + result.progress + '%';
			});
		}
		BackLogin(res:any){
			uni.$emit('BackLogin');
		}
		Logout(res:any){
		}
		onClickSearch(){
			// 搜索
			uni.navigateTo({
				url: '/pages/goods/goods_find'
			})
		}
		onClickTopJumpUrl(item:any){
			
		}
		onClickJumpUrl(url:string){
			uni.navigateTo({
				url: url
			})
		}
		// 跳转商品详情
		onClickJumpDetails(id:any){
			uni.navigateTo({
				url: '/pages/goods/goods_details?id='+id
			})
		}
		onClickListTabs(id:any){
			if(id==this.goodTabCheck){
				return;
			}
			this.goodTabCheck = id
			this.currentPage = 1;
			this.noMoreData = false;
			this.reqNewData()
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			
			let params:{[x:string]:any} = {
				tp:this.goodTabCheck-1,
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
			}
			
			app.http.Get("dataApi/goodlist", params, (data: any) => {
				console.log('idndead',data)
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(data.goodList){
					if(this.currentPage==1){
						this.goodsList = []
					}
					this.goodsList = this.goodsList.concat(data.goodList);
					console.log('goodslist========',this.goodsList)
				}
				
				this.currentPage++;
				if(cb) cb()
			});
		}
	}
</script>

<style lang="scss">
	$bg:#283443;
	$font-16:16rpx;
	$font-20:20rpx;
	$font-24:24rpx;
	$font-28:28rpx;
	$font-32:32rpx;
	page{
		background:#F6F7F8
	}
	.content{
		width: 100%;
	}
	.absolute{
		position: relative;
	}
	.tab-center{
		width: 100%;
		box-sizing: border-box;
		background:#fff;
		padding-top: 104rpx;
	}
	.goods-list{
		width: 100%;
		background:#fff;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		padding:30rpx
	}
	.header-banner{
		width: 100%;
		background:#fff;
		position: fixed;
		left:0;
		top:0;
		box-sizing: border-box ;
		z-index: 9;
		padding-bottom:10rpx;
	}
	.tab-header{
		width: 750rpx;
		height:104rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 20rpx;
		z-index: 10;
		align-items: center;
	}
	.banner-content{
		width: 100%;
		margin:0 auto;
		border-radius: 10rpx;
		box-sizing: border-box;
		overflow: hidden;
		display: flex;
		padding:0 20rpx;
	}
	.swiper{
		width: 100%;
		height:180rpx;
		box-sizing: border-box;
		background:#F6F6F7;
		border-radius: 4rpx;
	}
	.swiper-image{
		width: 100%;
		height:180rpx;
		box-sizing: border-box;
		border-radius: 4srpx;
	}
	.tab-type{
		width: 100%;
		box-sizing: border-box;
		padding:40rpx 60rpx 32rpx 60rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.tab-index{
		height:110rpx;
		display: flex;
		align-items: flex-start;
		position: relative;
		flex-wrap: wrap;
		justify-content: center;
	}
	.tab-img-content{
		display: flex;
		height:72rpx;
		align-items: flex-start;

	}
	.tabimg0{
		width: 58rpx;
		height:62rpx;
	}
	.tabimg1{
		width: 58rpx;
		height:62rpx;
	}
	.tabimg2{
		width: 68rpx;
		height:72rpx;
	}
	.tabimg3{
		width: 54rpx;
		height:54rpx;
		margin-top: 6rpx;
	}
	.tabtext{
		width: 100%;
		height:34rpx;
		font-size: $font-24;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #14151A;
		text-align: center;
	}
	.tab-good-content{
		width: 100%;
		height:174rpx;
		box-sizing: border-box;
		padding:0 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.tab-good-inedx{
		width: 340rpx;
		border-radius: 4rpx;
		background:#F6F6F7;
		box-sizing: border-box;
		padding:16rpx 24rpx;
	}
	.tab-good-title{
		width: 100%;
		font-size:$font-28;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
		margin-bottom: 12rpx;
	}
	.tab-good-bottom{
		width: 100%;
		height:90rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.tab-good-img{
		width: 120rpx;
		height:90rpx;
		border-radius: 4rpx;
	}
	.tab-good-desc{
		width: 160rpx;
		height:90rpx;
		box-sizing: border-box;
		padding-top: 4rpx;
	}
	.tab-good-name{
		width: 100%;
		font-size: $font-24;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #14151A;
		margin-bottom: 8rpx;
	}
	.tab-good-btn{
		width: 100rpx;
		height: 40rpx;
		background: linear-gradient(90deg, #FDEB57 0%, #FFDB37 100%);
		border-radius: 24rpx;
		text-align: center;
		line-height: 40rpx;
		font-size: $font-20;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #14151A;
	}
	.tab-price-content{
		width: 100%;
		font-size: $font-24;
		font-family: 'DIN';
		font-weight: bold;
		color: #14151A;
	}
	.tab-price{
		font-size: $font-32;
	}
	.tabs-content{
		width: 100%;
		background:#fff;
	}
	.goodslist-index{
		width: 100%;
		box-sizing: border-box;
		padding:16rpx 20rpx;
		
	}
	
	.update-content {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.panel-shadow {
		width: 100%;
		height: 100%;
		position: absolute;
		background: rgba(0, 0, 0, 0.3);
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 1001
	}

	.panel-bg {
		width: 520rpx;
		height: auto;
		background: #FFFFFF;
		border-radius: 36rpx;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 42rpx 0;
		z-index: 1002;
	}

	
	.panel-logo {
		width: 290rpx;
		height: 194rpx;
		top: -92rpx;
		position: absolute;
	}

	.panel-title {
		height: 50rpx;
		font-size: 36rpx;
		font-weight: bolder;
		color: #4DCDCC;
		line-height: 50rpx;
		margin-top: 26rpx;
	}

	.panel-content {
		width: 440rpx;
		height: auto;
		box-sizing: border-box;
		margin: 32rpx 40rpx;
		text-align: center;
	}

	.panel-content text {
		width: 440rpx;
		height: auto;
		font-size: 28rpx;
		color: #9397A7;
		line-height: 40rpx;
		text-align: left;
	}

	.download-button {
		width: 400rpx;
		height: 88rpx;
		background: linear-gradient(142deg, #4DCDCC 0%, #4DCDCC 100%);
		border-radius: 44rpx;
		margin-top: 10rpx;

		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 88rpx;
	}

	.download-text {
		height: 88rpx;
		margin-top: 10rpx;

		font-size: 28rpx;
		color: #292929;
		line-height: 88rpx;
	}

</style>
