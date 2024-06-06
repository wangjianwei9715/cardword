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

					<view class="teamtion-header-right" v-if="teamRandomData[currentIndex].id != -1 || teamrandomGood.state==2">
						<view class="teamtion-header-title"><text class="text-price">￥</text><text class="teamtion-price">{{teamRandomData[currentIndex].price}}</text>/组</view>
						<view class="teamtion-header-name">已选"{{teamRandomData[currentIndex].name}}"</view>
						<view class="header-top-plan">
							<view class="goodslist-progress">
								<view class="progress-mask" :style="{width:(100-getPlan(teamRandomData[currentIndex]))+'%'}"></view>
							</view>
							<view class="header-top-plan-num">
								余{{teamRandomData[currentIndex].totalNum-(teamRandomData[currentIndex].currentNum+teamRandomData[currentIndex].lockNum)}}/共{{teamRandomData[currentIndex].totalNum}}
								<view class="header-top-plan-numbottom" v-show="teamRandomData[currentIndex].lockNum>0">{{teamRandomData[currentIndex].lockNum>0?'('+teamRandomData[currentIndex].lockNum+'未付款)':''}}</view>
							</view>
						</view>
					</view>
					<view class="teamtion-header-right" v-else>
						<!-- 剩余随机未开启 -->
						<view class="teamtion-header-title"><text class="teamtion-price">剩余随机</text></view>
						<view class="teamtion-header-name">已选"{{teamRandomData[currentIndex].name}}"</view>
						<view class="header-top-plan">
							<view class="goodslist-progress">
								<view class="progress-mask" :style="{width:'100%'}"></view>
							</view>
							<view class="header-top-plan-num">暂未开始</view>
						</view>
					</view>
					
					
				</view>
				<view class="teamtion-help">
					<view class="teamtion-help-title" v-if="teamRandomData[currentIndex] && teamRandomData[currentIndex].id != -1" >{{getCardRandomtips(type)}}</view>
					<view class="teamtion-help-title" v-else> {{getRandomMode()}} </view>
					<view class="icon-help" @click="onClickRulesShow"></view>
				</view>
			</view>

			<view class="teamtion-box-center">
				<view class="teamtion-box-title">{{getCardRandomTitle(type)}}</view>
				<view class="teamtion-box" :class="{'card-box':type==12}">
					<view class="teamtion-box-index " :class="{'index-current':index==currentIndex,'card-goldbg':item.gold}" @click="currentIndex = index" v-for="(item,index) in teamRandomData" :key="index">
						<view v-show="multiple&&getPlan(teamRandomData[index])<100&&item.id != -1" class="index-multiple"  @click.stop="onClickCurrentMultiple(index,'click')">
							<view class="multiple" :class="{'multiple-cur':onClickCurrentMultiple(index,'css')}"></view>
						</view>
						<view class="index-shadow" v-show="getPlan(teamRandomData[index])>=100 || (item.id == -1 && multiple) || (teamrandomGood!='' && teamrandomGood.state==2 && item.id != -1)"></view>
						<image class="teamtion-box-logo" v-show="type==11" :src="decodeURIComponent(item.logo)" />
						<view class="teamtion-box-name" v-if="type==11">{{item.name}}</view>
						<view class="teamtion-box-name-card" v-else>
							<view class="teamtion-box-name-card-eng">{{item.nameEn}}</view>
							<view class="teamtion-box-name-card-chn">{{item.name}}</view>
						</view>
						<view class="teamtion-box-price" v-if="item.id != -1 || teamrandomGood.state==2">￥{{item.price}}/组</view>
						<view class="teamtion-box-price" v-else>{{teamrandomGood.state==0?'暂未开始':randomCountStr+'后开启'}}</view>
						<view class="teamtion-box-plan" v-show="item.id != -1 || (teamrandomGood!='' && teamrandomGood.state==2)">
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
				<view class="teamtion-bottom-right" v-if="teamRandomData[currentIndex] && teamRandomData[currentIndex].id != -1">
					<view class="teamtion-bottom-btn" @click="onClickCardCode">卡密列表</view>
					<view v-if="getPlan(teamRandomData[currentIndex])>=100" class="teamtion-bottom-btn multiple-empty">已售罄</view>
					<view v-else class="teamtion-bottom-btn right-btn" :class="{'multiple-empty':multiple&&multipleCurrent==''}" @click="onClickBuy">{{multiple&&multipleCurrent==''?'请勾选分组':'立即购买'}}</view>
				</view>
				<view class="teamtion-bottom-right" v-else>
					<view class="teamtion-bottom-btn" @click="showDrawerRandom = true">
						剩余随机列表
						<view v-if="teamrandomGood.state==2 && teamrandomRemainder.totalAward>0" class="teamtion-bottom-drawer-bg">额外奖品</view>
					</view>
					<view class="teamtion-bottom-btn right-btn" v-if="teamrandomGood.state==2" @click="onClickRandomBuy">立即购买</view>
					<view class="teamtion-bottom-btn multiple-empty" v-else>{{teamrandomGood.state==0?'暂未开始':randomCountStr+'后开启'}}</view>
				</view>
			</view>
		</view>

		<bottomDrawer :showDrawer="showDrawer" :title="'规则说明'" :height="80" @closeDrawer="showDrawer = false">
			<view class="drawer-box">
				<view class="drawer-help" v-for="(item,index) in getCardRandomHelp(type)" :key="index">{{item}}</view>
			</view>
		</bottomDrawer>

		<bottomDrawer :showDrawer="showDrawerRandom" :title="'剩余随机列表'" :height="80" @closeDrawer="showDrawerRandom = false">
			<view class="drawer-box">
				<view class="drawer-help" v-if="teamrandomGood.state<2">{{getRandomMode()}}</view>
				<view class="drawer-random" v-else>
					<view class="drawer-random-title">剩余卡密<text>详情请查看分队列表</text></view>
					<view class="drawer-random-list" v-for="(item,index) in teamrandomRemainder.no" :key="index">
						<view class="drawer-random-name">{{item.name}}</view><text>x{{item.num}}组</text>
					</view>
					<view class="drawer-random-total">合计:{{teamrandomRemainder.totalNo}}组</view>

					<view v-if="teamrandomRemainder.totalAward>0">
						<view class="drawer-random-title">额外奖品<text>每条卡密获奖概率=奖品数量/剩余随机卡密总数</text></view>
						<view class="drawer-random-list" v-for="(item,index) in teamrandomRemainder.extraAward" :key="index">
							<view class="drawer-random-name drawer-red">{{item.name}}</view><text>x{{item.num}}份</text>
						</view>
						<view class="drawer-random-total">合计:{{teamrandomRemainder.totalAward}}份奖品</view>
						<view class="drawer-random-explain">
							<view class="drawer-random-explain-title">(获得额外奖品将显示在卡密中)</view>
							<image class="drawer-random-explain-pic" src="../../static/goods/v2/random_tips.jpg" mode="aspectFit"/>
						</view>
					</view>
				</view>
			</view>
		</bottomDrawer>
		
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {getCardRandomtips,getCardRandomHelp} from "@/tools/switchUtil"
	import { getCountDownTime } from "@/tools/util";
	@Component({})
	export default class ClassName extends BaseComponent {
		// 自选球队随机 显示隐藏
		@Prop({ default: false })
		teamRandomShow:boolean|undefined;
		// 选队随机数据 剩余随机未开启时id:-1  
		@Prop({ default: [] })
		teamRandomData:any;
		// 选队随机 剩余随机数据
		@Prop({ default: [] })
		teamrandomGood:any;
		// 选队随机 剩余随机配置
		@Prop({ default: [] })
		teamrandomRemainder:any;
		
		// 类型 11：选队随机 12：选卡种随机
		@Prop({ default: false })
		type:boolean|undefined;
		
		getCardRandomtips = getCardRandomtips;
		getCardRandomHelp = getCardRandomHelp;
		currentIndex = 0;
		showDrawer = false;
		// 多选
		multiple = false;
		multipleCurrent:any = [];
		// 剩余随机
		randomCountStr = '';
		randomCountInterval:any;
		randomCountTimeCopy = 0;
		showDrawerRandom = false;
		@Watch('teamRandomShow')
		onShowChanged(val: any, oldVal: any){
			if(val){
				if(this.teamrandomGood!=''&&this.teamrandomGood.state==1){
					this.randomCountTimeCopy = this.teamrandomGood.leftSecond;
					this.randomCountDownTime()
				}
			}else{
				if(this.teamrandomGood!=''&&this.teamrandomGood.state==1){
					clearInterval(this.randomCountInterval);
				}
			}
			
		}
		created(){//在实例创建完成后被立即调用
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			clearInterval(this.randomCountInterval);
		}
		getCardRandomTitle(state:number){
			return state==11?"选择球队":(state==12?"选择卡种":"-");
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
			if( this.teamrandomGood != '' && this.teamrandomGood.state == 2 && this.currentIndex !=0 ) return;

			let current = this.multiple ? this.multipleCurrent : [this.currentIndex];
			let buyData = current.map((x:any)=>{
				let data = this.teamRandomData[x];
				return {...data,num:1,maxNum:data.totalNum-(data.currentNum+data.lockNum)}
			})
			this.$emit('buy',buyData);
			this.multiple = false;
			this.multipleCurrent = [];
		}
		onClickRandomBuy(){
			this.$emit('randomBuy',this.teamRandomData[this.currentIndex]);
		}
		getPlan(data:any){
			let width = Math.floor((Number(data.lockNum)+Number(data.currentNum))/Number(data.totalNum)*100);
			return width
		}
		onClickRulesShow(){
			this.showDrawer = true
		}
		// 剩余随机
		randomCountDownTime(){
			this.randomCountStr = getCountDownTime(this.randomCountTimeCopy);
			this.randomCountInterval = setInterval(()=>{
				if(this.randomCountTimeCopy>0){
					this.randomCountTimeCopy--;
					this.randomCountStr = getCountDownTime(this.randomCountTimeCopy);
				}else{
					this.$emit('randomCountOver');
					this.currentIndex = 0;
					clearInterval(this.randomCountInterval)
				}
			},1000)
		}
		getRandomMode(){
			if(this.teamrandomGood == '') return;
			
			switch(this.teamrandomGood.state){
				case 0:
					return '剩余随机：总进度＜'+this.teamrandomGood.maxLeftNum+'组后，倒计时'+this.teamrandomGood.idleMinute+'分钟开启购买';
				case 1:
					return '剩余随机：'+this.randomCountStr+'后开启';
				case 2:
					return '剩余随机：将在剩余的全部卡密中随机'
			}
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
		
		font-weight: 400;
		color: #88878C;
		margin-bottom: 5rpx;
	}
	.teamtion-header-title .text-price{
		font-size: 25rpx;
		
		font-weight: 600;
		color: #333333;
	}
	.teamtion-header-title .teamtion-price{
		font-size: 33rpx;
		
		font-weight: 400;
		color: #333333;
	}
	.teamtion-header-name{
		width: 100%;
		font-size: 25rpx;
		
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
			background: linear-gradient(90deg, #CFC1F3 0%, #7048DD 100%);
			width: 270rpx;
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
			width: 250rpx;
			height:30rpx;
			font-size: 20rpx;
			
			font-weight: 400;
			color: #88878C;
			line-height: 30rpx;
			text-align: right;
			display: flex;
			justify-content: flex-end;
			align-items: flex-end;
		}
		.header-top-plan-numbottom{
			display: inline-block;
			height:30rpx;
			font-size: 20rpx;
			line-height: 30rpx;
			
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
		
		font-weight: 400;
		color: #7D8288;
		line-height: 38rpx;
		margin-bottom: 50rpx;
	}
	.drawer-random{
		.drawer-random-title{
			width: 100%;
			font-size: 28rpx;
			
			font-weight: 400;
			color: #333333;
			margin-bottom: 30rpx;
		}
		.drawer-random-title text,.drawer-random-explain-title{
			font-size: 25rpx;
			
			font-weight: 400;
			color: #7D8288;
			margin-left: 20rpx;
		}
		.drawer-random-explain-pic{
			width: 100%;
			height:300rpx;
			margin-top: -30rpx;
		}
		.drawer-random-list{
			width: 48%;
			display: inline-flex;
			align-items: center;
			margin-bottom:10rpx;
		}
		.drawer-random-name{
			max-width: 73%;
			height:34rpx;
			background: #F6F7FB;
			border-radius: 3rpx;
			font-size: 25rpx;
			
			font-weight: 400;
			color: #333333;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			box-sizing: border-box;
			padding:0 10rpx;
			margin-right: 15rpx;
			line-height: 34rpx;
		}
		.drawer-red{
			background:#E8665B;
			color:#fff;
		}
		.drawer-random-list text{
			font-size: 25rpx;
			
			font-weight: 400;
			color: #7D8288;
		}
		.drawer-random-total{
			width: 100%;
			font-size: 25rpx;
			
			font-weight: 400;
			color: #333333;
			margin-top: 10rpx;
			margin-bottom: 50rpx;
		}
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
		font-size: 24rpx;
		font-weight: 600;
		color: #333333;
		text-align: center;
		position: relative;
		z-index: 6;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.teamtion-box-price{
		width: 100%;
		text-align: center;
		font-size: 25rpx;
		line-height: 30rpx;
		
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
			background: linear-gradient(90deg, #CFC1F3 0%, #7048DD 100%);
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
		width: 54rpx;
		height:54rpx;
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
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
		
		line-height: 30rpx;
		text-align: center;
		font-weight: 600;
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
			background: linear-gradient(90deg, #CFC1F3 0%, #7048DD 100%);
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
		
		color: #5E5D5D;
		height: $btn-height;
		font-size: $btn-fontSize;
		border-radius:$btn-radius;
		font-weight: $btn-weight;
		position: relative;
	}
	.teamtion-bottom-drawer-bg{
		position: absolute;
		right:0;
		top:-39rpx;
		width: 119rpx;
		height:39rpx;
		background: url(../../static/goods/v2/icon_reward.png) no-repeat center;
		background-size: 100% 100%;
		z-index: 2;
		font-size: 23rpx;
		
		font-weight: 400;
		color: #FFFFFF;
		line-height: 32rpx;
		text-align: center;
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
