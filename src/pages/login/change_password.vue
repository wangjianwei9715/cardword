<template>
	<view class="content">
		<view v-show="phases == 0">
			<view class="input-content">
				<picker class="input-left phone-type" mode="selector" @change="bindPickerChange" :value="phoneTypeIndex" :range="phoneTypeArray">
					{{phoneTypeArray[phoneTypeIndex]}}
				</picker>
				<input class="login-input" type="number" v-model="userPhone" placeholder="请输入手机号"  maxlength="11"/>
			</view>
			<view class="input-content">
				<view class="input-left">验证码</view>
				<input class="login-input" type="number" v-model="userCode" placeholder="请输入验证码" />
				<view class="input-code" @click="onClickGetCode">{{codeCountdown>0?codeCountdown+'s后重发':'获取验证码'}}</view>
			</view>
			<view class="login-btn" @click="onClickValidation" :class="userPhone!=''&&userCode!=''?'btn-color':''">下一步</view>
			<view class="input-bottom">
				<view class="bottom-view" @click="onClickCodeTip">收不到验证码？</view>
			</view>
		</view>
		
		<view v-show="phases == 1">
			<view class="input-content">
				<view class="input-left">新密码</view>
				<input class="login-input" password="true" v-model="userPassword" placeholder="请输入6-20位字符"  maxlength="20"/>
			</view>
			<view class="input-content">
				<view class="input-left">重复密码</view>
				<input class="login-input" password="true" v-model="userPasswordTwo" placeholder="请确认密码" maxlength="20"/>
			</view>
			<view class="login-btn" @click="onClickSubmit" :class="userPassword!=''&&userPasswordTwo!=''?'btn-color':''">保存</view>
		</view>
		
		<view class="shadow" v-show="!popupHid">
			<view class="popup">
				<view class="popup-title">收不到验证码</view>
				<view class="popup-text">1.检查手机号是否输入正确</view>
				<view class="popup-text">2.检查手机号是否停机</view>
				<view class="popup-text">3.如有问题请联系客服</view>
				<view class="popup-btn" @click.stop="popupHid = true">我知道了</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import HttpRequest from "../../net/HttpRequest";
	import {Md5} from 'ts-md5/dist/md5';
import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseNode {
		phoneTypeArray = [
			'+86',
			'+852',
			'+853',
			'+886'
		]
		phoneTypeArrayNum = [
			'86','852','853','886'
		]
		phoneTypeIndex = 0;
		phases = 0
		popupHid = true
		userPhone = ''
		userCode = ''
		userPassword = ''
		userPasswordTwo = ''
		codeCountdown = 0;
		getCode = false
		codesign = ''
		onLoad(query:any) {
			
		}
		bindPickerChange(val:any){
			this.phoneTypeIndex = val.detail.value;
		}
		onClickCodeTip(){
			this.popupHid = false;
		}
		onClickGetCode(){
			if (this.codeCountdown > 0) {
				return;
			}
			
			if (this.userPhone == '') {
				uni.showToast({
					title: '请输入手机号！',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			let phone = this.phoneTypeArrayNum[this.phoneTypeIndex]+this.userPhone;
			app.http.Post('user/code',{phone:phone,type:'forget'},(data:any)=>{
				this.getCode = true
				this.codeCountdown = 60;
				let interval = this.scheduler(() => {
					if (this.codeCountdown <= 0) {
						clearInterval(interval);
					}
					this.codeCountdown--;
				}, 1);
			})
			
		}
		onClickValidation(){
			if(!this.getCode){
				uni.showToast({
					title: '请先获取验证码！',
					icon: 'none',
					duration: 2000
				});
				return
			}
			if (this.userCode == '') {
				uni.showToast({
					title: '请输入验证码！',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			let phone = this.phoneTypeArrayNum[this.phoneTypeIndex]+this.userPhone;
			app.http.Post('user/forget',{phone:phone,code:this.userCode},(data:any)=>{
				this.codesign = data.data.sign
				this.phases = 1
			})
			
		}
		onClickSubmit(){
			if(this.userPassword != this.userPasswordTwo || this.userPasswordTwo == ''){
				uni.showToast({
					title: '请输入正确的密码！',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			let Md5_password = Md5.hashStr(this.userPasswordTwo+'_pmpm')
			let phone = this.phoneTypeArrayNum[this.phoneTypeIndex]+this.userPhone;
			app.http.Post('user/forget2',{phone:phone,sign:this.codesign,password:Md5_password},(data:any)=>{
				uni.showToast({
					title: '修改成功！',
					icon: 'none',
					duration: 2000
				});
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 1000);
			})
		}
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		height:100%;
		display: block;
		background:#fff;
		box-sizing: border-box;
		padding-top: 20rpx;
	}
	
	.input-content{
		width: 688rpx;
		height:100rpx;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		border-bottom: 1px solid #F4F3F2;
		position: relative;
		margin:0 auto;
	}
	.input-left{
		width: 150rpx;
		height:100rpx;
		box-sizing: border-box;
		line-height: 100rpx;
		font-size: 26rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #14151A;
	}
	.login-input{
		width: 400rpx;
		height:50rpx;
		line-height: 50rpx;
		box-sizing: border-box;
		color:#14151A;
		font-size: 26rpx;
		font-family: HYQiHei;
	}
	.input-code{
		width: 160rpx;
		height:64rpx;
		background:url(../../static/login/code.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		text-align: center;
		line-height: 64rpx;
		right:0;
		bottom:16rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #14151A;
	}
	.login-btn{
		width: 690rpx;
		height:94rpx;
		background:#CECFD3;
		border-radius: 10rpx;
		margin:0 auto;
		margin-top:46rpx;
		margin-bottom: 38rpx;
		text-align: center;
		line-height: 94rpx;
		font-size: 40rpx;
		font-family: HYQiHei;
		font-weight: bold;
		color: #FFFFFF;
	}
	.btn-color{
		background: rgba(20, 21, 27, 1);
	}
	.input-bottom{
		width: 100%;
		height:30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.bottom-view{
		height:30rpx;
		color:#7B7B7B;
		font-size: 26rpx;
		line-height: 30rpx;
		box-sizing: border-box;
		padding: 0 35rpx
	}
	.shadow{
		width: 100%;
		height:100%;
		background:rgba(0,0,0,0.5);
		position: fixed;
		left:0;
		right:0;
		top:0;
	}
	.popup{
		width: 580rpx;
		height:400rpx;
		border-radius: 10rpx;
		background:#fff;
		position: fixed;
		left:50%;
		margin-left:-290rpx;
		top:30%;
		box-sizing: border-box;
		padding-top: 46rpx;
		.popup-title{
			width: 100%;
			height:	32rpx;
			line-height: 32rpx;
			text-align: center;
			margin-bottom: 34rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 600;
			color: #454952;
		}
		.popup-text{
			width: 100%;
			box-sizing: border-box;
			color: #9397A7;
			font-size: 28rpx;
			margin-bottom: 20rpx;
			text-align: center;
		}
		.popup-btn{
			width: 100%;
			height:94rpx;
			box-sizing: border-box;
			text-align: center;
			line-height: 94rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: bold;
			color: #14151B;
			position: absolute;
			bottom:0;
			left:0;
			right:0;
			border-top:1px solid #F4F3F2
		}
	}
	
</style>
