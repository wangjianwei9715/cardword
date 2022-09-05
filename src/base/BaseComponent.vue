<template>

</template>
<script lang="ts">
	import {app} from "@/app"
	import { Component, Prop,Vue } from "vue-property-decorator";
	@Component({})
	export default class BaseComponent extends Vue {
		private eventListenerMap: {[x: string]: any} = {};
		goMerchantPage:any=app.platform.goMerchantPage
		beforeCreate() {//在实例初始化之后被调用
			
		}
		created(){//在实例创建完成后被立即调用
			
		}
		beforeMount(){//在挂载开始之前被调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			for (const eventName in this.eventListenerMap) {
				if (Object.prototype.hasOwnProperty.call(this.eventListenerMap, eventName)) {
					const listener = this.eventListenerMap[eventName];
					uni.$off(eventName, listener);
					this.$delete(this.eventListenerMap, eventName);
				}
			}
		}
		onEventUI(eventName: string, listener: (result: any) => void) {
			if (!listener) {
				console.error('不存在监听函数：' + eventName);
				return;
			}
			uni.$on(eventName, listener);
			this.$set(this.eventListenerMap, eventName, listener);
		}
	}
</script>

<style>

</style>
