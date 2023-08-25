<template>
    <view class="content">
        <view class="nav">
            <view class="status" :style="{ paddingTop: app.statusBarHeight + 'px' }"></view>
            <view class="pageBack" @click="app.platform.pageBack()"></view>
        </view>
        <view class="faker" :style="{ height: app.statusBarHeight / 2.4 + 'px' }"></view>
        <view class="topBanner">
        </view>
        <view class="pointContainer">
            <view class="myRank">
                <muqian-lazyLoad class="avatar" borderRadius="50%"
                    :src="myRank.avatar ? $parsePic(myRank.avatar) : defaultAvatar" />
                <view class="rankInfo">
                    <view class="name">{{ myRank.userName }}</view>
                    <view class="rank">当前排名:{{ myRank.rank }}</view>
                </view>
                <view class="rankPoint">
                    <view style="margin-bottom: 18rpx;color: #E74B82;">已获取:{{ myRank.get_score }}</view>
                    <view style="color: #A0BED8;">冻结积分:{{ myRank.lock_score }}</view>
                </view>
            </view>
            <scroll-view class="scv"  :scroll-y="true" @scrolltolower="reachBottom">
                <view class="pointCard" v-for="(item, index) in list" :key="index" @click="toGoods(item)">
                    <view class="pointCard_top">
                        <view>{{ item.merchantName }}</view>
                        <view>{{ orderGoodsStateStr({ good: item }) }}</view>
                    </view>
                    <view class="pointCard_line"></view>
                    <view class="pointCard_goods">
                        <muqian-lazyLoad class="goodsImage" :src="$parsePic(item.pic)"
                            borderRadius="3rpx" />
                        <view class="goodsInfo">
                            <view class="goodsTitle">{{ item.goodTitle }}</view>
                            <view class="goodsBottom">
                                <view class="goodsType">{{ getGoodsPintuan(item.pintuan_type) }}</view>
                                <view class="goodsTime">
                                    <view class="time">{{ dateFormatMSHMS(item.created_at) }}</view>
                                    <view class="point"
                                        :class="{ get: item.scoreState == 1, freeze: item.scoreState == 0, deduction: item.scoreState == 2 }">
                                        {{ filterText(item) }}</view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="noMore" v-if="isFetchEnd">暂无更多活动订单</view>
            </scroll-view>
        </view>
        <view class="bottomSafeArea"></view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { orderGoodsStateStr, getGoodsPintuan } from '@/tools/switchUtil'
