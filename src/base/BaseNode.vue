<template>

</template>
<script lang="ts">
	import { app } from "@/app";
import { Vue,Component } from "vue-property-decorator";
	@Component({})
	export default class BaseNode extends Vue {
		private eventListenerMap: {[x: string]: any} = {};
		private intervalIDs:number[] = [];
		onLoad(query:any) {
			
		}
		onUnload() {
			for (const eventName in this.eventListenerMap) {
				if (Object.prototype.hasOwnProperty.call(this.eventListenerMap, eventName)) {
					const listener = this.eventListenerMap[eventName];
					uni.$off(eventName, listener);
					this.$delete(this.eventListenerMap, eventName);
				}
			}
			// #ifdef APP-PLUS
			app.sever.unregisterHandlers(this);
			// #endif
			this.clearAllScheduler();
		}
		/**计时器
		 * 例：this.scheduler(()=>{
				console.log(10秒一次);
			},10);
		 * @param cb 回调函数
		 * @param second 间隔时间，以秒为单位
		 */
		scheduler(cb:Function,second=1){
			let intervalID = setInterval(()=>{
				cb()
			},second*1000);
			this.intervalIDs.push(intervalID);
			return intervalID;
		}
		clearScheduler(intervalID:number){
			let index = this.intervalIDs.indexOf(intervalID);
			if (index>-1) {
				clearInterval(intervalID);
				this.intervalIDs.splice(index, 1);
			}else{
				console.warn('计时器不存在:',intervalID);
			}
		}
		clearAllScheduler(){
			for (let index = 0; index < this.intervalIDs.length; index++) {
				const intervalID =  this.intervalIDs[index];
				clearInterval(intervalID);
			}
			this.intervalIDs = [];
		}
		
		onEventUI(eventName: string, listener: (result: any) => void) {
			if (!listener) {
				console.error('不存在监听函数：' + eventName);
				return;
			}
			uni.$on(eventName, listener);
			this.$set(this.eventListenerMap, eventName, listener);
		}
		/**注册当前脚本上的所有监听事件(请在onEnable时调用)
		 * 例：this.register(['onEnterMatchRsp']);
		 * @param listeners 监听的函数数组,**注意！函数名必须和消息同名**
		 */
		register(listeners:Array<string>){
			if (app.sever) {
				app.sever.registerHandlers(this,listeners);
			}
			
		}
	}
</script>
<style>

</style>
