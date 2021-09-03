<template>
	<view style="width: 100%;">
		<view class="status-bar" :style="'height:'+statusBarHeight+'px'"/>
		<view v-if="isShow" class="self-nav" :style="'top:'+statusBarHeight+'px'">
			<button v-if="isShowBack" @click="onClickNavigateBack" class="btn-back" :style="'color:'+titleColor+';'">&#xe582;</button>
			<view class="title" :style="'color:'+titleColor+';'">{{title}}</view>
			<button v-if="isShowRightBtn" class="right-text" :style="'color:'+rightColor+';font-size:'+rightFont+'px;'"
				@click="onClickRightBtn()">{{rightText}}
			</button>
		</view>
		<view class="status-bar-empty"  :style="'padding-top:'+statusBarHeight+'rpx'"></view>
		<view v-if="isShow" class="nav-empty"/>
	</view>
</template>

<script lang="js">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	@Component({})
	export default class navigationbar extends BaseComponent {
		@Prop({ default: '#3C3C3C' })
		titleColor!: string;
		@Prop({ default: '' })
		title!: string;
		@Prop({ default: '' })
		rightText!: string;
		@Prop({ default: true })
		isShowBack!: boolean;
		@Prop({ default: true })
		isShow!: boolean;
		@Prop({ default: false })
		isShowRightBtn!: boolean;
		@Prop({ default: '#3C3C3C' })
		rightColor!: string;
		@Prop({ default: '22' })
		rightFont!: string;
		
		statusBarHeight = app.statusBarHeight;
		created(){//在实例创建完成后被立即调用
			console.log(this.statusBarHeight)
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickNavigateBack(){
			uni.navigateBack({})
		}
		onClickRightBtn(){
			this.$emit("navclick");
		}
		
	}
</script>

<style>
	.status-bar{
		width: 100%;
		position:fixed;
		top: 0;
		z-index: 99;
	}
	.status-bar-empty{
		width: 100%;
		height:auto;
		position:relative;
		z-index: 0;
		display: flex;
		align-items: center;
	}
	.nav-empty{
		width: 100%;
		height:88rpx;
		position:relative;
		z-index: 0;
		display: flex;
		align-items: center;
	}
	.self-nav{
		width: 100%;
		height:88rpx;
		position:fixed;
		z-index: 99;
		display: flex;
		align-items: center;
	}
	.btn-back {
		height: 40px;
		background:rgba(0, 0, 0, 0);
		position: absolute;
		left: 0;
		padding: 0 8px;
		box-sizing: border-box;

		font-family: uniicons;
		font-size: 23px;
		font-weight: normal;
		font-style: normal;
		line-height: 40px;
		color: #3C3C3C;
	}
	.title{
		height: 40px;
		font-size: 16px;
		color: #3C3C3C;
		line-height: 40px;
		margin: auto;
		font-family: HYQiHei;
		font-weight: bold;
	}
	.right-text{
		height: 40px;
		background:rgba(0, 0, 0, 0);
		position: absolute;
		right:0;
		padding: 0 8px;
		box-sizing: border-box;

		font-family: HYQiHei;
		font-weight: bold;
		font-style: normal;
		font-size: 22px;
		color: #3C3C3C;
		line-height: 40px;
	}
</style>
