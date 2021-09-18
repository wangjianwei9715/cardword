<template>
	<view class="bottom-tips">
		<view class="bottom-tips-content" :style="'margin-top:-'+marginHeight+'rpx'">
			<view class="bottom-tips-index" v-for="item in tipsData" :key="item.id">
				<image class="bottom-tips-img" :src="item.img" mode="aspectFit"></image>
				<view class="bottom-tips-desc">{{item.desc}}</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		tipsData:any;

		scrollNum = 0;
		dataLength = 0;
		tipsInter:any;
		marginHeight = 0;
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			this.tipsInterval()
		}
		destroyed(){
			clearInterval(this.tipsInter)
		}
		tipsInterval(){
			this.dataLength = this.tipsData.length;
			this.tipsInter=setInterval(()=>{
				if(this.dataLength>this.scrollNum){
					this.scrollNum ++;
					this.tipsScroll()
					console.log('scrollssssss')
				}else{
					clearInterval(this.tipsInter)
				}
			},5000);
		}
		tipsScroll(){
			this.marginHeight+= 64
		}

	}
</script>

<style lang="scss">
	.bottom-tips{
		width: 300rpx;
		height:56rpx;
		position: fixed;
		box-sizing: border-box;
		left:32rpx;
		bottom:130rpx;
		z-index: 9;
		overflow: hidden;
		&-content{
			width: 300rpx;
			transition: all 0.5s linear;
			box-sizing: border-box;
			display:flex;
			align-items: flex-start;
			flex-wrap: wrap;
		}
		&-index{
			height: 56rpx;
			background: rgba(0, 0, 0, 0.5);
			border-radius: 30rpx;
			box-sizing: border-box;
			padding:0 8rpx;
			display: flex;
			align-items: center;
			margin-bottom: 8rpx;
		}
		&-img{
			width: 40rpx;
			height:40rpx;
			box-sizing: border-box;
			border: 1px solid #FFFFFF;
			border-radius: 50%;
			margin-right: 12rpx;
		}
		&-desc{
			height:56rpx;
			line-height: 56rpx;
			font-size: 22rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
</style>
