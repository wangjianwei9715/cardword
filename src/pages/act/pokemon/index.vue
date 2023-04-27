<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-11-07 17:20:31
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-04-27 17:15:36
 * @FilePath: \jichao_app_2\src\pages\act\worldCup\rank.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <transitionNav ref='transitionNav' :statusBarStyleArray="['dark', 'light']" :needIconShadow="true" title="训练家积分榜">
        </transitionNav>
        <view class="topBannerContainer">
        <view class="banner"></view>
        <navigator :url="`/pages/act/pokemon/rule`" hover-class="none" class="sp-tips-index sp-tips-index2">
            <view class="rule"></view>
            </navigator>
        </view>
        <view class="liveContainer flexCenter">
            <view class="title">榜单前10可获得丰厚奖励</view>
            <!-- <navigator :url="`/pages/act/pokemon/live?roomId=${roomId}`" hover-class="none"
                            class="sp-tips-index sp-tips-index2">
                            <view class="entrance"></view>
                        </navigator> -->

        </view>
        <view class="rankContainer">
            <view class="rankContainer_top">
                <view class="title"></view>
                <view class="text">{{ parseTips().tips || "" }} {{parseTips().time || ""}}</view>
                <navigator :url="`/pages/act/pokemon/detail`" hover-class="none" class="sp-tips-index sp-tips-index2">
                    <view class="jfmx">积分明细</view>
                </navigator>
            </view>
            <scroll-view scroll-y class="rankContainer_rank">
                <view class="longRank">
                    <view class="rank_tr rank_tr_my rank_tr_bg red_bg" style="margin-top: 30rpx;">
                        <view class="leftCorner flexCenter">我的成绩</view>
                        <view class="rankNum">{{ myRank.rank }}</view>
                        <muqian-lazyLoad class="rank_avatar" borderRadius="50%"
                            :src="myRank.avatar ? $parsePic(decodeURIComponent(myRank.avatar)) : defaultAvatar"></muqian-lazyLoad>
                        <view class="rankPoint">
                            <view class="get">已获取：{{ myRank.get_score }}</view>
                            <view class="freeze">冻结中：{{ myRank.lock_score }}</view>
                        </view>
                        <muqian-lazyLoad v-if="myRank.isPass" class="rankReward" borderRadius="3rpx"
                            :src="$parsePic(decodeURIComponent(myRank.awardPic))"></muqian-lazyLoad>
                        <view class="rank_right" v-else>
                            <view style="margin-bottom: 10rpx;">距离入榜还需</view>
                            <view>{{ myRank.passScore }}</view>
                        </view>
                    </view>
                    <view class="rank_tr rank_tr_bg" v-for="(item, index) in rankList"
                        :class="[index <= 2 ? `ran${index + 1}_bg` : '']">
                        <view class="rank_num" :class="[index <= 2 ? `rank${index + 1}` : '']">{{ index > 2 ? (index + 1) :
                            ""
                        }}
                        </view>
                        <muqian-lazyLoad class="rank_avatar" borderRadius="50%"
                            :src="item.avatar ? $parsePic(decodeURIComponent(item.avatar)) : (item.userName == '虚位以待' ? '/static/goods/v2/waitAvatar.png' : defaultAvatar)" />
                        <view class="rank_userName">{{ item.userName }}</view>
                    <view class="rankPoint" v-if="item.get_score || item.lock_score">
                            <view class="get">已获取：{{ item.get_score }}</view>
                            <view class="freeze">冻结中：{{ item.lock_score }}</view>
                        </view>
                        <view v-else style="flex:1"></view>
                        <muqian-lazyLoad class="rank_reward" v-if="item.awardPic_url" borderRadius="3rpx"
                            @click="previewImage(item)" :src="$parsePic(decodeURIComponent(item.awardPic_url))" />
                        <!-- <image v-else src="@/static/act/pokemon/luck.png" class="rank_reward"
                                        style="border-radius: 3rpx;" /> -->
                    </view>
                </view>
            </scroll-view>
            <view class="rankContainer_bottom flexCenter" @click="goBuy">
                <view class="goBuy"></view>
            </view>
            <previewImage ref="previewImage" />
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component, Watch, Prop } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { parsePic, dateFormatMSHMS, dateFormatMS } from '@/tools/util'
@Component({})
export default class ClassName extends BaseNode {
    rankList: any = []
    parsePic = parsePic
    defaultAvatar: any = app.defaultAvatar
    myRank: any = {
    }
    seriesId: number = 0
    roomId: number = 0
    nowTimeStamp: any = Math.round(+new Date() / 1000)
    onLoad(query: any) {

        app.platform.hasLoginToken(() => {
            if (query.seriesId) this.seriesId = +query.seriesId
            if (query.roomId) this.roomId = +query.roomId
            this.reqMyRank()
            this.reqAllRank()
        })
    }
    goBuy() {
        uni.navigateTo({
            url: `/pages/goods/goods_animeTv?seriesId=${this.seriesId}`
        })
    }
    isNumber(data: any) {
        return typeof data === 'number'
    }
    parseTips() {
        const ActivityPeriod: any = [1682870400, 1684079999]//积分获取
        const ThawPeriod: any = [1684080000, 1684943999]//积分解冻
        const DrawPeriod: number = 1684944000//榜单结算
        if (this.nowTimeStamp < ActivityPeriod[0]) {
            return { tips: "暂未开始", time: "05.01-05.25" }
        };
        if (this.nowTimeStamp >= ActivityPeriod[0] && this.nowTimeStamp <= ActivityPeriod[1]) {
            return { tips: "积分获取", time: "05.01-05.14" }
        }
        if (this.nowTimeStamp >= ThawPeriod[0] && this.nowTimeStamp <= ThawPeriod[1]) {
            return {
                tips: "积分解冻", time: "05.15-05.24"
            }
        };
        if (this.nowTimeStamp > ThawPeriod[1] && this.nowTimeStamp < DrawPeriod) {
            return {
                tips: "榜单结算",
                time: "05.25"
            }
        };
        if (this.nowTimeStamp >= DrawPeriod) {
            return {
                tips: "榜单结算",
                time: "05.25"
            }
        }
    }
    previewImage(item: any) {
        //@ts-ignore
        this.$refs.previewImage.show({
            urls: [{ src: this.parsePic(decodeURIComponent(item.awardPic_url || item.pic)), title: item.awardName || item.name }]
        })
    }
    reqMyRank() {
        app.http.Get("dataApi/selectRank/my/data", { activityTp: 6 }, (res: any) => {
            this.myRank = res.data
        })
    }
    reqAllRank(cb?: any) {
        app.http.Get('dataApi/selectRank/list', { activityTp: 6 }, (res: any) => {
            this.rankList = res.list || []
            cb && cb()
        })
    }
}
</script>

