<template>
    <view class="content">
        <goodslist style="margin-top:14rpx" :goodsList="list" @send="onClickJumpDetails"></goodslist>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '../../../base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {

    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 20
    }
    list: any = []
    isFetchEnd: any = true
    totalPage: number = 0;
    onLoad(query: any) {
        this.reqNewData()
    }
    onPullDownRefresh() {
        this.queryParams.fetchFrom = 1
        this.reqNewData(() => {
            uni.stopPullDownRefresh()
        })
    }
    onReachBottom() {
        if (this.isFetchEnd) return
        this.queryParams.fetchFrom += this.queryParams.fetchSize
        this.reqNewData()
    }
    // 跳转商品详情
    onClickJumpDetails(goodCode: any) {
        app.navigateTo.goGoodsDetails(goodCode)
    }
    reqNewData(cb?: any) {
        app.http.Get('dataApi/selectRank/good/list', this.queryParams, (res: any) => {
            this.isFetchEnd = res.isFetchEnd
            const dataList = res.list || []
            this.list = this.queryParams.fetchFrom == 1 ? dataList : [...this.list, ...dataList]
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
page {
    background: $content-bg;
    width: 750rpx;
    overflow-x: hidden;
}
</style>
