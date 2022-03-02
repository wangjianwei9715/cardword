<template>
	<view class="content">
		<view class="bg"></view>
		<view class="index">
			<view class="newyear-rule" @click="onClickShowRule">规则</view>
			<view class="reward-list">
				<view class="reward-title">
					<image class="reward-title-image" src="https://ka-world.oss-cn-shanghai.aliyuncs.com/newYear2022/list_title.png"></image>
					<view class="reward-all" @click="onClickGoAllList">查看全部</view>
				</view>
				<swiper class="swiper"  autoplay="true" circular="true"  duration="200"> 
					<swiper-item v-for="(item,index) in rewardList" :key="index">
						<view class="reward-index">
							<image class="rewarwd-image" @click="onClickPreviewImage(index,indexs)"  v-for="(items,indexs) in item.item" :key="indexs" :src="items"/>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="reward-newtitle">
				<image class="title-pic" src="https://ka-world.oss-cn-shanghai.aliyuncs.com/newYear2022/new_title.png"/>
				<view class="newtitle-desc">每位用户限购1盒，每盒附赠50元满减券</view>
			</view>

			<view class="goods-item" v-for="(item,index) in goodsData" :key="index" >
				<image class="goods-item-pic" @click="onClickGoGoodsDetail(item.goodCode)" src="https://ka-world.oss-cn-shanghai.aliyuncs.com/newYear2022/hb.png"/>
				<view class="goods-item-right" @click="onClickGoGoodsDetail(item.goodCode)">
					<view class="goods-item-title">{{item.title}}</view>
					<view class="goods-item-plan" v-if="item.state==1">
						<view class="goods-item-plan-content">
							<view class="goods-plan-now" :style="'width:'+getPlan(item.lockNum,item.currentNum,item.totalNum)+'%'"></view>
						</view>
						<view class="goods-plan-num">余{{item.totalNum-(item.currentNum+item.lockNum)}}/共{{item.totalNum}}</view>
					</view>
					<view class="goods-item-desc" v-else>{{getState(item.state,item.startAt)}}</view>
				</view>
				<view class="goods-tips">
					<image class="goods-tips-pic" :src="decodeURIComponent(item.merchantLogo)" /> 
					<view class="goods-tips-mer">{{item.merchant}}</view>代开
				</view>
				<view class="goods-bottom">
					<view class="goods-bottom-price">￥<text>{{item.price}}</text></view>
					<view class="goods-bottom-btn" v-if="item.state==1" @click="onClickGoGoodsDetail(item.goodCode)">立即抢购</view>
					<view class="goods-bottom-btn2" v-if="item.state>=2" @click="onClickGoChaika(item.goodCode)">拆卡报告</view>
				</view>
			</view>
		</view>
		<!-- 规则弹窗 -->
		<rulePopup :showRulePopup="showRulePopup" :newYear="true" @cancelRulePopup="onClickCancelRulePopup"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import { dateFormatMSHMS } from "@/tools/util"
	@Component({})
	export default class ClassName extends BaseNode {
		dateFormatMSHMS = dateFormatMSHMS;
		showRulePopup = false;
		rewardList:any = [
			{item:[
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/1..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/2..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/3..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/4..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/5..jpg'
			]},
			{item:[
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/6..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/7..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/8..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/9..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/10..jpg'
			]},
			{item:[
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/11..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/12..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/13..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/14..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/15..jpg'
			]},
			{item:[
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/16..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/17..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/19..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/20..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/21..jpg'

			]},
			{item:[
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/22..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/23..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/24..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/25..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/26..jpg'
			]},
			{item:[
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/27..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/28..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/29..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/30..jpg',
				'https://ka-world.oss-cn-shanghai.aliyuncs.com/fuhe/31..jpg'
			]},
		];
		currentPage = 1;
		pageSize = 10;
		noMoreData = false;
		goodsData:any = [];
		onLoad(query:any) {
			this.reqNewData() 
		}
		onShow(){
			
		}
		//   下拉刷新
		onPullDownRefresh(){
			this.currentPage = 1;
			this.noMoreData = false;
			this.reqNewData(()=>{
				setTimeout(()=>{
					uni.stopPullDownRefresh();
				},1000)
			})
		}
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		// 观看大图
		onClickPreviewImage(index:number,indexs:number){
			uni.previewImage({
				urls: this.rewardList[index].item,
				current:indexs,
				indicator: "number" 
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
			}
			
			app.http.Get("dataApi/activity/fuhe/goodlist", params, (data: any) => {
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(data.list){
					if(this.currentPage==1){
						this.goodsData = []
					}
					this.goodsData = this.goodsData.concat(data.list);
				}
				
				this.currentPage++;
				if(cb) cb()
			});
		}
		onClickGoGoodsDetail(goodCode:string){
			uni.navigateTo({
				url: '/pages/goods/goods_details?id='+decodeURIComponent(goodCode)
			})
		}
		onClickGoChaika(goodCode: number) {
			uni.navigateTo({
				url: '/pages/goods/goods_result_list?chooseIds=1&code='+goodCode+'&random=false'
			})
		}
		onClickGoAllList(){
			uni.navigateTo({
				url: '/pages/act/newYear/list'
			})
		}
		onClickCancelRulePopup(){
			this.showRulePopup = false;
		}
		onClickShowRule(){
			console.log('222')
			this.showRulePopup = true
		}
		getPlan(lock:number,now:number,all:number){
			let width = Math.floor((Number(lock)+Number(now))/Number(all)*100);
			return width
		}
		getState(state:number,time:number){
			switch(state){
				case 0:
					return this.dateFormatMSHMS(time)+'开售';
				case -2:
					return '拼团失败';
				default:
					return '已售完'
			}
		}

	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background: linear-gradient(0deg, #BC2B26, #EA1C2F, #FA4534);
	}
	.bg{
		width: 750rpx;
		height:1170rpx;
		background:url(https://ka-world.oss-cn-shanghai.aliyuncs.com/newYear2022/dbg.jpg) no-repeat center;
		background-size: 100% 100%;
		position: relative;
		left:0;
		top:0;
		z-index: 2;
	}
	.index{
		width: 100%;
		box-sizing: border-box;
		position: absolute;
		top:0;
		z-index: 3;
		padding-top: 540rpx;
	}
	.newyear-rule{
		width: 104rpx;
		height: 41rpx;
		background: #CC271C;
		border-radius: 21rpx;
		text-align: center;
		line-height: 41rpx;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		position: absolute;
		top:20rpx;
		right:24rpx;
	}
	.reward-list{
		width: 696rpx;
		height: 255rpx;
		background: linear-gradient(90deg, #CCA84A, #E5D2A3, #D2B25F);
		border-radius: 10rpx;
		margin:0 auto;
	}
	.reward-title{
		width: 100%;
		height:52rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.reward-title-image{
		width: 184rpx;
		height:29rpx;
	}
	.reward-all{
		font-size: 22rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #4F3900;
		position: absolute;
		right:18rpx;
		bottom:11rpx;
	}
	.swiper{
		width: 672rpx;
		height:191rpx;
		box-sizing: border-box;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		margin:0 auto;
	}
	.reward-index{
		width: 672rpx;
		height: 191rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding:0 10rpx;
	}
	.rewarwd-image{
		width: 115rpx;
		height:161rpx;
	}
	.reward-newtitle{
		width: 100%;
		height:100rpx;
		box-sizing: border-box;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		margin:20rpx auto;
		position: relative;
	}
	.newtitle-desc{
		height:35rpx;
		box-sizing: border-box;
		padding:0 23rpx;
		font-size: 22rpx;
		font-family: CTCuHeiSJ;
		font-weight: 400;
		color: #FF2B25;
		background:#70050F;
		display: flex;
		align-items: center;
	}
	.title-pic{
		width: 286rpx;
		height:90rpx;
		position: absolute;
		left: 50%;
		margin-left: -143rpx;
		bottom:10rpx;
	}
	.goods-item{
		width: 696rpx;
		height: 255rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin:0 auto;
		margin-bottom: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding:0 0 0 26rpx;
		position: relative;
	}
	.goods-item-pic{
		width: 204rpx;
		height:123rpx;
	}
	.goods-item-right{
		width: 441rpx;
		height:123rpx;
		box-sizing: border-box;
		padding:6rpx 0;
		display: flex;
		flex-wrap: wrap;
	}
	.goods-item-title{
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #545659;
	}
	.goods-item-desc{
		width: 100%;
		height:30rpx;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		font-size: 20rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #C0C1C7;
	}
	.goods-item-plan{
		width: 100%;
		height:30rpx;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		margin-top: -20rpx;
	}
	.goods-item-plan-content{
		width: 180rpx;
		height: 10rpx;
		background: #FEE5E3;
		border-radius: 10rpx;
		overflow: hidden;
	}
	.goods-plan-now{
		height:20rpx;
		background:#FF504F
	}
	.goods-plan-num{
		height:30rpx;
		line-height: 30rpx;
		margin-left: 20rpx;
		font-size: 20rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #C0C1C7;
	}
	.goods-tips{
		width: 290rpx;
		height:57rpx;
		position: absolute;
		right:0;
		top:0;
		background:url(https://ka-world.oss-cn-shanghai.aliyuncs.com/newYear2022/tips.png) no-repeat center;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		font-family: CTCuHeiSJ;
		font-weight: 400;
		color: #FFFFFF;
	}
	.goods-tips-mer{
		width: 140rpx;
		height:57rpx;
		line-height: 57rpx;
		font-size: 25rpx;
		font-family: CTCuHeiSJ;
		font-weight: 400;
		color: #FFFFFF;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.goods-tips-pic{
		width: 37rpx;
		height:37rpx;
		border-radius: 50%;
		margin-right: 10rpx;
		margin-left: 40rpx;
	}
	.goods-bottom{
		width:441rpx;
		height:50rpx;
		position: absolute;
		bottom:20rpx;
		right:0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.goods-bottom-price{
		font-size: 33rpx;
		font-family: Adobe Fan Heiti Std;
		font-weight: normal;
		color: #3A3A3A;
	}
	.goods-bottom-price text{
		font-size: 42rpx;
	}
	.goods-bottom-btn{
		width: 182rpx;
		height: 48rpx;
		background: #FB4E3E;
		border-radius: 24rpx;
		text-align: center;
		line-height: 48rpx;
		font-size: 27rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		margin:0;
		margin-right: 27rpx;
	}
	.goods-bottom-btn2{
		width: 182rpx;
		height: 48rpx;
		background: #d2b25f;
		border-radius: 24rpx;
		text-align: center;
		line-height: 48rpx;
		font-size: 27rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		margin:0;
		margin-right: 27rpx;
	}
</style>
