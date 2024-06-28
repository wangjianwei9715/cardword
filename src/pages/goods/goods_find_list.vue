<template>
	<view class="content">
		<view class="header-banner">
			<statusbar />
			<view class="header-top">
				<view class="back" @click="onClickBack"></view>
				<view class="header-search">
					<view class="search-icon"></view>
					<view class="header-search-input" @click="onClickSearch">{{searchText}}</view>
					<view class="remove-icon" v-show="searchText!=''" @click="onClickRemoveSearch">
						<image class="search-remove" src="../../static/goods/v2/mini_close.png" />
					</view>
				</view>
			</view>
		</view>
		<view class="goods-lists">
			<statusbar />
			<scroll-view class="goods-scroll" scroll-x="true" v-if='seriesShow' v-show="merchantList!=''">
				<view class="scrollItem" v-for="(item,index) in merchantList" :key='index' @click="onClickSellerShop(item)">
					<muqian-lazyLoad class="merchant-logo" :src="decodeURIComponent(item.logo)" mode="aspectFit"></muqian-lazyLoad>
					<view class="merchant-name u-line-2">{{item.name}}</view>
					<view class="merchant-btn">进店</view>
				</view>
			</scroll-view>
			<u-sticky :customNavHeight="navHeight">
				<u-tabs class="tabs-container" picNameIndex="3" :list="goodsTabs" :current="goodsTabCurrent" 		lineHeight="0" @click="clickGoodsTabs"
					:itemStyle="{height:'44px',padding:'0 25rpx'}"
					:inactiveStyle="{fontSize:'26rpx',color:'#8D8D8D'}"
					:activeStyle="{fontSize:'30rpx',color:'#333333',fontWeight:500}"
				>
					<template v-slot:picName>
						<image class="icon-pokemon" v-if="goodsTabCurrent==3" src="/static/index/v3/pokemon_.png"></image>
						<image class="icon-pokemon" v-else src="/static/index/v3/pokemon.png"></image>
					</template>
				</u-tabs>
				<indexSortTab @sortChange="onSortChange"/>
			</u-sticky>
			<goodslist :goodsList="goodsList" @send="onClickJumpDetails" :presell="false" :nomore="noMoreData" />
			<empty v-if="goodsList&&!goodsList.length&&!isRequest" />
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from "../../base/BaseNode.vue";
	import { goodsTabs } from "@/tools/DataExchange";
	import indexSortTab from '@/pages/index/component/index_v3/indexSortTab.vue'
	const navHeight = app.statusBarHeight + uni.upx2px(104)
	@Component({components:{indexSortTab}})
	export default class ClassName extends BaseNode {
		navHeight = navHeight
		searchText = "";
		isRequest: boolean = true;
		goodsTabs = goodsTabs;
		goodsTabCurrent = 0;
		goodsData: any = [];
		goodsList: any = [];
		scrollId = "";
		noMoreData = false;
		hasQueryData:boolean=false;
		merchantList: any = [];
		sortParams: any = {};
		onLoad(query: any) {
			if (query.q) {
				this.searchText = decodeURIComponent(query.q);
			}
			
			if (query.data) {
				setTimeout(() => {
					this.goodsData = JSON.parse(query.data);
					this.goodsList = this.goodsData.goodList ? this.goodsData.goodList : [];
					this.scrollId = this.goodsData.scrollId;
					if (this.goodsData.end) {
						this.noMoreData = true;
					}
					this.hasQueryData=true
				}, 10);
				this.merchantSearch();
			} else {
				this.reqNewData("default");
				this.merchantSearch();
			}
			
		}
		reqSearchList() {
			this.goodsList = [];
			this.noMoreData = false;
			this.reqNewData("default");
		}
		onClickRemoveSearch(){
			this.searchText = '';
			this.reqSearchList()
		}
		onClickSellerShop(item: any) {
			this.goMerchantPage(item.alias)
		}
		onReachBottom() {
			this.reqNewData("reach");
		}
		onClickBack() {
			uni.navigateBack({
				delta: 1
			});
		}
		onClickSearch() {
			uni.redirectTo({
				url: "/pages/goods/goods_find?q=" + this.searchText
			});
		}
		clickGoodsTabs({index}){
			if(this.goodsTabCurrent == index) return;
			this.goodsTabCurrent = index;
			this.reqSearchList();
		}
		onClickJumpDetails(goodCode: any) {
			app.navigateTo.goGoodsDetails(goodCode)
		}
		onSortChange(data){
			this.sortParams = {
				genre:data.genre,
				sort:data.od
			};
			if(data.pintuan_type){
				this.sortParams.ptType = data.pintuan_type
			}
			this.reqSearchList()
		}
		merchantSearch() {
			app.http.Get(
				"dataApi/merchant/search/list/brief", {
					fetchFrom: 1,
					fetchSize: 100,
					q:encodeURIComponent(this.searchText)
				},
				(res: any) => {
					this.merchantList = res.list || [];
				}
			);
		}
		reqNewData(type: string, cb ? : Function) {
			const { searchText, sortParams} = this;
			if (this.noMoreData) return;
			this.isRequest = true;
			// 获取列表
			let params: { [x: string]: any; } = {
				state: 1,
				pageSize: 10,
				tp:goodsTabs[this.goodsTabCurrent].id,
				q:encodeURIComponent(searchText),
			};
			if (type == "reach") {
				params.scrollId = this.scrollId;
			}
			const date: any = new Date();
			params.timeStamp = Date.parse(date) / 1000;
			app.http.GetWithCrypto(
				"dataApi/search/good", { ...params, ...sortParams },
				(res: any) => {
					if (res.end) {
						this.noMoreData = true;
					}
					if (res.goodList && type !== "refresh") {
						let list = [...this.goodsList,...res.goodList];
						this.goodsList = app.platform.removeDuplicate(list,'goodCode')
					}
					this.scrollId = res.scrollId;
					this.isRequest = false;
					if (cb) cb();
				},
				(error:any)=>{
					if(error.code==1000){
						this.reqSearchList()
					}
				}
			);
		}
		private get seriesShow(){
			let show=false
			if(!this.searchText) return true
			return this.merchantList&&this.merchantList.length
		}
	}
