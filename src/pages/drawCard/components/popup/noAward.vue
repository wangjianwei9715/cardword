<template>
	<u-popup mode="center" :overlayOpacity="0.7" bgColor="transparent" :show="show" @close="onClose">
		<view class="popup-content">
			<view class="title"></view>
			<view class="center">
				<view class="close" @click="onClose"></view>
				<view class="pic-box">
					<muqian-lazyLoad class="image" mode="aspectFit" :src="$parsePic(award.pic)"></muqian-lazyLoad>
				</view>
				<view class="name u-line-2">{{award.name}}</view>
				<view class="tips">
					<image class="icon" src="/static/drawCard/noAward/help.png" />
					活动奖品{{award.distribute==1?"拼团成功后":"立即"}}发放
				</view>
			</view>
			<view class="noshow" @click="onClickNoShow">
				此商品不再提醒
			</view>
		</view>
	</u-popup>
</template>

<script lang="ts">
import { Component, PropSync, Prop } from "vue-property-decorator";
import BaseComponent from "@/base/BaseComponent.vue";
@Component({})
export default class ClassName extends BaseComponent {
	@PropSync("popupShow", { type: Boolean })
	show!: Boolean;
	@Prop({default:{}})
	award!:Object
	onClickBtn(){
		this.onClose()
	}
	onClickNoShow(){
		this.$emit("noShow");
		this.show = false
	}
	onClose(){
		this.show = false
		this.$emit("close");
	}
}
</script>

<style lang="scss" scoped>
@mixin lineBox {
	width: 100%;
	box-sizing: border-box;
	display: flex;
}

@mixin font($size) {
	font-size: $size;
	font-family: PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
}

.popup-content {
	@include lineBox;
	width: 522rpx;
	height:800rpx;
	background:url(@/static/drawCard/noAward/popup.png) no-repeat top /100% 674rpx;
	position: relative;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	.title {
		width: 484rpx;
		height:132rpx;
		background:url(@/static/drawCard/noAward/title.png) no-repeat center /100% 100%;
		position: absolute;
		top:-88rpx;
		left:-24rpx
	}
	.center{
		width: 522rpx;
		height:800rpx;
		position: relative;
		box-sizing: border-box;
		padding-top: 80rpx;
		.luck{
			width: 220rpx;
			height:54rpx;
			font-size: 44rpx;
			font-family: HYLiLiangHeiJ;
			color: rgba(255,255,255,0.4);
			text-shadow: inset 0px 0px 18px rgba(250,25,72,0.44);
			position: absolute;
			left:0;
			top:-2rpx;
			display: flex;
			align-items: flex-start;
			justify-content: center;
		}
		.close{
			width: 50rpx;
			height:50rpx;
			background:url(@/static/drawCard/noAward/close.png) no-repeat center /100% 100%;
			position: absolute;
			top:30rpx;
			right:30rpx
		}
		.pic-box{
			width: 266rpx;
			height:385rpx;
			margin:0 auto;
			.image {
				width: 266rpx;
				height: 385rpx;
			}
		}
		.name{
			width: 480rpx;
			margin:0 auto;
			@include font(28rpx);
			color: #fff;
			line-height: 40rpx;
			margin-top: 50rpx;
			text-align: center;
		}
		.tips{
			@include font(24rpx);
			color:rgba(255,255,255,0.5);
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 40rpx;
			.icon{
				width: 30rpx;
				height:30rpx;
				margin-right: 4rpx;
			}
		}
	}
	.noshow{
		width: 100%;
		text-align: center;
		position: absolute;
		bottom:0;
		left:0;
		@include font(28rpx);
	}
}
</style>