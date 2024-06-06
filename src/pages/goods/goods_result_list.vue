<template>
	<view class="content">
		<view class="header-banner">
			<statusbar />
			<view class="tab-header">
				<view class="icon-back" @click="navigateBack()">
					<image style="width:19rpx;height:35rpx" src="@/static/index/v3/icon_back.png"/>
				</view>
				<view v-for="(item,index) in tabList" :key="index" :class="chooseId==index?'header-title':'header-title2'" @click="onClickTab(index)" :style="{marginLeft:index==1?'112rpx':''}">{{item}}
					<view class="cross-line-down" v-if="chooseId==index" />
				</view>
				<view v-if="hasRandom" class="random-tab" @click="onClickRandomMx">剩余组明细</view>
			</view>
		</view>
		<view style="padding-top:116rpx">
			<statusbar />
		</view>

		<view class="tab-header">
			<view class="header-search">
				<view class="search-icon"></view>
				<input class="search-input" type="text" placeholder-style="color:#AAAABB" v-model="searchQ" placeholder="搜索"  @confirm="reqSearchList()" confirm-type="search" />
			</view>
		</view>
		
		<view class="result-index">
			<view v-if="teamDataList.length==0" class="empty">暂无数据</view>
			<view class="card-index" v-for="(item,index) in teamDataList" :key="index">
				<view class="left" :style="{width:chooseId==0?'100%':''}">
					<view class="title">
						<muqian-lazyLoad class="title-img" :src="item.avatar!=''?getGoodsImg(decodeURIComponent(item.avatar)):defaultAvatar" mode="aspectFit" :borderRadius="'50%'" @click="goPersonHome(item.userId,item.anonymous)"></muqian-lazyLoad>
						<text @click="goPersonHome(item.userId,item.anonymous)">{{item.userName}}</text>
						<medalIcon v-if="!item.anonymous && item.medal" :src="item.medal.pic" :userId="item.userId"/>
					</view>
					<view class="desc">{{item.no}}</view>
					<view class="time">{{$u.timeFormat(item.time,'yyyy-mm-dd hh:MM:ss')}}</view>
				</view>

				<view class="right" v-show="chooseId==1"><muqian-lazyLoad class="right-img" :src="replacePic(getGoodsImg(decodeURIComponent(item.pic)))"  @click="onClickPreviewCard(decodeURIComponent(item.pic))" mode="aspectFit"></muqian-lazyLoad></view>
			</view>
		</view>


		<view class="payment" v-show="showRulePopup">
		<view class="payment-showdow"></view>
			<view class="rules-popup" >
				<view class="popup-title">剩余组明细</view>
				<view class="popup-scllor">
					<view class="popup-rules" v-for="(item,index) in randomList" :key="index">{{index+1}}.{{item.name}}</view>
				</view>
				<view class="popup-close" @click="showRulePopup = false"></view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import { getGoodsImg, parsePic } from "../../tools/util";
	import { anonymousInfo } from "./manager/detailsManager"
	const Tab = {
		0:'拼团结果',
		1:'拆卡报告'
	}
	const ListParams = {
		pageIndex:1,
		pageSize:10,
	}
	class CardParams {
		fromId = 0;
		fetchSize = 10;
		remainNum = -1;
	}
	@Component({})
	export default class ClassName extends BaseNode {
		navigateBack = app.navigateTo.navigateBack;
		parsePic = parsePic;
		getGoodsImg = getGoodsImg;
		goPersonHome = app.navigateTo.goPersonHome;
		defaultAvatar = app.defaultAvatar;
		tabList = Tab;
		chooseId = 0;
		goodCode = '';
		teamDataList:any = [];
		listParams = {...ListParams};
		searchQ = '';
		noMore = false;
		hasRandom = false;
		showRulePopup = false;
		randomList:any = [];
		cardNoParams = new CardParams();
		onLoad(query: any) {
			if (query.chooseIds) {
				this.chooseId = query.chooseIds;
				this.goodCode = query.code
				if(query.random == 'true'){
					app.http.Get('dataApi/good/'+this.goodCode+'/select/hasRandom',{},(res:any)=>{
						this.hasRandom = res.has;
					})
				}
				this.getList()
			}
		}
		//   加载更多数据
		onReachBottom() {
			this.getList()
		}
		getList(){
			if(this.noMore) return;
			if(this.chooseId!=0){
				this.getResult()
			}else{
				this.getCardNo()
			}
		}
		getCardNo(){
			const { cardNoParams } = this;
			app.http.GetWithCrypto(`dataApi/good/${this.goodCode}/result`,{...cardNoParams,q:this.searchQ},(res:any)=>{
				if(res.list){
					const list = res.list.map(({anonymous,dicKey,...rest}:any)=>{
						const userData = anonymous ? anonymousInfo : res.dic[dicKey];
						return {...rest,anonymous,...userData}
					})
					this.teamDataList = this.teamDataList.concat(list)
				}
				this.noMore = res.isFetchEnd;
				cardNoParams.fromId = this.teamDataList[this.teamDataList.length-1].id;
				cardNoParams.remainNum = res.remainNum || -1
			})
		}
		getResult(){
			const { listParams } = this;
			app.http.GetWithCrypto(`dataApi/good/${this.goodCode}/cardNoResult`,{...listParams,q:this.searchQ},(res:any)=>{
				if(res.list){
					const list = res.list.map(({anonymous,userName,...rest}:any)=>{
						return {...rest,userName:anonymous?"匿名用户":userName}
					})
					this.teamDataList = this.teamDataList.concat(list)
				}
				if(listParams.pageIndex>=res.totalPage){
					this.noMore = true
				}
				listParams.pageIndex++;
			})
		}
		resetList(){
			this.listParams = {...ListParams};
			this.cardNoParams = new CardParams();
			this.noMore = false;
			this.teamDataList = [];
		}
		reqSearchList(){
			this.resetList();
			this.getList()
		}
		onClickTab(index:number) {
			this.chooseId = index;
			this.reqSearchList()
		}
		onClickRandomMx(){
			if(this.randomList == ''){
				app.http.Get('dataApi/good/'+this.goodCode+'/select/randomNo',{},(res:any)=>{
					this.randomList = res.list;
					this.showRulePopup = true;
				})
			}else{
				this.showRulePopup = true;
			}
		}
		onClickPreviewCard(pic:any){
			const urls = pic.split(',').map( (x:any) => parsePic(x))
			uni.previewImage({ urls });
		}
		replacePic(str:string){
			return str.indexOf('#thumb') == -1 ? str : str.replace('#thumb','.thumb')
		}
	}
