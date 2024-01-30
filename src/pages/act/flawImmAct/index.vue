<!--
 * @FilePath: \jichao_app_2\src\pages\act\flawImmAct\index.vue
 * @Author: wjw
 * @Date: 2024-01-04 17:24:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-30 10:19:19
 * Copyright: 2024 .
 * @Descripttion: 
-->
<template>
	<view class="logo-content" v-if="playerList.length" :class="playerIsflaw?'type-flaw':'type-imm'">
		<view class="back" @click="onClickBack"></view>
		<view class="rule" @click="onClickRule">
			<view class="msg">规则说明</view>
		</view>
		<!-- 球员Swiper -->
		<playerSwiper :current.sync="playerCurrent" :list="playerList" :taskData="taskData" @change="onChangeCurrent"/>
		<view class="decorate"></view>
		<!-- 球员详情 -->
		<swiper class="detail-swiper-box" v-if="showSwiper">
			<swiper-item @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
				<view class="card">
					<view class="card-bg" v-show="!playerIsflaw">
						<view class="card-pic-box">
							<image v-for="item in detailPic" :key="item.index" class="card-pic" :class="{'grayimg':item.index>taskPhase}" :src="item.networkPic?(!playerIsflaw?item.pic:''):`/static/act/immfl/index/${item.imm}`"></image>
						</view>
					</view>
					<view class="card-bg card-flaw" v-show="playerIsflaw">
						<view class="card-pic-box">
							<image v-for="item in detailPic" :key="item.index" class="card-pic" :class="{'grayimg':item.index>taskPhase}" :src="item.networkPic?(playerIsflaw?item.pic:''):`/static/act/immfl/index/${item.flaw}`"></image>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="bottom">
			<view class="name">获得{{playerDetail.name||""}}卡密解锁卡片</view>
			<view class="task">
				<view class="task-item" v-for="(item,index) in taskData" :key="index">
					<text class="complete" v-if="taskPhase>index">已解锁{{item.name}}</text>
					<text class="uncompleted" v-else>{{item.name}}({{playerDetail.num||0}}/{{item.num}})</text>
					<view class="icon-lock" :class="{'lock-complete':taskPhase>index}"></view>
				</view>
				<view class="task-item" v-if="playerDetail.lockKamiNum">
					<text class="lock-num">*有{{playerDetail.lockKamiNum}}条卡密待拼成后计入</text>
				</view>
			</view>
			<view class="get-btn" @click="onClickBottomBtn">
				<view class="receive">{{playerReceiveNum}}人已领</view>
				{{playerDetail.state==2?"已领取":`解锁整卡领${playerDetail.couponAmount||0}元无门槛`}}
			</view>
			<view class="tips">Tips：随机球员2倍；随机球队3倍；手提/IMM额外2倍</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import playerSwiper from "./components/playerSwiper.vue"
	class DetailPic {
		bg={index:1,pic:"",networkPic:false,imm:"bg_1.png",flaw:"flaw_bg_1.png"};
		line={index:2,pic:"",networkPic:false,imm:"bg_2.png",flaw:"flaw_bg_2.png"};
		player={index:3,pic:"",networkPic:true};
		sign={index:4,pic:"",networkPic:true};
		logo={index:5,pic:"",networkPic:false,imm:"bg_5.png",flaw:"flaw_bg_5.png"}
	}
	const playerWidth = uni.upx2px(124);
	const TaskData = [
		{name:"背板",num:1},
		{name:"线条",num:10},
		{name:"人物",num:25},
		{name:"签名",num:50},
		{name:"LOGOMAN",num:100}
	]; //各阶段任务需要的指标值
	@Component({
		components:{playerSwiper}
	})
	export default class ClassName extends BaseNode {
		playerCurrent = 0;
		playerList:any = [];
		playerDetail:any = {};
		playerReceiveNum = 0;
		taskData = TaskData;
		detailPic = new DetailPic();
		touchData = {
			startX:0,
			moveX:0,
			move:false
		}
		showSwiper=true
		onLoad(query:any) {
			this.initPlayerList()
		}
		public get taskPhase() : number {
			return  TaskData.filter((x:any)=>{
				return (this.playerDetail.num||0)>=x.num;
			}).length;
		}
		public get currentPlayer() : any {
			return this.playerList[this.playerCurrent] || {}
		}
		public get playerIsflaw() : boolean {
			return this.currentPlayer.tp && this.currentPlayer.tp == 2 
		}
		initPlayerList(){
			app.http.Get("activity/logoman/card/list",{},(res:any)=>{
				const list = res.list.sort((a:any,b:any)=>{
					return b.num-a.num || b.amount-a.amount
				}).map((x:any,index:number)=>{
					return {
						...x,
						left:(index*playerWidth)
					}
				})
				this.playerList = list;
				this.getPlayerDetail()
			})
		}
		getPlayerDetail(){
			this.detailPic.sign.pic = "";
			this.detailPic.player.pic = "";
			app.http.Get(`activity/logoman/card/detail/${this.currentPlayer.id}`,{},(res:any)=>{
				this.playerReceiveNum = res.receiveNum || 0;
				this.playerDetail = res.data || {};
				this.detailPic.sign.pic = res.data.signature_pic;
				this.detailPic.player.pic = res.data.logoman_pic;
			})
		}
		onChangeCurrent(){
			this.getPlayerDetail()
		}
		onClickBottomBtn(){
			if(this.playerDetail.state==2) return;
			if(this.taskPhase<5){
				uni.showToast({title:"未解锁卡片",icon:"none"})
				return;
			};
			app.http.Post(`activity/logoman/card/coupon/receive/${this.currentPlayer.id}`,{},(res:any)=>{
				uni.showToast({title:"领取成功",icon:"none"})
				this.getPlayerDetail()
			})
		}
		onClickBack(){
			app.navigateTo.navigateBack()
		}
		onClickRule(){
			uni.navigateTo({url:"/pages/act/flawImmAct/rule"})
		}
		handleTouchStart(event:any) {
			this.touchData.startX = event.touches[0].clientX;
		}
		handleTouchMove(event:any) {
			this.touchData.moveX = event.touches[0].clientX;
			this.touchData.move = true;
		}
		handleTouchEnd() {
			if(!this.touchData.move) return;
			if (this.touchData.moveX - this.touchData.startX > 100) {
				this.showSwiper = false;
				this.playerCurrent = this.playerCurrent==0 ? this.playerList.length-1 : this.playerCurrent-1;
			} else if (this.touchData.moveX - this.touchData.startX < -100) {
				this.showSwiper = false;
				this.playerCurrent = this.playerCurrent==this.playerList.length-1 ? 0 : this.playerCurrent+1;
			}
			this.touchData.move = false;
			setTimeout(() => {
				this.showSwiper = true;
			}, 100);
		}
	}
