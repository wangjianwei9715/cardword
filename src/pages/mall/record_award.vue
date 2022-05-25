<template>
	<view style="padding-bottom: calc(20rpx + env(safe-area-inset-bottom));padding-top:20rpx">
		<!-- <view class="menu uni-flex">
			<view class="menu-item" @click="menuChange(item,index)" :class="{selectItem:index==tagMenu.index}" v-for='(item,index) in tagMenu.list' :key='index'>{{item.name}}</view>
		</view> -->
		<view class="commodity" v-for="(item,index) in awardList" :key='index'>
			<muqian-lazyLoad class="commodity-image" :src="decodeURIComponent(item.logo)">
			</muqian-lazyLoad>
			<view class="commodity-right">
				<view class="title oneLineOver">{{item.name}}
				</view>
				<view class="normal" style="margin-top: 10rpx;">兑换时间：{{dateFormatMSHMS(item.exchangeAt)}}</view>
				<view class="normal" style="margin-top: 10rpx;">卡币:{{item.price}}</view>
				<view class="line"></view>
				<view class="normal" style="color:#FB4E3E">券编号：{{item.couponCode}}</view>
			</view>
		</view>
		<empty v-if='!awardList.length' />
	</view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "../../base/BaseNode.vue";
import { dateFormatMSHMS } from "@/tools/util";
@Component({})
export default class ClassName extends BaseNode {
  dateFormatMSHMS: any = dateFormatMSHMS;
  tagMenu: any = {
    index: 0,

    list: [
      {
        name: "兑换记录",
        value: 1
      },
      {
        name: "抽奖记录",
        value: 2
      }
    ]
  };
  queryParams: any = {
    pageIndex: 1,
    pageSize: 20,
    // tp: 1 //1 兑换记录 2 抽奖记录
  };
  totalPage: number = 0;
  awardList: any = [];
  onLoad(query: any) {
    this.reqNewData();
  }
  onPullDownRefresh() {
    this.queryParams.pageIndex = 1;
    this.reqNewData(() => {
      setTimeout(() => {
        uni.stopPullDownRefresh();
      }, 500);
    });
  }
  onReachBottom() {
    if (this.queryParams.pageIndex < this.totalPage) {
      this.queryParams.pageIndex += 1;
      this.reqNewData();
    }
  }
  onShow() {}
  menuChange(item: any, index: number) {
    if (this.tagMenu.index == index) return;
    this.tagMenu.index = index;
    this.queryParams.tp = this.tagMenu.list[index].value;
    this.queryParams.pageIndex = 1;
    this.reqNewData();
  }
  reqNewData(cb?: Function) {
    app.http.Get(
      "dataApi/point/exchange/myRecordlist",
      this.queryParams,
      (res: any) => {
        this.totalPage = res.totalPage;
        const reqList = res.list || [];
        this.queryParams.pageIndex == 1
          ? (this.awardList = reqList)
          : this.awardList.push(...reqList);
        cb && cb();
      }
    );
  }
}
</script>

<style lang="scss">
page {
  font-family: PingFang SC;
}
.menu {
  width: 750rpx;
  margin-bottom: 50rpx;
}

.menu-item {
  width: 50%;
  text-align: center;
  line-height: 96rpx;
  font-size: 29rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: #333333;
}

.selectItem {
  font-weight: 600;
  font-size: 31rpx;
  color: #e23737;
}
.commodity {
  padding: 0 26rpx;
  display: flex;
  justify-content: space-between;
  margin: 20rpx 0;
}

.commodity-image {
  width: 188rpx;
  height: 188rpx;
  background: #333333;
  border-radius: 3rpx;
}

.commodity-right {
  width: 70%;
  .title {
    font-size: 29rpx;
    font-weight: 600;
    color: #333333;
  }

  .normal {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #b8b7b7;
  }
}
.line {
  width: 100%;
  background-color: #e7e7e7;
  height: 2rpx;
  margin: 16rpx 0;
}
.commodity-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10rpx;
	height: 39rpx;
  .participation {
    display: flex;
    align-items: center;

    .avatar {
      width: 35rpx;
      height: 35rpx;
      background: #dbdbdb;
      display: block;
      border-radius: 50%;
      margin-right: 6rpx;
    }
  }

  .startPanicBuying {
    width: 181rpx;
    height: 39rpx;
    background: #dbdbdb;
    border-radius: 3rpx;
    font-size: 25rpx;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    line-height: 39rpx;
  }
}
</style>
