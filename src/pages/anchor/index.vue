<template>
	<view class="content">
		<!-- 顶部导航 -->
		<view class="anchor-navigation">
			<view class="navigation-merchant">
				<view class="avatar-bg">
					<muqian-lazyLoad class="avatar" :src="decodeURIComponent(merchantData.logo)" borderRadius="50%"  />
				</view>
				{{merchantData.merchant}}
			</view>
			<view class="navigation-title">商品列表</view>
			<view class="navigation-back" @click="onClickBack()">
				<text class="back-tips">THE CARDS WORLD</text>
				<text class="back-text">退出</text>
			</view>
		</view>
		
		<view class="anchor-center">
			<scroll-view class="goods-scroll" :scroll-x="true" @scrolltolower='listScrolltolower'>
				<view class="goods-scroll-index" v-for="(item,index) in merchantData.list" :key="index" @click="onClickGoDetail(item)">
					<view class="goods-title">{{item.title}}</view>
					<view class="goods-pic-box">
						<muqian-lazyLoad class="goods-pic" :src="decodeURIComponent(item.pic)" />
					</view>
					<view class="goods-pro">
						<view class="progress" :style="{'width':getProgress(item)+'%'}"></view>
						<view class="progress-q" :style="{'left':getProgress(item)+'%'}">
							<view class="progress-text">{{getProgress(item)}}<text>%</text></view>
						</view>
					</view>
					<view class="goods-info-box">
						<view class="info-type">{{getGoodsPintuan(item.pintuanType)}}</view>
						<view class="info-type info-num">{{item.specName}}</view>
						<view class="info-waitnum">{{item.waitCuoka}}</view>
					</view>
				</view>
			</scroll-view>
		</view>

		<anchorDetail :detailData="detailData" @detailClose="onClickDetailClose" @rubCard="rubCardShow=true"/>
		<anchorRubCard :rubCardShow="rubCardShow" :detailData="detailData" @rubCardClose="rubCardShow=false" @releaseCuoka="getDetailData()"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { getGoodsPintuan } from "@/tools/switchUtil";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	const paramsInit = {
		pageIndex:1,
		pageSize:20,
		totalPage:2
	}
	@Component({})
	export default class ClassName extends BaseNode {
		getGoodsPintuan = getGoodsPintuan
		merchantData:{[x:string]:any} = {
			merchant:'',
			logo:'',
			list:[]
		}
		homeParams = {...paramsInit};
		detailData:any = {};
		intervalInit:any;
		rubCardShow = false
		onLoad(query:any) {
			// #ifdef APP-PLUS
			setTimeout(()=>{
				plus.navigator.setFullscreen(true);
				plus.screen.lockOrientation('landscape-primary')
			},1200)
			// #endif

			this.initEven()
			this.intervalInit = setInterval(()=>{
				this.getDetailData()
			},5000)
		}
		onUnload() {
			clearInterval(this.intervalInit)
			plus.screen.lockOrientation('portrait-primary');
			plus.navigator.setFullscreen(false);
		}
		initEven():void{
			let params = this.homeParams;
			app.http.Get('my/cuoka/home',params,(res:any)=>{
				for (const key in this.merchantData) {
					if (Object.prototype.hasOwnProperty.call(res, key)) {
						this.merchantData[key] = res[key];
					}
				}
				params.totalPage = res.totalPage
			})
		}
		getDetailData(cb?:Function){
			if(this.detailData.goodCode && this.detailData.goodCode!=''){
				app.http.Get(`my/cuoka/1/${this.detailData.goodCode}/detail`,{},(res:any)=>{
					this.detailData= res.data;
					cb && cb()
				})
			}
		}
		listScrolltolower():void{
			let params = this.homeParams;
			if (params.pageIndex < params.totalPage) {
				params.pageIndex += 1;
				this.initEven();
			}
		}
		onClickBack(){
			uni.navigateBack({
				delta:1
			})
		}
		onClickGoDetail(item:{[x:string]:any}):void{
			this.detailData.goodCode = item.goodCode;
			this.getDetailData()
		}
		onClickDetailClose(){
			this.detailData = {};
			this.homeParams = {...paramsInit}
			this.initEven();
		}
		getProgress(item:{[x:string]:any}):number{
			return Math.floor(((item.lockNum+item.currentNum)/item.totalNum) * 100)
		}
	}
</script>

