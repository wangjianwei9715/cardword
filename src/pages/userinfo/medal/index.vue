<!--
 * @FilePath: \jichao_app_2\src\pages\userinfo\medal\index.vue
 * @Author: wjw
 * @Date: 2024-05-11 13:34:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-05-14 16:09:14
 * Copyright: 2024 .
 * @Descripttion: 
-->
<template>
	<view class="box-content">
		<transitionNav :needIconShadow="false" :slotLeftReverseSide="true" ref="transitionNav" :whiteBack="true" navColor="29,30,34" title="" style="z-index: 999;">
			<template slot="slotLeft">
                <view class="nav-left">
					<image class="left-avatar" :src="userInfo.avatar"/>
					<view class="left-username">{{userInfo.userName}}</view>
				</view>
            </template>
            <template slot="slotRight">
                <!-- <view :style="{color:'#fff'}" @click="pageJump('/pages/userinfo/medal/index')">勋章榜</view> -->
            </template>
        </transitionNav>
		<view class="medal-top">
			<view class="medal-ray">
				<view class="medal-platform">
					<image class="platform-pic" :src="userInfo.medal?userInfo.medal.pic:''"/>
					<view v-if="isMine" class="platform-btn" @click="pageJump(`/pages/userinfo/medal/wear?medalName=${userInfo.medal?userInfo.medal.name:''}`)">勋章管理</view>
				</view>
			</view>
			<view class="medal-userinfo">
				<view class="avatar-box">
					<image class="avatar" :src="userInfo.avatar"/>
				</view>
				<view class="info-box">
					<view class="info-name">{{userInfo.userName}}</view>
					<view class="info-tips">超越<text class="info-num">{{userInfo.rank_percent}}</text>的卡迷</view>
				</view>
			</view>
			<view class="medal-rank">
				<view class="rank-box">{{userInfo.getNum}}</view>
				<view class="rank-tips">勋章数</view>
			</view>
		</view>
		<u-sticky :customNavHeight="navHeight">
			<view class="sticky-content">
				<u-tabs class="sticky-tabs" :list="typeTabs" :current="tabCurrent" :lineColor="`url(${lineBg}) 100% 100%`" lineHeight="5rpx"  @click="onClickTabs" 	:itemStyle="{ width: '134rpx', height: '64rpx', padding: 0 }" :inactiveStyle="{fontSize:'26rpx',color:'#B0B0B0',padding:'0 0'}" :activeStyle="{fontSize:'28rpx',color:'#FFFFFF',fontWeight:600,padding:'0 0'}"
				></u-tabs>
			</view>
        </u-sticky>
		<view class="medal-content">
			<u-grid>
				<u-grid-item
					:customStyle="{width:'203rpx',height:'220rpx'}"
					v-for="(item, index) in medalList"
					:index="index"
					:key="index"
					@click="goMedalDetail(item.id)"
				>
					<image class="grid-pic" :src="item.pic"/>
					<text class="grid-text">{{ item.name }}</text>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '@/base/BaseNode.vue';
	class ListParams {
		pageIndex=1;
		pageSize=10;
		isFetchEnd=false
	}
	const navHeight = app.statusBarHeight + uni.upx2px(88);
	const lineBg = "/static/medal/tab_line.png"
	const typeTabs = [
		{name:"全部",type:0},
		{name:"历程",type:1},
		{name:"球员",type:2},
		{name:"球队",type:3},
		{name:"活动",type:5},
	]
	@Component({
		components:{}
	})
	export default class ClassName extends BaseNode {
		app = app;
		listParams = new ListParams()
		pageJump = app.navigateTo.pageJump;
		userId = 0;
		homeUserId = 0;
		userInfo:any = {};
		navHeight = navHeight;
		typeTabs = typeTabs;
		lineBg = lineBg;
		tabCurrent = 0;
		medalList = []
		onLoad(query:any) {
			this.homeUserId = +query.userId;
			app.user.getAppDataUserId().then((res:any)=>{
				this.userId = res;
				if(query.userId==0) this.homeUserId = this.userId; 
			});
			this.medalHome();
			this.getMedalList();
			if(query.medalId>0){
				this.goMedalDetail(query.medalId)
			}

			uni.$on("wearChange",(res:any)=>{
				this.$set(this.userInfo,'medal',res=="unwear"?{}:res)
			})
		}
		onPageScroll(data: any) {
			//@ts-ignore
			this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
		}
		//   加载更多数据
		onReachBottom() {
			this.getMedalList()
		}
		get isMine(){
			return this.userId!=0 && (this.userId==this.homeUserId)
		}
		get tabCurrentType(){
			return typeTabs[this.tabCurrent].type
		}
		goMedalDetail(id:number){
			this.pageJump(`/pages/userinfo/medal/detail?id=${id}`)
		}
		medalHome(){
			app.http.Get('dataApi/medal/user/home',{},(res:any)=>{
				this.userInfo = res.data
			})
		}
		getMedalList(){
			if(this.listParams.isFetchEnd) return;
			app.http.Get('dataApi/medal/userMedal/list',{...this.listParams,type:this.tabCurrentType},(res:any)=>{
				if(res.list){
					this.medalList = this.listParams.pageIndex==1 ? res.list : [...this.medalList,...res.list];
				};
				this.listParams.isFetchEnd = res.isFetchEnd;
				this.listParams.pageIndex ++;
				
			})
		}
		onClickTabs({index}:any){
			if(this.tabCurrent == index) return;
			this.tabCurrent = index;
			this.listParams = new ListParams();
			this.getMedalList()
		}
	}
