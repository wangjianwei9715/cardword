<template>
	<view>
		<!-- 卖家信息 -->
		<view class="detail-bg" v-if="publisher != ''">
			<view class="business" v-for="(item,index) in publisher" :key="item.id">
				<view class="business-top uni-flex">
					<image :src="item.logo != '' ? decodeURIComponent(item.logo) : defaultAvatar" class="business-avart"
						mode="aspectFill" />
					<view class="business-info">
						<view class="nameInfo uni-flex">
							<text>{{item.name}}</text>
							<view class="entityInfo" v-if="item.title">
								<text>{{item.title}}</text>
							</view>
						</view>
						<view class="fansInfo">
							粉丝{{item.fans}} | 在售{{item.saleGoodNum}}
						</view>
					</view>
					<view class="business-rightAction">
						<view class="actionItem" :class="{redAction:!item.follow}" @click="followAction(item,index)">
							{{item.follow?'取消关注':'关注'}}
						</view>
						<view class="actionItem" @click="onClickShops(item)">进店看看</view>
					</view>
				</view>
				<view v-if='item.goodList&&item.goodList.length'>
					<scroll-view class="scroll-goodslist uni-flex" scroll-x="true">
						<view class="scroll-goodslist-item" v-for="(goodsItem,goodsIndex) in item.goodList"
							:key='goodsItem.goodCode'>
							<view class="picBlock">
								
								<image :src="decodeURIComponent(goodsItem.pic)" mode="aspectFill"></image>
								<view class="angleMark" :style="{backgroundColor:goodsItem.statusName=='在售'?'#f5162b':'#4f8bf5'}">
									{{goodsItem.statusName}}
								</view>
							</view>
							<view class="onelineName">{{goodsItem.goodName}}</view>
							<view class="bottomState uni-flex">
								<view class="bottomState-left">
									<template v-if="goodsItem.statusName=='在售'">
										￥<text>{{goodsItem.price}}</text>
									</template>
								</view>
								<view class="bottomState-right">{{goodsItem.statusName}}</view>
							</view>
						</view>
					</scroll-view>
					<!-- <liveslist :liveList="item.goodList" /> -->
				</view>
				<view class="noneTips" v-else>
					该商家暂无商品～
				</view>
			</view>
			<followModal v-show='folloModalShow' @cancel='folloModalShow=false' @confirm='follow'></followModal>
			<!-- <view class="goods-seller" v-for="item in publisher" :key="item.id">
        <view class="goods-seller-left">
          <image
            class="goods-seller-left-avatar"
            :src="
              item.logo != '' ? decodeURIComponent(item.logo) : defaultAvatar
            "
            mode="aspectFill"
          ></image>
          <view class="goods-seller-left-desc">
            <view class="goods-seller-left-desc-name">{{ item.name }}</view>
            <view class="goods-seller-left-desc-tips"
              >已拼团{{ item.deal }}组</view
            >
          </view>
        </view>
        <view class="goods-seller-right" @click="onClickShops(item)">店铺</view>
      </view> -->
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
	import BaseNode from "../../base/BaseNode.vue";
	@Component({})
	export default class ClassName extends BaseNode {
		defaultAvatar = app.defaultAvatar;
		publisher: any = [];
		currentPage = 1;
		pageSize = 20;
		noMoreData = false;
		liveList = [];
		folloModalShow = false;
		selectItem = {
			id: 0,
			follow: false
		};
		onLoad(query: any) {
			this.reqNewData();
		}
		//   加载更多数据
		onReachBottom() {
			this.reqNewData();
		}
		followAction(item: any, index: number) {
			this.selectItem = item
			//关注
			if (!item.follow) this.follow()
			if (item.follow) this.folloModalShow = true //取关弹窗
		}
		follow() {
			if (!this.selectItem.id) return
			app.http.Post('merchant/follow/' + this.selectItem.id, {}, (res: any) => {
				this.selectItem.follow = !this.selectItem.follow
				this.folloModalShow = false
			})
		}
		onClickShops(item: any) {
			// #ifndef MP
			if (app.token.accessToken == "") {
				uni.navigateTo({
					url: "/pages/login/login"
				});
				return;
			}
			// #endif
			// const path='/pages/userinfo/merchant_shops'
			const path = `/pages/userinfo/merchant_shopsV2`
			uni.navigateTo({
				url: path + "?id=" +
					item.id +
					"&name=" +
					item.name +
					"&avatar=" +
					item.logo
			});
		}
		reqNewData(cb ? : Function) {
			// 获取更多商品
			if (this.noMoreData) {
				return;
			}

			let params: any = {
				pageIndex: this.currentPage,
				pageSize: this.pageSize
			};

			app.http.Get("merchant/list", params, (data: any) => {
				if (data.totalPage <= this.currentPage) {
					this.noMoreData = true;
				}
				if (data.list) {
					if (this.currentPage == 1) {
						this.publisher = [];
					}
					this.publisher = this.publisher.concat(data.list);
				}
				this.currentPage++;
				if (cb) cb();
			});
		}
	}
