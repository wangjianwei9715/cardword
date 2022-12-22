<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-12-19 14:15:54
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-12-22 11:44:47
 * @FilePath: \card-world\src\pages\mall\orderDetail.vue
 * @Description: 订单详情
-->
<template>
    <view class="content" v-if="orderDetail.code">
        <template>
                   <view class="topState">{{ orderDetail.status == 2 ?
                    stateMap[String(orderDetail.state)].tip
                    : statusMap[String(orderDetail.status)]
            }}</view>
            <view class="topTips"></view>
        </template>
        <view>订单将于{{ $u.timeFormat(orderDetail.payExpire_at, 'yyyy年mm月dd日 hh:MM:ss') }}关闭</view>
        <view class="goodsContainer uni-flex">
            <image style="width: 200rpx;height:200rpx" :src="$parsePic(decodeURIComponent(orderDetail.logo))"
                mode="aspectFill"></image>
            <view class="goodsInfo">
                <view class="goodsInfo_name">{{ orderDetail.name }}</view>
                <view class="goodsInfo_state" v-if="orderDetail.status == 2">物品状态:{{ orderDetail.status == 2 ?
                        stateMap[String(orderDetail.state)].userTip : ""
                }}
                </view>
                <view class="goodsInfo_price">{{ orderDetail.point }}卡币</view>
            </view>
        </view>
        <button v-if="orderDetail.status == 1" @click="cancelOrderHandle">取消支付</button>
        <button v-if="orderDetail.status == 1" @click="">立即支付</button>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
const stateMap: any = {
    "0": {
        tip: "已发放",
        introduction: '',
        userTip: '待收货'
    },
    "1": {
        tip: "等待平台发货",
        introduction: '平台将陆续发货，请耐心等待请留意物流信息',
        userTip: '待收货'
    },
    "2": {
        tip: "平台已发货",
        introduction: '平台已发货，请留意物流信息',
        userTip: '待收货'
    },
    "3": {
        tip: "用户确认收货",
        userTip: '确认收货'
    },
    "-1": {
        tip: "等待支付完成"
    }
}
const statusMap: any = {
    "0": "订单创建",
    "1": "等待支付",
    "2": "支付完成",
    "-1": "支付超时",
    "-2": "支付已取消"
}
@Component({})
export default class ClassName extends BaseNode {
    orderCode: string = ""
    orderDetail: any = {}
    statusMap: any = statusMap
    stateMap: any = stateMap
    onLoad(query: any) {
        this.orderCode = query.orderCode
        this.reqNewData()
    }
    cancelOrderHandle() {
        uni.showModal({
            title: '提示',
            content: '确认取消订单?',
            success: (res: any) => {
                if (res.confirm) this.cancelOrder()
            }
        })
    }
    confirmReceipt() {
        uni.showModal({
            title: "提示",
            content: "确认收到货了吗?",
            success: (res: any) => {
                if (res.confirm) this.receiptAction()
            }
        })
    }
    onClickPay() {
        app.http.Post(`point/order/toBuy/${this.orderCode}`, {})
    }
    receiptAction() {
        app.http.Post(`point/exchange/order/receive/${this.orderCode}`, {}, (res: any) => {
            this.orderDetail.state = 3
        })
    }
    cancelOrder() {
        app.http.Post(`point/exchange/order/cancel/${this.orderCode}`, {}, (res: any) => {
            this.orderDetail.status = -2
            this.reqNewData()
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/point/order/detail/${this.orderCode}`, {}, (res: any) => {
            this.orderDetail = res.data
        })
    }

}
</script>

<style lang="scss">

</style>
