<template>
    <view class='content'>
        <view class="niceTime">
            <view class="niceTimeItem" v-for="(item,index) in 16">
                <view class="niceTimeItem-top">
                    <image class="niceTimeItem-img" src="" mode="aspectFill" />
                    <view class="niceTimeItem-dot flexCenter">5</view>
                    <view class="scoreContainer uni-flex">
                        <image src="../../static/merchant/S.png" mode="aspectFill" />
                        <image class="A" src="../../static/merchant/A.png" mode="aspectFill" />
                    </view>
                </view>
                <view class="niceTime-name">
                    圣安东尼奥马刺 特里克·
                </view>
                <view class="niceTime-bottom uni-flex">
                    <image class="niceTime-avatar" src="" mode="aspectFill" />
                    <view class="niceTime-userName">用*名</view>
                    <view class="niceTime-time">07-25</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
    import { app } from "@/app";
    import { Component, Watch } from "vue-property-decorator";
    import BaseNode from "../../base/BaseNode.vue";
    import { parsePic } from "@/tools/util";
    @Component({})
    export default class ClassName extends BaseNode {
        parsePic: any = parsePic;

    }
</script>

<style lang="scss">
    page {
        background: #f5f7fb;
    }

    .niceTime {
        width: 750rpx;
        box-sizing: border-box;
        padding: 23rpx 14rpx;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .niceTimeItem {
 
        width: 356rpx;
        height: 418rpx;
        /* background-color: red; */
        background: #FFFFFF;
        border-radius: 5rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 11rpx;
        box-sizing: border-box;
        padding: 0 14rpx;
    }

    .niceTimeItem-top {
        width: 327rpx;
        height: 252rpx;
        background: #333333;
        border-radius: 3rpx;
        position: relative;
        overflow: hidden;
        margin-top: 13rpx;
    }

    .niceTimeItem-img {
        width: 327rpx;
        height: 252rpx;
        position: absolute;
        top: 0;
        left: 0;
        margin-top: 13rpx;
    }

    .niceTimeItem-dot {
        width: 30rpx;
        height: 30rpx;
        background: #5D5D5D;
        border-radius: 3rpx;
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        position: absolute;
        right: 1rpx;
        bottom: 1rpx;
    }

    .scoreContainer {
        position: absolute;
        align-items: center;
        left: 12rpx;
        top: 11rpx;

        image {
            width: 25rpx;
            height: 25rpx;
            margin-right: 5rpx;
        }

        .A {
            width: 29rpx;
            height: 24rpx;
        }
    }

    .niceTime-name {
        font-size: 25rpx;
        font-family: PingFang SC;
        color: #333333;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-top: 15rpx;
        width: 100%;
        height: 64rpx;
        margin-bottom: 30rpx;
    }

    .niceTime-bottom {
        width: 100%;
        align-items: center;
    }

    .niceTime-avatar {
        width: 27rpx;
        height: 27rpx;
        background: #88CCFA;
        border-radius: 50%;
        margin-right: 8rpx;
    }

    .niceTime-userName {
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        flex: 1;
    }

    .niceTime-time {
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
    }
</style>