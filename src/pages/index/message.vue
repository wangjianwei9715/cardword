<template>
	<view class="content">
		<!-- @navigateTo="navigateTo(`/pages/userinfo/setting`)"  -->
		<transitionNav :showBack="false" ref="transitionNav" @clear="clear" :transition="false" title="消息中心"
			:needRightTools="['清除']" :needIconShadow="false" :toolsMapCustomNew="toolsMapCustomNew">
		</transitionNav>
		<view class="top">
			<view class="fakeTop" :style="{ height: navHeight + 'px' }"></view>
			<view class="index border" v-for="(item, index) in dynamicData" :key="index"
				@click="onClickDynamic(item.bucketName)">
				<view class="left">
					<view class="icon">
						<!-- <view :class="item.title == '交易动态' ? 'icon-zx' : 'icon-tz'"></view> -->
						<image :src="item.icon" style="width: 75rpx;height: 75rpx;"></image>
					</view>
					<view class="desc">
						<view class="desc-title">{{ item.title }}</view>
						<view class="desc-message">{{ item.content || "暂无新消息" }}</view>
					</view>
				</view>
				<view class="right">
					<view class="time">{{ item.lastTime > 0 ? getTime(item.lastTime) : '' }}</view>
					<view class="new-message" v-if="item.new > 0">{{ item.new > 99 ? '99+' : item.new }}</view>
				</view>
				<view class="line"></view>
			</view>
			<view class="index" @click="onClickHeli(chatData.agentExten)">
				<view class="left">
					<view class="icon">
						<image src="/static/userinfo/v3/message/kefu.png" style="width: 75rpx;height: 75rpx;"></image>
					</view>
					<view class="desc">
						<view class="desc-title">客服消息</view>
						<view class="desc-message">{{ decodeURIComponent(chatData.content) }}</view>
					</view>
				</view>
				<!-- <view class="right">
					<view class="time">{{ item.lastTime > 0 ? getTime(item.lastTime) : '' }}</view>
					<view class="new-message" v-if="item.new > 0">{{ item.new > 99 ? '99+' : item.new }}</view>
				</view> -->
			</view>
		</view>
		<!-- <view class="bottom">
			<view class="index" @click="onClickHeli(chatData.agentExten)">
				<view class="left">
					<view class="icon">
						<image class="icon-kf" src="../../static/userinfo/logo.png"></image>
					</view>
					<view class="desc">
						<view class="desc-title">卡世界客服</view>
						<view class="desc-message" v-html="decodeURIComponent(chatData.content)"></view>
					</view>
				</view>
				<view class="right">
					<view class="time" v-show="chatData.endTime > 0">{{ $u.timeFormat(chatData.endTime, 'mm-dd hh:MM') }}
					</view>
				</view>
			</view>
		</view> -->

	</view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import { formatDateToHour, formatDateToMonth, formatDateToYear } from "@/tools/util";
