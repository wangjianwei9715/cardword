<template>
	<view class="side-content">
		<view class="side-left">
			<view class="side-tab" :class="{'current':current.id==item.id}" v-for="(item,index) in showTab" :key="index" @click="onClickTab(item.id)">
				<u-badge :isDot="true" :show="showBadge(item)" class="icon-badge"/>{{item.name}}{{item.id<=4?`(${item.num})`:""}}
			</view>
		</view>
		<view class="side-right">
			<view class="right-box">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"  :scroll-with-animation="true" @scroll="onScroll">
					<view v-for="(item,index) in showTab" :key="index" :id="item.id" class="scroll-view-item">
						<view class="right-title">{{item.name}}</view>
						<view class="input-box" v-if="item.id<=4">
							<view class="search-icon"></view>
							<input v-if="item.type=='cardSet'" class="input-operate" v-model="cardSetParams.q" placeholder="搜索卡种中英文" @confirm="onConfirmInput(0)"/>
							<input v-else-if="item.type=='player'" class="input-operate" v-model="playerParams.q" placeholder="搜索球员中英文" @confirm="onConfirmInput(1)"/>
							<input v-else-if="item.type=='team'" class="input-operate" v-model="teamParams.q" placeholder="搜索球队中英文" @confirm="onConfirmInput(2)"/>
							<input v-else-if="item.type=='seq'" class="input-operate" v-model="seqParams.q" placeholder="搜索限编号" @confirm="onConfirmInput(3)"/>
							<view class="input-close" @click="onClickClearQ(index)"></view>
						</view>
						<view class="right-list" v-if="item.id==1">
							<view class="cardset-item u-line-2" :class="{'current-card':selectHasItem(card)}" v-for="(card,cindex) in item.list" :key="cindex" @click="onClickSelectItem(card,item)">{{card.name}}</view>
							<u-loadmore :status="item.status" line @loadmore="loadmore(item)"/>
						</view>

						<view class="right-list" v-if="[2,3,4].includes(item.id)">
							<view class="player-item u-line-1" :class="{'current-card':selectHasItem(card)}" v-for="(card,cindex) in item.list" :key="cindex" @click="onClickSelectItem(card,item)">{{card.name}}</view>
							<u-loadmore :status="item.status" line @loadmore="loadmore(item)"/>
						</view>

						<view class="right-list" v-if="[5,6].includes(item.id)">
							<view class="player-item" :class="{'current-card':item.tp==tabItem}" v-for="tabItem in item.tab" :key="tabItem" @click="onClickFilterTab(item,tabItem)">{{tabItem}}</view>
						</view>

					</view>
				</scroll-view>
			</view>
		</view>
		<view class="side-bottom">
			<scroll-view class="bottom-scroll" :scroll-x="true">
				<view class="bottom-scroll-box"  v-for="(item,index) in selectList" :key="index" @click="onClickClearSelect(item,index)">
					<view class="bottom-scroll-item">{{item.name}}<view class="icon-close"></view></view>
				</view>
			</scroll-view>
			<view class="bottom-btn-box">
				<view class="btn-clear" @click="onClickClearAll()">清空</view>
				<view class="btn-confirm" @click="onClickConfirm()">确定（共{{selectList.length}}条List）</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	class ListParams {
		q="";
		fetchFrom=1;
		fetchSize=10;
	}
	const RcAndSignMapp:{[x:string]:any} = {
		"新秀":-1001,
		"非新秀":-1002,
		"签字":-1003,
		"非签字":-1004
	}
	@Component({})
	export default class ClassName extends BaseNode {
		seriesCode = "";
		sideTab:any = [
			{id:1,type:'cardSet',name:'卡种',num:0,list:[],show:true,status:"loadmore"},
			{id:2,type:'player',name:'球员',num:0,list:[],show:true,status:"loadmore"},
			{id:3,type:'team',name:'球队',num:0,list:[],show:true,status:"loadmore"},
			{id:4,type:'seq',name:'限编',num:0,list:[],show:true,status:"loadmore"},
			{id:5,type:'rc',name:'新秀',show:true,tp:null,tab:['新秀','非新秀']},
			{id:6,type:'signature',name:'签字',show:true,tp:null,tab:['签字','非签字']},
		];
		current = {
			id:1,
			execution:false
		};
		scrollTop = 0;
		orientation:any = [];
		selectList:any = [];
		cardSetParams = new ListParams();
		playerParams = new ListParams();
		teamParams = new ListParams();
		seqParams = new ListParams();
		paramsMap:{[name:number]:any} = {
			0:{params:this.cardSetParams,url:'cardSet'},
			1:{params:this.playerParams,url:'player'},
			2:{params:this.teamParams,url:'team'},
			3:{params:this.seqParams,url:'seq'}
		}
		tp=0;
		isAlbum = false;
		onLoad(query: any) {
			this.seriesCode = query.seriesCode;
			this.selectList = JSON.parse(query.selectList);
			if(query.tp){
				this.isAlbum = true;
				if(query.tp!=0){
					this.tp=query.tp;
					this.sideTab.forEach((x:any)=>{
						x.show = x.id==query.tp
					})
				}
			}
			const rookieList:any = this.selectList.filter((x:any)=> x.rookie);
            const signList:any = this.selectList.filter((x:any)=> x.signature);
			this.sideTab[4].tp = rookieList.length?rookieList[0].name:null;
			this.sideTab[5].tp = signList.length?signList[0].name:null;
			this.$nextTick(()=>{
				this.orientationInit();
				this.initEvent()
			})
		}
		public get showTab() : object {
			return this.sideTab.filter((x:any)=>x.show)
		}
		orientationInit() {
			const query = uni.createSelectorQuery().in(this)
			query.selectAll('.scroll-view-item').boundingClientRect(()=>{})
			query.exec((rects) => {
				let from = 0;
				this.orientation = rects[0].map((x:any,index:number)=>{
					const data = {id:x.id,from:from+(uni.upx2px(20)*index),height:x.height};
					from+=x.height;
					return data;
				})
			})
		}
		initEvent(){
			app.http.Get(`dataApi/cardIllustration/series/${this.seriesCode}/search/options/overview`,{},(res:any)=>{
				this.sideTab.forEach((x:any)=>{
					if(x.id<=4){
						x.num = res.data[x.type];
					}else if([5,6].includes(x.id)){
						x.show = res.data[x.type] && this.tp==0;
					}
				})
				Object.keys(this.paramsMap).forEach((x:any)=>{
					this.getListOfIndex(x)
				})
			})
		}
		getListOfIndex(index:number){
			if(!this.sideTab[index].show) return;
			const item = this.paramsMap[index];
			const params = item.params;
			app.http.Get(`dataApi/cardIllustration/series/${this.seriesCode}/search/options/${item.url}`,params,(res:any)=>{
				if(res.list){
					this.sideTab[index].list = params.fetchFrom == 1 ? res.list : [...this.sideTab[index].list,...res.list];
				}
				this.sideTab[index].status = res.isFetchEnd?"nomore":"loadmore";
				params.fetchFrom += params.fetchSize;
				params.fetchSize = 100;
				setTimeout(()=>{
					this.orientationInit()
				},100)
			})
		}
		onClickTab(tabId:number){
			const { id } = this.current;
			if(id===tabId)return;
			this.current.execution = true;
			this.current.id = tabId;
			const orientation = this.orientation.filter((x:any)=>x.id==tabId)[0];
			if(orientation.from == this.scrollTop){
				this.scrollTop = orientation.from + (orientation.height/2);
			}
			setTimeout(()=>{
				this.scrollTop = orientation.from
			},10)
			setTimeout(() => {
				this.current.execution = false
			}, 500);
		}
		onConfirmInput(index:number){
			this.paramsMap[index].params.fetchFrom=1;
			this.getListOfIndex(index)
		}
		onScroll(event:any) {
			if(this.current.execution) return;
			this.orientation.forEach((x:any)=>{
				if(event.detail.scrollTop>x.from &&  event.detail.scrollTop<x.from+(x.height/2) && this.current.id!=x.id){
					this.current.id = +x.id;
				}
			})
		}
		onClickClearQ(index:number){
			this.paramsMap[index].params.q = "";
			this.onConfirmInput(index)
		}
		loadmore(event:any){
			event.status = "loading";
			this.getListOfIndex(event.id-1)
		}
		onClickSelectItem(card: any,item:any) { 
			const repeatIndex = this.selectList.findIndex((x: any) => x.nameId === card.nameId); 
			if (repeatIndex !== -1) { 
				this.selectList.splice(repeatIndex, 1); 
			} else { 
				this.selectList.push({ ...card ,type:item.type }); 
			} 
			app.platform.UIClickFeedBack(); 
		}
		selectHasItem(item:any){
			return this.selectList.some((x:any)=>{
				return x.nameId == item.nameId
			})
		}
		showBadge(item:any){
			return item.id<=4 ? this.selectHasTabs(item.type) : item.tp!=null
		}
		selectHasTabs(type:string){
			return this.selectList.some((x:any)=>{
				return x.type == type
			})
		}
		onClickFilterTab(item:any,tab:string){
			const findContent = item.tp;
			if(findContent == null){
				this.selectList.push({nameId:RcAndSignMapp[tab],name:tab,rookie:item.id==5,signature:item.id==6});
			}else{
				this.selectList.forEach((x:any,index:number)=>{
					if(x.name == item.tp){
						this.selectList.splice(index,1)
					}
				})
				item.tp!=tab && this.selectList.push({nameId:RcAndSignMapp[tab],name:tab,rookie:item.id==5,signature:item.id==6});
			}
			item.tp = item.tp==tab ? null : tab;
		}
		onClickClearSelect(item:any,index:number){
			this.clearTp(item)
			this.selectList.splice(index,1);
		}
		onClickClearAll(){
			uni.showModal({
				content: "是否清空所有已选项",
				success: (data: any) => {
					if(data.confirm){
						this.selectList.forEach((x:any)=>{
							this.clearTp(x)
						})
						this.selectList = []
					}
				}
			})
		}
		clearTp(item:any){
			if(item.nameId<0){
				["新秀","非新秀"].includes(item.name) && (this.sideTab[4].tp=null);
				["签字","非签字"].includes(item.name) &&(this.sideTab[5].tp=null);
			}
		}
		onClickConfirm(){
			uni.$emit(this.isAlbum?'albumFilter':'seriesFilter',this.selectList);
			app.navigateTo.navigateBack()
		}
	}
