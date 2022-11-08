<template>
    <view class="content">
        <navigator url="/pages/act/worldCup/pointDetail" hover-class="none">
            <button>记录</button>
        </navigator>
        <navigator url="/pages/act/worldCup/award" hover-class="none">
            <button>奖励</button>
        </navigator>
        <navigator url="/pages/act/worldCup/description" hover-class="none">
            <button>规则</button>
        </navigator>

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
    myRank: any = {}
    totalPage: number = 0
    rewardList: any = []
    rankList: any = []
    actProgress: any = [
        { name: '获取积分', description: '获取积分', timeStamp: [1667059200, 1668441599], sIcon: 'sBuy' },
        { name: '积分解冻期', description: '积分解冻期', timeStamp: [1668441600, 1669305599], icon: 'lock', sIcon: 'sLock' },
        { name: '榜单结算', description: '榜单结算', timeStamp: 1669305600, icon: 'order', sIcon: 'sOrder' },
        { name: '幸运大抽奖', description: '幸运大抽奖', timeStamp: 1669359600, icon: 'gift', sIcon: 'sGift' }
    ]
    nowTimeStamp: any = Math.round(+new Date() / 1000)
    onLoad(query: any) {
        setInterval(() => {
            this.nowTimeStamp = Math.round(+new Date() / 1000)
        }, 1000)
    }
    onReachBottom() {
    }
    onPulldDownRefresh() {
    }
    checkImage(item: any, index: number) {
        if (!item.icon) return item.sIcon
        const ItemStamp = this.isNumber(item.timeStamp) ? item.timeStamp : item.timeStamp[0]
        const TIME_DIFF: any = this.nowTimeStamp - ItemStamp
        return TIME_DIFF >= 0 ? item.sIcon : item.icon
    }
    isNumber(data: any) {
        return typeof data === 'number'
    }
    reqRewardData() {
        app.http.Get('dataApi/selectRank/award/list', { activityTp: 3 }, (res: any) => {
            this.rewardList = res.list || []
        })
    }
    reqAllRank(cb?: any) {
        app.http.Get('dataApi/selectRank/list', { activityTp: 3 }, (res: any) => {
            this.rankList = res.list || []
            cb && cb()
        })
    }
    reqMyRank() {
        app.http.Get('dataApi/selectRank/my/data', { activityTp: 3 }, (res: any) => {
            this.myRank = res.data || {}
        })
    }

}
</script>

<style lang="scss">

</style>
