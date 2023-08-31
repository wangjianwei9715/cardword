<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-11-07 17:20:31
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-08-30 13:54:55
 * @FilePath: \jichao_app_2\src\pages\act\merchantRank\sib\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="pageBg">
            <image src="/static/act/merchantRank/hammer/back.png"></image>
        </view>
        <view class="nav">
            <view class="status" :style="{ paddingTop: app.statusBarHeight + 'px' }"></view>
            <view class="a uni-flex" style="justify-content: space-between;align-items:center;">
                <view class="pageBack" @click="app.platform.pageBack()"></view>
            </view>
        </view>
        <view class="topBanner">
            <view class="rule" @click="onClickRule">
                <view class="ruleBlock">
                    <view class="txt" style="line-height: 28rpx;">规则</view>
                    <view class="txt" style="line-height: 28rpx;">说明</view>
                </view>
            </view>
        </view>
        <view class="t1">
        </view>
        <view class="awardContainer">
            <view class="salesWrap">
                <view class="saleNum">{{ formatNumber(nowAmount, 2) }}</view>
                <view class="saleText">当前销量</view>
            </view>
            <view class="awardWrap" v-for="(item, index) in awardList" :key="index"
                :style="{ marginRight: index == awardList.length - 1 ? 0 : `18rpx` }"
                @click="previewImage({ pic: item.pic_url, name: item.name })">
                <view class="award">
                    <image :src="$parsePic(item.pic_url)" mode="aspectFill"></image>
                    <view class="mask flexCenter" v-if="nowAmount && nowAmount < item.amount">待解锁</view>
                </view>
                <view class="target">{{ formatNumber(item.amount || 0, 2) }}</view>
            </view>
        </view>
        <view class="rankContainer">
            <view
                style="position: absolute;left: 0;right: 0;margin: auto;width: 720rpx;display: flex;flex-direction: column;">
                <image src="/static/act/merchantRank/hammer/back_1.png" style="width: 720rpx;height: 1000rpx;"></image>
                <image src="/static/act/merchantRank/hammer/back_2.png" style="width: 720rpx;height: 910rpx;"></image>
            </view>
            <view class="rankP">
                <view class="rankTitle"></view>
                <view class="rankTopTitle">
                    <view class="tips">{{ parseTips().tips || "" }} {{ parseTips().time || "" }}</view>
                    <navigator url="/pages/act/merchantRank/hammer/detail" hover-class="none"
                        class="sp-tips-index sp-tips-index2">
                        <view class="lookDetail">查看积分明细</view>
                    </navigator>
                </view>
                <view class="rank_tr_my">
                    <view class="leftCorner flexCenter">我的成绩</view>
                    <view class="rankNum">{{ myRank.rank }}</view>
                    <muqian-lazyLoad class="rank_avatar" borderRadius="50%"
                        :src="myRank.avatar ? $parsePic(myRank.avatar) : defaultAvatar" />
                    <view class="rankPoint">
                        <view class="get">已获取：{{ myRank.get_score }}</view>
                        <view class="freeze">冻结中：{{ myRank.lock_score }}</view>
                    </view>
                    <muqian-lazyLoad v-if="myRank.isPass" class="rankReward" borderRadius="3rpx"
                        :src="$parsePic(myRank.awardPic)" />
                    <view class="rank_right" v-else>
                        <view style="margin-bottom: 10rpx;">距离入榜还需</view>
                        <view>{{ myRank.passScore }}</view>
                    </view>
                </view>
                <view class="rank_tr" v-for="(item, index) in rankList">
                    <view class="rank_num" :class="[index <= 2 ? `rank${index + 1}` : '']">{{ index > 2 ? (index + 1) : ""
                    }}
                    </view>
                    <muqian-lazyLoad class="rank_avatar" borderRadius="50%"
                        :src="item.avatar ? $parsePic(item.avatar) : (item.userName == '虚位以待' ? '/static/goods/v2/waitAvatar.png' : defaultAvatar)" />
                    <view class="rank_userName">{{ item.userName }}</view>
                    <view class="rankPoint" v-if="item.get_score || item.lock_score">
                        <view class="get">已获取：{{ item.get_score }}</view>
                        <view class="freeze">冻结中：{{ item.lock_score }}</view>
                    </view>
                    <view v-else style="flex:1"></view>
                    <muqian-lazyLoad class="rank_reward" v-if="item.awardPic_url" borderRadius="3rpx"
                        @click="previewImage(item)" :src="$parsePic(item.awardPic_url)" />
                </view>
            </view>
        </view>
        <view class="a" style="height: 120rpx;"></view>
        <view class="letsgo flexCenter" @click="goBuy">
            <image src="@/static/act/merchantRank/hammer/add.png"></image>
            <view>立即上车</view>
        </view>
        <previewImage ref="previewImage" />
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component, Watch, Prop } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { parsePic, dateFormatMSHMS, dateFormatMS } from '@/tools/util'
const activityTp = 10
@Component({})
export default class ClassName extends BaseNode {
    @Prop({ default: 0 })
    seriesId?: number;
    @Prop({ default: 0 })
    roomId?: number;

