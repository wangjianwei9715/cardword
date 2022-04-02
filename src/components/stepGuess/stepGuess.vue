<template>
	<view class="step-guess">
		<!-- 预测导航 -->
		<view class="no-order" v-if="!order">
			<view class="guess-left">
				活动
				<image class="guess-icon" src="../../pages/act/static/guess/guess_icon.png"></image>
			</view>
			<view class="guess-right" @click="onClickGuessRules">
				<view class="guess-right-text">猜球队</view>
				<view class="guess-right-text">赢免单</view>
				<button class="guess-header-right">&#xe470;</button>
			</view>
		</view>
		<view class="order-guess-box" v-else>
			<view  class="order-guess">
				<view class="guess-left">
					<image class="guess-icon" src="../../pages/act/static/guess/guess_icon.png"></image>
					<image @click="onClickGuessRules" class="guess-help" src="../../pages/act/static/goldCard/help.png"></image>
				</view>
				<view class="guess-right">
					<view class="guess-res">预测{{state!=1?(guessNum>0?'成功'+guessNum+'组':'失败'):''}}（{{guessName}})</view>
				</view>
			</view>
			<view v-if="surplusNum>0" class="order-guess-free">
				<image class="guess-icon-kefu" src="../../pages/act/static/guess/kefu.png"></image>
				您有{{surplusNum}}次免单机会未使用，可联系客服退款
			</view>

			<view v-if="guessSuccess" class="order-guess-successbox" @click="onClickSuccessHide">
				<image class="guess-icon-success" src="../../pages/act/static/guess/success.png"></image>
			</view>
		</view>
		


		<view class="guess-num-box" v-if="freeNum>0">
			<view class="guess-num-center">
				<image class="guess-mini" src="../../pages/act/static/guess/guess_mini.png"></image>
				可免单{{freeNum}}次
			</view>
		</view>

		<view class="drawer-shadow" v-show="showDrawer" @click="onClickCloseDrawer"></view>
		<view class="drawer-content" :class="{'show-drawer':showDrawer}">
			<view class="drawer-content-header">预测卡密规则</view>
			<view class="drawer-content-box">
				<view class="drawer-contnet-desc" v-for="(item,index) in rulesData" :key="index">{{item}}</view>
				<view class="drawer-content-tips">*上述活动说明仅做一般参考，最终解释权归平台所有</view>
			</view>
			<image class="close-pic" @click="onClickCloseDrawer" src="../../static/pay/guanbi@2x.png"></image>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		order:boolean|undefined;
		@Prop({default:false})
		guessSuccess:boolean|undefined;
		@Prop({default:0})
		state:number|undefined;
		@Prop({default:0})
		freeNum:number|undefined;
		@Prop({default:0})
		guessNum:number|undefined;
		@Prop({default:0})
		surplusNum:number|undefined;
		@Prop({default:''})
		guessName:string|undefined;

		showDrawer = false;
		rulesData = [
			'1.购买本商品时可预测卡密所归属的球队，获得卡密后，预测的球队与卡密匹配即可获得免单购买机会',
			'2.单笔订单可预测1支球队，每匹配成功一条卡密均可获得一次免单机会',
			'3.免单机会可在创建订单时使用，免单的订单仍可进行卡密预测',
			'4.卡密中包含多支球队时，预测的球队与卡密中任意一支球队匹配则算预测成功',
			'5.若商品拼团完成，您有免单次数未用完，可联系客服退款 (退款额度=剩余免单次数*商品单价)'
		]
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickGuessRules(){
			this.showDrawer = true
		}
		onClickCloseDrawer(){
			this.showDrawer = false;
		}
		onClickSuccessHide(){
			this.$emit('onClickSuccessHide')
		}
	}
</script>

