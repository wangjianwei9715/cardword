<template>
    <view class='playContent'>
        <view class="tabBar uni-flex">
            <view class="tabBar-item flexCenter" @click="onClickTab(item,index)"
                :class="{tabBarSelect:index==tab.index}" v-for="(item,index) in tab.list" :key="index">{{item.label}}
            </view>
        </view>
        <view class="giveItem" v-for="(item,index) in list" :key="index">
            <view class="giveItem-blockContainer uni-flex">
                <view class="giveItem-block flexCenter" v-for="sItem in item.players">{{sItem}}</view>
            </view>
            <view class="giveItem-msg uni-flex">
                <view class="msg-left">对方id:{{item.userId}}</view>
                <view class="msg-right">{{item.send_at}}</view>
            </view>
        </view>
        <empty v-if='!list||!list.length'/>
    </view>
</template>

<script lang="ts">

    import { app } from "@/app";
    import { Component, Watch } from "vue-property-decorator";
    import BaseNode from "../../../base/BaseNode.vue";
    import { parsePic } from "@/tools/util";
    @Component({})
    export default class ClassName extends BaseNode {
        parsePic: any = parsePic
        tab: any = {
            index: 0,
            list: [{ label: '赠送', value: 1 }, { label: '收到', value: 2 }]
        }
        queryParams: any = {
            pageIndex: 1,
            pageSize: 20,
            tp: 1
        }
        list: any = []
        totalPage: number = 0
        onLoad() {
            this.reqNewData()
        }
        onPullDownRefresh() {
            this.queryParams.pageIndex = 1
            this.reqNewData()
        }
        onReachBottom() {
            if (this.queryParams.pageIndex < this.totalPage) {
                this.queryParams.pageIndex += 1
                this.reqNewData()
            }
        }
        onClickTab(item: any, index: number) {
            console.log(index);
            if (index == this.tab.index) return
            this.tab.index = index
            this.queryParams.tp = item.value
            this.queryParams.pageIndex = 1
            this.reqNewData()
        }
        pageJump(url: string) {
            uni.navigateTo({
                url
            })
        }
        previewImage(list: any, index: number) {
            const urls = list.map((item: any) => this.parsePic(item.src));
            uni.previewImage({
                urls,
                current: index
            });
        }
        reqNewData(cb?: Function) {
            app.http.Get('playerGroup/send/record', this.queryParams, (res: any) => {
                this.totalPage = res.totalPage
                this.queryParams.pageIndex == 1 ? this.list = res.list : this.list.push(...res.list)
                cb && cb()
            })
        }
    }
</script>

<style lang="scss" scoped>
    page {
        height: 100%;
        background-color: #f7f7f7;
    }

    @font-face {
        font-family: HYLiLiangHeiJ;
        src: url("https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.12/seller/info/16602943088150ns2974oh.ttf");
    }

    @font-face {
        font-family: YouSheBiaoTiHei;
        src: url("/static/act/playGroup/YouSheBiaoTiHei-2.ttf");
    }

    .tabBar {
        width: 750rpx;
        background-color: #fff;
        height: 86rpx;
    }

    .tabBar-item {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #959699;
        width: 50%;
    }

    .tabBarSelect {
        font-size: 31rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
    }

    .giveItem {
        width: 722rpx;
        /* height: 229rpx; */
        background: #fff;
        border-radius: 5rpx;
        margin: 14rpx auto;
        box-sizing: border-box;
        padding: 27rpx 33rpx 26rpx 23rpx;
    }

    .giveItem-blockContainer {
        flex-wrap: wrap;
        width: 540rpx;

        .giveItem-block {
            width: 159rpx;
            height: 49rpx;
            background: #EFEFEF;
            border-radius: 3rpx;
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            margin-right: 22rpx;
            margin-bottom: 14rpx;
        }
    }

    .giveItem-msg {
        justify-content: space-between;
        align-items: center;
        margin-top: 30rpx;

        .msg-left {
            font-size: 29rpx;
            font-family: PingFang SC;
            font-weight: 600;
            color: #333333;
        }

        .msg-right {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #88878C;
        }
    }
</style>