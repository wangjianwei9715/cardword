<template>
    <view>
        <!-- <view class="drawer-shadow" @click.prevent="onClickCloseDrawer"></view> -->
        <view class="drawer-content" :class="{'show-drawer':showDrawer}">
            <view class="drawer-center">
                
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
    }
    .drawer-content{
		position: fixed;
		bottom:0;
		left:0;
		height:50%;
		width: 100%;
		background:#fff;
		z-index: 99999;
		box-sizing: border-box;
		transition: all 0.3s linear;
		-webkit-transition: -webkit-transform 0.3s;
		border-radius: 24rpx 24rpx 0px 0px;
		transform: translateY(100%);
	}
	.show-drawer{
		transform: translateY(0);
	}
</style>
