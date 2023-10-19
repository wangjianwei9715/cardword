<template>
	<view class="good-act-content" >
		<bottomDrawer :showDrawer="show" title="广告推广" @closeDrawer="showSync=false;isPullDown(true)" :needSafeArea="true" padding="0rpx 0rpx">
			<view class="drawer-header">
				<view class="drawer-header-name">使用后在售期间可投放广告页至首页（单商品最高累计可投放{{maxAdHour}}小时）</view>
			</view>
			<view class="drawer-center-list" v-show="!waitUploadOrReview">
				<view class="drawer-center-item" v-for="(item,index) in usableAdCardList" :key="index">
					<view class="drawer-item-box">
						<view class="drawer-item-surplus">剩{{item.remaining_quantity}}次</view>
						<view>
							<view class="drawer-item-num">广告位</view>
							<view class="drawer-item-time">{{item.hour}}小时</view>
						</view>
					</view>
					<view class="drawer-item-operate">
						<view class="operate-btn" @click="onClickReduceNum(item)"><image class="icon-reduce" src="@/static/merchant/icon_reduce.png" /></view>
						<input type="number" class="drawer-item-input" disabled v-model.number="item.num" @blur="onChangeNumber"/>
						<view class="operate-btn" @click="onClickAddNum(item)"><image  class="icon-add" src="@/static/merchant/icon_add.png" /></view>
					</view>
				</view>
			</view>
			<view class="drawer-center-list" v-show="waitUploadOrReview">
				<view v-if="!uploadImg&&waitUpload" class="up-box" @click="addImage()">
					<view class="up-center">
						<view class="icon-upload"></view>
					</view>
				</view>
				<view v-else class="ad-image-box">
					<muqian-lazyLoad  class="ad-image-box" mode="aspectFit" :src="decodeURIComponent(waitUpload?uploadImg:adData.cover)" borderRadius="3rpx" preview/>
					<view v-show="waitUpload" class="up-pic-del" @click="uploadImg=''"></view>
				</view>
			</view>
			
			<view class="drawer-bottom" >
				<view v-if="inEffect" class="drawer-bottom-rank">
					<text>生效中：</text><u-count-down :time="countDown(adData.failure_at)" format="HH:mm:ss" @finish="onFinish"></u-count-down>，<text>在售期间/倒计时结束前</text>有效
				</view>
				<view v-else-if="hasUsableCard" class="drawer-bottom-rank" >
					共{{notStart ? selectedHour:adData.totalHour}}小时,广告图审核通过后开始计时，<text>在售期间/倒计时结束前</text>有效
				</view>
				<view v-else class="drawer-bottom-rank">暂无广告卡可用</view>

				<view v-if="hasUsableCard" :class="buttonData.class" @click="buttonData.clickHandler">
					{{ buttonData.text }} 
					<u-count-down v-if="waitUpload" :time="countDown(adData.coverUpOverTime)" format="mm:ss" @finish="onFinish"></u-count-down>
				</view>
				<view v-else class="drawer-bottom-btn" @click="redirectToMall">去积分中心兑换</view>
			</view>
		</bottomDrawer>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,PropSync,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import Upload from "@/tools/upload"
	import { app } from "@/app";
	import { maxAdHour, stateMap } from "../constants/constants";
	@Component({})
	export default class ClassName extends BaseComponent {
		@PropSync("show",{
			type:Boolean
		}) showSync!: Boolean;
		@Prop({default:''})
		goodCode?:string

		maxAdHour = maxAdHour;
		stateMap = stateMap;
		isPullDown = app.platform.isPullDown;
		adCardList:any=[];
		adData:any={};
		uploadImg="";
		buttonConfig:any = {
			[stateMap.notStart]:{
				text : "",
				clickHandler : this.onClickConfirmUse
			},
			[stateMap.waitUpload]:{
				text : "上传图片审核",
				clickHandler : this.onClickUploadPic
			},
			[stateMap.waitReview]:{
				text : "广告内容审核中",
				clickHandler : ()=>{}
			},
			[stateMap.inEffect]:{
				text : "",
				clickHandler : this.onClickConfirmUse
			}
		}
		@Watch('show')
		onChangeShow(val:boolean){
			if(val){
				this.uploadImg="";
				this.getList()
			}
		}
		public get notStart() : boolean {
			return this.adData.state==stateMap.notStart
		}
		public get waitUpload() : boolean {
			return this.adData.state==stateMap.waitUpload
		}
		public get inEffect() : boolean {
			return this.adData.state==stateMap.inEffect
		}
		public get adFull() : boolean {
			return this.adData.now_num>=this.adData.limit_num;
		}
		
		public get usableAdCardList() : string {
			return this.adCardList.filter((item:any)=>item.remaining_quantity>0)
		}
		
		public get waitUploadOrReview() : boolean {
			return [stateMap.waitUpload,stateMap.waitReview].includes(this.adData.state)
		}
		public get hasUsableCard() : boolean {
			return this.adCardList.length>0 && this.adCardList.some((item:any)=>item.remaining_quantity>0)
		}
		public get selectedHour() : number {
			return this.adCardList.reduce((total:number,item:any) => total+(item.num*item.hour) , 0)
		}
		public get useHour() : number {
			const hour = this.adData.totalHour + this.selectedHour;
			return hour
		}
		public get buttonData():{[x:string]:any} {
			const { state } = this.adData;
			const { notStart, waitUpload, waitReview, inEffect } = stateMap;
			if(this.notStart){
				this.buttonConfig[notStart].text = this.adFull? "广告位已满" : `确认使用（可申请广告位${this.adData.now_num}/${this.adData.limit_num}）`
			}
			if(this.inEffect){
				this.buttonConfig[inEffect].text = `续费时长（${this.useHour}/${this.maxAdHour}h)`
			}
			return {
				class: {
					'drawer-bottom-btn': true,
					'btn-disabled': state===waitReview || (state===notStart&&this.adFull),
					'upload-btn': state===waitUpload
				},
				...this.buttonConfig[state]
			};
		}
		async addImage() {
			app.platform.hasLoginToken( async ()=>{
				const pic:any = await Upload.getInstance().uploadSocialImgs(1, "illustration", ["album"]);
				this.uploadImg = pic[0];
			})
		}
		countDown(endTime:number){
			return (endTime-Math.round(+new Date().getTime() / 1000))*1000
		}
		redirectToMall(){
			uni.redirectTo({url:"/pages/merchant/mall/index"});
		}
		onClickReduceNum(item:any){
			if(item.num<=0) return;
			item.num--;
		}
		onClickAddNum(item:any){
			if(item.num>=item.remaining_quantity) return;
			item.num++;
		}
		onClickConfirmUse(){
			if(this.selectedHour==0 || (this.adFull&&!this.inEffect)) return;
			if(this.inEffect && this.useHour > maxAdHour){
				uni.showToast({title:"超出可续费时间,请重新确认",icon:"none"})
				return;
			}
			app.platform.UIClickFeedBack(); 
			uni.showModal({
				title: '提示',
				content: `是否确认${this.inEffect?"续费":"申请"}广告位`,
				success:  (res)=> {
					if (res.confirm) {
						const params = {
							goodCode:this.goodCode??null,
							list:this.adCardList.map((x:any)=>{
								return {count:Number(x.num),hour:x.hour}
							})
						}
						app.http.Post("merchant/me/adCard/use",params,(res:any)=>{
							this.getList()
						})
					}
				}
			});
		}
		onClickUploadPic(){
			if(!this.uploadImg) return;
			app.platform.UIClickFeedBack();
			app.http.Post(`merchant/me/adCard/upload/cover/${this.adData.adLogId}`,{cover:this.uploadImg},(res:any)=>{
				uni.showToast({title:"提交成功，请等待审核",icon:"none"})
				this.getList()
			})
		}
		onFinish(){
			this.getList()
			this.uploadImg="";
		}
		getList(){
			app.http.Get('merchant/me/adCard/list',{goodCode:this.goodCode},({list,...rest}:any)=>{
				this.adData = rest;
				this.adCardList = list.map( (x:any) => ({...x,num:0}) )
			})
		}
	}
