<template>
	<view class="list">
		<view class="index list-index" v-for="item in tabs" :key="item.id" @click="onClickIndex(item.id)">
			<view  :class="[{'index':true,'current':tabsCheck==item.id},'index-'+item.id]">
				{{item.name}}
				<!-- <view v-if="item.name=='新品'" class="new-icon"></view> -->
			</view>
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

		// allWidth=0;
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			// this.getWidth()
		}
		destroyed(){
			
		}
		// getWidth() { 
		// 	uni.createSelectorQuery().in(this).select('.list').boundingClientRect(result => { 
		// 		if (result) { 
		// 			this.allWidth = Number(result.width)
		// 			console.log('1==========',result) 
		// 		}else { 
		// 			this.getWidth()
		// 		} 
		// 	}).exec(); 
		// }
		// getDescBox(id:number) { 
		// 	if(this.allWidth==0){
		// 		this.getWidth()
		// 	}
		// 	uni.createSelectorQuery().in(this).select('.index-'+id).boundingClientRect(result => { 
		// 		if (result) { 
		// 			console.log('2==========',result) 
		// 		}else { 
		// 			this.getDescBox(id); 
		// 		} 
		// 	}).exec(); 
		// }
		onClickIndex(id:number){
			// this.getDescBox(id)
			this.$emit("tabsClick", id);
		}
	}
</script>

<style lang="scss">
	.list{
		width: 100%;
		height:84rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding:0 55rpx;
		position: relative;
		padding-top: 14rpx;
	}
	.index{
		height:84rpx;
		line-height: 84rpx;
		font-size: 33rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #494949;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 4;
	}
	.list-index{
		margin-right: 90rpx;
	}
	.current{
		font-size:46rpx;
		font-family: PingFangSC-Regular;
		font-weight: 600;
		color: #333333;
		position: relative;
	}
	.current::before{
		width: 92rpx;
		height: 26rpx;
		background: url(../../static/index/v2/tab_icon.png) no-repeat center;
		content: '';
		background-size: 100% 100%;
		position: absolute;
		top:50%;
		left:50%;
		margin-left: -46rpx;
		margin-top: -13rpx;
		z-index: 2;
	}
	.new-icon{
		width: 53rpx;
		height:25rpx;
		background-size: 100% 100%;
		position: absolute;
		top:0;
		left:50%;
		// margin-left:-25rpx
	}
</style>
