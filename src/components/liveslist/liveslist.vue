<template>
	<view class="livelist">
		<view class="livelist-index" v-show="liveOldList.length>0"  v-for="item in liveOldList" :key="item.id" @click="onClickJumpUrl(item.id)">
			<view class="livelist-top" >
				<image class="livelist-top-image" :src="item.pic" mode="aspectFill"></image>
				<view class="livelist-top-status">
					<view v-if="item.status==1" class="livelist-top-status-ing">
						<view class="icon-ing"></view>直播中
					</view>
					<view v-else-if="item.status==0" class="livelist-top-status-wait">
						<view class="icon-wait"></view>即将直播
					</view>
				</view>
				<view class="livelist-top-name">{{item.name}}</view>
			</view>
			<view class="livelist-center">{{item.title}}</view>
		</view>
		<empty v-show="liveOldList.length==0" />
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		liveList:any;
		@Prop({default:false})
		ispullDown:any;
	
		liveOldList:any = [];
		@Watch('ispullDown')
		onIspullDownChanged(val: any, oldVal: any){
			this.liveOldList = []
		}
		@Watch('liveList')
		onGoodsListChanged(val: any, oldVal: any){
			this.liveList = val;
			setTimeout(()=>{
				this.getLivesList()
			},100)
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
		}
		destroyed(){
			
		}
		onClickJumpUrl(id:any){
			this.$emit("send", id);
		}
		getLivesList(){
			let data = JSON.parse(JSON.stringify(this.liveList))
			if(!data){
				return;
			}
			this.liveOldList = this.liveOldList.concat(data)
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
			width: 346rpx;
			height:376rpx;
			border-radius: 4rpx;
			background:#fff;
			overflow: hidden;
			margin-bottom: 20rpx;
		}
		&-top{
			width: 346rpx;
			height:260rpx;
			position: relative;
			&-image{
				width: 346rpx;
				height:260rpx;
			}
			&-name{
				width: 346rpx;
				height: 80rpx;
				background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
				box-sizing: border-box;
				padding:34rpx 20rpx 0 20rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				position: absolute;
				bottom:0;
				left:0;
			}
			&-status{
				width: 124rpx;
				height:40rpx;
				border-radius: 20rpx;
				box-sizing: border-box;
				position: absolute;
				left:16rpx;
				top:16rpx;
				&-ing{
					width: 100%;
					height:40rpx;
					border-radius: 20rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					background: rgba(0, 0, 0, 0.5);
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					.icon-ing{
						width: 40rpx;
						height:40rpx;
						background:url(../../static/live/zhibo@2x.png) no-repeat center;
						background-size: 100% 100%;
						margin-right: 8rpx;
					}
				}
				&-wait{
					width: 100%;
					height:40rpx;
					border-radius: 20rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					background: linear-gradient(90deg, #FDEB57 0%, #FFDB37 100%);
					padding-left: 12rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #14151A;
					.icon-wait{
						width: 18rpx;
						height:18rpx;
						background:url(../../static/live/jijiang@2x.png) no-repeat center;
						background-size: 100% 100%;
						margin-right: 8rpx;
					}
				}
			}
		}
		&-center{
			width: 100%;
			height:116rpx;
			box-sizing: border-box;
			padding:16rpx 20rpx 0 20rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #14151A;
		}
	}
</style>
