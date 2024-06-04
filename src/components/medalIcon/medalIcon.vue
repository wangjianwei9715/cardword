<!--
 * @FilePath: \jichao_app_2\src\components\medalIcon\medalIcon.vue
 * @Author: wjw
 * @Date: 2024-05-28 09:06:53
 * @LastEditors: 
 * @LastEditTime: 2024-06-04 14:18:11
 * Copyright: 2024 .
 * @Descripttion: 
-->
<template>
	<image class="medal-icon" v-show="src" :src="src" @click="onClickIcon"></image>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:""})
		src:string|undefined;
		@Prop({default:0})
		userId:number|undefined;
		onClickIcon(){
			this.userId && app.navigateTo.goMedalIndex(this.userId)
		}
	}
</script>

<style lang="scss">
	.medal-icon{
		width: 30rpx;
		height:30rpx;
		margin-left: 6rpx;
	}
</style>
