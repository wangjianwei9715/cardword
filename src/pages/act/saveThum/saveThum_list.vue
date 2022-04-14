<template>
	<view class="container">
		<!-- <view class="header-banner">
			<statusbar />
			<view class="tab-header">
				<view class="icon-back"></view>
				<view class="header-title">
					金卡点赞榜
				</view>
				<view class="header-right uni-flex">
				</view>
			</view>
		</view> -->
		<image class='topImge' src="../../../static/act/saveThum/back.png" mode="widthFix"></image>
		<view class="centerTitle uni-flex">
			<image src="../../../static/act/saveThum/left.png" mode=""></image>
			<view class="centerTitle-title">金卡点赞榜</view>
			<image src="../../../static/act/saveThum/right.png" mode=""></image>
		</view>
		<view class="rankTop">
			<view class="rankItem" v-for="item in rankHear">{{item}}</view>
		</view>
		<view class="rankContent" v-if='rankList&&rankList.length'>
			<view class="rankContent-item" v-for="(item,index) in rankList" :key='index'>
				<view class="left" style="width: 33.33%;">
					<view class="rankIndex">{{item.rank}}</view>
					<image :src="decodeURIComponent(item.avatar)" class="rankAvart" mode=""></image>
					<view class="rankUserName text oneLineOver">{{item.userName}}</view>
				</view>
				<view class="center text oneLineOver" style="width: 33.33%;text-align: center;">{{item.award}}</view>
				<view class="right" style="width: 33.33%;">
					<view class="num text oneLineOver">{{item.likeNum}}获赞</view>
					<!-- <image src="../../../static/act/saveThum/faker.png" mode="aspectFill"></image> -->
				</view>
			</view>
		</view>
		<view class="centerModal" :class="{centerModalShow:centerModalShow}">
			<image src="../../../static/act/saveThum/close.png" class="close" @click="centerModalShow=false" mode="">
			</image>
			<view class="title">分享好友</view>
			<image :src="decodeURIComponent(shareItem.pic)" @click='priveImg(0,[decodeURIComponent(shareItem.pic)])'
				class="img" mode=""></image>
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
		<view class="mask" v-show="centerModalShow"></view>
		<view class="noneBlock"></view>
		<view class="bottomBlock">
			<view class="bottomBlock-content uni-flex">
				<view class="left">我的点赞：{{myProfile.likeNum}}
					<text>({{myProfile.rank?'排名:'+myProfile.rank:'暂未上榜'}})</text>
				</view>
				<view class="right" @click="goShare">邀请好友点赞</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		app
	} from "@/app";
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
		rankList: any = []
		totalPage: number = 0;
		centerModalShow: boolean = false;
		myProfile: any = {
			likeNum: 0
		};
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
			console.log('this.shareItem=>>>>>>'+this.shareItem.id)
			if (!this.shareItem.id) return
			app.http.Post('activity/goldNoShare/share/' + this.shareItem.id, {}, (res: any) => {
				console.log(res)
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
			console.log('shareItem=>>>>'+shareItem.shareCode)
			uni.share({
				provider: "weixin",
				type: 5,
				imageUrl: decodeURIComponent(shareItem.pic),
				title: "快来帮我点点赞!",
				scene: "WXSceneSession",
				miniProgram: {
					id: "gh_1093b743ea0e",
					type: 2, // 0-正式版； 1-测试版； 2-体验版。 默认值为0。
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
		reqNewData() {
			app.http.Get(
				"activity/goldNoShare/ranklist",
				this.queryParams,
				(res: any) => {
					this.totalPage = res.totalPage || 0;
					const arr = res.list || [];
					if (this.queryParams.pageIndex === 1) this.rankList = [];
					this.rankList = [...this.rankList, ...arr];
					this.myProfile = res.my||{}
					console.log(res)
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
			font-family: Alibaba PuHuiTi;
			font-weight: bold;
			color: #FCB825;
			line-height: 61rpx;
			text-align: center;
			width: 33.33%;
		}
	}


	.topImge {
		width: 750rpx;
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
		width: 460rpx;
		height: 740rpx;
		background-size: 100% 100%;
		background-image: url('../../../static/act/saveThum/white.png');
		position: fixed;
		left: 0;
		right: 0;
		margin: auto;
		top: 314rpx;
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
			font-family: Alibaba PuHuiTi;
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
			font-family: Alibaba PuHuiTi;
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

		.img {
			width: 240rpx;
			height: 340rpx;
			display: block;
			margin: 0 auto;
			margin-top: 20rpx;
		}

		.tips {
			width: 360rpx;
			margin: 0 auto;
			margin-top: 22rpx;
			// height: 60rpx;
			font-size: 23rpx;
			font-family: Alibaba PuHuiTi;
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
				font-family: Alibaba PuHuiTi;
				font-weight: 400;
				color: #333333;
			}

			.right {
				width: 291rpx;
				height: 82rpx;
				background-color: #060505;
				font-size: 33rpx;
				font-family: Alibaba PuHuiTi;
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
			padding: 0 23rpx 0 26rpx;
			margin-bottom: 10rpx;

			.left {
				display: flex;
				align-items: center;

				.rankIndex {
					font-size: 50rpx;
					font-family: eryaxindahei;
					font-weight: 400;
					color: #FCB825;
					margin-right: 25rpx;
				}

				.rankAvart {
					width: 49rpx;
					height: 49rpx;
					display: block;
					border-radius: 50%;
					margin-right: 23rpx;
				}

				.rankUserName {
					max-width: 70rpx;
				}
			}

			.right {
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.num {

					margin-right: 17rpx;
				}

				image {
					width: 41rpx;
					height: 58rpx;
					border-radius: 4rpx;
				}
			}

			.text {
				font-size: 29rpx;
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
		margin-top: 30rpx;

		image {
			display: block;
			width: 65rpx;
			height: 45rpx;
			position: relative;
			top: 8rpx;
		}

		.centerTitle-title {
			font-size: 42rpx;
			font-family: Alibaba PuHuiTi;
			font-weight: bold;
			color: #FCB825;
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

		.header-right {
			position: absolute;
			right: 0;
			align-items: center;

			image {
				width: 41rpx;
				margin-right: 37rpx;
			}
		}

		.icon-liaotian {
			width: 40rpx;
			height: 38rpx;
			position: absolute;
			right: 32rpx;
			top: 50%;
			margin-top: -21rpx;
			background: url(../../../static/userinfo/liaotian@2x.png) no-repeat center;
			background-size: 100% 100%;
		}
	}
</style>
