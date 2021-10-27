<template name="goodslist">
	<view class="content">
		<view class="item" v-show="goodsList.length>0" v-for="item in goodsList" :key="item.goodCode">
			<view :class="['goodslist-index',{'del-start':delStart}]"  @click="onClickJumpUrl(item.goodCode)">
				<image class="goodslist-pic" :src="getGoodsImg(decodeURIComponent(item.pic))" mode="aspectFill"></image>
				<view class="goodslist-right">
					<view class="goodslist-title">{{item.title}}</view>
					<view class="goodslist-plan-content">
						<view class="goodslist-plan-now" :style="'width:'+getPlan(item.lockNum,item.currentNum,item.totalNum)+'%'"></view>
						<view class="goodslist-plan-desc">余{{item.totalNum-(item.currentNum+item.lockNum)}}/共{{item.totalNum}}</view>
					</view>
					<view class="goodslist-bottom">
						<view class="goodslist-price-content">
							¥<text class="goodslist-price">{{item.price}}</text>
						</view>
						<view class="goodslist-tips" v-show="discountList[index]" v-for="(items,indexs) in discountList[index]" :key="indexs">
							{{items}}
						</view>
						<view class="goodslist-status">{{getStateStr(item.state)}}</view>
					</view>
				</view>
			</view>
			<view v-show="delStart" :class="getDel(item.goodCode)?'deled-icon':'del-icon'" @click="onClickDel(item.goodCode)"></view>
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
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		goodsList:any;
		@Prop({default:false})
		delStart:any;
		@Prop({default:[]})
		delList:any;
		
		getGoodsImg = getGoodsImg
		discountList:any = [];
		
		@Watch('goodsList')
		onGoodsListChanged(val: any, oldVal: any){
			setTimeout(()=>{
				this.getGoodsList()
			},100)
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
		}
		getPlan(lock:number,now:number,all:number){
			let width = Math.floor((Number(lock)+Number(now))/Number(all)*100);
			return width
		}
		getStateStr(state:number){
			switch(state){
				case 0:
					return '出售中';
				case 1:
					return '拼团成功';
				case 2:
					return '拼团失败';
			}
		}
		getDel(id:any){
			let index = this.delList.indexOf(id);
			if(index==-1){
				return false
			}else{
				return true;
			}
		}
		onClickJumpUrl(id:any){
			this.$emit("send", id);
		}
		onClickDel(id:any){
			this.$emit("del", id);
		}
		getGoodsList(){
			let data = JSON.parse(JSON.stringify(this.goodsList))
			console.log(data)
			if(!data){
				return;
			}
			for(let i in data){
				if(data[i].discount!=''){
					this.discountList[i] = data[i].discount.split(',');
				}
			}
		}
	}
</script>

<style lang="scss">
	.item{
		width: 100%;
		height:232rpx;
		border-radius: 4rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin-bottom: 16rpx;
		position: relative;
	}
	.goodslist{
		
		&-index{
			width: 100%;
			height:232rpx;
			background: #FFFFFF;
			border-radius: 4rpx;
			box-sizing: border-box;
			padding:16rpx;
			display: flex;
			align-items: center;
		}
		
		&-pic{
			width: 200rpx;
			height:200rpx;
			border-radius: 4rpx;
			margin-right: 24rpx;
		}
		&-right{
			width: 440rpx;
			height:176rpx;
			box-sizing: border-box;
		}
		&-title{
			width: 100%;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #14151A;
			margin-bottom: 16rpx;
		}
		&-plan-content{
			width: 440rpx;
			height:20rpx;
			background: #FFD1BE;
			border-radius: 12rpx;
			overflow: hidden;
			position: relative;
			margin-bottom: 20rpx;
		}
		&-plan-desc{
			width: 100%;
			height:20rpx;
			position: absolute;
			left:0;
			top:0;
			z-index: 2;
			text-align: center;
			line-height: 20rpx;
			font-size: 16rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
		&-plan-now{
			height:20rpx;
			background: linear-gradient(90deg, #FD8339 0%, #F24B28 100%);
			border-radius: 12rpx;
			position: absolute;
			left:0;
			top:0;
			z-index: 1;
		}
		&-bottom{
			width: 100%;
			height:40rpx;
			display: flex;
			align-items: center;
			position: relative;
		}
		&-price-content{
			font-size: 24rpx;
			font-family: 'DIN';
			font-weight: bold;
			color: #14151A;
		}
		&-price{
			font-size: 32rpx;
		}
		&-tips{
			width: 130rpx;
			height:38rpx;
			text-align: center;
			line-height: 38rpx;
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #E6D188;
			margin-left: 16rpx;
			background:url(../../static/index/title@2x.png) no-repeat center;
			background-size: 100% 100%;
		}
		&-status{
			height:40rpx;
			line-height: 40rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #14151A;
			position: absolute;
			right:0;
			bottom:0
		}
	}
	.del-start{
		margin-left:60rpx;
	}
	.del-icon{
		width:36rpx;
		height:36rpx;
		background:url(../../static/userinfo/weixuan@2x.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left:2rpx;
		top:50%;
		margin-top: -18rpx;
	}
	.deled-icon{
		width:36rpx;
		height:36rpx;
		background:url(../../static/userinfo/xuanzhong@2x.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left:2rpx;
		top:50%;
		margin-top: -18rpx;
	}
</style>
