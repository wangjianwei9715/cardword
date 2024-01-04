<!--
 * @FilePath: \jichao_app_2\src\components\buyCardId\buyCardId.vue
 * @Author: wjw
 * @Date: 2022-06-10 16:52:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-04 14:54:45
 * Copyright: 2023 .
 * @Descripttion: 
-->
<template>
	<view class="buy-card">
		<view class="card-index" v-show="cardList.length>0" v-for="(item,index) in cardList" :key="index" @click="onClickLookCard(item)">
			<view class="left" :class="{'bingo-name':item.bingo,'wincard':item.state==2}">{{item.name}}</view>
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
			border-bottom: 1px solid #F3F3F3;
			.left{
				width: 100%;
				min-height: 96rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				font-size: 22rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #333333;
				line-height: 32rpx;
				padding:10rpx 20rpx;
				background: #FAFAFA;
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
	.wincard{
		color:#FA1545 !important
	}
</style>
