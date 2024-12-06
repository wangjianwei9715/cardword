<!--
 * @FilePath: \jichao_app_2\src\pages\illustration\components\albumActionSheet.vue
 * @Author: wjw
 * @Date: 2023-08-15 09:00:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-09-07 09:39:18
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view>
		<u-action-sheet :actions="actionsList" :show="showAction" cancelText="取消" @select="onSheetSelect" @close="showAction=false"></u-action-sheet>
	</view>
</template>

<script lang="ts">
	import { Component, Prop, PropSync} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	const listOption = [
		{ id:1, name:'返回' ,subname:"返回后编辑内容将不会保留"},
		{ id:2, name:'重新选择卡片',emit:"select" },
		{ id:4, name:'返回编辑卡片',emit:"edit"},
		{ id:3, name:'保存至草稿箱并退出',emit:"save" },
		{ id:5, name:'退出'},
		{ id:6, name:'返回选择系列',subname:"返回后编辑内容将不会保留"},
	]
	const releaseRoute = [
		"pages/cardForum/release",
		"pages/illustration/album/picUpload",
		"pages/illustration/album/selectCard"
	]
	@Component({})
	export default class ClassName extends BaseComponent {
		@PropSync('show',{type:Boolean})
		showAction!:boolean
		@Prop({default:[]})
		listId!:number[]
		public get actionsList() : any[] {
			const filteredData = listOption.filter(option => this.listId.includes(option.id));
			return filteredData
		}
		onSheetSelect({id,emit}:any){
			if(id==1){
				app.navigateTo.navigateBack()
			}else if(id==5||id==6){
				uni.showModal({
					title: '提示',
					content: '退出后编辑内容将不会保留',
					success: (res)=>{
						if (res.confirm) {
							const curPage: any = getCurrentPages();
							const backLength = curPage.filter((item:any)=>{
								return releaseRoute.includes(item.route)
							}).length;
							app.navigateTo.navigateBack(backLength)
						}
					}
				});
			}else {
				this.$emit(emit)
			}
		}
	}
</script>

<style lang="scss">
</style>
