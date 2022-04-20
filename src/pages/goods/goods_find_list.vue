<template>
	<view class="content">
		<view class="header-banner">
			<statusbar />
			<view class="header-top">
				<view class="header-back" @click="onClickBack"></view>
				<view class="header-search">
					<searchinput :searchText="searchText" @clicksearch="onClickSearch"></searchinput>
				</view>
			</view>
			<view class="header-tab">
				<tabc :tabc="classifyData" :tabsCheck="classifyOpt" @tabsClick="onClickListTabs"></tabc>
			</view>
			<sortTabCopy :maskTop='400' :sortData='sortData' @tagChange='onClickListSortTabs'></sortTabCopy>
		</view>

		<view class="goods-lists">
			<statusbar />
			<scroll-view class="goods-scroll" scroll-x="true" v-if='seriesList&&seriesList.length&&!clickSerieItem.id'>
				<view class="scrollItem" v-for="(item,index) in seriesList" :key='index'
					@click="clickSerie(item,index)">
					<image class="seriesImg" :src="decodeURIComponent(item.pic_url)" mode="aspectFill"></image>
					<view class="seriesText" :class="{selectSearchText:clickSerieItem&&clickSerieItem.id==item.id}">
						{{item.title}}
					</view>
				</view>
			</scroll-view>
			<goodslist :goodsList="goodsList" @send="onClickJumpDetails" :presell="false" />
			<empty v-if="goodsList&&!goodsList.length&&!isRequest" />
		</view>
	</view>
</template>

