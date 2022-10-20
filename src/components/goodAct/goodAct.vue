<template>
	<view class="good-act-content" v-if="goodsActData!=''||cheduiData.list!=''">
		<view class="detail-act-box">
			<view v-show="cheduiData.list" class="act-box" :class="{'hasAct':goodsActData!=''}" @click.prevent="cheduiShowDrawer=true">
				<view class="act-box-name chedui-name">车队</view>
				<view class="act-box-desc flex-between">
					<view class="act-box-desc-item flex-between">车队排行榜前{{cheduiData.totalNum}}名送礼品!</view>
					<u-notice-bar style="padding:0;max-width:180rpx;text-align:right" :fontSize="'25rpx'" :text="rewardList" direction="column" icon="" color="#A3A3A3" bgColor="rgba(0,0,0,0)" :duration="3000" :flexEnd="true"></u-notice-bar>
				</view>
				<view class="detail-act-right"></view>
			</view>
			<view class="act-box" @click.prevent="onClickActHelp" v-show="goodsActData!=''">
				<view class="act-box-name">活动</view>
				<view class="act-box-desc" >
					<view class="act-box-desc-item u-line-1" v-for="(item,index) in goodsActData" :key="index">
						<view class="detail-act-desc" :class="{'discount-box':item.indexOf('猜球队')!=-1}" v-if="item!='discount'">
							<view class="detail-act-guess" v-if="item.indexOf('猜球队')!=-1"></view>{{item}}
						</view>
						<view class="detail-act-desc discount-box" v-else>
							<view class="detail-discount" v-show="discount[index-1]" v-for="index in 2" :key="index">
								{{discount[index-1]}}
							</view>
						</view>
					</view>
				</view>
				<view class="detail-act-right"></view>
			</view>
			
		</view>

		<!-- 底部弹窗 -->
		<bottomDrawer :showDrawer="showDrawer" :title="'活动规则'" @closeDrawer="onClickCloseDrawer">
			<view class="drawer-helpmsg" v-for="(item,index) in [discountMsg,...drawerMsg]" :key="index">
				<view class="drawer-help-title">{{item.title}}</view>
				<view class="drawer-help-content" v-html="item.content"></view>
			</view>
		</bottomDrawer>

		<!-- 车队排行榜 -->
		<bottomDrawer :showDrawer="showChedui" :title="'车队排行榜'" @closeDrawer="cheduiShowDrawer=false" :needSafeArea="true" :padding="'0rpx 0rpx'">
			<view class="drawer-header">
				<view class="drawer-header-name">上车最多的前{{cheduiData.totalNum}}名玩家送礼</view>
				<image style="width:27rpx;height:26rpx" src="@/static/goods/v2/icon_help.png" @click="cheduiHelpShowDrawer=true"></image>
			</view>
			<view class="drawer-center-list">
				<view class="drawer-chedui" v-for="(item,index) in cheduiData.list" :key="index">
					<view class="chedui-rank-item">
						<view class="chedui-rank-item-left">
							<view class="chedui-rank-item-num" :class="`chedui-rank-item-num-${item.index}`">{{item.index}}</view>
							<image class="chedui-rank-avatar" :src="decodeURIComponent(item.avatar)"/>
							<view class="chedui-rank-name u-line-1">{{item.userName}}</view>
						</view>
						<view class="chedui-rank-item-reward u-line-1" :class="{'font-bold':item.index<=3}">{{item.name}}</view>
					</view>
				</view>
			</view>
			<view class="drawer-bottom">
				<view class="chedui-rank-item">
					<view class="chedui-rank-item-left">
						<view class="chedui-rank-item-num">{{cheduiData.myRank>0?cheduiData.myRank:'-'}}</view>
						<image class="chedui-rank-avatar" :src="decodeURIComponent(userData.avatar)"/>
						<view class="chedui-rank-name u-line-1">{{userData.name}}</view>
					</view>
					<view class="chedui-rank-item-reward u-line-1">{{cheduiData.myRank>0?cheduiData.list[cheduiData.myRank-1].name:'-'}}</view>
				</view>
			</view>
		</bottomDrawer>

		<bottomDrawer :showDrawer="cheduiHelpShowDrawer" :title="'车队排行榜'" @closeDrawer="cheduiHelpShowDrawer=false" :needSafeArea="true">
			<view class="drawer-helpmsg" v-for="(item,index) in [helpOne,...cheduiHelp]" :key="index">
				<view class="drawer-help-cd" v-html="item.content"></view>
			</view>
		</bottomDrawer>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch,PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	import { chineseNumber } from "@/net/DataExchange";
	import { guessRules,cheduiHelp } from "@/net/DataRules";
	@Component({})
	export default class ClassName extends BaseComponent {
		// 中文数字 规则
		chineseNumber = chineseNumber;
		guessRules:any = guessRules;
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

		// 底部抽屉
		goodsActData:any = [];
		showDrawer = false;
		drawerMsg:any = [];
		discount = [];
		onceDActivity = false;
		discountMsg:any = {}
		rewardList = [];
		cheduiHelpShowDrawer = false;
		helpOne = {}
		@Watch('goodsData')
		onGoodsDataChanged(val: any, oldVal: any) {
			if(val){
				this.getGoodsActData(this.goodsData)
			}
		}
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
		// 获取活动内容
		getGoodsActData(data:any){
			this.goodsActData = data.dActivity||[];

			let discount = data.discount ? data.discount.map((x:any)=>{
				return x.content
			}) : ''
			if(discount!='') {
				this.goodsActData  = [ 'discount',...this.goodsActData ];
				this.discountMsg = {title:'阶梯奖励：',content:discount.toString().replaceAll(',',';')}
				this.discount = JSON.parse(JSON.stringify(discount))
			};
			if((this.goodsData.bit & 8) == 8){
				this.goodsActData.push('猜球队 赢免单');
			}
		}
		onClickActHelp(){
			if(!this.onceDActivity){
				app.http.Get('dataApi/good/'+this.goodsData.goodCode+'/dActivity',{},(res:any)=>{
					this.onceDActivity = true;
					if(res.list){
						this.drawerMsg = [...this.drawerMsg,...res.list]
					}
					if((this.goodsData.bit & 8) == 8){
						this.drawerMsg.push(this.guessRules);
					}
				})
			}
			this.showDrawer = true;
		}
		onClickCloseDrawer() {
			this.showDrawer = false;
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
		width: 710rpx;
		border-radius: 3rpx;
		background:#fff;
		margin-bottom: 14rpx;
	}
	.detail-act-box{
		width: 100%;
		box-sizing: border-box;
		padding:2rpx 30rpx;
		.act-box{
			width: 100%;
			min-height:76rpx;
			display: flex;
			.act-box-name{
				height:76rpx;
				width:82rpx;
				font-size: 25rpx;
				font-family: PingFangSC-Semibold;
				font-weight: 600;
				color: #333333;
				display: flex;
				align-items: center;
			}
			.chedui-name{
				color:#FA1545
			}
			.act-box-desc{
				width: 550rpx;
				min-height:76rpx;
			}
			.flex-between{
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.act-box-desc-item{
				height:76rpx;
				display: flex !important;
				align-items: center;
				box-sizing: border-box;
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
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
	.detail-act-guess{
		width: 130rpx;
		height:28rpx;
		margin-right: 20rpx;
		background:url(../../pages/act/static/guess/guess_icon.png) no-repeat center;
		background-size: 100% 100%;
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
	.detail-act-right{
		width: 11rpx;
		height:17rpx;
		background:url(../../static/goods/v2/icon_right_new.png) no-repeat center;
		background-size: 100% 100%;
		margin-left: 10rpx;
		margin-top: 33rpx;
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
		margin-bottom: 40rpx;
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
		height:78rpx;
		padding-right: 50rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.chedui-rank-item-left{
		height:78rpx;
		display: flex;
		align-items: center;
	}
	.chedui-rank-item-num{
		width: 69rpx;
		height:78rpx;
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
	.chedui-rank-avatar{
		width: 78rpx;
		height: 78rpx;
		border-radius: 50%;
		margin-right: 29rpx;
	}
	.chedui-rank-name{
		width: 250rpx;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
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
</style>
