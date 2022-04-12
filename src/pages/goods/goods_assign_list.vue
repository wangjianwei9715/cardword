<template>
	<view class="content">
		<view class="header-banner">
			<sortTab :sortData="sortData" @postSort="postSort" />
			<!-- <sortTabCopy/> -->
		</view>
		<view class="goods-lists">
			<statusbar/>
			<goodslist :goodsList="goodsList" @send="onClickJumpDetails" :presell="false" />
		</view>
	</view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Md5 } from "ts-md5/dist/md5";
import { Component } from "vue-property-decorator";
import BaseNode from "../../base/BaseNode.vue";
import { goodsListType } from "@/net/DataExchange";
@Component({})
export default class ClassName extends BaseNode {
  goodsListType = goodsListType;
  urlType = "";
  //   odType 0:默认 1:升序 2:降序
  sortData = {
    default: { id: 1, name: "默认", odType: 0 },
    price: { id: 2, name: "价格", odType: 0 },
    progress: { id: 3, name: "进度", odType: 0 }
  };
  goodsList: { [x: string]: any } = [];
  noMoreData = false;
  // fetchFrom:第几个数据开始  fetchSize:取几个数据
  fetchFrom = 1;
  fetchSize = 10;
  listSort = "";
  onLoad(query: any) {
    this.urlType = query.type;
    uni.setNavigationBarTitle({
      title: this.goodsListType[this.urlType]
    });
    this.reqNewData();
  }
  onReachBottom() {
    this.reqNewData();
  }
  reqSearchList() {
    this.goodsList = [];
    this.fetchFrom = 1;
    this.noMoreData = false;
    this.reqNewData();
  }
  // 跳转商品详情
  onClickJumpDetails(id: any) {
    uni.navigateTo({
      url: "/pages/goods/goods_details?id=" + id
    });
  }
  postSort(val: string) {
    this.listSort = val;
    this.reqSearchList();
  }
  reqNewData(cb?: Function) {
    // 获取列表
    if (this.noMoreData) {
      return;
    }

    let params: { [x: string]: any } = {
      fetchFrom: this.fetchFrom,
      fetchSize: this.fetchSize
    };
    // 排序方式
    if (this.listSort != "") {
      params.od = this.listSort;
    }

    app.http.Get(
      "dataApi/goodlist/forsale/" + this.urlType,
      params,
      (res: any) => {
        if (res.isFetchEnd) {
          this.noMoreData = true;
        }
        if (res.goodList) {
          this.goodsList = this.goodsList.concat(res.goodList);
        }
        this.fetchFrom += this.fetchSize;
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
.header-banner {
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  // z-index: 9;
}
.header-sort {
  width: 100%;
  height: 72rpx;
  box-sizing: border-box;
  padding: 0 56rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  &-index {
    height: 72rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-size: 26rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
  .current-name {
    color: #e23737;
  }
  .header-sort-icon {
    width: 18rpx;
    margin-left: 4rpx;
    margin-bottom: -4rpx;
    .icon-sort-up {
      width: 18rpx;
      height: 12rpx;
      background: url(../../static/goods/sort_u_.png) no-repeat center;
      background-size: 100% 100%;
      margin-bottom: 2rpx;
    }
    .icon-sort-upn {
      width: 18rpx;
      height: 12rpx;
      background: url(../../static/goods/sort_u.png) no-repeat center;
      background-size: 100% 100%;
      margin-bottom: 2rpx;
    }
    .icon-sort-down {
      width: 18rpx;
      height: 12rpx;
      background: url(../../static/goods/sort_d_.png) no-repeat center;
      background-size: 100% 100%;
    }
    .icon-sort-downn {
      width: 18rpx;
      height: 12rpx;
      background: url(../../static/goods/sort_d.png) no-repeat center;
      background-size: 100% 100%;
    }
  }
  &-classify {
    width: 100%;
    height: 0;
    box-sizing: border-box;
    position: absolute;
    top: 72rpx;
    left: 0;
    padding: 0 36rpx;
    background: #fff;
    transition: all 0.1s linear;
    overflow: hidden;
    &-index {
      width: 100%;
      height: 80rpx;
      box-sizing: border-box;
      border-bottom: 1px solid #f1f1f4;
      display: flex;
      align-items: center;
      font-size: $font-24;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #14151a;
    }
    &-index:last-child {
      border: none;
    }
  }
  .classify-show {
    height: 400rpx;
  }
  .classify-opt {
    color: #f65d2d;
  }
}
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
