<template>
	<view class="daily-shadow" v-show="dailyShow">
		<view class="daily-content">
			<view class="daily-title"></view>
			<view class="daily-close" @click="onClickCloseDailyShow"></view>
			<view class="daily-list">
				<view class="daily-list-index" v-for="(item,index) in dailyList" :key="index">
					<view class="daily-list-left">
						<view class="left-price">￥<text>{{item.amount}}</text></view>
						<view class="left-desc">{{getCouponType(item.tp,(item.minUseAmount?item.minUseAmount:0))}}</view>
					</view>
					<view class="daily-list-right">
						<view class="right-title">{{item.name}}</view>
						<view class="right-desc">有效期至{{dateFormatYMS(item.overAt)}}</view>
					</view>
				</view>
			</view>
			<view class="daily-bottom">
				<view class="daily-btn" @click="onClickCloseDailyShow">开心收下</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { dateFormatYMS } from '@/tools/util'
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({ default: false })
		dailyShow:boolean|undefined;
		@Prop({ default: [] })
		dailyList:any;

		dateFormatYMS = dateFormatYMS;
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickCloseDailyShow(){
			this.$emit('closeDailyShow')
		}
		getCouponType(type:number,minUseAmount:number){
			switch(type){
				case 1:
					return '全平台无门槛';
				case 2:
					return '满'+minUseAmount+'可用';
				case 3:
					return '打折'
			}
		}
	}
</script>

<style lang="scss">
	.daily-shadow{
		width: 100%;
		height:100%;
		position: fixed;
		left:0;
		top:0;
		z-index: 9999;
		background:rgba(0,0,0,0.7);
	}
	.daily-title{
		width: 389rpx;
		height:131rpx;
		position: absolute;
		top:-143rpx;
		left:61rpx;
		background:url(https://ka-world.oss-cn-shanghai.aliyuncs.com/newYear2022/title.png?v=1) no-repeat center;
		background-size: 100% 100%;
		z-index: 22;
		box-sizing: border-box;
	}
	.daily-close{
		width: 37rpx;
		height:37rpx;
		position: absolute;
		top:-64rpx;
		right:0;
		background:url(../../pages/act/static/newYear/close.png) no-repeat center;
		background-size: 100% 100%;
		z-index: 22;
	}
	.daily-content{
		width: 520rpx;
		height: 616rpx;
		position: fixed;
		left:50%;
		top:50%;
		margin-left: -260rpx;
		margin-top: -250rpx;
		background: linear-gradient(0deg, #BD1303, #FB4E3E);
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 42rpx 34rpx 0 34rpx;
	}
	.daily-bottom{
		width: 520rpx;
		height:196rpx;
		position: absolute;
		bottom:0;
		left:0;
		background:url(https://ka-world.oss-cn-shanghai.aliyuncs.com/newYear2022/bg.png) no-repeat center;
		background-size: 100% 100%;
		z-index: 22;
		box-sizing: border-box;
	}
	.daily-list{
		width: 452rpx;
		box-sizing: border-box;
	}
	.daily-list-index{
		width: 452rpx;
		height:144rpx;
		background: url(../../pages/act/static/newYear/index.png) no-repeat center;
		background-size: 100% 100%;
		margin-bottom: 2rpx;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;
	}
	.daily-list-left{
		width: 146rpx;
		height:144rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		padding:20rpx  0 30rpx 0;
	}
	.left-price{
		width: 100%;
		font-size: 18rpx;
		font-family: zihun143-zhengkuchaojihei;
		font-weight: 400;
		color: #FB4E3E;
		text-align: center;
	}
	.left-price text{
		font-size: 48rpx;
	}
	.left-desc{
		width: 100%;
		font-size: 19rpx;
		font-family: Source Han Sans CN;
		font-weight: 500;
		color: #B8B7B7;
		text-align: center;
	}
	.daily-list-right{
		width: 306rpx;
		height:144rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		padding:30rpx  0 30rpx 30rpx;
	}
	.right-title{
		width: 100%;
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	.right-desc{
		width: 100%;
		font-size: 20rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #666666;
	}
	.daily-btn{
		width: 335rpx;
		height:71rpx;
		background: url(../../pages/act/static/newYear/btn.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		bottom:24rpx;
		left: 50%;
		margin-left: -167.5rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 30rpx;
		font-family: Adobe Heiti Std;
		font-weight: bold;
		color: #F44838;
	}
</style>
