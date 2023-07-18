<template>
	<view class="upload-center">
		<view class="center-header">
			<view class="header-segment"></view>
			<view class="header-pe">
				<view class="pe-item" :class="{'pe-current':peCurrent==index}" v-for="(item,index) in peTab" :key="index" @click="onClickPeCurrent(index)">{{item}}</view>
			</view>
		</view>
		<view v-show="peCurrent==0" class="img-box">
			<muqian-lazyLoad v-if="illustration&&illustration.frontPic" class="ill-pic" mode="aspectFit" :src="$parsePic(decodeURIComponent(illustration.frontPic))" borderRadius="3rpx" :preview="true"/>
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
			<muqian-lazyLoad v-if="illustration&&illustration.backPic" class="ill-pic" mode="aspectFit" :src="$parsePic(decodeURIComponent(illustration.backPic))" borderRadius="3rpx" :preview="true"/>
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
		peTab = ['正面','反面'];
		peCurrent = 0;
		@Watch("illustration")
		onChangeIllustration(){
			this.peCurrent = 0;
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
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
				const pic:any = await Upload.getInstance().uploadSocialImgs(1, "illustration", ["album","camera"]);
				type=="front" && (this.frontImg = pic[0]);
				type=="back" && (this.backImg = pic[0]);
			})
		}
	}
</script>

<style lang="scss">
	.upload-center{
		width: 100%;
		.center-header{
			width: 100%;
			height:36rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 22rpx;
		}
		.header-pe{
			width: 154rpx;
			height:36rpx;
			display: flex;
			align-items: center;
		}
		.pe-item{
			width: 77rpx;
			height: 36rpx;
			background: #707070;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
			line-height: 36rpx;
		}
		.pe-current{
			height: 36rpx;
			background: #FA1545;
		}
		.img-box{
			width: 100%;
			height:708rpx;
			border-radius: 3rpx;
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
