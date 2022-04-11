<template>
	<view>
		<view class="header-banner">
			<statusbar />
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
				<view class="header-title">消息</view>
				<view v-if="bucketName == 'trade'" class="header-likes" @click="onClickReadAll">一键已读</view>
			</view>
		</view>
		<view class="dynamic-content">
			<statusbar />
			<view class="dynamic-item" @click="onClickDynamic(index,item.pagePath,item.msgId)"
				v-for="(item,index) in dynamicData" :key="item.msgId">
				<view class="left">
					<image class="img" src="/static/index/message_icon.png" />
					<view class="info">
						<view class="name">{{item.title}}</view>
						<view class="des">{{item.content}}</view>
					</view>
				</view>

				<view class="right-new">
					{{getTime(item.sendTime)}}
					<view v-show="!item.read && !readAll" class="icon-new"></view>
				</view>
			</view>
		</view>
		
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
	import BaseNode from '../../base/BaseNode.vue';
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
		reqNewData(cb ? : Function) {
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

<style>
	.dynamic-content {
		width: 100%;
		box-sizing: border-box;
		padding: 110rpx 0 0 0;
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
		margin-bottom: 20rpx;
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

	.icon-new {
		width: 11rpx;
		height: 11rpx;
		background: #FD0000;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		margin-top: 20rpx;
		right: 0;
	}

	.header-banner {
		width: 100%;
		background: #ffffff;
		position: fixed;
		left: 0;
		top: 0;
		box-sizing: border-box;
		z-index: 9;
	}

	.tab-header {
		width: 100%;
		height: 94rpx;
		display: flex;
		box-sizing: border-box;
		padding: 0 20rpx;
		z-index: 10;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.icon-back {
		width: 80rpx;
		height: 88rpx;
		background: url(../../static/goods/back@2x.png) no-repeat center;
		background-size: 100% 100%;
		position: absolute;
		left: 0;
		top: 0;
	}

	.header-title {
		height: 88rpx;
		line-height: 88rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
	}

	.header-likes {
		height: 94rpx;
		line-height: 104rpx;
		font-size: 22rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #ababbb;
		position: absolute;
		right: 20rpx;
		top: 0;
	}
</style>
