<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-12 16:06:41
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-19 10:41:00
 * @FilePath: \card-world\src\pages\cardForum\release.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <navigationbar backgroundColor="#000000" borderBottom="none" backColor="#fff"></navigationbar>
        <!-- <view class="pushContainer" :style="{ height: imgUploadHeight + 'px' }">
            <ppp v-model="pics" @heightChange="heightChange" />
        </view> -->
        <input type="text" class="input_title" v-model="formData.title" placeholder="添加一个有趣的标题吧~（选填）"
            placeholderStyle="color: #959695;font-size:29rpx">
        <textarea placeholderStyle="color: #959695;font-size:23rpx" :maxlength="-1" height="326rpx" confirmType="done"
            class="input_content" placeholder="分享一下您的球星卡收藏..（选填)"></textarea>
        <view class="associationWrap" @click="showTopics = true">
            <image class="ass_img" src="@/static/cardForum/release/topic.png" style="width: 30rpx;height:30rpx"></image>
            <view class="ass_title">关联话题</view>
            <view class="flex1"></view>
            <view class="ass_right"></view>
        </view>
        <scroll-view scroll-x="true" :show-scrollbar="false" class="topicScroll">
            <view class="topicScrollWrap">
                <view class="topicItem flexCenter" v-for="item in 10">
                    <text>#秀卡-詹姆斯</text>
                </view>
            </view>
        </scroll-view>
        <view class="associationWrap">
            <image class="ass_img" src="@/static/cardForum/release/goods.png" style="width: 30rpx;height:30rpx"></image>
            <view class="ass_title">关联好物</view>
            <view class="flex1"></view>
            <view class="ass_right"></view>
        </view>
        <scroll-view scroll-x="true" :show-scrollbar="false" class="haowuGoods">
            <view class="haowuGoodsWrap">
                <view class="goodsItem flexCenter" v-for="item in 10">
                    <image class="pic"></image>
                    <view class="goodsInfo u-line-2">22-23 篮球 Panini 整箱皇冠+22-23 16包 ...22-23 篮球 Panini 整箱皇冠+22-23 16包
                        ...22-23 篮球 Panini
                        整箱皇冠+22-23 16包 ...</view>
                    <view class="close"></view>
                </view>
            </view>
        </scroll-view>
        <view class="associationWrap" @click="showVote = true">
            <image class="ass_img" src="@/static/cardForum/release/vote.png" style="width: 30rpx;height:30rpx"></image>
            <view class="ass_title">发起投票</view>
            <view class="flex1"></view>
            <view class="ass_right"></view>
        </view>
        <scroll-view scroll-x="true" class="topicsList">
            <view class="uni-flex">
                <view class="topicsItem" v-for="(item, index) in relatedTopics" :key="index">
                    # {{ item.name }}
                </view>
            </view>
        </scroll-view>
        <view class="bottomWrap">
            <view class="buttonWrap">
                <view class="draft">
                    <image src="@/static/cardForum/release/caogao.png"></image>
                    <text>存草稿</text>
                </view>
                <view class="submit flexCenter">发布动态</view>
            </view>
            <view class="bottomSafeArea"></view>
        </view>
        <votePop :show.sync="showVote" />
        <topicsPop :show.sync="showTopics" @select="onSelectTopic" />
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import votePop from "./components/votePop.vue"
import topicsPop from "./components/topicsPop.vue"
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
        votePop,
        topicsPop,
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
page {
    background-color: #000;
}

.content {
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 20rpx;
}

.pushContainer {
    // padding: 0 24rpx;
    box-sizing: border-box;
    width: 750rpx;
}

.input_title {
    width: 100%;
    font-size: 29rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #f3f3f3;
    // width: 750rpx;
    // box-sizing: border-box;
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

.input_content {
    background-color: #000;
    width: 100%;
    font-size: 23rpx;
    font-family: PingFang SC;
    font-weight: 400;

    margin-top: 24rpx;
    height: 326rpx;
    border: none;
    color: #ffffff;
    border-bottom: 1rpx solid #3F3F3F;
}

.associationWrap {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 28rpx;

    .ass_img {
        display: block;
    }

    .ass_title {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #C0C0C0;
        margin-left: 11rpx;
    }

    .ass_right {
        width: 19rpx;
        height: 29rpx;
        background-size: 100% 100%;
        background-image: url("@/static/cardForum/release/right.png");
    }
}

.topicScroll {
    width: 100%;
}

.topicScrollWrap {
    width: 100%;
    // background-color: #fff;
    height: 50rpx;
    white-space: nowrap;
    display: flex;
    align-items: center;
    margin-top: 20rpx;

    .topicItem {
        // width: 241rpx;
        padding: 0 20rpx;
        height: 50rpx;
        background: #3F3F3F;
        border-radius: 3rpx;
        margin-right: 20rpx;
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #C0C0C0;

        .act {
            color: #FA1545;
            margin-left: 8rpx;
        }
    }
}

.haowuGoodsWrap {
    width: 100%;
    height: 103rpx;
    margin-top: 23rpx;

    .goodsItem {
        width: 466rpx;
        height: 103rpx;
        background: #3F3F3F;
        border-radius: 3rpx;
        box-sizing: border-box;
        padding: 10rpx 22rpx 10rpx 11rpx;
        align-items: center;
        display: flex;

        .pic {
            width: 108rpx;
            height: 83rpx;
            background: #FA1545;
            border-radius: 1rpx;
            margin-right: 12rpx;
        }

        .goodsInfo {
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #E6E6E6;
            line-height: 25rpx;
            flex: 1;
            // display: flex;
        }

        .close {
            margin-left: 48rpx;
            background-size: 100% 100%;
            background-image: url("@/static/cardForum/release/goodsClose.png");
            width: 26rpx;
            height: 26rpx;
        }
    }
}

.bottomWrap {
    position: fixed;
    bottom: 0;
    width: inherit;

    .buttonWrap {
        display: flex;
        box-sizing: border-box;
        width: inherit;
        padding: 0 35rpx;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 44rpx;

        .draft {
            display: flex;
            flex-direction: column;
            align-items: center;

            image {
                width: 48rpx;
                height: 48rpx;
                margin-bottom: 8rpx;
            }

            text {
                font-size: 21rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #C0C0C0;
            }
        }

        .submit {
            width: 575rpx;
            height: 92rpx;
            background: #FA1545;
            border-radius: 5rpx;
            font-size: 33rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #FFFFFF;
            letter-spacing: 2rpx;
        }
    }
}
</style>
