<template>
	<view class="content">
		<view class="card-index">
			<buyCardId :cardList="cardList" :showImg="true"/>
		</view>	
	</view>
</template>

<script lang="ts">
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		cardList:{[x:string]:any} = [
			{id:1,title:'圣安东尼奥马刺 帕特里克·威廉姆斯49编 Apprentice Lnk #11',desc:'中卡*1',state:1,pic:'../../static/goods/1@2x.png'},
			{id:2,title:'圣安东尼奥马刺 帕特里克·威廉姆斯49编 Apprentice Lnk #11',desc:'中卡*1',state:1,pic:'../../static/goods/2@2x.png'},
			{id:3,title:'圣安东尼奥马刺 帕特里克·威廉姆斯49编 Apprentice Lnk #11',desc:'未中卡',state:0},
			{id:4,title:'圣安东尼奥马刺 帕特里克·威廉姆斯49编 Apprentice Lnk #11',desc:'未中卡',state:1,pic:'../../static/goods/1@2x.png'},
			{id:5,title:'圣安东尼奥马刺 帕特里克·威廉姆斯49编 Apprentice Lnk #11',desc:'未中卡',state:0},
		];
		onLoad(query:any) {
			
		}
	}
</script>

<style lang="scss">
	.card-index{
		width: 100%;
		box-sizing: border-box;
		padding:20rpx
	}
</style>
