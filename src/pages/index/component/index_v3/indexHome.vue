<template>
	<div>
		<!-- 首页头部广告 -->
		<!-- <swiper v-if="headerAddList.length" :indicator-dots="true" :indicator-active-color="'#fff'" :indicator-color="'rgba(170, 170, 170, .75)'" class="capsule-box"  :current="capsuleCurrent" autoplay circular @change="e=> capsuleCurrent=e.detail.current">
			<swiper-item v-for="(item,index) in headerAddList" :key="index">
				<div class="capsule-content">
					<image class="capsule-pic" :src="decodeURIComponent(item.pic)" mode="aspectFill" @click="onClickToAD(item.target)"/>
				</div>
			</swiper-item>
		</swiper> -->

		<!-- 金刚区 -->
		<div class="golden-container">
			<div class="golden-tab" v-for="(items,indexs) in indexMenu" :key="indexs" @click="onClickJumpUrl(items)">
				<image class="golden-img" mode="aspectFit" :src="items.icon"/>
				<text class="golden-text u-line-1">{{items.name}}</text>
			</div>
		</div>

		<div class="feature-container">
			<div class="feature-live" v-if="broadCast.length" @click="onClickLive()">
				<div class="feature-live-left">
					<text class="feature-live-title">直播中</text>
					<div class="feature-live-box">
						<image class="feature-live-pic" :src="decodeURIComponent(broadCastData.merchantLogo)" mode="aspectFill"/>
					</div>
					<text class="feature-live-name u-line-1">{{broadCastData.merchantName}}</text>
				</div>
				<div class="feature-live-right">
					<swiper class="broadCast-box"  :current="broadCurrent" autoplay circular @change="e=> broadCurrent=e.detail.current">
						<swiper-item v-for="(item,index) in broadCast" :key="index">
							<div class="broadCast-box">
								<image class="broadCast-box" :src="decodeURIComponent(item.pic)" mode="aspectFill" />
							</div>
						</swiper-item>
					</swiper>
					<div class="broadCast-line">
						<div class="broadCast-indicator" :class="{'indicatorCurrent':broadCurrent==index}" v-for="(item,index) in broadCast" :key="index"></div>
					</div>
				</div>
			</div>
			<div class="feature-box feature-center" @click="onClickGoProgressRank">
				<text class="feature-title">即将组齐</text>
				<div class="feature-pic-box">
					<image class="feature-pic" src="/static/index/v3/progress.png" mode="aspectFill" />
				</div>
			</div>
			<div class="feature-box" @click="onClickSeries">
				<text class="feature-title">推荐系列</text>
				<div class="feature-pic-box">
					<image class="feature-pic" :src="decodeURIComponent(homeSeries.pic)" mode="aspectFill" />
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
	const app = getApp().globalData.app;
	import { indexMenu,goodsTabs } from "@/tools/DataExchange.js"
	export default {
		props: {
			headerAddList:{
				type:Array,
				default: () => []
			},
			broadCast:{
				type:Array,
				default: () => []
			},
			homeSeries:{
				type:Object,
				default: () => {}
			}
		},
		data(){
			return {
				indexMenu,
				capsuleCurrent:0,
				broadCurrent:0
			}
		},
		mounted(){
		},
		computed:{
			broadCastData(){
				return this.broadCast[this.broadCurrent] || {}
			}
		},
		methods: {
			onClose(){
				this.$emit('update:show', false)
			},
			onClickToAD(target) {
				app.navigateTo.navigateToAD(target)
			},
			onClickSeries(){
				if(this.homeSeries.id==0) return;
				uni.navigateTo({
					url:`/pages/goods/goods_seriesDetail?seriesId=${this.homeSeries.id}`
				})
			},
			onClickGoProgressRank(){
				uni.navigateTo({ url:'/pages/goods/goods_progressRank' })
			},
			onClickJumpUrl({ needLogin, name, url }) {
				if (needLogin) {
					if (app.token.accessToken == '') {
						app.login.arouseLogin()
						return;
					}
				}
				if(name=="玩家卡册"){
					uni.setStorageSync('showKace', true);
					app.navigateTo.switchTab(2)
					return;
				}
				uni.navigateTo({ url })
			},
			onClickLive(){
				const item = this.broadCastData;
				if(app.token.accessToken == ''){
					app.login.arouseLogin()
					return;
				}
				if (item.third && item.third === 1001) {
					app.platform.goZgLive({
						roomID: item.roomId,
						merchantId: item.merchantId,
						playCode:item.playCode,
						isAnchor: false,
						...item
					})
					return
				}
				app.platform.goWeChatLive({playCode:item.playCode,goodCode:item.goodCode})
			}
		}
	}
