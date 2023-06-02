<template>
	<view class="content">
		<navigationbar title="确认赠送" :custom="true">
			<template slot="right">
				<view class="icon-help" @click="onClickShowRule"></view>
			</template>
		</navigationbar>
		<view class="box-content">
			<statusbar/>
			<view class="box-index">
				<view class="box-index-id">请输入收方ID</view>
				<u-code-input v-model="userId" :maxlength="9" @finish="inputConfirm" size="56rpx" height="82rpx" space="15rpx" borderColor="#767676" fontSize="48rpx" color="#333333" :bold="true"></u-code-input>
				<view class="box-index-info">
					<muqian-lazyLoad class="box-index-avatar" :src="userData.avatar" :borderRadius="'50%'"/> {{userData.userName}}
				</view>
			</view>
			<view class="box-index">
				<view class="box-index-code">卡密信息{{orderCode!=''?`:订单（${orderCode}）中卡密${orderTotal}条`:''}}</view>
				<view class="box-index-name" v-for="(item,index) in orderData" :key="index">{{item.name}}</view>
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
		idData:any = [];
		userGet = false;
		goodCode = '';
		explain = '赠送须知：平台提供卡密赠送功能，仅用于好友之间相互赠送，不得作为其他用途。在赠送时请您仔细核对对方信息，赠送后将无法撤回！请悉知';
		orderCode = '';
		orderTotal = 0;
		excludeNoId:any = [];
		onLoad(query:any) {
			if(query.orderCode){
				this.orderCode = query.orderCode;
				this.orderData = JSON.parse(query.data);
				this.excludeNoId = JSON.parse(query.excludeNoId);
				this.orderTotal = query.total;
			}else{
				this.orderData = JSON.parse(query.data);
				this.idData = JSON.parse(query.id);
				this.goodCode = query.goodCode;
			}
		}
		onShow(){
			app.platform.getInvitationClipboard((val:string)=>{
				this.userIdRequestKey(val)
			})
		}
		// 判断粘贴板是否有用户ID
		userIdRequestKey(id:string){
			let inviteCode = /[0-9]{9}/g;
			let key:any = ''
			if(inviteCode.test(id)){
				key = id.match(inviteCode);
				uni.showModal({
					title: '检测到粘贴板',
					content: '是否查询此用户ID：'+key,
					success: (res)=>{
						if (res.confirm) {
							this.userId = key[0];
							this.inputConfirm(this.userId)
							uni.setClipboardData({
								data: '',
								showToast:false
							});
						}
					}
				})
			}
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
						if(this.userId == ''){
							uni.showToast({
								title:'请重新输入用户ID',
								icon:'none'
							})
							return;
						}
						this.givingPost();
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		}
		givingPost(){
			let ts = Math.floor(new Date().getTime()/1000);
			let params:any = {
				ts:ts,
				userId:Number(this.userId),
			}
			const order = this.orderCode!='';
			let idSign = order ? this.excludeNoId.join(',') : this.idData.join(',');
			if(!order){
				params.goodCode = this.goodCode;
				params.noId = this.idData;
			}else{
				params.orderCode = this.orderCode;
				params.excludeNoId = this.excludeNoId
			}
			params.sign = Md5.hashStr(`applyTransfer_${ts}_${order?this.orderCode:this.goodCode}_${idSign}_${this.userId}`)
			uni.showLoading({
				title: '赠送中'
			});
			app.http.Post(`function/userNo/transfer/${order?'goodOrder/':''}applyBatch`,params,(res:any)=>{
				uni.hideLoading()
				uni.showToast({ title:res.msg, icon:'none',duration:3000 })
				uni.switchTab({
					url: '/pages/index/userinfo'
				});
			})
		}
		inputConfirm(val:any){
			let ts = Math.floor(new Date().getTime()/1000);
			let params = {
				goodOrderCode:this.orderData[0].goodOrderCode,
				noId:Number(this.orderData[0].noId),
				ts:ts,
				userId:Number(val),
				sign:Md5.hashStr('queryUser_'+ts+'_'+this.orderData[0].goodOrderCode+'_'+this.orderData[0].noId+'_'+val)
			}
			app.http.Post('function/userNo/transfer/queryUser',params,(res:any)=>{
				this.userGet = true;
				this.userData.userName = res.userName;
				this.userData.avatar = decodeURIComponent(res.avatar);
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
		background:url(../../../static/userinfo/v2/help.png) no-repeat center;
		background-size: 100% 100%;
	}
	.content{
		width: 100%;
		box-sizing:border-box;
	}
	.box-content{
        width: 100%;
		height:100%;
        position: fixed;
		top:0;
		left:0;
		overflow: auto;
        z-index:5;
        box-sizing: border-box;
        padding:100rpx 20rpx calc(280rpx) 20rpx;
		padding:100rpx 20rpx calc(280rpx + constant(safe-area-inset-bottom)) 20rpx;
		padding:100rpx 20rpx calc(280rpx + env(safe-area-inset-bottom)) 20rpx;
    }
	.box-index{
		width: 100%;
		background: #FFFFFF;
		border-radius: 5rpx;
		box-sizing: border-box;
		padding:30rpx 28rpx;
		margin-bottom: 10rpx;
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
		font-size: 22rpx;
		font-family: FZLanTingHeiS-R-GB;
		font-weight: 400;
		color: #333333;
		line-height: 32rpx;
		padding:10rpx 20rpx;
		border-right: 1px solid #fff;
		background: #F6F7F8;
		margin-bottom: 10rpx;
		word-break: break-all;
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
		z-index: 6;
		justify-content: space-between;
		background: #F6F7F8;
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
		z-index: 10;
	}
	.box-bottom-btn{
		width: 680rpx;
		background: $btn-red;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		margin:0 auto;
		height: $btn-height;
		font-size: $btn-fontSize;
		border-radius:$btn-radius;
		font-weight: $btn-weight;
	}
	.nouser-btn{
		background:#c0c0c0
	}
</style>
