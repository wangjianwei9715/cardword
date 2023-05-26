<!--
 * @FilePath: \jichao_app_2\src\pages\act\collectSpCard\record.vue
 * @Author: wjw
 * @Date: 2023-05-26 14:33:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-05-26 15:08:37
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="content">
        <view class="header-tab">
			<tabc :tabc="tabData" :tabsCheck="tabCheck" @tabsClick="onClickListTabs"></tabc>
		</view>
		<empty v-show="empty" />
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	const urlMap:{[key:number]:string} = {
		1:'me/cabinet/card/deliver/list',
		2:'me/cabinet/card/deliver/list'
	}
	@Component({})
	export default class ClassName extends BaseNode {
		tabCheck = 1;
		tabData = [
			{id:1,name:'奖品明细'},
			{id:2,name:'特卡明细'}
		];
		listParams = {
			fetchFrom: 1,
			fetchSize: 10,
			noMoreData:false
		}
		list = [];
		empty = false;
        onLoad(query:any) {
			this.reqNewData() 
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData() 
		}
		onClickListTabs(id:number){
			if(id==this.tabCheck){
				return;
			}
			this.tabCheck = id;
			this.refreshList()
		}
		refreshList(){
			this.empty = false;
			this.list = [];
			this.listParams.fetchFrom = 1;
			this.listParams.noMoreData = false;
			this.reqNewData()
		}
		reqNewData(cb?: Function) {
			// 获取更多商品
			const { fetchFrom, fetchSize, noMoreData } = this.listParams;
			if (noMoreData)  return;

			app.http.Get(urlMap[this.tabCheck], {fetchFrom,fetchSize}, (data: any) => {
				let arr = data.list || [];
				this.list = fetchFrom == 1 ? arr : [...this.list, ...arr];
				this.empty = this.list.length == 0;
				this.listParams.noMoreData = data.isFetchEnd;
				this.listParams.fetchFrom+=fetchSize;
				if (cb) cb();
			});
		}
	}
</script>

<style lang="scss">
    page{
        background:#F6F7F8;
    }
	.header-tab{
		width: 100%;
		background:#fff;
		height:90rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #F1F1F4;
		padding:0 100rpx;
	}
</style>
