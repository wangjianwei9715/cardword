<!--
 * @FilePath: \jichao_app_2\src\pages\index\component\index\medalPopup.vue
 * @Author: wjw
 * @Date: 2024-05-13 16:14:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-06 10:10:59
 * Copyright: 2024 .
 * @Descripttion: 
-->
<template>
	<view class="medalPopup" v-show="show">
		<view class="medalPopup-showdow" ></view>
		<view class="medalPopup-box">
			<view class="medalPopup-index" :class="{'show':showImg}">
				<image @click="onClickClose" class="close" src="@/static/index/close.png"/>
				<image class="icon-medal" :src="medalPopupData.pic"/>
				<view class="name-line">
					<view class="medal-name">{{medalPopupData.name}}</view>
				</view>
				<view class="medal-title">{{medalPopupData.title}}</view>
			</view>
			<view class="medal-btn" v-show="showImg" @click="onClickGoDetail">{{medalPopupData.btnMsg}}</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch,PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		@PropSync("show",{
			type:Boolean
		}) showSync!: Boolean;
		@Prop({default:''})
		data?:any;
		@Prop({default:()=>[]})
		newMedalList?:any;
		showImg = false;
		@Watch('show')
		onGoodsDataChanged(val: any, oldVal: any) {
			if(val){
				setTimeout(()=>{
					this.showImg = true;
				},100)
			}
		}
		public get medalPopupData() : any {
			const newMedalLength = this.newMedalList.length;
			const noReward = newMedalLength>0;
			const medal = noReward ? this.newMedalList[0] : this.data;
			return {
				title:noReward?`恭喜您获得了${newMedalLength}枚勋章`:"恭喜，获得勋章点亮奖励！",
				name:`${medal.name} ${newMedalLength>1?`等${newMedalLength}枚`:""}`,
				pic:medal.pic,
				btnMsg:noReward?"去看看":"前往领取优惠券"
			}
		}
		close(){
			this.showSync = false;
			uni.showTabBar()
		}
		onClickClose(){
			this.close()
		}
		onClickGoDetail(){
			this.onClickClose()
			app.navigateTo.goMedalIndex(0,this.data.id||0)
		}
	}
</script>

<style lang="scss">
	.medalPopup{
		width: 100%;
		box-sizing: border-box;
		&-showdow{
			width: 100%;
			height:100%;
			position: fixed;
			top:0;
			left:0;
			z-index:999;
			background: rgba(0, 0, 0, 0.5);
		}
		&-box{
			width: 100%;
			height:1000rpx;
			position: fixed;
			top:50%;
			margin-top: -500rpx;
			z-index: 99999999;
			.medalPopup-index{
				width: 750rpx;
				height:657rpx;
				transition: all 0.5s;
				margin:0 auto;
				transform: scale(0);
				background:url(@/static/medal/popup_bg.png) no-repeat center / 100% 100%;
				position: relative;
				box-sizing: border-box;
				padding-top: 254rpx;
				display: flex;
				justify-content: center;
				align-content: baseline;
				flex-wrap: wrap;
			}
			.show{
				transform: scale(1);
			}
			.close{
				width: 55rpx;
				height:55rpx;
				position: absolute;
				top:72rpx;
				right:174rpx;
			}
			.icon-medal{
				width: 227rpx;
				height:227rpx;
				border-radius: 50%;
				background:red;
				margin-bottom: 30rpx;
			}
			.name-line{
				width: 100%;
				height:93rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.medal-name{
				color:#fff;
				font-size: 22rpx;
			}
			.medal-title{
				font-family: YouSheBiaoTiHei;
				font-size: 40rpx;
				width: 100%;
				text-align: center;
				color:#fff;
			}
		}
	}
	.medal-btn{
		width: 296rpx;
		height:77rpx;
		background: url(@/static/medal/popup_btn.png) no-repeat center / 100% 100%;
		margin:13rpx auto;
		text-align: center;
		line-height: 77rpx;
		font-family: YouSheBiaoTiHei;
		font-size: 34rpx;
		color:#fff;
	}
</style>
