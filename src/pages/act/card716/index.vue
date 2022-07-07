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
		
		<view class="sm">
			<slotMachine ref="HMslotMachine" />
		</view>
		<view class="start" @tap="start">
			<text>开 始</text>
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
		prizeList = [
			{id:1,name:'iPhone13',img:'../../../static/act/card716/1.png'},
			{id:2,name:'airPods3',img:'../../../static/act/card716/2.png'},
			{id:3,name:'行李箱',img:'../../../static/act/card716/3.png'},
			{id:4,name:'风筒',img:'../../../static/act/card716/4.png'},
			{id:5,name:'平行车',img:'../../../static/act/card716/5.png'},
			{id:6,name:'iPad5',img:'../../../static/act/card716/6.png'}
		]
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
			setTimeout(()=>{
				this.initLuckyDraw()
			},100)
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
		initLuckyDraw(){
			this.$refs.HMslotMachine.init({
				prizeList:this.prizeList,
				defaultResults:[1,2,3],
				duration:3000,
				direction:'down',
				delay:500
			})
		}
		start(){
			// roll(options)开始摇奖
			// 参数说明
			// results 开奖结果，结构[value,value,value] value为奖品数据的value值
			// success 开奖回调 e={results} results为开奖结果数据
			this.$refs.HMslotMachine.roll({
				results:[6,6,6],
				success:(e:any)=>{
					console.log("success e: ",e);
					this.initLuckyDraw()
				}
			})
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
	.start{
			width: 70%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #f29c11;
			border-radius: 40rpx;
			margin-top: 30rpx;
			box-shadow: 0 1px 2px rgba($color: #51279A, $alpha: 1);
			border-bottom: solid 3px #8d5805;
			box-sizing: border-box;
			text{
				font-size: 20px;
				font-weight: bold;
				color: #b51c06;
				text-shadow: 1px 1px 1px #f2e811;
			}
		}
</style>
