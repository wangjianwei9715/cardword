<template>
    <view class='content'>
        <view class="tagContainer">
            <view class="tagItem" :class="{selectTag:index==tag.index}" v-for="(item,index) in tag.list" :key="index">
                {{item.label}}</view>
        </view>
        <view class="msgItem">
            <image class="msg-img" src="" mode="aspectFill" />
            <view class="msg-right">
                <view class="msg-name">
                    店铺通用券
                </view>
                <view class="msg-cumulative">累计使用<text style="color:#e9114f">333</text>元</view>
                <view class="msg-action uni-flex">
                    <view class="actionButton flexCenter">
                        查看
                    </view>
                    <view class="actionButton flexCenter redButton" @click="createCouponShow=true">
                        创建
                    </view>
                </view>
            </view>
        </view>
        <merchantCoupon :showDrawer.sync="createCouponShow" />

        <!-- <view class="previewCoupon" @click="pageJump('/pages/merchant/couponDetail')">查看</view> -->
        <!-- <bottomDrawer title='店铺通用券' :height='571' heightType='rpx' :needSafeArea='true'
            :showDrawer.sync='createCouponShow'>

        </bottomDrawer> -->
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
        tag: any = {
            index: 0,
            list: [{ label: '可创建' }, { label: '拼成商品' }]
        }
        createCouponShow: boolean = false;
        pageJump(url: string, type?: any) {
            const jumpType = type ?? "navigateTo"
            //@ts-ignore
            uni[jumpType]({
                url
            })
        }
    }
</script>

<style lang="scss">
    page {
        background-color: #f5f7fb;
    }

    .tagContainer {
        width: 750rpx;
        background-color: #fff;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 80rpx;
    }

    .tagItem {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #959699;
    }

    .selectTag {
        font-size: 31rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
    }

    .msgItem {
        width: 722rpx;
        height: 208rpx;
        background: #FFFFFF;
        border-radius: 5rpx;
        box-sizing: border-box;
        padding: 18rpx 24rpx 19rpx 22rpx;
        display: flex;
        align-items: center;
        margin-top: 14rpx;
    }

    .msg-img {
        width: 171rpx;
        height: 171rpx;
        display: block;
        margin-right: 29rpx;
        background-color: red;
    }

    .msg-name {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        margin-bottom: 10rpx;
    }

    .msg-right {
        display: flex;
        flex-direction: column;
        /* justify-content: space-between; */
        height: 100%;
        flex: 1;
    }

    .msg-cumulative {
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #88878C;
        flex: 1;
    }
    .msg-action{
        width: 100%;
        justify-content: flex-end;
    }
    .actionButton {
        width: 119rpx;
        height: 43rpx;
        border: 1rpx solid #7A7A7A;
        border-radius: 3rpx;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        margin-left: 21rpx;
        color: #333333;
    }

    .redButton {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #F6F7FB;
        border: 1rpx solid #E6374C;
        background: #E6374C;
    }
</style>