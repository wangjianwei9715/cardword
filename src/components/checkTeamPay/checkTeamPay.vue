<template>
	<view>
		<view class="operation-shadow" v-show="teamCheckShow" @click="onClickTeamCancel"></view>
		<view class="operation-content" :class="teamCheckShow?'operation-show':''">
			<view class="teamtion-top" v-if="teamData!=''">
				<view class="teamtion-header">
					<view class="header-left">
						<image class="header-left-pic" :src="teamData[teamCheckIndex].logo?decodeURIComponent(teamData[teamCheckIndex].logo):''" mode="aspectFit"/>
					</view>
					<view class="header-right" v-if="branchData!=''">
						<view class="header-price">¥<text>{{branchData[branchCheckIndex].price}}</text></view>
						<view class="header-teamname">“{{teamData[teamCheckIndex].name}}”</view>
						<view class="header-teamtip">{{branchData[branchCheckIndex].name}}</view>
						<button  class="header-shopping-btn" :class="{'cart-have':getCartHaveIndex()}" @click="onClickJoinCart">{{getCartHaveIndex()?'已在购物车':'加入购物车'}}</button>
					</view>
				</view>
				<view class="teamtion-index">
					<view class="teamtion-title">选择球队</view>
					<view class="team-check-content">
						<scroll-view class="team-check-content-scroll" :scroll-x="true">
							<view :class="{'scroll-index':true,'scroll-index-check':teamCheckIndex==index}" v-for="(item,index) in teamData" :key="item.id" @click="onClickTeamCheck(index)">
								<image class="scroll-index-img" :src="item.logo?decodeURIComponent(item.logo):''" mode="aspectFit"></image>
								<view class="scroll-index-name">{{item.name}}</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="teamtion-title bianhao-title">选择编号</view>
			</view>
			<view class="teamtion-center" v-if="branchData!=''">
				<view class="teamtion-index">
					<view class="branch-list">
						<view :class="{'branch-index':true,'branch-index-check':branchCheckIndex==index}" v-for="(item,index) in branchData" :key="item.id" @click="onClickBranchCheck(index)">
							<view class="branch-index-name">{{item.name}} </view>￥{{item.price}}
							<view class="branch-sq" v-if="item.soldOut||item.lock">{{item.soldOut?'售罄':'未支付'}}</view>
						</view>
					</view>
				</view>
			</view>

			<view class="teamtion-bottom">
				<view class="teamtion-index">
					<view class="teamtion-title cart-title" >
						购物车<text class="teamtion-title-tip">（共{{cartData.num}}件{{cartData.available==cartData.num?'':'，失效'+(cartData.num-cartData.available)+'件'}}）</text>
						<view v-show="cartData.num>=1" class="acrt-delete" @click="onClickDelCartIndex('[]')">清空</view>
					</view>
					<view class="teamtion-bottom-header">
						
						<view class="cart-list" v-if="cartData.list&&cartData.list!=''">
							<view :class="{'cart-index':true}" v-for="(item,index) in cartData.list" :key="item.id" >
								<view class="cart-index-name">{{item.name}} </view>￥{{item.price}}
								<view class="branch-sq" v-if="item.soldOut||item.lock">{{item.soldOut?'售罄':'未支付'}}</view>
								<view class="cart-delete" @click="onClickDelCartIndex(index)"></view>
							</view>
						</view>
						<view v-else class="cart-empty">请先将编号加入购物车后购买</view>
					</view>
					
					<view class="bottom-btn">
						<view class="btncheck-content">
							<view class="btn-left">合计<text class="btn-left-price">￥{{cartData.amount}}</text></view>
							<view v-if="countTimeCopy>0" class="btn-right-count" ><text class="count-text">开售倒计时</text> {{countTimeCopy==0?'':' '+countStr}}</view>
							<view v-else class="btn-right" :class="{'btn-empty':cartData.available==0}" @click="onClickSettlement">去结算</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {getCountDownTime} from '@/tools/util';
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
		
		countStr = '';
		countInterval:any;
		countTimeCopy = 0
		@Watch('teamCheckShow')
		onShowChanged(val: any, oldVal: any){
			if(val){
				this.countTimeCopy = this.teamLeftSec
				console.log(this.countTimeCopy)
				this.countDownTime()
			}else{
				clearInterval(this.countInterval);
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
			this.countStr = getCountDownTime(this.countTimeCopy);
			this.countInterval = setInterval(()=>{
				if(this.countTimeCopy>0){
					this.countTimeCopy--;
					this.countStr = getCountDownTime(this.countTimeCopy);
				}else{
					clearInterval(this.countInterval)
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
			height:160rpx;
			overflow: hidden;
			margin-top: 30rpx;
			&-scroll{
				width: 100%;
				height:160rpx;
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
				overflow: hidden;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
				box-sizing: border-box;
				padding:10rpx 0;
				border: 1rpx solid #fff;
				margin-top: 1rpx;
				
				&-img{
					width: 100rpx;
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
			}
			.scroll-index-check{
				border: 1rpx solid #FB4E3E;
			}
			.scroll-index:nth-child(1){
				margin-left: 32rpx;
			}
		}
	}
	.bianhao-title{
		margin-top: 20rpx;
		background:#fff
	}
	.teamtion-center{
		width: 100%;
		height:100%;
		position: relative;
		box-sizing: border-box;
		padding:0 32rpx;
		padding-top:498rpx ;
		padding-bottom: 400rpx;
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
	.branch-index-check{
		border: 1rpx solid #FB4E3E;
		color:#FB4E3E
	}
	.branch-index-check .branch-index-name{
		color:#FB4E3E
	}
	.teamtion-bottom{
		width: 100%;
		height:400rpx;
		position: absolute;
		bottom:0;
		left:0;
		background:#fff;
		border-top: 1rpx solid #E2E2E3;
		box-sizing: border-box;
		padding:30rpx 28rpx;
	}
	.acrt-delete{
		position: absolute;
		right:0;
		top:0;
		height:40rpx;
		line-height: 40rpx;
		font-size: 20rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #AAAAAA;
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
	.cart-delete{
		width: 28rpx;
		height:28rpx;
		background:url(../../static/goods/close.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		top:-14rpx;
		left:0;
	}
	.bottom-btn{
		height:118rpx;
		width: 100%;
		position: absolute;
		bottom:0;
		left:0;
		padding:0 28rpx;
		padding-bottom: 30rpx;
		box-sizing: border-box;
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
				font-size: 28rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				color: #AAAAAA;
			}
			.btn-left-price{
				color:#FB4E3E
			}
			.btn-right{
				width: 500rpx;
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
				width: 500rpx;
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
		}
	}
	.count-text{
		color:#34363A
	}
	.cart-title{
		padding:0	
	}
	.cart-empty{
		width: 100%;
		height:190rpx;
		line-height: 190rpx;
		color:#ACAEB7;
		font-size: 24rpx;
		text-align: center;
	}
	.btn-empty{
		background:#AAAAAA !important
	}
	.cart-have{
		background:#AAAAAA !important
	}
</style>
