<template>
	<view class="box-content">
		<view class="box">
			<view class="box-index" :class="['box-index-'+index,drawingIndex==(index+1)?'index-current':'']" v-for="(item,index) in drawingList" :key="index">
				<image class="box-pic" mode="aspectFit" :src="decodeURIComponent(item.logo)"/>
				<view class="reward-name">{{item.name}}</view>
			</view>
			<button class="box-index drawing-btn" :class="{'btning':this.turntableIng||luckydrawNum==0}"  @click="onClickDrawing">
				<view class="drawing-name"></view>
				<view class="drawing-text">（{{luckydrawPrice}}卡豆）</view>
				<view class="drawing-text">今日剩{{luckydrawNum}}次</view>
			</button>
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
		@Prop({default:0})
		luckydrawPrice:any;
		@Prop({default:0})
		luckydrawNum:any;

		// 转盘转动index
		drawingIndex = 0;
		//抽奖转盘转动的次数
		drawTimes = 0
		turntableIng = false;
		//抽奖按钮点击事件
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
		}
		onClickDrawing(){
			if (this.turntableIng || this.luckydrawNum<=0) {
				return;
			}
			this.$emit('turntableStart')
			
		}
		// 转盘结束
		turntableEnd(){
			this.drawTimes = 0;
			this.drawTimeoutTime = 50;
			setTimeout(()=>{
				this.turntableIng = false;
			},1000)
			clearInterval(this.timeoutFnc);
		}

		//转盘启动
		turntableStart(num: number) {
			this.timeoutFnc = setTimeout(() => {
				if (this.drawTimes == 6) {
					if (this.drawingIndex < num) {
						this.drawTimeoutTime+=50;
						this.drawingIndex++;
						this.turntableStart(num);
					} else {
						clearInterval(this.timeoutFnc);
						
						this.turntableEnd();
						this.$emit('turntableEnd')
					}
					return
				}
				if(this.drawTimes == 5){
					this.drawTimeoutTime+=30;
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
		padding:30rpx 25rpx;
		background:#fff;
		border-radius: 20rpx;
		box-sizing: border-box;
	}
	.box{
		width: 660rpx;
		height:650rpx;
		position: relative;
	}
	.box-index{
		width: 202rpx;
		height:197rpx;
		border-radius: 10rpx;
		border:1px solid #f2f2f2;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding-top: 20rpx;
	}
	.box-index-0{position: absolute;left:0;top:0;}
	.box-index-1{position: absolute;left:229rpx;top:0;}
	.box-index-2{position: absolute;left:458rpx;top:0;}
	.box-index-3{position: absolute;left:458rpx;top:227rpx;}
	.box-index-4{position: absolute;left:458rpx;top:454rpx;}
	.box-index-5{position: absolute;left:229rpx;top:454rpx;}
	.box-index-6{position: absolute;left:0;top:454rpx;}
	.box-index-7{position: absolute;left:0;top:227rpx;}
	.drawing-btn{
		border:1px solid #FB4E3E;
		background:#FB4E3E;
		padding: 55rpx 0;
		position: absolute;
		left:230rpx;
		top:230rpx;
	}
	.drawing-name{
		width: 171rpx;
		height:41rpx;
		background:url(../../pages/act/static/sign/luck_btn.png) no-repeat center;
		background-size: 100% 100%;
	}
	.drawing-text{
		width: 100%;
		text-align: center;
		font-size: 20rpx;
		color:#fff;
		margin-top: 6rpx;
	}
	.box-pic{
		width: 105rpx;
		height:120rpx;
		margin:0 auto;
	}
	.reward-name{
		width: 100%;
		text-align: center;
		color: #4A4A4A;
		font-size: 22rpx;
	}
	.index-current{
		border:1px solid #FB4E3E;
	}
	.btning{
		background:#8c8b8b;
		border:1px solid #8c8b8b
	}
</style>
