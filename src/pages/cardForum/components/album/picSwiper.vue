<template>
	<view class="swiper-box">
		
	</view>
</template>

<script lang="ts">
	import { Component, Prop} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	const MaxPic = 81;
	const OnGridPic = 7;
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		picList!:any[];

		mounted(){
			
		}
	}
</script>

<style lang="scss">
.swiper-box{
	width: 100%;
	margin-bottom: 42rpx;
	
}
</style>
