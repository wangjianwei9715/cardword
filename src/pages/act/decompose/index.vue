<template>
	<view class="content">
		<view class="header">
			<statusbar style="background:#fff" />
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
				<view class="header-title">卡片分解</view>
				<view class="icon-help" @click="onClickShowRule"></view>
			</view>
		    <view class="header-tab">
		        <tabc :tabc="tabData" :tabsCheck="tabCheck" @tabsClick="onClickListTabs"></tabc>
		    </view>
		</view>
		
		<view class="box-content">
			<statusbar/>
			<view class="box-index" v-for="(item,index) in goodsList" :key="index" @click="onClickCardList(item)">
				
				<view class="index-header">商品编号:{{item.goodCode}}</view>
				<view class="index-center">
					<view class="index-left">
						<image class="index-image" :src="decodeURIComponent(item.pic)"></image>
						<view v-if="tabCheck==2" class="pic-end">
							<image class="pic-fenjie" src="../static/pingtai/fenjie.png"></image>
						</view>
					</view>
					<view class="index-right">
						<view class="index-right-title">{{item.title}}</view>
						<view class="index-right-num">中卡卡密：{{item.hitNum}}组</view>
						<view class="index-right-icon"></view>
						<button v-if="tabCheck==1" class="index-right-btn" @click="onClickDecomposeCode(item.goodCode)">分解</button>
					</view>
				</view>
				<view class="index-bottom">
					<view class="index-bottom-title">{{tabCheck==1?'分解':'获得'}}奖励：</view>
					<view class="index-bottom-reward-box" v-for="(items,indexs) in item.reward" :key="indexs">
						<view v-if="tabCheck==1" :class="items.type==1?'tips-bide':'tips-random'"></view>
						<image class="index-bottom-reward"  :src="items.pic"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 规则弹窗 -->
		<rulePopup :showRulePopup="showRulePopup" :decompose="true" @cancelRulePopup="onClickCancelRulePopup"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		tabCheck = 1;
		tabData = [
			{id:1,name:'可分解'},
			{id:2,name:'已分解'}
		];
		goodsList:any = [
			
		];
		currentPage = 1;
		pageSize = 5;
		noMoreData = false;
		showRulePopup = false;
		onLoad(query:any) {
			this.reqNewData()
		}
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		onClickCardList(item:any){
			uni.navigateTo({
				url:'/pages/act/decompose/card_list?type='+this.tabCheck+'&code='+item.goodCode
			})
		}
		onClickBack(){
			uni.navigateBack({
				delta: 1
			});
		}
		onClickShowRule(){
			this.showRulePopup = true;
		}
		onClickCancelRulePopup(){
			this.showRulePopup = false;
		}
		againReqNewData(){
			this.currentPage = 1;
			this.noMoreData = false;
			this.reqNewData()
		}
		onClickListTabs(id:number){
			if(id==this.tabCheck){
				return;
			}
			this.tabCheck = id;
			this.againReqNewData();
		}
		// 分解
		onClickDecomposeCode(code:any){
			uni.showModal({
				title: '提示',
				content: '是否确认分解此商品所有编号',
				success:(res)=> {
					if (res.confirm) {
						app.http.Post('function/decompose/good/'+code+'/request',{},(res:any)=>{
							uni.showToast({
								title:'操作成功',
								icon:'none'
							})
							this.againReqNewData();
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
			
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			
			let params:{[x:string]:any} = {
				tp:this.tabCheck,
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
			}
			
			app.http.Get("function/decompose/goodlist", params, (data: any) => {
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(this.currentPage==1) this.goodsList = [];
				if(data.list){
					this.goodsList = this.goodsList.concat(data.list);
				}
				this.currentPage++;
				if(cb) cb()
			});
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#F6F7F8;
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
	.icon-help{
		width: 40rpx;
		height:40rpx;
		position: absolute;
		right:32rpx;
		top:50%;
		margin-top: -20rpx;
		background:url(../static/sign/help.png) no-repeat center;
		background-size: 100% 100%;
	}
	.content{
		width: 100%;
		box-sizing:border-box;
	}
	.header{
	    width: 100%;
	    position: fixed;
	    left:0;
	    top:0;
	    z-index: 99;
	}
	.header-tab{
		width: 100%;
	    background:#fff;
		height:90rpx;
		margin-top: -10rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #F1F1F4;
	    padding:0 100rpx;
	}
	.box-content{
        width: 100%;
        position: relative;
        z-index:10;
        box-sizing: border-box;
        padding:0 20rpx;
        padding-top: 200rpx;
		
    }
	.box-index{
		width: 100%;
		background: #FFFFFF;
		border-radius: 10px;
		box-sizing: border-box;
		padding:5rpx 28rpx;
	}
	.index-header{
		width: 100%;
		height:70rpx;
		line-height: 70rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		border-bottom:1rpx solid #E7E7E7;
		margin-bottom: 22rpx;
	}
	.index-center{
		width: 100%;
		height:190rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.index-left{
		width: 190rpx;
		height:190rpx;
		position: relative;
	}
	.pic-end{
		width: 190rpx;
		height:190rpx;
		background:rgba(0,0,0,0.5);
		position: absolute;
		left:0;
		top:0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.pic-fenjie{
		width: 165rpx;
		height:127rpx
	}
	.index-image{
		width: 190rpx;
		height:190rpx;
	}
	.index-right{
		width: 425rpx;
		height:190rpx;
		position: relative;
		box-sizing: border-box;
		padding:11rpx 60rpx 11rpx 0;
	}
	.index-right-title{
		width: 100%;
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
		line-height: 48rpx;
		margin-bottom: 20rpx;
	}
	.index-right-num{
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #B8B7B7;
	}
	.index-right-icon{
		width: 18rpx;
		height:32rpx;
		position: absolute;
		right:0;
		top:12rpx;
		background:url(../static/pingtai/icon_right.png) no-repeat center;
		background-size:  100% 100%;
	}
	.index-right-btn{
		width: 173rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		right:0;
		bottom:20rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		background: #FB4E3E;
		border-radius: 30rpx;
	}
	.index-bottom{
		width: 100%;
		height:120rpx;
		display: flex;
		align-items: center;
	}
	.index-bottom-title{
		height:40rpx;
		line-height: 40rpx;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	.index-bottom-reward-box{
		width: 75rpx;
		height:75rpx;
		margin-right: 18rpx;
		position: relative;
	}
	.index-bottom-reward{
		width: 75rpx;
		height:75rpx;
		position: relative;
		z-index: 2;
	}
	.tips-bide{
		width: 53rpx;
		height:35rpx;
		background:url(../static/pingtai/icon_tips1.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left:-3rpx;
		top:-26rpx;
		z-index: 3;
	}
	.tips-random{
		width: 53rpx;
		height:35rpx;
		background:url(../static/pingtai/icon_tips2.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left:-3rpx;
		top:-26rpx;
		z-index: 3;
	}
</style>
