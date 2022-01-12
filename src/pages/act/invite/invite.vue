<template>
	<view class="content">
		<view class="header">
			<view class="rules" @click="onClickRules">规则</view>
		</view>
		<view class="record">
			<view class="record-content" :class="{'transition-ing':transitionIng}" :style="'transform:translateX('+marginLeft+'px)'">
				<view class="record-index" v-for="(item,index) in tipsData" :key="index">{{item}}刚刚免费上了1组</view>
			</view>
		</view>
		<view class="center">
			<!-- 邀请新人步骤图 -->
			<inviteStep />

			<!-- 正在进行 -->
			<view class="goodslist-ing" v-for="(item,index) in goodsIng" :key="index" v-show="goodsIng!=''">
				<view class="goodslist-ing-title">正在进行</view>
					<view class="goodslist-ing-content">
						<inviteGoods :goodsData="item" @send="onClickJumpGood"/>
						<view class="goodslist-bottom">
							<view class="invite-record" @click="onClickInviteRecord(item.goodCode)">
								<view class="my-num">已购得{{item.myNum}}组</view>
								<view class="record-text">邀请记录</view>
							</view>
							<view class="copy-btn" @click="onClickGetInviteKey(item.goodCode)">复制口令给新人</view>
						</view>
					</view>
			</view>

			<!-- 正在进行 -->
			<view class="goodslist-end"  v-show="goodsEnd!=''">
				<view class="end-banner"></view>
				<view class="end-content" v-for="(item,index) in goodsEnd" :key="index">
					<view class="goodslist-ing-title">已结束</view>
					<view class="goodslist-ing-content">
						<inviteGoods :goodsData="item"/>
						<view class="goodslist-bottom">
							<view class="invite-record" @click="onClickInviteRecord(item.goodCode)">
								<view class="my-num">已购得{{item.myNum}}组</view>
								<view class="record-text">邀请记录</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		

		<!-- 邀请新人活动弹窗 -->
		<invitePopup :showInvitePopup="showInvitePopup" :inviteResult="inviteResult" :rules="rules" :inviteResultStr="inviteResultStr" @cancelInvitePopup="onClickInvitePopupCancel" @popupBtn="onClickInvitePopupBtn"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		goodsIng:any = [];
		goodsEnd:any = [];
        currentPage = 1;
        pageSize = 20;
		noMoreData = false;
		tipsData:any = [];
		marginLeft = 0;
		recordWidth:any = 0;
		tipsWidth:any = 0;
		tipsInter:any;
		showInvitePopup = false;
		inviteResult = 0;
		rules = false;
		inviteResultStr = ''
		transitionIng = true;
		onLoad(query:any) {
			if(app.token.accessToken == ''){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}

			// 判断是否有邀请码
			if(app.requestKey!=''){
				app.platform.inviteRequestKey(app.requestKey,(res:any)=>{
					console.log('app.requestKeyres==',res)
					this.showInvitePopup = true;
					this.rules = false;
					this.inviteResult= res.result;
					this.inviteResultStr = res.errorMsg
					if(res.result==0){
						this.currentPage = 1;
						this.noMoreData = false;
						this.reqNewData()
					}
				})
			}
			this.reqNewData()

			// 10分钟记录缓存
			let inviteRecord = uni.getStorageSync('inviteRecord');
			let newDate:any = new Date();
			let dateParse = Date.parse(newDate)/1000;
			if( dateParse - inviteRecord.time <600){
				this.tipsData = inviteRecord.list
			}else{
				app.http.Get('activity/invite/recordlist',{},(res:any)=>{
					this.tipsData = res.list
					uni.setStorageSync('inviteRecord',{list:res.list,time:dateParse})
				})
			}
		}
		
        //   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		//   下拉刷新
		onPullDownRefresh(){
			this.currentPage = 1;
			this.noMoreData = false;
			this.reqNewData(()=>{
				setTimeout(()=>{
					uni.stopPullDownRefresh();
				},1000)
			})
		}
		destroyed(){
			clearInterval(this.tipsInter)
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			
			let params:{[x:string]:any} = {
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
			}
			app.http.Get('activity/invite/goodlist',params,(data:any)=>{
				console.log(data)
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(this.currentPage==1){
					this.goodsIng = [];
					this.goodsEnd = []
				}
				if(data.list){
					for(let i in data.list){
						if(data.list[i].state==1){
							this.goodsIng.push(data.list[i])
						}else{
							this.goodsEnd.push(data.list[i])
						}
					}
				}
				console.log(this.goodsIng)
				this.currentPage++;
				if(cb) cb()
				

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
			})
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
		
		// 获取邀请key
		onClickGetInviteKey(code:string){
			app.http.Post('activity/invite/getKey',{code:code},(res:any)=>{
				console.log('activity/invite/getKey=====',res);
				this.onClickCopyInviteKey(res.content)
			})
		}
		// 复制邀请key
		onClickCopyInviteKey(key:string){
			uni.setClipboardData({
				data: key,
				showToast:false,
				success: ()=> {
					this.showInvitePopup = true;
					this.rules = false;
					this.inviteResult = 668
				}
			});
		}
		onClickGetInviteList(code:string){
			app.http.Get('activity/invite/1/'+code+'/list',{},(res:any)=>{
				console.log('activity/invite/list=====',res);
			})
		}
		// 复制弹窗关闭
		onClickInvitePopupCancel(){
			this.showInvitePopup = false;
		}
		onClickInvitePopupBtn(){
			if(this.inviteResult==668){
				plus.runtime.openURL("weixin://");
			}
			this.showInvitePopup = false;
		}
		onClickRules(){
			this.showInvitePopup = true;
			this.rules = true;
			this.inviteResult=0
		}
		// 邀请记录
		onClickInviteRecord(code:string){
			uni.navigateTo({
				url: "/pages/act/invite/record?code="+code,
			})
		}
		onClickJumpGood(code:string){
			uni.navigateTo({
				url: '/pages/goods/goods_details?id='+code
			})
		}
		
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#D6E0FB
	}
	.content{
		width: 100%;
		box-sizing: border-box;
	}
	.header{
		width: 750rpx;
		height:438rpx;
		background:url(../static/invite/banner.jpg) no-repeat center;
		background-size: 100% 100%;
		position: relative;
		.rules{
			width: 86rpx;
			height: 30rpx;
			background: #6545CC;
			border-radius: 15rpx;
			font-size: 18rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			position: absolute;
			right:50rpx;
			top:11rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.record{
		width: 750rpx;
		height: 38rpx;
		background: #6545CC;
		overflow: hidden;
		box-sizing: border-box;
		position: relative;
		&-content{
			width: max-content;
			height:38rpx;
			position: absolute;
			left:0;
			top:0;
			display: flex;
		}
		&-index{
			height: 38rpx;
			line-height: 38rpx;
			box-sizing: border-box;
			padding:0 29rpx;
			display: flex;
			align-items: center;
			font-size: 20rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #FFFFFF;
			display: inline-block;
		}
	}
	.transition-ing{
		transition: all 0.2s linear;
	}
	.center{
		width: 100%;
		box-sizing: border-box;
		padding:25rpx;
		background:#D6E0FB
	}
	.goodslist-ing{
		width: 701rpx;
		height:440rpx;
		background:url(../static/invite/bg1.png) no-repeat center;
		background-size: 100% 100%;
		box-sizing: border-box;
		margin:0 auto;
		margin-bottom: 20rpx;
		.goodslist-ing-title{
			width: 100%;
			height:70rpx;
			text-align: center;
			line-height: 70rpx;
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #FFFFFF;
		}
		.goodslist-ing-content{
			width: 673rpx;
			height: 356rpx;
			background: #FFFFFF;
			margin:0 auto;
			padding-top: 30rpx;
			box-sizing: border-box;

		}
	}
	.goodslist-bottom{
		width: 100%;
		height:66rpx;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.copy-btn{
		width: 310rpx;
		height:60rpx;
		background:url(../static/invite/btn.png) no-repeat center;
		background-size: 100% 100%;
		text-align: center;
		line-height: 60rpx;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		margin-left: 14rpx;
	}
	.invite-record{
		width: 308rpx;
		height: 58rpx;
		background: #FFFFFF;
		border: 1rpx solid #5F44C4;
		border-radius: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
	.my-num{
		width: 100%;
		text-align: center;
		font-size: 16rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #545659;
	}
	.record-text{
		width: 100%;
		text-align: center;
		font-size: 22rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #545659;
		margin-top: -5rpx;
	}
	.goodslist-end{
		width: 701rpx;
		box-sizing: border-box;
		margin:0 auto;
		border-radius: 10rpx;
		position: relative;
		background: linear-gradient(90deg, #a1a4d5, #878acb);
		padding-bottom: 20rpx;
	}
	.end-banner{
		width: 701rpx;
		height:426rpx;
		background:url(../static/invite/bg2.png) no-repeat center;
		background-size: 100% 100%;
		box-sizing: border-box;
		position: absolute;
		left:0;
		top:0;
		z-index: 0;
	}
	.end-content{
		width: 701rpx;
		position: relative;
		box-sizing: border-box;
		z-index:1;
		// margin-bottom: 20rpx;
		.goodslist-ing-title{
			width: 100%;
			height:70rpx;
			text-align: center;
			line-height: 70rpx;
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #FFFFFF;
		}
		.goodslist-ing-content{
			width: 673rpx;
			height: 356rpx;
			background: #FFFFFF;
			margin:0 auto;
			padding-top: 30rpx;
			box-sizing: border-box;

		}
		.invite-record{
			width: 624rpx;
			height: 58rpx;
			background: #FFFFFF;
			border: 1rpx solid #5F44C4;
			border-radius: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
		}
	}
</style>
