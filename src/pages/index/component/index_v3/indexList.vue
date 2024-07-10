<template>
	<swiper class="index-swiper" :style="{ height: swiperHeight + 'px' }" :disable-touch="refreshing" :current="current" @change="onChangeCurrent">
		<swiper-item v-for="(item,index) in tabs" :key="index">
			<div class="header-bg" :style="{height:homeListBg[index]?homeListBg[index].height:'280rpx'}">
				<image v-if="homeListBg[index]" mode="widthFix" class="bg-image" :style="{height:homeListBg[index].height}" :src="homeListBg[index].src"/>
			</div>
			<div class="list-container" :style="listContainerStyle">
				<!-- #ifdef APP-NVUE -->
				<waterfall column-count="2" column-width="auto" :show-scrollbar="false" left-gap="6" right-gap="6" column-gap="6" @loadmore="reqNewMainList()" >
					<refresh class="refresh" @refresh="reload(true)" :display="refreshing ? 'show' : 'hide'">
						<u-loading-icon mode="semicircle"></u-loading-icon>
					</refresh>
					<header ref="goTop"></header>
					<header v-if="index==0">
						<indexHome :homeSeries="homeSeries" :headerAddList="headerAddList" :broadCast="homeBroadCast"/>
					</header>
					<header v-if="index==1">
						<indexSeries :seriesId.sync="seriesId" @onSeries="reload()"/>
					</header>
					<header v-if="index>=1" style="position:sticky">
						<indexSortTab :index="index" @sortChange="onSortChange"/>
					</header>
					<cell v-for="(item,index) in goodsList[index]?goodsList[index].list:[]" >
						<indexListGoods :data="item"/>
					</cell>
					<header v-if="goodsList[index]&&goodsList[index].empty">
						<empty></empty>
					</header>
					<header v-if="goodsList[index]&&goodsList[index].list.length">
						<u-loadmore :line="true" loadingIcon="semicircle"
						lineLength="20rpx" :status="goodsList[index]&&goodsList[index].noMoreData ? 'nomore' : 'loading'" nomore-text="没有更多了" fontSize="24rpx" />
					</header>
				</waterfall>
				<!-- #endif -->

				<!-- #ifndef APP-NVUE -->
				<scroll-view class="scroll-box" @scrolltolower="reqNewMainList()" :refresher-enabled="true" refresher-default-style="white" @refresherrefresh="reload(true)" :refresher-triggered="refreshing" :scroll-y="true">
					<div v-if="index==0">
						<indexHome :homeSeries="homeSeries" :headerAddList="headerAddList" :broadCast="homeBroadCast"/>
					</div>
					<indexSeries v-if="index==1" :seriesId.sync="seriesId" @onSeries="reload()"/>
					<indexSortTab style="z-index:999" v-if="index>=1" :index="index" @sortChange="onSortChange"/>
					<div class="scroll-list-box">
						<div class="scroll-index" v-for="item in goodsList[index]?goodsList[index].list:[]" >
							<indexListGoods :data="item"/>
						</div>
					</div>
					<div v-if="goodsList[index]&&goodsList[index].empty">
						<empty></empty>
					</div>
					<div v-if="goodsList[index]&&goodsList[index].list.length">
						<u-loadmore :line="true" loadingIcon="semicircle"
						lineLength="20rpx" :status="goodsList[index]&&goodsList[index].noMoreData ? 'nomore' : 'loading'" nomore-text="没有更多了" fontSize="24rpx" />
					</div>
				</scroll-view>
				<!-- #endif -->
			</div>
		</swiper-item>
	</swiper>
</template>

