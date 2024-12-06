<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2024-06-17 10:05:21
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2024-07-23 14:09:42
 * @FilePath: \card-world\src\pages\merchant\delivery\index.vue
 * @Description: ✌✌✌✌✌✌
 * 
 * Copyright (c) 2024 by ${lsj}, All Rights Reserved. 
-->
<template>
    <view class="content">
        <transitionNav ref='transitionNav' :transition="false" :needIconShadow="false" title="发货管理">
        </transitionNav>
        <view class="topSearchContainer">
            <view class="nav" :style="{ height: navHeight + 'px' }"></view>

            <view class="topMenu">
                <view class="menuItem" :class="{ menuItem_select: queryParams.state == 1 }" @click="onClickState(1)">
                    未发货
                </view>
                <view class="menuItem" :class="{ menuItem_select: queryParams.state == 2 }" @click="onClickState(2)">
                    已发货
                </view>
            </view>
            <view class="searchContainer uni-flex">
                <view class="inputContainer uni-flex">
                    <image class="searchImg" src="@/static/cardForum/sousuo@2x.png"></image>
                    <input type="text" v-model="queryParams.q" @confirm="onInputConfirm" class="input"
                        placeholder="输入商品编号或标题">
                </view>
                <view class="btn" v-if="queryParams.state == 1" @click="onClickBatch">批量发货</view>
                <picker v-else :range="tpOptions" range-key="label" @change="tpChange">
                    <view class="btn">{{ getTpName() }}
                        <image src="@/static/merchant/donwDot.png" style="width:22rpx;height:12rpx;margin:0 4rpx">
                        </image>
                    </view>
                </picker>
            </view>
        </view>
        <view class="nav" :style="{ height: navHeight + 'px' }"></view>
        <view class="fakerTop"></view>
        <view class="goodsItem" v-for="(item, index) in list" :key="index" @click="onClickGoodsCard(item.goodCode)">
            <view class="topWrap uni-flex jb alc">
                <view class="time">
                    拼成时间 {{ $u.timeFormat(item.group_at, "mm-dd hh:MM") }}
                </view>
                <view class="stateName" :style="{ color: getStateName(item).color || '#333333' }">
                    {{ getStateName(item).txt }} <text class="stateOrderNum" v-if="queryParams.state == 1">{{
            `(${item.doneOrderNum}/${item.allOrderNum})` }}</text>
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
                    </view>
                </view>
            </view>
            <view class="bottomWrap">
                <template>
                    <view class="button button_white flexCenter" @click="onClickLookNo(item)">
                        查看报告
                    </view>
                    <view class="button flexCenter" v-if="item.status == 7" @click.stop="onClickToDetail(item, 0)">
                        去发货
                    </view>
                    <view class="button flexCenter" v-if="item.status == 8 || item.status == 9"
                        @click.stop="onClickToDetail(item, 1)">
                        发货详情
                    </view>
                    <!-- status -->
                </template>
                <view v-if="onBatchSelect"
                    :class="[inSelect(item.goodCode) || isSelectAll ? 'cardSelect' : 'cardUnSelect']"></view>
            </view>
        </view>
        <empty v-if="list&& !list.length"/>
        <view class="bottomActionWrap" v-if="onBatchSelect">
            <view class="btmWrap">
                <view class="radio" :class="{ radio_select: isSelectAll }" @click="onClickSelectAll">
                </view>
                <view class="txt" @click="onClickSelectAll">全选</view>
                <view class="yixua" v-if="selectCodes.length > 0 || isSelectAll">(已选{{ isSelectAll ? allCodes().length :
            selectCodes.length }}个商品)</view>
                <view class="flex1"></view>
                <view class="cancel flexCenter" @click="onBatchSelect = false, selectCodes = []">取消</view>
                <view class="push flexCenter" @click="onClickDelivery">批量发货</view>
            </view>
            <view class="bottomSafeArea"></view>
        </view>
        <view class="bottomSafeArea" style="pointer-events: none;">
            <view class="batchFakerWrap" v-if="onBatchSelect" style="height:160rpx;pointer-events: none;"></view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
