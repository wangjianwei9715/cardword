<template>
	<view class="buy-card">
		<view class="card-index" v-show="cardList.length>0" v-for="(item,index) in cardList" :key="index">
			<view class="left">{{item.name}}</view>
			<view v-if="showImg&&item.num>0" class="right">
				<image class="show-img" :src="item.pic"  mode="aspectFill"/>
			</view>
			<view v-if="item.num>0" class="right reward">{{'中卡*'+item.num}}</view>
			<view v-else class="right">{{getText(item.state)}}</view>
		</view>
		<empty v-show="cardList.length==0" />
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:''})
		cardList:any;
		@Prop({default:false})
		showImg:any;

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
		getText(index:any){
			switch(index){
				case 1:
					return '待拆开';
				case 2:
					return '开卡成功';
				case 3:
					return '开卡失败';
				case 4:
					return '已失效'
			}
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
			background:#F6F6F7;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding:20rpx 0;
			.left{
				width:500rpx;
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
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #AAAABB;
				.show-img{
					width: 100rpx;
					height:128rpx;
					border-radius: 4rpx;
				}
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
