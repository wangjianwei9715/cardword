<!--
 * @FilePath: \jichao_app_2\src\pages\goods\component\baseCard.vue
 * @Author: wjw
 * @Date: 2024-01-30 09:24:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-02-05 13:28:24
 * Copyright: 2024 .
 * @Descripttion: 
-->
<template>
	<view>
		<view class="header-base" @click="basePopupShow=true">
			基础卡片<image class="icon-base" src="@/static/goods/detail/base.png"/>
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
		basePopupShow=false
	}
</script>

<style lang="scss" scoped>
	.header-base{
		height:40rpx;
		font-size: 24rpx;
		
		font-weight: 400;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		line-height: 40rpx;
	}
	.icon-base{
		width: 30rpx;
		height:30rpx;
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
				
				font-weight: 400;
				color: #666666;
				margin-top: 12rpx;
			}
		}
	}
</style>
