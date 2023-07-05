<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-12 16:06:41
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-07-05 14:04:29
 * @FilePath: \jichao_app_2\src\pages\cardForum\release.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content insetBottom">
        <cover-view style="width:750rpx;backgroundColor:#000000;position: fixed;
        top: 0;z-index:9" :style="{ height: navHeight + 'px' }">
            <!-- <navigationbar backgroundColor="#000000" borderBottom="none" backColor="#fff" style="z-index: 99999;">
            </navigationbar> -->
            <cover-view :style="{ height: app.statusBarHeight + 'px' }"></cover-view>
            <cover-view class="tabHeader"
                style="width:750rpx;height:88rpx;display: flex;align-items: center;flex-direction: row;">
                <cover-view :style="{ color: '#fff' }" @click="app.platform.pageBack()">
                    <cover-image style="width: 19rpx;height: 35rpx;margin-left: 30rpx;"
                        src="@/static/index/v3/back.png"></cover-image>
                </cover-view>
            </cover-view>
        </cover-view>
        <view :style="{ height: navHeight + 'px' }"></view>
        <publish v-if="albumRelease" ref="albumRelease" :albumList.sync="albumList" @albumEditDetail="albumEditDetail" />
        <view v-else class="pushContainer" :style="{ height: imgUploadHeight + 'px' }">
            <ppp v-if="showPPP" :type="formData.tp" :number="maxNum" :addText="addText" v-model="pics"
                @heightChange="heightChange" @addImage="addImage('pics')" @delVideo="delVideo" />
        </view>
        <input type="text" class="input_title" v-model.trim="formData.title" placeholder="添加一个有趣的标题吧~（选填）"
            placeholderStyle="color: #959695;font-size:29rpx" :maxlength="80">
        <view class="topicWrap" v-if="selectTopics.length">
            <view class="glTopic" v-for="(item, index) in selectTopics" :key="index" @click="delSelectTopic(item, index)">
                {{ item.name }}
            </view>
        </view>
        <textarea placeholderStyle="color: #959695;font-size:23rpx" v-model.trim="formData.content" :maxlength="3000"
            height="326rpx" class="input_content" placeholder="分享一下您的球星卡收藏..（选填)"></textarea>
        <view class="associationWrap" @click="showTopics = true">
            <image class="ass_img" src="@/static/cardForum/release/topic.png" style="width: 30rpx;height:30rpx"></image>
            <view class="ass_title">关联话题</view>
            <view class="flex1"></view>
            <view class="ass_right"></view>
        </view>
        <scroll-view scroll-x="true" :show-scrollbar="false" class="topicScroll"
            v-if="relatedTopics && relatedTopics.length">
            <view class="topicScrollWrap">
                <view class="topicItem flexCenter" @click="onSelectTopic(item)" v-for="(item, index) in relatedTopics"
                    :key="index">
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
        <view class="associationWrap" @click="onClickVote" style="border-bottom: 1rpx solid #3F3F3F;padding-bottom: 30rpx;">
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
                <view class="submit flexCenter" @click="onClickSubmit">{{ code ? "保存" : "发布" }}动态</view>
            </view>
            <view class="bottomSafeArea"></view>
        </view>
        <votePop :show.sync="showVote" @finish="voteFinish" @clear="voteClear" />
        <topicsPop :show.sync="showTopics" @select="onSelectTopic" />
        <goods :show.sync="showGoods" @select="onSelectGoods" />
        <view class="bottomSafeArea" style="height:180rpx"></view>
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
import publish from "./components/album/publish.vue"
import { storageDraft, getDraftList, getDraftDetail, getVideoPath, delDraftDetail } from "./func"
enum State {
    Public = 1,
    Private = 2
}
enum Tp {
    Pic = 1,
    Video = 2,
    Album = 3
}
const ADD_PIC_VIDEO = "添加图片或视频"
const ADD_PIC = "添加图片"
const ADD_COVER = "添加封面"
const navHeight: any = app.statusBarHeight + uni.upx2px(88)
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
    localVideo?: boolean
    topicArr?: any
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
    topicArr: [],
    state: 1,
    tp: 1,
    localVideo: true
}
@Component({
    components: {
        votePop,
        topicsPop,
        ppp,
        goods,
        publish
    }
})
export default class ClassName extends BaseNode {
    app = app
    navHeight = navHeight
    showPPP: boolean = true
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
    draftId: string = ""
    albumList: any[] = [];
    code: string = ""
    tempVideoFile: any = {}
    isTempVideo: boolean = false//是否是临时video路径(未将视频保存至本地)
    oldTopicIds: Array<number> = []
    userId: number = 0
    onLoad(query: any) {
        // Upload.getInstance().uploadImgByNetWork("https://ka-world.oss-cn-shanghai.aliyuncs.com/video/app/cardForumVideo1687854408286baf13u4coq.mp4?x-oss-process=video/snapshot,t_1000,m_fast").then((path:any)=>{
        //     console.log(path);

        // })
        app.platform.hasLoginToken(() => {
            app.user.getUserInfo().then((userInfo: any) => {
                this.eventAlbum();
                this.userId = userInfo.userId
                this.reqTopics()
                if (query.code) {
                    this.code = query.code
                    this.getDetail()
                    return
                }
                if (query.topicId) this.reqTopicDetail(+query.topicId)
                if (query.draftId) {
                    this.draftId = query.draftId
                    this.processDrafts()

                }
                if (query.albumList) {
                    this.albumList = JSON.parse(query.albumList)
                }
                uni.$on("cardForumDelVideo", this.cardForumDelVideo)
            })
        })

    }
    public get albumRelease(): boolean {
        return this.albumList.length > 0 || this.formData.tp == 3
    }
    eventAlbum() {
        uni.$on("editAlbum", (res: any) => this.albumList = res)
    }
    albumEditDetail(data: any) {
        this.formData.title = data.title;
        this.formData.content = data.description;
        this.setSelectTopics(data.topic);
        if(data.good) this.selectGoods = data.good;
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
        if (this.selectTopics.length >= 15) {
            uni.showToast({
                title: "最多关联15条话题",
                icon: "none"
            })
            return
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
    cardForumDelVideo() {
        console.log("删除video");
        this.showPPP = false
        this.resetByInitial()
        this.pics = []
        setTimeout(() => {
            this.showPPP = true
        }, 300)
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
                const picArr: any = await Upload.getInstance().uploadImgs(COUNT, "cardForumPic/", ["album"])
                if (picArr) {
                    picArr.forEach((pic: any) => {
                        //@ts-ignore
                        this[keyName].push(pic)
                    });
                    this.addText = ADD_PIC
                    this.maxNum = 9
                    this.formData.tp = Tp.Pic
                    this.formData.localVideo = false
                    this.isTempVideo = false
                }
            } else if (type == "video") {

                if (app.platform.systemInfo.platform == "android") {
                    plus.gallery.pick((res: any) => {
                        console.log("res", res);
                        uni.getVideoInfo({
                            src: res.files[0],
                            success: (data: any) => {
                                console.log("视频信息", data);
                                if (data.size >= 300 * 1024) {
                                    uni.showLoading({
                                        title: "视频处理中",
                                        mask: true
                                    })
                                    uni.compressVideo({
                                        src: res.files[0],
                                        quality: "high",
                                        success: (qua: any) => {
                                            console.log("压缩后的", qua);
                                            this.tempVideoFile = { ...data, ...qua }
                                            this.videoPath = qua.tempFilePath
                                            this.formData.video_at = Math.floor(data.duration)
                                            this.formData.tp = Tp.Video
                                            this.pics = [qua.tempFilePath]
                                            this.addText = ADD_COVER
                                            this.maxNum = 2
                                            this.formData.localVideo = true
                                            this.isTempVideo = true
                                        },
                                        complete: (fin: any) => {
                                            console.log("压缩结束", fin);
                                            uni.hideLoading()
                                        },
                                        fail: (err: any) => {
                                            console.log("压缩错误信息", err);

                                        }
                                    })
                                } else {
                                    this.tempVideoFile = data
                                    this.videoPath = res.files[0]
                                    this.formData.video_at = Math.floor(data.duration)
                                    this.formData.tp = Tp.Video
                                    this.pics = [res.files[0]]
                                    this.addText = ADD_COVER
                                    this.maxNum = 2
                                    this.formData.localVideo = true
                                    this.isTempVideo = true
                                }

                            }
                        })
                    }, (err: any) => {

                    }, {
                        filter: "video",
                        multiple: true,
                        maximum: 1
                    })
                    return
                }
                const tempVideo: any = await Upload.getInstance().getVideoTempFile()
                console.log(tempVideo);
                if (tempVideo.errCode) return
                this.tempVideoFile = tempVideo
                this.videoPath = tempVideo.tempFilePath
                this.formData.video_at = Math.floor(tempVideo.duration)
                this.formData.tp = Tp.Video
                this.pics = [tempVideo.tempFilePath]
                this.addText = ADD_COVER
                this.maxNum = 2
                this.formData.localVideo = true
                this.isTempVideo = true
                return
                const videoRes: any = await Upload.getInstance().uploadVideo("cardForumVideo/")
                console.log(videoRes);

                this.formData.video_at = Math.floor(videoRes.duration)
                this.videoPath = decodeURIComponent(videoRes.path)
                this.formData.cover = encodeURIComponent(decodeURIComponent(videoRes.path) + `?x-oss-process=video/snapshot,t_1000,m_fast`)
                // console.log(this.formData.cover); 
                this.formData.tp = Tp.Video
                this.pics = [this.formData.cover, this.formData.cover + `&isVideo=true`]
                this.maxNum = 2
            } else if (type == "videoCover") {
                const picArr: any = await Upload.getInstance().uploadImgs(1, "cardForumPic/", ["album"])
                console.log(picArr);

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
    onClickVote() {
        if (this.code) {
            uni.showToast({
                title: "投票不允许修改",
                icon: "none"
            })
            return
        }
        this.showVote = true
    }
    delVideo() {
        this.showPPP = false
        setTimeout(() => {
            this.showPPP = true
        }, 100)
        // this.videoPath = ""
        // this.formData.video_at = 0
        // // this.pics.splice(0, this.pics.length)
        // this.maxNum = 9
        // this.addText = ADD_PIC_VIDEO
        // // console.log(this.pics);

    }
    // delVideoCover() {
    //     this.formData.cover = ""
    //     this.addText = ADD_COVER
    // }
    heightChange(height: number) {
        this.imgUploadHeight = height + 20
    }
    getDetail() {
        app.http.Get(`cardCircle/me/detail/${this.code}`, {}, (res: any) => {
            console.log(res);
            this.formData.title = res.data.title
            this.formData.content = res.data.content
            this.formData.tp = res.data.tp
            this.selectGoods = res.data.good;
            if (this.albumRelease) {
                this.$nextTick(() => {
                    //@ts-ignore
                    this.$refs.albumRelease.prepareEdit(this.code)
                })
            } else if (this.formData.tp == Tp.Video) {
                this.videoPath = getVideoPath(res.data.url)
                this.formData.video_at = res.data.video_at || 0
                this.maxNum = 2
                this.addText = ADD_COVER
            } else {

                this.maxNum = 9
                this.addText = ADD_PIC
            }
            this.pics = res.data.url.split(",").map((item: any) => {
                return item
            })
            this.formData.state = res.data.state
            this.formData.voteTitle = res.data.vote.voteTitle || ""
            this.setSelectTopics(res.data.topic)
            // this.formData.vote=res.data.vote
        })
    }
    setSelectTopics(topic: any) {
        this.selectTopics = (topic || []).map((item: any) => {
            this.oldTopicIds.push(item.topicId)
            return {
                id: item.topicId,
                name: item.topicName,
                isActivity: item.activity
            }
        })
    }
    async onClickSaveDraft() {
        try {
            if (this.formData.localVideo && this.formData.tp == Tp.Video) {
                if (this.isTempVideo) {
                    const tempFilePath: string = getVideoPath(this.pics.join(",")) //临时路径,app关闭后消失
                    const savedFilePath: any = await this.saveVideo(tempFilePath)
                    this.pics[this.pics.length - 1] = savedFilePath //保存至app文件目录下不可见的本地视频缓存路径//保存至app文件目录下不可见的本地视频缓存路径
                    this.videoPath = savedFilePath
                }
            }
            await this.assignFormData(false)
            const Draft = {
                ...this.formData,
                list: this.albumList,
                selectTopics: this.selectTopics
            }
            await storageDraft(Draft, this.albumRelease ? "cardBook" : "dynamic", this.draftId || "")
            uni.showModal({
                title: "提示",
                content: "已保存至草稿箱",
                showCancel: false,
                success: (res: any) => {
                    if (res.confirm) {
                        app.platform.pageBack()
                    }
                }
            })
        } catch (err) {

        }
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
                // if (this.formData.tp == Tp.Video && this.pics.length < 2) {
                //     uni.showToast({
                //         title: "请上传视频或视频封面",
                //         icon: "none"
                //     })
                //     rj()
                //     return
                // }
            }
            if (this.pics.length && !getVideoPath(this.pics[0])) this.formData.cover = this.pics[0]
            if (this.pics.length == 1 && getVideoPath(this.pics[0])) this.formData.url = [encodeURIComponent(this.videoPath)]
            if (this.pics.length > 1) {
                if (this.formData.tp === Tp.Pic) this.formData.url = this.pics.slice(1, this.pics.length)
                if (this.formData.tp === Tp.Video) this.formData.url = [encodeURIComponent(this.videoPath)]
            }
            this.formData.topicId = this.selectTopics.map((item: any) => {
                return item.id
            })
            if (this.selectGoods.goodCode) this.formData.goodCode = this.selectGoods.goodCode
            console.log("this.formData", this.formData);

            re && re(true)
        })
    }
    saveVideo(tempFilePath: string) {
        return new Promise((re, rj) => {
            // #ifdef APP-PLUS
            uni.saveFile({
                tempFilePath: tempFilePath,
                success: (res: any) => {
                    re(res.savedFilePath)

                },
                fail: (err: any) => {
                    rj(err)
                }
            })
            // #endif
            // #ifdef H5
            re(tempFilePath)
            // #endif
        })
    }
    voteFinish(voteData: any) {
        // console.log(voteData);
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
        this.formData.state == State.Public ? this.formData.state = State.Private : this.formData.state = State.Public
        console.log(this.formData.state);

    }
    processDrafts() {
        const data = getDraftDetail(this.draftId, this.userId) as any
        if (!Object.keys(data).length) return
        this.formData = data
        this.selectTopics = data.selectTopics || []
        console.log("草稿的内容", this.formData);
        // this.selectGoods = this.formData.selectGoods
        this.pics = [this.formData.cover, ...this.formData.url].filter(Boolean)
        if (this.formData.tp == Tp.Video && this.formData.localVideo) {
            const videoPath: string = getVideoPath(decodeURIComponent(this.pics.join(",")))
            if (videoPath) {
                //寻找本地保存的视频是否还存在
                uni.getSavedFileList({
                    success: (res: any) => {
                        console.log(res, videoPath);
                        const findItem: any = res.fileList.find((item: any) => {
                            return item.filePath === videoPath
                        })
                        //不存在了
                        if (!findItem || !findItem.filePath) {
                            this.resetByInitial()
                            uni.showModal({
                                title: "提示",
                                content: "草稿中的视频已失效,请重新上传",
                                showCancel: false
                            })
                        } else {
                            //存在
                            // if(this.formData.c)
                            this.resetByVideo()
                            this.videoPath = findItem.filePath
                            this.isTempVideo = true
                        }
                    }
                })
            }
        }
    }
    delDraftDetailAction() {
        //删除草稿
        delDraftDetail(this.draftId, this.userId)
        //删除本地文件视频
        if (this.formData.tp == Tp.Video && this.formData.localVideo) {
            uni.removeSavedFile({
                filePath: this.videoPath
            })
        }
    }
    resetByPic() {
        this.formData.tp = Tp.Pic
        this.isTempVideo = false
        this.maxNum = 9
        this.addText = ADD_PIC
    }
    resetByVideo() {
        this.formData.tp = Tp.Video
        this.maxNum = 2
        this.addText = ADD_COVER
    }
    resetByInitial() {
        this.resetByPic()
        this.addText = ADD_PIC_VIDEO
        this.formData.localVideo = false
        this.pics = []
    }
    async onClickSubmit() {
        try {
            // await this.assignFormData(true)
            uni.showLoading({
                title: ""
            })
            await this.assignFormData(!this.albumRelease)
            if (this.albumRelease) {
                //@ts-ignore
                this.$refs.albumRelease.publish(this.formData)
                return;
            }
            if (this.formData.tp == Tp.Video && this.formData.localVideo) {
                if (this.isTempVideo) {
                    //临时的视频路径(上传至阿里云)
                    const videoPath: any = await Upload.getInstance().uploadTempFile(this.videoPath, "cardForumVideo/", "video", this.tempVideoFile.name || "video.mp4")
                    console.log("上传到阿里云的视频路径:", videoPath);
                    if (!this.formData.cover) {
                        //截帧
                        // const cover: string = decodeURIComponent(videoPath) + "?x-oss-process=video/snapshot,t_1000,m_fast"
                        // console.log("截帧图片地址", cover);

                        // //截帧后的图片上传oss
                        // const coverPath: any = await Upload.getInstance().uploadTempFile(cover, "cardForumVideoCover/", "images", `${Math.round(+new Date() / 1000)}cover.jpg`)
                        // console.log("截帧图片oss地址", coverPath);

                        this.formData.cover = encodeURIComponent(decodeURIComponent(videoPath) + "?x-oss-process=video/snapshot,t_1000,m_fast")
                    }
                    // #ifdef H5
                    if (this.formData.cover.indexOf("blob:http") >= 0) {
                        this.formData.cover = encodeURIComponent(decodeURIComponent(videoPath) + "?x-oss-process=video/snapshot,t_1000,m_fast")
                    }
                    // #endif
                    this.formData.url = [videoPath]
                }
            }
            if (this.code && this.selectTopics.length) {
                let topicArr: any = []
                topicArr = this.selectTopics.map((item: any) => {
                    return {
                        topicId: item.id,
                        isNew: this.oldTopicIds.includes(item.id)
                    }
                })
                this.formData.topicArr = topicArr
            }
            console.log("最终的表单", this.formData);
            const url = this.code ? `cardCircle/edit/${this.code}` : `cardCircle/issue`
            app.http.Post(url, this.formData, () => {
                uni.hideLoading()
                if (this.code) uni.$emit("editCardForum", { code: this.code, formData: this.formData })
                uni.showModal({
                    title: "提示",
                    content: `${this.code ? '编辑' : '发布'}成功`,
                    showCancel: false,
                    success: (res: any) => {
                        if (res.confirm) {
                            if (this.draftId) this.delDraftDetailAction()
                            app.platform.pageBack()
                        }
                    }
                })
            }, (err: any) => {
                //发布失败
                // this.videoPath=
                // if (this.formData.tp == Tp.Video) {
                //     this.pics = [this.formData.cover, ...this.formData.url]
                //     this.formData.localVideo = false
                //     this.isTempVideo = false
                //     this.onClickSaveDraft()
                // }
                //发布失败保存至草稿箱
                uni.hideLoading()
                this.formData.localVideo = false
                this.isTempVideo = false
                console.log("保存的草稿箱data", this.formData);
                storageDraft(this.formData, "dynamic", this.draftId || "").then(() => {
                    uni.showModal({
                        title: '提示',
                        content: `发布失败:${err},已保存至草稿箱`,
                        showCancel: false,
                        success: (res: any) => {
                            if (res.confirm) {
                                app.platform.pageBack()
                            }
                        }
                    })
                })


            })
        } catch (err) {
            console.log("错误错误错误", err);

            uni.hideLoading()
        }
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
.insetBottom{
    padding-bottom: calc(159rpx + env(safe-area-inset-bottom));
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

.icon-back {
    position: absolute;
    left: 18rpx;
    top: 50%;
    margin-top: -25rpx;
    width: 50rpx;
    height: 50rpx;
    // background-color: rgba(255, 255, 255, 0);
    font-family: uniicons;
    font-size: 46rpx;
    font-weight: normal;
    font-style: normal;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: red;
}
</style>
