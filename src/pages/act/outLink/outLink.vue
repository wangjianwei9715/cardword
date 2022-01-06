<template>
	<view class="content">
		<view>
			<web-view :src="webViewUrl"></web-view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		webViewUrl = '';
		onLoad(query:any) {
			this.webViewUrl = query.url
			
		}
	}
</script>

<style>

</style>
