<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-11-07 17:20:31
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-05-19 15:33:03
 * @FilePath: \jichao_app_2\src\pages\act\worldCup\rank.vue
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
            <view class="pageBack" @click="app.platform.pageBack()"></view>
        </view>
        <view class="pageBg">
            <image src="@/static/act/merchantRank/shuke/bg.png" />
            <image style="transform: rotateX(180deg);" src="@/static/act/merchantRank/shuke/bg.png" />
        </view>
        <view class="topBanner">
            <view class="rule" @click="onClickRule">
                <view class="ruleBlock flexCenter">
                    <view class="txt">规则</view>
                    <view class="txt">说明</view>
                </view>
            </view>
        </view>
        <view class="t1">
            <view class="t1Text flexCenter">感恩回馈，入榜前15可享丰厚奖励</view>
        </view>
        <view class="rankContainer">
            <view class="t2"></view>
            <view class="t2"></view>
            <view class="t2Down"></view>
            <!-- <view class="t2"></view> -->
            <view class="rankP">
                <view class="rankTopTitle">
                    <view class="tips">{{ parseTips().tips || "" }} {{ parseTips().time || "" }}</view>
                    <!-- <view class="line"></view> -->
                    <navigator url="/pages/act/merchantRank/shuke/detail" hover-class="none"
                        class="sp-tips-index sp-tips-index2">
                        <view class="lookDetail">查看积分明细</view>
                    </navigator>
                </view>
                <view class="rank_tr_my">
                    <view class="leftCorner flexCenter">我的成绩</view>
                    <view class="rankNum">{{ myRank.rank }}</view>
                    <muqian-lazyLoad class="rank_avatar" borderRadius="50%"
                        :src="myRank.avatar ? $parsePic(decodeURIComponent(myRank.avatar)) : defaultAvatar" />
                    <view class="rankPoint">
                        <view class="get">已获取：{{ myRank.get_score }}</view>
                        <view class="freeze">冻结中：{{ myRank.lock_score }}</view>
                    </view>
                    <muqian-lazyLoad v-if="myRank.isPass" class="rankReward" borderRadius="3rpx"
                        :src="$parsePic(decodeURIComponent(myRank.awardPic))" />
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
                        :src="item.avatar ? $parsePic(decodeURIComponent(item.avatar)) : (item.userName == '虚位以待' ? '/static/goods/v2/waitAvatar.png' : defaultAvatar)" />
                    <view class="rank_userName">{{ item.userName }}</view>
                    <view class="rankPoint" v-if="item.get_score || item.lock_score">
                        <view class="get">已获取：{{ item.get_score }}</view>
                        <view class="freeze">冻结中：{{ item.lock_score }}</view>
                    </view>
                    <view v-else style="flex:1"></view>
                    <muqian-lazyLoad class="rank_reward" v-if="item.awardPic_url" borderRadius="3rpx"
                        @click="previewImage(item)" :src="$parsePic(decodeURIComponent(item.awardPic_url))" />
                    <!-- <image v-else src="@/static/act/portable/luck.png" class="rank_reward" style="border-radius: 3rpx;" /> -->
                </view>
            </view>
        </view>

        <image class="t3" src="@/static/act/merchantRank/shuke/t3.png"></image>
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
        <view class="rankContainer">

            <!-- <template>
               
                
            </template> -->

        </view>
        <view class="letsgo flexCenter" @click="goBuy">
            <image src="@/static/act/portable/add.png"></image>
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
    alias:string=""
    parsePic = parsePic
    defaultAvatar: any = app.defaultAvatar
    app: any = app
    myRank: any = {

    }
    topHasBack: boolean = false
    onLoad(query:any) {
        app.platform.hasLoginToken(() => {
            if (query.alias) this.alias=query.alias
            this.reqMyRank()
            this.reqAllRank()
        })
    }
    onShow(){
    }
    onPageScroll(data: any) {
        //@ts-ignore
        // this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
    }
    goBuy() {
        if(!this.alias) this.alias="MCT4246736"
        uni.navigateTo({
            url: `/pages/merchant/core?alias=${this.alias}&tp=1`
        })
        // uni.navigateTo({
        //     url: `/pages/goods/goods_seriesDetail?seriesId=${this.seriesId}`
        // })
    }
    parseTips() {
        const ActivityPeriod: any = [1684512000, 1685116799]//积分获取
        const ThawPeriod: any = [1685116800, 1685721599]//积分解冻
        const DrawPeriod: number = 1685721600//榜单结算
        // const LivePeriod: number = 1686294000//直播
        const nowTimeStamp = Math.round(+new Date() / 1000)
        if (nowTimeStamp < ActivityPeriod[0]) {
            return { tips: "暂未开始", time: "05.20-05.26" }
        };
        if (nowTimeStamp >= ActivityPeriod[0] && nowTimeStamp <= ActivityPeriod[1]) {
            return { tips: "积分获取", time: "05.20-05.26" }
        }
        if (nowTimeStamp >= ThawPeriod[0] && nowTimeStamp <= ThawPeriod[1]) {
            return {
                tips: "积分解冻", time: "05.27-06.02"
            }
        };
        if (nowTimeStamp > ThawPeriod[1] && nowTimeStamp < DrawPeriod) {
            return {
                tips: "榜单结算",
                time: "06.03"
            }
        };
        // if (nowTimeStamp > DrawPeriod && nowTimeStamp <= LivePeriod) {
        //     return {
        //         tips: "直播抽奖",
        //         time: "06-09 15:00"
        //     }
        // }
        // if (nowTimeStamp >= DrawPeriod) {
        //     return {
        //         tips: "榜单结算",
        //         time: "06.08"
        //     }
        // }
    }
    onClickRule() {
        uni.navigateTo({
            url: "/pages/act/merchantRank/shuke/rule",
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
        app.http.Get("dataApi/selectRank/my/data", { activityTp: 7 }, (res: any) => {
            this.myRank = res.data
        })
    }
    reqAllRank(cb?: any) {
        app.http.Get('dataApi/selectRank/list', { activityTp: 7 }, (res: any) => {
            this.rankList = res.list || []
            cb && cb()
        })
    }
}
</script>

<style lang="scss">
page {
    font-family: PingFang SC;
    background-color: #fcaed2;
    width: 750rpx;
    overflow-x: hidden;
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
        background-image: url("@/static/act/merchantRank/shuke/back.png");
        // background-color: #fff;
        margin-top: 10rpx;
        margin-left: 20rpx;
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
    background-image: url("@/static/act/merchantRank/shuke/topBanner.png");

    .rule {
        width: 122rpx;
        height: 279rpx;
        background-size: 100% 100%;
        background-image: url("@/static/act/merchantRank/shuke/rule.png");
        position: absolute;
        top: 59rpx;
        right: 0;

        .ruleBlock {
            width: 100rpx;
            height: 90rpx;
            margin-top: 18rpx;
            margin-left: 2rpx;
            // background-color: rgba(0, 0, 0, .3);
            flex-direction: column;
            .txt {
                font-size: 21rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #FFFFFF;
                line-height: 24rpx;
                text-shadow: 0rpx 0rpx 8rpx #E92677;
            }
        }
    }

    // z-index: 3;
}

.t1 {
    width: 750rpx;
    height: 193rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/merchantRank/shuke/t1.png");
    position: relative;

    .t1Text {
        width: 750rpx;
        font-size: 42rpx;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        height: 68rpx;
        color: #FFFFFF;
    }
}

.t2 {
    width: 750rpx;
    height: 855rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/merchantRank/shuke/t2.png");
    position: relative;
}
.t2Down {
    width: 750rpx;
    height: 773rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/merchantRank/shuke/t2Down.png");
    position: relative;
}

.t3 {
    width: 750rpx;
    height: 94rpx;
}

.liveContainer {
    width: 750rpx;
    height: 75rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/portable/liveBack.png");
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 50rpx;
    justify-content: space-between;

    .title {
        font-size: 33rpx;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #FFFFFF;
        letter-spacing: 2rpx;
    }

    .entrance {
        width: 168rpx;
        height: 43rpx;
        border: 2rpx solid #FFFFFF;
        border-radius: 21rpx;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;

        text {
            font-size: 22rpx;
            margin-left: 4rpx;
        }
    }
}

.rank_tr {
    display: flex;
    align-items: center;
    width: 650rpx;
    height: 135rpx;
    background: #FFFFFF;
    box-shadow: 0px 4rpx 13rpx 0rpx #E74B82;
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
    background-image: url("@/static/act/merchantRank/shuke/rank1.png");
}

.rank2 {
    background-image: url("@/static/act/merchantRank/shuke/rank2.png");
}

.rank3 {
    background-image: url("@/static/act/merchantRank/shuke/rank3.png");
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
        color: #E74B82;
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


}

.rankP {
    position: absolute;
    top: 0;
    left: 0;
    width: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    // width: inherit;
    // padding: 0 50rpx;
    // background-color: red;
    .rankTopTitle {
        display: flex;
        width: 650rpx;
        // justify-content: space-between;
        justify-content: space-between;
        // align-items: center;
        position: relative;
        margin-top: 10rpx;

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

    .tag_left_noselect {
        background-image: url("@/static/act/imm/leftSelect.png");
        color: #F1075A;
    }

    .tag_right_noselect {
        background-image: url("@/static/act/imm/rightSelect.png");
        color: #F1075A;
    }

    .tag_right {
        right: 0;
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
    box-shadow: 0rpx 4rpx 13rpx 0rpx #E74B82;
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
        position: absolute;
        left: 0;
        top: 0;
        background-size: 100% 100%;
        background-image: url("@/static/act/merchantRank/shuke/leftA.png");
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
    background-image: url("@/static/act/merchantRank/shuke/gobuy.png");
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
