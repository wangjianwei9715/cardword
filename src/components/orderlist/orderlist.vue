<template>
	<view class="content">
		<view class="orderlist-index" v-for="item in orderOldList" :key="item.id" @click="onClickJumpUrl(item.id)">
			<view class="orderlist-index-header">
				<view class="header-left">
					<image class="seller-image" :src="item.seller.avatar" mode="aspectFill"></image>
					<view class="seller-name">{{item.seller.name}}</view>
				</view>
				<view class="header-right">
					<view v-if="item.state==0" class="header-right-state0"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		orderList:any;
		@Prop({default:false})
		ispullDown:any;
	
		orderOldList:any = [];
		@Watch('ispullDown')
		onIspullDownChanged(val: any, oldVal: any){
			this.orderOldList = []
		}
		@Watch('goodsList')
		onGoodsListChanged(val: any, oldVal: any){
			this.orderList = val;
			setTimeout(()=>{
				this.getOrderList()
			},100)
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			this.getOrderList()
		}
		destroyed(){
			
		}
		onClickJumpUrl(id:any){
			this.$emit("send", id);
		}
		getOrderList(){
			let data = JSON.parse(JSON.stringify(this.orderList))
			console.log(data)
			if(!data){
				return;
			}
			this.orderOldList = this.orderOldList.concat(data)
		}
	}
</script>

<style lang="scss">
	.orderlist{
		&-index{
			width: 710rpx;
			height:420rpx;
			border-radius: 4rpx;
			background:#fff;
			box-sizing: border-box;
			&-header{
				width: 100%;
				height:80rprx;
				display: flex;
				box-sizing: border-box;
				padding:0 20rpx 0 28rpx;
				align-items: center;
				justify-content: space-between;
				.header-left{
					height:80rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					.seller-image{
						width: 40rpx;
						height:40rpx;
						border-radius: 50%;
						margin-right: 16rpx;
					}
					.seller-name{
						height:40rpx;
						line-height: 40rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #14151A;
					}
				}
				.header-right{
					height:80rpx;
					display: flex;
					align-items: center;
				}
			}
		}
	}
</style>
