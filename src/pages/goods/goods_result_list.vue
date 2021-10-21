<template>
	<view class="content">
		<view class="header-banner">
			<statusbar />
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
				<view :class="chooseId==0?'header-title':'header-title2'" @click="onClickGroupBookingResult()">拼团结果
					<view class="cross-line-down" v-if="chooseId==0" />
				</view>
				<view :class="chooseId==0?'header-title2':'header-title'" style="margin-left: 112rpx;"
					@click="onClickSplitCardsReport()">拆卡报告
					<view class="cross-line-down" v-if="chooseId==1" />
				</view>
			</view>
		</view>
		<view style="padding-top:116rpx">
			<statusbar />
		</view>

		<view class="tab-header">
			<searchinput :searchText="'搜索关键字'" @clicksearch="onClickSearch()"></searchinput>
			<image src="../../static/goods/icon_fanyi.png" style="width: 42rpx; height: 40rpx; margin:0 28rpx; "
				@click="onClickTranslate()">
			</image>
		</view>

		<!-- 拼团结果 -->
		<view v-if="chooseId==0">
			<view class="item-content">
				<view class="title-middle" v-for="(item,index) in itemListName" :key="index">
					<text class="text-name">{{item}}</text>
				</view>
			</view>
			<view v-if="teamDataList.length==0" class="empty">暂无数据</view>
			<!-- 单数行用灰色背景，双数行用白色背景 -->
			<view :class="index%2==0?'title-middle-pin':'title-middle-pin2'" v-for="(item,index) in teamDataList"
				:key="index">
				<text class="text-name3">{{item.userName}}</text>
				<text class="text-name2">{{item.no}}</text>
				<text class="text-name3" style="margin-right: 24rpx;">{{dateFormat(item.time)}}</text>
			</view>
		</view>

		<!-- 拆卡报告 -->
		<view v-if="chooseId==1">
			

			<view class="item-content">
				<view class="title-middle" v-for="(item,index) in itemListName2" :key="index">
					<text class="text-name" style="margin-right: 20rpx;">{{item}}</text>
				</view>
			</view>
			<view v-if="teamDataList2.length==0" class="empty">暂无数据</view>
			<!-- 单数行用灰色背景，双数行用白色背景 -->
			<view :class="index%2==0?'title-middle-chai':'title-middle-chai2'" v-for="(item,index) in teamDataList2"
				:key="index">
				<text class="item-name">{{item.userName}}</text>
				<text class="item-bh">{{item.no}}</text>
				<text class="item-time">{{dateFormat(item.time)}}</text>
				<image :src="decodeURIComponent(item.pic)"
					style="width: 100rpx; height: 128rpx; margin-right: 36rpx;"></image>
			</view>
		</view>

	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import {
		Component
	} from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import {
		dateFormat
	} from "../../tools/util";
	@Component({})
	export default class ClassName extends BaseNode {
		chooseId = 0; //0代表选中拼团结果，展示下划线； 1代表选中拆卡报告，展示下划线 ；
		goodCode = '';
		itemListName = ['用户', '编号', '获取时间'];
		itemListName2 = ['用户', '编号', '获取时间', '图片'];
		teamDataList = [];
		teamDataList2 = [];
		currentPage = 1;
		noMore = false;
		onLoad(query: any) {
			if (query.chooseIds) {
				console.log(query)
				this.chooseId = query.chooseIds;
				this.goodCode = query.code
				if(this.chooseId===0){
					this.getTpCardNo()
				}else{
					this.getTpCardNoResult()
				}
			}

		}
		getTpCardNo(){
			if(this.noMore){
				return;
			}
			let params = {
				pageIndex:this.currentPage,
				pageSize:20
			}
			app.http.Get('good/'+this.goodCode+'/cardNo',params,(res:any)=>{
				if(res.list){
					this.teamDataList = res.list
				}else{
					this.noMore = true
				}
				
				this.currentPage++;
			})
		}
		getTpCardNoResult(){
			if(this.noMore){
				return;
			}
			let params = {
				pageIndex:this.currentPage,
				pageSize:20
			}
			app.http.Get('good/'+this.goodCode+'/cardNoResult',params,(res:any)=>{
				if(res.list){
					this.teamDataList = res.list
				}else{
					this.noMore = true
				}
				
				this.currentPage++;
			})
		}
		onClickBack() {
			uni.navigateBack({
				delta: 1
			});
		}

		onClickGroupBookingResult() {
			console.log('拼团结果')
			this.resetInfo()
			this.chooseId = 0;
			this.getTpCardNo()
		}

		onClickSplitCardsReport() {
			console.log('拆卡报告')
			this.resetInfo()
			this.chooseId = 1;
			this.getTpCardNoResult()
		}
		resetInfo(){
			this.currentPage = 1;
			this.noMore = false;
			this.teamDataList = [];
			this.teamDataList2 = []
		}
		onClickSearch() {
			console.log('搜索')
		}

		onClickTranslate() {
			console.log('翻译')
		}
	}
