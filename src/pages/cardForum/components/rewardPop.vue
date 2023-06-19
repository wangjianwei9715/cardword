<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-13 11:21:52
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-19 10:39:52
 * @FilePath: \card-world\src\pages\cardForum\components\rewardTool.vue
 * @Description: 卡圈的打赏组件
-->
<template>
    <view class="content">
        <u-overlay :show="showValue">
            <u-popup :show="showValue" @close="showValue = false" :closeable="true" :closeOnClickOverlay="false">
                <view class="rewardContainer">
                    <view class="reward_top flexCenter">
                        <view class="title">赠送礼物</view>
                    </view>
                    <view class="rewardChoiceWrap">
                        <view class="rewardOption flexCenter" v-for="(item, index) in reawrdOptions"
                            @click="onClickOption(item)">
                            {{ item.type == 1 ? item.title : `赠送${item.num}卡币` }}
                        </view>
                    </view>
                    <view class="desc">表达赞赏/认同/鼓励，赠送后发放至作者账户且不可退回</view>
                </view>
            </u-popup>
            <view class="giveModal" :class="{ giveModal_show: showGive }">
                <view class="title">提示</view>
                <view class="tips">确认赠送{{ nowSelectOption.num }}卡币</view>
                <view class="userWrap">
                    <view class="to">To:</view>
                    <image class="avatar"></image>
                    <view class="userName">{{ userInfo.userName || "小卡迷" }}</view>
                </view>
                <view class="bottomWrap">
                    <view class="submit submit_cancel flexCenter" @click="showGive = false">先不了</view>
                    <view class="submit flexCenter" @click="$u.throttle(onClickGive, 1000)">确认赠送</view>
                </view>
            </view>
        </u-overlay>
    </view>
</template>

<script lang="ts">
import { Component, PropSync, Prop, Watch } from "vue-property-decorator";
import BaseComponent from '@/base/BaseComponent.vue';
import CardForum from "../interface/public";
import { app } from "@/app";
interface Reward {
    /** 标题 */
    title: string;
    /** 类型1:送卡密 2:送卡币 */
    type: number;
    /** type 2时,卡币赠送数量 */
    num?: number;
}
const reawrdOptions: Array<Reward> = [
    {
        title: "赠送卡密",
        type: 1
    },
    {
        title: "赠送卡币",
        type: 2,
        num: 5
    },
    {
        title: "赠送卡币",
        type: 2,
        num: 10
    },
    {
        title: "赠送卡币",
        type: 2,
        num: 50
    },
    {
        title: "赠送卡币",
        type: 2,
        num: 100
    },
    {
        title: "赠送卡币",
        type: 2,
        num: 500
    }
]
@Component({})
export default class ClassName extends BaseComponent {
    @PropSync("show", {
        type: Boolean
    }) showValue!: Boolean;
    @Prop({ default: 0 })
    id?: number;
    @Prop({
        default: () => {
            return {}
        }
    })
    userInfo?: CardForum.RewardUserInfo | any;
    reawrdOptions: Array<Reward> = reawrdOptions
    nowSelectOption: Reward | any = {}
    showGive: boolean = false
    onClickOption(item: Reward) {
        if (item.type == 1) {
            //跳转赠送卡密
            uni.navigateTo({
                url: `/pages/cardForum/kami/list`
            })
            return
        }
        if (item.type == 2) {
            //赠送卡币
            this.nowSelectOption = item
            this.showGive = true
        }
    }
    onClickGive() {
        if (!this.nowSelectOption.num) {
            return
        }
        this.showGive = false
        uni.showToast({
            title: "赠送成功"
        })
        app.platform.UINotificationFeedBack("success")
    }
}
</script>

<style lang="scss">
.rewardContainer {
    width: 750rpx;
    background-color: #fff;
    height: 600rpx;
    position: relative;
}

.reward_top {
    width: 750rpx;
    height: 100rpx;

    .title {
        color: #000;
        font-size: 30rpx;
        font-weight: bold;
    }


}

.giveModal {
    width: 500rpx;
    height: 400rpx;
    background-color: #fff;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 350rpx;
    z-index: 10076;
    box-sizing: border-box;
    transform: scale(0);
    transition: transform 0.2s;
    pointer-events: none;

    .title {
        color: #000;
        text-align: center;
        font-weight: bold;
    }

    .tips {
        text-align: center;
    }

    .userWrap {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30rpx;

        .avatar {
            width: 50rpx;
            height: 50rpx;
            background-color: #000;
            border-radius: 50%;
            margin: 0 20rpx;
        }

        .userName {
            color: #000;
        }
    }

    .bottomWrap {
        display: flex;
        padding: 0 30rpx;
        justify-content: space-between;
        align-items: center;
        margin-top: 60rpx;

        .submit {
            width: 200rpx;
            height: 60rpx;
            color: #fff;
            background-color: #fb374e;
            border: 1rpx solid #fb374e;
        }

        .submit_cancel {
            background-color: #fff;
            border: 1rpx solid #d7d7d7;
            color: #000;
        }
    }
}

.giveModal_show {
    transform: scale(1);
    pointer-events: auto;
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

.rewardChoiceWrap {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    width: 750rpx;
    // heigh;
    padding: 0 30rpx;
    justify-content: space-between;

    .rewardOption {
        width: 330rpx;
        height: 90rpx;
        color: #000;
        margin-bottom: 34rpx;
        border: 1rpx solid #000;
    }
}

.desc {
    color: #dddddd;
    font-size: 22rpx;
    text-align: center;
    margin-top: 10rpx;
}
</style>
