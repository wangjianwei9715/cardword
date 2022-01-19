<template>
	<view class="content">
		<view class="luck-bg"></view>
		<view class="luck-content">
			<!-- 轮播 -->
			<view class="record">
				<view class="record-content" :class="{'transition-ing':transitionIng}" :style="'transform:translateX('+marginLeft+'px)'">
					<view class="record-index" v-for="(item,index) in tipsData" :key="index">{{item}}</view>
				</view>
			</view>
			<!-- 转盘 -->
			<lotteryTurntable :drawingList="drawingList" :rewardId="rewardId" :luckydrawPrice="luckydrawPrice" :luckydrawNum="luckydrawNum" @turntableStart="onClickLuckyDraw" @turntableEnd="onTurntableEnd" />

			<view class="luck-explain">
				<view class="explain-title"></view>
				<view class="explain-content">
					<view class="explain-index" v-for="(item,index) in drawingList" :key="index">
						<view>{{item.name}}</view>
						<view>{{item.gailv}}</view>
					</view>
				</view>
				<view class="explain-text">说明：每位用户每日可抽奖5次，每次抽奖消耗1000卡豆，奖品可再卡豆专区-奖品明细中查看。抽到实物将使用您的默认地址，请提前确认</view>
			</view>


			
		</view>
		<!-- 弹窗 -->
		<lotteryPopup :popupTitle="'抽奖成功'" :luckdrawReward="rewardId" :showLotteryPopup="showLotteryPopup" :luckyDrawName="luckyDrawName" :popupPic="popupPic" @cancelLotteryPopup="onClickCancelLotteryPopup" @popupBtn="onClickCancelLotteryPopup"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		drawingList:any = [];
		tipsData = []
		rewardId:any = 0;
		showLotteryPopup = false;
		luckyDrawName = '';
		popupPic = '';
		luckydrawPrice = 0;
		luckydrawNum = 0;
		luckydrawToken = '';
		// 轮播
		transitionIng = true;
		marginLeft = 0;
		recordWidth:any = 0;
		tipsWidth:any = 0;
		tipsInter:any;
		onLoad(query:any) {
			this.initEven()
		}
		onUnload(){
			if(this.luckydrawToken!=''){
				app.http.Post('point/lottery/request/end',{lotteryToken:this.luckydrawToken},(res:any)=>{
					this.luckydrawToken = ''
				})
			}
		}
		initEven(){
			app.http.Get('dataApi/point/lottery/index',{},(res:any)=>{
				this.tipsData = res.historyList
				this.luckydrawPrice = res.price;
				this.luckydrawNum = res.leftNum
				this.drawingList = res.awardList
				

				setTimeout(()=>{
					const seleQuery = uni.createSelectorQuery();
					seleQuery.select('.record').boundingClientRect(data => {
						this.recordWidth = data.width;
						console.log('recordWidth==',this.recordWidth)
					}).exec();
					seleQuery.select('.record-content').boundingClientRect(data => {
						this.tipsWidth = data.width;
						console.log('tipsWidth==',this.tipsWidth)
					}).exec();
					this.tipsInterval()
				},500)
			})
			
		}
		// 获取奖品index
		getLuckyDrawIndex(id:number){
			for(let i in this.drawingList){
				if(this.drawingList[i].id == id){
					return (Number(i)+1)
				}
			}
		}
		// 转盘开始
		onClickLuckyDraw(){
			app.http.Post('point/lottery/request/begin',{},(res:any)=>{
				
				this.rewardId = this.getLuckyDrawIndex(res.hitId);
				this.luckydrawToken = res.token;
			 	this.luckyDrawName = this.drawingList[this.rewardId-1].name;
			 	this.popupPic =  this.drawingList[this.rewardId-1].logo;
			})
			
		}
		// 转盘结束
		onTurntableEnd(){
			app.http.Post('point/lottery/request/end',{lotteryToken:this.luckydrawToken},(res:any)=>{
				this.luckydrawNum--;
				this.showLotteryPopup = true;
				this.luckydrawToken = ''
			})
		}
		onClickCancelLotteryPopup(){
			this.showLotteryPopup = false;
			this.rewardId = 0;
		}
		tipsInterval(){
			if(this.marginLeft<(this.recordWidth-this.tipsWidth)){
				return
			}
			this.tipsInter=setInterval(()=>{
				if(this.marginLeft>(this.recordWidth-this.tipsWidth)){
					this.transitionIng = true
					this.marginLeft --;
				}else{
					this.transitionIng = false
					this.marginLeft = 30
				}
			},50);
			
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#F2F2F2
	}
	.content{
		width: 100%;
		box-sizing: border-box;
		position: relative;
		padding:339rpx 0 0 0 ;
	}
	.luck-bg{
		width: 100%;
		height:1002rpx;
		background:url(../static/sign/luck_bg.jpg) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left:0;
		top:0;
		z-index: 0;
	}
	.luck-content{
		width: 100%;
		box-sizing: border-box;
		position: relative;
		z-index: 1;
	}
	.record{
		width: 750rpx;
		height: 59rpx;
		overflow: hidden;
		box-sizing: border-box;
		position: relative;
		margin-bottom: 30rpx;
		&-content{
			width: max-content;
			height:59rpx;
			position: absolute;
			left:0;
			top:0;
			display: flex;
		}
		&-index{
			height: 59rpx;
			line-height: 59rpx;
			box-sizing: border-box;
			padding:0 29rpx;
			display: flex;
			align-items: center;
			font-size: 22rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			display: inline-block;
		}
	}
	.transition-ing{
		transition: all 0.2s linear;
	}
	.luck-explain{
		width: 710rpx;
		border-radius: 20rpx;
		background:#fff;
		margin:20rpx auto;
		box-sizing: border-box;
		padding:30rpx 15rpx;
	}
	.explain-title{
		width: 559rpx;
		height:31rpx;
		background:url(../static/sign/luck_title.png) no-repeat center;
		background-size: 100% 100%;
		margin:0 auto;
		margin-bottom: 49rpx;
	}
	.explain-content{
		width: 680rpx;
		padding:0 15rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		border-bottom: 1rpx solid #E8E8E8;
		padding-bottom: 30rpx;
	}
	.explain-index{
		width: 310rpx;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #4A4A4A;
		margin-bottom: 15rpx;
	}
	.explain-text{
		width: 100%;
		box-sizing: border-box;
		padding:0 15rpx;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #4A4A4A;
		line-height: 48rpx;
		margin-top: 20rpx;
	}
</style>
