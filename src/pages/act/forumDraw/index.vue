<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-07-24 17:01:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-25 15:18:10
 * @FilePath: \jichao_app_2\src\pages\act\forumDraw\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <transitionNav title=" ">
            <template v-slot:slotRight>
                <view class="detailButton" @click="pageJump('/pages/act/forumDraw/log')">抽奖记录</view>
            </template>
        </transitionNav>
        <view class="topBanner">
            <view class="hide" :style="{ height: navHeight + 'px' }"></view>
        </view>
        <view class="luckContainer">
            <u-notice-bar :text="luckList" direction="row" :step="true"></u-notice-bar>
        </view>
        <view class="drawContainer">
            <view class="drawBlock" :class="[`drawBlock${index + 1}`, index == nowHeightLight ? `heightLight` : '']"
                v-for="(item, index) in drawList">
            </view>
            <!-- @click="startDraw(Math.round(Math.random() * 7))" -->
            <view class="centerBlock">
                <view class="drawButton" @click="onClickDraw(1)">抽奖一次</view>
                <view class="drawButton" @click="onClickDraw(5)">抽奖五次</view>
            </view>
        </view>
        <view class="taskContainer">
            <view class="taskTop">
                <view class="taskTitle">任务进度</view>
                <view class="taskRule" @click="pageJump('/pages/act/forumDraw/rule')">规则说明</view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
const ROUND_NUM = 6
const navHeight = app.statusBarHeight + uni.upx2px(88)
@Component({})
export default class ClassName extends BaseNode {
    drawList: any = [
        { label: "奖品1" },
        { label: "奖品2" },
        { label: "奖品3" },
        { label: "奖品4" },
        { label: "奖品5" },
        { label: "奖品6" },
        { label: "奖品7" },
        { label: "奖品8" }
    ]
    navHeight = navHeight
    luckList: Array<string> = ["恭喜短笛抽中改名卡", "恭喜短笛抽中无敌球衣", "恭喜ACE抽中空气", "恭喜肠炎宁抽中答辩", "恭喜我抽中500W", "恭喜XX抽中卡世界周末行"]
    drawNum: number = 0
    nowHeightLight: number = 0
    loopBol: boolean = true
    fastNum: number = 0
    slowNum: number = 0
    exSlowNum: number = 0
    time: number = 50
    onLoad(query: any) {
        this.initConf()
    }
    initConf() {
        this.loopBol = true
        this.fastNum = 0
        this.slowNum = 0
        this.exSlowNum = 0
        this.time = 50
    }
    onClickDraw(num: number) {
        if (num > this.drawNum) {
            uni.showModal({
                title: "提示",
                content: "次数不足，可补充图鉴或者发布动态收集点赞获得",
                cancelText: "我知道了",
                confirmText: "去卡圈",
                success: (res: any) => {
                    if (res.confirm) {
                        app.navigateTo.switchTab(2)
                    }
                }
            })
            return
        }
        uni.showModal({
            title: "确认抽奖",
            content: `本次抽奖将消耗${num}次抽奖次数`,
            cancelText: "我再想想",
            success: (res: any) => {
                if (res.confirm) this.postGetDrawResult(num)
            }
        })
    }
    //获取抽奖结果
    postGetDrawResult(num: number) {
        // app.http.Post(``)
        //mock------
        //---------
    }
    startDraw(endIndex: number) {
        this.initConf()
        this.loop(endIndex)
    }
    loop(endIndex: number) {
        if (!this.nowHeightLight || this.nowHeightLight < 8) {
            if (this.nowHeightLight == 7) {
                this.nowHeightLight = 0
            } else {
                this.nowHeightLight++
            }
            this.fastNum++
            if (this.fastNum == 4) {
                this.fastNum = 0
                this.time = 50
                this.slowNum++
            }
            if (this.slowNum == 12) {
                this.slowNum = 0
                this.time = 200
                this.fastNum = 5
            }
            if (this.fastNum > 5) {
                if (this.nowHeightLight == endIndex) {
                    this.initConf()
                    this.loopBol = false
                    console.log("抽奖结束");
                }
            }
            if (this.loopBol) {
                setTimeout(() => {
                    this.loop(endIndex)
                }, this.time);
            }
        }

    }
    pageJump(url: string) {
        uni.navigateTo({
            url
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi`, {}, (res: any) => {

        })
    }

}
</script>

<style lang="scss">
.luckContainer {
    width: 750rpx;
}

.drawContainer {
    display: grid;
    width: 750rpx;
    flex-wrap: wrap;
    grid-template-columns: repeat(3, 220rpx);
    grid-template-rows: repeat(3, 220rpx);
    grid-column-gap: 20rpx;
    grid-row-gap: 20rpx;
    justify-content: center;
    margin-top: 30rpx;
}

.drawBlock {
    width: 220rpx;
    height: 220rpx;
    // background-color: red;
    background-color: rgba(255, 0, 0, .4);
}

.heightLight {
    outline: 4rpx solid red;
}

.drawBlock1 {
    grid-area: 1 / 1 / 2 / 2;
}

.drawBlock2 {
    grid-area: 1 / 2 / 2 / 3;
}

.drawBlock3 {
    grid-area: 1 / 3 / 2 / 4;
}

.drawBlock4 {
    grid-area: 2 / 3 / 3 / 4;
}

.drawBlock5 {
    grid-area: 3 / 3 / 4 / 4;
}

.drawBlock6 {
    grid-area: 3 / 2 / 4 / 3;
}

.drawBlock7 {
    grid-area: 3 / 1 / 4 / 2;
}

.drawBlock8 {
    grid-area: 2 / 1 / 3 / 2;
}

.centerBlock {
    width: 220rpx;
    height: 220rpx;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: 2 / 2 / 3 / 3;
}

.detailButton {
    color: #000000;
}
</style>
