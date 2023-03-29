<template>
	<view class="content">
		<u-popup :show="popupShow" @close="show=false" :round="5" :safeAreaInsetBottom="true" bgColor="#13121A" :overlayOpacity="0.1">
			<view class="music-popup">
				<view class="music-navigation">
					选择音乐
					<view class="music-close" @click="show=false"></view>
				</view>
				<view class="music-list">
					<view class="music-index" v-for="item in musicList" :key="item.id">
					<view class="music-index-left">
						<view class="music-index-name u-line-1">{{item.name}}</view>
						<view class="music-index-singer">{{item.singer}}</view>
					</view>
					<view class="music-index-right" @click="onClickMusicChoice(item)">
						<view v-if="!item.choice" class="music-choice">选择</view>
						<view v-else-if="!item.play" class="music-play"></view>
						<view v-else class="music-pause"></view>
					</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script lang="ts">
	import { Component,PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	interface Music{
		id:number;
		name:string;
		singer:string;
		choice:boolean;
		play:boolean;
		src:string
	}
	@Component({})
	export default class ClassName extends BaseComponent {
		@PropSync("popupShow",{type:Boolean})
		show!:Boolean

		musicList = [
			{id:1,name:'wait wait wait',singer:'蔡徐坤',choice:false,play:false,src:'../../static/drawCard/music/Wait.mp3'},
			{id:2,name:'鸡舞',singer:'蔡徐坤',choice:false,play:false,src:'../../static/drawCard/music/jiwu.mp3'},
			{id:3,name:'You Bring Me Joy',singer:'ErGuuu',choice:false,play:false,src:'../../static/drawCard/music/ErGuuu.mp3'},
			{id:4,name:'迷恋',singer:'梅卡德尔',choice:false,play:false,src:'../../static/drawCard/music/milian.mp3'},
		]
		innerAudioContext:any;
		storage:any;
		mounted(){
			this.$nextTick(()=>{
				this.InitMusic()
			})
		}
		destroyed(){
			this.innerAudioContext.destroy()
		}
		InitMusic(){
			this.storage = uni.getStorageSync('musicChoice');
			this.innerAudioContext = uni.createInnerAudioContext();
			this.innerAudioContext.loop = true;
			this.onClickMusicChoice(this.InitMusicItem,this.InitMusicPlay)
		}
		onClickMusicChoice(item:Music, initPlay = true) { 
			const { innerAudioContext, musicList, $emit } = this;

			if (item.choice) { 
				item.play ? innerAudioContext.pause() : innerAudioContext.play(); 
				item.play = !item.play; 
			} else { 
				item.choice = true; 
				item.play = initPlay; 
				musicList.forEach((x) => { 
					if (x.id !== item.id) { x.choice = false; x.play = false; } 
				}); 
				$emit('musicChange', item.name); 
				innerAudioContext.src = item.src; 
				item.play && innerAudioContext.play(); 
			} 
			uni.setStorageSync('musicChoice', item); 
		}
		public get InitMusicItem() : Music {
			const item = this.musicList.find((x:Music)=>{
				return x.id == this.storage.id
			})
			return item ?? this.musicList[0] 
		}
		public get InitMusicPlay() : boolean {
			return this.storage ? this.storage.play : true 
		}
	}
</script>

<style lang="scss" scoped>
	.music-popup{
		width: 100%;
		height:740rpx;
		.music-navigation{
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
			.music-close{
				width: 29rpx;
				height:27rpx;
				background: url(@/static/mall/close.png) no-repeat center / 100% 100%;
				position: absolute;
				right:34rpx;
				top:50%;
				margin-top: -13.5rpx;
			}
			}
			.music-list{
				width: 100%;
				height:640rpx;
				box-sizing: border-box;
				padding:36rpx;
			.music-index{
				width: 100%;
				height:70rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 30rpx;
				.music-index-left{
					width: 540rpx;
					height:70rpx;
				}
				.music-index-name{
					width: 100%;
					font-size: 27rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #FFFFFF;
				}
				.music-index-singer{
					font-size: 23rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #949494;
				}
				.music-index-right{
					width: 122rpx;
					height:50rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.music-choice{
					width: 122rpx;
					height:48rpx;
					box-sizing: border-box;
					border: 1rpx solid #FFFFFF;
					border-radius: 3rpx;
					font-size: 25rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #FFFFFF;
					line-height: 48rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					text-shadow: 2rpx 2rpx #C62B4F;
				}
				.music-play{
					width: 29rpx;
					height:32rpx;
					background: url(@/static/drawCard/music_play.png) no-repeat center /100% 100%;
				}
				.music-pause{
					width: 30rpx;
					height:31rpx;
					background: url(@/static/drawCard/music_pause.png) no-repeat center /100% 100%;
				}
			}
		}
	}

</style>