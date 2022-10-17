<template>
	<view class="tab-hot">
		<view class="tab-hot-box" v-for="(item,name) in hotList" :key="name" @click="onClickHotPic(item,name)">
			<view class="hot-bg" :style="`width:${item.bg.width};height:${item.bg.height};background:url(${item.bg.src}) no-repeat center/100% 100%`"></view>
			<view class="tab-index">
				<view class="tab-hot-boxtitle">{{item.title}}</view>
				<view class="tab-hot-boxtips">{{item.tips}}</view>
				<view class="tab-hot-boxpic-index" v-if="name=='progress' || name=='hot'" :style="`width:${item.icon.width};height:${item.icon.height};top:${item.icon.top};right:${item.icon.right};background:url(${item.icon.src}) no-repeat center/100% 100%`"
				></view>
				<view class="tab-hot-boxpic-index" v-else-if="name=='broadCast'" :style="`top:${item.icon.top};right:${item.icon.right};`">
					<view class="tab-hot-boxpic-box live-border">
						<view v-if="item.list.state == 2 || item.list.state == 1" class="live-ing"></view>
						<muqian-lazyLoad :src="decodeURIComponent(item.list.pic)" class="tab-hot-boxpic broadcast-box" mode="aspectFill" borderRadius="50%"/>
					</view>
				</view>
				<view class="tab-hot-boxpic-index" v-else :style="`width:${item.icon.width};height:${item.icon.height};top:${item.icon.top};right:${item.icon.right};`"
				>
					<u-transition class="trans-box" v-for="(item,index) in freshPic" :key="index" :show="item.show" :duration="500" mode="fade-zoom">
						<image class="new-pic" :src="item.src" mode="aspectFill"></image>
					</u-transition>
					<view class="shadow-bg"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	import { getBroadCastStr } from "@/tools/switchUtil";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		hotList:any;
		@Prop({default:[]})
		freshGoodCovers:any;

		getBroadCastStr = getBroadCastStr;
		freshPic:any = [];
		freshInterval:any;
		transIndex = 0;
		@Watch('freshGoodCovers')
		onDataChanged(val: any, oldVal: any) {
			if(val){
				this.freshPic = val;
				this.freshInterFnc()
			}
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			// this.getWidth()
			
		}
		destroyed(){
			clearInterval(this.freshInterval)
		}
		freshInterFnc(){
			this.transIndex = 0;
			clearInterval(this.freshInterval)
			this.freshInterval = setInterval(()=>{
				if(this.transIndex<this.freshPic.length-1){
					this.transIndex ++ ;
				}else{
					this.transIndex = 0;
				}
				this.freshPic = this.freshPic.map((x:any,index:number)=>{
					if(index==this.transIndex){
						setTimeout(()=>{this.freshPic[index].show=true},400)
					}
					return {show:false,src:x.src}
				})
			},5000)
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
		onClickHotPic(item:any,name:string){
			const canJumpName=['progress','hot','fresh']
			if(!canJumpName.includes(name)) {
				if(app.token.accessToken == ''){
					uni.navigateTo({
						url:'/pages/login/login'
					})
					return;
				}
				this.onClickLive(item.list)
				return;
			};
			uni.navigateTo({
				url:item.url
			});  
		}
	}
</script>

<style lang="scss">
	// 拆卡热门
	.tab-hot{
		width: 100%;
		height:310rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
		background: linear-gradient(0deg, $content-bg, #FFFFFF 100%, #FFFFFF);
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 15rpx;
	}
	.tab-hot-box{
		width: 350rpx;
		height:150rpx;
		background: #fff;
		background-size: 100% 100%;
		position: relative;
		box-sizing: border-box;
		padding:16rpx 0 0 18rpx;
		border-radius: 5rpx;
		margin-bottom: 10rpx;
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
		display: inline-block;
		z-index: 10 !important;
	}
	.tab-hot-boxtitle{
		width: 100%;
		font-size: 25rpx;
		font-family: PingFangSC-Semibold;
		font-weight: bold;
		color: #333333;
		padding-top: 40rpx;
		box-sizing: border-box;
		padding-left: 38rpx;
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
		padding-left: 38rpx;
	}
	.tab-hot-boxpic-index{
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
	}
	.tab-hot-boxpic-box{
		width: 100rpx;
		height:100rpx;
		position: relative;
	}
	.live-border{
		border:4rpx solid #FA1545;
		border-radius: 50%;
	}
	.broadcast-box{
		width: 100rpx;
		height:100rpx;
		border-radius: 50%;
		overflow: hidden;
	}
	.live-ing{
		width: 100rpx;
		height:100rpx;
		position: absolute;
		left:50%;
		top:50%;
		z-index: 2;
		border:2rpx solid #FA1545;
		border-radius: 50%;
		-webkit-animation: animate 1s linear infinite;
	}

	@keyframes animate {
		0%{
			transform: translate(-50%, -50%) scale(1);
			opacity: 1;  
		}
		50%{
			transform: translate(-50%, -50%) scale(1.15);  
			opacity: 0.5;   /*圆形放大的同时，透明度逐渐减小为0*/
		}
		100%{
			transform: translate(-50%, -50%) scale(1.3);  
			opacity: 0;   /*圆形放大的同时，透明度逐渐减小为0*/
		}
	}
	.shadow-bg{
		width: 139rpx;
		height:6rpx;
		background:url(@/static/index/v3/index_icon_shadow.png) no-repeat center / 100% 100%;
		position: absolute;
		left:0;
		bottom:0;
	}
	.new-pic{
		width: 98rpx;
		height:76rpx;
	}
	.trans-box{
		width: 98rpx;
		height:76rpx;
		position: absolute;
		left:50%;
		margin-left:-49rpx;
		top:0;
	}
</style>
