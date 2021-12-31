<template>
	<view class="content">
		<view class="index">
			<view class="title">{{articleData.title}}</view>
			<view class="user">
				<image class="avatar" :src="articleData.author_logo"/>
				{{articleData.author}}
			</view>
			<!-- <view class="time">发布于{{dateFormatMSHMS(articleData.active_at)}}</view> -->
			<view class="desc" v-html="decodeURIComponent(articleData.content)"/>
		</view>
		<view class="bottom">
			<view class="input" @click="onClickInput">说点什么吧...</view>
			<view class="desc-index">
				<view class="icon-pl"></view>{{articleData.comment}}
				<view class="icon-dz" :class="{'icon-dzed':articleData.isLikes}" @click="onClickLikes"></view>{{articleData.likes}}
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import { dateFormatMSHMS } from '@/tools/util'
	@Component({})
	export default class ClassName extends BaseNode {
		dateFormatMSHMS = dateFormatMSHMS
		code = '';
		articleData:any = {};
		onLoad(query:any) {
			if(query.code){
				this.code = query.code;
				this.getArticleDetail()
			}
		}
		// 点赞
		onClickLikes(){
			if(app.token.accessToken == ''){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}
			app.http.Post('article/like/or/cancel/'+this.articleData.articleCode,{},(res:any)=>{
				this.getArticleDetail()
				uni.$emit("atticleLike");
			})
		}
		getArticleDetail(){
			app.http.Get('article/detail/'+this.code,{},(res:any)=>{
				this.articleData = res.data
			})
		}
		onClickInput(){
			uni.showToast({
				title:'评论功能暂未开放',
				icon:'none'
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
		width: 100%;
		padding: 20rpx 40rpx 120rpx 40rpx;
		box-sizing: border-box;
		.title{
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #14151A;
			line-height: 48rpx;
			margin-bottom: 20rpx;
		}
		.user{
			width: 100%;
			display: flex;
			align-items: center;
			height:50rpx;
			font-size: 24rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #14151A;
			margin-bottom:10rpx;
			.avatar{
				width: 50rpx;
				height:50rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
		}
		.time{
			width: 100%;
			font-size: 22rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #BDBEC5;
			margin-bottom: 30rpx;
		}
		.desc{
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #14151A;
			line-height: 36rpx;
		}
	}
	::v-deep img{
		width:670rpx !important;
		height:auto;
	}
	.bottom{
		width: 100%;
		height:104rpx;
		background:#fff;
		position:fixed;
		bottom:0;
		left:0;
		box-sizing: border-box;
		border-top: 4rpx solid #F8F9FA;
		display: flex;
		align-items: center;
		padding:0 40rpx;
		justify-content: space-between;
		.input{
			width: 470rpx;
			height: 62rpx;
			background: #F5F5F8;
			border-radius: 31rpx;
			text-align: left;
			box-sizing: border-box;
			line-height: 62rpx;
			padding:0 38rpx;
			font-size: 20rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #BDBEC5;
		}
		.desc-index{
			width: 200rpx;
			height:40rpx;
			display: flex;
			align-items: center;
			font-size: 20rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #BDBEC5;
			justify-content: flex-end;
		}
		.icon-pl{
			width: 33rpx;
			height:30rpx;
			background:url(../../static/index/pl.png) no-repeat center;
			background-size: 100% 100%;
			margin-right: 7rpx;
		}
		.icon-dz{
			width: 32rpx;
			height:31rpx;
			background:url(../../static/index/zan.png) no-repeat center;
			background-size: 100% 100%;
			margin-right: 7rpx;
			margin-left: 32rpx;
		}
		.icon-dzed{
			width:32rpx;
			height:31rpx;
			background:url(../../static/index/zan_.png) no-repeat center;
			background-size: 100% 100%;
			margin-right: 7rpx;
			margin-left: 32rpx;
		}
		
	}
	::v-deep h2{
		line-height: 60rpx;
		font-size: 30rpx;
	}
	::v-deep h3{
		line-height: 60rpx;
		font-size: 30rpx;
	}
</style>
