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
		initSrc= 'https://im.7x24cc.com/phone_webChat.html?accountId=N000000027186&chatId=63dc183f-fab5-4c5a-b83c-4e60d61305c1&nickName='+app.data.name+'&visitorId='+app.data.userId
		webViewSrc = '';
		onLoad(query:any) {
			if(query.url_params){
				let data = JSON.parse(query.url_params)
				let params = ''
				for(let key in data){
					params += `&${key}=${data[key]}`;
				}
				this.webViewSrc = this.initSrc + params;
				console.log(this.webViewSrc)
			}
			
		}
	}
</script>

<style lang="scss">
	
</style>
