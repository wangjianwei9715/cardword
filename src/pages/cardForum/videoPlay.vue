<template>
    <view class="content">

        <video :src="path" :autoplay="true"
            style="position:fixed;top:0;bottom:0;left:0;right:0;width: 750rpx;height: 100vh;"></video>
        <cover-view style="width:750rpx;backgroundColor:#101010;position: fixed;
        top: 0;" :style="{ height: navHeight + 'px' }">
            <!-- <navigationbar backgroundColor="#000000" borderBottom="none" backColor="#fff" style="z-index: 99999;">
            </navigationbar> -->
            <cover-view :style="{ height: app.statusBarHeight + 'px' }"></cover-view>
            <cover-view class="tabHeader"
                style="width:750rpx;height:88rpx;display: flex;align-items: center;justify-content: space-between;flex-direction: row;position: relative;">
                <cover-view :style="{ color: '#fff' }" @click="app.platform.pageBack()">
                    <cover-image style="width: 19rpx;height: 35rpx;margin-left: 30rpx;"
                        src="@/static/index/v3/back.png"></cover-image>
                </cover-view>
                <cover-view style="position: absolute;right:30rpx;top:0;bottom:0;margin: auto;" @click="onClickDel">
                    <cover-image style="width: 39rpx;height: 42rpx;margin-right: 30rpx;"
                        src="@/static/cardForum/del.png"></cover-image>
                </cover-view>
            </cover-view>
        </cover-view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
const navHeight: any = app.statusBarHeight + uni.upx2px(88)
@Component({})
export default class ClassName extends BaseNode {
    path: string = ""
    navHeight = navHeight
    app = app
    onLoad(query: any) {
        this.path = decodeURIComponent(query.path)
        console.log(this.path);

    }
    onClickDel() {
        uni.$emit("cardForumDelVideo")
        app.platform.pageBack()
    }
    reqNewData(cb?: any) {
    }

}
</script>

<style lang="scss"></style>
