<template>
	<view class="container" style="width: 100%;
		box-sizing: border-box;">
		<view class="header-banner">
			<statusbar />
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
				<view class="header-title">金卡点赞榜</view>
				<image src="../../../static/act/saveThum/rule.png" @click="ruleShow=true" class="ruleIcon" mode="">
				</image>
			</view>
		</view>
		<view style="padding-top:70rpx">
			<statusbar />
		</view>
		<image class='topImge' src="../../../static/act/saveThum/back.png" mode="widthFix"></image>
		<view class="centerTitle uni-flex">
			<image src="../../../static/act/saveThum/left.png" mode=""></image>
			<view class="centerTitle-title">金卡点赞榜</view>
			<image src="../../../static/act/saveThum/right.png" mode=""></image>
		</view>
		<view class="rankTop">
			<view class="rankItem" v-for="item in rankHear">{{item}}</view>
		</view>
		<view class="rankContent">
			<view class="rankContent-item" v-for="(item,index) in rankList" :key='index'>
				<view class="left" style="width: 33.33%;">
					<view class="rankIndex">{{item.rank}}</view>
					<image v-if="item.userName!='虚位以待'&&item.likeNum===0"
						:src="item.avatar?decodeURIComponent(item.avatar):'../../../static/act/loot/pub_avart.png'"
						class="rankAvart" mode=""></image>
					<!-- <view v-else class="rankAvart noneAvart"></view> -->
					<view class="rankUserName text oneLineOver"
						:style="{maxWidth:(item.userName!='虚位以待'&&item.likeNum===0)?'70rpx':'140rpx'}">{{item.userName}}
					</view>
				</view>
				<view class="center text oneLineOver" style="width: 33.33%;text-align: center;">{{item.award}}</view>
				<view class="right" style="width: 33.33%;">
					<view class="num text oneLineOver">{{formatNumber(item.likeNum,2)}}获赞</view>
				</view>
			</view>
			<!-- <view class="rankContent-item" v-for="(item,index) in unoccupied" :key='index+ +new Date()'>
				<view class="left" style="width: 33.33%;">
					<view class="rankIndex" v-if="true">{{index+1+rankList.length}}</view>
					<view class="rankUserName text" style="max-width: 140rpx;">虚位以待</view>
				</view>
				<view class="center text oneLineOver" style="width: 33.33%;text-align: center;">-</view>
				<view class="right" style="width: 33.33%;">
					<view class="num text oneLineOver" v-if="false">{{formatNumber(item.likeNum,2)}}获赞</view>
				</view>
			</view> -->
		</view>
		<view class="centerModal" :class="{centerModalShow:centerModalShow}">
			<image src="../../../static/act/saveThum/close.png" class="close" @click="centerModalShow=false" mode="">
			</image>
			<view class="title">分享好友</view>
			<view class="goldBack">
				<image class="goldImage" src='../../../static/goods/drawcard/card_gold.png' mode="widthFix"></image>
				<image src="../../../static/goods/drawcard/icon_rc.png" class="rcIcon" mode="widthFix"
					v-show="shareItem.rc"></image>
				<image :src="decodeURIComponent(shareItem.pic)" class="img" mode="widthFix"></image>
				<!-- @click='priveImg(0,[decodeURIComponent(shareItem.pic)])' -->
			</view>
			<view class="tips">{{shareItem.noName}}</view>
			<view class="change uni-flex" @click="change">
				<text>换一张</text>
				<image src="../../../static/act/saveThum/change.png" mode=""></image>
			</view>
			<view class="shareButton" @click="shareWx">
				<image src="../../../static/act/saveThum/wx.png" mode=""></image>
				去微信邀好友点赞
			</view>
		</view>
		<!-- 规则弹窗-->
		<view class="ruleModal" v-show="ruleShow">
			<image src="../../../static/act/loot/close.png" class="close" mode="" @click="ruleShow=false">
			</image>
			<view class="title">活动规则</view>
			<text>
				1、活动期间，玩家获取金色卡密后可在活动页分享给好友进行集赞，活动结束根据点赞排名获得奖励
				2、活动期间首次获得金卡可进行分享集赞
				3、每名好友只能为自己点赞1次，首次集满3个赞获得20-5优惠券1张
				4、活动结束后发放奖励，实物类请联系客服领取，优惠券类自动发放
			</text>
		</view>
		<view class="mask" v-show="centerModalShow || ruleShow"></view>
		<view class="noneBlock"></view>
		<view class="bottomBlock">
			<view class="bottomBlock-content uni-flex">
				<view class="left">我的点赞：{{formatNumber(myProfile.likeNum,2)}}
					<text style="padding-left:6rpx">({{myProfile.rank?'排名:'+myProfile.rank:'暂未上榜'}})</text>
				</view>
				<view class="right" @click="goShare">点击分享金卡</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		app
	} from "@/app";
	import {
		formatNumber
	} from '@/tools/util'
	import {
		Component,
		Prop,
		Vue,
		Watch
	} from "vue-property-decorator";
	import BaseComponent from "@/base/BaseComponent.vue";
	@Component({})
	export default class ClassName extends BaseComponent {
		rankHear: any = ['排名', '奖励', '获赞数']
		formatNumber: any = formatNumber;
		rankList: any = []
		totalPage: number = 0;
		centerModalShow: boolean = false;
		myProfile: any = {
			likeNum: 0
		};
		ruleShow: boolean = false;
		unoccupied: number = 0; //虚位以待数
		queryParams: any = {
			pageIndex: 1,
			pageSize: 20
		}
		//默认分享数据
		shareItem: any = {}
		onLoad() {
			this.reqNewData()
			this.onEventUI("cardClick", (res: any) => {
				if (res && res.id) {
					this.shareItem = res
					this.centerModalShow = true
				}
			});
		}
		onReachBottom() {
			// if (this.queryParams.pageIndex < this.totalPage) {
			// 	this.queryParams.pageIndex += 1;
			// 	this.reqNewData();
			// }
		}
		onPullDownRefresh() {
			this.queryParams.pageIndex = 1
			this.reqNewData();
		}
		shareWx() {
			// console.log('this.shareItem=>>>>>>' + this.shareItem.id)
			if (!this.shareItem.id) return
			app.http.Post('activity/goldNoShare/share/' + this.shareItem.id, {}, (res: any) => {
				// console.log(res)
				this.shareMthod({
					...this.shareItem,
					shareCode: res.shareCode
				})
			})
		}
		priveImg(current: any, urls: any) {
			uni.previewImage({
				current,
				urls
			})
		}
		shareMthod(shareItem: any) {
			// console.log('shareItem=>>>>' + shareItem.shareCode)
			uni.showLoading({
				title:'请稍等'
			})
			uni.share({
				provider: "weixin",
				type: 5,
				imageUrl: decodeURIComponent(shareItem.pic),
				title: "我在卡世界获得了金色卡密，快来榜我点赞助力！",
				scene: "WXSceneSession",
				miniProgram: {
					id: "gh_1093b743ea0e",
					type: 0, // 0-正式版； 1-测试版； 2-体验版。 默认值为0。
					path: "/pages/thumbs/thumbs?code=" + shareItem.shareCode,
					webUrl: "https://www.ka-world.com/"
				},
				success: (res: any) => {
					this.centerModalShow = false
					// this.getTaskList();
					// this.completeTask(item)
				},
				fail: (err: any) => {
					console.log("失败原因=>", err);
					uni.showToast({
						title: "分享失败",
						icon: "none"
					});
				},
				complete:(res:any)=>{
					uni.hideLoading()
				}
			});
		}
		goShare() {
			if (app.token.accessToken == "") {
				uni.navigateTo({
					url: "/pages/login/login"
				});
				return;
			}
			if (this.shareItem && Object.keys(this.shareItem).length) {
				this.centerModalShow = true
				return
			}
			app.http.Get('activity/goldNoShare/pickOneNo', {}, (res: any) => {
				this.shareItem = res.data
				this.centerModalShow = true
			})
		}
		change() {
			uni.navigateTo({
				url: '/pages/act/saveThum/selectCar'
			})
		}
		onClickBack() {
			uni.navigateBack({
				delta: 1
			});
		}
		// this.queryParams
		reqNewData() {
			app.http.Get(
				"activity/goldNoShare/ranklist", {},
				(res: any) => {
					// console.log(res)
					this.totalPage = res.totalPage || 0;
					const arr = res.list || [];
					if (this.queryParams.pageIndex === 1) this.rankList = [];
					this.rankList = [...this.rankList, ...arr];
					this.myProfile = res.my || {}
					this.unoccupied = res.unoccupied || 50
					setTimeout(() => {
						uni.stopPullDownRefresh();
					}, 500);
				}
			);
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #201455;
	}

	.ruleModal {
		width: 500rpx;
		height: 540rpx;
		background-color: #fff;
		position: fixed;
		top: 420rpx;
		left: 0;
		right: 0;
		margin: auto;
		z-index: 201;
		padding: 0 40rpx;
		overflow-y: auto;
		z-index: 1000;

		.title {
			font-size: 33rpx;

			font-weight: bold;
			color: #333333;
			text-align: center;
			margin-top: 32rpx;
			margin-bottom: 24rpx;
		}

		text {
			line-height: 40rpx;
		}
	}

	.header-banner {
		width: 100%;
		background: #fff;
		position: fixed;
		left: 0;
		top: 0;
		box-sizing: border-box;
		z-index: 10;
		border-bottom: 1px solid #f4f3f2;

		.tab-header {
			width: 100%;
			height: 88rpx;
			display: flex;
			box-sizing: border-box;
			padding: 0 30rpx;
			position: relative;
			z-index: 10;
			align-items: center;
			justify-content: center;
		}

		.ruleIcon {
			width: 35rpx;
			height: 35rpx;
			position: absolute;
			right: 30rpx;
		}

		.icon-back {
			width: 80rpx;
			height: 88rpx;
			background: url(../../../static/goods/back@2x.png) no-repeat center;
			background-size: 100% 100%;
			position: absolute;
			left: 0;
			top: 0;
		}

		.header-title {
			height: 88rpx;
			display: flex;
			align-items: center;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #14151a;

			&-img {
				width: 48rpx;
				height: 48rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
		}
	}

	.rankTop {
		display: flex;
		width: 722rpx;
		margin: 0 auto;
		background-color: #000000;
		height: 61rpx;
		display: flex;
		margin-top: 20rpx;
		// justify-content: space-around;

		.rankItem {
			font-size: 36rpx;
			font-family: PingFangSC-Medium;
			font-weight: bold;
			color: #FCB825;
			line-height: 61rpx;
			text-align: center;
			width: 33.33%;
		}
	}


	.topImge {
		width: 750rpx;
		// margin-top: 90rpx;
	}

	.noneBlock {
		width: 750rpx;
		// background-color: rgba(0,0,0,0);
		opacity: 0;
		height: 115rpx;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		pointer-events: none;

	}



	.centerModal {
		width: 530rpx;
		height: 880rpx;
		background-size: 100% 100%;
		background-image: url('../../../static/act/saveThum/white.png');
		position: fixed;
		left: 0;
		right: 0;
		margin: auto;
		top: 294rpx;
		z-index: 1000;
		transition: all 0.2s;
		pointer-events: none;
		transform: scale(0);

		.close {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			right: -30rpx;
			top: -70rpx;
		}

		.shareButton {
			display: flex;
			align-items: center;
			justify-content: center;
			// padding: 0 29rpx;
			height: 74rpx;
			margin: 0 auto;
			width: 366rpx;
			background-size: 100% 100%;
			background-image: url('../../../static/act/saveThum/purple.png');
			font-size: 29rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #FCB825;
			margin-top: 30rpx;

			image {
				width: 50rpx;
				height: 43rpx;
				margin-right: 24rpx;
			}
		}

		.change {
			font-size: 29rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #DA3B59;
			align-items: center;
			justify-content: center;
			margin-top: 22rpx;

			image {
				width: 25rpx;
				height: 25rpx;
				margin-left: 6rpx;
			}
		}

		.title {
			font-size: 38rpx;
			font-family: FZLanTingHeiS-B-GB;
			font-weight: bold;
			color: #333333;
			text-align: center;
			margin-top: 42rpx;
		}


		.goldBack {
			width: 340rpx;
			height: 475rpx;
			margin: 0 auto;
			display: flex;
			margin-top: 20rpx;
			position: relative;

			.goldImage {
				width: 340rpx;
				position: absolute;
				top: 0;
				left: 0;
				margin: auto;
			}

			.rcIcon {
				width: 50rpx;
				left: 30rpx;
				position: absolute;
				top: 30rpx;
			}

			.img {
				width: 306rpx;
				height: 425rpx;
				// 577 842
				// height: 340rpx;
				display: block;
				position: absolute;
				left: 0;
				right: 0;
				margin: auto;
				bottom: 18rpx;
			}
		}

		.tips {
			width: 360rpx;
			margin: 0 auto;
			margin-top: 22rpx;
			// height: 60rpx;
			font-size: 23rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #333333;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			line-height: 36rpx;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}

	.centerModalShow {
		pointer-events: auto;
		transform: scale(1);
	}

	.mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, .5);
		z-index: 999;
	}

	.bottomBlock {
		width: 750rpx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		z-index: 998;

		&-content {
			padding: 0 18rpx 0 34rpx;
			align-items: center;
			height: 115rpx;
			background-color: #fff;
			justify-content: space-between;

			.left {
				font-size: 29rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #333333;
			}

			.right {
				width: 291rpx;
				height: 82rpx;
				background-color: #060505;
				font-size: 33rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #FCB825;
				text-align: center;
				line-height: 82rpx;
			}
		}
	}

	.rankContent {
		width: 722rpx;
		margin: 0 auto;
		margin-top: 10rpx;

		.rankContent-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 90rpx;
			background-size: 100% 100%;
			background-image: url('../../../static/act/saveThum/pp.png');
			padding: 0 0rpx 0 0rpx;
			margin-bottom: 10rpx;

			.left {
				display: flex;
				align-items: center;

				.rankIndex {
					font-size: 50rpx;
					font-family: eryaxindahei;
					font-weight: 400;
					color: #FCB825;
					// margin-right: 25rpx;
					text-align: center;
					min-width: 90rpx;
				}

				.rankAvart {
					width: 49rpx;
					height: 49rpx;
					display: block;
					border-radius: 50%;
					margin-right: 23rpx;
				}

				.noneAvart {
					// background-color: #fff;
					background-image: url('../../../static/act/loot/pub_avart.png');
					background-size: 100% 100%;
				}

				.rankUserName {
					// max-width: 70rpx;
				}
			}

			.right {
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.num {
					width: 100%;
					text-align: center;
					// margin-right: 17rpx;
				}
			}

			.text {
				font-size: 26rpx;
				font-family: Alibaba PuHuiTi;
				font-weight: 400;
				color: #FFFFFF;
			}

		}
	}

	.centerTitle {
		justify-content: center;
		/* padding-top: 452rpx; */
		color: #FCB825;
		margin-top: 26rpx;

		image {
			display: block;
			width: 65rpx;
			height: 45rpx;
			position: relative;
			top: 8rpx;
		}

		.centerTitle-title {
			font-size: 42rpx;
			font-family: PingFangSC-Medium;
			font-weight: bold;
			color: #FCB825;
		}
	}

	.close {
		width: 29rpx;
		height: 27rpx;
		position: absolute;
		top: 21rpx;
		right: 21rpx;
	}
</style>
