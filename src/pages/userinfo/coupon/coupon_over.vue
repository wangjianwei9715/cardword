<template>
	<view>
		<view class="header-tab">
			<tabc :tabc="goodTab" :tabsCheck="goodTabCheck" @tabsClick="onClickListTabs"></tabc>
		</view>
		<view class="content">
			<view class="coupon-content" v-for="item in couponList" :key="item.id">
				<view class="coupon-index">
					<view class="coupon-left">
						<view class="coupon-price">￥<text>{{item.amount}}</text></view>
						<view class="coupon-condition">{{getCouponType(item.tp,(item.minUseAmount?item.minUseAmount:0))}}</view>
					</view>
					<view class="coupon-right">
						<view class="coupon-right-header">
							<view class="coupon-right-header-left">
								<view class="coupon-name"><image class="coupon-icon" src="../../../static/userinfo/coupon_icon.png"/>{{item.name}}</view>
								<view class="coupon-time">{{dateFormatYMS(item.startAt)}}-{{dateFormatYMS(item.overAt)}}</view>
							</view>
							<view :class="item.state==2?'coupon-right-header-ed':'coupon-right-header-over'"></view>
						</view>
						<view class="coupon-right-bottom" @click="onClickCheckExplain(item.id)">
							<view class="coupon-right-detail">查看详情</view>
							<view :class="checkShowExplain(item.id)?'coupon-right-up':'coupon-right-down'"></view>
						</view>
					</view>
				</view>
				<view class="coupon-explain" :class="{'show-explain':checkShowExplain(item.id)}">
					<view class="explain-content">
						<view class="explain-index">1.{{item.tp==1?'卡享券':'满减券'}}可用于平台所有商品，用户下单时，可选择{{item.tp==1?'卡享券':'满减券'}}按面值抵减商品金额</view>
						<view class="explain-index">2.{{item.tp==1?'卡享券可叠加使用，最低可减至0.01元，但不设找零':'满减券不可叠加使用，不设找零'}}</view>
						<view class="explain-index">3.不可与其他类型优惠券叠加使用</view>
						<view class="explain-index">券编号：{{item.code}}</view>
					</view>
				</view>
			</view>
			
			<empty v-show="showEmpty" />
		</view>
	</view>
	
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import { dateFormatYMS } from '@/tools/util'
	@Component({})
	export default class ClassName extends BaseNode {
		dateFormatYMS = dateFormatYMS;
		showExplain:any = [];
		couponList:any = [];
		currentPage = 1;
        pageSize = 20;
		noMoreData = false;
 		showEmpty = false;
		goodTab = [
			{id:2,name:'已使用'},
			{id:-1,name:'已过期'}
		];
		goodTabCheck = 2;
		onLoad(query:any) {
			this.reqNewData();
			
		}
		
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		onClickListTabs(id:number){
			if(id==this.goodTabCheck){
				return;
			}
			this.goodTabCheck = id;
			this.noMoreData = false;
			this.currentPage = 1;
			this.couponList = [];
			this.reqNewData()
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}
			
			let params:{[x:string]:any} = {
				pageIndex: this.currentPage,
				pageSize:this.pageSize,
				state:this.goodTabCheck
			}
			app.http.Get('me/coupon/list',params,(data:any)=>{
				console.log(data)
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(this.currentPage==1){
					this.couponList = [];
					if(!data.list){
						this.showEmpty = true
					}
				}

				if(data.list){
					this.showEmpty = false;
					this.couponList = this.couponList.concat(data.list)
				}
				this.currentPage++;
				if(cb) cb()
				
			})
		}
		getCouponType(type:number,minUseAmount:number){
			switch(type){
				case 1:
					return '全平台无门槛';
				case 2:
					return '满'+minUseAmount+'减';
				case 3:
					return '打折'
			}
		}
		onClickGoExchange(){
			uni.navigateTo({
				url:'/pages/userinfo/coupon/coupon_exchange'
			})
		}
		onClickCheckExplain(id:any){
			let index = this.showExplain.indexOf(id)
			if(index == -1){
				this.showExplain.push(id)
			}else{
				this.showExplain.splice(index,1)
			}
		}
		checkShowExplain(id:any){
			return this.showExplain.indexOf(id) == -1?false:true
		}
		
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#F2F2F2;
	}
	.content{
		width: 100%;
		box-sizing: border-box;
		padding:118rpx 20rpx 120rpx 20rpx
	}
	.coupon-content{
		width: 710rpx;
		box-sizing: border-box;
		position: relative;
		margin-bottom: 24rpx;
	}
	.coupon-index{
		width: 710rpx;
		height:187rpx;
		background:url(../../../static/userinfo/coupon_bg2.png) no-repeat center;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.coupon-left{
			width: 187rpx;
			height:187rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			padding:30rpx 0 49rpx 0;
			.coupon-price{
				width: 100%;
				font-size: 18rpx;
				font-family: LTGBK;
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
			}
			.coupon-price text{
				font-size: 56rpx;
			}
			.coupon-condition{
				width: 100%;
				text-align: center;
				font-size: 19rpx;
				font-family: Microsoft YaHei;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
		.coupon-right{
			width: 520rpx;
			height:187rpx;
			box-sizing: border-box;
			padding: 0 24rpx 0 29rpx;
			.coupon-right-header{
				width: 100%;
				height:120rpx;
				border-bottom: 1rpx solid #E7E7E7;
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
				.coupon-right-header-left{
					width: 350rpx;
					height:64rpx;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
				}
				.coupon-name{
					width: 100%;
					height:42rpx;
					display: flex;
					align-items: center;
					font-size: 30rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #666666;
				}
				.coupon-icon{
					width: 42rpx;
					height:42rpx;
					margin-right: 7rpx;
				}
				.coupon-time{
					width: 100%;
					font-size: 20rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #666666;
				}
				.coupon-right-header-over{
					width: 87rpx;
					height:75rpx;
					background: url(../../../static/userinfo/coupon_over.png) no-repeat center;
					background-size: 100% 100%;
					position: absolute;
					right:-24rpx;
					top:0
				}
				.coupon-right-header-ed{
					width: 87rpx;
					height:75rpx;
					background: url(../../../static/userinfo/coupon_ed.png) no-repeat center;
					background-size: 100% 100%;
					position: absolute;
					right:-24rpx;
					top:0
				}
			}
			.coupon-right-bottom{
				width: 100%;
				height:50rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.coupon-right-detail{
					height:50rpx;
					line-height: 50rpx;
					font-size: 20rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #B8B7B7;
				}
				.coupon-right-down{
					width: 18rpx;
					height:10rpx;
					background:url(../../../static/userinfo/coupon_jt.png) no-repeat center;
					background-size: 100% 100%;
				}
				.coupon-right-up{
					width: 18rpx;
					height:10rpx;
					background:url(../../../static/userinfo/coupon_jt.png) no-repeat center;
					background-size: 100% 100%;
					transform: rotate(180deg);
				}
			}
		}
	}
	.header-tab{
		width: 100%;
		height:90rpx;
		padding:0 150rpx;
		box-sizing: border-box;
		background:#fff;
		position: fixed;
		left:0;
		top:0
	}
	.coupon-btn-content{
		width: 100%;
		height:100rpx;
		position: fixed;
		left:0;
		bottom:0;
		background:#fff;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;
		padding:0 42rpx;
	}
	.coupon-btn{
		width: 308rpx;
		height: 58rpx;
		background: #FFFFFF;
		border: 1rpx solid #545659;
		border-radius: 30rpx;
		text-align: center;
		line-height: 58rpx;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #545659;
	}
	.btn-exchange{
		background:#FB4E3E;
		border:1rpx solid #FB4E3E;
		color:#fff;
	}
	.coupon-explain{
		width: 100%;
		height:0;
		background:#fff;
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
		box-sizing: border-box;
		transition:all 0.1s linear;
		overflow: hidden;
		padding: 0 25rpx;
	}
	.explain-content{
		width: 100%;
		padding: 30rpx 0;
	}
	.explain-index{
		width: 100%;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #B8B7B7;
		line-height: 36rpx;
	}
	.show-explain{
		height:225rpx
	}
</style>
