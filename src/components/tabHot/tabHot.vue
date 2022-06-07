<template>
	<view class="tab-hot">
		<view class="tab-hot-box" :class="'tab-hot-box-'+name" v-for="(item,name) in hotList" :key="name" @click="onClickHotPic(name)">
			<view class="tab-hot-boxtitle">{{item.title}}</view>
			<view class="tab-hot-boxtips">{{name == 'broadCast'?getBroadCastStr(item.list.state):item.tips}}</view>
			<view class="tab-hot-boxpic-index" v-if="name!='broadCast'">
				<view class="tab-hot-boxpic-box" v-for="(src,index) in item.list" :key="index" @click="onClickHotTab(src,name)">
					<image :src="decodeURIComponent(src.pic)" class="tab-hot-boxpic" mode="aspectFit"/>
				</view>
			</view>
			<view class="tab-hot-boxpic-index" v-else>
				<view class="tab-hot-boxpic-box" @click="onClickMerchantInfo(item.list.merchantId)">
					<image :src="decodeURIComponent(item.list.merchantLogo)" class="tab-hot-boxpic broadcast-box" mode="aspectFill"/>
				</view>
				<view class="tab-hot-boxpic-box live-border" @click="onClickLive(item.list)">
					<view v-if="item.list.state == 2 || item.list.state == 1" class="live-ing"></view>
					<image :src="decodeURIComponent(item.list.pic)" class="tab-hot-boxpic broadcast-box" mode="aspectFill"/>
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
		onClickMerchantInfo(id:number){
			if (app.token.accessToken == "") {
				uni.navigateTo({
					url: "/pages/login/login"
				});
				return;
			}
			uni.navigateTo({
				url: "/pages/userinfo/merchant_shopsV2?id=" +id
			});  
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
			uni.showToast({
				title:'5月开放',
				icon:'none'
			})
			return
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
		height:185rpx;
		box-sizing: border-box;
		padding: 0 14rpx;
		background: linear-gradient(0deg, $content-bg, #FFFFFF 80%, #FFFFFF);
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 29rpx;
	}
	.tab-hot-box{
		width: 238rpx;
		height:188rpx;
		background: url(../../static/index/v2/hot_bg.png) no-repeat center;
		background-size: 100% 100%;
	}
	.tab-hot-box-hot{
		background: url(../../static/index/v2/hot_bg_2.png) no-repeat center;
		background-size: 100% 100%;
	}
	.tab-hot-box-broadCast{
		background: url(../../static/index/v2/hot_bg_3.png) no-repeat center;
		background-size: 100% 100%;
	}
	.tab-hot-boxtitle{
		width: 100%;
		height:50rpx;
		text-align: center;
		font-size: 29rpx;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		color: #333333;
		padding-top: 10rpx;
		box-sizing: border-box;
	}
	.tab-hot-boxtips{
		width: 100%;
		height:35rpx;
		text-align: center;
		font-size: 20rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #565656;
	}
	.tab-hot-boxpic-index{
		width: 100%;
		box-sizing: border-box;
		height:84rpx;
		padding:0 22rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 5rpx;
	}
	.tab-hot-boxpic-box{
		width: 84rpx;
		height:84rpx;
		position: relative;
	}
	.live-border{
		border:3rpx solid #8e7ae3;
		border-radius: 50%;
	}
	.tab-hot-boxpic{
		width: 84rpx;
		height:84rpx;
		position: absolute;
		left:0;
		top:0;
		z-index: 3;
	}
	.broadcast-box{
		border-radius: 50%;
		overflow: hidden;
	}
	.live-ing{
		width: 84rpx;
		height:84rpx;
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
