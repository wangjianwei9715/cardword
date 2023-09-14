<template>
	<view class="upload-center">
		<view class="center-header">
			<view class="header-segment"></view>
			<view class="header-pe" v-show="showPe">
				<view class="pe-item" :class="{'pe-current':peCurrent==index}" v-for="(item,index) in peTab" :key="index" @click="onClickPeCurrent(index)">{{item}}</view>
			</view>
		</view>
		<view class="swiper-box">
			<swiper class="swiper-box" v-if="showSwiper">
				<swiper-item  @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
					<view v-show="peCurrent==0" class="img-box">
						<muqian-lazyLoad v-if="illustration&&illustration.frontPic" class="ill-pic" mode="aspectFit" :thumbnailWidth="600" :src="illustration.frontPic" preview/>
						<view v-else-if="!frontPic" class="up-box" @click="addImage('front')">
							<view class="up-center">
								<view class="icon-upload"></view>
								<view class="up-c-wl">
									<view class="icon-add"></view>我来补充
								</view>
								<view class="up-c-kb">
									可获{{reward}}卡币
								</view>
							</view>
						</view>
						<view v-else class="up-wait-box">
							<muqian-lazyLoad  class="ill-pic" mode="aspectFit" :src="decodeURIComponent(frontPic)" borderRadius="3rpx"/>
							<view class="up-pic-del" @click="frontImg=''"></view>
						</view>
					</view>
					<view v-show="peCurrent==1" class="img-box">
						<muqian-lazyLoad v-if="illustration&&illustration.backPic" class="ill-pic" mode="aspectFit" :thumbnailWidth="600" :src="illustration.backPic" preview/>
						<view v-else-if="!backPic" class="up-box" @click="addImage('back')">
							<view class="up-center">
								<view class="icon-upload"></view>
								<view class="up-c-wl">
									<view class="icon-add"></view>我来补充
								</view>
								<view class="up-c-kb">
									可获{{reward}}卡币
								</view>
							</view>
						</view>
						<view v-else class="up-wait-box">
							<muqian-lazyLoad  class="ill-pic" mode="aspectFit" :src="decodeURIComponent(backPic)" borderRadius="3rpx"/>
							<view class="up-pic-del" @click="backImg=''"></view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
	</view>
</template>

<script lang="ts">
	import { Component, Prop ,PropSync,Watch} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import muqianLazyLoad from "@/components/muqian-lazyLoad/muqian-lazyLoad.vue";
	import Upload from "@/tools/upload"
	import { app } from "@/app";
	@Component({ components: { muqianLazyLoad },})
	export default class ClassName extends BaseComponent {
		@Prop({default:{}})
		illustration?:any;
		@Prop({default:0})
		reward!:number
		@Prop({default:true})
		uploadable!:boolean
		@PropSync("frontPic",{type:String})
		frontImg?:string;
		@PropSync("backPic",{type:String})
		backImg?:string;
		peTab = ['正','反'];
		peCurrent = 0;
		touchData = {
			startX:0,
			startY:0,
			moveX:0,
			moveY:0,
			move:false
		}
		showSwiper = true;
		@Watch("illustration")
		onChangeIllustration(){
			this.peCurrent = 0;
			this.showSwiper = true;
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		public get showPe() : boolean {
			return  !this.illustration  ||  (!this.illustration.frontPic || this.illustration.backPic)
		}
		onClickPeCurrent(index:number){
			if(this.peCurrent==index) return;
			if(this.illustration && this.illustration.frontPic && !this.illustration.backPic && index==1){
				uni.showToast({
					title:'此图鉴无反面图',
					icon:'none'
				})
				return
			}
			this.peCurrent = index;
		}
		async addImage(type:string) {
			if(!this.uploadable) return;
			app.platform.hasLoginToken( async ()=>{
				const pic:any = await Upload.getInstance().uploadSocialImgs(1, "illustration", ["album"]);
				type=="front" && (this.frontImg = pic[0]);
				type=="back" && (this.backImg = pic[0]);
			})
		}
		handleTouchStart(event:any) {
			this.touchData.startX = event.touches[0].clientX;
			this.touchData.startY = event.touches[0].clientY;
		}
		handleTouchMove(event:any) {
			this.touchData.moveX = event.touches[0].clientX;
			this.touchData.moveY = event.touches[0].clientY;
			this.touchData.move = true;
		}
		handleTouchEnd() {
			if(!this.touchData.move) return;
			if (this.touchData.moveX - this.touchData.startX > 100) {
				this.showSwiper = false;
				this.$emit('up')
			} else if (this.touchData.moveX - this.touchData.startX < -100) {
				this.showSwiper = false;
				this.$emit('next')
			}else if(this.touchData.moveY - this.touchData.startY > 100){
				this.$emit("peerTo","up")
			}else if(this.touchData.moveY - this.touchData.startY < -100){
				this.$emit("peerTo","next")
			}
			this.touchData.move = false;
			setTimeout(() => {
				this.showSwiper = true;
			}, 100);
		}
	}
</script>

<style lang="scss">
	.upload-center{
		width: 100%;
		.center-header{
			width: 538rpx;
			height:36rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin:0 auto;
		}
		.header-pe{
			width: 120rpx;
			height:42rpx;
			display: flex;
			align-items: center;
			border-radius: 3rpx;
			overflow: hidden;
		}
		.pe-item{
			width: 60rpx;
			height: 42rpx;
			background: #707070;
			font-size: 23rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			text-align: center;
			line-height: 42rpx;
		}
		.pe-current{
			height: 42rpx;
			background: #FA1545;
		}
		.swiper-box{
			width: 100%;
			height:730rpx;
			box-sizing: border-box;
		}
		.img-box{
			width: 538rpx;
			height:708rpx;
			margin:0 auto;
			border-radius: 3rpx;
			margin-top: 22rpx;
		}
		.ill-pic{
			width: 100%;
			height:708rpx;
		}
		.up-box{
			width: 100%;
			height: 708rpx;
			border: 1px dashed rgba(255, 255, 255, 0.6);
			border-radius: 3rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
		}
		.up-wait-box{
			width: 100%;
			height:708rpx;
			position: relative;
		}
		.up-center{
			width: 220rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
		}
		.icon-upload{
			width: 196rpx;
			height:196rpx;
			background: url(@/static/illustration/icon_upload.png) no-repeat center / 100% 100%;
			margin:0 auto;
		}
		.up-c-wl{
			width: 100%;
			height:40rpx;
			font-size: 38rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #E6E6E6;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 54rpx;
		}
		.icon-add{
			width: 31rpx;
			height:31rpx;
			background: url(@/static/illustration/icon_add.png) no-repeat center / 100% 100%;
			margin-right: 14rpx;
		}
		.up-c-kb{
			width: 100%;
			height:31rpx;
			font-size: 27rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #E6E6E6;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 10rpx;
		}
		.icon-kb{
			width: 31rpx;
			height:31rpx;
			background: url(@/static/illustration/icon_kab.png) no-repeat center / 100% 100%;
			margin-left: 10rpx;
		}
		.up-pic-del{
			width: 50rpx;
			height:50rpx;
			position: absolute;
			right:-10rpx;
			top:-10rpx;
			background: url(@/static/illustration/icon_close.png) no-repeat center / 100% 100%;
		}
	}
</style>
