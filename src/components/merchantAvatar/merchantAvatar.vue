<template>
    <view class="logo-box" :style="{ width, height }" >
		<muqian-lazyLoad 
			:style="{ width, height }"
			v-if="src!=''"
			:src="src"
			:borderRadius="borderRadius"
		></muqian-lazyLoad>
		<image v-if="level>0" class="avatar-level" :class="merchantLevelItem['icon']"/>
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
		@Prop({ default: '' })
		src?:string;
		@Prop({ default: '50%' })
		borderRadius?:string
		@Prop({ default: '34rpx' })
		width?:string
		@Prop({ default: '34rpx' })
		height?:string

		public get merchantLevelItem() : any {
			return MerchantLevel[this.level] ?? {level:'',name:'',icon:''}
		}
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
