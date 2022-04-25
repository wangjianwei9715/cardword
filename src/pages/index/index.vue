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
					<view class="sousuo-icon"></view>搜索热门系列...
					<view class="search-icon">搜索</view>
				</view>
			</view>
		</view>
		
		<view class="tab-center">
			<statusbar/>
			<!-- #ifndef MP  -->
			<view class="tab-good-content">
				<view class="tab-type" v-for="(item,index) in tabList" :key="index">
					<view class="tab-index" v-for="(items,indexs) in item" :key="indexs" @click="onClickJumpUrl(items)">
						<view class="tab-img-content"><image class="tabimg" :src="items.img" mode=""/></view>
						<view class="tabtext">{{items.text}}</view>
					</view>
				</view>
				
				<view class="top-banner" @click="onClickActJump" v-if="isDuringDate('2022-04-24', '2022-05-10')">
					<view class="top-ref"></view>
				</view>

				<!-- 卡豆商城 热门系列 拆卡围观 -->
				<tabHot :hotList="hotList" />
			</view>
			<!-- #endif -->
		</view>
		<!-- #ifndef MP  -->
		<view class="tabc-content">
			<tabs :tabs="goodTab" :tabsCheck="goodTabCheck" @tabsClick="onClickListTabs"></tabs>
		</view>
		
		<view class="goodslist-index">
			<goodslist  :goodsList="goodsList" :topAddList="topAddList" :indexSwiper="indexSwiper"  @progress="getGoodProgress" :pagescroll="pagescroll"  @send="onClickJumpDetails" :presell="false"/>
		</view>
		<!-- #endif -->

		<!-- #ifdef MP -->
		<view class="goodslist-index">
			<goodslist  :goodsList="goodsMiniList"   @send="onClickMiniGood" :mini="true" :presell="false"/>
		</view>
		<!-- #endif -->

		<paymentSuccess :showPaySuccess="showPaySuccess" :showJoin="true" @cancelPaySuccess="onClickcancelPaySuccess"/>

		<winningCardPopup :showWinningCrad="showWinningCrad" @closeWinning="closeWinning" />
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '@/base/BaseNode.vue';
	import { indexGoodsType,goodsMiniList } from "@/net/DataExchange"
	import { isDuringDate } from "@/tools/util" 
	@Component({})
	export default class index extends BaseNode {
		isDuringDate = isDuringDate;
		indexGoodsType = indexGoodsType;
		goodsMiniList = goodsMiniList;
		statusBarHeight = app.statusBarHeight;
		topAddList:any = [];
		tabList:{[x:string]:any} = {
			tabTop:[
				{img:'../../static/index/v2/top_icon0.gif',text:'全部拼团',url:'/pages/goods/goods_find_list?classType=100'},
				{img:'../../static/index/v2/top_icon1.png',text:'发售日历',url:'/pages/act/calendar/list'},
				{img:'../../static/index/v2/top_icon2.png',text:'资讯公告',url:'/pages/information/list'},
				{img:'../../static/index/v2/top_icon3.png',text:'商家列表',url:'/pages/userinfo/merchant_list'}
			],
			tabBottom:[
				{img:'../../static/index/v2/top_icon4.png',text:'活动专区',url:'/pages/goods/goods_assign_list?type=activity'},
				{img:'../../static/index/v2/top_icon5.png',text:'新手专区',url:'/pages/goods/goods_assign_list?type=cheap'},
				{img:'../../static/index/v2/top_icon6.png',text:'自选玩法',url:'/pages/goods/goods_assign_list?type=select'},
				{img:'../../static/index/v2/top_icon7.png',text:'即将拼成',url:'/pages/goods/goods_assign_list?type=progress'}
			]
		};
		// 卡豆商城 热门系列 拆卡围观
		hotList:{[x:string]:any} = {
			cardBean:{
				title:'卡币商城',
				tips:'卡币兑换好礼',
				list:[
					{pic:'../../static/index/v2/cardbean_pic.png'},
					{pic:'../../static/index/v2/cardbean_hb.png'}
				]
			},
			hot:{
				title:'热门系列',
				tips:'新系列上市',
				list:[]
			},
			broadCast:{
				title:'拆卡围观',
				tips:'正在拆卡',
				list:[]
			}
		};
		goodTab = [
			{id:1,name:'推荐'},
			{id:2,name:'篮球'},
			{id:3,name:'足球'},
			{id:4,name:'其他'}
		];
		goodTabCheck = 1;
		indexSwiper = true;
		goodsList:any = [];
		// fetchFrom:第几个数据开始  fetchSize:取几个数据
		fetchFrom = 1;
		fetchSize = 10;
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
		showWinningCrad = false;
		onLoad(query:any) {
			// uni.$emit('reLogin')
			if (app.update.apkNeedUpdate) {
				this.updateShow();
				return;
			}
			if(query.id){
				app.platform.launchMiniProgramLive(query.id)
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
			this.getLuanchApp()
			
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
			this.onEventUI('appluanchOver',()=>{
				if(this.oneLoad){
					this.version = app.version
					this.showInitEvent()
					this.oneLoad = false;
				}
			})
			// #ifdef APP-PLUS
			
		}
		onShow(){
			// 销毁页面重新加载
			if(uni.getStorageSync('reLaunch')||(this.goodTabCheck==1&&this.goodsList=='')){
				this.showInitEvent(()=>{
					uni.removeStorageSync('reLaunch')
				})
			}
			// #ifndef MP
			if (app.localTest) {
				//开发环境
				if(this.oneLoad){
					this.version = app.version
					this.showInitEvent()
					this.oneLoad = false;
				}
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
								} else if (res.cancel) {
								}
							}
						});
					}
				}
			});
			if(this.goodsList!=''){
				let list = this.goodsList.map((x:any)=>{
					return x.goodCode;
				})
				app.http.Post('good/progress/list',{list:list},(res:any)=>{
					console.log('good/progress/list',res)
					this.setNewProgress(res.list)
				})
			}
			if(this.progressList!=''){
				this.getGoodProgress(this.progressList)
			}
			this.networkStatusChange()
			// 判断是否有邀请上线
			app.platform.getInvitationClipboard()
			// #endif
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
			this.showInitEvent(()=>{
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
						uni.hideLoading();
					},1000)
				}
			})
			// #endif
		}
		showInitEvent(cb?:Function){
			this.fetchFrom = 1;
			this.noMoreData = false;
			this.initEvent(()=>{
				if(cb) cb()
			})
			if(app.token.accessToken != ''){
				// 获取是否中卡信息
				this.getGreet()
			}
		}
		// 获取是否中卡信息
		getGreet(){
			app.http.Get('me/greet',{},(res:any)=>{
				console.log('me/greet=',res)
				if(res.data.newHitNum>0) this.showWinning();
				if(res.data.getDayGift) app.http.Get('me/coupon/dayGift',{});
			})
		}
		showWinning(){
			this.showWinningCrad = true;
			uni.hideTabBar()
		}
		closeWinning(){
			this.showWinningCrad = false
			uni.showTabBar()
		}
		initEvent(cb?:Function){
			app.http.Get("dataApi/home", {}, (data: any) => {
				console.log('index/home====',data)
				// #ifndef MP
				this.topAddList = data.addList;
				this.hotList.broadCast.list = data.broadCast;
				this.hotList.hot.list = data.hotSeries;
				// #endif
				this.reqNewData(()=>{
					if(cb) cb()
				})
			})
			// #ifdef MP-WEIXIN
			if(app.token.accessToken == ''){
				app.platform.wechatLogin();
				return;
			}
			// #endif
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
					this.setNewProgress(res.list)
				})
			},30)
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
					app.platform.appLuanch(loginToken)
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
		onClickActJump(){
			uni.navigateTo({
				url: '/pages/act/goldRank/goldRank_rankList'
			})
		}
		onClickSearch(){
			// 搜索
			uni.navigateTo({
				url: '/pages/goods/goods_find'
			})
		}
		onClickcancelPaySuccess(){
			this.showPaySuccess = false;
		}
		onClickJumpUrl(item:any){
			if(item.text=='发售日历'){
				if(app.token.accessToken == ''){
					uni.navigateTo({
						url:'/pages/login/login'
					})
					return;
				}
			}
			console.log(item.url)
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
			this.indexSwiper = id==1?true:false;
			this.goodTabCheck = id
			this.reqSearchList()
		}
		reqSearchList(cb?:Function){
			this.fetchFrom = 1;
			this.noMoreData = false;
			this.reqNewData(()=>{
				if(cb) cb()
			}) 
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			
			let params:{[x:string]:any} = {
				fetchFrom:this.fetchFrom,
				fetchSize:this.fetchSize
			}
			
			app.http.Get("dataApi/goodlist/forsale/"+this.indexGoodsType[this.goodTabCheck], params, (data: any) => {
				if(data.isFetchEnd){
					this.noMoreData = true;
				}
				if(this.fetchFrom == 1 ) this.goodsList = [];
				
				if(data.goodList){
					this.goodsList = [...this.goodsList,...data.goodList];
				}
				this.fetchFrom += this.fetchSize;
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
		background:$content-bg
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
		padding-top: 94rpx;
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
	}
	.tab-header{
		width: 750rpx;
		height:104rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 20rpx 0 20rpx;
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
	
	.tab-good-content{
		width: 100%;
		box-sizing: border-box;
		padding:0;
		background:#fff;
	}

	.tab-type{
		width: 100%;
		box-sizing: border-box;
		padding:0 44rpx 10rpx 44rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.tab-index{
		width: 105rpx;
		height:150rpx;
		display: flex;
		align-items: flex-start;
		position: relative;
		flex-wrap: wrap;
		justify-content: center;
	}
	.tab-img-content{
		display: flex;
		width: 105rpx;
		height:105rpx;
		align-items: flex-start;

	}
	.tabimg{
		width: 105rpx;
		height:105rpx;
	}
	.tabtext{
		width: 100%;
		height:34rpx;
		font-size: 23rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #14151A;
		text-align: center;
	}

	.top-banner{
		width: 750rpx;
		height:169rpx;
		margin: 0 auto;
		box-sizing: border-box;
		display: flex;
		margin-top: 10rpx;
		background:url(../../static/index/v2/top_banner.png) no-repeat center;
		background-size: 100% 100%;
		position: relative;
	}
	.top-ref{
		width: 80rpx;
		height:79rpx;
		background:url(../../static/index/v2/banner_go.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		right:43rpx;
		bottom:25rpx;
		animation: bounce-down 1s linear infinite;
	}
	@keyframes bounce-down {
		25% {
		-webkit-transform: translateY(-5rpx);
		}
		50%, 100% {
		-webkit-transform: translateY(0);
		}
		75% {
		-webkit-transform: translateY(5rpx);
		}
	}
	.tabc-content{
		width: 100%;
		margin: 10rpx 0 ;
		background:$content-bg;
	}
	.goodslist-index{
		width: 100%;
		box-sizing: border-box;
		padding:6rpx 14rpx;
		
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
		font-family: PingFangSC-Regular;
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
		width: 100%;
		height: 65rpx;
		background: #FFFFFF;
		border: 2rpx solid $btn-red;
		border-radius: 40rpx;
		position: relative;
		font-size: 28rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #A3A3A3;
		line-height: 65rpx;
		box-sizing: border-box;
		padding-left: 34rpx;
		display: flex;
		align-items: center;
	}
	.sousuo-icon{
		width: 31rpx;
		height:32rpx;
		background:url(../../static/index/v2/sousuo.png) no-repeat center;
		background-size: 100% 100%;
		margin-right: 30rpx;
	}
	.search-icon{
		width: 113rpx;
		height: 54rpx;
		background: $btn-red;
		border-radius: 30rpx;
		position: absolute;
		right:3rpx;
		top:50%;
		margin-top: -27rpx;
		text-align: center;
		line-height: 54rpx;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		box-sizing: border-box;
	}

	
	
</style>
