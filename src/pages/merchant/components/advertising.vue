<template>
	<view class="good-act-content" >
		<bottomDrawer :showDrawer="show" title="广告推广" @closeDrawer="showSync=false;isPullDown(true)" :needSafeArea="true" padding="0rpx 0rpx">
			<view class="drawer-header">
				<view class="drawer-header-name">使用后在售期间可投放广告页至首页（单商品最高累计可投放{{maxAdHour}}小时）</view>
			</view>
			<view class="drawer-center-list" v-show="!waitReview">
				<view class="drawer-level-box">
					<view class="drawer-level-index" :class="{'current-level':currentLevel==index}" v-for="(item,index) in adCardList" :key="index" @click="onClickCurrentLevel(index)">
						<view class="level-title">{{index}}级广告位</view>
						<view class="level-text">位置：{{levelLoca[index]}}</view>
					</view>
				</view>
				<view class="drawer-header-content">
					<view class="drawer-header-left">共计<text>{{currentAdCardListLength}}</text>张</view>
					<view class="drawer-header-right" @click="onClickSelectAll()">全选</view>
				</view>
				<view class="drawer-center-item" v-for="(item,index) in currentAdCardList" :key="index">
					<view class="drawer-item-box">
						<view class="drawer-item-surplus">剩{{item.remaining_quantity}}次</view>
						<view>
							<view class="drawer-item-time">{{item.hour}}小时</view>
						</view>
					</view>
					<view class="drawer-item-operate">
						<view class="operate-btn" @click="onClickReduceNum(item)"><image class="icon-reduce" src="@/static/merchant/icon_reduce.png" /></view>
						<input type="number" class="drawer-item-input" v-model.number="item.num" @blur="onBlurNum($event,item)"/>
						<view class="operate-btn" @click="onClickAddNum(item)"><image  class="icon-add" src="@/static/merchant/icon_add.png" /></view>
					</view>
				</view>
				<view v-if="!hasUsableCard&&currentState.inEffect" class="nouse-card">暂无可用的广告卡</view>
			</view>
			
			<view class="drawer-bottom" >
				<view v-if="currentState.inEffect" class="drawer-bottom-rank">
					<text>生效中：</text><u-count-down :time="countDown(adData.failure_at)" format="HH:mm:ss" @finish="onFinish"></u-count-down>，<text>在售期间/倒计时结束前</text>有效
				</view>
				<view v-else-if="hasUsableCard" class="drawer-bottom-rank" >
					共{{currentState.notStart ? selectedHour:adData.totalHour}}小时,广告图审核通过后开始计时，<text>在售期间/倒计时结束前</text>有效
				</view>
				<view v-else class="drawer-bottom-rank">暂无广告卡可用</view>

				<view v-if="hasUsableCard" :class="buttonData.class" style="display: flex;align-items: center;justify-content: center;" @click="buttonData.clickHandler">
					{{ buttonData.text }} 
					<u-count-down v-if="adFull&&!currentState.waitReview&&adData.recently_at>0&&!currentState.inEffect" @finish="tipsFinish" style="color: #ffffff;" :time="countDown(adData.recently_at)" :format="(+new Date())-adData.recently_at>60*60?'HH:mm:ss':'mm:ss'"></u-count-down>
					
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
	import { maxAdHour, stateMap, levelLoca } from "../constants/constants";
	@Component({})
	export default class ClassName extends BaseComponent {
		@PropSync("show",{
			type:Boolean
		}) showSync!: Boolean;
		@Prop({default:''})
		goodCode?:string
		@Prop({default:''})
		slogan?:string
		
		levelLoca = levelLoca;
		maxAdHour = maxAdHour;
		stateMap = stateMap;
		isPullDown = app.platform.isPullDown;
		adCardList:any=[];
		adData:any={};
		currentLevel = 0;
		buttonConfig:any = {
			[stateMap.notStart]:{
				text : "",
				clickHandler : this.onClickConfirmUse
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
				this.getList()
			}
		}
		public get currentState(): { [key: string]: boolean } {
			return {
				notStart: this.adData.state === stateMap.notStart,
				waitReview: this.adData.state === stateMap.waitReview,
				inEffect: this.adData.state === stateMap.inEffect
			};
		}
		public get adFull() : boolean {
			// return true
			return this.adData.now_num>=this.adData.limit_num;
		}
		public get currentAdCardList() : any[]  {
			return this.adCardList[this.currentLevel]||[]
		}
		public get currentAdCardListLength() : number {
			return this.currentAdCardList.reduce((total:number,item:any) => total+item.remaining_quantity , 0)
		}
		public get usableAdCardList() : string {
			return this.currentAdCardList.filter((item:any)=>item.remaining_quantity>0)
		}
		public get waitReview() : boolean {
			return [stateMap.waitReview].includes(this.adData.state)
		}
		public get hasUsableCard() : boolean {
			const hasCard = this.currentAdCardList.length>0 && this.currentAdCardList.some((item:any)=>item.remaining_quantity>0)
			return (hasCard || this.currentState.waitReview)
		}
		public get selectedHour() : number {
			return this.currentAdCardList.reduce((total:number,item:any) => total+(item.num*item.hour) , 0)
		}
		public get useHour() : number {
			const hour = this.adData.totalHour + this.selectedHour;
			return hour
		}
		public get buttonData():{[x:string]:any} {
			const { state,reminder } = this.adData;
			console.log(state);
			
			const { notStart, waitReview, inEffect } = stateMap;
			if(this.currentState.notStart){
				this.buttonConfig[notStart].text = this.adFull? this.fullTips(reminder) : `确认使用（可申请广告位${this.adData.now_num}/${this.adData.limit_num}）`
			}
			if(this.currentState.inEffect){
				this.buttonConfig[inEffect].text =`生效中`
			}
			return {
				class: {
					'drawer-bottom-btn': true,
					'btn-disabled': state===waitReview || (state===notStart&&this.adFull&&reminder),
					'upload-btn': (this.adFull)
				},
				...this.buttonConfig[state]
			};
		}
		fullTips(reminder:boolean){
			if (reminder){
				return this.adData.recently_at>0?`提醒已设置,距离下一次可用:`:`广告位已满,提醒已设置`
			}else{
				return this.adData.recently_at>0?`已满、预约结束前提醒:`:`已满、点击设置提醒`
			}
		}
		onClickSelectAll(item:any){
			this.currentAdCardList.forEach(x=>{
				x.num = x.remaining_quantity
			})
		}
		countDown(endTime:number){
			return (endTime-Math.round(+new Date().getTime() / 1000))*1000
		}
		redirectToMall(){
			uni.redirectTo({url:"/pages/merchant/mall/index"});
		}
		onClickCurrentLevel(index:number){
			this.currentLevel = index;
		}
		onClickReduceNum(item:any){
			if(item.num<=0) return;
			item.num--;
		}
		onClickAddNum(item:any){
			if(item.num>=item.remaining_quantity) return;
			item.num++;
		}
		onBlurNum(event:any,item:any){
			if(item.num<=0) item.num = 0;
			if(item.num>=item.remaining_quantity) item.num = item.remaining_quantity;
		}
		setMerReminder(){
			app.http.Post(`merchant/me/adCard/reminder`,{},()=>{
				uni.showModal({
					title:"设置提醒成功",
					content:"平台将在最近一次有可用广告位的前5分钟提醒您，请留意站内信;提示倒计时结束后可刷新页面申请广告位",
					showCancel:false
				})
				this.adData.reminder=true
			})
			return
		}
		onClickConfirmUse(){
			const { inEffect } = this.currentState
			if(this.adFull&&!this.adData.reminder&&!inEffect){
				this.setMerReminder()
				return
			}
		
			if(this.selectedHour==0 || (this.adFull&&!inEffect)) return;
			if (inEffect) return
			if(inEffect && this.useHour > maxAdHour){
				uni.showToast({title:"超出可续费时间,请重新确认",icon:"none"})
				return;
			}
			app.platform.UIClickFeedBack(); 
			uni.showModal({
				title: '提示',
				content: `是否确认${inEffect?"续费":"申请"}广告位`,
				success:  (res)=> {
					if (res.confirm) {
						const params = {
							goodCode:this.goodCode??null,
							list:this.currentAdCardList.map((x:any)=>{
								return {count:Number(x.num),hour:x.hour}
							}),
							level:Number(this.currentLevel),
							slogan:this.slogan
						}
						app.http.Post("merchant/me/adCard/use/v2",params,(res:any)=>{
							this.getList()
						})
					}
				}
			});
		}
		onFinish(){
			this.getList()
		}
		tipsFinish(){
			this.adData.now_num-=1
		}
		getList(){
			app.http.Get('merchant/me/adCard/list',{goodCode:this.goodCode},({list,...rest}:any)=>{
				this.adData = rest;
				if(!uni.$u.test.isEmpty(list)){
					Object.keys(list).forEach(key => {
						list[key] = list[key].map(x=>{
							return {...x,num:0}
						})
					});
					this.adCardList = list;
				}
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
			line-height: 80rpx;
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
		
		font-weight: 600 !important;
		color: #FFFFFF !important;
		margin-left: 10rpx;
	}
	.good-act-content .drawer-bottom-rank /deep/ .u-count-down__text{
		height:80rpx;
		line-height: 80rpx;
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
		width: 160rpx;
		height:220rpx;
		box-sizing: border-box;
		margin-bottom: 30rpx;
		margin-right: 20rpx;
		.drawer-item-box{
			width: 100%;
			height:150rpx;
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
			font-size: 40rpx;
			font-weight: 600;
			color: #333333;
		}
		.drawer-item-loca{
			width: 100%;
			text-align: center;
			font-size: 26rpx;
			
			margin-top: 6rpx;
			color: #333333;
		}
		.drawer-item-time{
			width: 100%;
			text-align: center;
			font-size: 23rpx;
			
			
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
			
			
			color: #FA1545;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.good-act-content .drawer-item-inuse /deep/ .u-count-down__text{
		font-size: 20rpx !important;
		
		font-weight: 400 !important;
		color: #FA1545 !important;
		margin-left: 10rpx;
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
	.nouse-card{
		width: 100%;
		text-align: center;
		height: 500rpx;
		line-height: 500rpx;
		color:#959695;
		font-size: 30rpx;
	}
	.drawer-level-box{
		width: 100%;
		height:140rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid rgb(232, 232, 232);
		.drawer-level-index{
			width: 160rpx;
			height:110rpx;
			box-sizing: border-box;
			border: 1rpx solid #959695;
			border-radius: 3rpx;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			justify-content: center;
			align-content: center;
			.level-title{
				width: 100%;
				text-align: center;
				font-size: 28rpx;
				
				color: #333333;
			}
			.level-text{
				width: 100%;
				text-align: center;
				font-size: 26rpx;
				
				color: #333333;
				margin-top: 10rpx;
			}
		}
		.current-level{
			border: 1rpx solid #FA1545;
			background:rgba(250, 21, 69,0.1);
		}
	}
	.drawer-header-content{
		width: 100%;
		display: flex;
		justify-content: space-between;
		height:80rpx;
		align-items: center;
	}
	.drawer-header-left{
		font-size: 28rpx;
		color: #333333;
	}
	.drawer-header-left text{
		font-size: 28rpx;
		color: #FA1545;
	}
	.drawer-header-right{
		font-size: 28rpx;
		color: #FA1545;
		text-decoration: underline;
	}
</style>
