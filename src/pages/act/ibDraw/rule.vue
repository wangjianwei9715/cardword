<template>
    <view class="content">
        <navigationbar title="规则说明" rightText="榜单奖励" rightFont="12" @onClickRightText="onClickAward" />
        <view class="descriptionContainer">

            <view class="des_title">
                活动时间：
            </view>
            <view class="des_content">
                {{ $u.timeFormat(startTime, 'yyyy-mm-dd hh:MM:ss') }}~{{ $u.timeFormat(endTime, 'yyyy-mm-dd hh:MM:ss') }}
            </view>
            <br />
            <view class="des_title">
                幸运抽奖:
            </view>
            <view class="des_content">
                参与卡圈图鉴补充可获得卡币的同时可参与幸运抽奖，奖池内容不定期更新，请卡迷们留意（活动结束后抽奖次数清零，请卡迷们留意抽奖次数避免造成不必要的损失）
                <br />
            </view>
            <br />
            <view class="des_title">
                抽奖说明:
            </view>
            <view class="des_content">
                用户在补充指定系列图鉴并完成任务即可获取抽奖次数
                <br />
            </view>
            <br />
            <view class="des_title">
                图鉴榜单:
            </view>
            <view class="des_content">
                用户可通过补充指定图鉴获取卡币，通过补充指定图鉴获得的卡币来计算排名，活动截至后对应排名的用户可获得对应的排名奖励
                <br />
            </view>
            <br />
            <view class="des_title">
                发货说明:
            </view>
            <view class="des_content">
                虚拟类奖品将自动发放,实物商品平台将在1-30天内发货，收货地址为用户的默认收货地址，未填写地址的用户在中奖后联系客服安排发货。
                <br />
            </view>
            <br />
            <view class="des_title">
                参与系列：
            </view>
            <view class="des_content">
                <text style="color:red" v-for="(item, index) in bindList" :key="index">{{ item.year + " " + item.name }}；</text>
            </view>
            
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '../../../base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    bindList: any = []
    startTime: any = 0
    endTime: any = 0
    actId: number = 0
    onLoad(query: any) {
        this.actId = +query.activityId
        app.http.Get("dataApi/activity/ibDraw/bindList", { activityId: +query.activityId }, (res: any) => {
            this.bindList = res.list
            this.startTime = res.time[0] || 0
            this.endTime = res.time[1] || 0
        })
    }
    onReachBottom() {

    }
    onPulldDownRefresh() {

    }
    onClickAward() {
        uni.navigateTo({
            url: "/pages/act/ibDraw/rankAward?activityId=" + this.actId
        })
    }
}
</script>

<style lang="scss">
page {
    background: $content-bg;
    width: 750rpx;
    overflow-x: hidden;
}

.descriptionContainer {
    width: 710rpx;
    box-sizing: border-box;
    padding: 38rpx 30rpx 34rpx 30rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    margin-top: 20rpx;

    .des_title {
        font-size: 30rpx;
        
        font-weight: bold;
        color: #333333;
        margin-bottom: 10rpx;
    }

    .des_content {
        font-size: 23rpx;
        
        
        color: #333333;
        line-height: 36rpx;
        letter-spacing: 2rpx;

        view {
            font-size: inherit;
        }


    }

    .sTitle {
        color: #333333;
        font-weight: bold;
        
        font-size: 23rpx;
        letter-spacing: 2rpx;
        margin-top: 20rpx;
    }

    .des_gray {
        font-size: 19rpx;
        
        
        color: #949494;
        margin-top: 25rpx;
    }

    .red {
        color: #FA1545;
    }
}
</style>
