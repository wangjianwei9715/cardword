<template>
	<view class="content">
		<view class="top-bg">
			<view class="top-help" @click="showPopup = true"></view>
			<view class="top-time">4.13-4.15</view>
			<view class="top-card-box">
				<image class="top-card-pic"  :class="index==1?'card-center':''" v-for="(item,index) in cardPic" :key="index" :src="item"></image>
			</view>
			<view class="top-tips">金卡积分=金卡x卡密单价（仅限NBA随机类型拼团）</view>
		</view>

		<!-- 卡密榜 -->
		<view class="title-box">
			<view class="title-content">
				<view class="title-content-rank">我的排名:{{userRanking.ranking}}</view>
				<view class="title-content-num">({{userRanking.gold_value}})</view>
			</view>
		</view>

		<!-- 排行榜 -->
		<view class="rank-box">
			<!-- 1-3 -->
			<view class="rank-box-header">
				<view :class="['rank-box-header-index'+index,index==0?'rank-center':'']" v-for="(item,index) in rankListTop" :key="index">
					<view class="rank-header-avatarbox">
						<image class="rank-header-avatar" :src="item.userAvatar!=''?decodeURIComponent(item.userAvatar):defaultAvatar"></image>
					</view>
					<view class="rank-header-name">{{item.userName!=''?item.userName:'虚位以待'}}</view>
					<view class="rank-header-reward">
						<view class="rank-header-award">{{item.award}}</view>
						<!-- <image class="rank-header-reward-pic" :src="item.award"></image> -->
						<view class="rank-header-goldnum">{{item.gold_value}}</view>
					</view>
				</view>
			</view>
			<!-- 4-50 -->
			<view class="rank-box-content">
				<view class="rank-box-content-index" v-for="(item,index) in rankList" :key="index">
					<view class="rank-box-content-rank">{{index+4}}</view>
					<view class="rank-box-content-avatar">
						<image class="rank-box-content-pic" :src="item.userAvatar!=''?decodeURIComponent(item.userAvatar):defaultAvatar"></image>
						<view class="rank-box-content-avatar-name">{{item.userName!=''?item.userName:'虚位以待'}}</view>
					</view>
					<view class="rank-box-content-num">{{item.gold_value}}</view>
					<view class="rank-box-content-reward">{{getRewardName(index)}}</view>
				</view>
			</view>
		</view>
		

		<view class="popup" v-show="showPopup">
			<view class="popup-showdow"></view>
			<view class="rules-popup" >
				<view class="popup-title">活动规则</view>
				<view class="popup-rules" v-for="(item,index) in rulesData" :key="index">{{item}}</view>
				<view class="popup-close" @click="onClickCancelInvite"></view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		defaultAvatar = app.defaultAvatar
		userRanking:any = {
			ranking:'暂未上榜',
			gold_value:0
		};
		cardPic:any = [
			'../static/goldCard/card1.png',
			'../static/goldCard/card2.png',
			'../static/goldCard/card3.png',
		]
		rulesData = [
			'1、玩家可通过NBA随机卡种、随机球员类拼团有概率获取金卡积分，金卡积分=金卡x卡密单价（如：小明参与10组单价为2.5元的拼团，抽到2张金色卡密，共获得5积分）',
			'2、活动共3天，根据玩家获取金卡积分由高到低排名',
			'3、每期结束后，结算排名奖励。实物类奖品请联系客服发货（包邮）；优惠券类奖品将在2小时内自动发放至我的-优惠券，有效期为60天，请注意查收'
		]
		rankListTop:any = {
			0:{
				userName: "",
				userAvatar:'',
				gold_value:0,
				award:'黑曜石 HOBBY*1盒'
			},
			1:{
				userName: "",
				userAvatar:'',
				gold_value:0,
				award:'Hoops HOBBY*1盒'
			},
			2:{
				userName: "",
				userAvatar:'',
				gold_value:0,
				award:'PRIZM MEGA*1盒'
			},
		};
		rankList:any = [
			{
				userName: "", //用户昵称
				userAvatar: "", //用户头像
				ranking: 1, //排名，越小越靠前
				gold_value: 0, //金卡数量
				award: "", //奖品
			}
		];
		showPopup = false;
		currentPage = 1;
		pageSize = 25;
		noMoreData = false;
		schedulerPic :any
		onLoad(query:any) {
			this.schedulerPic=this.scheduler(()=>{
				this.cardPic.push(this.cardPic[0]);
				this.cardPic.splice(0,1)
			},5);
			this.reqNewData()
		}
		onClickCancelInvite(){
			this.showPopup = false
		}
		getRewardName(rank:number){
			let num = rank+4;
			if(num==4){
				return '革命 新春*1盒'
			}else if(num==5){
				return 'OPTIC手雷*1盒'
			}else if(num>=6&&num<=7){
				return '足球编年史*1盒'
			}else if(num>=8&&num<=10){
				return '150元卡享券'
			}else if(num>=11&&num<=20){
				return '80元卡享券'
			}else if(num>=21&&num<=30){
				return '50元卡享券'
			}else if(num>=31&&num<=50){
				return '20元卡享券'
			}
		}
		reqNewData(cb?:Function) {
			app.http.Get("activity/userGoodNoShowGold/index", {}, (res: any) => {
				if(res.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				this.userRanking = res.data.userRanking;
				if(res.data.list){
					for(let i in this.rankListTop){
						this.rankListTop[i].userName = res.data.list[i].userName;
						this.rankListTop[i].userAvatar = res.data.list[i].userAvatar;
						this.rankListTop[i].gold_value = res.data.list[i].gold_value;
					}
					res.data.list.splice(0,3);
					this.rankList = res.data.list;
				}

				
				if(cb) cb()
			});
		}
		
		
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
	}
	.top-bg{
		width: 100%;
		height:639rpx;
		background:url(../static/goldCard/bg1.jpg) no-repeat center;
		background-size: 100% 100%;
		position: relative;
	}
	.top-help{
		width: 40rpx;
		height:40rpx;
		background:url(../static/goldCard/help.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		top:26rpx;
		right:30rpx;
	}
	.top-card-box{
		width: 500rpx;
		height:202rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		top:237rpx;
		left:50%;
		margin-left: -250rpx;
	}
	.top-card-pic{
		width: 145rpx;
		height:202rpx;
	}
	.card-center{
		width: 181rpx;
		height:255rpx;
		margin-top: -13rpx;
	}
	.top-time{
		width: 200rpx;
		height:40rpx;
		position: absolute;
		left:370rpx;
		top:160rpx;
		font-size: 18rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FEFAEE;
	}
	.top-tips{
		position: absolute;
		width: 100%;
		bottom:19rpx;
		text-align: center;
		font-size: 24rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #989798;
	}
	.title-box{
		width: 750rpx;
		height:70rpx;
		background:url(../static/goldCard/title.png) no-repeat center;
		background-size: 100% 100%;
		position: relative;
	}
	.title-content{
		height:70rpx;
		width: auto;
		position: absolute;
		right:0;
		box-sizing: border-box;
		padding:10rpx 0;
		padding-right: 16rpx;
		text-align: right;
	}
	.title-content-rank{
		width: 100%;
		text-align: right;
		font-size: 22rpx;
		font-family: Calibri;
		font-weight: 400;
		color: #E6E2E8;
	}
	.title-content-num{
		width: 100%;
		text-align: right;
		font-size: 20rpx;
		font-family: Calibri;
		font-weight: 400;
		color: #E6E2E8;
	}
	.rank-box{
		width: 100%;
		box-sizing: border-box;
		background:#4c546a;
		padding-bottom: 40rpx;
	}
	.rank-box-header{
		width: 100%;
		height:320rpx;
		box-sizing: border-box;
		padding:0 26rpx;
		padding-top: 48rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		background: -webkit-linear-gradient(#313546, #4c546a); /* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(#313546, #4c546a); /* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(#313546, #4c546a); /* Firefox 3.6 - 15 */
		background: linear-gradient(#313546, #4c546a); /* 标准的语法 */
	}
	.rank-box-header-index0{
		width: 218rpx;
		height:272rpx;
		background: url(../static/goldCard/rank_bg_1.png) no-repeat center;
		background-size: 100% 100%;
	}
	.rank-box-header-index1{
		width: 218rpx;
		height:272rpx;
		background: url(../static/goldCard/rank_bg_3.png) no-repeat center;
		background-size: 100% 100%;
	}
	.rank-box-header-index2{
		width: 218rpx;
		height:272rpx;
		background: url(../static/goldCard/rank_bg_2.png) no-repeat center;
		background-size: 100% 100%;
	}
	.rank-header-award{
		width: 100%;
		text-align: center;
		font-size: 22rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFF;
		margin-bottom: 10rpx;
	}
	.rank-center{
		position: absolute;
		top:18rpx;
		left:50%;
		margin-left: -109rpx;
	}
	.rank-header-avatarbox{
		width: 96rpx;
		height:120rpx;
		box-sizing: border-box;
		padding-top: 23rpx;
		margin:0 auto;
	}
	.rank-header-avatar{
		width: 96rpx;
		height:96rpx;
		border-radius: 50%;
	}
	.rank-header-name{
		width: 160rpx;
		margin:0 auto;
		height:40rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 22rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFC477;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.rank-header-reward{
		width: 120rpx;
		margin:0 auto;
		height:120rpx;
		box-sizing: border-box;
		padding-top: 20rpx;
	}
	.rank-header-reward-pic{
		width: 	87rpx;
		height:66rpx;
		margin-bottom: 5rpx;
	}
	.rank-header-goldnum{
		width: 100%;
		text-align: center;
		font-size: 22rpx;
		font-weight: 400;
		color: #F8D797;
	}
	.rank-box-content{
		width: 708rpx;
		margin:0 auto;
		box-sizing: border-box;
		border-radius: 10rpx;
		padding:20rpx 15rpx;
		border:1rpx solid #737E9C;
		margin-top: 35rpx;
	}
	.rank-box-content-index{
		width: 680rpx;
		height:60rpx;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		background: #384055;
		box-sizing: border-box;
		padding:0 0 0 30rpx;
		margin-bottom: 20rpx;
	}
	.rank-box-content-rank{
		width: 70rpx;
		height:60rpx;
		line-height: 60rpx;
		font-size: 22rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
	}
	.rank-box-content-avatar{
		width: 250rpx;
		height:60rpx;
		display: flex;
		align-items: center;
		font-size: 22rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		
	}
	.rank-box-content-avatar-name{
		width: 196rpx;
		height:60rpx;
		line-height: 60rpx;
		font-size: 22rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.rank-box-content-pic{
		width: 44rpx;
		height:44rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}
	.rank-box-content-num{
		width: 120rpx;
		height:60rpx;
		line-height: 60rpx;
		font-size: 22rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF
	}
	.rank-box-content-reward{
		width: 210rpx;
		height:60rpx;
		line-height: 60rpx;
		font-size: 22rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}

	.popup-showdow{
		width: 100%;
		height:100%;
		position: fixed;
		top:0;
		left:0;
		z-index:999;
		background: rgba(0, 0, 0, 0.5);
	}
	.rules-popup{
		width:580rpx;
		position: fixed;
		box-sizing: border-box;
		background:#BAC9E6;
		border-radius: 40rpx;
		z-index: 1000;
		left:50%;
		top:50%;
		margin-left: -290rpx;
		margin-top: -450rpx;
		padding-top: 50rpx;
		padding-bottom: 38rpx;
		box-shadow: 0rpx 0rpx 20rpx #fff inset;
		.popup-title{
			width: 100%;
			margin-bottom: 38rpx;
			text-align: center;
			font-size: 34rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #34363A;
		}
		.popup-close{
			width: 52rpx;
			height:52rpx;
			position: absolute;
			right:0;
			top:-94rpx;
			background:url(../static/invite/close.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
	.popup-rules{
		width: 100%;
		box-sizing: border-box;
		padding:0 42rpx;
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #18191D;
		line-height: 50rpx;
		margin-bottom: 10rpx;
	}
</style>
