<template>
    <view class="scroll-box">
		<view class="scroll-view" id="scrollBox" :class="{'transitionS':scrollIng}" :style="{'margin-left':-scrollWidth+'px'}">
			<view class="scroll-index" :style="{'background':indexBg}" v-for="(item,index) in scrollList" :key="index">
				<slot name="scroll" :item="item"></slot>
			</view>
		</view>
	</view>
	
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop()
		scrollList?:string[];
		@Prop({default:'#5846b2'})
		indexBg?:string;
		needScrollWidth = 0;
		scrollWidth = 0;
		scrollFnc:any;
		scrollIng = true;
		@Watch('scrollList')
		onScrollListChanged(val: any, oldVal: any){
			if(val == '') return ;
			clearInterval(this.scrollFnc)
			setTimeout(()=>{
				this.setScrollWidth()
			},100)
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			clearInterval(this.scrollFnc)
		}
        setScrollWidth(){
			// 获取需要滚动的距离
			const query: any = uni.createSelectorQuery().in(this);
			query.select('#scrollBox').boundingClientRect((data: any) => {
				this.needScrollWidth = data.width - uni.upx2px(750);
				if(this.needScrollWidth>0){
					this.scrollFnc = setInterval(()=>{
						this.scrollWidth += 10;
						if(this.scrollWidth>=this.needScrollWidth){
							this.scrollIng = false;
							this.scrollWidth = 0;
							setTimeout(()=>{
								this.scrollIng = true;
							},100)
						}
					},300)
				}
			}).exec();
		}
	
	}
</script>

<style lang="scss">
    .scroll-box{
		width: 750rpx;
		height:37rpx;
		overflow: hidden;
	}
	.scroll-view{
		width: max-content;
		height:37rpx;
		padding-left: 10rpx;
		.scroll-index{
			height:37rpx;
			background: #5846b2;
			border-radius: 3rpx;
			display: inline-flex;
			align-items: center;
			box-sizing: border-box;
			padding:0 12rpx;
			font-size: 25rpx;
			font-family: Alibaba PuHuiTi;
			font-weight: 400;
			color: #FFFFFF;
			margin-right: 33rpx;
			
		}
		
	}
	.transitionS{
		transition: all 0.3s linear;
	}
</style>
