<template>
	<view class="corporate-index">
		<image class="corporate-img" src="../../static/userinfo/corporate.jpg"></image>
	</view>
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		
		onLoad(query:any) {
			
		}
	}
</script>

<style>
	.corporate-index{
		width: 100%;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		padding-top: 50rpx;
	}
	.corporate-img{
		width:700rpx;
		height:508.375rpx;
	}
</style>
