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
				<view class="index-icon"></view>
				<view class="header-search" @click="onClickSearch"><view class="search-icon"></view></view>
			</view>
		</view>
		<view class="tab-center">
			<view class="banner-content" :style="'padding-top:'+statusBarHeight+'px'">
				<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" indicator-active-color="#ffffff"> 
					<swiper-item v-for="(item,index) in advertisingList" :key="index">
						<image class="swiper-image" :src="item.pic" mode="aspectFit" @click="onClickTopJumpUrl(item)"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="tab-type">
				<view class="tab-index" v-for="(item,index) in tabList" :key="index" @click="onClickJumpUrl(item.url)">
					<image :class="'tabimg'+index" :src="item.img" mode=""></image>
					<view class="tabtext">{{item.text}}</view>
				</view>
			</view>
			<view class="tab-notice">
				<swiper class="notice-swiper" autoplay="true" circular="true" vertical="true" duration="0" disable-touch="true">
					<swiper-item v-for="(item,index) in noticeList" :key="index">
						<view class="notice-index">
							<view class="notice-left">
								<image class="notice-img1" :src="item.title" mode="heightFix"></image>
								<view class="notice-text">{{item.text}}</view>
								<view class="notice-type">{{item.num}}件商品 {{item.status}}</view>
							</view>
							<view class="notice-banner">
								<image class="notice-img2" :src="item.img" mode="aspectFit"></image>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<view class="goodslist-index">
			<goodslist  :goodsList="goodsList" :ispullDown="pullDownRefresh" @send="onClickJumpDetails"/>
		</view>
	</view>
</template>