<script>
	const app = getApp().globalData.app;
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom')
	// #endif
	import { homeListBg } from "@/tools/DataExchange.js"
	import indexListGoods from './indexListGoods.vue'
	import indexHome from './indexHome.vue'
	import indexSeries from './indexSeries.vue'
	import indexSortTab from './indexSortTab.vue'
	class ListParams {
		fetchFrom=1;
		fetchSize=10;
		noMoreData=false;
		empty=false;
	}
	class Sort {
		pintuan_type=null;
		genre=0;
		od=""
	}
	export default {
		components:{
			indexListGoods,
			indexHome,
			indexSeries,
			indexSortTab
		},
		props: {
			current:{
				type:Number,
				default:0
			},
			homeData:{
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
				homeListBg,
				goodsList:[],
				refreshing:false,
				adPlace:{},
				sortData:{},
				seriesId:null,
			}
		},
		watch:{
			current(val,oldVal){
				if(val!=oldVal){
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
				// swiper高度 = 屏幕高度 - 底部tab高度(52) - 底部安全区高度
				const height = systemInfo.screenHeight - 52 - (systemInfo.safeAreaInsets.bottom || 0);
				return height
			},
			listContainerStyle(){
				// 状态栏高度+首页tab高度+搜索栏高度
				const headerHeight = (app.statusBarHeight+44+uni.upx2px(104))
				return {
					height:(this.swiperHeight-headerHeight)+'px',
					top:headerHeight+'px'
				}
			},
			headerAddList(){
				return (this.homeData.addList&&this.homeData.addList.filter( x => x.location==3 )) || []
			},
			homeBroadCast(){
				return this.homeData.broadCast || []
			},
			homeSeries(){
				return this.homeData.topIconSeries || {pic:"",id:0}
			}
		},
		methods: {
			onClose(){
				this.$emit('update:show', false)
			},
			onChangeCurrent(e){
				this.$emit('update:current', e.detail.current)
			},
			onSortChange(data){
				this.$set(this.sortData, this.current, data)
				this.reload()
			},
			reload(pullingdown=false){
				pullingdown&&(this.refreshing=true);
				setTimeout(()=>{
					this.$set(this.goodsList, this.current, { list:[], ...new ListParams()})
					this.reqNewMainList()
				},pullingdown?1000:0);
			},
			goTop(){
				// #ifdef APP-NVUE
				dom.scrollToElement(this.$refs.goTop[this.current], {
					animated: true
				})
				// #endif
			},
			reqNewMainList(cb) {
				const { fetchFrom,fetchSize,noMoreData } = this.currentItem;
				if (noMoreData) return;
				const urlNamr = this.tabs[this.current].url;
				const sort = this.sortData[this.current]|| {}
				let params = { 
					fetchFrom, 
					fetchSize, 
					...sort
				}
				if(this.current==1&&this.seriesId>0){
					params.iconId = this.seriesId
				}
				app.http.GetWithCrypto(`dataApi/goodlist/forsale/${urlNamr}`, params, (data) => {
					this.currentItem.noMoreData = data.isFetchEnd;

					const goodList = this.listSort(data.goodList,data.slot?.adPlace,fetchFrom);
					if (goodList) {
						const list = fetchFrom == 1 ? goodList : [...this.currentItem.list,...goodList];
						this.currentItem.list = app.platform.removeDuplicate(list,'goodCode');
					}
					this.currentItem.empty = this.currentItem.list.length==0;
					this.currentItem.fetchFrom += fetchSize;
					this.refreshing = false;
					cb && cb()
				});
				
			},
			listSort(goodList=[],adPlace={},fetchFrom){
				if(this.current!=0) return goodList;

				const { dyBroadcast=[] } = this.homeData;
				if(fetchFrom==1){
					this.adPlace = adPlace;
					dyBroadcast.length&&(this.adPlace[4] = dyBroadcast)
				}
				Object.keys(this.adPlace).forEach(key => {
					const index = key-1-this.currentItem.list.length;
					if(index <= goodList.length){
						const data = {
							special_type:key==4?'dyBroadcast':'ad',
							goodCode:`ad${key}`,
							list:this.adPlace[key]
						}
						goodList.splice(index, 0, data); 
						delete this.adPlace[key]
					}
				});
				return goodList
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
	.list-container{
		width: 750rpx;
		position: absolute;
		left:0;
		right:0;
	}
	
	.refresh{
		width: 750rpx;
		height:80rpx;
		@include flexCenter;
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
		padding:0 12rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	// #endif
	.header-bg{
		width: 750rpx;
		height:280rpx;
		position: absolute;
		top:0;
		left:0;
		background: #fff;
		overflow: hidden;
	}
	.bg-image{
		width: 750rpx;
	}
</style>
