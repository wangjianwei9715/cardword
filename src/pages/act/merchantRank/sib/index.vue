<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-11-07 17:20:31
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-08-31 17:00:46
 * @FilePath: \jichao_app_2\src\pages\act\merchantRank\sib\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <!-- <transitionNav ref='transitionNav'  @navBackGroundShowChange="navBackGroundShowChange" :needIconShadow="true"
            title="舒克">
            <template slot="slotRight">
                <view class="rightTitle" :style="{ color: topHasBack ? '#333' : '#fff' }" @click="onClickRule">规则说明</view>
            </template>
        </transitionNav> -->
        <!-- <view class="nav">
            
        </view> -->
        <view class="nav">
            <view class="status" :style="{ paddingTop: app.statusBarHeight + 'px' }"></view>
            <view class="a uni-flex" style="justify-content: space-between;align-items:center;">
                <view class="pageBack" @click="app.platform.pageBack()"></view>
                <view class="ruleText flexCenter" @click="onClickRule">规则说明</view>
            </view>
        </view> 
        <!-- <view class="pageBg">
            <image src="@/static/act/merchantRank/shuke/bg.png" />
            <image style="transform: rotateX(180deg);" src="@/static/act/merchantRank/shuke/bg.png" />
        </view> -->
        <view class="topBanner">
            <!-- <view class="rule flexCenter" @click="onClickRule">规则说明</view> -->
            <!-- <view class="rule" @click="onClickRule">
                <view class="ruleBlock flexCenter">
                    <view class="txt">规则</view>
                    <view class="txt">说明</view>
                </view>
            </view> -->
        </view>
        <view class="t1">
            <!-- <view class="t1Text flexCenter">感恩回馈，入榜前15可享丰厚奖励</view> -->
        </view>
        <view class="rankContainer">
            <!-- <view class="t2"></view>
            <view class="t2"></view> -->
            <!-- <view class="t2Down"></view> -->
            <!-- <view class="t2"></view> -->
            <!-- <view class="fakerTtitle" style="z-index: 2;"></view> -->
            <view class="rankP">
                <view class="rankTopTitle">
                    <view class="tips">{{ parseTips().tips || "" }} {{ parseTips().time || "" }}</view>
                    <!-- <view class="line"></view> -->
                    <navigator url="/pages/act/merchantRank/sib/detail" hover-class="none"
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
                    <!-- <image v-else src="@/static/act/portable/luck.png" class="rank_reward" style="border-radius: 3rpx;" /> -->
                </view>
            </view>
        </view>

        <!-- <image class="t3" src="@/static/act/merchantRank/shuke/t3.png"></image> -->
        <!-- view.rank -->
        <!-- <view class="liveContainer">
            <view class="title">榜单前500名可参与幸运抽奖</view>
            <navigator :url="`/pages/act/portable/rank/live?roomId=${roomId}`" hover-class="none"
                class="sp-tips-index sp-tips-index2">
                <view class="entrance flexCenter">直播入口
                    <u-icon name="play-right-fill" color="#fff" size="28rpx"></u-icon>
                </view>
            </navigator>

        </view> -->
        <view class="a" style="height: 120rpx;"></view>
        <view class="letsgo flexCenter" @click="goBuy">
            <image src="@/static/act/merchantRank/add.png"></image>
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
    myRank: any = {

    }
    topHasBack: boolean = false
    onLoad(query: any) {
        app.platform.hasLoginToken(() => {
            if (query.alias) this.alias = query.alias
            this.reqMyRank()
            this.reqAllRank()
        })
    }
    onShow() {
    }
    onPageScroll(data: any) {
        //@ts-ignore
        // this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
    }
    goBuy() {
        if (!this.alias) this.alias = "MCT0301301"
        uni.navigateTo({
            url: `/pages/merchant/core?alias=${this.alias}&tp=1`
        })
        // uni.navigateTo({
        //     url: `/pages/goods/goods_seriesDetail?seriesId=${this.seriesId}`
        // })
    }
    parseTips() {
        const ActivityPeriod: any = [1691942400, 1694620799]//积分获取
        const ThawPeriod: any = [1694620800, 1695916799]//积分解冻
        const DrawPeriod: number = 1695916800//榜单结算
        // const LivePeriod: number = 1686294000//直播
        const nowTimeStamp = Math.round(+new Date() / 1000)
        if (nowTimeStamp < ActivityPeriod[0]) {
            return { tips: "暂未开始", time: "08.14-09.13" }
        };
        if (nowTimeStamp >= ActivityPeriod[0] && nowTimeStamp <= ActivityPeriod[1]) {
            return { tips: "积分获取", time: "08.14-09.13" }
        }
        if (nowTimeStamp >= ThawPeriod[0] && nowTimeStamp <= ThawPeriod[1]) {
            return {
                tips: "积分解冻", time: "09.14-09.28"
            }
        };
        if (nowTimeStamp > ThawPeriod[1]) {
            return {
                tips: "榜单结算",
                time: "09.29"
            }
        };
    }
    onClickRule() {
        uni.navigateTo({
            url: "/pages/act/merchantRank/publicRule?activityTp=9",
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
    reqMyRank() {
        app.http.Get("dataApi/selectRank/my/data", { activityTp: 9 }, (res: any) => {
            this.myRank = res.data
        })
    }
    reqAllRank(cb?: any) {
        app.http.Get('dataApi/selectRank/list', { activityTp: 9 }, (res: any) => {
            this.rankList = res.list || []
            cb && cb()
        })
    }
}
</script>

<style lang="scss">
page {
    font-family: PingFang SC;
    background-color: #950101;
    width: 750rpx;
    overflow-x: hidden;
    background-image: url("@/static/act/merchantRank/sib/back.jpg");
}

.nav {
    width: 750rpx;
    position: fixed;
    top: 0;
    z-index: 9;

    .pageBack {
        width: 55rpx;
        height: 55rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/merchantRank/back.png");
        
        margin-top: 10rpx;
        margin-left: 20rpx;
    }
    .ruleText{
        color: #fff;
        width: 160rpx;
        // height: 60rpx;
        margin-right: 16rpx;
        font-size: 26rpx;
        background-color: rgba(0,0,0,.4);
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

    // z-index: 2;
    // height: 1850rpx;
    // background-size: 100% 100%;
    // background-image: url("@/static/act/merchantRank/shuke/bg.png");
    image {
        height: 1850rpx;
        width: inherit;
        display: block;
    }
}

.topBanner {
    width: 750rpx;
    height: 541rpx;
    background-size: 100% 100%;
    position: relative;
    background-image: url("@/static/act/merchantRank/sib/topBanner.jpg");
    .rule {
        right: 14rpx;
        width: 125rpx;
        height: 66rpx;
        // background: #930400;
        // border-radius: 5rpx;
        font-size: 30rpx;
        top: 68rpx;
        // font-weight: bold;
        color: rgba(165, 8, 8,1);
        text-shadow: #A0BED8;
        position: absolute;
        font-family: YouSheBiaoTiHei;
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
    height: 115rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/merchantRank/sib/t1.jpg");
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
    box-shadow: 0rpx 4rpx 13rpx 0rpx rgba(149, 1, 1, .66);
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
        color: #990100;
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
    margin-top: -20rpx;
    background-image: url("@/static/act/merchantRank/sib/rankBack.jpg");
    background-size: 100% 100%;
    // .fakerTtitle{
    //     width: 750rpx;
    //     background-size: 100% 100%;
    //     background-image: url("@/static/act/merchantRank/sib/rankTitle.jpg");
    //     height: 146rpx;

    // }
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
    padding-top: 120rpx;
    // bottom: 30rpx;
    // z-index: 1;
    .rankTopTitle {
        display: flex;
        width: 650rpx;
        // justify-content: space-between;
        justify-content: space-between;
        // align-items: center;
        position: relative;
        margin-top: 40rpx;

        // padding: 0 50rpx;
        .tips {
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 400;
            text-decoration: underline;
            color: #333333;
        }

        .lookDetail {
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 400;
            text-decoration: underline;
            color: #333333;
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
    margin-bottom: 36rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 4rpx 13rpx 0rpx rgba(149, 1, 1, .66);
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
        background-color: #950101;
        // background-image: url("@/static/act/merchantRank/shuke/leftA.png");
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF
    }

}

.letsgo {
    width: 750rpx;
    height: 120rpx;
    // background: #FA1545;
    background-size: 100% 100%;
    background-color: #950101;
    // background-image: url("@/static/act/merchantRank/shuke/gobuy.png");
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
        color: #FFFFFF;
        letter-spacing: 2rpx;
    }
}</style>
