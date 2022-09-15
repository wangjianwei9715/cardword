<template>
	<view class="list">
		<view :class="[{'index':true,'current':tabsCheck==item.id},'index-'+item.id]" v-for="item in tabc" :key="item.id" @click="onClickIndex(item.id)">{{item.name}}</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		tabc:any;
		@Prop({default:1})
		tabsCheck:any;

		// allWidth=0;
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			// this.getWidth()
		}
		destroyed(){
			
		}
		onClickIndex(id:number){
			this.$emit("tabsClick", id);
		}
	}
</script>

<style lang="scss">
	.list{
		width: 100%;
		height:90rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 32rpx;
		position: relative;
	}
	.index{
		height:90rpx;
		line-height: 90rpx;
		font-size: 29rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #959699;
	}
	.current{
		font-size: 33rpx;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		color: #333;
	}
	
	
</style>
