<template>
	<view class="content" v-show="goodsData!=''">
		<!-- #ifndef MP -->
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
		<!-- #endif -->
		<!-- 商品图片价格 -->
		<view class="pic-content">
			<swiper class="swiper" :indicator-dots="goodsImg.length>1" autoplay="true" circular="true" indicator-active-color="#ffffff">
				<swiper-item v-for="(item,index) in goodsImg" :key="index" @click="onClickPreviewImage(index)">
					<view class="goods-img-content">
						<image class="goods-img" :src="item" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="detail-index-bg">
			<view class="detail-bg">
				<view :class="['header-content',{'header-content-end':goodsState!=1}]">
					<view class="header-price">¥<text>{{goodsData.price}}</text></view>
					<view class="header-right" v-if="goodsState==1">
						<view class="icon-end">距结束</view>
						<view class="countdown-content">
							<view v-if="countDay>0" class="countdown-icon">{{countDay}}天</view>
							<view class="countdown-index">{{countHour}}</view>
							<view class="countdown-icon">:</view>
							<view class="countdown-index">{{countMinute}}</view>
							<view class="countdown-icon">:</view>
							<view class="countdown-index">{{countSecond}}</view>
						</view>
					</view>
				</view>
				<view class="header">
					<view class="header-top">
						<view class="header-top-left">
							<view class="youhui" v-if="discountList!=''"><view class="icon-tips" v-for="(item,index) in discountList" :key="index">{{item.content}}</view></view>
							<view class="header-top-left-title">{{goodsData.title}}</view>
						</view>
						<view class="header-top-right" @click="onClickFavor">
							<view :class="['icon-favor',{'icon-favored':favorType}]"></view>
							<view class="header-top-right-desc">收藏</view>
						</view>
					</view>
					<view class="header-top-id">商品ID：{{goodsId}}</view>
				</view>
			</view>
			
			<view class="detail-bg">
				<view class="header">
					<view class="header-desc-title">拼团信息</view>
					<view class="header-center">
						<view class="header-center-top">余{{goodsData.totalNum-(goodsData.currentNum+goodsData.lockNum)}}/共{{goodsData.totalNum}}</view>
						<view class="header-center-plan"><plan :num_ex="(goodsData.currentNum+goodsData.lockNum)" :num_all="goodsData.totalNum"></plan></view>
						<!-- <view class="header-center-actor" v-if="goodsData.lastBuyerList">
							<image class="header-center-actor-img" v-for="(item,index) in goodsData.lastBuyerList" :key="index" :src="item.avatar!=''?decodeURIComponent(item.avatar):defaultAvatar" mode="aspectFit"></image>
						</view> -->
					</view>
					<view class="header-bottom">
						<view class="header-bottom-index" v-for="item in goodsSpe" :key="item.id" @click="onClickCardPlay(item.id)">
							<view class="header-bottom-index-name">{{item.name}}</view>
							<view class="header-bottom-index-desc">{{item.desc}}<view v-if="item.id<=2" class="icon-tishi"></view></view>
						</view>
					</view>
					
				</view>
			</view>
			
			<!-- 卡片展示 -->
			<view class="detail-bg">
				<view class="goods-card" >
					<view class="goods-card-title">
						<view class="goods-card-title-name">商品特色</view>
						<view class="goods-card-title-more" @click="onClickAllCard">编号列表</view>
					</view>
					<view class="goods-card-content">
						<scroll-view class="goods-card-content-scroll" :scroll-x="true">
							<view class="scroll-index" v-for="(item,index) in cardData" :key="index" @click="onClickPreviewCard(index)">
								<image class="scroll-index-img" :src="decodeURIComponent(item)" mode="aspectFit"></image>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			
			<!-- 卖家信息 -->
			<view class="detail-bg">
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
			</view>
			
			<!-- 商品详情 -->
			<view class="detail-bg">
				<view class="goods-desc">
					<view class="goods-desc-title">商品详情</view>
					<view class="goods-desc-explain">
						<!-- <rich-text :nodes="goodsDesc"></rich-text> -->
						<view class='goods-desc-explain-text' v-for="item in goodsDesc" :key="item.id">
							<view class="explain-desc">{{item}}</view>
						</view>
					</view>
					<image  @click="onClickPreviewImage(index)" class="goods-desc-image" mode="widthFix" v-for="(item,index) in goodsImg" :key="index" :src="item" />
				</view>
			</view>
		</view>
		
		<!-- 直播可拖动控件 -->
		<movable-area class="movable-area" v-if="goodsState >3&&goodsData.broadcast">
			<movable-view class="movable-content" direction="all" x="530rpx" y="1000rpx">
				<livewicket :liveImg="decodeURIComponent(goodsData.broadcast.pic)" :liveStatus="goodsData.broadcast.name" @live="onClickLive"></livewicket>
			</movable-view>
		</movable-area>
		<!-- 底部吐司 -->
		<tips :tipsData="buyRecordList" v-if="buyRecordList!=''"></tips>
		<!-- 底部按钮 -->
		<view class="btn-content" v-if="goodsState==1||goodsState==0">
			<view class="btn-content-left">
				<view class="btn-content-left-index" v-for="item in tipBtn" :key="item.id" @click="onClickTipBtn(item)">
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

		<cardplay :operationShow="operationCardShow" :operaType="operaType" @operacancel="onClickCardCancel" />
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
		operaType = 0;
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
			{id:2,name:'拼团提醒',url:'../../static/goods/zhibotixing@2x.png',class:'tx'}
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
		buyRecordList:any = [];
		onNetWorkFunc:any;
		onLoad(query:any) {
			this.goodsId = query.id;
			this.getGoodData(this.goodsId)
			uni.getNetworkType({
				success: (res)=> {
					if(res.networkType=='none'){
						uni.showModal({
							title: '提示',
							content: '当前无网络服务，请开启网络',
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}
			});
			this.onNetWorkFunc = uni.onNetworkStatusChange((res)=>{
				console.log('onNetworkStatusChange=',res)
				if(res.isConnected){
					uni.showLoading({
						title: '加载中'
					});
					setTimeout(()=>{
						this.getGoodData(this.goodsId)
						uni.hideLoading();
					},1000)
				}
			})
		}
		onShow(){
			this.getProgress()
		}
		onHide(){
			uni.offNetworkStatusChange((res)=>{
				console.log('onNetworkStatusChange=',res)
				if(res.isConnected){
					uni.showLoading({
						title: '加载中'
					});
					setTimeout(()=>{
						this.getGoodData(this.goodsId)
						uni.hideLoading();
					},1000)
				}
			})
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
					this.goodsDesc = newData;
					console.log(newData)
					this.goodsDesc.unshift('【结束时间】：'+dateFormat(data.good.overAt))
					this.goodsDesc.unshift('【开售时间】：'+dateFormat(data.good.startAt))
					this.goodsDesc.unshift('【商品编号】：'+data.good.goodCode)
				})
				app.http.Get('good/'+id+'/buyRecord',{},(res:any)=>{
					if(res.list){
						this.buyRecordList = res.list
					}
				})
			},200)
			
		}
		getProgress(){
			app.http.Get('good/'+this.goodsId+'/progress',{},(res:any)=>{
				this.goodsData.currentNum = res.data.currentNum; 
				this.goodsData.totalNum = res.data.totalNum;
				this.goodsData.lockNum = res.data.lockNum;
			})
		}
		// 商品图片
		getGoodsImage(img:any){
			if(img.indexOf(',') == -1){
				this.goodsImg.push(img)
			}else{
				this.goodsImg = img.split(',')
			}
		}
		// 特色卡片
		getCardImage(img:any){
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
			this.goodsSpe.spec_str.name = data.spec.num+'张';
		}
		onClickTipBtn(item:any){
			if(item.id==1){
				if(app.token.accessToken == ''){
					uni.navigateTo({
						url:'/pages/login/login'
					})
					return;
				}
				if(this.goodsData.kefu>0){
					uni.navigateTo({
						url: '/pages/userinfo/talk?targetUserId='+this.goodsData.kefu+'&goodCode='+this.goodsId
					})
				}else{
					uni.showToast({
						title:'当前商品暂无客服',
						icon:'none'
					})
				}
				
			}

			if(item.id==2){
				// #ifdef APP-PLUS
				app.http.Post('good/remind/'+this.goodsId,{},(res:any)=>{
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
				})
				// #endif

				// #ifdef MP-WEIXIN
				app.platform.requestSubscribeMessage('I38fTkA41Vtr3LQFTRi_Xd6p7Y_9AZKpZCKKF3bo2W0',()=>{
					uni.showToast({
						title:'订阅成功',
						icon:'success'
					})
				})
				// #endif
			}
		}
		onClickBack(){
			uni.navigateBack({
				delta: 1
			});
		}
		onClickShops(){
			uni.navigateTo({
				url: '/pages/userinfo/merchant_shops?id='+this.goodsData.publisher.id+'&name='+this.goodsData.publisher.name+'&avatar='+this.goodsData.publisher.avatar
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
				this.operationCardShow = true;
				this.operaType = id
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
					data: "https://www.ka-world.com/share/good.html?id="+this.goodsId,
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
					href: "https://www.ka-world.com/share/good.html?id="+this.goodsId,
					title: this.goodsData.title,
					summary: this.goodsData.title,
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
			if(this.goodsData.totalNum-(this.goodsData.currentNum+this.goodsData.lockNum)<=0){
				uni.showToast({
					title:'该商品已售罄',
					icon:'none'
				})
				return;
			}
			uni.navigateTo({
				url:'confirmorder?data='+encodeURIComponent(JSON.stringify(this.goodsData))
			})
		}
		
		onClickResult(chooseID: number) {
			uni.navigateTo({
				url: 'goods_result_list?chooseIds=' + chooseID+'&code='+this.goodsId
			})
		}

		onClickLive(){
			app.platform.goWeChatLive(this.goodsData.broadcast.roomId)
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
		// background:#F2F2F2
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
	.detail-index-bg{
		width: 100%;
		background:#F2F2F2;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding-top: 20rpx;
	}
	.detail-bg{
		width: 722rpx;
		border-radius: 20rpx;
		background:#fff;
		margin-bottom: 23rpx;
	}
	.header-content{
		width: 722rpx;
		height:107rpx;
		background:url(../../static/goods/new_price.png) no-repeat center;
		background-size: 100% 100%;
		box-sizing: border-box;
		padding-left:36rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.header-content-end{
		background:url(../../static/goods/new_price.png) no-repeat center;
		background-size: 100% 100%;
	}
	.header-desc-title{
		width: 100%;
		font-size: $font-28;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
		margin-bottom: 20rpx;
		padding-top: 27rpx;
	}
	.header-price{
		font-size: 33rpx;
		font-family: 'DIN';
		font-weight: bold;
		color: $color-F;
	}
	.header-price text{
		font-size:60rpx;
	}
	.header-right{
		width: 240rpx;
		height:107rpx;
		box-sizing: border-box;
		padding:15rpx 0 12rpx 0;
	}
	.icon-end{
		width: 100%;
		text-align: center;
		font-size: 22rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		margin-bottom: 15rpx;
	}
	.countdown-content{
		width: 100%;
		height:27rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.countdown-index{
		width: 34rpx;
		height:27rpx;
		text-align: center;
		line-height: 27rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: $color-F;
		background:#727377
	}
	.countdown-icon{
		font-size: 20rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 400;
		color: $color-F;
		margin:0 8rpx;
	}
	.header{
		width: 100%;
		box-sizing: border-box;
		padding:0 32rpx;
	}
	.header-top-id{
		width: 100%;
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #ACAEB7;
		margin-bottom: 40rpx;
		margin-top: 10rpx;
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
				font-size: $font-34;
				font-family: 'ali-Light';
				color: #14151A;
				line-height: 50rpx;
				font-weight: normal !important;
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
			height:34rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			margin-bottom: 18rpx;
			.icon-tips{
				height:34rpx;
				border: 2rpx solid #FB4E3E;
				border-radius: 10rpx;
				text-align: center;
				line-height: 34rpx;
				font-size: 18rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #FB4E3E;
				box-sizing: border-box;
				padding:0 11rpx;
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
		margin-top: 20rpx;
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
			width: 95%;
			height:12rpx;
			margin:0 auto;
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
		box-sizing: border-box;
		padding:30rpx 0 30rpx 32rpx;
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
				height:31rpx;
				display: flex;
				border: 1px solid #D7D7DC;
				padding:5rpx 10rpx;
				align-items: center;
				font-size: 20rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #ACAEB7;
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
				width: 120rpx;
				height:144rpx;
				background:#FFF;
				border-radius: 4rpx;
				display: inline-block;
				margin-right: 20rpx;
				overflow: hidden;
				border:1px solid #F2F2F2;
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				&-img{
					width: 102rpx;
					height:134rpx;
				}
			}
		}
	}
	.goods-seller{
		width: 100%;
		height:140rpx;
		box-sizing: border-box;
		padding:10rpx 40rpx;
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
			width: 139rpx;
			height: 57rpx;
			background: #FB4E3E;
			border-radius: 29rpx;
			text-align: center;
			line-height: 57rpx;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
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
			background: #FB4E3E;
			border-radius: 44rpx;
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
	.goods-desc-image{
		width: 100%;
		margin-top: 10rpx;
	}
</style>
