<template>
	<view class="content">
		<view v-if="imageSrc!=''" style="width:100%;" :style="{'height': viewHeight}">
			<imageclip
				:zoom="1"
				:angle="0"
				:max-zoom="3"
				:min-zoom="0.5"
				:imagesrc="imageSrc"
				:cutWidth="300"
				:cutHeight="300"
				:disableCtrl="false"
				@load="load"
				@error="errHandle"
				@cropped="cropped"
				@afterDraw="afterDraw"
				@beforeDraw="beforeDraw"
			/>
		</view>
		<button v-if="clipImg!=''" class="button-shadow" @click="onClickSure">完成</button>
	</view>
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	const DesignWidth = 750;
	@Component({})
	export default class logoclip extends BaseNode {
		imageSrc = '';
		clipImg = '';
		viewHeight = '700px';
		clickOne = false;
		onLoad(query:any) {
			this.imageSrc = JSON.parse(decodeURIComponent(query.data));
			let systemInfo = uni.getSystemInfoSync();
			this.viewHeight = ((systemInfo.windowHeight) - 150*systemInfo.screenWidth/DesignWidth) + 'px';
		}
		load(path:string, info:any){
			//console.log('load=',path,info);
		}
		errHandle(err:any){
			console.log('errHandle=',err);
			uni.showToast({
				title: err,
				icon: 'none',
				duration: 2000
			});
		}
		cropped(img:string,info:any){
			//console.log('cropped=',img,info);
			this.clipImg = img;
		}
		beforeDraw(ctx:UniApp.CanvasContext, transform:any){
			//console.log('beforeDraw=',ctx,transform);
		}
		afterDraw(ctx:UniApp.CanvasContext, info:any){
			//console.log('afterDraw=',ctx,info);
		}
		onClickSure(){
			if(this.clickOne){
				return;
			}
			this.clickOne = true;
			uni.$emit('finishAvatar',{image:this.clipImg});
			uni.navigateBack({});
		}
	}
</script>

<style>
	page {
		background-color: #000000;
	}
	.button-shadow{
		width: 710rpx;
		height: 88rpx;
		background-color: #FE4706;
		border-radius: 44rpx;
		color: #FFF;
		font-size: 28rpx;
		line-height: 88rpx;
		position: absolute;
		bottom: 50rpx;
	}
</style>
