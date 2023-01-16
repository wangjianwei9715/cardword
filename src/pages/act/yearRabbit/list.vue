<template>
  <view class="content">
    <view class="act-bg"></view>
    <view class="act-index">
      <view class="act-bg-top"><image class="top-img" src="@/static/act/yearRabbit/bg_top_.png"/></view>
      <view class="act-bg-title"></view>
      <view class="goods-lists">
        <view class="goodslistHorizontal">
            <view class="list-index" v-for="(item, index) in goodsList" :key="index" @click="onClickJumpDetails(item.goodCode)">
              <view class="goodsCard">
                <view class="list-orther" v-if="item.state==0 || item.state == -1">{{dateFormatMSHMS(item.startAt)}}开售</view>
                <view class="list-orther" v-else>余 {{item.totalNum-(item.currentNum+item.lockNum)}}/{{item.totalNum}}</view>
                <muqian-lazyLoad class="goodsImg" borderRadius="3rpx" :src="$parsePic(decodeURIComponent(item.pic))" />
                <view class="goodsRight">
                    <view class="goodsRight-top">
                        <view class="goodsName">{{ item.title }}</view>
                        <view class="goodsDiscounts">总价直降{{item.yhzj}}元<image class="img-down" src="@/static/act/yearRabbit/down.png"/></view>
                    </view>
                    <view class="goodsRight-bottom uni-flex">
                        <view class="goodsPriceContainer">
                            <text>￥</text>
                            <text>{{ filterPrice(item.price).integer }}</text>
                            <text class="decimal"
                                v-if="filterPrice(item.price).decimal">{{ filterPrice(item.price).decimal }}</text>
                            <text class="priceTips">{{ getPriceStart(item) ? '起' : '' }}</text>
                        </view>
                        <view class="goodsMerchant uni-flex" @click.stop="onClickSellerShop(item)">
                            <muqian-lazyLoad class="merchantLogo" borderRadius="50%"
                                :src="$parsePic(decodeURIComponent(item.merchantLogo))" />
                            <view class="merchantName">{{ item.merchantName }}</view>
                        </view>
                    </view>
                </view>
              </view>
            </view>
        </view>
      </view>
      
      <empty v-if='goodsList&&!goodsList.length'/>
    </view>
  </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "../../../base/BaseNode.vue";
import { dateFormatMSHMS } from "@/tools/util"
@Component({})
export default class ClassName extends BaseNode {
  dateFormatMSHMS = dateFormatMSHMS;
  goodsList:any = [];
  noMoreData = false;
  listParams = {
    fetchFrom:1,
    fetchSize:10
  }
  onLoad(query: any) {
    this.reqNewData();
  }
  //   下拉刷新
  onPullDownRefresh() {
    this.reqSearchList(() => {
      uni.stopPullDownRefresh();
    })
  }
  onReachBottom() {
    this.reqNewData();
  }
  reqSearchList(cb?:Function) {
    this.listParams.fetchFrom = 1;
    this.noMoreData = false;
    this.reqNewData(()=>{
      cb&&cb()
    });
  }
  reqNewData(cb?: Function) {
    // 获取列表
    if (this.noMoreData) return;
    const { listParams } = this;
    app.http.Get( "dataApi/goodlist/forsale/springFestival2023", listParams, (res: any) => {
        this.noMoreData = res.isFetchEnd;
        if (listParams.fetchFrom == 1) this.goodsList = [];
        if (res.goodList) {
          this.goodsList = [...this.goodsList,...res.goodList]
        }
        listParams.fetchFrom += listParams.fetchSize;
        cb&&cb();
      }
    );
  }
  filterPrice(price: number) {
    let data = {
        integer: 0,
        decimal: 0,
    }
    if (!price) return data
    const priceArr: any = String(price).split('.')
    if (priceArr.length == 1) {
        data.integer = priceArr[0]
        return data
    }
    return {
        integer: priceArr[0],
        decimal: '.' + priceArr[1]
    }
  }
  getPriceStart(item: any) {
    return item.isSelect || item.discount != '' || item.pintuan_type == 11
  }
  // 跳转商品详情
  onClickJumpDetails(goodCode: any) {
    app.navigateTo.goGoodsDetails(goodCode)
  }
  onClickSellerShop(item: any) {
    if (!item.merchantName) return;
    this.goMerchantPage(item.merchantAlias)
  }
}
</script>

<style lang="scss">
$font-24: 24rpx;

page {
  background: $content-bg;
}
.act-bg{
  width: 100%;
  height:100%;
  position: fixed;
  left:0;
  top:0;
  right:0;
  bottom:0;
  background:url(@/static/act/yearRabbit/bg.jpg) no-repeat center / 100% 100%;
  z-index: 1;
}
.act-index{
  width: 100%;
  position: relative;
  z-index: 2;
}
.act-bg-top{
  width: 100%;
  height:421rpx;
  position: relative;
  background: url(@/static/act/yearRabbit/bg_top.png) no-repeat center / 100% 100%;
  .top-img{
    width: 100%;
    height:84rpx;
    position: absolute;
    bottom:-17rpx;
    left:0;
    right:0;
  }
}
.act-bg-title{
  width: 658rpx;
  height:99rpx;
  margin:0 auto;
  margin-top: 47rpx;
  margin-bottom: 28rpx;
  background: url(@/static/act/yearRabbit/title.png) no-repeat center / 100% 100%;
}
.content {
  width: 100%;
  box-sizing: border-box;
}



