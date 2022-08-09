<template>
	<view class="content" v-if="detailData.pic">
		<!-- 顶部导航 -->
		<view class="anchor-navigation">
			<view class="navigation-merchant">
				<view class="avatar-bg">
					<muqian-lazyLoad class="avatar" :src="decodeURIComponent(detailData.logo)" borderRadius="50%"  />
				</view>
				{{detailData.merchant}}
			</view>
			<view class="navigation-back" @click.prevent="onClickBack()">
				<text class="back-tips">THE CARDS WORLD</text>
				<text class="back-text">退出</text>
			</view>
		</view>
		
		<view class="anchor-center">
			<muqian-lazyLoad class="detail-pic" :src="decodeURIComponent(detailData.pic)" />
			<view class="detail-right">
				<view class="goods-pro">
					<view class="progress" :style="{'width':getProgress()+'%'}"></view>
					<view class="progress-q" :style="{'left':getProgress()+'%'}">
						<view class="progress-text">{{getProgress()}}<text>%</text></view>
					</view>
				</view>

				<view class="detail-info">
					<view class="cuo-box">
						<view class="cuo-btn" :class="{'cuo-current':detailData.isCuoka===item.type}" v-for="item in cuoTab" :key="item.id" @click="onClickCuoChange(item)">{{item.name}}</view>
					</view>
					<view class="info-title">{{detailData.title}}</view>
					<view class="goods-info-box">
						<view class="info-type">{{getGoodsPintuan(detailData.pintuanType)}}</view>
						<view class="info-type info-num">{{detailData.specName}}</view>
					</view>
					<view class="cuo-go" @click="onClickGoRub()">
						{{detailData.waitCuoka}}位待搓
						<image class="icon-go" src="@/static/anchor/detail_go.png"/>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script lang="ts">
	const cuoTab = [
		{id:1,name:'代搓开启',type:true},
		{id:2,name:'代搓关闭',type:false}
	]
	import { app } from "@/app";
	import { getGoodsPintuan } from "@/tools/switchUtil";
	import { Component, Prop,Vue } from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		@Prop()
		detailData:any;

		getGoodsPintuan = getGoodsPintuan;
		cuoTab = cuoTab;
		created(){//在实例创建完成后被立即调用
			
		}
		mounted(){//挂载到实例上去之后调用
		}
		destroyed(){
		}
		onClickBack():void{
			this.$emit('detailClose')
		}
		onClickGoRub(){
			this.$emit('rubCard')
		}
		onClickCuoChange(item:{[x:string]:any}):void{
			if(item.type === this.detailData.isCuoka) return;

			let type = this.detailData.isCuoka ? 'shut' : 'open'
			uni.showModal({
				title: '提示',
				content: `是否${type=='shut'?'关闭':'开启'}代搓卡`,
				success: (res)=> {
					if (res.confirm) {
						app.http.Post(`my/cuoka/good/${type}/${this.detailData.goodCode}`,{},(res:any)=>{
							this.detailData.isCuoka = !this.detailData.isCuoka;
							this.detailData.waitCuoka = 0;
						})
					}
				}
			});
		}
		getProgress():number{
			let item = this.detailData;
			return Math.floor(((item.lockNum+item.currentNum)/item.totalNum) * 100)
		}
	}
</script>

