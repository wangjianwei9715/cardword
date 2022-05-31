<template>
	<view class="content">
		<view class="top-bg">
			<view class="top-title">您已进入卡世界后台控制系统！</view>
			<view class="top-right">
				<view class="top-right-icon" @click="showDrawer=true">规则</view>
				<view class="top-right-icon" @click="onClickShare()">分享</view>
			</view>
		</view>
		<view class="code-box">
			<textarea class="code-input" v-model="mysticalCode" placeholder="请输入代码破解..." placeholder-class="placeholder-color"/>
			<view class="code-btn" @click="onClickSecretCodeCrack()"></view>
		</view>
		<view class="code-list">
			<view class="list-header">
				<view class="header-tab" :class="{'tab-current':reqData.tp==item.tp}" v-for="(item,index) in tabData" :key="index" @click="onClickTab(item.tp)">{{item.name}}</view>
			</view>
			<view class="list-box">
				<view class="list-index" v-for="(item,index) in codeList" :key="index">
					<view class="code-icon" v-if="item.state==2||item.state==3">{{item.state==2?'终极代码':'专属代码'}}</view>
					<image class="code-pic" :src="decodeURIComponent(item.pic_url)" />
					<view class="code-info">
						<view class="code-info-title">漏洞：{{item.name}}</view>
						<text :selectable="true" class="code-info-tips">代码提示：{{item.hint}}</text>
						<view class="code-info-status" v-if="reqData.tp!=3">可破解次数：{{(item.total_num-item.get_num)}}/{{item.total_num}}</view>
						<view class="code-info-status" v-else @click="onClickKefu()">
							{{item.tp==1?'请联系客服领取':'已发放至我的-优惠券'}}
							<image v-if="item.tp==1" class="icon-kf" src="../../../static/act/mysticalCode/kefu.png" />
						</view>
					</view>
				</view>
			</view>
		</view>

		<share :operationShow="operationShow" :shareData="shareData" @operacancel="operationShow=false" />
		<!-- 规则 -->
		<bottomDrawer :showDrawer="showDrawer" :title="'活动规则'" @closeDrawer="showDrawer=false">
			<view class="drawer-box" v-for="(item,index) in codePopup" :key="index">
				<view class="drawer-help" v-html="item.content"></view>
			</view>
    	</bottomDrawer>

		<view class="code-shadow" v-show="showPopup">
			<view class="code-popup">
				<view class="popup-close" @click="showPopup=false"></view>
				<view class="popup-title">{{popupData.success?'破解成功':'破解失败'}}</view>
				<view class="popup-msg-box">
					<view class="popup-msg">{{popupData.success?'您获得了'+popupData.name:popupData.msg}}</view>
					<view class="popup-msg" v-if="popupData.success">{{popupData.tp==1?'请联系客服领取':'已发放至我的-优惠券'}}</view>
					<view class="popup-btn" @click="showPopup=false">确 定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { codePopup } from "@/net/DataRules";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		mysticalCode = '';
		tabData = [
			{name:'未修复代码',tp:1},
			{name:'已修复代码',tp:2},
			{name:'我破解的',tp:3},
		]
		codeList:{[x:string]:any} = [];
		kefuUserId:{[x:string]:any} = [];
		reqData:{[x:string]:any} = {
			currentPage:0,
			pageSize:10,
			noMoreData:false,
			tp:1
		}
		// 分享 
		operationShow = false;
		shareData: any = {
			shareUrl: '',
			title: '',
			summary: '',
			thumb: ''
		}
		// 规则
		codePopup = codePopup;
		showDrawer = false;
		// 弹窗
		showPopup = false;
		popupData:{[x:string]:any} = {
			success:false,
			msg:'',
			name:'',
			tp:1
		}
		onLoad(query:any) {
			this.reqNewData()
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData()
		}
		againReq(){
			this.reqData = {
				currentPage:0,
				pageSize:10,
				noMoreData:false,
				tp:1
			}
			this.reqNewData()
		}
		reqNewData(cb?:Function) {	
			// 获取更多商品
			let params = this.reqData;
			params.currentPage++;
			if (params.currentPage==1) this.codeList = [];
			if (params.noMoreData) return ;
			app.http.Get('activity/secretCode/list',params,(data:any)=>{
				if(data.totalPage<=params.currentPage) params.noMoreData = true;
				if(data.list) {
					if(params.currentPage==1){
						this.codeList = data.list
					}else{
						this.codeList = this.codeList.concat(data.list)
					}	
				};
				if(params.tp==3) this.kefuUserId = data.kefuUserId;
				if(cb) cb()
			})
			
		}
		onClickTab(tp:number){
			if(tp == this.reqData.tp) return;
			if(tp ==3 && app.token.accessToken == ''){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}
			this.reqData = {
				currentPage:0,
				pageSize:10,
				noMoreData:false,
				tp:tp
			}
			this.reqNewData();
		}
		onClickSecretCodeCrack(){
			if(this.mysticalCode=='') return;
			if(app.token.accessToken == ''){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}
			app.http.Post('activity/secretCode/crack',{code:this.mysticalCode},(res:any)=>{
				this.popupData = res;
				this.showPopup = true;
				if(res.success){
					this.againReq()
				}
			})
		}
		onClickKefu(){
			uni.navigateTo({
				url: '/pages/userinfo/talk?targetUserId='+this.kefuUserId[0]
			})
		}
		// 分享
		onClickShare() {
			if (!this.operationShow) {
				if (this.shareData.shareUrl == '') {
					this.shareData = {
						shareUrl: "https://www.ka-world.com/share/",
						title: '卡世界神秘代码',
						summary: '卡世界神秘代码',
						thumb: ''
					}
				}
				this.operationShow = true
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.icon-kf{
		width: 30rpx;
		height:32rpx;
		margin-right: 18rpx;
	}
	.drawer-box {
		width: 100%;
		box-sizing: border-box;
	}

	.drawer-help {
		width: 100%;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #7D8288;
		line-height: 38rpx;
		margin-bottom: 50rpx;
	}
	.content{
		width: 100%;
		height:100%;
		position: fixed;
		left:0;
		top: var(--window-top);
		right: 0;
		background:url(../../../static/act/mysticalCode/bg.jpg) no-repeat center;
		background-size: 100% 100%;
		box-sizing: border-box;
		display: block;
		overflow-y: auto;
	}
	.top-bg{
		width: 590rpx;
		height:287rpx;
		background:url(../../../static/act/mysticalCode/bg_title.png) no-repeat center;
		background-size: 100% 100%;
		box-sizing: border-box;
		margin:0 auto;
		position: relative;
		.top-title{
			width: 548rpx;
			height:74rpx;
			background:url(../../../static/act/mysticalCode/bg_tips.png) no-repeat center;
			background-size: 100% 100%;
			box-sizing: border-box;
			position: absolute;
			z-index: 1;
			left:17rpx;
			bottom:26rpx;
			text-align: center;
			line-height: 74rpx;
			font-size: 31rpx;
			font-family: hei;
			font-weight: 400;
			color: #E6E8F7;
			padding-left: 30rpx;
		}
		.top-right{
			width: 91rpx;
			position: absolute;
			right:-70rpx;
			top:22rpx;
			z-index: 1;
			box-sizing: border-box;
			.top-right-icon{
				width: 91rpx;
				height:90rpx;
				margin-bottom: 8rpx;
				background:url(../../../static/act/mysticalCode/right_tips.png) no-repeat center;
				background-size: 100% 100%;
				box-sizing: border-box;
				text-align: center;
				line-height: 90rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
			}
		}
	}
	.code-box{
		width: 643rpx;
		height:547rpx;
		background:url(../../../static/act/mysticalCode/pj_bg.png) no-repeat center;
		background-size: 100% 100%;
		box-sizing: border-box;
		margin:0 auto;
		position: relative;
		.code-input{
			width: 540rpx;
			height: 229rpx;
			background: rgba(116, 234, 255, 0.47);
			border-radius: 8rpx;
			box-sizing: border-box;
			padding:23rpx 19rpx;
			font-size: 29rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #77CAE5;
			position: absolute;
			left:51rpx;
			top:143rpx;
		}
		.code-btn{
			width: 581rpx;
			height:100rpx;
			background:url(../../../static/act/mysticalCode/pj_btn.png) no-repeat center;
			background-size: 100% 100%;
			box-sizing: border-box;
			position: absolute;
			bottom:50rpx;
			left:36rpx
		}
	}
	.code-box /deep/ .placeholder-color{
		font-size: 29rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #77CAE5;
	}
	.code-list{
		width: 696rpx;
		margin:0 auto;
		box-sizing: border-box;
		padding-bottom :30rpx;
		.list-header{
			width: 100%;
			height:120rpx;
			box-sizing: border-box;
			padding: 0 37rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 3rpx;
			.header-tab{
				font-size: 31rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}
			.tab-current{
				font-size: 33rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #00F0FF;
			}
		}
		.list-box{
			width: 100%;
			box-sizing: border-box;
			.list-index{
				width: 696rpx;
				height:255rpx;
				box-sizing: border-box;
				margin-bottom: 43rpx;
				background:url(../../../static/act/mysticalCode/list_index.png) no-repeat center;
				background-size: 100% 100%;
				position: relative;
				padding:40rpx 30rpx 50rpx 50rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.code-icon{
					width: 105rpx;
					height:105rpx;
					background:url(../../../static/act/mysticalCode/list_tips.png) no-repeat center;
					background-size: 100% 100%;
					position: absolute;
					right:3rpx;
					top:-29rpx;
					z-index: 3;
					display: flex;
					align-items: center;
					justify-content: center;
					padding:0 25rpx 0 33rpx;
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #01E7F6;
					line-height: 24rpx;
					box-sizing: border-box;
				}
				.code-pic{
					width:160rpx;
					height:160rpx;
				}
				.code-info{
					width: 430rpx;
					height:160rpx;
					box-sizing: border-box;
					position: relative;
					.code-info-title{
						font-size: 29rpx;
						font-family: PingFang SC;
						font-weight: 600;
						color: #00F0FF;
					}
					.code-info-tips{
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						margin-top: 10rpx;
					}
					.code-info-status{
						width: 100%;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(255,255,255,0.38);
						position: absolute;
						left:0;
						bottom:0;
						display: flex;
						justify-content: space-between;
					}
				}
			}
		}
	}
	.code-shadow{
		width: 100%;
		height:100%;
		position: fixed;
		left:0;
		top:0;
		z-index: 99;
		background:rgba(0,0,0,0.78);
		.code-popup{
			width: 535rpx;
			height:484rpx;
			position: fixed;
			left:50%;
			margin-left:-267.5rpx;
			top:45%;
			margin-top: -250rpx;
			background: url(../../../static/act/mysticalCode/popup.png) no-repeat center;
			background-size: 100% 100%;
			box-sizing: border-box;
			.popup-close{
				width: 29rpx;
				height:27rpx;
				background: url(../../../static/act/mysticalCode/close.png) no-repeat center;
				background-size: 100% 100%;
				position: absolute;
				right:7rpx;
				top:-53rpx;
				z-index: 1;
			}
			.popup-title{
				width: 100%;
				text-align: center;
				font-size: 46rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #00F0FF;
				padding-top: 80rpx;
			}
			.popup-msg-box{
				width: 100%;
				margin-top: 55rpx;
				height:120rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
				.popup-msg{
					width: 100%;
					text-align:center;
					font-size: 29rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #00F0FF;
					line-height: 47rpx;
				}
				.popup-btn{
					width: 335rpx;
					height:73rpx;
					background: url(../../../static/act/mysticalCode/popup_btn.png) no-repeat center;
					background-size: 100% 100%;
					position: absolute;
					left:50%;
					margin-left: -167.5rpx;
					bottom:75rpx;
					text-align: center;
					line-height: 60rpx;
					font-size: 29rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #00F0FF;
				}
			}
		}
	}
	
</style>
