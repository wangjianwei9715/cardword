<template>
	<view>
		<web-view :src="webViewSrc"></web-view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		webViewSrc = '';
		orderCode = ''
		onLoad(query:any) {
			this.webViewSrc = query.url;
			this.orderCode = query.orderCode || ''
			console.log('this.webViewSrc=',this.webViewSrc)
		}
		onHide(){
			if(this.orderCode != ''){
				uni.redirectTo({
					url: "/pages/userinfo/order_details?code=" + this.orderCode + "&waitPay=true",
				});
			}
		}
		
	}
</script>

<style lang="scss">
	
</style>
