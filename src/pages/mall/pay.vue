<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-12-16 16:19:36
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-12-20 10:24:17
 * @FilePath: \card-world\src\pages\mall\pay.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <button @click="isReadAgreement = true">阅读购买协议</button>
        <button>支付</button>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    rewardDetail: any = {}
    ID: any = null
    addressData: any = {}
    isReadAgreement: boolean = false
    orderCode: string = ""//订单编号
    onLoad(query: any) {
        this.ID = query.id
        if (query.code) {
            this.orderCode = query.code
        }
    }
    onClickPay() {
        if (!this.addressData.id) {
            uni.showToast({
                title: '请选择一个收货地址',
                icon: 'none'
            })
            app.platform.UINotificationFeedBack('error')
            return
        }
        if (!this.isReadAgreement) {
            uni.showToast({
                title: '请先阅读购买须知,并同意勾选',
                icon: 'none'
            })
            app.platform.UINotificationFeedBack('error')
            return
        }
        //进入创建订单流程
        uni.$u.throttle(this.creatOrder, 1000)
    }
    //创建订单
    creatOrder() {
        uni.showLoading({
            title: ""
        })
        app.http.Post(`point/good/toBuy/${this.ID}`, { deliveryId: this.addressData.id }, (res: any) => {
            this.orderCode = res.orderCode
            //订单创建成功跳转支付宝支付
            app.payment.paymentAlipay('alipay', res.alipay.orderInfo)
            setTimeout(() => {
                uni.redirectTo({
                    url: `/pages/mall/orderDetail?orderCode=${res.orderCode}`
                })
            }, 500)
        })
    }
    getDefaultAddress() {
        this.onEventUI("addressSelect", (data) => {
            this.addressData = data.data;
        });
        app.http.Get("me/delivery", {}, (res: any) => {
            if (res.list && res.list.length) {
                this.addressData = res.list.find((item: any) => item.default)
            }
        });

    }
    //获取商品详情
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/point/exchange/good/detail/${this.ID}`, {}, (res: any) => {
            this.rewardDetail = res.data
        })
    }

}
</script>

<style lang="scss">

</style>
