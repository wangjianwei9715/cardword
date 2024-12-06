<template>
	<view class="content">
		<view class="details-header">
			<muqian-lazyLoad class="details-pic" mode="aspectFill" :src="decodeURIComponent(codeData.good.pic)" />
			<view class="details-header-right">
				<view class="details-header-title">{{codeData.good.title}}</view>
				<view class="details-header-info">
					<view class="details-header-info-price">￥<text>{{codeData.good.price}}</text></view>
					<view class="details-header-info-code">{{codeData.good.code}}</view>
				</view>
			</view>
		</view>

		<view class="details-card">
			<view class="details-card-title">卡密</view>
			<view class="details-card-code">{{codeData.name}}</view>
		</view>

		<view class="details-desc">
			<view class="details-desc-index">
				<view class="details-desc-index-line">当前持有者</view>
				<view class="details-desc-index-line">
					<muqian-lazyLoad class="details-desc-avatar" :src="decodeURIComponent(codeData.owner.avatar)" :borderRadius="'50%'"/>
					{{codeData.owner.name}}
				</view>
			</view>
			<view class="details-desc-index" v-for="(item,index) in descInfo" :key="index">
				<view class="details-desc-index-line">{{item.name}}</view>
				<view class="details-desc-index-line">{{item.desc}}</view>
			</view>
		</view>

		<view class="details-bottom">
			<view class="details-btn" @click="onClickBack">返回</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import { dateFormatYMSHM } from "@/tools/util";
import { Md5 } from "ts-md5";
	@Component({})
	export default class ClassName extends BaseNode {
		dateFormatYMSHM = dateFormatYMSHM;
		codeData:any = {};
		descInfo:{[x:string]:any}= {
			userId:{name:'持有者ID',desc:''},
			shareAt:{name:'分享时间',desc:''},
			leftViewNum:{name:'剩余查看次数',desc:''},
			phone:{name:'持有者手机',desc:''},
			leftTransferNum:{name:'剩余可赠送次数',desc:''}
		}
		onLoad(query:any) {
			let ts = Math.floor(new Date().getTime()/1000);
			let params = {
				ts:ts,
				code:query.code,
				sign:Md5.hashStr('viewShareNo_'+query.code+'_'+ts)
			}
			app.http.Post('function/userNo/transfer/shareNo/view',params,(res:any)=>{
				if(res.good){ 
					this.codeData = res;
					for (const key in this.descInfo) {
						if (Object.prototype.hasOwnProperty.call(this.codeData, key)) {
							if(key == 'shareAt'){
								this.descInfo[key].desc = this.dateFormatYMSHM(this.codeData[key]);
							}else{
								this.descInfo[key].desc = this.codeData[key]+'次';
							}
						}
					}
					for (const key in this.descInfo) {
						if (Object.prototype.hasOwnProperty.call(this.codeData.owner, key)) {
							this.descInfo[key].desc = this.codeData.owner[key];
						}
					}
				}
			})
		}
		onClickBack(){
			uni.navigateBack({
				delta: 1
			});
		}
		
		
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:$content-bg
	}
	.content{
		width: 100%;
		box-sizing: border-box;
		padding:14rpx 14rpx calc(114rpx) 14rpx;
		padding:14rpx 14rpx calc(114rpx + constant(safe-area-inset-bottom)) 14rpx;
		padding:14rpx 14rpx calc(114rpx + env(safe-area-inset-bottom)) 14rpx;

	}
	.details-header{
		width: 100%;
		box-sizing: border-box;
		padding:30rpx 18rpx;
		background:#fff;
		border-radius: 5rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 15rpx;
	}
	.details-pic{
		width: 185rpx;
		height:141rpx;
	}
	.details-header-right{
		width: 474rpx;
		height:141rpx;
		box-sizing: border-box;
		padding:6rpx 0;
	}
	.details-header-title{
		width: 100%;
		height:80rpx;
		font-size: 28rpx;
		
		
		color: #333333;
		line-height: 40rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		margin-bottom: 20rpx;
	}
	.details-header-info{
		width: 100%;
		height:30rpx;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
	.details-header-info-price{
		height:30rpx;
		font-size: 18rpx;
		
		
		color: #333333;
	}
	.details-header-info-price text{
		font-size: 28rpx;
		
		
		color: #333333;
	}
	.details-header-info-code{
		height:30rpx;
		font-size: 24rpx;
		
		
		color: #88878C;
	}

	.details-card{
		width: 100%;
		box-sizing: border-box;
		padding:21rpx 18rpx;
		background:#fff;
		border-radius: 5rpx;
		margin-bottom: 15rpx;
	}
	.details-card-title{
		width: 100%;
		font-size: 26rpx;
		
		font-weight: bold;
		color: #333333;
		margin-bottom: 20rpx;
	}
	.details-card-code{
		width: 100%;
		box-sizing: border-box;
		background: #F6F7FB;
		border-radius: 5rpx;
		padding:25rpx 28rpx;
		font-size: 26rpx;
		
		
		color: #333333;
		line-height: 40rpx;
	}

	.details-desc{
		width: 100%;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 5rpx;
		padding:26rpx 18rpx 3rpx 18rpx
	}
	.details-desc-index{
		width: 100%;
		height:43rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}
	.details-desc-index-line{
		height:43rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
		
		
		color: #333333;
	}
	.details-desc-index-line{
		height:43rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
		
		
		color: #333333;
	}
	.details-desc-avatar{
		width: 43rpx;
		height:43rpx;
		margin-right: 6rpx;
		border-radius: 50%;
	}
	.details-bottom{
		width: 100%;
		height:calc(100rpx );
		height:calc(100rpx + constant(safe-area-inset-bottom));
		height:calc(100rpx + env(safe-area-inset-bottom));
		border-top: 1px solid #BBBBBB;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom:0;
		z-index: 10;
		display: flex;
		justify-content: center;
		padding-top: 12rpx;
	}
	.details-btn{
		width: 700rpx;
		height:67rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36rpx;
		
		
		color: #333333;
		border-radius: 5rpx;
		border:1px solid #333333;
	}
</style>
