<template>
	<view class="content">
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
					<followButton :width="132" :height="46" :fontSize="23" v-if="buttonShow" :follow='detail.followed' :followID='detail.id'
						@handleSuccess='followSuccess($event,detail)'></followButton>
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
		<view class="list-content" v-show="!emptyShow">
			<!-- v-show="goodTabV2.index==0" -->
			<goodslist :goodsList='goodsList' @send="onClickJumpDetails" :presell="false"></goodslist>
			<!-- <liveslist v-show="goodTabV2.index==1" :liveList='liveList'></liveslist> -->
			<image v-show="goodTabV2.index==2" :src="decodeURIComponent(item)" style="margin:6rpx auto;display:block;width:94%"
				@click.stop="previewImg(index,detail.certification)" v-for="(item,index) in detail.certification"
				:key="index" mode="widthFix"></image>
		</view>
		<empty v-show='emptyShow' />
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
					url: "dataApi/merchant/goodlist/",
					query: {
						tp: 1
					},
					valueKey: "sale"
				},
				{
					value: 2,
					name: "已拼成",
					assignKey: "goodsList",
					url: "dataApi/merchant/goodlist/",
					query: {
						tp: 2
					},
					valueKey: "success"
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
		emptyShow = false;
		onLoad(query: any) {
			if (query.id) this.getBusDetail(query.id);

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
			this.againGetList();
		}
		previewImg(current: number, urls: any) {
			urls = urls.map((item: any) => decodeURIComponent(item));
			uni.previewImage({
				current,
				urls
			});
		}
		getBusDetail(id: number) {
			app.http.Get("dataApi/merchant/detail/" + id, {}, (res: any) => {
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
		followSuccess(event: any, item: any) {
			item.followed = event.follow;
			item.fans = event.follow ? item.fans + 1 : item.fans - 1;
			uni.$emit('followAction', item)
		}
		tabsChange(item: any, index: number) {
			if(index == this.goodTabV2.index) return;
			this.goodTabV2.index = index;
			if (index != 2) this.againGetList();
		}
		againGetList(){
			this.queryParams.pageIndex = 1;
			this.emptyShow = false;
			this.getList()
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
					// if (questItem.value == 1)
					// 	this.goodsList = [...this.goodsList, ...dataList];
					// if (questItem.value == 2)
					// 	this.liveList = [...this.liveList, ...dataList];
					this.goodsList = [...this.goodsList, ...dataList];
					uni.stopPullDownRefresh();
					if(res.total==0) this.emptyShow = true;
				}
			);
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
		background: $content-bg;
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
		padding:15rpx 34rpx;
		width: 100%;
		box-sizing: border-box;
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
					font-size: 29rpx;
					font-family: PingFangSC-Regular;
					font-weight: 600;
					color: #333333;
					line-height: 28px;
					margin-right: 10rpx;
				}

				.entityInfo {
					background-size: 100% 100%;
					width: 114rpx;
					height: 32rpx;
					background-image: url("../../static/userinfo/v2/entityBg.png");
					text-align: center;
					font-size: 21rpx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					line-height: 32rpx;
					color: #ffffff;
				}
			}

			.fansInfo {
				font-size: 25rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #88878c;
				letter-spacing: 1rpx;
			}
		}
	}

	.tabsMenu {
		width: 100%;
		display: flex;
		align-items: baseline;
		background:#fff;
		padding:20rpx 34rpx 30rpx 34rpx;
		box-sizing: border-box;
		.menuItem {
			font-size: 27rpx;
			font-family: PingFangSC-Regular;
			font-weight: 400;
			color: #C1C1C1;
			width: 30%;
		}

		.selectItem {
			font-weight: bold;
			font-size: 31rpx;
			color: #333333;
		}
	}

	.goods-lists {
		background: $content-bg;
		width: 100%;
		box-sizing: border-box;
		padding: 16rpx 20rpx;
	}
	.list-content{
		width: 100%;
		box-sizing: border-box;
		padding:14rpx 14rpx;
		background: $content-bg;
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
