<template>
	<view class="sort">
		<view class="sort-index" v-show="showCard || item.type=='filter'" v-for="item in sort" :key="item.id" @click="onClickSort(item)" :style="{width:itemWidth}">
			<text class="sort-name" :class="{'current-text':item.current>=0||(item.type=='updown'&&item.select!='')}">{{tabName(item)}}</text>
			<view class="sort-filter" v-if="item.type=='filter'">
				<image class="icon-filter" :src="`/static/index/v3/filter_dowm${item.current>=0?'_':''}.png`"/>
			</view>
			<view class="sort-filter" v-if="item.type=='updown'">
				<image class="icon-updown icon-up" :src="`/static/index/v3/up${item.select=='up'?'_':''}.png`"/>
				<image class="icon-updown" :src="`/static/index/v3/down${item.select=='down'?'_':''}.png`"/>
			</view>
		</view>
		<view v-if="showFilter" class="sort-container">
			<view class="filter-index" v-for="(item,index) in sort[0].list" :key="index" @click="onClickFilter(index)">
				<text class="filter-text" :class="{'current-filter':sort[0].current==index}">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue, PropSync } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:true})
		showCard!:boolean;
		@PropSync("sort",{
			type:Array
		}) sortTab!: Array;
		currentId = 0;
		showFilter = false;
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
		}
		destroyed(){
			
		}
		get itemWidth(){
			const length = this.sort.length;

			switch(length){
				case 0:
					return 0;
				case 1:
					return '680rpx';
				case 2:
					return '330rpx';
				case 3:
					return '210rpx'
			}
		}
		
		tabName(item){
			if(item.type=='updown') return item.name;

			return item.current>=0 ? item.list[item.current].name : item.name
		}
		async onClickSort({id, type, select, height}){
			if(type == 'updown'){
				this.sortTab.forEach(x=>{
					if(x.type==type && x.id!=id){
						x.select = ""
					}else if(x.id==id){
						x.select = select=="" ? "up" : (select=="up" ? "down" : "")
					}
				});
				this.emitIndex()
			}else{
				this.showFilter = !this.showFilter;
			}
		}
		onClickCancel(){
			this.showFilter = !this.showFilter;
		}
		onClickFilter(index){
			this.sortTab[0].current = index
			this.showFilter = false;
			this.emitIndex()
		}
		emitIndex(){
			const { sortTab } = this
			const odItem = sortTab.find(x=>{
				return (x.type=='updown') && (x.select!='')
			})
			let data = {
				genre:Number(sortTab[0].current==1?1:0),
				od:!uni.$u.test.isEmpty(odItem) ? `${odItem.od}${odItem.select=='up'?'':':desc'}` : ""
			}
			this.$emit('sortChange',data)
		}
	}
</script>

<style lang="scss">
	@mixin flexCenter{
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		// #ifndef APP-NVUE
		box-sizing: border-box;
		// #endif
	}
	.sort{
		width: 750rpx;
		height:76rpx;
		background: #fff;
		@include flexCenter;
		justify-content: space-between;
		padding:0 35rpx;
		position: relative;
	}
	.sort-index{
		width: 156rpx;
		height: 48rpx;
		background: #F3F5FB;
		border-radius: 2rpx;
		@include flexCenter;
	}
	.sort-name{
		font-size: 22rpx;
		color: #8D8D8D;
	}
	.sort-filter{
		width: 16rpx;
		height:20rpx;
		margin-left: 10rpx;
		@include flexCenter;
	}
	.icon-filter{
		width: 15rpx;
		height:10rpx;
	}
	.icon-updown{
		width: 11rpx;
		height:7rpx;
	}
	.icon-up{
		margin-top: 2rpx;
		margin-bottom: 2rpx;
	}
	.sort-filter-bg{
		width: 750rpx;
		position: fixed;
		top:0;
		left:0;
		bottom:0;
		right:0;
		z-index: 8;		
	}
	.sort-container{
		width: 750rpx;
		background: #F3F5FB;
		@include flexCenter;
		justify-content: flex-start;
		align-items: flex-start;
		padding-left: 20rpx;
		padding-top: 14rpx;
		position: absolute;
		left:0;
		top:76rpx;
		z-index: 9
	}
	.filter-index{
		width: 230rpx;
		height: 64rpx;
		background: #FFFFFF;
		border-radius: 2rpx;
		@include flexCenter;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
		border: 1rpx solid #fff;
	}
	.filter-text{
		font-size: 22rpx;
		color: #333333;
	}
	.current-index{
		border: 1rpx solid #FA1545;
	}
	.current-text{
		color:#333
	}
	.current-filter{
		color:#FA1545
	}
</style>
