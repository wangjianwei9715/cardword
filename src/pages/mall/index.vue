<template>
	<view class="content">
		


		<!-- 弹窗 -->
		<mallPopup :showPopup="showPopup" :awardData="awardData" :popupStep="popupStep" @popupClose="showPopup=false" @popupConfirm="onClickExConfirm"></mallPopup>
		<!-- 规则 -->
		<bottomDrawer :showDrawer="showDrawer" :title="'兑换规则'" @closeDrawer="showDrawer=false">
			<view class="drawer-box" v-for="(item,index) in mallExchangeRule" :key="index">
				<view class="drawer-help" v-html="item.content"></view>
			</view>
    	</bottomDrawer>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	import { mallExchangeRule } from "@/net/DataRules";
	@Component({})
	export default class ClassName extends BaseNode {
		showPopup = true;
		popupStep = 1;
		awardData = {
			pic:'',
			price:12000
		};
		showDrawer = false;
		mallExchangeRule = mallExchangeRule;
		onLoad(query:any) {
			if(app.token.accessToken == ''){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}
			
		}
		onShow(){
			
		}
		onClickExConfirm(){
			this.popupStep = 2;
		}
		
	}
</script>

<style lang="scss">
	
	.drawer-box{
		width: 100%;
		box-sizing: border-box;
	}
	.drawer-help{
		width: 100%;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #7D8288;
		line-height: 38rpx;
		margin-bottom: 50rpx;
	}
</style>
