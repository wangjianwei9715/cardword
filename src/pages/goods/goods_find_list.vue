<template>
	<view class="content">
		<view class="header-banner">
			<statusbar />
			<view class="header-top">
				<view class="header-back" @click="onClickBack">
					<image style="width:19rpx;height:35rpx" src="@/static/index/v3/icon_back.png"/>
				</view>
				<view class="header-search">
					<view class="header-search-input" @click="onClickSearch">
						<view class="sousuo-icon"></view>{{searchText}}
					</view>
					<view class="search-icon" v-show="searchText!=''" @click="onClickRemoveSearch">
						<image class="search-remove" src="../../static/goods/v2/mini_close.png" />
					</view>
				</view>
			</view>
			<view class="header-tab">
				<tabc :tabc="classifyData" :tabsCheck="classifyOpt" @tabsClick="onClickListTabs"></tabc>
			</view>
			<sortTabCopy :maskTop='300' :sortData='sortData' @tagChange='onClickListSortTabs'></sortTabCopy>
		</view>
		<view class="goods-lists">
			<statusbar />
			<scroll-view class="goods-scroll" scroll-x="true" v-if='seriesShow' v-show="seriesList!=''">
				<view class="scrollItem" v-for="(item,index) in seriesList" :key='index' @click="clickSerie(item,index)">
					<view class="frameImage">
						<muqian-lazyLoad class="seriesImg" :src="decodeURIComponent(item.icon)" mode="aspectFit"></muqian-lazyLoad>
					</view>
					<view class="seriesText" :class="{selectSearchText:clickSerieItem&&clickSerieItem.id==item.id}">
						{{item.name}}
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
	} from "ts-md5";
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
	} from "@/tools/DataExchange";
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
		goodsList: any = [];
		scrollId = "";
		noMoreData = false;
		hasQueryData:boolean=false;
		scrollIdSt: any = 0;
		seriesList: any = [];
		clickSerieItem: any = {};
		tagParams: any = {};
		onLoad(query: any) {
			if (query.q) {
				this.searchText = decodeURIComponent(query.q);
			}
			if (query.classType) {
				this.classifyOpt = query.classType;
			}
			if(query.ptType){
				const findIndex:number=palyArray.findIndex((item:any)=>{
					return item.value==Number(query.ptType)
				})
				this.sortData[1].index=findIndex
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
					this.goodsData = JSON.parse(query.data);
					this.goodsList = this.goodsData.goodList ? this.goodsData.goodList : [];
					this.scrollId = this.goodsData.scrollId;
					if (query.data.end) {
						this.noMoreData = true;
					}
					this.hasQueryData=true
				}, 10);
				this.reqNewSeries();
			} else {
				this.reqNewData("default");
				this.reqNewSeries();
			}
			
		}
		reqSearchList() {
			this.goodsList = [];
			this.noMoreData = false;
			this.reqNewData("default");
		}
		onClickRemoveSearch(){
			this.searchText = '';
			this.clickSerieItem = {};
			this.reqSearchList()
		}
		clickSerie(item: any, index ? : number) {
			this.clickSerieItem = this.clickSerieItem.id == item.id ? {} : item;
			this.searchText = item.name
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
			this.tagParams = data.data;
			if(data.refresh) this.reqSearchList();
		}
		onClickListTabs(index: number) {
			if (this.classifyOpt == index) return;
			this.classifyOpt = index;
			this.reqNewSeries();
			this.reqSearchList();
		}
		onClickJumpDetails(goodCode: any) {
			app.navigateTo.goGoodsDetails(goodCode)
		}
		reqNewSeries() {
			app.http.Get(
				"dataApi/advertising/iconSeries/list", {
					fetchFrom: 1,
					fetchSize: 100,
					tp:this.classifyOpt!=100?(this.classifyOpt==0?100:this.classifyOpt):0
				},
				(res: any) => {
					this.seriesList = res.list || [];
				}
			);
		}
		reqNewData(type: string, cb ? : Function) {
			const {goodTabCheck, classifyOpt, clickSerieItem, searchText, tagParams} = this;
			if (this.noMoreData) return;
			this.isRequest = true;
			// 获取列表
			let params: { [x: string]: any; } = {
				state: Number(goodTabCheck),
				pageSize: 10,
				tp:classifyOpt!=100?(classifyOpt==0?100:classifyOpt):0,
				q:clickSerieItem.id ? '' : encodeURIComponent(searchText),
				hs:clickSerieItem.id||undefined,
			};
			if (type == "reach") {
				params.scrollId = this.scrollId;
				params.st = this.scrollIdSt;
				params.sn = Md5.hashStr(
					this.scrollIdSt + this.scrollId + "scrollSearchGood"
				);
			}
			const date: any = new Date();
			params.timeStamp = Date.parse(date) / 1000;
			app.http.Get(
				"dataApi/search/good", {
					...params,
					...tagParams
				},
				(res: any) => {
					if (res.end) {
						this.noMoreData = true;
					}
					if (res.goodList && type !== "refresh") {
						let list = [...this.goodsList,...res.goodList];
						this.goodsList = app.platform.removeDuplicate(list,'goodCode')
					}
					this.scrollId = res.scrollId;
					this.scrollIdSt = res.timeStamp;
					this.isRequest = false;
					if (cb) cb();
				}
			);
		}
		private get seriesShow(){
			let show=false
			if(!this.searchText) return true
			return this.seriesList&&this.seriesList.length&&!this.clickSerieItem.id
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
  width: 100%;
  padding:0 20rpx;
  box-sizing: border-box;
  height: 140rpx;
  display: flex;
  // margin:0 auto;
  margin-left: 12rpx;
  white-space: nowrap;
  margin-bottom: 10rpx;
  .scrollItem {
    display: inline-block;
    width: 100rpx;
    position: relative;
    margin-right: 22rpx;
    .frameImage {
      width: 100rpx;
      height: 100rpx;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .seriesImg {
        width: 80rpx;
        height: 80rpx;
      }
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
      text-align: center;
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
  height: 88rpx;
  display: flex;
  box-sizing: border-box;
  padding: 0 20rpx 0 0;
  z-index: 10;
  align-items: center;
  justify-content: space-between;
}

.header-search {
  width: 626rpx;
  height: 64rpx;
  border-radius: 29rpx;
  position: relative;
}
.header-search-input {
  width: 100%;
  height: 65rpx;
  background: #edecec;
  border-radius: 40rpx;
  position: relative;
  font-size: 28rpx;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #a3a3a3;
  line-height: 65rpx;
  box-sizing: border-box;
  padding-left: 34rpx;
  display: flex;
  align-items: center;
}
.sousuo-icon {
  width: 31rpx;
  height: 32rpx;
  background: url(../../static/index/v2/sousuo.png) no-repeat center;
  background-size: 100% 100%;
  margin-right: 30rpx;
}
.search-icon {
  width: 31rpx;
  height: 31rpx;
  position: absolute;
  right: 30rpx;
  top: 50%;
  margin-top: -15.5rpx;
  background: #dbdbdb;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.search-remove {
  width: 15rpx;
  height: 14rpx;
}
.header-back {
	width: 80rpx;
	height: 88rpx;
	display: flex;
	align-items: center;
	justify-content: center;
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
  padding: 250rpx 0 60rpx 0;
  overflow-x: hidden;
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
