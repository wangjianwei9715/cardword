<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-13 11:21:52
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-07-04 16:35:55
 * @FilePath: \card-world\src\pages\cardForum\components\vote.vue
 * @Description: 卡圈的话题pop组件
-->
<template>
    <view class="content">
        <u-popup :safeAreaInsetBottom="false" :show="showValue" @close="showValue = false" :closeable="false"
            :closeOnClickOverlay="true">
            <view class="topicsContainer">
                <view class="searchWrap">
                    <view class="search">
                        <image src="@/static/cardForum/release/search.png" mode="scaleToFill" />
                        <input type="text" class="input" @input="onInput" v-model="queryParams.q" placeholder="搜索话题...">
                    </view>
                    <view class="cancel" @click="showValue = false">取消</view>
                </view>
                <scroll-view class="topicsScroll" :scroll-y="true" @scrolltolower="scrolltolower">
                    <view class="topicsItem" v-for="(item, index) in list"
                        @click="$emit('select', item), showValue = false">
                        <muqian-lazyLoad class="image" :src="$parsePic(decodeURIComponent(item.pic))"
                            borderRadius="50%"></muqian-lazyLoad>
                        <view class="rightInfo">
                            <view class="title">{{ item.name }}</view>
                            <view class="num">{{ item.totalUseNum }}篇动态</view>
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
// interface Query {
//     pageIndex: number;
//     pageSize: number;
//     q: string;
// }
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
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 15,
        q: "",
        od: "issue_72:desc"
    }
    totalPage: number = 0
    timer: number = 0
    isFetchEnd: boolean = true
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
        app.http.Get("dataApi/cardCircle/topic/list", this.queryParams, (res: any) => {
            const list = res.list || []
            this.isFetchEnd = res.isFetchEnd
            this.queryParams.fetchFrom == 1 ? this.list = list : this.list.push(...list)
        })
    }
}
</script>

<style lang="scss">
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
        width: 85rpx;
        height: 85rpx;
        margin-right: 21rpx;
    }

    .rightInfo {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #FFFFFF;
        }

        .num {
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #C0C0C0;
        }
    }
}
</style>
