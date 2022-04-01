<template>
	<view class="buy-card">
		<view class="card-index" v-show="cardList.length>0" v-for="(item,index) in cardList" :key="index" @click="onClickLookCard(item)">
			<view class="left" :class="{'bingo-name':item.bingo}">{{item.name}}</view>
			<!-- <view v-if="showImg&&item.num>0" class="right">
				<image class="show-img" :src="item.pic"  mode="aspectFill"/>
			</view> -->
			<view  class="right reward">{{waitPay?item.stateName:item.content}}</view>
			
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:''})
		cardList:any;
		@Prop({default:false})
		showImg:any;
		@Prop({default:false})
		waitPay:any;
		
		picList:any = []
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
		}
		destroyed(){
			
		}
		onClickLookCard(item:any){
			if(item.state!=2) return;

			app.http.Get('me/cardNo/'+item.id+'/hit/pic',{},(res:any)=>{
				this.picList = [];
				for(let i in res.list){
					this.picList.push(decodeURIComponent(res.list[i]))
				}
				uni.previewImage({
					urls: this.picList,
					current:0,
					indicator: "number" 
				});
			})
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
				font-family: PingFang SC;
				font-weight: 400;
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
				font-family:PingFang SC;
				font-weight: 400;
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
	.bingo-name{
		font-weight: bold !important;
	}
</style>
