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
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 7rpx;
			.left{
				width:584rpx;
				font-size: 25rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #333333;
				line-height: 32rpx;
				text-align: left;
				background:#F6F7FA;
				box-sizing: border-box;
				padding:20rpx;
			}
			.right{
				width:104rpx;
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
	}
	.bingo-name{
		font-weight: bold !important;
	}
</style>
