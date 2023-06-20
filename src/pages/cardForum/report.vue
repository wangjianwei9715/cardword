<template>
    <view class="content">
        <view class="title">请选择举报类型</view>
        <view class="reportReasonWrap">
            <view class="reportReason flexCenter" :class="{ reportReason_select: (formData.tpBit & +bit) === +bit }"
                v-for="(v, bit) in reportReasonMap" @click="onClickReason(bit)">
                {{ v }}
            </view>
        </view>
        <view class="title">举报描述（选填）</view>
        <view class="txtArea">
            <u-textarea confirmType="done" v-model="formData.reason" class="input" count maxlength="200"></u-textarea>
        </view>
        <view class="title">举证图片（选填）</view>
        <view class="fixedWrap">
            <view class="contentWrap">
                <view class="submit flexCenter" @click="submit">提交</view>
                <!-- <view class="tips">表达赞赏/认同/鼓励，赠送后发放至作者账户且不可退回</view> -->
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
        tpBit: 0
    }
    onLoad(query: any) {
        query.code && (this.code = query.code)
        query.source && (this.formData.source += query.source)
    }
    onClickReason(bit: number): void {
        this.formData.tpBit ^= +bit
    }
    submit() {
        reportAction(this.formData).then((res: Boolean) => {
            uni.showToast({
                title: "举报成功",
                icon: "none"
            })
            app.platform.pageBack()
        })
    }
    reqNewData(cb?: any): void {
        app.http.Get(`dataApi`, {}, (res: any) => {

        })
    }

}
</script>

<style lang="scss">
.reportReasonWrap {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0 40rpx;
    justify-content: space-between;

    .reportReason {
        width: 300rpx;
        margin-top: 20rpx;
        height: 100rpx;
        color: #7f7f7f;
        background-color: #fcfcfc;
    }

    .reportReason_select {
        background-color: rgba(251, 55, 78, .3);
        color: #fb374e;
    }
}

.input {
    background-color: #fcfcfc;
    height: 300rpx;
    width: 690rpx;
    margin-top: 20rpx;
    box-sizing: border-box;
    padding: 20rpx;
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
</style>
