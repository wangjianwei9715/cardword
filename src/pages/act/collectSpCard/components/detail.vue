<!--
 * @FilePath: \jichao_app_2\src\pages\act\collectSpCard\components\detail.vue
 * @Author: wjw
 * @Date: 2023-05-26 16:52:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-28 11:31:49
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view>
		<view class="detail-box">
			<view class="detail-header">
				<view class="detail-header-box">
					<view class="detail-header-left">
						<view class="detail-header-title u-line-1">{{getCurrentGroup.name}}</view>
						<view class="detail-header-rank" @click="onClickUserRank">已有{{getCurrentGroup.collectedSetNum||0}}名用户集齐<view class="icon-right"></view></view>
					</view>
					<view class="detail-header-btn" @click="onClickGiveBtn">{{giveData.start?'取消':'送给好友'}}</view>
				</view>
			</view>
			<view class="detail-center">
				<view class="detail-card" v-for="(item,index) in groupDetail" :key="index">
					<view class="card-mark" :class="item.collectNum>0?'icon-has':'icon-nhas'">
						<view class="card-mark-text">{{item.collectNum>0?`${item.collectNum<100?'拥有':''}${item.collectNum}`:'未拥有'}}</view>
					</view>
					<view class="card-pic-box">
						<muqian-lazyLoad class="card-pic" :class="{'grayimg':item.collectNum==0}" :src="decodeURIComponent(item.pic)" mode="aspectFill"></muqian-lazyLoad>
					</view>
					<view class="card-name" v-show="!giveData.start||item.collectNum==0">{{item.name}}</view>
					<view class="card-name" v-show="giveData.start&&item.collectNum>0">
						<view class="givebtn" @click="onClickGiveNum(item,'reduce')">
							<image class="icon-reduce" src="@/static/anchor/icon_reduce.png"/>
						</view>
						<view class="icon-give" :class="{'redfont':item.giveNum>0}">{{item.giveNum}}</view>
						
						<view class="givebtn" @click="onClickGiveNum(item,'add')">
							<image class="icon-add" src="@/static/anchor/icon_add.png"/>
						</view>
					</view>
				</view>
			</view>
			<view class="detail-icon-bz"></view>
		</view>
		<view v-show="giveData.start" class="give-bottom" :class="{'usable':giveData.total>0}" @click="onClickShowGiveModal">赠送好友</view>
		<!-- 排名弹窗 -->
		<u-popup :show="rankPopupShow" :round="5" bgColor="#3C5E63" @close="onPopupClose">
			<view class="popup-box">
				<view class="popup-navigation">{{getCurrentGroup.name}}</view>
				<u-list @scrolltolower="getUserRank" height="900rpx" >
					<u-list-item class="popup-listitem" v-for="(item, index) in groupReward" :key="index" >
						<view class="popup-list-header">
							<view class="popup-header-rank">{{rewardRankText(item)}} </view>
							<view class="popup-header-rname">{{item.name}}</view>
						</view>
						<view class="popup-item-box" v-for="(userItem,userIndex) in userRewardRank(item)" :key="userIndex">
							<view class="popup-item-left">
								<muqian-lazyLoad class="popup-item-avatar" :src="userItem.avatar?decodeURIComponent(userItem.avatar):defaultAvatar" mode="aspectFill" borderRadius="50%"></muqian-lazyLoad>
								<view class="popup-item-info">
									<view class="info-name">{{userItem.userName}}</view>
									<view class="info-time">集齐时间:{{userItem.created_at===0?'-':$u.timeFormat(userItem.created_at,'yyyy-mm-dd hh:MM:ss')}}</view>
								</view>
							</view>
							<muqian-lazyLoad class="popup-item-pic" :src="decodeURIComponent(item.pic)" mode="aspectFill" borderRadius="5rpx" @click="previewImage(item)"></muqian-lazyLoad>
						</view>
					</u-list-item>
				</u-list>
			</view>
		</u-popup>

		<!-- 赠送 -->
		<u-modal :show="giveData.show" :showConfirmButton="false" width="550rpx">
			<view class="modal-give" slot="default">
				<view class="give-title">共赠送{{giveData.total}}张特卡</view>
				<u-input class="give-input" placeholder="请输入收方ID" type="number" focus v-model="giveData.targetUserId" border="none" inputAlign="center"></u-input>
				<view class="give-btn-box">
					<view class="give-btn-small btn-cancel" @click="giveClose">取消</view>
					<view class="give-btn-small" @click="giveCard">确认赠送</view>
				</view>
			</view>
		</u-modal>

		<previewImage ref="previewImage" />
	</view>
</template>

