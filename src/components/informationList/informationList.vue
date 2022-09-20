<template>
	<view class="im-list">
		<view class="list-index"  v-for="(item,index) in list" :key="index" >
			<view class="info" @click="onClickJumpUrl(item)">
				<view class="title u-line-2">{{item.title}}</view>
			</view>
			<view class="bottom">
				<view class="time">{{$u.timeFrom(item.created_at)}}</view>
				<view class="orther">
					<view class="orther-item">
						<image class="icon-pl" src="@/static/information/icon_m_pl.png" />{{item.comment}}
					</view>
					<view class="orther-item" @click.prevent="onClickLike(item)">
						<view :class="item.isLikes?'icon-lked':'icon-lk'"/>{{item.likes}}
					</view>
				</view>
			</view>
			<view class="cover-box">
				<muqian-lazyLoad class="pic-box" :src="decodeURIComponent(item.cover)" borderRadius="3rpx" @click="onClickJumpUrl(item)"/>
				<view v-if="item.video_at && item.video_at!=''" class="video-box">
					<view class="icon-play"></view>
					<view class="icon-shadow">
						{{formatMinute(item.video_at)}}
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	import { formatMinute } from "@/tools/util";
	@Component({ })
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		list:any;

		formatMinute = formatMinute
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
		}
		destroyed(){
			
		}
		onClickJumpUrl(item:any){
			app.navigateTo.goInformationDetail(item)
		}
		onClickLike(item:any){
			app.platform.hasLoginToken(()=>{
				app.http.Post(`article/like/or/cancel/${item.articleCode}`,{},(res:any)=>{
					item.likes = res.likes;
					item.isLikes = res.liked;
					uni.$emit('informationChange', item)
				})
			})
		}
		
	}
</script>

<style lang="scss">
	.im-list{
		width: 100%;
		box-sizing: border-box;
		padding:0 25rpx;
		.list-index{
			width: 100%;
			height:160rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 40rpx;
			position: relative;
			.info{
				width: 420rpx;
				height:160rpx;
				position: relative;
				box-sizing: border-box;
				padding-top: 14rpx;
				.title{
					width: 100%;
					font-size: 27rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 33rpx;
				}
			}
			.bottom{
				width: 420rpx;
				display: flex;
				justify-content: space-between;
				position: absolute;
				left:0;
				bottom:6rpx;
				.time{
					height:20rpx;
					line-height: 20rpx;
					font-size: 21rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #AAAAAA;
				}
				.orther{
					height:20rpx;
					display: flex;
				}
				.orther-item{
					height:20rpx;
					display: flex;
					align-items: center;
					font-size: 21rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #AAAAAA;
					margin-left: 34rpx;
				}
				.icon-pl{
					width: 24rpx;
					height:21rpx;
					margin-right: 8rpx;
				}
				.icon-lk{
					width: 22rpx;
					height:22rpx;
					margin-right: 10rpx;
					background:url(@/static/information/icon_m_like.png) no-repeat center / 100% 100%;
				}
				.icon-lked{
					width: 22rpx;
					height:22rpx;
					margin-right: 10rpx;
					background:url(@/static/information/icon_m_liked.png) no-repeat center / 100% 100%;
				}
			}
			.cover-box{
				width: 240rpx;
				height:160rpx;
				position: relative;
			}
			.pic-box{
				width: 240rpx;
				height:160rpx;
			}
			.video-box{
				width: 100%;
				height:160rpx;
				position: absolute;
				left:0;
				top:0;
				background:rgba(0,0,0,0.2)
			}
			.icon-play{
				width: 42rpx;
				height:47rpx;
				background:url(@/static/information/video_p.png) no-repeat center / 100% 100%;
				position: absolute;
				left:50%;
				top:50%;
				margin-left: -21rpx;
				margin-top: -23.5rpx;
			}
			.icon-shadow{
				width:240rpx;
				height:40rpx;
				background:url(@/static/information/video_b.png) no-repeat center / 100% 100%;
				position: absolute;
				bottom:0;
				left:0;
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				box-sizing: border-box;
				padding-right: 13rpx;
			}
		}
	}
</style>
