<template>
	<view class="content">
		

		<!-- 规则弹窗 -->
		<rulePopup :showRulePopup="showRulePopup" @cancelRulePopup="onClickCancelRulePopup"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		showRulePopup = false;
		onLoad(query:any) {
			
		}
		onShow(){
			
		}
		onClickCancelRulePopup(){
			this.showRulePopup = false;
		}

	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#F4F5F9
	}
</style>
