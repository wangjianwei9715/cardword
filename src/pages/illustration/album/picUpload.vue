<!--
 * @FilePath: \jichao_app_2\src\pages\illustration\album\picUpload.vue
 * @Author: wjw
 * @Date: 2023-06-26 19:47:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-09-14 10:21:27
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="album-card-content">
		<navigationbar title="编辑卡片" :customBack="true" backgroundColor="#000" backColor="#fff" borderBottom="none" :custom="true" :showBack="!startDelete" @back="sheetShow=true">
			<template slot="right">
				<view v-show="!startDelete" class="segment" @click="segmentCheck=!segmentCheck">
					<view class="check" :class="{'check_':segmentCheck}"></view>
					自动抠图
				</view>
				<view v-show="startDelete" class="icon-close" @click="onClickDelClose">
					&#xe460;
				</view>
			</template>
		</navigationbar>
		<view class="list" v-for="(item,index) in selectSeries" :key="index">
			<view class="tips">{{item.name}}</view>
			<view class="box-content">
				<view class="card-box" v-for="(noItem,noIndex) in item.noList" :key="noIndex">
					<view class="pic-box">
						<!-- && (noItem.split?noItem.seqIndex==1:true) -->
						<view v-show="startDelete" class="icon-check" :class="{'icon-check_':delSelectNo(noItem.code)}" @click="onClickDelSelect(noItem)"></view>
						<view class="pic-index" v-if="noItem.frontPic">
							<muqian-lazyLoad class="pic" :thumbnailWidth="400" :src="noItem.frontPic" mode="aspectFit" :preview="!startDelete"/>
							<view v-show="!startDelete" class="pic-close" @click="noItem.frontPic=''"></view>
						</view>
						<view class="upload-box" v-else @click="onClickAddImg(index,noIndex,'front')">
							<image v-show="!startDelete" class="icon-add" src="@/static/illustration/album/add.png"/>
							<view v-show="!startDelete" class="upload-msg">上传正面</view>
						</view>

						<view class="pic-index back-pic-box" v-if="noItem.backPic">
							<muqian-lazyLoad class="pic back-pic" :thumbnailWidth="400" :src="noItem.backPic" mode="aspectFit" :preview="!startDelete"/>
							<view v-show="!startDelete" class="pic-close" @click="noItem.backPic=''"></view>
						</view>
						<view class="upload-box back-pic-box back-box" v-else @click="onClickAddImg(index,noIndex,'back')">
							<image v-show="!startDelete" class="icon-add" src="@/static/illustration/album/add.png"/>
							<view v-show="!startDelete" class="upload-msg">上传反面</view>
						</view>
					</view>
					<view class="player u-line-1">
						{{noItem.split?noItem.seqIndex+"/":""}}{{noItem.seq}}编 {{noItem.player}}
					</view>
					<view class="cardset u-line-2">{{noItem.cardSet}}</view>
				</view>
			</view>
		</view>
		<albumBottom ref="albumBtn" :canNext="uploadTotal>0" :saveData="formData" :draftId="draftId" :selectSeries.sync="selectSeries" :percent="`${uploadTotal}/${listTotal}`" :step="2" :delList="deleteData.select" :showDelete.sync="deleteData.show" @next="onClickNext()" @allSelect="onClickAllSelect" @delSave="onClickDelSave"/>
		<albumActionSheet :show.sync="sheetShow" :listId="[2,3]" @select="onSheetSelect(2)" @save="onSheetSelect(3)"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import Upload from "@/tools/upload";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import albumBottom from '../components/albumBottom.vue'
	import albumActionSheet from '../components/albumActionSheet.vue'
	const MinNoLength = 2;
	class FormData {
		title = "";
		content= "";
		cover= "";
		url= [];
		topicId= [];
		goodCode= "";
		voteTitle= "";
		voteOptions= [];
		topicArr= [];
		state= 1;
		tp= 1;
		localVideo= true;
		albumCover = "";
		albumProve = "";
	}
	class DeleteData{
		show=false;
		select:string[]=[];
	}
	@Component({ components:{albumBottom,albumActionSheet} })
	export default class ClassName extends BaseNode {
		selectSeries:any = [];
		segmentCheck = false;
		edit = false;
		sheetShow = false;
		draftId = '';
		formData = new FormData();
		deleteData = new DeleteData();
		onLoad(query: any) {
			this.onEventUI("editNoSelect",(res:any)=>{
				this.selectSeries = res;
			})
			if(query.draftId){
				this.draftId = query.draftId;
			}
			if (query.draftList) {
				this.selectSeries = JSON.parse(query.draftList);
				this.formData = JSON.parse(query.formData);
			}
			if(query.selectSeries){
				this.selectSeries = JSON.parse(query.selectSeries)
			}
			if(query.editCodeList){
				this.edit = true;
				this.formatterCodeList(JSON.parse(query.editCodeList))
			}
			if(query.formData){
				this.formData = JSON.parse(query.formData)
			}
		}
		onBackPress(event:any){
			if(event.from=='backbutton'){
				this.sheetShow=true;
				return true
			}
			return
		}
		public get startDelete() : boolean {
			return this.deleteData.show
		}
		public get uploadTotal() : string {
			const total = this.selectSeries.reduce((total:number,x:any)=>{
				return total + x.noList.filter((item:any) => item.frontPic).length;
			},0)
			return total
		}
		public get listTotal() : number {
			const total = this.selectSeries.reduce((total:number, x:any) => total + x.noList.length, 0);
			return total
		}
		async onClickAddImg(index:number,noIndex:number,type:string){
			if(this.startDelete) return;
			const list:any =  await this.addImg(1);
			const path = await this.segment(list[0]);
			if(type=='front'){
				this.selectSeries[index].noList[noIndex].frontPic = path
			}else{
				this.selectSeries[index].noList[noIndex].backPic = path
			}
		}
		async addImg(length:number){
			const picList:any = await Upload.getInstance().uploadSocialImgs(length, "album/", ["album"]);
			return picList
		}
		async segment(pic:string){
			try {
				const decodePic = decodeURIComponent(pic);
				if(!this.segmentCheck) return decodePic;
				return await this.uploadSegment(decodePic);
			} catch (err) {
				uni.showToast({ title:err as string||"上传失败请重试", icon: 'none' })
			}
		}
		uploadSegment(decodePic:string){
			return new Promise((resolve, reject) => {
				uni.showLoading({ title: '自动抠图中...' });
				app.http.Post("cardIllustration/image/upload/segment",{pic:decodePic}, async (res:any)=>{
					uni.downloadFile({
						url: res.pic,
						success: async (res) => {
							if (res.statusCode === 200) {
								const picList:any = await Upload.getInstance().uploadTemporaryFile(res.tempFilePath,decodePic);
								resolve(decodeURIComponent(picList[0]))
							}
						}
					});
				},(error:any)=>{
					reject(error)
				})
			});
		}
		formatterCodeList(list:any[]){
			const Series:any = {}
			list.forEach((x:any,index:number)=>{
				if(index+1<list.length && list[index+1].code == x.code){
					x.split = true;
					list[index+1].split = true;
				}
				if(Series.hasOwnProperty(x.series.code)){
					Series[x.series.code].noList.push(x)
				}else{
					Series[x.series.code] = {seriesCode:x.series.code,name:x.series.name,noList:[x]}
				}
			});
			this.selectSeries = Array.from(Object.values(Series),x=>x);
		}
		onSheetSelect(id:number){
			if(id==2){
				app.navigateTo.goAlbumEdit(encodeURIComponent(JSON.stringify(this.selectSeries)),this.draftId)
			}if(id==3){
				this.$refs.albumBtn.onClickSave()
			}
		}
		onClickSelectNo(item:any){
			uni.navigateTo({
				url:`/pages/illustration/album/selectNo?seriesCode=${item.seriesCode}`
			})
		}
		onClickNext(){
			const albumList = this.selectSeries.flatMap(({ noList }:any) => noList);
			if(this.edit){
				uni.$emit("editAlbum",albumList);
				app.navigateTo.navigateBack()
			}else{
				uni.navigateTo({
					url:`/pages/cardForum/release?albumList=${encodeURIComponent(JSON.stringify(albumList))}&draftId=${this.draftId}&draftData=${encodeURIComponent(JSON.stringify(this.formData))}`
				})
			}
		}
		onClickDelSelect({code}:any){
			const findIndex = this.deleteData.select.findIndex((x:any)=>x===code);
			if(findIndex == -1){
				this.deleteData.select.push(code)
			}else{
				this.deleteData.select.splice(findIndex,1)
			}
			app.platform.UIClickFeedBack(); 
		}
		delSelectNo(code:string){
			return this.deleteData.select.some((item:any)=>item===code)
		}
		onClickDelSave(){
			const remains = this.selectSeries[0].noList.filter((item:any)=>{
				return !this.deleteData.select.includes(item.code);
			})
			if(remains.length<MinNoLength){
				uni.showToast({title:"至少选择2张卡片，您可进行添加卡片或拆分限编",icon:"none"})
				return;
			}
			this.selectSeries[0].noList = remains;
			this.onClickDelClose();
		}
		onClickDelClose(){
			this.deleteData = new DeleteData()
		}
	}
