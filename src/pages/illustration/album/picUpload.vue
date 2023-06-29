<!--
 * @FilePath: \jichao_app_2\src\pages\illustration\album\picUpload.vue
 * @Author: wjw
 * @Date: 2023-06-26 19:47:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-29 14:38:14
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="album-card-content">
		<navigationbar title="上传卡片" backgroundColor="#000" backColor="#fff" borderBottom="none" :custom="true">
			<template slot="right">
				<view class="icon-help" @click="onClickShowRule"></view>
			</template>
		</navigationbar>
		<view class="list" v-for="(item,index) in selectSeries" :key="index">
			<view class="tips">{{item.name}}</view>
		</view>
		<albumBottom :canNext="getSeriesNolistLength" :data="selectSeries" :percent="picPercent" :step="2" @next="onClickNext()"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import albumBottom from '../components/albumBottom.vue'
	@Component({
		components:{albumBottom}
	})
	export default class ClassName extends BaseNode {
		selectSeries:any = []
		onLoad(query: any) {
			this.selectSeries = JSON.parse(query.selectSeries)
		}
		public get getSeriesNolistLength() : boolean {
			return this.selectSeries.some((x:any)=> x.noList.length>0)
		}
		public get picPercent() : number {
			return 1
		}
		onClickSelectNo(item:any){
			uni.navigateTo({
				url:`/pages/illustration/album/selectNo?seriesCode=${item.seriesCode}`
			})
		}
		onClickNext(){
			
		}
	}
</script>

<style lang="scss">
	page{
        background:#000000;
    }
	.album-card-content{
		padding-bottom: calc(159rpx + env(safe-area-inset-bottom));;
	}
	.tips{
		width: 100%;
		height:62rpx;
		background: #272727;
		font-size: 23rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #C0C0C0;
		padding:0 20rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}
	.series-box{
		width: 100%;
		box-sizing: border-box;
		padding:0 20rpx;
		margin-bottom: 20rpx;
		.header{
			width: 100%;
			height:86rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.title{
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #C0C0C0;
			}
			.icon-add{
				width: 37rpx;
				height:37rpx;
				background: url(@/static/illustration/album/icon_add.png) no-repeat center/ 100% 100%;
			}
			.icon-sub{
				width: 37rpx;
				height:37rpx;
				background: url(@/static/illustration/album/icon_sub.png) no-repeat center/ 100% 100%;
			}
			
		}
		.no-box{
			width: 100%;
			box-sizing: border-box;
			background: #272727;
			border-radius: 3rpx;
			padding:20rpx;
			margin-bottom: 20rpx;
			.card-team{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height:36rpx;
				position: relative;
				.split{
					height: 34rpx;
					background: #707070;
					border: 1px solid #D8D8D8;
					font-size: 17rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					position: absolute;
					right:63rpx;
					top:1rpx;
					box-sizing: border-box;
					padding:0 10rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.split-c{
					height: 34rpx;
					background: #707070;
					border: 1px solid #D8D8D8;
					font-size: 17rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					box-sizing: border-box;
					padding:0 10rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			.team{
				font-size: 21rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
			}
			.icon-clear{
				width: 32rpx;
				height:32rpx;
				background: url(@/static/illustration/album/icon_sub.png) no-repeat center/ 100% 100%;
			}
			.player{
				font-size: 21rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				margin-top: 12rpx;
			}
			.cardset{
				font-size: 21rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #C0C0C0;
				margin-top: 20rpx;
				line-height: 36rpx;
				word-break: break-all;
			}
		}
		.add-no{
			width: 100%;
			height:75rpx;
			border: 1px dashed rgba(230, 230, 230, 0.6);
			border-radius: 5rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #C0C0C0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
