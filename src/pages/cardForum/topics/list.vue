<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-15 14:12:47
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-26 09:39:56
 * @FilePath: \card-world\src\pages\cardForum\topicList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <topicList style="margin-top: 20rpx;" :value="list"></topicList>
        <empty v-if="!list.length"></empty>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { getTopics } from "../func/index"
import topicList from "../components/topicList.vue"
@Component({
    components: {
        topicList
    }
})
export default class ClassName extends BaseNode {
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 15,
        timeStamp: 0,
        q: "",
        od: 'issue_72'
    }
    list: any = []
    isFetchEnd: boolean = false
    onLoad(query: any) {
        this.reqNewData()
    }
    onReachBottom() {
        if (this.isFetchEnd) return
        this.queryParams.fetchFrom += this.queryParams.fetchSize
        this.reqNewData()
    }
    onPullDownRefresh() {
        this.queryParams.fetchFrom = 1
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
        // this.queryParams.timeStamp = Math.round(+new Date() / 1000)
        // return
        getTopics(this.queryParams).then((res: any) => {
            const list = res.list || []
            this.isFetchEnd = res.isFetchEnd
            this.queryParams.fetchFrom == 1 ? this.list = list : this.list.push(...list)
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
