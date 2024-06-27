<template>
	<view class="desc-container">
		<view class="detail-box-title detail-padding">赠品详情</view>
		<view class="goods-desc-explain">
			<view class='goods-desc-explain-box' v-for="item in descList" :key="item.id">
				<view class="explain-name">{{item.name}}</view>
				<view class="explain-desc">{{item.desc}}</view>
			</view>
		</view>
		<view class="goods-desc-step">
			<view v-for="(item,index) in stepList" :key="index" :class="{'icon-step':item.type=='icon'}">
				<view class="step-name">{{item.name}}</view>
				<view class="step-text">{{item.text}}</view>
			</view>
		</view>
		<view class="goods-desc-tips">部分情况可能导致直播/报告/发货等时间延长，具体以商家通知为准</view>
		<view class="goods-desc-rule" @click.stop="showDrawer = true">
			查看详细规则<image class="icon-desc-rule" src="@/static/goods/v3/icon_rule.png" />
		</view>

		<!-- 底部弹窗 -->
		<bottomDrawer :showDrawer.sync="showDrawer" :title="'拼团规则'">
			<view class="drawer-box" v-for="(item,index) in goodsDetailHelp" :key="index">
				<view class="drawer-help">{{item.content}}</view>
			</view>
		</bottomDrawer>
	</view>
			
</template>
<script lang="ts">
import { app } from "@/app";
	import { Component, Prop} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { goodsDetailHelp } from "@/tools/DataRules";
	@Component({
		components:{}
	})
	export default class ClassName extends BaseComponent {
		@Prop({ default: {} })
		goodsData: any;

		goodsDetailHelp = goodsDetailHelp;
		showDrawer = false;// 底部抽屉
		stepList = [
			{type:'str',name:'拼团时间',text:""},
			{type:'icon'},
			{type:'str',name:'拼成后直播',text:"24小时内"},
			{type:'icon'},
			{type:'str',name:'制作报告',text:"3天内"},
			{type:'icon'},
			{type:'str',name:'中卡发货',text:"5天内"}
		]
		descList = [];
		beforeMount(){
			this.setGoodsDesc()
		}
		onClickGoMerchant(item){
			app.platform.hasLoginToken(()=>{
				app.navigateTo.goPersonHome(item.userId,item.anonymous)
			})
		}
		setGoodsDesc(){
			const { goodsData } = this;
			const desc = decodeURIComponent(goodsData.desc);
			const newDesc = desc.indexOf('\n') > -1 ? desc.split('\n') : desc.split('\r');
			const series = { serieTitle:'', spec:'' }
			const hasMinSale = goodsData.isSelect || [11,12].includes(goodsData.pintuan_type)
			newDesc.forEach((x:any)=>{
				let data = x.indexOf('：')!=-1?x.split('：'):x.split(':');
				if(data[0] == '拼团系列') series.serieTitle = data[1];
				if(data[0] == '拼团规格') series.spec = data[1];
			})
			this.stepList[0].text = `${(goodsData.overAt-goodsData.startAt)/86400}天`
			this.descList = [
				{name:'拼团编号',desc:`${goodsData.goodCode}`},
				{name:'开售时间',desc:uni.$u.timeFormat(goodsData.startAt,'yyyy-mm-dd hh:MM:ss')},
				{name:'系列名称',desc:`${series.serieTitle||goodsData.serieTitle}`},
				{name:'商品规格',desc:`${series.spec||goodsData.spec.content}`},
				{name:'售卖详情',desc:`${goodsData.price}元${hasMinSale?"起":""} /份 共计${goodsData.totalNum}份`},
			]
		}
	}
</script>

<style lang="scss" scoped>
	.desc-container{
		width: 718rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 4rpx;
		margin-bottom: 14rpx;
		.detail-box-title{
			font-weight: 600;
			font-size: 24rpx;
			color: #333333;
			margin-bottom: 16rpx;
			box-sizing: border-box;
			padding:24rpx 20rpx 0 20rpx;
		}
		.goods-desc-explain{
			border-bottom: 1rpx solid #F2F2F7;
		}
		.goods-desc-explain-box{
			width: 100%;
			display: flex;
			justify-content: space-between;
			margin:0 auto;
			.explain-name{
				width: 180rpx;
				min-height:78rpx;
				background:#FFF;
				font-size: 20rpx;
				color: #878B95;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding-left: 20rpx;
				border-top: 1rpx solid #F2F2F7;
				border-right: 1rpx solid #F2F2F7;
				font-weight: 300;
			}
			.explain-desc{
				width: 538rpx;
				min-height:80rpx;
				background:#FFF;
				font-size: 20rpx;
				color: #333333;
				display: flex;
				align-items: center;
				box-sizing: border-box;
				padding:5rpx 38rpx 5rpx 54rpx;
				margin-bottom:4rpx;
				line-height:35rpx;
				border-top: 1rpx solid #F2F2F7;
			}
		}
		.goods-desc-tips{
			width: 678rpx;
			height: 54rpx;
			background: #F2F2F7;
			border-radius: 2rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 18rpx;
			color: #AEAEB2;
			margin:0 auto;
		}
		.goods-desc-rule{
			width: 100%;
			height:78rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 20rpx;
			color: #333333;
			margin-bottom: 7rpx;
		}
		.icon-desc-rule{
			width: 17rpx;
			height:17rpx;
			margin-left: 10rpx;
		}
		.goods-desc-step{
			width: 100%;
			box-sizing: border-box;
			padding:0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 20rpx;
			margin-bottom: 34rpx;
		}
		.icon-step{
			width: 32rpx;
			height:9rpx;
			background: url(@/static/goods/v3/step.png) no-repeat center / 100% 100%;
			margin:0 40rpx;
		}
		.step-name{
			font-size: 20rpx;
			color: #878B95;
			text-align: center;
			margin-bottom: 6rpx;
			font-weight: 300;
		}
		.step-text{
			font-size: 20rpx;
			color: #333333;
			text-align: center;
			font-weight: 300;
		}
	}
	.drawer-box {
		width: 100%;
		box-sizing: border-box;
	}

	.drawer-help {
		width: 100%;
		font-size: 25rpx;
		color: #7D8288;
		line-height: 38rpx;
		margin-bottom: 50rpx;
	}
	
</style>
