<template>
	<view class="livelist">
		<view class="livelist-index"  v-for="(item,index) in liveList" :key="index" @click="onClickJumpUrl(item)">
			<view class="livelist-top" >
				<muqian-lazyLoad class="livelist-top-image" :src="getGoodsImg(decodeURIComponent(item.pic))" width="348rpx" height="268rpx" :viewBg="true">
				</muqian-lazyLoad>
				<view class="livelist-top-statebox" v-if="item.state==2">
					<image class="livelist-top-statebox-icon" src="@/static/live/v3/live_ing.gif"/>
					<view class="livelist-top-statebox-bg">25人在看</view>
				</view>
				<view class="livelist-top-statebox" v-else>
					<view class="livelist-top-statebox-state">{{item.state==3?'回放':'预告'}}</view>
					<view class="livelist-top-statebox-bg">{{$u.timeFormat(item.startAt,'mm-dd hh:MM')}}</view>
				</view>
				
			</view>
			<view class="livelist-center">
				<view class="livelist-center-title u-line-2">{{item.title}}</view>
				<view class="livelist-center-info">
					<view class="livelist-center-info-left ">
						<muqian-lazyLoad class="livelist-center-info-avatar" src="" borderRadius="50%"/>
						<view class="livelist-center-info-name u-line-1">{{item.merchant}}</view>
					</view>
					<view class="livelist-center-info-right">228观看</view>
				</view>
			</view>
			<!-- <view class="livelist-top-name">
				<view class="livelist-top-name-title">{{item.merchant}}</view>
				<view class="livelist-top-name-text">{{item.time}}</view>
			</view> -->
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {
		getGoodsImg
	} from "../../tools/util";
	import { app } from "@/app";
	@Component({ })
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		liveList:any;
		
		getGoodsImg = getGoodsImg;
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
		}
		destroyed(){
			
		}
		onClickJumpUrl(item:any){
			if(item.third&&item.third==1001){
				app.platform.goZgLive({
					roomID:item.roomId,
					merchantId:item.merchantId,
					playCode:item.playCode,
					goodCode:item.goodCode,
					isAnchor:false,
					...item
				})
				return
			}
			app.platform.goWeChatLive({playCode:item.playCode,goodCode:item.goodCode})
		}
		
	}
</script>

<style lang="scss">
	.livelist{
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		&-index{
			width: 349rpx;
			background:#fff;
			overflow: hidden;
			margin-bottom: 14rpx;
		}
		&-top{
			width: 349rpx;
			height:268rpx;
			position: relative;
			margin:0 auto;
			box-sizing: border-box;
			&-image{
				width: 349rpx;
				height:268rpx;
			}
			&-statebox{
				height:38rpx;
				position: absolute;
				left:15rpx;
				top:15rpx;
				display: flex;
				align-items: center;
				&-icon{
					width: 38rpx;
					height:38rpx;
					border-top-left-radius: 2rpx;
					border-bottom-left-radius: 2rpx;
				}
				&-bg{
					height:38rpx;
					padding: 0 10rpx;
					box-sizing: border-box;
					background:rgba(0,0,0,0.38);
					border-top-right-radius: 2rpx;
					border-bottom-right-radius: 2rpx;
					display: flex;
					align-items: center;
					font-size: 21rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
				&-state{
					width: 38rpx;
					height:38rpx;
					background: #FFAE00;
					border-top-left-radius: 2rpx;
					border-bottom-left-radius: 2rpx;
					font-size: 17rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #F6F7FB;
					display: flex;
					align-items: center;
					justify-content: center;					
				}
			}
			&-name{
				width: 328rpx;
				height: 80rpx;
				background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
				box-sizing: border-box;
				padding:34rpx 10rpx 0 10rpx;
				position: absolute;
				bottom:0;
				left:0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				&-title{
					max-width: 180rpx;
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					height: 80rpx;
					line-height: 80rpx;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				&-text{
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					height: 80rpx;
					line-height: 80rpx;
				}
			}
			&-status{
				box-sizing: border-box;
				position: absolute;
				left:0;
				top:18rpx;
				font-size: 16rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #FFFFFF;
				display: flex;
				align-items: center;
			}
			.livelist-icon-ing{
				width: 88rpx;
				height:26rpx;
				line-height: 26rpx;
				background:url(../../static/live/v2/live_ing.png) no-repeat center;
				background-size: 100% 100%;
			}
			.livelist-icon-end{
				width: 100rpx;
				height:25rpx;
				line-height: 25rpx;
				background:url(../../static/live/v2/live_end.png) no-repeat center;
				background-size: 100% 100%;
			}
			.livelist-icon-wait{
				width: 109rpx;
				height:26rpx;
				line-height: 26rpx;
				background:url(../../static/live/v2/live_wait.png) no-repeat center;
				background-size: 100% 100%;
			}
			.icon-ing{
				width: 17rpx;
				height:17rpx;
				margin-right: 5rpx;
			}
			.livelist-icon-ing .icon-ing{
				background:url(../../static/live/v2/icon_ing.gif) no-repeat center;
				background-size: 100% 100%;
			}
			.livelist-icon-end .icon-ing{
				background:url(../../static/live/v2/icon_end.png) no-repeat center;
				background-size: 100% 100%;
			}
			.livelist-icon-wait .icon-ing{
				background:url(../../static/live/v2/icon_wait.png) no-repeat center;
				background-size: 100% 100%;
			}
		}
		&-center{
			width: 100%;
			height:167rpx;
			box-sizing: border-box;
			padding:0 16rpx;
			&-title{
				width: 100%;
				height:90rpx;
				box-sizing: border-box;
				padding-top: 10rpx;
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #333333;
				line-height: 38rpx;
			}
			&-info{
				height:77rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				&-left{
					height:77rpx;
					display: flex;
					align-items: center;
					font-size: 23rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
				&-name{
					font-size: 23rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
				&-right{
					height:77rpx;
					line-height: 77rpx;
					font-size: 23rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #C0C0C0;
				}
				&-avatar{
					width: 37rpx;
					height:37rpx;
					margin-right: 13rpx;
				}
			}
		}
	}
</style>
