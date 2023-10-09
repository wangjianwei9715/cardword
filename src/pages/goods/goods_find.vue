<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="tab-header">
				<view class="header-search">
					<view class="search-icon"></view>
					<input class="search-input" type="text" focus v-model="searchTetxt" :placeholder="placeholder" confirm-type="search" @input="$u.debounce(onInput, 200)" @confirm="onClickSearch(searchTetxt)" />
				</view>
				<view v-if="searchTetxt==''" class="header-right" @click="onClickBack">取消</view>
				<view v-else class="header-right" @click="onClickSearch(searchTetxt)">搜索</view>
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
				<view class="search-index" @click="searchGoodList(item)" v-for="item in historyList" :key="item">{{item}}</view>
			</view>
			<view class="search-title">热门搜索</view>
			<view class="search-list">
				<view class="search-index" @click="searchGoodList(item)" v-for="item in hotSearchList" :key="item">{{item}}</view>
			</view>
			<view class="swiper-tab">
				<view class="swiper-fbtn" :class="{'btn-goods':curIndex==1}" @click="curIndex=1">{{curIndex==1?'':'商品飙升榜'}}</view>
				<view class="swiper-fbtn" :class="{'btn-merchant':curIndex==2}" @click="curIndex=2">{{curIndex==2?'':'店铺热力榜'}}</view>
			</view>

			<swiper
				:style="{ width: '100%', height: '1250rpx' }"
				:current = "curIndex-1"
				duration="200"
				circular
				@change="animationfinish"
				>
				<swiper-item v-for="(item, i) in 2" :key="i">
					<view class="slide-image-box" v-if="item==1">
						<view class="swiper-list swiper-left">
							<view class="good-item" v-for="(item,index) in hotList.goodList" :key="index" @click="goGoodDetail(item.goodCode)">
								<view class="good-rank" :class="'rank-'+item.rank">{{item.rank>3?item.rank:''}}</view>
								<muqian-lazyLoad class="good-pic" :src="decodeURIComponent(item.pic)" borderRadius="5rpx"/>
								<view class="good-desc">{{item.title}}</view>
								<view class="good-new" v-if="item.isNew">新</view>
							</view>
						</view>
					</view>
					<view  class="slide-image-box" v-else>
						<view class="swiper-list swiper-right">
							<view class="good-item" v-for="(item,index) in hotList.merchantList" :key="index" @click="onClickShops(item.alias)">
								<view class="good-rank" :class="'rank-'+item.rank">{{item.rank>3?item.rank:''}}</view>
								<muqian-lazyLoad class="merchant-pic" :src="decodeURIComponent(item.logo)" borderRadius="50%"/>
								<view class="merchant-desc">{{item.name}}</view>
								<view class="merchant-up" v-if="item.rankAlter>0"></view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	//@ts-ignore
	import KwwConfusion from "@/net/kwwConfusion.js"
	@Component({})
	export default class ClassName extends BaseNode {
		kwwConfusion = new KwwConfusion();
		statusBarHeight = app.statusBarHeight;
		searchTetxt = ''
		historyList:{[x:string]:any} = [];
		hotSearchList:any = [];
		curIndex = 1;
		hotList:any = {
			goodList:[],
			merchantList:[]
		}
		placeholder = '';
		lenovoList = [];
		lastLenovo = "";
		listHeight = 0;
		onLoad(query:any) {
			let searchData = uni.getStorageSync("searchData");
			if(searchData) this.historyList = searchData
			if(query.q) this.searchTetxt = query.q;
			if(query.placeholder) this.placeholder = query.placeholder;
			app.http.Get('dataApi/search/heat/list',{},(res:any)=>{
				this.hotList.goodList = res.data.goodList.splice(0,10);
				this.hotList.merchantList = res.data.merchantList.splice(0,10);
			})
			app.http.Get('dataApi/search/series/list',{},(res:any)=>{
				this.hotSearchList = res.list ? res.list : [];
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
		onClickBack(){
			uni.navigateBack({ delta: 1 });
		}
		public get lenovoShow() : boolean {
			return this.lenovoList.length>0 && this.searchTetxt!="";
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
			const hash = this.kwwConfusion.lenovo(this.searchTetxt);
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
		padding:0 20rpx;
		z-index: 10;
		align-items: center;
		justify-content: space-between;
	}
	.header-search{
		width: 640rpx;
		height:64rpx;
		background: #F5F5F8;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: relative;
		border-radius: 29rpx;
	}
	.search-input{
		width: 626rpx;
		height:64rpx;
		background: #F5F5F5;
		border-radius: 3rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #14151A;
		padding-left:76rpx
	}
	.search-icon{
		width: 28rpx;
		height:28rpx;
		background:url(../../static/index/sousuo@2x.png) no-repeat center;
		background-size:100% 100%;
		position: absolute;
		left:28rpx;
		top:50%;
		margin-top: -14rpx;
	}
	.header-right{
		height:50rpx;
		line-height: 50rpx;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #14151A;
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
		font-size: 32rpx;
		font-family: HYQiHei;
		font-weight: bold;
		color: #3B3B3B;
		display: flex;
		align-items: center;
		justify-content:space-between;
		padding:0 30rpx;
	}
	.icon-delete{
		width: 34rpx;
		height:32rpx;
		background:url(../../static/goods/v2/icon_del.png) no-repeat center; 
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
		height:56rpx;
		line-height: 56rpx;
		box-sizing: border-box;
		padding:0 24rpx;
		background: #F6F6F7;
		border-radius: 4rpx;
		text-align: center;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #767880;
		margin-right: 16rpx;
		margin-bottom: 16rpx;
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
		font-family: HYQiHei;
		font-weight: bold;
		color: #FFFFFF;
	}
	.hot-header-right{
		height:46rpx;
		display: flex;
		align-items: flex-end;
		font-size: 24rpx;
		font-family: HYQiHei;
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
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #3B3B3B;
	}
	.hot-index-right{
		width: 40rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 20rpx;
		font-family: Adobe Heiti Std;
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
		font-family: HYQiHei;
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
		font-family: HYQiHei;
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
		font-family: HYQiHei;
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
		font-family: HYQiHei;
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
		background: linear-gradient(0deg, #FFFFFF 0%, #FEF9F4 99%);
	}
	.swiper-right{
		background: linear-gradient(0deg, #FFFFFF 0%, #F6FCFC 99%);
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
	.swiper-right .swiper-title{
		width: 163rpx;
		height:30rpx;
		background: url(@/static/goods/v2/title_hot.png) no-repeat center / 100% 100%;
	}
	.good-item{
		width: 100%;
		height:84rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		margin-bottom: 30rpx;
		position: relative;
	}
	.good-rank{
		width: 35rpx;
		height:70rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 27rpx;
		font-family: Impact;
		font-weight: 400;
		color: #757575;
		margin-right: 15rpx;
	}
	.rank-1{
		width: 35rpx;
		height:44rpx;
		background: url(@/static/goods/v2/1.png) no-repeat center / 100% 100%;
	}
	.rank-2{
		width: 35rpx;
		height:44rpx;
		background: url(@/static/goods/v2/2.png) no-repeat center / 100% 100%;
	}
	.rank-3{
		width: 35rpx;
		height:44rpx;
		background: url(@/static/goods/v2/3.png) no-repeat center / 100% 100%;
	}
	.good-pic{
		width: 96rpx;
		height:84rpx;
	}
	.good-desc{
		width: 440rpx;
		height:70rpx;
		margin-left: 20rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
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
		background: linear-gradient(25deg, #61A178 0%, #88CD5A 99%);
		border-radius: 3rpx;
		font-size: 21rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		box-sizing: border-box;
		text-align: center;
		line-height: 30rpx;
		position: absolute;
		right:0;
		top:50%;
		margin-top: -15rpx;
	}
	.merchant-pic{
		width: 75rpx;
		height:75rpx
	}
	.merchant-desc{
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
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
		padding: 30rpx 20rpx 0 20rpx;
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
	.swiper-fbtn{
		height:35rpx;
		font-size: 29rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #757575;
		display: flex;
		align-items: center;
	}
	.btn-goods{
		width: 175rpx;
		background:url(@/static/goods/v2/title_up.png) no-repeat center / 100% 100%;
		margin-right: 54rpx;
	}
	.btn-merchant{
		width: 176rpx;
		background:url(@/static/goods/v2/title_hot.png) no-repeat center / 100% 100%;
		margin-left: 54rpx;
	}
</style>
