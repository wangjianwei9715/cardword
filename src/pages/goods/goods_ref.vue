<template>
  <view class="content">
    <view class="header-banner">
      <statusbar />
      <view class="tab-header">
        <view class="header-search">
          <searchinput
            :searchText="searchText"
            @clicksearch="onClickSearch"
          ></searchinput>
        </view>
        <view class="header-right" @click="onClickBack">取消</view>
      </view>

      <view class="header-sort">
        <view
          class="header-sort-index"
          v-for="item in sortData"
          :key="item.id"
          @click="onClickSort(item)"
        >
          {{ item.name }}
          <view class="header-sort-icon">
            <view
              :class="{
                'icon-sort-upn': item.sort != 1,
                'icon-sort-up': item.sort == 1,
              }"
            ></view>
            <view
              :class="{
                'icon-sort-downn': item.sort != 2,
                'icon-sort-down': item.sort == 2,
              }"
            ></view>
          </view>
        </view>
      </view>
    </view>
    <view class="goods-lists">
      <statusbar />
      <goodslistebay :goodsList="goodsList" @send="onClickPreviewImage" :presell="false" />
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
  goodsList: { [x: string]: any } = [];
  searchData: { [x: string]: any } = [];
  scrollId = "";
  noMoreData = false;
  searchIng = false;
  sortData = [
    { id: 1, name: "价格", sort:0 , sortName:'rmb' },
    { id: 2, name: "时间", sort:0 , sortName:'saleAt' },
  ];
  onLoad(query: any) {
    this.searchText = query.q;
    this.searchData = JSON.parse(query.data);
    this.goodsList = this.searchData.list;
    this.scrollId = this.searchData.scrollId;
    
    this.onEventUI("refStop", () => {
      this.searchIng = false;
    });
  }
  onClickBack() {
    uni.navigateBack({
      delta: 1,
    });
  }
  onReachBottom() {
    this.reqNewData();
  }
  reqNewData(cb?: Function) {
    // 获取更多商品
    if (this.noMoreData||this.searchIng) {
      return;
    }
    this.searchIng = true;
    let date:any = new Date()
    let params: { [x: string]: any } = {
      q:this.searchText,
      timeStamp:Date.parse(date)/1000,
      pageSize:30
    };
    if(this.scrollId!=''){
      params.scrollId = this.scrollId
    }
    let sort = ''
    for(let i of this.sortData){
      if(i.sort!=0){
        sort = `${i.sortName}${i.sort==2?':desc':''}`
      }
    }
    params.sort = sort;
    uni.showLoading({
      title: "加载中",
    });
    app.http.Get("dataApi/search/ebay", params, (data: any) => {
      this.searchIng = false;
      uni.hideLoading();
      if (data.end) {
        this.noMoreData = true;
      }
      if (data.list) {
        this.goodsList = this.goodsList.concat(data.list);
        this.scrollId = data.scrollId;
      } else {
        this.noMoreData = true;
      }
      if (cb) cb();
    });
  }
  onClickPreviewImage(pic: any) {
    let img = [pic];
    // 预览图片
    uni.previewImage({
      current: 1,
      urls: img,
    });
  }
  onClickSearch() {
    uni.$emit("refBack", { text: this.searchText });
    uni.navigateBack({
      delta: 1,
    });
  }
  // 排序选择
  onClickSort(item:any) {
    if(this.searchIng) return
    for(let i in this.sortData){
      if(this.sortData[i].id != item.id){
        this.sortData[i].sort = 0;
      }
    }
    item.sort = item.sort<2? item.sort+1 : 0;
    this.goodsList = [];
    this.noMoreData = false;
    this.scrollId = ''
    this.reqNewData();
  }
}
</script>

<style lang="scss">
$font-24: 24rpx;
page{
  background:#F6F7FB;
}
.content {
  width: 100%;
  box-sizing: border-box;
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
.tab-header {
  width: 100%;
  height: 104rpx;
  display: flex;
  box-sizing: border-box;
  padding: 0 20rpx;
  z-index: 10;
  align-items: center;
  justify-content: space-between;
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
  width: 640rpx;
  height: 64rpx;
  overflow: hidden;
  border-radius: 29rpx;
}
.header-right {
  height: 50rpx;
  line-height: 50rpx;
  font-size: 26rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #14151a;
}

.goods-lists {
  width: 100%;
  box-sizing: border-box;
  padding: 194rpx 20rpx 60rpx 20rpx;
  background: $content-bg;
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
    font-size: $font-24;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #14151a;
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
    height: 330rpx;
  }
  .classify-opt {
    color: #f65d2d;
  }
}
</style>