</script>

<style lang="scss">
	$font-22:22rpx;
	$font-24:24rpx;
	$font-32:32rpx;

	.header-banner {
		width: 100%;
		background: #fff;
		position: fixed;
		left: 0;
		top: 0;
		box-sizing: border-box;
		z-index: 10;

		.tab-header {
			width: 100%;
			height: 88rpx;
			display: flex;
			box-sizing: border-box;
			padding: 0 30rpx;
			position: relative;
			z-index: 10;
			align-items: center;
			justify-content: center;
		}

		.icon-back {
			width: 80rpx;
			height: 88rpx;
			background: url(../../static/goods/back@2x.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			left: 0;
			top: 0;
		}

		.header-title {
			font-size: $font-32;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #14151A;
			line-height: 88rpx;

			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.cross-line-down {
			width: 28rpx;
			height: 6rpx;
			background: #14151A;
			border-radius: 3rpx;
		}

		.header-title2 {
			font-size: $font-32;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #A9ABB4;
			line-height: 88rpx;

			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}

	.tab-header {
		width: 100%;
		height: 104rpx;

		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 20rpx;
		z-index: 10;
	}

	.item-content {
		width: 710rpx;
		height: 60rpx;
		background: linear-gradient(90deg, #FD8339 0%, #F24B28 100%);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.title-middle {
		font-size: $font-22;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 32rpx;
	}

	.title-middle-pin {
		width: 710rpx;
		height: 100rpx;
		background: #F6F6F7;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;

		font-size: $font-24;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
		line-height: 34rpx;
	}

	.title-middle-pin2 {
		width: 710rpx;
		height: 100rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;

		font-size: $font-24;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
		line-height: 34rpx;
	}

	.text-name {
		text-align: center;
		padding-left: 52rpx;
		padding-right: 44rpx;
	}

	.text-name2 {
		width: 55%;
		text-align: center;
		margin-left: 38rpx;
		margin-right: 36rpx;
	}

	.text-name3 {
		width: 20%;
		text-align: center;
	}

	.item-bh {
		width: 190rpx;
		text-align: center;
		margin-left: 28rpx;
		margin-right: 20rpx;
	}

	.item-name {
		width: 72rpx;
		text-align: center;
		margin-left: 38rpx;
	}

	.item-time {
		width: 122rpx;
		text-align: center;
		margin-right: 72rpx;
	}

	.title-middle-chai {
		width: 710rpx;
		height: 152rpx;
		background: #F6F6F7;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;

		font-size: $font-24;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
		line-height: 34rpx;
	}

	.title-middle-chai2 {
		width: 710rpx;
		height: 152rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;

		font-size: $font-24;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
		line-height: 34rpx;
	}
	.empty{
		width: 100%;
		text-align: center;
		color:#bbb;
		font-size: 20rpx;
		margin-top: 20rpx;
	}
</style>
