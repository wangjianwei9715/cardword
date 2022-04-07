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
				<tabc :tabc="classifyData" :tabsCheck="classifyOpt" @tabsClick="onClickListTabs"></tabc>
			</view>
			<view class="header-sort">
				<view class="header-sort-index" :class="{'current-name':item.id==1||item.id==2}" v-for="item in sortData" :key="item.id" @click="onClickSort(item.id)">
					{{item.name}}
					<view class="header-sort-icon">
						<view v-if="item.id!=1&&item.id!=2" :class="{'icon-sort-upn':item.sort_up!='up','icon-sort-up':item.sort_up=='up'}"></view>
						<view :class="{'icon-sort-downn':item.sort_up!='down','icon-sort-down':item.sort_up=='down'}"></view>
					</view>
				</view>
				<view :class="['header-sort-classify',{'classify-show':classifyShow}]">
					<view @click="onClickClassifyOpt(item.id)" :class="['header-sort-classify-index',{'classify-opt':goodTabCheck==item.id}]" v-for="item in goodTab" :key="item.id">{{item.name}}</view>
				</view>
				<view :class="['header-sort-classify',{'classify-show':classifyShowPlay}]">
					<view @click="onClickClassifyOptPlay(item.id)" :class="['header-sort-classify-index',{'classify-opt':playTypeCurrent==item.id}]" v-for="item in playTypeData" :key="item.id">{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="sort-shadow" v-show="classifyShow||classifyShowPlay" @click="onClickClassifyCancel"></view>
		<view class="goods-lists">
			<statusbar/>
			<goodslist  :goodsList="goodsList"  @send="onClickJumpDetails" :presell="false"/>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import {Md5} from 'ts-md5/dist/md5';
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		searchText = '';
		goodTab = [
			{id:1,name:'在售'},
			{id:0,name:'即将发售'},
			{id:3,name:'待拆卡'},
			{id:4,name:'拆卡中'},
			{id:2,name:'已拼成'}
		];
		goodTabCheck = 1;
		sortData = [
			{id:1,name:'在售',sort_up:''},
			{id:2,name:'拼团方式',sort_up:''},
			{id:3,name:'进度',sort_up:''},
			{id:4,name:'价格',sort_up:''},
		];
		classifyData = [
			{id:100,name:'推荐'},
			{id:1,name:'篮球'},
			{id:2,name:'足球'},
			{id:0,name:'其他'},
		]
		classifyOpt = 100;
		playTypeData = [
			{id:0,name:'随机卡种'},
			{id:1,name:'自选球队'},
			{id:2,name:'随机球员'},
			{id:3,name:'随机球队'},
			{id:4,name:'随机卡包'}
		]
		playTypeCurrent = -1;
		classifyShow = false;
		classifyShowPlay = false;
		goodsData:any = []
		goodsList:{[x:string]:any} = [];
		scrollId = '';
		noMoreData = false;
		scrollIdSt:any = 0;
		onLoad(query:any) {
			if(query.q){
				this.searchText = query.q
			}
			if(query.classType){
				this.classifyOpt = query.classType
			}
			if(query.data){
				setTimeout(()=>{
					// #ifndef MP 
					this.goodsData = JSON.parse(query.data)
					// #endif
					// #ifdef MP
					this.goodsData = JSON.parse(decodeURIComponent(query.data))
					// #endif
					this.goodsList = this.goodsData.goodList?this.goodsData.goodList:[]
					this.scrollId = this.goodsData.scrollId
					if(query.data.end){
						this.noMoreData = true;
					}
				},10)
			}else{
				this.reqNewData('default') 
			}

			// if(app.platform.systemInfo.platform == 'ios' && app.iosVersion%2 !=0){
			// 	this.goodTab = [
			// 		{id:1,name:'在售'},
			// 		{id:0,name:'即将发售'},
			// 		{id:2,name:'已拼成'}
			// 	]
			// }
			
		}
		reqSearchList(){
			this.goodsList = [];
			this.noMoreData = false
			this.reqNewData('default') 
		}
		onReachBottom(){
			this.reqNewData('reach')
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
			if(id==this.classifyOpt){
				return;
			}
			this.classifyOpt = id;
			this.reqSearchList()
		}
		
		// 排序选择
		onClickSort(id:number){
			this.onClickClassifyCancel()
			if(id==1){
				this.classifyShow = true
			}else if(id==2){
				this.classifyShowPlay = true
			}else{
				if(this.sortData[id-1].sort_up==''){
					this.sortData[id-1].sort_up = 'up'
				}else if(this.sortData[id-1].sort_up == 'up'){
					this.sortData[id-1].sort_up = 'down'
				}else if(this.sortData[id-1].sort_up == 'down'){
					this.sortData[id-1].sort_up = ''
				}
				this.reqSearchList()
			}
		}
		onClickClassifyOpt(id:number){
			if(this.goodTabCheck==id) return;
			this.goodTabCheck = id;
			this.sortData[0].name = this.getSortStr(id);
			this.onClickClassifyCancel()
			this.reqSearchList()
		}
		onClickClassifyOptPlay(id:number){
			if(this.playTypeCurrent==id) return;
			this.playTypeCurrent = id;
			this.sortData[1].name = this.getSortStrPlay(id);
			this.onClickClassifyCancel()
			this.reqSearchList()
		}
		getSortStr(id:any){
			switch(id){
				case 0:
					return '即将发售';
				case 1:
					return '在售';
				case 2:
					return '已拼成';
				case 3:
					return '待拆卡';
				case 4:
					return '拆卡中';	
				default:
					return '分类'
			}
		}
		getSortStrPlay(id:any){
			switch(id){
				case 0:
					return '随机卡种';
				case 1:
					return '自选球队';
				case 2:
					return '随机球员';
				case 3:
					return '随机球队';
				case 4:
					return '随机卡包';
				default:
					return '拼团方式'
			}
		}
		// 分类取消
		onClickClassifyCancel(){
			this.classifyShow = false;
			this.classifyShowPlay = false
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
			
			let params:{[x:string]:any} ={
				state:Number(this.goodTabCheck),
				pageSize:10
			}
			if(this.classifyOpt!=100){
				params.tp = Number(this.classifyOpt)
			}
			params.q = this.searchText==''?'':this.searchText
			if(reach){
				params.scrollId = this.scrollId;
				params.st = this.scrollIdSt;
				params.sn = Md5.hashStr(this.scrollIdSt+this.scrollId+'scrollSearchGood')
			}
			// 排序方式
			let sort = ''
			if(this.sortData[2].sort_up!=''){
				if(this.sortData[2].sort_up=='up'){
					sort += 'price'
				}else{
					sort += 'price:desc'
				}
			}
			if(this.sortData[1].sort_up!=''){
				if(sort!=''){sort+=','}
				if(this.sortData[1].sort_up=='up'){
					sort += 'progress'
				}else{
					sort += 'progress:desc'
				}
			}
			if(sort!=''){
				params.sort = sort
			}
			
			let date:any = new Date()
			params.timeStamp = Date.parse(date)/1000
			app.http.Get("dataApi/search/good", params, (res: any) => {
				if (res.end) {
					this.noMoreData = true;
				}
				if(res.goodList){
					this.goodsList = this.goodsList.concat(res.goodList)
				}
				this.scrollId = res.scrollId;
				this.scrollIdSt = res.timeStamp;
				if(cb) cb()
			});
		}
		
	}
</script>

<style lang="scss">
	$font-24:24rpx;
	page{
		background:#F2F2F2;
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
		border-radius: 29rpx;
		overflow: hidden;
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
			font-size: 26rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
		}
		.current-name{
			color:#E23737;
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
			transition:all 0.1s linear;
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
		padding: 272rpx 14rpx 60rpx 14rpx;
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
