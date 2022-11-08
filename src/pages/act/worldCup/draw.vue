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
    isPubilsh: boolean = false
    prizePoolList: any = []
    myCodeList: any = []
    onLoad(query: any) {
        app.platform.hasLoginToken(() => {
            this.reqTodayPrizePool()
            this.reqMyCode()
        })
    }
    reqMyCode() {
        app.http.Get(`dataApi/worldCup/bean/lottery/day/code/list`, {}, (res: any) => {
            this.myCodeList = res.list || []
        })
    }
    reqTodayPrizePool(cb?: any) {
        app.http.Get(`dataApi/worldCup/bean/lottery/day/award`, {}, (res: any) => {
            this.isPubilsh = res.isPubilsh
            this.prizePoolList = res.list || []
        })
    }

}
</script>

<style lang="scss">

</style>
