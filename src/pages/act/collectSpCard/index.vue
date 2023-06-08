<!--
 * @FilePath: \jichao_app_2\src\pages\act\collectSpCard\index.vue
 * @Author: wjw
 * @Date: 2023-05-26 16:52:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-08 09:22:16
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="content">
        <view class="act-bg"></view>
        <view class="act-box">
			<view class="act-right-icon" :style="{paddingTop:`${statusBarHeight}px`}">
				<navigator url="/pages/act/collectSpCard/rule" class="act-right-rule"></navigator>
				<navigator url="/pages/act/collectSpCard/record" class="act-right-record"></navigator>
			</view>
			<image class="act-title" src="@/static/act/collectSpCard/title.png"/>
			<!-- 卡组列表 -->
			<spSwiper :current.sync="groupCurrent" :list="groupList" @change="onChangeGroup"/>
			<!-- 集齐奖励列表 -->
			<rewardScroll :groupReward="groupReward" />
			<!-- 卡组详情 -->
			<detail :getCurrentGroup="getCurrentGroup" :groupReward="groupReward" :detail.sync="groupDetail" @giveSuccess="getDetail()"/>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
    import spSwiper from './components/spSwiper.vue';
	import rewardScroll from './components/rewardScroll.vue';
	import detail from './components/detail.vue'
	interface groupItem{
		id: number, //
		name: string, //卡组名称
		pic: string, //
		maxSetNum: number, //允许最大可集齐数量,0代表无限
		collectedSetNum: number, //已集齐数量
		startAt: number, //开始时间
		[x:string]:any
	}
	
	@Component({
        components:{spSwiper,rewardScroll,detail}
    })
	export default class ClassName extends BaseNode {
		statusBarHeight = app.statusBarHeight;
		groupCurrent = 0;
		groupList:groupItem[] = [
			{id: 1, name: '绝杀特卡', pic: 'http://cdn.ka-world.com/admin/debug/2023.05.29/goods/pintuan0/1685348082327rg7zpaz63r.jpg', maxSetNum: 10,  collectedSetNum: 1, startAt: 1,start:true},
			{id: 2, name: '火焰特卡', pic: 'http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png', maxSetNum: 0,  collectedSetNum: 5, startAt: 1,start:true},
			{id: 3, name: '时刻特卡', pic: 'http://cdn.ka-world.com/admin/debug/2023.05.29/goods/pintuan0/1685343611785mkp72m7wqz.jpg', maxSetNum: 15,  collectedSetNum: 0, startAt: 1,start:false},
			{id: 4, name: '聚光灯特卡', pic: 'http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png', maxSetNum: 8,  collectedSetNum: 2, startAt: 1,start:true},
			{id: 5, name: '钻石特卡', pic: 'http://cdn.ka-world.com/admin/debug/2023.05.29/goods/pintuan0/1685348082327rg7zpaz63r.jpg', maxSetNum: 5,  collectedSetNum: 4, startAt: 1,start:true},
			{id: 6, name: '绝杀6', pic: 'http://cdn.ka-world.com/admin/debug/2023.05.29/goods/pintuan0/1685343611785mkp72m7wqz.jpg', maxSetNum: 20,  collectedSetNum: 5, startAt: 1,start:true},
			{id: 7, name: '绝杀7', pic: 'http://cdn.ka-world.com/admin/debug/2023.05.29/goods/pintuan0/1685348082327rg7zpaz63r.jpg', maxSetNum: 0,  collectedSetNum: 0, startAt: 1,start:false},
			{id: 8, name: '绝杀8', pic: 'http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png', maxSetNum: 50,  collectedSetNum: 10, startAt: 1,start:true},
			{id: 9, name: '绝杀9', pic: 'http://cdn.ka-world.com/admin/debug/2023.05.29/goods/pintuan0/1685343611785mkp72m7wqz.jpg', maxSetNum: 10,  collectedSetNum: 2, startAt: 1,start:true},
			{id: 10, name: '绝杀10', pic: 'http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png', maxSetNum: 20,  collectedSetNum: 8, startAt: 1,start:true},
		];
		groupReward:any[] = [
			{ "name": "iphone 14", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png", "rankStart": 1, "rankEnd": 1, "isHigh": true },
			{ "name": "ssss2", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.29/goods/pintuan0/1685348082327rg7zpaz63r.jpg", "rankStart": 2, "rankEnd": 3, "isHigh": true },
			{ "name": "ssss3", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png", "rankStart": 4, "rankEnd": 6, "isHigh": true },
			{ "name": "ssss4", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.29/goods/pintuan0/1685343611785mkp72m7wqz.jpg", "rankStart": 7, "rankEnd": 10, "isHigh": true },
			{ "name": "ssss5", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.29/goods/pintuan0/1685348082327rg7zpaz63r.jpg", "rankStart": 11, "rankEnd": 20, "isHigh": true },
			{ "name": "ssss6", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.29/goods/pintuan0/1685343611785mkp72m7wqz.jpg", "rankStart": 21, "rankEnd": 0, "isHigh": true },
		];
		groupDetail:any[] = [
			{ "id": 1, "name": "勒布朗詹姆斯", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png", "collectNum": 1 ,"giveNum":0},
			{ "id": 2, "name": "勒布朗詹姆斯", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png", "collectNum": 0 ,"giveNum":0},
			{ "id": 3, "name": "勒布朗詹姆斯", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png", "collectNum": 5 ,"giveNum":0},
			{ "id": 4, "name": "勒布朗詹姆斯", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png", "collectNum": 9 ,"giveNum":0},
			{ "id": 5, "name": "勒布朗詹姆斯", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png", "collectNum": 12 ,"giveNum":0},
			{ "id": 6, "name": "勒布朗詹姆斯", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png", "collectNum": 0 ,"giveNum":0},
			{ "id": 1, "name": "勒布朗詹姆斯", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png", "collectNum": 1 ,"giveNum":0},
			{ "id": 2, "name": "勒布朗詹姆斯", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png", "collectNum": 0 ,"giveNum":0},
			{ "id": 3, "name": "勒布朗詹姆斯", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png", "collectNum": 5 ,"giveNum":0},
			{ "id": 4, "name": "勒布朗詹姆斯", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png", "collectNum": 9 ,"giveNum":0},
			{ "id": 5, "name": "勒布朗詹姆斯", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png", "collectNum": 12 ,"giveNum":0},
			{ "id": 6, "name": "勒布朗詹姆斯", "pic": "http://cdn.ka-world.com/admin/debug/2023.05.26/goods/pintuan0/1685081767360vtzheesya.png", "collectNum": 0 ,"giveNum":0}
		];
        onLoad(query:any) {
			
		}
		onShow(){
			app.platform.hasLoginToken(()=>{
				this.getGroupList()
			})
		}
		onPullDownRefresh() {
			// this.getGroupList((() => {
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 500)
			// }))
		}
		public get getCurrentGroup() : groupItem {
			return this.groupList.length ? this.groupList[this.groupCurrent]
			: { id: 0, name: '', pic: '', maxSetNum: 0, collectedSetNum: 0, startAt: 0, };
		}
		
		getGroupList(cb?:Function){
			app.http.Get('dataApi/activity/teka/home',{},({list}:any)=>{
				this.groupList = list.map((x:any)=>{
					return {...x,start:app.platform.currentTimestamp()>=x.startAt}
				})
				this.getReward();
				cb?.()
			})
		}
		getReward(change=false){
			app.http.Get(
				`dataApi/activity/teka/award/list/${this.getCurrentGroup.id}`,
				{},
				({list, collectedSetNum}:any)=>{
					this.groupReward = list || [];
					change && (this.getCurrentGroup.collectedSetNum = collectedSetNum);
				}
			)
			this.getDetail()
		}
		getDetail(){
			app.http.Get(
				`dataApi/activity/teka/group/detail/${this.getCurrentGroup.id}`,
				{},
				({list}:any)=>{
					this.groupDetail = list || [];
				}
			)
		}
		onChangeGroup(){
			// const start = !this.getCurrentGroup.start && ( app.platform.currentTimestamp() >= this.getCurrentGroup.startAt);
			// start ? this.getGroupList() : this.getReward(true);
		}
		
	}
</script>

<style lang="scss">
    page{
        background:#000
    }
	.content{
		width: 100%;
		box-sizing:border-box;
        background:#000;
		padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
	}
	.act-bg{
		width: 100%;
		height:2300rpx;
		background: url(@/static/act/collectSpCard/bg.jpg) no-repeat top / cover;
		position:absolute;
		left:0;
		top:0;
		right: 0;
		z-index: 1;
	}
	.act-box{
		position: relative;
		z-index: 2;
		box-sizing: border-box;
		padding-top: 129rpx;
		.act-right-icon{
			width: 135rpx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			position: absolute;
			right:8rpx;
			top:136rpx;
			z-index: 3;
			.act-right-rule{
				width: 135rpx;
				height:52rpx;
				background:url(@/static/act/collectSpCard/icon_rule.png) no-repeat center / 100% 100%;
				margin-bottom: 16rpx;
			}
			.act-right-record{
				width: 135rpx;
				height:52rpx;
				background:url(@/static/act/collectSpCard/icon_record.png) no-repeat center / 100% 100%;
			}
		}
		.act-title{
			width: 100%;
			height:562rpx;
		}
	}
	
</style>
