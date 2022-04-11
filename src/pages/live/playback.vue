<template>
	<view class="content">
		<video :src="playData.media_url"  autoplay="true" object-fit="fill" show-fullscreen-btn="false"  class="video">
			<cover-view class="self-nav" :style="'top:'+statusBarHeight+'px'" >
				<cover-view class="nav-bg">
					<cover-view class="nav-logo-content">
						<cover-image @click="onClickNav"  class="nav-logo" :src="decodeURIComponent(playData.mechantLogo)"></cover-image>
					</cover-view>
					<cover-view class="nav-mer">
						<cover-view @click="onClickNav" class="mer-name">{{playData.mechantName}}</cover-view>
						<cover-view @click="onClickNav" class="mer-num">{{playData.viewNum}}观看</cover-view>
					</cover-view>
				</cover-view>
				<cover-image @click="onClickNavigateBack"  class="nav-close" src="../../static/goods/close.png"></cover-image>
			</cover-view>

			<cover-view class="go-mp" v-if="showMpBtn" @click="onClickGoMp">去小程序</cover-view>
		</video>
		
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		playbackUrl:any = '';
		statusBarHeight = app.statusBarHeight;
		playData:any = [];
		showMpBtn = false;
		navClickNum = 0;
		onLoad(query:any) {
			if(query.data){
				this.playData = JSON.parse(query.data)
			}
		}
		onClickNavigateBack(){
			uni.navigateBack({})
		}
		onClickGoMp(){
			app.platform.launchMiniProgramLive(this.playData.wxRoomId)
		}
		onClickNav(){
			if(this.showMpBtn) return;

			this.navClickNum++;
			if(this.navClickNum >=10){
				this.showMpBtn = true;
			}
		}
	}
</script>

<style lang="scss">
	.video{
		width: 750rpx;
		height:calc(100% - 60rpx );
		position: fixed;
		left:0;
		top:0;
		z-index: 88;
	}
	.self-nav{
		width: 100%;
		height:88rpx;
		position:fixed;
		top:0;
		left:0;
		z-index: 999;
		display: flex;
		align-items: center;
	}
	.nav-close{
		width: 50rpx;
		height:50rpx;
		position: absolute;
		right:20rpx;
		top:19rpx
	}
	.nav-bg{
		margin-top: 9rpx;
		height:70rpx;
		display: inline-block;
		align-items: center;
		box-sizing: border-box;
		padding:0 10rpx;
		border-radius: 50rpx;
		background:rgba(0,0,0,0.4);
	}
	
	.go-mp{
		width: 130rpx;
		height:50rpx;
		display: inline-block;
		position:absolute;
		bottom:100rpx;
		right:20rpx;
		z-index: 999;
		align-items: center;
		border-radius: 50rpx;
		background:#67C23A;
		color:#fff;
		font-size: 22rpx;
		line-height: 50rpx;
		text-align: center;
	}
	.nav-logo-content{
		margin-left:20rpx;
		margin-top:7rpx;
		width: 60rpx;
		height:60rpx;
		display: inline-block;
	}
	.nav-logo{
		margin-top: 5rpx;
		width: 50rpx;
		height:50rpx;
	}
	.nav-mer{
		margin-left: 5rpx;
		height:60rpx;
		display: inline-block;
		margin-right: 20rpx;
	}
	.mer-name{
		height:30rpx;
		line-height: 30rpx;
		font-size: 24rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		color:#fff;
	}
	.mer-num{
		height:30rpx;
		line-height: 30rpx;
		font-size: 20rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		color:#fff;
	}
	
</style>
