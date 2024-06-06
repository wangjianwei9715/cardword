<template>
    <view class="content">
        <view class="topicsItem" v-for="(item, index) in value" @click="goToDetail(item)">
            <!-- #ifndef APP-NVUE -->
            <muqian-lazyLoad class="topiceImage" :src="parsePic(decodeURIComponent(item.pic))"
                borderRadius="3rpx"></muqian-lazyLoad>
            <!-- #endif -->
            <!-- #ifdef APP-NVUE -->
            <image class="topiceImage" :src="parsePic(decodeURIComponent(item.pic))" borderRadius="3rpx">
            </image>
            <!-- #endif -->
            <view class="rightInfo">
                <view class="titleWrap">
                    <text class="title">{{ item.name }}</text>
                    <text class="act" v-if="item.activity && !old">活动</text>
                    <text class="act" v-if="old && item.isMy">我参与的</text>
                </view>
                <!-- #ifdef APP-NVUE -->
                <text class="desc">{{ item.intro }}</text>
                <!-- #endif -->
                <!-- #ifndef APP-NVUE -->
                <text class="desc u-line-2">{{ item.intro }}</text>
                <!-- #endif -->
                <view class="flex1"></view>
                <view class="bottomInfo">
                    <template v-if="!old">
                        <text class="num">{{ formatNumber(item.totalUseNum, 2) }}篇动态</text>
                        <text class="pushButton flexCenter" @click.stop="onClickPush($event, item)">发布</text>
                    </template>
                    <template v-if="old">
                        <text class="num">{{ stateMap[item.state] }} {{ $u.timeFormat(item.start_at, "mm-dd") }} ~ {{
                            $u.timeFormat(item.end_at, "mm-dd") }} </text>
                        <text class="num">{{ item.peopleNum || 0 }}人参与</text>
                    </template>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import { releaseByTopic, formatNumber } from "../func/index.js"
const stateMap = {
    0: "未开始",
    1: "进行中",
    2: '已结束'
}
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
        old: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            parsePic: getApp().globalData.parsePic,
            stateMap,
            list: [],
            formatNumber,
        }
    },
    computed: {

    },
    watch: {

    },
    mounted() {
        console.log(this.value);
    },
    methods: {
        onClickPush(event, item) {
            // #ifdef APP-NVUE
            event.stopPropagation();
            // #endif
            releaseByTopic(item.id)
        },
        goToDetail(item) {
            if (this.old) {
                uni.navigateTo({
                    url: "/pages/cardForum/topics/act?id=" + item.id
                })
                return
            }
            uni.navigateTo({
                url: "/pages/cardForum/topics/detailPage?id=" + item.id
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
    // padding: 0 35rpx;
}

.topicsItem {
    // width: 100%;
    width: 750rpx;
    // #ifndef APP-NVUE
    box-sizing: border-box;
    // #endif
    // height: 161rpx;
    display: flex;
    align-items: center;
    // margin-bottom: 20rpx;
    flex-direction: row;
    background-color: #ffffff;
    padding: 20rpx 35rpx;

}

.topiceImage {
    width: 161rpx;
    height: 161rpx;
    border-radius: 5rpx;
    margin-right: 46rpx;
}

.rightInfo {
    height: 161rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.desc {
    font-size: 23rpx;
    
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
    font-size: 27rpx;
    
    font-weight: bold;
    color: #333333;
    margin-right: 14rpx;
}

.act {
    // width: 71rpx;
    height: 32rpx;
    background: #FA1545;
    border-radius: 3rpx;
    text-align: center;
    font-size: 20rpx;
    
    font-weight: 400;
    color: #FFFFFF;
    line-height: 32rpx;
    padding: 0 10rpx;
    border-radius: 3rpx;font-weight: bold;
}

.bottomInfo {
    // width: 100%;
    // width: 500rpx;
    // background-color: red;
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: row;
}

.num {
    font-size: 23rpx;
    
    font-weight: 400;
    color: #C0C0C0;
}

.pushButton {
    // width: 40rpx;
    // height: 20rpx;
    width: 109rpx;
    height: 51rpx;
    background: #FA1545;
    border-radius: 5rpx;
    font-size: 25rpx;
    
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
    line-height: 51rpx;
    // #ifndef APP-NVUE
    display: block;
    // #endif
}
</style>