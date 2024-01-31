<template>
	<view class="flaw-list" :class="{'flaw':showFl}">
		<view class="bg-color" ></view>
		<view class="act-content">
			<view class="act-header">
				<view class="ill-btn" @click="onClickGoIll()"></view>
				<view class="act-icon" @click="onClickChangeAct()">
					<view class="icon-tips"></view>
					<view class="icon-rotate"></view>
				</view>
			</view>
			<view class="logo-content" @click="onClickGoIndex()">
				<image class="logo-msg" :src="`/static/act/immfl/${showFl?'flaw':'imm'}_msg.png`"/>
			</view>
			<view class="tabs-index">
				<u-tabs :itemStyle="{height:'90rpx',lineHeight:'86rpx',padding:0}" :activeStyle="{...activeStyle,'color':showFl?'#8EDBFF':'#FFE63B'}" :inactiveStyle="inactiveStyle" lineHeight="0" :list="tabsList" :current="tabsCurrent" @click="onClickListTabs" @sort="onChangeSort">
					<template slot="sort">
						<view class="sort-box" :class="sortUp"></view>
						<view class="sort-box" :class="sortDown"></view>
					</template>
				</u-tabs>
			</view>
			<view class="goods-lists">
				<goodslist v-if="goodsList.length" :goodsList="goodsList" @send="onClickJumpDetails" :presell="false" :nomore="listParams.nomore" :progressColor="showFl?'#8EDBFF':'#FFE63B'"/>
				<empty v-if="goodsList&&!goodsList.length&&listParams.nomore" />
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '@/base/BaseNode.vue';
	const ImmSeriesCode = "";
	const FlawSeriesCode = "";
	class ListParams {
		fetchFrom=1;
		fetchSize=10;
		nomore=false;
	}
	@Component({})
	export default class ClassName extends BaseNode {
		flawOpen = false;
		showActType = 1; //0:初始 1:imm 2:手提
		activeStyle={
			"font-size": "30rpx",
			"font-weight":600,
		}
		inactiveStyle={
			"font-size": "30rpx",
			"font-weight":600,
			"color":"#FDFFFF",
		}
		tabsList = [
			{ id: 0, name: "综合" },
			{ id: 1, name: "即将拼成" },
			{ id: 2, name: "最新上架" },
			{ id: 3, name: "单价", sort:"up" }
		];
		tabsCurrent = 0;
		goodsList: any = [];
		listParams = new ListParams();
		onLoad(query:any) {
			this.openConfig()
		}
		onReachBottom() {
			this.reqList();
		}
		public get showFl() : Boolean {
			return this.showActType==2
		}
		public get sortText() : string {
			return this.tabsList[3].sort||""
		}
		public get sortUp() : object {
			const { sortText, tabsCurrent } = this;
			return {
				'icon-sort-upn':sortText!='up'||tabsCurrent!=3,
				'icon-sort-up':sortText=='up'&&tabsCurrent==3
			}
		}
		public get sortDown() : object {
			const { sortText, tabsCurrent } = this;
			return {
				'icon-sort-downn':sortText!='down'||tabsCurrent!=3,
				'icon-sort-down':sortText=='down'&&tabsCurrent==3
			}
		}
		openConfig(){
			app.http.Get("activity/logoman/config",{},(res:any)=>{
				this.flawOpen = res.data.fl;
				this.showActType = res.data.fl?2:1;
				this.reqList()
			})
		}
		onClickChangeAct(){
			if(!this.flawOpen){
				uni.showToast({title:"手提系列暂未上市",icon:"none"});
				return;
			}
			this.showActType = this.showActType==1?2:1;
			this.initList()
		}
		onClickListTabs({id}:any) {
			if (id == this.tabsCurrent) {
				return;
			}
			this.tabsCurrent = id;
			this.initList()
		}
		onChangeSort(sort:string){
			this.tabsList[3].sort = sort;
			this.initList()
		}
		initList(){
			this.listParams = new ListParams();
			this.goodsList = [];
			this.reqList()
		}
		reqList(cb?: any) {
			if(this.listParams.nomore) return;
			const params = {
				tp:this.showActType,
				...this.listParams,
				goodTp:this.tabsCurrent,
				priceOd:this.tabsCurrent == 3 ? (this.tabsList[3].sort=='up'?1:2) : null
			}
			app.http.Get("activity/logoman/goods/list", params, (res: any) => {
				const list = res.list || [];
				this.goodsList = this.listParams.fetchFrom==1 ? list : [...this.goodsList,...list];
				this.listParams.nomore = res.isFetchEnd;
				this.listParams.fetchFrom++;
				cb && cb()
			})
		}
		onClickGoIndex(){
			uni.navigateTo({url:"/pages/act/flawImmAct/index"})
		}
		onClickGoIll(){
			app.navigateTo.goIllSeries(this.showActType==1?ImmSeriesCode:FlawSeriesCode)
		}
		onClickJumpDetails(goodCode: any) {
			app.navigateTo.goGoodsDetails(goodCode)
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
	}
	.flaw-list{
		.tabs-index /deep/ .u-tabs__wrapper__nav{
			justify-content: space-between;
		}
		.bg-color{
			width: 100%;
			height:100%;
			position: fixed;
			top:0;
			left:0;
			z-index: 1;
			background: linear-gradient(180deg, #E3341C, #E67629, #BF7619);
		}
		.act-content{
			width: 100%;
			min-height: 1143rpx;
			box-sizing: border-box;
			position: relative;
			z-index: 2;
			background:url(@/static/act/immfl/imm_bg.png) no-repeat top / 100% 1143rpx;
			.act-header{
				width: 100%;
				height: 591rpx;
				box-sizing: border-box;
				position: relative;
				.ill-btn{
					width: 261rpx;
					height:79rpx;
					background:url(@/static/act/immfl/imm_btn.png) no-repeat center / 100% 100%;
					position: absolute;
					top:394rpx;
					left:31rpx;
					z-index: 2;
				}
				.act-icon{
					width: 707rpx;
					height:420rpx;
					position: absolute;
					top:171rpx;
					left:43rpx;
					background:url(@/static/act/immfl/imm_icon.png) no-repeat center / 100% 100%;
					z-index: 1;
					.icon-tips{
						width: 139rpx;
						height:54rpx;
						position: absolute;
						top:10rpx;
						right:10rpx;
						background:url(@/static/act/immfl/tips.png) no-repeat center / 100% 100%;
					}
					.icon-rotate{
						width: 395rpx;
						height:108rpx;
						position: absolute;
						left:323rpx;
						top:157rpx;
						background:url(@/static/act/immfl/imm_rotate.png) no-repeat center / 100% 100%;
					}
				}
			}
			.logo-content{
				width:750rpx;
				height:227rpx;
				background:url(@/static/act/immfl/imm_logo.png) no-repeat center / 100% 100%;
				position: relative;
				z-index: 6;
				margin-top: -89rpx;
				.logo-msg{
					width: 390rpx;
					height:104rpx;
					position: absolute;
					bottom:32rpx;
					left:175rpx;
				}
			}
			.tabs-index{
				width: 100%;
				padding: 0 20rpx;
				box-sizing: border-box;
			}
		}
		.sort-box{
			width: 15rpx;
			height:13rpx;
		}
		.icon-sort-up{
			margin-top: 5rpx;
			background:url(@/static/act/immfl/icon_up_imm.png) no-repeat center / 100% 100%;
			margin-bottom: 4rpx;
		}
		.icon-sort-upn{
			margin-top: 5rpx;
			background:url(@/static/act/immfl/icon_up.png) no-repeat center / 100% 100%;
			margin-bottom: 4rpx;
		}
		.icon-sort-down{
			background:url(@/static/act/immfl/icon_down_imm.png) no-repeat center / 100% 100%;
		}
		.icon-sort-downn{
			background:url(@/static/act/immfl/icon_down.png) no-repeat center / 100% 100%;
		}
	}
	
	.flaw{
		.bg-color{
			background: linear-gradient(180deg, #395C64, #42BCCD, #384952) !important;
		}
		.act-content{
			background:url(@/static/act/immfl/flaw_bg.png) no-repeat top / 100% 1143rpx !important;
		}
		.ill-btn{
			background:url(@/static/act/immfl/flaw_btn.png) no-repeat center / 100% 100% !important;
		}
		.act-icon{
			width: 735rpx !important;
			left:15rpx !important;
			background:url(@/static/act/immfl/flaw_icon.png) no-repeat center / 100% 100% !important;
		}
		.logo-content{
			background:url(@/static/act/immfl/flaw_logo.png) no-repeat center / 100% 100% !important;
		}
		.logo-msg{
			height:97rpx !important;
		}
		.icon-rotate{
			width: 384rpx !important;
			left:351rpx !important;
			background:url(@/static/act/immfl/flaw_rotate.png) no-repeat center / 100% 100% !important;
		}
		.icon-sort-up{
			background:url(@/static/act/immfl/icon_up_flaw.png) no-repeat center / 100% 100% !important; 
		}
		.icon-sort-down{
			background:url(@/static/act/immfl/icon_down_flaw.png) no-repeat center / 100% 100% !important;
		}
	}
	
</style>
