<template>
	<view class="livelist">
		<view class="livelist-index"  v-for="(item,index) in liveList" :key="index" @click="onClickJumpUrl(item)">
			<view class="livelist-top" >
				<image class="livelist-top-image" :src="getGoodsImg(decodeURIComponent(item.pic))" mode="aspectFill"></image>
				<view class="livelist-top-status" :class="item.stateName=='直播中'?'livelist-icon-ing':(item.stateName=='拆卡回放'?'livelist-icon-end':'livelist-icon-wait')">
					<view class="icon-ing"></view>{{item.stateName}}
				</view>
				<view class="livelist-top-name">
					<view class="livelist-top-name-title">{{item.merchant}}</view>
					<view class="livelist-top-name-text">{{item.time}}</view>
				</view>
			</view>
			<view class="livelist-center">{{item.title}}</view>
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
	@Component({})
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
			width: 356rpx;
			background:#fff;
			overflow: hidden;
			margin-bottom: 20rpx;
		}
		&-top{
			width: 328rpx;
			height:260rpx;
			position: relative;
			margin:0 auto;
			padding-top: 12rpx;
			box-sizing: border-box;
			&-image{
				width: 328rpx;
				height:253rpx;
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
			box-sizing: border-box;
			padding:16rpx 20rpx 20rpx 20rpx;
			font-size: 26rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #333333;
		}
	}
</style>