<script lang="js">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '@/base/BaseNode.vue';
	@Component({})
	export default class index extends BaseNode {
		statusBarHeight = app.statusBarHeight;
		advertisingList = [];
		tabList = [
			{img:'../../static/index/tab0.png',text:'篮球',url:'/pages/goods/index?type=3'},
			{img:'../../static/index/tab1.png',text:'足球',url:'/pages/goods/index?type=4'},
			{img:'../../static/index/tab2.png',text:'TCG',url:'/pages/goods/index?type=0'},
			{img:'../../static/index/tab3.png',text:'影视',url:'/pages/goods/index?type=1'},
		];
		noticeList = [
			{
				img:'../../static/index/test1.png',
				title:'../../static/index/test2.png',
				text:'小皇帝1勒布朗1詹姆斯1限量卡盒',
				num:11,
				status:'竞拍中'
			},
			{
				img:'../../static/index/test1.png',
				title:'../../static/index/test2.png',
				text:'小皇帝2勒布朗2詹姆斯2限量卡盒',
				num:22,
				status:'竞拍中'
			},
		];
		goodsList = [];
		currentPage = 1;
		pageSize = 10;
		noMoreData = false;
		pullDown = false;
		pullDownRefresh = false;
		scrollId = '';
		apkNeedUpdate = false;
		updateStart = false;
		downloadText = '下载中：0 MB/0 MB, 0%';
		updateMsg = '暂无';
		useCache = 1;
		wgtUpdate = false;
		wgtUpNum = 0;
		onLoad(query) {
			// uni.$emit('reLogin')
			if (app.update.apkNeedUpdate) {
				this.updateShow();
				return;
			}
			let listeners = ['BackLogin']
			this.register(listeners);
			this.initEvent()
		}
		onPageScroll(e){
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
			this.reqNewData('default',()=>{
				setTimeout(()=>{
					uni.stopPullDownRefresh();
				},1000)
			})
		}
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData('reach') 
		}
		initEvent(){
			
			app.http.Get("home", {}, (data) => {
				this.goodsList = data.goodList;
				this.advertisingList = data.topAddList;
				console.log('this.goodsList=========',this.goodsList)
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
						let path = downloadResult.tempFilePath;
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
			downloadTask.onProgressUpdate((result) => {
				let downMB = Math.floor(result.totalBytesWritten / 1024 / 1024) + ' MB/' + Math.floor(result
					.totalBytesExpectedToWrite / 1024 / 1024) + ' MB'
				this.downloadText = '下载中：' + downMB + ', ' + result.progress + '%';
			});
		}
		BackLogin(res){
			console.log('BackLogin',res);
			uni.$emit('BackLogin');
		}
		Logout(res){
			console.log(res);
		}
		onClickSearch(){
			// 搜索
			uni.navigateTo({
				url: '/pages/goods/goodssearch'
			})
		}
		onClickTopJumpUrl(item){
			if(item.target.id!=''){
				uni.navigateTo({
					url: '/pages/goods/goodsdetails?id='+item.target.id
				})
			}
			if(item.target.page!=''){
				uni.navigateTo({
					url: item.target.page
				})
			}
			
			if(item.target.url!=''){
				plus.runtime.openURL(item.target.url)
			}
		}
		onClickJumpUrl(url){
			uni.navigateTo({
				url: url
			})
		}
		// 跳转商品详情
		onClickJumpDetails(id){
			uni.navigateTo({
				url: '/pages/goods/goodsdetails?id='+id
			})
		}
		reqNewData(type,cb) {
			let reach = false
			if(type=='reach'){
				reach = true
			}
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			
			let params = {
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
			}
			if(reach && this.scrollId!=''){
				params.scrollId = this.scrollId
			}
			let date = new Date()
			params.timeStamp = Date.parse(date)/1000
			
			app.http.Get("search", params, (data) => {
				if(data.goodList){
					if(this.currentPage==1){
						this.pullDownRefresh = !this.pullDownRefresh
					}
					this.goodsList = data.goodList;
				}else{
					this.noMoreData = true;
				}
				this.scrollId = data.scrollId
				this.currentPage++;
				if(cb) cb()
			});
		}
	}
</script>

<style>
	.content{
		width: 100%;
		background:#F5F5F9;
	}
	.absolute{
		position: relative;
	}
	.tab-center{
		width: 100%;
		box-sizing: border-box;
		background:#fff;
		margin-bottom: 14rpx;
		padding-top: 113rpx;
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
		width: 100%;
		height:80rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 30rpx;
		z-index: 10;
		align-items: center;
	}
	.index-icon{
		width: 94rpx;
		height:46rpx;
		background:url(../../static/index/icon.png) no-repeat center;
		background-size: 100% 100%;
		margin-top: 2rpx;
		margin-right: 29rpx;
	}
	.header-search{
		width: 561rpx;
		height:50rpx;
		background: #FFFFFF;
		border: 1px solid #949494;
		border-radius: 25px;
		box-sizing: border-box;
		display: flex;
		padding-left: 20rpx;
		align-items: center;
	}
	.search-icon{
		width:25rpx ;
		height:25rpx;
		background:url(../../static/index/search.png) no-repeat center;
		background-size: 100% 100%;
	}
	.banner-content{
		width: 100%;
		margin:0 auto;
		border-radius: 10rpx;
		box-sizing: border-box;
		overflow: hidden;
		display: flex;
		padding:0 30rpx;
	}
	.swiper{
		width: 100%;
		height:265rpx;
		box-sizing: border-box;
	}
	.swiper-image{
		width: 100%;
		height:265rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
	}
	.tab-type{
		width: 100%;
		box-sizing: border-box;
		padding:44rpx 64rpx 94rpx 64rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #F4F3F2;
	}
	.tab-index{
		height:100rpx;
		display: flex;
		align-items: center;
		position: relative;
	}
	.tabimg0{
		width: 82rpx;
		height:84rpx;
	}
	.tabimg1{
		width: 94rpx;
		height:89rpx;
	}
	.tabimg2{
		width: 102rpx;
		height:100rpx;
	}
	.tabimg3{
		width: 58rpx;
		height:95rpx;
	}
	.tabtext{
		width: 100%;
		height:27rpx;
		color:#3B3B3B;
		font-size: 28rpx;
		text-align: center;
		position: absolute;
		bottom:-46rpx;
		left:0;
	}
	.tab-notice{
		width: 100%;
		height:208rpx;
		box-sizing: border-box;
	}
	.notice-swiper{
		width: 100%;
		height:208rpx;
		box-sizing: border-box;
	}
	.notice-index{
		width: 100%;
		height:208rpx;
		box-sizing: border-box;
		padding:0 30rpx;
		display: flex;
		justify-content: space-between;
	}
	.notice-left{
		width: 480rpx;
		height:208rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding:30rpx 0
	}
	.notice-banner{
		width: 200rpx;
		height:208rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}
	.notice-img1{
		height:38rpx;
	}
	.notice-img2{
		max-width: 180rpx;
		max-height:180rpx
	}
	.notice-text{
		width: 100%;
		margin-top:20rpx;
		margin-bottom: 10rpx;
		color:#3B3B3B;
		font-size: 33rpx;
		line-height: 36rpx;
	}
	.notice-type{
		color:#7B7B7B;
		font-size: 22rpx;
		width: 100%;
	}
	.index-goods{
		width: 100%;
		background:#fff;
		box-sizing: border-box;
		padding:30rpx;
		display: flex;
	}
	.goods-content{
		width: 330rpx;
		display: inline-block;
	}
	.goods-left{
		margin-right: 30rpx;
	}
	.goods-item{
		width: 330rpx;
		display: inline-block;
		margin-bottom: 30rpx;
		box-sizing: border-box;
	}
	.goods-image-content{
		width: 330rpx;
		background:#F5F5F9;
		border-radius: 10rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 15rpx;
	}
	.goods-image{
		width: 100%;
		border-radius: 10rpx;
	}
	.goods-desc{
		width: 330rpx;
		font-size: 24rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #3B3B3B;
		line-height: 30rpx;
		margin-bottom: 10rpx;
	}
	.goods-price{
		width: 330rpx;
		font-size: 28rpx;
		font-family: FZZYK;
		font-weight: bold;
		color: #3B3B3B;
	}
	.goods-time{
		width: 330rpx;
		font-size: 20rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #7B7B7B;
		margin-top: 10rpx;
		margin-bottom: 11rpx;
	}
	.goods-seller{
		width: 330rpx;
		height:40rpx;
		display: flex;	
		align-items: center;
	}
	.goods-seller-image{
		width: 40rpx;
		height:40rpx;
		border:50%;
		margin-right: 12rpx;
	}
	.seller-name{
		height:40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #7B7B7B;
	}
	.goodslist-index{
		width: 100%;
		box-sizing: border-box;
		padding:30rpx 0;
		background:#fff
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
