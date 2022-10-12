<template>
  <view class="content">
    <view class="header-banner">
      <statusbar />
      <view class="tab-header">
        <view class="icon-back" @click="onClickBack">
          <image style="width:19rpx;height:35rpx" src="@/static/index/v3/icon_back.png"/>
        </view>
        <view class="header-title">资讯</view>
        <view class="header-icon">
          <view class="icon-search" @click.prevent="onClickGoSearch"></view>
          <view class="icon-collect" @click.prevent="onClickMyCollect"></view>
				</view>
      </view>
      <u-tabs :list="tabData.list" :current="tabData.current" :itemStyle="tabData.itemStyle" :activeStyle="tabData.activeStyle" :inactiveStyle="tabData.inactiveStyle" lineColor="#ef3333" @click="onClickListTabs"></u-tabs>
    </view>

    <view class="live-content">
      <statusbar />
      <swiper v-show="tabData.current==0 && AD_List!=''" class="swiper" autoplay="true" circular="true" indicator-active-color="#ffffff">
				<swiper-item v-for="(item,index) in AD_List" :key="index">
					<view class="ad-box">
						<muqian-lazyLoad class="ad-pic" :src="decodeURIComponent(item.pic_url)" mode="aspectFill" @click="onClickSwiper(item)"/>
					</view>
				</swiper-item>
			</swiper>

      <informationList class="list-box" :list="information" :type="tabData.list[tabData.current].id"/>
      <empty v-show="empty" />
    </view>
  </view>
</template>


<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "../../base/BaseNode.vue";
import { getGoodsImg,dateFormatMS } from "@/tools/util"
const TabList = [
  { id: 100, name: "推荐" },
  { id: 2, name: "卡圈杂谈" },
  { id: 4, name: "精彩瞬间" },
  { id: 1, name: "活动公告" },
  { id: 3, name: "体育快报" }
]
@Component({})
export default class ClassName extends BaseNode {
  getGoodsImg = getGoodsImg;
  dateFormatMS = dateFormatMS;
  tabData = {
    list:TabList,
    current:0,
    itemStyle:{height: '90rpx',padding:'0rpx 30rpx'},
    inactiveStyle:{"font-size":"28rpx","color":"#959699","font-weight":"400"},
    activeStyle:{"font-size":"31rpx","color":"#333","font-weight":"bold"}
  }
  AD_List = [];
  listParams = {
    pageIndex: 1,
    pageSize: 10,
    qt: 0,
    q:'',
    noMoreData:false
  }
  information: any = [];
  empty = false;
  appToken = ''
  onLoad(query: any) {
    this.appToken = app.token.accessToken;
    this.reqNewData();
    app.http.Get('dataApi/article/showy/list',{},(res:any)=>{
      this.AD_List = res.list || []
    })

    this.onEventUI("informationChange", (res: any) => {
      if (res && res.articleCode) {
        let findItem = this.information.find((item: any) => {
          return item.articleCode == res.articleCode;
        });
        if (findItem) {
          findItem.isLikes = res.isLikes;
          findItem.likes = res.likes;
          findItem.comment = res.comment
        }
      }
    });
  }
  onShow(){
    if(this.appToken != app.token.accessToken){
      this.onClickSearch()
    }
  }
  onUnload(){
    uni.$off('informationChange');
  }
  //   加载更多数据
  onReachBottom() {
    this.reqNewData();
  }
  onClickListTabs(item:{[x:string]:any}) {
    const { tabData } = this;
    if (item.index == tabData.current) {
      return;
    }
    this.information = [];
    tabData.current = item.index;
    this.onClickSearch()
  }
  onClickBack() {
    uni.navigateBack({
      delta: 1,
    });
  }
  onClickSearch() {
    // 搜索
    const { listParams } = this;
    this.information = [];
    listParams.pageIndex = 1;
    listParams.noMoreData = false;
    this.reqNewData();
  }
  onClickGoSearch(){
    uni.navigateTo({
        url:'/pages/information/search'
      })
  }
  onClickMyCollect(){
    app.platform.hasLoginToken(()=>{
      uni.navigateTo({
        url:'/pages/information/mylikes'
      })
    })
  }
  onClickSwiper(item:any){
    app.navigateTo.goInformationDetail(item,100,1)
  }
  reqNewData(cb?: Function) {
    // 获取更多商品
    const { listParams } = this;
    if (listParams.noMoreData) {
      return;
    }
    const params = {
      pageIndex: listParams.pageIndex,
      pageSize: listParams.pageSize,
      qt: TabList[this.tabData.current].id,
      q : encodeURIComponent(listParams.q)
    }
    app.http.Get("dataApi/article/homelist", params, (data: any) => {
      let arr = data.list || [];
      let list = listParams.pageIndex == 1 ? arr : [...this.information, ...arr];
      this.information = app.platform.removeDuplicate(list,'articleCode');
      this.empty = data.total == 0;
      listParams.noMoreData = data.totalPage <= listParams.pageIndex;
      listParams.pageIndex++;
      if (cb) cb();
    });
  }
}
</script>

<style lang="scss">
page {
  background: #fff;
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
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header-title {
  height: 88rpx;
  line-height: 88rpx;
  font-size: 34rpx;
  font-family: PingFang SC;
  font-weight: 600;
  color: #333333;
}
.header-icon {
  height: 88rpx;
  display: flex;
  align-items: center;
  position: absolute;
  right: 40rpx;
  top: 0;
}
.icon-search{
  width: 35rpx;
  height:37rpx;
  background:url(@/static/information/icon_search.png) no-repeat center /100% 100%;
}
.icon-collect{
  width: 39rpx;
  height:36rpx;
  background:url(@/static/information/icon_collect.png) no-repeat center /100% 100%;
  margin-left: 36rpx;
}
.tabc-content {
  width: 100%;
  margin-top: -20rpx;
}
.live-content {
  width: 100%;
  box-sizing: border-box;
  padding: 220rpx 0 20rpx 0;
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
.swiper {
  width: 750rpx;
  height: 333rpx;
  margin-bottom: 40rpx;
}

.ad-box {
  width: 750rpx;
  height: 333rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ad-pic {
  width: 750rpx;
  height: 333rpx;
}
.list-box{
  width: 100%;
  background:#fff;
  box-sizing: border-box;
}
</style>
