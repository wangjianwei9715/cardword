<template>
	<view style="padding-bottom: calc(20rpx + env(safe-area-inset-bottom));">
		<!-- <view class="menu uni-flex">
			<view class="menu-item" @click="menuChange(item,index)" :class="{selectItem:index==tagMenu.index}" v-for='(item,index) in tagMenu.list' :key='index'>{{item.name}}</view>
		</view> -->
		<view class="commodity" v-for="(item, index) in awardList" :key='index'>
			<muqian-lazyLoad @click="onClickPreviewImage(decodeURIComponent(item.logo))" class="commodity-image"
				:src="decodeURIComponent(item.logo)">
			</muqian-lazyLoad>
			<view class="commodity-right" @click="toOrderDetail(item)">
				<view class="title oneLineOver">{{ item.name }}
				</view>
				<view class="normal" style="margin-top: 10rpx;font-size: 20rpx;color: #B8B7B7;">
					兑换时间：{{ dateFormatMSHMS(item.exchangeAt) }}</view>
				<view class="normal" style="margin-top: 10rpx;font-size: 20rpx;color: #B8B7B7;">卡币:{{ item.price }}
				</view>
				<view class="wuliu" v-if='item.goodTp === 2' @click='onClickWuliu(item)'>查看物流</view>
				<template v-if='item.goodTp === 1'>
					<view class="line"></view>
					<view class="normal" style="color:#FB4E3E;font-size: 20rpx;" @click='setCopy(item)'>
						券编号：{{ item.couponCode }}
					</view>
				</template>
			</view>
		</view>
		<empty v-if='!awardList.length' />
	</view>
</template>

<script lang="ts">
import {
	app
} from "@/app";
import {
	Component
} from "vue-property-decorator";
import BaseNode from "../../base/BaseNode.vue";
import {
	dateFormatMSHMS
} from "@/tools/util";
@Component({})
export default class ClassName extends BaseNode {
	dateFormatMSHMS: any = dateFormatMSHMS;
	tagMenu: any = {
		index: 0,

		list: [{
			name: "兑换记录",
			value: 1
		},
		{
			name: "抽奖记录",
			value: 2
		}
		]
	};
	queryParams: any = {
		pageIndex: 1,
		pageSize: 20,
		// tp: 1 //1 兑换记录 2 抽奖记录
	};
	totalPage: number = 0;
	awardList: any = [];
	onLoad(query: any) {
		this.reqNewData();
	}
	onPullDownRefresh() {
		this.queryParams.pageIndex = 1;
		this.reqNewData(() => {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 500);
		});
	}
	onReachBottom() {
		if (this.queryParams.pageIndex < this.totalPage) {
			this.queryParams.pageIndex += 1;
			this.reqNewData();
		}
	}
	onShow() { }
	// 观看大图
	onClickPreviewImage(img: string) {
		uni.previewImage({
			urls: [img],
			current: 0,
			indicator: "number"
		});
	}
	toOrderDetail(item: any) {
		if (!item.code) return
		uni.navigateTo({
			url: `/pages/mall/orderDetail?orderCode=${item.code}`
		})
	}
	setCopy(item: any) {
		if (item.goodTp !== 1) return
		uni.setClipboardData({
			data: item.couponCode,
			success: (res: any) => {
				uni.showToast({
					title: '卷编号复制成功',
					duration: 2000
				})
			}
		})
	}
	onClickWuliu(item: any) {
		if (!item.wuliuCode) {
			uni.showToast({
				title: '暂未发货,请联系客服发货',
				icon: 'none'
			})
			return
		}
		uni.navigateTo({
			url: '/pages/userinfo/order_logistics?code=' + item.wuliuCode
		})
	}
	menuChange(item: any, index: number) {
		if (this.tagMenu.index == index) return;
		this.tagMenu.index = index;
		this.queryParams.tp = this.tagMenu.list[index].value;
		this.queryParams.pageIndex = 1;
		this.reqNewData();
	}
	reqNewData(cb?: Function) {
		app.http.Get(
			"dataApi/point/exchange/myRecordlist",
			this.queryParams,
			(res: any) => {
				this.totalPage = res.totalPage;
				const reqList = res.list || [];
				this.queryParams.pageIndex == 1 ?
					(this.awardList = reqList) :
					this.awardList.push(...reqList);
				cb && cb();
			}
		);
	}
}
</script>

<style lang="scss">
page {
	
	background-color: #f6f7fb;
}

.menu {
	width: 750rpx;
	// margin-bottom: 50rpx;
	background-color: #fff;
}

.menu-item {
	width: 50%;
	text-align: center;
	line-height: 96rpx;
	font-size: 29rpx;
	
	font-weight: 400;
	color: #333333;
}

.selectItem {
	font-weight: 600;
	font-size: 31rpx;
	color: #e23737;
}

.wuliu {
	width: 112rpx;
	height: 34rpx;
	color: #fff;
	font-size: 22rpx;
	text-align: center;
	line-height: 34rpx;
	background: #E84F5E;
	border-radius: 3rpx;
	position: absolute;
	right: 0;
}

.commodity {
	width: 658rpx;
	padding: 20rpx 26rpx;
	display: flex;
	background-color: #fff;
	justify-content: space-between;
	margin: 14rpx auto;
	border-radius: 10rpx;
}

.commodity-image {
	width: 140rpx;
	height: 154rpx;
	// background: #333333;
}

.commodity-right {
	width: 70%;
	position: relative;

	.title {
		font-weight: 600;
		color: #333333;
		font-size: 30rpx;
		color: #666666;
	}

	.normal {
		font-size: 25rpx;
		
		font-weight: 400;
		color: #b8b7b7;
	}
}

.line {
	width: 100%;
	background-color: #e7e7e7;
	height: 1rpx;
	margin: 14rpx 0;
}

.commodity-bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10rpx;
	height: 39rpx;

	.participation {
		display: flex;
		align-items: center;

		.avatar {
			width: 35rpx;
			height: 35rpx;
			background: #dbdbdb;
			display: block;
			border-radius: 50%;
			margin-right: 6rpx;
		}
	}

	.startPanicBuying {
		width: 181rpx;
		height: 39rpx;
		background: #dbdbdb;
		border-radius: 3rpx;
		font-size: 25rpx;
		font-weight: 400;
		color: #ffffff;
		text-align: center;
		line-height: 39rpx;
	}
}
</style>
