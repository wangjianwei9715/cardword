<template>
	<view class="content">
		<view class="header">
			<statusbar style="background:#fff" />
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
				<view class="header-title">可赠送的卡密</view>
				<view class="icon-search" @click="onClickSearch"></view>
				<view class="icon-help" @click="onClickShowRule"></view>
			</view>
		    <view class="header-banner" v-if="sortData!=''">
				<sortTab :sortData="sortData" @postSort="postSort" />
			</view>
		</view>
		
		<view class="box-content">
			<statusbar/>
			
			<view class="card-list"  v-show="cardList.length>0" v-for="(item,index) in cardList" :key="index">
				<view class="order-code">
					<view class="order-code-left"><view class="order-code-box">订单：{{item.orderCode}}</view><view class="order-code-now">{{orderCode==item.orderCode?'当前订单 ':''}}</view></view>
				</view>
				<view class="card-box">
					<view class="card-index" v-for="(items,indexs) in item.noList" :key="indexs">
						<view class="index-left" :class="{'bingo-name':item.bingo}">{{items.name}}</view>
						<view  class="index-right" @click="onClickCurrentOrder(items,item.orderCode)">
							<view class="index-right-currentno" :class="{'index-right-current':items.id == currentData.noId}"></view>
						</view>
					</view>
					<view class="card-more-btn" v-if="item.hasMore" @click="reqNewCardList(item.orderCode,index)">查看更多</view>
				</view>
			</view>
			
			<view v-show="cardSortList!=''">
				<view class="card-index" v-for="(items,indexs) in cardSortList" :key="indexs">
					<view class="index-left" :class="{'bingo-name':items.bingo}">{{items.name}}</view>
					<view  class="index-right" @click="onClickCurrentOrder(items,items.orderCode)">
						<view class="index-right-currentno" :class="{'index-right-current':items.id == currentData.noId}"></view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="giving-bottom">
			<view class="giving-bottom-left" @click="onClickGivingRecord">
				<view class="giving-record"></view>
				<view class="giving-bottom-left-name">收增记录</view>
			</view>
			<view class="giving-bottom-right">
				<button class="giving-btn" @click="onClickCopyYzm">卡密验证码</button>
				<button class="giving-btn btn-red" @click="onClickGiving">去赠送</button>
			</view>
		</view>

		<!-- 规则弹窗 -->
		<rulePopup :showRulePopup="showRulePopup" :giving="true" @cancelRulePopup="onClickCancelRulePopup"/>

		<invitePopup :showInvitePopup="showInvitePopup" @cancelInvitePopup="onClickInvitePopupCancel" @copyWechat="onClickInvitePopupBtn"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import { myCardGoodsType } from '@/tools/switchUtil'
	import { Md5 } from "ts-md5";
	@Component({})
	export default class ClassName extends BaseNode {
		myCardGoodsType = myCardGoodsType;
		cardList:{[x:string]:any} = [];
		cardSortList:{[x:string]:any} = [];
		goodCode = '';
		orderCode = '';
		currentPage = 1;
		pageSize = 30;
		noMoreData = false;
		picList:any = [];
		pintuanType = 0;
		listSort = '';
		sortData:any = [];
		showRulePopup = false;
		showInvitePopup = false;
		currentData:any = {
			goodOrderCode:'',
			noId:0,
			name:'',
		};
		searchText = '';
		searchEmit = 'givingListSearch'
		onLoad(query:any) {
			this.goodCode = query.code;
			this.orderCode = query.orderCode;
			this.pintuanType = Number(query.pintuanType);
			this.sortData = this.myCardGoodsType(this.pintuanType)
			this.reqNewData()


			this.onEventUI('givingListSearch',(res)=>{
				console.log('givingListSearch====')
				this.searchText = res;
				this.reqSearchList()
			})
		}
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		onClickBack(){
			uni.navigateBack({
				delta: 1
			});
		}
		onClickSearch(){
			uni.navigateTo({
				url:'/pages/act/ref/ref?searchText='+this.searchText+'&searchEmit='+this.searchEmit
			})
		}
		onClickGivingRecord(){
			uni.navigateTo({
				url:'/pages/userinfo/giving/index'
			})
		}
		onClickMore(){
			this.reqNewData() 
		}
		onClickShowRule(){
			this.showRulePopup = true;
		}
		onClickCancelRulePopup(){
			this.showRulePopup = false;
		}
		onClickCurrentOrder(item:any,order:string){
			this.currentData.goodOrderCode = order;
			this.currentData.noId = item.id;
			this.currentData.name = item.name;
		}
		onClickMoreList(code:any){
			uni.navigateTo({
				url:'/pages/userinfo/order_myAllCard?code='+code
			})
		}
		onClickCopyYzm(){
			if(this.currentData.noId == '') {
				uni.showToast({
					title:'请选择卡密',
					icon:'none'
				})
				return;
			};

			let ts = Math.floor(new Date().getTime()/1000);
			let params = {
				goodOrderCode:this.currentData.goodOrderCode,
				noId:Number(this.currentData.noId),
				ts:ts,
				sign:Md5.hashStr('createShareCode_'+ts+'_'+this.currentData.goodOrderCode+'_'+this.currentData.noId)
			}
			app.http.Post('function/userNo/transfer/shareNo/create',params,(res:any)=>{
				uni.setClipboardData({
					data: res.content,
					showToast:false,
					success: ()=> {
						this.showInvitePopup = true;
					}
				});
			})
			
		}
		onClickGiving(){
			if(this.currentData.noId == '') {
				uni.showToast({
					title:'请选择卡密',
					icon:'none'
				})
				return;
			};

			uni.navigateTo({
				url:'/pages/userinfo/giving/giving?data='+encodeURIComponent(JSON.stringify(this.currentData))
			})
		}
		// 复制弹窗关闭
		onClickInvitePopupCancel(){
			this.showInvitePopup = false;
		}
		onClickInvitePopupBtn(){
			plus.runtime.openURL("weixin://");
			this.onClickInvitePopupCancel()
		}
		postSort(val:string){
			this.listSort = val;
			this.reqSearchList()
		}
		reqSearchList(){
			this.currentPage = 1;
			this.cardList = [];
			this.cardSortList = [];
			this.currentData= {
				goodOrderCode:'',
				noId:''
			}
			this.noMoreData = false;
			this.reqNewData()
		}
		reqNewCardList(orderCode:string,index:number,cb?:Function) {
			if(this.cardList[index].noList.length>10) return;

			// 获取更多商品
			let pageIndex = Math.floor((this.cardList[index].noList.length-10)/10);
			
			let params:{[x:string]:any} = {
				pageIndex: pageIndex+2,
				pageSize:10,
			}
			if(this.searchText!=''){
				params.q = this.searchText;
			}
			app.http.Get('function/userNo/transfer/order/'+orderCode+'/list', params, (data: any) => {
				if(data.list){
					this.cardList[index].noList = this.cardList[index].noList.concat(data.list);
					if(data.list.length<10){
						this.cardList[index].hasMore = false;
					}
				}
				
				if(this.cardList[index].noList.length>=data.total){
					this.cardList[index].hasMore = false;
				}
				if(cb) cb()
			});
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			
			let params:{[x:string]:any} = {
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
				leadGoodOrderCode:this.orderCode
			}
			if(this.searchText!=''){
				params.q = this.searchText;
			}
			// 排序方式
			if(this.listSort!=''){
				params.sort = this.listSort
			}
			
			app.http.Get('function/userNo/transfer/good/'+this.goodCode+'/list', params, (data: any) => {
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(data.list){
					if(this.listSort == ''){
						this.cardList = this.cardList.concat(data.list);
					}else{
						this.cardSortList = this.cardSortList.concat(data.list);
					}
				}else{
					this.noMoreData = true;
				}
				this.currentPage++;
				if(cb) cb()
			});
		}
		
	}
