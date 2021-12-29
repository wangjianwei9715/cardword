<template>
  <view class="content">
    <view class="header-banner">
      <statusbar />
      <view class="tab-header">
        <view class="icon-back" @click="onClickBack"></view>
        <view class="header-title">资讯</view>
        <view class="header-likes">我的点赞</view>
      </view>
      <view class="header-search">
        <view class="search-icon"></view>
        <input
          class="search-input"
          type="text"
          placeholder-style="color:#AAAABB"
          v-model="searchTetxt"
          placeholder="搜索"
          @confirm="onClickSearch(searchTetxt)"
          confirm-type="search"
        />
      </view>
      <view class="tabc-content">
        <tabs
          :tabs="goodTab"
          :tabsCheck="goodTabCheck"
          @tabsClick="onClickListTabs"
        ></tabs>
      </view>
    </view>

    <view class="live-content">
      <statusbar />
	  <informationlist :information="infoList"/>
    </view>
  </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "../../base/BaseNode.vue";
@Component({})
export default class ClassName extends BaseNode {
  searchText = "";
  pullDownRefresh = false;
  goodTab = [
    { id: 0, name: "最新" },
    { id: 100, name: "热门" },
    { id: 1, name: "公告" },
    { id: 2, name: "卡圈资讯" },
    { id: 3, name: "体育快报" },
  ];
  goodTabCheck = 0;
  currentPage = 1;
  pageSize = 20;
  noMoreData = false;
  infoList: { [x: string]: any } = [];
  searchData: any = [];
  scrollId = "";
  onLoad(query: any) {
    this.reqNewData();
  }
  //   加载更多数据
  onReachBottom() {
    this.reqNewData();
  }
  onClickListTabs(id: any) {
    if (id == this.goodTabCheck) {
      return;
    }
    this.goodTabCheck = id;
    this.infoList = [];
    this.currentPage = 1;
    this.noMoreData = false;
    this.reqNewData();
  }
  onClickBack() {
    uni.navigateBack({
      delta: 1,
    });
  }
  onClickSearch() {
    // 搜索
    
  }
  onClickLive(id: any) {
    app.platform.goWeChatLive(id);
  }
  reqNewData(cb?: Function) {
    // 获取更多商品
    if (this.noMoreData) {
      return;
    }

    let params: any = {
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
	  qt:this.goodTabCheck,
	  q:encodeURIComponent(this.searchText)
    };
    app.http.Get("article/homelist", params, (data: any) => {
      if (data.totalPage <= this.currentPage) {
        this.noMoreData = true;
      }
      if (this.currentPage == 1) {
        this.infoList = [];
      }
      if (data.list) {
        this.infoList = this.infoList.concat(data.list);
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
.content {
  width: 100%;
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
.tabc-content {
  width: 100%;
  margin-top: -20rpx;
}
.live-content {
  width: 100%;
  box-sizing: border-box;
  padding: 250rpx 20rpx 20rpx 20rpx;

  position: relative;
  z-index: 2;
}
.header-search {
  width: 710rpx;
  height: 64rpx;
  overflow: hidden;
  background: #f5f5f8;
  border-radius: 4rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 28rpx;
  border-radius: 29rpx;
  margin:20rpx auto;
}
.search-input {
  width: 634rpx;
  height: 64rpx;
  background: #f5f5f8;
  border-radius: 4rpx;
  font-size: 24rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #14151a;
}
.search-icon {
  width: 28rpx;
  height: 28rpx;
  background: url(../../static/index/sousuo@2x.png) no-repeat center;
  background-size: 100% 100%;
  margin-right: 20rpx;
}
</style>