<script lang="ts">
	import { Component, Prop,PropSync} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	class RankParams {
		fetchFrom:number = 1;
		fetchSize:number = 30;
		isFetchEnd:boolean = false;
	}
	class Give {
		start:Boolean = false;
		show:Boolean = false;
		targetUserId:string|number = '';
		total:number = 0;
	}
	class UserRank {
		userName:string = "虚位以待";
		avatar:string =  ""; 
		rank:number = 0; 
		created_at:number = 0
	}
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:{}})
		getCurrentGroup!:any;
		@Prop({default:[]})
		groupReward!:any;
		@PropSync("detail",{type:Array})
		groupDetail!:any;

		isPullDown = app.platform.isPullDown;
		defaultAvatar = app.defaultAvatar;
		rankParams = new RankParams();
		userRank:any[] = [];
		rankPopupShow = false;
		giveData = new Give();
		mounted(){
		}
		destroyed(){
		}
		public get userMinLength() : Number {
			const item = this.groupReward[this.groupReward.length-1];
			return item.rankEnd ==0 ? item.rankStart : item.rankEnd
		}
		rewardRankText(item:any):string{
			return `第${item.rankStart}${item.rankEnd==0?'+':(item.rankEnd==item.rankStart?'':`-${item.rankEnd}`)}名`
		}
		previewImage(item: any) {
			this.$refs.previewImage.show({
				urls: [{ src: decodeURIComponent(item.pic), title: item.name }]
			})
		}
		getUserRank(){
			const { rankParams } = this;
			if(rankParams.isFetchEnd) return;

			app.http.Get(
				`dataApi/activity/teka/group/rank/list/${this.getCurrentGroup.id}`,
				rankParams,
				({list, isFetchEnd, collectedSetNum}:any)=>{
					list && (this.userRank = [...this.userRank,...list]);
					this.rankParams.fetchFrom += rankParams.fetchSize;
					this.rankParams.isFetchEnd = isFetchEnd;
					if(this.userRank.length<this.userMinLength){
						this.getUserRank()
					}
					this.$emit('changeUser',collectedSetNum)
					this.isPullDown(false);
					this.rankPopupShow = true;
				}
			)
		}
		initGroupGiveNum(){
			this.groupDetail.forEach((element:any) => element.giveNum = 0 );
		}
		userRewardRank({rankStart,rankEnd}:any) : any[] {
			const rankLength = (rankEnd-rankStart+1);
			let list = this.userRank.filter((x)=>{
				return x.rank>=rankStart && (rankEnd==0?true:x.rank<=rankEnd)
			});
			if(list.length < rankLength || (list.length===0 && rankEnd===0)){
				const num = rankEnd===0 ? 1 : rankLength-list.length;
				for(let i=0;i<num;i++){
					list.push(new UserRank())
				}
			}
			return list;
		}
		onClickUserRank(){
			app.platform.UIClickFeedBack()
			this.getUserRank()
		}
		onPopupClose(){
			this.isPullDown(true);
			this.rankPopupShow = false;
			this.rankParams = new RankParams();
			this.userRank = [];
		}
		onClickGiveBtn(){
			const { start } = this.giveData
			if(!start){
				this.initGroupGiveNum()
				this.giveData.total = 0;
			}
			this.giveData.start = !start;
		}
		onClickGiveNum(item:any,type:string){
			if((type==='add' && item.giveNum>=item.collectNum) || (type==='reduce' && item.giveNum<=0)) return;
			type === 'add' ? (item.giveNum++,this.giveData.total++) : (item.giveNum--,this.giveData.total--);
			app.platform.UIClickFeedBack()
		}
		onClickShowGiveModal(){
			const { total } = this.giveData;
			if(total<=0) return;
			this.giveData.show = true;
		}
		giveClose(){
			this.giveData = new Give();
			this.initGroupGiveNum()
		}
		giveCard(){
			const { targetUserId } = this.giveData;
			const list = this.groupDetail.filter((x:any)=> x.giveNum>0).map((x:any)=>{
				return {tekaId:x.id,num:x.giveNum}
			})
			app.http.Post(
				`activity/teka/give`,
				{targetUserId:Number(targetUserId),list},
				(res:any)=>{
					uni.showToast({title:'赠送成功',icon:'none'});
					this.groupDetail.forEach((element:any) => element.collectNum -= element.giveNum);
					const length = this.groupDetail.filter((x:any)=>x.collectNum>0).length || 0;
					this.giveData = new Give();
					this.$emit('changeNum',length)
				}
			)
		}
	}
</script>

