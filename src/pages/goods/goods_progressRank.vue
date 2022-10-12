<template>
	<view class="content">
        <view class="topBanner"></view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {

		onLoad(query:any) {
			
		}
        onReachBottom(){

        }
        onPulldDownRefresh(){
            
        }

	}
</script>

<style lang="scss">
.topBanner{
    width: 750rpx;
    height: 350rpx;
    background-size: 100% 100%;
    background-image: url('../../static/goods/v2/progressRank.png');
}
</style>
