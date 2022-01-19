<template>
	<view class="list">
		<view class="index" v-for="item in tabs" :key="item.id" @click="onClickIndex(item.id)">
			<view v-if="item.name=='自选'" :class="{'zixuan':true,'zixuan-check':tabsCheck==item.id}"></view>
			<view v-else :class="[{'index':true,'current':tabsCheck==item.id},'index-'+item.id]">
				{{item.name}}
				<!-- <view v-if="item.name=='新品'" class="new-icon"></view> -->
			</view>
		</view>
		<!-- <view class="line">
			<view class="current-line"></view>
		</view>	 -->
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
		justify-content: space-between;
		padding:0 36rpx;
		position: relative;
		padding-top: 14rpx;
	}
	// .line{
	// 	width: 100%;
	// 	height:12rpx;
	// 	position: absolute;
	// 	bottom:20rpx;
	// 	left:0;
	// }
	// .current-line{
	// 	width: 32rpx;
	// 	height:12rpx;
	// 	background:url(../../static/index/qiehuan@2x.png) no-repeat center;
	// 	background-size: 100% 100%;
	// 	transition:all 0.2s linear;
	// }
	.index{
		height:84rpx;
		line-height: 84rpx;
		font-size: 28rpx;
		color:#A9ABB4;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.current{
		font-size:34rpx;
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
		bottom:15rpx;
		left:50%;
		margin-left:-19rpx;
		border-radius: 5rpx;
	}
	.zixuan{
		width: 92rpx;
		height:31rpx;
		background:url(../../static/index/check_team.png) no-repeat center;
		background-size: 100% 100%;
		transform: scale(0.8);
	}
	.zixuan-check{
		width: 103rpx;
		height:31rpx;
		background:url(../../static/index/check_team_.png) no-repeat center;
		background-size: 100% 100%;
		transform: scale(1);
	}
	.new-icon{
		width: 53rpx;
		height:25rpx;
		background:url(../../static/index/new_icon.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		top:0;
		left:50%;
		// margin-left:-25rpx
	}
</style>
