<template>
	<view class="list-content">
		<view class="list-index" @click="onClickWinningSwiper(item.uuid, index)" v-for="(item, index) in codeList"
			:key="index">
			<view class="list-pic-box">
				<view class="icon-new" v-show="item.new"></view>
				<muqian-lazyLoad class="list-pic" :src="decodeURIComponent(item.pic)" />
			</view>
			<view class="list-title">
				<view class="list-pic-shadow"></view>
				<view class="list-title-name">{{ item.name }}</view>
			</view>
			<view class="list-bottom">
				<view class="list-bottom-time">{{ $u.timeFormat(item.time, 'yyyy-mm-dd') }}</view>
				<view class="list-bottom-num">{{ item.picNum }}图</view>
			</view>
		</view>
		<view class="bottomWrap" v-if="newNum > 0">
			<view class="buttonWrap">
				<view class="shareText">恭喜您！新增{{ newNum }}张中卡！</view>
				<view class="submit flexCenter" @click="onClickRePost">一键分享至卡圈</view>
			</view>
			<view class="bottomSafeArea"></view>
		</view>
		<empty v-if="listParams.empty" />
	</view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '../../../base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
	codeList: any = [];
	listParams: { [x: string]: any } = {
		pageSize: 10,
		noMoreData: false,
		total: 0,
		empty: false,
		scrollId: ''
	}
	minResultTime: number = 0
	newNum: number = 0
	onLoad(query: any) {
		this.reqNewData();
	}
	//   加载更多数据
	onReachBottom() {
		this.reqNewData()
	}
	onClickWinningSwiper(uuid: string, index: number) {
		uni.navigateTo({
			url: `/pages/userinfo/winningCard/swiper?uuid=${uuid}&total=${this.listParams.total}&index=${index + 1}`
		})
	}
	onClickRePost() {
		uni.$u.throttle(() => {
			uni.showLoading({
				title: "",
				mask: true
			})
			app.http.Post("cardCircle/hitNo/repost", { minResultTime: this.minResultTime }, (res: any) => {
				uni.hideLoading()
				uni.showToast({
					title: "分享成功"
				})
				this.newNum = 0
				this.minResultTime = 0
			}, (err: any) => {
				uni.hideLoading()
			})
		}, 500)
	}
	reqNewData(cb?: Function) {
		// 获取更多数据
		const params = this.listParams;
		if (params.noMoreData) {
			return;
		}
		let pageParams: any = { pageSize: params.pageSize }
		if (params.scrollId != '') pageParams.scrollId = params.scrollId

		app.http.Get('me/hitNo/list', pageParams, (data: any) => {
			if (data.minResultTime) {
				this.minResultTime = data.minResultTime
				this.newNum = data.newCount
			}
			params.total = data.total;
			params.empty = data.total == 0;
			params.noMoreData = data.end;
			if (data.list) {
				let list = [...this.codeList, ...data.list];
				this.codeList = app.platform.removeDuplicate(list, 'uuid');
			}
			params.scrollId = data.scrollId || ''
			if (cb) cb()
		});
	}
}
</script>

<style lang="scss">
page {
	width: 100%;
	height: 100%;
	background: $content-bg;
}

.list-content {
	width: 100%;
	box-sizing: border-box;
	padding: 14rpx;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
}

.list-index {
	width: 356rpx;
	height: 479rpx;
	background: #FFFFFF;
	box-shadow: 0rpx 1rpx 4rpx 0rpx #AAAAAA;
	border-radius: 5rpx;
	box-sizing: border-box;
	padding: 12rpx 14rpx 0 14rpx;
	margin-bottom: 14rpx;
}

.list-pic-box {
	width: 328rpx;
	height: 335rpx;
	background: #383a49;
	position: relative;
}

.list-pic {
	width: 328rpx;
	height: 335rpx;
}

.icon-new {
	width: 104rpx;
	height: 33rpx;
	background: url(../../../static/userinfo/winningCard/icon_new.png) no-repeat center;
	background-size: 100% 100%;
	position: absolute;
	left: -6rpx;
	top: 0;
	z-index: 9;
}

.list-title {
	width: 100%;
	height: 80rpx;
	position: relative;
}

.list-pic-shadow {
	width: 100%;
	height: 26rpx;
	background: #F0F1F5;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
}

.list-title-name {
	width: 100%;
	height: 85rpx;
	font-size: 27rpx;
	font-family: PingFangSC-Regular;
	font-weight: 400;
	color: #333333;
	line-height: 38rpx;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	position: relative;
	z-index: 3;
	padding: 10rpx 0;
	box-sizing: border-box;
	word-break: break-all
}

.list-bottom {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 10rpx;
}

.list-bottom-time {
	font-size: 23rpx;
	font-family: PingFangSC-Regular;
	font-weight: 400;
	color: #595959;
}

.list-bottom-num {
	font-size: 23rpx;
	font-family: PingFangSC-Regular;
	font-weight: 400;
	color: #595959;
}

.bottomWrap {
	position: fixed;
	bottom: 0;
	left: 0;
	width: inherit;
	background-color: #ffffff;
	;
	z-index: 88;

	.buttonWrap {
		display: flex;
		box-sizing: border-box;
		width: inherit;
		padding: 0 42rpx;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 14rpx;
		padding-top: 10rpx;

		.draft {
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 48rpx;
				height: 48rpx;
				margin-bottom: 8rpx;
			}

			text {
				font-size: 21rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #C0C0C0;
			}
		}

		.shareText {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}

		.submit {
			width: 305rpx;
			height: 77rpx;
			background: #FA1545;
			border-radius: 5rpx;
			font-size: 29rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			letter-spacing: 2rpx;
		}
	}
}
</style>
