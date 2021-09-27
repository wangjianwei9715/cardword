<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="header-top">
				<view class="header-back" @click="onClickBack"></view>
				<view class="header-title">我的收藏</view>
				<view class="header-del">
					<view v-show="!deling" class="icon-del" @click="deling=true"></view>
					<view v-show="deling" class="del-text" @click="onClickDelComplete">完成</view>
				</view>
			</view>
			<view class="header-tab">
				<tabc :tabs="tabData" :tabsCheck="tabCheck" @tabsClick="onClickListTabs"></tabc>
			</view>
		</view>

		<view class="order-list">
			<statusbar/>
			<goodslistcollect :goodsList="goodsList" :delStart="deling" :delList="delList" @send="onClickJumpDetails"  @del="onClickDel"/>
		</view>

		<view v-show="deling" class="del-bottom">
			<view class="del-btn btn-all" @click="onClickAllChoose">全选</view>
			<view class="del-btn btn-del" @click="onClickDelChoose">删除</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		tabCheck = 1;
		tabData = [
			{id:1,name:'全部'},
			{id:2,name:'进行中'},
			{id:3,name:'已拼成'},
			{id:4,name:'未拼成'}
		];
		goodsList:{[x:string]:any} = [
			{
				id:1,
				img:'../../static/goods/zhutu@2x.png',
				title:'20-21 National Treasures Hobby原箱*3',
				num_all:410,
				num:120,
				price:149,
				tips:'满10组减5元'
			},
			{
				id:2,
				img:'../../static/goods/zhutu@2x.png',
				title:'20-21 National Treasures Hobby原箱*3',
				num_all:200,
				num:150,
				price:349,
				tips:'满10组减50元'
			}
		];
		deling = false;
		delList:any = [];
		onLoad(query:any) {
			
		}
		onClickBack(){
			uni.navigateBack({
			    delta: 1
			});
		}
		
		onClickListTabs(id:number){
			if(id==this.tabCheck){
				return;
			}
			this.tabCheck = id
		}
		// 跳转商品详情
		onClickJumpDetails(id:any){
			uni.navigateTo({
				url: '/pages/goods/goods_details?id='+id
			})
		}
		onClickDel(id:number){
			let index = this.delList.indexOf(id)
			if(index==-1){
				this.delList.push(id)
			}else{
				this.delList.splice(index,1)
			}
		}
		onClickDelComplete(){
			this.deling = false;
			this.delList = [];
		}
		onClickAllChoose(){
			this.delList = [];
			for(let i in this.goodsList){
				this.delList.push(this.goodsList[i].id);
			}
		}
		onClickDelChoose(){
			
		}
	}
</script>

<style lang="scss">
	page{
		background:#F6F7F8;
	}
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
	.header-back{
		width: 80rpx;
		height:88rpx;
		background:url(../../static/goods/back@2x.png) no-repeat center;
		background-size: 100% 100%;
	}
	.header-tab{
		width: 100%;
		height:90rpx;
		margin-top: -10rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #F1F1F4;
	}
	.order-list{
		width: 100%;
		box-sizing: border-box;
		padding: 204rpx 20rpx 130rpx 20rpx;
	}
	.header-title{
		font-size: 34rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
	}
	.header-del{
		width: 50rpx;
		height:50rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.icon-del{
		width: 38rpx;
		height:42rpx;
		background:url(../../static/userinfo/shanchu@2x.png) no-repeat center;
		background-size: 100% 100%;
	}
	.del-text{
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #14151A;
	}
	.del-bottom{
		width: 100%;
		height:110rpx;
		background:#fff;
		position: fixed;
		bottom:0;
		left:0;
		display: flex;
		box-sizing: border-box;
		padding:0 16rpx;
		align-items: center;
		justify-content: space-between;
		.del-btn{
			width: 352rpx;
			height: 88rpx;
			border-radius: 4rpx;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
		}
		.btn-all{
			border: 1px solid #14151B;
			color:#14151B;
			background:#fff;
		}
		.btn-del{
			background:#14151B;
			color:#fff;
		}
	}
</style>
