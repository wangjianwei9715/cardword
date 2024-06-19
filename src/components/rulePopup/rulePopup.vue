<template>
	<view class="payment" v-show="showRulePopup">
		<view class="payment-showdow"></view>
		
		<view class="rules-popup2" v-if="newYear==true">
			<view class="popup-title">活动规则</view>
			<view class="popup-rules" v-for="(item,index) in rulesDataNweYear" :key="index">{{item}}</view>
			<view class="popup-close" @click="onClickCancelRule"></view>
		</view>
		<view class="rules-popup3" v-else-if="decompose==true">
			<view class="popup-title">规则说明</view>
			<view class="popup-rules" v-for="(item,index) in rulesDecomposeData" :key="index">{{item}}</view>
			<view class="popup-close" @click="onClickCancelRule"></view>
		</view>
		<view class="rules-popup4" v-else-if="giving==true">
			<view class="popup-title">规则说明</view>
			<view class="popup-rules" v-for="(item,index) in rulesGivingData" :key="index">{{item}}</view>
			<view class="popup-close" @click="onClickCancelRule"></view>
		</view>
		<view class="rules-popup" v-else>
			<view class="popup-title">活动规则</view>
			<view class="popup-rules" v-for="(item,index) in rulesData" :key="index">{{item}}</view>
			<view class="popup-close" @click="onClickCancelRule"></view>
		</view>
		
	</view>
</template>

<script lang="ts">
	import { Component, Prop } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		showRulePopup!:boolean;
		@Prop({default:false})
		newYear!:boolean;
		@Prop({default:false})
		decompose!:boolean;
		@Prop({default:false})
		giving!:boolean;
		
		rulesData = [
			'1、获取卡币：玩家可通过参与拼团（1元=1积分）、签到、不定期活动等方式获取卡币',
			'2、签到说明：1~2天每日获得3积分；3~6天每日获得5积分；7~14天每日获得10积分；第15天获得3元卡享券*1。连续签到满15天后，在第16天时重置签到天数。若签到断档，则签到天数重置。',
			'3、卡币兑换：玩家可消耗相应卡币兑换心仪的奖品，兑换道具前需填写并确认默认邮寄地址，若兑换实物，平台将在3个工作日内联系到您，核实邮寄地址后寄出（包邮），兑换后可在奖品明细中查看详情。兑换成功后无法取消。奖品将不定期更新。',
			'4、卡币抽奖：每位玩家首次抽奖半价，每日可抽5次，1000卡币/次，抽奖概率以公示概率为准。抽奖前需填写并确认默认邮寄地址，若兑换实物，平台将在3个工作日内联系到您，核实邮寄地址后寄出（包邮），兑换后可在奖品明细中查看详情。',
			'5、若玩家采取不正当作弊手段获得卡币参与活动，一经发现，平台有权对该玩家进行封号处理，并追回所获得奖励。',
		]
		rulesDecomposeData = [
			'1.卡片分解功能当前为测试版，可能会进行改动',
			'2.卡片分解仅支持部分商品，用户中卡后可分解卡片获得奖励（商家发货后无法再分解）',
			'3.进行分解时，必须一次性分解该商品下所有订单的中卡卡片，此功能适用于当前商品中卡较少且价值较低时使用，在中卡数量较多或卡片价值较大的情况下不建议分解，请您慎重考虑',
			'4.分解后无法找回',
		]
		rulesDataNweYear = [
			'1.活动期间，卡世界新春压岁盒以拼团形式售卖，拼满即拆。新春压岁盒由卡世界平台发行，商家代拆。',
			'2.新春压岁盒每盒必得1~3张球星卡（具体卡片请查看奖品列表），有概率获得100元-600元平台无门槛券，无门槛券请联系客服领取。',
			'3.福盒共200份，每人限购1盒，每盒额外附赠50元满减券，请联系客服领取'
		]
		rulesGivingData = [
			'1、商品状态处于”拼团中“的卡密可赠予好友，拼团成功或拼团失败后不再支持卡密赠送',
			'2、打开相应订单页面，点击”赠送“按钮，选择对应卡密即可赠送，每条卡密可赠送2次',
			'3、赠送成功后，卡密会进行转移。赠送者的订单不再显示该卡密，被赠送者将会生成一条新的订单，显示收到的卡密，后续订单流程和正常拼团一致',
			'4、赠送后，卡密与后续的中卡归属均属于被赠送者',
			'5、在赠送页面，可生成卡密验证码，好友复制验证码打开”卡世界app“可查询卡密当前的真实归属用户',
			'6、卡密赠送功能仅用于好友之间相互赠送，不支持其他用途。在赠送时请您仔细核对对方信息，赠送后将无法撤回'
		]


		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickCancelRule(){
			this.$emit("cancelRulePopup");
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
		
		
	}
	.popup-title{
		width: 100%;
		margin-bottom: 80rpx;
		text-align: center;
		font-size: 34rpx;
		
		font-weight: bold;
		color: #34363A;
	}
	.popup-msg{
		width: 100%;
		box-sizing: border-box;
		padding:0 50rpx;
		font-size: 28rpx;
		
		
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
		bottom:63rpx;
		left:50%;
		margin-left:-231rpx;
		border-radius: 30rpx;
		font-size: 30rpx;
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
		height:1005rpx;
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
	}
	.rules-popup2{
		width:680rpx;
		height:485rpx;
		position: fixed;
		box-sizing: border-box;
		background:#fff;
		border-radius: 40rpx;
		z-index: 1000;
		left:50%;
		top:50%;
		margin-left: -340rpx;
		margin-top: -200rpx;
		padding-top: 50rpx;
	}
	.rules-popup3{
		width:680rpx;
		height:550rpx;
		position: fixed;
		box-sizing: border-box;
		background:#fff;
		border-radius: 40rpx;
		z-index: 1000;
		left:50%;
		top:50%;
		margin-left: -340rpx;
		margin-top: -230rpx;
		padding-top: 50rpx;
	}
	.rules-popup4{
		width:680rpx;
		height:820rpx;
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
	}
	.popup-title{
		width: 100%;
		margin-bottom: 40rpx;
		text-align: center;
		font-size: 34rpx;
		
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
	
	.popup-rules{
		width: 100%;
		box-sizing: border-box;
		padding:0 50rpx;
		margin-bottom:20rpx;
		font-size: 26rpx;
		
		
		color: #34363A;
		line-height: 40rpx;
	}
</style>
