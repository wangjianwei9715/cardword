<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-11-10 11:07:44
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-11-13 17:45:33
 * @FilePath: \card-world\src\pages\act\luckyBag\log.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="tagContainer">
            <view class="tag" @click="onClickTag(item, index)" :class="{ tag_select: tag.currentIndex === index }"
                v-for="(item, index) in tag.list">{{ item.label
                }}</view>
        </view>
        <template v-if="tag.currentIndex != 2">
            <view class="logItem" v-for="(item, index) in current.list" :key="'logItem' + index">
                <image src="/static/act/luckyBag/bag_open.png" class="pic"></image>
                <view class="rightWrap" style="flex:1">
                    <view class="nameWrap">
                        <view class="name">{{ item.name }}</view>
                        <view class="num">x{{ item.num }}</view>
                    </view>
                    <view class="timeWrap" @click="toOrder(item)">
                        <view class="time">{{ $u.timeFormat(item.created_at, 'mm.dd hh:MM') }}</view>
                        <template v-if="tag.currentIndex == 0">
                            <view class="order">订单：{{ item.orderCode }}</view>
                            <image class="dot" src="/static/act/luckyBag/grayDot.png"></image>
                        </template>
                    </view>
                </view>
            </view>
        </template>
        <template v-if="tag.currentIndex === 2">
            <view class="rewardItem" v-for="(item, index) in current.list" :key="'rewardItem' + index">
                <muqian-lazyLoad borderRadius="3rpx" :src="$parsePic(item.pic)" class="pic"></muqian-lazyLoad>
                <view class="rightWrap">
                    <view class="name u-line-1">{{ item.name }}</view>
                    <view class="time">获得时间：{{ $u.timeFormat(item.get_at, 'mm.dd hh:MM') }}</view>
                    <view class="state">{{ item.state == 5 ? `已发放至我的-优惠券` : (stateMap[item.state] || "未知状态") }}</view>
                    <view class="btn flexCenter" @click="onClickBtn(item)" v-if="item.state == 3 || item.state == 4">{{
                        item.state == 3 ? "联系客服" :
                        "查看物流" }}
                    </view>
                </view>
            </view>
        </template>
        <empty v-if="current.list&&current.list.length===0"></empty>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    stateMap: any = {
        3: "待发货",
        4: "已发货",
        5: "已发放"
    }
    tag: any = {
        currentIndex: 0,
        list: [
            {
                label: "获取记录",
                url: "activity/nt/luckyBag/user/record",
                list: [],
                queryParams: {
                    state: 1,
                    fetchFrom: 1,
                    fetchSize: 20,
                    isFetchEnd: true
                }
            },
            {
                label: "使用记录",
                url: "activity/nt/luckyBag/user/record",
                list: [],
                queryParams: {
                    state: 2,
                    fetchFrom: 1,
                    fetchSize: 20,
                    isFetchEnd: true
                }
            },
            {
                label: "奖品明细",
                url: "activity/nt/luckyBag/award/list",
                list: [],
                queryParams: {
                    fetchFrom: 1,
                    fetchSize: 20,
                    isFetchEnd: true
                }
            }
        ]
    }
    public get current() {
        return this.tag.list[this.tag.currentIndex]
    }
    onLoad(query: any) {
        this.reqNewData()
    }
    onReachBottom() {
        if (this.current.isFetchEnd) return
        this.current.queryParams.fetchFrom += this.current.queryParams.fetchSize
        this.reqNewData()
    }
    onPullDownRefresh() {
        this.current.queryParams.fetchFrom = 1
        this.reqNewData(() => {
            uni.stopPullDownRefresh()
        })
    }
    onClickTag(item: any, index: number) {
        if (this.tag.currentIndex === index) return
        this.tag.currentIndex = index
        if (!this.current.list.length) this.reqNewData()
    }
    onClickBtn(item: any) {
        if (item.state == 4) {
            uni.navigateTo({
                url: `/pages/userinfo/order_logistics?code=${item.wlCode || item.wlcode}`,
            });
            return
        }
        if (item.state == 3) {
            app.platform.heliService({ agentExten: '' })
            return
        }
    }
    toOrder(item:any){
        if(this.tag.currentIndex!=0) return
        app.navigateTo.goOrderDetails(item.orderCode)
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/${this.current.url}`, this.current.queryParams, (res: any) => {
            const list = res.list || []
            this.current.isFetchEnd = res.isFetchEnd
            this.current.queryParams.fetchFrom == 1 ? this.current.list = list : this.current.list.push(...list)
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #f6f7fb;
}

.tagContainer {
    width: 750rpx;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 80rpx;
    padding-bottom: 10rpx;

    .tag {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #959699;
    }

    .tag_select {
        color: #333333;
        font-weight: bold;
        font-size: 30rpx;
    }
}

.logItem {
    width: 722rpx;
    height: 160rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    box-sizing: border-box;
    padding: 24rpx;
    display: flex;
    margin-top: 20rpx;

    .rightWrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .pic {
        width: 140rpx;
        height: 113rpx;
        margin-right: 28rpx;
    }

    .nameWrap {
        display: flex;
        align-items: center;
        margin-bottom: 30rpx;

        .name {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            flex: 1;
        }

        .num {
            font-size: 30rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
        }
    }

    .timeWrap {
        display: flex;
        align-items: center;

        view {
            font-size: 22rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #88878C;
        }

        .time {
            flex: 1;
        }

        .order {}

        .dot {
            width: 10rpx;
            height: 16rpx;
            margin-left: 16rpx;
        }
    }
}

.rewardItem {
    width: 722rpx;
    height: 226rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    margin-top: 20rpx;
    box-sizing: border-box;
    padding: 28rpx 40rpx;
    display: flex;
    align-items: center;

    .pic {
        width: 170rpx;
        height: 170rpx;
        background: #3D110E;
        border-radius: 3rpx;
        margin-right: 52rpx;
    }

    .rightWrap {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        height: 170rpx;

        .name {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            margin-top: 16rpx;
            margin-top: 8rpx;
        }

        .time {
            font-size: 22rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #88878C;
            flex: 1;
        }

        .state {
            font-size: 22rpx;
            font-family: PingFang SC;
            font-weight: 400;
            margin-bottom: 17rpx;
            color: #333333;
        }

        .btn {
            width: 166rpx;
            height: 58rpx;
            background: #FA1545;
            border-radius: 3rpx;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            position: absolute;
            bottom: 0;
            right: 0;
        }
    }
}
</style>