const navHeight = app.statusBarHeight + uni.upx2px(88)
@Component({})
export default class ClassName extends BaseNode {
    navHeight = navHeight
    queryParams: any = {
        pageIndex: 1,
        pageSize: 10,
        state: 1,
        q: "",
        tp: 100,
    }
    list: any = []
    totalPage: number = 0
    selectCodes: any = []
    onBatchSelect: boolean = false
    isSelectAll: boolean = false
    loadAllPageTimer: any = null
    tpOptions: any = [{ value: 100, label: "全部" }, { value: 1, label: "已发待收" }, { value: 2, label: "已完成" }]
    onLoad() {
        this.reqNewData()
    }
    onReachBottom() {
        if (this.queryParams.pageIndex < this.totalPage) {
            this.queryParams.pageIndex += 1
            this.reqNewData()
        }
    }
    allCodes() {
        const codes = (this.list || []).map((item: any) => {
            return item.goodCode
        })
        return codes
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
        this.selectCodes = []
        this.onBatchSelect = false
        this.reqNewData()
    }
    onInputConfirm() {
        this.queryParams.pageIndex = 1
        this.selectCodes = []
        if (this.isSelectAll) this.isSelectAll = false
        this.reqNewData()
    }
    getTpName() {
        const item = this.tpOptions.find((v: any) => {
            return v.value == this.queryParams.tp
        })
        return item.label || "全部"
    }
    onClickUpload(item: any) {
        uni.navigateTo({
            url: `/pages/merchant/cardresult/upload?code=${item.goodCode}&reportState=${item.reportState}`
        })
    }
    onClickToDetail(item: any, isDetail: number) {
        this.selectCodes = []
        this.selectCodes.push(item.goodCode)
        uni.navigateTo({
            url: `/pages/merchant/delivery/detail?codes=${this.selectCodes.join(',')}&merge=${this.selectCodes.length > 1 ? 1 : 0}&isDetail=${isDetail}`
        })
        this.selectCodes = []
    }
    getStateName(item: any): any {
        if (item.status == 7) {
            return { txt: "未发货", txtBtn: '去发货' }
        }
        if (item.status == 8) {
            return { txt: "已发待收", txtBtn: '发货详情' }
        }
        if (item.status == 9) {
            return { txt: "发货完成", txtBtn: '发货详情' }
        }
    }
    onClickBatch() {
        if (this.queryParams.state == 2) return
        this.onBatchSelect = !this.onBatchSelect
    }
    tpChange(event: any) {
        if (this.queryParams.tp == this.tpOptions[event.detail.value].value) return
        this.queryParams.tp = this.tpOptions[event.detail.value].value
        this.queryParams.pageIndex = 1
        this.reqNewData()
    }
    onClickGoodsCard(goodCode: string) {
        if (!this.onBatchSelect) return
        if (this.isSelectAll) {
            this.selectCodes = []
            this.allCodes().forEach((code: any) => {
                if (code != goodCode) {
                    this.selectCodes.push(code)
                }
            })
            this.isSelectAll = false
            return
        }
        if (this.selectCodes.includes(goodCode)) {
            const findIndex = this.selectCodes.findIndex((code: string) => {
                return code == goodCode
            })
            if (findIndex >= 0) {
                this.selectCodes.splice(findIndex, 1)
            }
        } else {
            this.selectCodes.push(goodCode)
        }
    }
    onClickDelivery() {
        if (this.selectCodes.length == 0 && !this.isSelectAll) {
            uni.showToast({
                title: "请选择商品",
                icon: "none"
            })
            return
        }
        if (this.isSelectAll && this.allCodes().length == 0) {
            uni.showToast({
                title: "批量发货失败,无商品可发货",
                icon: "none"
            })
            return
        }
        uni.navigateTo({
            url: `/pages/merchant/delivery/detail?codes=${this.isSelectAll ? this.allCodes().join(',') : this.selectCodes.join(',')}&merge=${this.isSelectAll ? 1 : this.selectCodes.length > 1 ? 1 : 0}`
        })
    }
    onClickLookNo(item: any) {
        uni.navigateTo({
            url: `/pages/goods/goods_result_list_new?chooseIds=1&code=${item.goodCode}&random=false`
        })
    }
    onClickSelectAll() {
        this.isSelectAll = !this.isSelectAll
        if (!this.isSelectAll) this.selectCodes = []
    }
    inSelect(code: string) {
        return this.selectCodes.includes(code)
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/merchant/delivery/goods/list`, this.queryParams, (res: any) => {
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

.fakerTop {
    height: 190rpx;
}

.topSearchContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    width: 750rpx;
    // padding-top: 14rpx;
    position: fixed;
    padding-bottom: 12rpx;
    top: 0;
    z-index: 2;
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
        height: 80rpx;
        line-height: 80rpx;
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

.searchContainer {
    box-sizing: border-box;
    width: 750rpx;
    padding: 0 20rpx;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;

    .inputContainer {
        align-items: center;
        width: 562rpx;
        height: 72rpx;
        background: #F6F6F6;
        border-radius: 5rpx;
        box-sizing: border-box;
        padding: 0 24rpx;

        .searchImg {
            width: 28rpx;
            height: 30rpx;
            margin-right: 16rpx;
        }

        .input {
            flex: 1;
            font-size: 28rpx;
        }
    }

    .btn {
        width: 128rpx;
        height: 54rpx;
        background: #FA1545;
        border-radius: 5rpx;
        font-weight: bold;
        font-size: 24rpx;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
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

        .stateOrderNum {
            font-size: 24rpx;
            margin-left: 8rpx;
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
        width: 100%;
        margin-top: 42rpx;
        display: flex;
        justify-content: flex-end;
        position: relative;

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
            border: 2rpx solid #f31146;
            margin-left: 20rpx;
        }

        .button_white {
            background-color: #ffffff;
            color: #333333;
            border: 2rpx solid #999999;
        }

        .cardSelect {
            width: 28rpx;
            height: 28rpx;
            position: absolute;
            left: 0;
            border-radius: 50%;
            border: 2rpx solid #f6054a;
            bottom: 16rpx;
        }

        .cardSelect::after {
            content: " ";
            width: 16rpx;
            height: 16rpx;
            border-radius: 50%;
            background-color: #f6054a;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            margin: auto;
        }

        .cardUnSelect {
            width: 28rpx;
            height: 28rpx;
            background: #FFFFFF;
            border: 2rpx solid #BBBBBB;
            border-radius: 50%;
            position: absolute;
            left: 0;
            bottom: 16rpx;
        }
    }
}

.bottomActionWrap {
    width: 750rpx;
    // height: 128rpx;
    background: #FFFFFF;
    // box-sizing: border-box;

    position: fixed;
    bottom: 0;

    .btmWrap {
        width: 750rpx;
        box-sizing: border-box;
        height: 128rpx;
        display: flex;
        align-items: center;
        padding: 0 20rpx 0 40rpx;

        .radio {
            width: 30rpx;
            height: 30rpx;
            background: #FFFFFF;
            border: 2rpx solid #BBBBBB;
            margin-right: 8rpx;
            border-radius: 50%;
            position: relative;
            // display: flex;
            // align-items: center;
            // justify-content: center;
        }

        .radio_select {
            // background: #f2004e;
            border: 2rpx solid #f2004e;
        }

        .radio_select::after {
            content: " ";
            width: 18rpx;
            height: 18rpx;
            border-radius: 50%;
            background-color: #f6054a;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            margin: auto;
        }

        .raido_son {
            background-color: #f2004e;
            width: 20rpx;
            height: 20rpx;
            border-radius: 50%;
        }

        .txt {
            font-weight: 500;
            font-size: 24rpx;
            color: #BBBBBB;
            // flex: 1;
        }

        .flex1 {
            flex: 1;
        }

        .yixua {
            font-weight: 500;
            font-size: 24rpx;
            color: #f2004e;
            margin-left: 6rpx;
        }

        .cancel {
            width: 152rpx;
            height: 62rpx;
            border-radius: 5rpx;
            border: 1rpx solid #DDDDDD;
            font-weight: 500;
            font-size: 28rpx;
            color: #333333;
        }

        .push {
            width: 172rpx;
            height: 62rpx;
            border-radius: 5rpx;
            border: 1rpx solid #f6054a;
            font-weight: 500;
            font-size: 28rpx;
            color: #ffffff;
            background-color: #f6054a;
            margin-left: 20rpx;
        }
    }
}
</style>
