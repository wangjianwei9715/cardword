<template>
    <view class="content" style="margin-top:20rpx">
        <view class="topicsItem" v-for="(item, index) in value" @click="goToDetail(item)">
            <!-- #ifndef APP-NVUE -->
            <muqian-lazyLoad class="topiceImage"
                :src="item.avatar ? parsePic(decodeURIComponent(item.avatar)) : defaultAvatar"
                borderRadius="50%"></muqian-lazyLoad>
            <!-- #endif -->
            <!-- #ifdef APP-NVUE -->
            <image class="topiceImage" :src="item.avatar ? parsePic(decodeURIComponent(item.avatar)) : defaultAvatar"
                borderRadius="3rpx">
            </image>
            <!-- #endif -->
            <view class="rightInfo">
                <view class="titleWrap">
                    <text class="title">{{ item.userName }}</text>
                    <!-- <text class="act">活动</text> -->
                </view>
                <!-- #ifdef APP-NVUE -->
                <text class="desc">粉丝{{ item.fans || 0 }}{{ item.dtNum ? ` | 动态${item.dtNum}` : '' }}</text>
                <!-- #endif -->
                <!-- #ifndef APP-NVUE -->
                <text class="desc u-line-2">粉丝{{ item.fans }}{{ item.dtNum ? ` | 动态${item.dtNum}` : '' }}</text>
                <!-- #endif -->
                <!-- <view class="flex1"></view> -->

            </view>
            <text class="follow" :class="{ follow_dis: item.isFollow }" @click.stop="onClickFollow($event, item)">{{
                item.isFollow ?
                '已关注' : '关注' }}</text>
        </view>
    </view>
</template>
<script>
import { releaseByTopic, formatNumber, followActionByUser } from "../func/index.js"
// import { followActionByUser } from "../func/index.ts"
export default {
    name: '',
    components: {

    },
    mixins: [],
    props: {
        value: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return {
            formatNumber,
            defaultAvatar: getApp().globalData.app.defaultAvatar,
            parsePic: getApp().globalData.parsePic,
            list: []
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
    },
    methods: {
        onClickPush(event, item) {
            // #ifdef APP-NVUE
            event.stopPropagation();
            // #endif
            releaseByTopic(item.id)
        },
        onClickFollow(event, item) {
            // #ifdef APP-NVUE
            event.stopPropagation();
            // #endif
            followActionByUser(item.userId).then(() => {
                item.isFollow = !item.isFollow
            })
        },
        goToDetail(item) {

            uni.navigateTo({
                url: "/pages/cardForum/personHomePage?userId=" + item.userId
            })
        }
    }
};
</script>
<style lang='scss' scoped>
.flex1 {
    flex: 1;
}

.content {
    display: flex;
    width: 750rpx;
    flex-direction: column;
    // #ifndef APP-NVUE
    box-sizing: border-box;
    // #endif
    padding: 0 35rpx;
}

.topicsItem {
    // width: 100%;
    // width: 700rpx;
    height: 161rpx;
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    flex-direction: row;
    background-color: #fff;
    border-radius: 3rpx;


}

.topiceImage {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    margin-right: 46rpx;
    margin-left: 20rpx;
}

.rightInfo {
    // height: 161rpx;
    // flex: 1;
    width: 360rpx;
    display: flex;
    flex-direction: column;
}

.desc {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #959695;
    width: 500rpx;
    // #ifdef APP-NVUE
    lines: 2;
    text-overflow: ellipsis;
    // #endif
    // flex: 1;
}

.title {
    color: #000;
    font-weight: bold;
}

.num {
    color: #aaaaaa;
}

.titleWrap {
    display: flex;
    flex-direction: row;
}

.title {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    margin-right: 14rpx;
}

.act {
    width: 71rpx;
    height: 32rpx;
    background: #FA1545;
    border-radius: 3rpx;
    text-align: center;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 32rpx;
}

.follow {
    width: 120rpx;
    height: 52rpx;
    background: #FA1545;
    border-radius: 3rpx;
    font-size: 29rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
    line-height: 52rpx;
    margin-right: 20rpx;
}

.follow_dis {
    background: #c9d0d7;
}

.bottomInfo {
    // width: 100%;
    width: 500rpx;
    // background-color: red;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: row;
}

.num {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #C0C0C0;
}

.pushButton {
    // width: 40rpx;
    // height: 20rpx;
    width: 109rpx;
    height: 51rpx;
    background: #FA1545;
    border-radius: 3rpx;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
    line-height: 51rpx;
    // #ifndef APP-NVUE
    display: block;
    // #endif
}
</style>