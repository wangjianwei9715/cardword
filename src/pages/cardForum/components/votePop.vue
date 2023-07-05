<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-13 11:21:52
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-07-05 16:24:21
 * @FilePath: \card-world\src\pages\cardForum\components\vote.vue
 * @Description: 卡圈的投票组件
-->
<template>
    <view class="content">
        <u-popup :safeAreaInsetBottom="false" @close="showValue = false" :show="showValue" :closeOnClickOverlay="true">
            <view class="voteContainer">
                <view class="vote_top flexCenter">
                    <view class="title">发起投票</view>
                    <view class="close" @click="showValue = false"></view>
                </view>
                <input class="input_title" :maxlength="30" v-model.trim="voteData.title"
                    placeholder="添加投票标题吧~（最多30字）"></input>
                <view class="optionsWrap" v-for="(item, index) in voteData.options">
                    <view class="name">选项{{ NumMap[index + 1] }}</view>
                    <view class="input_option">
                        <input placeholder="请填写选项（最多15字）" v-model.trim="item.label" :maxlength="15"></input>
                        <view class="del" v-if="index > 1" @click="deleteOptions(index)">删除</view>
                    </view>
                </view>
                <view class="addOptionWrap" @click="insertOptions" v-if="voteData.options.length <= MAX_OPTIONS_LENGTH">
                    <view class="addImg"></view>
                    <view class="addText">添加选项</view>
                </view>
                <view class="bottom_row">
                    <view class="clearBtn flexCenter" @click="onClickClear">清空</view>
                    <view class="finishBtn flexCenter" @click="onClickFinishEdit">完成编辑</view>
                </view>
                <view class="bottomSafeArea"></view>
            </view>

        </u-popup>
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
const NumMap: any = {
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五"
}
const voteData: Vote = {
    title: "",
    options: [{ label: "" }, { label: "" }]
}
@Component({})
export default class ClassName extends BaseComponent {
    @PropSync("show", {
        type: Boolean
    }) showValue!: Boolean;
    voteData: Vote = uni.$u.deepMerge({}, uni.$u.deepClone(voteData))
    MAX_OPTIONS_LENGTH = MAX_OPTIONS_LENGTH
    MIN_OPTIONS_LENGTH = MIN_OPTIONS_LENGTH
    NumMap = NumMap
    insertOptions() {
        if (this.voteData.options.length >= MAX_OPTIONS_LENGTH) return
        this.voteData.options.push({ label: "" })
    }
    deleteOptions(index: number) {
        if (this.voteData.options.length - 1 < MIN_OPTIONS_LENGTH) return
        this.voteData.options.splice(index, 1)
    }
    onClickClear() {
        this.voteData = uni.$u.deepMerge({}, uni.$u.deepClone(voteData))
        this.$emit("clear")
    }
    setVote(data: any) {
        this.voteData.title = data.voteTitle || []
        if (data.voteOptions && data.voteOptions.length) {
            this.voteData.options = (data.voteOptions || []).map((item: any) => {
                return { label: item }
            })
        }

    }
    onClickFinishEdit() {
        console.log(this.voteData);
        if (!this.voteData.title) {
            uni.showToast({
                title: "请检查填写是否完整",
                icon: "none"
            })
            return
        }
        for (let i = 0; i < this.voteData.options.length; i++) {
            if (!this.voteData.options[i].label) {
                uni.showToast({
                    title: "请检查填写是否完整",
                    icon: "none"
                })
                return
            }
        }
        this.$emit("finish", this.voteData)
        this.showValue = false
    }
}
</script>

<style lang="scss">
.voteContainer {
    width: 750rpx;
    background-color: #000000;
    height: 1143rpx;
    position: relative;
    display: flex;
    box-sizing: border-box;
    padding: 0 20rpx;
    flex-direction: column;
}

.vote_top {
    // width: 750rpx;
    width: 100%;
    // height: 100rpx;
    margin-top: 38rpx;
    margin-bottom: 56rpx;
    position: relative;

    .title {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
    }

    .close {
        width: 30rpx;
        height: 30rpx;
        background-size: 100% 100%;
        background-image: url("@/static/cardForum/popClose.png");
        position: absolute;
        right: 17rpx;
        top: 0;
        bottom: 0;
        margin: auto;
    }
}

.input_title {
    width: 100%;
    font-size: 29rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    padding-bottom: 17rpx;
    border-bottom: 1rpx solid #3F3F3F;
    margin-bottom: 75rpx;
}

.optionsWrap {
    display: flex;
    // align-items: center;
    margin-bottom: 85rpx;

    .name {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
        margin-right: 21rpx;
    }

    .input_option {

        padding-bottom: 18rpx;
        flex: 1;
        border-bottom: 1rpx solid #3F3F3F;
        display: flex;

        input {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            flex: 1;
        }

        .del {
            font-size: 22rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #FFFFFF;
            margin-left: 10rpx;
        }
    }
}

.bottom_row {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 35rpx;
    justify-content: space-between;
    display: flex;
    align-items: center;
    padding-bottom: 20rpx;

    .clearBtn {
        width: 189rpx;
        height: 93rpx;
        border: 1rpx solid #C0C0C0;
        border-radius: 5rpx;
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
    }

    .finishBtn {
        width: 465rpx;
        height: 92rpx;
        background: #FA1545;
        border-radius: 5rpx;
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
        border: 1rpx solid #FA1545;
    }
}

.addOptionWrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;

    .addImg {
        background-size: 100% 100%;
        background-image: url("@/static/cardForum/release/addVote.png");
        width: 23rpx;
        height: 23rpx;
    }

    .addText {
        font-size: 22rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
        margin-left: 10rpx;
    }
}
</style>