</script>

<style lang="scss">
	page {
		background: #f2f2f2;
	}

	.detail-bg {
		// width: 722rpx;

		// box-sizing: border-box;
		padding: 0 14rpx;
		// display: flex;
		// justify-content: center;
		// flex-wrap: wrap;
		// margin:0 auto;
		// padding:0 14rpx;
	}

	.business {
		background-color: #fff;
		height: 442rpx;
		margin: 15rpx 0;

		.noneTips {
			font-size: 22rpx;
			font-family: FZLanTingHeiS-R-GB;
			font-weight: 400;
			color: #C6C6C8;
			text-align: center;
			position: relative;
			top: 120rpx;
		}

		&-top {
			align-items: center;
			padding: 0 21rpx;
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

	.scroll-goodslist {
		white-space: nowrap;
		width: 98%;
		margin-left: 16rpx;
		margin-top: 34rpx;

		&-item {
			display: inline-block;
			width: 210rpx;
			position: relative;
			margin-right: 24rpx;

			.picBlock {
				width: inherit;
				height: 161rpx;
				position: relative;

				image {
					width: inherit;
					height: inherit;
				}

				.angleMark {
					padding: 0 10rpx;
					height: 22rpx;
					position: absolute;
					top: 0;
					left: 0;
					font-size: 18rpx;
					font-family: FZLanTingHeiS-R-GB;
					font-weight: 400;
					color: #FFFFFF;
					border-radius: 4rpx 0 0 0;
					text-align: center;
					line-height: 22rpx;
				}
			}

			.onelineName {
				font-size: 26rpx;
				font-family: Alibaba PuHuiTi;
				font-weight: 400;
				color: #333333;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				margin-top: 8rpx;
			}

			.bottomState {
				margin-top: 10rpx;

				justify-content: space-between;
				align-items: center;

				&-left {
					font-size: 22rpx;
					font-family: Alibaba PuHuiTi;
					font-weight: 500;
					color: #333333;

					text {
						font-size: 26rpx;
						font-weight: bold;
					}
				}

				&-right {
					font-size: 22rpx;
					font-family: FZLanTingHeiS-R-GB;
					font-weight: 400;
					color: #88878C;
				}
			}
		}
	}


	// .goods-seller {
	//   width: 100%;
	//   height: 180rpx;
	//   box-sizing: border-box;
	//   padding: 10rpx 40rpx;
	//   display: flex;
	//   align-items: center;
	//   justify-content: space-between;
	// 	margin-bottom: 23rpx;
	// 	background:#fff;
	// 	border-radius: 20rpx;
	//   &-left {
	//     width: 500rpx;
	//     height: 110rpx;
	//     display: flex;
	//     align-items: center;
	//     box-sizing: border-box;
	//     &-avatar {
	//       width: 110rpx;
	//       height: 110rpx;
	//       border-radius: 50%;
	//       background: #f5f5f9;
	//     }
	//     &-desc {
	//       width: 380rpx;
	//       height: 110rpx;
	//       box-sizing: border-box;
	//       padding: 4rpx 0 4rpx 20rpx;
	//       display: flex;
	//       flex-wrap: wrap;
	//       &-name {
	//         width: 100%;
	//         font-size: 28rpx;
	//         font-family: PingFangSC-Regular, PingFang SC;
	//         font-weight: 400;
	//         color: #14151a;
	//       }
	//       &-tips {
	//         width: 100%;
	//         font-size: 22rpx;
	//         font-family: PingFangSC-Regular, PingFang SC;
	//         font-weight: 400;
	//         color: #a9abb4;
	//       }
	//       &-js {
	//         height: 34rpx;
	//         background: #fbf2f3;
	//         font-size: 18rpx;
	//         font-family: Microsoft YaHei;
	//         font-weight: 400;
	//         color: #ff504f;
	//         display: inline-flex;
	//         align-items: center;
	//         margin-top: 5rpx;
	//         box-sizing: border-box;
	//         padding: 0 9rpx;
	//       }
	//       &-icon {
	//         width: 20rpx;
	//         height: 17rpx;
	//         background: url(../../static/goods/merchant_icon.png) no-repeat center;
	//         background-size: 100% 100%;
	//         margin-right: 6rpx;
	//       }
	//     }
	//   }
	//   &-right {
	//     width: 139rpx;
	//     height: 57rpx;
	//     background: #fb4e3e;
	//     border-radius: 29rpx;
	//     text-align: center;
	//     line-height: 57rpx;
	//     font-size: 28rpx;
	//     font-family: Microsoft YaHei;
	//     font-weight: 400;
	//     color: #fff;
	//   }
	// }
</style>
