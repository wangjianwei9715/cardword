<template>
	<view>
		<view class="operation-shadow" v-show="teamCheckShow" @click="onClickTeamCancel"></view>
		<view class="operation-content" :class="teamCheckShow?'operation-show':''">
			<view class="teamtion-top">
				<view class="teamtion-header">
					<view class="header-left">
						<image class="header-left-pic" src="" mode="aspectFit"/>
					</view>
					<view class="header-right">
						<view class="header-price">¥<text>149</text></view>
						<view class="header-teamname">“黄蜂主队”</view>
						<view class="header-teamtip">詹姆斯、威斯布鲁克、戴维斯、安东尼</view>
						<button  class="header-shopping-btn">加入购物车</button>
					</view>
				</view>
				<view class="teamtion-index">
					<view class="teamtion-title">选择球队</view>
					<view class="team-check-content">
						<scroll-view class="team-check-content-scroll" :scroll-x="true">
							<view class="scroll-index" :class="{'scroll-index-check':teamCheckId==item.id}" v-for="item in teamData" :key="item.id" @click="onClickTeamCheck(item.id)">
								<image class="scroll-index-img" :src="decodeURIComponent(item.logo)" mode="aspectFit"></image>
								<view class="scroll-index-name">{{item.name}}</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<view class="teamtion-center">
				<view class="teamtion-index">
					<view class="teamtion-title">选择编号</view>
					<view class="branch-list">
						<view class="branch-index"></view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script lang="ts">
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		// 自选球队 显示隐藏
		@Prop({ default: false })
		teamCheckShow:boolean|undefined;
		// 自选球队 球队选择
		@Prop({ default: 1 })
		teamCheckId:number|undefined;
		// 自选球队 球队列表
		@Prop({ 
			default: [
				{
					"id":1,
					"logo":"/pic/xxx.png",
					"name":"湖人",
					"soldOut": true, //是否售罄 
				},
				{
					"id":2,
					"logo":"/pic/xxx.png",
					"name":"湖人",
					"soldOut": true, //是否售罄 
				},
				{
					"id":3,
					"logo":"/pic/xxx.png",
					"name":"湖人",
					"soldOut": true, //是否售罄 
				},
				{
					"id":4,
					"logo":"/pic/xxx.png",
					"name":"湖人",
					"soldOut": true, //是否售罄 
				},
				{
					"id":5,
					"logo":"/pic/xxx.png",
					"name":"湖人",
					"soldOut": true, //是否售罄 
				},
				{
					"id":6,
					"logo":"/pic/xxx.png",
					"name":"湖人",
					"soldOut": true, //是否售罄 
				},
			] 
		})
		teamData:any;
		

		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
			
		}
		destroyed(){
			
		}
		onClickTeamCancel(){
			this.$emit("teamPaycancel");
		}
		onClickTeamCheck(id:any){
			this.$emit("teamCheck",id);
		}
	}
</script>

<style lang="scss">
	.operation-content{
		width: 100%;
		height:80%;
		position: fixed;
		left:0;
		bottom:0;
		border-radius: 24rpx 24rpx 0px 0px;
		box-sizing: border-box;
		transition: all 0.3s linear;
		-webkit-transition: -webkit-transform 0.3s;
		transform: translateY(100%);
		z-index:99;
		background:#fff;
		
	}
	.operation-shadow{
		width: 100%;
		height:100%;
		position: fixed;
		top:0;
		left:0;
		z-index: 88;
		background: rgba(0, 0, 0, 0.5);
	}
	.operation-show{
		transform: translateY(0);
	}
	.teamtion-top{
		width: 100%;
		height:438rpx;
		box-sizing: border-box;
		padding:40rpx 32rpx 0 32rpx;
		position: absolute;
		left:0;
		top:0;
		z-index: 22;
		background:#fff;
		border-radius: 24rpx 24rpx 0px 0px;
	}
	.teamtion-header{
		width: 100%;
		height:138rpx;
		display: flex;
		margin-bottom: 30rpx;
		.header-left{
			width: 138rpx;
			height: 138rpx;
			background: #FFFFFF;
			border: 1rpx solid #E2E2E3;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			box-sizing: border-box;
			.header-left-pic{
				width: 120rpx;
				height:120rpx;
			}
		}
		.header-right{
			width: 540rpx;
			height:138rpx;
			box-sizing: border-box;
			padding:0 0 10rpx 22rpx;
			position: relative;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			.header-price{
				width: 100%;
				font-size: 25rpx;
				font-family: 'DIN';
				font-weight: bold;
				color: #FB4E3E;
			}
			.header-price text{
				font-size:40rpx;
			}
			.header-teamname{
				width: 100%;
				font-size: 22rpx;
				font-family: Microsoft YaHei;
				text-indent: -10rpx;
				font-weight: 400;
				color: #34363A;
			}
			.header-teamtip{
				width: 100%;
				font-size: 20rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #AAAABB;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			.header-shopping-btn{
				width: 207rpx;
				height: 53rpx;
				background: #FB4E3E;
				text-align: center;
				line-height: 53rpx;
				border-radius: 27rpx;
				font-size: 22rpx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #FFFFFF;
				position: absolute;
				right:0;
				top:0
			}
		}
		
	}
	.teamtion-index{
		width: 100%;
		box-sizing: border-box;
	}
	.teamtion-title{
		width: 100%;
		height:40rpx;
		font-size: 28rpx;
		font-family: Microsoft YaHei;
		font-weight: bold;
		color: #34363A;
	}
	.team-check{
		&-content{
			width: 100%;
			height:160rpx;
			overflow: hidden;
			margin-top: 30rpx;
			&-scroll{
				width: 100%;
				height:160rpx;
				display: flex;
				white-space: nowrap;
			}
			.scroll-index{
				width: 120rpx;
				height:160rpx;
				background:#FFF;
				border-radius: 10rpx;
				margin-right: 20rpx;
				overflow: hidden;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
				box-sizing: border-box;
				padding:10rpx 0;
				border: 1rpx solid #fff;
				&-img{
					width: 100rpx;
					height:100rpx;
					background:red;
				}
				&-name{
					width:120rpx;
					font-size: 20rpx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #34363A;
					text-align: center;
				}
			}
			.scroll-index-check{
				border: 1rpx solid #FB4E3E;
			}
		}
	}
	.teamtion-center{
		width: 100%;
		height:100%;
		position: relative;
		box-sizing: border-box;
		padding:0 32rpx;
		padding-top:488rpx ;
		padding-bottom: 300rpx;
		overflow-y: auto;
	}
	.branch-list{
		width: 100%;
		margin-top: 30rpx;
	}
</style>
