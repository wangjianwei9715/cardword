<template>
	<view class="box-content">
		<navigationSearch :navigatetoTitle="'该商品的卡密'" :searchText="searchText" :searchEmit="searchEmit"/>
		<statusbar/>
		<view class="header-banner" >
			<view class="order-type">
				<view class="order-type-index" :class="{'type-current':item.type==headerCurrent}" v-for="(item,index) in headerTab" :key="index" @click="onClickHeaderCurrent(item.type)">{{item.name}}</view>
			</view>
			<view class="order-type">
				<view class="order-type-index" :class="{'type-current':item.type==typeTabCurrent}" v-for="(item,index) in typeTab" :key="index" @click="onClickTypeCurrent(item.type)">{{item.name}}</view>
			</view>
		</view>
		<view v-if="headerCurrent==1">
			<sortTab  v-if="sortData!=''" :sortData="sortData" @postSort="postSort" />
			<view v-if="typeTabCurrent==2&&listSort==''">
				<view class="card-box" v-for="(item,index) in cardList" :key="index">
					<view style="color:red">订单编号{{item.goodOrder}}</view>
					<view class="card-index" v-for="(items,indexs) in item.nos" :key="indexs">
						<text class="index-left" :selectable="true" :class="{'bingo-name':items.bingo}">{{items.name}}</text>
						<view  class="index-right">
							<muqian-lazyLoad class="card-pic" v-if="items.state==2" :src="items.pic"  preview/>
						</view>
					</view>
					<view v-show="item.nos&&(item.nos.length<item.noNum)" @click="onClickMoreNos(item)">查看更多</view>
				</view>
			</view>
			<view class="card-box" v-else>
				<view class="card-index" v-for="(items,indexs) in cardList" :key="indexs">
					<text class="index-left" :selectable="true" :class="{'bingo-name':items.bingo}">{{items.name}}</text>
					<view  class="index-right">
						<muqian-lazyLoad class="card-pic" v-if="items.state==2" :src="items.pic"  preview/>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view v-if="buyerData.hits.length">
				<view class="buyer-title">系列玩法中卡</view>
				<view class="card-box" >
					<view class="card-index" v-for="(item,indexs) in buyerData.hits" :key="indexs">
						<text class="index-left" :selectable="true" :class="{'bingo-name':item.bingo}">{{item.name}}</text>
						<view  class="index-right">
							<muqian-lazyLoad class="card-pic" :src="item.pic"  preview/>
						</view>
					</view>
				</view>
			</view>
			<view v-if="buyerData.noAwards.length">
				<view class="buyer-title">拼团活动奖品</view>
				<view class="card-box" >
					<view class="card-index" v-for="(item,indexs) in buyerData.noAwards" :key="indexs">
						<view class="award-left" :selectable="true" :class="{'bingo-name':item.bingo}">
							<view>{{item.awardName}}</view>
							<view>中奖卡密：{{item.name}}</view>
							<view>{{item.state}}</view>
						</view>
						<view  class="index-right">
							<muqian-lazyLoad class="card-pic" :src="item.awardPic"  preview/>
						</view>
					</view>
				</view>
			</view>
			<view >
				<view class="buyer-title">随机正版基础卡片</view>
				<view class="card-box" >
					<view class="card-index">
						<view class="index-left">
							<view>随机正版基础卡片x{{typeTabCurrent==1?orderNum:buyerData.totalNoNum}}</view>
							<!-- <view>查看领取方式</view> -->
						</view>
						<view  class="index-right">
							<!-- <muqian-lazyLoad class="card-pic" :src=""  preview/> -->
						</view>
					</view>
				</view>
			</view>
			<view >
				<view class="buyer-title">【赠】</view>
				<view class="card-box" >
					<view class="card-index">
						<view class="index-left">
							<view>卡币x{{typeTabCurrent==1?orderPoint:buyerData.totalPoint}}</view>
							<!-- <view>查看领取方式</view> -->
						</view>
						<view  class="index-right">
							<!-- <muqian-lazyLoad class="card-pic" :src=""  preview/> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import { myCardGoodsType } from '@/tools/switchUtil'
	import { parsePic } from "@/tools/util";
	@Component({})
	export default class ClassName extends BaseNode {
		parsePic = parsePic;
		myCardGoodsType = myCardGoodsType;
		cardList:{[x:string]:any} = [];
		typeTab = [
			{name:'当前订单',type:1},
			{name:'全部订单',type:2}
		]
		headerTab = [
			{name:'卡密信息',type:1},
			{name:'购入信息',type:2}
		]
		typeTabCurrent = 1;
		headerCurrent = 1;
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
		searchEmit = 'orderMyCard';
		typeTabClick = false;
		debug = app.updateDebug == 'on'
		buyerData:any = {
			hits:[],
			noAwards:[],
			totalPoint:0,
			totalNoNum:0
		}
		orderNum = 0;
		orderPoint = 0;
		onLoad(query:any) {
			this.orderCode = query.code;
			this.goodCode = query.goodCode;
			this.pintuanType = Number(query.pintuanType);
			this.sortData = this.myCardGoodsType(this.pintuanType);
			this.orderNum = query.num;
			this.orderPoint = query.point
			this.reqNewData()

			this.onEventUI(this.searchEmit,(res)=>{
				this.searchText = res;
				this.reqSearchList()
			})
			
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData() 
		}
		onClickTypeCurrent(type:number){
			if(type == this.typeTabCurrent) return;
			if(this.typeTabClick){
				return;
			}
			this.typeTabCurrent = type;
			this.reqSearchList()
			
		}
		onClickHeaderCurrent(type:number){
			if(type == this.headerCurrent) return;
			this.headerCurrent = type;
			this.reqSearchList()
		}
		postSort(val:string){
			this.listSort = val;
			this.reqSearchList()
		}
		reqSearchList(){
			if(this.headerCurrent==1){
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
			if(this.typeTabCurrent == 2) {
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
				pageSize:30
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
				res.totalNoNum && (this.buyerData.totalNoNum = res.totalNoNum)
			})
			app.http.Get(`${urlFront}${code}/noAwards`,params,(res:any)=>{
				this.buyerData.noAwards = res.list || []
			})
		}
	}
