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
		webViewSrc = 'https://im.7x24cc.com/phone_webChat.html?accountId=N000000027186&chatId=63dc183f-fab5-4c5a-b83c-4e60d61305c1&nickName='+app.data.name+'&visitorId='+app.data.userId+'&agentExten=8005';
		orderCode = ''
		onLoad(query:any) {
			// this.webViewSrc = query.url;
		}
	}
</script>

<style lang="scss">
	
</style>
