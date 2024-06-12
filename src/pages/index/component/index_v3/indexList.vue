<template>
	<swiper class="index-swiper" :style="{ height: swiperHeight + 'px' }" :disable-touch="refreshing" :current="current" @change="onChangeCurrent">
		<swiper-item v-for="(item,index) in tabs" :key="index">
			<!-- #ifdef APP-NVUE -->
			<waterfall column-count="2" column-width="auto" :show-scrollbar="false" left-gap="10" right-gap="10" column-gap="10" @loadmore="reqNewMainList()" >
				<refresh class="refresh" @refresh="reload(true)" :display="refreshing ? 'show' : 'hide'">
					<u-loading-icon mode="semicircle"></u-loading-icon>
				</refresh>
				<header>
					<!-- 首页头部广告 -->
					<swiper v-if="addList.top.length && index==1" :indicator-dots="true" :indicator-active-color="'#fff'" :indicator-color="'rgba(170, 170, 170, .75)'" class="capsule-box"  :current="capsuleCurrent" autoplay circular @change="e=> capsuleCurrent=e.detail.current">
						<swiper-item v-for="(item,index) in addList.top" :key="index">
							<div class="capsule-content">
								<image class="capsule-pic" :src="decodeURIComponent(item.pic)" mode="aspectFill" @click="onClickToAD(item.target)"/>
							</div>
						</swiper-item>
					</swiper>

					<!-- 金刚区 -->
					<div class="golden-container" v-if="index==1">
						<div class="golden-tab" v-for="(items,indexs) in indexMenu.front" :key="indexs" @click="onClickJumpUrl(items)">
							<image class="golden-img" :src="items.icon" mode="aspectFit"/>
							<text class="golden-text u-line-1">{{items.name}}</text>
						</div>
					</div>
				</header>
				<cell v-for="(item,index) in goodsList[index]?goodsList[index].list:[]" >
					<indexListGoods :data="item"/>
				</cell>
				<cell v-if="goodsList[index]&&goodsList[index].empty">
					<empty></empty>
				</cell>
			</waterfall>
			<!-- #endif -->

			<!-- #ifndef APP-NVUE -->
			<scroll-view class="scroll-box" @scrolltolower="reqNewMainList()" :refresher-enabled="true" refresher-default-style="white" @refresherrefresh="reload(true)" :refresher-triggered="refreshing" :scroll-y="true">
				<div>
					<!-- 首页头部广告 -->
					<swiper v-if="addList.top.length && index==1" :indicator-dots="true" :indicator-active-color="'#fff'" :indicator-color="'rgba(170, 170, 170, .75)'" class="capsule-box"  :current="capsuleCurrent" autoplay circular @change="e=> capsuleCurrent=e.detail.current">
						<swiper-item v-for="(item,index) in addList.top" :key="index">
							<div class="capsule-content">
								<image class="capsule-pic" :src="decodeURIComponent(item.pic)" mode="aspectFill" @click="onClickToAD(item.target)"/>
							</div>
						</swiper-item>
					</swiper>

					<!-- 金刚区 -->
					<div class="golden-container" v-if="index==1">
						<div class="golden-tab" v-for="(items,indexs) in indexMenu.front" :key="indexs" @click="onClickJumpUrl(items)">
							<image class="golden-img" :src="items.icon" mode="aspectFit"/>
							<text class="golden-text u-line-1">{{items.name}}</text>
						</div>
					</div>
				</div>
				<div class="scroll-list-box">
					<div class="scroll-index" v-for="item in goodsList[index]?goodsList[index].list:[]" >
						<indexListGoods :data="item"/>
					</div>
				</div>
				<div v-if="goodsList[index]&&goodsList[index].empty">
					<empty></empty>
				</div>
			</scroll-view>
			<!-- #endif -->
		</swiper-item>
	</swiper>
</template>