    rankList: any = []
    alias: string = ""
    parsePic = parsePic
    defaultAvatar: any = app.defaultAvatar
    app: any = app
    nowAmount: number = 0
    awardList: any = []
    myRank: any = {

    }
    topHasBack: boolean = false
    onLoad(query: any) {
        app.platform.hasLoginToken(() => {
            if (query.alias) this.alias = query.alias
            this.reqMyRank()
            this.reqAward()
        })
    }
    onShow() {
        this.reqAllRank()
    }
    onPageScroll(data: any) {
        //@ts-ignore
        // this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
    }
    goBuy() {
        if (!this.alias) this.alias = "MCT8940626"
        uni.navigateTo({
            url: `/pages/merchant/core?alias=${this.alias}&tp=1`
        })
    }
    formatNumber(number: number, keepNum = 0, type = "cn") {//
        let result = '' + number;
        if (number >= 100000000) {
            result = (number / 100000000).toFixed(keepNum) + '亿'
        } else if (number >= 10000) {
            result = (number / 10000).toFixed(keepNum) + "W"
        }
        return result;
    }
    parseTips() {
        const ActivityPeriod: any = [1693497600, 1696089599]//积分获取
        const ThawPeriod: any = [1696089600, 1697385599]//积分解冻
        const DrawPeriod: number = 1697385600//榜单结算
        // const LivePeriod: number = 1686294000//直播
        const nowTimeStamp = Math.round(+new Date() / 1000)
        if (nowTimeStamp < ActivityPeriod[0]) {
            return { tips: "暂未开始", time: `${uni.$u.date(ActivityPeriod[0], 'mm-dd')}-${uni.$u.date(ActivityPeriod[1], 'mm-dd')}` }
        };
        if (nowTimeStamp >= ActivityPeriod[0] && nowTimeStamp <= ActivityPeriod[1]) {
            return { tips: "积分获取", time: `${uni.$u.date(ActivityPeriod[0], 'mm-dd')}-${uni.$u.date(ActivityPeriod[1], 'mm-dd')}` }
        }
        if (nowTimeStamp >= ThawPeriod[0] && nowTimeStamp <= ThawPeriod[1]) {
            return {
                tips: "积分解冻", time: `${uni.$u.date(ThawPeriod[0], 'mm-dd')}-${uni.$u.date(ThawPeriod[1], 'mm-dd')}`
            }
        };
        if (nowTimeStamp > ThawPeriod[1]) {
            return {
                tips: "榜单结算",
                time: `${uni.$u.date(DrawPeriod, 'mm-dd')}`
            }
        };
    }
    onClickRule() {
        uni.navigateTo({
            url: `/pages/act/merchantRank/publicRule?activityTp=${activityTp}`,
            // animationType:"slide-in-bottom"
        })
    }
    navBackGroundShowChange(event: any) {
        this.topHasBack = event
    }
    previewImage(item: any) {
        //@ts-ignore
        this.$refs.previewImage.show({
            urls: [{ src: this.parsePic(decodeURIComponent(item.awardPic_url || item.pic)), title: item.awardName || item.name }]
        })
    }
    reqAward() {
        app.http.Get("dataApi/selectRank/award/list", { activityTp: activityTp, way: 3 }, (res: any) => {
            this.awardList = res.list || []
        })
    }
    reqMyRank() {
        app.http.Get("dataApi/selectRank/my/data", { activityTp: activityTp }, (res: any) => {
            this.myRank = res.data
        })
    }
    reqAllRank(cb?: any) {
        app.http.Get('dataApi/selectRank/list', { activityTp: activityTp }, (res: any) => {
            this.nowAmount = res.nowAmount || 0
            this.rankList = res.list || []
            cb && cb()
        })
    }
}
</script>

<style lang="scss">
page {
    font-family: PingFang SC;
    background-color: #000000;
    width: 750rpx;
    overflow-x: hidden;
    // background-image: url("@/static/act/merchantRank/hammer/back.png");
}

.nav {
    width: 750rpx;
    position: fixed;
    top: 0;
    z-index: 9;
    pointer-events: none;
    .pageBack {
        width: 55rpx;
        height: 55rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/merchantRank/back.png");

        margin-top: 10rpx;
        margin-left: 20rpx;
        pointer-events: auto;
    }

    .ruleText {
        color: #fff;
        width: 160rpx;
        // height: 60rpx;
        margin-right: 16rpx;
        font-size: 26rpx;
        background-color: rgba(0, 0, 0, .4);
        border-radius: 30rpx;
        font-weight: bold;
        padding: 10rpx 0;
    }
}

.pageBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 750rpx;

    image {
        height: 1943rpx;
        width: inherit;
        display: block;
    }
}

.topBanner {
    width: 750rpx;
    height: 542rpx;
    background-size: 100% 100%;
    position: relative;
    background-image: url("@/static/act/merchantRank/hammer/topBanner.png");

    .rule {
        right: 0rpx;
        width: 117rpx;
        height: 119rpx;
        // background: #930400;
        // border-radius: 5rpx;
        font-size: 30rpx;
        top: 68rpx;
        background-size: 100% 100%;
        position: relative;
        background-image: url("@/static/act/merchantRank/hammer/rule.png");
        position: absolute;

        .ruleBlock {

            text-align: center;
            position: absolute;
            left: 24rpx;
            top: 32rpx;

            .txt {
                font-size: 21rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #060807;
            }
        }
    }

    // .rule {
    //     width: 122rpx;
    //     height: 279rpx;
    //     background-size: 100% 100%;
    //     background-image: url("@/static/act/merchantRank/shuke/rule.png");
    //     position: absolute;
    //     top: 59rpx;
    //     right: 0;
    //     z-index: 99;

    //     .ruleBlock {
    //         width: 100rpx;
    //         height: 90rpx;
    //         margin-top: 18rpx;
    //         margin-left: 2rpx;
    //         // background-color: rgba(0, 0, 0, .3);
    //         flex-direction: column;

    //         .txt {
    //             font-size: 21rpx;
    //             font-family: PingFang SC;
    //             font-weight: bold;
    //             color: #FFFFFF;
    //             line-height: 24rpx;
    //             text-shadow: 0rpx 0rpx 8rpx #E92677;
    //         }
    //     }
    // }

    // z-index: 3;
}

.t1 {
    width: 750rpx;
    height: 82rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/merchantRank/hammer/s_banner.png");
    position: relative;
    // margin-bottom: 20rpx;

    .t1Text {
        width: 750rpx;
        font-size: 42rpx;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        height: 68rpx;
        color: #FFFFFF;
    }
}


.t3 {
    width: 750rpx;
    height: 94rpx;
}


.rank_tr {
    display: flex;
    align-items: center;
    width: 650rpx;
    height: 135rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 4rpx 13rpx 0rpx rgba(190, 144, 29, .66);
    border-radius: 3rpx;
    position: relative;
    box-sizing: border-box;
    padding: 0rpx 17rpx 0rpx 20rpx;
    align-items: center;
    margin-bottom: 15rpx;
}

.rank_num {
    width: 58rpx;
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
    background-image: url("@/static/act/merchantRank/rank1.png");
}

.rank2 {
    background-image: url("@/static/act/merchantRank/rank2.png");
}

.rank3 {
    background-image: url("@/static/act/merchantRank/rank3.png");
}

.rank_avatar {
    width: 50rpx;
    height: 50rpx;
    margin-left: 41rpx;
    margin-right: 16rpx;
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
        color: #C4232B;
        margin-bottom: 10rpx;
    }

    .freeze {
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #A0BED8;
    }
}

.rank_tips {
    width: inherit;
    box-sizing: border-box;
    padding: 0 30rpx;
    display: flex;
    font-size: 23rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FEFEFE;
    margin-top: 28rpx;
    justify-content: center;
    margin-bottom: 22rpx;
    align-items: center;

    .tips {
        font-size: 23rpx;
    }
}

.jb {
    justify-content: space-between;
}

.rankContainer {
    width: 750rpx;
    // background: #4A5B5D;
    // border-radius: 18rpx 18rpx 3rpx 3rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    // padding-bottom: 10rpx;
    // margin-top: 34rpx;
    height: 2000rpx;
    margin-top: 14rpx;
    // margin-top: -20rpx;
    // background-image: url("@/static/act/merchantRank/sib/rankBack.jpg");
    background-size: 100% 100%;
    // .fakerTtitle{
    //     width: 750rpx;
    //     background-size: 100% 100%;
    //     background-image: url("@/static/act/merchantRank/sib/rankTitle.jpg");
    //     height: 146rpx;

    // }
}

