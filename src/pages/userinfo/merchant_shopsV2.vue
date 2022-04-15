<template>
	<view class="content">
		<view class="header-banner">
			<statusbar />
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
				<view class="header-title">
					<!-- <image class="header-title-img" :src="decodeURIComponent(detail.logo)" mode="aspectFit"></image> -->
					<!-- {{detail.name}} -->
					商家店铺
				</view>
				<view class="header-right uni-flex">
					<!-- <image src="../../static/userinfo/v2/back.png" mode="widthFix"  alt="" @click="onClickBack">
					<image src="../../static/userinfo/v2/search.png"  mode="widthFix" style="width:35rpx" alt=""> -->
				</view>
				<!-- <view class="icon-liaotian" @click="onClickLT"></view> -->
			</view>

			<!-- <view class="header-tab">
				<tabc :tabc="goodTab" :tabsCheck="goodTabCheck" @tabsClick="onClickListTabs"></tabc>
			</view> -->
		</view>
		<view style="padding-top:70rpx">
			<statusbar />
		</view>
		<view class="business">
			<view class="business-top uni-flex">
				<image :src="decodeURIComponent(detail.logo)" class="business-avart" mode="aspectFill" />
				<view class="business-info">
					<view class="nameInfo uni-flex">
						<text>{{detail.name}}</text>
						<view class="entityInfo" v-if="detail.title">
							{{detail.title}}
						</view>
					</view>
					<view class="fansInfo">
						粉丝{{detail.fans}} | 在售{{detail.sale}}
					</view>
				</view>
				<view class="business-rightAction">
					<followButton v-if="buttonShow" :follow='detail.followed' :followID='detail.id'
						@handleSuccess='followSuccess($event,detail)'></followButton>
					<!-- <view class="actionItem " :class="{redAction:!detail.followed}">{{detail.followed?'取消关注':'关注'}}
					</view> -->
					<!-- <view class="actionItem" @click="onClickShops(item)">进店看看</view> -->
				</view>
			</view>
		</view>
		<view class="tabsMenu uni-flex">
			<view class="menuItem" :class="{selectItem:index==goodTabV2.index}" @click="tabsChange(item,index)"
				v-for="(item,index) in goodTabV2.list" :key='index'>
				{{item.name}}
				<text v-if="item.valueKey">({{detail[item.valueKey]}})</text>
			</view>
		</view>
		<view style="padding:0 13rpx" v-if="goodTabV2.index==0">
			<goodslist :goodsList='goodsList' @send="onClickJumpDetails" :presell="false"></goodslist>
		</view>
		<view style="padding:0 13rpx" v-if="goodTabV2.index==1">
			<liveslist :liveList='liveList'></liveslist>
		</view>
		<view v-if="goodTabV2.index==2" style="width:100%">
			<image :src="decodeURIComponent(item)" style="margin:6rpx auto;display:block;width:94%"
				@click.stop="previewImg(index,detail.certification)" v-for="(item,index) in detail.certification"
				:key="index" mode="widthFix"></image>
		</view>
		<empty
			v-show='(goodTabV2.index==0&&!goodsList.length) || (goodTabV2.index==1&&!liveList.length) || (goodTabV2.index==2&&!detail.certification.length)'>
		</empty>
		<view class="safetyBottom"></view>
		<!-- <view class="goods-lists" v-if="goodsList!=''">
			<goodslist :goodsList="goodsList" @send="onClickJumpDetails" :presell="false" />
		</view> -->
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
	@Component({})
	export default class ClassName extends BaseNode {
		goodTab = [{
				id: 1,
				name: "在售"
			},
			{
				id: 2,
				name: "已成交"
			}
		];
		liveList: any = [];
		qualifications = ["../../static/userinfo/v2/fakerBg.png"];
		goodTabV2: any = {
			index: 0,
			list: [{
					value: 1,
					name: "在售",
					assignKey: "goodsList",
					url: "merchant/goodlist/",
					query: {
						tp: 1
					},
					valueKey: "sale"
				},
				{
					value: 2,
					name: "拆卡",
					assignKey: "liveList",
					url: "merchant/broadcast/list/",
					query: {},
					valueKey: "upload"
				}

			]
		};
		defaultAvatar = app.defaultAvatar;
		goodTabCheck = 1;
		merchantId = 0;
		merchantName = "";
		merchantAvatar = "";
		buttonShow = false;
		detail = {
			id: null,
			fans: 0,
			followed: false,
			logo: "",
			name: "",
			sale: 0,
			upload: 0,
			certification: []
		};
		totalPage = 0;
		goodsList: any = [];
		queryParams = {
			pageIndex: 1,
			pageSize: 20
		};
		onLoad(query: any) {
			if (query.id) this.getBusDetail(query.id);

		}
		previewImg(current: number, urls: any) {
			urls = urls.map((item: any) => decodeURIComponent(item));
			uni.previewImage({
				current,
				urls
			});
		}
		getBusDetail(id: number) {
			app.http.Get("merchant/detail/" + id, {}, (res: any) => {
				// console.log(res)
				this.detail = res.data;
				this.detail.certification = this.detail.certification || [];
				if (this.detail.certification.length) {
					this.goodTabV2.list.push({
						value: 3,
						name: "商家资质",
						assignKey: "none"
					})
				}
				this.buttonShow = true

				this.getList()
			});
		}
		onReachBottom() {
			if (
				this.queryParams.pageIndex < this.totalPage &&
				this.goodTabV2.index != 2
			) {
				this.queryParams.pageIndex += 1;
				this.getList();
			}
		}
		onPullDownRefresh() {
			this.queryParams.pageIndex = 1;
			this.getList();
		}
		followSuccess(event: any, item: any) {
			item.followed = event.follow;
			item.fans = event.follow ? item.fans + 1 : item.fans - 1;
			uni.$emit('followAction', item)
		}
		tabsChange(item: any, index: number) {
			this.goodTabV2.index = index;
			if (index != 2) this.getList();
		}
		getList() {
			const questItem: any = this.goodTabV2.list[this.goodTabV2.index];
			app.http.Get(
				questItem.url + this.detail.id, {
					...this.queryParams,
					...questItem.query
				},
				(res: any) => {
					this.totalPage = res.totalPage;
					const dataList = res.list || [];
					if (this.queryParams.pageIndex === 1) {
						this.goodsList = [];
						this.liveList = [];
					}
					if (questItem.value == 1)
						this.goodsList = [...this.goodsList, ...dataList];
					if (questItem.value == 2)
						this.liveList = [...this.liveList, ...dataList];
					uni.stopPullDownRefresh();
				}
			);
		}
		onClickBack() {
			uni.navigateBack({
				delta: 1
			});
		}
		// 跳转商品详情
		onClickJumpDetails(id: any) {
			uni.navigateTo({
				url: "/pages/goods/goods_details?id=" + id
			});
		}
	}
