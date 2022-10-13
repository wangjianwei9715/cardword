<template>
    <view class="content">
        <view class="topBanner"></view>
        <view class="goodsContainer">
            <goodslist-horizontal @send="onClickJumpDetails" :goodsList="goodsList" :needRank="true"></goodslist-horizontal>
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
    goodsList: any = []
    onLoad(query: any) {

    }
    onReachBottom() {

    }
    onPulldDownRefresh() {

    }
    // 跳转商品详情
    onClickJumpDetails(goodCode: any) {
        app.navigateTo.goGoodsDetails(goodCode)
    }
    reqNewData() {

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