</script>

<style lang="scss">
	@mixin font($size,$weight:400) {
		font-size: $size;
		font-family: PingFang SC;
		font-weight: $weight;
		color: #FDFFFF;
	}
	page{
		width: 100%;
		height:100%;
		background:#326d72
	}
	.logo-content{
		width: 100%;
		height:1149rpx;
		background:url(@/static/act/immfl/index/imm_bg.png) no-repeat top / 100% 1518rpx;
		box-sizing: border-box;
		padding-top: 150rpx;
		position: relative;
		.back{
			width: 55rpx;
			height:55rpx;
			position: fixed;
			left:20rpx;
			top:89rpx;
			background:url(@/static/act/immfl/index/back.png) no-repeat center / 100% 100%;
		}
		.rule{
			width: 129rpx;
			height:119rpx;
			position: absolute;
			right:0;
			top:60rpx;
			background:url(@/static/act/immfl/index/rule.png) no-repeat center / 100% 100%;
			.msg{
				width: 42rpx;
				height: 44rpx;
				font-size: 21rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #060807;
				line-height: 24rpx;
				position: absolute;
				left:30rpx;
				top:38rpx;
			}
		}
		.decorate{
			width: 707rpx;
			height:177rpx;
			background:url(@/static/act/immfl/index/imm_decorate.png) no-repeat center / 100% 100%;
			position: absolute;
			top:285rpx;
			left:21.5rpx;
			z-index: 1;
		}
		.detail-swiper-box{
			width: 725rpx;
			height:726rpx;
			position: absolute;
			top:382rpx;
			left:12.5rpx;
		}
		.card{
			width: 725rpx;
			height:726rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			.card-bg{
				width: 548rpx;
				height:740rpx;
				background:url(@/static/act/immfl/index/card_imm.png) no-repeat center / 100% 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.card-pic-box{
				width: 470rpx;
				height:659rpx;
				position: relative;
			}
			.card-pic{
				width: 470rpx;
				height:659rpx;
				position: absolute;
				left:0;
				top:0;
			}
		}
		.card-flaw{
			width: 725rpx !important;
			height:548rpx !important;
			background:url(@/static/act/immfl/index/card_flaw.png) no-repeat center / 100% 100% !important;
			.card-pic-box{
				width: 650rpx !important;
				height:470rpx !important;
			}
			.card-pic{
				width: 650rpx !important;
				height:470rpx !important;
			}
		}
		.grayimg{
			filter: grayscale(100%);
		}
		.bottom{
			width: 750rpx;
			height:540rpx;
			background:url(@/static/act/immfl/index/imm_bottom.png) no-repeat center / 100% 100%;
			position: fixed;
			bottom:0;
			left:0;
			box-sizing: border-box;
			padding-top: 60rpx;
			.name{
				width: 100%;
				text-align: center;
				@include font(34rpx,600);
			}
			.task{
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				margin-top: 40rpx;
				.task-item{
					width: 50%;
					box-sizing: border-box;
					padding:0 37rpx;
					height:30rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 30rpx;
				}
				.uncompleted{
					@include font(24rpx);
					color:#E1BF62
				}
				.complete{
					@include font(24rpx);
				}
				.icon-lock{
					width: 20rpx;
					height:25rpx;
					background:url(@/static/act/immfl/index/imm_lock.png) no-repeat center / 100% 100%;
				}
				.lock-complete{
					background:url(@/static/act/immfl/index/imm_lock_.png) no-repeat center / 100% 100%;
				}
				.lock-num{
					@include font(24rpx);
					color:#FFF718
				}
			}
			.get-btn{
				width: 691rpx;
				height:108rpx;
				background:url(@/static/act/immfl/index/imm_btn.png) no-repeat center / 100% 100%;
				margin:0 auto;
				margin-top: 25rpx;
				@include font(38rpx,600);
				color:#9A4319;
				text-align: center;
				position: relative;
				line-height: 104rpx;
			}
			.receive{
				box-sizing: border-box;
				height:40rpx;
				padding:0 7rpx 0 12rpx;
				@include font(22rpx);
				color:#9A4319;
				position: absolute;
				line-height: 40rpx;
				right:8rpx;
				top:6rpx;
				background:#E7B403;
				border-bottom-left-radius: 10rpx;
			}
			.tips{
				width:100%;
				text-align: center;
				margin-top: 26rpx;
				@include font(22rpx);
			}
		}
	}
	.type-flaw{
		background:url(@/static/act/immfl/index/bg.png) no-repeat top / 100% 1518rpx !important;
		.decorate{
			background:url(@/static/act/immfl/index/decorate.png) no-repeat center / 100% 100% !important;
		}
		.get-btn{
			background:url(@/static/act/immfl/index/btn.png) no-repeat center / 100% 100% !important;
			color:#19829A !important;
			.receive{
				background:#1BB2B7 !important;
				color:#07ECEF !important
			}
		}
		.bottom{
			background:url(@/static/act/immfl/index/bottom.png) no-repeat center / 100% 100% !important;
		}
		.uncompleted{
			color:#66A1AE !important
		}
		.lock-num{
			color:#00FCFF !important
		}
		.icon-lock{
			background:url(@/static/act/immfl/index/lock.png) no-repeat center / 100% 100% !important;
		}
		.lock-complete{
			background:url(@/static/act/immfl/index/lock_.png) no-repeat center / 100% 100% !important;
		}
	}
</style>
