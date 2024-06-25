<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="tab-header">
				<view class="back" @click="onClickBack"></view>
				<view class="header-search">
					<view class="search-icon"></view>
					<input class="search-input" type="text" focus v-model="searchTetxt" :placeholder="placeholder" confirm-type="search" @input="$u.debounce(onInput, 200)" @confirm="onClickSearch(searchTetxt)" />
				</view>
				<view class="header-right" @click="onClickSearch(searchTetxt)">搜索</view>
			</view>
		</view>
		<view class="lenovo-list" v-show="lenovoShow">
			<statusbar/>
			<u-list :height="listHeight+'px'">
				<u-list-item v-for="(item, index) in lenovoList" :key="index" >
					<u-cell :title="item" @click="onClickSearch(item)"></u-cell>
				</u-list-item>
			</u-list>
		</view>
		<view class="top-center" v-show="!lenovoShow">
			<statusbar/>
			<view class="search-title" v-show="historyList!=''">历史记录<view class="icon-delete" @click="onClickDelete"></view></view>
			<view class="search-list" v-show="historyList!=''">
				<view class="search-index" @click="searchGoodList(item)" v-for="item in historyList" :key="item">
					{{item}}
				</view>
			</view>
			<view class="search-title" v-show="forecastList.length">猜你想要</view>
			<view class="search-list">
				<view class="search-index" @click="searchGoodList(item.name)" v-for="(item,index) in forecastList" :key="index">
					<image v-if="[1,2].includes(item.tp)" class="merchant-logo" :src="decodeURIComponent(item.logo)"/>
					<text>{{item.name}}</text>
					<text v-if="[1,2].includes(item.tp)" class="merchant-tag" :style="{color:item.tp==1?'#ED3259':'#EBA447'}">{{item.tag}}</text>
				</view>
				
			</view>
			<view class="swiper-tab">
				<view class="btn-goods"></view>
			</view>
			<view class="slide-image-box">
				<view class="swiper-list swiper-left">
					<view class="good-item" v-for="(item,index) in hotList.goodList" :key="index" @click="goGoodDetail(item.goodCode)">
						<view class="good-rank" :class="'rank-'+item.rank">{{item.rank>3?item.rank:''}}</view>
						<muqian-lazyLoad class="good-pic" :src="decodeURIComponent(item.pic)" borderRadius="5rpx"/>
						<view class="good-desc">{{item.title}}</view>
						<view class="good-new" v-if="item.isNew"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	//@ts-ignore
	import { KwwConfusion } from "@/net/kwwConfusion.js"
	@Component({})
	export default class ClassName extends BaseNode {
		statusBarHeight = app.statusBarHeight;
		searchTetxt = ''
		historyList:{[x:string]:any} = [];
		curIndex = 1;
		hotList:any = {
			goodList:[],
			merchantList:[]
		}
		placeholder = '';
		lenovoList = [];
		forecastList = [];
		lastLenovo = "";
		listHeight = 0;
		onLoad(query:any) {
			if(query.q) this.searchTetxt = query.q;
			if(query.placeholder) this.placeholder = query.placeholder;
			this.initEvent();
		}
		onClickBack(){
			uni.navigateBack({ delta: 1 });
		}
		public get lenovoShow() : boolean {
			return this.lenovoList.length>0 && this.searchTetxt!="";
		}
		initEvent(){
			let searchData = uni.getStorageSync("searchData");
			if(searchData) this.historyList = searchData

			app.http.Get('dataApi/search/heat/list',{},(res:any)=>{
				this.hotList.goodList = res.data.goodList.splice(0,10);
				this.hotList.merchantList = res.data.merchantList.splice(0,10);
			})

			// 猜你想搜
			app.http.Get('dataApi/search/forecast/list',{},(res:any)=>{
				this.forecastList = res.list ? res.list : [];
			})

			// #ifdef H5
			this.listHeight = 777;
			// #endif
			//#ifdef APP-PLUS
			const tabbarHeight = plus.navigator.getSafeAreaInsets().deviceBottom || 0;
			const { screenHeight, statusBarHeight } = app.platform.systemInfo;
			this.listHeight = screenHeight - uni.upx2px(104) - (statusBarHeight||0) - tabbarHeight
			//#endif
		}
		onClickDelete(){
			uni.showModal({
				title: '提示',
				content: '是否删除搜索历史',
				success: (res)=> {
					if (res.confirm) {
						this.historyList = []
						uni.removeStorageSync("searchData")
					}
				}
			});
		}
		onInput(event:any){
			if(this.searchTetxt==""){
				this.lenovoList = [];
				this.lastLenovo = "";
				return;
			};
			if(this.lastLenovo==this.searchTetxt) return;
			const params = {
				realm:"good",
				q:encodeURIComponent(this.searchTetxt),
				sourceId:"pm.index",
			}
			const hash = KwwConfusion.lenovo(this.searchTetxt);
			this.lastLenovo = this.searchTetxt;
			app.http.Get("search/lenovo",{...params,...hash},(res:any)=>{
				this.lenovoList = res.list || [];
			})
		}
		onClickSearch(search:string){
			const text = search=='' ? this.placeholder : search;
			let hideGoods = /[A-Z]{2}[A-Za-z0-9]{7}/g
			if(hideGoods.test(text)){
				let code = text.match(hideGoods);
				this.goGoodDetail(code)
				return;
			}
			if(text!=''){
				// 保存本地搜索记录5条
				let searchData = this.historyList
				if(searchData.indexOf(text) == -1){
					if(!searchData) searchData = []
					searchData.unshift(text)
					uni.setStorageSync("searchData",searchData)
				}
			}
			
			this.searchGoodList(text)
		}
		searchGoodList(text:string){
			let date:any = new Date()
			let params={
				highlight:1,
				q:encodeURIComponent(text),
				timeStamp:Date.parse(date)/1000,
				state:1,
				pageSize:20
			}
			// #ifndef MP
			app.http.GetWithCrypto('dataApi/search/good',params,(res:any)=>{
				uni.redirectTo({
					url: `/pages/goods/goods_find_list?data=${encodeURIComponent(JSON.stringify(res))}&q=${encodeURIComponent(text)}`
				})
			})
			// #endif
		}
		animationfinish(e:any) {
			this.curIndex = e.detail.current+1
		}
		goGoodDetail(goodCode:any){
			app.navigateTo.goGoodsDetails(goodCode)
		}
		onClickShops(alias: any) {
			// #ifndef MP
			if (app.token.accessToken == "") {
				app.login.arouseLogin()
				return;
			}
			// #endif
			this.goMerchantPage(alias)
		}
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		box-sizing: border-box;
		background:#fff;
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
		height:104rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 34rpx;
		z-index: 10;
		align-items: center;
	}
	.back{
		width: 58rpx;
		height:64rpx;
		background: url(@/static/goods/v3/back.png) no-repeat 0 15rpx / 17rpx 29rpx;
	}
	.header-search{
		width: 538rpx;
		height:64rpx;
		background: #F6F7FB;
		border-radius: 5rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: relative;
	}
	.search-input{
		width: 538rpx;
		height:64rpx;
		background: #F6F7FB;
		border-radius: 5rpx;
		font-size: 26rpx;
		color: #333;
		padding-left:81rpx
	}
	.search-icon{
		width: 28rpx;
		height:29rpx;
		background:url(@/static/index/v3/icon_search.png) no-repeat center;
		background-size:100% 100%;
		position: absolute;
		left:38rpx;
		top:50%;
		margin-top: -14.5rpx;
	}
	.header-right{
		height:50rpx;
		line-height: 50rpx;
		font-size: 26rpx;
		color: #333;
		margin-left: 24rpx;
	}
	.top-center{
		width: 100%;
		box-sizing: border-box;
		padding-top: 124rpx;
	}
	.lenovo-list{
		width: 100%;
		box-sizing: border-box;
		padding-top: 124rpx;
	}
	.search-title{
		width: 100%;
		height:40rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		font-weight: 500;
		color: #3D4352;
		display: flex;
		align-items: center;
		justify-content:space-between;
		padding:0 38rpx;
	}
	.icon-delete{
		width: 24rpx;
		height:28rpx;
		background:url(@/static/goods/v3/del.png) no-repeat center; 
		background-size: 100% 100%;
	}
	.search-list{
		width: 100%;
		box-sizing: border-box;
		margin:20rpx auto;
		display: flex;
		flex-wrap: wrap;
		padding:0 30rpx
	}
	.search-index{
		height:40rpx;
		box-sizing: border-box;
		padding:0 20rpx;
		display: flex;
		align-items: center;
		background: #F3F5FB;
		border-radius: 2rpx;
		font-size: 20rpx;
		color: #8D8D8D;
		margin-right: 28rpx;
		margin-bottom: 14rpx;
	}
	.hot-content{
		width: 100%;
		box-sizing: border-box;
		display: flex;
		margin-bottom: 30rpx;
		flex-wrap: wrap;
		overflow: hidden;
	}
	.hot-list{
		width: 400rpx;
		border-radius:6rpx;
		overflow: hidden;
		box-sizing: border-box;
		box-shadow:rgba(174, 174, 174, 0.59) 0px 0px 16rpx 0px ;
		margin: 20rpx;
		display: inline-block;
	}
	.hot-header{
		width: 100%;
		height:66rpx;
		box-sizing: border-box;
		display: flex;
		background: #4DCDCC;
		justify-content: space-between;
		padding:0 20rpx 0 30rpx
	}
	.hot-header-left{
		height:46rpx;
		display: flex;
		align-items: flex-end;
		font-size: 26rpx;
		
		font-weight: bold;
		color: #FFFFFF;
	}
	.hot-header-right{
		height:46rpx;
		display: flex;
		align-items: flex-end;
		font-size: 24rpx;
		
		font-weight: bold;
		color: #FFFFFF;
	}
	.hot-center{
		width: 100%;
		box-sizing: border-box;
		padding:10rpx 20rpx;
		background:#fff;
	}
	.hot-index{
		width: 100%;
		height:80rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		justify-content: space-between;
	}
	.hot-index-left{
		width: 320rpx;
		height:80rpx;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		
		font-weight: normal;
		color: #3B3B3B;
	}
	.hot-index-right{
		width: 40rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 20rpx;
		
		font-weight: normal;
		color: #7B7B7B;
	}
	.hot-icon1{
		width: 26rpx;
		height:26rpx;
		/* background:url(../../static/goods/icon_rank1.png) no-repeat center; */
		background-size: 100% 100%;
		margin-right: 15rpx;
		text-align: center;
		line-height: 26rpx;
		font-size: 22rpx;
		
		font-weight: normal;
		color: #FFFFFF;
	}
	.hot-icon2{
		width: 26rpx;
		height:26rpx;
		/* background:url(../../static/goods/icon_rank2.png) no-repeat center; */
		background-size: 100% 100%;
		margin-right: 15rpx;
		text-align: center;
		line-height: 26rpx;
		font-size: 22rpx;
		
		font-weight: normal;
		color: #FFFFFF;
	}
	.hot-icon3{
		width: 26rpx;
		height:26rpx;
		/* background:url(../../static/goods/icon_rank3.png) no-repeat center; */
		background-size: 100% 100%;
		margin-right: 15rpx;
		text-align: center;
		line-height: 26rpx;
		font-size: 22rpx;
		
		font-weight: normal;
		color: #FFFFFF;
	}
	.hot-icon4{
		width: 26rpx;
		height:26rpx;
		/* background:url(../../static/goods/icon_rank4.png) no-repeat center; */
		background-size: 100% 100%;
		margin-right: 15rpx;
		text-align: center;
		line-height: 26rpx;
		font-size: 22rpx;
		
		font-weight: normal;
		color: #FFFFFF;
	}
	
	.slide-image-box{
		width: 750rpx;
		z-index: 200;
		box-sizing: border-box;
		overflow: hidden;
	}
	.swiper-left{
		background: linear-gradient(0deg, #FFFFFF 0%, #EAE8F5 99%);
	}
	.swiper-header{
		width: 100%;
		height:80rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.swiper-left .swiper-title{
		width: 163rpx;
		height:30rpx;
		background: url(@/static/goods/v2/title_up.png) no-repeat center / 100% 100%;
	}
	.good-item{
		width: 100%;
		height:70rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		margin-bottom: 19rpx;
		position: relative;
	}
	.good-rank{
		width: 60rpx;
		height:70rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 27rpx;
		font-family: Impact;
		color: #757575;
		margin-right: 15rpx;
	}
	.rank-1{
		background: url(@/static/goods/v3/1.png) no-repeat center / 56rpx 35rpx;
	}
	.rank-2{
		background: url(@/static/goods/v3/2.png) no-repeat center / 60rpx 38rpx;
	}
	.rank-3{
		background: url(@/static/goods/v3/3.png) no-repeat center / 56rpx 35rpx;
	}
	.good-pic{
		width: 87rpx;
		height:70rpx;
	}
	.good-desc{
		width: 400rpx;
		height:70rpx;
		margin-left: 20rpx;
		font-size: 20rpx;
		color: #3D4352;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		align-items: flex-start;
		word-break:break-all;
		line-height: 70rpx;
	}
	.good-new{
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		right:0;
		top:50%;
		margin-top: -15rpx;
		background: url(@/static/goods/v3/new.png) no-repeat center / 100% 100%;
	}
	.merchant-pic{
		width: 75rpx;
		height:75rpx
	}
	.merchant-desc{
		font-size: 26rpx;
		
		
		color: #333333;
		margin-left: 22rpx;
	}
	.merchant-up{
		width: 18rpx;
		height:28rpx;
		position: absolute;
		right:25rpx;
		top:50%;
		margin-top: -14.5rpx;
		background: url(@/static/goods/v2/up.png) no-repeat center / 100% 100%;
	}
	.swiper-box{
		width: 750rpx;
		box-sizing: border-box;
		overflow: hidden;
	}
	.swiper-index{
		width: 1500rpx;
		display: flex;
		justify-content: space-between;
		transition: all 0.2s linear;
		transform: translateX(0);
	}
	.show-merchant{
		transform: translateX(-750rpx);
	}
	.swiper-list{
		width: 700rpx;
		box-sizing: border-box;
		border: 1rpx solid #F3F0F0;
		border-radius: 5rpx;
		padding: 28rpx 31rpx 0 15rpx;
		margin:0 auto;
	}
	.swiper-tab{
		width: 100%;
		height:80rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding:0rpx 30rpx;
	}
	.btn-goods{
		height:33rpx;
		width: 174rpx;
		background:url(@/static/goods/v3/up.png) no-repeat center / 100% 100%;
	}
	.merchant-logo{
		width: 26rpx;
		height:26rpx;
		border-radius: 50%;
		margin-right: 11rpx;
	}
	.search-index text{
		font-size: 20rpx;
	}
	.merchant-tag{
		margin-left: 14rpx;
	}
</style>
