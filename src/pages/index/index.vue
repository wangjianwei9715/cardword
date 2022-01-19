<template>
	<view class="content">
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
					<view class="progress-content"><progress :percent="wgtUpNum" active-mode="forwards" active stroke-width="6" border-radius="20px" activeColor="#FB4E3E" /></view>
					<view class="progress-wait">正在更新中，请您耐心等待...</view>
				</view>
			</view>
		</view>
		
		<view class="header-banner" >
			<statusbar/>
			<view class="tab-header">
				<view class="header-search" @click="onClickSearch">
					搜索商品、商家
					<view class="search-icon">搜索</view>
				</view>
			</view>
		</view>
		
		<view class="tab-center">
			<statusbar/>
			<view class="banner-content">
				
				<swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" indicator-active-color="#ffffff" duration="200"> 
					<swiper-item v-for="(item,index) in topAddList" :key="index">
						<image class="swiper-image" :src="decodeURIComponent(item.pic)" mode="aspectFits" @click="onClickTopJumpUrl(item.target)"/>
					</swiper-item>
					
				</swiper>
			</view>
			<!-- #ifndef MP  -->
			<view class="tab-good-content">
				<view class="tab-type">
					<view class="tab-index" v-for="(item,index) in tabList" :key="index" @click="onClickJumpUrl(item)">
						<view class="tab-img-content"><image class="tabimg" :src="item.img" mode=""/></view>
						<view class="tabtext">{{item.text}}</view>
					</view>
				</view>
				
				<view class="tab-act-content">
					<view class="tab-act-title"></view>
					<scroll-view class="goods-card-content-scroll" :scroll-x="true">
						<view class="tab-good-inedx" v-show="item.img!=''" v-for="(item,index) in noticeList" :key="index" @click="onClickNotice(item.target.goodCode)">
							<image class="tab-good-index-img" :src="decodeURIComponent(item.pic)" mode="aspectFill"/>
							<view class="tab-good-index-bottom">
								<view class="tab-good-index-price">￥{{item.price}}</view>
								<view class="tab-good-index-tip">{{item.name}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<!-- #endif -->
		</view>
		<!-- #ifndef MP  -->
		<view class="tabc-content">
			<tabs :tabs="goodTab" :tabsCheck="goodTabCheck" @tabsClick="onClickListTabs"></tabs>
		</view>
		
		<view class="goodslist-index">
			<goodslist  :goodsList="goodsList" :pageIndex="currentPage" @progress="getGoodProgress" :pagescroll="pagescroll"  @send="onClickJumpDetails" :presell="false"/>
		</view>
		<!-- #endif -->

		<!-- #ifdef MP -->
		<view class="goodslist-index">
			<goodslist  :goodsList="goodsMiniList" :pageIndex="currentPage"  @send="onClickMiniGood" :mini="true" :presell="false"/>
		</view>
		<!-- #endif -->

		<paymentSuccess :showPaySuccess="showPaySuccess" :showJoin="true" @cancelPaySuccess="onClickcancelPaySuccess"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '@/base/BaseNode.vue';
	@Component({})
	export default class index extends BaseNode {
		statusBarHeight = app.statusBarHeight;
		topAddList:any = [];
		goodsMiniList = [
			{
				currentNum:0,
				discount: "",
				goodCode: "GT4228482",
				lockNum: 0,
				overAt: 0,
				pic: "../../static/index/mp_mini_good.jpg",
				price: 99999,
				startAt: 0,
				title: "20-21 篮球 Panini National Treasures  Hobby  原箱",
				totalNum: 1

			}
		]
		tabList = [
			{img:'../../static/index/tab0.png',text:'拼团',url:'/pages/goods/goods_find_list?classType=100'},
			{img:'../../static/index/tab1.png',text:'资讯',url:'/pages/information/list'},
			{img:'../../static/index/tab2.png',text:'卡豆商城',url:'/pages/act/sign/cardBean'},
			{img:'../../static/index/tab3.png',text:'商家列表',url:'/pages/userinfo/merchant_list'},
		];
		noticeList = [
		
		];
		goodTab = [
			{id:1,name:'推荐'},
			{id:11,name:'自选'},
			{id:3,name:'新品'},
			{id:4,name:'高端'},
			{id:2,name:'即将拼成'},
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
		showPaySuccess = false;
		version = '';
		oneLoad = true;
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
				console.log(JSON.parse(decodeURIComponent(paydata)))
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

			this.onEventUI("apkNeedUpdate", () => {
				this.updateShow();
			});

			this.onEventUI("wgtNeedUpdate", () => {
				this.wgtUpdateShow();
			});
			this.onEventUI("wgtUpdateNum", (res) => {
				this.wgtUpNum = res;
			});
			// #ifdef APP-PLUS
			// 判断是否有邀请上线
			app.platform.getInvitationClipboard()
			// #endif
		}
		onShow(){
			// #ifndef MP
			if(this.oneLoad){
				this.oneLoad = false;
				setTimeout(()=>{
					this.version = app.version
					this.showInitEvent()
				},1000)
			}else{
				this.showInitEvent()
			}
			
			// #endif
			// #ifdef MP
			this.topAddList = [{pic:'../../static/index/mp_mini.jpg',url:''}]
			// #endif
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
		showInitEvent(){
			this.currentPage = 1;
			this.noMoreData = false;
			this.initEvent()
			if(this.progressList!=''){
				this.getGoodProgress(this.progressList)
			}
		}
		initEvent(){
			app.http.Get("dataApi/home", {}, (data: any) => {
				console.log('index/home====',data)
				// #ifndef MP
				this.topAddList = data.topAddList
				// #endif
				this.noticeList = data.activity
				this.reqNewData()
			})
			// #ifdef MP-WEIXIN
			if(app.token.accessToken == ''){
				app.platform.wechatLogin();
				return;
			}
			// #endif
		}
		getPic(img:any){
			if(img.indexOf(',') == -1){
				return img;
			}else{
				let pic = img.split(',')
				return pic[0]
			}
		}
		onClickMiniGood(){
			uni.showToast({
				title:'商品正在筹备中',
				icon:'none'
			})
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
			if(app.localTest){
				return
			}
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
			if (uni.getSystemInfoSync().platform == 'ios'){
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
		}
		BackLogin(res:any){
			uni.$emit('BackLogin');
		}
		Logout(res:any){
		}
		onClickNotice(code:any){
			this.onClickJumpDetails(code)
		}
		
		onClickSearch(){
			// 搜索
			uni.navigateTo({
				url: '/pages/goods/goods_find'
			})
		}
		onClickTopAdd(){
			// uni.showToast({
			// 	title:'活动升级中',
			// 	icon:'none'
			// })
		}
		onClickTopJumpUrl(url:any){
			if(url.goodCode!=''){
				uni.navigateTo({
					url: '/pages/goods/goods_details?id='+decodeURIComponent(url.goodCode)
				})
				return;
			}else if(url.url!=''){
				uni.navigateTo({
					url: '/pages/act/outLink/outLink?url='+decodeURIComponent(url.url)
				})
				return;
			}else if(url.page!=''){
				if(decodeURIComponent(url.page)=='社群'){
					this.showPaySuccess = true;
					return;
				}
				uni.navigateTo({
					url: decodeURIComponent(url.page)
				})
				return;
			}
			// if(url=='社群'){
			// 	this.showPaySuccess = true;
			// 	return;
			// }
			// uni.navigateTo({
			// 	url: url
			// })
			
		}
		onClickcancelPaySuccess(){
			this.showPaySuccess = false;
		}
		onClickJumpUrl(item:any){
			uni.navigateTo({
				url: item.url
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
		width: 710rpx;
		padding:0 20rpx 0 24rpx;
		padding-bottom: 20rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		background: linear-gradient(90deg, #E7F1FB, #E8E4FA);
		margin:0 auto;
	}
	.tab-act-title{
		width: 281rpx;
		height:44rpx;
		background:url(../../static/index/act_title.png) no-repeat;
		background-size: 100% 100%;
		margin:0 auto;
		margin-bottom: 15rpx;
	}
	.tab-good-inedx{
		width:170rpx;
		height:230rpx;
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
		margin-top: 2rpx;

	}
	.tab-good-index-price{
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 0;
		color: #FB4E3E
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
		background:url(../../static/index/update_bg.png) no-repeat center;
		background-size: 100% 100%;
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding:50rpx 0 20rpx 0;
	}
	.panel-title-text{
		width: 100%;
		text-align: center;
		font-size: 43rpx;
		font-family: FZLanTingHei-H-GBK;
		font-weight: 400;
		color: #FFFFFF;
	}
	.panel-title-ver{
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
		background:#fff;
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
	.progress-content{
		width: 374rpx;
		margin:0 auto;
		margin-top: 150rpx;
		border-radius: 7px;
		overflow: hidden;
	}
	.progress-msg{
		margin:80rpx auto;
	}
	.progress-wait{
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
	.goods-card-content-scroll{
		width: 100%;
		height:250rpx;
		display: flex;
		white-space: nowrap;
		overflow: auto;
		background:#fff;
		box-sizing: border-box;
		padding:15rpx 18rpx 15rpx 19rpx
	}
	.header-search{
		width: 708rpx;
		height: 62rpx;
		background: #FFFFFF;
		border: 2rpx solid #FB4E3E;
		border-radius: 40rpx;
		position: relative;
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #ABABBB;
		line-height: 62rpx;
		box-sizing: border-box;
		padding-left: 34rpx;
		
	}
	.search-icon{
		width: 113rpx;
		height: 62rpx;
		background: #FB4E3E;
		border-radius: 30rpx;
		position: absolute;
		right:-1rpx;
		top:-1rpx;
		text-align: center;
		line-height: 62rpx;
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		box-sizing: border-box;
	}
</style>
