<template>
	<view class="content">
		<!-- <view class="header-banner">
			<statusbar/>
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
				<view class="header-title">在线客服</view>
				<view class="goods-show" @click="operationShow = true" ><text class="icon-ui-dian">&#xe537;</text></view>
			</view>
			
		</view> -->
		
		<scroll-view class="msg-content" @refresherrefresh="onScrollPull" scroll-y refresher-enabled refresher-background="#F4F3F2"
			:style="{'height':`${scrollHeight}px`}" :scroll-top="scrollTop" :refresher-triggered="triggered" @click="onClickMessage">
			<view class="chat-area" id="chat-area">
				<block v-for="(item,index) in msgList" :key="index">
					<!-- 两条消息时间差大于5分钟，就显示时间 -->
					<view v-if="index==0||item.sendTime-msgList[index-1].sendTime>300" class="item time">
						{{getTime(item.sendTime)}}
					</view>
					<view class="item dialog" :class="{'self':item.isMy}">
						<image v-if="!item.isMy" class="avatar" :src="targetUserInfo.avatar&&targetUserInfo.avatar!=''?decodeURIComponent(targetUserInfo.avatar):defaultAvatar"/>
						<text v-if="item.isMy&&item.read">已读</text>
						<!-- 如果是文字 -->
						<view v-if="item.content&&item.content!=''" class="talk" :class="{'self':item.isMy}">
							<view v-if="!item.isMy" class="talk-icon direction-other"/>
							<view class="talk-content" :class="{'self-color':item.isMy}"  v-html="decodeText(item.content)"/>
							<view v-if="item.isMy" class="talk-icon direction-self"/>
						</view>
						<!-- 如果是图片 -->
						<view v-else class="talk" :class="{'self':item.isMy}" style="padding:0 30rpx;">
							<image @click="onClickPreviewImage(item.picUrl)" class="img" :src="item.picUrl" mode="aspectFit"/>
						</view>
						<image v-if="item.isMy" class="avatar" :src="selfAvatar"/>
					</view>
				</block>
			</view>
		</scroll-view>
		<view class="bottom-bar" :style="'bottom:'+((isShowKeyboard&&keyboardHeight>0?keyboardHeight:0)+(isShowFaces?300:0)+(isShowMore?280:0))+'px;'">
			<editor id="editor" class="talk" placeholder="想跟TA说点什么..." @ready="onEditorReady" @input="onInputMsg"
			@focus="onEditorFocus" @blur="onEditorBlur"/>
			<view class="right">
				<image v-if="isEditorFocus" class="img" src="/static/message/face.png" @click.stop="onClickFace"/>
				<image v-else class="img" src="/static/message/keyboard.png" @click.stop="onClickKeyboard"/>
				<image v-if="talkText=='<p><br></p>'||talkText=='<p></p>'||talkText==''" class="img" src="/static/message/add.png" @click="onClickMore"/>
				<button v-else @click="onClickSend" class="btn-send">发送</button>
			</view>
		</view>
		<scroll-view v-if="isShowFaces" class="face-content" scroll-y>
			<image v-for="count in 40" :key="count" class="face" 
			:src="'/static/message/f_'+ ((count-1)<10?'0'+(count-1):count-1)+'.png'" @click="onClickFaceIcon(count)"/>
		</scroll-view>
		<button class="btn-delete" v-if="isShowFaces" @click="onClickDelete"></button>
		<view class="more-content" v-if="isShowMore">
			<button class="more-item" @click="onClickPhotos">&#xe363;</button>
			<button class="more-item" @click="onClickCamera">&#xe301;</button>
		</view>
		
		<!-- 操作 -->
		<view class="operation-content" :class="operationShow?'operation-show':''">
			<view class="operation-index">
				<view class="operation-btn" @click="operationStart(item.text)" v-for="(item,index) in operationData" :key="index"> 
					<image class="operation-img" :src="item.img" mode=""></image>
					<view class="operation-text">{{item.text}}</view>
				</view>
			</view>
			<view class="operation-cancel" @click="onClickOperaCancel">取消</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		app
	} from "@/app";
	import {
		msg
	} from "@/net/DataDefine";
