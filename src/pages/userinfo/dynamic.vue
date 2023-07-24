<template>
	<view class="content">
		<navigationbar title="消息" :custom="true">
			<template slot="right">
				<image src="@/static/userinfo/v3/clear.png" style="width: 40rpx;height: 40rpx" @click="onClickReadAll"></image>
			</template>
		</navigationbar>
		<view class="dynamic-content" v-if="!['social', 'order', 'trade'].includes(bucketName)">
			<view class="dynamic-item" @click="onClickDynamic(index, item.pagePath, item.msgId)"
				v-for="(item, index) in dynamicData" :key="item.msgId">
				<view class="left">
					<image class="img" src="/static/index/message_icon.png" />
					<view class="info">
						<view class="name">{{ item.title }}</view>
						<view class="des">{{ item.content }}</view>
					</view>
				</view>
				<view class="right-new">
					{{ getTime(item.sendTime) }}
					<view v-show="!item.read && !readAll" class="icon-new"></view>
				</view>
			</view>
		</view>
		<template v-if="bucketName == 'social'">
			<view class="interaction" v-for="(item, index) in dynamicData" @click="onClickInteraction(item)">
				<view style="display: flex;width: 100%;">
					<muqian-lazyLoad class="avatar"
						:src="$parsePic(decodeURIComponent(item.avatar)) || app.defaultAvatar"></muqian-lazyLoad>
					<view class="info">
						<view class="name">{{ item.userName }}</view>
						<view class="source">
							{{ item.title }}
							<text class="source_time">{{ $u.timeFrom(item.sendTime, "yyyy-mm-dd") }}</text>
						</view>
						<view class="info_content" v-if="item.tp != 5">{{ item.content }}</view>
						<view class="info_content info_content_back" v-if="item.tp == 5">
							{{ item.content }}
							<text>点击查看</text>
						</view>
					</view>
					<view class="rightInfo">
						<view class="followButton flexCenter" @click.stop="onClickFollow(item)"
							:class="{ followButton_dis: (followMap[item.followState] && followMap[item.followState].isFollow) }"
							v-if="item.tp === 1">{{ followMap[item.followState] && followMap[item.followState].text }}
						</view>
						<muqian-lazyLoad v-else :src="$parsePic(decodeURIComponent(item.pic))"
							class="interaction_pic"></muqian-lazyLoad>
					</view>
				</view>
				<view class="line"></view>
			</view>
		</template>
		<template v-if="bucketName == 'order' || bucketName == 'trade'">
			<view class="orderItem" v-for="(item, index) in dynamicData" @click="onClickInteraction(item)">
				<view class="merWrap">
					<muqian-lazyLoad borderRadius="50%" class="avatar"
						:src="$parsePic(decodeURIComponent(item.merchant.logo))"></muqian-lazyLoad>
					<view class="name">{{ item.merchant.name }}</view>
					<view class="dot" v-if="!item.read&&!readAll"></view>
				</view>
				<view class="line"></view>
				<view class="tipsWrap">
					<view class="title">{{ item.title }}</view>
					<view class="time">{{ $u.timeFrom(item.sendTime, "yyyy-mm-dd") }}</view>
				</view>
				<view class="goodsWrap">
					<view class="content">{{ item.content }}</view>
					<muqian-lazyLoad class="pic" :src="$parsePic(decodeURIComponent(item.goodPic))"
						borderRadius="3rpx"></muqian-lazyLoad>
				</view>
			</view>
			<!-- <view class="interaction" v-for="(item, index) in dynamicData" @click="onClickInteraction(item)">
				<muqian-lazyLoad class="avatar"
					:src="$parsePic(decodeURIComponent(item.avatar)) || app.defaultAvatar"></muqian-lazyLoad>
				<view class="info">
					<view class="name">{{ item.userName }}</view>
					<view class="source">
						{{ item.title }}
						<text class="source_time">{{ $u.timeFrom(item.sendTime, "yyyy-mm-dd") }}</text>
					</view>
					<view class="info_content">{{ item.content }}</view>
				</view>
				<view class="rightInfo">
					<view class="followButton flexCenter" @click.stop="onClickFollow(item)"
						:class="{ followButton_dis: (followMap[item.followState] && followMap[item.followState].isFollow) }"
						v-if="item.tp === 1">{{ followMap[item.followState] && followMap[item.followState].text }}</view>
					<muqian-lazyLoad v-else :src="$parsePic(decodeURIComponent(item.pic))"
						class="interaction_pic"></muqian-lazyLoad>
				</view>
			</view> -->
		</template>
	</view>
