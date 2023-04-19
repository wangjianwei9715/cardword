<!--
 * @FilePath: \jichao_app_2\src\pages\drawCard\components\animationCard\animationCard.vue
 * @Author: wjw
 * @Date: 2022-11-28 17:34:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-04-19 17:04:57
 * Copyright: 2022 .
 * @Descripttion: 
-->
<template>
	<view class="cardBox">
		<image class="cardBox-gif" v-if="cardMove||animation.timeout" src="/static/drawCard/_000.gif"/>
		<view class="cardBox-bg" :class="{'anmition-over':animation.over}">
			<view class="cardBox-index" :class="{'show-card':animation.LoopsOver}">
				<image class="cardBox-position" :src="animation.image"/>
			</view>
		</view>
		<slot></slot>
	</view>
</template>

<script lang="ts">
	import { Component,Prop,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { map } from "../../utils/map";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		start?:Boolean;
		@Prop({default:false})
		cardMove?:Boolean;
		@Prop({default:{}})
		animationData:any;
		
		animation = {
			step:1,
			LoopsOver:false,
			over:false,
			timeout:false,
			image:''
		}
		@Watch('start')
		onChangeStart(val:any){
			if(val){
				this.animation.LoopsOver = false;
				this.animation.over = false;
				this.animation.timeout=true
				setTimeout(() => {
					this.animation.timeout=false
					this.animationStart();
				}, 800);
			}
		}
		mounted(){
		}
		destroyed(){
		}
		public get getImageSrc():string{
			const stepStr = map.setpMap[this.animation.step];
			const animationVal = this.animationData[stepStr];
			let src = ''
			if(stepStr === 'rc' && animationVal){
				src = 'icon_rc' 
			}else{
				const srcMap = stepStr==='team'?map.teamMap:map.positionMap;
				src = srcMap[animationVal];
			}
			return `/static/drawCard/animation/${src}.png`
		}
		animationStart(){
			this.animation.LoopsOver = true;
			this.animation.image = this.getImageSrc;
			const length = this.animationData.rc?3:2;
			setTimeout(()=>{
				if(this.animation.step<length){
					this.animation.step ++ ;
					this.animation.LoopsOver = false;
					setTimeout(()=>{
						this.animationStart()
					},300)
				}else{
					this.animation.over = true;
					setTimeout(() => {
						this.$emit('animationOver')
					}, 600);
				}
			},1000)
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
		width: 332rpx;
		height:332rpx;
		position: absolute;
		left:50%;
		top:50%;
		margin-top: -182rpx;
		margin-left: -166rpx;
		text-align: center;
		line-height: 200rpx;
		color:#fff;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: all 0.3s;
	}
	.show-card{
		opacity: 1;
	}
	.cardBox-position{
		width: 332rpx;
		height:332rpx;
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