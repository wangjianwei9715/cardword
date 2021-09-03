<template name="goodslist">
	<view class="goodslist-content">
		<view v-show="goodsFalls" class="index-goods">
			<view class="goods-content goods-left">
				<view class="goods-item" v-for="(item,index) in goodsLeft" :key="index" @click="onClickJumpUrl(item.target.id)">
					<view class="goods-image-content"><image class="goods-image" :src="getGoodsImg(item.pic)" mode="widthFix"></image></view>
					<view class="goods-desc" v-html="item.title"></view>
					<view class="goods-price">￥{{item.price}}</view>
					<view class="goods-time">{{dateFormat(item.overAt)}} · {{item.bid}}</view>
					<view class="goods-seller">
						<image class="goods-seller-image" :src="item.publisher_brief.avatar?decodeURIComponent(item.publisher_brief.avatar):defaultAvatar" mode="aspectFill"></image>
						<view class="seller-name">{{item.publisher_brief.name}}</view>
					</view>
				</view>
			</view>
			<view class="goods-content goods-right">
				<view class="goods-item" v-for="(item,index) in goodsRight" :key="index" @click="onClickJumpUrl(item.target.id)">
					<view class="goods-image-content"><image class="goods-image" :src="getGoodsImg(item.pic)" mode="widthFix"></image></view>
					<view class="goods-desc" v-html="item.title"></view>
					<view class="goods-price">￥{{item.price}}</view>
					<view class="goods-time">{{dateFormat(item.overAt)}} · {{item.bid}}</view>
					<view class="goods-seller">
						<image class="goods-seller-image" :src="item.publisher_brief.avatar?decodeURIComponent(item.publisher_brief.avatar):defaultAvatar" mode="aspectFill"></image>
						<view class="seller-name">{{item.publisher_brief.name}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="!goodsFalls" class="index-content">
			<view class="goods-cross" v-for="(item,index) in goodsOldList" :key="index" @click="onClickJumpUrl(item.target.id)">
				<view class="cross-image-content"><image class="cross-image" :src="getGoodsImg(item.pic)" mode="heightFix"></image></view>
				<view class="cross-details">
					<view class="goods-desc2" v-html="item.title"></view>
					<view class="goods-price">￥{{item.price}}</view>
					<view class="goods-time">{{dateFormat(item.overAt)}} · {{item.bid}}</view>
					<view class="goods-seller">
						<image class="goods-seller-image" :src="item.publisher_brief.avatar?decodeURIComponent(item.publisher_brief.avatar):defaultAvatar" mode="aspectFill"></image>
						<view class="seller-name">{{item.publisher_brief.name}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="js">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import {
		dateFormat,
		getGoodsImg
	} from "../../tools/util";
	import { app } from "@/app";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop({default:[]})
		goodsList;
		@Prop({default:false})
		ispullDown;
		@Prop({default:true})
		goodsFalls;
		
		defaultAvatar = app.defaultAvatar
		dateFormat = dateFormat
		getGoodsImg = getGoodsImg
		goodsOldList = [];
		goodsLeft = [];
		goodsRight = [];
		leftH = 0;
		rightH = 0;
		@Watch('goodsFalls')
		onGoodsFallsChanged(val, oldVal){
			this.goodsFalls = val
		}
		@Watch('ispullDown')
		onIspullDownChanged(val, oldVal){
			this.goodsOldList = []
			this.goodsLeft = [];
			this.goodsRight = [];
		}
		@Watch('goodsList')
		onGoodsListChanged(val, oldVal){
			this.goodsList = val;
			console.log(val)
			setTimeout(()=>{
				this.getGoodsList()
			},100)
			
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		getLeftH(){
			uni.createSelectorQuery().in(this).select('.goods-left').boundingClientRect(result => {  
				if (result) {  
					if(result.height&&result.height>this.leftH){
						this.leftH = result.height
					}else{
						this.leftH = 0
					}
				}
			}).exec();
		}
		getRightH(){
			uni.createSelectorQuery().in(this).select('.goods-right').boundingClientRect(result => {  
				if (result) {  
					if(result.height&&result.height>this.rightH){
						this.rightH = result.height
					}else{
						this.rightH = 0
					}
				}
			}).exec();
		}
		getGoodTime(time){
			let hour=Math.floor(time/3600);
			let minute=Math.floor((time-3600*hour)/60);
			let second=Math.floor((time-3600*hour)%60);
			if(minute<10){
				minute = '0'+minute
			}
			if(second<10){
				second = '0'+second
			}
			return hour+':'+minute+':'+second
		}
		getGoodsList(){
			let data = JSON.parse(JSON.stringify(this.goodsList))
			if(!data){
				return;
			}
			for(var i = 0;i<data.length;i++){
				this.getLeftH();
				this.getRightH()
				if(this.leftH>0&&this.rightH>0){
					if(this.leftH>this.rightH){
						this.goodsRight = this.goodsRight.concat(data[i]);
					}else{
						this.goodsLeft = this.goodsLeft.concat(data[i]);
					}
				}else if(this.goodsLeft.length<=this.goodsRight.length){
					this.goodsLeft = this.goodsLeft.concat(data[i]);
				}else{
					this.goodsRight = this.goodsRight.concat(data[i]);
				}
				
			}
			this.goodsOldList = this.goodsOldList.concat(JSON.parse(JSON.stringify(this.goodsList)))
			
		}
		onClickJumpUrl(id){
			this.$emit("send", id);
		}
	}
</script>

<style>
	.goodslist-content .index-goods{
		width: 100%;
		background:#fff;
		box-sizing: border-box;
		/* display: flex; */
		padding:0 30rpx;
	}
	.goodslist-content .goods-content{
		width: 330rpx;
		height:auto;
		display: inline-block;
		float: left;
	}
	.goodslist-content .goods-left{
		margin-right: 30rpx;
	}
	.goodslist-content .goods-item{
		width: 330rpx;
		display: inline-block;
		margin-bottom: 30rpx;
		box-sizing: border-box;
	}
	.goodslist-content .goods-image-content{
		width: 330rpx;
		background:#F5F5F9;
		border-radius: 10rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 15rpx;
	}
	.goodslist-content .goods-image{
		width: 100%;
		border-radius: 10rpx;
	}
	.goodslist-content .goods-desc{
		width: 330rpx;
		padding:0;
		font-size: 28rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #3B3B3B;
		margin-bottom: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		
	}
	.goodslist-content .goods-price{
		width: 330rpx;
		font-size: 32rpx;
		font-family: FZZYK;
		font-weight: bold;
		color: #3B3B3B;
		text-align: left;
	}
	.goodslist-content .goods-time{
		width: 330rpx;
		font-size: 24rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #7B7B7B;
		margin-top: 10rpx;
		margin-bottom: 11rpx;
	}
	.goodslist-content .goods-seller{
		width: 330rpx;
		height:32rpx;
		display: flex;	
		align-items: center;
	}
	.goodslist-content .goods-seller-image{
		width: 32rpx;
		height:32rpx;
		border-radius:50%;
		margin-right: 12rpx;
	}
	.goodslist-content .seller-name{
		height:32rpx;
		line-height: 32rpx;
		font-size: 24rpx;
		font-family: HYQiHei;
		font-weight: normal;
		color: #7B7B7B;
	}
	.goodslist-content .index-content{
		width: 100%;
		box-sizing: border-box;
	}
	.goodslist-content .goods-cross{
		width: 100%;
		height:240rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #F4F3F2;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
	}
	.goodslist-content .cross-image-content{
		width: 220rpx;
		height:200rpx;
		border-radius: 10rpx;
		background:#F5F5F9;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.goodslist-content .cross-image{
		height: 200rpx;
	}
	.goodslist-content .cross-details{
		width: 440rpx;
		height:200rpx;
		box-sizing: border-box;
		margin-left: 30rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	.goodslist-content .goods-desc2{
		width: 440rpx;
		font-size: 24rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #3B3B3B;
		line-height: 30rpx;
		margin-bottom: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
