<template>
	<view class="content">
		<view class="tab-header" v-if="goodType<4||goodType>10">
			<view class="search-icon"></view>
			<input class="search-input" type="text"  v-model="searchText" placeholder="搜索球员、球队"  confirm-type="search"  @confirm="onClickSearch" />
			
			<image v-if="translate" src="../../static/goods/icon_fanyi.png" style="width: 42rpx; height: 40rpx; margin: 0 28rpx;"
				@click="onClickTranslate()">
			</image>
		</view>

		<view class="item-goodtitle">{{goodTitle}}</view>
		<table class="rules-table">
			<thead>
				<tr class="item-content">
					<td :width="tabWidth" v-for="(item,index) in itemListName" :key="index"><text class="text-name">{{item}}</text></td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in teamDataList" :key="index" :class="index%2==0?'title-middle2':'title-middle3'" >
					<td  v-for="(items,indexs) in itemListName" :key="indexs" >
						<text v-show="!english">{{item['column'+(indexs+1)]}}</text>
						<text v-show="english">{{item['column'+(indexs+1)+'_English']?item['column'+(indexs+1)+'_English']:item['column'+(indexs+1)]}}</text>
					</td>
				</tr>
			</tbody>
		</table>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import {
		Component
	} from "vue-property-decorator";
	import {Md5} from 'ts-md5';
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		goodCode = '';
		goodType = 0;
		searchText = '';
		currentPage = 1;
		pageSize = 30;
		noMoreData = false;
		itemListName=[];
		teamDataList = [];
		translate = false;
		english = false
		scrollId = '';
		scrollIdSt:any = 0;
		goodTitle = '';
		tabWidth:any = '';
		teamId = 0;
		debug = app.updateDebug == 'on'
		onLoad(query: any) {
			if(query.code){
				this.goodCode = query.code;
				this.goodType = query.type;
				if(query.teamId){
					this.teamId = Number(query.teamId)
				}
				this.reqNewData()
			}
		}
		//   加载更多数据
		onReachBottom() {
			if(this.searchText!=''){
				this.searchData()
			}else{
				this.reqNewData() 
			}
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			
			let params:{[x:string]:any} = {
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
			}
			if(this.teamId>0) params.teamId = this.teamId;
			
			app.http.GetWithCrypto("dataApi/good/"+this.goodCode+'/noList', params, (data: any) => {
				this.goodTitle = data.goodTitle;
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				this.itemListName = data.columns;
				this.tabWidth = (100/(this.itemListName.length))+'%';
				this.translate = data.translate
				if(data.list){
					if(this.currentPage==1) this.teamDataList =  []
					this.teamDataList = this.teamDataList.concat(data.list);
				}
				this.debug && app.platform.refrain(this.teamDataList);
				this.currentPage++;
				if(cb) cb()
			});
		}
		searchData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			let date:any = new Date()
			let params:{[x:string]:any} = {
				timeStamp:Date.parse(date)/1000,
				q:encodeURIComponent(this.searchText),
				pageSize:this.pageSize,
			}
			if(this.scrollId!=''){
				params.scrollId = this.scrollId;
				params.st = this.scrollIdSt;
				params.sn = Md5.hashStr(this.scrollIdSt+this.scrollId+'scrollSearchGood')
			}
			
			app.http.Get("dataApi/good/"+this.goodCode+'/cards/search', params, (data: any) => {
				if(data.total<=this.teamDataList.length){
					this.noMoreData = true;
				}
				if(this.currentPage==1)this.teamDataList = [];
					
				if(data.list){
					this.teamDataList = this.teamDataList.concat(data.list);
				}
				this.debug && app.platform.refrain(this.teamDataList);
				this.scrollId = data.scrollId?data.scrollId:'';
				this.scrollIdSt = data.timeStamp;
				this.currentPage++;
				if(cb) cb()
			});
		}
		onClickSearch() {
			this.currentPage = 1;
			this.noMoreData = false;
			this.teamDataList = [];
			this.scrollId = ''
			if(this.searchText == ''){
				this.reqNewData() 
			}else{
				this.searchData()
			}
		}
		
		onClickTranslate() {
			this.english = !this.english
		}
	}
</script>

<style lang="scss">
	$font-22:22rpx;
	$font-24:24rpx;

	.tab-header {
		width: 100%;
		height: 104rpx;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		padding: 0 20rpx;
		z-index: 10;
	}
	.search-icon{
		width: 28rpx;
		height:28rpx;
		background:url(../../static/index/sousuo@2x.png) no-repeat center;
		background-size:100% 100%;
		position: absolute;
		left:48rpx;
		top:50%;
		margin-top: -14rpx;
	}
	.search-input{
		width: 100%;
		height:64rpx;
		background: #F5F5F8;
		border-radius: 4rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #14151A;
		padding-left:76rpx ;
	}
	.item-goodtitle{
		width: 100%;
		text-align: center;
		line-height: 40rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #333333;
		background:#F6F7FB;
		box-sizing: border-box;
		padding:20rpx ;
	}
	.item-content{
		background: #F6F7FB;
	}

	.title-middle {
		font-size: 26rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #333333;
		line-height: 32rpx;
		display: flex;
	}

	.title-middle2 {
		background: #F0F0F2;
	}
	.title-middle3 {
		background: #FCFCFC;
	}
	.text-name {
		width: 100%;
		box-sizing: border-box;
		text-align: center;
		font-size: 27rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #333333;
	}
	.rules-table{
		width: 100%;
		border-collapse: collapse;
	}
	.rules-table tr td{
		height:76rpx;
		line-height: 40rpx;
		font-size: 23rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #34363A;
		text-align: center;
		border:1px solid #E5E5E5;
		padding:10rpx ;
	}
</style>
