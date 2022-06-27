<template>
	<view class="content">
		<view class="top">
			<view class="index border" v-for="(item,index) in dynamicData" :key="index" @click="onClickDynamic(item.bucketName)">
				<view class="left">
					<view class="icon"><view :class="item.title=='交易动态'?'icon-zx':'icon-tz'"></view></view>
					<view class="desc">
						<view class="desc-title">{{item.title}}</view>
						<view class="desc-message">{{item.content}}</view>
					</view>
				</view>
				<view class="right">
					<view class="time">{{item.lastTime>0?getTime(item.lastTime):''}}</view>
					<view class="new-message" v-if="item.new>0">{{item.new>99?'99+':item.new}}</view>
				</view>
			</view>
			
		</view>
		<view class="bottom" v-if="buckedList!=''">
			<view class="index" v-for="(item,index) in buckedList" :key="index" @click="onClickBucketId(item.bucketId)">
				<view class="left" >
					<view class="icon"><image class="icon-kf" :src="item.target.avatar?decodeURIComponent(item.target.avatar):'../../static/userinfo/kefu@2x.png'"></image></view>
					<view class="desc">
						<view class="desc-title">{{item.target&&item.target.name?item.target.name:''}}</view>
						<view class="desc-message" v-html="decodeURIComponent(item.content)"></view>
					</view>
				</view>
				<view class="right">
					<view class="time">{{getTime(item.sendTime)}}</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import { formatDateToHour, formatDateToMonth, formatDateToYear } from "@/tools/util";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		dynamicData:any = [];
		buckedList:any = [];
		pageIndex = 1;
		pageSize = 20;
		noMoreData = false;
		onLoad(query:any) {

			this.onEventUI('sendMessage',()=>{
				this.pageIndex = 1;
				this.noMoreData = false;
				this.getBucketlist()
			})
			// this.getHeliChat()
		}
		onShow(){
			// #ifndef MP-WEIXIN
			if(app.token.accessToken == ''){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}
			this.pageIndex=1;
			this.noMoreData = false
			this.getMessageList()
			this.getBucketlist()
			// #endif

			
		}
		//   加载更多数据
		onReachBottom() {
			this.getBucketlist()
		}
		getMessageList(){
			app.http.Get('message/bucketlist',{},(res:any)=>{
				this.dynamicData = res.list
			})
		}
		getBucketlist(){
			if(this.noMoreData){
				return;
			}
			let params = {
				pageIndex:this.pageIndex,
				pageSize:this.pageSize
			}
			app.http.Get('chat/bucketlist',params,(res:any)=>{
				if(this.pageIndex==1){
					this.buckedList = []
				}
				if(res.list){
					this.buckedList = this.buckedList.concat(res.list)
				}else{
					this.noMoreData = true
				}
				this.pageIndex ++;
			})
		}
		getHeliChat(){
			app.http.Get('heli/chat/data',{},(res:any)=>{
			})
		}
		onClickBucketId(id:any){
			uni.navigateTo({
				url: '/pages/userinfo/talk?bucketId='+id
			})
			// 第三方客服
			// let params = {
			// 	agentExten:id
			// }
			// app.platform.heliService(params)
		}
		onClickDynamic(type:any){
			uni.navigateTo({
				url: '/pages/userinfo/dynamic?type='+type
			})
			
		}
		getTime(second:number){
			let now = new Date();
			let sendTime = new Date(second*1000);
			const day = 24*60*60*1000;
		
			let isShowYear = new Date().getFullYear()!=sendTime.getFullYear();
			if (isShowYear) {
				return formatDateToYear(sendTime.getTime());
			}
			let isShowDate = now.getDate() != sendTime.getDate()||now.getTime()-sendTime.getTime()>day;
			if (isShowDate) {
				return formatDateToMonth(sendTime.getTime());
			}
			return formatDateToHour(sendTime.getTime());
		}

	}
</script>

<style lang="scss" scoped>
	.content{
		width: 100%;
		box-sizing: border-box;
	}
	.top{
		width: 100%;
		border-bottom: 20rpx solid $content-bg;
		box-sizing: border-box;
		padding: 0 32rpx;
	}
	.bottom{
		width: 100%;
		box-sizing: border-box;
		padding: 0 32rpx;
	}
	.index{
		width: 100%;
		height:148rpx;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;
		.left{
			width: 560rpx;
			height:148rpx;
			display: flex;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			.icon{
				width: 84rpx;
				height:84rpx;
				border-radius: 50%;
				display: flex;
				box-sizing: border-box;
				align-items: center;
				justify-content: center;
				margin-right: 24rpx;
				overflow: hidden;
				.icon-zx{
					width: 42rpx;
					height:34rpx;
					background:url(../../static/userinfo/zaixian@2x.png) no-repeat center;
					background-size: 100% 100%;
				}
				.icon-tz{
					width: 46rpx;
					height:44rpx;
					background:url(../../static/userinfo/tongzhi@2x.png) no-repeat center;
					background-size: 100% 100%;
				}
				.icon-kf{
					width: 84rpx;
					height:84rpx;
					background:#AAAAAA
				}
			}
			.desc{
				width: 450rpx;
				height:148rpx;
				box-sizing: border-box;
				padding:32rpx 0;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				.desc-title{
					width: 100%;
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 600;
				}
				.desc-message{
					width: 100%;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #767880;
				}
			}
		}
		.right{
			width: 120rpx;
			height:84rpx;
			box-sizing: border-box;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-end;
			.time{
				width: 100%;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #AAAABB;
				margin-bottom: 6rpx;
				text-align: end;
			}
			.new-message{
				width: 32rpx;
				height: 32rpx;
				background: #FF4349;
				border-radius: 50%;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
	}
	
	.border{
		border-bottom: 1px solid #F1F1F4;
	}
	.desc-message /deep/ p{
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #767880;
	}
	.desc-message /deep/ image{
		width: 50rpx !important;
		height:50rpx;
	}
	.desc-message /deep/ img{
		width: 50rpx !important;
		height:50rpx;
	}
</style>
