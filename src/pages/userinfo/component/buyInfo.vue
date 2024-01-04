<template>
	<view class="buyinfo-box">
		<view class="buyinfo-item" v-show="num>0">
			<view class="item-left">
				<view class="name">
					<view class="title">随机正版基础卡片</view>
					<view class="desc">查看发货说明</view>
				</view>
				<view class="num">x{{num}}</view>
			</view>
			<view class="item-right">
				<!-- <muqian-lazyLoad class="card-pic" :src=""  preview/> -->
			</view>
		</view>
		<view class="buyinfo-item" v-if="buyerData.hits.length" @click="goResult">
			<view class="item-left">
				<view class="name">
					<view class="title">系列玩法中卡</view>
					<view class="desc">查看拆卡报告</view>
				</view>
				<view class="num">x{{buyerData.hitsTotal}}</view>
			</view>
			<view class="item-right">
				<muqian-lazyLoad class="card-pic" :src="buyerData.hits[0].pic"  preview/>
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
				<muqian-lazyLoad class="card-pic" :src="buyerData.noAwards[0].awardPic"  preview/>
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
				<!-- <muqian-lazyLoad class="card-pic" :src=""  preview/> -->
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:0})
		num!:number;
		@Prop({default:0})
		point!:number;
		@Prop({default:""})
		orderCode!:number;

		buyerData:any = {
			hits:[],
			noAwards:[],
			hitsTotal:0,
			noAwardsTotal:0
		}
		end = false;
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
			height:72rpx;
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
			height:72rpx;
			display: inline-flex;
			.name{
				width: 380rpx;
				height:72rpx;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				.title{
					width: 100%;
					font-size: 24rpx;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					color: #333333;
				}
				.desc{
					width: 100%;
					font-size: 20rpx;
					font-family: PingFangSC, PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}
			.num{
				height:72rpx;
				font-size: 24rpx;
				font-family: PingFangSC, PingFang SC;
				font-weight: 400;
				color: rgba(153,153,153,0.9);
				line-height: 72rpx;
			}
		}
		.item-right{
			width: 72rpx;
			height:72rpx;
		}
		.card-pic{
			width: 72rpx;
			height:72rpx;
		}
	}
</style>
