<!--
 * @FilePath: \jichao_app_2\src\pages\act\collectSpCard\index.vue
 * @Author: wjw
 * @Date: 2023-05-26 16:52:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-25 10:26:22
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
			<detail :getCurrentGroup="getCurrentGroup" :groupReward="groupReward" :detail.sync="groupDetail"/>
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
		playerNum: number, //球员数量
		getPlayerNum: number, //已拥有球员数量
		startAt: number, //开始时间
		[x:string]:any
	}
	
	@Component({
        components:{spSwiper,rewardScroll,detail}
    })
	export default class ClassName extends BaseNode {
		statusBarHeight = app.statusBarHeight;
		groupCurrent = 0;
		groupList:groupItem[] = [];
		groupReward:any[] = [];
		groupDetail:any[] = [];
        onLoad(query:any) {
		}
		onShow(){
			app.platform.hasLoginToken(()=>{
				this.getGroupList()
			})
		}
		onPullDownRefresh() {
			this.getGroupList((() => {
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 500)
			}))
		}
		public get getCurrentGroup() : groupItem {
			return this.groupList.length ? this.groupList[this.groupCurrent]
			: { id: 0, name: '', pic: '', playerNum: 0, getPlayerNum: 0, startAt: 0, };
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
		getReward(){
			app.http.Get(
				`dataApi/activity/teka/award/list/${this.getCurrentGroup.id}`,
				{},
				({list, collectedSetNum}:any)=>{
					this.groupReward = list || [];
					this.getCurrentGroup.collectedSetNum = collectedSetNum;
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
			const start = !this.getCurrentGroup.start && ( app.platform.currentTimestamp() >= this.getCurrentGroup.startAt);
			start ? this.getGroupList() : this.getReward();
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
		padding-bottom:100rpx;
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
