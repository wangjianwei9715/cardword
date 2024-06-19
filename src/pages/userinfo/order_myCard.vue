
<template>
	<view class="box-content">
		<navigationbarTabs ref="rNavigationbarTabs" :titles="titles" :current="headerCurrent" backColor="#fff" backgroundColor="rgba(0,0,0,0)" @tabsClisk="onTabsClick"/>
		<view class="header" :style="{'height':headerCurrent==1?'358rpx':'458rpx'}">
			<view class="search-box" v-show="showCardNo">
				<view class="search-icon"></view>
				<input class="search-input" type="text"  v-model="searchText" placeholder="搜索球员、球队"  confirm-type="search"  @confirm="reqSearchList" />
				<view class="search-close" @click="searchText='',reqSearchList()"></view>
			</view>
		</view>
		<view class="header-info-box">
			<view class="play-box" v-show="showCardNo">
				<view class="play-info">
					<view class="play-info-title">{{playInfo.cName}}</view>
					<view class="play-info-sub">{{playInfo.eName}}</view>
					<view class="play-info-sub" v-show="playInfo.desc">{{playInfo.desc}}</view>
				</view>
				<view class="play-info-right">
					<muqian-lazyLoad class="play-info-pic" :src="goodPic" mode="aspectFill"/>
					<view class="play-info-title">共{{totalOrderNum}}条卡密</view>
					<view class="play-info-sub" v-if="goodState==1" @click="onClickGive">
						去赠送<view class="play-info-icon"></view>
					</view>
					<view v-else-if="totalHit>0">共中卡{{totalHit}}张</view>
				</view>
			</view>
			<view class="header-banner" >
				<view class="order-type">
					<view class="order-type-index" :class="{'type-current':item.type==typeTabCurrent}" v-for="(item,index) in typeTab" :key="index" @click="onClickTypeCurrent(item.type)">{{item.name}}</view>
				</view>
				<cardSort class="sort-box" v-if="sortData!='' && showCardNo" :sortData="sortData" @postSort="postSort" />
			</view>
		</view>
		<view v-if="showCardNo" class="list-index">
			<view v-if="goodAllOrder&&listSort==''">
				<view class="card-box" v-for="(item,index) in cardList" :key="index">
					<view class="order-title">订单号：{{item.goodOrder}}</view>
					<view class="card-index" :class="{'win-card-box':items.state==2}" v-for="(items,indexs) in item.nos" :key="indexs">
						<cardNoInfo :data="items" :type="pintuanType"/>
						<muqian-lazyLoad class="card-pic" v-if="items.state==2" :src="items.pic"  preview/>
					</view>
					<view class="more-text" v-show="item.nos&&(item.nos.length<item.noNum)" @click="onClickMoreNos(item)">查看更多</view>
				</view>
			</view>
			<view class="card-box" v-else>
				<view class="card-index" :class="{'win-card-box':items.state==2}" v-for="(items,indexs) in cardList" :key="indexs">
					<cardNoInfo :data="items" :type="pintuanType"/>
					<muqian-lazyLoad class="card-pic" v-if="items.state==2" :src="items.pic"  preview/>
				</view>
			</view>
			<empty v-show="empty"/>
		</view>
		<view v-else class="list-index">
			<view v-if="buyerData.hits.length">
				<view class="buyer-title">系列玩法中卡</view>
				<view class="card-box" >
					<view class="card-index" v-for="(item,indexs) in buyerData.hits" :key="indexs">
						<cardNoInfo :data="item" :type="pintuanType"/>
						<view  class="index-right">
							<muqian-lazyLoad class="card-pic" :src="item.pic" mode="aspectFit" preview/>
						</view>
					</view>
				</view>
			</view>
			<view v-if="buyerData.noAwards.length">
				<view class="buyer-title">拼团活动奖品</view>
				<view class="card-box" >
					<view class="card-index" v-for="(item,indexs) in buyerData.noAwards" :key="indexs">
						<view class="buyerbox-index">
							<view class="title">{{item.awardName}}</view>
							<view class="cardno">中奖卡密：{{item.name}}</view>
							<view class="desc">{{item.state}}</view>
						</view>
						<view  class="index-right">
							<muqian-lazyLoad class="card-pic" :src="item.awardPic" mode="aspectFit" preview/>
						</view>
					</view>
				</view>
			</view>
			<view v-show="showBuyerCard" @click="showBasePopup=true">
				<view class="buyer-title">随机正版基础卡片</view>
				<view class="card-box" >
					<view class="card-index">
						<view class="buyerbox-index">
							<view class="title">随机正版基础卡片x{{goodAllOrder?buyerData.totalBuyNoNum:orderNum}}</view>
							<view class="desc">查看领取方式</view>
						</view>
						<view  class="index-right">
							<muqian-lazyLoad class="card-pic" src="/static/order/card.png" mode="aspectFit"/>
						</view>
					</view>
				</view>
			</view>
			<view >
				<view class="buyer-title">【赠】</view>
				<view class="card-box" >
					<view class="card-index" @click="onClickGoMall">
						<view class="buyerbox-index">
							<view class="title">卡币x{{goodAllOrder?buyerData.totalPoint:orderPoint}}</view>
							<view class="desc">前往卡币商城</view>
						</view>
						<view  class="index-right">
							<muqian-lazyLoad class="card-pic" src="/static/order/kabi.png" mode="aspectFit"/>
						</view>
					</view>
				</view>
			</view>
		</view>
		<baseCardPopup :show.sync="showBasePopup"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import { myCardGoodsType,cardPlayInfo } from '@/tools/switchUtil'
	import { parsePic } from "@/tools/util";
	import cardSort from "./component/cardSort.vue"
	import cardNoInfo from "./component/cardNoInfo.vue"
	import navigationbarTabs from "@/components/navigationbarTabs/navigationbarTabs.vue"
	import baseCardPopup from "@/pages/goods/component/baseCardPopup.vue"
	const title = [
		{index:0,name:'卡密信息'},
		{index:1,name:'购入信息'}
	]
	@Component({
		components:{navigationbarTabs,cardSort,cardNoInfo,baseCardPopup}
	})
	export default class ClassName extends BaseNode {
		titles = title;
		parsePic = parsePic;
		cardList:{[x:string]:any} = [];
		typeTab = [
			{name:'全部订单',type:2},
			{name:'当前订单',type:1}
		]
		typeTabCurrent = 1;
		headerCurrent = 0;
		orderCode = '';
		goodCode = '';
		currentPage = 1;
		pageSize = 30;
		noMoreData = false;
		picList:any = [];
		pintuanType = 0;
		listSort = '';
		sortData:any = [];
		searchText = '';
		typeTabClick = false;
		debug = app.updateDebug == 'on'
		buyerData:any = {
			hits:[],
			noAwards:[],
			totalPoint:0,
			totalBuyNoNum:0
		}
		orderNum = 0;
		orderPoint = 0;
		playInfo:any = {};
		empty=false;
		goodState=0;
		totalHit = 0;
		goodPic = "";
		showBasePopup=false;
		totalOrderNum = 0;
		onLoad(query:any) {
			this.orderCode = query.code || '';
			this.goodCode = query.goodCode;
			this.goodState = query.state || 0;
			this.goodPic = query.pic;
			if(query.goodJump){
				this.typeTabCurrent = 2;
				this.typeTab = [ {name:'全部订单',type:2} ]
			}
			this.pintuanType = Number(query.pintuanType);
			this.sortData = myCardGoodsType(this.pintuanType);
			this.playInfo = cardPlayInfo(this.pintuanType)
			this.orderNum = query.num;
			this.orderPoint = query.point
			this.headerCurrent = Number(query.type)
			this.reqSearchList()
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData() 
		}
		onPageScroll(data: any) {
			//@ts-ignore
			this.$refs.rNavigationbarTabs.setPageScroll(data)
		}
		public get goodAllOrder() : boolean {
			return this.typeTabCurrent==2
		}
		public get showCardNo() : boolean {
			// 卡密信息
			return this.headerCurrent==0
		}
		public get showBuyerCard() : boolean {
			if(this.goodAllOrder){
				return this.buyerData.totalBuyNoNum>0
			}else{
				return this.orderNum>0
			}
		}
		onTabsClick(e:any){
			if(e.index == this.headerCurrent) return;
			this.headerCurrent = e.index;
			this.reqSearchList()
		}
		onClickTypeCurrent(type:number){
			if(type == this.typeTabCurrent) return;
			if(this.typeTabClick){
				return;
			}
			this.typeTabCurrent = type;
			this.reqSearchList()
		}
		postSort(val:string){
			this.listSort = val;
			this.reqSearchList()
		}
		reqSearchList(){
			if(this.showCardNo){
				this.currentPage = 1;
				this.noMoreData = false;
				this.reqNewData()
			}else{
				this.orderInfo()
			}
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData||this.typeTabClick) {
				return;
			}
			let params:{[x:string]:any} = {
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
			}
			// 排序方式
			let url = `me/orderInfo/buyer/${this.orderCode}/nos`
			if(this.listSort) params.sort = this.listSort;
			if(this.goodAllOrder) {
				params.noSize = 90
				params.leadOrderCode = this.orderCode;
				url = this.listSort ? `me/good/${this.goodCode}/orderNos/plain` : `me/good/${this.goodCode}/orderNos/group`;
			};
			if(this.searchText) params.q = this.searchText;
			this.typeTabClick = true;
			if(this.currentPage==1) this.cardList = [];
			app.http.Get(`${url}`, params, (data: any) => {
				if(data.empty) return;

				this.noMoreData = data.totalPage<=this.currentPage;
				if(data.list){
					this.cardList = this.cardList.concat(data.list);
				}
				this.totalOrderNum = this.goodAllOrder ? (data.totalNoNum || 0) : (data.total || 0);
				this.empty = this.cardList.length==0;
				this.debug && app.platform.refrain(this.cardList);
				this.typeTabClick = false;
				this.currentPage++;
				if(cb) cb()
			},(err:any)=>{
				console.log('err=',err)
				this.typeTabClick = false;
			});
		}
		onClickMoreNos(item:any){
			const params = {
				pageIndex:Math.floor(item.nos.length/30)+1,
				pageSize:30,
				q:this.searchText
			}
			app.http.Get(`me/orderInfo/buyer/${item.goodOrder}/nos`,params,(res:any)=>{
				item.nos = item.nos.concat(res.list)
			})
		}
		orderInfo(){
			const currentOrder = this.typeTabCurrent==1;
			const urlFront = currentOrder ? "me/orderInfo/buyer/" : "me/good/";
			const code = currentOrder ? this.orderCode : this.goodCode;
			const params = {
				pageIndex:1,pageSize:100,leadOrderCode:currentOrder?null:this.orderCode
			}
			app.http.Get(`${urlFront}${code}/hits`,params,(res:any)=>{
				this.buyerData.hits = res.list || [];
				res.totalPoint && (this.buyerData.totalPoint = res.totalPoint)
				res.totalBuyNoNum && (this.buyerData.totalBuyNoNum = res.totalBuyNoNum)
			})
			app.http.Get(`${urlFront}${code}/noAwards`,params,(res:any)=>{
				this.buyerData.noAwards = res.list || []
			})
		}
		onClickGoMall(){
			app.navigateTo.goMallIndex()
		}
		onClickGive(){
			uni.navigateTo({
				url:`/pages/userinfo/giving/giving_list?code=${this.goodCode}&pintuanType=${this.pintuanType}&orderCode=${this.goodAllOrder?this.cardList[0].goodOrder:this.orderCode}`
			})
	}
	}