<style  lang="scss" scoped>
	.content{
		width: 100%;
		height:750rpx;
		background:url(@/static/anchor/bg.png) no-repeat center;
		background-size: 100% 750rpx;
		position: fixed;
		left:0;
		top:0;
		right:0;
		display: block;
		z-index: 9999;
	}
	.anchor-navigation{
		width: 100%;
		height:97rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		position: relative;
		.navigation-merchant{
			height:97rpx;
			display: flex;
			align-items: center;
			position: absolute;
			left:40rpx;
			top:0;
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			.avatar-bg{
				width: 46rpx;
				height:46rpx;
				background: url(@/static/anchor/logo_bg.png) no-repeat center;
				background-size: 100% 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 17rpx;
				box-sizing: border-box;
				.avatar{
					width: 41rpx;
					height:41rpx
				}
			}
		}
		.navigation-title{
			font-size: 46rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
			line-height: 97rpx;
			text-shadow: 0rpx 0rpx 12rpx #050505;
		}
		.navigation-back{
			width: 525rpx;
			height:63rpx;
			background: url(@/static/anchor/back_bg.png) no-repeat center;
			background-size: 100% 100%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			right:17rpx;
			top:50%;
			margin-top: -31.5rpx;
			padding-top: 10rpx;
			.back-tips{
				font-size: 28rpx;
				font-family: Avenir;
				font-weight: normal;
				color: #FFFFFF;
				margin-right: 19rpx;
				margin-top: 5rpx;
			}
			.back-text{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				margin-left: 19rpx;
			}
		}
	}
	
	
	.anchor-center{
		width: 100%;
		height:617rpx;
		background:url(@/static/anchor/c_bg.png) no-repeat center;
		background-size: 100% 617rpx;
		display: flex;
		position: relative;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		.detail-pic{
			width: 716rpx;
			height:550rpx;
			margin-right: 32rpx;
		}
		.detail-right{
			width: 432rpx;
			height:550rpx;
			margin-left: 32rpx;
			.detail-info{
				width: 432rpx;
				height: 483rpx;
				background:url(@/static/anchor/detail_bg.png) no-repeat center;
				background-size: 100% 100%;
				box-sizing: border-box;
				padding-top: 45rpx;
				position: relative;
				.cuo-box{
					width: 366rpx;
					height:65rpx;
					border:2rpx solid #E3E1DF;
					margin:0 auto;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 35rpx;
					.cuo-btn{
						width: 50%;
						height:65rpx;
						font-size: 27rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #E3E1DF;
						text-align: center;
						line-height: 65rpx;
					}
					.cuo-current{
						background:#E3E1DF;
						color: #333333;
					}
				}
				.info-title{
					width: 366rpx;
					font-size: 29rpx;
					font-family: PingFang SC;
					font-weight: 600;
					line-height: 40rpx;
					color: #FFFFFF;
					text-align: center;
					margin:0 auto;
					word-break:break-all;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
				.goods-info-box{
					width: 366rpx;
					height:52rpx;
					margin:0 auto;
					display: flex;
					align-items: center;
					margin-top: 20rpx;
					.info-type{
						height:inherit;
						box-sizing: border-box;
						background: #F19344;
						display: flex;
						align-items: center;
						justify-content: center;
						padding:0 14rpx;
						font-size: 27rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #EAEAEA;
					}
					.info-num{
						background:#F6C960;
						color:#333333;
						margin-left: 12rpx;
					}
				}
				.cuo-go{
					width: 364rpx;
					height: 77rpx;
					background: linear-gradient(0deg, #EFB840 0%, #F7DD54 99%);
					border-radius: 3rpx;
					position: absolute;
					bottom:39rpx;
					left:35rpx;
					text-align: left;
					line-height: 77rpx;
					font-size: 29rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #333333;
					box-sizing: border-box;
					padding-left: 27rpx;
					.icon-go{
						width: 105rpx;
						height:55rpx;
						position: absolute;
						right:27rpx;
						top:14rpx
					}
				}
			}
		}
		// 进度
		.goods-pro{
			width: 417rpx;
			height:45rpx;
			// background:#F6F7FB;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			margin:0 auto;
			margin-top: 16rpx;
			position: relative;
			margin-bottom: 14rpx;
			.progress{
				width: 0%;
				height:inherit;
				transition: all 0.3s linear;
				background:url(@/static/anchor/pro_j.png) no-repeat center;
			}
			.progress-q{
				width: 95rpx;
				height:72rpx;
				background:url(@/static/anchor/pro_q.png) no-repeat center;
				background-size: 100% 100%;
				box-sizing: border-box;
				position: absolute;
				top:50%;
				margin-top: -40rpx;
				left:0;
				margin-left: -50rpx;
				transition: all 0.3s linear;
				.progress-text{
					width: 60rpx;
					height:60rpx;
					position: absolute;
					right:-5rpx;
					bottom:2rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 23rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #FFFFFF;		
					box-sizing: border-box;				
				}
				.progress-text text{
					font-size: 15rpx;
				}
			}
		}
		// 
			
	}
</style>