</script>

<style lang="scss">
	.header{
	    width: 100%;
	    position: fixed;
	    left:0;
	    top:0;
	    z-index: 99;
	}
	.icon-back{
		width: 80rpx;
		height:88rpx;
		background:url(../../../static/goods/back@2x.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left:0;
		top:0;
	}
	.header-title{
		height:88rpx;
		line-height: 88rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
	}
	.icon-search{
		width: 40rpx;
		height:40rpx;
		position: absolute;
		right:92rpx;
		top:50%;
		margin-top: -20rpx;
		background:url(../../../static/userinfo/v2/icon_search.png) no-repeat center;
		background-size: 100% 100%;
	}
	.icon-help{
		width: 40rpx;
		height:40rpx;
		position: absolute;
		right:32rpx;
		top:50%;
		margin-top: -20rpx;
		background:url(../../../static/userinfo/v2/help.png) no-repeat center;
		background-size: 100% 100%;
	}
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
		background:#fff;
	}
	.header-banner{
		width: 100%;
		background:#fff;
		box-sizing: border-box ;
		z-index: 9;
	}
	.content{
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
		font-family: FZLanTingHeiS-R-GB;
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
		color: #F5162B;
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
		padding:0 15rpx;
	}
	.card-index{
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background:#fff;
		margin-top: 10rpx;
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
		width: 620rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 22rpx;
		font-family: FZLanTingHeiS-R-GB;
		font-weight: 400;
		color: #333333;
		line-height: 32rpx;
		padding:10rpx 20rpx;
		border-right: 1px solid #fff;
		background: #F6F7F8;
	}
	.index-right{
		width: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
	}
	.red-color{
		color:#FB4E3E
	}
	.index-right-currentno{
		width: 34rpx;
		height:34rpx;
		background: url(../../../static/userinfo/v2/icon_current_.png) no-repeat center;
		background-size: 100% 100%;
	}
	.index-right-current{
		width: 34rpx;
		height:34rpx;
		background: url(../../../static/userinfo/v2/icon_current.png) no-repeat center;
		background-size: 100% 100%;
	}
	.bingo-name{
		font-weight: bold !important;
	}
	.box-content{
        width: 100%;
        position: relative;
        z-index:10;
        box-sizing: border-box;
        padding:180rpx 15rpx calc(114rpx + env(safe-area-inset-bottom)) 15rpx;
    }
	.giving-bottom{
		width: 100%;
		height:calc(100rpx + env(safe-area-inset-bottom));
		border-top: 1px solid #BBBBBB;
		background:#fff;
		position: fixed;
		left:0;
		bottom:0;
		display: flex;
		justify-content: space-between;
		z-index: 66;
		box-sizing: border-box;
		padding:0 22rpx;
		padding-top: 12rpx;

	}
	.giving-bottom-left{
		width: 100rpx;
		height:76rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.giving-record{
		width: 45rpx;
		height:45rpx;
		background: url(../../../static/userinfo/v2/icon_giving_record.png) no-repeat center;
		background-size: 100% 100%;
	}
	.giving-bottom-left-name{
		width: 100%;
		text-align: center;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}
	.giving-bottom-right{
		width: 586rpx;
		height:67rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.giving-btn{
		width: 280rpx;
		height:67rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		box-sizing: border-box;
		border:1px solid #333333;
		background:#fff;
	}
	.btn-red{
		border:1px solid #F5162B;
		background:#F5162B;
		color:#fff;
	}
</style>
