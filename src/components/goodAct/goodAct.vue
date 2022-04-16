<template>
	<view class="good-act-content" v-if="goodsActData!=''">
		<view class="detail-act-box">
			<view class="detail-act-index" @click="onClickActHelp" v-for="(item,index) in goodsActData" :key="index">
				<view class="detail-act-left">
					<view class="detail-act-name">活动{{chineseNumber[index+1]}}</view>
					<view class="detail-act-desc" v-if="item!='discount'">
						<view class="detail-act-guess" v-if="item.indexOf('猜球员')!=-1"></view>{{item}}
					</view>
					<view class="detail-act-desc" v-else>
						<view class="detail-discount" v-show="discount[index-1]" v-for="index in 2" :key="index">
							{{discount[index-1]}}
						</view>
					</view>
				</view>
				<view class="detail-act-right" ></view>
			</view>
		</view>

		<!-- 底部弹窗 -->
		<bottomDrawer :showDrawer="showDrawer" @closeDrawer="onClickCloseDrawer">
			<view class="drawer-helpmsg" v-for="(item,index) in drawerMsg" :key="index">
				<view class="drawer-help-title">{{item.title}}</view>
				<view class="drawer-help-content" v-html="item.content"></view>
			</view>
    	</bottomDrawer>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	import { chineseNumber } from "@/net/DataExchange";
	import { guessRules } from "@/net/DataRules";
	@Component({})
	export default class ClassName extends BaseComponent {
		// 中文数字 规则
		chineseNumber = chineseNumber;
		guessRules = guessRules;
		@Prop({
			default: []
		})
		goodsData: any;
		
		// 底部抽屉
		goodsActData:any = [];
  		showDrawer = false;
		drawerMsg:any = [];
		discount = [];
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

			let discount = data.discount ? data.discount.map((x:any)=>{
				return x.content
			}) : ''
			if(discount!='') {
				this.goodsActData  = [ 'discount',...this.goodsActData ];
				this.drawerMsg = [{title:'阶梯奖励：',content:discount.toString().replaceAll(',',';')}, ...this.drawerMsg];
				this.discount = JSON.parse(JSON.stringify(discount))
			};
			if((this.goodsData.bit & 8) == 8){
				this.goodsActData.push('猜球员 赢免单');
			}
		}
		onClickActHelp(){
			if(this.drawerMsg==''){
				app.http.Get('good/'+this.goodsData.goodCode+'/dActivity',{},(res:any)=>{
					this.drawerMsg = [...this.drawerMsg,...res.list]
				})
				if((this.goodsData.bit & 8) == 8){
					this.drawerMsg = this.drawerMsg.concat(this.guessRules)
				}
				
			}
			this.showDrawer = true;
		}
		onClickCloseDrawer() {
			this.showDrawer = false;
		}
	}
</script>

<style lang="scss">
	.good-act-content{
		width: 724rpx;
		border-radius: 5rpx;
		background:#fff;
		margin-bottom: 13rpx;
	}
	.detail-act-box{
		width: 100%;
		box-sizing: border-box;
		padding:20rpx 20rpx 0 20rpx;
		.detail-act-index{
			width: 100%;
			height:40rpx;
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.detail-act-left{
				width: 660rpx;
				height:40rpx;
				display: flex;
				align-items: center;
			}
			.detail-act-name{
				width: 120rpx;
				height:40rpx;
				line-height: 40rpx;
				font-size: 31rpx;
				font-family: PingFangSC-Medium;
				font-weight: bold;
				color: #333333;
			}
			.detail-act-desc{
				font-size: 27rpx;
				display: flex;
				align-items: center;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #88878C;
			}
			.detail-act-guess{
				width: 130rpx;
				height:28rpx;
				margin-right: 20rpx;
				background:url(../../pages/act/static/guess/guess_icon.png) no-repeat center;
				background-size: 100% 100%;
			}
			.detail-act-right{
				width: 13rpx;
				height:21rpx;
				background:url(../../static/index/v2/icon_right.png) no-repeat center;
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
				font-size: 27rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #EA4055;
			}
		}
	}
	.drawer-helpmsg{
		width: 100%;
		box-sizing: border-box;
		line-height: 40rpx;
	}
	.drawer-help-title{
		font-size: 31rpx;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		color:#333333;
		margin:20rpx 0rpx;
	}
	.drawer-help-content{
		width: 100%;
		font-size: 27rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #9b9b9b;
		white-space: pre-wrap;
		line-height: 35rpx;
	}
</style>
