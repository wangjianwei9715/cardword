<template>
	<view class="content">
		<view class="tab-header" v-if="goodType<4">
			<view class="search-icon"></view>
			<input class="search-input" type="text"  v-model="searchText" placeholder="搜索球员、球队"  confirm-type="search"  @confirm="onClickSearch" />
			
			<image v-if="translate" src="../../static/goods/icon_fanyi.png" style="width: 42rpx; height: 40rpx; margin: 0 28rpx;"
				@click="onClickTranslate()">
			</image>
		</view>

		<view class="item-content">
			<view class="title-middle" v-for="(item,index) in itemListName" :key="index">
				<text class="text-name">{{item}}</text>
			</view>
		</view>
		<!-- 单数行用灰色背景，双数行用白色背景 -->
		<view v-for="(item,index) in teamDataList" :key="index" :class="index%2==0?'title-middle2':'title-middle3'">
			<text v-for="(items,indexs) in itemListName" :key="indexs" class="text-name">
				<text v-show="!english">{{item['column'+(indexs+1)]}}</text>
				<text v-show="english">{{item['column'+(indexs+1)+'_English']?item['column'+(indexs+1)+'_English']:item['column'+(indexs+1)]}}</text>
			</text>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import {
		Component
	} from "vue-property-decorator";
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
		onLoad(query: any) {
			if(query.code){
				this.goodCode = query.code;
				this.goodType = query.type
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
			
			app.http.Get("good/"+this.goodCode+'/noList', params, (data: any) => {
				uni.setNavigationBarTitle({
					title:data.goodTitle
				})
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				this.itemListName = data.columns;
				this.translate = data.translate
				if(data.list){
					if(this.currentPage==1){
						this.teamDataList = data.list;
					}else{
						this.teamDataList = this.teamDataList.concat(data.list);
					}
					
				}
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
				params.scrollId = this.scrollId
			}
			
			app.http.Get("good/"+this.goodCode+'/cards/search', params, (data: any) => {
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(data.list){
					if(this.currentPage==1){
						this.teamDataList = data.list;
					}else{
						this.teamDataList = this.teamDataList.concat(data.list);
					}
				}else{
					this.noMoreData = true;
				}
				
				this.scrollId = data.scrollId?data.scrollId:''
				this.currentPage++;
				if(cb) cb()
			});
		}
		onClickSearch() {
			this.currentPage = 1;
			this.noMoreData = false;
			this.teamDataList = [];
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
	.item-content{
		width: 710rpx;
		height: 60rpx;
		background: #FB4E3E;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}

	.title-middle {
		font-size: $font-22;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 32rpx;
		display: flex;
	}

	.title-middle2 {
		width: 710rpx;
		background: #F6F6F7;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		box-sizing: border-box;
		padding:20rpx 0;
		font-size: $font-24;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
		line-height: 34rpx;
	}

	.title-middle3 {
		width: 710rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		box-sizing: border-box;
		padding:20rpx 0;
		font-size: $font-24;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
		line-height: 34rpx;
	}

	.text-name {
		width: 100%;
		box-sizing: border-box;
		text-align: center;
	}

</style>
