<template>
	<view class="content">
		<view class="index">
			<input type="number" v-model="phone" class="phone" placeholder="请输入手机号">
			<view class="code-content" v-if="codeLogin">
				<input type="text" v-model="vcode" class="code" placeholder="请输入验证码">
				<view class="code-btn" @click="getInterval">{{codeCountdown>0?codeCountdown+'s后重发':'获取验证码'}}</view>
			</view>
			<view class="code-content" v-else>
				<input type="password" v-model="password" class="code" placeholder="请输入密码">
			</view>
			<view class="xieyi">
				<view class="icon-xieyi" :class="xieyiAgree?'xieyi-agree':''" @click="xieyiAgree = !xieyiAgree"></view>
				<view class="xieyi-desc">登录即自动注册，并同意<text>《用户协议》</text>和<text>《隐私协议》</text></view>
			</view>
			<view class="btn" :class="phone!=''?'btn-confirm':''" @click="onClickLogin">登录</view>
			<view class="orther" v-if="codeLogin">
				<view @click="codeLogin = false">使用密码登录</view>
				<view @click="popupHid = false">收不到验证码?</view>
			</view>
			<view class="orther" v-else>
				<view @click="codeLogin = true">使用验证码登录</view>
				<view @click="onClickChangePassword">忘记密码?</view>
			</view>
			<view class="bottom" @click="onClickWechatLogin">
				<view class="bottom-tip">微信账号登录</view>
				<view class="icon-wechat"></view>
			</view>
		</view>

		<view class="shadow" v-show="!popupHid">
			<view class="popup">
				<view class="popup-title">收不到验证码？</view>
				<view class="popup-text">1.检查手机号是否输入正确</view>
				<view class="popup-text">2.检查手机号是否停机</view>
				<view class="popup-text">3.如有问题请联系客服</view>
				<view class="popup-btn" @click.stop="popupHid = true">知道了</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Md5 } from "ts-md5/dist/md5";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		phone = '';
		vcode = '';
		password = '';
		codeCountdown = 0;
		getCode = false;
		xieyiAgree = false;
		codeLogin = true;
		popupHid = true
		onLoad(query:any) {
			
		}
		onClickChangePassword(){
			uni.navigateTo({
				url:'/pages/login/change_password'
			})
		}
		getInterval(){
			if(this.codeCountdown>0){
				return;
			}
			if (this.phone == '') {
				uni.showToast({
					title: '请输入手机号！',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			app.http.Post('user/code',{phone:this.phone,type:'login'},(data:any)=>{
				this.getCode = true
				this.codeCountdown = 60
				let interval = this.scheduler(() => {
					if (this.codeCountdown <= 0) {
						clearInterval(interval);
					}
					this.codeCountdown--;
				}, 1);
			})
		}
		// 登录
		onClickLogin(){
			if(!this.xieyiAgree){
				uni.showToast({
					title: '请先阅读并同意协议！',
					icon: 'none',
					duration: 2000
				});
				return;
			};

			if(this.codeLogin){
				this.onClickCodeLogin()
			}else{
				this.onClickPwLogin()
			}
		}
		onClickCodeLogin(){
			if(!this.getCode){
				uni.showToast({
					title: '请先获取验证码！',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			let params = {
				phone:this.phone,
				code:this.vcode,
				uuid:app.platform.deviceID,
				os:app.platform.systemInfo.platform,
				device:app.platform.systemInfo.model
			};
			this.HttpLogin(params)
		}
		onClickPwLogin(){
			if(this.password == ''){
				uni.showToast({
					title: '请输入密码！',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			let params = {
				phone:this.phone,
				password:Md5.hashStr(this.password+'_pmpm'),
				uuid:app.platform.deviceID,
				os:app.platform.systemInfo.platform,
				device:app.platform.systemInfo.model
			};
			this.HttpLogin(params)
		}
		HttpLogin(params:any){
			app.http.Post('user/login/phone',params,(data:any)=>{
				app.data = data.data;
				app.opKey = data.opKey
				app.socketInfo = data.app;
				app.token = {accessToken:data.accessToken,refreshToken:data.refreshToken};
				console.log('login===',app)
				if(data.app.launchDomain&&data.app.launchDomain!=''){
					uni.setStorageSync("configLaunchUrl", data.app.launchDomain);
				}
				uni.setStorageSync("token", JSON.stringify(app.token));
				uni.switchTab({
					url: "/pages/index/index",
				});
				uni.$emit('loginSuccess');
			})
		}
		onClickWechatLogin(){
			uni.showLoading({
				title: '加载中'
			});
			uni.getProvider({
				service: 'oauth',
				success: (res)=> {
					if (~res.provider.indexOf('weixin')) {
						uni.login({
							provider: 'weixin',
							success: (loginRes:any)=> {
								let params = {
									weixinToken:loginRes.authResult.access_token,
									unionid:loginRes.authResult.unionid,
									openid:loginRes.authResult.openid,
									uuid:app.platform.deviceID,
									os:app.platform.systemInfo.platform,
									device:app.platform.systemInfo.brand+app.platform.systemInfo.model
								}
								console.log('weixinLoginRes=====',loginRes)
								this.WeChetLogin(params)
							}
						});
					}
				}
			});
		}
		WeChetLogin(params:any){
			app.http.Post('user/login/wechat/app',params,(data:any)=>{
				uni.hideLoading();
				console.log('wechatlogin======',data)
				app.data = data.data;
				app.opKey = data.opKey
				app.socketInfo = data.app;
				app.token = {accessToken:data.accessToken,refreshToken:data.refreshToken};
				if(data.app.launchDomain&&data.app.launchDomain!=''){
					uni.setStorageSync("configLaunchUrl", data.app.launchDomain);
				}
				
				uni.setStorageSync("token", JSON.stringify(app.token));
				uni.switchTab({
					url: "/pages/index/index",
				});
				uni.$emit('loginSuccess');
				if(data.data.mustBindPhone){
					uni.reLaunch({
						url: "/pages/login/bind_phone"
					})
				}
			})
		}
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		box-sizing: border-box;
	}
	.index{
		width:100%;
		box-sizing: border-box;
		padding: 358rpx 74rpx 0 74rpx;
		.phone{
			width: 100%;
			height:80rpx;
			box-sizing: border-box;
			line-height: 78rpx;
			border-bottom: 2rpx solid #E6E3E3;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #14151B;
		}
		.code-content{
			width: 100%;
			height:80rpx;
			margin-top: 46rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			border-bottom: 2rpx solid #E6E3E3;
			position: relative;
			.code{
				width: 450rpx;
				height:78rpx;
				line-height: 78rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #14151B;
			}
			.code-btn{
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
		}
		.xieyi{
			width: 100%;
			height:32rpx;
			margin-top: 28rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			.icon-xieyi{
				width: 32rpx;
				height:32rpx;
				background:url(../../static/login/weigouxuan@2x.png) no-repeat center;
				background-size: 100% 100%;
				margin-right: 12rpx;
			}
			.xieyi-agree{
				width: 32rpx;
				height:32rpx;
				background:url(../../static/login/gouxuan@2x.png) no-repeat center;
				background-size: 100% 100%;
				margin-right: 12rpx;
			}
			.xieyi-desc{
				height:32rpx;
				line-height: 32rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #9397A7;
			}
			.xieyi-desc text{
				color:#FF4C52
			}
		}
		.btn{
			width: 100%;
			height: 88rpx;
			background: #CECFD3;
			border-radius: 4rpx;
			margin-top: 40rpx;
			text-align: center;
			line-height: 88rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
		}
		.btn-confirm{
			background: #14151B;
		}
		.orther{
			width: 100%;
			display: flex;
			box-sizing: border-box;
			align-items: center;
			justify-content: space-between;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #14151A;
			margin-top: 32rpx;
		}
		.bottom{
			width: 602rpx;
			box-sizing: border-box;
			position: fixed;
			bottom:130rpx;
			left:50%;
			margin-left: -301rpx;
			.icon-wechat{
				width: 100rpx;
				height:100rpx;
				background:url(../../static/login/weixin@2x.png) no-repeat center;
				background-size: 100% 100%;
				margin:0 auto;
				margin-top: 40rpx;
			}
			.bottom-tip{
				width: 100%;
				height:40rpx;
				line-height: 40rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #9397A7;
				text-align: center;
				position: relative;
			}
			.bottom-tip::before{
				content: '';
				width: 200rpx;
				height:1px;
				background:#E6E3E3;
				position: absolute;
				right:0;
				top:50%;
				margin-top: -0.5px;
			}
			.bottom-tip::after{
				content: '';
				width: 200rpx;
				height:1px;
				background:#E6E3E3;
				position: absolute;
				left:0;
				top:50%;
				margin-top: -0.5px;
			}
		}
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
