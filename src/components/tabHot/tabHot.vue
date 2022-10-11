<template>
	<view class="tab-hot">
		<view class="tab-hot-box" v-for="(item,name) in hotList" :key="name" @click="onClickHotPic(name)">
			<view class="hot-bg" :style="`width:${item.bg.width};height:${item.bg.height};background:url(${item.bg.src}) no-repeat center/100% 100%`"></view>
			<view class="tab-index">
				<view class="tab-index-left">
					<view class="tab-hot-boxtitle">{{item.title}}</view>
					<view class="tab-hot-boxtips">{{name == 'broadCast'?getBroadCastStr(item.list.state):item.tips}}</view>
				</view>
				<view class="tab-hot-boxpic-index" v-if="name!='broadCast'">
					<muqian-lazyLoad :src="decodeURIComponent(item.pic)" class="tab-hot-boxpic" mode="aspectFill"/>
				</view>
				<view class="tab-hot-boxpic-index" v-else>
					<view class="tab-hot-boxpic-box live-border" @click="onClickLive(item.list)">
						<view v-if="item.list.state == 2 || item.list.state == 1" class="live-ing"></view>
						<muqian-lazyLoad :src="decodeURIComponent(item.list.pic)" class="tab-hot-boxpic broadcast-box" mode="aspectFill" borderRadius="50%"/>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	import { getBroadCastStr } from "@/tools/switchUtil";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		hotList:any;

		getBroadCastStr = getBroadCastStr;
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			// this.getWidth()
		}
		destroyed(){
			
		}
		onClickMerchantInfo(item:any){
			if (app.token.accessToken == "") {
				uni.navigateTo({
					url: "/pages/login/login"
				});
				return;
			}
			this.goMerchantPage(item.list.merchantAlias)
		}
		onClickLive(item:any){
			if (item.third && item.third === 1001) {
				app.platform.goZgLive({
					roomID: item.roomId,
					merchantId: item.merchantId,
					playCode:item.playCode,
					isAnchor: false,
					...item
				})
				return
			}
			app.platform.goWeChatLive({playCode:item.playCode,goodCode:item.goodCode})
		}
		onClickHotTab(item:any,name:string){
			if(name!='hot') return;

			uni.navigateTo({
				url: "/pages/goods/goods_find_list?hs=" +item.id+'&hsTitle='+item.key||''
			});  
		}
		onClickHotPic(name:string){
			if(name!='cardBean') return;
			
			if(app.token.accessToken == ''){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}
			uni.navigateTo({
				url: "/pages/mall/index"
			});  
		}
	}
</script>

<style lang="scss">
	// 拆卡热门
	.tab-hot{
		width: 100%;
		height:150rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
		background: linear-gradient(0deg, $content-bg, #FFFFFF 80%, #FFFFFF);
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 15rpx;
	}
	.tab-hot-box{
		width: 230rpx;
		height:150rpx;
		background: #fff;
		background-size: 100% 100%;
		position: relative;
		box-sizing: border-box;
		padding:15rpx 0 0 10rpx;
		border-radius: 5rpx;
	}
	.hot-bg{
		position: relative;
		z-index: 2 !important;
	}
	.tab-index{
		width: 100%;
		height:150rpx;
		position: absolute;
		left:0;
		top:0;
		display: flex;
		align-items: center;
		z-index: 10 !important;
	}
	.tab-index-left{
		width: 134rpx;
		height:150rpx;
	}
	.tab-hot-boxtitle{
		width: 100%;
		font-size: 25rpx;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		color: #333333;
		padding-top: 40rpx;
		box-sizing: border-box;
		padding-left: 19rpx;
	}
	.tab-hot-boxtips{
		width: 100%;
		height:35rpx;
		font-size: 21rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #959695;
		margin-top: 5rpx;
		box-sizing: border-box;
		padding-left: 19rpx;
	}
	.tab-hot-boxpic-index{
		width: 96rpx;
		box-sizing: border-box;
		height:126rpx;
		display: flex;
		align-items: center;
	}
	.tab-hot-boxpic-box{
		width: 82rpx;
		height:82rpx;
		position: relative;
	}
	.live-border{
		border:3rpx solid #8e7ae3;
		border-radius: 50%;
	}
	.tab-hot-boxpic{
		width: 72rpx;
		height:126rpx;
		z-index: 3;
	}
	.broadcast-box{
		width: 82rpx;
		height:82rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.live-ing{
		width: 82rpx;
		height:82rpx;
		position: absolute;
		left:0;
		top:0;
		z-index: 2;
		box-sizing: border-box;
		background:url(../../static/index/v2/live_bg.png) no-repeat center;
		background-size: 100% 100%;
		border-radius: 50%;
		-webkit-animation: animate 1s linear infinite;
	}

	@keyframes animate {
		0%{
			transform: scale(1);
			opacity: 1;  
		}
		50%{
			transform: scale(1.15);  
			opacity: 0.5;   /*圆形放大的同时，透明度逐渐减小为0*/
		}
		100%{
			transform: scale(1.3);  
			opacity: 0;   /*圆形放大的同时，透明度逐渐减小为0*/
		}
	}

</style>
