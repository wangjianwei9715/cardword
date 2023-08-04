<template>
    <view v-if="level>0" class="vip-box" :class="merchantLevelItem['icon']">
		<view class="vip-box-name">{{merchantLevelItem['name']}}</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue, } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { MerchantLevel } from "@/tools/DataExchange"
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({ default: 0 })
		level!:number;
		
		public get merchantLevelItem() : any {
			return MerchantLevel[this.level] ?? {level:'',name:'',icon:''}
		}
		
	}
</script>

<style lang="scss">
    .vip-box{
		width: 133rpx;
		height:29rpx;
		margin-left:13rpx;
		position: relative;		
	}
	.vip-box-name{
		position: absolute;
		left:0;
		top:0;
		z-index: 1;
		width: 133rpx;
		height:29rpx;
		font-size: 21rpx;
		font-family: YouSheBiaoTiHei;
		font-weight: 400;
		font-style: italic;
		line-height: 29rpx;
		box-sizing: border-box;
		padding-left: 46rpx;
	}
	.v1{
		background: url(@/static/goods/v2/good_v1.png) no-repeat center / 100% 100%;
	}
	.v2{
		background: url(@/static/goods/v2/good_v2.png) no-repeat center / 100% 100%;
	}
	.v1 .vip-box-name{
		color: #FFFFFF;
	}
	.v2 .vip-box-name{
		background: linear-gradient(111deg, #95855C 0%, #F1F1C4 25.2685546875%, #B4AB80 67.96875%, #F1F1C4 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