<script lang="ts">
	import {
		app
	} from "@/app";
	import {
		Md5
	} from "ts-md5/dist/md5";
	import {
		Component
	} from "vue-property-decorator";
	import BaseNode from "../../base/BaseNode.vue";
	import {
		orderPlayDesc,
		orderGoodsTypeDesc
	} from "@/tools/switchUtil";
	import {
		stateArray,
		palyArray
	} from "@/net/DataExchange";
	@Component({})
	export default class ClassName extends BaseNode {
		searchText = "";
		isRequest: boolean = true;
		goodTabCheck = 1;
		sortData: any = [{
				name: "",
				index: 0,
				selectShow: false,
				key: "state",
				children: stateArray
			},
			{
				name: "拼团方式",
				index: -1,
				selectShow: false,
				key: "ptType",
				children: palyArray
			},
			{
				name: "进度",
				needOrder: true,
				key: "sort",
				searchText: "progress",
				odType: 0
			},
			{
				name: "价格",
				needOrder: true,
				key: "sort",
				searchText: "price",
				odType: 0
			}
		];
		classifyData = [{
				id: 100,
				name: "推荐"
			},
			{
				id: 1,
				name: "篮球"
			},
			{
				id: 2,
				name: "足球"
			},
			{
				id: 0,
				name: "其他"
			}
		];
		classifyOpt = 100;

		playTypeCurrent = -1;
		classifyShow = false;
		classifyShowPlay = false;
		goodsData: any = [];
		goodsList: {
			[x: string]: any;
		} = [];
		scrollId = "";
		noMoreData = false;
		scrollIdSt: any = 0;
		seriesList: any = [];
		clickSerieItem: any = {};
		tagParams: any = {};
		onLoad(query: any) {
			if (query.q) {
				this.searchText = query.q;
			}
			if (query.classType) {
				this.classifyOpt = query.classType;
			}
			// if(query.serie){
			//   this.clickSerieItem = {title:query.serie}
			// }
			if (query.hs) {
				this.clickSerieItem = {
					id: query.hs,
					title: query.hsTitle ?? ''
				}
				this.searchText=query.hsTitle ?? ''
			}
			if (query.data) {
				setTimeout(() => {
					// #ifndef MP
					this.goodsData = JSON.parse(query.data);
					// #endif
					// #ifdef MP
					this.goodsData = JSON.parse(decodeURIComponent(query.data));
					// #endif
					this.goodsList = this.goodsData.goodList ? this.goodsData.goodList : [];
					this.scrollId = this.goodsData.scrollId;
					if (query.data.end) {
						this.noMoreData = true;
					}
				}, 10);
			} else {
				//   this.reqNewData("default");
				this.reqNewSeries();
			}
			// if(app.platform.systemInfo.platform == 'ios' && app.iosVersion%2 !=0){
			// 	this.goodTab = [
			// 		{id:1,name:'在售'},
			// 		{id:0,name:'即将发售'},
			// 		{id:2,name:'已拼成'}
			// 	]
			// }
		}
		reqSearchList() {
			this.goodsList = [];
			this.noMoreData = false;
			this.reqNewData("default");
		}
		clickSerie(item: any, index ? : number) {
			this.clickSerieItem = this.clickSerieItem.id == item.id ? {} : item;
			this.searchText = item.title
			this.reqSearchList();
		}
		onReachBottom() {
			this.reqNewData("reach");
		}
		onClickBack() {
			uni.navigateBack({
				delta: 1
			});
		}
		onClickSearch() {
			uni.redirectTo({
				url: "/pages/goods/goods_find?q=" + this.searchText
			});
		}
		onClickListSortTabs(data: any) {
			this.tagParams = data;
			this.reqSearchList();
		}
		onClickListTabs(index: number) {
			if (this.classifyOpt == index) return;
			this.classifyOpt = index;
			this.reqSearchList();
		}
		onClickJumpDetails(id: any) {
			uni.navigateTo({
				url: "/pages/goods/goods_details?id=" + id
			});
		}
		reqNewSeries() {
			app.http.Get(
				"series/hot/list", {
					pageIndex: 1,
					pageSize: 100
				},
				(res: any) => {
					this.seriesList = res.list || [];
				}
			);
		}
		reqNewData(type: string, cb ? : Function) {
			let reach = false;
			this.isRequest = true;
			if (type == "reach") {
				reach = true;
			}
			// 获取列表
			if (this.noMoreData) {
				return;
			}

			let params: {
				[x: string]: any;
			} = {
				state: Number(this.goodTabCheck),
				pageSize: 10
			};
			if (this.classifyOpt != 100) params.tp = this.classifyOpt
			params.q = this.clickSerieItem.id ? '' : this.searchText
			if (this.clickSerieItem.id) {
				params.hs = this.clickSerieItem.id;
			}
			if (reach) {
				params.scrollId = this.scrollId;
				params.st = this.scrollIdSt;
				params.sn = Md5.hashStr(
					this.scrollIdSt + this.scrollId + "scrollSearchGood"
				);
			}
			// 排序方式
			// let sort = "";
			// sort +=
			//   this.sortData.price.odType == 0
			//     ? ""
			//     : this.sortData.price.odType == 1 ? "price" : "price:desc";
			// sort += sort != "" && this.sortData.progress.odType != 0 ? "," : "";
			// sort +=
			//   this.sortData.progress.odType == 0
			//     ? ""
			//     : this.sortData.progress.odType == 1 ? "progress" : "progress:desc";
			// if (sort != "") {
			//   params.sort = sort;
			// }
			let date: any = new Date();
			params.timeStamp = Date.parse(date) / 1000;

			app.http.Get(
				"dataApi/search/good", {
					...params,
					...this.tagParams
				},
				(res: any) => {
					if (res.end) {
						this.noMoreData = true;
					}
					if (res.goodList && type !== "refresh") {
						this.goodsList = this.goodsList.concat(res.goodList);
					}
					this.scrollId = res.scrollId;
					this.scrollIdSt = res.timeStamp;
					this.isRequest = false;
					if (cb) cb();
				}
			);
		}
	}
</script>

