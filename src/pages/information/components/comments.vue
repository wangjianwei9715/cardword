<template>
	<view class="content">
		<view class="title">{{articleData.title}}</view>
		<view class="user">
			<muqian-lazyLoad class="avatar" :src="articleData.author_logo" :borderRadius="'50%'"/>
			<view>
				<view class="name">{{articleData.author}}</view>
				<view class="time">发布于{{$u.timeFormat(articleData.active_at,'mm月dd日 hh:MM')}}</view>
			</view>
		</view>
		<view v-for="(content, index) in contentArr" :key="index">
			<rich-text class="desc" :nodes="content" @itemclick="articlePreviewImage"/>
			<video class="desc-video" :direction="0" :poster="`${videoArr[index]}?x-oss-process=video/snapshot,t_0,f_jpg`" v-if="videoArr[index] !== null" :src="videoArr[index]" controls></video>
		</view>
		<u-divider style="width:100%" lineColor="#E8E8E8"></u-divider>

		<view class="chat-content" v-show="articleData.comment>0">
			<view class="chat-header">{{articleData.comment}}条评论</view>
			<view class="chat-box" v-for="(item,index) in commentsList" :key="index">
				<view class="chat-item">
					<muqian-lazyLoad class="chat-avatar" :src="decodeURIComponent(item.avatar)" :borderRadius="'50%'"/>
					<view style="width:470rpx">
						<view class="chat-info">
							<view class="chat-name">{{item.name}}</view>
							<view class="chat-time">{{$u.timeFrom(item.created_at)}}</view>
						</view>
						<text class="chat-msg" :selectable="true" :class="'chat-'+item.id" @click="onClickReply(item,item.id)">{{item.content}}</text>
					</view>
					<view class="chat-right" @click="$u.throttle(()=>{onClickLike(item)},100)">
						<view :class="item.isLike?'icon-like':'icon-likeno'"></view>
						<view class="chat-like">{{item.likes}}</view>
					</view>
				</view>
				<view class="chat-item son-item" v-for="(son,x) in item.lower" :key="x">
					<muqian-lazyLoad class="son-avatar" :src="decodeURIComponent(son.avatar)" :borderRadius="'50%'"/>
					<view style="width:390rpx">
						<view class="chat-info son-info">
							<view class="chat-name">{{son.name}}</view>
							<view class="chat-time">{{$u.timeFrom(son.created_at)}}</view>
						</view>
						<view class="chat-msg" v-if="!son.isDelete" :class="'chat-'+son.id" @click="onClickReply(son,item.id)">
							<text class="chat-hf" :selectable="true" v-if="son.replyUserName!=''">回复<text class="hf-name">{{son.replyUserName}}</text>:{{son.content}}</text>
							<text class="chat-hf" :selectable="true" v-else>{{son.content}}</text>
						</view>
						<view class="chat-msg" v-else>评论已删除</view>
					</view>
					<view class="chat-right" @click="$u.throttle(()=>{onClickLike(son)},100)">
						<view :class="son.isLike?'icon-like':'icon-likeno'"></view>
						<view class="chat-like">{{son.likes}}</view>
					</view>
				</view>
				<view class="chat-more" v-if="item.remainNum>0" @click="onClickMoreComments(item.id)">
					展开全部{{item.remainNum}}条<image style="width:16rpx;height:11rpx;margin-left:8rpx" src="@/static/information/icon_down.png"/>
				</view>
			</view>
		</view>
		<view class="chat-empty" v-show="articleData.comment>0&&isFetchEnd">- 没有更多了 -</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:{}})
		articleData:any
		@Prop({default:{}})
		commentsList:any
		@Prop({default:false})
		isFetchEnd:boolean|undefined

		contentArr:any = [];
		videoArr:any = [];
		@Watch('articleData')
		onWatchArticleData(val:any){
			if(val){
				const arr = decodeURIComponent(this.articleData.content).split('</iframe>');
				const reg = /<iframe([\s\S]*)/g;
				for (let i in arr) {
					const item = arr[i];
					const urlMatch = item.match(/<iframe[\s\S]*src=\"(.*?)\"/);
					if (urlMatch && urlMatch.length > 1) {
						this.videoArr[i] = urlMatch[1];
					} else {
						this.videoArr[i] = null;
					}
					this.contentArr[i] = item.replace(reg, '');
				}
			}
		}
		created(){//在实例创建完成后被立即调用
		}
		mounted(){//挂载到实例上去之后调用
		}
		destroyed(){
		}
		onClickLike(item:any){
			app.platform.hasLoginToken(()=>{
				app.http.Post(`article/comment/like/or/cancel/${item.id}`,{},(res:any)=>{
					item.isLike = res.liked;
					item.likes = res.likes;
				})
			})
		}
		onClickReply(item:any,fatherId:number){
			this.$emit('reply',{replyId:item.id,replyName:item.name,fatherId})
		}
		onClickMoreComments(id:number){
			this.$emit('moreComments',id)
		}
		articlePreviewImage(e:any){
			const item = e.detail.node;
			if(item.name=='img'){
				uni.previewImage({ 
					urls: [item.attrs.src]
				});
			}
		}
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		box-sizing: border-box;
	}
	.title{
		width: 100%;
		font-size: 38rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #333333;
		line-height: 48rpx;
		margin-bottom: 20rpx;
	}
	.user{
		width: 100%;
		display: flex;
		align-items: center;
		height:90rpx;
		margin-bottom:30rpx;
		.avatar{
			width: 90rpx;
			height:90rpx;
			border-radius: 50%;
			margin-right: 28rpx;
		}
		.name{
			font-size: 29rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
			margin-bottom: 5rpx;
		}
	}
	.time{
		width: 100%;
		font-size: 23rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #7C7C7C;
	}
	.desc{
		width: 100%;
		font-size: 32rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #14151A;
		line-height: 60rpx;
		letter-spacing:2rpx;
	}
	.desc-video{
		width: 670rpx;
	}
	::v-deep img{
		width:670rpx !important;
		height:auto;
		margin:10rpx 0;
	}
	::v-deep h2{
		line-height: 60rpx;
		font-size: 30rpx;
	}
	::v-deep h3{
		line-height: 60rpx;
		font-size: 30rpx;
	}
	::v-deep p{
		word-break:break-all
		
	}
	.chat-content{
		width: 100%;
		box-sizing: border-box;
		.chat-header{
			width: 100%;
			font-size: 29rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #333333;
		}
		.chat-box{
			width: 100%;
			margin-top: 32rpx;
			box-sizing: border-box;
			padding-bottom: 10rpx;
			position: relative;
			.chat-item{
				width: 100%;
				position: relative;
				box-sizing: border-box;
				display: flex;
				margin-bottom: 20rpx;
				.chat-avatar{
					width: 62rpx;
					height:62rpx;
					margin-right: 18rpx;
				}
				.chat-info{
					width: 100%;
					display: flex;
					align-items: center;
					padding-top: 10rpx;
				}
				.chat-name{
					font-size: 25rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #636363;
					margin-right: 22rpx;		
				}	
				.chat-time{
					font-size: 21rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #AAAAAA;
				}
				.chat-msg{
					font-size: 25rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 33rpx;
					margin-top: 10rpx;
					display: flex;
				}
				.chat-right{
					height:30rpx;
					display: flex;
					align-items: center;
					position: absolute;
					right:0;
					top:9rpx;
					.icon-like{
						width: 22rpx;
						height:22rpx;
						background: url(@/static/information/icon_m_liked.png) no-repeat center / 100% 100%;
					}
					.icon-likeno{
						width: 22rpx;
						height:22rpx;
						background: url(@/static/information/icon_m_like.png) no-repeat center / 100% 100%;
					}
					.chat-like{
						height:30rpx;
						line-height: 30rpx;
						font-size: 21rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #AAAAAA;
						margin-left: 12rpx;
					}
				}
			}
			.son-item{
				padding-left: 80rpx;
			}
			.son-avatar{
				width: 44rpx;
				height:44rpx;
				margin-right: 17rpx;
			}
			.son-info{
				padding-top: 5rpx !important;
			}
			.chat-hf{
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 33rpx;
			}
			.hf-name{
				color:#636363;
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 33rpx;
				margin:0 10rpx
			}
			.chat-more{
				margin-left: 140rpx;
				height: 41rpx;
				background: #EFEFEF;
				border-radius: 3rpx;
				box-sizing: border-box;
				padding: 0 15rpx;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				font-size: 21rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #636363;
				margin-bottom: 20rpx;
			}
		}
		.chat-box::after{
			content: '';
			width: 587rpx;
			height:1rpx;
			background: #E8E8E8;
			position: absolute;
			right:0;
			bottom:0;
		}
	}
	.chat-empty{
		width: 100%;
		text-align: center;
		font-size: 21rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #D2D2D2;
		margin:30rpx 0rpx 10rpx 0;
	}
</style>
