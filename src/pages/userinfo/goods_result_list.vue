<template>
	<view class="content">
		<view class="header-banner">
			<statusbar />
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack">
					<image style="width:19rpx;height:35rpx" src="@/static/index/v3/icon_back.png"/>
				</view>
				<view :class="chooseId==0?'header-title':'header-title2'" @click="onClickGroupBookingResult()">拼团结果
					<view class="cross-line-down" v-if="chooseId==0" />
				</view>
				<view :class="chooseId==0?'header-title2':'header-title'" style="margin-left: 112rpx;"
					@click="onClickSplitCardsReport()">拆卡报告
					<view class="cross-line-down" v-if="chooseId==1" />
				</view>
			</view>
		</view>
		<view style="padding-top:116rpx">
			<statusbar />
		</view>

		<view class="tab-header">
			<view class="header-search">
				<view class="search-icon"></view>
				<input class="search-input" type="text" placeholder-style="color:#AAAABB" v-model="searchTetxt" placeholder="搜索"  @confirm="onClickSearch(searchTetxt)" confirm-type="search" />
			</view>
		</view>

		<!-- 拼团结果 -->
		<view v-if="chooseId==0" class="result-index">
			<view v-if="teamDataList.length==0" class="empty">暂无数据</view>

			<view class="card-index" v-for="(item,index) in teamDataList" :key="index">
				<view class="left" style="width:100%">
					<view class="title"><muqian-lazyLoad class="title-img" :src="item.avatar!=''?getGoodsImg(decodeURIComponent(item.avatar)):defaultAvatar" mode="aspectFit" :borderRadius="'50%'"></muqian-lazyLoad> {{item.userName}}</view>
					<view class="desc">{{item.no}}</view>
					<view class="time">{{dateFormat(item.time)}}</view>
				</view>
			</view>
		</view>

		<!-- 拆卡报告 -->
		<view v-if="chooseId==1" class="result-index">
			
			<view v-if="teamDataList2.length==0" class="empty">暂无数据</view>
			<view v-for="(item,index) in teamDataList2" :key="index">
				<view class="card-title" v-if="item.isMy&&index==0">我的中卡</view>
				<view class="card-title" v-else-if="(index==0&&!item.isMy)||(!item.isMy&&teamDataList2[index-1].isMy)">其它中卡</view>
				<view class="card-index" >
					<view class="left">
						<view class="title"><muqian-lazyLoad class="title-img" :src="item.avatar!=''?getGoodsImg(decodeURIComponent(item.avatar)):defaultAvatar" mode="aspectFit" :borderRadius="'50%'"></muqian-lazyLoad> {{item.userName}}</view>
						<view class="desc">{{item.no}}</view>
						<view class="time">{{dateFormat(item.time)}}</view>
					</view>

					<view class="right"><muqian-lazyLoad class="right-img" :src="replacePic(getGoodsImg(decodeURIComponent(item.pic)))"  @click="onClickPreviewCard(decodeURIComponent(item.pic))" mode="aspectFit"></muqian-lazyLoad></view>
				</view>
			</view>
			
		</view>

	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import {
		Component
	} from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import {
		dateFormat,getGoodsImg, parsePic
	} from "../../tools/util";
	//@ts-ignore
	import KwwConfusion from "@/net/kwwConfusion.js"
	class CardParams {
		fromId = 0;
		fetchSize = 10;
		ts = 0;
		sn = ""
	}
	@Component({})
	export default class ClassName extends BaseNode {
		kwwConfusion = new KwwConfusion()
		defaultAvatar = app.defaultAvatar;
		chooseId = 0; //0代表选中拼团结果，展示下划线； 1代表选中拆卡报告，展示下划线 ；
		goodCode = '';
		orderCode = '';
		teamDataList:any = [];
		teamDataList2 = [];
		getGoodsImg = getGoodsImg;
		dateFormat = dateFormat;
		parsePic = parsePic;
		currentPage = 1;
		noMore = false;
		searchTetxt = "";
		cardNoParams = new CardParams();
		onLoad(query: any) {
			if (query.chooseIds) {
				this.chooseId = query.chooseIds;
				this.goodCode = query.code;
				this.orderCode = query.order;
				if(this.chooseId==0){
					this.getTpCardNo()
				}else{
					this.getTpCardNoResult()
				}
			}

		}
		//   加载更多数据
		onReachBottom() {
			if(this.chooseId==0){
				this.getTpCardNo()
			}else{
				this.getTpCardNoResult()
			}
		}
		getTpCardNo(){
			if(this.noMore){
				return;
			}
			const { cardNoParams } = this;
			const hash = this.kwwConfusion.goodsResultList(this.goodCode,cardNoParams.fromId)
			app.http.Get(`dataApi/good/${this.goodCode}/cardNo`,{...cardNoParams,q:this.searchTetxt,...hash},(res:any)=>{
				if(res.list){
					this.teamDataList = this.teamDataList.concat(res.list)
				}
				this.noMore = res.isFetchEnd;
				cardNoParams.fromId = this.teamDataList[this.teamDataList.length-1].id;
			})
		}
		getTpCardNoResult(){
			if(this.noMore){
				return;
			}
			let params = {
				q:this.searchTetxt,
				pageIndex:this.currentPage,
				pageSize:15
			}
			app.http.Get('me/orderInfo/buyer/'+this.orderCode+'/report',params,(res:any)=>{
				if(res.list){
					this.teamDataList2 = this.teamDataList2.concat(res.list)
				}else{
					this.noMore = true
				}
				if(res.list.length<15){
					this.noMore = true
				}
				this.currentPage++;
			})
		}
		onClickBack() {
			uni.navigateBack({
				delta: 1
			});
		}

		onClickGroupBookingResult() {
			this.resetInfo()
			this.chooseId = 0;
			this.getTpCardNo()
		}

		onClickSplitCardsReport() {
			this.resetInfo()
			this.chooseId = 1;
			this.getTpCardNoResult()
		}
		resetInfo(){
			this.currentPage = 1;
			this.noMore = false;
			this.teamDataList = [];
			this.teamDataList2 = [];
			this.cardNoParams = new CardParams();
		}
		onClickSearch(text:string){
			if(this.chooseId==0){
				// 拼团结果
				this.resetInfo()
				this.getTpCardNo()
			}else{
				// 拆卡报告
				this.resetInfo()
				this.getTpCardNoResult()
			}
		}
		replacePic(str:string){
			return str.indexOf('#thumb') == -1 ? str : str.replace('#thumb','.thumb')
		}
		onClickPreviewCard(pic:any){
			let url = pic.split(',')
			url = url.map((x:any)=>{
				return parsePic(x)
			})
			uni.previewImage({
				urls:url
			});
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
			font-family: PingFangSC-Medium, PingFang SC;
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
			font-family: PingFangSC-Regular, PingFang SC;
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

	.item-content {
		width: 710rpx;
		height: 60rpx;
		background: linear-gradient(90deg, #FD8339 0%, #F24B28 100%);
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.title-middle {
		font-size: $font-22;
		font-family: PingFangSC-Medium, PingFang SC;
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
		font-family: PingFangSC-Medium, PingFang SC;
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
		font-family: PingFangSC-Medium, PingFang SC;
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
		font-family: PingFangSC-Medium, PingFang SC;
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
		font-family: PingFangSC-Medium, PingFang SC;
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
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #14151A;
		border-radius: 29rpx;
		
	}
	.search-icon{
		width: 28rpx;
		height:28rpx;
		background:url(../../static/index/sousuo@2x.png) no-repeat center;
		background-size:100% 100%;
		margin-right: 20rpx;
	}
	.card-title{
		width: 100%;
		color: #14151A;
		font-size: 30rpx;
		font-weight: bold;
		box-sizing: border-box;
		margin-bottom: 20rpx;
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
				font-family: PingFangSC-Regular, PingFang SC;
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
				font-family: PingFangSC-Medium, PingFang SC;
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
				font-family: PingFangSC-Regular, PingFang SC;
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
			font-family: PingFangSC-Medium, PingFang SC;
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
</style>