<style lang="scss" scoped>
	.detail-box{
		width: 100%;
		box-sizing: border-box;
		margin-top: 46rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		position: relative;
		.detail-header{
			width: 649rpx;
			height:183rpx;
			background:url(@/static/act/collectSpCard/rank-title.png) no-repeat center / 100% 100%;
			position: relative;
			z-index: 1;
		}
		.detail-header-title{
			font-size: 42rpx;
			font-family: MINI;
			font-weight: 400;
			font-style: italic;
			color: #9BF1FF;
			text-shadow: 5px 4px 9px rgba(0,0,0,0.7);
		}
		.detail-header-rank{
			font-size: 23rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			display: flex;
			align-items: center;
		}
		.icon-right{
			width: 11rpx;
			height:20rpx;
			background:url(@/static/act/collectSpCard/icon_right.png) no-repeat center / 100% 100%;
			margin-left: 14rpx;
		}
		.detail-header-box{
			width: 100%;
			height:128rpx;
			box-sizing: border-box;
			padding:0 50rpx 0 62rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.detail-header-btn{
			width: 235rpx;
			height:93rpx;
			background:url(@/static/act/collectSpCard/btn_give.png) no-repeat center / 100% 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 29rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			text-shadow: 2px 3px 6px rgba(41,41,41,0.71);
			margin-top: 13rpx;
		}
		.detail-center{
			width: 650rpx;
			background:linear-gradient(to bottom,#6A6A6A,#000000);
			position: relative;
			z-index: 2;
			margin-top: -55rpx;
			box-shadow: inset 0 0 8px 4px #000000;
			border:2rpx solid #ccc;
			border-radius: 10rpx;
			box-sizing: border-box;
			padding:4rpx 20rpx 50rpx 20rpx;
			display: flex;
			flex-wrap: wrap;
		}
		.detail-card{
			width: 183rpx;
			height:300rpx;
			position: relative;
			margin-top: 60rpx;
			margin-right: 30rpx;
		}
		.detail-card:nth-child(3n){
			margin-right: 0;
		}
		.card-mark{
			width: 74rpx;
			height:109rpx;
			position: absolute;
			top:-16rpx;
			left:-14rpx;
			z-index: 3;
			overflow: auto;
		}
		.icon-has{
			background:url(@/static/act/collectSpCard/icon_mark.png) no-repeat center / 74rpx 109rpx;
		}
		.icon-nhas{
			background:url(@/static/act/collectSpCard/icon_mark_.png) no-repeat center / 74rpx 109rpx;
		}
		.card-mark-text{
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #3B3B3B;
			transform: rotate(-45deg);
			transform-origin: left bottom;
			position: absolute;
			left:20rpx;
			top:45rpx;
			white-space: nowrap;
		}
		.icon-nhas .card-mark-text{
			color:#fff;
		}
		.card-pic-box{
			width: 183rpx;
			height:258rpx;
			background:#000;
		}
		.card-pic{
			width: 183rpx;
			height:258rpx;
		}
		.grayimg{
			filter: grayscale(100%);
		}
		.card-name{
			height:56rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			margin-top: 11rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.detail-icon-bz{
			width: 121rpx;
			height:139rpx;
			background:url(@/static/act/collectSpCard/icon_bz.png) no-repeat center / 100% 100%;
			position: absolute;
			z-index: 6;
			top:48rpx;
			left:10rpx;
		}
	}
	.popup-box{
		width: 100%;
		height:1000rpx;
		.popup-navigation{
			width: 100%;
			height:100rpx;
			box-sizing: border-box;
			border-bottom: 1px solid rgba(232, 232, 232, 0.23);
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
		}
		.popup-listitem{
			width: 650rpx;
			margin:0 auto;
			border-bottom:1px solid #fff;
			color:#fff;
			box-sizing: border-box;
			padding:20rpx 0;
		}
		.popup-list-header{
			width: 100%;
			display: flex;
			justify-content: space-between;
		}
		.popup-header-rank{
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
		}
		.popup-header-rname{
			font-size: 27rpx;
			font-family: PingFang SC;
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
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
		}
		.info-time{
			width: 100%;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
		.popup-item-avatar{
			width: 100rpx;
			height:100rpx;
			margin-right: 20rpx;
		}
		.popup-item-pic{
			width: 100rpx;
			height:100rpx;
		}
	}
	.givebtn{
		width:56rpx;
		height:56rpx;
		transform: scale(0.5);
	}
	.icon-reduce{
		width: 56rpx;
		height:12rpx;
	}
	.icon-add{
		width:56rpx;
		height:56rpx;
	}
	.icon-give{
		margin:0 20rpx;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		width: 80rpx;
		text-align: center;
	}
	.redfont{
		color:#fa1545
	}
	.give-bottom{
		position: fixed;
		bottom:20rpx;
		bottom:calc(20rpx + env(safe-area-inset-bottom));
		left:50%;
		margin-left: -325rpx;
		width: 650rpx;
		background: #c8c9cc;
		text-align: center;
		font-family: PingFangSC-Semibold;
		color: #FFFFFF;
		height: $btn-height;
		line-height: $btn-height;
		font-size: $btn-fontSize;
		border-radius: $btn-radius;
		font-weight: 600;
		z-index: 66;
	}
	.usable{
		background: $btn-red;
	}
	.modal-give{
		width: 100%;
	}
	.give-title{
		width: 100%;
		text-align: center;
		color:#000;
		font-weight: bold;
	}
	.give-btn-box{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.give-input{
		width: 100%;
		height:60rpx;
		line-height: 60rpx;
		box-sizing: border-box;
		background:#f3f4f6;
		margin:50rpx 0 50rpx 0;
	}
	.give-btn-small{
		width: 200rpx;
		background: $btn-red;
		text-align: center;
		font-family: PingFangSC-Semibold;
		color: #FFFFFF;
		height: $btn-height;
		line-height: $btn-height;
		font-size: $btn-fontSize;
		border-radius: $btn-radius;
		font-weight: 600;
	}
	.btn-cancel{
		border: 1rpx solid #949494;
		background:#fff;
		color:#333
	}
</style>
