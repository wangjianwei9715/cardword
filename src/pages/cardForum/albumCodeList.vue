<template>
	<view class="album-code">
		<view class="navBar">
            <view :style="{ paddingTop: app.statusBarHeight + 'px', }"></view>
            <view class="nav">
                <view class="back" @click="goBack">
					<image src="@/static/drawCard/icon_step.png"></image>
				</view>
                <view @click="goPersonHome" style="display:flex">
                    <image :src="forumDetail.avatar ? $parsePic(decodeURIComponent(forumDetail.avatar)) : app.defaultAvatar"
                        class="topAvatar"></image>
                    <view class="topName u-line-1">{{ forumDetail.userName || "获取中" }}</view>
                </view>
                <view class="flex1"></view>
                <view class="follow flexCenter" v-if="!isPerson" :class="{ follow_dis: isFollow }" @click="onClickFollow">{{ isFollow ? '已关注' : '关注' }}</view>
                <u-icon name="share-square" color="#fff" size="28" @click="operationShow = true"></u-icon>
            </view>
        </view>
        <view style="height:88rpx" :style="{ paddingTop: app.statusBarHeight + 'px', }"></view>

		<share @report="pageJump(`/pages/cardForum/report?code=${code}&byInformer=${forumDetail.userId}&source=${forumDetail.tp == 3 ? 1 : 2}`)"
            :shareData="shareData" :report="true" :operationShow.sync="operationShow"></share>

		<view class="list" v-for="(item,index) in seriesList" :key="index">
			<view class="tips">{{item.name}}</view>
			<view class="card-box">
				<view class="card" v-for="(noItem,noIndex) in item.noList" :key="noIndex">
					<image v-if="noItem.frontPic" class="pic" mode="aspectFit" :src="$thumbnail(noItem.frontPic,400)" @click="onClickCardPic(index,noIndex)"/>
					<view v-else class="no-pic">暂未收集</view>
					<view class="player u-line-1">{{noItem.split?noItem.seqIndex+"/":""}}{{noItem.seq}}编 {{noItem.player}}</view>
					<view class="cardset u-line-2">
						<image v-if="noItem.cardSetLogo" class="logo" :src="decodeURIComponent(noItem.cardSetLogo)"/>
						{{noItem.cardSet}}
					</view>
				</view> 
			</view>
		</view>

		<cardPic :show.sync="showData.show" :current.sync="showData.current" :allNum="listParams.total" :list="codeList" @loadmore="loadmore"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import cardPic from '@/pages/illustration/components/cardPic.vue'
	import { followActionByUser, formatterNolist, ossStitching } from "./func";
	class ListParams {
		tp=0;
		fetchFrom=1;
		fetchSize=10;
		isFetchEnd=false;
		total=0;
	}
	@Component({
		components:{cardPic}
	})
	export default class ClassName extends BaseNode {
		app = app
		listParams = new ListParams();
		code = "";
		seriesList:any = [];
		codeList:any = [];
		forumDetail:any = {};
		operationShow = false;
		showData = {
			show:false,
			current:1
		}
		onLoad(query: any) {
			this.code = query.code;
			this.forumDetail = JSON.parse(query.forumDetail);

			this.getSeries()
		}
		//   加载更多数据
		onReachBottom() {
			this.getSeries() 
		}
		public get isPerson(): boolean {
			return (this.forumDetail.bit & 1) === 1
		}
		public get isFollow(): boolean {
			return (this.forumDetail.bit & 2) === 2
		}
		public get shareData() : any {
			const { title, content, url } = this.forumDetail;
			return {
                shareUrl: `share/${app.localTest ? 'testH5' : 'h5'}/#/pages/cardForum/detail?code=${this.code}`,
                title,
                summary: content ? (content.length > 20 ? content.substr(0, 20) + '...' : content) : "我发现了一篇精彩动态",
                //@ts-ignore
                thumb: ossStitching(this.$parsePic(decodeURIComponent(url)),`x-oss-process=image/resize,h_100,w_100`)
            }
		}
		formatterCodeList(addList:any[],dic:object){
			const list = formatterNolist(addList,dic);
			list.forEach((x:any,index:number)=>{
				if(index+1<list.length && list[index+1].code == x.code){
					x.split = true;
					list[index+1].split = true;
				}
				this.codeList.push(x)
				let hasSeries = this.seriesList.some((item:any)=>{
					if(item.seriesCode==x.series.code){
						item.noList.push(x)
						return true;
					}
				})
				if(!hasSeries){
					this.seriesList.push({seriesCode:x.series.code,name:x.series.name,noList:[x]})
				}
			});
		}
		goPersonHome() {
			uni.navigateTo({
				url: "/pages/cardForum/personHome?userId=" + this.forumDetail.userId
			})
		}
		pageJump(url: string) {
			uni.navigateTo({
				url,
			})
		}
		goBack() {
			app.platform.pageBack()
		}
		getSeries(cb?:Function){
			if(this.listParams.isFetchEnd) return;
			app.http.Get(`dataApi/cardIllustration/album/detail/${this.code}/nolist`,this.listParams,(res:any)=>{
				this.formatterCodeList(res.list,res.dic)
				this.listParams.fetchFrom += this.listParams.fetchSize;
				this.listParams.isFetchEnd = res.isFetchEnd;
				this.listParams.total = res.total
				cb?.()
			})
		}
		onClickFollow() {
			followActionByUser(this.forumDetail.userId, this.isFollow).then(() => {
				this.forumDetail.bit ^= 2;
			})
		}
		onClickCardPic(index:number,noIndex:number){
			let seriesNum = 0;
			this.seriesList.some((x:any,someIndex:number)=>{
				if(index>someIndex){
					seriesNum+= x.noList.length;
				}else{
					return true;
				}
			});
			this.showData = {
				show:true,
				current:(seriesNum+noIndex+1)
			}
		}
		loadmore(){
			this.getSeries(()=>{
				this.showData.current++;
				uni.hideLoading()
			})
		}
	}
