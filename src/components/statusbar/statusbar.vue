<template>
	<!-- #ifndef MP-WEIXIN -->
	<view class="content" :style="'height:'+statusBarHeight+'px'"></view>
	<!-- #endif -->
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		statusBarHeight = app.statusBarHeight

		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用

		}
		destroyed(){
			
		}
	}
</script>

<style>
	.content{
		width:100%;
		position: relative;
		z-index: 1;
	}
</style>