<style lang="scss">
page {
    font-family: PingFang SC;
    // background-color: #fcd805;
}

.topBannerContainer {
    width: 750rpx;
    height: 400rpx;
    position: relative;
    // margin-top: 18rpx;

    .banner {
        width: inherit;
        height: inherit;
        background-size: 100% 100%;
        background-image: url("@/static/act/pokemon/topBanner.png");
    }

    .rule {
        width: 45rpx;
        height: 128rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/pokemon/rule.png");
        position: absolute;
        right: 0rpx;
        top: 95rpx;
    }
}

.liveContainer {
    width: 750rpx;
    height: 63rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/pokemon/luckBack.png");
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;
    bottom: 4rpx;
    padding: 0 44rpx;
    // justify-content: space-between;

    .title {
        font-size: 33rpx;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #FFFFFF;
        letter-spacing: 2rpx;
    }

    .entrance {
        width: 158rpx;
        height: 45rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/pokemon/luckJump.png");
    }
}

.rank_num {
    width: 36rpx;
    height: 53rpx;
    font-size: 39rpx;
    font-family: Impact;
    font-weight: 400;
    background-size: 100% 100%;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
}

.rank1 {
    width: 23rpx;
    height: 56rpx;
    background-image: url("@/static/act/pokemon/rank1.png");
    position: relative;
    margin-left: 6rpx;
    margin-right: 7rpx;
}

.rank2 {
    width: 36rpx;
    height: 46rpx;
    background-image: url("@/static/act/pokemon/rank2.png");
}

.rank3 {
    width: 36rpx;
    height: 49rpx;
    background-image: url("@/static/act/pokemon/rank3.png");
}

.rank_avatar {
    width: 68rpx;
    height: 68rpx;
    margin-left: 34rpx;
    margin-right: 28rpx;
}

.rankPoint {
    display: flex;
    flex-direction: column;
    flex: 1;
    text-align: left;

    .get {
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FA1545;
        margin-bottom: 10rpx;
    }

    .freeze {
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #A0BED8;
    }
}


