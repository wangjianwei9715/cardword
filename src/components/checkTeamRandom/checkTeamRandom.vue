<template>
	<view>
		<view class="operation-shadow" v-show="teamRandomShow" @click="onClickTeamRandomCancel"></view>
		<view class="operation-content"  :class="teamRandomShow?'operation-show':''">
			<view class="teamtion-top" v-if="teamRandomData!=''" >
				<view class="icon-close" @click="onClickTeamRandomCancel"></view>
				<view class="teamtion-header">
					<image class="teamtion-header-logo" v-if="teamRandomData[currentIndex].logo!=''" :src="decodeURIComponent(teamRandomData[currentIndex].logo)"/>
					<view v-else class="teamtion-header-card" :class="{'teamtion-header-card-gold':teamRandomData[currentIndex].gold}">
					</view>
					<view class="teamtion-header-right">
						<view class="teamtion-header-title"><text class="text-price">￥</text><text class="teamtion-price">{{teamRandomData[currentIndex].price}}</text>/组</view>
						<view class="teamtion-header-name">已选"{{teamRandomData[currentIndex].name}}"</view>

						<view class="header-top-plan">
							<view class="goodslist-progress">
								<view class="progress-mask" :style="{width:(100-getPlan(teamRandomData[currentIndex]))+'%'}"></view>
							</view>
							<view class="header-top-plan-num">
								余{{teamRandomData[currentIndex].totalNum-(teamRandomData[currentIndex].currentNum+teamRandomData[currentIndex].lockNum)}}/共{{teamRandomData[currentIndex].totalNum}}
								<view class="header-top-plan-numbottom">{{teamRandomData[currentIndex].lockNum>0?'('+teamRandomData[currentIndex].lockNum+'未付款)':''}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="teamtion-help">
					<view class="teamtion-help-title">{{getCardRandomtips(type)}}</view>
					<view class="icon-help" @click="onClickRulesShow"></view>
				</view>
			</view>

			<view class="teamtion-box-center">
				<view class="teamtion-box-title">{{getCardRandomTitle(type)}}</view>
				<view class="teamtion-box" :class="{'card-box':type==12}">
					<view class="teamtion-box-index " :class="{'index-current':index==currentIndex,'card-goldbg':item.gold}" @click="currentIndex = index" v-for="(item,index) in teamRandomData" :key="index">
						<view v-show="multiple&&getPlan(teamRandomData[index])<100" class="index-multiple multiple" :class="{'multiple-cur':onClickCurrentMultiple(index,'css')}" @click.stop="onClickCurrentMultiple(index,'click')"></view>
						<view class="index-shadow" v-show="getPlan(teamRandomData[index])>=100"></view>
						<image class="teamtion-box-logo" v-show="type==11" :src="decodeURIComponent(item.logo)" />
						<view class="teamtion-box-name" v-if="type==11">{{item.name}}</view>
						<view class="teamtion-box-name-card" v-else>
							<view class="teamtion-box-name-card-eng">{{item.nameEn}}</view>
							<view class="teamtion-box-name-card-chn">{{item.name}}</view>
						</view>
						<view class="teamtion-box-price">￥{{item.price}}/组</view>
						<view class="teamtion-box-plan">
							<view class="goodslist-progress">
								<view class="progress-mask" :style="{width:(100-getPlan(teamRandomData[index]))+'%'}"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="teamtion-bottom">
				<view class="teamtion-bottom-left">
					<view class="multiple" :class="{'multiple-cur':multiple}" @click="onClickMultiple"></view>
					<view class="teamtion-bottom-multiple-title">多选</view>
				</view>
				<view class="teamtion-bottom-right">
					<view class="teamtion-bottom-btn" @click="onClickCardCode">卡密列表</view>
					<view class="teamtion-bottom-btn right-btn" :class="{'multiple-empty':multiple&&multipleCurrent==''}" @click="onClickBuy">{{multiple&&multipleCurrent==''?'请勾选分组':'立即购买'}}</view>
				</view>
			</view>
		</view>

		<bottomDrawer :showDrawer="showDrawer" :title="'规则说明'" :height="80" @closeDrawer="showDrawer = false">
			<view class="drawer-box">
				<view class="drawer-help" v-for="(item,index) in getCardRandomHelp(type)" :key="index">{{item}}</view>
			</view>
		</bottomDrawer>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {getCardRandomtips,getCardRandomHelp,getCardRandomTitle} from "@/tools/switchUtil"
	@Component({})
	export default class ClassName extends BaseComponent {
		// 自选球队随机 显示隐藏
		@Prop({ default: false })
		teamRandomShow:boolean|undefined;
		// 选队随机数据
		@Prop({ default: [] })
		teamRandomData:any;
		// 类型 11：选队随机 12：选卡种随机
		@Prop({ default: false })
		type:boolean|undefined;
		
		getCardRandomtips = getCardRandomtips;
		getCardRandomTitle = getCardRandomTitle;
		getCardRandomHelp = getCardRandomHelp;
		currentIndex = 0;
		showDrawer = false;
		// 多选
		multiple = false;
		multipleCurrent:any = [];
		// 剩余随机
		random = false;
		created(){//在实例创建完成后被立即调用
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickMultiple(){
			this.multiple = !this.multiple;
			this.multipleCurrent = [];
		}
		onClickCurrentMultiple(index:number,type:string){
			let indexOf = this.multipleCurrent.indexOf(index);
			if( type == 'css') return indexOf == -1 ? false : true;

			if( indexOf != -1 ){
				this.multipleCurrent.splice(indexOf,1)
			}else{
				this.multipleCurrent.push(index)
			}
		}
		onClickTeamRandomCancel(){
			this.$emit('teamRandomCancel')
		}
		onClickCardCode(){
			this.$emit('cardCode',{id:this.teamRandomData[this.currentIndex].id})
		}
		onClickBuy(){
			if( !this.multiple ){
				let data = this.teamRandomData[this.currentIndex];
				if(this.getPlan(data)>=100){
					uni.showToast({ title:'该球队已售罄', icon:'none' })
					return;
				}
			}
			if( this.multiple && this.multipleCurrent.length <= 0) return;

			let current = this.multiple ? this.multipleCurrent : [this.currentIndex];
			let buyData = current.map((x:any)=>{
				let data = this.teamRandomData[x];
				return {...data,num:1,maxNum:data.totalNum-(data.currentNum+data.lockNum)}
			})
			this.$emit('buy',buyData);
			this.multiple = false;
			this.multipleCurrent = [];
		}
		getPlan(data:any){
			let width = Math.floor((Number(data.lockNum)+Number(data.currentNum))/Number(data.totalNum)*100);
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
	.teamtion-header-card{
		width: 170rpx;
		height:170rpx;
		box-sizing: border-box;
		padding: 0 21rpx;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 300;
		display: flex;
		align-items: center;
		justify-content: center;
		background:url(../../static/goods/v2/card_bg.png) no-repeat center;
		background-size: 100% 100%;
	}
	.teamtion-header-card-gold{
		background:url(../../static/goods/v2/card_bg_gold.png) no-repeat center !important;
		background-size: 100% 100%;
	}
	.teamtion-header-card-name{
		width: 170rpx;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 300;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 5;
		overflow: hidden;
		word-break:break-word; 
		text-align: center;
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
			font-size: 20rpx;
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
	.drawer-help{
		width: 100%;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #7D8288;
		line-height: 38rpx;
		margin-bottom: 50rpx;
	}

	.teamtion-box-center{
		width: 100%;
		height:100%;
		overflow: auto;
		box-sizing: border-box;
		background:#F6F7FB;
		
		padding:280rpx 0 calc(140rpx) 0;
		padding:280rpx 0 calc(140rpx + constant(safe-area-inset-bottom)) 0;
		padding:280rpx 0 calc(140rpx + env(safe-area-inset-bottom)) 0;
	}
	.teamtion-box-title{
		width: 100%;
		box-sizing: border-box;
		font-size: 27rpx;
		font-family: PingFangSC-Regular;
		font-weight: 600;
		color: #333333;
		margin-bottom: 12rpx;
		padding: 23rpx 22rpx 0 22rpx;
	}
	.teamtion-box{
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		padding: 0 22rpx;
	}
	.teamtion-box-index{
		width: 170rpx;
		height:170rpx;
		box-sizing: border-box;
		margin-right: 9.5rpx;
		background:#FFF;
		margin-bottom: 9.5rpx;
		position: relative;
		border: 1px solid #FFF;
	}
	.index-shadow{
		position: absolute;
		z-index: 9;
		background:rgba(228,227,227,0.6);
		width: 100%;
		height:100%;
		left:0;
		top:0;
	}
	.teamtion-box-index:nth-child(4n){
		margin-right: 0;
	}
	.teamtion-box-name{
		width: 100%;
		height:100rpx;
		box-sizing: border-box;
		padding-top: 50rpx;
		font-size: 29rpx;
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
		font-size: 25rpx;
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
			height: 10rpx;
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
		width: 100rpx;
		height:100rpx;
		position: absolute;
		left: 0;
		top:0;
		z-index: 2;
		opacity: 0.4;
	}
	.card-box .teamtion-box-index{
		width: 231rpx;
		height:285rpx;
		box-sizing: border-box;
		margin-right: 9rpx;
		background:#FFF;
		margin-bottom: 9rpx;
		position: relative;
		background:url(../../static/goods/v2/card_bg_.png) no-repeat center;
		background-size: 100% 100%;
	}
	.index-multiple{
		position: absolute;
		right:8rpx;
		top:8rpx;
		z-index: 8;
	}
	.card-box .card-goldbg{
		background:url(../../static/goods/v2/card_bg_gold_.png) no-repeat center !important;
		background-size: 100% 100%;
	}
	.card-box .teamtion-box-index:nth-child(3n){
		margin-right: 0;
	}
	.card-box .teamtion-box-name-card{
		width: 100%;
		height:195rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #333333;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		position: relative;
		z-index: 6;
		padding-top: 40rpx;
		
	}
	.teamtion-box-name-card-eng{
		width: 200rpx;
		margin:0 auto;
		height:76rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 300;
		color: #333333;
		line-height: 25rpx;
		text-align: center;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		word-break:break-word; 
	}
	.teamtion-box-name-card-chn{
		width: 200rpx;
		margin:0 auto;
		height:65rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
		font-family: PingFang SC;
		line-height: 30rpx;
		text-align: center;
		font-weight: 500;
		color: #333333;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		word-break:break-word; 
	}
	.card-box .teamtion-box-price{
		width: 100%;
		height:40rpx;
		text-align: center;
		font-size: 25rpx;
		line-height: 40rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #88878C;
		position: relative;
		z-index: 6;
	}
	.card-box .teamtion-box-plan{
		width: 200rpx;
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
			height: 10rpx;
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
	.card-box .teamtion-box-logo{
		width: 150rpx;
		height:150rpx;
		position: absolute;
		left: 0;
		top:0;
		z-index: 2;
		opacity: 0.4;
	}
	.index-current{
		border: 1px solid $btn-red !important;
	}
	.teamtion-bottom{
		width: 100%;
		height:calc(120rpx);
		height:calc(120rpx + constant(safe-area-inset-bottom));
		height:calc(120rpx + env(safe-area-inset-bottom));
		position: absolute;
		left:0;
		bottom:0;
		box-sizing: border-box;
		padding: 19rpx 20rpx 0 20rpx;
		display: flex;
		justify-content: space-between;
		background:#fff;
		z-index: 22;
	}
	.teamtion-bottom-left{
		width: 154rpx;
		height:$btn-height;
		display: flex;
		align-items: center;
	}
	.multiple{
		width: 34rpx;
		height:34rpx;
		background: url(../../static/goods/v2/icon_multiple.png) no-repeat center;
		background-size: 100% 100%;
	}
	.multiple-cur{
		width: 34rpx;
		height:34rpx;
		background: url(../../static/goods/v2/icon_multiple_.png) no-repeat center;
		background-size: 100% 100%;
	}
	.teamtion-bottom-multiple-title{
		height:$btn-height;
		margin-left: 18rpx;
		font-size: 29rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height:$btn-height ;
	}
	.teamtion-bottom-right{
		width: 556rpx;
		height:$btn-height;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.teamtion-bottom-btn{
		width: 270rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		border:1px solid #DCDCDC;
		font-family: PingFangSC-Regular;
		color: #5E5D5D;
		height: $btn-height;
		font-size: $btn-fontSize;
		border-radius:$btn-radius;
		font-weight: $btn-weight;
	}
	.right-btn{
		background:#7C4BEA;
		border:1px solid #7C4BEA;
		color:#fff;
	}
	.multiple-empty{
		background:#BDBDBD;
		border:1px solid #BDBDBD;
		color:#fff;
	}
</style>
