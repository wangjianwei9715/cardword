<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-12 16:06:41
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-15 17:30:30
 * @FilePath: \card-world\src\pages\cardForum\release.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="pushContainer" :style="{ height: imgUploadHeight + 'px' }">
            <ppp v-model="pics" @heightChange="heightChange" />
            <!-- <shmilyDragImage @addImage="addImage('pics')" :cols="4" :number="6" v-model="pics" /> -->
        </view>

        <input type="text" v-model="formData.title" placeholder="请输入标题">
        <input type="text" v-model="formData.content" placeholder="请输入内容">
        <view @click="showTopics = true">关联话题</view>
        <scroll-view scroll-x="true" class="topicsList">
            <view class="uni-flex">
                <view class="topicsItem" v-for="(item, index) in relatedTopics" :key="index">
                    # {{ item.name }}
                </view> 
            </view>
        </scroll-view>
        <vote :show.sync="showVote" />
        <topics :show.sync="showTopics" @select="onSelectTopic" />
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import vote from "./components/vote.vue"
import topics from "./components/topics.vue"
import CardForum from "./interface/public";
import ppp from "./components/ppp.vue"
import Upload from "@/tools/upload"
import shmilyDragImage from "@/components/shmily-drag-image/shmily-drag-image.vue"
interface CardForumRelease {
    title: string;
    content: string;
}

@Component({
    components: {
        vote,
        topics,
        shmilyDragImage,
        ppp
    }
})
export default class ClassName extends BaseNode {
    showVote: boolean = false
    showTopics: boolean = false
    imgUploadHeight: number = 0
    pics: Array<string> = [
        "https://i.ebayimg.com/thumbs/images/g/zycAAOSwAUlkg6zl/s-l500.jpg",
        "https://i.ebayimg.com/thumbs/images/g/zycAAOSwAUlkg6zl/s-l500.jpg",
        "https://i.ebayimg.com/thumbs/images/g/zycAAOSwAUlkg6zl/s-l500.jpg",
        "https://i.ebayimg.com/thumbs/images/g/zycAAOSwAUlkg6zl/s-l500.jpg",
        "https://i.ebayimg.com/thumbs/images/g/zycAAOSwAUlkg6zl/s-l500.jpg"]
    formData: CardForumRelease = {
        title: "",
        content: ""
    }
    relatedTopics: Array<CardForum.Topics> = []//关联话题
    onLoad(query: any) {
        this.reqTopics()
    }
    onSelectTopic(item: CardForum.Topics) {
        console.log(item);
    }
    async addImage(keyName: string) {
        const countMap: any = {
            "pics": 6,
            "auditPics": 1
        }
        //@ts-ignore
        const COUNT: any = countMap[keyName] - this[keyName].length
        const picArr: any = await Upload.getInstance().uploadImgs(COUNT, "exhibition", ["album"])
        if (picArr) {
            picArr.forEach((pic: any) => {
                //@ts-ignore
                this[keyName].push(pic)
            });
        }


    }
    heightChange(height: number) {
        this.imgUploadHeight = height + 20
    }
    reqTopics() {
        // app.http.Get("dataApi/", {}, (res: any) => {
        //     this.relatedTopics = res.list || []
        // })
        this.relatedTopics = [
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
.content {
    width: 750rpx;
}

.pushContainer {
    // padding: 0 24rpx;
    box-sizing: border-box;
    width: 750rpx;
}

.topicsList {
    display: flex;
    width: 620rpx;
    white-space: nowrap;

    .topicsItem {
        // width: 89rpx;
        padding: 20rpx;
        background-color: rgba(0, 0, 0, .3);
        height: 65rpx;
        margin-right: 26rpx;
        position: relative;
    }

    .hasLine::after {
        content: " ";
        display: block;
        width: 1rpx;
        height: 92rpx;
        background-color: #eeeeee;
        position: absolute;
        right: -14rpx;
        bottom: 0;
        margin: auto;
        top: 0;
    }

    .cardImg {
        width: inherit;
        height: inherit;

    }
}

.flex1 {
    flex: 1;
}
</style>
