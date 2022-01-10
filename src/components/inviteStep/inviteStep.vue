<template>
	<view class="step">
		<view class="banner" :class="{'goods-step':goodsStep}">
			<view class="copy" @click="onClickCopy">复制链接</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		goodsStep!:boolean;

		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickCopy(){
			uni.setClipboardData({
				data: 'http://www.ka-world.com/yidong/',
				showToast:false,
				success: ()=> {
					uni.showToast({
						title:'复制成功',
						icon:'none'
					})
				}
			});
		}
	}
</script>

<style lang="scss">
	.step{
		width: 100%;
		box-sizing: border-box;
	}
	.banner{
		width: 700rpx;
		height:134rpx;
		background:url(../../pages/act/static/invite/step.png) no-repeat center;
		background-size: 100% 100%;
		position: relative;
		margin:0 auto;
		margin-bottom: 20rpx;
	}
	.goods-step{
		width: 710rpx;
		height:136rpx;
		background:url(../../pages/act/static/invite/step1.png) no-repeat center;
		background-size: 100% 100%;
	}
	.copy{
		font-size: 16rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		text-decoration: underline;
		color: #FFF000;
		position: absolute;
		left:26rpx;
		bottom:8rpx
	}
</style>