</script>

<style lang="scss">
$font-24: 24rpx;

page {
  background: $content-bg;
}

.content {
  width: 100%;
  box-sizing: border-box;
}

.goods-scroll {
	width: 100%;
	padding:0 35rpx;
	box-sizing: border-box;
	height: 160rpx;
	background:#fff;
	display: flex;
	// margin:0 auto;
	white-space: nowrap;
	.scrollItem {
		display: inline-flex;
		width: 140rpx;
		height: 160rpx;
		box-sizing: border-box;
		border-radius: 4rpx;
		border: 1rpx solid #F3F5FB;
		position: relative;
		margin-right: 14rpx;
		padding:12rpx 24rpx 10rpx 24rpx;
		justify-content: center;
		align-content: space-between;
		flex-wrap: wrap;
		.merchant-logo {
			width: 42rpx;
			height: 42rpx;
			border-radius: 50%;
		}
		.merchant-name {
			width: 100%;
			font-size: 18rpx;
			color: #3D4352;
			text-align: center;
			white-space: normal;
		}
		.merchant-btn{
			width: 78rpx;
			height: 26rpx;
			border-radius: 2rpx;
			border: 1rpx solid #B0B0B0;
			box-sizing: border-box;
			font-size: 18rpx;
			color: #3D4352;
			text-align: center;
			line-height: 24rpx;
		}
	}
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

.header-top {
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
.header-search {
	width: 623rpx;
	height:64rpx;
	background: #F6F7FB;
	border-radius: 5rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	position: relative;
}
.header-search-input {
	width: 100%;
	height: 64rpx;
	background: #F6F7FB;
	border-radius: 5rpx;
	font-size: 26rpx;
	color: #333;
	padding-left:81rpx;
	display: flex;
	align-items: center;
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
.remove-icon {
	width: 31rpx;
	height: 31rpx;
	position: absolute;
	right: 30rpx;
	top: 50%;
	margin-top: -15.5rpx;
	background: #dbdbdb;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
}
.search-remove {
	width: 15rpx;
	height: 14rpx;
}
.header-back {
	width: 80rpx;
	height: 88rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.header-tab {
	width: 100%;
	height: 90rpx;
	margin-top: -10rpx;
	padding: 0 22rpx;
	box-sizing: border-box;
	border-bottom: 1px solid #f1f1f4;
	background: #fff;
}

.goods-lists {
	width: 100%;
	box-sizing: border-box;
	padding: 104rpx 0 60rpx 0;
}

.sort-shadow {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 8;
	background: rgba(0, 0, 0, 0.5);
}
.tabs-container{
	width: 750rpx;
	box-sizing: border-box;
	background: #fff;
	padding-left: 11rpx;
}
.icon-pokemon{
	width: 105rpx;
	height:38rpx;
	margin-top: -10rpx;
}
</style>
