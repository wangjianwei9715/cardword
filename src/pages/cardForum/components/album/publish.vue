<!--
 * @FilePath: \jichao_app_2\src\pages\cardForum\components\album\publish.vue
 * @Author: wjw
 * @Date: 2023-06-29 18:47:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-19 17:27:34
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="album-box">
		<view class="tips">请完善卡册内容，评选为优质卡册将获得更多曝光</view>
		<view class="code-box">
			<scroll-view class="scroll" :scroll-x="true">
				<view class="cover-box" @click="changeCover()">
					<view class="tip">封面</view>
					<muqian-lazyLoad class="pic" mode="aspectFit" :src="decodeURIComponent(coverPic)" />
				</view>
				<muqian-lazyLoad v-for="(item,index) in hasPicList" :key="index" class="pic" mode="aspectFit" :src="decodeURIComponent(item.frontPic)" />
				<view class="upload" @click="onClickGoPicUpload" v-show="(code||draftId)&&hasPicList.length<=2">
					<view class="icon-add"></view>
					<view class="upload-content">添加图片</view>
				</view>
			</scroll-view>
			<view class="edit-box" v-show="(code||draftId)&&hasPicList.length>2" @click="onClickGoPicUpload">修改图片</view>
		</view>
		<view class="percent">当前收集进度：{{percentMsg}}</view>
		<view class="prove">
			<muqian-lazyLoad v-if="provePic" @click="changeProve()" class="pic" mode="aspectFit" :src="decodeURIComponent(provePic)" />
			<view class="upload" v-else @click="changeProve()">
				<view class="icon-add"></view>
				<view class="upload-content">上传证明</view>
			</view>
			<view class="msg">*卡册为玩家玩家打造优质的个人收藏展示，请上传相关证明图片（如卡世界id与卡片共同拍摄、手持卡片等）</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Watch,PropSync} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import Upload from "@/tools/upload";
	import { app } from "@/app";
	import { formatterNolist } from "../../func";
	const MaxNos = 200;
	class ListParams {
		tp=0;
		fetchFrom=1;
		fetchSize=MaxNos;
		isFetchEnd=false;
	}
	@Component({})
	export default class ClassName extends BaseComponent {
		@PropSync("albumList",{type:Array})
		list!:any[]
		@PropSync("albumCover",{type:String})
		coverPic?:string
		@PropSync("albumProve",{type:String})
		provePic?:string
		@Prop({default:''})
		draftId?:any
		identify = "";
		restParams:any = {};
		originalList:any = [];
		intervalQuery:any = "";
		code = "";
		listParams = new ListParams();
		revision = "";
		uploadData:any = {}
		mounted(){
			this.identify=uni.$u.guid(8);
			if(this.draftId=='' && this.code==''){
				this.coverPic = this.hasPicList.length ? this.hasPicList[0].frontPic : "";
			}
		}
		public get noNum() : number {
			return this.list.length
		}
		public get picNum() : number {
			const backPicLength = this.list.filter( x => x.backPic ).length;
			return (backPicLength+this.hasPicList.length)
		}
		public get hasPicList() : any[] {
			return this.list.filter( x => x.frontPic );
		}
		public get percentMsg() : string {
			const have = this.hasPicList.length;
			return `${((have/this.noNum)*100).toFixed(2)}%（${have}/${this.noNum})`
		}
		public get isEdit() : boolean {
			return this.code!=""
		}
		async addImage() {
			const picList:any = await Upload.getInstance().uploadSocialImgs(1, "prove", ["album"]);
			return decodeURIComponent(picList[0])
		}
		async changeCover(){
			this.coverPic = await this.addImage();
		}
		async changeProve(){
			this.provePic = await this.addImage()
		}
		editUrl(revision=true):string{
			return this.isEdit ? `edit/${this.code}${revision?'/'+this.revision:''}` : 'publish';
		}
		formatterSplitedNumbers(list:any){
			const Series:any = {}
			list.forEach((x:any)=>{
				if(!Series.hasOwnProperty(x.code)){
					Series[x.code] = {code:x.code,list:[]}
				}
				if(x.frontPic){
					Series[x.code].list.push({seqIndex:x.seqIndex,frontPic:x.frontPic,backPic:x.backPic})
				}
			});
			return Array.from(Object.values(Series),x=>x);
		}
		uploadCodeList(uploadToken:string,nowNum: number): any {
			return new Promise((resolve, reject) => {
				try {
					let uploadNum = Math.min(200,this.list.length-(nowNum*200));
					const { uploadData } = this;
					const codes = uploadData.codes.splice(0,uploadNum);
					uploadNum -= codes.length;
					const nos = uploadData.nos.splice(0,uploadNum);
					uploadNum -= nos.length;
					let splitedNumbers:any = []
					uploadData.splitedNumbers.filter((x:any)=>{
						if(uploadNum>0 && !x.upload){
							const list = x.list.splice(0,uploadNum);
							if(x.list.length==0) x.upload = true;
							uploadNum -= list.length;
							splitedNumbers.push({code:x.code,list})
						}
					})
					resolve({ uploadToken, codes, nos, splitedNumbers })
				} catch (error) {
					this.revokePublish()
					reject()
				}
			});
		}
		onClickGoPicUpload(){
			uni.navigateTo({
				url:`/pages/illustration/album/picUpload?editCodeList=${encodeURIComponent(JSON.stringify(this.list))}&draftId=${this.draftId}`
			})
		}
		prepareEdit(code:string){
			this.code = code;
			this.getAlbumDetail();
			this.getAlbumList()
		}
		getAlbumDetail(){
			app.http.Get(`cardIllustration/album/edit/detail/${this.code}`,{},({data}:any)=>{
				this.coverPic = data.cover;
				this.provePic = data.provePic;
				this.$emit("albumEditDetail",data);
			})
		}
		getAlbumList(){
			if(this.listParams.isFetchEnd) return;
			app.http.Get(`cardIllustration/album/edit/detail/${this.code}/nolist`,this.listParams,(res:any)=>{
				const addList = formatterNolist(res.list||[],res.dic);
				this.list = [...this.list,...addList];
				this.originalList = [...this.originalList,...addList];
				this.listParams.fetchFrom += this.listParams.fetchSize;
				this.listParams.isFetchEnd = res.isFetchEnd;
				this.getAlbumList()
			})
		}
		publish({content,cover,url,title,...rest}:any){
			if(this.coverPic==""){
				uni.showToast({title:"请上传封面图片",icon:'none'});
				this.submitUnLock()
				return;
			}
			if(this.provePic=="" || !title){
				uni.showToast({title:`${!title?"请输入标题":"请上传证明图片"}`,icon:'none'});
				this.submitUnLock()
				return;
			}
			const params = {
				identify:this.identify,
				title,
				cover:this.coverPic,
				provePic:this.provePic,
				description:encodeURIComponent(content),
				picNum:this.picNum,
				noNum:this.noNum,
			}
			this.restParams = rest;
			
			app.http.Post(`cardIllustration/album/${this.editUrl(false)}/prepare`,params,(res:any)=>{
				if(this.isEdit) this.revision = res.revision;
				this.preparePublis(res.uploadToken)
			},(error:any)=>{
				this.revokePublish(error)
			})
		}
		preparePublis(uploadToken:string){
			if(this.isEdit && JSON.stringify(this.list)==JSON.stringify(this.originalList)){
				// 如果编辑没有改变编号列表 直接complete
				this.publicComplete(uploadToken);
				return;
			}
			const codes = this.list.filter( x => !x.split && x.frontPic=="" ).map( x => x.code);
			const nos = this.list.filter( x => !x.split && x.frontPic ).map( 
				x => ({code:x.code,seqIndex:x.seqIndex,frontPic:x.frontPic,backPic:x.backPic}) 
			);
			const splitedNumbers = this.formatterSplitedNumbers(this.list.filter( x => x.split));
			this.uploadData = { codes,nos,splitedNumbers };
			const PostLength = Math.ceil(this.noNum/MaxNos);
			this.publishUpload(uploadToken,PostLength,0);
		}
		async publishUpload(uploadToken:string,PostLength:number,nowNum:number){
			const params = await this.uploadCodeList(uploadToken,nowNum);

			app.http.Post(`cardIllustration/album/${this.editUrl()}/upload`,params,(res:any)=>{
				if(nowNum+1>=PostLength){
					this.publicComplete(uploadToken)
				}else{
					this.publishUpload(uploadToken,PostLength,nowNum+1);
				}
			},(error:any)=>{
				this.revokePublish(error)
			})
		}
		publicComplete(uploadToken:string){
			const params = {
				uploadToken,
				identify:this.identify,
				...this.restParams
			}
			app.http.Post(`cardIllustration/album/${this.editUrl()}/complete`,params,(res:any)=>{
				this.setIntervalQuery()
			},(error:any)=>{
				this.revokePublish(error)
			})
		}
		setIntervalQuery(){
			this.publicQuery();
			this.intervalQuery = setInterval(()=>{
				this.publicQuery()
			},5000)
		}
		publicQuery(){
			app.http.Post(`cardIllustration/album/${this.editUrl()}/query`,{identify:this.identify},(res:any)=>{
				if(res.state==0){
					uni.showLoading({ title: `上传中：${res.percent}%` });
				}else{
					uni.hideLoading();
					clearInterval(this.intervalQuery);
					if(res.state==1){
						if (this.draftId) this.$emit('delDraft')
						uni.showToast({title:"上传成功",icon:"none"});
						uni.switchTab({ url: '/pages/index/userinfo_v3' });
					}else{
						uni.showToast({ title:res.failure,icon:"none" });
						this.submitUnLock()
						this.identify = uni.$u.guid(8);
					}
				}
			},(error:any)=>{
				uni.hideLoading();
				clearInterval(this.intervalQuery);
			})
		}
		submitUnLock(){
			this.$emit('unLock')
		}
		revokePublish(error=''){
			this.identify = uni.$u.guid(8);
			uni.showToast({ title:`${error||'发布失败，请重新发布'}`,icon:"none" });
			this.submitUnLock()
			// const url = this.code ? `${this.code}/${this.revision}` : "publish";
			// app.http.Post(`cardIllustration/album/${url}/revoke`,{identify:this.identify},(res:any)=>{})
		}
	}
