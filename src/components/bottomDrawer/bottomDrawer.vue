<template>
    <view>
        <view class="drawer-shadow" v-show="showDrawer" @click="onClickCloseDrawer"></view>
        <view class="drawer-content" :class="{'show-drawer':showDrawer}" :style="'height:'+height+'%'">
			<view class="drawer-header">
				{{title}}
				<view class="close-icon" @click="onClickCloseDrawer"></view>
			</view>
            <view class="drawer-center">
                <slot></slot>
            </view>
        </view>
    </view>
	
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({ default: false })
		showDrawer:boolean|undefined;
		@Prop({ default: '' })
		title!:string;
		@Prop({ default: 60 })
		height!:number;
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
        onClickCloseDrawer(){
            this.$emit("closeDrawer");
        }
	
	}
</script>

<style lang="scss">
    .drawer-shadow{
        position: fixed;
		top:0;
		left:0;
		height:100%;
		width: 100%;
        z-index:99998;
		background:rgba(0,0,0,0.5)
    }
    .drawer-content{
		position: fixed;
		bottom:0;
		left:0;
		height:60%;
		width: 100%;
		background:#fff;
		z-index: 99999;
		box-sizing: border-box;
		transition: all 0.3s linear;
		-webkit-transition: -webkit-transform 0.3s;
		border-radius: 5rpx 5rpx 0px 0px;
		transform: translateY(100%);
	}
	.show-drawer{
		transform: translateY(0);
	}
	.drawer-header{
		width: 100%;
		height:100rpx;
		position: absolute;
		top:0;
		left:0;
		background:#fff;
		font-size: 42rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #333333;
		z-index: 3;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5rpx 5rpx 0px 0px;
	}
	.black-line{
		width: 25%;
		height:10rpx;
		background:#000;
		border-radius: 40rpx;
	}
	.drawer-center{
		width: 100%;
		height:100%;
		box-sizing: border-box;
		padding:100rpx 40rpx 30rpx 40rpx;
		overflow-y: auto;
	}
	.close-icon{
		width: 29rpx;
		height:27rpx;
		background:url(../../static/goods/v2/icon_close.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		right:23rpx;
		top:23rpx;
	}
</style>
