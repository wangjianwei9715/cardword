<template>
	<view class="content">
		<view class="item-content">
			<view class="title-middle" v-for="(item,index) in itemListName" :key="index">
				<text class="text-name">{{item}}</text>
			</view>
		</view>
		<!-- 单数行用灰色背景，双数行用白色背景 -->
		<view v-for="(item,index) in inviteList" :key="index" :class="index%2==0?'title-middle2':'title-middle3'">
			<text class="text-name">{{dateFormatMSHMS(item.time)}}</text>
			<text class="text-name">{{item.user}}</text>
			<text class="text-name">{{item.result}}</text>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import {
		Component
	} from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import { dateFormatMSHMS } from '@/tools/util'
	@Component({})
	export default class ClassName extends BaseNode {
		dateFormatMSHMS = dateFormatMSHMS;
		goodCode = '';
		currentPage = 1;
		pageSize = 30;
		noMoreData = false;
		itemListName=['邀请时间','被邀请用户','结果'];
		inviteList = [];
		onLoad(query: any) {
			if(query.code){
				this.goodCode = query.code;
				this.reqNewData()
			}
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData() 
		    
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
			
			app.http.Get("activity/invite/1/"+this.goodCode+"/list", params, (data: any) => {
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(this.currentPage==1){
					this.inviteList = [];
				}
				if(data.list){
					this.inviteList = this.inviteList.concat(data.list);
				}
				this.currentPage++;
				if(cb) cb()
			});
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
		font-family: PingFangSC-Medium, PingFang SC;
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
		font-family: PingFangSC-Medium, PingFang SC;
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
