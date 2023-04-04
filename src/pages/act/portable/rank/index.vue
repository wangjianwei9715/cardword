<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-11-07 17:20:31
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-04-03 14:54:35
 * @FilePath: \jichao_app_2\src\pages\act\worldCup\rank.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="liveContainer">
            <view class="title">榜单前500名可参与幸运抽奖</view>
            <navigator :url="`/pages/act/portable/rank/live?roomId=${roomId}`" hover-class="none"
                class="sp-tips-index sp-tips-index2">
                <view class="entrance flexCenter">直播入口
                    <u-icon name="play-right-fill" color="#fff" size="28rpx"></u-icon>
                </view>
            </navigator>

        </view>
        <view class="rankContainer">
            <view class="rankTopTitle">
                <view class="title">积分明细</view>
                <view class="tips">进行中（3.16-3.17）</view>
                <view class="line"></view>
                <navigator url="/pages/act/portable/rank/detail" hover-class="none" class="sp-tips-index sp-tips-index2">
                    <view class="lookDetail">查看积分明细</view>
                </navigator>

            </view>
            <template>
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
                        :src="myRank.awardPic ? $parsePic(decodeURIComponent(myRank.awardPic)) : 'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2023.04.03/goods/pintuan0/1680504731674p6u39hfh3h.png'" />
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
                    <image v-else src="@/static/act/portable/luck.png" class="rank_reward" style="border-radius: 3rpx;" />
                </view>
            </template>
            <view class="letsgo flexCenter" @click="goBuy">
                <image src="@/static/act/portable/add.png"></image>
                <view>立即上车</view>
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
    @Prop({ default: 0 })
    seriesId?: number;
    @Prop({ default: 0 })
    roomId?: number;

    rankList: any = []
    parsePic = parsePic
    defaultAvatar: any = app.defaultAvatar
    myRank: any = {

    }
    mounted() {
        app.platform.hasLoginToken(() => {
            this.reqMyRank()
            this.reqAllRank()
        })
    }
    goBuy() {
        uni.navigateTo({
            url: `/pages/goods/goods_seriesDetail?seriesId=${this.seriesId}`
        })
    }
    previewImage(item: any) {
        //@ts-ignore
        this.$refs.previewImage.show({
            urls: [{ src: this.parsePic(decodeURIComponent(item.awardPic_url || item.pic)), title: item.awardName || item.name }]
        })
    }
    reqMyRank() {
        app.http.Get("dataApi/selectRank/my/data", { activityTp: 5 }, (res: any) => {
            this.myRank = res.data
        })
    }
    reqAllRank(cb?: any) {
        app.http.Get('dataApi/selectRank/list', { activityTp: 5 }, (res: any) => {
            this.rankList = res.list || []
            cb && cb()
        })
    }
}
</script>

<style lang="scss">
page {
    font-family: PingFang SC;
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
    box-shadow: 0px 4rpx 13rpx 0rpx #4A5B5D;
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
    background-image: url("@/static/act/portable/rank1.png");
}

.rank2 {
    background-image: url("@/static/act/portable/rank2.png");
}

.rank3 {
    background-image: url("@/static/act/portable/rank3.png");
}

.rank_avatar {
    width: 50rpx;
    height: 50rpx;
    margin-left: 28rpx;
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
    width: 710rpx;
    background: #4A5B5D;
    border-radius: 18rpx 18rpx 3rpx 3rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10rpx;
    margin-top: 34rpx;

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
            font-weight: 600;
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
        font-weight: 600;
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
    font-weight: 600;
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
    font-weight: 600;
    color: #FFFFFF;
}

.rank_tr_my {
    width: 650rpx;
    height: 160rpx;
    border: 4rpx solid #FA1545;
    border-radius: 3rpx;
    box-sizing: border-box;
    margin-bottom: 36rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 4rpx 13rpx 0rpx #4A5B5D;
    border-radius: 3rpx;
    position: relative;
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
        margin-right: 10rpx;
        margin-left: 20rpx;
    }

    .rank_avatar {
        width: 89rpx;
        height: 89rpx;
        border-radius: 50%;
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
        width: 105rpx;
        height: 105rpx;
    }

    .leftCorner {
        width: 109rpx;
        height: 33rpx;
        background: linear-gradient(90deg, #C1976F, #FEF1C7, #CCA27C);
        border-radius: 0rpx 0rpx 5rpx 0rpx;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #0C2853;
    }

}

.letsgo {
    width: 750rpx;
    height: 120rpx;
    background: #FA1545;

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
        font-weight: 600;
        color: #FFFFFF;
        letter-spacing: 2rpx;
    }
}</style>