.awardContainer {
    width: 720rpx;
    height: 210rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/merchantRank/hammer/award_back.png");
    box-sizing: border-box;
    padding: 0 36rpx;
    display: flex;
    position: relative;
    align-items: center;
    margin-top: 12rpx;

    .salesWrap {
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;
        margin-right: 22rpx;
        // background-color: red;
        // width: 130rpx;
        min-width: 130rpx;

        .saleNum {
            font-size: 33rpx;
            font-family: Impact;
            font-weight: 400;
            color: #FFE400;
            // line-height: 32rpx;
            -webkit-text-stroke: 2rpx #000000;
            text-stroke: 2rpx #000000;
            text-align: center;
        }
    }

    .saleText {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        text-align: center;
    }

    .awardWrap {
        width: 110rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        .award {
            position: relative;
            width: inherit;
            height: 110rpx;
            border-radius: 3rpx;
            overflow: hidden;

            image {
                width: inherit;
                height: inherit;
            }

            .mask {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                background-color: rgba(0, 0, 0, .61);
                font-size: 25rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FFE400;
            }
        }

        .target {
            font-size: 25rpx;
            font-family: Impact;
            font-weight: 400;
            color: #FFE400;
            line-height: 32rpx;
            -webkit-text-stroke: 2rpx #000000;
            text-stroke: 2rpx #000000;
            position: relative;
            top: 6rpx;
        }

        // height: 110px;
    }
}

.rankP {
    // position: absolute;
    width: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    // background-color: #fbabae;
    // box-shadow: inset 0px 0px 14rpx 14rpx rgba(157, 0, 0, 0.3);
    position: relative;
    // padding-top: 120rpx;

    // bottom: 30rpx;
    // z-index: 1;
    .rankTitle {
        width: 346rpx;
        height: 63rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/merchantRank/hammer/rank_title.png");
        margin-top: 28rpx;
    }

    .rankTopTitle {
        display: flex;
        width: 650rpx;
        // justify-content: space-between;
        justify-content: space-between;
        // align-items: center;
        position: relative;
        margin-top: 8rpx;

        // padding: 0 50rpx;
        .tips {
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 400;
            text-decoration: underline;
            color: #ffffff;
        }

        .lookDetail {
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 400;
            text-decoration: underline;
            color: #ffffff;
        }
    }
}

.rank_tag {
    display: flex;
    color: #fff;
    box-sizing: border-box;
    // margin: 20rpx 0;
    position: relative;
    height: 110rpx;
    width: inherit;

    .tag_item {
        width: 372rpx;
        height: 110rpx;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #FFF6D6;
        position: absolute;
        justify-content: center;
    }

    .tag_item_select {
        color: #F1075A;
    }

    .tag_title {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
    }

    .tag_time {
        font-size: 21rpx;
        font-family: PingFang SC;
    }

    .tag_left {
        left: 0;
    }
}



.rank_userName {
    color: #333333;
    font-size: 23rpx;
    font-weight: bold;
    width: 90rpx;
    white-space: nowrap;
    margin-right: 25rpx;
}

.rank_reward {
    width: 105rpx;
    height: 105rpx;
}

.rank_normal {
    font-size: 26rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
}

.rank_tr_my {
    width: 650rpx;
    height: 160rpx;
    // border: 4rpx solid #FA1545;
    border-radius: 3rpx;
    box-sizing: border-box;
    margin-bottom: 53rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 4rpx 13rpx 0rpx rgba(190, 144, 29, .66);
    border-radius: 3rpx;
    position: relative;
    margin-top: 32rpx;
    display: flex;
    align-items: center;
    padding: 0 20rpx;

    .rankNum {
        // width: 80rpx;
        // text-align: center;
        font-size: 39rpx;
        font-family: Impact;
        font-weight: 400;
        color: #333333;
        margin-right: 20rpx;
        margin-left: 20rpx;
    }

    .rank_avatar {
        width: 89rpx;
        height: 89rpx;
        border-radius: 50%;
        margin-left: 20rpx;
        margin-right: 30rpx;
    }

    .rank_right {

        color: #333333;
        display: flex;
        flex-direction: column;
        text-align: right;

        view {
            font-size: 23rpx;
            font-family: PingFang SC;
            font-weight: 400;
        }
    }

    .rankReward {
        width: 105rpx;
        height: 105rpx;
    }

    .leftCorner {
        width: 112rpx;
        height: 32rpx;
        position: absolute;
        left: 0;
        top: 0;
        // background-size: 100% 100%;
        // background-color: #950101;
        background-image: url("@/static/act/merchantRank/hammer/tag.png");
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #F3BD79;
    }

}

.letsgo {
    width: 750rpx;
    height: 120rpx;
    // background: #FA1545;
    background-size: 100% 100%;
    // background-color: #950101;
    background-image: url("@/static/act/merchantRank/hammer/goBuy.png");
    position: fixed;
    bottom: 0;

    image {
        display: block;
        width: 42rpx;
        height: 42rpx;
        margin-right: 18rpx;
    }

    view {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #D21F25;
        letter-spacing: 2rpx;
    }
}
</style>
