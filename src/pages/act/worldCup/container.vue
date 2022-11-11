<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-11-11 13:44:04
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-11-11 18:05:44
 * @FilePath: \card-world\src\pages\act\worldCup\container.vue
 * @Description: 
-->
<template>
    <view class="content">
        <image class="bg-img" src="/static/act/worldCup/back.png"></image>
        <view class="pageTopContainer">
            <view class="status"
                :style="{ paddingTop: app.statusBarHeight + 'px', backgroundColor: `rgba(255,255,255,${scrollTopPercent})` }">
            </view>

            <view class="pageTop" ref="pageTop" id="pageTop"
                :style="{ backgroundColor: `rgba(255,255,255,${scrollTopPercent})` }">
                <image class="back" :class="{ filterBlack: scrollTopPercent > 0.6 }"
                    src="/static/act/rankSelect/back.png" @click="app.platform.pageBack()" />
                <view class="menuContainer" :style="{ opacity: 1 - scrollTopPercent }">
                    <image class="beanIcon" src="/static/act/worldCup/smallBeanCube.png" />
                    <view class="beanPoint">{{ myData.worldBean == undefined ? '获取中' : myData.worldBean }}</view>
                    <u-icon size="37rpx" name="plus-circle-fill" color="#fff"></u-icon>
                </view>
                <view style="flex:1"></view>
                <navigator url="/pages/act/worldCup/pointDetail" hover-class="none">
                    <view class="menuContainer" :style="{ opacity: 1 - scrollTopPercent }">
                        <u-icon size="37rpx" name="file-text-fill" color="#fff"></u-icon>
                        <view class="label">明细</view>
                    </view>
                </navigator>
                <navigator url="/pages/act/worldCup/description" hover-class="none">
                    <view class="menuContainer" :style="{ opacity: 1 - scrollTopPercent }">
                        <u-icon size="37rpx" name="question-circle-fill" color="#fff"></u-icon>
                        <view class="label">规则</view>
                    </view>
                </navigator>

                <view class="pageTitle" :style="{ opacity: scrollTopPercent }">{{ tabBar[tabIndex].label }}</view>
            </view>
        </view>
        <view class="topBanner" :style="{ backgroundImage: `url('${tabBar[tabIndex].topBanner}')` }">
            <view class="topTips">{{ tabBar[tabIndex].tips }}</view>
        </view>
        <view class="componentsContainer">
            <component :is="tabBar[tabIndex].ref" :ref="tabBar[tabIndex].ref"></component>
            <!-- <rank ref="rank" v-show="tabIndex == 0" />
            <beanMall v-show="tabIndex == 3" /> -->
        </view>
        <view class="tabBarContainer">
            <view class="tabBar">
                <view class="tabBar_item" :class="{ tabBar_item_select: tabIndex == index }"
                    v-for="(item, index) in tabBar" :key="index" @click="tabChange(item, index)">
                    <text>
                        {{ item.label }}
                    </text>
                </view>
            </view>
            <view class="bottomSafeArea">
            </view>
        </view>

    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import rank from './rank.vue'
import beanMall from './beanMall.vue'
import quiz from './quiz.vue'
import draw from './draw.vue'
@Component({
    name: 'worldCupContainer',
    components: {
        rank,
        beanMall,
        quiz,
        draw
    }
})

