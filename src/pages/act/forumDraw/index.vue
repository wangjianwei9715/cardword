<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-07-24 17:01:39
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-07-25 15:45:30
 * @FilePath: \card-world\src\pages\act\forumDraw\index.vue
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
                <image :src="$parsePic(decodeURIComponent(item.pic))" style="width: 100%;height: 100%;" mode="aspectFill">
                </image>
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
        <!--  -->
        <u-overlay class="overlay" :duration="500" :opacity="0.8" :show="showSwiper" @click="showSwiper = false">
            <view class="preTitle">恭喜抽中以下奖品</view>
            <view class="preSwiper_container">
                <swiper class="preSwiper" :indicator-dots="false" :autoplay="false" :circular="false" :current="current"
                    @change="swiperChange">
                    <swiper-item class="preSwiper_item" v-for="(item, index) in resRewardList" :key="index">
                        <view class="img">
                            <image mode="widthFix" :src="item.pic" />
                            <view class="imageName">{{ item.label }}</view>
                        </view>
                    </swiper-item>

                </swiper>
                <view class="dotContainer">
                    <view class="dot" :class="{ dot_current: index === current }" v-for="(item, index) in resRewardList">
                    </view>
                </view>
                <view class="goBag flexCenter" @click.stop="pageJump('/pages/act/forumDraw/log'),showSwiper=false">去背包查看</view>
            </view>

        </u-overlay>
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
        { label: "科比签字", id: 1, pic: "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2023.06.09/check/card/0/1686298279488cl3wx7n3ac.png" },
        { label: "库里小书", id: 2, pic: "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2023.06.09/check/card/0/1686298291456eoiuvsmwb.png" },
        { label: "麦迪", id: 3, pic: "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2023.06.09/check/card/0/1686298308245ptjpli3nv9.png" },
        { label: "起源盒子*1", id: 4, pic: "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2023.06.09/check/card/0/1686298325664ntsr9mstaj.png" },
        { label: "杜蕾斯OP*1盒", id: 5, pic: "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2023.06.09/check/card/0/1686298372476z19tijyc22.png" },
        { label: "瓦格纳", id: 6, pic: "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2023.06.09/check/card/0/1686298411232qxq0w1d3l.png" },
        { label: "拉文", id: 7, pic: "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2023.06.09/check/card/0/16862984681521u352ix57.png" },
        { label: "PZ单包", id: 8, pic: "https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2023.06.09/check/card/0/1686298482893fohr96k02.png" }
    ]
    navHeight = navHeight
    luckList: Array<string> = ["恭喜短笛抽中改名卡", "恭喜短笛抽中无敌球衣", "恭喜ACE抽中空气", "恭喜肠炎宁抽中答辩", "恭喜我抽中500W", "恭喜XX抽中卡世界周末行"]
    drawNum: number = 10
    nowHeightLight: number = 0
    loopBol: boolean = true
    fastNum: number = 0
    slowNum: number = 0
    exSlowNum: number = 0
    time: number = 50
    resRewardIds: any = []
    resRewardList: any = []
    onDraw: boolean = false
    showSwiper: boolean = false
    current: number = 0
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
        if (this.onDraw) {
            uni.showToast({
                title: "请等待抽奖结束",
                icon: "none"
            })
            return
        }
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
    async postGetDrawResult(num: number) {
        this.resRewardIds = []
        this.onDraw = true
        // app.http.Post(``)
        //=============mock================
        for (let i = 0; i < num; i++) {
            const randomId = Math.round(Math.random() * 8)
            this.resRewardIds.push(randomId || 1)
        }
        //=============mock================
        for (let i = 0; i < this.resRewardIds.length; i++) {
            await this.startDraw(this.resRewardIds[i], (i === this.resRewardIds.length - 1) ? 0 : 1500)
            if (i == this.resRewardIds.length - 1) {
                this.onDraw = false
                this.showDrawRes()
            }
        }

    }
    startDraw(id: number, delay: number) {
        return new Promise((re: any, rj) => {
            this.initConf()
            const index = this.drawList.findIndex((item: any) => {
                return item.id === id
            })
            if (index < 0) {
                uni.showToast({
                    title: `未知奖励:${id}`,
                    icon: "none"
                })
            }
            this.loop(index, () => {
                setTimeout(() => {
                    re()
                }, delay)
            })
        })
    }
    loop(endIndex: number, cb?: Function) {
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
                    cb && cb(endIndex)
                }
            }
            if (this.loopBol) {
                setTimeout(() => {
                    this.loop(endIndex, cb)
                }, this.time);
            }
        }

    }
    //展示抽奖的结果
    showDrawRes() {
        console.log("展示抽奖的结果");
        this.resRewardList = this.resRewardIds.map((id: any) => {
            const findItem: any = this.drawList.find((draw: any) => {
                return draw.id === id
            })
            return findItem
        })
        console.log(this.resRewardList);
        this.showSwiper = true
    }
    pageJump(url: string) {
        uni.navigateTo({
            url
        })
    }
    swiperChange(event: any) {
        this.current = event.detail.current
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

.overlay {
    pointer-events: auto;
}

.preTitle {
    font-weight: bold;
    font-size: 52rpx;
    text-align: center;
    color: #fff;
    margin-top: 200rpx;
    margin-bottom: 30rpx;
}

.preSwiper_container {
    width: 750rpx;
    height: 100%;
    position: relative;
}

.preSwiper {
    width: 750rpx;
    height: 830rpx;
    // background-color: red;
    position: relative;
}

.preSwiper_item {
    width: inherit;
    height: inherit;
    position: inherit;
}

.dotContainer {
    width: 750rpx;
    // height: 100rpx;
    // background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40rpx;

    .dot {
        width: 16rpx;
        height: 16rpx;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 14rpx;
    }

    .dot_current {
        background-color: #fa1545;
    }
}

.goBag {
    margin: 60rpx auto;
    background-color: #fa1545;
    font-weight: bold;
    color: #fff;
    font-size: 30rpx;
    // width: ;
    border-radius: 5rpx;
    width: 400rpx;
    height: 70rpx;
    // padding: 20rpx;
}

.img {
    position: absolute;
    left: 50%;
    top: 0%;
    -webkit-transform: translate(-50%, 0);
    transform: translate(-50%, 0);
    width: inherit;

    image {
        width: 100%;
        max-height: 100%;
        max-width: 100%;
        overflow-clip-margin: content-box;
        overflow: clip;
    }

    .imageName {
        text-align: center;
        font-size: 40rpx;
        font-weight: 600;
        font-family: PingFang SC;
        color: #fff;
        margin-top: 6rpx;
    }
}
</style>
