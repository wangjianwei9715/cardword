<!--
 * @FilePath: \jichao_app_2\src\pages\userinfo\locker\index.vue
 * @Author: wjw
 * @Date: 2023-05-09 10:42:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-05-09 11:07:55
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="content">
		<navigator :url="'/pages/userinfo/locker/fancy'" hover-class="none">
			<view class="box-index">
			</view>
        </navigator>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		cardNum = 0;
		onLoad(query:any) {
			this.initEven()
		}
		initEven() {
			app.http.Get('me/cabinet',{},(res:any)=>{
				this.cardNum = res.data.cardNum;
			})
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#F6F7F8;
	}
	.box-index{
		width: 710rpx;
		height:200rpx;
		border-radius: 5rpx;
		background: #fff;
		margin:20rpx auto;
	}
</style>
