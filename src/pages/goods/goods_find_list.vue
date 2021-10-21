<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="header-top">
				<view class="header-back" @click="onClickBack"></view>
				<view class="header-search">
					<searchinput :searchText="searchText" @clicksearch="onClickSearch"></searchinput>
				</view>
			</view>
			<view class="header-tab">
				<tabc :tabs="goodTab" :tabsCheck="goodTabCheck" @tabsClick="onClickListTabs"></tabc>
			</view>
			<view class="header-sort">
				<view class="header-sort-index" v-for="item in sortData" :key="item.id" @click="onClickSort(item.id)">
					{{item.name}}
					<view class="header-sort-icon">
						<view v-if="item.name!='分类'" :class="item.sort_up?'icon-sort-up':'icon-sort-upn'"></view>
						<view :class="!item.sort_up?'icon-sort-down':'icon-sort-downn'"></view>
					</view>
				</view>
				<view :class="['header-sort-classify',{'classify-show':classifyShow}]">
					<view @click="onClickClassifyOpt(item.id)" :class="['header-sort-classify-index',{'classify-opt':classifyOpt==item.id}]" v-for="item in classifyData" :key="item.id">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="sort-shadow" v-show="classifyShow" @click="onClickClassifyCancel"></view>
		<view class="goods-lists">
			<statusbar/>
			<goodslist  :goodsList="goodsList"  @send="onClickJumpDetails"/>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		searchText = '';
		goodTab = [
			{id:1,name:'在售'},
			{id:2,name:'即将发售'},
			{id:3,name:'待直播'},
			{id:4,name:'直播中'},
			{id:5,name:'已拼成'}
		];
		goodTabCheck = 1;
		sortData = [
			{id:1,name:'分类',sort_up:false},
			{id:2,name:'进度',sort_up:false},
			{id:3,name:'价格',sort_up:false},
		];
		classifyData = [
			{id:1,name:'篮球'},
			{id:2,name:'足球'},
			{id:3,name:'卡通动漫'},
			{id:4,name:'影视手绘'},
			{id:5,name:'其他'}
		]
		classifyOpt = 1;
		classifyShow = false;
		goodsData:any = []
		goodsList:{[x:string]:any} = [
			{
				id:1,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				num_all:410,
				num:120,
				price:149,
				tips:'满10组减5元'
			},
			{
				id:2,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				num_all:200,
				num:150,
				price:349,
				tips:'满10组减50元'
			},
			{
				id:3,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				num_all:300,
				num:50,
				price:1429,
				tips:'满20组减100元'
			},
			{
				id:4,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				num_all:500,
				num:220,
				price:2429,
				tips:'满20组减100元'
			},
			{
				id:5,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				num_all:300,
				num:50,
				price:1429,
				tips:'满20组减100元'
			},
			{
				id:6,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				num_all:500,
				num:220,
				price:2429,
				tips:'满20组减100元'
			}
		];
		scrollId = '';
		noMoreData = false;
		onLoad(query:any) {
			if(query.q){
				this.searchText = query.q
			}
			if(query.data){
				setTimeout(()=>{
					this.goodsData =  JSON.parse(query.data);
					this.goodsList = this.goodsData.goodList
					this.scrollId = this.goodsData.scrollId
					if(query.data.end){
						this.noMoreData = true;
					}
				},10)
			}else{
				this.reqNewData('default') 
			}
		}
		onClickBack(){
			uni.navigateBack({
			    delta: 1
			});
		}
		onClickSearch(){
			uni.redirectTo({
				url: '/pages/goods/goods_find?q='+this.searchText
			})
		}
		onClickListTabs(id:number){
			if(id==this.goodTabCheck){
				return;
			}
			this.goodTabCheck = id
		}
		// 排序选择
		onClickSort(id:number){
			if(id==1){
				this.onClickClassifyCancel()
			}else{
				this.sortData[id-1].sort_up = !this.sortData[id-1].sort_up
			}
		}
		onClickClassifyOpt(id:number){
			if(this.classifyOpt==id) return;

			this.classifyOpt = id;
			this.onClickClassifyCancel()
		}
		// 分类取消
		onClickClassifyCancel(){
			this.classifyShow = !this.classifyShow
		}
		// 跳转商品详情
		onClickJumpDetails(id:any){
			uni.navigateTo({
				url: '/pages/goods/goods_details?id='+id
			})
		}
		
		reqNewData(type:string,cb?:Function) {
			let reach = false
			if(type=='reach'){
				reach = true
			}
			// 获取列表
			if (this.noMoreData) {
				return;
			}
			// 排序方式
			// let sort = this.getSort(this.checkSort)
			let params:{[x:string]:any} ={}
			
			if(this.searchText==''){
				params.q = ''
			}else{
				params.q = encodeURIComponent(this.searchText)
			}
			if(reach){
				params.scrollId = this.scrollId
			}
			let date:any = new Date()
			
			// params.sort = sort
			params.timeStamp = Date.parse(date)/1000
			app.http.Get("dataApi/search", params, (res: any) => {
				if (res.end) {
					this.noMoreData = true;
				}
				if(res.goodList){
					this.goodsList = this.goodsList.concat(res.goodList)
				}else{
					this.goodsList = []
				}
				this.scrollId = res.scrollId
				if(cb) cb()
			});
		}
	}
