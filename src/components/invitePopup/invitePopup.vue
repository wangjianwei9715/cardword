<template>
	<view class="payment" v-show="showInvitePopup">
		<view class="payment-showdow"></view>
		<view class="payment-popup" v-if="!rules">
			<view class="popup-title">{{getTitle(inviteResult)}}</view>
			<view class="popup-msg">{{getMsg(inviteResult)}}</view>
			<view class="popup-btn" :class="{'popup-btn-success':inviteResult==0||inviteResult==668}" @click="onClickPopupBtn(inviteResult)">
				<view class="popup-wechat" v-show="inviteResult==668"></view>
				{{inviteResult==668?'去微信粘贴':'确定'}}
			</view>
			<view class="popup-close" @click="onClickCancelInvite"></view>
		</view>
		
		<view class="rules-popup" v-if="rules">
			<view class="popup-title">活动规则</view>
			<view class="popup-rules" v-for="(item,index) in rulesData" :key="index">{{item}}</view>
			<view class="popup-close" @click="onClickCancelInvite"></view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		showInvitePopup!:boolean;
		@Prop({default:0})
		inviteResult!:number;
		@Prop({default:''})
		inviteResultStr!:string;
		@Prop({default:false})
		rules!:boolean;

		rulesData = [
			'1.活动期间，玩家邀请未注册过的新人下载注册，并复制“我的口令”至卡世界app，即可在活动商品中免费上组',
			'2.1月14日0点起注册的用户为新用户，每个新用户仅可被邀请1次，本活动仅对邀请新用户有效。',
			'3.每个商品最多邀请十人（即最多可购得10份）',
			'4.每个活动商品的口令不同，仅对对应商品生效',
			'5.若活动商品已售罄，用户仍复制该商品的口令并完成邀新流程，则视为邀请失败',
			'6.若被邀请人为非新人或已被邀请过一次则视为邀请失败'
		]
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		getTitle(res:any){
			if(res==0){
				return '邀请成功';
			}else if(res==668){
				return '已复制邀请码'
			}else{
				return '邀请失败'
			}
		}
		getMsg(res:any){
			switch(res){
				case 668:
					return '邀请新人下载注册并复制口令至app就能帮您免费上组啦~';
				case 0:
					return '恭喜，您为好友完成一次免费上组您也来试试吧~';
				case 1:
					return '抱歉，您不是新用户哦，无法完成邀请~';
				case 2:
					return '抱歉，被邀请次数已用完~';
				case 3:
					return '抱歉，该口令邀请次数已达上限~';
				case 4:
					return '无效口令';
				case 11:
					return '口令已失效或者相当商品已售罄';
				default:
					return this.inviteResultStr
			}
		}
		onClickCancelInvite(){
			this.$emit("cancelInvitePopup");
		}
		onClickPopupBtn(type:any){
			this.$emit("popupBtn",type);
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
</style>
