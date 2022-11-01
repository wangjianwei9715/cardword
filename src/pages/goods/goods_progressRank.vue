<!--
 * @FilePath: \jichao_app_2\src\pages\goods\goods_progressRank.vue
 * @Author: wjw
 * @Date: 2022-11-01 11:45:57
 * @LastEditors: 
 * @LastEditTime: 2022-11-01 13:47:10
 * Copyright: 2022 .
 * @Descripttion: 
-->
<template>
    <view class="content">
        <view class="topBanner"></view>
        <view class="goodsContainer">
            <goodslist-horizontal @send="onClickJumpDetails" :lockNum="false" :goodsList="goodsList" :needRank="true">
            </goodslist-horizontal>
        </view>
        <empty v-if='goodsList&&!goodsList.length' />
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '../../base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    goodsList: { [x: string]: any } = [];
    noMoreData = false;
    newGoodsListType: any = ['cheap', 'new']
    // fetchFrom:第几个数据开始  fetchSize:取几个数据
    fetchFrom = 1;
    fetchSize = 10;
    listSort = "";
    onLoad(query: any) {
        this.reqNewData()
    }
    onReachBottom() {
        this.reqNewData();
    }
    onPullDownRefresh() {
        this.reqSearchList(()=>{
            uni.stopPullDownRefresh();
        })
    }
    // 跳转商品详情
    onClickJumpDetails(goodCode: any) {
        app.navigateTo.goGoodsDetails(goodCode)
    }
    reqSearchList(cb?:Function) {
        this.fetchFrom = 1;
        this.noMoreData = false;
        this.reqNewData(()=>{
            cb&&cb()
        });
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
            "dataApi/goodlist/forsale/progress",
            params,
            (res: any) => {
                if (res.isFetchEnd) {
                    this.noMoreData = true;
                }

                if (this.fetchFrom == 1) this.goodsList = [];
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
page {
    background-color: #f6f7fb;
}

.topBanner {
    width: 750rpx;
    height: 350rpx;
    background-size: 100% 100%;
    background-image: url('../../static/goods/v2/progressRank.png');
}

.goodsContainer {
    padding: 13rpx 20rpx;
}
</style>
