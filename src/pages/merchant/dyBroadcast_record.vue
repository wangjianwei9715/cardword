<!--
 * @FilePath: \jichao_app_2\src\pages\merchant\dyBroadcast_record.vue
 * @Author: wjw
 * @Date: 2022-12-16 16:23:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-07-09 09:35:40
 * Copyright: 2022 .
 * @Descripttion: 
-->
<template>
    <view class="dy-content" style="width: 100%;">
        <navigationbar title="历史记录"></navigationbar>

        <view class="dy-container">
            <view class="dy-box" v-for="item in list">
                <view class="header">
                    <view class="header-title">直播信息</view>
                    <view class="header-right">({{Math.floor((item.end_at-item.start_at)/3600)}}小时)</view>
                </view>
                <view class="line">
                    <view class="line-title">开始时间</view>
                    <view class="line-right">{{$u.timeFormat(item.start_at, 'yyyy年mm月dd日 hh时MM分')}}</view>
                </view>
                <view class="line">
                    <view class="line-title">结束时间</view>
                    <view class="line-right">{{$u.timeFormat(item.end_at, 'yyyy年mm月dd日 hh时MM分')}}</view>
                </view>
            </view>
        </view>

    </view>
</template>

<script lang="ts">
    import { app } from "@/app";
    import { Component } from "vue-property-decorator";
    import BaseNode from "../../base/BaseNode.vue";
    class ListParams {
        pageIndex = 1;
        pageSize = 20;
        noMoreData = false;
    }
    @Component({})
    export default class ClassName extends BaseNode {
        listParams = new ListParams();
        list = [];
        onLoad(query: any) {
            this.reqNewData()
        }
        onReachBottom() {
            this.reqNewData();
        }
        reqNewData(cb?: Function) {
            // 在售商品
            const { listParams } = this;
            if (listParams.noMoreData)  return;

            app.http.Get("me/shop/dyBroadcast/record", listParams, (data: any) => {
                const arr = data.list || [];
                this.list = listParams.pageIndex == 1 ? arr : [...this.list, ...arr];
                listParams.noMoreData = data.totalPage <= listParams.pageIndex;
                listParams.pageIndex++;
                if (cb) cb();
            });
        }

    }
</script>

<style lang="scss">
    page {
        width: 100%;
		height:100%;
        background:#F6F7FB;
    }
    @mixin lineBox {
        width: 100%;
        box-sizing: border-box;
        display: flex;
    }

    @mixin font($size) {
        font-size: $size;
        font-weight: 600;
        color: #333;
    }
    .nav-right-btn{
        font-size: 24rpx;
    }
    .dy-container{
        width: 100%;
        box-sizing: border-box;
        padding:16rpx;
    }
    .dy-box{
        width: 100%;
        box-sizing: border-box;
        background:#fff;
        padding:20rpx;
        border-radius: 4rpx;
        margin-bottom: 14rpx;
        .header{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header-title{
            font-size: 28rpx;
            font-weight: 500;
            display: flex;
            align-items: center;
            color:#333333
        }
        .header-right{
            font-size: 24rpx;
        }
        .line{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            margin-top: 30rpx;
        }
        .line-title{
            font-size: 24rpx;
            color:#AEAEB2
        }
        .line-right{
            height:60rpx;
            display: flex;
            align-items: center;        
            font-size: 24rpx;  
            color:#AEAEB2           
        }
    }
</style>