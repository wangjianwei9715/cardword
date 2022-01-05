<template>
  <view class="content">
    <view class="live-content">
      <view class="information">
        <view
          class="information-index"
          v-for="(item, index) in information"
          :key="index"
          @click="onClickJumpUrl(item.articleCode)"
        >
          <view class="information-top">
            <image
              class="information-top-image"
              :src="getGoodsImg(decodeURIComponent(item.cover))"
              mode="aspectFill"
            ></image>
          </view>
          <view class="information-center">
            <view class="title">{{item.title}}</view>
            <view class="desc">
              <view class="desc-index">{{dateFormatMS(item.created_at)}}</view>
              <view class="desc-index">
                <view class="icon-pl"></view>{{item.comment}}
                <view class="icon-dz" :class="{'icon-dzed':item.isLikes}" ></view>{{item.likes}}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "../../base/BaseNode.vue";
import { getGoodsImg,dateFormatMS } from "@/tools/util"
@Component({})
export default class ClassName extends BaseNode {
  getGoodsImg = getGoodsImg;
  dateFormatMS = dateFormatMS;
  currentPage = 1;
  pageSize = 20;
  noMoreData = false;
  information: { [x: string]: any } = [];
  onLoad(query: any) {
    this.reqNewData();
  }
  //   加载更多数据
  onReachBottom() {
    this.reqNewData();
  }
  reqNewData(cb?: Function) {
    // 获取更多商品
    if (this.noMoreData) {
      return;
    }

    let params: any = {
      pageIndex: this.currentPage,
      pageSize: this.pageSize
    };
    app.http.Get("article/likeslist", params, (data: any) => {
      if (data.totalPage <= this.currentPage) {
        this.noMoreData = true;
      }
      if (this.currentPage == 1) {
        this.information = [];
      }
      if (data.list) {
        this.information = this.information.concat(data.list);
      }
      this.currentPage++;
      if (cb) cb();
    });
  }
  onClickJumpUrl(code: any) {
    uni.navigateTo({
      url:'/pages/information/details?code='+code
    })
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
  padding: 20rpx 29rpx 20rpx 29rpx;

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
  margin: 20rpx auto;
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
.information {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &-index {
    width: 330rpx;
    border-radius: 20rpx;
    background: #fff;
    overflow: hidden;
    margin-bottom: 20rpx;
  }
  &-top {
    width: 330rpx;
    height: 260rpx;
    position: relative;
    &-image {
      width: 330rpx;
      height: 260rpx;
    }
  }
  &-center {
    width: 100%;
    box-sizing: border-box;
    padding: 16rpx 20rpx 20rpx 20rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #14151a;
    .title{
      width: 100%;
      height:80rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .desc{
      width: 100%;
      height:40rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .desc-index{
        height:40rpx;
        display: flex;
        align-items: center;
        font-size: 20rpx;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #BDBEC5;
      }
      .icon-pl{
        width: 26rpx;
        height:24rpx;
        background:url(../../static/index/pl.png) no-repeat center;
        background-size: 100% 100%;
        margin-right: 5rpx;
      }
      .icon-dz{
        width: 24rpx;
        height:24rpx;
        background:url(../../static/index/zan.png) no-repeat center;
        background-size: 100% 100%;
        margin-right: 5rpx;
        margin-left: 26rpx;
      }
      .icon-dzed{
        width: 24rpx;
        height:24rpx;
        background:url(../../static/index/zan_.png) no-repeat center;
        background-size: 100% 100%;
        margin-right: 5rpx;
        margin-left: 26rpx;
      }
    }
  }
}
</style>
