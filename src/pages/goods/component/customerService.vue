<template>
	<u-action-sheet :actions="actionsList" :show="showAction" cancelText="取消" @select="onSheetSelect" @close="showAction=false"></u-action-sheet>
</template>

<script lang="ts">
	import { Component,Prop,PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		@PropSync('show',{type:Boolean})
		showAction!:boolean
		@Prop({default:""})
		kefu?:string
		@Prop({default:""})
		goodCode?:string
		@Prop({default:""})
		kefuWechat!:string
		actionsList = [
			{ id:1, name:'商家微信客服', subname:"复制商家微信号，前往微信添加", icon:"/static/login/weixin@2x.png"},
			{ id:2, name:'平台客服', icon:"/static/goods/v2/icon_kefu.png"},
		]
		onSheetSelect({id}:any){
			if(id==1){
				if(this.kefuWechat==""){
					uni.showToast({
						title:"商家暂无客服微信",
						icon:"none"
					})
					return;
				}
				uni.setClipboardData({
					data:this.kefuWechat,
					showToast:false,
					success: ()=> {
						uni.showToast({
							title:'复制成功',
							icon:'none'
						})
					}
				});
			}else {
				app.platform.hasLoginToken(()=>{
					const params = {
						agentExten:this.kefu||'',
						businessParam:'goodCode:'+this.goodCode
					}
					app.platform.heliService(params)
				})
			}
		}
	}
</script>