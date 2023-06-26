<template>
    <view class="content">
        <view class="topicsItem" v-for="(item, index) in value" @click="goToDetail(item)">
            <!-- #ifndef APP-NVUE -->
            <muqian-lazyLoad class="topiceImage" :src="$parsePic(decodeURIComponent(item.pic))"
                borderRadius="3rpx"></muqian-lazyLoad>
            <!-- #endif -->
            <!-- #ifdef APP-NVUE -->
            <image class="topiceImage" :src="$parsePic(decodeURIComponent(item.pic))" borderRadius="3rpx">
            </image>
            <!-- #endif -->
            <view class="rightInfo">
                <view class="titleWrap">
                    <text class="title">{{ item.name }}</text>
                    <text class="act" v-if="item.activity">活动</text>
                </view>
                <!-- #ifdef APP-NVUE -->
                <text class="desc">{{ item.intro }}</text>
                <!-- #endif -->
                <!-- #ifndef APP-NVUE -->
                <text class="desc u-line-2">{{ item.intro }}</text>
                <!-- #endif -->
                <view class="flex1"></view>
                <view class="bottomInfo">
                    <text class="num">{{ formatNumber(item.totalUseNum, 2) }}篇动态</text>
                    <!-- <view class="flex1"></view> -->
                    <text class="pushButton flexCenter" @click.stop="onClickPush($event, item)">发布</text>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import { releaseByTopic, formatNumber } from "../func/index.js"
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
            list: [],
            formatNumber,
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
        // this.list = [
        //     {
        //         name: "秀卡-詹姆斯",
        //         id: 1,
        //         isActivity: true
        //     },
        //     {
        //         name: "问价",
        //         id: 2,
        //         isActivity: false
        //     },
        //     {
        //         name: "我的第一张卡",
        //         id: 3,
        //         isActivity: false
        //     },
        //     {
        //         name: "我的卡在哪里",
        //         id: 5,
        //         isActivity: false
        //     },
        //     {
        //         name: "我的卡屌不屌",
        //         id: 6,
        //         isActivity: false
        //     }
        // ]
    },
    methods: {
        onClickPush(event, item) {
            // #ifdef APP-NVUE
            event.stopPropagation();
            // #endif
            releaseByTopic(item.id)
        },
        goToDetail(item) {

            uni.navigateTo({
                url: "/pages/cardForum/topics/detail"
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
    width: 100%;
    // width: 700rpx;
    height: 161rpx;
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;
    flex-direction: row;


}

.topiceImage {
    width: 161rpx;
    height: 161rpx;
    border-radius: 3rpx;
    margin-right: 46rpx;
}

.rightInfo {
    height: 161rpx;
    flex: 1;
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