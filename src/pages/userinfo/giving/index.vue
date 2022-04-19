<template>
	<view class="content">
		<view class="header">
			<statusbar style="background:#fff" />
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
				<view class="header-title">收赠卡密</view>
				<view class="icon-search" @click="onClickSearch"></view>
				<view class="icon-help" @click="onClickShowRule"></view>
			</view>
		    <view class="header-tab">
		        <tabc :tabc="tabData" :tabsCheck="tabCheck" @tabsClick="onClickListTabs"></tabc>
		    </view>
		</view>
		
		<view class="box-content">
			<statusbar/>
			<givingCardList :codeList="codeList" :type="tabCheck" />
		</view>

		<view class="giving-bottom-box">
			<view class="giving-btn giving-btn-left" @click="onClickJumpUrl('/pages/userinfo/giving/code_ref')">查询密码</view>
			<view class="giving-btn giving-btn-right" @click="onClickJumpUrl('/pages/userinfo/order_list?type=2')">立即赠送</view>
		</view>
		
		<empty v-if="empty"/>
		<!-- 规则弹窗 -->
		<rulePopup :showRulePopup="showRulePopup" :giving="true" @cancelRulePopup="onClickCancelRulePopup"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		tabCheck = 1;
		tabData = [
			{id:1,name:'我的赠送'},
			{id:2,name:'我收到的'}
		];
		codeList:any = [];
		currentPage = 1;
		pageSize = 10;
		noMoreData = false;
		showRulePopup = false;
		empty = false;
		onLoad(query:any) {
			this.reqNewData();
		}
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		onClickJumpUrl(url:string){
			uni.navigateTo({
				url:url
			})
		}
		onClickBack(){
			uni.navigateBack({
				delta: 1
			});
		}
		onClickSearch(){
			uni.navigateTo({
				url:'/pages/userinfo/giving/search'
			})	
		}
		onClickShowRule(){
			this.showRulePopup = true;
		}
		onClickCancelRulePopup(){
			this.showRulePopup = false;
		}
		againReqNewData(){
			this.currentPage = 1;
			this.noMoreData = false;
			this.reqNewData()
		}
		onClickListTabs(id:number){
			if(id==this.tabCheck){
				return;
			}
			this.tabCheck = id;
			this.againReqNewData();
		}
		
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			
			let url = this.tabCheck==1? 'function/userNo/transfer/my/outlist' : 'function/userNo/transfer/my/inlist';

			let params:{[x:string]:any} = {
				pageIndex: this.currentPage,
				pageSize:this.pageSize
			}
			
			app.http.Get(url, params, (data: any) => {
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(this.currentPage == 1) this.codeList = [];
				if(data.total == 0) this.empty = true;
				if(data.list){
					this.codeList = this.codeList.concat(data.list);
				}
				this.currentPage++;
				if(cb) cb()
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
		height:88rpx;
		background:url(../../../static/goods/back@2x.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left:0;
		top:0;
	}
	.header-title{
		height:88rpx;
		line-height: 88rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
	}
	.icon-search{
		width: 40rpx;
		height:40rpx;
		position: absolute;
		right:92rpx;
		top:50%;
		margin-top: -20rpx;
		background:url(../../../static/userinfo/v2/icon_search.png) no-repeat center;
		background-size: 100% 100%;
	}
	.icon-help{
		width: 40rpx;
		height:40rpx;
		position: absolute;
		right:32rpx;
		top:50%;
		margin-top: -20rpx;
		background:url(../../../static/userinfo/v2/help.png) no-repeat center;
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
        padding:180rpx 20rpx calc(114rpx ) 20rpx;
		padding:180rpx 20rpx calc(114rpx + constant(safe-area-inset-bottom)) 20rpx;
		padding:180rpx 20rpx calc(114rpx + env(safe-area-inset-bottom)) 20rpx;
    }
	.box-index{
		width: 100%;
		background: #FFFFFF;
		border-radius: 10px;
		box-sizing: border-box;
		padding:5rpx 28rpx;
	}
	.giving-bottom-box{
		width: 100%;
		height:calc(100rpx );
		height:calc(100rpx + constant(safe-area-inset-bottom));
		height:calc(100rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		padding: 0 25rpx;
		position: fixed;
		left:0;
		bottom:0;
		z-index: 20;
		background:#fff;
		padding-top: 12rpx;
	}
	.giving-btn{
		width: 340rpx;
		height:67rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		border-radius: 5rpx;
	}
	.giving-btn-left{
		color: #333333;
		border: 1px solid #333333;
		background:#fff;
	}
	.giving-btn-right{
		color: #fff;
		border: 1px solid $btn-red;
		background:$btn-red;
	}
</style>
