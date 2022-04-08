<template>
	<view class="content">
		<view class="header-banner">
			<!-- <statusbar/> -->
			<view class="tab-header">
				<view class="icon-back" @click="onClickBack"></view>
				<view class="header-title">
					<image class="header-title-img" :src="decodeURIComponent(detail.logo)" mode="aspectFit"></image>
					{{detail.name}}
				</view>
				<view class="icon-liaotian" @click="onClickLT"></view>
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
							<text>{{detail.title}}</text>
						</view>
					</view>
					<view class="fansInfo">
						粉丝{{detail.fans}} | 在售{{detail.sale}}
					</view>
				</view>
				<view class="business-rightAction">
					<followButton :follow='detail.followed' :followID='detail.id'
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
		<view style="padding:0 10rpx" v-if="goodTabV2.index==2">
			<image :src="item" v-for="(item,index) in detail.certification" :key="index" mode="aspectFill"></image>
		</view>
		<empty
			v-show='(goodTabV2.index==0&&!goodsList.length) || (goodTabV2.index==1&&!liveList.length) || (goodTabV2.index==2&&!detail.certification.length)'>
		</empty>
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
	import BaseNode from '../../base/BaseNode.vue';
	@Component({})
	export default class ClassName extends BaseNode {
		goodTab = [{
				id: 1,
				name: '在售'
			},
			{
				id: 2,
				name: '已成交'
			}
		];
		liveList = [];
		qualifications = ['../../static/userinfo/v2/fakerBg.png'];
		goodTabV2 = {
			index: 2,
			list: [{
					value: 1,
					name: '在售',
					assignKey: 'goodsList',
					valueKey: 'sale'
				},
				{
					value: 2,
					name: '拆卡',
					assignKey: 'liveList',
					valueKey: 'upload'
				}, {
					vauee: 3,
					name: '商家资质',
					assignKey: 'none'
				}
			]
		}
		defaultAvatar = app.defaultAvatar
		goodTabCheck = 1;
		merchantId = 0;
		merchantName = '';
		merchantAvatar = '';
		detail = {
			id: null,
			fans: 0,
			followed: false,
			logo: '',
			name: '',
			sale: 0,
			upload: 0,
			certification: [],
		};
		goodsList: {
			[x: string]: any
		} = [];
		currentPage = 1;
		pageSize = 20;
		noMoreData = false;
		queryParams = {
			pageIndex: 1,
			pageSize: 20,
			tp: 1
		}
		onLoad(query: any) {
			if (query.id) {
				// this.merchantId = query.id;
				// this.merchantName = query.name;
				// this.merchantAvatar = decodeURIComponent(query.avatar)
				this.getBusDetail(query.id)
				// this.reqNewData()
			}
		}
		getBusDetail(id: number) {
			app.http.Get('merchant/detail/' + id, {}, (res: any) => {
				// console.log(res)
				this.detail = res.data
				this.detail.certification = this.detail.certification || []
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
				tp: this.goodTabCheck,
				pageIndex: this.currentPage,
				pageSize: this.pageSize,
			}

			app.http.Get('seller/' + this.merchantId + '/goodlist', params, (data: any) => {
				if (data.totalPage <= this.currentPage) {
					this.noMoreData = true;
				}
				if (data.list) {
					if (this.currentPage == 1) {
						this.goodsList = []
					}
					this.goodsList = this.goodsList.concat(data.list);
				}

				// this.currentPage++;
				if (cb) cb()
			});
		}
		followSuccess(event: any, item: any) {
			item.followed = event.follow
			item.fans = event.follow ? item.fans + 1 : item.fans - 1
		}
		tabsChange(item: any, index: number) {
			this.goodTabV2.index = index
			this.queryParams.tp = item.value
			if (index != 2) this.getList()
			// if (item.name == '在售') this.reqNewData()
		}
		getList() {
			app.http.Get('merchant/goodlist/' + this.detail.id, this.queryParams, (res: any) => {
				// console.log(res)
				// if(res.list){}
				if (this.queryParams.tp == 1) this.goodsList = res.list || []
				if (this.queryParams.tp == 2) this.liveList = res.list || []
			})
		}
		onClickBack() {
			uni.navigateBack({
				delta: 1
			});
		}
		onClickLT() {

		}
		onClickListTabs(id: number) {
			if (id == this.goodTabCheck) {
				return;
			}
			this.goodTabCheck = id;
			this.noMoreData = false;
			this.currentPage = 1;
			this.goodsList = [];
			this.reqNewData()
		}
		// 跳转商品详情
		onClickJumpDetails(id: any) {
			uni.navigateTo({
				url: '/pages/goods/goods_details?id=' + id
			})
		}
	}
</script>

<style lang="scss">
	$font-34:34rpx;

	page {
		background: #ffffff
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
		border-bottom: 1px solid #F4F3F2;

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
			color: #14151A;

			&-img {
				width: 48rpx;
				height: 48rpx;
				border-radius: 50%;
				margin-right: 20rpx;
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
					font-family: FZLanTingHeiS-R-GB;
					font-weight: 400;
					color: #333333;
					line-height: 28px;
					margin-right: 10rpx;
				}

				.entityInfo {
					background-size: 100% 100%;
					width: 96rpx;
					height: 22rpx;
					background-image: url("../../static/userinfo/v2/entityBg.png");

					text {
						font-size: 18rpx;
						font-family: FZLanTingHeiS-R-GB;
						font-weight: 400;
						line-height: 24rpx;
						color: #ffffff;
						white-space: nowrap;
						// letter-spacing: 1rpx;
						transform: scale(0.8);
					}

					// line-height: 30px;
				}
			}

			.fansInfo {
				font-size: 22rpx;
				font-family: FZLanTingHeiS-R-GB;
				font-weight: 400;
				color: #88878c;
				letter-spacing: 1rpx;
			}
		}

		&-rightAction {
			.actionItem {
				width: 122rpx;
				height: 44rpx;
				font-size: 22rpx;
				font-family: FZLanTingHeiS-R-GB;
				font-weight: 400;
				color: #88878c;
				line-height: 44rpx;
				text-align: center;
				letter-spacing: 1rpx;
				background-size: 100% 100%;
				background-image: url("../../static/userinfo/v2/whiteCard.png");
			}

			.actionItem:last-child {
				position: relative;
				top: 15rpx;
			}

			.redAction {
				background-image: url("../../static/userinfo/v2/redCard.png");
				color: #fff;
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
			font-family: FZLanTingHeiS-R-GB;
			font-weight: 400;
			color: #333333;
			margin-right: 80rpx;
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
