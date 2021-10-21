<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="tab-header">
				<view class="header-search">
					<searchinput :searchText="searchText" @clicksearch="onClickSearch"></searchinput>
				</view>
				<view class="header-right" @click="onClickBack">取消</view>
			</view>
			<view class="header-sort">
				<view class="header-sort-index" v-for="item in sortData" :key="item.id" @click="onClickSort(item.id)">
					{{item.name}}
					<view class="header-sort-icon">
						<view :class="item.sort_up?'icon-sort-up':'icon-sort-upn'"></view>
						<view :class="!item.sort_up?'icon-sort-down':'icon-sort-downn'"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="goods-lists">
			<statusbar/>
			<goodslistebay  :goodsList="goodsList" @send="onClickJumpDetails"/>
		</view>
	</view>

</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		searchText = '';
		sortData = [
			{id:1,name:'成交时间',sort_up:false},
			{id:2,name:'成交金额',sort_up:false}
		];
		goodsList:{[x:string]:any} = [
			{
				id:1,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				price:149,
				type:'拍卖'
			},
			{
				id:2,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				price:349,
				type:'一口价'
			},
			{
				id:3,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				price:1429,
				type:'拍卖'
			},
			{
				id:4,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				price:2429,
				type:'一口价'
			},
			{
				id:5,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				price:1429,
				type:'拍卖'
			},
			{
				id:6,
				img:'../../static/goods/.png',
				title:'20-21 National Treasures Hobby原箱*3',
				price:2429,
				type:'一口价'
			}
		];
		onLoad(query:any) {
			if(query.q){
				this.searchText = query.q
			}
		}
		onClickBack(){
			uni.navigateBack({
			    delta: 1
			});
		}
		// 排序选择
		onClickSort(id:number){
			this.sortData[id-1].sort_up = !this.sortData[id-1].sort_up
		}
		onClickJumpDetails(id:number){

		}
		onClickSearch(){
			uni.navigateBack({
				delta: 1
			});
		}
	}
</script>

<style lang="scss">
	$font-24:24rpx;
	.content{
		width: 100%;
		box-sizing: border-box;
	}
	.header-banner{
		width: 100%;
		background:#fff;
		position: fixed;
		left:0;
		top:0;
		box-sizing: border-box ;
		z-index: 9;
	}
	.tab-header{
		width: 100%;
		height:104rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 20rpx;
		z-index: 10;
		align-items: center;
		justify-content: space-between;
	}
	.header-top{
		width: 100%;
		height:104rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 32rpx 0 0;
		z-index: 10;
		align-items: center;
		justify-content: space-between;
	}
	.header-search{
		width: 640rpx;
		height:64rpx;
	}
	.header-right{
		height:50rpx;
		line-height: 50rpx;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #14151A;
	}
	.header-sort{
		width: 100%;
		height:72rpx;
		box-sizing: border-box;
		padding:0 176rpx;
		margin-top: -10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		&-index{
			height:72rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			font-size: $font-24;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #14151A;
		}
		.header-sort-icon{
			width: 18rpx;
			margin-left: 4rpx;
			margin-bottom: -4rpx;
			.icon-sort-up{
				width: 18rpx;
				height:12rpx;
				background:url(../../static/goods/sort_u_.png) no-repeat center;
				background-size: 100% 100%;
				margin-bottom: 2rpx;
			}
			.icon-sort-upn{
				width: 18rpx;
				height:12rpx;
				background:url(../../static/goods/sort_u.png) no-repeat center;
				background-size: 100% 100%;
				margin-bottom: 2rpx;
			}
			.icon-sort-down{
				width: 18rpx;
				height:12rpx;
				background:url(../../static/goods/sort_d_.png) no-repeat center;
				background-size: 100% 100%;
			}
			.icon-sort-downn{
				width: 18rpx;
				height:12rpx;
				background:url(../../static/goods/sort_d.png) no-repeat center;
				background-size: 100% 100%;
			}
		}
		&-classify{
			width: 100%;
			height:0;
			box-sizing: border-box;
			position:absolute;
			top:72rpx;
			left:0;
			padding:0 36rpx;
			background:#fff;
			transition:all 0.2s linear;
			overflow: hidden;
			&-index{
				width: 100%;
				height:80rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #F1F1F4;
				display: flex;
				align-items: center;
				font-size: $font-24;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #14151A;
			}
			&-index:last-child{
				border:none
			}
		}
		.classify-show{
			height:400rpx;
		}
		.classify-opt{
			color:#F65D2D
		}
	}
	.goods-lists{
		width: 100%;
		box-sizing: border-box;
		padding: 182rpx 20rpx 60rpx 20rpx;
		background:#F6F7F8
	}
</style>
