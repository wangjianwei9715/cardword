<template>
	<view class="content">
		<view class="center">
			<view>
				<view class="center-desc">
					<muqian-lazyLoad class="desc-img" :src="goodsData.pic" mode="aspectFill"></muqian-lazyLoad>
					<view class="desc-right">
						<view class="desc-title">{{goodsData.title}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="index">
			<textarea class="index-texta" auto-height="true" maxlength="-1" v-model="complainText" placeholder="请说明投诉原因，我们将于3个工作日内给您答复..." />
		</view>
		
		<view class='btn-content' @click="onClickConfirm">提交</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		code = ''
		goodsData:{[x:string]:any} = {}
		complainText = ''
		onLoad(query:any) {
			if(query){
				this.code = query.code;
				this.goodsData = JSON.parse(query.data)
			}
		}
		onClickConfirm(){
			if(this.complainText == ''){
				uni.showToast({
					title:'请说明投诉原因',
					icon:'none'
				})
				return;
			}

			app.http.Post('order/complain/'+this.code,{content:encodeURIComponent(this.complainText)},(res:any)=>{
				setTimeout(()=>{
					uni.showToast({
						title:'投诉成功',
						icon:'none'
					})
				},100)
				this.complainText = ''
				uni.navigateBack({
					delta:1
				})
			})
		}
	}
</script>

<style>
	.content{
		width: 100%;
		box-sizing: border-box;
		background:#fff;
		padding-bottom: 100rpx;
		
	}
	.center{
		width:100%;
		box-sizing: border-box;
		border-bottom: 1px solid #F4F3F2;
		padding:30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.center{
		width:100%;
		box-sizing: border-box;
		border-bottom: 14rpx solid #F5F5F9;
		padding:45rpx 30rpx 30rpx 30rpx;
	}
	.center-desc{
		width: 100%;
		height:185rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.desc-img{
		width: 204rpx;
		height:185rpx;
		border-radius: 10rpx;
		margin-right: 26rpx;
	}
	.desc-right{
		width: 460rpx;
		height:185rpx;
		box-sizing: border-box;
		padding-top: 20rpx;
	}
	.desc-title{
		width: 460rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-bottom: 50rpx;
		word-break: break-all;
	}
	.index{
		width: 100%;
		box-sizing: border-box;
		padding:30rpx;
	}
	.index-texta{
		width: 100%;
		font-size: 26rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #7B7B7B;
		line-height: 40rpx;
	}
	.btn-content{
		background:#4DCDCC;
		width: 590rpx;
		height:80rpx;
		text-align: center;
		line-height: 80rpx;
		position: fixed;
		left:80rpx;
		bottom:30rpx;
		font-size: 30rpx;
		font-family: HYQiHei;
		font-weight: bold;
		color: #FFFFFF;
		border-radius: 40rpx;
	}
</style>
