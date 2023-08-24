<template>
	<view class="shadow" v-if="showBox">
		<view class="header-box">
			<statusbar/>
			<view class="header">
				<view class="icon-close" @click="showBox=false"></view>
			</view>
		</view>
		<view class="center">
			<statusbar/>
			<view class="upload-box">	
				<view class="upload-header">
					<view class="icon-left" @click="$u.throttle(onClickUp,1000)"></view>
					<view class="header-num">{{currentNum}}/{{allNum}}</view>
					<view class="icon-right" @click="$u.throttle(onClickNext,1000)"></view>
				</view>
				<view class="upload-center">
					<view class="center-header">
						<view class="header-segment"></view>
						<view class="header-pe" v-show="showPe">
							<view class="pe-item" :class="{'pe-current':peCurrent==index}" v-for="(item,index) in peTab" :key="index" @click="onClickPeCurrent(index)">{{item}}</view>
						</view>
					</view>
					<swiper class="swiper-box">
						<swiper-item @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
							<view v-show="peCurrent==0" class="img-box">
								<image v-if="currentItem.frontPic" class="ill-pic" mode="aspectFit" :src="$thumbnail(currentItem.frontPic,600)" @click="onClickLazyImage(currentItem.frontPic)"/>
								<view v-else class="no-pic">暂未收集</view>
							</view>
							<view v-show="peCurrent==1" class="img-box">
								<image v-if="currentItem.backPic" class="ill-pic" mode="aspectFit" :src="$thumbnail(currentItem.backPic,600)" @click="onClickLazyImage(currentItem.backPic)"/>
								<view v-else class="no-pic">暂未收集</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="upload-card-info">
					<view class="card-num">NO.{{currentItem.number}} {{currentItem.team}}</view>
					<view class="card-title">{{currentItem.player}}</view>
					<view class="card-set">{{currentItem.split?currentItem.seqIndex+"/":""}}{{currentItem.seq}}编，{{currentItem.cardSet}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop ,PropSync} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		list!:any;
		@Prop({default:0})
		allNum!:number
		@PropSync("show",{default:false})
		showBox!:boolean
		@PropSync("current",{type:Number})
		currentNum!:number;

		peTab = ['正','反'];
		peCurrent = 0;
		touchData = {
			startX:0,
			moveX:0,
			move:false
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		public get showPe() : boolean {
			return  this.currentItem.backPic
		}
		public get currentItem() : any {
			return this.list[this.currentNum-1]
		}
		onClickPeCurrent(index:number){
			if(this.peCurrent==index) return;
			if(!this.currentItem.backPic && index==1){
				uni.showToast({
					title:'此图鉴无反面图',
					icon:'none'
				})
				return
			}
			this.peCurrent = index;
		}
		handleTouchStart(event:any) {
			this.touchData.startX = event.touches[0].clientX;
		}
		handleTouchMove(event:any) {
			this.touchData.moveX = event.touches[0].clientX;
			this.touchData.move = true;
		}
		handleTouchEnd() {
			if(!this.touchData.move) return;
			if (this.touchData.moveX - this.touchData.startX > 100) {
				this.onClickUp()
			} else if (this.touchData.moveX - this.touchData.startX < -100) {
				this.onClickNext()
			}
			this.touchData.move = false;
		}
		onClickUp(){
			if(this.currentNum<=1) return;
			this.peCurrent=0;
			this.currentNum--;
		}
		onClickNext(){
			if(this.currentNum>=this.allNum) return;
			if(this.currentNum>=this.list.length && this.currentNum<this.allNum){
				uni.showLoading({
					title: '加载中'
				});
				this.$emit('loadmore')
				return;
			}
			this.peCurrent=0;
			this.currentNum ++;
		}
		onClickLazyImage(pic:string) {
			uni.previewImage({
				//@ts-ignore
				urls: [this.$thumbnail(pic,750)],
				longPressActions:{
					itemList:[],
					success: (data)=> {
					},
					fail: (err)=> {
					}
				}
			});
		}
	}
</script>

