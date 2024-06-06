<template>
	<view class="content">
		<view class="top-header">
			<muqian-lazyLoad class="series-bg" :src="decodeURIComponent(seriesData.main.backPic || defaultBg)" />
			<transitionNav ref='transitionNav' @navBackGroundShowChange="navBackGroundShowChange" :needIconShadow="false" :title="`${seriesData.main.year} ${seriesData.main.name}`">
				<template slot="slotRight">
					<view :class="topHasBack?'icon-replace-back':'icon-replace'" @click="onClickSeriesSelect"></view>
				</template>
			</transitionNav>
			<view class="header-info">
				<view class="header-info-l">
					<view class="series-logo">
						<muqian-lazyLoad class="logo" borderRadius="3rpx" :src="decodeURIComponent(seriesData.main.logo||defaultSeriesLogo)" />
					</view>
					<view class="series-info-box">
						<view class="series-info-name u-line-2">{{seriesData.main.year}} {{seriesData.main.name}}</view>
						<view class="series-info-num">图鉴完成度：{{seriesData.main.numLoaded}}/{{seriesData.main.numAll}}</view>
					</view>
				</view>
				<view class="series-follow" :class="{'followed':seriesData.followed}" @click="$u.throttle(onClickFollow,1000)">{{seriesData.followed?'已关注':'关注'}}</view>
			</view>
		</view>
		<u-sticky :customNavHeight="statusBarHeight + 'px'" offsetTop="88rpx">
			<u-tabs 
				:list="tabsData.list" :current="tabsData.current" @change="onChangeTabs" lineWidth="375rpx" lineHeight="6rpx" lineColor="#FA1545"
				:itemStyle="{width:'375rpx',height:'78rpx',lineHeight:'72rpx',padding:0,background:'#fff'}"
				:activeStyle="{color: '#333333',fontSize: '33rpx',fontWeight:'600'}" 
				:inactiveStyle="{color: '#959695',fontSize: '27rpx'}" 
			/>
		</u-sticky>
		<filterCardList ref="filterCardList" v-show="tabsData.current==0" :seriesCode="seriesCode" :search="seriesData.search"/>
		<view v-show="tabsData.current==1" class="post-box">
			<view class="header">
				<view class="input-box">
					<view class="icon-search"></view>
					<input class="search-input" v-model="postSearch" :adjust-position="false" placeholder="搜索球员/卡种/限编球队" @confirm="againAlbum()"/>
				</view>
			</view>
            <waterfalls v-if="tabsData.current==1 && listParams.show" v-model="albumList" :add-time="50"></waterfalls>
			<view class="btn-publish" @click="onClickGoPublish"></view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import { SeriesDetail } from './constants/interface'
	import filterCardList from './components/filterCardList.vue'
	import waterfalls from "@/pages/cardForum/components/waterfalls.vue"
	import { illustration } from './constants/constants'
	class ListParams {
		pageSize:number=10;
		scrollId:string="";
		noMoreData:boolean=false;
		empty=false;
		show=false;
	}
	@Component({
		components:{filterCardList,waterfalls}
	})
	export default class ClassName extends BaseNode {
		defaultSeriesLogo = illustration.defaultSeriesLogo;
		defaultBg = illustration.defaultSeriesBg;
		statusBarHeight = app.statusBarHeight;
		tabsData = {
			list:[{name:'图鉴'},{name:'玩家卡册'}],
			current:0,
		}
		seriesCode = "";
		seriesData:SeriesDetail = {
			"code":0,
			"followed": false, //当前用户是否已关注此系列
			"main": { //data
				"name": "", //sport_type
				"year": "", //year
				"logo": "", //logo
				"backPic": "", //backPic
				"numLoaded": 0, 
				"numAll":0, 
			},
			"search": { //data
				"cardSets": '', //显示后台翻译过的卡种，展示72小时内点击量最高的20条内容（含详细筛选），未翻译的卡种不显示
				"players": '', //该系列下筛选点击次数最多的前20个球员，展示72小时内点击量最高的20条内容
				"seqs": '' //该系列下筛选点击次数最多的前20条限编，展示72小时内点击量最高的20条内容
			}
		};
		refresherTriggered = false;
		topHasBack = false;
		postSearch = "";
		albumList:any = [];
		listParams = new ListParams();
		onLoad(query: any) {
			if(query.seriesCode) this.seriesCode = query.seriesCode;
			this.onEventUI("seriesSelect", (res) => {
				this.onChangeTabs({index:0});
				this.seriesCode = res.code;
				this.postSearch = "";
				this.initEvent();
			});
			this.initEvent();
		}
		//   加载更多数据
		onReachBottom() {
			if(this.tabsData.current==0){
				this.$refs.filterCardList.againList(1)
			}else{
				this.reqAlbumList()
			}
		}
		onPageScroll(data: any) {
			//@ts-ignore
			this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
		}
		navBackGroundShowChange(event: any) {
			this.topHasBack = event
		}
		initEvent(){
			this.getSeriesDetail();
		}
		getSeriesDetail(){
			app.http.GetWithCrypto(`dataApi/cardIllustration/series/detail/${this.seriesCode}`,{},(res:any)=>{
				this.seriesData = res;
			})
		}
		onClickFollow(){
			app.platform.hasLoginToken(()=>{
				const type = this.seriesData.followed ? 'unfollow' : 'follow';
				app.http.Post(`cardIllustration/series/${this.seriesCode}/${type}`,{},(res:any)=>{
					!this.seriesData.followed && uni.showToast({ title: '关注成功', icon:'none' });
					this.seriesData.followed = !this.seriesData.followed;
				})
			})
		}
		onChangeTabs({index}:any){
			if(this.tabsData.current == index) return;
			this.tabsData.current = index
			if(index == 0){
				this.albumList = [];
			}else{
				this.againAlbum()
			}
		}
		onClickSeriesSelect(){
			uni.navigateTo({
				url:'seriesSelect?back=true'
			})
		}
		onClickGoPublish(){
			app.platform.hasLoginToken(()=>{
				const { year, name } = this.seriesData.main;
				app.navigateTo.goAlbumCreate(this.seriesCode,`${year} ${name}`)
			})
		}
		againAlbum(){
			this.listParams = new ListParams();
			this.reqAlbumList()
		}
		reqAlbumList(cb?: Function) {
			// 获取更多商品
			const { pageSize,scrollId, noMoreData,empty } = this.listParams;
			if (noMoreData || empty)  return;
			let params:any = {
				pageSize
			}
			if(scrollId==""){
				params.q = this.postSearch
			}else{
				params.scrollId = scrollId
			}
			app.http.Get(`cardIllustration/list/series/${this.seriesCode}/album`, params, (data: any) => {
				let arr = data.list || [];
				this.albumList = scrollId == "" ? arr : [...this.albumList, ...arr];
				this.listParams.show = true;
				this.listParams.empty = data.total == 0;
				this.listParams.noMoreData = data.end && data.total>0;
				this.listParams.scrollId = data.scrollId
				if (cb) cb();
			});
		}
		
	}
