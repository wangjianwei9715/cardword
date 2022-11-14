<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-11-07 17:32:10
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-11-14 10:28:33
 * @FilePath: \card-world\src\pages\act\worldCup\beanLog.vue
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
@Component({})
export default class ClassName extends BaseNode {
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 20,
    }
    list: any = []
    isFetchEnd: boolean = true
    onLoad(query: any) {
        this.reqNewData()
    }
    onReachBottom() {
        if (this.isFetchEnd) return
        this.queryParams.fetchFrom += this.queryParams.fetchSize
        this.reqNewData()
    }
    onPulldDownRefresh() {
        this.queryParams.fetchFrom = 1
        this.reqNewData(() => {
            uni.stopPullDownRefresh()
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/worldCup/bean/shop/exchange/record`, this.queryParams, (res: any) => {
            const list = res.list || []
            this.isFetchEnd = res.isFetchEnd
            this.queryParams.fetchFrom == 1 ? this.list = list : this.list.push(...list)
            cb && cb()
        })
    }

}
</script>

<style lang="scss">

</style>
