<template>
	<view class="content">
		<!-- 热更新 S -->
		<update/>
		<!-- 热更新 E -->
		<view class="header-banner">
			<statusbar />
			<view class="tab-header">
				<view class="header-search">
					<view class="sousuo-icon"></view>
					<u-notice-bar style="padding-left:80rpx;" @click="onClickSearch" :text="noticeList" direction="column" icon="" color="#A3A3A3" bgColor="rgba(0,0,0,0)" :duration="5000"></u-notice-bar>
					<view class="search-btn">搜索</view>
				</view>
				<navigator url="/pages/live/list" hover-class="none" class="icon-live"></navigator>
			</view>
		</view>
		<view class="tab-center">
			<statusbar />
			<navigator class="capsule-box" :url="capsule.url" hover-class="none" v-if="isDuringDate('2023-05-20', '2023-07-02')">
				<image class="capsule-pic1" :src="decodeURIComponent(capsule.pic)" mode="aspectFill"/>
			</navigator>
			
			<view class="tab-good-content">
				<swiper class="tab-swiper" :current="tabSwiperCurrent" @change="e=> tabSwiperCurrent=e.detail.current">
					<swiper-item class="tab-type">
						<view class="tab-index" v-for="(items,indexs) in indexTabList.front" :key="indexs" @click="onClickJumpUrl(items)">
							<view class="tab-img-content">
								<image class="tabimg" :class="{'tabimg-all':items.name=='全部拼团'}" :src="decodeURIComponent(items.icon)" mode=""/>
							</view>
							<view class="tabtext u-line-1">{{items.name}}</view>
						</view>
					</swiper-item>
					<swiper-item class="tab-type">
						<view class="tab-index" v-for="(items,indexs) in indexTabList.back" :key="indexs" @click="onClickJumpUrl(items)">
							<view class="tab-img-content">
								<image class="tabimg" :class="{'tabimg-all':items.name=='全部拼团'}" :src="decodeURIComponent(items.icon)" mode=""/>
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
			<u-tabs class="goods-tabs" :list="goodsTabs" :current="goodsTabCurrent" lineHeight="0" @click="clickGoodsTabs" 
				:inactiveStyle="{fontSize:'27rpx',color:'#959695',padding:'0 6rpx'}"
				:activeStyle="{fontSize:'33rpx',color:'#333333',fontWeight:600,padding:'0 6rpx'}"
			></u-tabs>
			<goodslist :goodsList="goodsList" :topAddList="goodsTabCurrent==1?topAddList:[]" :indexSwiper="indexSwiper"
				@send="onClickJumpDetails" :presell="false" :empty="goodsListEmpty" :nomore="listParams.noMoreData" />
				
		</view>
		
		<paymentSuccess :showPaySuccess.sync="showPaySuccess" :showJoin="true" />
		<winningCardPopup :show.sync="showWinningCrad" />
		<openscreenAd :show.sync="openScreenData.show" :goodData="openScreenData.data"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '@/base/BaseNode.vue';
	import { indexSwiperFront,indexSwiperBack,goodsTabs } from "@/tools/DataExchange"
	import { isDuringDate } from "@/tools/util"
	import { Md5 } from "ts-md5";
	@Component({components: {},})
	export default class index extends BaseNode {
		noticeList = [''];
		isDuringDate = isDuringDate;
		goodsTabs = goodsTabs;
		goodsTabCurrent = 1;
		indexTabList: { [x: string]: any } = {
			front:indexSwiperFront,
			back:indexSwiperBack
		};
		tabSwiperCurrent=0;
		capsule = {
			pic:'../../static/index/v3/1.png',
			url:'/pages/act/imm/index?seriesId=20&roomId='
		}
		hot = [];
		broadCastList:any = [];
		topAddList: any = [];
		indexSwiper = true;
		goodsList: any = [];
		goodsListEmpty = false;
		// fetchFrom:第几个数据开始  fetchSize:取几个数据
		listParams = {
			fetchFrom:1,
			fetchSize:10,
			noMoreData:false
		}
		onNetWorkFunc: any;
		showPaySuccess = false;
		showWinningCrad = false;
		greeted = false;
		openScreenData = {
			show:false,
			data:{}
		};
		onLoad(query: any) {
			let listeners = ['BackLogin']
			this.register(listeners);
			this.onEventUI("showPaySuccess", (res) => {
				this.showPaySuccess = true;
			});
			this.onLoadIndex()
			//#ifdef APP-PLUS
			// plus.webview.prefetchURL(app.liveWebView)//预载直播控件webview
			//#endif
		}
		onShow() {
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
			if (this.goodsList.length) {
				this.getHome()
			}
		}
		onHide() {
			uni.offNetworkStatusChange((res) => {})
		}
		private onLoadIndex() {
			if (app.dataApiDomain == '' && !app.localTest) {
				setTimeout(() => {
					this.onLoadIndex()
				}, 100);
				return;
			}
			this.initIndex()
		}
		private initIndex(cb ? : Function) {
			this.reqGoodsList()
			this.getHome(()=> cb && cb())
		}
		private reqGoodsList(){
			this.listParams.fetchFrom = 1;
			this.listParams.noMoreData = false;
			this.reqNewMainList()
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
		// 获取首页其它只请求一次的接口
		getIndexOrther() {
			if (this.greeted) return;
			this.greeted = true;
			// 获取搜索轮播
			app.http.Get('dataApi/advertising/seekRotate/list',{},(res:any)=>{
				this.noticeList = res.list
			})
			// 获取系列icon
			app.http.Get('dataApi/advertising/iconSeries/brief',{},(res:any)=>{
				this.hot = res.list
			})
			// 获取是否中卡信息
			if(app.token.accessToken != ''){
				app.http.Get('me/greet', {}, (res: any) => {
					if (res.data.broadcastActor) app.broadcastActor = res.data.broadcastActor
					if (res.data.newHitNum > 0) {
						this.showWinningCrad = true;
						uni.hideTabBar()
					};
				})
			}
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
				this.topAddList = data.addList || [];
				this.broadCastList = data.broadCast || [];
				
				this.getIndexOrther()
				cb && cb()
			})
		}
		clickGoodsTabs({index}:any){
			if(this.goodsTabCurrent == index) return;
			if(index == 0 && app.token.accessToken == '') {
				const old = this.goodsTabCurrent;
				this.goodsTabCurrent = index;
				setTimeout(()=>{
					this.goodsTabCurrent = old;
				},500)
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}
			this.goodsTabCurrent = index;
			this.reqGoodsList()
		}
		reqNewMainList(cb ? : Function) {
			const { fetchFrom, fetchSize, noMoreData } = this.listParams
			if (noMoreData) return;
			const urlNamr = goodsTabs[this.goodsTabCurrent].url;
			const ts = Math.floor(new Date().getTime() / 1000);
			const params: { [x: string]: any } = {
				fetchFrom,
				fetchSize,
				ts: ts,
				s:Md5.hashStr(`kww_goodlist_sign_${urlNamr}_${fetchFrom}_${fetchSize}_${ts}_2022`)
			}
			app.http.Get(`dataApi/goodlist/forsale/${urlNamr}`, params, (data: any) => {
				this.listParams.noMoreData = data.isFetchEnd;
				if (fetchFrom == 1) this.goodsList = [];

				if (data.goodList) {
					const list = fetchFrom == 1 ? data.goodList : [...this.goodsList,...data.goodList];
					this.goodsList = app.platform.removeDuplicate(list,'goodCode')
				}
				this.goodsListEmpty = this.goodsList.length==0;
				this.listParams.fetchFrom += fetchSize;
				cb && cb()
			});
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
		onClickJumpUrl(item: any) {
			if (['卡币商城','领券中心','商家列表','领券中心','发售日历'].includes(item.name)) {
				if (app.token.accessToken == '') {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
			}
			uni.navigateTo({
				url: item.url
			})
		}
		// 跳转商品详情
		onClickJumpDetails(goodCode: any) {
			app.navigateTo.goGoodsDetails(goodCode)
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
		box-sizing: border-box;
		padding-top: 104rpx;
		padding-bottom:104rpx;
		padding-bottom: calc(104rpx + constant(safe-area-inset-bottom));
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
		padding: 0 35rpx 0 20rpx;
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
		padding-top: 27rpx;
		padding-bottom: 20rpx;
	}

	.tab-type {
		width: 100%;
		height:140rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.tab-swiper{
		width: 100%;
		height:140rpx;
		padding:0 30rpx 10rpx 30rpx;
		box-sizing: border-box;
	}
	.swiper_indicator_line{
		width: 80rpx;
		height:8rpx;
		border-radius: 3rpx;
		background:#E6E6E6;
		margin:0 auto;
		margin-top: 10rpx;
		margin-bottom: 30rpx;
	}
	.swiper_indicator_bar{
		width: 40rpx;
		height:8rpx;
		border-radius: 3rpx;
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
		height: 150rpx;
		display: flex;
		align-items: flex-start;
		position: relative;
		flex-wrap: wrap;
		justify-content: center;
		margin-right: 10rpx;
	}
	.tab-index:nth-child(5n){
		margin-right: 0;
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
		width: 50rpx;
		height:39rpx;
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
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		text-align: center;
	}
	.capsule-box {
		width: 100%;
		height: 220rpx;
		box-sizing: border-box;
		display: flex;
		position: relative;
		background: #fff;
		padding:20rpx 20rpx 0 20rpx;
	}
	.capsule-pic1{
		width: 710rpx;
		height:200rpx;
		z-index: 5;
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
		width: 614rpx;
		height: 71rpx;
		border: 3rpx solid #333333;
		border-radius: 5rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		position: relative;
		box-sizing: border-box;
		padding-right: 10rpx;
	}
	.search-btn{
		width: 100rpx;
		height: 52rpx;
		background: #FA1545;
		border-radius: 5rpx;
		font-size: 29rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		text-align: center;
		line-height: 52rpx;
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
		margin-bottom: 20rpx;
	}
</style>
