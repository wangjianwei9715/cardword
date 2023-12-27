<template>
	<view>
		<view id="pageTopContainer" class="navigation-header" :style="{ backgroundColor: `rgba(${navColor},${scrollTopPercent})` }">
			<view class="content" :style="'height:' + statusBarHeight + 'px'"></view>
			<view class="tab-header">
				<view class="icon-back" v-show="showBack" :style="{color:scrollTopPercent>=1?'#333':backColor}" @click="onClickBack">&#xe582;</view>
				<view class="header-title">
					<u-tabs :list="titles" lineHeight="0" :activeStyle="activeStyle" :inactiveStyle="inactiveStyle" itemStyle="height:88rpx;line-height:88rpx;" :current="current" @click="onClickTabs"></u-tabs>
				</view>
				<view class="header-icon" v-if="custom">
					<slot name="right"></slot>
				</view>
				<view class="icon-share" v-else-if='shareData' @click="onClickShare"></view>
				<view class='right-text' v-else @click="onClickRightText">{{ rightText }}</view>
			</view>
			<slot name="bottom"></slot>
		</view>
		<share v-if='shareData' :operationShow="operationShow" :shareData="shareData" @operacancel="onClickShareCancel">
		</share>
	</view>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BaseComponent from "@/base/BaseComponent.vue";
import { app } from "@/app";
@Component({})
export default class navigationbar extends BaseComponent {
	@Prop({ default: [] })
	titles!: string[];
	@Prop({ default: false })
	custom?: Boolean;
	@Prop({ default: true })
	showBack?: Boolean;
	@Prop({ default: false })
	customBack?: Boolean;
	@Prop({ default: '' })
	shareData?: any;
	@Prop({ default: '' })
	rightText?: string;
	@Prop({ default: '#ffffff' })
	backgroundColor?: string;
	@Prop({ default: '1px solid #F4F3F2' })
	borderBottom?:string
	@Prop({ default: '#000' })
	backColor?:string
	@Prop({ default: 0 })
	current!:number
	operationShow = false;
	statusBarHeight = app.statusBarHeight;
	MAX_HEIGHT:any=0;
	scrollTop=0;
	navColor = "255,255,255"
	activeStyle={
		"font-size": "36rpx",
		"font-weight": 600,
		"color":"rgba(255,255,255,0.9)",
	}
	inactiveStyle={
		"font-size": "32rpx",
		"font-weight": 400,
		"color":"rgba(255,255,255,0.6)",
	}
	created() {//在实例创建完成后被立即调用
	}
	mounted() {//挂载到实例上去之后调用
		this.$nextTick(() => {
			uni.createSelectorQuery()
				.select('#pageTopContainer')
				.boundingClientRect((rect) => {
					this.MAX_HEIGHT = rect.height
					this.$emit('getNavHeight', rect.height)
				})
				.exec();
		})
	}
	destroyed() {

	}
	public get scrollTopPercent() {
		return this.scrollTop / (this.MAX_HEIGHT.toFixed(2) * 1.4)
	}
	public get opacityStyle() {
		return {
			opacity: this.scrollTopPercent>1 ? 1 : this.scrollTopPercent
		}
	}
	setPageScroll(scroll:any) {
		this.scrollTop = scroll.scrollTop
		if(this.scrollTopPercent>=1){
			this.activeStyle.color = "#333"
			this.inactiveStyle.color = "#333"
		}else{
			this.activeStyle.color = "rgba(255,255,255,0.9)"
			this.inactiveStyle.color = "rgba(255,255,255,0.9)"
		}
	}
	onClickBack() {
		if(this.customBack){
			this.$emit("back")
			return;
		}
		app.platform.pageBack()
	}
	// 分享
	onClickShare() {
		if (!this.operationShow) {
			this.operationShow = true
		}
	}
	onClickShareCancel() {
		this.operationShow = false
	}
	onClickRightText() {
		this.$emit('onClickRightText')
	}
	onClickTabs(e:any){
		this.$emit('tabsClisk',e)
	}
}
</script>

<style lang="scss">
.navigation-header {
	width: 100%;
	background: #fff;
	position: fixed;
	left: 0;
	top: 0;
	box-sizing: border-box;
	z-index: 20;
	.tab-header {
		width: 100%;
		height: 88rpx;
		display: flex;
		box-sizing: border-box;
		padding: 0 30rpx;
		position: relative;
		z-index: 10;
		align-items: center;
		justify-content: center;
	}

	.icon-back {
		position: absolute;
		left: 18rpx;
		top: 50%;
		margin-top: -25rpx;
		width: 50rpx;
		height: 50rpx;
		background-color: rgba(255, 255, 255,0);
		font-family: uniicons;
		font-size: 46rpx;
		font-weight: normal;
		font-style: normal;
		color: #000;
	}

	.header-title {
		height: 88rpx;
		line-height: 80rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
	}

	.icon-share {
		width: 38rpx;
		height: 37rpx;
		position: absolute;
		right: 32rpx;
		top: 50%;
		margin-top: -19rpx;
		background: url(../../static/goods/v2/icon_share.png) no-repeat center;
		background-size: 100% 100%;
	}

	.right-text {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		position: absolute;
		right: 32rpx;
	}

	.header-icon {
		height: 88rpx;
		display: flex;
		align-items: center;
		position: absolute;
		right: 40rpx;
		top: 0;
	}
}</style>
