<!--
 * @FilePath: \jichao_app_2\src\pages\act\collectSpCard\record.vue
 * @Author: wjw
 * @Date: 2023-05-26 14:33:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-27 18:19:10
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="content">
		<u-sticky class="header-tab">
			<tabc :tabc="tabData" :tabsCheck="tabCheck" @tabsClick="onClickListTabs"></tabc>
		</u-sticky>
		<view class="list-box">
			<view class="list-reward" v-show="tabCheck==1">
				<view class="reward-item" v-for="(item,index) in list" :key="index">
					<view class="reward-header">
						<muqian-lazyLoad class="reward-pic" borderRadius="5rpx" :src="decodeURIComponent(item.pic)" mode="aspectFill"></muqian-lazyLoad>
						<view class="reward-info">
							<view class="reward-info-title">{{item.name}}</view>
							<view class="reward-info-group">{{item.groupName}}</view>
							<view class="reward-info-time">发放时间：{{$u.timeFormat(item.created_at,'yyyy-mm-dd hh:MM')}}</view>
						</view>
					</view>
					<view class="reward-bottom">
						<view class="reward-state">{{awardStateMap[item.state]}}</view>
						<view class="reward-btn gray-btn" v-if="item.state==1">查看物流</view>
						<view class="reward-btn" v-else @click="onClickAwardBtn(item)">{{awardBtnMsg(item.state)}}</view>
					</view>
				</view>
			</view>
			<view class="list-group" v-show="tabCheck==2">
				<view class="group-item" v-for="(item,index) in list" :key="index">
					<muqian-lazyLoad class="group-pic" borderRadius="5rpx" :src="decodeURIComponent(item.pic)" mode="aspectFill"></muqian-lazyLoad>
					<view class="group-info">
						<view class="group-info-res" :class="{'red-font':[1,3].includes(item.status)}">{{resMap[item.status]}}</view>
						<view class="group-info-title">{{item.groupName}}-{{item.playerName}}</view>
						<view class="group-info-group">{{groupTime(item)}}</view>
						<view class="group-info-orther" @click="onClickGoOrder(item)">
							<view class="group-info-msg">{{groupOrther(item)}}</view>
							<image v-show="[0,1].includes(item.status)" class="group-info-right" src="@/static/goods/jinru@2x.png"/>
						</view>
					</view>
				</view>
			</view>
		</view>
		<empty v-show="empty" />

		<u-modal :show="wuliu.show" title="填写物流信息" width="550rpx" :showConfirmButton="false" :closeOnClickOverlay="true" @close="wuliu.show=false">
			<view style="width:100%" slot="default">
				<view class="address-box">
					<view class="address-title">{{wuliu.data.name}} {{wuliu.data.phone}}</view>
					<view class="address-desc">{{wuliu.data.district}}{{wuliu.data.detail}}</view>
				</view>
				<view class="address-btn-box">
					<view class="address-btn-small btn-cancel" @click="onClickAddress">修改地址</view>
					<view class="address-btn-small" @click="onClickDeliver">申请发货</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	const awardStateMap = {
		0:"待提交",
		1:"待发货",
		2:"已发货",
		3:"已发放"
	}
	const resMap = {
		0:"待累计",
		1:"拼团+1",
		2:"赠送-1",
		3:"收赠+1"
	}
	const urlMap:{[key:number]:string} = {
		1:'activity/teka/award/record',
		2:'activity/teka/collect/record'
	}
	class ListParams {
		fetchFrom:number=1;
		fetchSize:number=10;
		noMoreData:boolean=false
	}
	@Component({})
	export default class ClassName extends BaseNode {
		awardStateMap = awardStateMap;
		resMap = resMap;
		tabCheck = 1;
		tabData = [
			{id:1,name:'奖品明细'},
			{id:2,name:'特卡明细'}
		];
		listParams = new ListParams()
		list = [];
		empty = false;
		wuliu = {
			show:false,
			id:0,
			data:{}
		}
        onLoad(query:any) {
			this.reqNewData();
			this.onEventUI("addressSelect", (data) => {
				this.wuliu.data = data.data;
			});
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData() 
		}
		awardBtnMsg(state:number){
			return state==0?"申请发货":(state==3?"去查看":"查看物流")
		}
		groupTime(item:any){
			const time = item.status==0?"- (拼成后累计)":uni.$u.timeFormat(item.updated_at,'yyyy-mm-dd hh:MM');
			return `${item.status==3?"收到":(item.status==2?"赠送":"获得")}时间：${time}`
		}
		groupOrther(item:any){
			return [2,3].includes(item.status)?`对方ID：${item.relativeId}`:`订单编号：${item.orderCode}`;
		}
		getDelivery(){
			if(Object.keys(this.wuliu.data).length!==0) return;
			
			app.http.Get("me/delivery", {}, (res: any) => {
				if (res.list) {
					this.wuliu.data = res.list.find((x:any)=>x.default) || res.list[0];
				}
			});
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
			this.listParams = new ListParams()
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
		onClickAwardBtn(item:any){
			if(item.state==0){
				this.getDelivery()
				this.wuliu.id = item.id;
				this.wuliu.show = true;
			}else if(item.state==3){
				uni.navigateTo({url:"/pages/userinfo/coupon/coupon"})
			}else if(item.state==2&&item.wlCode!=''){
				uni.navigateTo({
					url: `/pages/userinfo/order_logistics?code=${item.wlCode}`,
				});
			}
		}
		onClickAddress() {
			uni.navigateTo({
				url: "/pages/userinfo/setting_addresses?type=act",
			});
		}
		onClickDeliver(){
			app.http.Post(`activity/teka/award/apply/deliver/${this.wuliu.id}`,{},(res:any)=>{
				uni.showToast({
					title:'申请成功',
					icon:'none'
				});
				this.refreshList();
				this.wuliu.show=false;
			})
		}
		onClickGoOrder(item:any){
			if([0,1].includes(item.status)){
				app.navigateTo.goOrderDetails(item.orderCode)
			}
		}
	}
</script>

<style lang="scss">
    page{
        background:#F6F7F8;
    }
	.header-tab{
		width: 100%;
		background:#fff !important;
		height:90rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #F1F1F4;
		padding:0 100rpx;
	}
	.list-box{
		width: 100%;
		box-sizing: border-box;
		padding:20rpx;
	}
	.reward-item{
		width: 100%;
		box-sizing: border-box;
		background: #fff;
		border-radius: 5rpx;
		margin-bottom: 20rpx;
		padding:20rpx;
		.reward-header{
			width: 100%;
			height:160rpx;
			display: flex;
		}
		.reward-pic{
			width: 160rpx;
			height:160rpx;
			margin-right: 30rpx;
		}
		.reward-info{
			width: 480rpx;
			height:160rpx;
			position: relative;
		}
		.reward-info-title{
			width: 100%;
			color:#333;
			font-weight: bold;
			font-size: 27rpx;
		}
		.reward-info-group{
			width: 100%;
			color:#909090;
			font-size: 23rpx;
			font-weight: 400;
			margin-top: 10rpx;
		}
		.reward-info-time{
			width: 100%;
			position:absolute;
			left:0;
			bottom:10rpx;
			color:#909090;
			font-size: 23rpx;
			font-weight: 400;
		}
		.reward-bottom{
			width: 100%;
			height:60rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 20rpx;
		}
		.reward-state{
			color:#333;
			font-weight: bold;
			font-size: 27rpx;
		}
		.reward-btn{
			width: 146rpx;
			height:60rpx;
			background: $btn-red;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FFFFFF;
			font-size: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 400;
			border-radius: 5rpx;
		}
		.gray-btn{
			background:#c4c6c9
		}
		
	}
	.group-item{
		width: 100%;
		box-sizing: border-box;
		background: #fff;
		border-radius: 5rpx;
		margin-bottom: 20rpx;
		padding:20rpx;
		display: flex;
		.group-pic{
			width: 160rpx;
			height:180rpx;
			margin-right: 30rpx;
		}
		.group-info{
			width: 480rpx;
			height:180rpx;
			position: relative;
		}
		.group-info-title{
			width: 100%;
			color:#333;
			font-weight: bold;
			font-size: 27rpx;
		}
		.group-info-group{
			width: 100%;
			color:#909090;
			font-size: 23rpx;
			font-weight: 400;
			margin-top: 10rpx;
		}
		.group-info-orther{
			width: 100%;
			display: flex;
			justify-content: space-between;
			color:#909090;
			font-size: 23rpx;
			font-weight: 400;
			position:absolute;
			left:0;
			bottom:10rpx;
			align-items: center;
		}
		.group-info-msg{
			color:#909090;
			font-size: 23rpx;
			font-weight: 400;
		}
		.group-info-res{
			position: absolute;
			right:0;
			top:0;
			color:#53C21D;
			font-size: 30rpx;
			font-weight: bold;
		}
		.red-font{
			color:#fa1545
		}
	}
	.group-info-right{
		width: 10rpx;
		height:16rpx;
	}
	.address-btn-box{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.address-btn-small{
		width: 200rpx;
		background: $btn-red;
		text-align: center;
		font-family: PingFangSC-Semibold;
		color: #FFFFFF;
		height: $btn-height;
		line-height: $btn-height;
		font-size: $btn-fontSize;
		border-radius: $btn-radius;
		font-weight: 600;
	}
	.btn-cancel{
		border: 1rpx solid #949494;
		background:#fff;
		color:#333
	}
	.address-box{
		margin:20rpx 0 50rpx 0;
	}
	.address-title{
		width: 100%;
		color:#333;
		font-size: 27rpx;
		font-weight: bold;
	}
	.address-desc{
		width: 100%;
		color:#909090;
		font-size: 23rpx;
		font-weight: 400;
		margin-top: 10rpx;
	}
</style>
