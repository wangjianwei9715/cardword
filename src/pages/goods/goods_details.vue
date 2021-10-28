<template>
	<view class="content">
		<view class="header-banner">
			<statusbar/>
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
				<view class="header-title">商品详情</view>
				<view class="icon-share" @click="onClickShare"></view>
			</view>
		</view>
		<view style="padding-top:88rpx">
			<statusbar/>
		</view>
		<!-- 商品图片价格 -->
		<view class="pic-content">
			<swiper class="swiper" :indicator-dots="goodsImg.length>1" autoplay="true" circular="true" indicator-active-color="#ffffff">
				<swiper-item v-for="(item,index) in goodsImg" :key="index" @click="onClickPreviewImage(index)">
					<view class="goods-img-content">
						<image class="goods-img" :src="item" mode="aspectFit"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view :class="['header-content',{'header-content-end':goodsState!=1}]">
			<view class="header-price">¥<text>{{goodsData.price}}</text></view>
			<view class="header-right" v-if="goodsState==1">
				<view class="icon-end"></view>
				<view class="countdown-content">
					<view v-if="countDay>0" class="countdown-index">{{countDay}}</view>
					<view v-if="countDay>0" class="countdown-icon">天</view>
					<view class="countdown-index">{{countHour}}</view>
					<view class="countdown-icon">:</view>
					<view class="countdown-index">{{countMinute}}</view>
					<view class="countdown-icon">:</view>
					<view class="countdown-index">{{countSecond}}</view>
				</view>
			</view>
		</view>
		
		<view class="header">
			<!-- 头部详情 -->
			<view class="header-top">
				<view class="header-top-left">
					<view class="youhui"><view class="icon-tips" v-for="(item,index) in discountList" :key="index">{{item.content}}</view></view>
					<view class="header-top-left-title">{{goodsData.title}}</view>
				</view>
				<view class="header-top-right" @click="onClickFavor">
					<view :class="['icon-favor',{'icon-favored':favorType}]"></view>
					<view class="header-top-right-desc">收藏</view>
				</view>
			</view>
			<view class="header-center">
				<view class="header-center-top">余{{goodsData.totalNum-(goodsData.currentNum+goodsData.lockNum)}}/共{{goodsData.totalNum}}</view>
				<view class="header-center-plan"><plan :num_ex="(goodsData.currentNum+goodsData.lockNum)" :num_all="goodsData.totalNum"></plan></view>
				<view class="header-center-actor">
					<image class="header-center-actor-img" src="" mode="aspectFit"></image>
				</view>
			</view>
			<view class="header-bottom">
				<view class="header-bottom-index" v-for="item in goodsSpe" :key="item.id" @click="onClickCardPlay(item.id)">
					<view class="header-bottom-index-name">{{item.name}}</view>
					<view class="header-bottom-index-desc">{{item.desc}}<view v-if="item.id<=2" class="icon-tishi"></view></view>
				</view>
			</view>
			
		</view>
		<!-- 卡片展示 -->
		<view class="goods-card" >
			<view class="goods-card-title">
				<view class="goods-card-title-name">特色卡片</view>
				<view class="goods-card-title-more" @click="onClickAllCard">查看全部<view class="icon-right"></view></view>
			</view>
			<view class="goods-card-content">
				<scroll-view class="goods-card-content-scroll">
                    <view class="scroll-index" v-for="(item,index) in cardData" :key="index" @click="onClickPreviewCard(index)">
						<image class="scroll-index-img" :src="decodeURIComponent(item)" mode="aspectFit"></image>
					</view>
                </scroll-view>
			</view>
		</view>
		<!-- 卖家信息 -->
		<view class="goods-seller" v-if="goodsData.publisher">
			<view class="goods-seller-left">
				<image class="goods-seller-left-avatar" :src="goodsData.publisher.avatar!=''?decodeURIComponent(goodsData.publisher.avatar):defaultAvatar" mode="aspectFit"></image>
				<view class="goods-seller-left-desc">
					<view class="goods-seller-left-desc-name">{{goodsData.publisher.name}}</view>
					<view class="goods-seller-left-desc-tips">已拼团{{goodsData.publisher.deal}}组</view>
				</view>
			</view>
			<view class="goods-seller-right" @click="onClickShops">店铺</view>
		</view>
		<!-- 商品详情 -->
		<view class="goods-desc">
			<view class="goods-desc-title">商品详情</view>
			<view class="goods-desc-explain">
				<!-- <rich-text :nodes="goodsDesc"></rich-text> -->
				<view class='goods-desc-explain-text' v-for="item in goodsDesc" :key="item.id">
					<view class="explain-desc">{{item}}</view>
				</view>
			</view>
		</view>
		<!-- 直播可拖动控件 -->
		<movable-area class="movable-area" v-if="goodsState == 4">
			<movable-view class="movable-content" direction="all" x="530rpx" y="1000rpx">
				<livewicket :liveImg="liveImg" :liveStatus="liveStatus"></livewicket>
			</movable-view>
		</movable-area>
		<!-- 底部吐司 -->
		<!-- <tips :tipsData="tipsData" v-if="goodsState==1"></tips> -->
		<!-- 底部按钮 -->
		<view class="btn-content" v-if="goodsState==1||goodsState==0">
			<view class="btn-content-left">
				<view class="btn-content-left-index" v-for="item in tipBtn" :key="item.id">
					<image :class="'icon-'+item.class" :src="item.url" mode="aspectFit"></image>
					<view class="btn-content-left-index-name">{{item.name}}</view>
				</view>
			</view>
			<view class="btn-confirm" @click="onClickBuy()">立即购买</view>
		</view>
		<view class="btn-contented" v-else-if="goodsState>=2">
			<view class="btn-pt" @click="onClickResult(0)">拼团结果</view>
			<view class="btn-ck" @click="onClickResult(1)">拆卡报告</view>
		</view>

		<cardplay :operationShow="operationCardShow" @operacancel="onClickCardCancel" />
		<share :operationShow="operationShow" :operationData="operationData" @operacancel="onClickShareCancel" @operaclick="onClcikShareConfirm"></share>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import {getGoodsPintuan,getGoodsRandom} from '@/tools/switchUtil';
	import {dateFormat} from '@/tools/util';
	@Component({})
	export default class ClassName extends BaseNode {
		goodsState = 0;
		defaultAvatar = app.defaultAvatar
		goodsId = '';
		goodsImg:any = [];
		goodsData:{[x:string]:any} = [];
		countDay:any = '';
		countHour:any = '';
		countMinute:any = '';
		countSecond:any = '';
		count_down:any;
		countDown = 0;
		favorType = false;
		goodsSpe:{[x:string]:any} = {
			pintuan_type:{id:1,name:'',desc:'拼团形式'},
			random_type:{id:2,name:'',desc:'随机方式'},
			spec:{id:3,name:'',desc:'拼团规格'},
			spec_str:{id:4,name:'',desc:'商品数量'}
		};
		goodsDesc:{[x:string]:any} = [];
		cardData:any = [];
		tipBtn:{[x:string]:any}=[
			{id:1,name:'客服',url:'../../static/goods/kefu@2x.png',class:'kf'},
			{id:2,name:'直播提醒',url:'../../static/goods/zhibotixing@2x.png',class:'tx'}
		];
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
		tipsData:{[x:string]:any} = [
			{img:'',desc:'1分钟前加入拼团*30'},
			{img:'',desc:'1分钟前加入拼团*30'},
			{img:'',desc:'1分钟前加入拼团*30'}
		];
		discountList:any = [];
		liveImg = '../../static/goods/.png';
		liveStatus = '直播回放'
		onLoad(query:any) {
			this.goodsId = query.id;
			this.getGoodData(this.goodsId)
		}
		// 数据详情赋值
		getGoodData(id:any){
			setTimeout(()=>{
				app.http.Get('dataApi/good/'+id,{},(data:any)=>{
					// 是否收藏
					this.favorType = data.favorite<=0?false:true;
					// 数据详情
					this.goodsData = data.good;
					// 状态
					this.goodsState = data.good.state;
					// 倒计时
					this.countDown = data.good.leftsec;
					// 获取优惠标签
					this.discountList= data.good.discount?data.good.discount:'';
					// 获取商品图片
					this.getGoodsImage(decodeURIComponent(this.goodsData.pic.carousel));
					this.getCardImage(decodeURIComponent(this.goodsData.pic.feature))
					// 倒计时
					this.getCountDown();
					// 商品规格、配置、形式、
					this.getGoodsSpe();
					let newData = decodeURIComponent(data.good.desc).split('\r');
					this.goodsDesc = newData
				})
			},200)
			
		}
		// 商品图片
		getGoodsImage(img:any){
			console.log('img',img)
			if(img.indexOf(',') == -1){
				this.goodsImg.push(img)
			}else{
				this.goodsImg = img.split(',')
			}
		}
		// 特色卡片
		getCardImage(img:any){
			console.log('img',img)
			if(img.indexOf(',') == -1){
				this.cardData.push(img)
			}else{
				this.cardData = img.split(',')
			}
		}
		// 倒计时时间计算
		getTime(){
			let day = String(Math.floor(this.countDown/3600/24));
			let day_num = this.countDown-3600*24*Number(day)
			let hour=Math.floor((day_num)/3600)<10?'0'+Math.floor((day_num)/3600):Math.floor((day_num)/3600);
			let minute=Math.floor((day_num-3600*Number(hour))/60)<10?'0'+Math.floor((day_num-3600*Number(hour))/60):Math.floor((day_num-3600*Number(hour))/60);
			let second=Math.floor((day_num-3600*Number(hour))%60)<10?'0'+Math.floor((day_num-3600*Number(hour))%60):Math.floor((day_num-3600*Number(hour))%60);
			if(Number(day)>0){
				this.countDay = day;
			}
			this.countHour = hour;
			this.countMinute = minute;
			this.countSecond = second
		}
		// 倒计时定时器
		getCountDown(){
			this.getTime()
			this.count_down=this.scheduler(()=>{
				if(this.countDown>0){
					this.countDown --;
					this.getTime()
				}else{
					clearInterval(this.count_down)
				}
			},1);
		}
		// 拼团形式规格
		getGoodsSpe(){
			let data = this.goodsData;
			this.goodsSpe.pintuan_type.name = getGoodsPintuan(data.pintuan_type);
			this.goodsSpe.random_type.name = getGoodsRandom(data.random_type);
			this.goodsSpe.spec.name = data.spec.name;
			this.goodsSpe.spec_str.name = data.spec.num;
			// 商品详情
			this.getExplainData()
		}

		// 商品详情
		getExplainData(){
			let data = this.goodsData;
		}
		
		onClickBack(){
			uni.navigateBack({
				delta: 1
			});
		}
		onClickShops(){
			uni.navigateTo({
				url: '/pages/userinfo/merchant_shops?id='+this.goodsData.publisher.id
			})
		}
		onClickAllCard(){
			uni.navigateTo({
				url: '/pages/goods/all_good_card?code='+this.goodsData.goodCode+'&type='+this.goodsData.pintuan_type
			})
		}
		// 分享
		onClickShare(){
			if(!this.operationShow){
				this.operationShow = true
			}
		}
		onClickCardPlay(id:number){
			if(id<=2){
				this.operationCardShow = true
			}
		}
		onClickCardCancel(){
			this.operationCardShow = false
		}
		onClickShareCancel(){
			this.operationShow = false
		}
		onClcikShareConfirm(id:any){
			if(id==2){
				uni.setClipboardData({
					data: "http://share.jc.ji7.com/good.html?id="+'',
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
					scene: scene as any,
					type: 0,
					href: "http://share.jc.ji7.com/good.html?id="+'',
					title: '',
					summary: '',
					imageUrl: this.goodsImg[0],
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
		
		onClickFavor(){
			let url = ''
			if(!this.favorType){
				url="good/favor/"
			}else{
				url="good/unfavor/"
			}
			app.http.Post(url+this.goodsId,{},(data:any)=>{
				this.favorType = !this.favorType
				
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
		onClickPreviewCard(index:number){
			uni.previewImage({
				urls: this.cardData,
				current:index,
				indicator: "number" 
			});
		}
		
		onClickBuy(){
			// #ifndef MP
			if(app.token.accessToken == ''){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}
			// #endif
			// #ifdef MP-WEIXIN
			if(app.token.accessToken == ''){
				app.platform.wechatLogin();
				return;
			}
			// #endif
			uni.navigateTo({
				url:'confirmorder?data='+encodeURIComponent(JSON.stringify(this.goodsData))
			})
		}
		
		onClickResult(chooseID: number) {
			console.log('拼团结果==0   拆卡报告==1')
			uni.navigateTo({
				url: 'goods_result_list?chooseIds=' + chooseID+'&code='+this.goodsId
			})
		}
		
	}
</script>
	
<style lang="scss">
	$color-F:#ffffff;
	$font-20:20rpx;
	$font-22:22rpx;
	$font-24:24rpx;
	$font-28:28rpx;
	$font-34:34rpx;
	$font-40:40rpx;
	$font-60:60rpx;
	.content{
		width: 750rpx;
		box-sizing: border-box;
	}
	.header-banner{
		width: 100%;
		background:#fff;
		position: fixed;
		left:0;
		top:0;
		box-sizing: border-box ;
		z-index: 10;
		border-bottom: 1px solid #F4F3F2;
		.tab-header{
			width: 100%;
			height:88rpx;
			display: flex;
			box-sizing: border-box;
			padding:0 30rpx;
			position: relative;
			z-index: 10;
			align-items: center;
			justify-content: center;
		}
		.icon-back{
			width: 80rpx;
			height:88rpx;
			background:url(../../static/goods/back@2x.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			left:0;
			top:0;
		}
		.header-title{
			height:88rpx;
			line-height: 88rpx;
			font-size: $font-34;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
		}
		.icon-share{
			width: 42rpx;
			height:42rpx;
			position: absolute;
			right:32rpx;
			top:50%;
			margin-top: -21rpx;
			background:url(../../static/goods/fenxiang@2x.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
	
	.pic-content{
		width: 750rpx;
		height:680rpx;
		box-sizing: border-box;
	}
	.swiper{
		width: 750rpx;
		height:680rpx;
		background:#F5F5F9;
	}
	.goods-img-content{
		width: 750rpx;
		height:680rpx;
		background:#F5F5F9;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.goods-img{
		width: 750rpx;
		height: 680rpx;
	}
	.header-content{
		width: 750rpx;
		height:112rpx;
		background:url(../../static/goods/jiage@2x.png) no-repeat center;
		background-size: 100% 100%;
		box-sizing: border-box;
		padding-left:36rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.header-content-end{
		background:url(../../static/goods/jiage_@2x.png) no-repeat center;
		background-size: 100% 100%;
	}
	.header-price{
		font-size: $font-40;
		font-family: 'DIN';
		font-weight: bold;
		color: $color-F;
	}
	.header-price text{
		font-size: $font-60;
	}
	.header-right{
		width: 280rpx;
		height:112rpx;
		box-sizing: border-box;
		padding:18rpx 0 12rpx 0;
	}
	.icon-end{
		width: 110rpx;
		height:32rpx;
		background:url(../../static/goods/end@2x.png) no-repeat center;
		background-size: 100% 100%;
		margin:0 auto;
		margin-bottom: 14rpx;
	}
	.countdown-content{
		width: 100%;
		height:36rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.countdown-index{
		width: 36rpx;
		height:36rpx;
		text-align: center;
		line-height: 36rpx;
		font-size: $font-22;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: $color-F;
		background:#FF8F61
	}
	.countdown-icon{
		font-size: $font-24;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: $color-F;
		margin:0 8rpx;
	}
	.header{
		width: 100%;
		box-sizing: border-box;
		padding:0 32rpx;
		background:$color-F;
		border-bottom: 14rpx solid #F6F7F8;
	}
	.header-top{
		width: 100%;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;
		padding-top: 20rpx;
		&-left{
			width: 580rpx;
			box-sizing: border-box;
			&-title{
				width: 100%;
				font-size: $font-28;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #14151A;
			}
		}
		&-right{
			width: 50rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			&-desc{
				font-size: $font-20;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			}
		}
		.youhui{
			height:40rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			margin-bottom: 18rpx;
			.icon-tips{
				width: 130rpx;
				height:40rpx;
				background:url(../../static/index/title@2x.png) no-repeat center;
				background-size: 100% 100%;
				text-align: center;
				line-height: 40rpx;
				font-size: $font-20;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #E6D188;
				margin-right: 10rpx;
			}
		}
		.icon-favor{
			width: 44rpx;
			height:40rpx;
			background:url(../../static/goods/shoucang@2x.png) no-repeat center;
			background-size: 100% 100%;
			margin-bottom: 4rpx;
		}
		.icon-favored{
			background:url(../../static/goods/shoucang_@2x.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
	.header-center{
		width: 100%;
		box-sizing: border-box;
		margin-top: 4rpx;
		position: relative;
		&-top{
			width: 100%;
			text-align: end;
			font-size: $font-20;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #A9ABB4;
		}
		&-plan{
			width: 100%;
			height:12rpx;
			margin-top: 12rpx;
			z-index: 5;
		}
		&-actor{
			width: 140rpx;
			height:40rpx;
			box-sizing: border-box;
			display: flex;
			position: absolute;
			bottom:0rpx;
			left:20rpx;
			z-index: 6;
			&-img{
				width: 40rpx;
				height:40rpx;
				margin-left: -20rpx;
				border-radius: 50%;
			}
		}
	}
	.header-bottom{
		width: 100%;
		height:158rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 22rpx;
		&-index{
			height:76rpx;
			box-sizing: border-box;
			text-align: center;
			&-name{
				text-align: center;
				font-size: $font-24;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #14151A;
				margin-bottom: 10rpx;
			}
			&-desc{
				font-size: $font-22;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #A9ABB4;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.icon-tishi{
				width: 20rpx;
				height:20rpx;
				background:url(../../static/goods/tishi@2x.png) no-repeat center;
				background-size: 100% 100%;
				margin-left: 4rpx;
			}
		}
	}
	.goods-card{
		width: 100%;
		background:$color-F;
		box-sizing: border-box;
		padding:20rpx 0 20rpx 32rpx;
		border-bottom: 14rpx solid #F6F7F8;
		&-title{
			width: 100%;
			height:40rpx;
			display: flex;
			box-sizing: border-box;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 16rpx;
			padding-right: 32rpx;
			&-name{
				height:40rpx;
				line-height: 40rpx;
				font-size: $font-28;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #14151A;
			}
			&-more{
				height:40rpx;
				display: flex;
				align-items: center;
				font-size: $font-22;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #A9ABB4;
			}
			.icon-right{
				width: 10rpx;
				height:16rpx;
				background:url(../../static/goods/jinru@2x.png) no-repeat center;
				background-size: 100% 100%;
				margin-left: 8rpx;
			}
		}
		&-content{
			width: 100%;
			height:144rpx;
			overflow: hidden;
			&-scroll{
				width: 100%;
				height:144rpx;
				display: flex;
				white-space: nowrap;
			}
			.scroll-index{
				width: 112rpx;
				height:144rpx;
				background:#F5F5F9;
				border-radius: 4rpx;
				display: inline-block;
				margin-right: 20rpx;
				overflow: hidden;
				&-img{
					width: 112rpx;
					height:144rpx;
				}
			}
		}
	}
	.goods-seller{
		width: 100%;
		height:120rpx;
		background:$color-F;
		border-bottom: 14rpx solid #F5F5F9;
		box-sizing: border-box;
		padding:0 40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		&-left{
			width: 500rpx;
			height:80rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			&-avatar{
				width: 80rpx;
				height:80rpx;
				border-radius: 50%;
				background:#F5F5F9
			}
			&-desc{
				width: 420rpx;
				height:80rpx;
				box-sizing: border-box;
				padding:4rpx 0 4rpx 20rpx;
				display: flex;
				flex-wrap: wrap;
				&-name{
					width: 100%;
					font-size: $font-28;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #14151A;
				}
				&-tips{
					width: 100%;
					font-size: $font-22;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #A9ABB4;
				}
			}
		}
		&-right{
			width: 140rpx;
			height: 56rpx;
			background: linear-gradient(90deg, #FD8339 0%, #F24B28 100%);
			border-radius: 4rpx;
			text-align: center;
			line-height: 56rpx;
			font-size: $font-24;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: $color-F;
		}
	}
	.goods-desc{
		width: 100%;
		box-sizing: border-box;
		padding:20rpx 32rpx 132rpx 32rpx;
		&-title{
			width: 100%;
			font-size: $font-28;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #14151A;
			margin-bottom: 20rpx;
		}
		&-explain{
			width: 100%;
			box-sizing: border-box;
			font-size: $font-24;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #7D8288;
			&-text{
				width: 100%;
				box-sizing: border-box;
				display: flex;
				align-items: flex-start;
			}
			.explain-name{
				width: 168rpx;
			}
			.explain-icon{
				width: 20rpx;
			}
			.explain-desc{
				width: 100%;
				box-sizing: border-box;
				line-height: 45rpx;
				word-break: break-all;
				text-indent: -190rpx;
				padding-left:190rpx
			}
		}
	}
	.btn-content{
		width: 100%;
		height:112rpx;
		position: fixed;
		bottom:0;
		left:0;
		background:$color-F;
		z-index: 8;
		box-sizing: border-box;
		padding: 0 16rpx 0 0;
		border-top: 1px solid #F5F5F8;
		display: flex;
		align-items: center;
		justify-content: center;
		&-left{
			width: 272rpx;
			height:112rpx;
			box-sizing: border-box;
			padding:0 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&-index{
				height:80rpx;
				box-sizing: border-box;
				text-align: center;
				&-name{
					font-size: $font-20;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
				}
			}
			.icon-kf{
				width: 40rpx;
				height:48rpx;
				margin-bottom: 4rpx;
			}
			.icon-tx{
				width: 44rpx;
				height:46rpx;
				margin-bottom: 6rpx;
			}
		}
		.btn-confirm{
			width: 462rpx;
			height: 88rpx;
			background: #14151B;
			border-radius: 4rpx;
			text-align: center;
			line-height: 88rpx;
			font-size: $font-28;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: $color-F;
		}
		
	}
	.btn-contented{
		width: 100%;
		height:112rpx;
		position: fixed;
		bottom:0;
		left:0;
		background:$color-F;
		z-index: 8;
		box-sizing: border-box;
		padding: 0 16rpx;
		border-top: 1px solid #F5F5F8;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.btn-pt{
			width: 352rpx;
			height:88rpx;
			box-sizing: border-box;
			border-radius: 4px;
			border: 2rpx solid #14151B;
			text-align: center;
			line-height: 84rpx;
			font-size: $font-28;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #14151B;
		}
		.btn-ck{
			width: 352rpx;
			height:88rpx;
			box-sizing: border-box;
			border-radius: 4px;
			background:#14151B;
			border: 2rpx solid #14151B;
			text-align: center;
			line-height: 84rpx;
			font-size: $font-28;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: $color-F;
		}
	}
	.movable-area{
		position: fixed;
		left:0;
		top:0;
		width: 100%;
		height:100%;
		pointer-events: none;
		z-index:3
	}
	.movable-content{
		pointer-events: auto;
		width: 200rpx;
		height:150rpx;
	}
</style>
