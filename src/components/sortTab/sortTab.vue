<template>
	<view class="header-sort">
		<view class="header-sort-index" :class="{'current-name':item.id==1&&getSortType()||item.odType!=0}" v-for="item in sortComData" :key="item.id" @click.stop="onClickSort(item)">
			{{item.name}}
			<view class="header-sort-icon" v-if="item.id!=1">
				<view :class="{'icon-sort-upn':item.odType!=1,'icon-sort-up':item.odType==1}"></view>
				<view :class="{'icon-sort-downn':item.odType!=2,'icon-sort-down':item.odType==2}"></view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		sortData:any;

		sortComData:any = [];
		sort = '';
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			this.sortComData = JSON.parse(JSON.stringify(this.sortData))
		}
		destroyed(){
			
		}
		// 排序选择
		onClickSort(item:any){
			if(item.id==1){	
				if(this.getSortType()) return;
				this.sortComData = JSON.parse(JSON.stringify(this.sortData))
				this.getSortStr()
			}else{
				let od = item.odType;
				for(let i in this.sortComData){
					this.sortComData[i].odType = 0;
				}
				item.odType = od==2?item.odType=0:od+1;
				this.getSortStr()
			}
		}
		getSortStr(){
			let sort = ''
			for(let i in this.sortComData){
				if(sort!='' && this.sortComData[i].odType!=0) sort+=',';

				sort += this.sortComData[i].odType==0?'':(this.sortComData[i].odType==1?i:i+':desc');
			}
			this.$emit('postSort',sort)
		}
		getSortType(){
			let defaultSort = true;
			for(let i in this.sortComData){
				if(this.sortComData[i].odType!=0) defaultSort=false;
			}
			return defaultSort;
		}
	}
</script>

<style lang="scss">
	.header-sort{
		width: 100%;
		height:72rpx;
		box-sizing: border-box;
		padding:0 56rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		&-index{
			height:72rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			font-size: 26rpx;
			
			font-weight: 400;
			color: #333333;
		}
		.current-name{
			color:#E23737;
		}
		.header-sort-icon{
			width: 17rpx;
			margin-left: 4rpx;
			margin-bottom: -4rpx;
			.icon-sort-up{
				width: 17rpx;
				height:12rpx;
				background:url(../../static/goods/sort_u_.png) no-repeat center;
				background-size: 100% 100%;
				margin-bottom: 2rpx;
			}
			.icon-sort-upn{
				width: 17rpx;
				height:12rpx;
				background:url(../../static/goods/sort_u.png) no-repeat center;
				background-size: 100% 100%;
				margin-bottom: 2rpx;
			}
			.icon-sort-down{
				width: 17rpx;
				height:12rpx;
				background:url(../../static/goods/sort_d_.png) no-repeat center;
				background-size: 100% 100%;
			}
			.icon-sort-downn{
				width: 17rpx;
				height:12rpx;
				background:url(../../static/goods/sort_d.png) no-repeat center;
				background-size: 100% 100%;
			}
		}
		&-classify{
			width: 100%;
			height:0;
			box-sizing: border-box;
			position:absolute;
			top:72rpx;
			left:0;
			padding:0 36rpx;
			background:#fff;
			transition:all 0.1s linear;
			overflow: hidden;
			&-index{
				width: 100%;
				height:80rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #F1F1F4;
				display: flex;
				align-items: center;
				font-size: 24rpx;
				
				font-weight: 600;
				color: #14151A;
			}
			&-index:last-child{
				border:none
			}
		}
		.classify-show{
			height:400rpx;
		}
		.classify-opt{
			color:#F65D2D
		}
	}
</style>
