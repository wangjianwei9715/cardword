<!--
 * @FilePath: \jichao_app_2\src\pages\goods\component\baseCard.vue
 * @Author: wjw
 * @Date: 2024-01-30 09:24:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-07-09 16:46:51
 * Copyright: 2024 .
 * @Descripttion: 
-->
<template>
	<view>
		<view class="base-container-header" @click="basePopupShow=true">
			{{getPriceStart?'起':''}}/份精美卡片<image class="icon-base" src="@/static/goods/v3/icon_tips.png"/>
		</view>
		<baseCardPopup :show.sync="basePopupShow"/>
	</view>
</template>

<script lang="ts">
	import { Component, Prop} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import baseCardPopup from "./baseCardPopup.vue"
	@Component({
		components:{baseCardPopup}
	})
	export default class ClassName extends BaseComponent {
		@Prop({ default: false})
		getPriceStart: boolean;
		
		basePopupShow=false
	}
</script>

<style lang="scss" scoped>
	.base-container-header{
		font-size: 20rpx;
		color: #AEAEB2;
		display: flex;
		align-items: center;
		line-height: 40rpx;
		font-weight: 300;
		margin-left: 4rpx;
	}
	.icon-base{
		width: 18rpx;
		height:18rpx;
		margin-left: 8rpx;
	}
	.base-popup{
		.base-popup-title{
			width: 100%;
			height:100rpx;
			text-align: center;
			line-height: 100rpx;
			font-size: 36rpx;
			
			font-weight: 600;
			color: #333333;
		}
		.base-center{
			width: 100%;
			box-sizing: border-box;
			padding: 0 36rpx 100rpx 36rpx;
			.base-popup-name{
				font-size: 28rpx;
				
				font-weight: 600;
				color: #333333;
			}
			.item-title{
				font-size: 30rpx;
				
				font-weight: 600;
				color: #333333;
				margin-top: 34rpx;
			}
			.item-desc{
				font-size: 24rpx;
				
				
				color: #666666;
				margin-top: 12rpx;
			}
		}
	}
</style>
