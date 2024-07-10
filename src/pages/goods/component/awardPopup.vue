<!--
 * @FilePath: \jichao_app_2\src\pages\goods\component\awardPopup.vue
 * @Author: wjw
 * @Date: 2023-05-26 16:52:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-07-09 17:37:06
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view>
		<u-popup :show="popupShow" :round="5" @close="popupShow=false">
			<view class="popup-box">
				<view class="popup-header">
					<view class="popup-title">
						<text class="hy-title">搓卡密 实时掉落好物</text>
						<image @click="ruleShow=true" class="icon-help" src="@/static/goods/detail/noAward-help.png"/>
					</view>
					<view class="popup-desc">{{awardDesc}}</view>
					<view class="popup-close" @click="popupShow=false"></view>
				</view>
				<u-list @scrolltolower="getAwardList" height="1200rpx" >
					<u-list-item class="popup-listitem" v-for="(item, index) in awardList" :key="index" >
						<view class="popup-list-box">
							<view class="popup-list-pic">
								<muqian-lazyLoad class="popup-item-pic" :src="item.pic" mode="aspectFit" borderRadius="5rpx" @click="previewImage(item)"></muqian-lazyLoad>
							</view>
							<view class="popup-list-info">
								<view class="popup-list-name u-line-1">{{item.name}}</view>
								<view class="popup-list-text">
									共{{item.randomNum>0?item.randomNum:1}}份 {{item.tp==2?(item.coupon&&item.coupon.distribute==2?"即搓即得":"拼成发放"):"拼成发放"}}
								</view>
								<view class="popup-code-name">{{item.randomNum>0?"随机卡密发放":"指定卡密："+item.noName}}</view>
							</view>
						</view>
					</u-list-item>
				</u-list>
				<view class="award-btn" v-show="state==1" @click="onClickGoBuy">¥{{price}}/组去搓搓看</view>
			</view>
		</u-popup>
		<previewImage ref="previewImage" />

		<!-- 活动说明 -->
		<u-popup mode="bottom" closeable round="3rpx" :show="ruleShow" @close="ruleShow = false"
            :safeAreaInsetBottom="false">
            <view class="rule-popup">
                <view class="rule-popup-title">活动规则</view>
				<view class="rule-popup-item">
					<view class="item-title">1、活动说明</view>
					<view class="item-desc">1）玩家在获得卡密时，有机会额外获得对应的活动奖品。获得奖品时将在卡密特效玩法中体现（跳过卡密特效奖品仍然有效），也可在我的订单中查看。</view>
					<view class="item-desc">2）活动奖品有以下2种获得方式，依据奖品列表中的标注为准。</view>
					<view class="item-desc">
						<text>指定卡密奖品</text>
						：玩家获得奖品列表中所标注的指定卡密即可得到对应奖品，每条卡密对应1份奖品。
					</view>
					<view class="item-desc">
						<text>随机卡密发放奖品</text>
						：所有卡密均有相同概率获奖，单条卡密获得概率为（1/卡密总数），每条卡密最多获得1份奖品。
					</view>
				</view>
				<view class="rule-popup-item">
					<view class="item-title">2、奖品发放</view>
					<view class="item-desc">1）奖品发放分为即搓即得和拼成发放，依据奖品列表中的标注为准。</view>
					<view class="item-desc"><text>即搓即得</text>：将在获得中奖卡密后立即发放。实物类奖品请联系商家客服发放，优惠券类奖品自动发放，请于有效期内使用。<text class="notice">奖品若为指定当前商品优惠券，请您尽快使用，商品拼成后此类型优惠券作废。</text></view>
					<view class="item-desc"><text>拼成发放</text>：获得的奖品将于拼团成功后发放。实物类奖品请在拼成后联系商家客服发放，优惠券类奖品在拼成后自动发放，请于有效期内使用。<text class="notice">若拼团失败则奖品作废。</text></view>
				</view>
            </view>
        </u-popup>
	</view>
</template>

<script lang="ts">
	import { Component, Prop} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	class ListParams {
		pageIndex = 1;
		pageSize = 10;
		isFetchEnd = false;
	}
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({ default: 0 })
		price?: number;
		@Prop({ default: 0 })
		state?: number;
		isPullDown = app.platform.isPullDown;
		listParams = new ListParams();
		goodCode=""
		popupShow=false;
		awardList:any = [];
		awardNum={
			sole:0,
			random:0
		}
		ruleShow=false
		created(){
		}
		mounted(){
		}
		destroyed(){
		}
		get awardDesc(){
			const { sole, random } = this.awardNum;
			let desc = '';
			if (sole > 0) {
				desc += `${sole}份指定卡密奖励 `;
			}
			if (random > 0) {
				desc += `${random}份随机卡密奖励`;
			}
			return desc.trim();
		}
		showAwardPopup(goodCode:string){
			this.goodCode = goodCode;
			this.getAwardList();
			this.isPullDown(true);
			this.popupShow=true;
		}
		getAwardList(){
			const { listParams } = this;
			if(listParams.isFetchEnd) return;

			app.http.GetWithCrypto(`dataApi/good/${this.goodCode}/noAward/list`, listParams,
				(res:any)=>{
					this.awardNum.sole=res.num2;
					this.awardNum.random=res.num1;
					res.list && (this.awardList = [...this.awardList,...res.list]);
					this.listParams.isFetchEnd = res.totalPage<=listParams.pageIndex;
					this.listParams.pageIndex++;
					this.isPullDown(false);
				}
			)
		}
		previewImage(item: any) {
			this.$refs.previewImage.show({
				urls: [{ src: decodeURIComponent(item.pic), title: item.name }]
			})
		}
		onClickGoBuy(){
			this.$emit('goBuy');
			this.popupShow=false
		}
    
	}
