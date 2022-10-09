<template>
    <view class="tk-screen-scroll" @touchstart.stop="handleTouchstart" @touchend.stop="handleTouchend">
		<slot></slot>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:1})
		lengths?:any;

		startX = 0;
		startY = 0;
		indexs = 0;
        startTime:any
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
        handleTouchstart(e:any) {
            this.startTime = Date.now();
            this.startX = e.changedTouches[0].clientX;
            this.startY = e.changedTouches[0].clientY;
        }
        handleTouchend(e:any) {
            const endTime = Date.now();
            const length = this.lengths - 1;
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const differ = Math.abs(endY - this.startY);
            const dirvalX = endX - this.startX;
            // 纵轴偏移量不得超过 30，否则默认页面进行滚动操作
            if (differ <= 30) {
                // 按下时长不得超过 2秒，X轴滑动距离必须大于 40
                if (endTime - this.startTime > 2000 || Math.abs(dirvalX) <= 40) {
                    return
                };
                // 判断滑动方向
                if (dirvalX > 0) {
                    this.indexs++;
                    if (this.indexs >= length) this.indexs = length;
                } else if (dirvalX < 0){
                    this.indexs--;
                    if (this.indexs <= 0) this.indexs = 0;
                }
                // 返回索引值
                this.$emit('getScreenIndes', this.indexs);
            }
        }
	}
</script>

<style lang="scss">
    
</style>
