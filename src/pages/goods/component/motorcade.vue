<template>
	<view class="good-act-content" v-if="(cheduiData.list&&cheduiData.list!='')">
		
		<view class="detail-act-box">
			<view v-show="cheduiData.list" class="act-box" @click.prevent="cheduiShowDrawer=true;isPullDown(false)">
				<view class="box-name">
					<image class="icon-name" src="@/static/goods/detail/chedui.png"/>
					<text class="box-name-text">车队排行</text>
				</view>
				<view class="act-box-desc flex-between">
					<view class="act-box-desc-item flex-between">前{{cheduiData.totalNum}}名送礼品</view>
					<u-notice-bar style="padding:0;max-width:350rpx;text-align:right;height:32rpx;" :fontSize="'24rpx'" :text="rewardList" direction="column" icon="" color="#A27339" bgColor="rgba(0,0,0,0)" :duration="3000" :flexEnd="true"></u-notice-bar>
				</view>
				<view class="detail-act-right"></view>
			</view>
		</view>
		<!-- 车队排行榜 -->
		<bottomDrawer :showDrawer="showChedui" :title="'车队排行榜'" @closeDrawer="cheduiShowDrawer=false;isPullDown(true)" :needSafeArea="true" :padding="'0rpx 0rpx'">
			<view class="drawer-header">
				<view class="drawer-header-name">上车最多的前{{cheduiData.totalNum}}名玩家送礼</view>
				<image style="width:27rpx;height:26rpx" src="@/static/goods/v2/icon_help.png" @click="cheduiHelpShowDrawer=true"></image>
			</view>
			<view class="drawer-center-list">
				<view class="drawer-chedui" v-for="(item,index) in cheduiData.list" :key="index">
					<view class="chedui-rank-item">
						<view class="chedui-rank-item-left">
							<view class="chedui-rank-item-num" :class="`chedui-rank-item-num-${item.index}`">{{item.index}}</view>
							<view class="chedui-avatar-box" :class="`chedui-avatar-box${item.index}`">
								<image v-if="item.occupy" class="chedui-rank-avatar" :src="`${item.avatar&&item.avatar!=''&&!item.anonymous?decodeURIComponent(item.avatar):defaultAvatar}`"/>
								<image v-else class="chedui-rank-avatar" :src="waitAvatar"/>
							</view>
							<view class="chedui-rank-name" v-if="item.occupy">
								<view class="chedui-rank-n u-line-1">{{item.anonymous?"匿名用户":item.userName}}</view>
								<view class="chedui-rank-jf u-line-1">积分 {{item.amount}}</view>
							</view>
						</view>
						<view class="chedui-rank-item-reward u-line-2" :class="{'font-bold':item.index<=3}">{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="drawer-bottom">
				<view class="chedui-rank-item">
					<view class="chedui-rank-item-left">
						<view class="chedui-rank-item-num">{{cheduiData.myRank>0?cheduiData.myRank:'-'}}</view>
						<view class="chedui-avatar-box" :class="`chedui-avatar-box${cheduiData.myRank}`">
							<image class="chedui-rank-avatar" :src="decodeURIComponent(userData.avatar)"/>
						</view>
						<view class="chedui-rank-name">
							<view class="chedui-rank-n u-line-1">{{userData.name||''}}</view>
							<view class="chedui-rank-jf u-line-1">积分 {{cheduiData.myAmount}}</view>
						</view>
					</view>
					<view class="chedui-rank-item-reward u-line-1">{{cheduiData.myRank>0?cheduiData.list[cheduiData.myRank-1].name:'未上榜'}}</view>
				</view>
			</view>
		</bottomDrawer>

		<bottomDrawer :showDrawer="cheduiHelpShowDrawer" :title="'车队排行榜'" @closeDrawer="cheduiHelpShowDrawer=false" :needSafeArea="true">
			<view class="drawer-helpmsg" v-for="(item,index) in [helpOne,...cheduiHelp]" :key="index">
				<view class="drawer-help-cd">{{item.content}}</view>
			</view>
		</bottomDrawer>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch,PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	import { cheduiHelp } from "@/tools/DataRules";
	@Component({})
	export default class ClassName extends BaseComponent {
		cheduiHelp = cheduiHelp;
		@Prop({ default: [] })
		goodsData: any;
		@Prop({ default: {} })
		cheduiData: any;
		@Prop({ default: {} })
		userData: any;
		@PropSync("showChedui",{
			type:Boolean
		}) cheduiShowDrawer!: Boolean;

		rewardList = [];
		cheduiHelpShowDrawer = false;
		helpOne = {};
		defaultAvatar = app.defaultAvatar;
		waitAvatar = '../../static/goods/v2/waitAvatar.png'
		@Watch('cheduiData')
		onCheduiDataChanged(val: any, oldVal: any) {
			if(val){
				this.setChedui()
			}
		}
		created() {
			String.prototype.replaceAll = function(f:any, e:any) { 
				var reg = new RegExp(f, "g"); 
				return this.replace(reg, e);
			}
		}
		setChedui(){
			this.helpOne = {content:`1.本活动仅对当前商品${this.goodsData.goodCode}生效，累计上车金额（含使用优惠券金额）最多的前${this.cheduiData.totalNum}名玩家，获得相应的榜单礼品`};
			if(this.cheduiData.list){
				this.rewardList = this.cheduiData.list.map((x:any)=>{
					return x.name
				}).slice(0,5)
			}
		}
		isPullDown(isPull:boolean) {
			//#ifdef APP-PLUS
			//获取当前 Webview 窗口对象
			const pages = getCurrentPages();  
			const page = pages[pages.length - 1];  
			//@ts-ignore
			const currentWebview = page.$getAppWebview();
			//根据状态值来切换禁用/开启下拉刷新
			currentWebview.setStyle({  
				pullToRefresh: {  
					support: isPull,  
					style: 'circle'
				}  
			});  
			//#endif
		}
	}
</script>

<style lang="scss">
	.good-act-content{
		width: 100%;
		height: 42rpx;
		background: #FAEEDD;
		border-radius: 4rpx;
		box-sizing: border-box;
		margin-top: 24rpx;
	}
	.detail-act-box{
		width: 100%;
		box-sizing: border-box;
		.act-box{
			width: 100%;
			height: 42rpx;
			box-sizing: border-box;
			padding:0 20rpx 0 4rpx;
			display: flex;
			align-items: center;
			.box-name{
				width: 122rpx;
				height:34rpx;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding-left: 2rpx;
				background: linear-gradient(90deg, #DEC18B 0%, #C99C49 100%);
			}
			.box-name-text{
				height:34rpx;
				font-size: 18rpx;
				font-family: hei;
				color: #FFFFFF;
				display: flex;
				align-items: center;
			}
			.icon-name{
				width: 32rpx;
				height:32rpx;
			}
			.act-box-desc{
				width: 550rpx;
				height: 42rpx;
			}
			.flex-between{
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.act-box-desc-item{
				height: 42rpx;
				line-height: 42rpx;
				display: flex !important;
				align-items: center;
				box-sizing: border-box;
				font-size: 24rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: #A27339;
				padding-left: 16rpx;
			}
		}
		.detail-act-index{
			width: 100%;
			height:40rpx;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
		}
	}
	.detail-act-left{
		width: 600rpx;
		height:40rpx;
		display: flex;
		align-items: center;
	}
	.detail-act-name{
		width: 110rpx;
		height:40rpx;
		line-height: 40rpx;
		font-size: 27rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #C0C0C0;
	}
	.detail-act-desc{
		width: 550rpx;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #333333;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.discount-box{
		display: flex;
		align-items: center;
	}
	
	.detail-discount{
		height:40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding:0 13rpx;
		border:1px solid #F4919F;
		margin-right: 24rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #EA4055;
	}
	.drawer-helpmsg{
		width: 100%;
		box-sizing: border-box;
		line-height: 40rpx;
	}
	.drawer-help-title{
		font-size: 27rpx;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		color:#333333;
		margin:15rpx 0rpx;
	}
	.drawer-help-content{
		width: 100%;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #7D8288;
		white-space: pre-wrap;
		line-height: 35rpx;
		margin-bottom: 50rpx;
	}
	.drawer-help-cd{
		width: 100%;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 46rpx;
		white-space: pre-wrap;
		margin-bottom: 15rpx;
	}
	
	.drawer-header{
		width: 100%;
		height:60rpx;
		background:#F5F5F5;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding:0 20rpx;
		margin-bottom: 40rpx;
	}
	.drawer-header-name{
		font-size: 23rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #959695;
	}
	.drawer-chedui{
		margin-bottom: 37rpx;
	}
	.drawer-bottom{
		width: 100%;
		position: absolute;
		border-top: 1rpx solid #E2E2E2;
		left:0;
		bottom:0;
		display: flex;
		height: calc(118rpx);
		height: calc(118rpx + constant(safe-area-inset-bottom));
		height: calc(118rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;
		padding-top: 20rpx;
		z-index: 6;
		background:#fff;
	}
	.chedui-rank-item{
		width: 100%;
		height:85rpx;
		padding-right: 50rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.chedui-rank-item-left{
		height:85rpx;
		display: flex;
		align-items: center;
	}
	.chedui-rank-item-num{
		width: 69rpx;
		height:85rpx;
		font-size: 38rpx;
		font-family: Impact;
		font-weight: 400;
		color: #908D8B;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.chedui-rank-item-num-1{
		color:#F1CB6F
	}
	.chedui-rank-item-num-2{
		color:#B9B8B8
	}
	.chedui-rank-item-num-3{
		color:#E0B48D
	}
	.chedui-avatar-box{
		width: 92rpx;
		height:92rpx;
		box-sizing: border-box;
		border-radius: 50%;
		margin-right: 29rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.chedui-avatar-box1{
		width: 92rpx;
		height:92rpx;
		background: linear-gradient(-39deg, #F2D89E, #F8ECCC, #D7CA9C);
	}
	.chedui-avatar-box2{
		width: 92rpx;
		height:92rpx;
		background: linear-gradient(-39deg, #B6B5B4, #E4E2DE, #B6B5B4);
	}
	.chedui-avatar-box3{
		width: 92rpx;
		height:92rpx;
		background: linear-gradient(-39deg, #C7A085, #F7DBBB, #BF9B76);
	}
	.chedui-rank-avatar{
		width: 85rpx;
		height: 85rpx;
		box-sizing: border-box;
		border-radius: 50%;
	}
	.chedui-rank-name{
		width: 240rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	.chedui-rank-n{
		width: 100%;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-bottom: 5rpx;
	}
	.chedui-rank-jf{
		width: 100%;
		font-size: 21rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #C0C0C0;
	}
	.chedui-rank-item-reward{
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.font-bold{
		font-weight: bold;
	}
	.drawer-center-list{
		padding-bottom: 200rpx;
	}
	.hasAct{
		border-bottom: 1rpx solid #E6E6E6;
	}
	.detail-act-right{
		width: 12rpx;
		height:20rpx;
		background:url(@/static/goods/detail/chedui_right.png) no-repeat center /100% 100%;
		margin-left: 12rpx;
	}
</style>
