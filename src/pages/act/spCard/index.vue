<template>
	<view class="content">
		<view class="sp-top">
			<image class="sp-top-bg" src="../../../static/act/sp/bg.png"/>
			<view class="sp-tips-box">
				<view class="sp-tips-index" @click="showDrawer=true">规则</view>
				<navigator url="/pages/act/spCard/record_sp" hover-class="none" class="sp-tips-index sp-tips-index2">
					SP明细
				</navigator>
			</view>
			<view class="scroll-box">
				<view class="scroll-view" id="scrollBox" :class="{'transitionS':scrollIng}" :style="{'margin-left':-scrollWidth+'px'}">
					<view class="scroll-index" v-for="(item,index) in scrollList" :key="index">
						<image class="scroll-avatar" :src="item.avatar==''?defaultAvatar:decodeURIComponent(item.avatar)" />
						{{item.userName}} 兑换了{{item.awardName}}
					</view>
				</view>
			</view>
		</view>
		
		<!-- sp主要内容 -->
		<view class="sp-box">
			<view class="sp-user">
				<view class="user-info">
					<view class="user-title">我的SP值<text>(1:10)</text></view>
					<view class="user-bg">
						<view class="user-num">
							x{{mySP}}
							<view class="user-lock" v-if="myLockSP>0">冻结中:{{myLockSP}}</view>
						</view>
					</view>
				</view>
				<view class="user-explain">
					<view class="explain-view explain-bold">收集21-22PZ与国宝随机卡种/随机球员：新秀正金折、新秀正黑折、logoman签字卡密兑换奖品！<text>（SP值获取时冻结，拼成后可用）</text></view>
				</view>
			</view>

			<view class="sp-ex">
				<view class="sp-ex-header">
					<view class="ex-header-title">兑换礼品</view>
					<navigator url="/pages/act/spCard/record_award" hover-class="none" class="ex-header-more">查看更多</navigator>
				</view>
				<view class="sp-ex-box">
					<view class="sp-ex-index" v-for="(item,index) in exchangeData" :key="index">
						<view class="ex-pic-box">
							<view v-if="item.total_num!=0" class="ex-index-num">剩{{item.total_num-item.get_num}}份</view>
							<image @click="onClickPreviewImage(decodeURIComponent(item.pic_url))" class="ex-pic" :src="decodeURIComponent(item.pic_url)" mode="aspectFit" />
						</view>
						<view class="ex-index-title">{{item.name}}</view>
						<view class="ex-index-btn" @click="onClickExchange(item)">{{item.exchange_num}}sp兑换</view>
					</view>
				</view>
			</view>

			<view class="sp-hot">
				<view class="sp-hot-header">
					<view class="sp-hot-title">新品热卖中</view>
					<view class="sp-hot-tips">可得sp卡密</view>
				</view>
				<goodslist :goodsList="goodsList" :indexWidth="345" :picWidth="317" :picHeight="244" @send="onClickJumpDetails" :presell="false" />
			</view>
		</view>

		<popupSp :showPopup="showPopup" :award="awardData" :popupType="popupType" @popupClose="showPopup=false" @popupConfirm="onClickConfirmEx"></popupSp>
		<!-- 规则 -->
		<bottomDrawer :showDrawer="showDrawer" :title="'活动规则'" @closeDrawer="showDrawer=false">
			<view class="drawer-box" v-for="(item,index) in spCardRule" :key="index">
				<view class="drawer-help">{{index+1}}、<text class="drawer-help-title">{{item.title}}</text><text class="drawer-help-tips" v-if="item.tips">{{item.tips}}</text>{{item.content}}</view>
			</view>
    	</bottomDrawer>
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { spCardRule } from "@/net/DataRules";
	import { Component } from "vue-property-decorator";
	import BaseNode from '../../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		defaultAvatar = app.defaultAvatar;
		// 集sp卡密 活动规则
		spCardRule = spCardRule
		mySP = 0;
		myLockSP = 0;
		scrollList:{[x:string]:any} = []
		needScrollWidth = 0;
		scrollWidth = 0;
		scrollFnc:any;
		scrollIng = true;
		exchangeData:{[x:string]:any} = [];
		goodsList:any = [];
		showDrawer = false;
		showPopup = false;
		popupType = '';
		awardData:{[x:string]:any} = {};
		exIng = false;
		currentPage = 1;
		pageSize = 10;
		noMoreData = false;
		onLoad(query:any) {
			this.initEven()

			this.onEventUI("spChange", (res) => {
				this.mySP = res.mySP;
			});
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
			app.http.Get('activity/SP/home',{},(res:any)=>{
				console.log('activity/SP/home=',res)
				this.mySP = res.mySP;
				this.myLockSP = res.myLockSP;
				this.scrollList = res.data.exchangeList;
				this.exchangeData = res.data.list;
				setTimeout(()=>{
					this.setScrollWidth()
				},300)
			})
			this.reqNewData()
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
		setScrollWidth(){
			// 获取需要滚动的距离
			const query: any = uni.createSelectorQuery().in(this);
			query.select('#scrollBox').boundingClientRect((data: any) => {
				this.needScrollWidth = data.width - uni.upx2px(750);
				if(this.needScrollWidth>0){
					this.scrollFnc = this.scheduler(()=>{
						this.scrollWidth += 10;
						if(this.scrollWidth>=this.needScrollWidth){
							this.scrollIng = false;
							this.scrollWidth = 0;
							setTimeout(()=>{
								this.scrollIng = true;
							},100)
						}
					},0.3)
				}
			}).exec();
		}
		onClickExchange(item:any){
			this.awardData = item;
			this.popupType = '';
			this.showPopup = true;
		}
		onClickConfirmEx(){
			if(this.exIng) return;
			this.exIng = true;
			this.showPopup = false;
			setTimeout(()=>{
				this.exIng = false;
			},1000)
			app.http.Post('activity/SP/exchange/award/'+this.awardData.id,{},(res:any)=>{
				this.awardData.total_num = res.total_num;
				this.awardData.get_num = res.get_num;
				this.mySP = res.mySP;
				this.popupType = 'totas';
				this.showPopup = true;
			})
		}
		// 跳转商品详情
		onClickJumpDetails(id: any) {
			uni.navigateTo({
			url: "/pages/goods/goods_details?id=" + id
			});
		}
		// 观看大图
		onClickPreviewImage(img: string) {
			uni.previewImage({
				urls: [img],
				current: 0,
				indicator: "number"
			});
		}
	}
