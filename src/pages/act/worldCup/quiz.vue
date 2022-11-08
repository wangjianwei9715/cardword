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
    quizBeanConfList: any = []
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
    joinQuiz(ScheduleId?: any) {
        app.http.Post(`worldCup/bean/guessing/go/${ScheduleId}`, {}, (res: any) => {
            app.platform.UINotificationFeedBack('success')
            uni.showToast({
                title: '投注成功',
                icon: 'none'
            })
            this.reqNewData()
        })
    }
    reqQuizBeanConfig() {
        app.http.Get(`dataApi/admin/register`, {}, (res: any) => {
            this.quizBeanConfList = res.list || []
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi`, this.queryParams, (res: any) => {
            const list = res.list || []
            this.isFetchEnd = res.totalPage
            this.queryParams.fetchFrom == 1 ? this.list = list : this.list.push(...list)
            cb && cb()
        })
    }

}
</script>

<style lang="scss">

</style>
