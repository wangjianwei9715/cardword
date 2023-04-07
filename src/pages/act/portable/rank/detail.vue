<template>
    <view class="content">
        <transitionNav ref='transitionNav' :needIconShadow="false" title="积分明细" />
        <view class="topBanner">
            <view class="myRank">
                <muqian-lazyLoad class="avatar" borderRadius="50%"
                    :src="myRank.avatar ? $parsePic(decodeURIComponent(myRank.avatar)) : defaultAvatar" />
                <view class="rankInfo">
                    <view class="name">{{ myRank.userName }}</view>
                    <view class="rank">当前排名:{{ myRank.rank }}</view>
                </view>
                <view class="rankPoint">
                    <view style="margin-bottom: 18rpx;">已获取:{{ myRank.get_score }}</view>
                    <view>冻结积分:{{ myRank.lock_score }}</view>
                </view>
            </view>
        </view>
        <view class="pointBlock flexCenter">积分明细</view>
        <view class="pointCard" v-for="(item, index) in list" :key="index" @click="toGoods(item)">
            <view class="pointCard_top">
                <view>{{ item.merchantName }}</view>
                <view>{{ orderGoodsStateStr({ good: item }) }}</view>
            </view>
            <view class="pointCard_line"></view>
            <view class="pointCard_goods">
                <muqian-lazyLoad class="goodsImage" :src="$parsePic(decodeURIComponent(item.pic))" borderRadius="3rpx" />
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
        activityTp: 5
    }
    orderGoodsStateStr = orderGoodsStateStr
    getGoodsPintuan = getGoodsPintuan
    dateFormatMSHMS = dateFormatMSHMS
    list: any = []
    defaultAvatar: any = app.defaultAvatar
    isFetchEnd: boolean = true
    myRank: any = {}
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
    filterText(item: any) {
        const score: any = item.score
        const scoreState: any = item.scoreState
        if (scoreState == 0) return `冻结中${score}`
        if (scoreState == 1) return `+${score}`
        if (scoreState == 2) return `扣除冻结${score}`
    }
    toGoods(item: any) {
        app.navigateTo.goGoodsDetails(item.goodCode)
    }
    reqMyRank() {
        app.http.Get(`dataApi/selectRank/my/data`, { activityTp: 5 }, (res: any) => {
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
    background-color: #1a3439;
    font-family: PingFang SC;
}

.topBanner {
    width: 750rpx;
    height: 450rpx;
    position: relative;
    background-size: 100% 100%;
    background-image: url("@/static/act/portable/top.png");

    .myRank {
        width: 710rpx;
        height: 203rpx;
        background: rgba(255, 255, 255, 0.8);
        border: 2rpx solid #FFFFFF;
        border-radius: 3rpx;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        bottom: 70rpx;
        display: flex;
        box-sizing: border-box;
        padding: 0rpx 30rpx;
        display: flex;
        align-items: center;

        .avatar {
            width: 121rpx;
            height: 121rpx;
            margin-right: 31rpx;
        }

        .rankInfo {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;

            .name {
                font-size: 29rpx;
                font-family: PingFang SC;
                font-weight: 600;
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

            view {
                font-size: 23rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
            }
        }
    }
}

.pointBlock {
    width: 750rpx;
    height: 75rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/portable/liveBack.png");
    font-size: 38rpx;
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    color: #FFFFFF;
    letter-spacing: 2rpx;
}

.noMore {
    font-size: 21rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #D2D2D2;
    margin: 50rpx auto;
}

.pointCard {
    width: 710rpx;
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
