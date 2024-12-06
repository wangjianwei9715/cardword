<!--
 * @FilePath: \jichao_app_2\src\pages\webView\index.vue
 * @Author: wjw
 * @Date: 2022-08-10 11:07:48
 * @LastEditors: 
 * @LastEditTime: 2023-06-05 15:10:51
 * Copyright: 2023 .
 * @Descripttion: 
-->
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
				app.navigateTo.goOrderDetails(this.orderCode,'&waitPay=true',true)
			}
		}
		
	}
</script>

<style lang="scss">
	
</style>
