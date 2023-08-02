<template>
    <view class="content">
        <transitionNav ref='transitionNav' :needIconShadow="false" title="我的背包" />
        <!-- <view class="topBanner">
            
        </view> -->
        <view class="hide" :style="{ height: navHeight + 'px' }"></view>
        <view class="topContainer">
            <picker :range="range" range-key="label" @change="pickerChange">
                <view class="selectContainer">
                    <view class="text">{{ nowSelectLabel }}</view>
                    <u-icon class="icon" size="28rpx" color="#000" name="arrow-down"></u-icon>
                </view>
            </picker>
            <view class="num">
                累计抽奖次数：{{ total }}
            </view>
        </view>
        <view class="pointCard" v-for="(item, index) in list" :key="index" @click="toGoods(item)">
            <!-- <view class="pointCard_top">
                <view>{{ item.merchantName }}</view>
                <view>{{ orderGoodsStateStr({ good: item }) }}</view>
            </view> -->
            <!-- <view class="pointCard_line"></view> -->
            <view class="pointCard_goods">
                <muqian-lazyLoad class="goodsImage" :src="$parsePic(decodeURIComponent(item.pic))" borderRadius="3rpx" />
                <view class="goodsInfo">
                    <view class="goodsTitle uni-flex">
                        <view class="title" style="flex:1">{{ item.name }}</view>
                        <view class="title">{{ item.stateName }}{{ item.stateName == '已发货' ? '(点击查看物流)' : '' }}</view>
                    </view>
                    <view class="goodsBottom">
                        <!-- <view class="goodsType">{{ getGoodsPintuan(item.pintuan_type) }}</view> -->
                        <view class="goodsTime">
                            <view class="time">{{ dateFormatMSHMS(item.created_at) }}</view>
                            <!-- <view class="point"
                                :class="{ get: item.scoreState == 1, freeze: item.scoreState == 0, deduction: item.scoreState == 2 }">
                                {{ item.stateName }}</view> -->
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="noMore" v-if="isFetchEnd">暂无更多抽奖记录</view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { orderGoodsStateStr, getGoodsPintuan } from '@/tools/switchUtil'
import { dateFormatMSHMS } from '@/tools/util'
const navHeight = app.statusBarHeight + uni.upx2px(88)
// { label: "改名卡", value: 4 }
const range: any = [{ label: "全部", value: 100 }, { label: "实物奖品", value: 1 }, { label: "优惠券", value: 2 }, { label: "卡币奖品", value: 3 }]
@Component({})
export default class ClassName extends BaseNode {
    range = range
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 20,
        // activityTp: 5,
        tp: 100
    }
    navHeight = navHeight
    orderGoodsStateStr = orderGoodsStateStr
    getGoodsPintuan = getGoodsPintuan
    dateFormatMSHMS = dateFormatMSHMS
    list: any = []
    defaultAvatar: any = app.defaultAvatar
    isFetchEnd: boolean = true
    myRank: any = {}
    total: number = 0
    onLoad(query: any) {
        this.reqNewData()
        // this.reqMyRank()
    }
    public get nowSelectLabel() {
        const findItem = this.range.find((item: any) => {
            return this.queryParams.tp === item.value
        })
        return findItem ? findItem.label : "未知类型"
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
        if (item.wlCode) {
            uni.navigateTo({
                url: `/pages/userinfo/order_logistics?code=${item.wlCode}`,
            });
        }
        // app.navigateTo.goGoodsDetails(item.goodCode)
    }
    reqMyRank() {
        app.http.Get(`dataApi/selectRank/my/data`, { activityTp: 5 }, (res: any) => {
            this.myRank = res.data
        })
    }
    pickerChange(event: any) {
        this.queryParams.pageIndex = 1
        this.queryParams.tp = this.range[event.detail.value].value
        this.reqNewData()
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/activity/cardCircleDraw/log`, this.queryParams, (res: any) => {
            const list = res.list || []
            this.isFetchEnd = res.isFetchEnd
            this.queryParams.fetchFrom == 1 ? this.list = list : this.list.push(...list)
            if (this.queryParams.fetchFrom == 1 && this.queryParams.tp == 100) {
                this.total = res.total || 0
            }
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
page {
    // background-color: #1a3439;
    background: linear-gradient(0deg, #3e0b69 0%, rgba(62, 11, 105, .6) 56%, rgba(62, 11, 105, .9) 100%);
    font-family: PingFang SC;
}


.topBanner {
    width: 750rpx;
    height: 436rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/forumDraw/topBanner.png");

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

.topContainer {
    width: 750rpx;
    display: flex;
    box-sizing: border-box;
    padding: 0 20rpx;
    margin-bottom: 30rpx;
    margin-top: 20rpx;
    justify-content: space-between;
    align-items: center;

    .selectContainer {
        width: 140rpx;
        height: 40rpx;
        background-color: #fff;
        border-radius: 3rpx;
        box-sizing: border-box;
        padding: 0 10rpx;
        font-size: 24rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .text {
            font-size: 24rpx;
        }
    }

    .num {
        color: #fff;
        font-weight: bold;
        font-size: 26rpx;
    }
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
    // height: 234rpx;
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

            .title {
                text-overflow: ellipsis;
                word-break: break-all;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
            }
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
