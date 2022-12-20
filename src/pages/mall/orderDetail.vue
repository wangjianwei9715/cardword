<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-12-19 14:15:54
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-12-20 10:11:23
 * @FilePath: \card-world\src\pages\mall\orderDetail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
const stateMap: any = {
    "0": "已发放",
    "1": "待发货",
    "2": "已发货",
    "3": "已确认收货",
    "-1": "等待支付完成"
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
    receiptAction() {
        app.http.Post(`point/exchange/order/receive/${this.orderCode}`, {}, (res: any) => {
            this.orderDetail.state = 3
        })
    }
    cancelOrder() {
        app.http.Post(`point/exchange/order/cancel/${this.orderCode}`, {}, (res: any) => {
            this.orderDetail.status = -2
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataAp/point/order/detail/${this.orderCode}`, {}, (res: any) => {
            this.orderDetail = res.data
        })
    }

}
</script>

<style lang="scss">

</style>
