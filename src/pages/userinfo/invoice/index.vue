<template>
	<view class="content">
		<view class="header">
			<statusbar style="background:#fff" />
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack">
					<image style="width:19rpx;height:35rpx" src="@/static/index/v3/icon_back.png"/>
				</view>
				<view class="header-title">开票管理</view>
				<view class="icon-kf" @click="onClickHeliService"></view>
			</view>
		</view>
		
		<view class="box-content">
			<statusbar/>
			<view class="invoice-box" v-for="(item,index) in invoiceList" :key="index">
				<view class="box-top">
					<view class="top-left">
						<muqian-lazyLoad class="top-avatar" v-if="item.merchantLogo!=''" :src="item.merchantLogo" borderRadius="50%" ></muqian-lazyLoad>
						{{item.merchantName}}
					</view>
					<view class="top-right" @click="onClickApplyfor(item)">申请开票</view>
				</view>
				<view class="box-bottom">
					<view class="bottom-row">可开票：{{item.amount}}</view>
					<view class="bottom-row">已开票：{{item.amount1}}</view>
					<view class="bottom-row" v-show="item.amount2>0">申请中：{{item.amount2}}</view>
				</view>
			</view>
		</view>
		<empty v-show="empty" />
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		listParams = {
			pageIndex: 1,
			pageSize: 10,
			noMoreData:false
		}
		empty = false;
		invoiceList = []
		onLoad(query:any) {
			this.reqNewData();
			uni.$on('apply',(res)=>{
				this.refreshList()
			})
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData() 
		}
		refreshList(){
			this.empty = false;
			this.invoiceList = [];
			this.listParams.pageIndex = 1;
			this.listParams.noMoreData = false;
			this.reqNewData()
		}
		onClickBack(){
			uni.navigateBack({ delta: 1 });
		}
		onClickApplyfor(item:any){
			uni.navigateTo({
				url:'/pages/userinfo/invoice/apply_for?data='+encodeURIComponent(JSON.stringify(item))
			})
		}
		onClickHeliService(){
			app.platform.heliService({agentExten:''})
		}
		reqNewData(cb?: Function) {
			// 获取更多商品
			const { listParams } = this;
			if (listParams.noMoreData) {
				return;
			}
			app.http.Get("me/invoice/list", listParams, (data: any) => {
				let arr = data.list || [];
				this.invoiceList = listParams.pageIndex == 1 ? arr : [...this.invoiceList, ...arr];
				this.empty = data.total == 0;
				listParams.noMoreData = data.totalPage <= listParams.pageIndex;
				listParams.pageIndex++;
				if (cb) cb();
			});
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#F6F7F8;
	}
	.tab-header{
		width: 100%;
		height:88rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 30rpx;
		position: relative;
		z-index: 10;
		align-items: center;
		justify-content: center;
		background:#fff;
	}
	.icon-back{
		width: 80rpx;
		height: 88rpx;
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.header-title{
		height:88rpx;
		line-height: 88rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
	}
	.icon-kf{
		width: 38rpx;
		height: 36rpx;
		margin-bottom: 3rpx;
		position: absolute;
		right:30rpx;
		top:50%;
		margin-top: -19rpx;
		background:url(../../../static/goods/v2/icon_kefu.png) no-repeat center;
		background-size: 100% 100%;
	}
	.content{
		width: 100%;
		box-sizing:border-box;
	}
	.header{
	    width: 100%;
	    position: fixed;
	    left:0;
	    top:0;
	    z-index: 99;
	}
	.header-tab{
		width: 100%;
	    background:#fff;
		height:90rpx;
		margin-top: -10rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #F1F1F4;
	    padding:0 100rpx;
	}
	.box-content{
        width: 100%;
        position: relative;
        z-index:10;
        box-sizing: border-box;
        padding:110rpx 20rpx calc(120rpx ) 20rpx;
		padding:110rpx 20rpx calc(120rpx + constant(safe-area-inset-bottom)) 20rpx;
		padding:110rpx 20rpx calc(120rpx + env(safe-area-inset-bottom)) 20rpx;
    }
	.box-index{
		width: 100%;
		background: #FFFFFF;
		border-radius: 10px;
		box-sizing: border-box;
		padding:5rpx 20rpx;
	}
	.invoice-box{
		width: 710rpx;
		box-sizing: border-box;
		padding:30rpx 30rpx 15rpx 30rpx;
		background: #FFFFFF;
		border-radius: 5rpx;
		margin-bottom: 14rpx;
		.box-top{
			width: 100%;
			height:62rpx;
			display: flex;
			align-items:center;
			justify-content: space-between;
		}
		.top-left{
			height:62rpx;
			display: flex;
			align-items: center;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}
		.top-avatar{
			width: 62rpx;
			height:62rpx;
			margin-right: 20rpx;
		}
		.top-right{
			width: 180rpx;
			height: 49rpx;
			background: #FA1545;
			border-radius: 3rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
			line-height: 49rpx;
		}
		.box-bottom{
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin-top: 25rpx;
		}
		.bottom-row{
			width: 50%;
			font-size: 23rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #88878C;
			margin-bottom: 15rpx;
		}
	}
</style>