<style lang="scss">
	page{
        background:#000000;
    }
	.shadow{
		width: 100%;
		height:100%;
		position: fixed;
		top:0;
		left:0;
		right:0;
		background:rgba(0,0,0,1);
		z-index: 999;
		box-sizing: border-box;
	}
	.header-box{
		width: 100%;
		box-sizing: border-box;
		padding:0 34rpx;
		background:#000000;
		position: fixed;
		left:0;
		top:0;
		z-index: 66;
		.header{
			width: 100%;
			height:88rpx;
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			padding-top: 26rpx;
		}
		.icon-close{
			width: 35rpx;
			height:35rpx;
			background: url(@/static/illustration/icon_close_w.png) no-repeat center / 100% 100%;
		}
		.header-right{
			width: 100rpx;
			margin-top: -6rpx;
		}
		.icon-error{
			width: 35rpx;
			height:35rpx;
			background: url(@/static/illustration/icon_error.png) no-repeat center / 100% 100%;
			margin:0 auto;
		}
		.error-text{
			width: 100%;
			text-align: center;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			margin-top: 8rpx;
		}
	}
	.center{
		width: 100%;
		box-sizing: border-box;
		padding-top:100rpx;
	}
	.upload-box{
		width: 100%;
		box-sizing: border-box;
		margin:0 auto;
		.upload-header{
			width: 100%;
			height:130rpx;
			box-sizing: border-box;
			padding:0 86rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.icon-left{
			width: 25rpx;
			height:42rpx;
			background: url(@/static/illustration/icon_left.png) no-repeat center / 100% 100%;
		}
		.icon-right{
			width: 25rpx;
			height:42rpx;
			background: url(@/static/illustration/icon_right.png) no-repeat center / 100% 100%;
		}
		.header-num{
			text-align: center;
			height:42rpx;
			line-height: 42rpx;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
		}
	}
	.upload-card-info{
		width: 538rpx;
		background: rgba(39, 39, 39, 1);
		border: 1px solid #C0C0C0;
		border-radius: 3rpx;
		margin:0 auto;
		margin-top: 31rpx;
		position: relative;
		box-sizing: border-box;
		padding:30rpx 40rpx 27rpx 40rpx;
		.card-num{
			font-size: 21rpx;
			font-weight: 600;
			color: #FFFFFF;
			margin-bottom: 10rpx;
		}
		.card-title{
			width: 100%;
			font-size: 21rpx;
			font-weight: 600;
			color: #FFFFFF;
		}
		.card-set{
			width: 100%;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #C0C0C0;
			margin-top: 15rpx;
		}
		.card-seq{
			width: 100%;
			height:31rpx;
			display: flex;
			margin-top: 10rpx;
		}
		.card-seq-item{
			width: 74rpx;
			height: 31rpx;
			border-radius: 1rpx;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			text-align: center;
			line-height: 31rpx;
		}
		.logo-seq-1{
			background: #000000;
			color: #FFFFFF;
		}
		.logo-seq-10{
			background: #BFBF3D;
			color: #FFFF54;
		}
	}
	.upload-author{
		width: 100%;
		height:31rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 19rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		margin-top: 29rpx;
		.upload-author-avatar{
			width: 31rpx;
			height:31rpx;
			margin:0 10rpx;
		}
		.upload-author-name{
			margin-right: 10rpx;
		}
	}
	.up-btn{
		width: 681rpx;
		height: 92rpx;
		background: #C0C0C0;
		border-radius: 5rpx;
		font-size: 33rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 92rpx;
		text-align: center;
		margin:0 auto;
		margin-top: 92rpx;
	}
	.up-ok{
		background:#FA1545;
	}
	.upload-right{
		width: 62rpx;
		height:708rpx;
		position: fixed;
		right:0;
		top:294rpx;
		.up-scroll-box{
			width: 62rpx;
			height:708rpx;
		}
		.up-scroll-index{
			width: 47rpx;
			height: 29rpx;
			border: 1px dashed #FFFFFF;
			border-radius: 1rpx;
			box-sizing: border-box;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #F5F5F5;
			margin-bottom: 46rpx;
			float: right;
			box-sizing: border-box;
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}
		.haspic{
			background: #707070;
			border: 1px solid #707070;
		}
		.current-scroll{
			width: 62rpx;
			height: 32rpx;
			background: #FA1545 !important;
			border-radius: 1rpx;
			border: 1px solid #FA1545 !important;
			font-weight: 600;
		}
		
	}
	.shadow{
		.upload-center{
			width: 100%;
			.center-header{
				width: 538rpx;
				height:36rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin:0 auto;
				margin-bottom: 22rpx;
			}
			.header-pe{
				width: 154rpx;
				height:42rpx;
				display: flex;
				align-items: center;
			}
			.pe-item{
				width: 77rpx;
				height: 42rpx;
				background: #707070;
				font-size: 23rpx;
				font-family: PingFang SC;
				font-weight: 400;
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
				height:708rpx;
			}
			.img-box{
				width: 538rpx;
				height:708rpx;
				border-radius: 3rpx;
				margin:0 auto;
			}
			.ill-pic{
				width: 538rpx;
				height:708rpx;
			}
			.no-pic{
				width: 538rpx;
				height:708rpx;
				background: #333333;
				border-radius: 3rpx 3rpx 0rpx 0rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 33rpx;
				color: #707070;
			}
			.up-box{
				width: 538rpx;
				height: 708rpx;
				border: 1px dashed rgba(255, 255, 255, 0.6);
				border-radius: 3rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.up-wait-box{
				width: 538rpx;
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
	}
	
</style>
