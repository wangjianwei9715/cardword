<template>
	<view>
		<!-- 转盘弹窗 -->
		<view class="payment" v-show="showLotteryPopup">
			<view class="payment-showdow"></view>
			<view class="payment-popup-t">
				<view class="popup-title-t">{{popupTitle}}</view>
				<view class="popup-msg" v-show="popupTitle!='抽奖成功'">兑换后无法取消，可在"奖品明细"中查看兑换记录。<text >（兑换实物将使用您的默认地址发货，请提前确认）</text></view>
				<view class="popup-msg" v-show="popupTitle=='抽奖成功'">恭喜获得<text >{{luckyDrawName}}</text>，奖品请在“卡豆专区-奖品明细”中查看</view>
				<view class="popup-pic-content">
					<image class="popup-pic" :src="decodeURIComponent(popupPic)"/>
				</view>
				<button class="popup-btn" @click="onClickPopupBtn">
					{{popupTitle=='抽奖成功'?'我知道了':'确认兑换（'+exchangePrice+'卡豆）'}}
				</button>
				<view class="popup-close" @click="onClickCancelLottery"></view>
			</view>
		</view>

		<!-- 签到弹窗 -->
		<view class="payment" v-show="showSignPopup">
			<view class="payment-showdow"></view>
			<view class="payment-popup">
				<view class="popup-title">签到成功</view>
				<view class="popup-msg"> 签到成功，获得<text>{{signReward}}{{distanceDay>0?'卡豆':'元无门槛券'}}</text></view>
				<view class="popup-tips" v-show="distanceDay>0">再签{{distanceDay}}天可得{{couponReward}}元无门槛券</view>
				<button class="popup-btn" @click="onClickSignBtn">
					我知道了
				</button>
				<view class="popup-close" @click="onClickCancelLottery"></view>
			</view>
		</view>
	</view>
	
</template>

<script lang="ts">
	import { Component, Prop } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		showLotteryPopup!:boolean;
		@Prop({default:'提示'})
		popupTitle!:string;
		@Prop({default:''})
		luckdrawReward!:string;
		@Prop({default:0})
		exchangePrice!:number
		@Prop({default:''})
		popupPic!:string;
		@Prop({default:''})
		luckyDrawName!:string;
		
		// 签到内容
		@Prop({default:false})
		showSignPopup!:boolean;
		@Prop({default:0})
		signReward!:number;
		@Prop({default:0})
		distanceDay!:number;
		@Prop({default:0})
		couponReward!:number;

		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickCancelLottery(){
			this.$emit("cancelLotteryPopup");
		}
		onClickSignBtn(){
			this.$emit("cancelLotteryPopup");
		}
		onClickPopupBtn(){
			this.$emit("popupBtn");
		}
		
	}
</script>

<style lang="scss">
	.payment{
		width: 100%;
		box-sizing: border-box;
		&-showdow{
			width: 100%;
			height:100%;
			position: fixed;
			top:0;
			left:0;
			z-index:999;
			background: rgba(0, 0, 0, 0.5);
		}
		&-popup{
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
		&-popup-t{
			width:540rpx;
			height:660rpx;
			position: fixed;
			box-sizing: border-box;
			background:#fff;
			border-radius: 40rpx;
			z-index: 1000;
			left:50%;
			top:50%;
			margin-left: -270rpx;
			margin-top: -350rpx;
			padding-top: 50rpx;
		}
		.popup-close{
			width: 52rpx;
			height:52rpx;
			position: absolute;
			right:0;
			top:-94rpx;
			background:url(../../pages/act/static/invite/close.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
	.popup-title{
		width: 100%;
		margin-bottom: 80rpx;
		text-align: center;
		font-size: 34rpx;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #34363A;
	}
	.popup-title-t{
		width: 100%;
		margin-bottom: 40rpx;
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
		line-height: 40rpx;
		text-align: center;
	}
	.popup-msg text{
		font-size: 28rpx;
		color:#FB4E3E
	}
	.popup-btn{
		width: 462rpx;
		height: 66rpx;
		background:#FB4E3E;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		bottom:63rpx;
		left:50%;
		margin-left:-231rpx;
		border-radius: 40rpx;
		font-size: 30rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #FFFFFF;
	}
	.popup-btn-success{
		background: #16D585;
	}
	.popup-wechat{
		width: 46rpx;
		height:37rpx;
		background:url(../../pages/act/static/invite/wechat.png) no-repeat center;
		background-size: 100% 100%;
		margin-right: 10rpx;
	}

	.rules-popup{
		width:680rpx;
		height:885rpx;
		position: fixed;
		box-sizing: border-box;
		background:#fff;
		border-radius: 40rpx;
		z-index: 1000;
		left:50%;
		top:50%;
		margin-left: -340rpx;
		margin-top: -450rpx;
		padding-top: 50rpx;
		.popup-title{
			width: 100%;
			margin-bottom: 40rpx;
			text-align: center;
			font-size: 34rpx;
			font-family: Microsoft YaHei;
			font-weight: bold;
			color: #34363A;
		}
		.popup-close{
			width: 52rpx;
			height:52rpx;
			position: absolute;
			right:0;
			top:-94rpx;
			background:url(../../pages/act/static/invite/close.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
	.popup-rules{
		width: 100%;
		box-sizing: border-box;
		padding:0 50rpx;
		margin-bottom: 40rpx;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #34363A;
		line-height: 40rpx;
	}
	.popup-tips{
		width: 100%;
		text-align: center;
		font-size: 28rpx;
		color:#FB4E3E;
		margin-top: 120rpx;
	}
	.popup-pic-content{
		width: 200rpx;
		height:200rpx;
		margin:0 auto;
		margin-top: 20rpx;
	}
	.popup-pic{
		width: 200rpx;
		height:200rpx;
	}
</style>