import { Message } from "@/net/NetDefine";
import { PackageBase } from "@/net/PackageBase";
import ossUtils from "@/tools/ossUtils";
import { formatDateToHour, formatDateToYear } from "@/tools/util";
	import {
		Component
	} from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import * as proto from '../../net/proto';
	@Component({})
	export default class ClassName extends BaseNode {
		ossutils = ossUtils.getInstance();
		editorCtx:UniApp.EditorContext=<UniApp.EditorContext>{};
		msgList:msg.msgItem[] = [];
		lastMsgId = 0;
		bucketId = 0;
		targetUserInfo:any = {};
		selfAvatar = app.data.avatar&&app.data.avatar!=''?decodeURIComponent(app.data.avatar):app.defaultAvatar;
		defaultAvatar = app.defaultAvatar;
		lastMsgTime = 0;
		talkText = '';
		scrollTop = 0;
		triggered = false;
		scrollHeight = 0;
		_dataRefreshing = false;
		isShowFaces = false;
		isEditorFocus = true;
		isShowMore = false;
		isShowKeyboard = false;
		keyboardHeight = 0;
		operationShow = false;
		operationData = [
			{img:'/static/userinfo/9.png',text:'分享名片'},
			{img:'/static/userinfo/10.png',text:'加入黑名单'},
			{img:'/static/userinfo/11.png',text:'举报'}
		];
		targetUserId = 0
		onLoad(query: any) {
			if (query.bucketId){
				console.log('bucketId=',query.bucketId)
				app.http.Get('chat/bucket/'+query.bucketId, {}, (res: msg.bucketData) => {
					this.msgList = res.msglist||[];
					this.bucketId = res.bucketId;
					this.targetUserInfo = res.target;
					this.scrollToBottom();
					uni.setNavigationBarTitle({
						title: this.targetUserInfo.name
					});
				});
			}else if(query.goodCode){
				console.log('talk_goodCode=',{targetUserId:query.targetUserId,goodCode:query.goodCode})
				this.targetUserId = query.targetUserId
				app.http.Get('chat/user', {targetUserId:this.targetUserId,goodCode:query.goodCode}, (res: msg.bucketData) => {
					this.msgList = res.msglist||[];
					this.bucketId = res.bucketId;
					this.targetUserInfo = res.target;
					this.scrollToBottom();
					uni.setNavigationBarTitle({
						title: this.targetUserInfo.name
					});
				});
			}else if (query.targetUserId) {
				console.log('targetUserId=',query.targetUserId)
				this.targetUserId = query.targetUserId
				app.http.Get('chat/kefu', {targetUserId:this.targetUserId}, (res: msg.bucketData) => {
					this.msgList = res.msglist||[];
					this.bucketId = res.bucketId;
					this.targetUserInfo = res.target;
					this.scrollToBottom();
					uni.setNavigationBarTitle({
						title: this.targetUserInfo.name
					});
				});
			}
			uni.onKeyboardHeightChange(res => {
				this.keyboardHeight = res.height;
				this.updateBottomBarHeight();
			})
			let sendWebsocketLogin = () => {
				let msg = new proto.message.Login();
				msg.BuildNo = app.version;
				msg.accountId = app.data.accountId;
				msg.token = app.socketInfo.tcpToken;
				let buffer = proto.message.Login.encode(msg).finish();
				let pack = new PackageBase(Message.Login);
				pack.d(buffer).to(app.sever);
			};
			let connectSever = () => {
				app.sever.close();
				app.sever.setServerInfo({ ip: app.socketInfo.tcp });
				app.sever.connect(
					() => {
						console.log("connect success");
						sendHeartBeat();
						sendWebsocketLogin();
					},
					() => {
					// uni.showModal({
					// 	title:'连接失败',
					// 	content:'服务器维护中，请稍后再试...',
					// 	showCancel:false,
					// 	success:()=>{
					// 		connectSever();
					// 	}
					// });
					}
				);
			};
			if (app.socketInfo.tcp && app.socketInfo.tcp != "") {
				connectSever();
			}
			let sendHeartBeat = () => {
				if (app.sever && app.sever.isNetOK()) {
					let msg = new proto.message.HeartBeat();
					msg.time = new Date().getTime();
					let buffer = proto.message.HeartBeat.encode(msg).finish();
					let pack = new PackageBase(Message.HeartBeat);
					pack.d(buffer).to(app.sever);
				}
			};
			//心跳包
			this.scheduler(() => {
				sendHeartBeat();
			}, 10000);

			let listeners = ['PushChatMessage'];
			this.register(listeners);

			this.registerChat();
			this.onEventUI('BackLogin',()=>{
				this.registerChat();
			});

			this.scheduler(()=>{
				if (app.socketInfo.tcp&&app.socketInfo.tcp!='') {
					return;//只在socket不执行时刷新
				}
				app.http.Get('chat/user', {targetUserId:this.targetUserId}, async (res: msg.bucketData) => {
					let msgList = res.msglist;
					let oldMsg = this.msgList[this.msgList.length-1];
					let toBottom = await this.isScrollBottom();
					for (let index = 0; index < msgList.length; index++) {
						const newMsg = msgList[index];
						if (newMsg.msgId==oldMsg.msgId) {
							let news = msgList.slice(index+1);//获取新消息，也可能是空
							this.msgList = this.msgList.concat(news);
							break;
						}
					}
					if (toBottom) {
						this.updateBottomBarHeight();
					}
				});
			},10);
		}
		onReady() {
			this.scrollViewHeight()
		}
		onClickPreviewImage(pic: any) {
			let img = [pic];
			// 预览图片
			uni.previewImage({
				current: 1,
				urls: img,
			});
		}
		registerChat(){
			let msg = new proto.message.RequestChatOn();
			let buffer = proto.message.RequestChatOn.encode(msg).finish();
			let pack = new PackageBase(Message.RequestChatOn);
			pack.d(buffer).to(app.sever);
		}
		onClickBack(){
			uni.navigateBack({
				delta: 1
			});
		}
		onClickOperaCancel(){
			this.operationShow = false;
		}
		operationStart(text:string){
			if(text=='加入黑名单'){
				uni.showModal({
					title:'提示',
					content:'加入黑名单将无法收到TA的消息',
					success:(res)=>{
						if(res.confirm){
							app.http.Post('action/black/'+this.targetUserInfo.id,{},(res:any)=>{
								uni.showToast({
									title:'提交成功',
									icon:'none'
								})
							})
						}
					}
				})
			}
			if(text=='举报'){
				uni.navigateTo({
					url:'/pages/userinfo/user_complain?id='+this.targetUserInfo.id
				})
			}
			this.operationShow = false;
		}
		onEditorReady() {
			uni.createSelectorQuery().select('#editor').context((res) => {
				let context:any = res.context;
				this.editorCtx = context;
			}).exec()
		}
		onClickMessage(){
			if (this.isShowMore||this.isShowFaces) {
				this.updateBottomBarHeight();
			}
			this.isShowFaces = false;
			this.isShowKeyboard = false;
			this.isEditorFocus = true;
			this.isShowMore = false;
		}
		onClickFace(){
			this.editorCtx.blur({});
			this.isShowFaces = true;
			this.isEditorFocus = false;
			this.isShowKeyboard = false;
			this.isShowMore = false;

			this.updateBottomBarHeight();
		}
		onClickMore(){
			this.editorCtx.blur({});
			this.isShowMore = true;
			this.isShowFaces = false;
			this.isEditorFocus = true;
			this.isShowKeyboard = false;

			this.updateBottomBarHeight();
		}
		onClickKeyboard(){
			if (this.isEditorFocus) {
				return;
			}
			//为了不让键盘顶起
			if (this.isShowMore||this.isShowFaces) {
				this.isShowKeyboard = true;
			}
			
			this.editorCtx.insertText({text:''});
			this.isEditorFocus = true;
			this.isShowMore = false;
			this.isShowFaces = false;
		}
		onEditorFocus(){
			if (this.isShowMore||this.isShowFaces) {
				this.isShowKeyboard = true;
			}
			console.log('onEditorFocus');
			this.isEditorFocus = true;
			this.isShowMore = false;
			this.isShowFaces = false;
		}
		onEditorBlur(){
			console.log('onEditorBlur');
			this.isShowKeyboard = false;
		}
		decodeText(str:string){
			return decodeURIComponent(str);
		}
		async PushChatMessage(res:proto.message.IPushChatMessage){
			console.log(res);
			let newMsg:any = res.msg;
			let toBottom = await this.isScrollBottom();
			this.msgList.push(newMsg);
			if (toBottom) {
				this.updateBottomBarHeight();
			}
		}

		onScrollPull(){
			if (this.triggered) {
				return;
			}
			this.triggered = true;
			setTimeout(() => {
				this.triggered = false;
				console.log('onScrollPull');
				this.reqDatas(false);
			}, 100)
		}
		reqDatas(isNew = true){
			if (this._dataRefreshing) {
				return;
			}
			this._dataRefreshing = true;
			let msgId = 0;
			if (this.msgList.length>0) {
				if (isNew) {
					msgId = this.msgList[this.msgList.length-1].msgId;
				}else{
					msgId = this.msgList[0].msgId;
				}
			}
			let params = {
				pageSize:30,
				referMsgId:msgId,
				sliderDir:isNew?1:0//0:老记录，1：新纪录
			}
			app.http.Get('chat/bucket/'+this.bucketId+'/msglist',params,(res:msg.msgDatas)=>{
				this._dataRefreshing = false;
				if (this.msgList) {
					this.msgList = res.msglist.concat(this.msgList);
				}
			},()=>{
				this._dataRefreshing = false;
			});
		}
		
		getPic(img:any){
			if(img.indexOf(',') == -1){
				return img;
			}else{
				let pic = img.split(',')
				return pic[0]
			}
		}
		
		onInputMsg(event:any){
			this.talkText = event.detail.html;
		}

		onClickSend(){
			this.isEditorFocus = false;
			app.http.Post('chat/'+this.bucketId+'/sendMessage',{bucketId:this.bucketId,content:encodeURIComponent(this.talkText)},(res:any)=>{
				let msg = res.data;
				msg.content = this.talkText;
				this.msgList.push(msg);
				
				uni.$emit('sendMessage')
				this.editorCtx.clear({});
				this.talkText = '';
				if (!this.isShowFaces&&!this.isShowMore) {
					// this.onClickKeyboard();
				}
				this.updateBottomBarHeight();
			});
		}

		async onClickCamera(){
			let imageSrc = await this.ossutils.getImage('camera');
			let filePath = 'images/'+ this.ossutils.getFileName(imageSrc); // 自定义上传后的文件名称
			let sign: any = await this.ossutils.getSTS(); // 获取签名等信息
			uni.showLoading({
				title: '上传图片中...'
			});
			uni.uploadFile({
				url: sign.host,
				filePath: imageSrc,
				fileType: 'image',
				name: 'file',
				formData: {
						key: filePath,
						policy: sign.policy,
						OSSAccessKeyId: sign.accessId,
						success_action_status: '200',
						//让服务端返回200,不然，默认会返回204
						signature: sign.signature,
						'x-oss-security-token': sign.security_token
				},
				success: (res) => {
						uni.hideLoading();
						console.log('uploadImage success, res is:', res)
						if (res.statusCode == 200) {
							let url = sign.host + '/' + filePath;
							app.http.Post('chat/'+this.bucketId+'/sendMessage',{bucketId:this.bucketId,picUrl:url},(res:any)=>{
								let msg = res.data;
								msg.picUrl = url;
								this.msgList.push(msg);

								this.updateBottomBarHeight();
							});
						}
				},
				fail: (err) => {
						uni.hideLoading();
						console.log('uploadImage fail', err);
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						});
				}
			});
		}
		async onClickPhotos(){
			let images = await this.ossutils.getImages();
			for (let index = 0; index < images.length; index++) {
				const imageSrc = images[index];
				let filePath = 'images/'+ this.ossutils.getFileName(imageSrc); // 自定义上传后的文件名称
				let sign: any = await this.ossutils.getSTS(); // 获取签名等信息
				console.log('signature==', sign);
				uni.showLoading({
					title: '上传图片中...'
				});
				uni.uploadFile({
					url: sign.host,
					filePath: imageSrc,
					fileType: 'image',
					name: 'file',
					formData: {
						key: filePath,
						policy: sign.policy,
						OSSAccessKeyId: sign.accessId,
						success_action_status: '200',
						//让服务端返回200,不然，默认会返回204
						signature: sign.signature,
						'x-oss-security-token': sign.security_token
					},
					success: (res) => {
						uni.hideLoading();
						console.log('uploadImage success, res is:', res)
						if (res.statusCode == 200) {
							let url = sign.host + '/' + filePath;
							app.http.Post('chat/'+this.bucketId+'/sendMessage',{bucketId:this.bucketId,picUrl:url},(res:any)=>{
								let msg = res.data;
								msg.picUrl = url;
								this.msgList.push(msg);

								this.updateBottomBarHeight();
							});
						}
					},
					fail: (err) => {
						uni.hideLoading();
						console.log('uploadImage fail', err);
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						});
					}
				});
			}
		}
		getTime(second:number){
			let now = new Date().getTime();
			let sendTime = second*1000;
			let isShowDate = now - sendTime>(24*60*60*1000);

			if (isShowDate) {
				return formatDateToYear(sendTime)+' '+formatDateToHour(sendTime);
			}
			return formatDateToHour(sendTime);
		}

		// 聊天区域高度
		scrollViewHeight(callback?:Function):Promise<boolean> {
			return new Promise((resolve, reject) => {
				this.$nextTick(() => {
					setTimeout(()=>{
						const inputMessage = uni.createSelectorQuery().in(this).select(".bottom-bar")
						inputMessage.boundingClientRect(({ top }) => {
							this.scrollHeight = top||0;
							if (callback) {
								callback();
							}
							resolve(true)
						}).exec()
					},100);
				})
			})
		}
		isScrollBottom(): Promise<boolean>{
			return new Promise((resolve, reject) => {
				const inputMessage = uni.createSelectorQuery().in(this).select(".bottom-bar");
				inputMessage.boundingClientRect(({ top }) => {
					let num = top||0;
					if (this.scrollHeight - num<10) {
						resolve(true);
					}else{
						resolve(false);
					}
				}).exec()
			})
		}
		// 回到底部
		scrollToBottom(): Promise<boolean>{
			return new Promise<boolean>((resolve, reject) => {
				this.$nextTick(() => {
					const chatArea = uni.createSelectorQuery().in(this).select("#chat-area")
					chatArea.boundingClientRect(({ height }) => {
						let top = height||0;
						this.scrollTop = top-1;//提前改变一下top的值，否则数据不改动布局无效
						setTimeout(()=>{
							this.scrollTop = top;
							resolve(true);
						},100);
					}).exec()
				})
			});
		}
		async updateBottomBarHeight(){
			let updateHeight = await this.scrollViewHeight();
			let scrollToBottom = await this.scrollToBottom();
		}
		//h5 v-for下标从1开始
		onClickFaceIcon(index:number){
			let url = '/static/message/f_'+ ((index-1)<10?'0'+(index-1):index-1)+'.png';
			this.editorCtx.insertImage({
				src: url,
				width:'20px',
				height:'20px',
				alt: '[表情]',
				success: ()=> {
					
				}
			})
		}
		onClickDelete(){
			let endIndex = this.talkText.indexOf('</p>');
			let str = this.talkText[endIndex-1];
			if (!str) {
				return;
			}
			if (str!='>') {
				let newStr = '';
				for (let index = 0; index < this.talkText.length; index++) {
					if (index!=endIndex-1) {
						newStr+=this.talkText[index];
					}
				}
				this.talkText = newStr;
				this.editorCtx.setContents({html:this.talkText});
			}else if (this.talkText.indexOf('<img')>-1){
				let newStr = this.talkText.substring(0,this.talkText.lastIndexOf('<img'));
				this.talkText = newStr+'</p>';
				this.editorCtx.setContents({html:this.talkText});
			}
		}

		
	}