.jb {
    justify-content: space-between;
}

.rankContainer {
    width: 750rpx;
    height: 1260rpx;
    background: #9f9f9f;
    display: flex;
    flex-direction: column;
    align-items: center;
    // padding-bottom: 10rpx;
    position: relative;
    bottom: 4rpx;
    box-sizing: border-box;
    padding: 22rpx 8rpx;
    overflow: hidden;

    .rankTopTitle {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 37rpx;
        padding-bottom: 25rpx;
        position: relative;

        .title {
            font-size: 33rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #FFFFFF;
            margin-bottom: 10rpx;
        }

        .tips {
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #A7A6A6;
            margin-bottom: 18rpx;
        }

        .line {
            width: 650rpx;
            height: 1rpx;
            background: #989797;
        }

        .lookDetail {
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #B6B5B5;
            position: absolute;
            right: 0rpx;
            top: 48rpx;
            text-decoration: underline;
        }
    }

    &_top {
        width: 100%;
        height: 110rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/pokemon/red_bg.png");
        display: flex;
        align-items: center;
        flex-direction: column;
        position: relative;

        .title {
            width: 386rpx;
            height: 47rpx;
            background-size: 100% 100%;
            background-image: url("@/static/act/pokemon/text.png");
            margin-top: 18rpx;
        }

        .text {
            font-size: 22rpx;
            font-weight: 400;
            color: #FAF6EA;
            margin-top: 6rpx;
        }

        .jfmx {
            font-size: 24rpx;
            font-family: Microsoft YaHei;
            font-weight: 400;
            text-decoration: underline;
            color: #FAF6EA;
            position: absolute;
            right: 19rpx;
            bottom: 24rpx;
        }
    }

    &_bottom {
        // width: 100%;
        width: 736rpx;
        left: 0;
        right: 0;
        margin: auto;
        height: 128rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/pokemon/blue_bg.png");
        position: fixed;
        bottom: 0;

        .goBuy {
            width: 412rpx;
            height: 94rpx;
            background-size: 100% 100%;
            background-image: url("@/static/act/pokemon/goBuy.png");
        }
    }

    &_rank {
        width: 100%;
        box-sizing: border-box;
        height: 978rpx;
        border-left: 6rpx solid #000000;
        border-right: 6rpx solid #000000;
        background-color: #c7c6c9;
        display: flex;
    }

    .longRank {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}



.rank_userName {
    color: #333333;
    font-size: 23rpx;
    font-weight: bold;
    width: 60rpx;
    white-space: nowrap;
    margin-right: 18rpx;
}

.rank_reward {
    width: 76rpx;
    height: 76rpx;
}

.rank_tr {
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 46rpx;
    margin-bottom: 18rpx;

    .rankNum {
        font-size: 24rpx;
        font-family: Impact;
        color: #212529;
        margin-right: 80rpx;
        margin-left: 20rpx;
        position: relative;
        top: 20rpx;
    }



    .rank_right {

        color: #333333;
        display: flex;
        flex-direction: column;
        text-align: left;

        view {
            font-size: 23rpx;
            font-family: PingFang SC;
            font-weight: 400;
        }
    }

    .rankReward {
        width: 76rpx;
        height: 76rpx;
    }

    .leftCorner {
        width: 152rpx;
        height: 49rpx;
        position: absolute;
        left: 0;
        letter-spacing: 1rpx;
        top: 0;
        font-size: 24rpx;
        font-weight: 400;
        color: #FAF6EA;
    }

}

.rank_tr_my {
    .rankNum {
        font-size: 24rpx;
        font-family: Impact;
        color: #212529;
        margin-right: 80rpx;
        margin-left: 20rpx;
        position: relative;
        top: 20rpx;
    }

    .rank_avatar {
        width: 68rpx;
        height: 68rpx;
        border-radius: 50%;
        margin-right: 16rpx;
    }
}

.rank_tr_bg {
    width: 660rpx;
    height: 118rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/pokemon/normal_bg.png");
}

.red_bg {
    background-image: url("@/static/act/pokemon/my.png");
}

.ran1_bg {
    background-image: url("@/static/act/pokemon/rank1_bg.png");
}

.ran2_bg {
    background-image: url("@/static/act/pokemon/rank2_bg.png");
}

.ran3_bg {
    background-image: url("@/static/act/pokemon/rank3_bg.png");
}
</style>
