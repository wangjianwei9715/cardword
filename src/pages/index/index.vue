<template>
	<view class="content">
		<!-- 热更新 S -->
		<view v-if="apkNeedUpdate" class="update-content">
			<view class="panel-shadow" @touchmove.stop.prevent="doNothing"></view>
			<view class="panel-bg">
				<view class="panel-title">
					<view class="panel-title-text">版本更新公告</view>
					<view class="panel-title-ver">V{{version}}</view>
				</view>
				<view class="panel-content">
					<view class="progress-msg">
						<text>
							{{updateMsg}}
						</text>
					</view>
					<button v-if="!updateStart" class="download-button" @click="onClickDownload">立即更新</button>
					<view v-else class="download-text">{{downloadText}}</view>
				</view>
			</view>
		</view>
		<view v-if="wgtUpdate" class="update-content">
			<view class="panel-shadow"></view>
			<view class="panel-bg">
				<view class="panel-title">
					<view class="panel-title-text">正在更新</view>
					<view class="panel-title-ver">V{{version}}</view>
				</view>
				<view class="panel-content">
					<view class="progress-content"><progress :percent="wgtUpNum" active-mode="forwards" active
							stroke-width="6" border-radius="20px" activeColor="#FB4E3E" /></view>
					<view class="progress-wait">正在更新中，请您耐心等待...</view>
				</view>
			</view>
		</view>
		<!-- 热更新 E -->


		<view class="header-banner">
			<statusbar />
			<view class="tab-header">
				<view class="tab-box">
					<u-tabs :list="TOP_TABS" lineWidth="49rpx" lineHeight="6rpx" :lineColor="`url(${lineBg}) 100% 100%`" :activeStyle="{color:'#333333',fontSize:'50rpx',fontFamily:'YouSheBiaoTiHei',transform: 'scale(1,1.1)'}" :inactiveStyle="{color:'#959695',fontSize:'50rpx',fontFamily:'YouSheBiaoTiHei',transform: 'scale(1,1.1)'}" :itemStyle="{width:'100rpx',height:'100rpx',padding:'0rpx 25rpx',}" :current="currentIndex" @click="currentIndex=$event.index"></u-tabs>
				</view>
				<view class="header-search" @click="onClickLiveSearch">
					<view class="sousuo-icon"></view>
					<view v-show="currentIndex==1" style="padding-left:80rpx;color:#A3A3A3;font-size:25rpx">{{currentIndex==1?(liveData.q||'商品/商家/直播'):''}}</view>
					<u-notice-bar v-show="currentIndex==0" style="padding-left:80rpx;" @click="onClickSearch" :text="noticeList" direction="column" icon="" color="#A3A3A3" bgColor="rgba(0,0,0,0)" :duration="5000"></u-notice-bar>
				</view>
			</view>
			
		</view>
		<view class="tab-center">
			<statusbar />
			<swiper class="index-swiper" :style="{ width: '100%', height: '100vh',overflow:'hidden' }" :current="currentIndex" :disable-touch="disableTouch" duration="200" @change="animationfinish" @animationfinish="scrollY=true;refresherEnabled=true" @transition="transitionSwiper">
				<swiper-item>
					<scroll-view class="index-swiper-scroll" :class="{'transRef':transRef}" :style="{ width: '100%', height: '100vh' }" :scroll-y="scrollY" :refresher-threshold="45" :scroll-top="scrollTop" :scroll-with-animation="true" @scrolltolower="reqNewData()" @scroll="onScrollIndex" @touchend="touchmoveScroll" :refresher-enabled="refresherEnabled" :refresher-triggered="refresherIndex" @refresherrefresh="refreshStart">
						<view class="tab-good-content">
							<view class="tab-type" v-for="(item,index) in indexTabList" :key="index" :class="{justifyStart:index=='top'}">
								<view class="tab-index" v-for="(items,indexs) in item" :key="indexs" @click="onClickJumpUrl(items)">
									<view class="tab-img-content">
										<image class="tabimg" :class="{'tabimg-all':items.name=='全部拼团'}" :src="decodeURIComponent(items.icon)" mode=""/>
										<image v-if="index=='top'&&items.cornerMarkTp>0" class="tabimg-icon" :src="`../../static/index/v3/index_top_icon${items.cornerMarkTp}.png`"></image>
									</view>
									<view class="tabtext u-line-1">{{items.name}}</view>
								</view>
							</view>
							<navigator class="capsule-box" :url="capsule.url" hover-class="none" v-if="isDuringDate('2022-07-12', '2022-11-26')">
								<image class="capsule-pic" :src="decodeURIComponent(capsule.pic)" mode="aspectFill"/>
							</navigator>

							<!-- 卡币商城 热门系列 拆卡围观 -->
							<tabHot :hotList="hotList" :freshGoodCovers="freshGoodCovers" />
						</view>
						<goodslist :goodsList="goodsList" :topAddList="topAddList" :indexSwiper="indexSwiper"
							@send="onClickJumpDetails" :presell="false" />
						<statusbar />

					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view class="index-swiper-scroll" :style="{ width: '100%', height: '100vh' }" :scroll-y="scrollY" :refresher-threshold="45"  @scrolltolower="reqNewLiveData()" @scroll="onScrollIndex" @touchend="touchmoveScroll" :refresher-enabled="refresherEnabled" :refresher-triggered="refresherIndex" @refresherrefresh="refreshStart">
						<tabc class="live-tabc" :tabc="tabData" :tabsCheck="liveData.liveTabCheck" @tabsClick="onClickListTabs"></tabc>
						<view class="live-content">
							<liveslist :liveList="liveList" />
							<statusbar />
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
			
		</view>
		

		<paymentSuccess :showPaySuccess="showPaySuccess" :showJoin="true" @cancelPaySuccess="onClickcancelPaySuccess" />

		<winningCardPopup :showWinningCrad="showWinningCrad" @closeWinning="closeWinning" />
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '@/base/BaseNode.vue';
	import {
		indexTabList,
		indexHotList,
		indexGoodTab,
		indexGoodsType
	} from "@/net/DataExchange"
	import { isDuringDate } from "@/tools/util"
	import { Md5 } from "ts-md5";
	const TOP_TABS = [{name:'推荐'},{name:'拆卡'}];
	const lineBg = '../../static/index/v3/tab_line.png'
	@Component({components: {},})
	export default class index extends BaseNode {
		TOP_TABS = TOP_TABS;
		lineBg = lineBg;
		noticeList = ['prizm'];
		statusBarHeight = app.statusBarHeight
		isDuringDate = isDuringDate;
		indexGoodsType = indexGoodsType;
		indexTabList: { [x: string]: any } = {
			top:[],
			bottom:indexTabList
		};
		capsule = {
			pic:'../../static/index/mp_mini.jpg',
			url:'../../static/index/mp_mini.jpg'
		}
		hotList: { [x: string]: any } = indexHotList;
		goodTab = indexGoodTab;
		topAddList: any = [];
		freshGoodCovers:any = [];
		// 卡币商城 热门系列 拆卡围观
		goodTabCheck = 1;
		indexSwiper = true;
		goodsList: any = [];
		// fetchFrom:第几个数据开始  fetchSize:取几个数据
		fetchFrom = 1;
		fetchSize = 10;
		noMoreData = false;
		apkNeedUpdate = false;
		updateStart = false;
		downloadText = '下载中：0 MB/0 MB, 0%';
		updateMsg = '暂无';
		wgtUpdate = false;
		wgtUpNum = 0;
		onNetWorkFunc: any;
		showPaySuccess = false;
		version = '';
		oneLoad = true;
		showWinningCrad = false;
		greeted = false;
		liveList = [];
		liveData = {
			pageIndex:1,
			pageSize:10,
			noMoreData:false,
			q:'',
			liveTabCheck:1,
			httpUrl:'dataApi/broadcast/list/living'
		}
		refresherIndex = false;
		refresherEnabled = true;
		currentIndex = 0;
		scrollY = true;
		scrollTop = 0;
		disableTouch = false;
		tabData = [
			{id:1,name:'直播拆卡',http:'dataApi/broadcast/list/living'},
			{id:2,name:'拆卡回放',http:'dataApi/broadcast/list/playback'},
			{id:3,name:'我的拆卡',http:'me/broadcast'}
		];
		transRef = false;
		onLoad(query: any) {
			// let zqWebviewFloat:any = uni.requireNativePlugin("zq-webview-float");
			// // //显示悬浮窗
			// zqWebviewFloat.show({
			//     url: "http://192.168.8.26:8080/#/pages/liveStreaming/float",//设置悬浮窗webview加载的远程url，必传参数
			//     width:250,//设置悬浮窗宽度默认值：400
			//     height: 400,//设置悬浮窗高度默认值：400
			//     scrollX: false,//设置悬浮窗是否有水平滚动条默认值：false
			//     scrollY: false,//设置悬浮窗是否有垂直滚动条默认值：false
			//     removable: true,//设置悬浮窗是否支持拖拽移动默认值：true
			//     resizeable: true,//设置悬浮窗是否支持拖拽调整大小默认值：true
			//     clickPass: true,//悬浮窗是否穿透点击事件作用在webview中默认值：true
			//     dragPass: true,//悬浮窗是否穿透触摸事件作用在webview中默认值：true
			//     dragWidth: 50//悬浮窗拖拽调整大小时，四个角的可拖拽区域大小默认值：50
			// },function(data:any){//回调函数
			//     console.log(data);
			// })
			// zqWebviewFloat.wakeUp();
			// zqWebviewFloat.destory();
			// console.log(zqWebviewFloat.show);
			// if (app.update.apkNeedUpdate) {
			// 	this.updateShow();
			// 	return;
			// }
// uni.preloadPage({
// 				url: "/pages/live/floatVideo"
// 			})
			let listeners = ['BackLogin']
			this.register(listeners);

			this.onEventUI("apkNeedUpdate", () => {
				this.updateShow();
			});
			this.onEventUI("wgtNeedUpdate", () => {
				this.wgtUpdateShow();
			});
			this.onEventUI("wgtUpdateNum", (res) => {
				this.wgtUpNum = res;
			});
			this.onEventUI("showPaySuccess", (res) => {
				this.showPaySuccess = true;
			});
			this.onEventUI("liveFind",(res)=>{
				this.liveData.pageIndex = 1;
				this.liveData.noMoreData = false;
				this.liveData.q = res.text
				this.reqNewLiveData()
			})
			uni.$once('appluanchOver', () => {
				if (this.oneLoad) {
					this.version = app.version
					this.showInitEvent()
					this.oneLoad = false;
				}
			})
			//#ifdef APP-PLUS
			plus.webview.prefetchURL(app.liveWebView)//预载直播控件webview
			//#endif
		}
		onShow() {
			// #ifdef APP-PLUS
			this.networkStatusChange()
			// #endif
			// 销毁页面重新加载
			if (uni.getStorageSync('reLaunch')) {
				this.showInitEvent(() => {
					uni.removeStorageSync('reLaunch')
				})
			}
			// 避免部分机型uni.$once监听不到
			if (this.oneLoad && uni.getStorageSync('appluanchOver') == 1) {
				this.reHomeGet()
			}
			// #ifndef MP
			if (app.localTest) {
				//开发环境
				if (this.oneLoad) {
					this.version = app.version
					this.showInitEvent()
					this.oneLoad = false;
				}
			}
			// #endif
			uni.getNetworkType({
				success: (res) => {
					if (res.networkType == 'none') {
						uni.showModal({
							title: '提示',
							content: '当前无网络服务，请开启网络'
						});
					}
				}
			});
			if (this.goodsList != '') {
				this.getHome()
				let list = this.goodsList.map((x: any) => {
					return x.goodCode;
				})
				app.http.Post('dataApi/good/progress/list', {
					list: list
				}, (res: any) => {
					this.setNewProgress(res.list)
				})
			}
		}
		onHide() {
			uni.offNetworkStatusChange((res) => {})
		}
		// onTabItemTap(e:any) {
		// 	console.log(e);
			
		// 	if(e.index==0 && this.currentIndex ==0){
		// 		setTimeout(()=>{
		// 			this.refreshStart()
		// 		},300)
		// 	}
		// 	// e的返回格式为json对象： {"index":0,"text":"首页","pagePath":"pages/index/index"}
		// }
		reHomeGet() {
			if (app.dataApiDomain == '') {
				setTimeout(() => {
					this.reHomeGet()
				}, 100);
				return;
			}
			uni.removeStorageSync('appluanchOver')
			this.version = app.version
			this.showInitEvent()
			this.oneLoad = false;
		}
		// 监听网络
		networkStatusChange() {
			// #ifdef APP-PLUS
			this.onNetWorkFunc = uni.onNetworkStatusChange((res) => {
				if (res.isConnected && app.service_url == '') {
					uni.showLoading({
						title: '加载中'
					});
					app.platform.appLuanch(false);
					setTimeout(() => {
						uni.hideLoading();
					}, 1000)
				}
			})
			// #endif
		}
		showInitEvent(cb ? : Function) {
			this.fetchFrom = 1;
			this.noMoreData = false;
			this.liveData.pageIndex = 1;
			this.liveData.q = '';
			this.liveData.noMoreData = false
			this.initEvent(() => {
				if (cb) cb()
			})
		}
		// 获取首页其它只请求一次的接口
		getIndexOrther() {
			if (this.greeted) return;
			this.greeted = true;
			
			// 获取搜索轮播
			app.http.Get('dataApi/advertising/seekRotate/list',{},(res:any)=>{
				this.noticeList = res.list
			})
			// 获取系列icon
			app.http.Get('dataApi/advertising/iconSeries/list',{},(res:any)=>{
				this.indexTabList.top=res.list;
				console.log(this.indexTabList);
			})
			// 获取是否中卡信息
			if(app.token.accessToken != ''){
				app.http.Get('me/greet', {}, (res: any) => {
					if (res.data.broadcastActor) app.broadcastActor = res.data.broadcastActor
					if (res.data.newHitNum > 0) this.showWinning();
				})
			}
		}

		showWinning() {
			this.showWinningCrad = true;
			uni.hideTabBar()
		}
		closeWinning() {
			this.showWinningCrad = false
			uni.showTabBar()
		}
		initEvent(cb ? : Function) {
			this.getHome(()=>{
				this.reqNewData(() => {
					if (cb) cb()
				})
				this.reqNewLiveData()
			})
			
		}
		getHome(cb?:Function){
			app.http.Get("dataApi/home", {}, (data: any) => {
				uni.hideLoading()
				// #ifndef MP
				this.topAddList = data.addList || [];
				this.hotList.broadCast.list = data.broadCast || [];
				if(data.freshGoodCovers){
					this.freshGoodCovers = data.freshGoodCovers.map((x:any,index:number)=>{
						return {show:index==0,src:x}
					})
				}
				this.getIndexOrther()
				// #endif
				cb && cb()
			})
		}
		onClickMiniGood() {
			uni.showToast({
				title: '商品正在筹备中',
				icon: 'none'
			})
		}
		setNewProgress(list: any) {
			for (let i in list) {
				for (let t in this.goodsList) {
					if (list[i].code == this.goodsList[t].goodCode) {
						this.goodsList[t].lockNum = list[i].lockNum
						this.goodsList[t].currentNum = list[i].currentNum
						this.goodsList[t].totalNum = list[i].totalNum
						this.goodsList[t].saleRatio = list[i].saleRatio
					}
				}
			}
		}
		updateShow() {
			uni.hideTabBar();
			this.updateMsg = decodeURIComponent(app.update.apkData.msg);
			this.apkNeedUpdate = true;
		}
		wgtUpdateShow() {
			this.wgtUpdate = true;
		}
		onClickDownload() {
			// #ifdef APP-PLUS
			if (uni.getSystemInfoSync().platform == 'ios') {
				plus.runtime.openURL('https://itunes.apple.com/cn/app/id1593158816?mt=8')
				return;
			}
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
			// #endif
		}
		BackLogin(res: any) {
			uni.$emit('BackLogin');
		}
		onClickSearch(index:number) {
			const placeholder = this.noticeList[index] || '';
			// 搜索
			uni.navigateTo({
				url: `/pages/goods/goods_find?placeholder=${placeholder}`
			})
		}
		onClickLiveSearch(){
			if(this.currentIndex==1){
				uni.navigateTo({
					url: `/pages/live/live_find?q=${this.liveData.q}`
				})
			}
		}
		onClickcancelPaySuccess() {
			this.showPaySuccess = false;
		}
		onClickJumpUrl(item: any) {
			if (item.name == '卡币商城' || item.name == '领券中心') {
				if (app.token.accessToken == '') {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
			}
			if(item.id){
				//系列
				uni.navigateTo({
				url: `/pages/goods/goods_seriesDetail?seriesId=${item.id}`
			})
				return
			}
			uni.navigateTo({
				url: item.url
			})
		}
		// 跳转商品详情
		onClickJumpDetails(goodCode: any) {
			app.navigateTo.goGoodsDetails(goodCode)
		}
		// 切换内容
		onScrollIndex(event:any){
			this.refresherEnabled = event.detail.scrollTop<=0
			this.disableTouch = true
		}
		touchmoveScroll(){
			setTimeout(()=>{
				this.disableTouch=false
			},100)
		}
		refreshStart(){
			this.transRef = true;
			this.refresherIndex = true
			this.showInitEvent(() => {
				setTimeout(() => {
					this.refresherIndex = false;
					this.transRef = false
				}, 1000)
			})
		}
		transitionSwiper(event:any){
			this.scrollY = false;
			this.refresherEnabled = false
		}
		animationfinish(event:any){
			this.currentIndex = event.detail.current;
			// if(event.detail.current == 1){
			// 	if(this.liveData.liveTabCheck == 1 && this.liveList.length==0)
			// }
		}
		onClickListTabs(id: any) {
			if (id == this.liveData.liveTabCheck) {
				return;
			}
			if (id == 3 && app.token.accessToken == ''){
				uni.navigateTo({ url:'/pages/login/login' })
				return;
			}
			this.liveData = {
				pageIndex:1,
				pageSize:10,
				noMoreData:false,
				q:this.liveData.q,
				liveTabCheck:id,
				httpUrl:this.tabData[id-1].http,
			}
			this.reqNewLiveData()
		}
		reqNewData(cb ? : Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			let ts = Math.floor(new Date().getTime() / 1000);
			let type = this.indexGoodsType[this.goodTabCheck];
			let params: { [x: string]: any } = {
				fetchFrom: this.fetchFrom,
				fetchSize: this.fetchSize,
				ts: ts,
				s: Md5.hashStr('kww_goodlist_sign_' + type + '_' + this.fetchFrom + '_' + this.fetchSize + '_' +
					ts + '_2022')
			}
			app.http.Get("dataApi/goodlist/forsale/" + type, params, (data: any) => {
				if (data.isFetchEnd) {
					this.noMoreData = true;
				}
				if (this.fetchFrom == 1) this.goodsList = [];

				if (data.goodList) {
					let list = this.fetchFrom == 1 ? data.goodList : [...this.goodsList,...data.goodList];
					this.goodsList = app.platform.removeDuplicate(list,'goodCode')
				}
				this.fetchFrom += this.fetchSize;
				if (cb) cb()
			});
		}
		reqNewLiveData(cb?:Function) {
			// 获取更多商品
			const params = this.liveData;
			if (params.noMoreData) return ;

			app.http.Get(params.httpUrl,{q:params.q,pageIndex:params.pageIndex,pageSize:params.pageSize},(data:any)=>{
				if(data.totalPage<=params.pageIndex) params.noMoreData = true;
				if(params.pageIndex==1) this.liveList = []
				if(data.list) this.liveList = this.liveList.concat(data.list);
				params.pageIndex++;
				if(cb) cb()
			})
			
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

	page {
		background: $content-bg
	}
	.content {
		width: 100%;
	}
	.absolute {
		position: relative;
	}
	.tab-center {
		width: 100%;
		height:100%;
		position: fixed;
		left:0;
		top:0;
		right:0;
		overflow: hidden;
		box-sizing: border-box;
		padding-top: 104rpx;
	}
	.index-swiper-scroll{
		// #ifdef APP-PLUS
		box-sizing: border-box;
		padding-bottom: calc(104rpx);
		padding-bottom: calc(104rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(104rpx + env(safe-area-inset-bottom));
		// #endif
	}
	.goods-list {
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		padding: 30rpx
	}

	.header-banner {
		width: 100%;
		background: #fff;
		position: fixed;
		left: 0;
		top: 0;
		box-sizing: border-box;
		z-index: 9;
	}

	.tab-header {
		width: 750rpx;
		height: 104rpx;
		display: flex;
		box-sizing: border-box;
		padding: 0 35rpx 0 15rpx;
		z-index: 10;
		align-items: center;
		justify-content: space-between;
	}
	.tab-box{
		width: 290rpx;
		height:100rpx
	}
	.banner-content {
		width: 750rpx;
		height: 190rpx;
		margin: 0 auto;
		border-radius: 10rpx;
		box-sizing: border-box;
		overflow: hidden;
		display: flex;
		padding: 0 20rpx;
	}

	.tab-good-content {
		width: 100%;
		box-sizing: border-box;
		padding: 0;
		background: #fff;
		padding-top: 15rpx;
		margin-bottom: 20rpx;
	}

	.tab-type {
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx 10rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
	}
	.justifyStart{
		justify-content: flex-start;
		.tab-index{
			margin-right:10rpx;
			
		}
		.tab-index:last-child{
			margin-right: 0;
		}
	}
	.tab-index {
		width: 130rpx;
		height: 150rpx;
		display: flex;
		align-items: flex-start;
		position: relative;
		flex-wrap: wrap;
		justify-content: center;
	}

	.tab-img-content {
		display: flex;
		width: 87rpx;
		height: 87rpx;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.tabimg-icon{
		width: 46rpx;
		height:45rpx;
		position: absolute;
		right:-11rpx;
		top:0;
	}
	.tabimg {
		width: 87rpx;
		height: 85rpx;
	}
	.tabimg-all{
		width: 73rpx;
		height:38rpx
	}
	.tabtext {
		width: 100%;
		height: 34rpx;
		font-size: 23rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
		text-align: center;
	}

	.capsule-box {
		width: 710rpx;
		height: 154rpx;
		margin: 0 auto;
		box-sizing: border-box;
		display: flex;
		margin-top: 10rpx;
		position: relative;
	}
	.capsule-pic{
		width: 710rpx;
		height:154rpx;
		position: relative;
	}
	.capsule-pic::after {	//这里开始实现效果
		content:"";
		position: absolute;
		width:200rpx;
		height:100%;
		top:0;
		left:-100%;
		overflow: hidden;
		background: -moz-linear-gradient(left,
		rgba(255, 255, 255, 0)25%,
		rgba(255, 255, 255, .2)50%,
		rgba(255, 255, 255, 0)75%);
		background: -webkit-gradient(linear, left top, right top,
		color-stop(25%, rgba(255, 255, 255, 0)),
		color-stop(50%, rgba(255, 255, 255, .2)),
		color-stop(75%, rgba(255, 255, 255, 0)));
		background: -webkit-linear-gradient(left,
		rgba(255, 255, 255, 0)25%, 
		rgba(255, 255, 255, .2)50%, 
		rgba(255, 255, 255, 0)75%);
		background: -o-linear-gradient(left, 
		rgba(255, 255, 255, 0)25%, 
		rgba(255, 255, 255, .2)50%, 
		rgba(255, 255, 255, 0)75%);
		transform: skewX(-45deg);
		-webkit-transform: skewX(-45deg);
		-moz-transform: skewX(-45deg);
		animation:tolight 3s infinite  linear;
		-webkit-animation:tolight 3s infinite  linear;
	}

	/*光影划过动画*/
	@keyframes tolight
	{
		30% {
			left:-100%;
		}
		60% {
			left:50%;
		}
		100% {
			left:200%;
		}
	}
	@-webkit-keyframes tolight {
		30% {
			left:-100%;
		}
		60% {
			left:50%;
		}
		100% {
			left:200%;
		}
	}
	@keyframes bounce-down {
		25% {
			-webkit-transform: translateY(-5rpx);
		}

		50%,
		100% {
			-webkit-transform: translateY(0);
		}

		75% {
			-webkit-transform: translateY(5rpx);
		}
	}

	.tabc-content {
		width: 100%;
		margin: 10rpx 0;
		background: $content-bg;
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
		width: 500rpx;
		height: auto;
		border-radius: 40rpx;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0;
		z-index: 1002;
	}


	.panel-logo {
		width: 290rpx;
		height: 194rpx;
		top: -92rpx;
		position: absolute;
	}

	.panel-title {
		width: 500rpx;
		height: 188rpx;
		background: url(../../static/index/update_bg.png) no-repeat center;
		background-size: 100% 100%;
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 50rpx 0 20rpx 0;
	}

	.panel-title-text {
		width: 100%;
		text-align: center;
		font-size: 43rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #FFFFFF;
	}

	.panel-title-ver {
		width: 100%;
		text-align: center;
		font-size: 24rpx;
		font-family: FZLanTingHeiS-B-GB;
		font-weight: 400;
		color: #FFFFFF;
	}

	.panel-content {
		width: 500rpx;
		height: 420rpx;
		box-sizing: border-box;
		background: #fff;
		text-align: center;
		border-bottom-left-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
	}

	.panel-content text {
		width: 440rpx;
		height: auto;
		font-size: 28rpx;
		color: #9397A7;
		line-height: 40rpx;
		text-align: left;
	}

	.progress-content {
		width: 374rpx;
		margin: 0 auto;
		margin-top: 150rpx;
		border-radius: 7px;
		overflow: hidden;
	}

	.progress-msg {
		margin: 80rpx auto;
	}

	.progress-wait {
		width: 100%;
		text-align: center;
		font-size: 18rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #C0C0C0;
		margin-top: 18rpx;
	}

	.download-button {
		width: 400rpx;
		height: 88rpx;
		background: #FB4E3E;
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

	.goods-card-content-scroll {
		width: 100%;
		height: 250rpx;
		display: flex;
		white-space: nowrap;
		overflow: auto;
		background: #fff;
		box-sizing: border-box;
		padding: 15rpx 18rpx 15rpx 19rpx
	}

	.header-search {
		width: 383rpx;
		height: 68rpx;
		border: 2px solid #333333;
		border-radius: 5rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		position: relative;
	}

	.sousuo-icon {
		position: absolute;
		left:32rpx;
		top:50%;
		margin-top: -13rpx;
		width: 26rpx;
		height: 26rpx;
		background: url(../../static/index/v3/search.png) no-repeat center /100% 100%;
	}

	.search-icon {
		width: 113rpx;
		height: 54rpx;
		background: $btn-red;
		border-radius: 30rpx;
		position: absolute;
		right: 3rpx;
		top: 50%;
		margin-top: -27rpx;
		text-align: center;
		line-height: 54rpx;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		box-sizing: border-box;
	}
	.live-tabc{
		padding:0 70rpx;
		background:#fff;
		box-sizing:border-box;
		border-left:20rpx solid #F6F7FB;
		border-right:20rpx solid #F6F7FB;
		margin-top: 20rpx;
	}
	.live-content{
		width: 100%;
		box-sizing: border-box;
		background:$content-bg;
		padding:20rpx 20rpx 20rpx 20rpx;
	}
	/deep/.uni-scroll-view-refresher{
		background:$content-bg !important
	}
	/deep/.uni-scroll-view-refresh{
		align-items: flex-end !important;
	}
	/deep/.uni-scroll-view-refresh__spinner{
		width:50rpx !important;
		height:50rpx !important;
	}
	/deep/.uni-scroll-view-refresh__icon{
		display: none;
	}
	/deep/.uni-scroll-view-refresh-inner{
		
		background:rgba(0,0,0,0);
		box-shadow:none
	}
	/deep/.uni-scroll-view-refresh__spinner>circle{
		width: 50rpx !important;
		height:50rpx !important;
		stroke-width:6 !important;
		color:#e2e2e2 !important;
	}
	.transRef /deep/.uni-scroll-view-refresher{
		transition: all 0.5s ease-out;
	}
	/deep/.u-tabs__wrapper__nav__line{
		border-radius: 0 !important;
		bottom:18rpx !important
	}
</style>