</script>

<style lang="scss">
	page{
        background:#000000;
    }
	.album-card-content{
		padding-bottom:159rpx;
		padding-bottom: calc(159rpx + env(safe-area-inset-bottom));
		.segment{
			display: flex;
			align-items: center;
			font-size: 23rpx;
			color:#fff;
		}
		.icon-close{
			width: 50rpx;
			height: 50rpx;
			background-color: rgba(255, 255, 255,0);
			font-family: uniicons;
			font-size: 46rpx;
			font-weight: normal;
			font-style: normal;
			color: #fff;
		}
		.check{
            width: 36rpx;
            height:36rpx;
            border: 1px solid #C0C0C0;
            border-radius: 50%;
			margin-right: 15rpx;
			margin-top: 2rpx;
        }
        .check_{
            border: none;
            background:url(@/static/illustration/album/icon_g.png) no-repeat center / 100% 100%;
        }
	}
	.list{
		.tips{
			width: 100%;
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
		}
		.box-content{
			width: 100%;
			box-sizing: border-box;
			padding:20rpx 24rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
		}
		.card-box{
			width: 341rpx;
			font-family: PingFang SC;
			margin-bottom: 20rpx;
			box-sizing: border-box;
		}
		.player{
			width: 100%;
			box-sizing: border-box;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #C0C0C0;
			margin-top: 20rpx;
		}
		.cardset{
			width: 100%;
			box-sizing: border-box;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #707070;
			line-height: 38rpx;
		}
		.pic-box{
			width: 341rpx;
			height:479rpx;
			display: flex;
			position: relative;
		}
		.pic-index{
			width: 341rpx;
			height:479rpx;
			position: absolute;
			left:0;
			top:0;
			box-sizing: border-box;
		}
		.pic{
			width: 341rpx;
			height:479rpx;
			border-radius: 3rpx;
		}
		.pic-close{
			width: 40rpx;
			height:40rpx;
			position: absolute;
			right:8rpx;
			top:8rpx;
			background: url(@/static/illustration/album/close.png) no-repeat center /100% 100%;
		}
		.icon-check{
			width: 40rpx;
			height:40rpx;
			position: absolute;
			right:8rpx;
			top:8rpx;
			border: 1px solid #C0C0C0;
            border-radius: 50%;
            box-sizing: border-box;
			z-index: 6;
		}
		.icon-check_{
            border: none;
            background:url(@/static/illustration/album/icon_g.png) no-repeat center / 100% 100%;
        }
		.upload-box{
			width: 341rpx;
			height: 479rpx;
			border-radius: 3rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			padding:140rpx 0 240rpx 0;
			box-sizing: border-box;
			border: 2rpx dashed rgba(230, 230, 230, 0.6);
			position: absolute;
			left:0;
			top:0;
		}
		.upload-msg{
			width: 100%;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #8D8D8D;
			text-align: center;
		}
		.back-box{
			padding:50rpx 0;
		}
		.back-pic-box{
			width: 128rpx;
			height:180rpx;
			position: absolute;
			box-sizing: border-box;
			right:16rpx;
			bottom:16rpx;
			left: auto;
			top:auto;
		}
		.back-pic{
			width: 128rpx;
			height:180rpx;
		}
		.icon-add{
			width: 41rpx;
			height:41rpx;
		}
		.martop40{
			margin-top: 40rpx;
		}
	}
	

</style>
