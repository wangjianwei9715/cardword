<template>
	<view class="content">
		<view class="tab-header">
			<searchinput :searchText="'搜索商品'" @clicksearch="onClickSearch()"></searchinput>
		</view>
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

</style>
