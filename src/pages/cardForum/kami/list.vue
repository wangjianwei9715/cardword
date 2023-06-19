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

<style lang="scss"></style>