</script>

<style lang="scss">
	.card-pic{
		width: 100rpx;
		height:100rpx;
	}
	.header-banner{
		width: 100%;
		background:#fff;
		box-sizing: border-box ;
		z-index: 9;
		margin-bottom: 10rpx;
	}
	.buyer-title{
		margin-top: 30rpx;
		width: 100%;
		box-sizing: border-box;
		padding-left: 20rpx;
	}
	.order-type{
		width: 685rpx;
		height:62rpx;
		background:#F2F2F2;
		margin:0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding:0 4rpx;
		margin-bottom: 20rpx;
	}
	
	.box-content{
		width: 100%;
		box-sizing:border-box;
		padding-top: 108rpx;
	}
	.card-list{
		width: 100%;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 10px;
		margin-top: 14rpx;
	}
	.order-code{
		width: 100%;
		height:37rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.order-code-left{
		height:37rpx;
		display: flex;
		align-items: center;
	}
	.order-code-box{
		height:37rpx;
		line-height: 37rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #FFFFFF;
		background:#40444F;
		box-sizing: border-box;
		padding:0 15rpx;
	}
	.order-code-now{
		height:37rpx;
		line-height: 37rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: $btn-red;
		margin-left: 12rpx;
	}
	.order-code-right{
		height:66rpx;
		line-height: 66rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	.card-box{
		width: 100%;
		box-sizing: border-box;
		padding:0 14rpx;
	}
	.card-index{
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		background:#fff;
		margin-top: 10rpx;
		
	}
	.order-type-index{
		width: 338rpx;
		height:54rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 29rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #959699;
	}
	.type-current{
		background:#fff;
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
		width: 610rpx;
		min-height: 96rpx;
		box-sizing: border-box;
		display: -webkit-box;
		align-items: center;
		font-size: 22rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #333333;
		line-height: 32rpx;
		padding:10rpx 20rpx;
		background: #F6F7F8;
	}
	.award-left{
		width: 610rpx;
		min-height: 96rpx;
		box-sizing: border-box;
		display: inline-flex;
		flex-wrap: wrap;
		font-size: 22rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
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
		font-family: Source Han Sans CN;
		font-weight: 400;
		color:#fff;
		background:#CCCCCC;
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
</style>