<style lang="scss">
	.step-guess{
		box-sizing: border-box;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 23rpx;
	}
	.no-order{
		width: 722rpx;
		margin:0 auto;
		height:67rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		background:#fff;
		border-radius: 20rpx;
		padding:0 32rpx;
	}
	.order-guess-box{
		width: 100%;
		background:#fff;
		padding:0 20rpx;
		box-sizing: border-box;
		padding-bottom: 15rpx;
	}
	.order-guess{
		width: 100%;
		height:67rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.order-guess-free{
		display: inline-flex;
		height:28rpx;
		align-items: center;
		background: rgba(228, 78, 78,0.07);
		box-sizing: border-box;
		padding:0 12rpx;
		font-size: 19rpx;
		font-family: FZLanTingHeiS-R-GB;
		font-weight: 400;
		color: rgba(228, 78, 78,0.97);;
	}
	.guess-icon-kefu{
		width: 18rpx;
		height:18rpx;
		margin-right: 6rpx;
	}
	.guess-left{
		height:67rpx;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
	}
	.guess-icon{
		width: 130rpx;
		height:28rpx;
		margin-left: 42rpx;
	}
	.order-guess .guess-icon{
		width: 130rpx;
		height:28rpx;
		margin-left:0;
	}
	.guess-help{
		width: 25rpx;
		height:25rpx;
		margin-left: 13rpx;
	}
	.guess-right{
		height:67rpx;
		display: flex;
		align-items: center;
		font-size: 25rpx;
		font-family: Alibaba PuHuiTi;
		font-weight: normal;
		color: rgba(101, 98, 98, 0.84);
	}
	.guess-res{
		height:67rpx;
		line-height: 67rpx;
		font-size: 27rpx;
		font-family: FZLanTingHeiS-B-GB;
		font-weight: bold;
		color: #333333;
	}
	.guess-right-text{
		height:67rpx;
		line-height: 67rpx;
		font-size: 25rpx;
		font-family: Alibaba PuHuiTi;
		font-weight: normal;
		color: rgba(101, 98, 98, 0.84);
		margin-right: 10rpx;
	}
	.guess-header-right {
		width: 30rpx;
		height: 30rpx;
		background-color: rgba(0, 0, 0, 0);
		font-family: uniicons;
		font-size: 36rpx;
		font-weight: normal;
		font-style: normal;
		line-height: 30rpx;
		color: rgba(181, 180, 180, 1);
		margin: 0;
	}

	.drawer-shadow{
        position: fixed;
		top:0;
		left:0;
		height:100%;
		width: 100%;
		background:rgba(0,0,0,0.6);
        z-index:99998;
    }
    .drawer-content{
		position: fixed;
		bottom:0;
		left:0;
		height:840rpx;
		width: 100%;
		background:#fff;
		z-index: 99999;
		box-sizing: border-box;
		transition: all 0.3s linear;
		-webkit-transition: -webkit-transform 0.3s;
		border-radius: 60rpx 60rpx 0px 0px;
		transform: translateY(100%);
	}
	.show-drawer{
		transform: translateY(0);
	}
	
	.drawer-content-header{
		width: 664rpx;
		height:110rpx;
		margin:0 auto;
		border-bottom: 1rpx solid #ACACAC;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36rpx;
		font-family: FZLanTingHei-M-GBK;
		font-weight: 400;
		color: #333333;
		position: absolute;
		left:50%;
		margin-left: -332rpx;
		top:0;
		z-index: 99;
		
	}
	.drawer-content-box{
		width: 100%;
		height:840rpx;
		box-sizing: border-box;
		overflow: auto;
		padding:110rpx 50rpx 30rpx 50rpx;
	}
	.drawer-contnet-desc{
		width: 100%;
		font-size: 26rpx;
		font-family: FZLanTingHeiS-R-GB;
		font-weight: 400;
		color: #525151;
		line-height: 40rpx;
		margin-top: 40rpx;
	}
	.drawer-content-tips{
		font-size: 24rpx;
		font-family: FZLanTingHeiS-R-GB;
		font-weight: 400;
		color: #CF3737;
		line-height: 40rpx;
		margin-top: 60rpx;
	}
	.close-pic{
		width: 32rpx;
		height:32rpx;
		position: absolute;
		top:35rpx;
		right:75rpx;
		z-index: 100;
	}
	.guess-num-box{
		width: 205rpx;
		height:53rpx;
		background:url(../../pages/act/static/guess/guess_tips.png) no-repeat center;
		background-size: 100% 100%;
		position: fixed;
		bottom:calc(112rpx + env(safe-area-inset-bottom));
		right:25rpx;
		z-index: 9;
	}
	.guess-mini{
		width: 45rpx;
		height:18rpx;
		margin-right: 10rpx;
	}
	.guess-num-center{
		width: 100%;
		height:42rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding-left: 12rpx;
		font-size: 20rpx;
		font-family: FZLanTingHeiS-R-GB;
		font-weight: 400;
		color: #FFFFFF;
	}
	.order-guess-successbox{
		width: 100%;
		height:100%;
		background:rgba(0,0,0,0.79);
		position: fixed;
		left:0;
		top:0;
		z-index: 99999;
	}
	.guess-icon-success{
		width: 750rpx;
		height:709rpx;
		position: fixed;
		left:0;
		top:50%;
		margin-top: -360rpx;
	}
</style>
