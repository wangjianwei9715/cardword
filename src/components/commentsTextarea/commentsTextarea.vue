<template>
	<view class="content" v-show="focus" @touchmove.stop.prevent="move">
		<view class="input-box" v-show="focus" :style="{transform:`translateY(-${textareaData.height}px)`,'transition-duration': textareaData.duration+'s'}">
			<textarea class="input" v-model="textareaData.val" placeholder="说点什么..." :focus="focus" :adjust-position="false" @blur="show=false" @keyboardheightchange="getHeight"/>
			<view class="btn" @click="$u.throttle(onClickChatConfirm,1000)">发送</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, PropSync,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	const textareaData = {
		val:'',
		height:0,
		duration:0
	}
	@Component({})
	export default class ClassName extends BaseComponent {
		@PropSync("focus", {
            type: Boolean
        })
        show!: Boolean;
		textareaData = {...textareaData}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		move(){

		}
		onClickChatConfirm(){
			this.$emit('chatConfirm',this.textareaData.val)
			this.textareaData = {...textareaData}
		}
		getHeight(event:any){
			this.textareaData.height = event.detail.height;
			this.textareaData.duration = event.detail.duration;
		}
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		height:100%;
		position: fixed;
		left:0;
		top:0;
		overflow: hidden;
	}
	.input-box{
		width: 100%;
		height:130rpx;
		position: fixed;
		bottom:0;
		left:0;
		background:#fff;
		box-sizing: border-box;
		padding:0 40rpx;
		z-index: 99;
		transition-property: transform;
		transition-delay: 0s;
		transition-timing-function: linear;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.input{
			width: 520rpx;
			height:90rpx;
			background: #EFEFEF;
			border-radius: 3rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #88878C;
			box-sizing: border-box;
			padding:10rpx 20rpx;
		}
		.btn{
			width: 140rpx;
			height:60rpx;
			text-align: center;
			line-height: 60rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			background-image: linear-gradient(to bottom, #ef3333, #eb6141);
			border-radius: 40rpx;
			color:#fff
		}
	}
</style>
