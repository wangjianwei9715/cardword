<template>
	<view class="list-content">
		<view class="list-index" @click="onClickWinningSwiper">
			<view class="list-pic-box">
				<view class="icon-new"></view>
				<image class="list-pic" mode="aspectFit"/>
			</view>
			<view class="list-title">圣安东尼奥马刺 特里克·威廉姆斯 49编 Appre圣安东尼奥马刺 特里克·威廉姆斯 49编 Appre</view>
			<view class="list-bottom">
				<view class="list-bottom-time">2021-04-03</view>
				<view class="list-bottom-num">3图</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		codeList:any = [];
		currentPage = 1;
		pageSize = 10;
		noMoreData = false;
		onLoad(query:any) {
			// this.reqNewData();
		}
		//   加载更多数据
		onReachBottom() {
		    this.reqNewData() 
		}
		onClickWinningSwiper(){
			uni.navigateTo({
				url:'/pages/userinfo/winningCard/swiper'
			})
		}
		againReqNewData(){
			this.currentPage = 1;
			this.codeList = [];
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
			app.http.Get('', params, (data: any) => {
				if(data.totalPage<=this.currentPage){
					this.noMoreData = true;
				}
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
		height: 499rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 2rpx 10rpx 0rpx #929394;
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
	}
	.list-title{
		width: 100%;
		height:80rpx;
		box-sizing: border-box;
		padding:10rpx 0;
		font-size: 29rpx;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		color: #333333;
		line-height: 38rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.list-bottom{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 25rpx;
	}
	.list-bottom-time{
		font-size: 25rpx;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		color: #595959;
	}
	.list-bottom-num{
		font-size: 25rpx;
		font-family: Alibaba PuHuiTi;
		font-weight: 400;
		color: #595959;
	}

</style>