</script>

<style lang="scss">
	$font-24:24rpx;
	page{
		background:#F6F7F8;
	}
	.content{
		width: 100%;
		box-sizing: border-box;
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
	.header-top{
		width: 100%;
		height:104rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 32rpx 0 0;
		z-index: 10;
		align-items: center;
		justify-content: space-between;
	}
	.header-search{
		width: 626rpx;
		height:64rpx;
	}
	.header-back{
		width: 80rpx;
		height:88rpx;
		background:url(../../static/goods/back@2x.png) no-repeat center;
		background-size: 100% 100%;
	}
	.header-tab{
		width: 100%;
		height:90rpx;
		margin-top: -10rpx;
		padding:0 22rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #F1F1F4;
	}
	.header-sort{
		width: 100%;
		height:72rpx;
		box-sizing: border-box;
		padding:0 56rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		&-index{
			height:72rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			font-size: $font-24;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #14151A;
		}
		.header-sort-icon{
			width: 18rpx;
			margin-left: 4rpx;
			margin-bottom: -4rpx;
			.icon-sort-up{
				width: 18rpx;
				height:12rpx;
				background:url(../../static/goods/sort_u_.png) no-repeat center;
				background-size: 100% 100%;
				margin-bottom: 2rpx;
			}
			.icon-sort-upn{
				width: 18rpx;
				height:12rpx;
				background:url(../../static/goods/sort_u.png) no-repeat center;
				background-size: 100% 100%;
				margin-bottom: 2rpx;
			}
			.icon-sort-down{
				width: 18rpx;
				height:12rpx;
				background:url(../../static/goods/sort_d_.png) no-repeat center;
				background-size: 100% 100%;
			}
			.icon-sort-downn{
				width: 18rpx;
				height:12rpx;
				background:url(../../static/goods/sort_d.png) no-repeat center;
				background-size: 100% 100%;
			}
		}
		&-classify{
			width: 100%;
			height:0;
			box-sizing: border-box;
			position:absolute;
			top:72rpx;
			left:0;
			padding:0 36rpx;
			background:#fff;
			transition:all 0.2s linear;
			overflow: hidden;
			&-index{
				width: 100%;
				height:80rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #F1F1F4;
				display: flex;
				align-items: center;
				font-size: $font-24;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #14151A;
			}
			&-index:last-child{
				border:none
			}
		}
		.classify-show{
			height:400rpx;
		}
		.classify-opt{
			color:#F65D2D
		}
	}
	.goods-lists{
		width: 100%;
		box-sizing: border-box;
		padding: 272rpx 20rpx 60rpx 20rpx;
	}
	.sort-shadow{
		width: 100%;
		height:100%;
		position:fixed;
		top:0;
		left:0;
		z-index: 8;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
