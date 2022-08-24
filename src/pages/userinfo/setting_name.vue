<template>
	<view class="content">
		<navigationbar :isShowRightBtn="true" @navclick="onClickConfirm" title='修改昵称' rightText='保存' rightColor="#14151A" rightFont="12"/>

		<view class="index">
			<input maxlength="12" class="input" v-model="newName" placeholder="请输入昵称" />
			<view class="tips">仅可修改1次</view>
		</view>
		<view class="explain">输入2~12个汉字、字母、数字</view>

	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		newName = '';
		onLoad(query:any) {
			if(query.name){
				this.newName = query.name
			}
		}
		onClickConfirm(){
			if(!this.newName){
				uni.showToast({
					title: '不能为空',
					icon: 'none',
				})
				return
			}
			let params = {
				name:this.newName,
			}
			app.http.Post('me/editName',params,(res:any)=>{
				uni.$emit('finishName',{name:this.newName});
				uni.navigateBack({
				    delta: 1
				});
			})
		}
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		box-sizing: border-box;
	}
	.index{
		width: 688rpx;
		height:100rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #F1F1F4;
		justify-content: space-between;
		margin:20rpx auto;
		.input{
			width:500rpx;
			height:100rpx;
			line-height: 100rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 600;
			color: #14151A;
		}
		.tips{
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #AAAABB;
		}
	}
	.explain{
		width: 688rpx;
		margin:0 auto;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #C4C4CF;
	}
</style>
