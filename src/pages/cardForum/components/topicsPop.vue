<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-13 11:21:52
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-13 16:22:54
 * @FilePath: \card-world\src\pages\cardForum\components\vote.vue
 * @Description: 卡圈的话题pop组件
-->
<template>
    <view class="content">
        <u-overlay :show="showValue">
            <u-popup :show="showValue" @close="showValue = false" :closeable="false" :closeOnClickOverlay="false">
                <view class="topicsContainer">
                    <view class="searchWrap">
                        <view class="search">
                            <input type="text" @input="onInput" v-model="queryParams.q">
                        </view>
                        <view class="cancel" @click="showValue = false">取消</view>
                    </view>
                    <scroll-view class="topicsScroll" :scroll-y="true" @scrolltolower="scrolltolower">
                        <view class="topicsItem" v-for="(item, index) in list" @click="$emit('select', item),showValue=false">
                            <muqian-lazyLoad class="image"
                                :src="item.pic || 'https://i.ebayimg.com/thumbs/images/g/eQcAAOSwZYFkhwXd/s-l500.jpg'"
                                borderRadius="50%"></muqian-lazyLoad>
                            <view class="rightInfo">
                                <view class="title">#{{ item.name }}</view>
                                <view class="num">{{ item.cardCircleNum }}篇动态</view>
                            </view>
                        </view>
                    </scroll-view>
                </view>
            </u-popup>
        </u-overlay>
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
    list: Array<CardForum.Topics> = []
    queryParams: Query = {
        pageIndex: 1,
        pageSize: 20,
        q: ""
    }
    totalPage: number = 0
    timer: number = 0
    scrolltolower() {
        if (this.queryParams.pageIndex < this.totalPage) this.reqList()
    }
    onInput() {
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.queryParams.pageIndex = 1
            this.reqList()
        }, 500)
    }
    reqList() {
        // app.http.Get("dataApi/", this.queryParams, (res: any) => {
        //     this.totalPage = res.totalPage ?? 0
        //     const list = res.list || []
        //     this.queryParams.pageIndex == 1 ? this.list = list : this.list.push(...list)
        // })
        this.list = [
            {
                name: "秀卡-詹姆斯",
                id: 1,
                isActivity: true
            },
            {
                name: "问价",
                id: 2,
                isActivity: false
            },
            {
                name: "我的第一张卡",
                id: 3,
                isActivity: false
            },
            {
                name: "我的卡在哪里",
                id: 5,
                isActivity: false
            },
            {
                name: "我的卡屌不屌",
                id: 6,
                isActivity: false
            }
        ]
    }
}
</script>

<style lang="scss">
.topicsContainer {
    width: 750rpx;
    background-color: #000000;
    height: 900rpx;
    position: relative;
    box-sizing: border-box;
    padding: 0 20rpx;
}

.searchWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20rpx;

    .search {
        width: 500rpx;
        height: 60rpx;
        background-color: #333333;
        align-items: center;
        display: flex;
    }

    .cancel {
        color: #fff;
    }
}

.topicsScroll {
    background-color: #333333;
    margin-top: 30rpx;
    height: 760rpx;
}

.topicsItem {
    display: flex;
    align-items: center;
    margin-bottom: 22rpx;

    .image {
        width: 88rpx;
        height: 88rpx;
        margin-right: 20rpx;
    }

    .rightInfo {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
            color: #fff;
            font-weight: bold;
        }

        .num {
            color: #aaaaaa;
        }
    }
}
</style>
