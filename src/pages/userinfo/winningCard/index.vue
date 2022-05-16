<template>
	<view class="list-content">
		<view class="list-index" @click="onClickWinningSwiper(item.index)" v-for="(item,index) in codeList" :key="index">
			<view class="list-pic-box">
				<view class="icon-new" v-show="item.new"></view>
				<muqian-lazyLoad class="list-pic" :src="decodeURIComponent(item.pic)"/>
			</view>
			<view class="list-title">
				<view class="list-pic-shadow"></view>
				<view class="list-title-name">{{item.name}}</view>
			</view>
			<view class="list-bottom">
				<view class="list-bottom-time">{{dateFormatYMSCustom(item.time,'-')}}</view>
				<view class="list-bottom-num">{{item.picNum}}图</view>
			</view>
		</view>

		<empty v-if="empty"/>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	import { dateFormatYMSCustom } from "@/tools/util"
	@Component({})
	export default class ClassName extends BaseNode {
		dateFormatYMSCustom = dateFormatYMSCustom;
		codeList:any = [];
		currentPage = 1;
		pageSize = 10;
		noMoreData = false;
		total = 0;
		empty = false;
		onLoad(query:any) {
			this.reqNewData();
		}
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		onClickWinningSwiper(index:number){
			uni.navigateTo({
				url:'/pages/userinfo/winningCard/swiper?index='+index+'&total='+this.total
			})
		}
		againReqNewData(){
			this.currentPage = 1;
			this.noMoreData = false;
			this.reqNewData()
		}
		reqNewData(cb?:Function) {
			// 获取更多数据
			if (this.noMoreData) {
				return;
			}
			
			let params:{[x:string]:any} = {
				pageIndex: this.currentPage,
				pageSize:this.pageSize
			}
			app.http.Get('me/hitNo/list', params, (data: any) => {
				this.total = data.total;
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
				if(this.currentPage== 1) this.codeList = [];
				if(data.total==0) {
					this.empty = true
				}else{
					this.empty = false
				};
				if(data.list){
					this.codeList = this.codeList.concat(data.list);
				}
				this.currentPage++;
				if(cb) cb()
			});
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:$content-bg;
	}
	.list-content{
		width: 100%;
		box-sizing: border-box;
		padding:14rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.list-index{
		width: 356rpx;
		height: 479rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 1rpx 4rpx 0rpx #AAAAAA;
		border-radius: 5rpx;
		box-sizing: border-box;
		padding:12rpx 14rpx 0 14rpx;
		margin-bottom: 14rpx;
	}
	.list-pic-box{
		width: 328rpx;
		height:335rpx;
		background:#383a49;
		position: relative;
	}
	
	.list-pic{
		width: 328rpx;
		height:335rpx;
	}
	.icon-new{
		width: 104rpx;
		height:33rpx;
		background:url(../../../static/userinfo/winningCard/icon_new.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left:-6rpx;
		top:0;
		z-index: 9;
	}
	.list-title{
		width: 100%;
		height:80rpx;
		position:relative;
	}
	.list-pic-shadow{
		width: 100%;
		height:26rpx;
		background:#F0F1F5;
		position: absolute;
		top:0;
		left:0;
		z-index: 1;
	}
	.list-title-name{
		width: 100%;
		height:80rpx;
		font-size: 27rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #333333;
		line-height: 38rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		position: relative;
		z-index: 3;
		padding:10rpx 0;
		box-sizing: border-box;
	}
	.list-bottom{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 10rpx;
	}
	.list-bottom-time{
		font-size: 23rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #595959;
	}
	.list-bottom-num{
		font-size: 23rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #595959;
	}

</style>
