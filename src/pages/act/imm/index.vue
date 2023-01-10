<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-01-10 15:11:49
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-01-10 17:47:30
 * @FilePath: \card-world\src\pages\act\imm\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <transitionNav @getNavHeight="getNavHeight" ref='transitionNav' :needIconShadow="false" title="冲排名 赢豪礼">
            <template slot="slotRight">
                <navigator url="/pages/act/imm/rule" hover-class="none" class="sp-tips-index sp-tips-index2">
                    <view class="rightTitle">规则说明</view>
                </navigator>

            </template>
        </transitionNav>
        <view class="topBannerContainer">
            <u-button text="立即上车" @click="onClickGoBuy"
                style="position:absolute ;bottom:0;width:200rpx;left:0;right:0;margin:auto;"></u-button>
        </view>
        <view class="rank_tag">
            <view class="tag_item" :class="{ tag_item_select: rankTag.index == index }"
                v-for="(item, index) in rankTag.list" @click="onClickTagChange(item, index)">
                <view class="tag_title">{{ item.label }}</view>
                <view class="tag_time">{{ isNumber(item.timeStamp) ?dateFormatMSHMS(item.timeStamp, '.') :
                `${dateFormatMS(item.timeStamp[0], '.')}~${dateFormatMS(item.timeStamp[1], '.')}`
                }} {{ item.timeTips || "" }}</view>
            </view>
        </view>
        <view class="rank_tips">
            <view class="tips">{{ rankTag.list[rankTag.index].tips }}</view>
            <view class="lookLive" v-if="rankTag.index == 1">观看直播</view>
        </view>
        <template v-if="rankTag.index == 0">
            <view class="rank_tr" :class="{ rank_my: item.isMy }" v-for="(item, index) in rankList">
                <view class="rank_num">{{ index+ 1 }}</view>
                <muqian-lazyLoad class="rank_avatar" borderRadius="50%"
                    :src="item.avatar ? $parsePic(decodeURIComponent(item.avatar)) : (item.userName == '虚位以待' ? '/static/goods/v2/waitAvatar.png' : defaultAvatar)" />
                <view class="rank_pointInfo">
                    <view class="rank_userName">{{ item.userName }}</view>
                    <view class="rank_point" v-if="item.userName !== '虚位以待'">
                        {{`积分${item.get_score}(冻结${item.lock_score})`}}
                    </view>
                </view>
                <muqian-lazyLoad class="rank_reward" borderRadius="3rpx" @click="previewImage(item)"
                    :src="$parsePic(decodeURIComponent(item.awardPic_url))" />
            </view>
        </template>
        <template v-if="rankTag.index == 1">
            <view class="draw_tr" v-for="(item, index) in awardList" :key="index">
                <view class="draw_infoContainer">
                    <muqian-lazyLoad class="draw_img" borderRadius="3rpx"
                        :src="$parsePic(decodeURIComponent(item.pic_url))" />
                    <view class="draw_infoRight">
                        <view class="draw_name">{{ item.name }}</view>
                        <view class="draw_condition">
                            <view>抽奖数量:1</view>
                            <view>参与条件:前500名</view>
                        </view>
                    </view>
                </view>
                <view class="draw_onPrize">
                    <view class="prize_item gray">中奖用户:</view>
                    <view class="prize_item" v-for="(prizeItem, prizeIndex) in 10">
                        <muqian-lazyLoad borderRadius="50%" class="avatar"
                            :src="$parsePic(decodeURIComponent('https://ka-world.oss-cn-shanghai.aliyuncs.com/images/1673338643088ez638ekfaf'))" />
                        <view class="name">张*</view>
                    </view>
                </view>
            </view>
        </template>
        <view class="bottomSafeArea" style="height:140rpx"></view>
        <view class="bottomFixedPay">
            <view class="payContainer">
                <view class="rank_num">{{ myRank.rank || '获取中' }}</view>
                <muqian-lazyLoad borderRadius="50%" class="rank_avatar"
                    :src="myRank.avatar ? $parsePic(decodeURIComponent(myRank.avatar)) : defaultAvatar"></muqian-lazyLoad>
                <view class="rank_pointInfo">
                    <view class="rank_userName">{{ myRank.userName }}</view>
                    <view class="rank_point">{{`积分${myRank.get_score}(冻结${myRank.lock_score})`}}</view>
                </view>
                <template v-if="rankTag.index == 0">
                    <muqian-lazyLoad class="rank_reward" borderRadius="3rpx" v-if="myRank.isPass"
                        :src="$parsePic(decodeURIComponent(myRank.awardPic_url))" />
                    <view class="rank_normal" v-if="!myRank.isPass">距离入榜还需<br>{{ myRank.passScore || '获取中' }}积分</view>
                </template>
                <template v-if="rankTag.index == 1">
                    <view class="noDraw" :class="{ canDraw: myRank.isPass }">
                        {{ myRank.isPass ? `当前排名\n可参与抽奖` : `当前排名\n不可参与抽奖` }}</view>
                </template>
            </view>
            <view class="bottomSafeArea"></view>
        </view>
        <previewImage ref="previewImage" />
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { parsePic, dateFormatMSHMS, dateFormatMS } from '@/tools/util'
@Component({})
export default class ClassName extends BaseNode {
    rankQuery: any = {
        fetchFrom: 1,
        fetchSize: 30
    }
    parsePic = parsePic
    rankList: any = []
    isFetchEnd: boolean = false
    navHeight: number = 0
    dateFormatMSHMS = dateFormatMSHMS
    dateFormatMS = dateFormatMS
    defaultAvatar: any = app.defaultAvatar
    awardList: any = []
    myRank: any = {}
    rankTag: any = {
        index: 0,
        list: [
            { label: '积分榜单', timeStamp: [1666627200, 1667923199], tips: "参与任意拼团获取积分，21-22IMM积分翻倍", timeTips: '(进行中)' },
            { label: '幸运抽奖', timeStamp: 1668787200, tips: "前500名参与幸运大抽奖" }
        ]
    }
    onLoad(query: any) {
        this.reqAllRank()
        this.reqMyRank()
        this.reqRewardList()
    }
    onPageScroll(data: any) {
        //@ts-ignore
        this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
    }
    onPullDownRefresh() {
        this.rankQuery.fetchFrom = 1
        this.reqAllRank(() => {
            uni.stopPullDownRefresh()
        })
    }
    onReachBottom() {
        // if (this.isFetchEnd) return
        // this.rankQuery.fetchFrom += this.rankQuery.fetchSize
        // this.reqAllRank()
    }
    getNavHeight(event: any) {
        this.navHeight = event
    }
    isNumber(data: any) {
        return typeof data === 'number'
    }
    onClickGoBuy() {
        uni.navigateTo({
            url: '/pages/goods/goods_seriesDetail?seriesId=3'
        })
    }
    onClickTagChange(item: any, index: number) {
        if (this.rankTag.index == index) return
        this.rankTag.index = index
    }
    previewImage(item: any) {
        //@ts-ignore
        this.$refs.previewImage.show({
            urls: [{ src: this.parsePic(decodeURIComponent(item.awardPic_url)), title: item.awardName }]
        })
    }
    reqRewardList() {
        app.http.Get('dataApi/selectRank/award/list', { isLucky: 0, activityTp: 1 }, (res: any) => {
            this.awardList = res.list || []

        })
    }
    reqAllRank(cb?: any) {
        app.http.Get('dataApi/selectRank/list', this.rankQuery, (res: any) => {
            this.isFetchEnd = res.isFetchEnd
            const dataList = res.list || []
            this.rankList = this.rankQuery.fetchFrom == 1 ? dataList : [...this.rankList, ...dataList]
            cb && cb()
        })
    }
    //我的rank
    reqMyRank() {
        app.http.Get('dataApi/selectRank/my/data', {}, (res: any) => {
            this.myRank = res.data || {}
        })
    }

}
</script>

