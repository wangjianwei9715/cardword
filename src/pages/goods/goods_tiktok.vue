<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2024-06-13 15:35:07
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2024-06-13 16:12:08
 * @FilePath: \card-world\src\pages\goods\goods_tiktok.vue
 * @Description: ✌✌✌✌✌✌
 * 
 * Copyright (c) 2024 by ${lsj}, All Rights Reserved. 
-->
<template>
    <view class="content">
        <view class="fixedBanner"></view>
        <view class="fakerOpacityBanner"></view>
        <view class="liveWrap">
            <view class="liveWrap_top">
                <image class="banner"
                    src="http://cdn.ka-world.com/admin/debug/2024.02.27/template/0/1709001673989xa9nelzks.png"></image>
                <view class="merchantWrap uni-flex alc">
                    <image class="merchantWrap_avatar" src="http://cdn.ka-world.com/admin/debug/2024.02.27/template/0/1709001673989xa9nelzks.png"></image>
                    <view class="merchantWrap_name">i时到达死哦到i第几哦i请玩家都i去</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    queryParams: any = {
        pageIndex: 1,
        pageSize: 20
    }
    list: any = []
    totalPage: number = 0
    onLoad(query: any) {
        // this.reqNewData()
    }
    onReachBottom() {
        if (this.queryParams.pageIndex < this.totalPage) {
            this.queryParams.pageIndex += 1
            this.reqNewData()
        }
    }
    onPullDownRefresh() {
        this.queryParams.pageIndex = 1
        this.reqNewData(() => {
            uni.stopPullDownRefresh()
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi`, this.queryParams, (res: any) => {
            const list = res.list || []
            this.totalPage = res.totalPage
            this.queryParams.pageIndex == 1 ? this.list = list : this.list.push(...list)
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #f9f9f9;
}

.fixedBanner {
    width: 750rpx;
    height: 400rpx;
    background-color: #d7d7d7;
    position: fixed;
    top: 0;
    // z-index: 2;
}

.fakerOpacityBanner {
    width: 750rpx;
    height: 420rpx;
    opacity: 0;
}

.liveWrap {
    width: 720rpx;
    height: 660rpx;
    background-color: #ffffff;
    border-radius: 5rpx;
    overflow: hidden;
}

.liveWrap_top {
    width: inherit;
    height: 500rpx;
    position: relative;

    .banner {
        width: inherit;
        height: inherit;
        position: absolute;
        left: 0;
        top: 0;
    }

    .merchantWrap {
        max-width: 200rpx;
        height: 90rpx;
        background-color: rgba(0, 0, 0, .4);
        &_avatar{
            width: 50rpx;
            height: 50rpx;
            border-radius: 50%;
        }
        &_name{
            color: #ffffff;
            font-size: 24rpx;
        }
    }
}
</style>
