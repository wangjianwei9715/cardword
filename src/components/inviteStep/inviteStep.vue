<template>
	<view class="step">
		<view class="banner" :class="{'goods-step':goodsStep}">
			<view class="index" :class="{'index-step':goodsStep}" v-for="(item,index) in stepData" :key="index">
				<view class="index-text">{{item.top}}</view>
				<view class="index-text">{{item.bottom}}</view>
			</view>
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

		stepData = [
			{top:'邀请新人',bottom:'下载注册'},
			{top:'分享口令',bottom:'给新人'},
			{top:'新人复制口令',bottom:'打开APP'},
			{top:'上组成功',bottom:''},
		]
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
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 15rpx;
		padding-top:63rpx;
		
	}
	.goods-step{
		width: 711rpx;
		height:134rpx;
		background:url(../../pages/act/static/invite/step1.png) no-repeat center;
		background-size: 100% 100%;
	}
	.index:nth-child(2){
		margin-left: 20rpx;
	}
	.index:nth-child(3){
		margin-left: 40rpx;
	}
	.index-text{
		font-size: 20rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		margin-top: -5rpx;
	}
	.index-step .index-text{
		color:#5C4147;
	}
	.index-step:nth-child(2){
		margin-left: 30rpx;
	}
	.index-step:nth-child(3){
		margin-left:0;
		margin-right: 10rpx;
	}
	
</style>
