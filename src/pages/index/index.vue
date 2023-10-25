<template>
	<view class="content">
		<!-- 热更新 S -->
		<update/>
		<!-- 热更新 E -->
		<u-sticky offsetTop="0rpx" customNavHeight="0px">
			<view class="header-banner">
				<statusbar/>
				<view class="tab-header">
					<view class="header-search">
						<image class="searchbox-icon" src="@/static/index/search.png"/>
						<view class="sousuo-icon"></view>
						<u-notice-bar style="padding-left:80rpx;" @click="onClickSearch" :text="noticeList" direction="column" icon="" color="#A3A3A3" bgColor="rgba(0,0,0,0)" :duration="5000"></u-notice-bar>
						<view class="search-btn">搜索</view>
					</view>
					<navigator url="/pages/live/list" hover-class="none" class="icon-live"></navigator>
				</view>
			</view>
		</u-sticky>
		<scroll-view class="index-swiper-scroll transRef" :style="{ width: '100%', height: scrollHeight+'px' }" :refresher-threshold="45" :refresher-enabled="true" :scroll-y="true" :scroll-with-animation="true" :scroll-top="scrollTop" :refresher-triggered="triggered" @scroll="onChangeScroll" @touchend="touchmoveScroll"  @scrolltolower="scrolltolower()" @refresherrefresh="refreshStart()">
			<view class="tab-center">
				<swiper v-show="addList.top.length" :indicator-dots="true" :indicator-active-color="'#fff'" :indicator-color="'rgba(170, 170, 170, .75)'" class="capsule-box"  :current="capsuleCurrent" autoplay circular @change="e=> capsuleCurrent=e.detail.current">
					<swiper-item v-for="(item,index) in addList.top" :key="index">
						<image class="capsule-pic" :src="decodeURIComponent(item.pic)" mode="aspectFill" @click="onClickToAD(item.target)"/>
					</swiper-item>
				</swiper>
				<view class="tab-good-content">
					<swiper class="tab-swiper" :current="tabSwiperCurrent" @change="e=> tabSwiperCurrent=e.detail.current">
						<swiper-item class="tab-type">
							<view class="tab-index" v-for="(items,indexs) in indexMenu.front" :key="indexs" @click="onClickJumpUrl(items)">
								<view class="tab-img-content">
									<image class="tabimg" :src="items.icon" mode="aspectFit"/>
								</view>
								<view class="tabtext u-line-1">{{items.name}}</view>
							</view>
						</swiper-item>
						<swiper-item class="tab-type">
							<view class="tab-index" v-for="(items,indexs) in indexMenu.back" :key="indexs" @click="onClickJumpUrl(items)">
								<view class="tab-img-content">
									<image class="tabimg" :src="items.icon" mode="aspectFit"/>
								</view>
								<view class="tabtext u-line-1">{{items.name}}</view>
							</view>
						</swiper-item>
					</swiper>
					<view class="swiper_indicator_line">
						<view class="swiper_indicator_bar" :class="{'swiper_indicator_bar_right':tabSwiperCurrent==1}"></view>
					</view>
					<!-- 拼团进度 最新上架 新手体验 拆卡围观 -->
					<indexHot :hot="hot" :broadCastList="broadCastList"/>
				</view>
				<u-sticky customNavHeight="0" offsetTop="-20rpx">
					<u-tabs class="goods-tabs" :list="goodsTabs" :current="goodsTabCurrent" lineHeight="0" @click="clickGoodsTabs"
						:inactiveStyle="{fontSize:'27rpx',color:'#C0C0C0',padding:'0 0'}"
						:activeStyle="{fontSize:'32rpx',color:'#333333',fontWeight:600,padding:'0 0'}"
					></u-tabs>
				</u-sticky>
				<goodsListSwiper ref="listSwiper" :tabs="goodsTabs" :tabCurrent.sync="goodsTabCurrent" :addList="addList.index" @followed="checkFollowed"/>
			</view>
		</scroll-view>
		<paymentSuccess :showPaySuccess.sync="showPaySuccess" :showJoin="true" />
		<winningCardPopup :show.sync="showWinningCrad" />
		<openscreenAd :show.sync="openScreenData.show" :goodData="openScreenData.data"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '@/base/BaseNode.vue';
	import { indexMenu,goodsTabs } from "@/tools/DataExchange"
	import update from './component/index/update.vue'
	import indexHot from './component/index/indexHot.vue'
	import winningCardPopup from './component/index/winningCardPopup.vue'
	import openscreenAd from './component/index/openscreenAd.vue'
	import goodsListSwiper from './component/index/goodsListSwiper.vue'
	@Component({components: {
		update,
		indexHot,
		winningCardPopup,
		openscreenAd,
		goodsListSwiper
	},})
	export default class Index extends BaseNode {
		noticeList = [''];
		indexMenu = indexMenu;
		goodsTabs = goodsTabs;
		goodsTabCurrent = 1;
		capsuleCurrent = 0;
		tabSwiperCurrent=0;
		hot = [];
		broadCastList:any = [];
		addList:any = {
			top:[],
			index:[]
		}
		showPaySuccess = false;
		showWinningCrad = false;
		greeted = false;
		openScreenData = {
			show:false,
			data:{}
		};
		triggered=false;
		scrollFresh = false;
		scrollTop = 0;
		scrollTopNum = 0;
		showIndex = false;
		onLoad(query: any) {
			let listeners = ['BackLogin']
			this.register(listeners);
			this.onEventUI("showPaySuccess", (res) => {
				this.showPaySuccess = true;
			});
			this.onLoadIndex();
			//#ifdef APP-PLUS
			// plus.webview.prefetchURL(app.liveWebView)//预载直播控件webview
			//#endif
		}
		onShow() {
			setTimeout(()=>{
				this.showIndex = true;
			},500)
			uni.showTabBar({ animation: false })
			// #ifdef APP-PLUS
			this.networkStatusChange()
			// #endif
			// 销毁页面重新加载
			if (uni.getStorageSync('reLaunch')) {
				this.initIndex(() => {
					uni.removeStorageSync('reLaunch')
				})
			}
			app.platform.getNetworkType()
			this.getHome()
		}
		onHide() {
			this.showIndex = false;
			uni.offNetworkStatusChange((res) => {})
		}
		onTabItemTap(item:any){
			if(item.index!=0 || !this.showIndex) return;
			if (this.scrollTopNum>0) { 
				this.scrollTop=0;
				this.refreshStart(()=>{
					this.scrollTop=1;
					this.scrollTopNum = 0;
				})
            }
		}
		scrolltolower(){
			this.$refs.listSwiper.reqNewMainList()
		}
		public get scrollHeight() : number {
			let tabbarHeight = 0;
			// #ifdef H5
			tabbarHeight = 52
			// #endif
			//#ifdef APP-PLUS
			tabbarHeight = plus.navigator.getSafeAreaInsets().deviceBottom || 0;
			//#endif
			const { screenHeight, statusBarHeight, platform } = app.platform.systemInfo;
			return screenHeight - uni.upx2px(104) - (statusBarHeight||0) - tabbarHeight -( platform== 'android'?52:0 );
		}
		private onLoadIndex() {
			if (app.dataApiDomain == '' && !app.localTest) {
				setTimeout(() => {
					this.onLoadIndex()
				}, 100);
				return;
			}
			// 获取系列icon
			app.http.Get('dataApi/advertising/iconSeries/brief',{},(res:any)=>{
				this.hot = res.list
			})
			this.initIndex()
		}
		private initIndex(cb ? : Function) {
			this.getHome(()=> cb && cb())
		}
		onChangeScroll(event:any){
			this.scrollFresh = false
			if(!this.triggered){
				if(event.detail.scrollTop<=-45){
					this.scrollFresh = true;
					return;
				}
				if(event.detail.scrollTop>=0){
					this.scrollTopNum = event.detail.scrollTop;
				}
			}
		}
		touchmoveScroll(){
			if(this.scrollFresh){
				this.refreshStart();
			}
		}
		refreshStart(cb?:Function){
			uni.$u.throttle(()=>{
				this.triggered=true;
				this.scrollFresh = false;
				this.initIndex(() => {
					this.$refs.listSwiper.reload();
					cb?.();
					setTimeout(() => {
						this.triggered=false
					}, 1000)
				})
			},1000)
		}
		onClickToAD(target:any){
			app.navigateTo.navigateToAD(target)
		}
		// 监听网络
		networkStatusChange() {
			// #ifdef APP-PLUS
			uni.onNetworkStatusChange((res) => {
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
		// 获取首页其它只请求一次的接口
		getIndexOrther() {
			if (this.greeted) return;
			this.greeted = true;
			// 获取搜索轮播
			app.http.Get('dataApi/advertising/seekRotate/list',{},(res:any)=>{
				this.noticeList = res.list
			})
			
			if(app.token.accessToken != ''){
				// 获取是否中卡信息
				app.http.Get('me/greet', {}, (res: any) => {
					if (res.data.broadcastActor) app.broadcastActor = res.data.broadcastActor
					if (res.data.newHitNum > 0) {
						this.showWinningCrad = true;
						uni.hideTabBar()
					};
				})
				// 我的关注商家是否有新商品
				app.http.Get('me/fresh/followed_merchant_goods/light',{},(res:any)=>{
					this.goodsTabs[0].badge!.isDot = res.bright
				})
			}
			setTimeout(()=>{
				app.platform.getGuideData()
			},200)
			// 开屏商品广告
			const openScreenCode = uni.getStorageSync('openScreenCode') || [];
			app.http.Post('openscreen/ad/get',{already_good_codes:openScreenCode},(res:any)=>{
				if(res.data){
					const storageCode = app.platform.removeArrRepeat(openScreenCode,res.not_sale_good_codes??[])
					uni.setStorageSync('openScreenCode',[...storageCode,res.data.good_code]);
					this.openScreenData = { show:true, data:res.data };
					uni.hideTabBar()
				}
			})
		}
		getHome(cb?:Function){
			app.http.Get("dataApi/home", {}, (data: any) => {
				uni.hideLoading()
				if(data.addList){
					this.addList = {
						top:data.addList.filter((x:any)=>x.location==3) || [],
						index:data.addList.filter((x:any)=>x.location==0) || []
					}
				}
				this.broadCastList = data.broadCast || [];
				setTimeout(() => {
					this.getIndexOrther()
				}, 300);
				cb && cb()
			})
		}
		clickGoodsTabs({index}:any){
			if(this.goodsTabCurrent == index) return;
			this.goodsTabCurrent = index;
		}
		checkFollowed(){
			if(this.goodsTabs[0].badge!.isDot){
				this.goodsTabs[0].badge!.isDot = false;
				app.http.Post('me/fresh/followed_merchant_goods/light/turnoff',{})
			}
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
		onClickJumpUrl({ needLogin, name, url }: any) {
			if (needLogin) {
				if (app.token.accessToken == '') {
					app.login.arouseLogin()
					return;
				}
			}
			if(name=="玩家卡册"){
				uni.setStorageSync('showKace', true);
				app.navigateTo.switchTab(2)
				return;
			}
			uni.navigateTo({ url })
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
	.index-swiper-scroll{
		// #ifdef APP-PLUS
		box-sizing: border-box;
		// #endif
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
		transition: height 0.2s ease-out;
	}
	/deep/.u-tabs__wrapper__nav__line{
		border-radius: 0 !important;
		bottom:18rpx !important
	}
	.absolute {
		position: relative;
	}
	.tab-center {
		width: 100%;
		box-sizing: border-box;
		padding-top: 10rpx;
		background:#fff;
		.center-top{
			width: 100%;
			height:104rpx;
			background:#fff;
		}
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
		position: relative;
		left: 0;
		top: 0;
		box-sizing: border-box;
		z-index: 9;
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
		padding-bottom: 10rpx;
	}

	.tab-type {
		width: 100%;
		height:160rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.tab-swiper{
		width: 100%;
		height:160rpx;
		padding:5rpx 30rpx 10rpx 30rpx;
		box-sizing: border-box;
	}
	.swiper_indicator_line{
		width: 70rpx;
		height:8rpx;
		background:#E6E6E6;
		margin:0 auto;
		margin-top: 10rpx;
		margin-bottom: 30rpx;
	}
	.swiper_indicator_bar{
		width: 35rpx;
		height:8rpx;
		background:#FA1545;
		transition: all 0.3s linear;
		transform: translateX(0);
	}
	.swiper_indicator_bar_right{
		transform: translateX(40rpx);
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
		height: 160rpx;
		display: flex;
		align-items: flex-start;
		position: relative;
		flex-wrap: wrap;
		justify-content: center;
		margin-right: 12rpx;
	}
	.tab-index:nth-child(5n){
		margin-right: 0;
	}
	.tab-img-content {
		display: flex;
		width: 122rpx;
		height: 122rpx;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.tabimg {
		width: 122rpx;
		height: 122rpx;
	}
	.tabtext {
		width: 100%;
		height: 34rpx;
		font-size: 23rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		text-align: center;
		margin-top: -21rpx;
		position: relative;
		z-index: 6;
	}
	.capsule-box {
		width: 100%;
		height: 200rpx;
		box-sizing: border-box;
		display: flex;
		position: relative;
		background: #fff;
		padding:0rpx 20rpx 0rpx 20rpx;
		border-radius: 5rpx;
		margin-bottom: 32rpx;
	}
	.capsule-pic{
		width: 710rpx;
		height:200rpx;
		z-index: 5;
		border-radius: 5rpx;
	}
	.tabc-content {
		width: 100%;
		margin: 10rpx 0;
		background: $content-bg;
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
	.tab-header {
		width: 750rpx;
		height: 104rpx;
		display: flex;
		box-sizing: border-box;
		padding: 0 35rpx 0 20rpx;
		z-index: 10;
		align-items: center;
		justify-content: space-between;
	}
	.header-search {
		width: 613rpx;
		height: 71rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		position: relative;
		padding-right: 10rpx;
	}
	
	.searchbox-icon{
		width: 613rpx;
		height: 71rpx;
		position: absolute;
		left:0;
		top:0;
	}
	.search-btn{
		width: 98rpx;
		height: 49rpx;
		background: #FA1545;
		border-radius: 5rpx;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
		line-height: 54rpx;
		margin-top: -1rpx;
	}
	.icon-live{
		width: 51rpx;
		height:52rpx;
		background: url(@/static/index/v3/icon_live.png) no-repeat center / 100% 100%;
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
		transition: height 0.2s ease-out;
	}
	/deep/.u-tabs__wrapper__nav__line{
		border-radius: 0 !important;
		bottom:18rpx !important
	}
	.goods-tabs{
		width: 100%;
		background:#fff;
	}
</style>
