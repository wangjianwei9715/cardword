<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-11-11 13:44:04
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-05-15 16:37:41
 * @FilePath: \card-world\src\pages\act\worldCup\container.vue
 * @Description: 
-->
<template>
    <view class="content">
        <transitionNav ref='transitionNav' :needIconShadow="false" :title="tabBar[tabIndex].label.replace('\n', '')">
            <template slot="slotRight">
                <!-- <navigator url="/pages/act/imm/rule" hover-class="none" class="sp-tips-index sp-tips-index2">
                    
                </navigator> -->
                <view class="rightTitle" style="color:#fff" @click="onClickRule">规则说明</view>
            </template>
        </transitionNav>
        <view class="topBanner">
            <view class="textBanner" v-show="tabIndex == 0"></view>
            <view class="textBanner textBanner1" v-show="tabIndex == 1"></view>
            <view class="topBanner_menu">
                <view class="menuItem flexCenter" :class="{ menuItem_select: index == tabIndex }"
                    @click="tabChange(item, index)" v-for="(item, index) in tabBar">
                    {{ item.label }}</view>
            </view>
        </view>
        <view class="componentsContainer">
            <rank v-show="tabIndex==0" :seriesId="seriesId" :roomId="roomId" ref="rank"/>
            <exhibition v-show="tabIndex==1" :seriesId="seriesId" :roomId="roomId" ref="exhibition"/>
            <!-- <component :is="tabBar[tabIndex].ref" :ref="tabBar[tabIndex].ref" :seriesId="seriesId" :roomId="roomId">
            </component> -->
            <view class="bottomSafeArea"></view>
        </view>
        <view class="safe" style="height:140rpx"></view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import rank from './rank/index.vue'
import exhibition from "./exhibition/index.vue"
@Component({
    name: 'worldCupContainer',
    components: {
        rank,
        exhibition
    }
})

export default class ClassName extends BaseNode {
    seriesId: number = 0
    roomId: number = 0
    tabBar: any = [
        {
            label: `榜单活动`,
            topBanner: '',
            ref: 'rank'
        },
        {
            // 卡世界×魔球社联合企划线上卡展
            label: `线上卡展`,
            topBanner: '',
            ref: 'exhibition',
        }
    ]
    tabIndex: number = 0
    app: any = app
    timeStamp: number = Math.round(+new Date() / 1000)
    stampTimer: any = null
    onLoad(query: any) {
        this.stampTimer && clearInterval(this.stampTimer)
        this.stampTimer = setInterval(() => {
            this.timeStamp = Math.round(+new Date() / 1000)
            this.checkTime()
        }, 1000)
        if (query.seriesId) this.seriesId = +query.seriesId
        if (query.roomId) this.roomId = +query.roomId
    }
    onUnload(): void {
        this.stampTimer && clearInterval(this.stampTimer)
    }
    onShow() {
    }
    onPageScroll(data: any) {
        //@ts-ignore
        this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
    }
    onPullDownRefresh() {
        const refKey: string = this.tabBar[this.tabIndex].ref
        //@ts-ignore
        if (!this.$refs[refKey] || !this.$refs[refKey].onPullDownRefreshCom) {
            setTimeout(() => {
                uni.stopPullDownRefresh()
            }, 500)
            return
        }
        //@ts-ignore
        this.$refs[refKey] && this.$refs[refKey].onPullDownRefreshCom && this.$refs[refKey].onPullDownRefreshCom()
    }
    onReachBottom() {
        const refKey: string = this.tabBar[this.tabIndex].ref
        //@ts-ignore
        this.$refs[refKey] && this.$refs[refKey].onReachBottomCom && this.$refs[refKey].onReachBottomCom()
    }
    checkAuditTime(beginTime: string, endTime: string) {
        var nowDate = new Date();
        var beginDate = new Date(nowDate);
        var endDate = new Date(nowDate);
        var beginIndex = beginTime.lastIndexOf("\:");
        var beginHour: any = beginTime.substring(0, beginIndex);
        var beginMinue: any = beginTime.substring(beginIndex + 1, beginTime.length);
        beginDate.setHours(beginHour, beginMinue, 0, 0);
        var endIndex = endTime.lastIndexOf("\:");
        var endHour: any = endTime.substring(0, endIndex);
        var endMinue: any = endTime.substring(endIndex + 1, endTime.length);
        endDate.setHours(endHour, endMinue, 0, 0);
        return nowDate.getTime() - beginDate.getTime() >= 0 && nowDate.getTime() <= endDate.getTime();
    }
    checkTime() {
        //@ts-ignore
        if (this.$refs.exhibition && this.$refs.exhibition.canPush != undefined) {
            //@ts-ignore
            this.$refs.exhibition.canPush = this.checkAuditTime("06:00", "18:00")
        }
    }
    onClickRule(){
        uni.navigateTo({
            url:"/pages/act/portable/rule",
            animationType:"slide-in-bottom"
        })
    }
    tabChange(item: any, index: number) {
        if (index == this.tabIndex) return
        this.tabIndex = index
        if (index == 1) {
            this.$nextTick(()=>{
                this.checkTime()
            })
        }
        uni.pageScrollTo({
            scrollTop: 0,
            duration: 0,
        })
    }

}
</script>

<style lang="scss">
page {
    font-family: PingFang SC;
    // background-color: rgba(37, 76, 30, 1);
    background-color: #1a3439;
}

.none {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}

.pointer_none {
    pointer-events: none;
}

.topBanner {
    width: 750rpx;
    height: 450rpx;
    position: relative;
    background-size: 100% 100%;
    background-image: url("@/static/act/portable/top.png");

    .textBanner {
        width: 587rpx;
        height: 202rpx;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 120rpx;
        margin: auto;
        background-image: url("@/static/act/portable/text.png");
    }

    .textBanner1 {
        width: 707rpx;
        height: 202rpx;
        background-image: url("@/static/act/portable/text1.png");
    }

    .topBanner_menu {
        display: flex;
        position: absolute;
        bottom: 30rpx;
        left: 0;
        right: 0;
        bottom: 45rpx;
        margin: auto;
        justify-content: center;
    }

    .menuItem {
        width: 295rpx;
        height: 75rpx;
        background: rgba(255, 255, 255, 0.5);
        border: 2rpx solid rgba(255, 255, 255, 0.64);
        border-radius: 3rpx;
        color: #fff;
        margin: 0 20rpx;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
        letter-spacing: 2rpx;
        text-align: center;
        white-space: pre-wrap;
    }

    .menuItem_select {
        background: rgba(250, 21, 69, 0.8);
        border: 2rpx solid rgba(250, 21, 69, 0.8);
        // color: red;
    }
}
</style>