</script>

<style scoped lang="scss">
	@mixin flexCenter{
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
		// #ifndef APP-NVUE
		box-sizing: border-box;
		align-content: baseline;
		// #endif
	}
	.capsule-box {
		width: 750rpx;
		height: 222rpx;
		position: relative;
		background: #fff;
		border-radius: 5rpx;
		@include flexCenter;
	}
	.capsule-content{
		width: 750rpx;
		height: 200rpx;
		@include flexCenter;
	}
	.capsule-pic{
		width: 710rpx;
		height:200rpx;
		z-index: 5;
		border-radius: 5rpx;
	}
	// 金刚区
	.golden-container{
		width: 750rpx;
		padding: 0;
		padding:5rpx 35rpx 32rpx 35rpx;
		@include flexCenter;
		background: #fff;
		justify-content: space-between;
	}
	.golden-tab {
		width: 100rpx;
		@include flexCenter;
		flex-wrap: wrap;
		margin-top:16rpx
	}
	.golden-img {
		width: 72rpx;
		height: 72rpx;
		margin-bottom: 15rpx;
	}
	.golden-text {
		width: 100rpx;
		font-size: 22rpx;
		font-weight: 400;
		color: #333333;
		text-align: center;
		@include flexCenter;
	}
	.feature-container{
		width: 750rpx;
		height:156rpx;
		border-top: 1px solid #F6F7FB;
		background:#fff;
		@include flexCenter;
	}
	.feature-live{
		width:350rpx;
		height:156rpx;
		@include flexCenter;
		padding:0 32rpx 0 35rpx;
		justify-content: space-between;
	}
	.feature-live-left{
		width: 160rpx;
		height:156rpx;
		@include flexCenter;
		flex-wrap: wrap;
		padding-top:20rpx;
		justify-content: flex-start;
	}
	.feature-live-title{
		width: 160rpx;
		height:42rpx;
		font-weight: 500;
		font-size: 24rpx;
		color: #333333;
	}
	.feature-live-box{
		width: 40rpx;
		height:40rpx;
		margin-bottom: 4rpx;
	}
	.feature-live-pic{
		width: 40rpx;
		height:40rpx;
		border-radius: 50%;
	}
	.feature-live-name{
		width: 160rpx;
		font-size: 20rpx;
		color: #AAAFBD;
		lines:1;
		text-overflow:ellipsis
	}
	.feature-live-right{
		width: 117rpx;
		height:156rpx;
		padding-top: 37rpx;
		// #ifndef APP-NVUE
		box-sizing: border-box;
		// #endif
	}
	.broadCast-box{
		width: 117rpx;
		height: 90rpx;
		@include flexCenter;
	}
	.broadCast-line{
		width: 117rpx;
		height:3rpx;
		margin-top: 11rpx;
		@include flexCenter;
	}
	.broadCast-indicator{
		width: 11rpx;
		height:3rpx;
		margin-left:2rpx;
		margin-right: 2rpx;
		background:#D7D5DF;
	}
	.indicatorCurrent{
		background:#FA1545
	}
	.feature-box{
		width:200rpx;
		height:156rpx;
		padding-top:20rpx;
		// #ifndef APP-NVUE
		box-sizing: border-box;
		// #endif
	}
	.feature-center{
		border-left: 1px solid #F6F7FB;
		border-right: 1px solid #F6F7FB;
	}
	.feature-title{
		width: 200rpx;
		font-weight: 500;
		font-size: 24rpx;
		color: #333333;
		@include flexCenter;
		text-align: center;
		margin-bottom: 12rpx;
	}
	.feature-pic-box{
		width: 200rpx;
		height:80rpx;
		@include flexCenter;
	}
	.feature-pic{
		width: 112rpx;
		height:80rpx;
	}
</style>
