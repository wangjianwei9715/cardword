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
		
		<view class="header-banner" >
			<statusbar/>
			<view class="tab-header">
				<searchinput :searchText="'搜索商品、商家'" @clicksearch="onClickSearch"></searchinput>
			</view>
		</view>
		
		<view class="tab-center">
			<statusbar/>
			<view class="banner-content">
				
				<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" indicator-active-color="#ffffff"> 
					<swiper-item v-for="(item,index) in topAddList" :key="index" @click="onClickTopAdd">
						<image class="swiper-image" :src="item.pic" mode="aspectFits" @click="onClickTopJumpUrl(item.url)"></image>
					</swiper-item>
					
				</swiper>
			</view>
			
			<view class="tab-good-content">
				<view class="tab-type">
					<view class="tab-index" v-for="(item,index) in tabList" :key="index" @click="onClickJumpUrl(item)">
						<view class="tab-img-content"><image class="tabimg" :src="item.img" mode=""></image></view>
						<view class="tabtext">{{item.text}}</view>
					</view>
				</view>
				
				<view class="tab-act-content">
					<view class="tab-act-title">活动专区</view>
					<scroll-view class="goods-card-content-scroll" :scroll-x="true">
						<view class="tab-good-inedx" v-show="item.img!=''" v-for="(item,index) in noticeList" :key="index" @click="onClickNotice(item.target.goodCode)">
							<image class="tab-good-index-img" :src="decodeURIComponent(item.pic)" mode="aspectFill"></image>
							<view class="tab-good-index-bottom">
								<view class="tab-good-index-price">￥{{item.price}}</view>
								<view class="tab-good-index-tip">{{item.name}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="tabc-content">
			<tabs :tabs="goodTab" :tabsCheck="goodTabCheck" @tabsClick="onClickListTabs"></tabs>
		</view>
		<view class="goodslist-index">
			<goodslist  :goodsList="goodsList" :pageIndex="currentPage" @progress="getGoodProgress" :pagescroll="pagescroll"  @send="onClickJumpDetails"/>
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
		topAddList:any = [
			{pic:'../../static/index/banner2.jpg',url:'/pages/act/free/index'}
		];
		
		tabList = [
			{img:'../../static/index/tab0.png',text:'拼团',url:'/pages/goods/goods_find_list?classType=100'},
			{img:'../../static/index/tab1.png',text:'资讯',url:''},
			{img:'../../static/index/tab2.png',text:'查价',url:'/pages/index/ref'},
			{img:'../../static/index/tab3.png',text:'积分商城',url:''},
		];
		noticeList = [
		
		];
		goodTab = [
			{id:1,name:'推荐'},
			{id:4,name:'高端'},
			{id:2,name:'即将拼成'},
			{id:3,name:'新品'},
			{id:5,name:'优惠'},
		];
		goodTabCheck = 1;
		goodsList:any = [];
		currentPage = 1;
		pageSize = 20;
		noMoreData = false;
		apkNeedUpdate = false;
		updateStart = false;
		downloadText = '下载中：0 MB/0 MB, 0%';
		updateMsg = '暂无';
		useCache = 1;
		wgtUpdate = false;
		wgtUpNum = 0;
		pagescroll = false;
		postGoodProgressIn:any;
		progressList:any = [];
		networkStatus:any;
		getLuanchFnc:any;
		onNetWorkFunc:any;
		onLoad(query:any) {
			// uni.$emit('reLogin')
			if (app.update.apkNeedUpdate) {
				this.updateShow();
				return;
			}
			if(query.id){
				app.platform.goWeChatLive(query.id)
			}
			if(query.paydata){
				// #ifdef MP-WEIXIN
				let paydata = query.paydata
				if(app.token.accessToken == ''){
					app.platform.wechatLogin();
				}
				app.payment.paymentMini(JSON.parse(decodeURIComponent(paydata)))
				// #endif
			}
			let listeners = ['BackLogin']
			this.register(listeners);
			uni.showToast({
				title:'正在加载',
				icon:'none',
				duration:1000
			})
			this.getLuanchApp()
			// #ifdef MP-WEIXIN
			app.platform.wechatLogin();
			// #endif
		}
		onShow(){
			setTimeout(()=>{
				this.currentPage = 1;
				this.noMoreData = false;
				this.initEvent()
				if(this.progressList!=''){
					this.getGoodProgress(this.progressList)
				}
			},1000)
			uni.getNetworkType({
				success: (res)=> {
					if(res.networkType=='none'){

						uni.showModal({
							title: '提示',
							content: '当前无网络服务，请开启网络',
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}
			});
			this.networkStatusChange()
		}
		onHide(){
			clearInterval(this.postGoodProgressIn);
			clearInterval(this.getLuanchFnc);
			uni.offNetworkStatusChange((res)=>{
				console.log('onNetworkStatusChange=',res)
				if(res.isConnected){
					uni.showLoading({
						title: '加载中'
					});
					app.platform.appLuanch(false);
					setTimeout(()=>{
						this.initEvent();
						uni.hideLoading();
					},1000)
				}
			})
		}
		onPageScroll(e:any){
			this.pagescroll = !this.pagescroll
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
		// 监听网络
		networkStatusChange(){
			// #ifdef APP-PLUS
			this.onNetWorkFunc= uni.onNetworkStatusChange((res)=>{
				console.log('onNetworkStatusChange=',res)
				if(res.isConnected&&app.service_url==''){
					uni.showLoading({
						title: '加载中'
					});
					app.platform.appLuanch(false);
					setTimeout(()=>{
						this.initEvent();
						uni.hideLoading();
					},1000)
				}
			})
			// #endif
		}
		initEvent(){
			app.http.Get("dataApi/home", {}, (data: any) => {
				console.log('index/home====',data)
				this.noticeList = data.activity
				this.reqNewData()
			})
			// #ifdef MP-WEIXIN
			if(app.token.accessToken == ''){
				app.platform.wechatLogin();
				return;
			}
			// #endif
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
		getPic(img:any){
			if(img.indexOf(',') == -1){
				return img;
			}else{
				let pic = img.split(',')
				return pic[0]
			}
		}
		getGoodProgress(val:any){
			this.progressList = val
			clearInterval(this.postGoodProgressIn);
			this.postGoodProgressIn = this.scheduler(()=>{
				if(this.goodsList==''||val==''){
					clearInterval(this.postGoodProgressIn);
					return;
				}
				app.http.Post('good/progress/list',{list:val},(res:any)=>{
					console.log('INDEX progress===',res)
					this.setNewProgress(res.list)
				})
			},10)
		}
		getLuanchApp(){
			let loginToken = uni.getStorageSync("token");
			this.getLuanchFnc = this.scheduler(()=>{
				uni.showLoading({
					title:'加载中'
				})
				console.log('app.service_url=',app.service_url)
				if(app.service_url==''||app.dataApiDomain==''){
					uni.removeStorageSync("launchConfig");
					console.log('重新开始luanch')
					app.platform.appLuanch(loginToken,()=>{
						console.log('launchCb')
						this.initEvent()
					})
				}else{
					uni.hideLoading()
					clearInterval(this.getLuanchFnc);
				}
			},1)
		}
		setNewProgress(list:any){
			for(let i in list){
				for(let t in this.goodsList){
					if(list[i].code==this.goodsList[t].goodCode){
						this.goodsList[t].lockNum = list[i].lockNum
						this.goodsList[t].currentNum = list[i].currentNum
						this.goodsList[t].totalNum = list[i].totalNum
					}
				}
			}
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
		onClickNotice(code:any){
			this.onClickJumpDetails(code)
		}
		onClickTopAdd(){
			uni.showToast({
				title:'活动升级中',
				icon:'none'
			})
		}
		onClickSearch(){
			// 搜索
			uni.navigateTo({
				url: '/pages/goods/goods_find'
			})
		}
		onClickTopJumpUrl(url:any){
			// uni.navigateTo({
			// 	url: url
			// })
		}
		onClickJumpUrl(item:any){
			if(item.text=='拼团'){
				uni.navigateTo({
					url: item.url
				})
			}else if(item.text=='积分商城'){
				uni.showToast({
					title:'商城维护中',
					icon:'none'
				})
				return;
			}else if(item.text=='资讯'){
				uni.showToast({
					title:'资讯升级中',
					icon:'none'
				})
				return;
			}else{
				uni.switchTab({
					url:item.url
				})
			}
			
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
			this.goodsList = []
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
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(data.goodList){
					if(this.currentPage==1){
						this.goodsList = []
					}
					this.goodsList = this.goodsList.concat(data.goodList);
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
		background:#F2F2F2
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
		height:84rpx;
		display: flex;
		box-sizing: border-box;
		padding:20rpx 20rpx 0 20rpx;
		z-index: 10;
		align-items: center;
	}
	.banner-content{
		width: 750rpx;
		height:190rpx;
		margin:0 auto;
		border-radius: 10rpx;
		box-sizing: border-box;
		overflow: hidden;
		display: flex;
		padding:0 20rpx;
	}
	.swiper{
		width: 710rpx;
		height:190rpx;
		box-sizing: border-box;
		display: flex;
		align-items: flex-start;
		justify-content: center;
	}
	.swiper-image{
		width: 710rpx;
		height:190rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		
	}
	.tab-good-content{
		width: 100%;
		box-sizing: border-box;
		padding:0 19rpx;
		background: linear-gradient(0deg, #F2F2F2, #FFFFFF 80%, #FFFFFF);
	}

	.tab-type{
		width: 100%;
		box-sizing: border-box;
		padding:20rpx 36rpx 32rpx 36rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.tab-index{
		width: 100rpx;
		height:140rpx;
		display: flex;
		align-items: flex-start;
		position: relative;
		flex-wrap: wrap;
		justify-content: center;
	}
	.tab-img-content{
		display: flex;
		width: 100rpx;
		height:100rpx;
		align-items: flex-start;

	}
	.tabimg{
		width: 100rpx;
		height:100rpx;
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
	
	.tab-act-content{
		width: 100%;
		padding:0 20rpx 0 24rpx;
		padding-bottom: 20rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		background:#fff;
		padding-top: 20rpx;
	}
	.tab-act-title{
		width: 100%;
		box-sizing: border-box;
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 600;
		color: #34363A;
		margin-bottom: 20rpx;
	}
	.tab-good-inedx{
		width:170rpx;
		height:240rpx;
		box-sizing: border-box;
		display: inline-block;
		margin-right: 20rpx;
	}
	.tab-good-index-img{
		width: 170rpx;
		height:170rpx;
		border-radius: 10rpx;
	}
	.tab-good-index-bottom{
		width: 170rpx;
		height:50rpx;
		display: flex;
		align-items: center;
		white-space:nowrap;
		overflow:hidden;
		margin-top: -10rpx;
		text-overflow:ellipsis;
		margin-top: 10rpx;

	}
	.tab-good-index-price{
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 0;
		color: #14151A;
	}
	.tab-good-index-tip{
		font-size: 21rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #ABABBB;
		margin-left: 8rpx;
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
		white-space:nowrap;	
		overflow:hidden;
		text-overflow:ellipsis;
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
	.tabc-content{
		width: 100%;
		background:#F2F2F2;
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
	.goods-card-content-scroll{
		width: 100%;
		height:240rpx;
		display: flex;
		white-space: nowrap;
		overflow: auto;
	}
</style>
