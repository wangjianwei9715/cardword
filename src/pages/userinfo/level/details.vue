<template>
    <view style="padding-bottom: calc(20rpx + env(safe-area-inset-bottom))">
        <view class="point" v-for="(item, index) in list" :key="index">
            <view class="point-left">
                <view class="name">{{ item.content }}</view>
                <view class="time">{{ dateFormatMSHMS(item.created_at) }}</view>
            </view>
            <view class="point-num" :style="{color:item.exp<0?'#7AC04F':'#EF3333'}">{{item.exp>0?`+${item.exp}`:item.exp}}</view>
        </view>
        <empty v-if='!list.length' />
    </view>
</template>
<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '../../../base/BaseNode.vue';
import { dateFormatMSHMS } from "@/tools/util";
@Component({})
export default class ClassName extends BaseNode {
    dateFormatMSHMS: any = dateFormatMSHMS
    // tagMenu: any = {
    //     index: 0,
    //     list: [{
    //         name: '全部',
    //         value: 100
    //     }, {
    //         name: '收入',
    //         value: 1
    //     }, {
    //         name: '支出',
    //         value: 2
    //     }]
    // };
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 15,
    };
    isFetchEnd: boolean = true
    totalPage: number = 0;
    list: any = []
    pointList: any = [];
    onLoad(query: any) {
        this.reqNewData()
    }
    onReachBottom() {
        if (this.isFetchEnd) return
        this.queryParams.fetchFrom += this.queryParams.fetchSize
        this.reqNewData()
    }
    onPullDownRefresh() {
        this.queryParams.fetchFrom = 1
        this.reqNewData(() => {
            uni.stopPullDownRefresh()
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/cardCircle/exp/record`, this.queryParams, (res: any) => {
            const list = res.list || []
            this.isFetchEnd = res.isFetchEnd
            this.queryParams.fetchFrom == 1 ? this.list = list : this.list.push(...list)
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
page {
    font-family: PingFang SC;
    background-color: #f6f7fb;
}

.menu {
    width: 750rpx;
    // margin-bottom: 50rpx;
    background-color: #fff;
}

.menu-item {
    width: 33.33%;
    text-align: center;
    line-height: 96rpx;
    font-size: 29rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
}

.selectItem {
    font-weight: 600;
    font-size: 31rpx;
    color: #E23737;
}

.point {
    width: 617rpx;
    height: 140rpx;

    margin: 14rpx auto;
    border-radius: 5rpx;
    padding: 0 56rpx 0 49rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;

    &-left {
        .name {
            font-size: 29rpx;

            font-weight: 600;
            color: #333333;
        }

        .time {
            margin-top: 8rpx;
            font-size: 25rpx;
            font-weight: 400;
            color: #88878C;
        }
    }

    &-num {
        font-size: 42rpx;
        font-weight: 600;
        color: #7AC04F;
    }
}
</style>