</script>

<style lang="scss" scoped>
	.popup-box{
		width: 100%;
		height:1300rpx;
		background: linear-gradient(180deg, #EAF0FF 0%,#FFFFFF 10%, #FFFFFF 100%);
		position: relative;
		.award-btn{
			width: 696rpx;
			height:100rpx;
			background:url(@/static/goods/detail/noAward-btn.png) no-repeat center / 100% 100%;
			position: absolute;
			left:50%;
			margin-left: -348rpx;
			bottom:24rpx;
			font-size: 32rpx;
			
			font-weight: 600;
			color: #FFFFFF;
			text-align: center;
			line-height: 90rpx;
		}
		.popup-header{
			width: 100%;
			height:150rpx;
			box-sizing: border-box;
			padding:26rpx 0 0 36rpx;
			position: relative;
		}
		.popup-close{
			width: 82rpx;
			height:82rpx;
			background:url(@/static/goods/detail/noAward-close.png) no-repeat center / 100% 100%;
			position: absolute;
			right:18rpx;
			top:18rpx;
		}
		.popup-title{
			width: 100%;
			height: 70rpx;
			display: flex;
			align-items: center;
		}
		.hy-title{
			height: 50rpx;
			font-size: 40rpx;
			font-family: HYLiLiangHeiJ;
			color: #7380A1;
			display: inline-flex;
			align-items: flex-start;
		}
		.icon-help{
			width: 72rpx;
			height:70rpx;
		}
		.popup-desc{
			font-size: 24rpx;
			
			
			color: #7380A1;
			line-height: 34rpx;
		}
		.popup-listitem{
			width: 680rpx;
			margin:0 auto;
			border-bottom:1px solid #fff;
			color:#fff;
			box-sizing: border-box;
			margin-bottom: 20rpx;
		}
		.popup-listitem:last-child{
			margin-bottom: 200rpx;
		}
		.popup-header-rank{
			font-size: 25rpx;
			
			
			color: #FFFFFF;
			text-align: center;
		}
		.popup-header-rname{
			font-size: 27rpx;
			
			font-weight: 600;
			color: #FFFFFF;
			text-align: center;
		}
		.popup-item-box{
			width: 100%;
			height:100rpx;
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.popup-item-left{
			width: 520rpx;
			height:100rpx;
			display: flex;
		}
		.popup-item-info{
			width: 400rpx;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			box-sizing: border-box;
			padding:10rpx 0 
		}
		.info-name{
			width: 100%;
			font-size: 27rpx;
			
			font-weight: 600;
			color: #FFFFFF;
		}
		.info-time{
			width: 100%;
			font-size: 21rpx;
			
			
			color: #FFFFFF;
		}
		.popup-item-avatar{
			width: 100rpx;
			height:100rpx;
			margin-right: 20rpx;
		}
		.popup-item-pic{
			width: 166rpx;
			height:166rpx;
			transform: scale(0.8);
		}
		.popup-list-box{
			width: 100%;
			display: flex;
			justify-content: space-between;
		}
		.popup-list-pic{
			width: 166rpx;
			height:166rpx;
			display: flex;
			justify-content: center;
			align-items: flex-start;
			border:0.8px solid #e8e8e8;
			border-radius: 5rpx;
		}
		.popup-list-info{
			width: 486rpx;
			min-height: 166rpx;
			display: inline-flex;
			flex-wrap: wrap;
			align-content: space-between;
			.popup-list-name{
				width: 100%;
				font-size: 28rpx;
				font-weight: 600;
				color: #333333;
			}
			.popup-list-text{
				width: 100%;
				font-size: 24rpx;
				height:40rpx;
				
				
				color: #D9D9D9
			}
			.popup-code-name{
				width: 100%;
				min-height: 63rpx;
				font-size: 24rpx;
				
				
				color: #999999;
				margin-top: 26rpx;
				display: inline-flex;
				align-items: flex-start;
				line-height: 34rpx;
			}
		}
	}
	.rule-popup{
		width: 100%;
		box-sizing: border-box;
		padding: 0 36rpx;
		.rule-popup-title{
			width: 100%;
			height:100rpx;
			text-align: center;
			line-height: 100rpx;
			font-size: 36rpx;
			
			font-weight: 600;
			color: #333333;
		}
		.rule-popup-item{
			margin-bottom: 24rpx;
			.item-title{
				font-size: 28rpx;
				
				font-weight: 600;
				color: #333333;
				margin-bottom: 16rpx;
			}
			.item-desc{
				font-size: 24rpx;
				
				
				color: #333333;
				line-height: 40rpx;
				margin-bottom: 10rpx;
			}
			.item-desc text{
				font-weight: bold;
			}
			.item-desc text.notice{
				
				color:#FA1545
			}
		}
	}
</style>
