<template>
	<view class="upload-right" :style="{...boxStyle,top:sizeData.top}">
		<view class="swiper-bg" :style="{height:sizeData.height}"></view>
		<swiper
			class="swiper-box"
			:style="boxStyle"
			:current="current"
			:circular="true"
			:vertical="true"
			:previous-margin="sizeData.previous"
			:next-margin="sizeData.next"
			@change="changeSwiperIndex"
		>
			<swiper-item class="swiper-item" v-for="(item,index) in noData.text.seq" :key="index">
				<view class="up-scroll-index" :class="{'current-scroll':(index+1)==noData.text.seqIndex,'haspic':binaryPeer[index]>0}" @click="onClickPeerTo(index)">
				{{index+1}}{{(index+1)==noData.text.seqIndex?`/${noData.text.seq}`:''}}
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script lang="ts">
	import { Component, Prop ,Watch} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	// top = (708-height)/2 + 188;
	const SizeMap = {
		"mini" : {
			width:"100rpx",
			height:"400rpx",
			previous:"160rpx",
			next:"160rpx",
			top:"342rpx"
		},
		"small" : {
			width:"100rpx",
			height:"690rpx",
			previous:"308rpx",
			next:"308rpx",
			top:"196rpx"
		},
		"base" :{
			width:"100rpx",
			height:"710rpx",
			previous:"321rpx",
			next:"321rpx",
			top:"192rpx"
		}
	}
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:{}})
		noData!:any
		@Prop({default:[]})
		binaryPeer!:any

		current = 0;
		@Watch('noData')
		onWatchNoData(val: any, oldVal: any){
			this.current = val.text.seqIndex-1
		}
		created(){
			this.current = this.noData.text.seqIndex-1
		}
		public get sizeData() : {[x:string]:any} {
			const num = this.binaryPeer.length;
			const size = num>10?"base":(num<9?"mini":"small");
			return SizeMap[size];
		}
		public get boxStyle() : {[x:string]:any} {
			const { width, height } = this.sizeData;
			return { width, height }
		}
		onClickPeerTo(index:number){
			this.current = index;
		}
		changeSwiperIndex(e:any){
			this.emitChange(e.detail.current);
		}
		emitChange(index:number){
			app.platform.UIClickFeedBack(); 
			this.$emit('change',index+1);
		}
	}
</script>

<style lang="scss" scoped>
	.upload-right{
		width: 100rpx;
		height:710rpx;
		position: absolute;
		right:-45rpx;
		top:192rpx;
		.swiper-bg{
			width: 46rpx;
			height:710rpx;
			background: linear-gradient(270deg, #FA1545 50%, #7E2134 100%);
			border: 1px solid;
			border-image: linear-gradient(90deg, #D15B73, #88162E) 1 1;
			border-radius: 3rpx 1rpx 1rpx 3rpx;
			box-sizing: border-box;
			position: absolute;
			right:0;
			top:0;
			z-index: 1;
		}
		.swiper-box{
			position: relative;
			z-index: 2;
		}
		.up-scroll-box{
			width: 100%;
			height:100%;
		}
		.up-scroll-index{
			width: 46rpx;
			height: 100%;
			box-sizing: border-box;
			font-size: 22rpx;
			
			
			color: #999898;
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}
		.haspic{
			color:#fff;
		}
		.swiper-item{
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
		.current-scroll{
			width: 108rpx;
			height: 58rpx;
			margin-right: -8rpx;
			background: url(@/static/illustration/seq_bg.png) no-repeat center / 100% 100%;
			font-weight: bold;
			box-sizing: border-box;
			padding-left: 10rpx;
			line-height: 58rpx
		}
	}
</style>
