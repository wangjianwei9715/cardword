<template>
  <view>
    <!-- 卖家信息 -->
    <view class="detail-bg" v-if="publisher != ''">
      <view class="goods-seller" v-for="item in publisher" :key="item.id">
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
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "../../base/BaseNode.vue";
@Component({})
export default class ClassName extends BaseNode {
  defaultAvatar = app.defaultAvatar;
  publisher: any = [];
  currentPage = 1;
  pageSize = 20;
  noMoreData = false;
  onLoad(query: any) {
    this.reqNewData();
  }
  //   加载更多数据
  onReachBottom() {
    this.reqNewData();
  }
  onClickShops(item: any) {
    // #ifndef MP
    if (app.token.accessToken == "") {
      uni.navigateTo({
        url: "/pages/login/login",
      });
      return;
    }
    // #endif
    uni.navigateTo({
      url:
        "/pages/userinfo/merchant_shops?id=" +
        item.id +
        "&name=" +
        item.name +
        "&avatar=" +
        item.logo,
    });
  }
  reqNewData(cb?: Function) {
    // 获取更多商品
    if (this.noMoreData) {
      return;
    }

    let params: any = {
      pageIndex: this.currentPage,
      pageSize: this.pageSize,
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
page{
	background:#F2F2F2;
}
.detail-bg{
	width: 722rpx;
	
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	margin:0 auto;
	padding:20rpx 0
}
.goods-seller {
  width: 100%;
  height: 180rpx;
  box-sizing: border-box;
  padding: 10rpx 40rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
	margin-bottom: 23rpx;
	background:#fff;
	border-radius: 20rpx;
  &-left {
    width: 500rpx;
    height: 110rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    &-avatar {
      width: 110rpx;
      height: 110rpx;
      border-radius: 50%;
      background: #f5f5f9;
    }
    &-desc {
      width: 380rpx;
      height: 110rpx;
      box-sizing: border-box;
      padding: 4rpx 0 4rpx 20rpx;
      display: flex;
      flex-wrap: wrap;
      &-name {
        width: 100%;
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #14151a;
      }
      &-tips {
        width: 100%;
        font-size: 22rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #a9abb4;
      }
      &-js {
        height: 34rpx;
        background: #fbf2f3;
        font-size: 18rpx;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ff504f;
        display: inline-flex;
        align-items: center;
        margin-top: 5rpx;
        box-sizing: border-box;
        padding: 0 9rpx;
      }
      &-icon {
        width: 20rpx;
        height: 17rpx;
        background: url(../../static/goods/merchant_icon.png) no-repeat center;
        background-size: 100% 100%;
        margin-right: 6rpx;
      }
    }
  }
  &-right {
    width: 139rpx;
    height: 57rpx;
    background: #fb4e3e;
    border-radius: 29rpx;
    text-align: center;
    line-height: 57rpx;
    font-size: 28rpx;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #fff;
  }
}
</style>
