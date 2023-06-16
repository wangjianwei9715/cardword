<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-13 11:21:52
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-13 16:08:41
 * @FilePath: \card-world\src\pages\cardForum\components\vote.vue
 * @Description: 卡圈的投票组件
-->
<template>
    <view class="content">
        <u-overlay :show="show">
            <u-popup :show="show" @close="showValue = false" :closeable="true" :closeOnClickOverlay="false">
                <view class="voteContainer">
                    <view class="vote_top flexCenter">
                        <view class="title">发起投票</view>
                    </view>
                    <view class="bottom_row">
                        <view class="clearBtn flexCenter" @click="onClickClear">清空</view>
                        <view class="finishBtn flexCenter" @click="onClickFinishEdit">完成编辑</view>
                    </view>
                </view>
            </u-popup>
        </u-overlay>
    </view>
</template>

<script lang="ts">
import { Component, PropSync, Watch } from "vue-property-decorator";
import BaseComponent from '@/base/BaseComponent.vue';
interface Vote {
    /** 标题 */
    title: string
    /** 选项列表 */
    options: Array<VoteOption>
}
interface VoteOption {
    /** 选项名称 */
    label: string
}
const MIN_OPTIONS_LENGTH = 2//最小
const MAX_OPTIONS_LENGTH = 5//最大
const voteData: Vote = {
    title: "",
    options: []
}
@Component({})
export default class ClassName extends BaseComponent {
    @PropSync("show", {
        type: Boolean
    }) showValue!: Boolean;
    voteData: Vote = Object.assign({}, voteData)
    insertOptions() {
        if (this.voteData.options.length >= MAX_OPTIONS_LENGTH) return
        this.voteData.options.push({ label: "" })
    }
    deleteOptions(index: number) {
        if (this.voteData.options.length - 1 < MIN_OPTIONS_LENGTH) return
        this.voteData.options.splice(index, 1)
    }
    onClickClear() {
        this.voteData = Object.assign({}, voteData)
    }
    onClickFinishEdit() {

    }
}
</script>

<style lang="scss">
.voteContainer {
    width: 750rpx;
    background-color: #000000;
    height: 900rpx;
    position: relative;
}

.vote_top {
    width: 750rpx;
    height: 100rpx;

    .title {
        color: #fff;
        font-size: 30rpx;
        font-weight: bold;
    }
}

.bottom_row {
    position: absolute;
    bottom: 0;
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 20rpx;
    justify-content: space-between;
    display: flex;

    .clearBtn {
        width: 120rpx;
        height: 80rpx;
        color: #fff;
        border: 1rpx solid #fff;
    }

    .finishBtn {
        width: 540rpx;
        height: 80rpx;
        color: #fff;
        background-color: #fb374e;
    }
}
</style>
