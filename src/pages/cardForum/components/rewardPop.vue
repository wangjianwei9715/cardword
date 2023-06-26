<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-13 11:21:52
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-26 18:45:43
 * @FilePath: \card-world\src\pages\cardForum\components\rewardTool.vue
 * @Description: 卡圈的打赏组件
-->
<template>
    <view class="content">
        <u-popup :show="showValue" :closeOnClickOverlay="true" @close="showValue=false">
            <view class="rewardContainer">
                <view class="reward_top flexCenter">
                    <view class="title">赠送礼物</view>
                    <view class="close" @click="showValue = false"></view>
                </view>
                <view class="rewardChoiceWrap">
                    <view class="rewardOption flexCenter" v-for="(item, index) in reawrdOptions"
                        @click="onClickOption(item)">
                        <view class="reward_text">{{ item.type == 1 ? item.title : `赠送${item.num}卡币` }}</view>
                        <image class="reward_img"></image>
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
                <image class="avatar"
                    :src="userInfo.avatar ? $parsePic(decodeURIComponent(userInfo.avatar)) : defaultAvatar"></image>
                <view class="userName">{{ userInfo.userName || "小卡迷" }}</view>
            </view>
            <view class="bottomWrap">
                <view class="submit submit_cancel flexCenter" @click.stop="showGive = false">先不了</view>
                <view class="submit flexCenter" @click.stop="$u.throttle(onClickGive, 1000)">确认赠送</view>
            </view>
        </view>
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
    tp?: number;
}
const reawrdOptions: Array<Reward> = [
    {
        title: "赠送卡密",
        type: 1
    },
    {
        title: "赠送卡币",
        type: 2,
        tp: 1,
        num: 5
    },
    {
        title: "赠送卡币",
        type: 2,
        tp: 2,
        num: 10
    },
    {
        title: "赠送卡币",
        type: 2,
        tp: 3,
        num: 50
    },
    {
        title: "赠送卡币",
        type: 2,
        tp: 4,
        num: 100
    },
    {
        title: "赠送卡币",
        type: 2,
        tp: 5,
        num: 500
    }
]
@Component({})
export default class ClassName extends BaseComponent {
    @PropSync("show", {
        type: Boolean
    }) showValue!: Boolean;
    @Prop({ default: "" })
    code?: string;
    @Prop({
        default: () => {
            return {} as CardForum.RewardUserInfo
        }
    })
    //@ts-ignore
    userInfo: CardForum.RewardUserInfo;
    reawrdOptions: Array<Reward> = reawrdOptions
    defaultAvatar = app.defaultAvatar
    nowSelectOption: Reward = {} as Reward
    showGive: boolean = false
    onClickOption(item: Reward) {
        if (item.type == 1) {
            //跳转赠送卡密
            uni.navigateTo({
                url: `/pages/cardForum/kami/list?code=${this.code}`,
                success: (res) => {
                    res.eventChannel.emit('receiveUserInfo', this.userInfo)
                }
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
        app.http.Post(`cardCircle/give/point/${this.code}`, { tp: this.nowSelectOption.tp }, (res: any) => {
            uni.showToast({
                title: "赠送成功"
            })
            app.platform.UINotificationFeedBack("success")
        })
    }
}
</script>

<style lang="scss">
.rewardContainer {
    width: 750rpx;
    background-color: #fff;
    height: 584rpx;
    position: relative;
}

.reward_top {
    width: 750rpx;
    // height: 100rpx;
    margin-top: 38rpx;
    margin-bottom: 56rpx;
    position: relative;

    .title {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
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
    border-radius: 3rpx;
    box-sizing: border-box;
    padding-top: 30rpx;

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
            background-color: #ff003d;
            border: 1rpx solid #ff003d;
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
        background-color: #ff003d;
    }
}

.rewardChoiceWrap {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    width: 750rpx;
    // heigh;
    padding: 0 20rpx;
    justify-content: space-between;

    .rewardOption {
        width: 328rpx;
        height: 89rpx;
        border: 1rpx solid #C0C0C0;
        border-radius: 3rpx;
        margin-bottom: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .reward_text {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-right: 17rpx;
    }

    .reward_img {
        width: 36rpx;
        height: 36rpx;
        background: #333333;
        border-radius: 50%;
    }
}

.desc {
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #C0C0C0;
    text-align: center;
    margin-top: 10rpx;
}
</style>
