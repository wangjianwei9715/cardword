<template>
	<view class="content">
		<view class="header">
			<statusbar style="background:#fff" />
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
				<view class="header-title">确认赠送</view>
				<view class="icon-help" @click="onClickShowRule"></view>
			</view>
		</view>
		
		<view class="box-content">
			<statusbar/>

			<view class="box-index">
				<view class="box-index-code">订单编号:{{orderData.goodOrderCode}}</view>
				<view class="box-index-name">{{orderData.name}}</view>
				<view class="box-index-id">请输入收方ID</view>
				<xskCodeInput 
					:value.sync="userId" 
					:length="9"
					@confirm="inputConfirm">
				</xskCodeInput>
				<view class="box-index-info">
					<image class="box-index-avatar" :src="userData.avatar"/> {{userData.userName}}
				</view>
			</view>
		</view>

		<view class="box-tips">
			<view class="box-currentno" :class="{'box-current':tipsCurrent}" @click="tipsCurrent = !tipsCurrent"></view>
			<view class="box-help">{{explain}}</view>
		</view>
		<view class="box-bottom">
			<view  class="box-bottom-btn" :class="{'nouser-btn':!this.userGet}" @click="onClickConfirmGiving">立即赠送</view>
		</view>

		<!-- 规则弹窗 -->
		<rulePopup :showRulePopup="showRulePopup" :giving="true" @cancelRulePopup="onClickCancelRulePopup"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Md5 } from "ts-md5";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		showRulePopup = false;
		userId = '';
		orderData:any = {};
		tipsCurrent = true;
		userData:any = {
			avatar:'',
			userName:''
		};
		userGet = false;
		explain = '赠送须知：平台提供卡密赠送功能，仅用于好友之间相互赠送，不得作为其他用途。在赠送时请您仔细核对对方信息，赠送后将无法撤回！请悉知'
		onLoad(query:any) {
			this.orderData = JSON.parse(query.data);
		}
		onClickShowRule(){
			this.showRulePopup = true;
		}
		onClickCancelRulePopup(){
			this.showRulePopup = false;
		}
		onClickJumpUrl(url:string){
			uni.navigateTo({
				url:url
			})
		}
		onClickBack(){
			uni.navigateBack({
				delta: 1
			});
		}
		onClickConfirmGiving(){
			if(!this.tipsCurrent || !this.userGet) return;

			uni.showModal({
				title: '提示',
				content: '是否确认赠送此卡密',
				success: (res)=> {
					if (res.confirm) {
						let ts = Math.floor(new Date().getTime()/1000);
						let params = {
							goodOrderCode:this.orderData.goodOrderCode,
							noId:Number(this.orderData.noId),
							ts:ts,
							userId:Number(this.userId),
							sign:Md5.hashStr('applyTransfer_'+ts+'_'+this.orderData.goodOrderCode+'_'+this.orderData.noId+'_'+this.userId)
						}
						app.http.Post('function/userNo/transfer/apply',params,(res:any)=>{
							uni.showToast({
								title:'赠送成功',
								icon:'none'
							})
							uni.switchTab({
								url: '/pages/index/userinfo'
							});
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		}
		inputConfirm(val:any){
			console.log('val===',val)
			let ts = Math.floor(new Date().getTime()/1000);
			let params = {
				goodOrderCode:this.orderData.goodOrderCode,
				noId:Number(this.orderData.noId),
				ts:ts,
				userId:Number(val),
				sign:Md5.hashStr('queryUser_'+ts+'_'+this.orderData.goodOrderCode+'_'+this.orderData.noId+'_'+val)
			}
			app.http.Post('function/userNo/transfer/queryUser',params,(res:any)=>{
				this.userGet = true;
				this.userData.userName = res.userName;
				this.userData.avatar = decodeURIComponent(res.avatar);
				console.log(this.userData.avatar)
			})
		}
		
		
		
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#F6F7F8;
	}
	.tab-header{
		width: 100%;
		height:88rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 30rpx;
		position: relative;
		z-index: 10;
		align-items: center;
		justify-content: center;
		background:#fff;
	}
	.icon-back{
		width: 80rpx;
		height:88rpx;
		background:url(../../../static/goods/back@2x.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left:0;
		top:0;
	}
	.header-title{
		height:88rpx;
		line-height: 88rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
	}
	.icon-search{
		width: 40rpx;
		height:40rpx;
		position: absolute;
		right:92rpx;
		top:50%;
		margin-top: -20rpx;
		background:url(../../../static/userinfo/v2/icon_search.png) no-repeat center;
		background-size: 100% 100%;
	}
	.icon-help{
		width: 40rpx;
		height:40rpx;
		position: absolute;
		right:32rpx;
		top:50%;
		margin-top: -20rpx;
		background:url(../../../static/userinfo/v2/help.png) no-repeat center;
		background-size: 100% 100%;
	}
	.content{
		width: 100%;
		box-sizing:border-box;
	}
	.header{
	    width: 100%;
	    position: fixed;
	    left:0;
	    top:0;
	    z-index: 99;
	}
	.header-tab{
		width: 100%;
	    background:#fff;
		height:90rpx;
		margin-top: -10rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #F1F1F4;
	    padding:0 100rpx;
	}
	.box-content{
        width: 100%;
        position: relative;
        z-index:10;
        box-sizing: border-box;
        padding:100rpx 20rpx calc(114rpx) 20rpx;
		padding:100rpx 20rpx calc(114rpx + constant(safe-area-inset-bottom)) 20rpx;
		padding:100rpx 20rpx calc(114rpx + env(safe-area-inset-bottom)) 20rpx;
    }
	.box-index{
		width: 100%;
		background: #FFFFFF;
		border-radius: 10px;
		box-sizing: border-box;
		padding:30rpx 28rpx;
	}
	.box-index-code{
		width: 100%;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		margin-bottom: 25rpx;
	}
	.box-index-name{
		width: 100%;
		box-sizing: border-box;
		background: #F6F7FB;
		border-radius: 5rpx;
		padding:25rpx;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
		line-height: 40rpx;
		margin-bottom: 140rpx;
	}
	.box-index-id{
		width: 100%;
		text-align: center;
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #333333;
		margin-bottom: 40rpx;
	}
	.box-index-info{
		width: 100%;
		height:40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #333333;
	}
	.box-index-avatar{
		width: 40rpx;
		height:40rpx;
		margin-right: 14rpx;
		border-radius: 50%;
	}
	.box-tips{
		width: 100%;
		position: fixed;
		bottom:calc(100rpx);
		bottom:calc(100rpx + constant(safe-area-inset-bottom));
		bottom:calc(100rpx + env(safe-area-inset-bottom));
		left:0;
		box-sizing: border-box;
		padding:50rpx;
		display: flex;
		justify-content: space-between;
	}
	.box-currentno{
		width: 34rpx;
		height:34rpx;
		background: url(../../../static/userinfo/v2/icon_current_.png) no-repeat center;
		background-size: 100% 100%;
	}
	.box-current{
		width: 34rpx;
		height:34rpx;
		background: url(../../../static/userinfo/v2/icon_current.png) no-repeat center;
		background-size: 100% 100%;
	}
	.box-help{
		width: 600rpx;
		font-size: 22rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #AFAEAE;
		line-height: 30rpx;
	}
	.box-bottom{
		width: 100%;
		height:calc(120rpx );
		height:calc(120rpx + constant(safe-area-inset-bottom));
		height:calc(120rpx + env(safe-area-inset-bottom));
		box-sizing: border-box;
		padding-top: 17rpx;
		justify-content: center;
		position: fixed;
		bottom:0;
		left:0;
		background:#fff;
		border-top: 1px solid #BBBBBB;
	}
	.box-bottom-btn{
		width: 680rpx;
		height:82rpx;
		background: $btn-red;
		border-radius: 5rpx;
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin:0 auto;
	}
	.nouser-btn{
		background:#c0c0c0
	}
</style>
