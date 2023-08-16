<template>
    <view class="content">
        <u-popup :safeAreaInsetBottom="false" :show="show" @close="$emit('update:show', false)" :closeable="false"
            :closeOnClickOverlay="true">
            <view class="giftContainer">
                <view class="vote_top flexCenter">
                    <text class="title">收到打赏</text>
                    <image class="close" style="width: 30rpx;height: 30rpx;" src="@/static/cardForum/popClose.png"
                        @click="$emit('update:show', false)"></image>
                </view>
                <image src="@/static/cardForum/forumEmpty.png" mode="widthFix" class="empty" v-if="!list.length"></image>
                <scroll-view class="giftScroll" :scroll-y="true" @scrolltolower="scrolltolower">
                    <view class="giftItem" v-for="(item, index) in list">
                        <image class="avatar"
                            :src="item.avatar ? parsePic(decodeURIComponent(item.avatar)) : defaultAvatar">
                        </image>
                        <view class="centerInfo">
                            <text class="userName">{{ item.userName }}</text>
                            <view class="giftName">
                                <text class="name">赠送了你一份礼物</text>
                                <text class="time">{{ timeDiff(item.created_at) }}</text>
                                <!-- defaultAvatar -->
                            </view>
                            <view class="giftWrap" @click="onClickItem(item)">{{ item.content }}
                                <text class="look">点击查看</text>
                            </view>
                        </view>
                        <!-- <view class="flex1"></view> -->
                        <image class="giftPic" mode="aspectFill"></image>
                    </view>
                </scroll-view>
                
                <view class="bottomSafeArea"></view>
            </view>
        </u-popup>
    </view>
</template>
<script>
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
        }
    },
    data() {
        return {
            list: [],
            queryParams: {
                fetchFrom: 1,
                fetchSize: 15,
            },
            defaultAvatar: app.defaultAvatar,
            totalPage: 0,
            timer: 0,
            isFetchEnd: true,
        }
    },
    computed: {

    },
    watch: {
        show: function (val) {
            if (val && !this.list.length) {
                this.reqList()
            }
        }
    },
    mounted() {

    },
    methods: {
        scrolltolower() {
            if (!this.isFetchEnd) {
                this.queryParams.fetchFrom += this.queryParams.fetchSize
                this.reqList()
            }
        },
        onClickItem(item) {
            if (item.tp == 1) {
                uni.navigateTo({
                    url: "/pages/userinfo/giving/index?index=1"
                })
            } else if (item.tp == 2) {
                uni.navigateTo({
                    url: "/pages/mall/record_point"
                })
            }
        },
        parsePic(src) {
            return getApp().globalData.parsePic(src)
        },
        onInput() {
            this.timer && clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.queryParams.fetchFrom = 1
                this.reqList()
            }, 500)
        },
        timeDiff(time) {
            return uni.$u.timeFrom(time, "mm-dd")
        },
        reqList() {
            app.http.Get("dataApi/cardCircle/get/gift/list/" + this.code, this.queryParams, (res) => {
                const list = res.list || []
                this.isFetchEnd = res.isFetchEnd
                this.queryParams.fetchFrom == 1 ? this.list = list : this.list.push(...list)
            })
        }
    }
};
</script>
<style lang="scss">
.empty{
    width: 300rpx;
    position: absolute;
    left: 0;right: 0;margin: auto;
    top: 200rpx;
    left: 60rpx;
}
.giftContainer {
    width: 750rpx;
    background-color: #ffffff;
    height: 830rpx;
    position: relative;
    // #ifndef APP-NVUE
    box-sizing: border-box;
    // #endif
    padding: 0 37rpx;
    display: flex;
    flex-direction: column;
}



.giftScroll {
    margin-top: 30rpx;
    height: 620rpx;
}

.vote_top {
    // width: 750rpx;
    // height: 100rpx;
    margin-top: 38rpx;
    margin-bottom: 56rpx;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}

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
    // background-image: url("@/static/cardForum/popClose.png");
    position: absolute;
    right: 17rpx;
    // top: 0;
    
    // bottom: 0;
    // margin: auto;
}

.giftItem {
    width: 750rpx;
    // #ifndef APP-NVUE
    box-sizing: border-box;
    // #endif
    padding: 0 37rpx;
    display: flex;
    border-bottom: 1rpx solid #E6E6E6;
    padding-bottom: 47rpx;
    margin-bottom: 40rpx;





}

.giftPic {
    width: 91rpx;
    height: 91rpx;
    // display: block;
    background: #FA1545;
}

.avatar {
    width: 73rpx;
    height: 73rpx;
    // background: #FA1545;
    border-radius: 50%;
    margin-right: 21rpx;
}

.centerInfo {
    // flex: 1;
    width: 440rpx;


}

.userName {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
}

.giftName {}

.name {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    margin-right: 21rpx;
}

.time {
    font-size: 19rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #C0C0C0;
}

.giftWrap {
    max-width: 396rpx;
    // height: 64rpx;
    background: #F5F5F5;
    // #ifndef APP-NVUE
    box-sizing: border-box;
    // #endif
    padding: 10rpx 12rpx;
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #707070;
    line-height: 25rpx;
    margin-top: 28rpx;
}

.look {
    font-weight: bold;
    margin-left: 5rpx;
}

.flex1 {
    flex: 1;
}
</style>

