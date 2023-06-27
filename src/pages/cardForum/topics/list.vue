<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-15 14:12:47
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-27 14:11:03
 * @FilePath: \card-world\src\pages\cardForum\topicList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <topicList :old="old" style="margin-top: 20rpx;" :value="list"></topicList>
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
        od: 'issue_72:desc'
    }
    list: any = []
    old: boolean = false
    isFetchEnd: boolean = false
    onLoad(query: any) {
        this.old = query.old == "1"
        if (this.old) {
            uni.setNavigationBarTitle({
                title: "往期话题"
            })
        }
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
        if (this.old) {
            app.http.Get("dataApi/cardCircle/topic/activity/old/list", this.queryParams, (res: any) => {
                const list = res.list || []
                this.isFetchEnd = res.isFetchEnd
                this.queryParams.fetchFrom == 1 ? this.list = list : this.list.push(...list)
            })
            return
        }
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
