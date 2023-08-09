<!--
 * @FilePath: \jichao_app_2\src\pages\illustration\components\albumActionSheet.vue
 * @Author: wjw
 * @Date: 2023-08-03 17:02:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-09 17:11:05
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
		{ id:2, name:'返回添加卡种' },
		{ id:4, name:'返回上传图片',},
		{ id:3, name:'保存并退出' },
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
		onSheetSelect({id}:any){
			if(id==1){
				app.navigateTo.navigateBack()
			}else if(id==2){
				this.$emit('select')
			}if(id==3){
				this.$emit('save')
			}else if (id==4){
				this.$emit('edit')
			}
		}
	}
</script>

<style lang="scss">
</style>
