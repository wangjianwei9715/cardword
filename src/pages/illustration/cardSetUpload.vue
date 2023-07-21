<template>
	<view class="content" v-show="noData.show">
		<view class="header-box">
			<statusbar/>
			<view class="header">
				<view class="icon-close" @click="onClickClose()"></view>
				<view v-show="noData.illustration" @click="onClickReport" class="header-right">
					<view class="icon-error"></view>
					<view class="error-text">报错有奖</view>
				</view>
			</view>
		</view>
		<view class="center">
			<statusbar/>
			<view class="upload-box">	
				<view class="upload-header">
					<view class="icon-left" @click="$u.throttle(onClickUp,1000)"></view>
					<view class="header-num">{{numData.now}}/{{numData.all}}</view>
					<view class="icon-right" @click="$u.throttle(onClickNext,1000)"></view>
				</view>
				<illUpload :reward="noData.text.point" :illustration="noData.illustration" :frontPic.sync="frontPic" :backPic.sync="backPic" :uploadable="hasUpload" @up="onClickUp" @next="onClickNext"/>
				<view class="upload-card-info">
					<view class="card-title">{{noData.text.player}}</view>
					<view class="card-set u-line-2">{{noData.text.seq==0?"无限":noData.text.seq}}编，{{noData.text.cardSet}}</view>
					<view class="card-seq">
						<image v-if="noData.text.cardSetLogo" class="logo-pic" :src="$parsePic(decodeURIComponent(noData.text.cardSetLogo))"/>
					</view>
					<muqian-lazyLoad v-if="noData.text.teamLogo" class="card-teamlogo" mode="aspectFit" :src="decodeURIComponent(noData.text.teamLogo)" />
				</view>
				<view v-if="noData.illustration && noData.illustration.author && noData.illustration.author.name" class="upload-author">
					由 <muqian-lazyLoad  class="upload-author-avatar" :src="decodeURIComponent(noData.illustration.author.avatar)" borderRadius="50%"/>
					<text class="upload-author-name">{{noData.illustration.author.name}}</text>提供
				</view>
			</view>
		</view>
		<view class="upload-right" v-if="noData.text && noData.text.peer.length">
			<statusbar/>
			<scroll-view class="up-scroll-box" :scroll-y="true">
				<view class="up-scroll-index" :class="{'current-scroll':(index+1)==noData.text.seqIndex,'haspic':item>0}" v-for="(item,index) in binaryPeer" :key='index' @click="onClickPeerTo(index)">
					{{index+1}}{{(index+1)==noData.text.seqIndex?`/${noData.text.seq}`:''}}
				</view>
			</scroll-view>
		</view>
		<view v-show="!noData.illustration" class="up-btn" :class="{'up-ok':frontPic}" @click="onClickUpload">{{ hasUpload ?"补充图鉴":"请等待审核"}}</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import illUpload from './components/illUpload.vue';
	import { Md5 } from "ts-md5";
	@Component({
		components:{illUpload}
	})
	export default class ClassName extends BaseNode {
		noCode="";
		noData={
			illustration:null,
			text:{
				"cardSet": "", 
				"player": "", 
				"point":0,
				"team": "",
				"cardSetLogo": "", //卡种标识图片
				"seq": 0, //限编
				"seqIndex": 0, //第几编
				"number":0,//编号
				"peer": [] //1编到seq 每个编号图鉴的上传情况  0 未上传 1 部分上传 2 全部上传
			},
			uploadable:true,
			show:false
		};
		numData = {
			now:0,
			all:0
		}
		frontPic = "";
		backPic = "";
		cardList:any = [];
		httpParams:any = {};
		listParams:any = {};
		onLoad(query: any) {
			this.noCode = query.noCode;
			this.numData = {
				now:Number(query.nowIndex),
				all:Number(query.indexAll)
			};
			this.cardList = JSON.parse(query.cardList);
			this.httpParams = JSON.parse(query.httpParams);
			this.listParams = JSON.parse(query.params);
			this.getNoDetail()
		}
		initEvent(){
		}
		public get hasUpload() : boolean {
			return this.noData.uploadable || app.token.accessToken == ''
		}
		public get binaryPeer() : number[] {
			const { peer, seq } = this.noData.text;
			const list = peer.map((item:any,index:number)=>{
				const length = Math.min(seq-(index*64),64);
				const binary = item.toString(2);
				return Array.from({length},(_,i)=>(Number(binary[binary.length-1-i])||0));
			}).flat();
			return list;
		}
		onClickClose(){
			app.navigateTo.navigateBack()
		}
		onClickReport(){
			app.platform.hasLoginToken(()=>{
				const { text } = this.noData;
				const peer = text.peer.length>0? text.seqIndex : 0;
				uni.navigateTo({
					url:`/pages/illustration/report/error?code=${this.noCode}&point=${text.point}&peer=${peer}`
				})
			})
		}
		getNoDetail(){
			app.http.Get(`dataApi/cardIllustration/no/detail/rich/${this.noCode}`,{},(res:any)=>{
				this.noData = {
					illustration:res.illustration,
					text:res.text,
					uploadable:res.uploadable,
					show:true
				}
			})
		}
		onClickPeerTo(index:number){
			if(index===this.noData.text.seqIndex-1) return;
			this.clearPic()
			app.http.Get(`dataApi/cardIllustration/no/detail/rich/${this.noCode}/peer/to/${index+1}`,{},(res:any)=>{
				this.noCode = res.text.code;
				this.noData = {
					illustration:res.illustration,
					text:res.text,
					uploadable:res.uploadable,
					show:true
				}
			})
		}
		clearPic(){
			this.frontPic = "";
			this.backPic = "";
		}
		onClickUp(){
			if(this.numData.now<=1) return;
			this.numData.now--;
			this.getNewDetail()
		}
		onClickNext(){
			if(this.numData.now>=this.numData.all) return;
			if(this.numData.now>=this.cardList.length && this.numData.now<this.numData.all){
				uni.showLoading({
					title: '加载中'
				});
				this.getDetail(()=>{
					this.numData.now ++;
					this.getNewDetail()
				})
				return;
			}
			this.numData.now ++;
			this.getNewDetail()
		}
		getNewDetail(){
			this.frontPic = "";
			this.backPic = "";
			this.noCode = this.cardList[this.numData.now-1];
			this.getNoDetail()
		}
		getDetail(cb?:Function){
			const { scrollId, st } = this.httpParams;
			const ts = Math.floor(new Date().getTime()/1000);
			const _url = scrollId ? `scrollId=${scrollId}&st=${st}&pageSize=10` :`ts=${ts}&noSplit=1`;
            const sn = Md5.hashStr(`${scrollId?st:ts}_${scrollId?`${scrollId}_`:''}scrollSearchTujian`);
			app.http.Post(`${this.httpParams.url}?${_url}&sn=${sn}`,this.listParams,(res:any)=>{
				if(res.list){
					this.cardList = [...this.cardList,...res.list.map((x:any)=>x.code)];
				}
				this.httpParams.scrollId = res.scrollId;
				this.httpParams.st = ts;
				uni.hideLoading();
				cb?.()
			},(error:any)=>{
				this.httpParams.scrollId="";
				this.httpParams.st=0;
				this.cardList = []
				this.getDetail()
			})
		}
		onClickUpload(){
			if(!this.frontPic || !this.hasUpload) return;
			uni.showModal({
                content: '确认上传图鉴?',
                success: (res: any) => {
					if(res.confirm){
						const { seqIndex } = this.noData.text;
						const peer = seqIndex>0 ? `/peer/to/${seqIndex}` : '';
						app.http.Post(`cardIllustration/pictorial/upload/${this.noCode}${peer}/authorize`,{},(res:any)=>{
							if(res.token){
								const params = {
									token:res.token,
									frontPic:decodeURIComponent(this.frontPic),
									backPic:decodeURIComponent(this.backPic)||""
								}
								app.http.Post(`cardIllustration/pictorial/upload/${this.noCode}${peer}`,params,(res:any)=>{
									uni.showToast({
										title:'提交成功,请等待审核',
										icon:'none'
									});
									this.clearPic();
									setTimeout(() => {
										this.getNoDetail();
									}, 500);
								})
							}
						})
					}
                }
            })
		}
	}
</script>

<style lang="scss">
	page{
        background:#000000;
    }
	.content{
		width: 100%;
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
		height: 221rpx;
		background: rgba(39, 39, 39, 1);
		border: 0.8px solid #848484;
		border-radius: 3rpx;
		margin:0 auto;
		margin-top: 51rpx;
		position: relative;
		box-sizing: border-box;
		padding:30rpx 40rpx 27rpx 40rpx;
		position: relative;
		overflow: hidden;
		.card-title{
			width: 100%;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
		}
		.card-set{
			width: 100%;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			margin-top: 15rpx;
			height:70rpx;
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
		.logo-pic{
			width: 74rpx;
			height: 31rpx;
			border-radius: 1rpx;
		}
		.logo-seq-1{
			background: #000000;
			color: #FFFFFF;
		}
		.logo-seq-10{
			background: #BFBF3D;
			color: #FFFF54;
		}
		.card-teamlogo{
			width: 300rpx;
			height:300rpx;
			position: absolute;
			bottom:-100rpx;
			right:-100rpx;
			opacity: 0.2;
		}
	}
	.upload-author{
		width: 538rpx;
		height:31rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 19rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		margin:0 auto;
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
</style>