</script>

<style lang="scss">
	$font-34: 34rpx;

	page {
		background: #ffffff;
	} 

	.safetyBottom {
		width: 750rpx;
		background-color: #fff;
		padding-bottom: env(safe-area-inset-bottom);
	}
  
	.content {
		width: 100%;
		box-sizing: border-box;
		// padding:0 49rpx;
		// align-items: flex-start;
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
			background: url(../../static/goods/back@2x.png) no-repeat center;
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
			background: url(../../static/userinfo/liaotian@2x.png) no-repeat center;
			background-size: 100% 100%;
		}
	}

	.header-tab {
		width: 100%;
		height: 90rpx;
		margin-top: -10rpx;
		padding: 0 170rpx;
		box-sizing: border-box;
	}

	.business {
		background-color: #fff;
		margin: 15rpx 0;
		width: 89%;
		// width: 100%;

		&-top {
			align-items: center;
			// padding: 0 21rpx;
			padding-top: 37rpx;
			// justify-content: space-between;
		}

		&-avart {
			width: 103rpx;
			height: 103rpx;
			display: block;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 37rpx;
		}

		&-info {
			flex: 1;

			.nameInfo {
				// align-content: flex-end
				// align-items: flex-end;
				align-items: center;

				text {
					display: block;
					font-size: 26rpx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: #333333;
					line-height: 28px;
					margin-right: 10rpx;
				}

				.entityInfo {
					background-size: 100% 100%;
					height: 22rpx;
					background-image: url("../../static/userinfo/v2/entityBg.png");
					padding: 0 10rpx;
					text-align: center;
					font-size: 18rpx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					line-height: 24rpx;
					color: #ffffff;
				}
			}

			.fansInfo {
				font-size: 22rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #88878c;
				letter-spacing: 1rpx;
			}
		}

	}

	.tabsMenu {
		width: 87%;
		// width: 100%;
		// padding: 0 49rpx;
		margin-top: 36rpx;
		margin-bottom: 34rpx;

		.menuItem {
			font-size: 26rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #333333;
			// margin-right: 80rpx;
			width: 30%;
		}

		.selectItem {
			font-weight: bold;
		}
	}

	.goods-lists {
		background: $content-bg;
		width: 100%;
		box-sizing: border-box;
		padding: 16rpx 20rpx;
	}
</style>
