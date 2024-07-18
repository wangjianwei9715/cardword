<template>
	<view class="buyinfo-box">
		<view class="buyinfo-item" v-if="buyerData.hits.length" @click="goResult">
			<view class="item-left">
				<view class="name">
					<view class="title">系列玩法中卡</view>
					<view class="desc">查看拆卡报告</view>
				</view>
				<view class="num">x{{buyerData.hitsTotal}}</view>
			</view>
			<view class="item-right">
				<muqian-lazyLoad class="card-pic" :src="buyerData.hits[0].pic" mode="aspectFit" preview/>
			</view>
		</view>
		<view class="buyinfo-item" v-if="zuhecheData.num>0">
			<view class="item-left">
				<view class="name">
					<view class="title">组合车车位</view>
					<view class="desc">组合车</view>
				</view>
				<view class="num">x{{zuhecheData.num}}</view>
			</view>
			<view class="item-right">
				<muqian-lazyLoad class="card-pic" :src="zuhecheData.logo" mode="aspectFit" preview/>
			</view>
		</view>
		<view class="buyinfo-item" v-if="buyerData.noAwards.length">
			<view class="item-left">
				<view class="name">
					<view class="title">拼团活动奖品</view>
					<view class="desc">查看领取方式</view>
				</view>
				<view class="num">x{{buyerData.noAwardsTotal}}</view>
			</view>
			<view class="item-right">
				<muqian-lazyLoad class="card-pic" :src="buyerData.noAwards[0].awardPic" mode="aspectFit" preview/>
			</view>
		</view>
		<view class="buyinfo-item" v-show="num>0" @click="showBasePopup=true">
			<view class="item-left">
				<view class="name">
					<view class="title">随机正版基础卡片</view>
					<view class="desc">查看发货说明</view>
				</view>
				<view class="num">x{{num}}</view>
			</view>
			<view class="item-right">
				<muqian-lazyLoad class="card-pic" src="/static/order/card.png" mode="aspectFit"/>
			</view>
		</view>
		<view class="buyinfo-item">
			<view class="item-left">
				<view class="name">
					<view class="title">【赠】卡币</view>
					<view class="desc">拼团成功后发放</view>
				</view>
				<view class="num">x{{point}}</view>
			</view>
			<view class="item-right">
				<muqian-lazyLoad class="card-pic" src="/static/order/kabi.png" mode="aspectFit"/>
			</view>
		</view>
		<baseCardPopup :show.sync="showBasePopup"/>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import baseCardPopup from "@/pages/goods/component/baseCardPopup.vue"
	import { app } from "@/app";
	@Component({
		components:{baseCardPopup}
	})
	export default class ClassName extends BaseComponent {
		@Prop({default:0})
		num!:number;
		@Prop({default:0})
		point!:number;
		@Prop({default:()=>{}})
		zuhecheData!:any;
		
		@Prop({default:""})
		orderCode!:number;

		buyerData:any = {
			hits:[],
			noAwards:[],
			hitsTotal:0,
			noAwardsTotal:0
		}
		end = false;
		showBasePopup=false
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用

		}
		orderInfo(){
			if(this.end) return;
			const params = {
				pageIndex:1,pageSize:100
			}
			app.http.Get(`me/orderInfo/buyer/${this.orderCode}/hits`,params,(res:any)=>{
				this.buyerData.hits = res.list || [];
				this.buyerData.hitsTotal = res.total || 0
			})
			app.http.Get(`me/orderInfo/buyer/${this.orderCode}/noAwards`,params,(res:any)=>{
				this.buyerData.noAwards = res.list || []
				this.buyerData.noAwardsTotal = res.total || 0
			})
			this.end = true;
		}
		goResult(){
			this.$emit("goResult")
		}	
	}
</script>

<style lang="scss">
	.buyinfo-box{
		.buyinfo-item{
			width: 100%;
			height:90rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 26rpx;
		}
		.buyinfo-item:last-child{
			margin-bottom: 0;
		}
		.item-left{
			width: 560rpx;
			height:90rpx;
			display: inline-flex;
			.name{
				width: 380rpx;
				height:90rpx;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				.title{
					width: 100%;
					font-size: 26rpx;
					
					
					color: #333333;
					margin-bottom: 4rpx;
				}
				.desc{
					width: 100%;
					font-size: 22rpx;
					
					
					color: #999999;
					margin-top: 4rpx;
				}
			}
			.num{
				height:90rpx;
				font-size: 24rpx;
				
				
				color: rgba(153,153,153,0.9);
				line-height: 90rpx;
			}
		}
		.item-right{
			width: 80rpx;
			height:80rpx;
		}
		.card-pic{
			width: 80rpx;
			height:80rpx;
		}
	}
</style>
