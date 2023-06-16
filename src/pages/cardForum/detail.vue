
<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-12 16:06:41
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-15 17:40:07
 * @FilePath: \card-world\src\pages\cardForum\release.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="navBar">
            <view :style="{ paddingTop: app.statusBarHeight + 'px', }"></view>
            <view class="nav">
                <view class="back" @click="goBack"></view>
                <view @click="goPersonHome" style="display:flex">
                    <image 
                        :src="formData.avatar ? $parsePic(decodeURIComponent(formData.avatar)) : app.defaultAvatar"
                        class="topAvatar"></image>
                    <view class="topName u-line-1">{{ formData.userName || "获取中" }}</view>
                </view>
                <!-- <view @click="actionSheetShow = true" v-if="isMy">
                    <u-icon size="46rpx" color="#737070" name="more-dot-fill"></u-icon>
                </view> -->
            </view>
        </view>
        <view style="height:88rpx" :style="{ paddingTop: app.statusBarHeight + 'px', }"></view>
        <view class="swiper">
            <!-- @click="onClickSwiper -->
            <u-swiper imgMode="aspectFit" :indicator="true" bgColor="#000" height="750rpx" :interval="3000" radius="1rpx"
                :list="pics"></u-swiper>
        </view>
        <view class="contentContainer">
            <view class="title">{{ formData.title || "获取中" }}</view>
            <u-read-more :showHeight="180" closeText="全部" color="#000">
                <view class="desc">山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
                    苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
                    无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
                    苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
                    无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
                    苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
                    无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
                    苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
                    无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？</view>
            </u-read-more>

            <view class="time">发布于 {{ $u.timeFormat(formData.created_at, 'mm-dd hh:MM') }}</view>
            <view class="line"></view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({
})
export default class ClassName extends BaseNode {
    app = app
    showVote: boolean = true
    formData: any = {

    }
    pics: Array<string> = ["https://i.ebayimg.com/thumbs/images/g/Cr0AAOSwkHdkfj7U/s-l300.webp", "https://i.ebayimg.com/thumbs/images/g/lL0AAOSwhA9kfU3A/s-l300.webp"]
    onLoad(query: any) {
    }
    goPersonHome() {
        uni.navigateTo({
            url: "/pages/cardForum/personHome?userId="
        })
    }
    goBack() {
        app.platform.pageBack()
    }

}
</script>

<style lang="scss">
.navBar {
    width: 750rpx;
    position: fixed;
    top: 0;
    z-index: 999;
    background-color: #fff;

    .nav {
        box-sizing: border-box;
        padding: 0 35rpx;
        display: flex;
        align-items: center;
        height: 88rpx;
    }

    .back {
        width: 19rpx;
        height: 35rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/portable/pageBack.png");
    }

    .topAvatar {
        width: 42rpx;
        height: 42rpx;
        border-radius: 50%;
        margin-left: 50rpx;
        margin-right: 20rpx;
    }

    .topName {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        flex: 1;
    }
}

.swiper {
    width: 750rpx;
    height: 750rpx;
}

.contentContainer {
    width: 750rpx;
    box-sizing: border-box;
    padding: 0rpx 43rpx;

    .title {
        font-size: 27rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-bottom: 30rpx;
        margin-top: 35rpx;
        letter-spacing: 2rpx;
    }

    .desc {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 33rpx;
        letter-spacing: 2rpx;
        text-align: left;
        white-space: pre-wrap;
    }

    .time {
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #949494;
        margin-top: 40rpx;
        margin-bottom: 20rpx;
    }

    .line {
        width: 662rpx;
        height: 1rpx;
        background: #E8E8E8;
    }
}
</style>
