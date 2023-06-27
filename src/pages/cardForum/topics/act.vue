<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-15 17:02:36
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-06-27 14:21:39
 * @FilePath: \card-world\src\pages\cardForum\topics\act.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <navigationbar title="挑战话题" rightText="查看往期" borderBottom="none" @onClickRightText="onClickRightText">
        </navigationbar>
        <view class="titleWrap">
            <view class="block"></view>
            <view class="title">本期话题</view>
            <view class="smallTitle">（{{ stateMap[topData.state] || "未知" }} {{ $u.timeFormat(topData.start_at, "mm-dd") }} ~
                {{ $u.timeFormat(topData.end_at, "mm-dd") }}）</view>
        </view>
        <view class="topicsItem">
            <image class="topicsItem_img" :src="$parsePic(decodeURIComponent(topData.pic))">
            </image>
            <view class="rightInfo">
                <view class="topicsItem_title">
                    <text class="title">#{{ topData.name }}</text>
                    <!-- <text class="act">活动</text> -->
                </view>
                <!-- #ifdef APP-NVUE -->
                <text class="desc">{{ topData.intro }}</text>
                <!-- #endif -->
                <!-- #ifndef APP-NVUE -->
                <text class="desc u-line-2">{{ topData.intro }}</text>
                <!-- #endif -->
                <view class="flex1"></view>
                <view class="bottomInfo">
                    <text class="num">{{ topData.totalUseNum }}篇动态</text>
                    <!-- <view class="flex1"></view> -->
                    <text class="push flexCenter" @click="onClickPush">发布</text>
                </view>
            </view>
        </view>
        <view class="titleWrap" style="margin-bottom: 20rpx;">
            <view class="block"></view>
            <view class="title">排名奖励</view>
            <view class="flex1"></view>
            <view class="gray">我的最高获赞{{ myLikeNum }}</view>
            <!-- <view class="smallTitle">（进行中 10.30~11.5）</view> -->
        </view>
        <view class="rankWrap" v-for="(item, index) in list">
            <view class="rankNum">{{ index + 1 }}</view>
            <muqian-lazyLoad :src="item.avatar ? $parsePic(decodeURIComponent(item.avatar)) : app.defaultAvatar"
                borderRadius="50%" class="avatar"></muqian-lazyLoad>
            <view class="userInfo">
                <view class="userName">{{ item.userName }}</view>
                <view class="likeNum">{{ item.likeNum }}获赞 ＞</view>
            </view>
            <view class="flex1"></view>
            <view class="award">{{ item.awardName }}</view>
        </view>
        <view class="titleWrap" style="margin-bottom: 18rpx;">
            <view class="block"></view>
            <view class="title">规则说明</view>
        </view>
        <view class="rule">
            1、本期活动时间：{{ $u.timeFormat(topData.start_at, "yyyy.mm.dd") }}-{{ $u.timeFormat(topData.end_at, "yyyy.mm.dd")
            }}。活动期间，用户发布本话题动态即可参与，活动结束后点赞数最高的x位用户获得相应奖励。<br><br>
            2、若发布多个本话题动态，则取点赞数最高的作品参与；若两名或多名用户点赞数相同，则按发布时间排名。<br><br>
            3、活动截至后，优惠券奖品自动发放，实物类奖品请联系客服发放<br><br>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { releaseByTopic } from "../func"
const stateMap: any = {
    0: "未开始",
    1: "进行中",
    2: '已结束'
}

@Component({})
export default class ClassName extends BaseNode {
    app = app
    stateMap = stateMap
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 15,
    }
    list: any = []
    isFetchEnd: boolean = true
    // totalPage: number = 0
    topData: any = {}
    id: number = 0
    myLikeNum: number = 0
    onLoad(query: any) {

        this.id = +query.id
        this.reqNewData()
        this.reqRankList()
    }
    onReachBottom() {
        if (this.isFetchEnd) return
        this.queryParams.fetchFrom += this.queryParams.fetchSize
        this.reqRankList()
    }
    onClickRightText() {
        uni.navigateTo({
            url: "/pages/cardForum/topics/list?old=1"
        })
    }
    onClickPush() {
        releaseByTopic(this.id)
    }
    reqRankList() {
        app.http.Get(`dataApi/cardCircle/topic/award/list/${this.id}`, this.queryParams, (res: any) => {
            const list = res.list || []
            this.isFetchEnd = res.isFetchEnd
            this.queryParams.fetchFrom == 1 ? this.list = list : this.list.push(...list)
            this.myLikeNum = res.myLikeNum
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/cardCircle/topic/detail/` + this.id, {}, (res: any) => {
            this.topData = res.data

        })
    }

}
</script>

<style lang="scss">
.flex1 {
    flex: 1;
}

.titleWrap {
    width: 750rpx;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    padding: 0 35rpx;
    height: 30rpx;
    vertical-align: text-bottom;
    margin-top: 24rpx;

    .block {
        width: 8rpx;
        height: 18rpx;
        background: #FA1545;
        border-radius: 2rpx;
        margin-right: 10rpx;
        position: relative;
        bottom: 4rpx;
    }

    .title {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-right: 4rpx;
        // display: table-cell;
        // vertical-align: bottom;
    }

    .smallTitle {
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        vertical-align: bottom;
    }

    .gray {
        font-size: 17rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #C0C0C0;
    }
}

.rankWrap {
    box-sizing: border-box;
    padding: 0 35rpx;
    width: 750rpx;
    margin-bottom: 34rpx;
    display: flex;
    align-items: center;

    .rankNum {
        width: 44rpx;
        font-size: 33rpx;
        font-family: Impact;
        font-weight: 400;
        color: #333333;
        text-align: center;
        margin-right: 10rpx;
    }

    .avatar {
        width: 65rpx;
        height: 65rpx;
        margin-right: 20rpx;
    }

    .userInfo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
    }

    .userName {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #8D8D8D;
        margin-bottom: 6rpx;
    }

    .likeNum {
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #959695;
    }

    .award {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
    }
}

.topicsItem {
    width: 750rpx;
    height: 161rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;
    flex-direction: row;
    padding: 0 35rpx;
    margin-top: 26rpx;
}

.topicsItem_img {
    width: 161rpx;
    height: 161rpx;
    // background-color: red;
    border-radius: 3rpx;
    margin-right: 46rpx;
}

.rightInfo {
    height: 161rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
    // background-color: red;

    .topicsItem_title {
        .title {
            font-size: 33rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            margin-right: 14rpx;
        }
    }
}

.desc {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #959695;
    // width: 500rpx;
    // #ifdef APP-NVUE
    lines: 2;
    text-overflow: ellipsis;
    // #endif
    // flex: 1;
}

.num {
    color: #aaaaaa;
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
    // width: 500rpx;
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

.push {
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
}

.rule {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 38rpx;
    padding: 0 56rpx;
}
</style>
