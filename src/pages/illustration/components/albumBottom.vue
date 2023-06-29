<template>
	<view class="album-bottom">
		<view class="left" @click="onClickSave">
			<view class="icon-save"></view>
			<view class="msg">存草稿</view>
		</view>
		<view class="btn" :class="{'btn-red':canNext}" @click="onClickNext">
			下一步
			<view class="percent" v-show="step==2">当前收集进度{{percent}}%</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import muqianLazyLoad from "@/components/muqian-lazyLoad/muqian-lazyLoad.vue";
	import { storageDraft } from '@/pages/cardForum/func/index'
	@Component({ components: { muqianLazyLoad },})
	export default class ClassName extends BaseComponent {
		@Prop({default:false})
		canNext!:boolean
		@Prop({default:1})
		step!:number
		@Prop({default:0})
		percent!:number
		@Prop({default:[]})
		data!:any
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickNext(){
			if(!this.canNext) return;
			this.$emit('next');
		}
		onClickSave(){
			if(!this.canNext) return;
			uni.showModal({
                content: '确认保存至草稿箱吗?',
                success: (res: any) => {
                    if (res.confirm){
						storageDraft({step:this.step,data:this.data},"cardBook");
						uni.showToast({ title:"草稿保存成功",icon:"none" });
						uni.switchTab({ url: '/pages/index/userinfo' });
					}
                }
            })
		}
	}
</script>

<style lang="scss">
.album-bottom{
	width: 100%;
	height:calc(159rpx + env(safe-area-inset-bottom));
	position: fixed;
	bottom: 0;
	left: 0;
	background:#000000;
	z-index: 8;
	box-sizing: border-box;
	padding: 33rpx 20rpx 0 20rpx;
	border-top: 1px solid #000000;
	display: flex;
	justify-content: space-between;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	.left{
		width: 100rpx;
		height:92rpx;
		box-sizing: border-box;
		padding-top: 8rpx;
		.icon-save{
			width: 48rpx;
			height:48rpx;
			background: url(@/static/illustration/album/icon_save.png) no-repeat center/ 100% 100%;
			margin:0 auto;
			margin-bottom: 4rpx;
		}
		.msg{
			width: 100%;
			text-align: center;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #C0C0C0;
		}
	}
	.btn{
		width: 575rpx;
		height: 92rpx;
		background: #C0C0C0;
		border-radius: 5rpx;
		font-size: 33rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding:10rpx 0;
		.percent{
			width: 100%;
			text-align: center;
			font-size: 20rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
	.btn-red{
		background: #FA1545 !important;
	}
}
</style>
