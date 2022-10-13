<template>
    <view class="content">
        <view class="detailCard">
            <image class="backImg" mode="aspectFill"
                :src="'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.31/seller/info/1661914607170otf4sr6pif.jpg'" />
            <view class="merchantMask"></view>
            <view class="seriesInfo uni-flex">
                <image class="seriesInfo-avatar" mode="aspectFill"
                    :src="'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.31/seller/info/1661914607170otf4sr6pif.jpg'" />
                <view class="seriesInfo-name">PRIZM</view>
            </view>
            <view class="seriesInfo-introduction">
                球星卡是一种印有篮球明星的卡片，在公元1880年，由美国烟草制造商所推出的。早期的球员卡做为买香烟的赠球星卡是一种印有篮球明星的卡片，在公元1880年，由美国烟草制造商所推出的。早期的球员卡做为买香烟的赠....
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '../../base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {

    onLoad(query: any) {

    }
    onReachBottom() {

    }
    onPulldDownRefresh() {

    }

}
</script>

<style lang="scss">
page {
    background-color: #f6f7fb;
}

.detailCard {
    width: 750rpx;
    height: 380rpx;
    position: relative;
}

.backImg {
    width: inherit;
    height: inherit;
    top: 0;
    left: 0;
    position: absolute;
}


.seriesInfo {
    margin-top: 144rpx;
    padding: 0 35rpx;
    align-items: center;
    position: relative;

    .seriesInfo-avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 3rpx;
        margin-right: 28rpx;
    }

    .seriesInfo-name {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
    }
}

.merchantMask {
    width: 100%;
    height: inherit;
    position: absolute;
    background-color: rgba(255, 255, 255, .61);
    top: 0;
    // opacity: .61;
    left: 0;
}

.seriesInfo-introduction {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #E6E6E6;
    padding: 0 36rpx;
    margin-top: 34rpx;
    position: relative;
    line-height: 32rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
</style>