</script>

<style lang="scss">
.album-box{
	width: 100%;
	margin-bottom: 42rpx;
	.tips{
		width: 750rpx;
		margin-left: -20rpx;
		height:62rpx;
		background: #272727;
		font-size: 23rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #C0C0C0;
		padding:0 20rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		margin-left: -29rpx;
	}
	.code-box{
		width: 100%;
		height:162rpx;
		position: relative;
	}
	.scroll{
		width: 100%;
		height: 162rpx;
		white-space: nowrap;
		
	}
	.cover-box{
		width: 162rpx;
		height: 162rpx;
		border-radius: 3rpx;
		position: relative;
		display: inline-flex;
		margin-right: 14rpx;
		.tip{
			width: 60rpx;
			height: 32rpx;
			background: #FA1545;
			border-radius: 3rpx;
			position: absolute;
			left:0;
			top:0;
			z-index: 2;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
			line-height: 32rpx;
		}
		.pic{
			margin-right: 0 !important;
		}
	}
	.edit-box{
		width: 100rpx;
		height: 100rpx;
		border-radius: 3rpx;
		position: relative;
		display: inline-flex;
		position: absolute;
		right:14rpx;
		top:50%;
		margin-top: -50rpx;
		background:#000;
		color:#fff;
		font-size: 21rpx;
		font-family: PingFang SC;
		font-weight: 400;
		border: 2rpx dashed rgba(230, 230, 230, 0.6);
		align-items: center;
		justify-content: center;
	}
	.pic{
		width: 162rpx;
		height: 162rpx;
		border-radius: 3rpx;
		margin-right: 9rpx;
		display: inline-flex;
	}
	.percent{
		width: 100%;
		height:86rpx;
		font-size: 21rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #959695;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #3F3F3F;
	}
	.prove{
		width: 100%;
		border-bottom: 1px solid #3F3F3F;
		box-sizing: border-box;
		padding: 30rpx 0;
		.msg{
			font-size: 19rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #707070;
			margin-top: 23rpx;
		}
	}
	.upload{
		width: 162rpx;
		height: 162rpx;
		background: #1E1E1E;
		border-radius: 3rpx;
		position: relative;
		display: inline-block;
		.icon-add{
			width: 43rpx;
			height:43rpx;
			background: url(@/static/cardForum/addImage_gray.png) no-repeat center /100% 100%;
			position: absolute;
			left:50%;
			margin-left:-21.5rpx;
			top:44rpx;
		}
		.upload-content{
			width: 100%;
			text-align: center;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #3E3E3E;
			position: absolute;
			bottom: 43rpx;
			left:0
		}
	}
}
</style>
