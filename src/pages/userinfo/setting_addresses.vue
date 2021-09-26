<template>
	<view class="content">
		<navigationbar :isShowRightBtn="true" @navclick="onClickAdd" title='地址管理' rightText='+'/>
		<view class="setting-index" >
			<view class="setting-view" v-for="item in addressesList" :key="item.id">
				<view class="left-content" @click="onClickSelect(item)">
					<text class="left-title">{{item.district}}{{item.detail}}</text>
					<text class="left-des">{{item.name}}  {{item.phone}}</text>
				</view>
				<button class="btn-back" @click="onClickEdit(item)">编辑</button>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { userinfo } from "@/net/DataDefine";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		orderSelect = false;
		addressesList:any=[
			{
				id:1,
				district:'123',
				detail:'qwe',
				name:'kkk',
				phone:'18956320152'
			}
		];
		onLoad(query:any) {
			if(query.type){
				this.orderSelect = true;
			}
			
			this.initEvent()
			
			

			this.onEventUI('addressedit',(data)=>{
				this.initEvent()
			});
			
		}
		initEvent(){
			// app.http.Get('me/delivery',{},(res:userinfo.deliveryData)=>{
			// 	this.addressesList = res.list
			// })
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
			console.log(data)
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

<style>
	.setting-index {
		width: 100%;
		/* height: 150rpx; */
		box-sizing: border-box;
		padding: 0 40rpx;
		background: #fff;
		border-bottom: 1px solid #F4F3F2;
		padding-top: 30rpx;
	}

	.setting-view {
		width: 100%;
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		
	}
	.left-content{
		width: 570rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.left-title {
		width: 100%;
		font-size: 26rpx;
		font-family: HYQiHei;
		font-weight: bold;
		color: #3B3B3B;
		line-height: 42rpx;
		text-align: left;
	}
	.left-des {
		width: 100%;
		font-size: 24rpx;
		font-family: HYQiHei;
		font-weight: bold;
		color: #7B7B7B;
		line-height: 40rpx;
		text-align: left;
	}
	.btn-back {
		width: 100rpx;
		height: 100rpx;
		background: #fff;
		font-size: 28rpx;
		line-height: 100rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #7B7B7B;
		margin: 0;
	}
</style>
