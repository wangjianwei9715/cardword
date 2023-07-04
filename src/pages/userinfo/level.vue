<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-07-04 11:46:40
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-07-04 15:41:15
 * @FilePath: \card-world\src\pages\userinfo\level.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <transitionNav :needIconShadow="false">
            <template v-slot:custom>
                <view class="topTabContainer">
                    <view class="tab tab_select">卡圈等级</view>
                    <view class="tab">勋章</view>
                </view>
            </template>
        </transitionNav>
        <view class="levelTopContainer">
            <view class="navW" :style="{ height: (app.statusBarHeight + navHeight) + 'px' }"></view>
            <view class="userInfoWrap">
                <image :src="app.defaultAvatar" class="userAvatar" mode="aspectFill"></image>
                <view class="userInfo">
                    <view class="userNameWrap">
                        <view class="userName">爷就是拽</view>
                        <view class="userTitle">这就是我的称号</view>
                    </view>
                    <view class="xzs">勋章数：0</view>
                </view>
            </view>
            <view class="levelInfo">
                <view class="level">LV.1</view>
                <view class="tips">达到5/9/10级解锁特殊勋章</view>
                <view class="flex1"></view>
                <view class="gap">
                    <text class="gap1">555</text>
                    <text class="gap2">/888</text>
                </view>
                <view class="rightIcon"></view>
            </view>
            <view class="expWrap">
                <view class="expWrap_show" :style="{width:'20%'}"></view>
            </view>
        </view>
        <view class="taskContainer">
            <view class="titleWrap">
                <view class="title">每日任务</view>
                <view class="titleTip">每日0:00重置</view>
            </view>
            <view class="taskItem">

            </view>
        </view>
        <view class="limitContainer">
            <view class="titleWrap" style="margin-left: 37rpx;">
                <view class="title">限定任务</view>
                <view class="titleTip">限时开放</view>
            </view>
            <view class="limitTitle">每篇动态/卡册被评论</view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    app = app
    navHeight = uni.upx2px(88)
    signInDay: number = 0
    taskList: any = []
    onLoad(query: any) {
        this.reqTaskList()
    }
    reqTaskList() {
        app.http.Get(`dataApi/cardCircle/level/day/task/list`, {}, (res: any) => {
            console.log(res);
            this.signInDay = res.signInDay
            this.taskList = (res.list || []).sort((x: any, y: any) => {
                return x.id - y.id
            })
            console.log(this.taskList);

        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi`, {}, (res: any) => {

        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #f6f7fb;
}

.levelTopContainer {
    width: 750rpx;
    height: 450rpx;
    background-size: 100% 100%;
    background-image: url("@/static/userinfo/v3/levelBanner.png");
}

.taskContainer {
    width: 710rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    box-sizing: border-box;
    padding: 42rpx 26rpx 42rpx 37rpx;
    margin-top: -40rpx;
}

.titleWrap {
    display: flex;
    flex-direction: row;
    align-items: flex-end;

    .title {
        font-size: 27rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-right: 16rpx;
    }

    .titleTip {
        font-size: 19rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #C0C0C0;
    }
}

.limitContainer {
    width: 710rpx;
    // height: 664rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    padding: 42rpx 0 63rpx 0;
    margin-top: 20rpx;
}

.limitTitle {
    width: 334rpx;
    height: 52rpx;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: bold;
    box-sizing: border-box;
    padding-left: 35rpx;
    padding-top: 5rpx;
    color: #FFFFFF;
    background-size: 100% 100%;
    background-image: url("@/static/userinfo/v3/titleWrap.png");
    margin-top: 22rpx;
}

.topTabContainer {
    position: absolute;
    width: 280rpx;
    // height: 100rpx;
    // background-color: red;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .tab {
        font-size: 31rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #C0C0C0;
    }

    .tab_select {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
    }
}

.userInfoWrap {
    display: flex;
    box-sizing: border-box;
    width: 750rpx;
    padding: 0 34rpx;
    margin-top: 10rpx;

    .userAvatar {
        width: 107rpx;
        height: 107rpx;
        border-radius: 50%;
        margin-right: 25rpx;
    }

    .userNameWrap {
        display: flex;
        align-items: center;
        height: 42rpx;
    }

    .userInfo {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .userName {
        font-size: 31rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
    }

    .userTitle {
        // width: 108rpx;
        padding: 0 26rpx;
        line-height: 42rpx;
        height: 42rpx;
        background: #FFFFFF;
        border-radius: 3rpx;
        font-size: 31rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        margin-left: 22rpx;
    }

    .xzs {
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
    }
}

.levelInfo {
    display: flex;
    align-items: center;
    padding: 0 42rpx 0 36rpx;
    margin-top: 37rpx;

    .level {
        font-size: 29rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
        margin-right: 22rpx;
    }

    .tips {
        font-size: 19rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #959695;
    }

    .gap {
        display: flex;
        letter-spacing: 2rpx;
    }

    .gap1 {
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
    }

    .gap2 {
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #959695;
    }

    .rightIcon {
        width: 10rpx;
        height: 19rpx;
        background-size: 100% 100%;
        background-image: url("@/static/userinfo/v3/righrIcon.png");
        margin-left: 12rpx;
    }
}

.flex1 {
    flex: 1;
}

.expWrap {
    width: 670rpx;
    height: 10rpx;
    background: #FFFFFF;
    border-radius: 5rpx;
    margin: 0 auto;
    margin-top: 22rpx;
    position: relative;
    overflow: hidden;

    .expWrap_show {
        height: 10rpx;
        background: linear-gradient(90deg, #FA1545 0%, #5211AB 98%);
        border-radius: 5rpx;
    }
}
</style>
