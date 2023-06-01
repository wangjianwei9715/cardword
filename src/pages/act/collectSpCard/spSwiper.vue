<template>
	<view class="banner-container">
		<view class="swiper-icon">1</view>
		<swiper
			:style="{ width: '100vw', height: '150rpx' }"
			:current="swiperCurrent"
			:circular="true"
			previous-margin="310rpx"
			next-margin="310rpx"
			@change="changeSwiperIndex"
		>
			<swiper-item v-for="(item, i) in list" :key="i">
				<view class="swiper-box" @click="changeSwiperIndex({detail:{current:i}})">
					<image class="swiper-pic" :class="{'current-pic':i!==current}" :src="item.pic"/>
					<view class="swiper-desc">{{item.num1}}/{{item.num2}}</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue ,PropSync} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		list!:any[]
		@PropSync("current",{
			type:Number
		}) swiperCurrent!: Number;
		created(){
		}
		mounted(){
		}
		destroyed(){
		}
		changeSwiperIndex(e:any){
			if(this.swiperCurrent===e.detail.current) return;
			this.swiperCurrent = e.detail.current;
			this.$emit('change');
		}
    
	}
</script>

<style lang="scss" scoped>
	.swiper-box{
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.swiper-icon{
		width: 100%;
		display: flex;
		justify-content: center
	}
	.swiper-pic{
		width: 100rpx;
		height:100rpx;
		transition: all 0.3s;
	}
	.current-pic{
		transform: scale(0.9);
	}
	.swiper-desc{
		margin-top: 10rpx;
		text-align: center;
	}
</style>
