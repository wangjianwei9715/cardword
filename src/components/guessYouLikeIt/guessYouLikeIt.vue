<template name="goodslist">
	<view class="like-content">
		<view class="like-header">· 猜你喜欢 ·</view>
		<view class="like-list">
			<goodslist :goodsList="goodsList" @send="goGoodsDetails" :presell="false"/>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	import {
		getGoodsImg
	} from "../../tools/util";
	//@ts-ignore
	import { KwwConfusion } from "@/net/kwwConfusion.js"

	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:''})
		goodCode:any;

		getGoodsImg = getGoodsImg;
		relativeOnce = false;
		goodsList = [];
		created(){//在实例创建完成后被立即调用
			setTimeout(()=>{
				const relativeParams = KwwConfusion.guessYouLike(this.goodCode);
				this.getRelative(relativeParams)
			},500)
		}
		mounted(){//挂载到实例上去之后调用
		}
		getRelative(params:any){
			if(this.goodCode=='') return;
			app.http.Get(`dataApi/good/${this.goodCode}/relative`,params,(res:any)=>{
				if(res.state==0&& !this.relativeOnce){
					this.relativeOnce = true
					setTimeout(()=>{
						this.getRelative(params)
					},500)
					return;
				}
				this.goodsList = res.state == 1 && res.goodList ? res.goodList : []
			})
		}
		getPlan(item:any){
			return Math.floor((Number(item.lockNum)+Number(item.currentNum))/Number(item.totalNum)*100)+'%'
		}
		goGoodsDetails(goodCode:string){
			app.navigateTo.goGoodsDetails(goodCode,"&referer=GuessYouLike")
		}
	}
</script>

<style lang="scss">
	.like-content{
		width: 100%;
		background:#F6F7FB;
		box-sizing: border-box;
		padding-bottom: calc(150rpx);
		padding-bottom: calc(150rpx + constant(safe-area-inset-bottom));
		padding-bottom: calc(150rpx + env(safe-area-inset-bottom));
	}
	.like-header{
		width: 100%;
		height:100rpx;
		display: flex;
		align-items: center;
		font-size: 22rpx;
		color: #AAAFBD;
		justify-content: center;
	}
	.like-list{
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		margin:0 auto;
		.item{
			width: 356rpx;
			height:413rpx;
			border-radius: 5rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			padding-top:13rpx;
			margin-right: 10rpx;
			margin-bottom: 10rpx;
		}
		.item:nth-child(2n){
			margin-right: 0;
		}
		.like-pic-box{
			width: 327rpx;
			height: 252rpx;
			border-radius: 3rpx;
			margin:0 auto;
		}
		.like-pic{
			width: 327rpx;
			height: 252rpx;
		}
		.like-title{
			width: 100%;
			height:78rpx;
			padding:14rpx 18rpx 0rpx 18rpx;
			font-size: 27rpx;
			line-height: 34rpx;
			
			
			color: #333333;
			box-sizing: border-box;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			align-items: flex-start;
			word-break:break-all
		}
		.like-bottom{
			width: 100%;
			height:70rpx;
			box-sizing: border-box;
			padding:0rpx 14rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.like-price{
				font-size: 18rpx;
				font-weight: 600;
				color: #333333;
			}
			.like-price text{
				font-size: 33rpx;
			}
			.like-plan{
				font-size: 24rpx;
				
				
				color: #999999;
			}
		}
	}
	
	

</style>
