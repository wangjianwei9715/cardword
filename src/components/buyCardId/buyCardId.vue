<template>
	<view class="buy-card">
		<view class="card-index" v-for="item in cardList" :key="item.id">
			<view class="left">{{item.title}}</view>
			<view class="right" :class="item.state==1?'reward':''">{{item.desc}}</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:''})
		cardList:any;

		cardOldList:any=[];
		@Watch('cardList')
		onCardListChanged(val: any, oldVal: any){
			this.cardList = val;
			setTimeout(()=>{
				this.getOrderList()
			},100)
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		getOrderList(){
			let data = JSON.parse(JSON.stringify(this.cardList))
			console.log(data)
			if(!data){
				return;
			}
			this.cardOldList = this.cardOldList.concat(data)
		}
	}
</script>

<style lang="scss">
	.buy-card{
		width: 100%;
		box-sizing: border-box;
		.card-index{
			width: 100%;
			height:100rpx;
			background:#F6F6F7;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left{
				width:500rpx;
				height:100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #14151A;
				line-height: 34rpx;
				text-align: center;
			}
			.right{
				width: 210rpx;
				height:100rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #AAAABB;
			}
			.reward{
				color: #EBBF7C;
			}
		}
		.card-index:nth-child(even){
			background:#FFFFFF
		}
	}
</style>