</script>

<style lang="scss">
	page{
        background:#F6F7F8;
    }
	.side-content{
		width: 100%;
		height:100%;
		position: absolute;
		left:0;
		top:0;
	}
	.side-left{
		width: 200rpx;
		height:100%;
		position: absolute;
		left:0;
		top:0;
		box-sizing: border-box;
		padding:20rpx 0;
	}
	.side-right{
		width: 550rpx;
		height:100%;
		position: absolute;
		right:0;
		top:0;
		box-sizing: border-box;
		padding:20rpx 0 280rpx 0;
	}
	.side-tab{
		width: 100%;
		height:150rpx;
		text-align: center;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-badge{
		margin-right: 10rpx;
		width: 15rpx;
		height:15rpx;
	}
	.current{
		font-size: 29rpx;
		font-weight: 600;
		background: #fff;
		border-radius: 3px 0px 0px 3px;
	}
	.right-box{
		width: 100%;
		height:100%;
		.scroll-Y{
			width: 100%;
			height:100%;
		}
		.scroll-view-item{
			width: 100%;
			margin-bottom: 20rpx;
			background:#fff;
			border-radius: 3px 0px 0px 3px;
			box-sizing: border-box;
			padding: 0 24rpx 24rpx 24rpx;
		}
		.right-title{
			height:80rpx;
			line-height: 80rpx;
			font-size: 29rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}
		.input-box{
			width: 100%;
			height: 73rpx;
			background:#F5F5F5;
			border-radius:3rpx;
			box-sizing: border-box;
			padding-left: 74rpx;
			padding-right: 70rpx;
			position: relative;
			margin-bottom: 24rpx;
		}
		.input-operate{
			width: 100%;
			height: 73rpx;
			font-size: 23rpx;
			font-family: PingFang SC;
			font-weight: 400;
		}
		.search-icon{
			width: 28rpx;
			height:28rpx;
			background:url(@/static/index/sousuo@2x.png) no-repeat center / 100% 100%;
			position: absolute;
			left:21rpx;
			top:50%;
			margin-top: -14rpx;
		}
		.input-close{
			width: 36rpx;
			height:36rpx;
			background:url(@/static/illustration/icon_close.png) no-repeat center / 100% 100%;
			position: absolute;
			right:25rpx;
			top:50%;
			margin-top: -18rpx;
		}
		.right-list{
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
		}
		.cardset-item{
			width: 100%;
			box-sizing: border-box;
			padding:10rpx 20rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			background: #F2F2F2;
			border-radius: 3rpx;
			display: flex;
			align-items: center;
			margin-bottom: 15rpx;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
		}
		.player-item{
			width: 246rpx;
			height:66rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 66rpx;
			text-align: center;
			background: #F2F2F2;
			border-radius: 3rpx;
			margin-bottom: 15rpx;
			box-sizing: border-box;
			padding:0 10rpx;
		}
		.num-item{
			width: 246rpx;
			height:66rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 66rpx;
			text-align: center;
			background: #F2F2F2;
			border-radius: 3rpx;
			box-sizing: border-box;
			padding:0 10rpx;
		}
		.num-input{
			width: 246rpx;
			height:66rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			text-align: center;
		}
	}
	
	.side-bottom{
		width: 100%;
		height:260rpx;
		background:#fff;
		position: fixed;
		bottom:0;
		left:0;
		.bottom-scroll{
			width: 100%;
			height:108rpx;
			box-sizing: border-box;
			padding-left: 34rpx;
			white-space: nowrap;
		}
		.bottom-scroll-box{
			height:108rpx;
			display: inline-flex;
			align-items: center;
		}
		.bottom-scroll-item{
			height: 42rpx;
			border: 1px solid #C0C0C0;
			border-radius: 1rpx;
			box-sizing: border-box;
			padding:  0 16rpx ;
			margin-right: 29rpx;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			display: inline-flex;
			align-items: center;
		}
		.icon-close{
			width: 25rpx;
			height:25rpx;
			background: url(@/static/illustration/icon_close.png) no-repeat center / 100% 100%;
			margin-left: 12rpx;
		}
		.bottom-btn-box{
			width: 100%;
			height:92rpx;
			box-sizing: border-box;
			padding:0 34rpx;
			display: flex;
			justify-content: space-between;
		}
		.btn-clear{
			width: 189rpx;
			height: 92rpx;
			border: 1px solid #C0C0C0;
			border-radius: 5rpx;
			box-sizing: border-box;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.btn-confirm{
			width: 465rpx;
			height: 92rpx;
			background: #FA1545;
			border-radius: 5rpx;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.current-card{
		background: #FFE8E8 !important;
		font-weight: 600 !important;
		color: #FA1545 !important;
	}
</style>
