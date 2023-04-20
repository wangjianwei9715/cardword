<!--
 * @FilePath: \jichao_app_2\src\pages\drawCard\components\scene\scene.vue
 * @Author: wjw
 * @Date: 2022-11-17 15:05:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-04-19 11:40:30
 * Copyright: 2022 .
 * @Descripttion: 
-->
<template>
	<view class="content">
		<u-popup :show="popupShow" @close="show=false" :round="5" :safeAreaInsetBottom="true" bgColor="#13121A" :overlayOpacity="0.1">
			<view class="scene-popup">
				<view class="scene-navigation">
					选择场景
					<view class="scene-close" @click="show=false"></view>
				</view>
				<view class="scene-list">
					<view class="scene-index" v-for="item in sceneList" :key="item.id">
						<view class="scene-bg-box"><image class="scene-bg" :src="item.pic" /></view>
						<view class="scene-name">{{item.name}}</view>
						<view class="scene-btn" @click="onClickSceneChoice(item)">{{item.choice?'已应用':'应用'}}</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script lang="ts">
	import { Component,Prop,PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	interface Scene{
		id:number;
		name:string;
		choice:boolean;
		enable:boolean;
		pic:string;
		sceneBg:string
	}
	@Component({})
	export default class ClassName extends BaseComponent {
		@PropSync("popupShow",{type:Boolean})
		show!:Boolean
		@Prop({default:0})
		picType!:number
		
		sceneList:Array<Scene> = [
			{id:1,name:'篮球场',choice:false,enable:true,pic:'/static/drawCard/scene_bg1.jpg',sceneBg:'bj_001'},
			{id:2,name:'足球场',choice:false,enable:true,pic:'/static/drawCard/scene_bg2.jpg',sceneBg:'bj_002'},
			{id:3,name:'赛博朋克',choice:false,enable:true,pic:'/static/drawCard/scene_bg3.jpg',sceneBg:'bj_003'},
			{id:4,name:'标准',choice:false,enable:true,pic:'/static/goods/drawcard/black_bg.jpg',sceneBg:''},
			{id:5,name:'二次元',choice:false,enable:false,pic:'/static/drawCard/scene_bg0.jpg',sceneBg:''},
			{id:6,name:'敬请期待',choice:false,enable:false,pic:'/static/drawCard/scene_bg0.jpg',sceneBg:''},
		]
		mounted(){
			this.$nextTick(()=>{
				this.onClickSceneChoice(this.InitSceneItem)
			})
		}
		onClickSceneChoice(item:Scene){
			if(!item.enable) return;
			if(!item.choice){
				this.sceneList.forEach((x:Scene)=>{
					x.choice = item.id==x.id
				});
				uni.setStorageSync('sceneChoice',item);
				this.$emit('sceneChange',item.sceneBg);
				this.show=false
			}
		}
		public get InitSceneItem() : Scene {
			const item = this.sceneList.find((x:Scene)=>{
				return x.id == uni.getStorageSync('sceneChoice').id
			})
			return item ?? this.sceneList[this.picType==1?1:0] 
		}
		
	}
</script>

<style lang="scss" scoped>
	.scene-popup{
		width: 100%;
		height:1040rpx;
		.scene-navigation{
		width: 100%;
		height:100rpx;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(232, 232, 232, 0.23);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 33rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
			.scene-close{
				width: 29rpx;
				height:27rpx;
				background: url(@/static/mall/close.png) no-repeat center / 100% 100%;
				position: absolute;
				right:34rpx;
				top:50%;
				margin-top: -13.5rpx;
			}
		}
		.scene-list{
			width: 100%;
			height:900rpx;
			box-sizing: border-box;
			padding:30rpx 35rpx;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			overflow: auto;
			.scene-index{
				width: 210rpx;
				margin-bottom: 42rpx;
				margin-right: 25rpx;
			}
			.scene-index:nth-child(3n){
				margin-right: 0;
			}
			.scene-bg-box{
				width: 210rpx;
				height:273rpx;
				background: #E8E8E8;
				border-radius: 3rpx;
			}
			.scene-bg{
				width: 210rpx;
				height:273rpx;
			}
			.scene-name{
				width: 100%;
				height:64rpx;
				text-align: center;
				line-height: 62rpx;
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
			.scene-btn{
				width: 152rpx;
				height: 52rpx;
				border: 1rpx solid #FFFFFF;
				border-radius: 3rpx;
				display: flex;
				box-sizing: border-box;
				align-items: center;
				justify-content: center;
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				text-shadow: 2rpx 2rpx #C62B4F;
				margin:0 auto;
			}
		}
	}
</style>