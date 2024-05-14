<template>
	<image class="medal-icon" :src="src" @click="onClickIcon"></image>
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
