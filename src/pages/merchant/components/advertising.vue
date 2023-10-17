<template>
	<view class="good-act-content" >
		<bottomDrawer :showDrawer="show" title="广告推广" @closeDrawer="showSync=false;isPullDown(true)" :needSafeArea="true" padding="0rpx 0rpx">
			<view class="drawer-header">
				<view class="drawer-header-name">使用后在售期间可投放广告页至首页（单商品最高累计可投放{{maxAdHour}}小时）</view>
			</view>
			<view class="drawer-center-list" v-show="adData.state!=1 && adData.state!=2">
				<view class="drawer-center-item" v-for="(item,index) in adCardList" :key="index">
					<view class="drawer-item-box">
						<view class="drawer-item-surplus">剩{{item.remaining_quantity}}次</view>
						<view>
							<view class="drawer-item-num">广告位</view>
							<view class="drawer-item-time">{{item.hour}}小时</view>
						</view>
						<view class="drawer-item-inuse" v-if="item.state==2">
							生效中
							<u-count-down :time="countDown(item.end_time)" format="HH:mm:ss" @finish="onFinish"></u-count-down>
						</view>
					</view>
					<view class="drawer-item-operate">
						<view class="operate-btn" @click="onClickReduceNum(item)"><image class="icon-reduce" src="@/static/merchant/icon_reduce.png" /></view>
						<input type="number" class="drawer-item-input" disabled v-model.number="item.num" @blur="onChangeNumber"/>
						<view class="operate-btn" @click="onClickAddNum(item)"><image  class="icon-add" src="@/static/merchant/icon_add.png" /></view>
					</view>
				</view>
			</view>
			<view class="drawer-center-list" v-show="[1,2].includes(adData.state)">
				<view v-if="!uploadImg" class="up-box" @click="addImage()">
					<view class="up-center">
						<view class="icon-upload"></view>
					</view>
				</view>
				<view v-else class="ad-image-box">
					<muqian-lazyLoad  class="ad-image-box" mode="aspectFit" :src="decodeURIComponent(uploadImg)" borderRadius="3rpx" preview/>
					<view v-show="adData.state==1" class="up-pic-del" @click="uploadImg=''"></view>
				</view>
			</view>
			<view class="drawer-bottom" v-if="hasCard">
				<view class="drawer-bottom-rank">
					已选{{selectedNum}}张,广告图审核通过后开始计时，<text>在售期间/倒计时结束前</text>有效
				</view>
				<view v-if="adData.state==0" class="drawer-bottom-btn" :class="{'btn-disabled':adFull}" @click="onClickConfirmUse">{{adFull?'广告位已满':`确认使用（可申请广告位${adData.now_num}/${adData.limit_num}）`}}</view>
				<view v-else-if="adData.state==1" class="drawer-bottom-btn upload-btn" @click="onClickUploadPic">
					上传图片审核 <u-count-down :time="60*1000" format="mm:ss" @finish="onFinish"></u-count-down>
				</view>
				<view v-else-if="adData.state==2" class="drawer-bottom-btn btn-disabled">广告内容审核中</view>
				<view v-else-if="adData.state==3" class="drawer-bottom-btn btn-disabled" @click="onClickConfirmUse(true)">续费时长（{{useHour}}/{{maxAdHour}}h)</view>
			</view>
			<view class="drawer-bottom" v-else>
				<view class="drawer-bottom-rank">暂无广告卡可用</view>
				<view class="drawer-bottom-btn" @click="redirectToMall">去积分中心兑换</view>
			</view>
		</bottomDrawer>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,PropSync,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import Upload from "@/tools/upload"
	import { app } from "@/app";
	import { maxAdHour } from "../constants/constants"
	@Component({})
	export default class ClassName extends BaseComponent {
		@PropSync("show",{
			type:Boolean
		}) showSync!: Boolean;
		@Prop({default:''})
		goodCode?:string

		maxAdHour = maxAdHour;
		isPullDown = app.platform.isPullDown;
		adCardList:any=[];
		adData:any={};
		uploadImg="";
		
		@Watch('show')
		onChangeShow(val:boolean){
			if(val){
				this.getList()
			}
		}
		public get adFull() : boolean {
			return false
		}
		public get hasCard() : boolean {
			return this.adCardList.length>0
		}
		public get selectedNum() : number {
			return this.adCardList.reduce((total:number,item:any) => total+item.num , 0)
		}
		public get useHour() : number {
			const selectHour = this.adCardList.reduce((total:number,item:any) => total+item.hour , 0);
			const hour = this.adData.totalHour + selectHour;
			return hour
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
		onClickConfirmUse(renew=false){
			if(this.selectedNum==0 || this.adFull) return;
			if(renew && this.useHour > maxAdHour){
				uni.showToast({title:"超出可续费时间,请重新确认",icon:"none"})
				return;
			}
			app.platform.UIClickFeedBack(); 
			uni.showModal({
				title: '提示',
				content: `是否确认${renew?"续费":"申请"}广告位`,
				success:  (res)=> {
					if (res.confirm) {
						const params = {
							goodCode:this.goodCode??null,
							list:this.adCardList.map((x:any)=>{
								return {count:Number(x.num),hour:x.hour}
							})
						}
						app.http.Post("merchant/me/adCardList/use",params,(res:any)=>{
							this.getList()
						})
					}
				}
			});
		}
		onClickUploadPic(){
			if(!this.uploadImg) return;
			app.platform.UIClickFeedBack();
			app.http.Post(`merchant/me/adCardList/upload/cover/${this.adData.adLogId}`,{cover:this.uploadImg},(res:any)=>{
				uni.showToast({title:"提交成功，请等待审核",icon:"none"})
				this.adData.state=2
			})
		}
		onFinish(){
			this.adData.state=0
			this.uploadImg="";
		}
		getList(){
			app.http.Get('merchant/me/adCardList/list',{goodCode:this.goodCode},({list,...rest}:any)=>{
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