</script>

<style lang="scss">
	@mixin fontSfTR {
		
	}
	.card-pic{
		width: 100rpx;
		height:100rpx;
	}
	.header{
		width: 100%;
		height:458rpx;
		background:url(@/static/order/mycard.png) no-repeat top/100% 626rpx;
		box-sizing: border-box;
		padding-top:186rpx;
	}
	.order-title{
		@include fontSfTR;
		font-size: 20rpx;
		
		color: #BBBBBB;
		margin-bottom: 12rpx;
	}
	.more-text{
		width: 100%;
		text-align: center;
		margin-top: 6rpx;
		color:#333333;
		font-size: 24rpx;
	}
	.header-info-box{
		margin-top: -154rpx;
	}
	.header-banner{
		width: 100%;
		background:#fff;
		box-sizing: border-box ;
		z-index: 9;
		margin-bottom: 10rpx;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
		margin-top: -4rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:0 20rpx;
	}
	.list-index{
		background:#fff;
		box-sizing: border-box;
		margin-top: -10rpx;
		padding-bottom: 30rpx;
	}
	.buyer-title{
		@include fontSfTR;
		width: 100%;
		box-sizing: border-box;
		padding-left: 20rpx;
		font-size: 20rpx;
		
		color: #BBBBBB;
		margin-bottom: 8rpx;
	}
	.order-type{
		width: 280rpx;
		height:100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}
	
	.box-content{
		width: 100%;
		box-sizing:border-box;
	}
	.card-list{
		width: 100%;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 10px;
		margin-top: 14rpx;
	}
	.card-box{
		width: 100%;
		box-sizing: border-box;
		padding:0 20rpx;
		margin-bottom: 20rpx;
	}
	.card-index{
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background:#F6F7FB;
		margin-bottom: 16rpx;
		border-radius: 4rpx;
		padding:20rpx
	}
	.win-card-box{
		border: 1rpx solid #FA1545;
	}
	.order-type-index{
		@include fontSfTR;
		width: 130rpx;
		height:44rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		font-weight: 600;
		color: #DDDDDD;
	}
	.type-current{
		color:#333;
	}
	.card-more-btn{
		width: 100%;
		height:60rpx;
		line-height: 60rpx;
		text-align: center;
		color:#FB4E3E;
		font-size: 26rpx;
	}
	.index-left{
		@include fontSfTR;
		width: 100%;
		box-sizing: border-box;
		display: -webkit-box;
		align-items: center;
		font-size: 22rpx;
		
		color: #333333;
		line-height: 32rpx;
		background: #F6F7F8;
	}
	.buyerbox-index{
		width: 100%;
		min-height:100rpx;
		position: relative;
		box-sizing: border-box;
		padding-bottom: 40rpx;
		.title{
			font-size: 26rpx;
			
			font-weight: 600;
			color: #333333;
		}
		.cardno{
			@include fontSfTR;
			font-size: 22rpx;
			
			color: #999999;
			margin-top: 8rpx;
			line-height: 34rpx;
		}
		.desc{
			@include fontSfTR;
			position: absolute;
			bottom:0;
			left:0;
			font-size: 18rpx;
			
			color: #DDDDDD;
		}
	}
	.award-left{
		@include fontSfTR;
		width: 610rpx;
		min-height: 96rpx;
		box-sizing: border-box;
		display: inline-flex;
		flex-wrap: wrap;
		font-size: 22rpx;
		
		color: #333333;
		line-height: 32rpx;
		padding:10rpx 20rpx;
		background: #F6F7F8;
	}
	.index-right{
		width: 86rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 21rpx;
		
		
		color:#fff;
		margin-right: 8rpx;
	}
	.red-color{
		color:#FB4E3E
	}
	.index-right-red{
		width: 12rpx;
		height:22rpx;
		background:url(../act/static/pingtai/icon_red.png) no-repeat center;
		background-size: 100% 100%;
		margin-left:6rpx;
	}
	.index-right-pt{
		width: 12rpx;
		height:22rpx;
		background:url(../act/static/pingtai/icon_right.png) no-repeat center;
		background-size: 100% 100%;
		margin-left:6rpx;
	}
	.bingo-name{
		font-weight: bold !important;
	}
	.winning-card{
		background:#ef3333;
		color:#fff;
	}
	.search-box {
		width: 710rpx;
		height: 74rpx;
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		z-index: 10;
		margin:0 auto;
		background: rgba(255,255,255,0.4);
		border-radius: 5rpx;
		padding:0 20rpx;
		opacity: 0.6;
	}
	.search-icon{
		width: 32rpx;
		height:32rpx;
		background:url(@/static/goods/detail/search.png) no-repeat center;
		background-size:100% 100%;
		position: absolute;
		left:20rpx;
		top:50%;
		margin-top: -16rpx;
	}
	.search-close{
		width: 32rpx;
		height:32rpx;
		background:url(@/static/goods/detail/search-close.png) no-repeat center;
		background-size:100% 100%;
		position: absolute;
		right:20rpx;
		top:50%;
		margin-top: -16rpx;
	}
	.search-input{
		width: 100%;
		height:64rpx;
		border-radius: 4rpx;
		font-size: 24rpx;
		
		font-weight: 600;
		color: rgba(255,255,255,0.4);
		padding-left:48rpx ;
	}
	.play-box{
		width: 710rpx;
		height:154rpx;
		margin:0 auto;
		position: relative;
		display: flex;
		justify-content: space-between;
		.play-info{
			width: 346rpx;
			height:128rpx;
			box-sizing: border-box;
			background:url(@/static/order/my_card.png) no-repeat center / 100% 100%;
			padding:12rpx 0 12rpx 144rpx;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
		}
		.play-info-right{
			width: 346rpx;
			height:128rpx;
			box-sizing: border-box;
			background:url(@/static/order/my_card_r.png) no-repeat center / 100% 100%;
			padding:20rpx 0 20rpx 144rpx;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			position: relative;
		}
		.play-info-pic{
			width: 88rpx;
			height:88rpx;
			position: absolute;
			left:24rpx;
			top:20rpx;	
		}
		.play-info-title{
			@include fontSfTR;
			width: 100%;
			color:#FFFFFF;
			font-size: 22rpx;
			height:32rpx;
		}
		.play-info-sub{
			@include fontSfTR;
			width: 100%;
			color:rgba(255, 255, 255, 0.70);
			font-size: 22rpx;
			height:32rpx;
			display: flex;
			align-items: center;
		}
		.play-info-icon{
			@include fontSfTR;
			width: 14rpx;
			height:20rpx;
			background:url(@/static/order/my_card_right.png) no-repeat center / 100% 100%;
			margin-left: 4rpx;
		}
	}
</style>
