<template>
	<view class="content">
		<view class="live-content">
			<liveslist :liveList="liveList" />
			<view v-show="empty" class="live-empty">卡展暂未开始，卡展时间7.16-7.17</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		params:any = {
			pageIndex:1,
			pageSize:20,
			noMoreData:false
		}
		liveList:any = [];
		empty = false;
		onLoad(query:any) {
			this.reqNewData()
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData()
		}
		//   下拉刷新
		onPullDownRefresh(){
			this.params = {
				pageIndex:1,
				pageSize:20,
				noMoreData:false
			}
			this.reqNewData(()=>{
				setTimeout(()=>{
					uni.stopPullDownRefresh();
				},1000)
			})
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			let params = this.params
			if (params.noMoreData) return ;
			
			app.http.Get('activity/cardShow/broadcast/list',params,(data:any)=>{
				if(data.totalPage<=params.currentPage) params.noMoreData = true;
				if(params.currentPage==1) this.liveList = []
				if(data.list) this.liveList = this.liveList.concat(data.list);
				if(this.liveList == '') this.empty = true
				params.currentPage++;
				if(cb) cb()
			})
			
		}
	}
</script>

<style lang="scss">
	page{
		background:$content-bg;
	}
	.content{
		width: 100%;
	}
	.header-banner{
		width: 100%;
		background:#FFFFFF;
		position: fixed;
		left:0;
		top:0;
		box-sizing: border-box ;
		z-index: 9;
	}
	.tab-header{
		width: 100%;
		height:104rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 20rpx;
		z-index: 10;
		align-items: center;
	}
	.tabc-content{
		width: 100%;
		margin-top: -20rpx;
	}
	.live-content{
		width: 100%;
		box-sizing: border-box;
		padding:13rpx 13rpx 20rpx 13rpx;
		
		position: relative;
		z-index: 2;
	}
	.live-empty{
		width: 100%;
		text-align: center;
		font-size: 21rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #565656;
		margin-top: 200rpx;
	}
</style>