</script>

<style lang="scss">
	@mixin fontSfTR($fontSize) {
		font-family: SfTR;
		color:#fff;
		font-size: $fontSize;
		letter-spacing: 2rpx;
	}
	page{
		width: 100%;
		height:100%;
		background:#1D1E22
	}
	.box-content{
		box-sizing: border-box;
		padding-bottom: 50rpx;
	}
	.medal-top{
		width: 100%;
		height:428rpx;
		position: relative;
		box-sizing: border-box;
		padding: 150rpx 0 0 43rpx;
		.medal-ray{
			width: 670rpx;
			height:428rpx;
			position: absolute;
			right:0;
			top:0;
			background: url(@/static/medal/ray.png) no-repeat center / 100% 100%;
		}
		.medal-platform{
			width: 446rpx;
			height:422rpx;
			position: absolute;
			right:0;
			top:0;
			background: url(@/static/medal/platform.png) no-repeat center / 100% 100%;
			.platform-btn{
				width: 114rpx;
				height: 41rpx;
				background: rgba(176,176,176,0.43);
				border-radius: 3rpx;
				border: 0.8px solid #FFFFFF;
				@include fontSfTR(22rpx);
				text-align: center;
				line-height: 41rpx;
				position: absolute;
				bottom:39rpx;
				left:50%;
				margin-left: -57rpx;
			}
			.platform-pic{
				width: 151rpx;
				height:151rpx;
				border-radius: 50%;
				position: absolute;
				top:152rpx;
				right:146rpx;
			}
		}
		.medal-userinfo{
			width: 100%;
			height:120rpx;
			display: flex;
			align-items: center;
			.avatar-box{
				width: 120rpx;
				height:120rpx;
				background: url(@/static/medal/avatar_bg.png) no-repeat center / 100% 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				.avatar{
					width: 75rpx;
					height:75rpx;
					border-radius: 50%;
				}
			}
			.info-box{
				height:120rpx;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				box-sizing: border-box;
				padding:25rpx 0;
			}
			.info-name{
				width: 100%;
				@include fontSfTR(28rpx);
				font-weight: bold
			}
			.info-tips{
				@include fontSfTR(22rpx);
			}
			.info-num{
				font-family: Impact;
			}
		}
		.medal-rank{
			width: 83rpx;
			margin:20rpx 0 0 16rpx;
			.rank-box{
				width: 83rpx;
				height:53rpx;
				background: url(@/static/medal/rank_bg.png) no-repeat center / 100% 100%;
				text-align: center;
				line-height:50rpx;
				font-family: Impact;
				font-weight: 400;
				font-size: 44rpx;
				color: #EEDA94;
			}
			.rank-tips{
				width: 100%;
				margin-top: 10rpx;
				text-align: center;
				@include fontSfTR(22rpx);
			}
		}
	}
	.sticky-content{
		width: 100%;
		box-sizing: border-box;
		padding: 0 38rpx;
	}
	.sticky-tabs{
		width: 100%;
		background:#1D1E22;
	}
	.medal-content{
		width: 674rpx;
		margin:0 auto;
		box-sizing: border-box;
		padding:36rpx 32rpx;
		background: linear-gradient(160deg, #2C2E33 0%, #1D1E22 49%, #14151A 100%);
		border-radius: 8rpx;
		margin-top: 16rpx;
	}
	.grid-pic{
		width: 154rpx;
		height:141rpx;
		margin-bottom: 18rpx
	}
	.grid-text{
		@include fontSfTR(24rpx);
	}
	.nav-left{
		height:88rpx;
		display: flex;
		align-items: center;
		.left-avatar{
			width: 80rpx;
			height:80rpx;
			border-radius: 50%;
			margin-right: 10rpx;
		}
		.left-username{
			@include fontSfTR(20rpx);
		}
	}
</style>
