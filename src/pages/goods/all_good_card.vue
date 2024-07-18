<template>
	<view class="content">
		<transitionNav ref='transitionNav' :whiteTitle="true" :needIconShadow="false" title="卡密列表"/>
		<view class="bg-image">
			<view class="tab-header-box" v-if="goodType<4||goodType>10">
				<view class="tab-header" >
					<view class="search-icon"></view>
					<input class="search-input" type="text"  v-model="searchText" placeholder="搜索球员、球队"  confirm-type="search"  @confirm="onClickSearch" />
					<view class="search-close" @click="searchText='',onClickSearch()"></view>
				</view>
				<view class="tab-translate" :class="{'translate-e':english}" @click="onClickTranslate"></view>
			</view>
		</view>
		<!-- 卡密奖励 -->
		<noAward ref="rNoAward" width="750rpx"/>
		<table class="rules-table">
			<thead>
				<tr class="item-content">
					<td :width="tabWidth" v-for="(item,index) in itemListName" :key="index"><text class="text-name">{{item}}</text></td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in teamDataList" :key="index" :class="index%2==0?'title-middle2':'title-middle3'" >
					<td class="card-td"  v-for="(items,indexs) in itemListName" :key="indexs" >
						<text>{{itemText(item,indexs)}}</text>
						<view v-if="indexs==itemListName.length-1&&item.zuhecheTp" class="card-tips" :style="{background:itemsTips(item).background}">{{itemsTips(item).text}}</view>
					</td>
				</tr>
			</tbody>
		</table>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import {
		Component
	} from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import noAward from "./component/noAward.vue"
	//@ts-ignore
	import { KwwConfusion } from "@/net/kwwConfusion.js"
	import { _Maps } from "@/tools/map"
	@Component({ components:{noAward} })
	export default class ClassName extends BaseNode {
		tipsData = _Maps._GoodsTips;
		goodCode = '';
		goodType = 0;
		searchText = '';
		currentPage = 1;
		pageSize = 30;
		noMoreData = false;
		itemListName=[];
		teamDataList = [];
		translate = false;
		english = false
		scrollId = '';
		scrollIdSt:any = 0;
		goodTitle = '';
		tabWidth:any = '';
		teamId = 0;
		debug = app.updateDebug == 'on';
		zuhecheTp = 0;
		zuhecheName = ""
		onLoad(query: any) {
			if(query.code){
				this.goodCode = query.code;
				this.goodType = Number(query.type);
				if(query.teamId){
					this.teamId = Number(query.teamId)
				}
				if(query.zuhecheTp>0){
					this.zuhecheTp = query.zuhecheTp
				}
				this.$nextTick(()=>{
					// 拼团商品卡密奖励轮播图
					this.$refs.rNoAward.getLamp(this.goodCode)
				})
				this.reqNewData()
			}
		}
		//   加载更多数据
		onReachBottom() {
			if(this.searchText!=''){
				this.searchData()
			}else{
				this.reqNewData() 
			}
		}
		onPageScroll(data: any) {
			//@ts-ignore
			this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
		}
		
		public get oldUrl() : boolean {
			return [4,5,10].includes(this.goodType)
		}
		itemText(item,indexs){
			const name = 'column'+(indexs+1);
			const englishName = name+'_English';
			const zuhecheName = indexs==0&&[1,2].includes(item.zuhecheTp)?`(${this.zuhecheName}系列车位)`:""
			return ((this.english&&item[englishName]?item[englishName]:item[name])||'-') + zuhecheName;
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			const url = `dataApi/good/${this.goodCode}/${this.oldUrl?'noList':'no/list'}`;
			let params:{[x:string]:any} = {
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
			}
			if(this.teamId>0) params.teamId = this.teamId;
			if(this.zuhecheTp>0) params.zuhecheTp = this.zuhecheTp
			if(this.searchText!='') params.q = encodeURIComponent(this.searchText)

			app.http.GetWithCrypto(url, params, (data: any) => {
				this.goodTitle = data.goodTitle;
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				this.itemListName = data.columns;
				this.tabWidth = (100/(this.itemListName.length))+'%';
				this.translate = data.translate
				if(data.list){
					if(this.currentPage==1) this.teamDataList =  []
					let list = data.list;
					if(data.noTypes&&data.noTypes.length){
						list.forEach((x,index) => {
							x['zuhecheTp'] = data.noTypes[index];
						});
					}
					this.teamDataList = this.teamDataList.concat(list);
				}
				this.zuhecheName = data.zuhecheName || ""
				this.debug && app.platform.refrain(this.teamDataList);
				this.currentPage++;
				if(cb) cb()
			});
		}
		searchData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			let date:any = new Date()
			let params:{[x:string]:any} = {
				timeStamp:Date.parse(date)/1000,
				q:encodeURIComponent(this.searchText),
				pageSize:this.pageSize,
			}
			if(this.scrollId!=''){
				params.scrollId = this.scrollId;
				params.st = this.scrollIdSt;
				params.sn = KwwConfusion.goodCard(this.scrollIdSt,this.scrollId);
			}
			
			app.http.Get("dataApi/good/"+this.goodCode+'/cards/search', params, (data: any) => {
				if(data.total<=this.teamDataList.length){
					this.noMoreData = true;
				}
				if(this.currentPage==1)this.teamDataList = [];
					
				if(data.list){
					this.teamDataList = this.teamDataList.concat(data.list);
				}
				this.debug && app.platform.refrain(this.teamDataList);
				this.scrollId = data.scrollId?data.scrollId:'';
				this.scrollIdSt = data.timeStamp;
				this.currentPage++;
				if(cb) cb()
			});
		}
		onClickSearch() {
			this.currentPage = 1;
			this.noMoreData = false;
			this.teamDataList = [];
			this.scrollId = ''
			if(this.searchText == '' || !this.oldUrl){
				this.reqNewData() 
			}else{
				this.searchData()
			}
		}
		
		onClickTranslate() {
			this.english = !this.english
		}
		itemsTips(item){
			const type = item.zuhecheTp>0?item.zuhecheTp+1:0;
			return {
				background:this.tipsData[type].background,
				text:this.tipsData[type].text
			}
		}
	}
