<template>
	<view class="bottom-tips">
		<view class="bottom-tips-content" :style="'transform:translateY(-'+marginHeight+'rpx)'">
			<view class="bottom-tips-index" v-for="item in tipsData" :key="item.id">
				<image class="bottom-tips-img" :src="item.avatar!=''?decodeURIComponent(item.avatar):defaultAvatar" mode="aspectFit"></image>
				<view class="bottom-tips-desc">{{setTime(item.time)}}加入拼团*{{item.num}}</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		tipsData:any;

		scrollNum = 0;
		dataLength = 0;
		defaultAvatar = app.defaultAvatar
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
			},4000);
		}
		tipsScroll(){
			this.marginHeight+= 64
		}
		setTime(time:any){
			let newDate:any = new Date;
			let date = Date.parse(newDate)/1000 - time;
			if(date>300){
				return '5分钟前'
			}else if(date<60){
				return date+'秒前'
			}else{
				let num = Math.floor(date/60);
				return num+'分钟前'
			}
		}

	}
</script>

<style lang="scss">
	.bottom-tips{
		width: 500rpx;
		height:56rpx;
		position: fixed;
		box-sizing: border-box;
		left:32rpx;
		bottom:130rpx;
		z-index: 9;
		overflow: hidden;
		&-content{
			width: 500rpx;
			transition: all 0.2s linear;
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
			padding-right: 20rpx;
		}
	}
</style>
