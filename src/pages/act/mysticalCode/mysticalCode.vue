<template>
	<view class="content">
		<view class="top-bg">
			<view class="top-title">您已进入卡世界后台控制系统！</view>
			<view class="top-right">
				<view class="top-right-icon" @click="showDrawer=true">规则</view>
				<view class="top-right-icon" @click="onClickShare()">分享</view>
			</view>
		</view>
		<view class="code-box">
			<textarea class="code-input" placeholder="请输入代码破解..." placeholder-class="placeholder-color"/>
			<view class="code-btn" @click="onClickSecretCodeCrack()"></view>
		</view>
		<view class="code-list">
			<view class="list-header">
				<view class="header-tab" :class="{'tab-current':reqData.tp==item.tp}" v-for="(item,index) in tabData" :key="index" @click="onClickTab(item.tp)">{{item.name}}</view>
			</view>
			<view class="list-box">
				<view class="list-index"></view>
			</view>
		</view>

		<share :operationShow="operationShow" :shareData="shareData" @operacancel="operationShow=false" />
		<!-- 规则 -->
		<bottomDrawer :showDrawer="showDrawer" :title="'活动规则'" @closeDrawer="showDrawer=false">
			<view class="drawer-box" v-for="(item,index) in codePopup" :key="index">
				<view class="drawer-help" v-html="item.content"></view>
			</view>
    	</bottomDrawer>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { codePopup } from "@/net/DataRules";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		mysticalCode = '';
		tabData = [
			{name:'未修复代码',tp:1},
			{name:'已修复代码',tp:2},
			{name:'我破解的',tp:3},
		]
		codeList:{[x:string]:any} = [];
		reqData:{[x:string]:any} = {
			currentPage:1,
			pageSize:10,
			noMoreData:false,
			tp:1
		}
		// 分享 
		operationShow = false;
		shareData: any = {
			shareUrl: '',
			title: '',
			summary: '',
			thumb: ''
		}
		// 规则
		codePopup = codePopup;
		showDrawer = false;
		onLoad(query:any) {
			// this.reqNewData()
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData()
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			let params = this.reqData
			if (params.noMoreData) return ;
			
			app.http.Get('activity/secretCode/list',params,(data:any)=>{
				if(data.totalPage<=params.currentPage) params.noMoreData = true;
				if(params.currentPage==1) this.codeList = [];
				if(data.list) this.codeList = this.codeList.concat(data.list);
				params.currentPage++;
				if(cb) cb()
			})
		}
		onClickTab(tp:number){
			if(tp == this.reqData.tp) return;

			this.reqData = {
				currentPage:1,
				pageSize:10,
				noMoreData:false,
				tp:tp
			}
			this.reqNewData();
		}
		onClickSecretCodeCrack(){
			if(this.mysticalCode=='') return;

			app.http.Post('activity/secretCode/crack',{code:this.mysticalCode},(res:any)=>{

			})
		}
		// 分享
		onClickShare() {
			if (!this.operationShow) {
				if (this.shareData.shareUrl == '') {
					this.shareData = {
						shareUrl: "https://www.ka-world.com/share/",
						title: '卡世界神秘代码',
						summary: '卡世界神秘代码',
						thumb: ''
					}
				}
				this.operationShow = true
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.drawer-box {
		width: 100%;
		box-sizing: border-box;
	}

	.drawer-help {
		width: 100%;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #7D8288;
		line-height: 38rpx;
		margin-bottom: 50rpx;
	}
	.content{
		width: 100%;
		height:100%;
		position: fixed;
		left:0;
		top: var(--window-top);
		right: 0;
		background:url(../../../static/act/mysticalCode/bg.jpg) no-repeat center;
		background-size: 100% 100%;
		box-sizing: border-box;
		display: block;
	}
	.top-bg{
		width: 590rpx;
		height:287rpx;
		background:url(../../../static/act/mysticalCode/bg_title.png) no-repeat center;
		background-size: 100% 100%;
		box-sizing: border-box;
		margin:0 auto;
		position: relative;
		.top-title{
			width: 548rpx;
			height:74rpx;
			background:url(../../../static/act/mysticalCode/bg_tips.png) no-repeat center;
			background-size: 100% 100%;
			box-sizing: border-box;
			position: absolute;
			z-index: 1;
			left:17rpx;
			bottom:26rpx;
			text-align: center;
			line-height: 74rpx;
			font-size: 31rpx;
			font-family: hei;
			font-weight: 400;
			color: #E6E8F7;
			padding-left: 30rpx;
		}
		.top-right{
			width: 91rpx;
			position: absolute;
			right:-70rpx;
			top:22rpx;
			z-index: 1;
			box-sizing: border-box;
			.top-right-icon{
				width: 91rpx;
				height:90rpx;
				margin-bottom: 8rpx;
				background:url(../../../static/act/mysticalCode/right_tips.png) no-repeat center;
				background-size: 100% 100%;
				box-sizing: border-box;
				text-align: center;
				line-height: 90rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
			}
		}
	}
	.code-box{
		width: 643rpx;
		height:547rpx;
		background:url(../../../static/act/mysticalCode/pj_bg.png) no-repeat center;
		background-size: 100% 100%;
		box-sizing: border-box;
		margin:0 auto;
		position: relative;
		.code-input{
			width: 540rpx;
			height: 229rpx;
			background: rgba(116, 234, 255, 0.47);
			border-radius: 8rpx;
			box-sizing: border-box;
			padding:23rpx 19rpx;
			font-size: 29rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #77CAE5;
			position: absolute;
			left:51rpx;
			top:143rpx;
		}
		.code-btn{
			width: 581rpx;
			height:100rpx;
			background:url(../../../static/act/mysticalCode/pj_btn.png) no-repeat center;
			background-size: 100% 100%;
			box-sizing: border-box;
			position: absolute;
			bottom:50rpx;
			left:36rpx
		}
	}
	.code-box /deep/ .placeholder-color{
		font-size: 29rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #77CAE5;
	}
	.code-list{
		width: 696rpx;
		margin:0 auto;
		box-sizing: border-box;
		.list-header{
			width: 100%;
			height:120rpx;
			box-sizing: border-box;
			padding: 0 37rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 3rpx;
			.header-tab{
				font-size: 31rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
			.tab-current{
				font-size: 33rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #00F0FF;
			}
		}
		.list-box{
			width: 100%;
			box-sizing: border-box;
			.list-index{
				width: 696rpx;
				height:255rpx;
				box-sizing: border-box;
				margin-bottom: 43rpx;
				background:url(../../../static/act/mysticalCode/list_index.png) no-repeat center;
				background-size: 100% 100%;
				position: relative;
				padding:40rpx 30rpx 50rpx 50rpx
			}
		}
	}
</style>
