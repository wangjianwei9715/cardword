<template>
	<view class="guide-step">
		<view class="box" :class="'step'+step" v-show="show">
			<image class="line" src="@/static/guide/line.png"/>
			<view class="content">
				<image class="icon" src="@/static/guide/icon.png"/>
				<view class="title" v-if="step==1">
					当前热门的系列，点击系列查看详细图鉴
				</view>
				<view class="title" v-else-if="step==2">
					此处浏览当前热门的卡种及相应图片，点击右上角按钮可查看详细图鉴
				</view>
				<view class="title" v-else-if="step==3">
					点击此处可筛选,全部系列
				</view>
				<view class="msg" v-if="step==1">详细图鉴中可对未补充的图鉴进行填补，审核通过后可得卡币奖励！</view>
			</view>
			<view class="btn" @click="onClickNext">
				<view class="next">{{step==3?"知道了":"下一步"}}</view>
				<view class="num">（{{step}}/3）</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop, PropSync} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import muqianLazyLoad from "@/components/muqian-lazyLoad/muqian-lazyLoad.vue";
	@Component({ components: { muqianLazyLoad },})
	export default class ClassName extends BaseComponent {
		@Prop({default:0})
		step!:number
		@Prop({default:false})
		show!:number
		onClickNext(){
			this.$emit('next')
		}
	}
</script>

<style lang="scss">
.guide-step{
	.box{
		width: 710rpx;
		position: absolute;
		z-index: 999;
		letter-spacing:3rpx
	}
	.step1{
		bottom:0rpx;
		right:0rpx;
	}
	.step2{
		top:0rpx;
		right:0rpx;
	}
	.step3{
		bottom:0rpx;
		right:0rpx;
	}
	.line{
		width: 40rpx;
		height:269rpx;
		position: absolute;
	}
	.step1 .line{
		top:-16rpx;
		right:18rpx;
	}
	.step2 .line{
		top:-285rpx;
		left:123rpx;
	}
	.step3 .line{
		top:0rpx;
		right:54rpx;
	}
	.content{
		width: 595rpx;
		box-sizing: border-box;
		padding:45rpx 15rpx 0 15rpx;
		border-radius: 3rpx;
		background:#fff;
		position: absolute;
	}
	.step1 .content{
		top:262rpx;
		right:0rpx;
	}
	.step2 .content{
		top:-420rpx;
		right:0rpx;
	}
	.step3 .content{
		top:277rpx;
		right:0rpx;
	}
	.icon{
		width: 255rpx;
		height:212rpx;
		position: absolute;
		left:0;
		top:-80rpx;
	}
	.title{
		width: 100%;
		font-size: 28rpx;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: #333333;
		margin-bottom: 12rpx;
	}
	.step3 .title{
		text-align: center;
	}
	.title text{
		font-size: 32rpx;
		font-family: PingFangSC-Medium;
		color:#FA1545
	}
	.msg{
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		margin-bottom: 20rpx;
	}
	.btn{
		width: 167rpx;
		height:75rpx;
		background: url(@/static/guide/btn.png) no-repeat center / 100% 100%;
		position: absolute;
		top:542rpx;
		right:8rpx;
		transform: scale(1.1);
	}
	.step2 .btn{
		top:-185rpx;
	}
	.step3 .btn{
		top:479rpx;
	}
	.next{
		width: 100%;
		text-align: center;
		font-size: 28rpx;
		font-family: PingFang;
		font-weight: bold;
		color: #FFFFFF;
		margin-top: 4rpx;
	}
	.num{
		width: 100%;
		text-align: center;
		font-size: 20rpx;
		font-family: PingFang;
		font-weight: bold;
		color: #FFFFFF;
	}
}
</style>