<style lang="scss">
	$font-24: 24rpx;

	page {
		background: $content-bg;
	}

	.content {
		width: 100%;
		box-sizing: border-box;
	}

	.goods-scroll {
		width: 96%;
		height: 180rpx;
		display: flex;
		// margin:0 auto;
		margin-left: 12rpx;
		white-space: nowrap;

		.scrollItem {
			display: inline-block;
			width: 116rpx;
			position: relative;
			margin-right: 12rpx;

			.seriesImg {
				width: 116rpx;
				height: 116rpx;
			}

			.seriesText {
				text-align: center;
				font-size: 22rpx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #333333;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.selectSearchText {
				color: #e23737;
			}
		}
	}

	.header-banner {
		width: 100%;
		background: #fff;
		position: fixed;
		left: 0;
		top: 0;
		box-sizing: border-box;
		z-index: 9;
	}

	.header-top {
		width: 100%;
		height: 104rpx;
		display: flex;
		box-sizing: border-box;
		padding: 0 32rpx 0 0;
		z-index: 10;
		align-items: center;
		justify-content: space-between;
	}

	.header-search {
		width: 626rpx;
		height: 64rpx;
		border-radius: 29rpx;
	}

	.header-back {
		width: 80rpx;
		height: 88rpx;
		background: url(../../static/goods/back@2x.png) no-repeat center;
		background-size: 100% 100%;
	}

	.header-tab {
		width: 100%;
		height: 90rpx;
		margin-top: -10rpx;
		padding: 0 22rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #f1f1f4;
	}

	// .header-sort {
	//   width: 100%;
	//   height: 72rpx;
	//   box-sizing: border-box;
	//   padding: 0 56rpx;
	//   display: flex;
	//   align-items: center;
	//   justify-content: space-between;
	//   position: relative;

	//   &-index {
	//     height: 72rpx;
	//     display: flex;
	//     align-items: center;
	//     box-sizing: border-box;
	//     font-size: 26rpx;
	//     font-family: PingFangSC-Regular, PingFang SC;
	//     font-weight: 400;
	//     color: #333333;
	//   }

	//   .current-name {
	//     color: #e23737;
	//   }

	//   .header-sort-icon {
	//     width: 18rpx;
	//     margin-left: 4rpx;
	//     margin-bottom: -4rpx;

	//     .icon-sort-up {
	//       width: 18rpx;
	//       height: 12rpx;
	//       background: url(../../static/goods/sort_u_.png) no-repeat center;
	//       background-size: 100% 100%;
	//       margin-bottom: 2rpx;
	//     }

	//     .icon-sort-upn {
	//       width: 18rpx;
	//       height: 12rpx;
	//       background: url(../../static/goods/sort_u.png) no-repeat center;
	//       background-size: 100% 100%;
	//       margin-bottom: 2rpx;
	//     }

	//     .icon-sort-down {
	//       width: 18rpx;
	//       height: 12rpx;
	//       background: url(../../static/goods/sort_d_.png) no-repeat center;
	//       background-size: 100% 100%;
	//     }

	//     .icon-sort-downn {
	//       width: 18rpx;
	//       height: 12rpx;
	//       background: url(../../static/goods/sort_d.png) no-repeat center;
	//       background-size: 100% 100%;
	//     }
	//   }

	//   &-classify {
	//     width: 100%;
	//     height: 0;
	//     box-sizing: border-box;
	//     position: absolute;
	//     top: 72rpx;
	//     left: 0;
	//     padding: 0 36rpx;
	//     background: #fff;
	//     transition: all 0.1s linear;
	//     overflow: hidden;

	//     &-index {
	//       width: 100%;
	//       height: 80rpx;
	//       box-sizing: border-box;
	//       border-bottom: 1px solid #f1f1f4;
	//       display: flex;
	//       align-items: center;
	//       font-size: $font-24;
	//       font-family: PingFangSC-Medium, PingFang SC;
	//       font-weight: 500;
	//       color: #14151a;
	//     }

	//     &-index:last-child {
	//       border: none;
	//     }
	//   }

	//   .classify-show {
	//     height: 400rpx;
	//   }

	//   .classify-opt {
	//     color: #f65d2d;
	//   }
	// }

	.goods-lists {
		width: 100%;
		box-sizing: border-box;
		padding: 272rpx 14rpx 60rpx 14rpx;
	}

	.sort-shadow {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 8;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
