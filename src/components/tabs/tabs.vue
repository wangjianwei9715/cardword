<template>
	<view class="list">
		<view :class="[{'index':true,'current':tabsCheck==item.id},'index-'+item.id]" v-for="item in tabs" :key="item.id" @click="onClickIndex(item.id)">{{item.name}}</view>
		<view class="line">
			<view class="current-line"></view>
		</view>	
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		tabs:any;
		@Prop({default:1})
		tabsCheck:any;

		allWidth=0;
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			this.getWidth()
		}
		destroyed(){
			
		}
		getWidth() { 
			uni.createSelectorQuery().in(this).select('.list').boundingClientRect(result => { 
				if (result) { 
					this.allWidth = Number(result.width)
					console.log('1==========',result) 
				}else { 
					this.getWidth()
				} 
			}).exec(); 
		}
		getDescBox(id:number) { 
			if(this.allWidth==0){
				this.getWidth()
			}
			uni.createSelectorQuery().in(this).select('.index-'+id).boundingClientRect(result => { 
				if (result) { 
					console.log('2==========',result) 
				}else { 
					this.getDescBox(id); 
				} 
			}).exec(); 
		}
		onClickIndex(id:number){
			this.getDescBox(id)
			this.$emit("tabsClick", id);
		}
	}
</script>

<style lang="scss">
	.list{
		width: 100%;
		height:104rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding:0 36rpx;
		position: relative;
	}
	.line{
		width: 100%;
		height:12rpx;
		position: absolute;
		bottom:20rpx;
		left:0;
	}
	.current-line{
		width: 32rpx;
		height:12rpx;
		background:url(../../static/index/qiehuan@2x.png) no-repeat center;
		background-size: 100% 100%;
		transition:all 0.2s linear;
	}
	.index{
		height:104rpx;
		line-height: 104rpx;
		font-size: 28rpx;
		color:#A9ABB4;
	}
	.current{
		font-weight: 600;
		color: #14151A;
		position: relative;
	}
	// .current::before{
	// 	width: 32rpx;
	// 	height:12rpx;
	// 	content: '';
	// 	background:url(../../static/index/qiehuan@2x.png) no-repeat center;
	// 	background-size: 100% 100%;
	// 	position: absolute;
	// 	bottom:20rpx;
	// 	left:50%;
	// 	margin-left:-16rpx;
	// }
	
</style>
