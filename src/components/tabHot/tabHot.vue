<template>
	<view class="tab-hot">
		<view class="tab-hot-box" :class="'tab-hot-box-'+name" v-for="(item,name) in hotList" :key="name" @click="onClickHotPic(name)">
			<view class="tab-hot-boxtitle">{{item.title}}</view>
			<view class="tab-hot-boxtips">{{item.tips}}</view>
			<view class="tab-hot-boxpic-index" v-if="name!='broadCast'">
				<view class="tab-hot-boxpic-box" v-for="(src,index) in item.list" :key="index" @click="onClickHotTab(src,name)">
					<image :src="decodeURIComponent(src.pic)" class="tab-hot-boxpic" mode="aspectFit"/>
				</view>
			</view>
			<view class="tab-hot-boxpic-index" v-else>
				<view class="tab-hot-boxpic-box" @click="onClickMerchantInfo(item.list.merchantId)">
					<image :src="decodeURIComponent(item.list.merchantLogo)" class="tab-hot-boxpic" mode="aspectFit"/>
				</view>
				<view class="tab-hot-boxpic-box" @click="onClickLive(item.list)">
					<image :src="decodeURIComponent(item.list.pic)" class="tab-hot-boxpic" mode="aspectFit"/>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		hotList:any;

		// allWidth=0;
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
			app.platform.goWeChatLive({playCode:item.playCode,goodCode:item.goodCode})
		}
		onClickHotTab(item:any,name:string){
			if(name=='hot'){
				uni.navigateTo({
					url: "/pages/goods/goods_find_list?serie=" +item.key
				});  
			}
		}
		onClickHotPic(name:string){
			if(name=='cardBean'){
				uni.showToast({
					title:'卡豆商城维护中',
					icon:'none'
				})
			}
		}
	}
</script>

<style lang="scss">
	// 拆卡热门
	.tab-hot{
		width: 100%;
		height:185rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
		background: linear-gradient(0deg, $content-bg, #FFFFFF 80%, #FFFFFF);
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
	}
	.tab-hot-box{
		width: 236rpx;
		height:185rpx;
		background: url(../../static/index/v2/hot_bg.png) no-repeat center;
		background-size: 100% 100%;
	}
	.tab-hot-box-hot{
		background: url(../../static/index/v2/hot_bg_2.png) no-repeat center;
		background-size: 100% 100%;
	}
	.tab-hot-box-split{
		background: url(../../static/index/v2/hot_bg_3.png) no-repeat center;
		background-size: 100% 100%;
	}
	.tab-hot-boxtitle{
		width: 100%;
		height:50rpx;
		text-align: center;
		font-size: 28rpx;
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
		font-size: 18rpx;
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
	}
	.tab-hot-boxpic-box{
		width: 84rpx;
		height:84rpx;
	}
	.tab-hot-boxpic{
		width: 84rpx;
		height:84rpx;
	}
</style>