import BaseNode from '../../base/BaseNode.vue';
const navHeight: number = app.statusBarHeight + uni.upx2px(88)
let toolsMap = {
	"清除": {
		action: "",
		emitAction: "clear",
		icon: "/static/userinfo/v3/clear.png",
		icon_black: "/static/userinfo/v3/clear.png",
		style: {
			width: "40rpx",
			height: "40rpx",
		}

	}
}
const iconMap: any = {
	"互动消息": "/static/userinfo/v3/message/interaction.png",
	"交易通知": "/static/userinfo/v3/message/transaction.png",
	"订单通知": "/static/userinfo/v3/message/order.png",
	"活动消息": "/static/userinfo/v3/message/act.png",
	"系统消息": "/static/userinfo/v3/message/system.png",
	"系统通知": "/static/userinfo/v3/message/system.png",
	"客服消息": "/static/userinfo/v3/message/kefu.png"
}
@Component({})
export default class ClassName extends BaseNode {
	dynamicData: any = [];
	pageIndex = 1;
	pageSize = 20;
	navHeight = navHeight
	toolsMapCustomNew = toolsMap
	noMoreData = false;
	chatData: { [x: string]: any } = {

	};
	onLoad(query: any) {

	}
	onShow() {
		uni.showTabBar({ animation: false })
		this.getFunc()
	}
	getMessageList() {
		app.http.Get('message/bucketlist', {}, (res: any) => {
			this.dynamicData = (res.list || []).map((item: any) => {
				item.icon = iconMap[item.title]
				return item
			})
		})
	}
	getHeliChat() {
		app.http.Get('heli/chat/data', {}, (res: any) => {
			this.chatData = res.data
		})
	}
	clear() {
		uni.showLoading({
			title: ""
		})
		app.http.Post("message/read/all", { name: "all" }, () => {
			setTimeout(() => {
				this.getFunc()
				uni.hideLoading()
				uni.showToast({
					title: "操作成功"
				})
			}, 500)

		}, () => {
			uni.hideLoading()
		})
	}
	getFunc() {
		// #ifndef MP-WEIXIN
		if (app.token.accessToken == '') {
			app.login.arouseLogin()
			return;
		}
		this.pageIndex = 1;
		this.noMoreData = false
		this.getMessageList()
		this.getHeliChat()
		// #endif
	}
	onClickHeli(id: any) {
		// 第三方客服
		let params = {
			agentExten: id || ''
		}
		app.platform.heliService(params)
	}
	onClickDynamic(type: any) {
		uni.navigateTo({
			url: '/pages/userinfo/dynamic?type=' + type
		})
	}
	getTime(second: number) {
		let now = new Date();
		let sendTime = new Date(second * 1000);
		const day = 24 * 60 * 60 * 1000;

		let isShowYear = new Date().getFullYear() != sendTime.getFullYear();
		if (isShowYear) {
			return formatDateToYear(sendTime.getTime());
		}
		let isShowDate = now.getDate() != sendTime.getDate() || now.getTime() - sendTime.getTime() > day;
		if (isShowDate) {
			return formatDateToMonth(sendTime.getTime());
		}
		return formatDateToHour(sendTime.getTime());
	}

}
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	box-sizing: border-box;
}

.fakeTop {
	opacity: 0;
	pointer-events: none;
}

.top {
	width: 100%;
	// border-bottom: 20rpx solid $content-bg;
	box-sizing: border-box;
	padding: 0 32rpx;
}

.bottom {
	width: 100%;
	box-sizing: border-box;
	padding: 0 32rpx;
}

.index {
	width: 100%;
	height: 148rpx;
	display: flex;
	box-sizing: border-box;
	align-items: center;
	justify-content: space-between;
	position: relative;

	.line {
		width: 587rpx;
		height: 1rpx;
		background: #E6E6E6;
		position: absolute;right: 0;
		bottom: 0;
	}

	.left {
		width: 560rpx;
		height: 148rpx;
		display: flex;
		box-sizing: border-box;
		display: flex;
		align-items: center;

		.icon {
			width: 84rpx;
			height: 84rpx;
			border-radius: 50%;
			display: flex;
			box-sizing: border-box;
			align-items: center;
			justify-content: center;
			margin-right: 24rpx;
			overflow: hidden;

			.icon-zx {
				width: 42rpx;
				height: 34rpx;
				background: url(../../static/userinfo/zaixian@2x.png) no-repeat center;
				background-size: 100% 100%;
			}

			.icon-tz {
				width: 46rpx;
				height: 44rpx;
				background: url(../../static/userinfo/tongzhi@2x.png) no-repeat center;
				background-size: 100% 100%;
			}

			.icon-kf {
				width: 84rpx;
				height: 84rpx;
				background: #AAAAAA;
				border-radius: 50%;
			}
		}

		.desc {
			width: 450rpx;
			height: 148rpx;
			box-sizing: border-box;
			padding: 32rpx 0;
			display: flex;
			align-items: center;
			flex-wrap: wrap;

			.desc-title {
				width: 100%;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 600;
			}

			.desc-message {
				width: 100%;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #767880;
			}
		}
	}

	.right {
		width: 120rpx;
		height: 84rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;

		.time {
			width: 100%;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #AAAABB;
			margin-bottom: 6rpx;
			text-align: end;
		}

		.new-message {
			width: 32rpx;
			height: 32rpx;
			background: #FF4349;
			border-radius: 50%;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 20rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
	}
}

.border {
	// border-bottom: 1px solid #F1F1F4;
}

.desc-message /deep/ p {
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: #767880;
}

.desc-message /deep/ image {
	width: 50rpx !important;
	height: 50rpx;
}

.desc-message /deep/ img {
	width: 50rpx !important;
	height: 50rpx;
}
</style>
