<template>
    <view class="content">
        <view class="reject_col uni-flex" style="margin-top: 40rpx;">
            <view class="label bold">驳回原因 :</view>
            <view class="value bold red">{{ rejectData.reject }}</view>
        </view>
        <view class="reject_col uni-flex">
            <view class="label">补充系列 :</view>
            <view class="value">{{ rejectData.serie }}</view>
        </view>
        <view class="reject_col uni-flex">
            <view class="label">补充球员 :</view>
            <view class="value">{{ noData.player }}</view>
        </view>
        <view class="reject_col uni-flex">
            <view class="label">卡种详情 :</view>
            <view class="value u-line-2">
                {{ noData.split ? `${noData.seqIndex}/` : '' }}{{ noData.seq == 0 ? "无限" : noData.seq }}编，{{ noData.cardSet
                }}</view>
        </view>
        <view class="reject_col uni-flex" style="margin-top: 40rpx;">
            <view class="label bold">图片详情 :</view>
        </view>
        <image class="rejectImg" mode="widthFix" style="margin-bottom: 30rpx;" v-if="rejectData.frontPic"
            :src="$parsePic(rejectData.frontPic)"></image>
        <image class="rejectImg" mode="widthFix" v-if="rejectData.backPic" :src="$parsePic(rejectData.backPic)"></image>
        <view class="fake" style="height: 110rpx;opacity: 0;"></view>
        <view class="bottomBtn flexCenter" @click="onClickBtn">
            重新上传
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    uploadId: number = 0
    rejectData: any = {}
    noData: any = {}
    onLoad(query: any) {
        this.uploadId = +query.uploadId
        this.reqNewData()
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/cardIllustration/no/uploadDetail/${this.uploadId}`, {}, (res: any) => {
            this.rejectData = res.data || {}
            this.getNoDetail()
        })
    }
    getNoDetail() {
        app.http.GetWithCrypto(`dataApi/cardIllustration/no/detail/rich/${this.rejectData.code}`, {}, (res: any) => {
            this.noData = res.text || {}
        })
    }
    onClickBtn() {
        uni.navigateTo({
            url: "/pages/illustration/cardSetUpload?noCode=" + this.rejectData.code
        })
    }

}
</script>

<style lang="scss">
page {

    color: #333333;

}

.reject_col {
    box-sizing: border-box;
    width: 750rpx;
    padding: 0 50rpx;
    align-items: center;
    margin-bottom: 24rpx;

    .label {
        font-family: PingFang SC;
        font-size: 28rpx;
        margin-right: 20rpx;
    }

    .value {
        flex: 1;
        font-family: PingFang SC;
        font-size: 28rpx;
    }
}

.bold {
    font-weight: bold;
}

.red {
    color: #FA1545;
}

.rejectImg {
    width: 600rpx;
}

.bottomBtn {
    width: 750rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #FA1545;
    font-size: 28rpx;
    margin-right: 20rpx;
    font-weight: bold;
    color: #fff;
    font-size: 34rpx;
    height: 90rpx;
    letter-spacing: 2rpx;
}
</style>
