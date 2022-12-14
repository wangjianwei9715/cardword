<!--
 * @FilePath: \jichao_app_2\src\pages\drawCard\components\animationCard\animationCard.vue
 * @Author: wjw
 * @Date: 2022-11-28 17:34:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-14 14:00:42
 * Copyright: 2022 .
 * @Descripttion: 
-->
<template>
	<view class="cardBox">
		<image class="cardBox-gif" v-show="cardMove||animationTimeout" src="/static/drawCard/_000.gif"/>
		<!-- <l-svga class="cardBox-sm" ref="sm"></l-svga> -->
		<view class="cardBox-bg" :class="{'anmition-over':animationOver}">
			<l-svga class="cardBox-svga" ref="svga"></l-svga>
			<view class="cardBox-index" v-show="animationLoopsOver">{{animationData[animationStep-1]}}</view>
		</view>
		<slot></slot>
	</view>
</template>

<script lang="ts">
	import { Component,Prop,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		start?:Boolean;
		@Prop({default:false})
		cardMove?:Boolean;
		@Prop({default:[]})
		animationData:any;
		
		animationStep = 1;
		animationLoopsOver = false;
		animationOver = false;
		animationTimeout = false;
		@Watch('start')
		onChangeStart(val:any){
			if(val){
				this.animationTimeout=true
				setTimeout(() => {
					this.animationStart();
					this.animationTimeout=false
				}, 500);
			}
		}
		mounted(){
		}
		destroyed(){
		}
		animationStart(){
			this.svgaRender('svga',"/static/drawCard/svga_y.svga",1,()=>{
				this.animationLoopsOver = true;
				setTimeout(()=>{
					if(this.animationStep<this.animationData.length){
						this.animationStep ++ ;
						this.animationLoopsOver = false;
						this.animationStart()
					}else{
						this.animationOver = true;
						// this.svgaRender('sm','/static/drawCard/svga_sm.svga',1)
						setTimeout(() => {
							this.$emit('animationOver')
						}, 1500);
					}
				},1000)
			})
		}
		svgaRender(svga:string,svga_src:string,loops:number,cb?:Function){
			this.$refs[svga].render(async (parser:any, player:any) => {
				const videoItem = await parser.load(svga_src);
				await player.setVideoItem(videoItem);
				player.loops = loops;
				player.clearsAfterStop = true
				player.startAnimation()
				player.onFinished(() => {
					cb && cb()					
				})
			})
		}
	}
</script>

<style lang="scss" scoped>
	.cardBox {
		width: 528rpx;
		height: 795rpx;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.cardBox-gif{
		width:760rpx;
		height: 1580rpx;
		position: absolute;
		left:-120rpx;
		top:-360rpx;
		z-index: 10;
	}
	.cardBox-sm{
		position: absolute;
		left:-320rpx;
		top:-420rpx;
		z-index: 11;
		width: 220%;
		height:220%;
	}
	.cardBox-bg{
		width: 513rpx;
		height: 782rpx;
		background: url("/static/goods/drawcard/dangban.png") no-repeat;
		background-size: 513rpx 722rpx;
		position: absolute;
		left:50%;
		margin-left: -256.5rpx;
		top:50%;
		margin-top: -391rpx;
		z-index: 9;
	}
	.cardBox-svga{
		width:536rpx;
		position: absolute;
		left:-15rpx;
		top:-34rpx;
		height:820rpx;
	}
	.cardBox-index{
		width: 200rpx;
		height:200rpx;
		position: absolute;
		left:50%;
		top:50%;
		margin-top: -110rpx;
		margin-left: -100rpx;
		text-align: center;
		line-height: 200rpx;
		color:#fff;
	}
	.anmition-over{
		// animation-name:clipPath; 
		// animation-duration:1s;
		// animation-fill-mode : forwards;
		// animation-timing-function: linear;
		-webkit-animation: rotate-out-2-fwd 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
		animation: rotate-out-2-fwd 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	}
	@keyframes clipPath{
		0% {
			clip-path:inset(0 0 0 0);
			-webkit-clip-path:inset(0 0 0 0);
		}
		100%{	
			clip-path:inset(0 0 100% 0);
			-webkit-clip-path:inset(0 0 100% 0);
		}
	}

	@-webkit-keyframes rotate-out-2-fwd {
		0% {
			-webkit-transform: translateZ(0) rotate(0);
					transform: translateZ(0) rotate(0);
			opacity: 1;
		}
		100% {
			-webkit-transform: translateZ(180px) rotate(45deg);
					transform: translateZ(180px) rotate(45deg);
			opacity: 0;
		}
	}
	@keyframes rotate-out-2-fwd {
		0% {
			-webkit-transform: translateZ(0) rotate(0);
					transform: translateZ(0) rotate(0);
			opacity: 1;
		}
		100% {
			-webkit-transform: translateZ(180px) rotate(45deg);
					transform: translateZ(180px) rotate(45deg);
			opacity: 0;
		}
	}

</style>