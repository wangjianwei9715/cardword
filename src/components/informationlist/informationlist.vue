<template>
	<view class="information">
		<view class="information-index"  v-for="(item,index) in information" :key="index" @click="onClickJumpUrl(item.roomId)">
			<view class="information-top" >
				<image class="information-top-image" :src="getGoodsImg(decodeURIComponent(item.cover))" mode="aspectFill"></image>
			</view>
			<view class="information-center">{{item.title}}</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {
		getGoodsImg
	} from "../../tools/util";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		information:any;
		getGoodsImg = getGoodsImg;
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
		}
		destroyed(){
			
		}
		onClickJumpUrl(id:any){
			this.$emit("send", id);
		}
		
	}
</script>

<style lang="scss">
	
</style>