</template>

<script lang="ts">
import {
	app
} from "@/app";
import {
	Component
} from "vue-property-decorator";
import {
	formatDateToHour,
	formatDateToMonth,
	formatDateToYear
} from "@/tools/util";
import { followActionByUser } from "@/pages/cardForum/func"
import BaseNode from '../../base/BaseNode.vue';
const followMap: any = {
	0: {
		text: "关注",
		isFollow: false,
		nextState: 2
	},
	1: {
		text: "回关",
		isFollow: false,
		nextState: 3
	},
	2: {
		text: "已关注",
		isFollow: true,
		nextState: 0
	},
	3: {
		text: "互关",
		isFollow: true,
		nextState: 1
	}
}
@Component({})
export default class ClassName extends BaseNode {
	dynamicData: {
		[x: string]: any
	} = [];
	bucketName = '';
	currentPage = 1;
	pageSize = 20;
	noMoreData = false;
	readAll = false;
	followMap = followMap
	app = app
	onLoad(query: any) {
		if (query.type) {
			this.bucketName = query.type
		}
		this.init()
	}
	//   加载更多数据
	onReachBottom() {
		this.reqNewData()
	}
	init() {
		let params: {
			[x: string]: any
		} = {
			pageIndex: this.currentPage,
			pageSize: this.pageSize
		}
		app.http.Get('message/bucket/' + this.bucketName, params, (data: any) => {
			if (data.msglist) {
				this.dynamicData = data.msglist;
				this.currentPage = data.msglist[data.msglist.length - 1].msgId
			} else {
				this.noMoreData = true;
			}
			if (data.end) {
				this.noMoreData = true;
			}
		});
	}
	onClickReadAll() {
		uni.showModal({
			title: '提示',
			content: '是否确认已读所有消息',
			success: (res) => {
				if (res.confirm) {
					app.http.Post('message/readAll', {
						name: 'trade'
					}, (res: any) => {
						this.readAll = true
						uni.showToast({
							title: '操作成功',
							icon: 'none'
						})

					})
				} else if (res.cancel) {
				}
			}
		});

	}
	onClickBack() {
		uni.navigateBack({
			delta: 1,
		});
	}
	onClickDynamic(index: number, url: any, id: any) {
		let msgId = String(id)
		app.http.Post('message/read', {
			msgIds: msgId
		}, (res: any) => {
			this.dynamicData[index].read = true;
			uni.navigateTo({
				url: url
			})
			uni.$emit('dynamic')
		})

	}
	onClickInteraction(item: any) {
		if (item.pagePath) {
			uni.navigateTo({
				url: item.pagePath
			})
			item.read=true
			return
		}
	}
	onClickFollow(item: any) {
		if (!item.userId) {
			uni.showToast({
				title: "无效用户",
				icon: 'none'
			})
			return
		}
		const isFollow = followMap[item.followState].isFollow
		followActionByUser(item.userId, isFollow).then(() => {
			item.followState = followMap[item.followState].nextState
		})
	}
	reqNewData(cb?: Function) {
		// 获取更多商品
		if (this.noMoreData) {
			return;
		}

		let params: {
			[x: string]: any
		} = {
			referMsgId: this.currentPage,
			pageSize: this.pageSize
		}
		app.http.Get('message/bucket/' + this.bucketName + '/msglist', params, (data: any) => {
			if (data.msglist) {
				this.dynamicData = this.dynamicData.concat(data.msglist);
				this.currentPage = data.msglist[data.msglist.length - 1].msgId
			} else {
				this.noMoreData = true;
			}
			if (data.end) {
				this.noMoreData = true;
			}
			if (cb) cb()
		});

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

<style lang="scss">
page {
	background-color: #f6f7fb;
}

.dynamic-content {
	width: 100%;
	box-sizing: border-box;
	padding: 0rpx 0 0 0;
	position: relative;
	z-index: 2;
}

.dynamic-item {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10rpx 30rpx;
	box-sizing: border-box;
	background: #fff;
	padding-bottom: 30rpx;
	// margin-bottom: 20rpx;
}

.dynamic-item .left {
	width: auto;
	display: flex;
	align-items: center;
}

.dynamic-item .left .img {
	width: 76rpx;
	height: 76rpx;
	border-radius: 50%;
	margin-right: 36rpx;
}

.dynamic-item .left .info {
	width: 460rpx;
	display: flex;
	align-items: center;
	flex-wrap: wrap;

}

.dynamic-item .left .name {
	width: 100%;
	font-size: 30rpx;
	font-family: HYQiHei;
	font-weight: bold;
	color: #3B3B3B;
}

.dynamic-item .left .des {
	width: 100%;
	font-size: 24rpx;
	font-family: Microsoft YaHei;
	font-weight: bold;
	color: #7B7B7B;
}

.dynamic-item .right {
	width: auto;
	height: auto;
	display: flex;
	align-items: center;
	flex: 1;
	justify-content: flex-end;
	flex-wrap: wrap;
}

.dynamic-item .right .time {
	width: 100%;
	text-align: right;
	font-size: 24rpx;
	font-family: HYQiHei;
	font-weight: normal;
	color: #7B7B7B;
}

.message-content {
	width: 100%;
	height: auto;
	margin-top: 14rpx;
}

.right-new {
	width: 140rpx;
	height: 148rpx;
	display: flex;
	box-sizing: border-box;
	align-items: center;
	justify-content: flex-end;
	font-size: 24rpx;
	font-family: HYQiHei;
	font-weight: normal;
	color: #7B7B7B;
	position: relative;
}

.header-likes {
	width: 200rpx;
	height: 94rpx;
	line-height: 104rpx;
	font-size: 22rpx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #ababbb;
	text-align: right;
}

.interaction {
	width: 750rpx;
	box-sizing: border-box;
	// display: flex;
	padding-bottom: 36rpx;
	// border-bottom: 1rpx solid #E6E6E6;
	// margin-bottom: 36rpx;
	// margin-top: 36rpx;

	box-sizing: border-box;
	padding: 0 30rpx;
	padding-top: 36rpx;
	padding-bottom: 36rpx;
	background-color: #ffffff;

	.line {
		height: 1rpx;
		width: 100%;
		background-color: #E6E6E6;
		margin-top: 47rpx;
	}

	.avatar {
		width: 73rpx;
		height: 73rpx;
		// background: #FA1545;
		border-radius: 50%;
		margin-right: 21rpx;
	}

	.info {
		flex: 1;

		.name {
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			margin-bottom: 8rpx;
		}

		.source {
			display: flex;
			align-items: center;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-bottom: 20rpx;

			.source_time {
				font-size: 19rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #C0C0C0;
				margin-left: 22rpx;
			}
		}

		.info_content {
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			text-align: left;
			color: #333333;
			max-width: 90%;
			white-space: pre-wrap;
		}

		.info_content_back {
			padding: 10rpx;
			// width: auto;
			display: inline-block;
			background-color: #F5F5F5;
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #707070;

			text {
				margin-left: 10rpx;
				font-size: 21rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #707070;
			}
		}
	}

	.rightInfo {
		.followButton {
			width: 114rpx;
			height: 47rpx;
			background: #FA1545;
			border-radius: 3rpx;
			border: 1rpx solid #FA1545;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}

		.followButton_dis {
			width: 115rpx;
			height: 47rpx;
			border: 1rpx solid #C0C0C0;
			border-radius: 3rpx;
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}

		.interaction_pic {
			width: 91rpx;
			height: 91rpx;
			// background: #FA1545;
		}
	}
}

.orderItem {
	width: 710rpx;
	// height: 283px;
	background: #FFFFFF;
	border-radius: 3rpx;
	box-sizing: border-box;
	padding: 25rpx 35rpx 35rpx 34rpx;
	margin-top: 20rpx;

	.merWrap {
		display: flex;
		align-items: center;

		.avatar {
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			margin-right: 10rpx;
		}

		.name {
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #959695;
			flex: 1;
		}

		.dot {
			width: 13rpx;
			height: 13rpx;
			background: #FA1545;
			border-radius: 50%;
		}
	}

	.line {
		height: 1rpx;
		background-color: #E6E6E6;
		margin-top: 16rpx;
		margin-bottom: 23rpx;
	}

	.tipsWrap {
		display: flex;
		justify-content: space-between;
		margin-bottom: 14rpx;

		.title {
			font-size: 29rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
		}

		.time {
			font-size: 21rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #C0C0C0;
		}
	}

	.goodsWrap {
		display: flex;

		.content {
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #767880;
			flex: 1;
			margin-right: 10rpx;
			// width: 500rpx;
		}

		.pic {
			width: 117rpx;
			height: 90rpx;
			border-radius: 3rpx;
		}
	}
}
</style>
