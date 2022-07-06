<template>
	<view class="content">
		<view class="sp-top">
			<scrollBox :scrollList="scrollList">
				<template #scroll="{item}">
					<image class="scroll-avatar" :src="item.avatar==''?defaultAvatar:decodeURIComponent(item.avatar)" />
					{{item.userName}} 兑换了{{item.awardName}}
				</template>
			</scrollBox>
		</view>
		
		<!-- 规则 -->
		<bottomDrawer :showDrawer="showDrawer" :title="'活动规则'" @closeDrawer="showDrawer=false">
			<view class="drawer-box" v-for="(item,index) in card716Rule" :key="index">
				<view class="drawer-help">{{item.content}}</view>
			</view>
    	</bottomDrawer>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { card716Rule } from "@/net/DataRules";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		defaultAvatar = app.defaultAvatar;
		card716Rule = card716Rule
		scrollList:{[x:string]:any} = []
		goodsList:any = [];
		showDrawer = false;
		showPopup = false;
		currentPage = 1;
		pageSize = 10;
		noMoreData = false;
		onLoad(query:any) {
			this.initEven()
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData()
		}
		initEven(){
			if(app.token.accessToken == ''){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return;
			}
			// app.http.Get('activity/SP/home',{},(res:any)=>{
			// 	setTimeout(()=>{
			// 		this.scrollList = []
			// 	},300)
			// })
			// this.reqNewData()
		}
		reqNewData(cb?:Function) {
			// 获取更多商品
			if (this.noMoreData) return ;
			
			let params:any = {
				pageIndex:this.currentPage,
				pageSize:this.pageSize
			}
			app.http.Get('activity/heat/good/list',params,(data:any)=>{
				if(data.totalPage<=this.currentPage) this.noMoreData = true;
				if(this.currentPage==1) this.goodsList = [];
				if(data.list) this.goodsList = this.goodsList.concat(data.list);
				this.currentPage++;
				if(cb) cb()
			})
		}
		// 跳转商品详情
		onClickJumpDetails(id: any) {
			uni.navigateTo({
			url: "/pages/goods/goods_details?id=" + id
			});
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height:100%;
		background:#EFBE35;
	}
	.drawer-box{
		width: 100%;
		box-sizing: border-box;
	}
	.drawer-help{
		width: 100%;
		font-size: 25rpx;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: #7D8288;
		line-height: 38rpx;
		margin-bottom: 50rpx;
	}
	.drawer-help-title{
		font-weight: bold;
		color:#333
	}
	.drawer-help-tips{
		color:#ef3333
	}
	.scroll-avatar{
		width: 27rpx;
		height:27rpx;
		border-radius: 50%;
		margin-right: 7rpx;
	}
</style>
