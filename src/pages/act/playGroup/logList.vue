<template>
    <view class='playContent'>
        <view class="tabBar uni-flex">
            <view class="tabBar-item flexCenter" @click="onClickTab(item,index)"
                :class="{tabBarSelect:index==tab.index}" v-for="(item,index) in tab.list" :key="index">{{item.label}}
            </view>
        </view>
        <view class="giveItem uni-flex" v-for="(item,index) in list" :key="index">
            <view class="giveItem-left uni-flex">
                <view class="giveItem-title">兑换：{{item.name}}</view>
                <view class="giveItem-time">{{dateFormat(item.created_at)}}</view>
            </view>
            <view class="giveItem-right uni-flex">
                <text>{{item.awardName}}</text>
                <image v-if="queryParams.tp==1" src="/static/act/playGroup/couponUp.png" mode="scaleToFill" />
            </view>
        </view>
        <empty v-if='!list || !list.length'/>
    </view>
    
</template>

<script lang="ts" scoped>

    import { app } from "@/app";
    import { Component, Watch } from "vue-property-decorator";
    import BaseNode from "../../../base/BaseNode.vue";
    import { parsePic,dateFormat } from "@/tools/util";
    @Component({})
    export default class ClassName extends BaseNode {
        parsePic: any = parsePic
        tab: any = {
            index: 0,
            list: [{ label: '兑奖明细',value:1 }, { label: '抽奖明细',value:2 }]
        }
        dateFormat:any=dateFormat
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
            if (index == this.tab.index) return
            this.tab.index = index
            this.queryParams.tp = item.value
            this.queryParams.pageIndex = 1
            this.list=[]
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
            app.http.Get('activity/playerGroup/play/record', this.queryParams, (res: any) => {
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
        text-align: center;
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
        height: 133rpx;
        background: #fff;
        border-radius: 5rpx;
        margin: 14rpx auto;
        box-sizing: border-box;
        padding: 32rpx 33rpx 36rpx 24rpx;
        justify-content: space-between;
        align-items: center;
    }

    .giveItem-left {
        flex-direction: column;
        justify-content: space-between;
    }

    .giveItem-title {
        font-size: 29rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
    }

    .giveItem-time {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #88878C;
    }

    .giveItem-right {
        align-items: center;

        text {
            font-size: 29rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #C63136;
            
        }

        image {
            width: 129rpx;
            height: 53rpx;
            display: block;
            margin-left: 6rpx;
        }
    }
</style>