.header-banner {
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  // #ifdef H5
  top: 80rpx;
  // #endif
  // #ifndef H5
  top: 0;
  // #endif
  z-index: 66;
  // z-index: 9;
}

.goods-lists {
  width: 100%;
  box-sizing: border-box;
}
.goodslistHorizontal {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.list-index{
  width: 721rpx;
  height:290rpx;
  box-sizing: border-box;
  padding:21rpx 25rpx 0 24rpx;
  background: url(@/static/act/yearRabbit/bg_list.png) no-repeat center / 100% 100%;
  margin-bottom: 14rpx;
}
.goodsCard {
    width: 672rpx;
    height: 242rpx;
    background: linear-gradient(0deg, #FFE2B0 14.000000000000002%, #FFF6D6 100%);
    box-shadow: 0px 0px 16px 0px #E0C695; 
    border-radius: 5rpx;
    display: flex;
    box-sizing: border-box;
    padding: 20rpx 12rpx;
    align-items: center;
    position: relative;
    overflow: hidden;
    .list-orther{
      height:38rpx;
      line-height: 38rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding:0rpx 8rpx;
      font-size: 21rpx;
      font-family: PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      position: absolute;
      left:0;
      top:0;
      background: linear-gradient(0deg, #e9492f 50%, #fa1545 100%);
      z-index: 6;
      border-bottom-right-radius: 5rpx;
    }
    .goodsImg {
        width: 290rpx;
        height: 200rpx;
        background: #333333;
        margin-right: 22rpx;
    }
    .goodsRight {
        flex: 1;
        display: flex;
        height: 200rpx;
        box-sizing: border-box;
        justify-content: space-between;
        flex-direction: column;
        padding: 6rpx 0rpx 20rpx 0rpx;
        .goodsName {
            // font-size: 25rpx;
            // font-family: PingFang SC;
            // font-weight: 400;
            // color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            line-height: 34rpx;
            -webkit-line-clamp: 2;
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 600;
            color: #333333;
        }
        .goodsDiscounts{
          display: flex;
          align-items: center;
          font-size: 23rpx;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FA1545;
          margin-top: 8rpx;
        }
        .img-down{
          margin-left: 14rpx;
          width: 33rpx;
          height:22rpx;
        }
        .onLineOver {
            -webkit-line-clamp: 1;
        }

        .goodsProgress {
            justify-content: space-between;
            align-items: center;
            margin-top: 18rpx;
        }

        .startTime {
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: 600;
            color: #454645;
            margin-top: 17rpx;
        }

        .progressContainer {
            // width: 331rpx;
            flex: 1;
            height: 8rpx;
            background-color: #f6f7fb;
            position: relative;
        }

        .progress {
            // width: 50%;
            height: inherit;
            background: linear-gradient(90deg, #F4B5C5 0%, #EA3345 100%);
        }

        .progressPercnet {
            margin-left: 18rpx;
            font-size: 23rpx;
            font-family: PingFang SC;
            font-weight: 400;
            width: 86rpx;
            // background-color: red;
            text-align: right;
            color: #959695;
            white-space: nowrap;
        }

        .goodsType {
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #959695;
            display: flex;
            align-items: center;
            margin-top: 10rpx;

            view {
                font-size: inherit;
                font-family: inherit;
                font-weight: inherit;
                color: inherit;
            }
        }

        .goodsTypeLine {
            width: 2rpx;
            height: 21rpx;
            background-color: #959695;
            margin: 0 16rpx;
        }

        .goodsPriceContainer {
            flex: 1;
            // font-size: 33rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            font-size: 33rpx;
            font-family: ArialBold !important;
            font-weight: 400;
            color: #333333;
            // line-height: 38rpx;
            // margin-right: 10rpx;
            letter-spacing: -2rpx;

            text:first-child {
                font-size: 20rpx;
                font-weight: 600;
            }

            .decimal {
                font-size: 23rpx;
            }

            .priceTips {
                // font-size: 23rpx;
                // font-family: PingFang SC;
                // font-weight: 400;
                // color: #959695;
                margin-left: 10rpx;
                font-size: 23rpx;
                font-family: PingFangSC-Regular;
                font-weight: 500;
                color: #959695;
            }
        }

        .goodsMerchant {
            align-items: center;

            .merchantLogo {
                width: 35rpx;
                height: 35rpx;
            }

            .merchantName {
                font-size: 23rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                margin-left: 11rpx;
            }
        }
    }
}
</style>
