<template>
	<view class="calendar-content" >
		<navigationShare :navigatetoTitle="'产品详情'" @navigateShare="onClickShare" @navigateBack="onClickBack"/>
		<view style="padding-top:88rpx">
			<statusbar/>
		</view>
		<!-- 商品图片 -->
		<view class="pic-content">
			<swiper class="swiper" :indicator-dots="goodsImg.length>1" autoplay="true" circular="true" indicator-active-color="#ffffff">
				<swiper-item v-for="(item,index) in goodsImg" :key="index" @click="onClickPreviewImage(index)">
					<view class="goods-img-content">
						<image class="goods-img" :src="decodeURIComponent(item)" mode="aspectFill" />
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="goods-header">
			<view class="goods-header-title">{{goodsData.title}}</view>
			<view class="goods-header-little">{{goodsData.title_little}}</view>
			<view class="goods-header-time">预计发售:{{dateFormatYMSCustom(goodsData.public_day,'/')}}</view>
			<view class="likes-icon" :class="isLikes?'goods-right-like-current':'goods-right-like'" @click="onClickLikeCalendar"></view>
		</view>
		
		<view class="goods-box box-scroll" v-if="goodsData.goodList!=null">
			<view class="goods-box-title">在售产品</view>
			<view class="goods-card-content">
				<scroll-view class="goods-card-content-scroll" :scroll-x="true">
					<view class="scroll-index" v-for="(item,index) in goodsData.goodList" :key="index" @click="onClickGoGood(item.goodCode)">
						<image :lazy-load="true" class="scroll-index-img" :src="decodeURIComponent(item.pic)" mode="aspectFill"/>
						<view class="scroll-plan"><view class="scroll-nowplan" :style="'width:'+getPlan(item.currentNum,item.lockNum,item.totalNum)+'%'"></view></view>
						<view class="scroll-price">￥{{item.price}}</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<view class="goods-box">
			<view class="goods-box-title">产品介绍</view>
			<view class="desc-box" v-html="decodeURIComponent(goodsData.content)"></view>
			<view class="goods-box-img" v-for="(item,index) in goodsContentPic" :key="index">
				<image class="goods-box-img"  :src="decodeURIComponent(item)" mode="widthFix" @click="onClickPreviewContentImage(index)" />
			</view>
		</view>

		<share :operationShow="operationShow" :operationData="operationData" @operacancel="onClickShareCancel" @operaclick="onClcikShareConfirm"></share>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import { dateFormatYMSCustom } from "../../../tools/util"
	@Component({})
	export default class ClassName extends BaseNode {
		dateFormatYMSCustom = dateFormatYMSCustom
		goodsId = 0
		goodsImg:any = [];
		goodsData:any = {};
		goodsContentPic:any = [];
		isLikes = false;

		// 分享
		operationShow=false;
		operationData = [
			{id:0,img:'/static/share/weixin@2x.png',text:'微信好友'},
			{id:1,img:'/static/share/pyq@2x.png',text:'朋友圈'},
			{id:2,img:'/static/share/lianjie@2x.png',text:'分享链接'},
		];
		operationCardShow=false;
		sceneStr = [
			{scene:'WXSceneSession',text:'分享到聊天界面'},
			{scene:'WXSenceTimeline',text:'分享到朋友圈'}
		];
		onLoad(query:any) {
			this.goodsId = query.id;
			this.isLikes = query.like=='true'?true:false;
			this.getGoodData(this.goodsId)
		}
		onShow(){
			
		}
		onHide(){
			
		}
		onClickBack(){
			uni.navigateBack({
				delta: 1
			});
		}
		// 分享
		onClickShare(){
			if(!this.operationShow){
				this.operationShow = true
			}
		}
		onClickShareCancel(){
			this.operationShow = false
		}
		onClcikShareConfirm(id:any){
			let url = "https://www.ka-world.com/share/h5/index.html#/pages/calendar/goods_details?id="+this.goodsId
			if(id==2){
				uni.setClipboardData({
					data: url,
					showToast:false,
					success: ()=> {
						this.operationShow = false;
						uni.showToast({
							title:'复制成功',
							icon:'none'
						})
					}
				});
			}else{
				uni.showLoading({
					title: '加载中'
				});
				setTimeout(function () {
					uni.hideLoading();
				}, 2000);
				let scene = this.sceneStr[id].scene;
				uni.share({
					provider: "weixin",
					scene: scene,
					type: 0,
					href: url,
					title: this.goodsData.title,
					summary: this.goodsData.title,
					imageUrl: this.goodsData.thumb_pic,
					success: (res)=> {
						this.operationShow = false
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			}
		}
		// 数据详情赋值
		getGoodData(id:any){
			app.http.Get('function/calendar/detail/'+id,{},(res:any)=>{
				this.goodsImg = []
				for(let i in res.data.pics){
					this.goodsImg.push(decodeURIComponent(res.data.pics[i]))
				}
				this.goodsContentPic = [];
				if(res.data.content_pics!=''){
					for(let i in res.data.content_pics){
						this.goodsContentPic.push(decodeURIComponent(res.data.content_pics[i]))
					}
				}
				this.goodsData = res.data;
			})
		}
		// 点赞
		onClickLikeCalendar(){
			app.http.Post('function/calendar/like/'+this.goodsId,{},(res:any)=>{
				this.isLikes = res.data.liked;
				uni.$emit('detailLike',res.data.liked)
			})
		}
		// 观看大图
		onClickPreviewImage(index:number){
			uni.previewImage({
				urls: this.goodsImg,
				current:index,
				indicator: "number" 
			});
		}
		onClickPreviewContentImage(index:number){
			uni.previewImage({
				urls: this.goodsContentPic,
				current:index,
				indicator: "number" 
			});
		}
		getPlan(now:number,lock:number,total:number){
			return Math.floor(((now+lock)/total)*100)
		}
		onClickGoGood(code:string){
			uni.navigateTo({
				url: '/pages/goods/goods_details?id='+code
			})
		}
		
	}
</script>
	
<style lang="scss">

	.calendar-content{
		width: 750rpx;
		box-sizing: border-box;
		// background:#F2F2F2
	}
	
	
	.pic-content{
		width: 750rpx;
		height:630rpx;
		box-sizing: border-box;
	}
	.swiper{
		width: 750rpx;
		height:630rpx;
		background:#F5F5F9;
	}
	.goods-img-content{
		width: 750rpx;
		height:630rpx;
		background:#F5F5F9;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.goods-img{
		width: 750rpx;
		height: 630rpx;
	}
	.goods-header{
		width:700rpx;
		box-sizing: border-box;
		padding:30rpx 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin:0 auto;
		border-bottom:1rpx solid #F2F2F2;
		margin-bottom:30rpx;
		position: relative;
	}
	.goods-header-title{
		width: 100%;
		text-align: left;
		font-size: 36rpx;
		font-weight: bold;
		color: #000;
		line-height: 48rpx;
		margin-bottom:28rpx
	}
	.goods-header-little{
		width: 100%;
		height:38rpx;
		text-align: left;
		font-size: 28rpx;
		font-weight: 400;
		color: #666666;
		margin-bottom: 15rpx;
	}
	.goods-header-time{
		width: 100%;
		height:32rpx;
		text-align: left;
		font-size: 28rpx;
		font-weight: 400;
		color: #FB4E3E;
	}
	
	.goods-box-title{
		width: 100%;
		box-sizing: border-box;
		padding-left: 25rpx;
		font-size: 34rpx;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #000;
		margin-bottom:20rpx
	}
	.goods-card-content{
		width: 100%;
		box-sizing: border-box;
		padding:0 25rpx;
	}
	.goods-card{
		&-content{
			width: 100%;
			height:300rpx;
			overflow: hidden;
			&-scroll{
				width: 100%;
				height:300rpx;
				display: flex;
				white-space: nowrap;
			}
			.scroll-index{
				width: 200rpx;
				height:300rpx;
				background:#FFF;
				margin-right: 20rpx;
				overflow: hidden;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				flex-wrap: wrap;
				&-img{
					width: 200rpx;
					height:200rpx;
					border-radius: 12rpx;
				}
			}
		}
		
	}
	.box-scroll{
		margin-bottom:15rpx
	}
	.scroll-plan{
		width: 200rpx;
		height: 12rpx;
		background: #FEE5E3;
		border-radius: 6rpx;
		overflow: hidden;
	}
	.scroll-nowplan{
		width: 0%;
		height: 12rpx;
		background: #FF504F;
		border-radius: 6rpx;
	}
	.scroll-price{
		width: 100%;
		font-size: 32rpx;
		font-family: Adobe Fan Heiti Std;
		font-weight: normal;
		color: #3A3A3A;
	}
	.desc-box{
		width:100%;
		box-sizing: border-box;
		padding:0 25rpx 30rpx 25rpx;

	}
	.goods-box-img{
		width: 700rpx;
		margin:0 auto;
	}
	::v-deep img{
		max-width:700rpx !important;
		height:auto;
	}
	::v-deep h2{
		line-height: 60rpx;
		font-size: 30rpx;
	}
	::v-deep h3{
		line-height: 60rpx;
		font-size: 30rpx;
	}
	.likes-icon{
		position: absolute;
		bottom:75rpx;
		right:0;
	}
	.goods-right-like{
		width: 33rpx;
		height:29rpx;
		background:url(../static/pingtai/like.png) no-repeat center;
		background-size: 100% 100%;
	}
	.goods-right-like-current{
		width: 33rpx;
		height:29rpx;
		background:url(../static/pingtai/like_.png) no-repeat center;
		background-size: 100% 100%;
	}
</style>
