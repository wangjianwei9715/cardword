<template>
    <view class="content">
        <view class="title">请选择举报类型</view>
        <view class="reportReasonWrap">
            <view class="reportReason flexCenter" :class="{ reportReason_select: (formData.tpBit & +bit) === +bit }"
                v-for="(v, bit) in reportReasonMap" @click="onClickReason(bit)">
                {{ v }}
            </view>
        </view>
        <view class="title" style="margin-top: 20rpx;">举报描述（选填）</view>
        <view class="txtArea">
            <u-textarea confirmType="done" placeholder="提供更多信息助于处理~" style="background-color: #F5F5F5;"
                v-model="formData.reason" class="input" height="332rpx" count :maxlength="200"></u-textarea>
        </view>
        <view class="title">举证图片（选填）</view>
        <view class="imageContainer">
            <image class="imageWrap flexCenter" v-for="(item) in formData.pic" :src="decodeURIComponent(item)"></image>
            <view class="imageWrap imageWrap_add flexCenter" @click="addImage" v-if="formData.pic.length <= 2"></view>
        </view>
        <view class="fixedWrap">
            <view class="contentWrap">
                <view class="submit flexCenter" @click="submit">提交</view>
            </view>
            <view class="bottomSafeArea"></view>
        </view>

    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { Report, reportAction } from "./func"
import Upload from "@/tools/upload"
type ReportReasonMap = {
    [key: number]: string;
};

const reportReasonMap: ReportReasonMap = {
    2: "违法违规",
    4: "疑似赌博",
    8: "色情低俗",
    16: "诈骗信息",
    32: "虚假不实",
    64: "谩骂引战",
    128: "危险行为",
    256: "未成年保护",
    512: "侵权投诉",
    1024: "假卡/假货",
    2048: "广告营销",
    4096: "引人不适",
    8192: "政治相关",
    1: "其他"
}
@Component({})
export default class ClassName extends BaseNode {
    code: string = ""
    reportReasonMap = reportReasonMap
    formData: Report = {
        byInformer: 0,
        source: 1,
        reason: "",
        pic: [],
        tpBit: 0,
        dtCode: ""
    }
    onLoad(query: any) {
        if (query.code) {
            this.code = query.code;
            this.formData.dtCode = query.code
        }
        query.source && (this.formData.source = +query.source)
        query.byInformer && (this.formData.byInformer = +query.byInformer)
    }
    onClickReason(bit: number): void {
        this.formData.tpBit ^= +bit
    }
    async addImage() {
        const picArr: any = await Upload.getInstance().uploadImgs(3 - this.formData.pic.length, "cardForumReport/", ["album"])
        this.formData.pic.push(...picArr)
    }
    submit() {
        reportAction(this.formData).then((res: Boolean) => {
            uni.showModal({
                title: "提示",
                content: "感谢您的举报反馈",
                showCancel:false,
                success: (res: any) => {
                    if (res.confirm) {
                        app.platform.pageBack()
                    }
                }
            })
        })
    }

}
</script>

<style lang="scss">
.content {
    width: 750rpx;
    box-sizing: border-box;
}

.title {
    margin-top: 10rpx;
    width: inherit;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    box-sizing: border-box;
    padding: 0 20rpx;
    margin-bottom: 20rpx;
}

.reportReasonWrap {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    width: inherit;
    padding: 0 20rpx;
    justify-content: space-between;

    .reportReason {
        width: 351rpx;
        height: 69rpx;
        background: #F5F5F5;
        border-radius: 3rpx;
        margin-bottom: 10rpx;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #707070;
    }

    .reportReason_select {
        background: #FFE8E8;
        color: #FA1545;
    }
}

.input {
    // background-color: #fcfcfc;
    // background-color: #F5F5F5;
    height: 332rpx;
    width: 711rpx;
    // width: 690rpx;
    // margin-top: 20rpx;
    box-sizing: border-box;
    padding: 20rpx;
    font-size: 25rpx;
    border: 0;
    // .u-textarea__count{
    //     background-color: inherit;
    // }
}

.fixedWrap {
    background-color: #fff;
    position: fixed;
    z-index: 999;
    bottom: 0;

    .contentWrap {
        width: 750rpx;
        // height: 260rpx;
        box-sizing: border-box;
        padding: 0 20rpx;
        padding-bottom: 30rpx;
    }

    .userInfoWrap {
        display: flex;
        align-items: center;
        // padding: 0rpx 20rpx;
        padding-top: 40rpx;

        // margin-top: 40rpx;
        .avatar {
            width: 50rpx;
            height: 50rpx;
            border-radius: 50%;
        }

        .userName {
            color: #000;
        }

        .userId {
            color: #b7b7b7;
        }

        .flex1 {
            flex: 1;
        }

        .bigNum {
            font-weight: bold;
        }
    }

    .submit {
        width: 100%;
        background-color: #fb374e;
        color: #fff;
        font-weight: bold;
        margin-top: 20rpx;
        height: 80rpx;
    }

    .tips {
        text-align: center;
        color: #b7b7b7;
        font-size: 24rpx;
        margin-top: 10rpx;
    }
}

.imageContainer {
    display: flex;
    flex-wrap: wrap;
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 20rpx;
}

.imageWrap {
    width: 129rpx;
    height: 129rpx;
    margin-right: 10rpx;
    position: relative;
}

.imageWrap_add {

    border: 2rpx dashed #E6E6E6;
}

.imageWrap_add::after {
    content: "";
    width: 43rpx;
    height: 43rpx;
    background-size: 100% 100%;
    background-image: url("@/static/cardForum/addImage.png");
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
</style>
