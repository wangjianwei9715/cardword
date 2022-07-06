<template>
	<view class="content">
		<view class="anchor-navigation"></view>

		<view class="anchor-center">
			<!-- 卡片拖动控件 -->
			<movable-area class="movable-area">
				<movable-view
					class="movable-content"
					:class="{ 'end-pic': index < stepIndex}"
					v-for="(item, index) in picData"
					:key="index"
					:animation="false"
					@change="onChangeMovable"
					direction="all"
					:x="moveData.xe"
					:y="moveData.ye"
					:style="'z-index:' + (999 - index)"
				>
				<view v-if="index == 0" class="movable-box dangban" @touchstart.prevent="picTouchStart" @touchend.prevent="picTouchEnd"  ></view>
				</movable-view>
			</movable-area>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		picData = [
			''
		]
		totalNum = 0;
		stepIndex = 0;
		index = 0;
		moveData = {
			x:'',
			y:'',
			xe:'1000rpx',
			ye:'650rpx',
		}
		onLoad(query:any) {
			setTimeout(()=>{
				plus.screen.lockOrientation('landscape-primary')
			},500)
			
			uni.getSystemInfo({
				success: (res) => {
					// 根据 model 进行判断
					uni.getSystemInfo({
					success: (res:any) => {
						console.log('system=',res)
					},
					fail(err) {
						console.error(err);
					},
					});
				},
			});
			
		}
		initEven(){
			let params = {
				pageIndex:1,
				pageSize:10
			}
			app.http.Get('my/cuoka/home',params,(res:any)=>{
				console.log(res)
			})
		}
		onUnload() {
			plus.screen.lockOrientation('portrait-primary')
		}
		picTouchStart() {
			console.log('e1=')
		}
		picTouchEnd() {
			console.log('e2=')
		}
		onChangeMovable(event: any) {
			// 获取拖拽坐标
			console.log('eve=',event)
		}
	}
</script>

<style lang="scss" scoped>
	.anchor-navigation{
		width: 100%;
		height:100rpx;
		background:#fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.content{
		width: 100%;
		height:750rpx;
		background:#363433;
		position: fixed;
		left:0;
		top:0;
		right:0;
		display: block;
	}
	
	.anchor-center{
		width: 100%;
		height:650rpx;
		display: flex;
		.movable-area {
			position: fixed;
			left: 0;
			top: -500rpx;
			width: 100%;
			height: 1750rpx;
			pointer-events: none;
			z-index: 100;
		}
		.movable-content {
			pointer-events: auto;
			width: 320rpx;
			height: 500rpx;
		}
		.movable-box {
			width: 320rpx;
			height: 500rpx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.dangban {
			background: url("../../static/goods/drawcard/card_dangban.png") no-repeat center;
			background-size: 100% 100%;
		}
	}
</style>
