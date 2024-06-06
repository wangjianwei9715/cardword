<!--
 * @FilePath: \jichao_app_2\src\pages\illustration\report\detail.vue
 * @Author: wjw
 * @Date: 2023-06-26 19:47:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-10 15:49:34
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="content">
		<view class="error-box">
			<view class="title">相关错误图片</view>
			<view class="line">
				<view v-if="detail.descPics">
					<image v-for="(item,index) in getImg(detail.descPics)" :key="index" class="pic" :src="decodeURIComponent(item)" />
				</view>
				<view class="msg" v-else>未上传</view>
			</view>
			<u-line color="#dadbde" margin="40rpx 0"></u-line>
			<view class="title">描述</view>
			<view class="line">
				<view class="msg">{{detail.content}}</view>
			</view>
			<u-line color="#dadbde" margin="40rpx 0"></u-line>
			<view class="title">正确图片</view>
			<view class="line">
				<image v-show="detail.frontPic" class="pic" :src="decodeURIComponent(detail.frontPic)" />
				<image v-show="detail.backPic" class="pic" :src="decodeURIComponent(detail.backPic)" />
				<view v-show="!detail.backPic && !detail.frontPic" class="msg">未上传</view>
			</view>
			<u-line color="#dadbde" margin="40rpx 0"></u-line>
			<view class="title">处理结果</view>
			<view class="line">
				<view class="msg">{{result()}}</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		id="";
		detail:any = {};
		onLoad(query: any) {
			this.id = query.id;
			this.getDetail()
		}
		getDetail(){
			app.http.Get(`cardIllustration/err/${this.id}`,{},(res:any)=>{
				this.detail = res.data;
			})
		}
		result(){
			const { stateName, reject, pointAward } = this.detail;
			return `${stateName}${pointAward>0?`+${pointAward}卡币`:""}${reject?`(${reject})`:""}`
		}
		getImg(img:string){
			if (img.indexOf(',') == -1) {
				return [img]
			} else {
				const list = img.split(',')
				return list
			}
		}
	}
</script>

<style lang="scss">
	page{
        background:#fff;
    }
	.content{
		width: 100%;
		padding:20rpx;
		box-sizing: border-box;
	}
	.error-box{
		width: 100%;
		box-sizing: border-box;
		padding:10rpx 20rpx;
		padding-bottom: env(safe-area-inset-bottom);
		.title{
			width: 100%;
			font-size: 25rpx;
			
			font-weight: 600;
			color: #333333;
			margin-bottom: 22rpx;
		}
		.line{
			width: 100%;
			box-sizing: border-box;
		}
		.pic{
			width: 162rpx;
			height:162rpx;
			margin-right: 25rpx;
		}
		.msg{
			font-size: 25rpx;
			
			font-weight: 400;
			color: #333333;
		}
	}
	
</style>
