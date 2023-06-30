<!--
 * @FilePath: \jichao_app_2\src\pages\illustration\album\selectNo.vue
 * @Author: wjw
 * @Date: 2023-06-21 11:20:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-29 17:09:04
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="content">
		<!-- <u-sticky>
			<u-tabs 
				:list="tabsData.list" :current="tabsData.current" @change="onChangeTabs" lineHeight="0" 
				:itemStyle="{width:'250rpx',height:'78rpx',lineHeight:'72rpx',padding:0,background:'#fff'}"
				:activeStyle="{color: '#FA1545',fontSize: '29rpx',fontWeight:'600'}" 
				:inactiveStyle="{color: '#959695',fontSize: '29rpx',fontWeight:'600'}" 
			/>
		</u-sticky> -->
		<filterNoList ref="filterNolist" :seriesCode="seriesCode" :tp="tabsData.current" :search="seriesData.search"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '@/base/BaseNode.vue';
	import { SeriesDetail } from '../constants/interface'
	import filterNoList from '../components/filterNoList.vue'
	@Component({
		components:{filterNoList}
	})
	export default class ClassName extends BaseNode {
        tabsData = {
			list:[{name:'自定义查找'},{name:'按卡种查找'},{name:'按球员查找'}],
			current:0
		}
		seriesCode = "";
		seriesData:SeriesDetail = {
			"code":0,
			"followed": false, //当前用户是否已关注此系列
			"main": { //data
				"name": "", //sport_type
				"year": "", //year
				"logo": "", //logo
				"backPic": "", //backPic
				"numLoaded": 0, 
				"numAll":0, 
			},
			"search": { //data
				"cardSets": '', //显示后台翻译过的卡种，展示72小时内点击量最高的20条内容（含详细筛选），未翻译的卡种不显示
				"players": '', //该系列下筛选点击次数最多的前20个球员，展示72小时内点击量最高的20条内容
				"seqs": '' //该系列下筛选点击次数最多的前20条限编，展示72小时内点击量最高的20条内容
			}
		};
		onLoad(query: any) {
			if(query.seriesCode) this.seriesCode = query.seriesCode;
			this.initEvent();
		}
		//   加载更多数据
		onReachBottom() {
			this.$refs.filterNolist.againList(1)
		}
		initEvent(){
			this.getSeriesDetail();
		}
        onChangeTabs(event:any){
			this.tabsData.current = event.index
		}
		getSeriesDetail(){
			app.http.Get(`dataApi/cardIllustration/series/detail/${this.seriesCode}`,{},(res:any)=>{
				this.seriesData = res;
				uni.setNavigationBarTitle({
					title: `${res.main.year} ${ res.main.name}`
				});
			})
		}
	}
</script>

<style lang="scss">
	page{
        background:#F6F7F8;
    }
	.content{
		width: 100%;
		height:100%;
		box-sizing: border-box;
	}
	.top-header{
		width: 100%;
		height:368rpx;
		background:#000000;
		position: relative;
	}
	.series-bg{
		width: 100%;
		height:368rpx;
		position: absolute;
		left:0;
		top:0;
		z-index: 3;
	}
	.header-info{
		width: 100%;
		height:104rpx;
		box-sizing: border-box;
		padding: 0 35rpx;
		position: absolute;
		left:0;
		bottom:67rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 5;
	}
	.header-info-l{
		width: 550rpx;
		height:104rpx;
		display: flex;
		align-items: center;
	}
	.series-logo{
		width: 104rpx;
		height: 104rpx;
		border-radius: 3rpx;
	}
	.series-info-box{
		height:104rpx;
		width: 416rpx;
		margin-left: 29rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 2rpx 0 10rpx 0;
	}
	.series-info-name{
		width: 100%;
		font-size: 33rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
	}
	.series-info-num{
		width: 100%;
		font-size: 21rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	.series-follow{
		width: 122rpx;
		height:51rpx;
		background: #FA1545;
		border-radius: 3rpx;
		text-align: center;
		line-height: 51rpx;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		box-sizing: border-box;
	}
	.followed{
		background: #fff;
		color:#909090;
		font-weight: 400;
	}
	.icon-replace{
		width: 46rpx;
		height:32rpx;
		background:url(@/static/illustration/icon_replace.png) no-repeat center / 100% 100%;
	}
	.icon-replace-back{
		width: 46rpx;
		height:32rpx;
		background:url(@/static/illustration/icon_replace_.png) no-repeat center / 100% 100%;
	}
	.fixed-top /deep/ .u-tabs__wrapper__nav__line{
		bottom:0
	}
	.series-center{
		width: 100%;
		height:2000rpx;
		background:yellow;
		box-sizing: border-box;
		position: relative;
		z-index: 1;
		overflow: auto;
	}
	.post-box{
		width: 100%;
		box-sizing: border-box;
		.header{
			width: 100%;
			box-sizing: border-box;
			padding:20rpx;
			background:#fff; 
		}
		.input-box{
			width: 100%;
			height:73rpx;
			background: #F5F5F5;
			border-radius: 3rpx;
			position: relative;
			box-sizing: border-box;
			padding-left: 66rpx;
			display: flex;
			align-items: center;
		}
		.icon-search{
			width: 28rpx;
			height:28rpx;
			background:url(@/static/index/sousuo@2x.png) no-repeat center / 100% 100%;
			position: absolute;
			left:26rpx;
			top:50%;
			margin-top: -14rpx;
		}
		.search-input{
			width: 100%;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333;
		}
		.btn-publish{
			width: 82rpx;
			height:82rpx;
			position: fixed;
			bottom:60rpx;
			right:20rpx;
			background:url(@/static/illustration/icon_add_big.png) no-repeat center / 100% 100%;
		}
	}
</style>
