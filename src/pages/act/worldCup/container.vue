<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-11-11 13:44:04
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-11-14 13:42:36
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
                <image class="back" :class="{ filterBlack: scrollTopHidden }" src="/static/act/rankSelect/back.png"
                    @click="app.platform.pageBack()" />
                <view class="menuContainer" :style="{ opacity: scrollTopOpacity }"
                    :class="{ pointer_none: scrollTopHidden }" @click="onClickGetBean">
                    <image class="beanIcon" src="/static/act/worldCup/smallBeanCube.png" />
                    <view class="beanPoint">{{ myData.worldBean == undefined ? '获取中' : myData.worldBean }}</view>
                    <u-icon size="37rpx" name="plus-circle-fill" color="#fff"></u-icon>
                </view>
                <view style="flex:1"></view>
                <navigator url="/pages/act/worldCup/pointDetail" hover-class="none">
                    <view class="menuContainer" :style="{ opacity: scrollTopOpacity }"
                        :class="{ pointer_none: scrollTopHidden }">
                        <u-icon size="37rpx" name="file-text-fill" color="#fff"></u-icon>
                        <view class="label">明细</view>
                    </view>
                </navigator>
                <navigator url="/pages/act/worldCup/description" hover-class="none">
                    <view class="menuContainer" :style="{ opacity: scrollTopOpacity }"
                        :class="{ pointer_none: scrollTopHidden }">
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
            <component :is="tabBar[tabIndex].ref" :ref="tabBar[tabIndex].ref" :bean="myData.worldBean || 0"
                @getNewBean="reqWorldBean"></component>
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
        <u-popup :show="taskShow" :round="20" @close="taskShow = false" mode="bottom" :safeAreaInsetBottom="false">
            <view class="popContainer">
                <image class="containerTitle" src="/static/act/worldCup/beanGetTitle.png"></image>
                <view class="safeTop"></view>
                <view class="signContainer">
                    <view class="leftCorner flexCenter">我的成绩<image src="/static/act/worldCup/smallQuestion.png"></image>
                    </view>
                    <view class="signTop">
                        累计签到{{ signInNum }}天，共获得{{ myGetWorldBean }}
                        <image src="/static/act/worldCup/smallBeanCube.png" />
                    </view>
                    <view class="signDayContainer" :class="{ bt: signList.length == 7 }">
                        <view class="signItem" v-for="(item, index) in signList" :key="index"
                            :style="{ marginRight: ((index + 1) % 7 == 0) ? `0rpx` : `10rpx` }">
                            <view class="point">+{{ item.worldBean }}</view>
                            <view class="day">周一</view>
                        </view>
                    </view>
                </view>
                <view class="taskContainer">
                    <view class="taskItem" v-for="(item, index) in taskList" :key="index"
                        :class="{ borderBottom: index == (taskList.length - 1) }">
                        <view class="task_left">
                            <view class="title">{{ item.name }}{{ item.plan ? `(${item.plan})` : "" }}</view>
                            <view class="beanPoint">
                                +{{ item.beanNum }}
                                <image src="/static/act/worldCup/smallBeanCube.png" />
                            </view>
                        </view>
                        <view class="taskButton flexCenter" :class="{ taskButton_dis: item.isSuccess }"
                            @click="onClickTask(item)">
                            {{ item.isSuccess ? '已完成' : '去完成' }}</view>
                    </view>
                </view>
            </view>
            <view class="bottomSafeArea"></view>
        </u-popup>
        <!-- <bottomDrawer :showDrawer.sync="taskShow">

        </bottomDrawer> -->
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
    tabIndex: number = 0
    scrollTop: number = 0
    MAX_HEIGHT: number = 0
    app: any = app
    myData: any = {
        worldBean: 0
    }
    taskList: any = []
    taskShow: boolean = false
    signList: any = []
    signInNum: number = 0
    myGetWorldBean: number = 0
    public get scrollTopPercent() {
        return this.scrollTop / (this.MAX_HEIGHT * 2)
    }
    public get scrollTopHidden() {
        return (this.scrollTop / (this.MAX_HEIGHT * 2)) > 0.6
    }
    public get scrollTopOpacity() {
        return 1 - (this.scrollTop / (this.MAX_HEIGHT * 2))
    }
    onLoad() {
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
    onShow() {
        app.platform.hasLoginToken(() => {
            this.reqWorldBean()
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
    onClickTask(item: any) {
        if (item.isSuccess) return
        if (item.path == `/pages/act/worldCup/container`) {
            this.taskShow = false
            this.tabChange({}, 1)
            return
        }
        uni.navigateTo({
            url: item.path
        })
    }
    tabChange(item: any, index: number) {
        if (index == this.tabIndex) return
        this.tabIndex = index
    }
    async onClickGetBean() {
        const promiseAllData: any = await Promise.all([this.reqDayTask(), this.reqSignList()])
        const taskData = promiseAllData[0]
        const signData = promiseAllData[1]
        this.signList = signData.data.daySignIn || []
        this.signInNum = signData.data.SignInNum || 0
        this.myGetWorldBean = signData.myGetWorldBean || 0
        this.taskList = taskData.list || []
        this.taskShow = true
    }
    reqDayTask() {
        return new Promise((resolve, reject) => {
            app.http.Get(`dataApi/worldCup/bean/day/task`, {}, (res: any) => {
                resolve(res)
            })
        })
    }
    reqSignList() {
        return new Promise((resolve, reject) => {
            app.http.Get(`dataApi/worldCup/bean/daySignIn/data`, {}, (res: any) => {
                resolve(res)
            })
        })
    }
    reqWorldBean(cb?: any) {
        app.http.Get(`dataApi/worldCup/bean/me/data`, {}, (res: any) => {
            this.myData.worldBean = res.data.worldBean || 0
        })
    }

}
</script>

<style lang="scss">
page {
    font-family: PingFang SC;
    background-color: rgba(37, 76, 30, 1);
}

.pointer_none {
    pointer-events: none;
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

.popContainer {
    width: 750rpx;
    min-height: 986rpx;
    background: linear-gradient(90deg, #238E1A, #37C32C, #238E1A);
    border-radius: 20rpx 20rpx 0rpx 0rpx;
    box-sizing: border-box;
    padding: 0 20rpx;

    .containerTitle {
        width: 470rpx;
        height: 199rpx;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        margin: auto;
        pointer-events: none;
    }
}

.safeTop {
    height: 84rpx;
    pointer-events: none;
}

.signContainer {
    width: 708rpx;
    height: 180rpx;
    background: #FFFFFF;
    border-radius: 10rpx;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    padding: 0 22rpx;

    .leftCorner {
        width: 137rpx;
        height: 38rpx;
        background: linear-gradient(90deg, #C1976F, #FEF1C7, #CCA27C);
        border-radius: 10rpx 0rpx 5rpx 0rpx;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #0C2853;

        image {
            width: 26rpx;
            height: 26rpx;
            margin-left: 4rpx;
        }
    }

    .signTop {
        height: 56rpx;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 22rpx;
        font-weight: 400;
        color: #222121;

        image {
            width: 21rpx;
            height: 23rpx;
            margin-left: 2rpx;
        }
    }

    .signDayContainer {
        display: flex;
        flex-wrap: nowrap;

        .signItem {
            // margin-right: 10rpx;
            width: 86rpx;
            height: 102rpx;
            background: linear-gradient(90deg, #FFF1B4, #FFF4B9);
            border-radius: 10rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            font-weight: 400;
            color: #F7A000;

            .point {
                font-size: 26rpx;
            }

            .day {
                font-size: 20rpx;
                margin-top: 6rpx;
            }
        }

        // justify-content: space-between;
    }

    .bt {
        justify-content: space-between;
    }
}

.taskContainer {
    width: 708rpx;
    // height: 692rpx;
    background: #FFFFFF;
    border-radius: 10rpx;
    margin-top: 17rpx;
    box-sizing: border-box;
    padding: 0 23rpx 0 28rpx;

    .taskItem {
        height: 136rpx;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .borderBottom {
        border-bottom: 1rpx solid #9CE196;
    }

    .task_left {
        .title {
            font-size: 26rpx;
            font-weight: 400;
            color: #222121;
        }

        .beanPoint {
            font-size: 26rpx;
            font-weight: 400;
            color: #2EAC24;
            margin-top: 8rpx;

            image {
                width: 21rpx;
                height: 23rpx;
                margin-left: 3rpx;
            }
        }
    }

    .taskButton {
        width: 160rpx;
        height: 56rpx;
        background: linear-gradient(0deg, #FFD117, #FFEC19);
        border-radius: 28rpx;
        font-size: 26rpx;
        font-weight: 400;
        color: #212121
    }

    .taskButton_dis {
        background: linear-gradient(0deg, #DFE3F0, #C8CBE2);
    }
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
