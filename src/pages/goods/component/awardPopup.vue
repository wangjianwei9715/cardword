<!--
 * @FilePath: \jichao_app_2\src\pages\goods\component\awardPopup.vue
 * @Author: wjw
 * @Date: 2023-05-26 16:52:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-11-28 14:19:15
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view>
		<u-popup :show="popupShow" :round="5" bgColor="#3C5E63" @close="popupShow=false">
			<view class="popup-box">
				<view class="popup-navigation">搓卡密 实时掉落好物</view>
				<view>{{awardNum.sole}}份指定卡密奖励 {{awardNum.random}}份随机卡密奖励</view>
				<u-list @scrolltolower="getAwardList" height="900rpx" >
					<u-list-item class="popup-listitem" v-for="(item, index) in awardList" :key="index" >
						<view class="popup-list-header">
							<view class="popup-header-rname">{{item.name}}</view>
						</view>
						<view class="popup-item-box">
							<muqian-lazyLoad class="popup-item-pic" :src="item.pic" mode="aspectFill" borderRadius="5rpx" @click="previewImage(item)"></muqian-lazyLoad>
						</view>
					</u-list-item>
				</u-list>
			</view>
		</u-popup>
		<previewImage ref="previewImage" />
	</view>
</template>

<script lang="ts">
	import { Component, Prop} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	class ListParams {
		pageIndex = 1;
		pageSize = 10;
		isFetchEnd = false;
	}
	@Component({})
	export default class ClassName extends BaseComponent {
		isPullDown = app.platform.isPullDown;
		listParams = new ListParams();
		goodCode=""
		popupShow=false;
		awardList:any = [];
		awardNum={
			sole:0,
			random:0
		}
		created(){
		}
		mounted(){
		}
		destroyed(){
		}
		showAwardPopup(goodCode:string){
			this.goodCode = goodCode;
			this.getAwardList();
			this.isPullDown(true);
			this.popupShow=true;
		}
		getAwardList(){
			const { listParams } = this;
			if(listParams.isFetchEnd) return;

			app.http.GetWithCrypto(`dataApi/good/${this.goodCode}/noAward/list`, listParams,
				(res:any)=>{
					this.awardNum.sole=res.num2;
					this.awardNum.random=res.num1;
					res.list && (this.awardList = [...this.awardList,...res.list]);
					this.listParams.isFetchEnd = res.totalPage<=listParams.pageIndex;
					this.listParams.pageIndex++;
					this.isPullDown(false);
				}
			)
		}
		previewImage(item: any) {
			this.$refs.previewImage.show({
				urls: [{ src: decodeURIComponent(item.pic), title: item.name }]
			})
		}
    
	}
</script>

<style lang="scss" scoped>
	.popup-box{
		width: 100%;
		height:1000rpx;
		.popup-navigation{
			width: 100%;
			height:100rpx;
			box-sizing: border-box;
			border-bottom: 1px solid rgba(232, 232, 232, 0.23);
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
		}
		.popup-listitem{
			width: 650rpx;
			margin:0 auto;
			border-bottom:1px solid #fff;
			color:#fff;
			box-sizing: border-box;
			padding:20rpx 0;
		}
		.popup-list-header{
			width: 100%;
			display: flex;
			justify-content: space-between;
		}
		.popup-header-rank{
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
		}
		.popup-header-rname{
			font-size: 27rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			text-align: center;
		}
		.popup-item-box{
			width: 100%;
			height:100rpx;
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.popup-item-left{
			width: 520rpx;
			height:100rpx;
			display: flex;
		}
		.popup-item-info{
			width: 400rpx;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			box-sizing: border-box;
			padding:10rpx 0 
		}
		.info-name{
			width: 100%;
			font-size: 27rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
		}
		.info-time{
			width: 100%;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
		.popup-item-avatar{
			width: 100rpx;
			height:100rpx;
			margin-right: 20rpx;
		}
		.popup-item-pic{
			width: 100rpx;
			height:100rpx;
		}
	}
</style>
