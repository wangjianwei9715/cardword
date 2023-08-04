<template>
    <view v-if="level>0" class="vip-box" :class="MerchantLevel[level].icon">
		<view class="vip-box-name">{{MerchantLevel[level].name||''}}</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue, } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	const MerchantLevel = {
		0:{level:'L1',name:'',icon:''},
		1:{level:'V1',name:'星耀商家',icon:'v1'},
		2:{level:'V2',name:'星耀商家',icon:'v1'},
		3:{level:'V3',name:'星耀商家',icon:'v1'},
		4:{level:'V4',name:'荣耀商家',icon:'v2'},
		5:{level:'V5',name:'荣耀商家',icon:'v2'},
		6:{level:'V6',name:'荣耀商家',icon:'v2'},
		7:{level:'V7',name:'荣耀商家',icon:'v2'},
	}
	@Component({})
	export default class ClassName extends BaseComponent {
		MerchantLevel = MerchantLevel;
		@Prop({ default: 0 })
		level?:number;
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
