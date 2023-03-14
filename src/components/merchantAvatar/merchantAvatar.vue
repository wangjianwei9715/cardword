<!--
 * @FilePath: \jichao_app_2\src\components\merchantAvatar\merchantAvatar.vue
 * @Author: wjw
 * @Date: 2023-03-14 09:46:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-03-14 10:43:54
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
    <view class="logo-box" 
		:style="{
			width,
			height
		}"
	>
		<muqian-lazyLoad 
			:style="{
				width,
				height
			}"
			v-if="src!=''"
			:src="src"
			:borderRadius="borderRadius"
		></muqian-lazyLoad>
		<image v-if="level>0" class="avatar-level" :class="MerchantLevel[level].icon"/>
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
	}
	@Component({})
	export default class ClassName extends BaseComponent {
		MerchantLevel = MerchantLevel;
		@Prop({ default: 0 })
		level?:number;
		@Prop({ default: '' })
		src?:string;
		@Prop({ default: '50%' })
		borderRadius?:string
		@Prop({ default: '34rpx' })
		width?:string
		@Prop({ default: '34rpx' })
		height?:string
	}
</script>

<style lang="scss">
    .logo-box {
		margin-right: 10rpx;
		position: relative;
	}
	.avatar-level{
		position: absolute;
		bottom:-4rpx;
		right:-5rpx;
		z-index: 1;
		width: 21rpx;
		height:17rpx;
	}
	.v1{
		background: url(@/static/goods/v2/good_small_v1.png) no-repeat center / 100% 100%;
	}
	.v2{
		background: url(@/static/goods/v2/good_small_v2.png) no-repeat center / 100% 100%;
	}
</style>