</script>

<style lang="scss">
	.content{
		width: 100%;
		height:100%;
		background: linear-gradient(180deg, #0A0A0A 0%, #565961 99%);
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
	.sp-top{
		width: 750rpx;
		height:721rpx;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
		.sp-top-bg{
			width: 100%;
			height:721rpx;
		}
		.sp-tips-box{
			width: 122rpx;
			position: absolute;
			right:-8rpx;
			top:34rpx;
			z-index: 2;
		}
		.sp-tips-index{
			width: 122rpx;
			height:46rpx;
			background:url(../../../static/act/sp/tips_bg.png) no-repeat center;
			background-size: 100% 100%;
			margin-bottom: 19rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding-left: 27rpx;
			padding-bottom: 6rpx;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			justify-content: center;
		}
		.sp-tips-index2{
			height:48rpx;
			background:url(../../../static/act/sp/tips_bg2.png) no-repeat center;
			background-size: 100% 100%;
		}
		.sp-rule{
			width: 28rpx;
			height:29rpx;
			margin-right: 17rpx;
		}
		.sp-mx{
			width: 28rpx;
			height:29rpx;
			margin-right: 6rpx;
		}
		.scroll-box{
			width: 750rpx;
			height:37rpx;
			position: absolute;
			bottom:11rpx;
			left:0;
			overflow: hidden;
		}
		.scroll-view{
			width: max-content;
			height:37rpx;
			padding-left: 10rpx;
			.scroll-index{
				height:37rpx;
				background: rgba(206, 224, 245, 0.45);
				border-radius: 3rpx;
				display: inline-flex;
				align-items: center;
				box-sizing: border-box;
				padding:0 12rpx;
				font-size: 25rpx;
				font-family: Alibaba PuHuiTi;
				font-weight: 400;
				color: #FFFFFF;
				margin-right: 33rpx;
				.scroll-avatar{
					width: 27rpx;
					height:27rpx;
					border-radius: 50%;
					margin-right: 7rpx;
				}
			}
			
		}
		.transitionS{
			transition: all 0.3s linear;
		}
	}

	.sp-box{
		width: 100%;
		box-sizing: border-box;
		padding: 0 23rpx 0 28rpx;
	}
	.sp-user{
		width: 100%;
		height:242rpx;
		background: url(../../../static/act/sp/sp_bg.png) no-repeat center;
		background-size: 100% 100%;
		margin-top: 14rpx;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding:0 26rpx 0 15rpx;
		.user-info{
			width: 250rpx;
			box-sizing: border-box;
			padding-top: 30rpx;
			.user-title{
				width: 100%;
				font-size: 33rpx;
				font-family: hei;
				font-weight: 400;
				color: #333333;
				box-sizing: border-box;
				padding-left: 9rpx;
				margin-bottom: 28rpx;
			}
			.user-title text{
				font-size: 24rpx;
				font-weight: 400;
				color: #333333;
				margin-left: 4rpx;
			}
			.user-bg{
				width: 133rpx;
				height:121rpx;
				background: url(../../../static/act/sp/sp_num.png) no-repeat center;
				background-size: 100% 100%;
				position: relative;
				.user-num{
					width: max-content;
					height:20rpx;
					position: absolute;
					bottom:65rpx;
					left:152rpx;
					font-size: 50rpx;
					font-family: hei;
					font-weight: 400;
					color: #333333;
					letter-spacing:5rpx;
				}
				.user-lock{
					margin-top: 4rpx;
					font-size: 24rpx;
					font-family:  PingFang SC;
					font-weight: 400;
					color: #5846B2;
					letter-spacing:0
				}
			}
		}
		.user-explain{
			width: 325rpx;
			box-sizing: border-box;
			padding-top: 35rpx;
			.explain-view{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 36rpx;
			}
			.explain-bold{
				font-weight: bold;
			}
			.explain-bold text{
				color:#606060;
			}
		}
	}
	.sp-ex{
		width: 100%;
		max-height: 1141rpx;
		background:url(../../../static/act/sp/ex_bg.png) no-repeat;
		background-size: 100% 100%;
		box-sizing: border-box;
		padding:0 23rpx 0 27rpx;
		margin-top: 14rpx;
		.sp-ex-header{
			width: 100%;
			height:90rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.ex-header-title{
				font-size: 33rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #333333;
			}
			.ex-header-more{
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}
		}
		.sp-ex-box{
			width: 100%;
			box-sizing: border-box;
			margin-top: 5rpx;
			.sp-ex-index{
				width: 204rpx;
				height:349rpx;
				box-sizing: border-box;
				margin-right: 18rpx;
				display: inline-block;
				.ex-pic-box{
					width: 204rpx;
					height:204rpx;
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					.ex-pic{
						width: 204rpx;
						height:204rpx;
					}
				}
				.ex-index-num{
					height:29rpx;
					box-sizing: border-box;
					padding:0 12rpx;
					font-size: 21rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
					line-height: 29rpx;
					background:#8BAFFF;
					position: absolute;
					left:0;
					top:0;
					z-index: 2;
				}
				.ex-index-title{
					width: 100%;
					height:52rpx;
					line-height: 52rpx;
					text-align: center;
					font-size: 25rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #333333;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					margin-bottom: 2rpx;
				}
				.ex-index-btn{
					width: 203rpx;
					height: 51rpx;
					background: #364394;
					border-radius: 3rpx;
					margin:0 auto;
					text-align: center;
					line-height: 51rpx;
					font-size: 25rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
			.sp-ex-index:nth-child(3n){
				margin-right: 0;
			}
		}
	}
	.sp-hot{
		width: 100%;
		margin-top: 12rpx;
		.sp-hot-header{
			width: 100%;
			height:86rpx;
			box-sizing: border-box;
			padding:0 23rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.sp-hot-title{
			font-size: 33rpx;
			font-family: PingFang SC;
			font-weight: 600;
			color: #FFFFFF;
		}
		.sp-hot-tips{
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
</style>
