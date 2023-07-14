<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-13 11:21:52
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-07-14 10:36:56
 * @FilePath: \card-world\src\pages\cardForum\components\vote.vue
 * @Description: 卡圈的话题pop组件
-->
<template>
    <view class="content">
        <u-popup :safeAreaInsetBottom="false" closeOnClickOverlay :show="showValue" @close="showValue = false"
            :closeable="false">
            <view class="topicsContainer">
                <view class="searchWrap">
                    <view class="search">
                        <image src="@/static/cardForum/release/search.png" mode="scaleToFill" />
                        <input type="text" class="input" @input="onInput" v-model="queryParams.q" placeholder="搜索您参与的商品...">
                    </view>
                    <view class="cancel" @click="showValue = false">取消</view>
                </view>
                <scroll-view class="topicsScroll" :scroll-y="true" @scrolltolower="scrolltolower">
                    <view class="topicsItem" v-for="(item, index) in list"
                        @click="$emit('select', item), showValue = false">
                        <muqian-lazyLoad class="image"
                            :src="$parsePic(decodeURIComponent(item.cover))"
                            borderRadius="3rpx"></muqian-lazyLoad>
                        <view class="rightInfo">
                            <view class="title u-line-1">{{ item.title }}</view>
                            <view class="merInfo">
                                <text>{{ item.merchantName }}</text>
                                <text class="gang">|</text>
                                <text>{{ goodsManaager.listPlan(item, 'str') }}</text>
                            </view>
                            <view class="flex1"></view>
                            <view class="num">¥{{ item.price }}</view>
                        </view>
                    </view>

                </scroll-view>
                <view class="bottomSafeArea"></view>
            </view>
        </u-popup>
    </view>
</template>

<script lang="ts">
import { Component, PropSync, Watch } from "vue-property-decorator";
import BaseComponent from '@/base/BaseComponent.vue';
import { app } from "@/app";
import CardForum from "../interface/public";

interface Query {
    pageIndex: number;
    pageSize: number;
    q: string;
}
@Component({})
export default class ClassName extends BaseComponent {
    @PropSync("show", {
        type: Boolean
    }) showValue!: Boolean;
    @Watch('showValue')
    onShowChanged(val: boolean) {
        if (val && !this.list.length) this.reqList()
    }
    list: Array<any> = []
    goodsManaager = app.goods;
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 15,
        q: "",
    }
    totalPage: number = 0
    timer: number = 0
    isFetchEnd: boolean = true
    mounted(): void {
        // this.reqList()
    }
    scrolltolower() {
        if (!this.isFetchEnd) {
            this.queryParams.fetchFrom += this.queryParams.fetchSize
            this.reqList()
        }
    }
    onInput() {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.queryParams.fetchFrom = 1
            this.reqList()
        }, 500)
    }
    reqList() {
        app.http.Get("dataApi/cardCircle/haowu/good/list", this.queryParams, (res: any) => {
            const list = res.list || []
            this.isFetchEnd = res.isFetchEnd
            this.queryParams.fetchFrom == 1 ? this.list = list : this.list.push(...list)
        })
        // this.list = [
        //     {
        //         name: "秀卡-詹姆斯",
        //         id: 1,
        //         isActivity: true
        //     },
        //     {
        //         name: "问价",
        //         id: 2,
        //         isActivity: false
        //     },
        //     {
        //         name: "我的第一张卡",
        //         id: 3,
        //         isActivity: false
        //     },
        //     {
        //         name: "我的卡在哪里",
        //         id: 5,
        //         isActivity: false
        //     },
        //     {
        //         name: "我的卡屌不屌",
        //         id: 6,
        //         isActivity: false
        //     }
        // ]
    }
}
</script>

<style lang="scss">
.flex1 {
    flex: 1;
}

.topicsContainer {
    width: 750rpx;
    background-color: #000000;
    height: 1143rpx;
    position: relative;
    box-sizing: border-box;
    padding: 0 20rpx;
    display: flex;
    flex-direction: column;
}

.searchWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;

    .search {
        width: 632rpx;
        height: 73rpx;
        background: #3F3F3F;
        border-radius: 3rpx;
        align-items: center;
        display: flex;
        box-sizing: border-box;
        padding: 0 27rpx;

        image {
            width: 33rpx;
            height: 35rpx;
        }

        .input {
            font-size: 23rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            flex: 1;
            margin-left: 20rpx;
        }
    }

    .cancel {
        font-size: 27rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #E6E6E6;
    }
}

.topicsScroll {
    // background-color: #333333;
    margin-top: 30rpx;
    height: 986rpx;
    // flex: 1;
}

.topicsItem {
    display: flex;
    align-items: center;
    margin-bottom: 34rpx;
    width: inherit;
    box-sizing: border-box;

    .image {
        width: 182rpx;
        height: 140rpx;
        // background: #FA1545;
        border-radius: 3rpx;
        margin-right: 21rpx;
    }

    .rightInfo {
        flex: 1;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        height: 140rpx;

        .title {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #FFFFFF;
        }

        .num {
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #FFFFFF;
        }
    }

    .merInfo {
        display: flex;
        align-items: center;

        text {
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #C0C0C0;
        }

        .gang {
            margin: 0 4rpx;
        }
    }
}
</style>