<style lang="scss">
page {
    background: #2a2a40;
    font-family: PingFang SC;
}

.rightTitle {
    font-size: 35rpx;
    font-family: PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
}

.topBannerContainer {
    width: 750rpx;
    height: 400rpx;
    background-image: url('@/static/act/rankSelect/rankBanner.jpg');
    background-size: 100% 100%;
    position: relative;
}

.bottomFixedPay {
    width: 750rpx;
    position: fixed;
    bottom: 0;
    background-color: #fff;

    .payContainer {
        display: flex;
        box-sizing: border-box;
        width: inherit;
        height: 130rpx;
        align-items: center;
        padding: 20rpx 34rpx 30rpx 34rpx;
        justify-content: space-between;
    }
}

.rank_tr {
    display: flex;
    align-items: center;
    width: 650rpx;
    height: 160rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 4rpx 13rpx 0rpx #56160C;
    border-radius: 3rpx;
    position: relative;
    box-sizing: border-box;
    padding: 0 20rpx;
    align-items: center;
    margin-bottom: 13rpx;

    // .rankNum {
    //     width: 58rpx;
    //     height: 53rpx;
    //     background-size: 100% 100%;
    //     margin-right: 40rpx;
    //     font-size: 39rpx;
    //     font-family: Impact;
    //     font-weight: 400;
    //     color: #333333;
    // }

    // .rank1 {
    //     background-image: url("../../../static/act/rankSelect/rank1.png");
    // }

    // .rank2 {
    //     background-image: url("../../../static/act/rankSelect/rank2.png");
    // }

    // .rank3 {
    //     background-image: url("../../../static/act/rankSelect/rank3.png");
    // }

    // .rankAvatar {
    //     width: 50rpx;
    //     height: 50rpx;
    //     // background: #421D17;
    //     border-radius: 50%;
    //     margin-right: 16rpx;
    // }

    // .rankName {
    //     font-size: 23rpx;
    //     font-family: PingFang SC;
    //     font-weight: 400;
    //     color: #333333;
    //     width: 140rpx;
    // }

    // .line2 {
    //     text-overflow: -o-ellipsis-lastline;
    //     overflow: hidden; //溢出内容隐藏
    //     text-overflow: ellipsis; //文本溢出部分用省略号表示
    //     display: -webkit-box; //特别显示模式
    //     -webkit-line-clamp: 2; //行数
    //     line-clamp: 2;
    //     -webkit-box-orient: vertical; //盒子中内容竖直排列
    // }

    // .rankPoint {
    //     display: flex;
    //     flex-direction: column;
    //     flex: 1;
    //     // background-color: red;
    //     text-align: center;

    //     .get {
    //         font-size: 23rpx;
    //         font-family: PingFang SC;
    //         font-weight: 400;
    //         color: #6E1E11;
    //         margin-bottom: 10rpx;
    //     }

    //     .freeze {
    //         font-size: 23rpx;
    //         font-family: PingFang SC;
    //         font-weight: 400;
    //         color: #A0BED8;
    //     }
    // }

    // .rankReward {
    //     width: 105rpx;
    //     height: 105rpx;
    //     // background: #421D17;
    //     border-radius: 3rpx;
    // }
}

