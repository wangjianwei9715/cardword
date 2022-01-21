<template>
	<view>
		<view class="operation-shadow" v-show="teamCheckShow" @click="onClickTeamCancel"></view>
		<view class="operation-content" :class="teamCheckShow?'operation-show':''">
			<view class="teamtion-top" v-if="teamData!=''">
				<view class="teamtion-header">
					<view class="header-left">
						<image class="header-left-pic" :src="teamCheckIndex==999?'../../static/goods/xianbian.png':(teamData[teamCheckIndex].logo?decodeURIComponent(teamData[teamCheckIndex].logo):'')" mode="aspectFit"/>
					</view>
					<view class="header-right" v-if="branchData!=''">
						<view class="header-price">¥<text>{{teamCheckIndex==999?randomMode.good.price:branchData[branchCheckIndex].price}}</text></view>
						<view class="header-teamname">“{{teamCheckIndex==999?'剩余球队':teamData[teamCheckIndex].name}}”</view>
						<view class="header-teamtip">{{teamCheckIndex==999?'将在剩余的球队编号中随机限编':branchData[branchCheckIndex].name}}</view>
						<button v-if="teamCheckIndex!=999&&randomMode.state!=2"  class="header-shopping-btn" :class="{'cart-have':getCartHaveIndex()}" @click="onClickJoinCart">{{getCartHaveIndex()?'已在购物车':'加入购物车'}}</button>
						<view v-else-if="teamCheckIndex==999" class="header-shoppong-random">
							<view class="goodslist-plan-desc">余{{randomMode.good.totalNum-(randomMode.good.currentNum+randomMode.good.lockNum)}}/共{{randomMode.good.totalNum}}</view>
							<view class="goodslist-plan-content">
								<view class="goodslist-plan-now" :style="'width:'+getPlan(randomMode.good.lockNum,randomMode.good.currentNum,randomMode.good.totalNum)+'%'"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="teamtion-index">
					<view class="teamtion-title">选择球队</view>
					<view class="team-check-content">
						<scroll-view class="team-check-content-scroll" :scroll-x="true">
							<!-- 随机模式 -->
							<view :class="{'scroll-index':true,'scroll-index-check-random':teamCheckIndex==999}" @click="onClickTeamCheckRandom" v-show="randomMode.state==2">
								<image class="scroll-index-img-random" :src="teamCheckIndex==999?'../../static/goods/xianbian_.png':'../../static/goods/xianbian.png'" mode="aspectFit"></image>
								<view class="scroll-index-name" :class="teamCheckIndex==999?'scroll-index-name-random':''">剩余球队</view>
								<view class="random-ing">进行中</view>
							</view>

							<view :class="{'scroll-index':true,'scroll-index-check':teamCheckIndex==index}" v-for="(item,index) in teamData" :key="item.id" @click="onClickTeamCheck(index)">
								<image class="scroll-index-img" :src="item.logo?decodeURIComponent(item.logo):''" mode="aspectFit"></image>
								<view class="scroll-index-name" :class="{'random-team-name':randomMode.state==2}">{{item.name}}</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="teamtion-title bianhao-title">
					{{teamCheckIndex==999?'剩余编号':'选择编号'}}
					<view class="random-all" v-if="teamCheckIndex==999">（共25组，合计{{Number(randomMode.good.price)*25}}元）</view>
				</view>

			</view>
			<view class="teamtion-center" v-if="branchData!=''">
				<view class="teamtion-index">
					<view class="branch-list" v-show="teamCheckIndex!=999">
						<view :class="{'branch-index':true,'branch-index-check':branchCheckIndex==index}" v-for="(item,index) in branchData" :key="item.id" @click="onClickBranchCheck(index)">
							<view class="branch-index-name">{{item.name}} </view>￥{{item.price}}
							<view class="branch-sq" v-if="item.soldOut||item.lock">{{item.soldOut?'售罄':'未支付'}}</view>
						</view>
					</view>
					<view class="branch-list-random" v-show="teamCheckIndex==999">
						<view :class="{'branch-index':true}" v-for="item in branchData" :key="item.id">
							<view class="branch-index-name-random">{{item.name}} </view>
							<view class="branch-reward" v-if="item.isExtend">额外奖品</view>
						</view>
					</view>
				</view>
			</view>

			<view class="teamtion-bottom">
				<!-- 随机买队 -->
				<view class="teamtion-random" v-show="randomMode!=''">
					<view class="teamtion-random-text" v-if="randomMode.state==0">
						编号数量≤{{randomMode.maxLeftNum}}件且{{randomMode.idleMinute}}分钟内无人购买将进入剩余随机模式
					</view>
					<view class="teamtion-random-text" v-else-if="randomMode.state==1">
						{{randomCountTimeCopy==0?'':randomCountStr}}后进入剩余随机模式
					</view>
					<view class="teamtion-random-text" v-else-if="randomMode.state==2">
						剩余随机进行中
					</view>
					<view class="teamtion-random-help" @click="showRulesPopup = true"></view>
				</view>
				<!--  -->
				<view class="btncheck-content" v-if="randomMode==''||randomMode.state!=2">
					<view class="btn-left">
						<view :class="cartData.available==0?'cart-empty':'cart-noempty'" @click="onClickShowShoppingCart">
							<view v-show="cartData.num>0" class="icon-yuan" :class="cartData.num>=10?'icon-yuans':''">{{cartData.num}}</view>
						</view>
						<text class="btn-left-price">￥{{cartData.amount}}</text>
					</view>
					<view v-if="countTimeCopy>0" class="btn-right-count" ><text class="count-text">开售倒计时</text> {{countTimeCopy==0?'':' '+countStr}}</view>
					<view v-else class="btn-right" :class="{'btn-empty':cartData.available==0}" @click="onClickSettlement">去结算</view>
				</view>
				<view class="btncheck-content" v-else>
					<button class="btn-right-random" v-show="teamCheckIndex==999" @click="onClickBuyRandomGood">￥{{randomMode.good.price?randomMode.good.price:''}}/组 立即购买</button>
					<view class="btn-right-random-orther" v-show="teamCheckIndex!=999">请选购剩余球队</view>
				</view>
			</view>

			<!-- 购物车窗口 -->
			<view class="shopping-cart" :class="{'show-cart':showShoppingCart}">
				<view class="checkteam-popup-header">
					<view class="checkteam-popup-back" @click="onClickCloseShoppingCart"></view>
					购物车
					<view v-show="cartData.num>=1" class="cart-deleteall" @click="onClickDelCartIndex('[]')">清空</view>
				</view>
				<view class="checkteam-popup-list">
					<view class="checkteam-popup-index" v-for="(item,index) in cartData.list" :key="item.id">
						<view class="checkteam-popup-logo-box"  >
							<image class="checkteam-popup-logo" :src="decodeURIComponent(item.trunkLogo)" mode="aspectFit"/>
						</view>
						<view class="checkteam-popup-detail">
							<view class="checkteam-popup-detail-trunk">{{item.trunk}}</view>
							<view class="checkteam-popup-detail-name">{{item.name}}</view>
							<view class="checkteam-popup-detail-price">￥<text>{{item.price}}</text></view>
							<view class="cart-delete" @click="onClickDelCartIndex(index)"></view>
						</view>
						
					</view>
				</view>
			</view>

			<!--  -->
			<!-- 随机买队规则窗口 -->
			<view class="rules-popup" :class="{'show-rules':showRulesPopup}">
				<view class="checkteam-popup-header">
					<view class="checkteam-popup-back" @click="onClickCloseRulesPopup"></view>
					规则说明
				</view>
				<view class="rules-center">
					<view class="rules-title">购买形式</view>
					<view class="rules-index">商品开售后用户可自由选购心仪的球队编号，当球队编号剩余达到一定数量且一段时间没无人购买将触发剩余随机模式随机</view>
					<view class="rules-title">剩余随机模式</view>
					<view class="rules-index">
						触发该模式后，剩余的球队编号将以随机限编的形式售卖，用户购买后获得一份限编卡密，待直播拆卡后获得剩余球队编号中对应限编的卡片。
						<view>(随机限编单价=剩余球队总额/25)</view>
					</view>
					<view class="rules-title">随机限编清单</view>
					<table class="rules-table">
						<thead>
							<tr>
								<td width="15%">序号</td>
								<td width="85%">获得卡种(剩余球队)</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in rulesData" :key="index">
								<td>{{index+1}}</td>
								<td>{{item}}</td>
							</tr>
						</tbody>
					</table>
				</view>
			</view>

			<!--  -->

		</view>
		
		<view class="random-showdow" v-show="showRandomPopup"></view>
		<view class="random-popup" v-show="showRandomPopup">
			<view class="popup-title">温馨提示</view>
			<view class="popup-msg">当前商品为<text style="color:#FB4E3E">剩余随机</text>模式，您将在剩余球队中购得一份随机限编卡密，请悉知！</view>
			<button class="popup-btn" @click="onClickPopupBtn">
				继续购买
			</button>
			<view class="popup-cancel" @click="onClickCancelPopupBtn">我再想想</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {getCountDownTimeHour} from '@/tools/util';
	@Component({})
	export default class ClassName extends BaseComponent {
		// 自选球队 显示隐藏
		@Prop({ default: false })
		teamCheckShow:boolean|undefined;
		// 自选球队 球队选择
		@Prop({ default: 0 })
		teamCheckIndex:number|undefined;
		// 自选球队 分支选择
		@Prop({ default: 0 })
		branchCheckIndex:any;
		// 自选球队 球队列表
		@Prop({ default: [] })
		teamData:any;
		// 自选球队 分支列表
		@Prop({ default: [] })
		branchData:any;
		// 自选球队 购物车信息
		@Prop({ default: {} })
		cartData:any;
		// 自选球队 倒计时
		@Prop({ default: 0 })
		teamLeftSec:any
		// 自选球队 随机模式数据
		@Prop({ default: [] })
		randomMode:any
		
		countStr = '';
		countInterval:any;
		countTimeCopy = 0;

		randomCountStr = '';
		randomCountInterval:any;
		randomCountTimeCopy = 0;
		showShoppingCart = false;
		showRulesPopup = false;
		rulesData = [
			'1/xx编、26/xx编、51/xx编、76/xx编',
			'2/xx编、27/xx编、52/xx编、77/xx编',
			'3/xx编、28/xx编、53/xx编、78/xx编',
			'4/xx编、29/xx编、54/xx编、79/xx编',
			'5/xx编、30/xx编、55/xx编、80/xx编',
			'6/xx编、31/xx编、56/xx编、81/xx编',
			'7/xx编、32/xx编、57/xx编、82/xx编',
			'8/xx编、33/xx编、58/xx编、83/xx编',
			'9/xx编、34/xx编、59/xx编、84/xx编',
			'10/xx编、35/xx编、60/xx编、85/xx编',
			'11/xx编、36/xx编、61/xx编、86/xx编',
			'12/xx编、37/xx编、62/xx编、87/xx编',
			'13/xx编、38/xx编、63/xx编、88/xx编',
			'14/xx编、39/xx编、64/xx编、89/xx编',
			'15/xx编、40/xx编、65/xx编、90/xx编',
			'16/xx编、41/xx编、66/xx编、91/xx编',
			'17/xx编、42/xx编、67/xx编、92/xx编',
			'18/xx编、43/xx编、68/xx编、93/xx编',
			'19/xx编、44/xx编、69/xx编、94/xx编',
			'20/xx编、45/xx编、70/xx编、95/xx编',
			'21/xx编、46/xx编、71/xx编、96/xx编',
			'22/xx编、47/xx编、72/xx编、97/xx编',
			'23/xx编、48/xx编、73/xx编、98/xx编',
			'24/xx编、49/xx编、74/xx编、99/xx编',
			'25/xx编、50/xx编、75/xx编、交换版、无编卡'
		];
		showRandomPopup = false;
		@Watch('teamCheckShow')
		onShowChanged(val: any, oldVal: any){
			if(val){
				this.countTimeCopy = this.teamLeftSec
				console.log(this.countTimeCopy)
				this.countDownTime()
				if(this.randomMode!=''&&this.randomMode.state==1){
					this.randomCountTimeCopy = this.randomMode.leftSecond;
					this.randomCountDownTime()
				}
				
			}else{
				this.onClickCloseShoppingCart()
				clearInterval(this.countInterval);
				if(this.randomMode!=''&&this.randomMode.state==1){
					clearInterval(this.randomCountInterval);
				}
			}
			
		}
		created(){//在实例创建完成后被立即调用
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			clearInterval(this.countInterval)
		}
		onClickTeamCancel(){
			this.$emit("teamPaycancel");
		}
		// 剩余球队选择
		onClickTeamCheckRandom(){
			this.$emit("teamCheck",999);
		}
		// 球队选择
		onClickTeamCheck(index:any){
			this.$emit("teamCheck",index);
		}
		// 球队分支选择
		onClickBranchCheck(index:any){
			this.$emit("branchCheck",index);
		}
		// 球队删除
		onClickDelCartIndex(index:any){
			this.$emit("cartDel",index);
		}
		onClickJoinCart(){
			if(this.getCartHaveIndex()){
				return;
			}
			this.$emit('joinCart')
		}
		// 去结算
		onClickSettlement(){
			this.$emit('settlement')
		}
		countDownTime(){
			this.countStr = getCountDownTimeHour(this.countTimeCopy);
			this.countInterval = setInterval(()=>{
				if(this.countTimeCopy>0){
					this.countTimeCopy--;
					this.countStr = getCountDownTimeHour(this.countTimeCopy);
				}else{
					clearInterval(this.countInterval)
				}
			},1000)
		}
		randomCountDownTime(){
			this.randomCountStr = getCountDownTimeHour(this.randomCountTimeCopy);
			this.randomCountInterval = setInterval(()=>{
				if(this.randomCountTimeCopy>0){
					this.randomCountTimeCopy--;
					this.randomCountStr = getCountDownTimeHour(this.randomCountTimeCopy);
				}else{
					this.$emit('randomCountOver')
					clearInterval(this.randomCountInterval)
				}
			},1000)
		}
		getCartHaveIndex(){
			let branchId = this.branchData[this.branchCheckIndex].id;
			for(let i in this.cartData.list){
				if(this.cartData.list[i].noId == branchId){
					return true;
				}
			}
		}
		// 关闭购物车
		onClickCloseShoppingCart(){
			this.showShoppingCart = false
		}
		// 点击购物车
		onClickShowShoppingCart(){
			this.showShoppingCart = !this.showShoppingCart
		}
		// 关闭规则
		onClickCloseRulesPopup(){
			this.showRulesPopup = false
		}
		// 购买剩余随机
		onClickBuyRandomGood(){
			if(this.randomMode.totalNum-(this.randomMode.currentNum+this.randomMode.lockNum)==0){
				return;
			}
			this.showRandomPopup = true
		}
		onClickPopupBtn(){
			this.$emit("buyRandomGood");
			this.onClickCancelPopupBtn()
		}
		onClickCancelPopupBtn(){
			this.showRandomPopup = false
		}
		getPlan(lock:number,now:number,all:number){
			let width = Math.floor((Number(lock)+Number(now))/Number(all)*100);
			return width
		}
	}
