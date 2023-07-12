<!--
 * @FilePath: \jichao_app_2\src\pages\illustration\album\picUpload.vue
 * @Author: wjw
 * @Date: 2023-06-26 19:47:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-12 17:23:54
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="album-card-content">
		<navigationbar title="上传卡片" :customBack="edit||draftId" backgroundColor="#000" backColor="#fff" borderBottom="none" :custom="true" @back="sheet.show=true">
			<template slot="right">
				<view class="segment" @click="segmentCheck=!segmentCheck">
					<view class="check" :class="{'check_':segmentCheck}"></view>
					自动抠图
				</view>
			</template>
		</navigationbar>
		<view class="list" v-for="(item,index) in selectSeries" :key="index">
			<view class="tips">{{item.name}}</view>
			<view class="card-box" v-for="(noItem,noIndex) in item.noList" :key="noIndex">
				<view class="header">
					<text class="text">{{noItem.split?noItem.seqIndex+"/":""}}{{noItem.seq}}编 {{noItem.player}}，</text>
					{{noItem.cardSet}}
				</view>
				<view class="pic-box">
					<view class="pic-index" v-if="noItem.frontPic">
						<muqian-lazyLoad class="pic" :src="decodeURIComponent(noItem.frontPic)" mode="aspectFit"/>
						<view class="pic-close" @click="noItem.frontPic=''"></view>
					</view>
					<view class="upload-box" v-else @click="onClickAddImg(index,noIndex,'front')">
						<image class="icon-add" src="@/static/illustration/album/add.png"/>
						<view class="upload-msg">上传正面</view>
					</view>

					<view class="pic-index" v-if="noItem.backPic">
						<muqian-lazyLoad class="pic" :src="decodeURIComponent(noItem.backPic)" mode="aspectFit"/>
						<view class="pic-close" @click="noItem.backPic=''"></view>
					</view>
					<view class="upload-box" v-else @click="onClickAddImg(index,noIndex,'back')">
						<image class="icon-add" src="@/static/illustration/album/add.png"/>
						<view class="upload-msg">上传反面</view>
					</view>
				</view>
			</view>
		</view>
		<u-action-sheet :actions="sheet.list" :show="sheet.show" cancelText="取消" @select="onSheetSelect" @close="sheet.show=false"></u-action-sheet>
		<albumBottom :canNext="uploadPercent>0" :draftId="draftId" :data="selectSeries" :percent="uploadPercent" :step="2" @next="onClickNext()"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import Upload from "@/tools/upload";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import albumBottom from '../components/albumBottom.vue'
	@Component({
		components:{albumBottom}
	})
	export default class ClassName extends BaseNode {
		selectSeries:any = [];
		segmentCheck = false;
		edit = false;
		sheet = {
			show:false,
			list:[
				{ id:1, name:'选择卡种' },
				{ id:2, name:'返回编辑' },
				{ id:3, name:'退出编辑' },
			]
		}
		draftId = '';
		onLoad(query: any) {
			this.onEventUI("editNoSelect",(res:any)=>{
				this.selectSeries = res;
			})
			if (query.draftList) {
				this.draftId = query.draftId;
				this.sheet.list = [
					{ id:1, name:'选择卡种' },
					{ id:3, name:'退出编辑' },
				]
				this.selectSeries = JSON.parse(query.draftList)
			}
			if(query.selectSeries){
				this.selectSeries = JSON.parse(query.selectSeries)
			}
			if(query.editCodeList){
				this.edit = true;
				this.draftId = query.draftId;
				this.formatterCodeList(JSON.parse(query.editCodeList))
			}
		}
		public get uploadPercent() : string {
			const total = this.selectSeries.reduce((total:number,x:any)=>{
				return total + x.noList.filter((item:any) => item.frontPic).length;
			},0)
			const percent = total==0?'0':((total/this.listTotal)*100).toFixed(2);
			return percent
		}
		public get listTotal() : number {
			const total = this.selectSeries.reduce((total:number, x:any) => total + x.noList.length, 0);
			return total
		}
		async onClickAddImg(index:number,noIndex:number,type:string){
			const list:any =  await this.addImg(1);
			const path = await this.segment(list[0])
			if(type=='front'){
				this.selectSeries[index].noList[noIndex].frontPic = path
			}else{
				this.selectSeries[index].noList[noIndex].backPic = path
			}
		}
		async addImg(length:number){
			const picList:any = await Upload.getInstance().uploadImgs(length, "report", ["album"]);
			return picList
		}
		async segment(pic:string){
			try {
				if(!this.segmentCheck) return decodeURIComponent(pic)
				
				app.http.Post("cardIllustration/image/upload/segment",{pic:decodeURIComponent(pic)}, async (res:any)=>{
					const picList:any = await Upload.getInstance().uploadTemporaryFile(res.pic);
					return decodeURIComponent(picList[0])
				})
			} catch (err) {
				uni.showToast({ title:"上传失败请重试", icon: 'none' })
			}
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
		onSheetSelect({id}:any){
			if(id==1){
				uni.navigateTo({
					url:`/pages/illustration/album/selectCard?editCodeList=${encodeURIComponent(JSON.stringify(this.selectSeries))}&draftId=${this.draftId}`
				})
			}else if(id==2){
				app.navigateTo.navigateBack()
			}else if(id==3){
				uni.navigateBack({delta:2})
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
					url:`/pages/cardForum/release?albumList=${encodeURIComponent(JSON.stringify(albumList))}`
				})
			}
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
		.card-box{
			width: 100%;
			box-sizing: border-box;
			padding:20rpx;
		}
		.header{
			width: 100%;
			margin-bottom: 26rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #707070;
			.text{
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #C0C0C0;
			}
		}
		.pic-box{
			width: 100%;
			height:232rpx;
			display: flex;
		}
		.pic-index{
			width: 165rpx;
			height:232rpx;
			position: relative;
			margin-right: 25rpx;
		}
		.pic{
			width: 165rpx;
			height:232rpx;
			border-radius: 3rpx;
		}
		.pic-close{
			width: 30rpx;
			height:30rpx;
			position: absolute;
			right:8rpx;
			top:8rpx;
			background: url(@/static/illustration/album/close.png) no-repeat center /100% 100%;
		}
		.upload-box{
			width: 165rpx;
			height: 232rpx;
			border-radius: 3rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 25rpx;
			flex-wrap: wrap;
			padding:60rpx 0;
			box-sizing: border-box;
			border: 2rpx dashed rgba(230, 230, 230, 0.6);
		}
		.upload-msg{
			width: 100%;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #8D8D8D;
			text-align: center;
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
