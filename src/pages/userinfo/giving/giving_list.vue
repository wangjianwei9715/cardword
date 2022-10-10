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
			<view class="header-banner">
				<view class="order-type">
					<view class="order-type-index" :class="{'type-current':item.type==typeTabCurrent}" v-for="(item,index) in typeTab" :key="index" @click="$u.throttle(()=>{onClickTypeCurrent(item.type)},500)">{{item.name}}</view>
				</view>
				<sortTab v-if="typeTabCurrent==2&&sortData!=''" :sortData="sortData" @postSort="postSort" />
			</view>
		</view>
		<view class="box-content" :class="{'pa180':typeTabCurrent==1||sortData==''}">
			<statusbar/>
			
			<view class="card-list" v-show="cardList.length>0" v-for="(item,index) in cardList" :key="index">
				<!-- <view class="order-code">
					<view class="order-code-left"><view class="order-code-box">订单：{{item.orderCode}}</view><view class="order-code-now">{{orderCode==item.orderCode?'当前订单 ':''}}</view></view>
				</view> -->
				<view class="card-box">
					<view class="card-index" v-for="(items,indexs) in item.noList" :key="indexs" @click="onClickCurrentOrder(items,item.orderCode)">
						<view class="index-left" :class="{'bingo-name':item.bingo}">{{items.name}}</view>
						<view  class="index-right">
							<view class="index-right-currentno" :class="{'index-right-current':checkIDHas(items.id)}"></view>
						</view>
					</view>
					<view class="card-more-btn" v-if="item.hasMore" @click="reqNewCardList(item.orderCode,index)">查看更多</view>
				</view>
			</view>
			
			<view class="card-box" v-show="cardSortList!=''">
				<view class="card-index" v-for="(items,indexs) in cardSortList" :key="indexs" @click="onClickCurrentOrder(items,items.orderCode)">
					<view class="index-left" :class="{'bingo-name':items.bingo}">{{items.name}}</view>
					<view  class="index-right">
						<view class="index-right-currentno" :class="{'index-right-current':checkIDHas(items.id)}"></view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="giving-bottom">
			<view v-show="typeTabCurrent==1&&searchText==''" class="giving-bottom-left" @click="onClickMultiple">
				<view class="multiple" :class="{'multiple-cur':multiple}"></view>
				<view class="giving-bottom-left-name">{{excludeNoId.length>0?'已':'全'}}选{{multipleTotal-excludeNoId.length}}条</view>
			</view>
			<view class="giving-bottom-right" :class="{'no-left':typeTabCurrent==2||searchText!=''}">
				<view class="giving-btn" @click="onClickCopyYzm">卡密验证码</view>
				<view class="giving-btn btn-red" @click="onClickGiving">去赠送</view>
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
		cardList:any = [];
		cardSortList:any = [];
		typeTab = [
			{name:'当前订单',type:1},
			{name:'全部订单',type:2}
		]
		typeTabCurrent = 1;
		multiple = false;
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
		currentList:any = [];
		currentListData:any = [];
		excludeNoId:any = [];
		multipleTotal = 0;
		searchText = '';
		searchEmit = 'givingListSearch'
		onLoad(query:any) {
			this.goodCode = query.code;
			this.orderCode = query.orderCode;
			this.pintuanType = Number(query.pintuanType);
			this.sortData = this.myCardGoodsType(this.pintuanType)
			this.reqNewData()


			this.onEventUI('givingListSearch',(res)=>{
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
		onClickMore(){
			this.reqNewData() 
		}
		onClickShowRule(){
			this.showRulePopup = true;
		}
		onClickCancelRulePopup(){
			this.showRulePopup = false;
		}
		onClickMultiple(){
			this.currentList = [];
			this.currentListData = [];
			this.excludeNoId = []
			if(!this.multiple){
				if(this.cardList.length>0){
					for(let i of this.cardList){
						this.multipleMap(i.noList,i.orderCode)
					}
				}else{
					this.multipleMap(this.cardSortList)
				}
			}
			this.multiple = !this.multiple;
		}
		multipleMap(list:any,orderCode?:string){
			list.map((x:any)=>{
				if(x.leftTNum>0){
					let data = {
						goodOrderCode:orderCode||x.orderCode,
						noId:x.id,
						name:x.name,
					}
					if(this.currentList.indexOf(x.id) == -1){
						this.currentList.push(x.id)
						this.currentListData.push(data)
					}
				}else{
					if(this.excludeNoId.indexOf(x.id) == -1){
						this.excludeNoId.push(x.id)
					}
				}
			})
		}
		onClickCurrentOrder(item:any,order:string){
			if(item.leftTNum<=0){
				uni.showToast({ title:'此编号赠送次数已达上限', icon:'none' })
				return;
			}
			let idIndex = this.currentList.indexOf(item.id);
			if(this.multiple){
				let excIndex = this.excludeNoId.indexOf(item.id);
				if(excIndex == -1){
					this.excludeNoId.push(item.id)
				}else{
					this.excludeNoId.splice(excIndex,1)
				}
			}
			if(idIndex == -1){
				if(!this.multiple && this.currentList.length>=100){
					uni.showToast({ title:'最多选择一百条卡密', icon:'none' })
					return;
				}
				let data = {
					goodOrderCode:order,
					noId:item.id,
					name:item.name,
				}
				this.currentList.push(item.id)
				this.currentListData.push(data)
			}else{
				this.currentList.splice(idIndex,1)
				this.currentListData.splice(idIndex,1)
			}
		}
		
		onClickCopyYzm(){
			if(this.currentList == '') {
				uni.showToast({
					title:'请选择卡密',
					icon:'none'
				})
				return;
			};
			if(this.currentList.length>1){
				uni.showToast({
					title:'仅支持单条卡密查询',
					icon:'none'
				})
				return;
			}
			let ts = Math.floor(new Date().getTime()/1000);
			let params = {
				goodOrderCode:this.currentListData[0].goodOrderCode,
				noId:Number(this.currentListData[0].noId),
				ts:ts,
				sign:Md5.hashStr('createShareCode_'+ts+'_'+this.currentListData[0].goodOrderCode+'_'+this.currentListData[0].noId)
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
			if(this.currentList == '') {
				uni.showToast({
					title:'请选择卡密',
					icon:'none'
				})
				return;
			};
			let url = '/pages/userinfo/giving/giving?data='+encodeURIComponent(JSON.stringify(this.currentListData))+'&id='+encodeURIComponent(JSON.stringify(this.currentList))+'&goodCode='+this.goodCode
			if(this.multiple){
				url = `/pages/userinfo/giving/giving?orderCode=${this.orderCode}&excludeNoId=${encodeURIComponent(JSON.stringify(this.excludeNoId))}&data=${encodeURIComponent(JSON.stringify(this.currentListData))}&total=${this.multipleTotal-this.excludeNoId.length}&page=${!this.noMoreData?this.currentPage:1}`
			}
			uni.navigateTo({url})
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
		checkIDHas(id:number){
			return this.currentList.indexOf(id) == -1 ? false : true;
		}
		onClickTypeCurrent(type:number){
			if(type == this.typeTabCurrent) return;
			this.typeTabCurrent = type;
			this.reqSearchList()
		}
		reqSearchList(){
			this.currentPage = 1;
			this.multiple = false;
			this.cardSortList = [];
			this.cardList = [];
			this.currentList= [];
			this.currentListData = [];
			this.excludeNoId = [];
			this.noMoreData = false;
			this.reqNewData()
		}
		reqNewCardList(orderCode:string,index:number,cb?:Function) {
			if(this.cardList[index].noList.length<10) return;

			// 获取更多商品
			let pageIndex = Math.floor((this.cardList[index].noList.length-10)/10);
			
			let params:{[x:string]:any} = {
				pageIndex: pageIndex+2,
				pageSize:10,
			}
			if(this.searchText!=''){
				params.q = this.searchText;
			}
			console.log('params=',params)
			app.http.Get('function/userNo/transfer/order/'+orderCode+'/list', params, (data: any) => {
				console.log('data==',data)
				if(data.list){
					if(this.currentPage == 1){
						this.cardSortList = [];
						this.cardList = [];
					}
					this.cardList[index].noList = this.cardList[index].noList.concat(data.list);
					if(data.list.length<10){
						this.cardList[index].hasMore = false;
					}
					if(this.multiple){
						this.multipleMap(data.list)
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
			let url = `function/userNo/transfer/good/${this.goodCode}/list`
			if(this.typeTabCurrent == 1){
				url = `function/userNo/transfer/order/${this.orderCode}/list`;
				params = {
					pageIndex: this.currentPage,
					pageSize:this.pageSize,
					q:this.searchText
				}
			}
			app.http.Get(url, params, (data: any) => {
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(data.list){
					if(this.currentPage == 1){
						this.cardSortList = [];
						this.cardList = [];
					}
					if(this.listSort == '' && this.typeTabCurrent==2){
						this.cardList = this.cardList.concat(data.list);
						if(this.multiple){
							for(let i of data.list){
								this.multipleMap(i.noList,i.orderCode)
							}
						}
					}else{
						this.cardSortList = this.cardSortList.concat(data.list);
						this.multipleTotal = data.total
						if(this.multiple){
							this.multipleMap(data.list)
						}
					}

				}else{
					this.noMoreData = true;
				}
				this.currentPage++;
				if(this.typeTabCurrent == 1){
					this.reqNewData()
				}
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
		margin-bottom: 14rpx;
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
		min-height: 96rpx;
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
		word-break: break-all;
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
        padding:260rpx 15rpx calc(120rpx) 15rpx;
		padding:260rpx 15rpx calc(120rpx + constant(safe-area-inset-bottom)) 15rpx;
		padding:260rpx 15rpx calc(120rpx + env(safe-area-inset-bottom)) 15rpx;
    }
	.giving-bottom{
		width: 100%;
		height:calc(120rpx );
		height:calc(120rpx + constant(safe-area-inset-bottom));
		height:calc(120rpx + env(safe-area-inset-bottom));
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
		width: 120rpx;
		height:76rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 10rpx;
	}
	.multiple{
		width: 34rpx;
		height:34rpx;
		background: url(@/static/goods/v2/icon_multiple.png) no-repeat center;
		background-size: 100% 100%;
	}
	.multiple-cur{
		width: 34rpx;
		height:34rpx;
		background: url(@/static/userinfo/v2/icon_current.png) no-repeat center;
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
		height:82rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.no-left{
		width: 100%;
	}
	.no-left .giving-btn{
		width: 340rpx;
	}
	.giving-btn{
		width: 280rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #88878c;
		box-sizing: border-box;
		border:1px solid #DADADA;
		background:#fff;
		height: $btn-height;
		line-height: $btn-height;
		font-size: $btn-fontSize;
		border-radius:$btn-radius;
		font-weight: $btn-weight;
	}
	.btn-red{
		border:1px solid $btn-red;
		background:$btn-red;
		color:#fff;
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
	.pa180{
		padding-top:180rpx !important;
	}
</style>
