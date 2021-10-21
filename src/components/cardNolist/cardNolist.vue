<template>
	<view class="content">
		<view class="card-index" v-for="item in cardNoData" :key="item.id">
			<view class="left">
				<view class="title">{{item.goodTitle}}</view>
				<view class="desc">{{item.name}}</view>
				<view class="time">{{dateFormat(item.time)}}</view>
			</view>

			<view v-if="item.resultNum>0" class="right">中卡*{{item.resultNum}}</view>
			<view v-else class="right">{{getText(item.state)}}</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue,Watch } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	import { dateFormat } from "@/tools/util";
	@Component({})
	export default class ClassName extends BaseComponent {
		
		@Prop({default:[]})
		cardNoData:any;
		

		dateFormat = dateFormat
		@Watch('cardNoData')
		onGoodsListChanged(val: any, oldVal: any){
			setTimeout(()=>{
				this.GetcardNoData()
			},100)
		}
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		GetcardNoData(){
			let data = JSON.parse(JSON.stringify(this.cardNoData))
			console.log(data)
			if(!data){
				return;
			}
		}
		getText(index:any){
			switch(index){
				case 1:
					return '待拆开';
				case 2:
					return '开卡成功';
				case 3:
					return '开卡失败';
				case 4:
					return '已失效'
			}
		}
	}
</script>

<style lang="scss">
	.card-index{
		width: 710rpx;
		height:192rpx;
		background:url(../../static/userinfo/NUMBER@2x.png) no-repeat center;
		background-size: 100% 100%;
		margin-bottom: 20rpx;
		border-radius: 4rpx;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		.left{
			width: 538rpx;
			height:192rpx;
			box-sizing: border-box;
			padding:20rpx 22rpx 20rpx 32rpx;
			.title{
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #7F7F8E;
				margin-bottom: 8rpx;
			}
			.desc{
				height:70rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #14151A;
				line-height: 34rpx;
				margin-bottom: 8rpx;
			}
			.time{
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #AAAABB;
			}
		}
		.right{
			width: 172rpx;
			height: 192rpx;
			background: linear-gradient(180deg, #E6E6E6 0%, #FFFFFF 100%);
			border-radius: 4rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #828292;
		}
		.state1{
			background: linear-gradient(180deg, #FFEDE2 0%, #FFFFFF 100%);
			color: #FE7348;
		}
		.state2{
			background: linear-gradient(180deg, #FFF7E4 0%, #FFFFFF 100%);
			color: #EBBF7C;
		}
	}
</style>