</script>

<style lang="scss">
	page{
        background:#F6F7F8;
    }
	.content{
		width: 100%;
		height:100%;
		box-sizing: border-box;
	}
	.top-header{
		width: 100%;
		height:368rpx;
		background:#000000;
		position: relative;
	}
	.series-bg{
		width: 100%;
		height:368rpx;
		position: absolute;
		left:0;
		top:0;
		z-index: 3;
		filter: brightness(0.61)
	}
	.header-info{
		width: 100%;
		height:104rpx;
		box-sizing: border-box;
		padding: 0 35rpx;
		position: absolute;
		left:0;
		bottom:67rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 5;
	}
	.header-info-l{
		width: 550rpx;
		height:104rpx;
		display: flex;
		align-items: center;
	}
	.series-logo{
		width: 104rpx;
		height: 104rpx;
		border-radius: 5rpx;
		background:$pic-bg;
		.logo{
			width: 104rpx;
			height: 104rpx;
		}
	}
	.series-info-box{
		height:104rpx;
		width: 416rpx;
		margin-left: 29rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 2rpx 0 10rpx 0;
	}
	.series-info-name{
		width: 100%;
		font-size: 33rpx;
		
		font-weight: 600;
		color: #FFFFFF;
	}
	.series-info-num{
		width: 100%;
		font-size: 21rpx;
		
		font-weight: 400;
		color: #FFFFFF;
	}
	.series-follow{
		width: 122rpx;
		height:51rpx;
		background: #FA1545;
		border-radius: 5rpx;
		text-align: center;
		line-height: 51rpx;
		font-size: 25rpx;
		
		font-weight: 600;
		color: #FFFFFF;
		box-sizing: border-box;
	}
	.followed{
		background: #fff;
		color:#909090;
		font-weight: 400;
	}
	.icon-replace{
		width: 46rpx;
		height:32rpx;
		background:url(@/static/illustration/icon_replace.png) no-repeat center / 100% 100%;
	}
	.icon-replace-back{
		width: 46rpx;
		height:32rpx;
		background:url(@/static/illustration/icon_replace_.png) no-repeat center / 100% 100%;
	}
	.fixed-top /deep/ .u-tabs__wrapper__nav__line{
		bottom:0
	}
	.series-center{
		width: 100%;
		height:2000rpx;
		background:yellow;
		box-sizing: border-box;
		position: relative;
		z-index: 1;
		overflow: auto;
	}
	.post-box{
		width: 100%;
		box-sizing: border-box;
		.header{
			width: 100%;
			box-sizing: border-box;
			padding:20rpx;
			background:#fff; 
			margin-bottom: 20rpx;
		}
		.input-box{
			width: 100%;
			height:69rpx;
			background: #F5F5F5;
			border-radius: 3rpx;
			position: relative;
			box-sizing: border-box;
			padding-left: 66rpx;
			display: flex;
			align-items: center;
		}
		.icon-search{
			width: 28rpx;
			height:28rpx;
			background:url(@/static/index/sousuo@2x.png) no-repeat center / 100% 100%;
			position: absolute;
			left:26rpx;
			top:50%;
			margin-top: -14rpx;
		}
		.search-input{
			width: 100%;
			font-size: 25rpx;
			
			font-weight: 400;
			color: #333;
		}
		.btn-publish{
			width: 82rpx;
			height:82rpx;
			position: fixed;
			bottom:60rpx;
			right:20rpx;
			background:url(@/static/illustration/icon_add_big.png) no-repeat center / 100% 100%;
		}
	}
</style>
