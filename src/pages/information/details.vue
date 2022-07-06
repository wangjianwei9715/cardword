<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
				<view class="header-title"></view>
				<view class="icon-share" @click="onClickShare"></view>
			</view>
		</view>
		<view style="padding-top:88rpx">
			<statusbar/>
		</view>
		<view class="index">
			<view class="title">{{articleData.title}}</view>
			<view class="user">
				<muqian-lazyLoad class="avatar" :src="articleData.author_logo"/>
				{{articleData.author}}
			</view>
			<view class="time">发布于{{dateFormatMSHMS(articleData.active_at)}}</view>
			<view class="desc" v-html="decodeURIComponent(articleData.content)"/>
		</view>
		<view class="bottom-box">
			<view class="bottom">
				<view class="input" @click="onClickInput">说点什么吧...</view>
				<view class="desc-index">
					<view class="icon-pl"></view>{{articleData.comment}}
					<view class="icon-dz" :class="{'icon-dzed':articleData.isLikes}" @click="onClickLikes"></view>{{articleData.likes}}
				</view>
			</view>
		</view>

		<share :operationShow="operationShow" :shareData="shareData"  @operacancel="onClickShareCancel"></share>
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
		cover = '';
		articleData:any = {};
		operationShow=false;
		shareData:any = {
			shareUrl:'',  
			title:'',      
			summary:'',    
			thumb:''       
		}
		onLoad(query:any) {
			if(query.code){
				this.code = query.code;
				this.cover = query.pic;
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
				this.articleData.isLikes = res.liked;
				this.articleData.likes = res.likes;
				this.articleData.comment = res.comment
			})
		}
		onClickBack(){
			uni.navigateBack({
				delta: 1
			});
		}
		// 分享
		onClickShare(){
			if(!this.operationShow){
				if(this.shareData.shareUrl==''){
					this.shareData = {
						shareUrl:"https://www.ka-world.com/share/h5/index.html#/pages/information/index?code="+this.code,  
						title:this.articleData.title,      
						summary:this.articleData.title,    
						thumb:decodeURIComponent(this.cover)
					}
				}
				this.operationShow = true;
			}
		}
		onClickShareCancel(){
			this.operationShow = false
		}
		getArticleDetail(){
			app.http.Get('dataApi/article/detail/'+this.code,{},(res:any)=>{
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
	.bottom-box{
		width: 100%;
		height:calc(104rpx);
		height:calc(104rpx + constant(safe-area-inset-bottom));
		height:calc(104rpx + env(safe-area-inset-bottom));
		background:#fff;
		position:fixed;
		bottom:0;
		left:0;
		border-top: 4rpx solid #F8F9FA;
	}
	.bottom{
		width: 100%;
		height:104rpx;
		box-sizing: border-box;
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
	.header-banner{
		width: 100%;
		background:#fff;
		position: fixed;
		left:0;
		top:0;
		box-sizing: border-box ;
		z-index: 10;
		border-bottom: 1px solid #F4F3F2;
		.tab-header{
			width: 100%;
			height:88rpx;
			display: flex;
			box-sizing: border-box;
			padding:0 30rpx;
			position: relative;
			z-index: 10;
			align-items: center;
			justify-content: center;
		}
		.icon-back{
			width: 80rpx;
			height:88rpx;
			background:url(../../static/goods/back@2x.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			left:0;
			top:0;
		}
		.header-title{
			height:88rpx;
			line-height: 88rpx;
			font-size: 34rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
		}
		.icon-share{
			width: 42rpx;
			height:42rpx;
			position: absolute;
			right:32rpx;
			top:50%;
			margin-top: -21rpx;
			background:url(../../static/goods/fenxiang@2x.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
</style>
