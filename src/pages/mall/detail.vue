<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-12-16 16:08:27
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-12-16 16:34:52
 * @FilePath: \card-world\src\pages\mall\detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <button @click="onClickExchange">支付</button>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    ID: any = null
    rewardDetail: any = {}
    timer: any = null
    meBeanPoint: number = 0
    nowTimeStamp: any = Math.round(+new Date() / 1000)
    onLoad(query: any) {
        this.timer = setInterval(() => {
            this.getNewTime()
        }, 1000)
        app.platform.hasLoginToken(() => {
            this.ID = query.id
            this.reqNewData()
            this.reqMeCardBean()
        })
    }
    onUnload(): void {
        clearInterval(this.timer)
    }
    getNewTime() {
        this.nowTimeStamp = Math.round(+new Date() / 1000)
    }
    //点击立即兑换操作
    onClickExchange() {
        uni.navigateTo({
            url: `/pages/mall/pay?id=${this.ID}`
        })
        return
        if (this.meBeanPoint < this.rewardDetail.price) {
            uni.showToast({
                title: '很遗憾您的卡币不足暂时无法兑换~',
                icon: 'none'
            })
            app.platform.UINotificationFeedBack('error')
            return
        }
        //混合支付以及实物商品
        if (this.rewardDetail.pay_tp == 2 || this.rewardDetail.tp == 1) {
            uni.navigateTo({
                url: `/pages/mall/pay?id=${this.ID}`
            })
            return
        }
        //卡币支付
        if (this.rewardDetail.pay_tp == 1) {
            return
        }
    }

    //获取个人卡币
    reqMeCardBean(cb?: Function) {
        app.http.Get("dataApi/point/index", {}, (res: any) => {
            this.meBeanPoint = res.point || 0;
            cb && cb();
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