</script>

<style lang="scss">
	.good-act-content{
		width: 710rpx;
		border-radius: 3rpx;
		background:#fff;
	}
	.drawer-header{
		width: 100%;
		height:60rpx;
		background:#F5F5F5;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding:0 20rpx;
	}
	.drawer-header-name{
		font-size: 23rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #959695;
	}
	.drawer-bottom{
		width: 100%;
		position: absolute;
		background:#fff;
		left:0;
		bottom:0;
		height: calc(200rpx);
		height: calc(200rpx + constant(safe-area-inset-bottom));
		height: calc(200rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;
		.drawer-bottom-rank{
			width: 100%;
			height:80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color:#959695;
			font-size: 23rpx;
			text{
				color:#FA1545
			}
		}
		.drawer-bottom-btn{
			width: 702rpx;
			height: 92rpx;
			background: #FA1545;
			border-radius: 5rpx;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			text-align: center;
			line-height: 92rpx;
			margin:0 auto;
		}
		.upload-btn{
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.good-act-content .upload-btn /deep/ .u-count-down__text{
		font-size: 33rpx !important;
		font-family: PingFang SC;
		font-weight: 600 !important;
		color: #FFFFFF !important;
		margin-left: 10rpx;
	}
	.good-act-content .drawer-bottom-rank /deep/ .u-count-down__text{
		font-size: 23rpx !important;
		color:#FA1545 !important
	}
	.drawer-center-list{
		width: 100%;
		box-sizing: border-box;
		padding:32rpx 24rpx 0 24rpx;		
		padding-bottom: calc(280rpx);
		padding-bottom: calc(280rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(280rpx + env(safe-area-inset-bottom));
		display: flex;
		flex-wrap: wrap;
	}
	.drawer-center-item{
		width: 216rpx;
		height:286rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
		margin-right:30rpx;
		.drawer-item-box{
			width: 216rpx;
			height:216rpx;
			box-sizing: border-box;
			border: 1rpx solid #959695;
			border-radius: 3rpx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.drawer-item-num{
			width: 100%;
			text-align: center;
			font-size: 63rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}
		.drawer-item-time{
			width: 100%;
			text-align: center;
			font-size: 23rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #959695;
		}
		.drawer-item-surplus{
			width: 93rpx;
			height: 38rpx;
			background: #FA1545;
			border-radius: 3rpx;
			position: absolute;
			left:0;
			top:0;
			text-align: center;
			line-height: 38rpx;
			font-size: 23rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
		.drawer-item-inuse{
			width: 100%;
			height: 38rpx;
			background: #FCECEE;
			border-radius: 0rpx 0rpx 3rpx 3rpx;
			position: absolute;
			bottom:0;
			left:0;
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FA1545;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.good-act-content .drawer-item-inuse /deep/ .u-count-down__text{
		font-size: 20rpx !important;
		font-family: PingFang SC;
		font-weight: 400 !important;
		color: #FA1545 !important;
		margin-left: 10rpx;
	}
	.drawer-center-item:nth-child(3n){
		margin-right: 0rpx;
	}
	.drawer-item-operate{
		width: 100%;
		height:70rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.drawer-item-input{
		width: 76rpx;
		height: 40rpx;
		background: #F5F5F5;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #333333;
		text-align: center;
	}
	.operate-btn{
		width: 60rpx;
		height:40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-reduce{
		width: 21rpx;
		height:5rpx;
	}
	.icon-add{
		width: 21rpx;
		height:21rpx;
	}
	.btn-disabled{
		background:#c4c6c9 !important
	}
	.up-box{
		width: 181rpx;
		height:260rpx;
		border: 0.8px dashed #c4c6c9;
		border-radius: 3rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}
	.ad-image-box{
		width: 181rpx;
		height:260rpx;
		position: relative;
	}
	.up-pic-del{
		width: 50rpx;
		height:50rpx;
		position: absolute;
		right:-10rpx;
		top:-10rpx;
		background: url(@/static/illustration/icon_close.png) no-repeat center / 100% 100%;
	}
	.icon-upload{
		width: 100rpx;
		height:100rpx;
		background: url(@/static/illustration/icon_upload.png) no-repeat center / 100% 100%;
		margin:0 auto;
	}
</style>
