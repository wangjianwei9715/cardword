<!--
 * @FilePath: \jichao_app_2\src\pages\userinfo\medal\wear.vue
 * @Author: wjw
 * @Date: 2024-05-13 09:43:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-05-29 09:22:00
 * Copyright: 2024 .
 * @Descripttion: 
-->
<template>
	<view class="box-content">
		<view class="medal-content">
			<u-grid>
				<u-grid-item
					:customStyle="{width:'228rpx',height:'300rpx'}"
					v-for="(item, index) in medalList"
					:index="index"
					:key="index"
				>
					<image class="grid-pic" :src="item.pic"/>
					<text class="grid-text">{{ item.name }}</text>
                    <view class="btn" :style="{'background':item.wear?'#B0B0B0':'#FA1545'}" @click="onClickWear(item)">{{item.wear?"取消佩戴":"佩戴"}}</view>
				</u-grid-item>
			</u-grid>
			<view v-show="listParams.isFetchEnd && medalList.length==0" class="empty-box">
				<view class="empty"></view>
				<view class="empty-text">- 暂无勋章 -</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '@/base/BaseNode.vue';
	class ListParams {
		pageIndex=1;
		pageSize=30;
		isFetchEnd=false
	}
	@Component({
		components:{}
	})
	export default class ClassName extends BaseNode {
		app = app;
		listParams = new ListParams()
		medalList = []
		onLoad(query:any) {
			this.getMedalList();
		}
		//   加载更多数据
		onReachBottom() {
			this.getMedalList()
		}
		getMedalList(){
			const { pageIndex, pageSize, isFetchEnd } = this.listParams;
			if(isFetchEnd) return;
			app.http.Get('dataApi/medal/userMedal/get/list',this.listParams,(res:any)=>{
				if(res.list){
					this.medalList = pageIndex==1 ? res.list : [...this.medalList,...res.list];
				};
				this.listParams.isFetchEnd = (pageIndex*pageSize) > this.medalList.length;
				this.listParams.pageIndex ++;
			})
		}
        onClickWear(item:any){
			const unwear = item.wear;
			const url = unwear ? 'medal/userMedal/unwear' : `medal/userMedal/wear/${item.id}`
			app.http.Post(url,{},(res:any)=>{
				uni.showToast({ title: '操作成功', icon: 'none' });
				item.wear = unwear ? 0 : 1;
			})
            
            uni.$emit('wearChange',unwear?"unwear":item);
			app.platform.UIClickFeedBack(); 
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
    .medal-content{
		width: 100%;
		margin:0 auto;
		box-sizing: border-box;
		padding:36rpx 33rpx;
	}
	.grid-pic{
		width: 154rpx;
		height:141rpx;
		margin-bottom: 18rpx
	}
	.grid-text{
		@include fontSfTR(24rpx);
	}
    .btn{
        width: 113rpx;
        height: 40rpx;
        border-radius: 3rpx;
        text-align: center;
        line-height: 40rpx;
        margin-top: 20rpx;
        @include fontSfTR(22rpx);
    }
	.empty-box{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 90rpx 0 200rpx 0;
		.empty{
			width: 514rpx;
			height:227rpx;
			background: url(@/static/medal/empty.png) no-repeat center /100% 100%;
			opacity: 0.4;
		}
		.empty-text{
			width: 100%;
			text-align: center;
			@include fontSfTR(22rpx);
			color:#C0C0C0;
			margin-top: 68rpx;
		}
	}
</style>
