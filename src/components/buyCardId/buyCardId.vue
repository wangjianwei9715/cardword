<!--
 * @FilePath: \jichao_app_2\src\components\buyCardId\buyCardId.vue
 * @Author: wjw
 * @Date: 2022-06-10 16:52:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-25 14:42:33
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="buy-card">
		<view class="card-index" v-show="cardList.length>0" v-for="(item,index) in cardList" :key="index" @click="onClickLookCard(item)">
			<view class="left" :class="{'bingo-name':item.bingo,'wincard':item.state==2}">
				{{item.name}}
			</view>
			<view v-show="index<cardList.length-1" class="left-bottom-order"></view>
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

			app.http.Get(`me/cardNo/${item.uuid&&item.uuid!=''?item.uuid:item.id}/hit/pic`,{},(res:any)=>{
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
			box-sizing: border-box;
			background: #FAFAFA;
			padding:0 20rpx;
			flex-wrap: wrap;
			.left{
				width: 100%;
				min-height: 96rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				font-size: 22rpx;
				
				color: #333333;
				line-height: 32rpx;
				padding:10rpx 0;
			}
			.left-bottom-order{
				width: 100%;
				border-bottom: 1px dashed #F3F3F3;
			}
			.right{
				width:104rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				
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
	.wincard{
		color:#FA1545 !important
	}
</style>
