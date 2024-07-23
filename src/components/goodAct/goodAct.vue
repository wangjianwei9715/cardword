<template>
	<view class="good-act-content" v-if="goodsActData!='' || goodsData.remark">
		
		<view class="detail-act-box">
			<view class="act-box" @click.prevent="onClickActHelp" v-show="goodsActData!=''">
				<view class="act-box-name">活动</view>
				<view class="act-box-desc" >
					<view class="act-box-desc-item u-line-1" v-for="(item,index) in goodsActData" :key="index">
						<view class="detail-act-desc" :class="{'discount-box':item.indexOf('猜球队')!=-1}">
							<view class="detail-act-guess" v-if="item.indexOf('猜球队')!=-1"></view>{{item}}
						</view>
					</view>
				</view>
				<view class="detail-act-right"></view>
			</view>
			<view class="act-box" v-if="goodsData.remark" @click.prevent="remarkDrawer=true">
				<view class="act-box-name">备注</view>
				<view class="act-box-desc" :class="{'remark-border':goodsActData!=''}">
					<view class="act-box-desc-item">
						<view class="detail-act-remark u-line-1">{{goodsData.remark}}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部弹窗 -->
		<bottomDrawer :showDrawer="showDrawer" title="活动规则" @closeDrawer="onClickCloseDrawer">
			<view class="drawer-helpmsg" v-for="(item,index) in [...drawerMsg]" :key="index">
				<view class="drawer-help-title">{{item.title}}</view>
				<view class="drawer-help-content" v-html="item.content"></view>
			</view>
		</bottomDrawer>
		<!-- 备注弹窗 -->
		<bottomDrawer :showDrawer="remarkDrawer" title="备注" @closeDrawer="remarkDrawer=false">
			<view class="drawer-helpmsg">
				<view class="drawer-help-content">{{goodsData.remark}}</view>
			</view>
		</bottomDrawer>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch,PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	import { guessRules,cheduiHelp } from "@/tools/DataRules";
	@Component({})
	export default class ClassName extends BaseComponent {
		guessRules:any = guessRules;
		cheduiHelp = cheduiHelp;
		@Prop({ default: [] })
		goodsData: any;
		// 底部抽屉
		goodsActData:any = [];
		showDrawer = false;
		drawerMsg:any = [];
		onceDActivity = false;
		rewardList = [];
		remarkDrawer = false;
		@Watch('goodsData')
		onGoodsDataChanged(val: any, oldVal: any) {
			if(val){
				this.getGoodsActData(this.goodsData)
			}
		}
		created() {
			String.prototype.replaceAll = function(f:any, e:any) { 
				var reg = new RegExp(f, "g"); 
				return this.replace(reg, e);
			}
		}
		// 获取活动内容
		getGoodsActData(data:any){
			this.goodsActData = data.dActivity||[];
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
		width: 718rpx;
		border-radius: 3rpx;
		background:#fff;
		margin-bottom: 14rpx;
	}
	.detail-act-box{
		width: 100%;
		box-sizing: border-box;
		padding:7rpx 20rpx;
		.act-box{
			width: 100%;
			display: flex;
			align-items: flex-start;
			.act-box-name{
				margin:16rpx 0;
				width:82rpx;
				font-size: 22rpx;
				color: #333333;
				display: flex;
				align-items: center;
			}
			.chedui-name{
				color:#FA1545
			}
			.act-box-desc{
				width: 587rpx;
			}
			.flex-between{
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.act-box-desc-item{
				display: flex !important;
				align-items: center;
				box-sizing: border-box;
				font-size: 25rpx;
				color: #333333;
				margin:16rpx 0;
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
		
		
		color: #C0C0C0;
	}
	.detail-act-desc{
		width: 550rpx;
		font-size: 22rpx;
		color: #333333;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.detail-act-remark{
		width: 550rpx;
		font-size: 22rpx;
		color: #333333;
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
		
		
		color: #EA4055;
	}
	.drawer-helpmsg{
		width: 100%;
		box-sizing: border-box;
		line-height: 40rpx;
	}
	.drawer-help-title{
		font-size: 27rpx;
		
		font-weight: bold;
		color:#333333;
		margin:15rpx 0rpx;
	}
	.drawer-help-content{
		width: 100%;
		font-size: 25rpx;
		
		
		color: #7D8288;
		white-space: pre-wrap;
		line-height: 35rpx;
		margin-bottom: 50rpx;
	}
	.drawer-help-cd{
		width: 100%;
		font-size: 25rpx;
		
		
		color: #333333;
		line-height: 46rpx;
		white-space: pre-wrap;
		margin-bottom: 15rpx;
	}
	.detail-act-right{
		margin:22rpx 0;
		width: 11rpx;
		height:17rpx;
		background:url(../../static/goods/v2/icon_right_new.png) no-repeat center;
		background-size: 100% 100%;
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
		
		
		color: #333333;
		margin-bottom: 5rpx;
	}
	.chedui-rank-jf{
		width: 100%;
		font-size: 21rpx;
		
		
		color: #C0C0C0;
	}
	.chedui-rank-item-reward{
		font-size: 25rpx;
		
		
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
	.remark-border{
		width:598rpx !important;
		border-top: 0.6px solid #F0F0F0;
	}
</style>
