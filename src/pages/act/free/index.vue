<template>
	<view class="content">
		<view class="free-top">
			<image class="free-top-banner" src="../static/free/bg.jpg"/>
			<view class="free-top-info">
				<image class="free-top-icon" src="../static/free/miandan.png" />
				<view class="free-top-name">{{topData.keyName}}</view>
				<view class="free-top-point">{{topData.point}}</view>
				<view class="free-top-font">Points</view>
			</view>
			<image class="free-top-pic" :src="topData.pic" mode="aspectFit" />
		</view>
		<view class="free-center">
			<view class="free-center-title">免单条件</view>
			<view class="free-center-con">
				<view class="free-center-list" v-for="(item,index) in condition" :key="index">
					<view class="free-center-list-left">{{item.name}}</view>
					<view class="free-center-list-right">{{item.desc}}</view>
				</view>
			</view>

			<view class="free-center-title">往期记录</view>
			<view class="free-record">
				<view class="free-record-list" v-for="(item,index) in recordData" :key="index">
					<view class="free-record-time"><view class="free-star"></view>{{getTime(item.day)}}</view>
					<view class="free-record-bottom">
						<view class="free-record-name">{{item.keyName}}</view>
						<view class="free-record-num">{{item.userNum}}</view>
					</view>
					<image class="free-record-pic" :src="item.pic" mode="aspectFit"/>
				</view>
			</view>
			<view class="free-button" @click="onClickMoreFree">更多免单记录</view>

			<view class="free-center-title">活动规则</view>
			<view class="free-rules">
				<view class="free-rules-list" v-for="(item,index) in rules" :key="index">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import { dateFormatMS } from "@/tools/util";
	@Component({})
	export default class ClassName extends BaseNode {
		dateFormatMS = dateFormatMS;
		topData:{[x:string]:any} = {
			keyName: "",
			point:0,
			pic:"",
			limit_good: "",
			limit_seq: ""
		};
		condition:{[x:string]:any} = {
			name:{name:'免单球员',desc:''},
			type:{name:'拼团类型',desc:''},
			no:{name:'编号要求',desc:''},
			time:{name:'免单时间',desc:''}
		};
		recordData:any = [];
		rules:any = [
			'1.活动时间：2021年1月1日-2021年NBA季后赛结束',
			'2.每日NBA得分最高球员为免单球员，平台将在15:00前公布免单球员，当日00:00至23:59购得符合条件的编号均可获得免单机会',
			'3.免单金额将于次日12:00点原路返还',
			'4.可点击“更多免单记录”查询历史免单名单，今日名单于次日12:00更新',
			'5.用户在符合免单条件时，若单笔订单有多个编号仅免单符合条件的编号。例如：小王10月5日购买了5个编号，合计50元，其中2个编号符合当日免单机会，则在次日12:00前返还20元',
			'6.若某个编号已享受本免单活动，且最终该编号所属的商品拼团失败（时间截至拼团人数不足），则不再重复返还商品款'
		]
		onLoad(query:any) {
			this.initEvent()
		}
		initEvent(){
			app.http.Get('activity/free/home',{},(res:any)=>{
				let data = res.today;
				let today = dateFormatMS(Math.floor(new Date().getTime()/1000))
				this.topData = data;
				this.recordData = res.list;
				this.condition['name'].desc = data.keyName;
				this.condition['type'].desc = data.limit_good
				this.condition['no'].desc = '小于'+data.point+'限量编号的签字卡'
				this.condition['time'].desc = today+' 00:00至'+today+' 23:59'
			})
		}
		getTime(val:any){
			return val.slice(val.indexOf('-')+1)
		}
		onClickMoreFree(){
			uni.navigateTo({
				url:'/pages/act/free/record?day='+this.recordData[0].day
			})
		}
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		box-sizing:border-box;
	}
	.free-top{
		width: 750rpx;
		height:713rpx;
		box-sizing: border-box;
		position: relative;
		&-banner{
			width: 100%;
			height:713rpx;
			box-sizing: border-box;
			position: absolute;
			z-index: 1;
		}
		&-info{
			width: 289rpx;
			height:549rpx;
			position: absolute;
			left:71rpx;
			top:164rpx;
			box-sizing: border-box;
			z-index: 3;
		}
		&-icon{
			width: 289rpx;
			height:75rpx;
			box-sizing: border-box;
		}
		&-name{
			width: 100%;
			text-align: center;
			font-size: 44rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 56rpx;
		}
		&-point{
			width: 100%;
			text-align: center;
			font-size: 120rpx;
			font-family: 'DIN';
			font-weight: bold;
			color: #12FFFC;
			height:90rpx;
			line-height: 90rpx;
			margin:25rpx 0 10rpx 0;
		}
		&-font{
			width: 100%;
			text-align: center;
			font-size: 34rpx;
			font-family: 'DIN';
			font-weight: bold;
			color: #FFFFFF;
		}
		&-pic{
			width: 446rpx;
			height:600rpx;
			position: absolute;
			right:60rpx;
			bottom:0;
			z-index: 2;
		}
	}
	.free-center{
		width: 100%;
		box-sizing: border-box;
		background:#181C1F;
		padding:39rpx 0 60rpx 0;
		&-title{
			width: 245rpx;
			height:63rpx;
			background:url(../static/free/biaoti.png) no-repeat center;
			background-size: 100% 100%;
			margin:0 auto;
			text-align: center;
			line-height: 63rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #12FFFC;
		}
		&-con{
			width: 700rpx;
			height:322rpx;
			margin:28rpx  auto 55rpx;
			background:url(../static/free/miandan_.png) no-repeat center;
			background-size: 100% 100%;
			box-sizing: border-box;
			padding:30rpx 90rpx;
		}
		&-list{
			width: 100%;
			height:50rpx;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			&-left{
				width: 120rpx;
				height: 50rpx;
				background: #53FBEE;
				border-radius: 25rpx;
				text-align: center;
				line-height: 50rpx;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #181C1F;
				margin-right: 20rpx;
			}
			&-right{
				height:50rpx;
				line-height: 50rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
			}
		}
	}
	.free-record{
		width: 100%;
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 16rpx;
		&-list{
			width: 232rpx;
			height:334rpx;
			background:url(../static/free/wangqi.png) no-repeat center;
			background-size: 100% 100%;
			position: relative;
			border-radius: 30rpx;
			overflow: hidden;
		}
		&-time{
			width: 100%;
			padding-top: 23rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #53FBEE;
		}
		&-bottom{
			width: 100%;
			height:90rpx;
			position: absolute;
			bottom:0;
			left:0;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			box-sizing: border-box;
			padding:8rpx 0;
			background:#53FBEE;
			z-index: 3;
		}
		&-name{
			width: 100%;
			text-align: center;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #3A4249;
		}
		&-num{
			width: 100%;
			text-align: center;
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #338F88;
		}
		&-pic{
			width: 100%;
			height:280rpx;
			position: absolute;
			bottom:0;
			left:0;
			z-index: 2;
		}
	}
	.free-button{
		width: 610rpx;
		height:94rpx;
		background:url(../static/free/button.png) no-repeat center;
		background-size: 100% 100%;
		margin:24rpx auto 50rpx;
		line-height: 85rpx;
		text-align: center;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #3A434A;
	}
	.free-rules{
		width: 700rpx;
		border: 2rpx solid #53FBEE;
		opacity: 0.6;
		border-radius: 30rpx;
		box-sizing: border-box;
		padding:36rpx 32rpx;
		margin: 0 auto;
		margin-top: 40rpx;
		&-list{
			width: 100%;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #8A9DAE;
			text-indent: -20rpx;
			padding-left: 20rpx;
			line-height: 38rpx;
		}
	}
	.free-star{
		width: 20rpx;
		height:20rpx;
		background:url(../static/free/star.png) no-repeat center;
		background-size: 100% 100%;
		margin-right: 8rpx;
	}
</style>
