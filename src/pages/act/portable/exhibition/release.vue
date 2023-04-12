<template>
    <view class="content">
        <template v-if="!isSubmitSuccess">
            <transitionNav ref='transitionNav' :needIconShadow="false" title="上传" />
            <view style="height:88rpx" :style="{ paddingTop: app.statusBarHeight + 'px' }"></view>
            <view class="pushContainer">
                <view class="title">选择图片(第一张为封面)</view>
                <shmilyDragImage @addImage="addImage('pics')" style="position: relative;right: 4rpx;" :cols="4" :number="6"
                    v-model="pics" />
                <view class="tips">拖动图片以选择封面</view>
                <view class="title" style="margin-top: 40rpx;">是否为手提系列</view>
                <view class="tagContainer">
                    <view class="tag flexCenter" :class="{ tag_select: formData.cornerMarkTp == 1 }"
                        @click="formData.cornerMarkTp = 1">是</view>
                    <view class="tag flexCenter" :class="{ tag_select: formData.cornerMarkTp == 0 }"
                        @click="formData.cornerMarkTp = 0">否</view>
                </view>
                <view class="tips red">*卡片若为手提系列可参与额外奖项评选</view>
                <view class="title" style="margin-top: 40rpx;">审核图片上传（本人收藏需要）</view>
                <shmilyDragImage @addImage="addImage('auditPics')" style="position: relative;right: 4rpx;" :cols="4"
                    :number="1" v-model="auditPics" />
                <view class="tips">请上传卡片与账户id合拍照片</view>
                <view class="title" style="margin-top: 40rpx;">编辑标题和内容</view>
                <input type="text" class="input" placeholder="想一个标题吧" v-model="formData.title">
                <textarea class="textarea" placeholder="输入内容" :maxlength="-1" v-model="formData.content" />


            </view>
            <view class="bottomSafe"></view>
            <view class="submit flexCenter" :class="{ submit_can: canSubmit }" @click="submit">
                <view class="bingo"></view>
                <view class="title">提交审核</view>
            </view>
        </template>
        <template v-if="isSubmitSuccess">
            <u-icon size="280rpx" color="#FA1545" style="margin-top: 280rpx;" name="checkmark-circle-fill"></u-icon>
            <view class="successTips">作品内容已提交审核</view>
            <view class="successTips">页面将在{{ countDown }}s后关闭</view>
            <view class="jumpButton flexCenter" @click="goToActIndex">跳转至活动首页</view>
        </template>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import shmilyDragImage from "@/components/shmily-drag-image/shmily-drag-image.vue"
import ossUtils from "@/tools/ossUtils";
import Upload from "@/tools/upload"
@Component({
    components: {
        shmilyDragImage
    }
})
export default class ClassName extends BaseNode {
    id: any = null
    pics: any = []//内容图
    auditPics: any = []//审核图
    isSubmitSuccess: boolean = false
    app = app
    formData: any = {
        cover: "",//封面图
        url: [],//
        cornerMarkTp: null,//是否手提系列，1 手提系列
        title: "",
        content: ""
    }
    timer: any = null
    countDown: number = 5
    // ossutils = ossUtils.getInstance();
    onLoad(query: any) {
        if (query.id) {
            this.id = +query.id
            this.getDetail()
        }
    }
    onUnload() {
        this.timer && clearInterval(this.timer)
    }
    onPageScroll(data: any) {
        //@ts-ignore
        this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
    }
    public get canSubmit() {
        const values: any = [this.formData.title, this.formData.content].filter(Boolean)
        return values.length == 2 && this.formData.cornerMarkTp != null && this.pics.length && this.auditPics.length
    }
    async addImage(keyName: string) {
        const countMap: any = {
            "pics": 6,
            "auditPics": 1
        }
        //@ts-ignore
        const COUNT: any = countMap[keyName] - this[keyName].length
        const picArr: any = await Upload.getInstance().uploadImgs(COUNT, "exhibition", ["album"])
        if (picArr){
            picArr.forEach((pic: any) => {
            //@ts-ignore
            this[keyName].push(pic)
        });
        }
        

    }
    startTimer() {
        this.timer && clearInterval(this.timer)
        this.timer = setInterval(() => {
            const shouldVal = this.countDown - 1
            if (shouldVal <= 0) {
                clearInterval(this.timer)
                this.goToActIndex()
                return
            }
            this.countDown--
        }, 1000)
    }
    goToActIndex() {
        app.platform.pageBack(this.id?2:1)
        if(this.id){
            uni.$emit("refreshMyWorks")
        }
    }
    submit() {
        if (!this.canSubmit) return
        this.formData.cover = this.pics[0] || ""
        this.formData.url = this.pics
        this.formData.collect = this.auditPics[0]
        this.id ? this.edit() : this.issue()
    }
    issue() {
        app.http.Post("portableCard/works/issue", this.formData, () => {
            this.isSubmitSuccess = true
            this.startTimer()
        }, () => {
            app.platform.UINotificationFeedBack("error")
        })
    }
    edit() {
        app.http.Post("portableCard/works/edit/" + this.id, this.formData, () => {
            this.isSubmitSuccess = true
            this.startTimer()
        }, () => {
            app.platform.UINotificationFeedBack("error")
        })
    }
    getDetail() {
        app.http.Get(`dataApi/portableCard/works/detail/` + this.id, { view: 0 }, (res: any) => {
            this.formData = res.data
            this.pics = res.data.url.split(",").filter(Boolean)
            this.auditPics = [res.data.collect]
        })
    }
    // reqNewData(cb?: any) {
    //     app.http.Get(`dataApi`, {}, (res: any) => {

    //     })
    // }

}
</script>

<style lang="scss">
page {
    background-color: #1a3439;
}

.title {
    font-size: 27rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    letter-spacing: 2rpx;
    margin-bottom: 12rpx;

}

.tips {
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #949494;
}

.red {
    color: #FA1545;
}

.pushContainer {
    padding: 0 24rpx;
    box-sizing: border-box;
    width: 750rpx;
}

.tagContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;
}

.tag {
    width: 321rpx;
    height: 55rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
}

.tag_select {
    background: #FA1545;
    color: #fff;
}

.input {
    width: 392rpx;
    height: 53rpx;
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 3rpx;
    font-size: 23rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    padding: 0 20rpx;
    margin-bottom: 15rpx;
}

.textarea {
    width: 710rpx;
    height: 468rpx;
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 3rpx;
    font-size: 23rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    padding: 20rpx;
}
.bottomSafe{
    height: 140rpx;
    opacity: 0;
    width: 750rpx;
}
.submit {
    width: 750rpx;
    height: 120rpx;
    background: #A7A7A7;
    position: fixed;
    bottom: 0;
    left: 0;

    .bingo {
        background-size: 100% 100%;
        background-image: url("@/static/act/portable/bingo.png");
        width: 42rpx;
        height: 42rpx;
        margin-right: 17rpx;
        position: relative;
        bottom: 4rpx;
    }

    .title {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
        letter-spacing: 2rpx;
    }
}

.submit_can {
    background: #FA1545;
}

.successTips {
    font-size: 33rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    letter-spacing: 2rpx;
    margin-top: 20rpx;
}

.jumpButton {
    width: 670rpx;
    height: 100rpx;
    background: #FA1545;
    font-size: 33rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    margin-top: 120rpx;
}
</style>
