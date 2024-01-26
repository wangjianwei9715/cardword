<template>
	<view class="container" >
		<swiper
			v-if="list.length"
			:style="{ width: '100vw', height: '200rpx' }"
			:current="playerCurrent"
			:circular="true"
			previous-margin="315rpx"
			next-margin="315rpx"
			@change="changeSwiperIndex"
			@transition="onTransition"
			@animationfinish="onAnimationfinish"
		>
			<swiper-item v-for="(item, i) in list" :key="i">
				<view class="swiper-box" :style="{transform:`translateY(${changeItemY(item)}rpx)`}" @click="changeSwiperIndex({detail:{current:i}})">
					<actProgress :value="taskSchedule(item)" :widths="124" :activeColor="item.tp==2?'#3fc9ed':'#f7d75c'" defaultColor="rgba(0,0,0,0)" :bgColor="item.tp==2?'#275666':'#be3a10'" class="progress-box" :class="{'init-pic':!currentItem(item)}"/>
					<view class="swiper-icon"  :class="{'init-pic':!currentItem(item)}"></view>
					<image class="swiper-pic" :class="{'init-pic':!currentItem(item)}" :src="item.pic" mode="aspectFill"/>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script lang="ts">
	import { Component, Prop, PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import actProgress from "./actProgress.vue"
	const playerWidth = uni.upx2px(124); //每个球员宽度
	const halfPlayerWidth = playerWidth/2; //一半宽度
	const centerMargin = uni.upx2px(750); //两边需要倾斜的距离 值越大倾斜角度越小
	const tiltHeight = 150; //倾斜高度 值越大倾斜角度越大
	@Component({components:{actProgress}})
	export default class ClassName extends BaseComponent {
		@PropSync("current",{
			type:Number
		}) playerCurrent!: any;
		@Prop({default:[]})
		list!:any[]
		@Prop({default:[]})
		taskData!:any[]
		swiperLeft = 0;
		lastLeft = 0;
		public get maxWidth() : number {
			return (playerWidth * this.list.length)
		}
		taskSchedule(item:any) : number {
			return  this.taskData.filter((x:any)=>{
				return (item.num||0)>=x.num;
			}).length * 20;
		}
		changeSwiperIndex(e:any){
			if(this.playerCurrent===e.detail.current) return;
			this.playerCurrent = e.detail.current;
			this.$emit('change');
		}
		currentItem(item:any){
			return item.left>this.swiperLeft-halfPlayerWidth&&item.left<this.swiperLeft+halfPlayerWidth
		}
		changeItemY({left}:any){
			const { maxWidth } = this;
			const leftW = this.swiperLeft-centerMargin;
			const rightW = this.swiperLeft+centerMargin+playerWidth;
			const leftMin = leftW>0?leftW:(maxWidth+leftW);
			const rightMin = rightW<maxWidth?rightW:(rightW-maxWidth)
			if(leftMin<rightMin && (left>leftMin&&left<rightMin)){
				return this.floorY(this.swiperLeft-left)
			}else if(left>leftMin||left<rightMin){
				if((this.swiperLeft>-halfPlayerWidth)&&this.swiperLeft<centerMargin){
					if(left<rightMin && left>=this.swiperLeft){
						return this.floorY(left-this.swiperLeft)
					}else if(left<this.swiperLeft){
						return this.floorY(this.swiperLeft-left)
					}
					return this.floorY(centerMargin-(left-leftMin))
				}else{
					if(left<=(this.swiperLeft) && left>centerMargin){
						return this.floorY(centerMargin-(left-leftMin))
					}else{
						const num = left < centerMargin ? (left+(maxWidth-this.swiperLeft)) 
						: (left-this.swiperLeft)
						return this.floorY(num)
					}
				}
			}
			return tiltHeight;
		}
		floorY(num:number){
			return (Math.abs(num) / centerMargin) * tiltHeight;
		}
		onTransition(e:any){
			const { maxWidth } = this;
			const moveLeft = this.lastLeft+e.detail.dx; //记录移动的位置
			if(e.detail.dx<0 && moveLeft<=-halfPlayerWidth){
				this.swiperLeft = maxWidth + moveLeft;
				return;
			}else if(e.detail.dx>0 && moveLeft>(maxWidth-halfPlayerWidth)){
				this.swiperLeft = moveLeft - maxWidth;
				return;
			}
			this.swiperLeft = moveLeft;
		}
		onAnimationfinish(){
			this.lastLeft = this.list[this.playerCurrent].left;
			this.swiperLeft = this.lastLeft
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		position: relative;
		z-index: 2;
	}
	.swiper-box{
		width: 124rpx;
		height:124rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		position: relative;
	}
	.current-box{
		margin:0 5rpx;
	}
	.swiper-pic{
		width: 76rpx;
		height:76rpx;
		transition: all 0.3s;
		position: absolute;
		left:50%;
		top:50%;
		margin-top: -38rpx;
		margin-left: -38rpx;
		z-index: 2;
	}
	.swiper-icon{
		width: 124rpx;
		height:124rpx;
		transition: all 0.3s;
		position: absolute;
		left:50%;
		top:0;
		margin-left: -62rpx;
		z-index: 1;
		background:url(@/static/act/immfl/index/swiper.png) no-repeat center / 100% 100%;
	}
	.progress-box{
		transition: all 0.3s;
	}
	.init-pic{
		transform: scale(0.8);
		filter: brightness(0.7);
	}
	// .init-pic::before{
	// 	content:"";
	// 	width: 100%;
	// 	height: 100%;
	// 	position: absolute;
	// 	left:0;
	// 	top:0;
	// 	right: 0;
	// 	background:rgba(0,0,0,0.6);
	// }
	.swiper-desc{
		margin-top: 10rpx;
		text-align: center;
		font-size: 23rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	.swiper-name{
		width: 100%;
		text-align: center;
		font-size: 23rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	.swiper-desc-text{
		font-size: 27rpx;
		font-weight: bold;
	}
	@keyframes float {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(6rpx);
		}
		100% {
			transform: translateY(0);
		}
	}
</style>