.rank_tips {
    color: #fff;
    font-size: 24rpx;
    display: flex;
    justify-content: space-between;
}

.rank_tag {
    display: flex;
    color: #fff;
    width: 750rpx;
    box-sizing: border-box;
    // height: 100rpx;
    margin: 20rpx 0;

    .tag_item {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
    }

    .tag_item_select {
        color: #fa0a64;
    }
}

.rank_avatar {
    width: 100rpx;
    height: 100rpx;
}

.rank_pointInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;

    .rank_userName {
        color: #000;
        font-size: 28rpx;
        font-weight: 600;
    }

    .rank_point {
        color: #000;
        font: 26rpx;
    }
}

.rank_reward {
    width: 120rpx;
    height: 120rpx;
}

.rank_normal {
    color: #000;
}

.canDraw {
    color: #fa0a64;
}

.noDraw {
    color: #c8b2b2;
    white-space: pre-wrap
}

.draw_tr {
    width: 650rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    position: relative;
    box-sizing: border-box;
    padding: 20rpx;
    margin-bottom: 13rpx;
    border-radius: 10rpx;

    .draw_infoContainer {
        display: flex;

        .draw_img {
            width: 100rpx;
            height: 100rpx;
        }
    }

    .draw_infoRight {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .draw_name {
        color: #000;
        font-weight: 600;
    }

    .draw_condition {
        color: #c8b2b2;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .draw_onPrize {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10rpx;

        .prize_item {
            width: 25%;
            color: #000;
            display: flex;
            align-items: center;
            font-size: 24rpx;
            margin-bottom: 6rpx;

            .avatar {
                width: 40rpx;
                height: 40rpx;
                margin-right: 6rpx;
            }
        }

        .gray {
            color: #c8b2b2;
        }
    }
}
</style>
