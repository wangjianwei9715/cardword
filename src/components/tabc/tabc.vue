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
		font-size: 28rpx;
		color:#A9ABB4;
	}
	.current{
		font-weight: 600;
		color: #14151A;
		position: relative;
	}
	.current::before{
		width: 37rpx;
		height: 7rpx;
		background: #FB4E3E;
		content: '';
		background-size: 100% 100%;
		position: absolute;
		bottom:18rpx;
		left:50%;
		margin-left:-19rpx;
		border-radius: 3rpx;
	}
	
</style>