</script>

<style lang="scss">
	$font-22:22rpx;
	$font-24:24rpx;
	$font-32:32rpx;

	.header-banner {
		width: 100%;
		background: #fff;
		position: fixed;
		left: 0;
		top: 0;
		box-sizing: border-box;
		z-index: 10;

		.tab-header {
			width: 100%;
			height: 88rpx;
			display: flex;
			box-sizing: border-box;
			padding: 0 30rpx;
			position: relative;
			z-index: 10;
			align-items: center;
			justify-content: center;
		}

		.icon-back {
			width: 80rpx;
			height: 88rpx;
			position: absolute;
			left: 0;
			top: 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.header-title {
			font-size: $font-32;
			
			font-weight: 600;
			color: #14151A;
			line-height: 88rpx;

			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.cross-line-down {
			width: 28rpx;
			height: 6rpx;
			background: #14151A;
			border-radius: 3rpx;
		}

		.header-title2 {
			font-size: $font-32;
			
			font-weight: 400;
			color: #A9ABB4;
			line-height: 88rpx;

			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}

	.tab-header {
		width: 100%;
		height: 104rpx;

		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 20rpx;
		z-index: 10;
	}
	.random-tab{
		height:40rpx;
		line-height: 40rpx;
		font-size: 20rpx;
		position:absolute;
		right:20rpx;
		top:50%;
		margin-top: -20rpx;
		color:#14151A
	}
	.item-content {
		width: 710rpx;
		height: 60rpx;
		background: #FB4E3E;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.title-middle {
		font-size: $font-22;
		
		font-weight: 500;
		color: #FFFFFF;
		line-height: 32rpx;
	}

	.title-middle-pin {
		width: 710rpx;
		background: #F6F6F7;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;

		font-size: $font-24;
		
		font-weight: 600;
		color: #14151A;
		line-height: 34rpx;
	}

	.title-middle-pin2 {
		width: 710rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;

		font-size: $font-24;
		
		font-weight: 600;
		color: #14151A;
		line-height: 34rpx;
	}

	.text-name {
		text-align: center;
		padding-left: 52rpx;
		padding-right: 44rpx;
	}

	.text-name2 {
		width: 55%;
		text-align: center;
		margin-left: 38rpx;
		margin-right: 36rpx;
		padding:10rpx 0;
		box-sizing: border-box;
	}

	.text-name3 {
		width: 20%;
		text-align: center;
	}

	.item-bh {
		width: 190rpx;
		text-align: center;
		margin-left: 28rpx;
		margin-right: 20rpx;
	}

	.item-name {
		width: 72rpx;
		text-align: center;
		margin-left: 38rpx;
	}

	.item-time {
		width: 122rpx;
		text-align: center;
		margin-right: 72rpx;
	}

	.title-middle-chai {
		width: 710rpx;
		background: #F6F6F7;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;

		font-size: $font-24;
		
		font-weight: 600;
		color: #14151A;
		line-height: 34rpx;
		box-sizing: border-box;
		padding:10rpx 0
	}

	.title-middle-chai2 {
		width: 710rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;

		font-size: $font-24;
		
		font-weight: 600;
		color: #14151A;
		line-height: 34rpx;
		box-sizing: border-box;
		padding:10rpx 0
	}
	.empty{
		width: 100%;
		text-align: center;
		color:#bbb;
		font-size: 20rpx;
		margin-top: 20rpx;
	}
	.tab-header{
		width: 100%;
		height:104rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 20rpx;
		z-index: 9;
		align-items: center;
		justify-content: space-between;
	}
	.header-search{
		width: 710rpx;
		height:64rpx;
		overflow: hidden;
		background: #F5F5F8;
		border-radius: 4rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		position: relative;
		padding-left:28rpx ;
		border-radius: 29rpx;
	}
	.search-input{
		width: 634rpx;
		height:64rpx;
		background: #F5F5F8;
		border-radius: 4rpx;
		font-size: 24rpx;
		
		font-weight: 500;
		color: #14151A;
		
	}
	.search-icon{
		width: 28rpx;
		height:28rpx;
		background:url(../../static/index/sousuo@2x.png) no-repeat center;
		background-size:100% 100%;
		margin-right: 20rpx;
	}

	.card-index{
		width: 710rpx;
		background:url(../../static/userinfo/NUMBER@2x.png) no-repeat center;
		background-size: 100% 100%;
		margin-bottom: 20rpx;
		border-radius: 4rpx;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		.left{
			width: 538rpx;
			box-sizing: border-box;
			padding:20rpx 22rpx 20rpx 32rpx;
			.title{
				font-size: 24rpx;
				
				font-weight: 400;
				color: #7F7F8E;
				margin-bottom: 8rpx;
				display: flex;
				align-items: center;
				.title-img{
					width: 40rpx;
					height:40rpx;
					border-radius: 50%;
					margin-right: 10rpx;
				}
			}
			.desc{
				font-size: 24rpx;
				
				font-weight: 600;
				color: #14151A;
				line-height: 34rpx;
				margin-bottom: 8rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.time{
				font-size: 24rpx;
				
				font-weight: 400;
				color: #AAAABB;
			}
		}
		.right{
			width: 172rpx;
			height: 192rpx;
			background: linear-gradient(180deg, #E6E6E6 0%, #FFFFFF 100%);
			border-radius: 4rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			
			font-weight: 600;
			color: #828292;
			.right-img{
				width: 100%;
				height:100%
			}
		}
		.state1{
			background: linear-gradient(180deg, #FFEDE2 0%, #FFFFFF 100%);
			color: #FE7348;
		}
		.state2{
			background: linear-gradient(180deg, #FFF7E4 0%, #FFFFFF 100%);
			color: #EBBF7C;
		}
	}
	.result-index{
		width: 100%;
		box-sizing: border-box;
		background:#F5F5F8;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding-top: 20rpx;
	}

	.payment{
		width: 100%;
		box-sizing: border-box;
		&-showdow{
			width: 100%;
			height:100%;
			position: fixed;
			top:0;
			left:0;
			z-index:999;
			background: rgba(0, 0, 0, 0.5);
		}
		&-popup{
			width:540rpx;
			height:530rpx;
			position: fixed;
			box-sizing: border-box;
			background:#fff;
			border-radius: 40rpx;
			z-index: 1000;
			left:50%;
			top:50%;
			margin-left: -270rpx;
			margin-top: -300rpx;
			padding-top: 50rpx;
			
			.popup-close{
				width: 52rpx;
				height:52rpx;
				position: absolute;
				right:0;
				top:-94rpx;
				background:url(../act/static/invite/close.png) no-repeat center;
				background-size: 100% 100%;
			}
		}
		
		
	}
	.popup-title{
		width: 100%;
		margin-bottom: 80rpx;
		text-align: center;
		font-size: 34rpx;
		
		font-weight: bold;
		color: #34363A;
	}
	.popup-msg{
		width: 100%;
		box-sizing: border-box;
		padding:0 50rpx;
		font-size: 28rpx;
		
		font-weight: 400;
		color: #34363A;
		line-height: 50rpx;
		text-align: center;
	}
	.popup-btn{
		width: 462rpx;
		height: 60rpx;
		background:#FB4E3E;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		bottom:63rpx;
		left:50%;
		margin-left:-231rpx;
		border-radius: 30rpx;
		font-size: 30rpx;
		
		font-weight: normal;
		color: #FFFFFF;
	}
	.popup-btn-success{
		background: #16D585;
	}
	.popup-wechat{
		width: 46rpx;
		height:37rpx;
		background:url(../../pages/act/static/invite/wechat.png) no-repeat center;
		background-size: 100% 100%;
		margin-right: 10rpx;
	}

	.rules-popup{
		width:680rpx;
		height:1005rpx;
		position: fixed;
		box-sizing: border-box;
		background:#fff;
		border-radius: 40rpx;
		z-index: 1000;
		left:50%;
		top:50%;
		margin-left: -340rpx;
		margin-top: -450rpx;
		padding: 50rpx 0;
		.popup-title{
			width: 100%;
			margin-bottom: 40rpx;
			text-align: center;
			font-size: 34rpx;
			
			font-weight: bold;
			color: #34363A;
		}
		.popup-close{
			width: 52rpx;
			height:52rpx;
			position: absolute;
			right:0;
			top:-94rpx;
			background:url(../act/static/invite/close.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
	.popup-scllor{
		width: 100%;
		height:800rpx;
		overflow: auto;
	}
	.rules-popup2{
		width:680rpx;
		height:485rpx;
		position: fixed;
		box-sizing: border-box;
		background:#fff;
		border-radius: 40rpx;
		z-index: 1000;
		left:50%;
		top:50%;
		margin-left: -340rpx;
		margin-top: -200rpx;
		padding-top: 50rpx;
		.popup-title{
			width: 100%;
			margin-bottom: 40rpx;
			text-align: center;
			font-size: 34rpx;
			
			font-weight: bold;
			color: #34363A;
		}
		.popup-close{
			width: 52rpx;
			height:52rpx;
			position: absolute;
			right:0;
			top:-94rpx;
			background:url(../act/static/invite/close.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
	.popup-rules{
		width: 90%;
		margin:0 auto;
		box-sizing: border-box;
		padding:20rpx 0;
		font-size: 26rpx;
		
		font-weight: 400;
		color: #34363A;
		line-height: 40rpx;
		border-bottom:1rpx solid #D6D6D6
	}
</style>