<style lang="scss" scoped>
	.anchor-navigation{
		width: 100%;
		height:97rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		position: relative;
		.navigation-merchant{
			height:97rpx;
			display: flex;
			align-items: center;
			position: absolute;
			left:40rpx;
			top:0;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			.avatar-bg{
				width: 46rpx;
				height:46rpx;
				background: url(@/static/anchor/logo_bg.png) no-repeat center;
				background-size: 100% 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 17rpx;
				box-sizing: border-box;
				.avatar{
					width: 41rpx;
					height:41rpx
				}
			}
		}
		.navigation-title{
			font-size: 46rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 97rpx;
			text-shadow: 0rpx 0rpx 12rpx #050505;
		}
		.navigation-back{
			width: 525rpx;
			height:63rpx;
			background: url(@/static/anchor/back_bg.png) no-repeat center;
			background-size: 100% 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			right:17rpx;
			top:50%;
			margin-top: -31.5rpx;
			padding-top: 10rpx;
			.back-tips{
				font-size: 28rpx;
				font-family: Avenir;
				font-weight: normal;
				color: #FFFFFF;
				margin-right: 19rpx;
				margin-top: 5rpx;
			}
			.back-text{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				margin-left: 19rpx;
			}
		}
	}
	.content{
		width: 100%;
		height:750rpx;
		background:url(@/static/anchor/bg.png) no-repeat center;
		background-size: 100% 750rpx;
		position: fixed;
		left:0;
		top:0;
		right:0;
		display: block;
	}
	
	.anchor-center{
		width: 100%;
		height:617rpx;
		background:url(@/static/anchor/c_bg.png) no-repeat center;
		background-size: 100% 617rpx;
		display: flex;
		position: relative;
		box-sizing: border-box;
		align-items: center;
		.goods-scroll{
			width: 100%;
			height: 567rpx;
			display: flex;
			white-space: nowrap;
			align-items: center;
			&-index{
				width: 433rpx;
				height: 567rpx;
				margin-right: 18rpx;
				box-sizing: border-box;
				display: inline-block;
				background:url(@/static/anchor/list_good_bg.png) no-repeat center;
				background-size: 100% 100%;
				padding-top: 20rpx;
			}
			&-index:first-child{
				margin-left: 62rpx;
			}
			.goods-title{
				width: 345rpx;
				margin:0 auto;
				font-size: 29rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				line-height: 40rpx;
				word-break:break-all;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				white-space: break-spaces;
			}
			.goods-pic-box{
				width: 345rpx;
				height:266rpx;
				margin:0 auto;
				margin-top: 14rpx;
			}
			.goods-pic{
				width: inherit;
				height:inherit;
			}
			// 进度
			.goods-pro{
				width: 345rpx;
				height:40rpx;
				// background:#F6F7FB;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				margin:0 auto;
				margin-top: 22rpx;
				position: relative;
				margin-bottom: 34rpx;
				.progress{
					width: 0%;
					height:inherit;
					transition: all 0.3s linear;
					background:url(@/static/anchor/pro_j.png) no-repeat center;
				}
				.progress-q{
					width: 80rpx;
					height:63rpx;
					background:url(@/static/anchor/pro_q.png) no-repeat center;
					background-size: 100% 100%;
					box-sizing: border-box;
					position: absolute;
					top:50%;
					margin-top: -35rpx;
					left:0;
					margin-left: -50rpx;
					transition: all 0.3s linear;
					.progress-text{
						width: 50rpx;
						height:50rpx;
						position: absolute;
						right:-5rpx;
						bottom:2rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 23rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #FFFFFF;		
						box-sizing: border-box;				
					}
					.progress-text text{
						font-size: 15rpx;
					}
				}
			}
			// 
			.goods-info-box{
				width: 345rpx;
				height:52rpx;
				margin:0 auto;
				display: flex;
				align-items: center;
				position: relative;
				.info-type{
					height:inherit;
					box-sizing: border-box;
					background: #F19344;
					display: flex;
					align-items: center;
					justify-content: center;
					padding:0 14rpx;
					font-size: 27rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #EAEAEA;
				}
				.info-num{
					background:#F6C960;
					color:#333333;
					margin-left: 12rpx;
				}
				.info-waitnum{
					width: 38rpx;
					height: 38rpx;
					background: #EC5E58;
					border-radius: 50%;
					text-align: center;
					line-height: 38rpx;
					font-size: 27rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					position: absolute;
					right:0;
					bottom:0
				}
			}
		}
	}
</style>
