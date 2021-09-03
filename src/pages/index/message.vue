<template>
	<view class="content">
		<view class="dynamic-item" @click="onClickDynamic(item.bucketName)" v-for="(item,index) in dynamicData" :key="index">
			<view class="left">
				<image class="img" src="/static/index/message_icon.png"/>
				<view class="info">
					<view class="name">{{item.title}}</view>
					<view class="des">{{item.content}}</view>
				</view>
			</view>
			<view class="right-new">
				{{getTime(item.lastTime)}}
				<view v-show="item.new>0" class="icon-new"></view>
			</view>
		</view>
		<view class="message-content">
			<view class="dynamic-item" v-for="(item) in msgList" :key="item.bucketId" @click="onClickMsg(item)">
				<view class="left">
					<image class="img" :src="item.target&&item.target.avatar!=''?decodeURIComponent(item.target.avatar):defaultAvatar"/>
					<view class="info">
						<view class="name">{{item.target.name}}</view>
						<view class="des"  v-html="trimHtml(item.content)"></view>
					</view>
				</view>
				<view class="right">
					<view class="time">{{getTime(item.sendTime)}}</view>
					<view v-if="!item.isMy&&!item.read&&item.sendTime>0" style="width: 12rpx;height: 12rpx;background: #FD0000;border-radius: 50%;margin-top:10rpx;"/>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="js">
	import { app } from "@/app";
import { msg } from "@/net/DataDefine";
import { Message } from "@/net/NetDefine";
import { PackageBase } from "@/net/PackageBase";
import { formatDateToHour, formatDateToMonth, formatDateToYear } from "@/tools/util";
import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import * as proto from '../../net/proto';
	@Component({})
	export default class ClassName extends BaseNode {
		msgList = [];
		pageIndex = 1;
		hasNextPage = true;
		defaultAvatar = app.defaultAvatar;
		dynamicData = [];
		onLoad(query) {
			let listeners = ['PushChatMessage'];
			this.register(listeners);

			this.initEvent()
			this.registerChat();
			this.onEventUI('BackLogin',()=>{
				this.registerChat();
			});
			this.onEventUI('dynamic',()=>{
				this.reqNewData()
			});
			
		}
		onShow(){
			this.msgList = [];
			this.pageIndex = 1;
			this.hasNextPage = true;
			this.reqNewData();
		}
		registerChat(){
			let msg = new proto.message.RequestChatOn();
			let buffer = proto.message.RequestChatOn.encode(msg).finish();
			let pack = new PackageBase(Message.RequestChatOn);
			pack.d(buffer).to(app.sever);
		}
		trimHtml(str){
			str = decodeURIComponent(str);
			str = str.replace(/(\n)/g, "");
			str = str.replace(/(\t)/g, "");
			str = str.replace(/(\r)/g, "");
			str = str.replace(/<img\/?[^>]*>/g, "[表情]");
			str = str.replace(/<\/?[^>]*>/g, "");
			str = str.replace(/\s*/g, "");
			str = str.replace(/<[^>]*>/g,"");
			return str;
		}
		PushChatMessage(res){
			console.log('PushChatMessage=====',res)
			let isFind = false;
			let newMsg = res.msg;
			for (let index = 0; index < this.msgList.length; index++) {
				let msgItem = this.msgList[index];
				if (msgItem.bucketId == res.bucketId) {
					for (const key in msgItem) {
						if (Object.prototype.hasOwnProperty.call(newMsg, key)) {
							msgItem[key] = newMsg[key];
						}
					}
					isFind = true;
					break;
				}
			}
			if (!isFind) {
				this.msgList.unshift(newMsg);
			}
		}

		onReachBottom(){
			if (this.hasNextPage) {
				this.pageIndex++;
				this.reqNewData();
			}
		}
		initEvent(){
			app.http.Get('message/bucketlist',{},(res)=>{
				this.dynamicData = res.list
				
				console.log('res================',res)
			})
		}
		onClickDynamic(type){
			if(type=='trade'){
				uni.navigateTo({
					url: '/pages/message/dynamic?type='+type
				})
			}
			
		}
		getTime(second){
			if(second==0){
				return ''
			}
			let now = new Date();
			let sendTime = new Date(second*1000);
			const day = 24*60*60*1000;

			let isShowYear = new Date().getFullYear()!=sendTime.getFullYear();
			if (isShowYear) {
				return formatDateToYear(sendTime.getTime());
			}
			let isShowDate = now.getDate() != sendTime.getDate()||now.getTime()-sendTime.getTime()>day;
			if (isShowDate) {
				return formatDateToMonth(sendTime.getTime());
			}
			return formatDateToHour(sendTime.getTime());
		}
		reqNewData(){
			app.http.Get('chat/bucketlist',{pageIndex:this.pageIndex,pageSize:20},(res)=>{
				if (res.list) {
					this.msgList = this.msgList.concat(res.list);
				}
				console.log(res)
				if (res.pageIndex>=res.totalPage) {
					this.hasNextPage = false;
				}
			});
		}
		onClickMsg(item){
			uni.navigateTo({
				url: '/pages/message/talk?bucket='+encodeURIComponent(JSON.stringify(item))
			})
		}
	}
</script>

<style>
	page{
		background: #F5F5F9;
	}
	.dynamic-item{
		width: 100%;
		height: 148rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #fff;
	}
	.dynamic-item .left{
		width: auto;
		height: 148rpx;
		display: flex;
		align-items: center;
	}
	.dynamic-item .left .img{
		width: 76rpx;
		height:76rpx;
		border-radius: 50%;
		margin-right: 36rpx;
	}
	.dynamic-item .left .info{
		width: 460rpx;
		height:76rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;

	}
	.dynamic-item .left .name{
		width: 100%;
		font-size: 30rpx;
		font-family: HYQiHei;
		font-weight: bold;
		color: #3B3B3B;
	}
	.dynamic-item .left .des{
		width: 100%;
		font-size: 24rpx;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #7B7B7B;

		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.dynamic-item .right{
		width: auto;
		height: auto;
		display: flex;
		align-items: center;
		flex: 1;
		justify-content: flex-end;
		flex-wrap: wrap;
	}
	.dynamic-item .right .time{
		width: 100%;
		text-align: right;
		font-size: 24rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #7B7B7B;
	}
	.message-content{
		width: 100%;
		height: auto;
		margin-top: 14rpx;
	}
	.right-new{
		width: 140rpx;
		height:148rpx;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: flex-end;
		font-size: 24rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #7B7B7B;
		position: relative;
	}
	.icon-new{
		width: 11rpx;
		height: 11rpx;
		background: #FD0000;
		border-radius: 50%;
		position: absolute;
		top:50%;
		margin-top: 20rpx;
		right:0;
	}
</style>
