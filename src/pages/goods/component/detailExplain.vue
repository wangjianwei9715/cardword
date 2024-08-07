<!--
 * @FilePath: \jichao_app_2\src\pages\goods\component\detailExplain.vue
 * @Author: wjw
 * @Date: 2024-06-27 11:43:04
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-27 12:02:33
 * Copyright: 2024 .
 * @Descripttion: 
-->
<template>
	<view class="desc-container">
		<view class="detail-box-title">购买须知</view>
		<view class="detail-explain">商家所拆商品全部为原封，上架前会提交原箱/原盒视频，同时也会在直播之前展示原箱/原盒包装。卡片生产商在生产过程中，有机率出现装箱误差，商品详情描述仅供参考，最终拆卡结果以商品实物为准，如若对商品规格和卡片张数有疑义，请在购买前联系客服或商家，也可进入首页发售日志查看对应的商品规格和卡片张数，未咨询后购买即认为已了解商品的规格及卡片张数，希望各位用户悉知这种情况的发生。产品宣传图均为发行商官方制作，最终该系列卡片以箱内拆出的实物为准，请各位玩家在购买前知悉。</view>
		
		<view class="goods-desc-rule" @click.stop="showDrawer = true">
			查看全部<image class="icon-desc-rule" src="@/static/goods/v3/icon_rule.png" />
		</view>

		<!-- 底部弹窗 -->
		<bottomDrawer :showDrawer.sync="showDrawer" :title="'购买须知'">
			<view class="explain-drawer">商家所拆商品全部为原封，上架前会提交原箱/原盒视频，同时也会在直播之前展示原箱/原盒包装。卡片生产商在生产过程中，有机率出现装箱误差，商品详情描述仅供参考，最终拆卡结果以商品实物为准，如若对商品规格和卡片张数有疑义，请在购买前联系客服或商家，也可进入首页发售日志查看对应的商品规格和卡片张数，未咨询后购买即认为已了解商品的规格及卡片张数，希望各位用户悉知这种情况的发生。产品宣传图均为发行商官方制作，最终该系列卡片以箱内拆出的实物为准，请各位玩家在购买前知悉。</view>
			<view class="explain-drawer-title">常见问题</view>
			<view class="explain-drawer" v-for="(item,index) in goodsDetailRules" :key="index">
				<view class="explain-drawer-q">{{item.title}}</view>
				<text class="explain-drawer-text">{{item.desc}}</text>
			</view>
			<view class="explain-drawer-title">中卡概率</view>
			<view class="explain-drawer margin-bootom0">f=每份卡密的中卡概率</view>
			<view class="explain-drawer margin-bootom0">P=【拼团份数】</view>
			<view class="explain-drawer margin-bootom0">Q=【拼团配置】中的卡片总张数</view>
			<view class="explain-drawer">f=1-[(P-1)/P]^Q</view>
		</bottomDrawer>
	</view>
			
</template>
<script lang="ts">
	import { app } from "@/app";
	import { Component, Prop} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { goodsDetailRules } from "@/tools/DataRules";
	@Component({
		components:{}
	})
	export default class ClassName extends BaseComponent {
		goodsDetailRules = goodsDetailRules;
		showDrawer = false;// 底部抽屉
	}
</script>

<style lang="scss" scoped>
	.desc-container{
		width: 718rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 4rpx;
		margin-bottom: 12rpx;
		.detail-box-title{
			font-weight: 600;
			font-size: 24rpx;
			color: #333333;
			margin-bottom: 16rpx;
			box-sizing: border-box;
			padding:24rpx 20rpx 0 20rpx;
		}
		.detail-explain{
			padding:0 20rpx;
			font-weight: 300;
			font-size: 22rpx;
			color: #333333;
			line-height: 32rpx;
		}
		.goods-desc-rule{
			width: 100%;
			height:78rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 20rpx;
			color: #333333;
			margin-bottom: 7rpx;
		}
		.icon-desc-rule{
			width: 17rpx;
			height:17rpx;
			margin-left: 10rpx;
		}
	}
	.explain-drawer {
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		font-size: 22rpx;
		color: #333333;
	}
	.explain-drawer-title{
		margin-bottom: 14rpx;
		font-size: 30rpx;
		color: #333333;
		font-weight:600;
	}
	.explain-drawer-q {
		font-size: 22rpx;
		color: #333333;
		margin-bottom: 6rpx;
	}
	.explain-drawer-text {
		width: 100%;
		font-size: 22rpx;
		color: #7D8288;
		line-height: 38rpx;
		margin-bottom: 50rpx;
	}
	.margin-bootom0{
		margin-bottom: 0;
	}
</style>
