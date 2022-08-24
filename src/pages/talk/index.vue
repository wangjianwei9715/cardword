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
		initSrc= 'https://im4d0f274.7x24cc.com/phone_webChat.html?accountId=N000000035398&chatId=72922694-f42a-4dad-a27f-36fa2d9ab641&nickName='+app.data.name+'&visitorId='+app.data.userId
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
