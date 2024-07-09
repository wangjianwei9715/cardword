<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2024-06-17 10:05:21
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2024-06-25 15:41:39
 * @FilePath: \card-world\src\pages\merchant\cardresult\index.vue
 * @Description: ✌✌✌✌✌✌
 * 
 * Copyright (c) 2024 by ${lsj}, All Rights Reserved. 
-->
<template>
    <view class="content">
        <view class="topMenu">
            <view class="menuItem" :class="{ menuItem_select: queryParams.state == 1 }" @click="onClickState(1)">
                未完成
            </view>
            <view class="menuItem" :class="{ menuItem_select: queryParams.state == 2 }" @click="onClickState(2)">
                已完成
            </view>
        </view>
        <view class="goodsItem" v-for="(item, index) in list" :key="index">
            <view class="topWrap uni-flex jb alc">
                <view class="time">
                    拼成时间 {{ $u.timeFormat(item.group_at, "mm-dd hh:MM") }}
                </view>
                <view class="stateName" :style="{ color: getStateName(item).color || '#333333' }">
                    {{ getStateName(item).txt }}
                </view>
            </view>
            <view class="centerWrap un-flex">
                <muqian-lazyLoad borderRadius="3rpx" class="goodsPic"
                    :src="$thumbnail(item.pic, 200)"></muqian-lazyLoad>
                <view class="goodsInfo uni-flex">
                    <view class="goodsTitle u-line-2">
                        {{ item.title }}
                    </view>
                    <view class="goodsPrice">
                        <view class="price">
                            <text class="symbol">￥</text>
                            <text class="money">{{ item.price }}</text>
                            <text class="qi">起</text>
                        </view>
                        <view class="goodsNum">
                            余0/{{ item.total_num }}
                        </view>
                    </view>
                </view>
            </view>
            <view class="bottomWrap">
                <template v-if="(item.status == 5 || item.status == 6)">
                    <view class="button flexCenter" @click="onClickUpload(item)">
                        {{ getStateName(item).txtBtn }}
                    </view>
                </template>
                <template v-else>
                    <view class="button button_white flexCenter" @click="onClickLookNo(item)">
                        查看报告
                    </view>
                    <view class="button flexCenter" v-if="item.status==7" @click="onClickToDeliveryDetail(item,1)">
                        去发货
                    </view>
                    <view class="button flexCenter" v-if="item.status==8 || item.status==9" @click="onClickToDeliveryDetail(item,2)">
                        发货详情
                    </view>
                    <!-- status -->
                </template>

            </view>
        </view>
        <view class="bottomSafeArea"></view>
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
        pageSize: 10,
        state: 1
    }
    list: any = []
    totalPage: number = 0
    onLoad(query: any) {
        this.reqNewData()
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
    onClickState(state: number) {
        if (this.queryParams.state == state) {
            return
        }
        this.queryParams.pageIndex = 1
        this.queryParams.state = state
        this.reqNewData()
    }
    onClickUpload(item: any) {
        uni.navigateTo({
            url: `/pages/merchant/cardresult/upload?code=${item.goodCode}&reportState=${item.reportState}`
        })
    }
    onClickLookNo(item:any){
        uni.navigateTo({
           url:`/pages/goods/goods_result_list_new?chooseIds=1&code=${item.goodCode}&random=false`
        })
    }
    onClickToDeliveryDetail(item: any,tp:number) {
        uni.navigateTo({
            url: `/pages/merchant/delivery/detail?codes=${item.goodCode}&merge=${0}&tp=${tp}`
        })
    }
    getStateName(item: any): any {
        if (item.status == 5 || item.status == 6) {
            if (item.status == 5) {
                return { txt: "待制作", txtBtn: '制作报告' }
            }
            if (item.reportState == 0) {
                return { txt: "待审核", color: "#F7B500", txtBtn: '更新报告' }
            }
            if (item.reportState == 2) {
                return { txt: "审核驳回", color: "#E02020", txtBtn: '修改报告' }
            }
        } else {
            if (item.rating) {
                return { txt: "评分开启" }
            } else {
                return { txt: "评分未开启" }
            }
        }
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/merchant/report/goods/list`, this.queryParams, (res: any) => {
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
    background-color: #f7f7f7;
}

.jb {
    justify-content: space-between;
}

.alc {
    align-items: center;
}

.topMenu {
    display: flex;
    align-items: center;
    height: 90rpx;
    justify-content: space-between;
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 100rpx;
    background-color: #ffffff;

    .menuItem {
        width: 180rpx;
        text-align: center;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #bfbfbf;
        text-align: center;
        font-style: normal;
        position: relative;
        height: 90rpx;
        line-height: 90rpx;
        // margin-right: 100rpx;
    }

    .menuItem_select {
        color: #FA1545;
    }

    .menuItem_select::after {
        content: "";
        width: 180rpx;
        height: 2rpx;
        background: #FA1545;
        position: absolute;
        bottom: 0;
        left: 0;
    }
}

.goodsItem {
    width: 710rpx;
    height: 356rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    box-sizing: border-box;
    padding: 0 20rpx;
    margin-top: 20rpx;

    .topWrap {
        margin-top: 20rpx;

        .time {
            font-family: SFProText, SFProText;
            font-weight: 400;
            font-size: 24rpx;
            color: #999999;
            line-height: 28rpx;
            text-align: center;
            font-style: normal;
        }

        .stateName {
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 28rpx;
            color: #333333;
            line-height: 40rpx;
            text-align: right;
        }
    }

    .centerWrap {
        margin-top: 24rpx;
        height: 148rpx;
        display: flex;
        justify-content: space-between;

        .goodsPic {
            width: 178rpx;
            height: 148rpx;
        }

        .goodsInfo {
            width: 470rpx;
            flex-direction: column;
            justify-content: space-between;

            .goodsTitle {
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                font-size: 24rpx;
                color: rgba(0, 0, 0, 0.9);
                line-height: 34rpx;
                text-align: left;
                font-style: normal;
            }

            .goodsPrice {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .symbol {
                    font-size: 20rpx;
                    color: #000000;
                }

                .money {
                    font-family: Impact;
                    font-size: 28rpx;
                }

                .qi {
                    font-size: 20rpx;
                    color: #999999;
                    margin-left: 6rpx;
                }
            }

            .goodsNum {
                font-family: PingFangSC, PingFang SC;
                font-weight: 400;
                font-size: 22rpx;
                color: #999999;
                text-align: right;
                font-style: normal;
            }
        }
    }

    .bottomWrap {
        width:100%;
        margin-top: 42rpx;
        display: flex;
        justify-content: end;

        .button {
            width: 140rpx;
            height: 60rpx;
            background-color: #f31146;
            border-radius: 6rpx;
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 24rpx;
            color: #FFFFFF;
            line-height: 34rpx;
            text-align: center;
            font-style: normal;
            border:2rpx solid #f31146;
            margin-left: 20rpx;
        }

        .button_white {
            background-color: #ffffff;
            color: #333333;
            border:2rpx solid #999999;
        }
    }
}
</style>