</script>

<style lang="scss">
	$font-22:22rpx;
	$font-24:24rpx;
	.bg-image{
		width: 750rpx;
		height:282rpx;
		background: url(@/static/goods/detail/card_bg.png) no-repeat top /100% 360rpx;
		box-sizing: border-box;
		padding-top: 186rpx;
	}
	.tab-header-box{
		width: 678rpx;
		height: 68rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin:0 auto
	}
	.tab-header {
		width: 618rpx;
		height: 68rpx;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		z-index: 10;
		background: rgba(255,255,255,0.3);
		border-radius: 5rpx;
	}
	.search-icon{
		width: 28rpx;
		height:30rpx;
		background:url(@/static/goods/detail/search.png) no-repeat center;
		background-size:100% 100%;
		position: absolute;
		left:20rpx;
		top:50%;
		margin-top: -16rpx;
	}
	.search-close{
		width: 32rpx;
		height:32rpx;
		background:url(@/static/goods/detail/search-close.png) no-repeat center;
		background-size:100% 100%;
		position: absolute;
		right:20rpx;
		top:50%;
		margin-top: -16rpx;
	}
	.search-input{
		width: 100%;
		height:68rpx;
		line-height: 68rpx;
		border-radius: 4rpx;
		font-size: 24rpx;
		font-weight: 600;
		color: rgba(255,255,255,0.4);
		padding-left:68rpx ;
	}
	.item-goodtitle{
		width: 100%;
		text-align: center;
		line-height: 40rpx;
		font-size: 30rpx;
		color: #333333;
		background:#F6F7FB;
		box-sizing: border-box;
		padding:20rpx ;
	}
	.item-content{
		background: #FFFFFF;
		height:60rpx
	}
	
	.title-middle {
		font-size: 26rpx;
		
		
		color: #333333;
		line-height: 32rpx;
		display: flex;
	}

	.title-middle2 {
		background: #F0F0F2;
	}
	.title-middle3 {
		background: #FFFFFF;
	}
	.text-name {
		width: 100%;
		height:60rpx;
		box-sizing: border-box;
		text-align: center;
		font-size: 24rpx;
		
		font-weight: 600;
		color: #333333;
	}
	.rules-table{
		width: 100%;
		border-collapse: collapse;
	}
	.rules-table tr td{
		height:76rpx;
		line-height: 40rpx;
		font-size: 23rpx;
		
		
		color: #34363A;
		text-align: center;
		padding:10rpx ;
	}
	.item-content td{
		height:60rpx !important;
	}
	.tab-translate{
		width: 36rpx;
		height:36rpx;
		background: url(@/static/goods/detail/translate_c.png) no-repeat center / 100% 100%;
	}
	.translate-e{
		background: url(@/static/goods/detail/translate_e.png) no-repeat center / 100% 100% !important; 
	}
	.card-td{
		position: relative;
	}
	.card-tips{
		width: 100rpx;
		height:28rpx;
		position: absolute;
		right:0;
		top:0;
		text-align: center;
		line-height: 28rpx;
		font-size: 20rpx;
		color: #FFFFFF;
	}
</style>
