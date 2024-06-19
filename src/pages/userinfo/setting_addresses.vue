<template>
	<view class="content">
		<!-- #ifndef MP -->
		<view class="setting-index" v-if="addressesList.length>0">
			<view class="setting-view" v-for="item in addressesList" :key="item.id">
				<view class="left-content" @click="onClickSelect(item)">
					<view class="left-des"><view v-if="item.default" class="icon-moren">默认</view>{{item.name}}  {{item.phone}}</view>
					<text class="left-title">{{item.district}}{{item.detail}}</text>
					
				</view>
				<button class="btn-edit" @click="onClickEdit(item)"><view class="icon-edit"></view></button>
			</view>
		</view>
		<view class="btn-add" @click="onClickAdd">新建地址</view>
		<!-- #endif -->
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		orderSelect = false;
		addressesList:any=[];
		onLoad(query:any) {
			// #ifndef MP
			if(query.type){
				this.orderSelect = true;
			}
			this.initEvent()
			this.onEventUI('addressedit',(data)=>{
				this.initEvent()
			});
			// #endif
		}
		initEvent(){
			app.http.Get('me/delivery',{},(res:any)=>{
				this.addressesList = res.list
			})
		}
		onClickSelect(data:any){
			if(this.orderSelect){
				uni.$emit('addressSelect',{data:data})
				uni.navigateBack({
				    delta: 1
				});
			}else{
				uni.navigateTo({
					url:'/pages/userinfo/setting_addressedit?data='+decodeURIComponent(JSON.stringify(data))
				})
			}
		}
		onClickEdit(data:any){
			uni.navigateTo({
				url:'/pages/userinfo/setting_addressedit?data='+decodeURIComponent(JSON.stringify(data))
			})
		}
		onClickAdd(){
			uni.navigateTo({
				url:'/pages/userinfo/setting_addressedit?title=添加地址'
			})
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:$content-bg
	}
	.setting-index {
		width: 100%;
		box-sizing: border-box;
		padding:20rpx;
	}

	.setting-view {
		width: 100%;
		height:  176rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		background:#fff;
		padding:28rpx 0 28rpx 40rpx;
		border-radius: 4rpx;
		margin-bottom: 20rpx;
		
	}
	.left-content{
		width: 540rpx;
		height:120rpx;
		flex-direction: column;
	}
	.left-title {
		width: 100%;
		font-size: 24rpx;
		
		
		color: #7F7F8E;
		line-height: 30rpx;
		text-align: left;
	}
	.left-des {
		width: 100%;
		font-size: 28rpx;
		
		font-weight: 600;
		color: #14151A;
		line-height: 40rpx;
		text-align: left;
		display: flex;
		margin-bottom: 10rpx;
	}
	.icon-moren{
		width: 66rpx;
		height:38rpx;
		background:url(../../static/userinfo/paimai@2x.png) no-repeat center;
		background-size: 100% 100%;
		font-size: 20rpx;
		
		
		color: #FFFFFF;
		margin-right: 12rpx;
		text-align: center;
		line-height: 36rpx;
	}
	.btn-edit {
		width: 102rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background:#fff;
		box-sizing: border-box;
		border-left: 1px solid #F1F1F4;
		.icon-edit{
			width: 32rpx;
			height:32rpx;
			background:url(../../static/userinfo/bianji@2x.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
	.btn-add{
		width: 718rpx;
		height: 88rpx;
		background: #14151B;
		border-radius: 4rpx;
		margin:40rpx auto;
		text-align: center;
		line-height: 88rpx;
		font-size: 28rpx;
		
		font-weight: 600;
		color: #FFFFFF;
	}
</style>
