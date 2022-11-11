<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-11-07 17:33:48
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-11-11 17:32:22
 * @FilePath: \card-world\src\pages\act\worldCup\draw.vue
 * @Description: draw
-->
<template>
    <view class="content">
        <view class="drawContainer">
            <view class="drawTop">
                <view class="left">今日奖池</view>
                <view class="right">每晚9:00公布</view>
            </view>
            <view class="draw_awards">
                <view class="awards" v-for="(item, index) in prizePoolList" :key="index"
                    :style="{ marginRight: (index + 1) % 3 == 0 ? `0rpx` : `14rpx` }">
                    <muqian-lazyLoad borderRadius="3rpx" class="awards_img"
                        :src="$parsePic(decodeURIComponent(item.pic))" />
                    <view class="awards_name u-line-1">{{ item.name }}</view>
                    <view class="awards_name u-line-1">{{ item.code }}</view>
                </view>
            </view>
            <view class="drawTop">
                <view class="left">我的奖券</view>
                <view class="right">待解锁:{{ dayLotteryNum }}</view>
            </view>
            <view class="couponContainer">
                <view class="coupon" :class="{ coupon_get: item.is_lucky }" v-for="(item, index) in myCodeList"
                    :key="index">
                    <view class="left flexCenter">{{ item.code }}</view>
                    <view class="right flexCenter">{{ isPubilsh ? (item.is_lucky ? '中奖' : '未中奖') : '未开奖' }}</view>
                </view>
            </view>
        </view>
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
    dayLotteryNum: number = 0
    mounted(query: any) {
        app.platform.hasLoginToken(() => {
            this.reqTodayPrizePool()
            this.reqMyCode()
        })
    }
    reqMyCode() {
        app.http.Get(`dataApi/worldCup/bean/lottery/day/my/code`, {}, (res: any) => {
            this.dayLotteryNum = res.dayLotteryNum
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
page {
    font-family: PingFang SC;
}

.drawContainer {
    width: 711rpx;
    margin-top: 18rpx;
    min-height: 1371rpx;
    background-size: 100% 100%;
    background-image: url('/static/act/worldCup/drawBack.png');
    border-radius: 3rpx;
    box-sizing: border-box;
    padding: 0 14rpx;
    position: relative;
}

.drawTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 28rpx 0rpx;

    .left {
        font-size: 40rpx;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #FFFFFF;
    }

    .right {
        font-size: 24rpx;
        color: #FFFFFF;
        letter-spacing: 2rpx;
    }
}

.draw_awards {
    display: flex;
    flex-wrap: wrap;

    .awards {
        width: 216rpx;
        margin-bottom: 30rpx;
    }

    .awards_img {
        width: inherit;
        height: 216rpx;
        margin-bottom: 24rpx;
    }

    .awards_name {
        font-size: 26rpx;
        color: #FFFFFF;
        height: 32rpx;
        line-height: 30rpx;
    }
}

.couponContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .coupon {
        width: 332rpx;
        height: 74rpx;
        background-size: 100% 100%;
        background-image: url("/static/act/worldCup/coupon.png");
        margin-bottom: 25rpx;
        display: flex;
        align-content: center;

        .left {
            width: 218rpx;
            height: inherit;
            font-size: 24rpx;
            color: #151515;
        }

        .right {
            flex: 1;
            height: inherit;
            font-size: 24rpx;
            color: #151515;
        }
    }

    .coupon_get {
        background-image: url("/static/act/worldCup/coupon_red.png");

        .right {
            color: #FFFFFF;
        }
    }
}
</style>