</script>

<style lang="scss">
	page{
        background:#000000;
    }
	.album-code{
		.navBar {
			width: 750rpx;
			position: fixed;
			top: 0;
			z-index: 999;
			background-color: #000;

			.nav {
				box-sizing: border-box;
				padding:  0 26rpx 0 35rpx;
				display: flex;
				align-items: center;
				height: 88rpx;
			}

			.back {
				width: 64rpx;
				height: 55rpx;
				background-size: 100% 100%;
				// background-color: red;
				display: flex;
				align-items: center;
				image{
					width: 19rpx;
					height: 35rpx;
					transform: rotate(180deg)
				}
			}

			.topAvatar {
				width: 61rpx;
				height: 61rpx;
				border-radius: 50%;
				// margin-left: 50rpx;
				margin-right: 20rpx;
			}

			.topName {
				font-size: 27rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #fff;
				flex: 1;
				line-height: 61rpx;
			}
		}
		.flex1 {
			flex: 1;
		}
		.follow {
			width: 120rpx;
			height: 48rpx;
			background: #FA1545;
			border-radius: 3rpx;
			font-size: 28rpx;
			margin-right: 30rpx;
			font-family: PingFang SC;
			border-radius: 5rpx;
			font-weight: bold;
			color: #FFFFFF;
		}

		.follow_dis {
			color: #fff;
			background-color: #c9d0d7;
		}

		.list{
			width: 100%;
			.tips{
				width: 100%;
				background: #1A1A1A;
				font-size: 27rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #C0C0C0;
				padding:20rpx 24rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
			}
			.card-box{
				width: 100%;
				box-sizing: border-box;
				padding:20rpx 24rpx;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
			}
			.card{
				width: 341rpx;
				font-family: PingFang SC;
				margin-bottom: 20rpx;
				.pic{
					width: 341rpx;
					height:479rpx
				}
				.no-pic{
					width: 341rpx;
					height: 479rpx;
					background: #333333;
					border-radius: 3rpx 3rpx 0rpx 0rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 23rpx;
					color: #707070;
				}
				.player{
					width: 100%;
					box-sizing: border-box;
					padding:20rpx 20rpx 10rpx 20rpx;
					font-size: 25rpx;
					font-weight: 600;
					color: #FFFFFF;
				}
				.logo{
                    width: 67rpx;
                    height:28rpx;
                    margin-right: 6rpx;
					margin-bottom: -4rpx;
                }
				.cardset{
					width: 100%;
					box-sizing: border-box;
					padding:0 20rpx 10rpx 20rpx;
					font-size: 25rpx;
					color: #FFFFFF;
					line-height: 38rpx;
				}
			}
		}
	}
	
</style>
