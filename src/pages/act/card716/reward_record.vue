<template>
	<view class="content">
		<view class="list-box">
			<view class="ex-index" v-for="(item,index) in goodData" :key="index">
				<muqian-lazyLoad class="ex-pic" :src="decodeURIComponent(item.pic_url)" />
				<view class="ex-right">
					<view class="ex-title">{{item.name}}</view>
					<view class="ex-time">抽奖时间：{{dateFormatMSHMS(item.created_at)}}</view>
					<view class="wuliu" v-if='item.tp===1' @click='onClickWuliu(item)'>查看物流</view>
					<view class="status" v-if="item.tp===1">
						{{item.wlcode == ''?'待发货':'已发货'}}
					</view>
					<view class="status coupon" v-else>已发放至我的-优惠券</view>
				</view>
			</view>
		</view>

		<empty v-show="empty" />
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import { dateFormatMSHMS,dateFormatYMSHM} from '@/tools/util'
	@Component({})
	export default class ClassName extends BaseNode {
		dateFormatMSHMS = dateFormatMSHMS;
		dateFormatYMSHM = dateFormatYMSHM;
		currentPage = 1;
		pageSize = 20;
		noMoreData = false;
		kefuUserId = 0;
		empty = false;
		goodData:{[x:string]:any} = []
		onLoad(query:any) {
			this.reqNewData()
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData()
		}
		onClickWuliu(item:any){
			if(!item.wlcode){
				uni.showToast({
					title:'暂未发货,请联系客服发货',
					icon:'none'
				})
				return
			}
			uni.navigateTo({
				url:'/pages/userinfo/order_logistics?code='+item.wlcode
			})
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) return ;
			
			let params:any = {
				pageIndex:this.currentPage,
				pageSize:this.pageSize
			}
			app.http.Get('activity/cardShow/my/prize/record',params,(data:any)=>{
				if(data.totalPage<=this.currentPage) this.noMoreData = true;
				if(data.total == 0){ 
					this.empty = true;
				}else{
					this.empty = false
				}
				this.kefuUserId = data.kefuUserId[0] || 0;
				if(this.currentPage==1) this.goodData = [];
				if(data.list) this.goodData = this.goodData.concat(data.list);
				this.currentPage++;
				if(cb) cb()
			})
			
		}
		
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#F6F7FB;
	}
	.list-box{
		width: 100%;
		box-sizing: border-box;
		padding:14rpx;
		.ex-index{
			width: 100%;
			height:208rpx;
			background:#fff;
			border-radius: 5rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding:0 12rpx;
			margin-bottom: 14rpx;
			.ex-pic{
				width: 165rpx;
				height: 165rpx;
				border-radius: 3rpx;
			}
			.ex-right{
				width: 500rpx;
				height:208rpx;
				box-sizing: border-box;
				position: relative;
			}
			.ex-title{
				width: 100%;
				font-size: 29rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #333333;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				padding-top: 35rpx;
			}
			.ex-time{
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #88878C;
			}
			.ex-sp{
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				position: absolute;
				bottom:28rpx;
				left:0
			}
			.ex-wait{
				width: 181rpx;
				height: 43rpx;
				background: #5846B2;
				border-radius: 3rpx;
				text-align: center;
				line-height: 43rpx;
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				position: absolute;
				bottom:20rpx;
				right:17rpx;
			}
			.ex-state{
				position: absolute;
				right:31rpx;
				bottom:29rpx;
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #333333;
			}
		}
	}
	.sp-index{
		width: 100%;
		height: 140rpx;
		background: #FFFFFF;
		border-radius: 5rpx;
		margin-bottom: 14rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding:0 35rpx;
		.sp-index-left{
			.sp-name{
				font-size: 29rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #333333;
			}
			.sp-time{
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #88878C;
			}
		}
		.sp-index-right{
			font-size: 42rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #EF3333;
		}
	}
	.wuliu{
		width: 136rpx;
		height: 49rpx;
		background: #5098D5;
		border-radius: 3rpx;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		position: absolute;
		right: 0;
		bottom:20rpx;
		text-align: center;
		line-height: 49rpx;
	}
	.status{
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 600;
		color: #333333;
		position: absolute;
		left:0;
		bottom:20rpx;
	}
	.coupon{
		color: #88878C;
	}
</style>
