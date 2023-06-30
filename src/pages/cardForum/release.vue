<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-12 16:06:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-30 10:40:53
 * @FilePath: \jichao_app_2\src\pages\cardForum\release.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <navigationbar backgroundColor="#000000" borderBottom="none" backColor="#fff" style="z-index: 99999;">
        </navigationbar>
        <album v-if="albumRelease" ref="albumRelease" :list="albumList"/>
        <view v-else class="pushContainer" :style="{ height: imgUploadHeight + 'px' }">
            <ppp :type="formData.tp" :number="maxNum" :addText="addText" v-model="pics" @heightChange="heightChange"
                @addImage="addImage('pics')" @delVideo="delVideo" @delVideoCover="delVideoCover" />
        </view>
        <input type="text" class="input_title" v-model.trim="formData.title" placeholder="添加一个有趣的标题吧~（选填）"
            placeholderStyle="color: #959695;font-size:29rpx" :maxlength="80">
        <view class="topicWrap" v-if="selectTopics.length">
            <view class="glTopic" v-for="(item, index) in selectTopics" :key="index" @click="delSelectTopic(item, index)">
                {{ item.name }}
            </view>
        </view>
        <textarea placeholderStyle="color: #959695;font-size:23rpx" v-model.trim="formData.content" :maxlength="3000"
            height="326rpx" confirmType="done" class="input_content" placeholder="分享一下您的球星卡收藏..（选填)"></textarea>
        <view class="associationWrap" @click="showTopics = true">
            <image class="ass_img" src="@/static/cardForum/release/topic.png" style="width: 30rpx;height:30rpx"></image>
            <view class="ass_title">关联话题</view>
            <view class="flex1"></view>
            <view class="ass_right"></view>
        </view>
        <scroll-view scroll-x="true" :show-scrollbar="false" class="topicScroll"
            v-if="relatedTopics && relatedTopics.length">
            <view class="topicScrollWrap">
                <view class="topicItem flexCenter" @click="onSelectTopic(item)" v-for="(item, index) in relatedTopics" :key="index">
                    <text>{{ item.name }}</text>
                    <text class="act" v-if="item.activity">活动</text>
                </view>
            </view>
        </scroll-view>
        <view class="associationWrap" @click="showGoods = true" style="margin-top: 40rpx;">
            <image class="ass_img" src="@/static/cardForum/release/goods.png" style="width: 30rpx;height:30rpx"></image>
            <view class="ass_title">关联好物</view>
            <view class="flex1"></view>
            <view class="ass_right"></view>
        </view>
        <view class="haowuGoodsWrap" v-if="selectGoods.goodCode">
            <view class="goodsItem flexCenter">
                <image class="pic" :src="$parsePic(decodeURIComponent(selectGoods.cover))"></image>
                <view class="goodsInfo u-line-2">{{ selectGoods.title }}</view>
                <view class="close" @click="selectGoods.goodCode = ''"></view>
            </view>
        </view>
        <view class="associationWrap" @click="showVote = true"
            style="border-bottom: 1rpx solid #3F3F3F;padding-bottom: 30rpx;">
            <image class="ass_img" src="@/static/cardForum/release/vote.png" style="width: 30rpx;height:30rpx"></image>
            <view class="ass_title">发起投票</view>
            <view class="flex1"></view>
            <view class="voteTitle">{{ formData.voteTitle }}</view>
            <view class="ass_right"></view>
        </view>
        <view class="privateContainer" @click="onClickState">
            <view class="radio" v-if="formData.state === 1"></view>
            <view class="radio_check" v-if="formData.state === 2"></view>
            <view class="private_text">仅自己可见</view>
        </view>
        <view class="bottomWrap">
            <view class="buttonWrap">
                <view class="draft" @click="onClickSaveDraft">
                    <image src="@/static/cardForum/release/caogao.png"></image>
                    <text>存草稿</text>
                </view>
                <view class="submit flexCenter" @click="onClickSubmit">发布动态</view>
            </view>
            <view class="bottomSafeArea"></view>
        </view>
        <votePop :show.sync="showVote" @finish="voteFinish" @clear="voteClear" />
        <topicsPop :show.sync="showTopics" @select="onSelectTopic" />
        <goods :show.sync="showGoods" @select="onSelectGoods" />
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
import goods from "./components/goods.vue"
import album from "./components/album.vue"
import { storageDraft, getDraftDetail } from "./func"
enum State {
    Public = 1,
    Private = 2
}
enum Tp {
    Pic = 1,
    Video = 2
}
const ADD_PIC_VIDEO = "添加图片或视频"
const ADD_PIC = "添加图片"
const ADD_COVER = "添加封面"
interface CardForumRelease {
    title?: string;
    content?: string;
    cover: string;
    url: Array<string>;
    topicId?: Array<number>;
    goodCode?: string;
    voteTitle?: string;
    voteOptions?: Array<string>;
    state: State;
    tp: Tp;
    video_at?: number;
}
const formData: CardForumRelease = {
    title: "",
    content: "",
    cover: "",
    url: [],
    topicId: [],
    goodCode: "",
    voteTitle: "",
    voteOptions: [],
    state: 1,
    tp: 1
}
@Component({
    components: {
        votePop,
        topicsPop,
        ppp,
        goods,
        album
    }
})
export default class ClassName extends BaseNode {
    showVote: boolean = false
    showTopics: boolean = false
    showGoods: boolean = false
    imgUploadHeight: number = 0
    pics: Array<string> = []
    videoPath: string = ""
    formData: CardForumRelease = Object.assign({}, formData) as CardForumRelease
    relatedTopics: Array<CardForum.Topics> = []//关联话题
    selectTopics: Array<CardForum.Topics> = []//已选择的关联话题
    selectGoods: any = {
        cover: "",
        title: "",
        goodCode: ""
    }
    addText: string = ADD_PIC_VIDEO
    maxNum: number = 9
    draftId: string = "";
    albumList:any[] = [];
    onLoad(query: any) {
        this.reqTopics()
        if (query.topicId) this.reqTopicDetail(+query.topicId)
        if (query.draftId) {
            this.formData = getDraftDetail(query.draftId) as CardForumRelease
            // this.selectGoods = this.formData.selectGoods
            this.pics = [this.formData.cover, ...this.formData.url]
        }
        if(query.albumList){
            this.albumList = JSON.parse(query.albumList)
        }
    }
    public get albumRelease() : boolean {
        return this.albumList.length>0
    }
    onSelectTopic(item: CardForum.Topics) {
        const findIndex: number = this.selectTopics.findIndex((orgItem: any) => {
            return orgItem.id == item.id
        })
        if (findIndex >= 0) return
        const orgIndex: number = this.relatedTopics.findIndex((orgItem: any) => {
            return orgItem.id == item.id
        })
        if (orgIndex >= 0) {
            this.relatedTopics.splice(orgIndex, 1)
            item.formList = true
        }
        this.selectTopics.push(item)
    }
    delSelectTopic(item: any, index: number) {
        if (item.formList) {
            this.relatedTopics.unshift(item)
        }
        this.selectTopics.splice(index, 1)
    }
    onSelectGoods(item: any) {
        this.selectGoods.goodCode = item.goodCode
        this.selectGoods.cover = item.cover
        this.selectGoods.title = item.title
    }
    async addImage(keyName: string) {
        if (this.pics.length == 0) {
            // #ifdef APP-PLUS
            plus.nativeUI.actionSheet(
                {
                    cancel: "取消",
                    buttons: [{
                        title: "照片"
                    }, {
                        title: "视频"
                    }],
                },
                (e: any) => {
                    console.log(e);
                    if (e.index == 0) return
                    if (e.index === 1) this.choiceType(keyName, "img")
                    if (e.index === 2) this.choiceType(keyName, "video")
                }
            );
            // #endif
            // #ifndef APP-PLUS
            this.choiceType(keyName, "video")
            // #endif
        } else {
            if (this.addText === ADD_PIC) this.choiceType(keyName, "img")
            if (this.addText === ADD_COVER) this.choiceType(keyName, "videoCover")
        }

    }
    async choiceType(keyName: string, type: string) {
        try {
            const countMap: any = {
                "pics": 9,
                // "auditPics": 1
            }
            if (type == "img") {
                //@ts-ignore
                const COUNT: any = countMap[keyName] - this[keyName].length
                const picArr: any = await Upload.getInstance().uploadImgs(COUNT, "exhibition", ["album"])
                if (picArr) {
                    picArr.forEach((pic: any) => {
                        //@ts-ignore
                        this[keyName].push(pic)
                    });
                    this.addText = ADD_PIC
                    this.maxNum = 9
                    this.formData.tp = 1
                }
            } else if (type == "video") {

                const videoRes: any = await Upload.getInstance().uploadVideo("cardForumVideo")
                console.log(videoRes);

                this.formData.video_at = Math.floor(videoRes.duration)
                this.videoPath = decodeURIComponent(videoRes.path)
                this.formData.cover = encodeURIComponent(decodeURIComponent(videoRes.path) + `?x-oss-process=video/snapshot,t_1000,m_fast`)
                // console.log(this.formData.cover);
                this.formData.tp = 2
                this.pics = [this.formData.cover, this.formData.cover + `&isVideo=true`]
                this.maxNum = 2
            } else if (type == "videoCover") {
                const picArr: any = await Upload.getInstance().uploadImgs(1, "exhibition", ["album"])
                this.pics.unshift(picArr[0])
            }
        } catch (err) {
            uni.showToast({
                //@ts-ignore
                title: err.message,
                icon: "none"
            })
            console.log(err);

        }
    }
    delVideo() {
        this.videoPath = ""
        this.formData.video_at = 0
        // this.pics.splice(0, this.pics.length)
        this.maxNum = 9
        this.addText = ADD_PIC_VIDEO
        // console.log(this.pics);

    }
    delVideoCover() {
        this.formData.cover = ""
        this.addText = ADD_COVER
    }
    heightChange(height: number) {
        this.imgUploadHeight = height + 20
    }
    async onClickSaveDraft() {
        await this.assignFormData(false)
        await storageDraft(this.formData, "dynamic", "")
        uni.showModal({
            title: "提示",
            content: "已保存至草稿箱",
            success: (res: any) => {
                if (res.confirm) {
                    app.platform.pageBack()
                }
            }
        })
    }
    assignFormData(check?: boolean): Promise<any> {
        return new Promise((re, rj) => {
            if (check) {
                if (!this.pics.length) {
                    uni.showToast({
                        title: "至少上传一张图片或视频",
                        icon: "none"
                    })
                    rj()
                    return
                }
                if (this.formData.tp == 2 && this.pics.length < 2) {
                    uni.showToast({
                        title: "请上传视频或视频封面",
                        icon: "none"
                    })
                    rj()
                    return
                }
            }
            // console.log(this.pics);

            if (this.pics.length) this.formData.cover = this.pics[0]
            if (this.pics.length > 1) {
                if (this.formData.tp === 1) this.formData.url = this.pics.slice(1, this.pics.length)
                if (this.formData.tp === 2) this.formData.url = [encodeURIComponent(this.videoPath)]
            }
            this.formData.topicId = this.selectTopics.map((item: any) => {
                return item.id
            })
            if (this.selectGoods.goodCode) this.formData.goodCode = this.selectGoods.goodCode
            re && re(true)
        })
    }
    voteFinish(voteData: any) {
        console.log(voteData);
        this.formData.voteTitle = voteData.title
        this.formData.voteOptions = voteData.options.map((item: any) => {
            return item.label
        })
    }
    voteClear() {
        this.formData.voteTitle = ""
        this.formData.voteOptions = []
    }
    onClickState() {
        this.formData.state == 1 ? this.formData.state = 2 : this.formData.state = 1
        console.log(this.formData.state);

    }
    async onClickSubmit() {
        await this.assignFormData(!this.albumRelease)
        if(this.albumRelease){
            this.$refs.albumRelease.publish(this.formData)
            return;
        }
        app.http.Post("cardCircle/issue", this.formData, () => {
            uni.showModal({
                title: "提示",
                content: "发布成功",
                success: (res: any) => {
                    if (res.confirm) {
                        app.platform.pageBack()
                    }
                }
            })
        })
        // this.formData.url=
    }
    reqTopicDetail(id: number) {
        app.http.Get("dataApi/cardCircle/topic/detail/" + id, {}, (res: any) => {
            this.onSelectTopic({ ...res.data, id })
        })
    }
    reqTopics() {
        app.http.Get("dataApi/cardCircle/topic/list", { fetchFrom: 1, fetchSize: 15, od: "issue_72:desc" }, (res: any) => {
            this.relatedTopics = res.list || []
        })
        // this.relatedTopics = [
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
    pointer-events: none;
    width: 750rpx;
}

.input_title {
    width: 100%;
    font-size: 29rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #3F3F3F;
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
    font-size: 26rpx;
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

    .voteTitle {
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #959695;
        margin-right: 6rpx;
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
            // background: #FA1545;
            border-radius: 1rpx;
            margin-right: 12rpx;
        }

        .goodsInfo {
            font-size: 22rpx;
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
    background-color: #000000;

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

.topicWrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 750rpx;
    margin-top: 10rpx;
    box-sizing: border-box;
    padding: 0 20rpx;

    .glTopic {
        color: #ff003d;
        font-size: 32rpx;
        font-weight: bold;
        font-family: PingFang SC;
        margin-right: 8rpx;
        margin-bottom: 4rpx;
    }
}

.privateContainer {
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 20rpx;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: row;
    display: flex;
    margin-top: 30rpx;

    .radio {
        width: 23rpx;
        height: 23rpx;
        border: 2rpx solid #C0C0C0;
        border-radius: 50%;
        margin-right: 11rpx;
    }

    .radio_check {
        width: 25rpx;
        height: 25rpx;
        background-size: 100% 100%;
        background-image: url("@/static/cardForum/redCheck.png");
        margin-right: 11rpx;
        // border: 2rpx solid rgba(0, 0, 0, 0);
    }

    .private_text {
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #C0C0C0;
    }
}
</style>
