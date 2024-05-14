<!--
 * @FilePath: \jichao_app_2\src\pages\userinfo\medal\wear.vue
 * @Author: wjw
 * @Date: 2024-05-13 09:43:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-05-14 10:46:45
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
                    <view class="btn" :style="{'background':hasWear(item.name)?'#B0B0B0':'#FA1545'}" @click="onClickWear(item)">{{hasWear(item.name)?"取消佩戴":"佩戴"}}</view>
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
	@Component({
		components:{}
	})
	export default class ClassName extends BaseNode {
		app = app;
		wearName = "";
		listParams = new ListParams()
		medalList = []
		onLoad(query:any) {
			this.wearName = query.medalName;
			this.getMedalList();
		}
		//   加载更多数据
		onReachBottom() {
			this.getMedalList()
		}
        hasWear(name:string){
            return this.wearName === name
        }
		getMedalList(){
			if(this.listParams.isFetchEnd) return;
			app.http.Get('dataApi/medal/userMedal/get/list',this.listParams,(res:any)=>{
				if(res.list){
					this.medalList = this.listParams.pageIndex==1 ? res.list : [...this.medalList,...res.list];
				};
				this.listParams.isFetchEnd = res.isFetchEnd;
				this.listParams.pageIndex ++;
			})
		}
        onClickWear(item:any){
			const unwear = this.wearName === item.name;
			const url = unwear ? 'medal/userMedal/unwear' : `medal/userMedal/wear/${item.number_id}`
			app.http.Post(url,{},(res:any)=>{
				uni.showToast({ title: '操作成功', icon: 'none' });
				this.wearName = unwear ? "" : item.name;
			})
            
            uni.$emit('wearChange',unwear?"unwear":item);
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
</style>
