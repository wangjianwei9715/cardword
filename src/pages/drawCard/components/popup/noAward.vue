<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-11-13 16:59:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-12-05 11:25:15
 * @FilePath: \jichao_app_2\src\pages\drawCard\components\popup\noAward.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<u-popup mode="center" :closeOnClickOverlay="false" :overlayOpacity="0.7" bgColor="transparent" :show="show" @close="onClose">
		<view class="popup-content">
			<view class="title">恭喜，您得到{{award.name}}！</view>
			<muqian-lazyLoad class="image" mode="aspectFit" :src="$parsePic(award.pic)"></muqian-lazyLoad>
			<view class="tips">
				<image class="icon" src="/static/act/luckyBag/i.png" />
				该奖励{{award.distribute==1?"拼团成功后":"立即"}}发放
			</view>
			<view class="btn" @click="onClickBtn">我知道了</view>
			<view class="tips tips-btn" @click="onClickNoShow">
				本商品不再提醒
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
	font-weight: 600;
	color: #FFFFFF;
}

.popup-content {
	@include lineBox;
	width: 588rpx;
	flex-direction: column;
	align-items: center;

	.title {
		@include font(42rpx)
	}
	.tipsTitle{
		color:#fff;
		font-weight:bold;
		@include font(30rpx);
		position:relative;
		bottom:12rpx;
	}
	.image {
		width: 292rpx;
		height: 235rpx;
		transform: scale(1.2);
		margin: 76rpx 0 100rpx 0
	}

	.btn {
		@include font(36rpx);
		width: 480rpx;
		height: 80rpx;
		background: #fdb927;
		border-radius: 3rpx;
		text-align: center;
		line-height: 80rpx;
		margin-top:30rpx;
	}

	.tips {
		@include lineBox;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #E6E6E6;
		justify-content: center;
		align-items: center;
		.icon {
			width: 24rpx;
			height: 24rpx;
			margin-right: 10rpx;
		}
	}
	.tips-btn{
		font-size: 28rpx;
		margin-top: 20rpx;
	}
}
</style>