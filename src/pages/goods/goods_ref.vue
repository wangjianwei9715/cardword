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
          @click="onClickSort(item.id)"
        >
          {{ item.name }}
          <view class="header-sort-icon">
            <view
              v-if="item.name != '分类'"
              :class="{
                'icon-sort-upn': item.sort_up != 'up',
                'icon-sort-up': item.sort_up == 'up',
              }"
            ></view>
            <view
              :class="{
                'icon-sort-downn': item.sort_up != 'down',
                'icon-sort-down': item.sort_up == 'down',
              }"
            ></view>
          </view>
        </view>
        <view
          :class="['header-sort-classify', { 'classify-show': classifyShow }]"
        >
          <view
            @click="onClickClassifyOpt(item.id)"
            :class="[
              'header-sort-classify-index',
              { 'classify-opt': classifyOpt == item.id },
            ]"
            v-for="item in classifyData"
            :key="item.id"
            >{{ item.name }}</view
          >
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
    { id: 1, name: "分类", sort_up: "" },
    { id: 2, name: "价格", sort_up: "" },
  ];
  classifyData = [
    { id: 0, name: "全部" },
    { id: 1, name: "拍卖" },
    { id: 2, name: "议价" },
    { id: 3, name: "不可议价" },
  ];
  classifyOpt = 0;
  classifyShow = false;
  onLoad(query: any) {
    if (query.q) {
      this.searchText = query.q;
      this.searchData = JSON.parse(query.data);
      this.goodsList = this.searchData.list;
      this.scrollId = this.searchData.scrollId;
    }
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
    if (!this.searchIng) {
      this.reqNewData();
    }
  }
  reqNewData(cb?: Function) {
    // 获取更多商品
    if (this.noMoreData) {
      return;
    }
    this.searchIng = true;
	let date:any = new Date()
    let params: { [x: string]: any } = {
	  q:this.searchText,
      sold: 1,
	  tp:this.classifyOpt,
	  timeStamp:Date.parse(date)/1000
    };
    // 排序方式
    let sort = "";
    if (this.sortData[1].sort_up != "") {
      if (sort != "") {
        sort += ",";
      }
      if (this.sortData[1].sort_up == "up") {
        sort += "price";
      } else {
        sort += "price:desc";
      }
    }
    if (sort != "") {
      params.sort = sort;
    }
	if(this.scrollId!=''){
		params.scrollId = this.scrollId
	}
    uni.showLoading({
      title: "加载中",
    });
	setTimeout(()=>{
		uni.hideLoading();
	},5000)
    app.http.Get("search/query_price", params, (data: any) => {
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
  onClickSort(id: number) {
    if (id == 1) {
      this.onClickClassifyCancel();
    } else {
      if (this.sortData[id - 1].sort_up == "") {
        this.sortData[id - 1].sort_up = "up";
      } else if (this.sortData[id - 1].sort_up == "up") {
        this.sortData[id - 1].sort_up = "down";
      } else if (this.sortData[id - 1].sort_up == "down") {
        this.sortData[id - 1].sort_up = "";
      }
      this.goodsList = [];
      this.noMoreData = false;
	  this.scrollId = ''
      this.reqNewData();
    }
  }
  onClickClassifyOpt(id: number) {
    if (this.classifyOpt == id) return;
    this.classifyOpt = id;
	this.scrollId = ''
    this.onClickClassifyCancel();
    this.goodsList = [];
    this.noMoreData = false;
    this.reqNewData();
  }
  // 分类取消
  onClickClassifyCancel() {
    this.classifyShow = !this.classifyShow;
  }
}
</script>

<style lang="scss">
$font-24: 24rpx;
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
