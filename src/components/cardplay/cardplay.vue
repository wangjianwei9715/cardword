<template>
	<view >
		<view class="operation-shadow" v-show="operationShow" @click="onClickOperaCancel"></view>
		<view class="operation-content" :class="operationShow&&operaType==1?'operation-show':''">
			<view class="operation-index" v-for="item in operaData" :key="item.id">
				<view class="operation-index-title">{{item.title}}</view>
				<view class="operation-index-desc">{{item.desc}}</view>
			</view>
		</view>

		<view class="operation-content2" :class="operationShow&&operaType==2?'operation-show':''">
			<view class="operation-index" v-for="item in typeData" :key="item.id">
				<view class="operation-index-title">{{item.title}}</view>
				<view class="operation-index-desc">{{item.desc}}</view>
			</view>
		</view>

		<view class="operation-content3" :class="operationShow&&operaType==3?'operation-show':''">
			<view class="operation-index3-title">购买须知</view>
			<view class="operation-index3" v-for="(item,index) in explain" :key="index">
				<view class="operation-index3-desc">{{item}}</view>
			</view>
		</view>
	</view>
	
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({ default: false })
		operationShow:boolean|undefined;
		@Prop({ default: 0 })
		operaType:number|undefined;

		operaData = [
			{
				id:1,
				title:'随机卡种',
				desc:'系统为玩家推送该商品中可能出现的随机球员的任意卡种和限编（没有限编默认为base卡）。开卡结束后，玩家获得对应球员、卡种、限编的所有球星卡。'
			},
			{
				id:2,
				title:'随机球员',
				desc:'系统为玩家推送该商品中可能出现的随机球员。开卡结束后，玩家获得对应球员的所有球星卡。'
			},
			{
				id:3,
				title:'随机球队',
				desc:'系统为玩家推送该商品中可能出现的随机球员。开卡结束后，玩家获得对应球队的所有球星卡。'
			},
			{
				id:4,
				title:'随机卡包',
				desc:'系统为玩家推送随机编号。开卡时，会对原盒中的卡包进行编号，玩家获得对应编号卡包中的所有球星卡。'
			},{
				id:5,
				title:'随机卡盒',
				desc:'系统为玩家推送随机编号。开卡时，会对原箱中的卡盒进行编号，玩家获得对应编号卡盒中的所有球星卡。'
			},
			{
				id:6,
				title:'自选球队',
				desc:'玩家可在选择编号页面自由选购球队及编号。开卡结束后，玩家获得对应编号的所有球星卡'
			}
			,
			{
				id:7,
				title:'选队随机(卡种)',
				desc:'在随机卡种玩法的基础上，玩家可选择心仪的球队进行随机，必定获得所选球队中的卡密'
			}
		]
		typeData = [
			{
				id:5,
				title:'即买即随',
				desc:'购买成功后，即可获得随机结果'
			},
			{
				id:6,
				title:'拼满随机',
				desc:'拼组成功后，获得随机结果'
			},
		]
		explain = [
			'1、请确认您购买的产品信息，并在正确填写您的收货地址信息后进行订单支付;',
			'2、订单提交前，若您有信息需要修改，请在订单确认页面直接修改，订单提交后，订单信息将无法修改',
			'3、提请注意:除卡具等周边产品外， 卡世界平台拼团拆卡所售相关产品，因其产品属性及价值的特殊性，不适用“七天无理由退换“之规定，均不支持无理由退换货;',
			'4、提请注意:如果您是末满18周岁的未成年人，请在监护人的陪同、指导下购买本产品。已满18周岁的成年人，因任何原因不具备完全民事行为能力的，参照适用本协议之未成年人使用条款之相关约定购买本产品。我们可能会依照平台用户协议，在您支付之前要求您上传一些相关信息，我们会对您的信息保密，请您理解并支持',
			'5、上述信息确认后，您可以点击“继续支付”进入支付环节，订单支付完成后页面会显示您的订单号。提交订单表示您已经阅读并接受了商城的“使用条款”、“隐私政策”及“退換货政策”',
			'6、由于在线销售存在库存更新网络延时的情况，可能会导致您完成订单支付后订单商品缺货的情况。如遇该类情，售后人员会及时通知您，为您进行退款。给您造成的不便，还请谅解',
			'7、认购满员后，商家将在小程序直播公示拆卡过程，并在直播结束后上传拆卡结果，完成后续发货工作。中卡的用户，获得实体卡',
			'8、商户发货后，如用户未在以下时限内手动确认收货，系统会自动确认收货。①物流发货地址在中国大陆地区:14天;②物流发货地址非中国大陆地区:30天。'
		]
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		operationStart(id:any){
			this.$emit("operaclick",id);
		}
		onClickOperaCancel(){
			this.$emit("operacancel");
		}
	}
</script>

<style lang="scss">
	.operation-content{
		width: 100%;
		height:1250rpx;
		position: fixed;
		left:0;
		bottom:0;
		border-radius: 24rpx 24rpx 0px 0px;
		box-sizing: border-box;
		transition: all 0.3s linear;
		-webkit-transition: -webkit-transform 0.3s;
		transform: translateY(1250rpx);
		z-index:99;
		background:#fff;
		padding:40rpx 32rpx;
	}
	.operation-content2{
		width: 100%;
		height:320rpx;
		position: fixed;
		left:0;
		bottom:0;
		border-radius: 24rpx 24rpx 0px 0px;
		box-sizing: border-box;
		transition: all 0.3s linear;
		-webkit-transition: -webkit-transform 0.3s;
		transform: translateY(320rpx);
		z-index:99;
		background:#fff;
		padding:40rpx 32rpx;
	}
	.operation-content3{
		width: 100%;
		height:1100rpx;
		position: fixed;
		left:0;
		bottom:0;
		border-radius: 24rpx 24rpx 0px 0px;
		box-sizing: border-box;
		transition: all 0.3s linear;
		-webkit-transition: -webkit-transform 0.3s;
		transform: translateY(1100rpx);
		z-index:99;
		background:#fff;
		padding:40rpx 32rpx;
	}
	.operation-index{
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 40rpx;
		&-title{
			width:100%;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #14151A;
			margin-bottom: 20rpx;
		}
		&-desc{
			width: 100%;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #7D8288;
			line-height: 36rpx;
		}
	}
	.operation-index3{
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		&-title{
			width:100%;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #14151A;
			margin-bottom: 20rpx;
		}
		&-desc{
			width: 100%;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #7D8288;
			line-height: 36rpx;
		}
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
</style>