<script>
	const app = getApp().globalData.app;
	import { indexMenu,goodsTabs } from "@/tools/DataExchange.js"
	import indexListGoods from './indexListGoods.vue'
	class ListParams {
		fetchFrom=1;
		fetchSize=10;
		noMoreData=false;
		empty=false;
	}
	export default {
		components:{
			indexListGoods
		},
		props: {
			current:{
				type:Number,
				default:0
			},
			addList:{
				type:Object,
				default: () => {}
			},
			tabs:{
				type:Array,
				default: () => []
			}
		},
		data(){
			return {
				app,
				indexMenu,
				capsuleCurrent:0,
				goodsList:[],
				refreshing:false
			}
		},
		watch:{
			current(val,oldVal){
				if(val!=oldVal){
					if(val == 0) {
						if(app.token.accessToken == ''){
							this.$emit('update:current', val)
							setTimeout(()=>{ this.$emit('update:current', oldVal) },500)
							app.login.arouseLogin()
							return;
						}
						this.$emit('followed')
						this.$set(this.goodsList, 0, { list:[], ...new ListParams()})
					}
					this.reqNewMainList()
				}
			}
		},
		mounted(){
			this.goodsList = Array.from({length:this.tabs.length},()=> ({ list:[], ...new ListParams()}) );
			this.reload()
		},
		computed:{
			currentItem() {
				return this.goodsList[this.current]
			},
			swiperHeight(){
				const { platform:{systemInfo} } = app;
				// swiper高度 = 屏幕高度-状态栏高度-首页tab高度(44)-底部tab高度(52) -搜索栏高度 - 底部安全区高度
				const height = systemInfo.screenHeight - systemInfo.statusBarHeight - 96 - uni.upx2px(104) - (systemInfo.safeAreaInsets.bottom || 0);
				return height
			}
		},
		methods: {
			onClose(){
				this.$emit('update:show', false)
			},
			onChangeCurrent(e){
				this.$emit('update:current', e.detail.current)
			},
			reload(pullingdown=false){
				pullingdown&&(this.refreshing=true);
				setTimeout(()=>{
					this.$set(this.goodsList, this.current, { list:[], ...new ListParams()})
					this.reqNewMainList()
				},pullingdown?1000:0);
			},
			onClickJumpDetails(goodCode) {
				app.navigateTo.goGoodsDetails(goodCode)
			},
			reqNewMainList(cb) {
				const { fetchFrom, fetchSize, noMoreData } = this.currentItem;
				if (noMoreData) return;
				const urlNamr = this.tabs[this.current].url;
				const params = {
					fetchFrom,
					fetchSize,
				}
				app.http.GetWithCrypto(`dataApi/goodlist/forsale/${urlNamr}`, params, (data) => {
					this.currentItem.noMoreData = data.isFetchEnd;
					if (fetchFrom == 1 && this.currentItem.list.length) this.currentItem.list = [];
					if (data.goodList) {
						const list = fetchFrom == 1 ? data.goodList : [...this.currentItem.list,...data.goodList];
						this.currentItem.list = app.platform.removeDuplicate(list,'goodCode');
					}
					this.currentItem.empty = this.currentItem.list.length==0;
					this.currentItem.fetchFrom += fetchSize;
					this.refreshing = false;
					cb && cb()
				});
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
		// #endif
	}
	.index-swiper{
		width: 750rpx;
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
		background: #fff;
		padding:5rpx 30rpx 10rpx 30rpx;
		margin-bottom: 20rpx;
		@include flexCenter;
		justify-content: space-between;
	}
	.golden-tab {
		width: 130rpx;
		height: 160rpx;
		@include flexCenter;
		flex-wrap: wrap;
	}
	.golden-img {
		width: 122rpx;
		height: 122rpx;
	}
	.golden-text {
		width: 130rpx;
		height: 34rpx;
		font-size: 21rpx;
		font-weight: 600;
		color: #333333;
		text-align: center;
		margin-top: -8rpx;
		z-index: 6;
	}
	.bg-gradient{
		width: 750rpx;
		height:100rpx;
		background: linear-gradient(to bottom, #fff, $content-bg);
		position: absolute;
		top:0;
		left:0
	}
	.goods-text{
		color:#fff;
		font-size:20rpx;
		height:300rpx;
		background:red;
		margin-top: 20rpx;
	}
	.refresh{
		width: 750rpx;
		height:80rpx;
		@include flexCenter;
	}
	.loadmore-content{
		width: 750rpx;
		height:80rpx;
		background:red;
	}
	.scroll-box{
		width: 100%;
		height:100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	// #ifndef APP-NVUE
	.scroll-list-box{
		width: 100%;
		box-sizing: border-box;
		padding:0 20rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	// #endif
</style>
