<template>
    <view>
        <u-overlay :show="show">
            <u-popup :show="show" :closeOnClickOverlay="true" @close="$emit('update:show', false), showGive = false">
                <view class="rewardContainer">
                    <view class="reward_top flexCenter">
                        <text class="reward_top_title">赠送礼物</text>
                        <image class="reward_top_close" src="@/static/cardForum/popClose.png"
                            @click="$emit('update:show', false), showGive = false"></image>
                    </view>
                    <view class="rewardChoiceWrap">
                        <view class="rewardOption flexCenter" v-for="(item, index) in reawrdOptions"
                            @click="onClickOption(item)">
                            <text class="reward_text">{{ item.type == 1 ? item.title : `赠送${item.num}卡币` }}</text>
                            <image class="reward_img"
                                :src="item.type == 1 ? `/static/userinfo/v3/give.png` : `/static/userinfo/v3/kb.png`"></image>
                        </view>
                    </view>
                    <text class="desc">表达赞赏/认同/鼓励，赠送后发放至作者账户且不可退回</text>
                </view>
            </u-popup>
            <view class="giveModal" v-if="show" :class="{ giveModal_show: showGive }">
                <view
                    style="width: 600rpx;background-color: #fff;display: flex;flex-direction: column;border-radius: 5rpx;">
                    <text class="title">提示</text>
                    <text class="tips">确认赠送{{ nowSelectOption.num }}卡币</text>
                    <view class="userWrap">
                        <text class="to" style="font-size: 28rpx;">To:</text>
                        <image class="avatar"
                            :src="userInfo.avatar ? parsePic(decodeURIComponent(userInfo.avatar)) : defaultAvatar"></image>
                        <text class="userName" style="font-size: 26rpx;">{{ userInfo.userName || "小卡迷" }}</text>
                    </view>
                    <view class="bottomWrap">
                        <text class="submit submit_cancel flexCenter" @click.stop="showGive = false">先不了</text>
                        <text class="submit flexCenter" @click.stop="onClickGive">确认赠送</text>
                    </view>
                </view>
            </view>
        </u-overlay>

    </view>
</template>
<script>
const reawrdOptions = [
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
const app = getApp().globalData.app
export default {
    name: '',
    components: {

    },
    mixins: [],
    props: {
        show: {
            type: Boolean,
            default: false
        },
        code: {
            type: String,
            default: ""
        },
        userInfo: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            reawrdOptions,
            defaultAvatar: app.defaultAvatar,
            nowSelectOption: {},
            showGive: false
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {

    },
    methods: {
        onClickOption(item) {
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
        },
        parsePic(src) {
            return getApp().globalData.parsePic(src)
        },
        onClickGive() {
            if (!this.nowSelectOption.num) {
                return
            }
            uni.$u.throttle(() => {
                uni.showLoading({
                    title: ""
                })
                app.http.Post(`cardCircle/give/point/${this.code}`, { tp: this.nowSelectOption.tp }, (res) => {
                    uni.showToast({
                        title: "赠送成功"
                    })
                    uni.hideLoading()
                    this.showGive = false
                    this.$emit("update:show", false)
                    app.platform.UINotificationFeedBack("success")
                }, (err) => {
                    uni.hideLoading()
                })
            }, 1000)

        }
    }
};
</script>
<style lang='scss' scoped>
.rewardContainer {
    width: 750rpx;
    background-color: #fff;
    height: 548rpx;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.reward_top {
    width: 750rpx;
    // height: 100rpx;
    margin-top: 38rpx;
    margin-bottom: 56rpx;
    position: relative;



}

.reward_top_title {
    font-size: 33rpx;
    
    font-weight: bold;
    color: #333333;
    text-align: center;
}

.reward_top_close {
    width: 30rpx;
    height: 30rpx;
    // background-size: 100% 100%;
    // background-image: url("@/static/cardForum/popClose.png");
    position: absolute;
    right: 37rpx;
    // top: 0;
    // bottom: 0;
}

.giveModal {
    width: 750rpx;
    // height: 400rpx;
    // background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 350rpx;
    z-index: 10076;
    border-radius: 5rpx;
    // #ifndef APP-NVUE
    box-sizing: border-box;
    // #endif
    transform: scale(0);
    // transition: transform 0.2s;
    transition-property: transform;
    transition-duration: 0.2s;
    transition-timing-function: ease-in;
    // #ifndef APP-NVUE
    pointer-events: none;
    // #endif
    border-radius: 5rpx;
    // #ifndef APP-NVUE
    box-sizing: border-box;
    // #endif
    padding-top: 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.title {
    color: #000;
    text-align: center;
    font-weight: bold;
    margin-top: 36rpx;
    font-size: 36rpx;
}

.tips {
    text-align: center;
    font-size:30rpx;
    margin-top: 20rpx;
}

.userWrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 30rpx;


}

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

.bottomWrap {
    display: flex;
    padding: 0 30rpx;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 60rpx;
    padding-bottom: 40rpx;

}

.submit {
    width: 250rpx;
    height: 80rpx;
    color: #fff;
    background-color: #ff003d;
    border: 1rpx solid #ff003d;
    text-align: center;
    line-height: 80rpx;
    font-size: 30rpx;
    border-radius: 5rpx;
    font-weight: bold;
}

.submit_cancel {
    background-color: #fff;
    border: 1rpx solid #d7d7d7;
    color: #000;
}

.giveModal_show {
    transform: scale(1);
    // #ifndef APP-NVUE
    pointer-events: auto;
    // #endif
}

.bottom_row {
    position: absolute;
    bottom: 0;
    width: 750rpx;
    // #ifndef APP-NVUE
    box-sizing: border-box;
    // #endif
    padding: 0 20rpx;
    justify-content: space-between;
    display: flex;
    flex-direction: row;


}

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

.rewardChoiceWrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // #ifndef APP-NVUE
    box-sizing: border-box;
    // #endif
    width: 750rpx;
    // heigh;
    padding: 0 20rpx;
    justify-content: space-between;


}

.rewardOption {
    width: 345rpx;
    height: 88rpx;
    border: 1rpx solid #C0C0C0;
    border-radius: 3rpx;
    margin-bottom: 20rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.reward_text {
    font-size: 27rpx;
    
    font-weight: bold;
    color: #333333;
    margin-right: 17rpx;
}

.reward_img {
    width: 36rpx;
    height: 36rpx;
    // background: #333333;
    // border-radius: 50%;
}

.desc {
    font-size: 20rpx;
    
    font-weight: 400;
    color: #C0C0C0;
    margin-top: 10rpx;
}
</style>