</script>

<style lang="scss">
	.operation-content{
		width: 100%;
		height:86%;
		position: fixed;
		left:0;
		bottom:0;
		border-radius: 24rpx 24rpx 0px 0px;
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
		height:468rpx;
		box-sizing: border-box;
		padding:40rpx 0 0 0;
		position: absolute;
		left:0;
		top:0;
		z-index: 22;
		background:#fff;
		border-radius: 24rpx 24rpx 0px 0px;
	}
	.teamtion-header{
		width: 100%;
		height:138rpx;
		display: flex;
		margin-bottom: 30rpx;
		box-sizing: border-box;
		padding:0 32rpx;
		.header-left{
			width: 138rpx;
			height: 138rpx;
			background: #FFFFFF;
			border: 1rpx solid #E2E2E3;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			box-sizing: border-box;
			.header-left-pic{
				width: 120rpx;
				height:120rpx;
			}
		}
		.header-right{
			width: 540rpx;
			height:138rpx;
			box-sizing: border-box;
			padding:0 0 10rpx 22rpx;
			position: relative;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			.header-price{
				width: 100%;
				font-size: 25rpx;
				font-family: 'DIN';
				font-weight: bold;
				color: #FB4E3E;
			}
			.header-price text{
				font-size:40rpx;
			}
			.header-teamname{
				width: 100%;
				font-size: 24rpx;
				font-family: Microsoft YaHei;
				text-indent: -10rpx;
				font-weight: 400;
				color: #34363A;
			}
			.header-teamtip{
				width: 100%;
				font-size: 22rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #AAAAAA;
		
			}
			.header-shopping-btn{
				width: 207rpx;
				height: 60rpx;
				background: #FB4E3E;
				text-align: center;
				line-height: 60rpx;
				border-radius: 30rpx;
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #FFFFFF;
				position: absolute;
				right:0;
				top:0
			}
		}
		
	}
	.teamtion-index{
		width: 100%;
		box-sizing: border-box;
		
	}
	.teamtion-title{
		width: 100%;
		height:40rpx;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #34363A;
		position: relative;
		line-height: 40rpx;
		padding:0 32rpx;
	}
	.teamtion-title-tip{
		font-size: 18rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #AAAAAA;
	}
	.team-check{
		&-content{
			width: 100%;
			height:190rpx;
			box-sizing: border-box;
			&-scroll{
				width: 100%;
				height:190rpx;
				display: flex;
				white-space: nowrap;
				align-items: center;
			}
			.scroll-index{
				width: 120rpx;
				height:158rpx;
				background:#FFF;
				border-radius: 10rpx;
				margin-right:12rpx;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
				box-sizing: border-box;
				padding:10rpx 0;
				border: 1rpx solid #fff;
				margin-top: 31rpx;
				position: relative;
				&-img{
					width: 100rpx;
					height:100rpx;
				}
				&-img-random{
					width: 90rpx;
					height:100rpx;
				}
				&-name{
					width:120rpx;
					font-size: 22rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #34363A;
					text-align: center;
				}
				&-name-random{
					color:#fff;
				}
				.random-team-name{
					color:#AAAABB;
				}
			}
			.scroll-index-check{
				border: 1rpx solid #FB4E3E;
			}
			.scroll-index-check-random{
				border: 1rpx solid #FB4E3E;
				background:#FB4E3E;
				position: relative;
				overflow: initial;
			}
			.scroll-index:nth-child(1){
				margin-left: 32rpx;
			}
		}
	}
	.bianhao-title{
		margin-top: 20rpx;
		background:#fff;
		display: flex;
		align-items: center;
	}
	.random-all{
		margin-left: 28rpx;
		font-size: 20rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #AAAABB;
	}
	.teamtion-center{
		width: 100%;
		height:100%;
		position: relative;
		box-sizing: border-box;
		padding:0 32rpx;
		padding-top:498rpx ;
		padding-bottom: 200rpx;
		overflow-y: auto;
	}
	.branch-list{
		width: 100%;
		margin-top: 30rpx;
		padding-bottom: 2rpx;
		display: flex;
		flex-wrap: wrap;
		overflow-x: hidden;
		padding-top: 10rpx;
	}
	.branch-list-random{
		width: 100%;
		margin-top: 30rpx;
		padding-bottom: 2rpx;
		display: flex;
		flex-wrap: wrap;
		overflow-x: hidden;
		padding-top: 20rpx;
	}
	.branch-index{
		max-width: 95%;
		height: 46rpx;
		background: #FFFFFF;
		border: 1rpx solid #E2E2E3;
		border-radius: 23rpx;
		font-size: 22rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #34363A;
		text-align: center;
		line-height: 46rpx;
		padding: 0 28rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		position:relative;
		margin-right: 20rpx;
		display: flex;
		align-items: center;
	}
	.branch-index-name{
		max-width: 90%;
		height: 46rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		font-size: 22rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #34363A;
		line-height: 46rpx;
	}
	.branch-index-name-random{
		max-width: 100%;
		height: 46rpx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		font-size: 22rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #34363A;
		line-height: 46rpx;
	}
	.branch-sq{
		height: 27rpx;
		background: #F2F2F2;
		border: 1rpx solid #FFFFFF;
		border-radius: 12rpx 2rpx 12rpx 2rpx;
		position: absolute;
		right:-20rpx;
		top:-14rpx;
		box-sizing: border-box;
		padding:0 7rpx;
		text-align: center;
		line-height: 27rpx;
		font-size: 16rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #AAAAAA;
	}
	.branch-reward{
		width: 88rpx;
		height: 27rpx;
		line-height: 27rpx;
		background: #FB4E3E;
		border: 1rpx solid #FFFFFF;
		border-radius: 12rpx 2rpx 12rpx 2rpx;
		font-size: 16rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		position: absolute;
		right:-54rpx;
		top:-14rpx;
		z-index: 1;
	}
	.random-ing{
		width: 67rpx;
		height: 27rpx;
		line-height: 27rpx;
		background: #FFE400;
		border-radius: 12rpx 2rpx 12rpx 2rpx;
		border: 1rpx solid #FFFFFF;
		font-size: 16rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FF3C00;
		position: absolute;
		right:-10rpx;
		top:-14rpx;
		z-index: 33;
		text-align: center;
	}
	.branch-index-check{
		border: 1rpx solid #FB4E3E;
		color:#FB4E3E
	}
	.branch-index-check .branch-index-name{
		color:#FB4E3E
	}
	.teamtion-bottom{
		width: 100%;
		height:120rpx;
		position: absolute;
		bottom:0;
		left:0;
		background:#fff;
		border-top: 1rpx solid #E2E2E3;
		box-sizing: border-box;
		padding:15rpx 18rpx;
		z-index: 24;
	}

	.teamtion-bottom-header{
		width: 100%;
		height:190rpx;
		box-sizing: border-box;
		overflow-y: auto;
		.cart-list{
			width: 100%;
			margin-top: 30rpx;
		}
		.cart-index{
			max-width: 95%;
			height: 46rpx;
			background: #F2F2F2;
			border-radius: 4rpx;
			font-size: 20rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #34363A;
			text-align: center;
			line-height: 46rpx;
			padding: 0 26rpx;
			box-sizing: border-box;
			display: inline-block;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			position: relative;
			display: inline-flex;
			align-items: center;
		}
		.cart-index-name{
			max-width: 90%;
			height: 46rpx;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			font-size: 22rpx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #34363A;
			line-height: 46rpx;
		}
	}
	
	.btncheck-content{
		width: 100%;
		height:88rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		justify-content: space-between;
		.btn-left{
			height:88rpx;
			line-height: 88rpx;
			font-size: 30rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #AAAAAA;
			display: flex;
			align-items: center;
		}
		.btn-left-price{
			color:#34363A;
			margin-left: 10rpx;
		}
		.btn-right{
			width: 368rpx;
			height: 88rpx;
			background:#FB4E3E;
			border-radius: 44rpx;
			text-align: center;
			line-height: 88rpx;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #FFFFFF;
		}
		.btn-right-count{
			width: 368rpx;
			height: 88rpx;
			background: #AAAAAA;
			border-radius: 44rpx;
			text-align: center;
			line-height: 88rpx;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #FB4E3E;
		}
		.btn-right-random{
			width: 100%;
			height: 88rpx;
			background:#FB4E3E;
			border-radius: 44rpx;
			text-align: center;
			line-height: 88rpx;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #FFFFFF;
		}
		.btn-right-random-orther{
			width: 100%;
			height: 88rpx;
			background:#F2F2F2;
			border-radius: 44rpx;
			text-align: center;
			line-height: 88rpx;
			font-size: 28rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #5D5E61;
		}
	}
	.count-text{
		color:#34363A
	}
	.cart-title{
		padding:0	
	}
	.btn-empty{
		background:#AAAAAA !important
	}
	.cart-have{
		background:#AAAAAA !important
	}
	.cart-empty{
		width: 72rpx;
		height:72rpx;
		background:url(../../static/goods/cart.png) no-repeat center;
		background-size: 100% 100%;
		position: relative;
	}
	.cart-noempty{
		width: 72rpx;
		height:72rpx;
		background:url(../../static/goods/cart_.png) no-repeat center;
		background-size: 100% 100%;
		position: relative;
	}

	.shopping-cart{
		position: absolute;
		bottom:0;
		left:0;
		height:100%;
		width: 100%;
		background:#fff;
		z-index: 23;
		box-sizing: border-box;
		padding-bottom: 120rpx;
		transition: all 0.3s linear;
		-webkit-transition: -webkit-transform 0.3s;
		border-radius: 24rpx 24rpx 0px 0px;
		transform: translateY(100%);
	}
	.show-cart{
		transform: translateY(0);
	}
	.checkteam-popup-header{
		width: 100%;
		height:100rpx;
		display: flex;
		position: absolute;
		top:0;
		left:0;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #34363A;
		background:#fff;
		z-index: 1;
		border-radius: 24rpx 24rpx 0px 0px;
	}
	.checkteam-popup-back{
		width: 21rpx;
		height:38rpx;
		background:url(../../static/goods/back_popup.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left:32rpx;
		top:50%;
		margin-top: -19rpx;
	}
	.cart-deleteall{
		height:100rpx;
		display: flex;
		align-items: center;
		position: absolute;
		right:32rpx;
		top:0;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #AAAABB;
	}
	.checkteam-popup-list{
		width: 100%;
		height:100%;
		box-sizing: border-box;
		padding:100rpx 0 20rpx 0;
		overflow-y: auto;
	}
	.checkteam-popup-index{
		width: 100%;
		border-bottom: 1rpx solid #F1EFEF;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding:40rpx 32rpx;
		justify-content: space-between;
	}
	.checkteam-popup-logo-box{
		width: 138rpx;
		height: 138rpx;
		background: #FFFFFF;
		border: 1rpx solid #E2E2E3;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.checkteam-popup-logo{
		width: 128rpx;
		height:128rpx
	}
	.checkteam-popup-detail{
		width: 520rpx;
		box-sizing: border-box;
		position: relative;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		position: relative;
	}
	.icon-yuan{
		width: 30rpx;
		height:30rpx;
		line-height: 30rpx;
		text-align: center;
		background:#EC1F0C;
		border-radius: 40rpx;
		position: absolute;
		right:-15rpx;
		top:-5rpx;
		font-size: 20rpx;
		color:#fff;
		z-index: 10;
		border:1px solid #fff;
		font-weight: bold;
	}
	.icon-yuans{
		padding:0 6rpx
	}
	.checkteam-popup-detail-trunk{
		width: 100%;
		height:50rpx;
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #34363A;
	}
	.checkteam-popup-detail-name{
		width: 100%;
		font-size: 20rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #AAAABB;
		margin-bottom: 10rpx;
	}
	.checkteam-popup-detail-price{
		width: 100%;
		font-size: 25rpx;
		font-family: Adobe Fan Heiti Std;
		font-weight: normal;
		color: #FB4E3E;
	}
	.checkteam-popup-detail-price text{
		font-size: 40rpx;
	}
	.cart-delete{
		width: 47rpx;
		height:47rpx;
		background:url(../../static/goods/cart_del.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		top:0;
		right:0;
	}
	.teamtion-random{
		width: 100%;
		height:65rpx;
		background: #FFF4C7;
		position: absolute;
		top:-65rpx;
		left:0;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;
		padding:0 27rpx
	}
	.teamtion-random-text{
		height:65rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		font-size: 20rpx;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #FFBB04;
	}
	.teamtion-random-help{
		width: 25rpx;
		height:25rpx;
		background: url(../../static/goods/cart_help.png) no-repeat center;
		background-size: 100% 100%;
	}
	.rules-popup{
		position: absolute;
		bottom:0;
		left:0;
		height:100%;
		width: 100%;
		background:#fff;
		z-index: 25;
		box-sizing: border-box;
		transition: all 0.3s linear;
		-webkit-transition: -webkit-transform 0.3s;
		border-radius: 24rpx 24rpx 0px 0px;
		transform: translateY(100%);
	}
	.show-rules{
		transform: translateY(0);
	}
	.rules-center{
		width: 100%;
		height:100%;
		box-sizing: border-box;
		padding:120rpx 40rpx 20rpx 40rpx;
		overflow-y: auto;
	}
	.rules-title{
		width: 100%;
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #34363A;
		margin-bottom: 30rpx;
	}
	.rules-index{
		width: 100%;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: normal;
		color: #34363A;
		margin-bottom: 40rpx;
		line-height: 40rpx;
	}
	.rules-table{
		width: 100%;
		border-collapse: collapse;
	}
	.rules-table tr td{
		height:76rpx;
		line-height: 76rpx;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #34363A;
		text-align: center;
		border:1px solid #D6D6D6
	}
	.header-shoppong-random{
		position: absolute;
		right:0;
		top:10rpx;
		font-size: 16rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #AAAABB;
		width: 150rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
	}
	.goodslist-plan-content{
			width: 150rpx;
			height:12rpx;
			background: #F4F3F1;
			overflow: hidden;
			position: relative;
			border-radius: 6rpx;
		}
	
	.goodslist-plan-desc{
		width: 100%;
		height:20rpx;
		text-align: right;
		line-height: 20rpx;
		font-size: 18rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #AAAABB;;
		margin-bottom:10rpx			
	}
	.goodslist-plan-now{
		height:12rpx;
		background: #FB4E3E;
	}

	.random-showdow{
		width: 100%;
		height:100%;
		position: fixed;
		top:0;
		left:0;
		z-index:999;
		background: rgba(0, 0, 0, 0.5);
	}
	.random-popup{
			width:540rpx;
			height:530rpx;
			position: fixed;
			box-sizing: border-box;
			background:#fff;
			border-radius: 40rpx;
			z-index: 1000;
			left:50%;
			top:50%;
			margin-left: -270rpx;
			margin-top: -300rpx;
			padding-top: 50rpx;
			
	}
	.popup-title{
		width: 100%;
		margin-bottom: 50rpx;
		text-align: center;
		font-size: 34rpx;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #34363A;
	}
	.popup-msg{
		width: 100%;
		box-sizing: border-box;
		padding:0 50rpx;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #34363A;
		line-height: 50rpx;
		text-align: center;
	}
	.popup-btn{
		width: 462rpx;
		height: 60rpx;
		background:#FB4E3E;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		bottom:120rpx;
		left:50%;
		margin-left:-231rpx;
		border-radius: 30rpx;
		font-size: 30rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #FFFFFF;
	}
	.popup-cancel{
		width: 100%;
		height:30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left:0;
		bottom:60rpx;
		color:#AAAAAA;
		font-size: 28rpx;
	}
</style>
