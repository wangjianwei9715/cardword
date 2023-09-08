<template>
	<view class="album-card-content">
		<filterNoList ref="filterNolist" :selectSeries.sync="selectSeries" :search="seriesData.search" @next="onClickNext"/>
		<albumActionSheet :show.sync="sheetShow" :listId="[edit?1:0,backSeriesSelect?6:5]"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import { SeriesDetail } from '../constants/interface'
	import albumActionSheet from '../components/albumActionSheet.vue'
	import filterNoList from '../components/filterNoList.vue'
	@Component({
		components:{albumActionSheet,filterNoList}
	})
	export default class ClassName extends BaseNode {
		selectSeries:any = {};
		edit = false;
		draftId = '';
		sheetShow = false;
		seriesData:SeriesDetail = {
			"code":0,
			"followed": false, //当前用户是否已关注此系列
			"main": { //data
				"name": "", //sport_type
				"year": "", //year
				"logo": "", //logo
				"backPic": "", //backPic
				"numLoaded": 0, 
				"numAll":0, 
			},
			"search": { //data
				"cardSets": '', //显示后台翻译过的卡种，展示72小时内点击量最高的20条内容（含详细筛选），未翻译的卡种不显示
				"players": '', //该系列下筛选点击次数最多的前20个球员，展示72小时内点击量最高的20条内容
				"seqs": '' //该系列下筛选点击次数最多的前20条限编，展示72小时内点击量最高的20条内容
			}
		};
		backSeriesSelect = false;
		onLoad(query: any) {
			if(query.draftId){
				this.draftId = query.draftId;
			}
			if(query.seriesCode){
				this.selectSeries = {seriesCode:query.seriesCode,name:query.name,noList:[]}
			}
			if(query.editCodeList){
				this.edit = true;
				this.selectSeries = JSON.parse(query.editCodeList)[0];
			}
			this.onEventUI("albumSelectPlayer",(res:any)=>{
				this.$refs.filterNolist.setPlayer(res)
			})
			this.initEvent();
		}
		onBackPress(event:any){
			if(event.from=='backbutton'){
				this.sheetShow=true;
				return true
			}
			return
		}
		onReachBottom() {
			this.$refs.filterNolist.reachBottom()
		}
		initEvent(){
			const curPage: any = getCurrentPages();
			this.backSeriesSelect = curPage.some((item:any)=>{
				return ["pages/illustration/seriesSelect"].includes(item.route)
			})
			this.getSeriesDetail();
		}
		getSeriesDetail(){
			app.http.GetWithCrypto(`dataApi/cardIllustration/series/detail/${this.selectSeries.seriesCode}`,{},(res:any)=>{
				this.seriesData = res;
			})
		}
		onClickNext(){
			if(this.edit){
				uni.$emit("editNoSelect",[this.selectSeries]);
				app.navigateTo.navigateBack()
			}else{
				uni.redirectTo({
					url:`/pages/illustration/album/picUpload?selectSeries=${encodeURIComponent(JSON.stringify([this.selectSeries]))}&draftId=${this.draftId}`
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
        background:#F6F7F8;
    }
</style>
