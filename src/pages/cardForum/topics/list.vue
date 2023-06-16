<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-15 14:12:47
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-15 15:33:59
 * @FilePath: \card-world\src\pages\cardForum\topicList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="topicsItem" v-for="(item, index) in list" @click="goToDetail">
            <muqian-lazyLoad class="image"
                :src="item.pic || 'https://i.ebayimg.com/thumbs/images/g/eQcAAOSwZYFkhwXd/s-l500.jpg'"
                borderRadius="3rpx"></muqian-lazyLoad>
            <view class="rightInfo">
                <view class="title">#{{ item.name }}</view>
                <view class="bottomInfo">
                    <view class="num">{{ item.cardCircleNum }}篇动态</view>
                    <view class="push flexCenter">发布</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    queryParams: any = {
        pageIndex: 1,
        pageSize: 15
    }
    list: any = []
    totalPage: number = 0
    onLoad(query: any) {
        this.reqNewData()
    }
    onReachBottom() {
        if (this.queryParams.pageIndex < this.totalPage) {
            this.queryParams.pageIndex += 1
            this.reqNewData()
        }
    }
    onPullDownRefresh() {
        this.queryParams.pageIndex = 1
        this.reqNewData(() => {
            uni.stopPullDownRefresh()
        })
    }
    goToDetail(item: any) {
        uni.navigateTo({
            url: "/pages/cardForum/topics/detail?id=" + item.id
        })
    }
    reqNewData(cb?: any) {
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
        return
        app.http.Get(`dataApi`, this.queryParams, (res: any) => {
            const list = res.list || []
            this.totalPage = res.totalPage
            this.queryParams.pageIndex == 1 ? this.list = list : this.list.push(...list)
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
.topicsItem {
    width: 700rpx;
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
            color: #000;
            font-weight: bold;
        }

        .num {
            color: #aaaaaa;
        }

        .bottomInfo {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-self: center;
        }

        .push {
            // width: 40rpx;
            // height: 20rpx;
            padding: 10rpx 30rpx;
            background-color: #fb374e;
            color: #fff;
        }
    }
}
</style>
