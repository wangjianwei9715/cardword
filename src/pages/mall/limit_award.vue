<template>
	<view style="padding-bottom: calc(20rpx + env(safe-area-inset-bottom))">
		<view class="menu uni-flex">
			<view class="menu-item" @click="menuChange(item,index)" :class="{selectItem:index==tagMenu.index}"
				v-for='(item,index) in tagMenu.list' :key='index'>{{item.name}}</view>
		</view>
		<view class="commodity" v-for="(item,index) in awardList" :key="index">
			<muqian-lazyLoad class="commodity-image" :src="decodeURIComponent(item.logo)" />
			<view class="commodity-right">
				<view class="title oneLineOver">{{item.name}}
				</view>
				<view class="normal" style="margin-top: 20rpx;">{{dateFormatMSHMS(item.start_at)}}开抢</view>
				<view class="normal" style="margin-top: 10rpx;">限量{{item.leftNum}}份</view>
				<view class="commodity-bottom">
					<view class="normal" style="color: #EF3333;font-weight: 600;">{{item.price}}卡币</view>
					<template v-if='tagMenu.index==0'>
						<view class="startPanicBuying buying" v-if="(item.start_at-countDown<=0)"
							@click="onClickExchange(item)">兑 换</view>
						<view class="startPanicBuying" v-else>即将开抢</view>
					</template>
					<view class="participation" v-if='tagMenu.index==1&&item.avatar'>
						<muqian-lazyLoad v-for="(avatarItem,avatarIndex) in item.avatar.split(',')" class="avatar"
							:src="decodeURIComponent(avatarItem)" :key='avatarIndex'/>
						<view class="normal" style="font-size: 21rpx;">等用户已抢</view>
					</view>

				</view>
			</view>
		</view>
		<mallPopup :showPopup="showPopup" :awardData="awardData" @popupClose="showPopup = false"
			@popupConfirm="onClickExConfirm"></mallPopup>
		<mallPopup :showPopup="showPopupToast" :popupType="'toast'" @popupClose="showPopupToast = false"
			@popupConfirm="onClickGoAward"></mallPopup>
		<empty v-if='!awardList.length' />
	</view>
</template>

<script lang="ts">
	import { app } from "@/app";
	import { Component } from "vue-property-decorator";
	import BaseNode from "../../base/BaseNode.vue";
	import { dateFormatMSHMS } from "@/tools/util";
	@Component({})
	export default class ClassName extends BaseNode {
		dateFormatMSHMS: any = dateFormatMSHMS
		countDown: any = Math.round(+new Date() / 1000);
		count_down: any;
		showPopup = false;
		showPopupToast = false;
		awardData: { [x: string]: any } = {
			id: 0,
			logo: "",
			price: 0,
			limit_num:0,//限购份数，0代表不限制
		};
		requestLock: boolean = false;
		tagMenu: any = {
			index: 0,
			list: [
				{
					name: "即将开抢",
					value: 1
				},
				{
					name: "兑奖历史",
					value: 2
				}
			]
		};
		queryParams: any = {
			pageIndex: 1,
			pageSize: 20,
			tp: 11, //1 兑换奖品，11 限时好礼
			state: 1//1 兑换中，2 已兑完
		};
		totalPage: number = 0;
		awardList: any = []
		onLoad(query: any) {
			this.reqNewData()
			this.getCountDown()
		}
		onPullDownRefresh() {
			this.queryParams.pageIndex = 1
			this.reqNewData(() => {
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 500)
			})
		}
		onReachBottom() {
			if (this.queryParams.pageIndex < this.totalPage) {
				this.queryParams.pageIndex += 1
				this.reqNewData()
			}
		}
		onClickGoAward() {
			uni.navigateTo({
				url: "/pages/mall/record_award"
			});
			this.showPopupToast = false;
		}
		onClickExchange(item: { [x: string]: any }) {
			for (const key in this.awardData) {
				if (Object.prototype.hasOwnProperty.call(item, key)) {
					this.awardData[key] = item[key];
				}
			}
			this.showPopup = true;
		}
		onClickExConfirm() {
			if(this.requestLock) return
			this.requestLock=true
			app.http.Post(
				"point/exchange/exchange/" + this.awardData.id,
				{},
				(res: any) => {
					this.requestLock=false
					this.showPopup = false;
					this.showPopupToast = true
				}, (err: any) => {
					this.requestLock=false
				}
			);
		}
		// 倒计时定时器
		getCountDown() {
			this.count_down = this.scheduler(() => {
				this.countDown++;
			}, 1);
		}
		// 倒计时时间计算
		getTime(countDown: number) {
			if (countDown <= 0) {
				// 有商品可以兑换以后重新请求数据
				clearInterval(this.count_down);
				return;
			}
			let day = String(Math.floor(countDown / 3600 / 24));
			let day_num = countDown - 3600 * 24 * Number(day);
			let hour =
				Math.floor(day_num / 3600) < 10
					? "0" + Math.floor(day_num / 3600)
					: Math.floor(day_num / 3600);
			let minute =
				Math.floor((day_num - 3600 * Number(hour)) / 60) < 10
					? "0" + Math.floor((day_num - 3600 * Number(hour)) / 60)
					: Math.floor((day_num - 3600 * Number(hour)) / 60);
			let second =
				Math.floor((day_num - 3600 * Number(hour)) % 60) < 10
					? "0" + Math.floor((day_num - 3600 * Number(hour)) % 60)
					: Math.floor((day_num - 3600 * Number(hour)) % 60);
			return (
				(Number(day) > 0 ? day + "天 " : "") + hour + ":" + minute + ":" + second
			);
		}
		menuChange(item: any, index: number) {
			if (this.tagMenu.index == index) return;
			this.tagMenu.index = index;
			this.queryParams.state = this.tagMenu.list[this.tagMenu.index].value
			this.queryParams.pageIndex = 1
			this.reqNewData()
		}
		reqNewData(cb?: Function) {
			app.http.Get(
				"dataApi/point/exchange/goodlist",
				this.queryParams,
				(res: any) => {
					this.totalPage = res.totalPage;
					const reqList = res.list || [];
					this.queryParams.pageIndex == 1
						? (this.awardList = reqList)
						: this.awardList.push(...reqList);
					cb && cb();
				}
			);
		}
	}
</script>

<style lang="scss">
	page {
		font-family: PingFang SC;
	}
	.menu {
		width: 750rpx;
	}

	.menu-item {
		width: 50%;
		text-align: center;
		line-height: 96rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #959699;
	}

	.selectItem {
		font-weight: 600;
		color: #333333;
	}

	.commodity {
		padding: 0 26rpx;
		display: flex;
		justify-content: space-between;
		margin: 20rpx 0;
	}

	.buying {
		background: #e84f5e !important;
		color: #fff;
	}

	.commodity-image {
		width: 188rpx;
		height: 188rpx;
		background: #333333;
		border-radius: 3rpx;
	}

	.commodity-right {
		width: 70%;

		.title {
			font-size: 29rpx;
			font-weight: 600;
			color: #333333;
		}

		.normal {
			font-size: 25rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}
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