import { dateFormatMSHMS } from '@/tools/util'
@Component({})
export default class ClassName extends BaseNode {
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 20,
        activityTp: 8
    }
    app: any = app
    orderGoodsStateStr = orderGoodsStateStr
    getGoodsPintuan = getGoodsPintuan
    dateFormatMSHMS = dateFormatMSHMS
    list: any = []
    defaultAvatar: any = app.defaultAvatar
    isFetchEnd: boolean = true
    myRank: any = {}
    num: number = 1
    onLoad(query: any) {
        this.reqNewData()
        this.reqMyRank()
    }
    onPageScroll(data: any) {
        //@ts-ignore
        this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
    }
    onReachBottom() {
        if (this.isFetchEnd) return
        this.queryParams.fetchFrom += this.queryParams.fetchSize
        this.reqNewData()
    }
    onPullDownRefresh() {
        this.queryParams.fetchFrom = 1
        this.reqNewData(() => {
            uni.stopPullDownRefresh()
        })
    }
    reachBottom(){
        console.log(6666);
        if (this.isFetchEnd) return
        this.queryParams.fetchFrom += this.queryParams.fetchSize
        this.reqNewData()
    }
    filterText(item: any) {
        const score: any = item.score
        const scoreState: any = item.scoreState
        if (scoreState == 0) return `冻结中${score}`
        if (scoreState == 1) return `+${score}`
        if (scoreState == 2) return `扣除冻结${score}`
    }
    onClickRule() {
        uni.navigateTo({
            url: "/pages/act/merchantRank/shuke/rule",
            // animationType:"slide-in-bottom"
        })
    }
    toGoods(item: any) {
        app.navigateTo.goGoodsDetails(item.goodCode)
    }
    reqMyRank() {
        app.http.Get(`dataApi/selectRank/my/data`, { activityTp: 8 }, (res: any) => {
            this.myRank = res.data
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/selectRank/score/record`, this.queryParams, (res: any) => {
            const list = res.list || []
            this.isFetchEnd = res.isFetchEnd
            this.queryParams.fetchFrom == 1 ? this.list = list : this.list.push(...list)
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #000000;
    font-family: PingFang SC;
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


.pointContainer {
    margin-top: 30rpx;
    position: relative;
    width: 735rpx;
    height: 1707rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/merchantRank/bjx/detailBack.png");
}

.topBanner {
    width: 750rpx;
    height: 541rpx;
    background-size: 100% 100%;
    position: relative;
    background-image: url("@/static/act/merchantRank/bjx/topBanner.png");

    // .rule {
    //     width: 122rpx;
    //     height: 279rpx;
    //     background-size: 100% 100%;
    //     background-image: url("@/static/act/merchantRank/shuke/rule.png");
    //     position: absolute;
    //     top: 59rpx;
    //     right: 0;

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

.pointP {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    left: 0;
    width: 710rpx;
}

.pageBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 750rpx;

    image {
        height: 1850rpx;
        width: inherit;
        display: block;
    }
}

.myRank {
    width: 650rpx;
    height: 160rpx;

    background: rgba(255, 255, 255, 0.66);
    border-radius: 3rpx;
    box-shadow: 0rpx 4rpx 13rpx 0rpx rgba(98, 209, 247, .66);
    margin: auto;
    bottom: 70rpx;
    display: flex;
    box-sizing: border-box;
    padding: 0rpx 30rpx;
    display: flex;
    align-items: center;
    // margin-bottom: 50rpx;
    margin-top: 123rpx;

    .avatar {
        width: 94rpx;
        height: 94rpx;
        margin-right: 31rpx;
    }

    .rankInfo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;

        .name {
            font-size: 27rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            margin-bottom: 18rpx;
        }

        .rank {
            font-size: 23rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
        }
    }

    .rankPoint {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: right;

        view {
            font-size: 23rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
        }
    }
}

.scv {
    width: 650rpx;
    max-height: 1280rpx;
    margin: 0 auto;
    margin-top: 51rpx;
    // background-color: red;
}

.bg {
    width: 750rpx;
}

.noMore {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #fff;
    margin: 50rpx auto;
    text-align: center;
}

.pointCard {
    width: 653rpx;
    height: 234rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    box-sizing: border-box;
    padding: 23rpx 30rpx 33rpx 30rpx;
    margin-bottom: 14rpx;

    .pointCard_top {
        display: flex;
        justify-content: space-between;

        view {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
        }
    }

    .pointCard_line {
        height: 1rpx;
        background: #C0C0C0;
        margin: 14rpx 0;
    }

    .pointCard_goods {
        display: flex;

        .goodsImage {
            width: 124rpx;
            height: 124rpx;
            background: #DFDFDF;
            border-radius: 3rpx;
            margin-right: 17rpx;
        }

        .goodsInfo {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;
        }

        .goodsTitle {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }

        .goodsType {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #949494;
        }

        .goodsTime {
            display: flex;
            justify-content: space-between;

            .time {
                font-size: 25rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #949494;
            }

            .point {
                font-size: 25rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #A0BED8;
            }

            .get {
                color: #FA1545;
            }

            .freeze {
                color: #A0BED8;
            }

            .deduction {
                color: #FFA800;
            }

            .blue {
                color: #5782FD;
            }
        }
    }
}
</style>
