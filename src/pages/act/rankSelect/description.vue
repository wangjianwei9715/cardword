<template>
	<view class="content">
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
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
page {
    background: $content-bg;
    width: 750rpx;
    overflow-x: hidden;
}
</style>