</script>

<style>
	page{
		background: #F4F3F2;
	}
	p{
		display: flex !important;
		align-items: center !important;
	}
	.header-banner{
		width: 100%;
		background:#fff;
		position: fixed;
		left:0;
		top:0;
		box-sizing: border-box ;
		z-index: 10;
		border-bottom: 1px solid #F4F3F2;
	}
	.tab-header{
		width: 100%;
		height:80rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 30rpx;
		position: relative;
		z-index: 10;
		align-items: center;
		justify-content: center;
	}
	.icon-back{
		width: 40rpx;
		height:44rpx;
		background:url(../../static/goods/back@2x.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left:30rpx;
		top:20rpx;
	}
	.header-title{
		height:80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		font-family: HYQiHei;
		font-weight: bold;
		color: #3B3B3B;
	}

	.nego-center {
		width: 100%;
		height: 264rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		background: #fff;
	}

	.nego-goodimg {
		width: 204rpx;
		height: 186rpx;
		border-radius: 10rpx;
		margin-right: 26rpx;
	}

	.nego-detail {
		height: 186rpx;
		width: 450rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 10rpx 0;
	}

	.detail-title {
		width: 100%;
		font-size: 24rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #3B3B3B;
		margin-bottom: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
	}

	.detail-oricost {
		width: 100%;
		font-size: 24rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #7B7B7B;
	}

	.detail-buy-btn{
		width: 150rpx;
		height: 48rpx;
		background: #4DCDCC;
		border-radius: 24rpx;

		font-size: 24rpx;
		font-family: HYQiHei;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 48rpx;

		position: absolute;
		bottom: 30rpx;
		right: 30rpx;
	}

	.msg-content{
		width: 100%;
		height: auto;
		display: flex;
		padding: 20rpx 20rpx 10rpx;
		box-sizing: border-box;
	}
	.msg-content .chat-area{
		width: 100%;
		height: auto;
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
	}
	.msg-content .item{
		width: 100%;
		height: auto;
		margin: 20rpx;
	}
	.msg-content .dialog{
		display: flex;
		box-sizing: border-box;
	}
	.msg-content .time{
		width: 100%;
		height: 22rpx;
		font-size: 22rpx;
		font-family: HYQiHei;
		font-weight: bold;
		color: #D3D3D3;
		line-height: 22rpx;
		text-align: center;
	}
	.msg-content .avatar{
		width: 76rpx;
		height: 76rpx;
		border-radius: 50%;

	}
	.msg-content .talk{
		max-width: calc(100% - 152rpx);
		height: auto;
		padding: 0 10rpx;
		box-sizing: border-box;
		display: flex;
	}
	.msg-content .self{
		justify-content: flex-end;
	}
	.msg-content .talk .img{
		width: 200rpx;
		height: 200rpx;
	}


	.msg-content .talk-icon{
		width: 0;
		height: 0;
		border: 14rpx solid transparent;
		margin-top: 31rpx;
	}
	.msg-content .direction-self{
		border-left: 20rpx solid #4DCDCC;
	}
	.msg-content .direction-other{
		border-right: 20rpx solid white;
	}
	.msg-content .talk-content{
		width: auto;
		height: auto;
		max-width:100%;
		padding: 25rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		display: flex;
		word-break: break-all;
		border-radius: 10rpx;

		font-size: 24rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #3B3B3B;
		line-height: 36rpx;
	}
	.talk-content img{
		width:40rpx;
		height:40rpx;
	}
	.msg-content .self-color{
		background: #4DCDCC;
	}

	.bottom-bar{
		width: 100%;
		height: auto;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		padding: 25rpx 30rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #F4F3F2;
	}

	.bottom-bar .talk{
		width: 546rpx;
		height: auto;
		min-height: 0;
		background: #F4F3F2;
		border-radius: 39rpx;
		padding: 20rpx 38rpx;
		box-sizing: border-box;

		font-size: 24rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #7D7D7D;
		line-height: 30rpx;
	}

	.bottom-bar .right{
		width: auto;
		height: 48rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.bottom-bar .right .img{
		width: 48rpx;
		height: 48rpx;
		margin-left: 18rpx;
	}
	.bottom-bar .right .btn-send{
		width: 146rpx;
		height: 68rpx;
		background:#4dcdcc;
		color: #FFFFFF;
		font-size: 28rpx;
		line-height: 68rpx;
		margin-left: 18rpx;
		font-weight: bold;
	}
	.face-content{
		width: 100%;
		height: 300px;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		padding: 30rpx;
		box-sizing: border-box;
	}

	.face-content .face{
		width: 70rpx;
		height: 70rpx;
		margin: 24rpx;
	}
	.btn-delete{
		width: 65rpx;
		height: 41rpx;
		background: url(/static/message/delete.png);
		background-color: #fff;
		background-size: 65rpx 41rpx;
		position: fixed;
		bottom: 20rpx;
		right: 45rpx;
		z-index: 10;
	}

	.more-content{
		width: 100%;
		height: 280px;
		background: #FFFFFF;
		display: flex;
		align-items:flex-start;
		justify-content: flex-start;
		position: fixed;
		bottom: 0;
		padding: 30rpx;
		box-sizing: border-box;
	}
	.more-item{
		width: 118rpx;
		height: 118rpx;
		background: #F4F3F2;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 30rpx;

		font-family: uniicons;
		font-size: 30px;
		font-weight: normal;
		font-style: normal;
	}

	.operation-content{
		width: 100%;
		height:300rpx;
		position: fixed;
		bottom:-300rpx;
		left:0;
		box-sizing: border-box;
		border-top: 1px solid #F4F3F2;
		transition: all 0.3s linear;
		z-index:99;
		background:#fff
	}
	.operation-show{
		bottom:0
	}
	.operation-index{
		width: 100%;
		height:180rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
	}
	.operation-btn{
		width: 120rpx;
		height:100rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin-right: 40rpx;
	}
	.operation-img{
		width: 54rpx;
		height:54rpx;
		margin-bottom: 15rpx;
	}
	.operation-text{
		width: 100%;
		text-align: center;
		font-size: 22rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #3B3B3B;
	}
	.operation-cancel{
		width: 100%;
		height:120rpx;
		line-height: 120rpx;
		text-align: center;
		font-size: 24rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #7B7B7B;
		border-top: 1px solid #F4F3F2;
	}
	.goods-show{
		width: 45rpx;
		height:34rpx;
		position: absolute;
		right:30rpx;
		top:50%;
		margin-top:-17rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-ui-dian{
		width: 30rpx;
		height: 30rpx;
		background-color: rgba(0, 0, 0, 0);
		font-family: uniicons;
		font-size: 40rpx;
		font-weight: normal;
		font-style: normal;
		line-height: 30rpx;
		color: #3b3b3b;
		margin: 0
	}
</style>