export default class ClassName extends BaseNode {
    tabBar: any = [
        {
            label: `荣耀\n榜单`,
            topBanner: '/static/act/worldCup/topBanner.png',
            tips: '拼团足球系列·赢积分夺大奖',
            ref: 'rank'
        },
        {
            label: `激情\n预测`,
            topBanner: '/static/act/worldCup/topGuess.png',
            tips: '全民神预测·赢取海量世界豆',
            ref: 'quiz',
        },
        {
            label: `欢乐\n抽奖`,
            topBanner: '/static/act/worldCup/topDraw.png',
            tips: '不定期上新·欢乐抽奖惊喜不停',
            ref: 'draw',
        },
        {
            label: `惊喜\n商店`,
            topBanner: '/static/act/worldCup/topMall.png',
            tips: '惊喜不断·福利商品超值兑换',
            ref: 'beanMall'
        }
    ]
    tabIndex: number = 1
    scrollTop: number = 0
    MAX_HEIGHT: number = 0
    app: any = app
    myData: any = {}
    taskList: any = []
    private get scrollTopPercent() {
        return this.scrollTop / (this.MAX_HEIGHT * 2)
    }
    onLoad() {
        app.platform.hasLoginToken(() => {
            this.reqNewData()
        })
        this.$nextTick(() => {
            const query: any = uni.createSelectorQuery().in(this)
            query
                .select('#pageTop')
                .boundingClientRect((data: any) => {
                    this.MAX_HEIGHT = data.height
                })
                .exec();

        })
    }
    onPageScroll(data: any) {
        this.scrollTop = data.scrollTop
    }
    onPulldDownRefresh() {
        const refKey: string = this.tabBar[this.tabIndex].ref
        //@ts-ignore
        this.$refs[refKey] && this.$refs[refKey].onPulldDownRefreshCom && this.$refs[refKey].onPulldDownRefreshCom()
    }
    onReachBottom() {
        const refKey: string = this.tabBar[this.tabIndex].ref
        //@ts-ignore
        this.$refs[refKey] && this.$refs[refKey].onReachBottomCom && this.$refs[refKey].onReachBottomCom()
    }
    tabChange(item: any, index: number) {
        if (index == this.tabIndex) return
        this.tabIndex = index
    }
    reqDayTask() {
        app.http.Get(`dataApi/worldCup/bean/day/task`, {}, (res: any) => {
            this.taskList = res.list
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/worldCup/bean/me/data`, {}, (res: any) => {
            this.myData = res.data

        })
    }

}
</script>

<style lang="scss">
page {
    font-family: PingFang SC;
    background-color: rgba(37, 76, 30, 1);
}

.pageTopContainer {
    position: fixed;
    top: 0;
    z-index: 200;

    .pageTop {
        background-color: rgba(255, 255, 255, 0);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 0 36rpx;
        // justify-content: space-between;
        width: 750rpx;
        height: 88rpx;
        /* transition: all 0.2s linear; */
    }

    .menuContainer {
        padding: 0 12rpx;
        display: flex;
        align-items: center;
        height: 53rpx;
        background: rgba(9, 28, 58, .74);
        border-radius: 27rpx;
        margin-left: 33rpx;

        .label {
            font-size: 27rpx;
            color: #FFFFFF;
            margin-left: 10rpx;
            margin-right: 18rpx;
        }

    }

    .beanIcon {
        width: 27rpx;
        height: 29rpx;
    }

    .beanPoint {
        font-size: 28rpx;
        font-weight: bold;
        color: #FFFFFF;
        margin-left: 6rpx;
        flex: 1;
        margin-right: 9rpx;
    }

    .btn-back {

        background: rgba(0, 0, 0, 0);
        font-family: uniicons;
        font-size: 46rpx;
        font-weight: normal;
        font-style: normal;
        color: #3C3C3C;
    }

    .pageTitle {
        font-size: 32rpx;
        color: #3C3C3C;
        position: absolute;
        font-family: HYQiHei;
        font-weight: bold;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
        pointer-events: none;
    }

    .back {
        width: 19rpx;
        height: 35rpx;
    }

    .filterBlack {
        -webkit-filter: invert(1) hue-rotate(270deg);
        filter: invert(1) hue-rotate(270deg);
    }
}

.bg-img {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    // z-index: -1;
}

.topBanner {
    background-size: 100% 100%;
    width: 750rpx;
    height: 869rpx;
    position: relative;
    pointer-events: none;

    // z-index: 3;
    .topTips {
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #19396E;
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        bottom: 300rpx;
        letter-spacing: 2rpx;
    }

    // background-image: url('/static/act/worldCup/topBanner.png');
}

.componentsContainer {
    width: 750rpx;
    overflow-x: hidden;
    min-height: 1560rpx;
    background-size: 100% 100%;
    // background-image: url('/static/act/worldCup/back.png');
    position: relative;
    bottom: 210rpx;
    // z-index: 1;
}

.tabBarContainer {
    width: 750rpx;
    position: fixed;
    bottom: 0;
    background: #10590A;
    z-index: 10;
}

.tabBar {
    width: 100%;
    height: 163rpx;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.tabBar_item {
    width: 110rpx;
    height: 98rpx;
    background-size: 100% 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    text {
        line-height: 32rpx;
        font-size: 38rpx;
        font-weight: 400;
        font-family: YouSheBiaoTiHei;
        color: #FFFFFF;
        position: relative;
        bottom: 2rpx;
        right: 4rpx;
    }
}

.tabBar_item_select {
    background-image: url("/static/act/worldCup/tabBarImg.png");

    text {
        background: linear-gradient(106deg, #E10019 0%, #0077FF 71.044921875%, #043D7E 98.6328125%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}
</style>
