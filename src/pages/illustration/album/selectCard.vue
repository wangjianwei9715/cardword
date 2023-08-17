<!--
 * @FilePath: \jichao_app_2\src\pages\illustration\album\selectCard.vue
 * @Author: wjw
 * @Date: 2023-06-26 19:47:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-17 17:51:16
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="album-card-content">
		<view class="tips">请尽可能添加您想收集的整套卡组，以便查看收集进度</view>
		<view class="series-box" v-for="(item,index) in selectSeries" :key="index">
			<view class="header">
				<view class="title">{{item.name}}</view>
				<view class="icon-sub" @click="selectSeries.splice(index,1)"></view>
			</view>
			<view class="no-box" v-for="(noItem,noIndex) in item.noList" :key="noIndex">
				<view class="card-team">
					<view class="team">NO.{{noItem.number}} {{noItem.team}}</view>
					<view v-show="!noItem.split" class="icon-clear" @click="item.noList.splice(noIndex,1)"></view>
					<view v-show="!noItem.split&&noItem.seq>1" class="split" @click="onClickSplitNo(index,noIndex)">拆分限编</view>
					<view v-show="noItem.split" class="split-c" @click="onClickSplitCancel(index,noItem)">取消拆分</view>
				</view>
				<view class="player">{{noItem.player}}</view>
				<view class="cardset">{{noItem.split?noItem.seqIndex+'/'+noItem.seq:noItem.seq}}编，{{noItem.cardSet}}</view>
			</view>
			<view class="add-no" @click="onClickSelectNo(item)">+添加卡种</view>
		</view>
		<view class="series-box">
			<view class="header">
				<view class="title">请选择系列</view>
				<view class="icon-add" @click="onClickSeriesSelect"></view>
			</view>
		</view>
		<albumBottom :showSave="false" :canNext="getSeriesNolistLength" :draftId="draftId" :selectSeries.sync="selectSeries" :step="1" @next="onClickNext()"/>
		<albumActionSheet :show.sync="sheetShow" :listId="[edit?1:0,5]"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import albumBottom from '../components/albumBottom.vue'
	import albumActionSheet from '../components/albumActionSheet.vue'
	@Component({
		components:{albumBottom,albumActionSheet}
	})
	export default class ClassName extends BaseNode {
		selectSeries:any = [];
		edit = false;
		draftId = '';
		sheetShow = false;
		onLoad(query: any) {
			if(query.draftId){
				this.draftId = query.draftId;
			}
			if (query.draftList) {
				this.selectSeries = JSON.parse(query.draftList)
			}
			if(query.seriesCode){
				this.selectSeries = [{seriesCode:query.seriesCode,name:query.name,noList:[]}]
			}
			if(query.editCodeList){
				this.edit = true;
				this.selectSeries = JSON.parse(query.editCodeList)
			}
			this.onEventUI("albumSelect", (res) => {
				const repeat = this.selectSeries.some((x:any)=>{
					if(x.seriesCode == res.code){
						uni.showToast({ title:'已选择此系列', icon:'none' })
						return true
					}
				})
				!repeat && this.selectSeries.push({seriesCode:res.code,name:res.name,noList:[]})
			});
			this.onEventUI("albumNoList", async (res:any)=>{
				await this.maxNoTotal(res.list.length);

				const codeList = this.getSeriesNoCode(res.code);
				this.selectSeries.some((x:any)=>{
					if(x.seriesCode === res.code){
						res.list.forEach((item:any)=>{
							if(!codeList.includes(item.code)){
								x.noList.push({...item,frontPic:"",backPic:"",series:{code:x.seriesCode,name:x.name}})
							}
						})
						return true;
					}
				})
			})
		}
		onBackPress(event:any){
			if(event.from=='backbutton'){
				this.sheetShow=true;
				return true
			}
			return
		}
		public get listTotal() : number {
			const total = this.selectSeries.reduce((total:number, x:any) => total + x.noList.length, 0);
			return total
		}
		public get getSeriesNolistLength() : boolean {
			const num = this.selectSeries.reduce((total:number,item:any)=> total+item.noList.length,0);
			return num>=2
		}
		getSeriesNoCode(seriesCode:string) {
			return this.selectSeries.filter((x:any)=>{
				return x.seriesCode == seriesCode;
			})[0].noList.map((x:any)=>x.code)
		}
		async onClickSplitNo(index:number,noIndex:number){
			const list = this.selectSeries[index].noList;
			list[noIndex].frontPic="";
			list[noIndex].backPic="";
			const { seq ,seqIndex, ...rest } = list[noIndex];
			await this.maxNoTotal(seq-1);
			this.selectSeries[index].noList.splice(noIndex,1);
			for(let i=seq ; i>0 ; i--){
				this.selectSeries[index].noList.splice(noIndex,0,{...rest,seqIndex:i,seq,split:true});
			}
		}
		onClickSplitCancel(index:number,noItem:any){
			const list = this.selectSeries[index].noList;
			list.some((x:any,index:number)=>{
				if(x.code==noItem.code){
					x.split = false;
					x.frontPic = "";
					x.backPic = "";
					list.splice(index+1,x.seq-1)
					return true;
				}
			})
		}
		onClickSeriesSelect(){
			uni.navigateTo({
				url:'/pages/illustration/seriesSelect?back=true&album=true'
			})
		}
		onClickSelectNo(item:any){
			uni.navigateTo({
				url:`/pages/illustration/album/selectNo?seriesCode=${item.seriesCode}`
			})
		}
		onClickNext(){
			if(this.edit){
				uni.$emit("editNoSelect",this.selectSeries);
				app.navigateTo.navigateBack()
			}else{
				uni.redirectTo({
					url:`/pages/illustration/album/picUpload?selectSeries=${encodeURIComponent(JSON.stringify(this.selectSeries))}&draftId=${this.draftId}`
				})
			}
		}
		maxNoTotal(num:number): Promise<any> {
			return new Promise((resolve, reject) => {
				if(num + this.listTotal > 500){
					uni.showToast({title:"最多支持500张，请重新选择",icon:"none"});
					reject();
					return;
				}
				resolve && resolve(true)
			})
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
	}
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
	.series-box{
		width: 100%;
		box-sizing: border-box;
		padding:0 20rpx;
		margin-bottom: 20rpx;
		.header{
			width: 100%;
			height:86rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.title{
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #C0C0C0;
			}
			.icon-add{
				width: 37rpx;
				height:37rpx;
				background: url(@/static/illustration/album/icon_add.png) no-repeat center/ 100% 100%;
			}
			.icon-sub{
				width: 37rpx;
				height:37rpx;
				background: url(@/static/illustration/album/icon_sub.png) no-repeat center/ 100% 100%;
			}
			
		}
		.no-box{
			width: 100%;
			box-sizing: border-box;
			background: #272727;
			border-radius: 3rpx;
			padding:20rpx;
			margin-bottom: 20rpx;
			.card-team{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height:36rpx;
				position: relative;
				.split{
					height: 34rpx;
					background: #707070;
					border: 1px solid #D8D8D8;
					font-size: 17rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					position: absolute;
					right:63rpx;
					top:1rpx;
					box-sizing: border-box;
					padding:0 10rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.split-c{
					height: 34rpx;
					background: #707070;
					border: 1px solid #D8D8D8;
					font-size: 17rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					box-sizing: border-box;
					padding:0 10rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			.team{
				font-size: 23rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
			}
			.icon-clear{
				width: 32rpx;
				height:32rpx;
				background: url(@/static/illustration/album/icon_sub.png) no-repeat center/ 100% 100%;
			}
			.player{
				font-size: 23rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				margin-top: 12rpx;
			}
			.cardset{
				font-size: 23rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #C0C0C0;
				margin-top: 20rpx;
				line-height: 36rpx;
				word-break: break-all;
			}
		}
		.add-no{
			width: 100%;
			height:75rpx;
			border: 1px dashed rgba(230, 230, 230, 0.6);
			border-radius: 5rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #C0C0C0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
