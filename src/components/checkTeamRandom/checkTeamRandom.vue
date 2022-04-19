<template>
	<view>
		<view class="operation-shadow" v-show="teamRandomShow" @click="onClickTeamRandomCancel"></view>
		<view class="operation-content"  :class="teamRandomShow?'operation-show':''">
			<view class="teamtion-top" v-if="teamRandomData!=''" >
				<view class="icon-close" @click="onClickTeamRandomCancel"></view>
				<view class="teamtion-header">
					<image class="teamtion-header-logo" :src="decodeURIComponent(teamRandomData[currentIndex].logo)"/>
					<view class="teamtion-header-right">
						<view class="teamtion-header-title"><text class="text-price">￥</text><text class="teamtion-price">{{teamRandomData[currentIndex].price}}</text>/组</view>
						<view class="teamtion-header-name">已选"{{teamRandomData[currentIndex].name}}"</view>

						<view class="header-top-plan">
							<view class="goodslist-progress">
								<view class="progress-mask" :style="{width:(100-getPlan(teamRandomData[currentIndex].lockNum,teamRandomData[currentIndex].currentNum,teamRandomData[currentIndex].totalNum))+'%'}"></view>
							</view>
							<view class="header-top-plan-num">
								余{{teamRandomData[currentIndex].totalNum-(teamRandomData[currentIndex].currentNum+teamRandomData[currentIndex].lockNum)}}/共{{teamRandomData[currentIndex].totalNum}}
								<view class="header-top-plan-numbottom">{{teamRandomData[currentIndex].lockNum>0?'('+teamRandomData[currentIndex].lockNum+'未付款)':''}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="teamtion-help">
					<view class="teamtion-help-title">选队随机：购买后将在所选球队的卡种中随机卡密</view>
					<view class="icon-help" @click="onClickRulesShow"></view>
				</view>
			</view>

			<view class="teamtion-box-center">
				<view class="teamtion-box">
					<view class="teamtion-box-index" :class="{'index-current':index==currentIndex}" @click="onClickCurrentIndex(item,index)" v-for="(item,index) in teamRandomData" :key="index">
						<image class="teamtion-box-logo" :src="decodeURIComponent(item.logo)" />
						<view class="teamtion-box-name">{{item.name}}</view>
						<view class="teamtion-box-price">￥{{item.price}}/组</view>
						<view class="teamtion-box-plan">
							<view class="goodslist-progress">
								<view class="progress-mask" :style="{width:(100-getPlan(teamRandomData[index].lockNum,teamRandomData[index].currentNum,teamRandomData[index].totalNum))+'%'}"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="teamtion-bottom">
				<view class="teamtion-bottom-btn" @click="onClickCardCode">卡密列表</view>
				<view class="teamtion-bottom-btn right-btn" @click="onClickBuy">立即购买</view>
			</view>
		</view>

		<bottomDrawer :showDrawer="showDrawer" :height="80" @closeDrawer="showDrawer = false">
			<view class="drawer-box">
				<view class="drawer-title">规则说明</view>
				<view class="drawer-help" v-for="(item,index) in drawerHelp" :key="index">{{item}}</view>
			</view>
		</bottomDrawer>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {getCountDownTimeHour} from '@/tools/util';
	@Component({})
	export default class ClassName extends BaseComponent {
		// 自选球队随机 显示隐藏
		@Prop({ default: false })
		teamRandomShow:boolean|undefined;
		// 选队随机数据
		@Prop({ default: [] })
		teamRandomData:any;
		

		currentIndex = 0;
		showDrawer = false;
		drawerHelp = ['1.玩家可在选队页面选择心仪的球队进行购买，购买后将在所选球队的卡种中随机卡密','2.常规球队包含该球队最新队名下的全部单人卡种和同队的多人卡种；其他包含老球队下的卡种、不同队的多人卡种以及其他类型卡密','3.每个球队的份数与单价不一，请理性选择']
		created(){//在实例创建完成后被立即调用
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickTeamRandomCancel(){
			this.$emit('teamRandomCancel')
		}
		onClickCardCode(){
			this.$emit('cardCode',{id:this.teamRandomData[this.currentIndex].id})
		}
		onClickBuy(){
			let data = this.teamRandomData[this.currentIndex];
			if(this.getPlan(data.lockNum,data.currentNum,data.totalNum)>=100){
				uni.showToast({
					title:'该球队已售罄',
					icon:'none'
				})
				return;
			}
			this.$emit('buy',data)
		}
		onClickCurrentIndex(item:any,index:number){
			this.currentIndex = index;
		}
		getPlan(lock:number,now:number,all:number){
			let width = Math.floor((Number(lock)+Number(now))/Number(all)*100);
			return width
		}
		
		onClickRulesShow(){
			this.showDrawer = true
		}
		
	}
</script>

<style lang="scss">
	.operation-content{
		width: 100%;
		height:80%;
		position: fixed;
		left:0;
		bottom:0;
		border-radius: 5rpx 5rpx 0px 0px;
		box-sizing: border-box;
		transition: all 0.3s linear;
		-webkit-transition: -webkit-transform 0.3s;
		transform: translateY(100%);
		z-index:99;
		background:#fff;
		
	}
	.operation-shadow{
		width: 100%;
		height:100%;
		position: fixed;
		top:0;
		left:0;
		z-index: 88;
		background: rgba(0, 0, 0, 0.5);
	}
	.operation-show{
		transform: translateY(0);
	}
	.teamtion-top{
		width: 100%;
		height:280rpx;
		box-sizing: border-box;
		padding:37rpx  21rpx 20rpx 21rpx;
		position: absolute;
		left:0;
		top:0;
		z-index: 22;
		background:#fff;
		border-radius: 5rpx 5rpx 0px 0px;
	}
	.teamtion-header{
		width: 100%;
		height:170rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}
	.teamtion-header-logo{
		width: 170rpx;
		height:170rpx;
	}
	.teamtion-header-right{
		width: 516rpx;
		height:170rpx;
		box-sizing: border-box;
		padding: 30rpx 0;
	}
	.teamtion-header-title{
		width: 100%;
		font-size: 22rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #88878C;
		margin-bottom: 5rpx;
	}
	.teamtion-header-title .text-price{
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: 500;
		color: #333333;
	}
	.teamtion-header-title .teamtion-price{
		font-size: 33rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #333333;
	}
	.teamtion-header-name{
		width: 100%;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #88878C;
	}

	.header-top-plan{
		width: 100%;
		height:30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0rpx;
		margin-bottom: 40rpx;
		.goodslist-progress{
			background-image: url('../../static/goods/v2/progessBgg_select.png');
			background-size: 100% 100%;
			width: 410rpx;
			height: 9rpx;
			position: relative;
			display: flex;
			justify-content: flex-end;
			.progress-mask{
				height: inherit;
				background-color: #F6F7FB;
				width: 0%;
			}
		}
		
		.header-top-plan-num{
			width: 170rpx;
			height:30rpx;
			font-size: 17rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #88878C;
			line-height: 30rpx;
			text-align: right;
		}
		.header-top-plan-numbottom{
			width: 100%;
			height:30rpx;
			font-size: 17rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #88878C;
			text-align: right;
		}
	}

	.teamtion-help{
		width: 100%;
		height:40rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background:#F1F1F1;
		box-sizing: border-box;
		padding: 0 20rpx 0 25rpx;
	}
	.teamtion-help-title{
		height:40rpx;
		display: flex;
		align-items: center;
		font-size: 23rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #88878C;
	}
	.icon-help{
		width: 27rpx;
		height:26rpx;
		background:url(../../static/goods/v2/icon_help.png) no-repeat center;
		background-size: 100% 100%;
	}
	.icon-close{
		width: 29rpx;
		height:27rpx;
		background:url(../../static/goods/v2/icon_close.png) no-repeat center;
		background-size: 100% 100%;
		position:absolute;
		right:24rpx;
		top:22rpx;
	}
	.drawer-box{
		width: 100%;
		box-sizing: border-box;
	}
	.drawer-title{
		width: 100%;
		font-size: 31rpx;
		font-family: PingFangSC-Regular;
		font-weight: 500;
		color: #333333;
		margin-bottom: 28rpx;
	}
	.drawer-help{
		width: 100%;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #818080;
		line-height: 38rpx;
		margin-bottom: 30rpx;
	}

	.teamtion-box-center{
		width: 100%;
		height:100%;
		overflow: auto;
		box-sizing: border-box;
		padding:280rpx 21rpx calc(140rpx + env(safe-area-inset-bottom)) 21rpx;
	}
	.teamtion-box{
		width: 100%;
		box-sizing: border-box;
		padding: 24rpx 28rpx;
		background:#F6F7FB;
		display: flex;
		flex-wrap: wrap;
	}
	.teamtion-box-index{
		width: 156rpx;
		height:156rpx;
		box-sizing: border-box;
		margin-right: 9rpx;
		background:#E9E9E9;
		margin-bottom: 9rpx;
		position: relative;
		border: 1px solid #E9E9E9;
	}
	.index-current{
		border: 1px solid #F5162B;
	}
	.teamtion-box-index:nth-child(4n){
		margin-right: 0;
	}
	.teamtion-box-name{
		width: 100%;
		height:100rpx;
		box-sizing: border-box;
		padding-top: 50rpx;
		font-size: 33rpx;
		font-family: Lantinghei SC;
		font-weight: 600;
		color: #333333;
		text-align: center;
		position: relative;
		z-index: 6;
	}
	.teamtion-box-price{
		width: 100%;
		text-align: center;
		font-size: 22rpx;
		line-height: 30rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #88878C;
		position: relative;
		z-index: 6;
	}
	.teamtion-box-plan{
		width: 140rpx;
		height:27rpx;
		margin:0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 6;
		.goodslist-progress{
			background-image: url('../../static/goods/v2/progessBgg_select.png');
			background-size: 100% 100%;
			width: 100%;
			height: 9rpx;
			position: relative;
			display: flex;
			justify-content: flex-end;
			.progress-mask{
				height: inherit;
				background-color: #F6F7FB;
				width: 0%;
			}
		}
	}
	.teamtion-box-logo{
		width: 90rpx;
		height:90rpx;
		position: absolute;
		left: 0;
		top:0;
		z-index: 2;
		opacity: 0.4;
	}
	.teamtion-bottom{
		width: 100%;
		height:calc(120rpx + env(safe-area-inset-bottom));
		position: absolute;
		left:0;
		bottom:0;
		box-sizing: border-box;
		padding: 32rpx 23rpx 0 23rpx;
		display: flex;
		justify-content: space-between;
		background:#fff;
		z-index: 22;
	}
	.teamtion-bottom-btn{
		width: 349rpx;
		height:69rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		border:1px solid #DCDCDC;
		font-size: 32rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #333333;
	}
	.right-btn{
		background:#7C4BEA;
		border:1px solid #7C4BEA;
		color:#fff;
	}
	
</style>
