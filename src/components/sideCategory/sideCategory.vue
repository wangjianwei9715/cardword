<template>
	<view class="side-content">
		<view class="side-left">
			<view class="side-tab" :class="{'current':current.id==item.id}" v-for="(item,index) in sideTab" :key="index" @click="onClickTab(item.id)">{{item.label}}</view>
		</view>
		<view class="side-right">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"  :scroll-with-animation="true" @scroll="onScroll" @scrolltoupper="scrolltoupper" @scrolltolower="scrolltolower">
                <view v-for="(item,index) in sideTab" :key="index" :id="item.id" class="scroll-view-item">
                    <view>{{item.label}}</view>
                </view>
			</scroll-view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
        @Prop({default:[]})
		sideTab?:any[];
		current = {
			id:1,
			execution:false
		};
		scrollTop = 0;
		orientation:any = []
		created(){//在实例创建完成后被立即调用
		}
		mounted(){//挂载到实例上去之后调用
			this.$nextTick(()=>{
				this.init()
			})
		}
		destroyed(){
			
		}
		onClickTab(tabId:number){
			const { id } = this.current;
			if(id===tabId)return;
			this.current.execution = true;
			this.current.id = tabId;
			const orientation = this.orientation.filter((x:any)=>x.id==tabId)[0];
			if(orientation.from == this.scrollTop){
				this.scrollTop = orientation.from + (orientation.height/2);
			}
			setTimeout(()=>{
				this.scrollTop = orientation.from
			},10)
			setTimeout(() => {
				this.current.execution = false
			}, 500);
		}
		onScroll(event:any) {
			if(this.current.execution) return;
			this.orientation.forEach((x:any)=>{
				if(event.detail.scrollTop>x.from &&  event.detail.scrollTop<x.from+(x.height/2) && this.current.id!=x.id){
					this.current.id = +x.id;
				}
			})
		}
		init() {
			const query = uni.createSelectorQuery().in(this)
			query.selectAll('.scroll-view-item').boundingClientRect(()=>{})
			query.exec((rects) => {
				let from = 0;
				this.orientation = rects[0].map((x:any)=>{
					const data = {id:x.id,from:from,height:x.height};
					from+=x.height;
					return data;
				})
			})
		}
        scrolltoupper(){
            console.log('---------------');
            
        }
        scrolltolower(){
            console.log('+++++++++++++++');
            
        }
        
	}
</script>

<style lang="scss">
	.side-content{
		width: 100%;
		height:100%;
		position: absolute;
		left:0;
		top:0;
	}
	.side-left{
		width: 200rpx;
		height:100%;
		position: absolute;
		left:0;
		top:0;
	}
	.side-right{
		width: 550rpx;
		height:100%;
		position: absolute;
		right:0;
		top:0;
	}
	.side-tab{
		width: 100%;
		height:100rpx;
		text-align: center;
		background:#333;
		color:#fff;
		line-height: 100rpx;
		border-bottom: 1px solid #fff;
	}
	.scroll-Y{
		width: 100%;
		height:100%;
	}
	.scroll-view-item{
		width: 100%;
		height:1000rpx;
	}
	.current{
		background:greenyellow
	}
</style>
