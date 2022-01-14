<template>
	<view class="box-content">
		<view class="box">
			<view class="box-index" :class="['box-index-'+index,drawingIndex==(index+1)?'index-current':'']" v-for="(item,index) in drawingList" :key="index">
				<image class="box-pic" :src="decodeURIComponent(item.pic)"/>
				<view class="reward-name">{{item.name}}</view>
			</view>
			<view class="box-index drawing-btn" :class="{'btning':this.turntableIng}" @click="onClickDrawing">
				<view class="drawing-name">抽一次</view>
				<view class="drawing-text">（1000卡豆）</view>
				<view class="drawing-text">今日剩5次</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		drawingList:any;
		@Prop({default:0})
		rewardId:any;

		drawingIndex = 0;
		//抽奖转盘转动的次数
		drawTimes = 0
		//抽奖按钮点击事件
		turntableIng = false;
		timeoutFnc:any;
		drawTimeoutTime = 50;
		@Watch('rewardId')
		onShowChanged(val: any, oldVal: any){
			if(val>0){
				this.turntableIng = true;
				this.turntableStart(this.rewardId)
			}
			
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			clearInterval(this.timeoutFnc);
			this.$emit('turntableEnd')
		}
		onClickDrawing(){
			if (this.turntableIng) {
				return;
			}
			this.$emit('turntableStart')
			
		}
		// 转盘结束
		turntableEnd(){
			this.drawTimes = 0;
			this.drawTimeoutTime = 50;
			clearInterval(this.timeoutFnc);
		}
		//转盘启动
		turntableStart(num: number) {
			this.timeoutFnc = setTimeout(() => {
				if (this.drawTimes == 6) {
					if (this.drawingIndex < num) {
						this.drawTimeoutTime+=150;
						this.drawingIndex++;
						this.turntableStart(num);
					} else {
						clearInterval(this.timeoutFnc);
						this.turntableIng = false;
						this.turntableEnd();
						this.$emit('turntableEnd')
					}
					return
				}
				if(this.drawTimes == 5){
					this.drawTimeoutTime+=50;
				}
				if (this.drawingIndex < 8) {
					this.drawingIndex++;
				} else {
					this.drawingIndex = 1;
					this.drawTimes++;
				}
				this.turntableStart(num);
			}, this.drawTimeoutTime)
		}
	}
</script>

<style lang="scss">
	.box-content{
		width: 710rpx;
		margin:0 auto;
		padding:20rpx;
		background:#fff;
		border-radius: 20rpx;
		box-sizing: border-box;
	}
	.box{
		width: 670rpx;
		height:670rpx;
		position: relative;
	}
	.box-index{
		width: 210rpx;
		height:210rpx;
		border-radius: 10rpx;
		border:1rpx solid #f2f2f2;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding-top: 20rpx;
	}
	.box-index-0{position: absolute;left:0;top:0;}
	.box-index-1{position: absolute;left:230rpx;top:0;}
	.box-index-2{position: absolute;left:460rpx;top:0;}
	.box-index-3{position: absolute;left:460rpx;top:230rpx;}
	.box-index-4{position: absolute;left:460rpx;top:460rpx;}
	.box-index-5{position: absolute;left:230rpx;top:460rpx;}
	.box-index-6{position: absolute;left:0;top:460rpx;}
	.box-index-7{position: absolute;left:0;top:230rpx;}
	.drawing-btn{
		border:1rpx solid #FB4E3E;
		background:#FB4E3E;
		padding: 45rpx 0;
		position: absolute;
		left:230rpx;
		top:230rpx;
	}
	.drawing-name{
		width: 100%;
		text-align: center;
		font-size:36rpx;
		color:#fff;
	}
	.drawing-text{
		width: 100%;
		text-align: center;
		font-size: 16rpx;
		color:#fff;
		margin-top: 6rpx;
	}
	.box-pic{
		width: 120rpx;
		height:120rpx;
		background:#FB4E3E;
		margin:0 auto;
	}
	.reward-name{
		width: 100%;
		text-align: center;
		color: #1b1b1b;
		font-size: 20rpx;
	}
	.index-current{
		border:1rpx solid #FB4E3E;
	}
	.btning{
		background:#f2f2f2;
		border:1rpx solid #f2f2f2
	}
</style>
