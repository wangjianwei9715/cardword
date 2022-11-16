<template>
    <view class="content">
        <view class="myRank">
            <muqian-lazyLoad class="myRank_avatar" borderRadius="50%"
                :src="myRank.avatar ? $parsePic(decodeURIComponent(myRank.avatar)) : defaultAvatar" />
            <view class="myRank_name">{{ (myRank.userName || myRank.name) || '获取中' }}</view>
            <view class="myRank_point" v-if="searchType == 0">
                <view class="now">{{ myRank.rank ? `当前排名：${myRank.rank}` : '获取中' }}</view>
                <view class="point">已获得{{ myRank.get_score }}活动积分</view>
            </view>
            <view class="myRank_point" v-else>
                <view>
                    当前世界豆:{{ myRank.worldBean }}
                    <image src="/static/act/worldCup/smallBeanCube.png"
                        style="width:21rpx;height:23rpx;margin-left:4rpx" />
                </view>
            </view>
        </view>
        <template v-if="searchType == 0">
            <view class="blockTitle">积分明细</view>
            <view class="pointCard" v-for="(item, index) in list" :key="index" @click="toGoods(item)">
                <view class="pointCard_top">
                    <view>{{ item.merchantName }}</view>
                    <view>{{ orderGoodsStateStr({ good: item }) }}</view>
                </view>
                <view class="pointCard_line"></view>
                <view class="pointCard_goods">
                    <muqian-lazyLoad class="goodsImage" :src="$parsePic(decodeURIComponent(item.pic))"
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
        </template>
        <template v-if="searchType == 1">
            <view class="blockTitle">竞猜明细</view>
            <view class="quizCard" v-for="(item, index) in list" :key="index">
                <view class="quizCard_top uni-flex jb">
                    <view class="time">{{ dateFormatMSHMS(item.created_at) }}</view>
                    <view class="title flexCenter">{{ item.matchTeam }}</view>
                    <view class="type">{{ item.worldBean >= 0 ? '猜中奖励' : '参与竞猜' }}</view>
                </view>
                <view class="quizCard_line uni-flex jb"></view>
                <view class="quizCard_bottom uni-flex jb">
                    <view class="result">竞猜项:{{ item.questionName }}</view>
                    <view class="option flexCenter">选择项:{{ item.answerName }}</view>
                    <view class="point">
                        <view class="num" :class="{ num_neg: item.worldBean < 0 }">{{ (item.worldBean >= 0 ? '+' : '')
                                +
                                item.worldBean
                        }}</view>
                        <image src="/static/act/worldCup/smallBeanCube.png" />
                    </view>
                </view>
            </view>
        </template>
        <template v-if="searchType == 2">
            <view class="blockTitle">抽奖明细</view>
            <view class="drawCard" v-for="(item, index) in list" :key="index">
                <view class="drawCard_top">
                    <view class="left" @click="onClickLookWul(item)">{{ drawStateParse(item) }}{{ (item.tp == 1
                            && item.state == 3) ? `（点击查看发货详情）` : ""
                    }}
                    </view>
                    <view class="right">{{ dateFormatMSHMS(item.created_at) }}</view>
                </view>
                <view class="drawCard_line"></view>
                <view class="drawCard_bottom">
                    <view class="couponItem">
                        <view class="coupon">
                            <view class="left flexCenter">兑奖码</view>
                            <view class="right flexCenter">{{ item.code }}</view>
                        </view>
                        <view style="flex:1"></view>
                        <muqian-lazyLoad v-if="item.state == 3 && item.pic_url"
                            :src="$parsePic(decodeURIComponent(item.pic_url))" class="gift" borderRadius="3rpx" />
                        <view class="tips">
                            <template v-if="item.state == 1">
                                暂未开奖
                            </template>
                            <template v-if="item.state == 2">
                                很遗憾<br />
                                未抽中奖励
                            </template>
                            <template v-if="item.state == 3">
                                {{ item.name }}
                            </template>
                        </view>
                    </view>
                </view>
            </view>
        </template>
        <template v-if="searchType == 3">
            <view class="blockTitle">积分明细</view>
            <view class="pointCard" v-for="(item, index) in list" :key="index">
                <view class="pointCard_top">
                    <view @click="onClickLookWul(item)">兑换成功{{ item.tp == 1 ? `（点击查看发货详情）` : "" }}</view>
                </view>
                <view class="pointCard_line"></view>
                <view class="pointCard_goods">
                    <muqian-lazyLoad class="goodsImage" :src="$parsePic(decodeURIComponent(item.pic))"
                        borderRadius="3rpx" />
                    <view class="goodsInfo">
                        <view class="goodsTitle">{{ item.name }}</view>
                        <view class="goodsBottom">
                            <view class="goodsType">1件</view>
                            <view class="goodsTime">
                                <view class="time">{{ dateFormatMSHMS(item.exchange_at) }}</view>
                                <view class="point uni-flex" style="align-items:center;" :class="{ blue: true }">
                                    {{ '-' + item.useBean
                                    }}
                                    <image src="/static/act/worldCup/smallBeanCube.png"
                                        style="width:21rpx;height:23rpx;margin-left:4rpx" />
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </template>
        <empty v-if='list && !list.length' />
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '../../../base/BaseNode.vue';
import { orderGoodsStateStr, getGoodsPintuan } from '@/tools/switchUtil'
import { dateFormatMSHMS } from '@/tools/util'

@Component({})
export default class ClassName extends BaseNode {
    orderGoodsStateStr = orderGoodsStateStr
    getGoodsPintuan = getGoodsPintuan
    dateFormatMSHMS = dateFormatMSHMS
    defaultAvatar: any = app.defaultAvatar
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 20,

    }
    list: any = []
    isFetchEnd: any = true
    totalPage: number = 0;
    searchType: number = 0
    myRank: any = {}
    logMap: any = {
        0: {
            title: '积分明细',
            logUrl: 'dataApi/selectRank/score/record',
            myUrl: 'dataApi/selectRank/my/data',
            params: {
                activityTp: 3
            }
        },
        1: {
            title: '竞猜明细',
            logUrl: 'dataApi/worldCup/bean/guessing/record',
            myUrl: 'dataApi/worldCup/bean/me/data',
            params: {
            }
        },
        2: {
            title: '抽奖记录',
            logUrl: 'dataApi/worldCup/bean/lottery/go/record',
            myUrl: 'dataApi/worldCup/bean/me/data',
            params: {
            }
        },
        3: {
            title: '兑换明细',
            logUrl: 'dataApi/worldCup/bean/shop/exchange/record',
            myUrl: 'dataApi/worldCup/bean/me/data',
            params: {
            }
        }
    }
    onLoad(query: any) {
        this.searchType = +query.searchType
        uni.setNavigationBarTitle({
            title: this.logMap[this.searchType].title
        })
        this.reqNewData()
        this.reqMyRank()
    }
    onPullDownRefresh() {
        this.queryParams.fetchFrom = 1
        this.reqNewData(() => {
            uni.stopPullDownRefresh()
        })
    }
    onReachBottom() {
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
    drawStateParse(item: any) {
        const stateMap: any = {
            1: "未开奖",
            2: "未中奖",
            3: "中奖"
        }
        return stateMap[item.state] || ""
    }
    toGoods(item: any) {
        app.navigateTo.goGoodsDetails(item.goodCode)
    }
    onClickLookWul(item: any) {
        if (!item.wlcode) {
            uni.showToast({
                title: '暂未发货,请联系客服发货',
                icon: 'none'
            })
            return
        }
        uni.navigateTo({
            url: '/pages/userinfo/order_logistics?code=' + item.wlcode
        })
    }
    //我的rank
    reqMyRank() {
        const nowType = this.logMap[this.searchType]
        app.http.Get(nowType.myUrl, nowType.params || {}, (res: any) => {
            this.myRank = res.data || {}
        })
    }
    reqNewData(cb?: any) {
        const nowType = this.logMap[this.searchType]
        app.http.Get(nowType.logUrl, { ...this.queryParams, ...nowType.params }, (res: any) => {
            this.isFetchEnd = res.isFetchEnd
            const dataList = res.list || []
            this.list = this.queryParams.fetchFrom == 1 ? dataList : [...this.list, ...dataList]
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
page {
    background: $content-bg;
    width: 750rpx;
    overflow-x: hidden;
    font-family: PingFang SC;
}

.blockTitle {
    font-size: 29rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    margin-top: 37rpx;
    margin-bottom: 20rpx;
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

.quizCard {
    width: 710rpx;
    height: 147rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    margin-bottom: 14rpx;
    box-sizing: border-box;
    padding: 0 27rpx 0 37rpx;
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: center;

    .quizCard_top {
        width: 100%;
        align-items: center;

        .time {
            font-size: 22rpx;
            font-weight: 400;
            color: #949494;
            width: 33.33%;
        }

        .title {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            width: 33.33%;
            white-space: nowrap;
        }

        .type {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            width: 33.33%;
            text-align: right;
        }
    }

    .quizCard_line {
        width: 100%;
        height: 1rpx;
        background-color: #C0C0C0;
        align-items: center;
        margin-top: 18rpx;
        margin-bottom: 30rpx;
    }

    .quizCard_bottom {
        width: 100%;
        align-items: center;

        .result {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #949494;
            width: 33.33%;
        }

        .option {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #949494;
            width: 33.33%;
            white-space: nowrap;
        }

        .point {
            display: flex;
            align-items: center;
            justify-content:flex-end;
            width: 33.33%;
            image {
                width: 21rpx;
                height: 23rpx;
                margin-left: 4rpx;
            }

            .num {
                font-size: 25rpx;
                font-family: PingFangSC;
                font-weight: 400;
                color: #FA1545;
            }

            .num_neg {
                color: #5782FD;
            }
        }
    }
}

.drawCard {
    width: 710rpx;
    height: 212rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    margin-bottom: 14rpx;
    box-sizing: border-box;
    padding: 24rpx 26rpx 40rpx 36rpx;

    .drawCard_top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10rpx;

        .left {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
        }

        .right {
            font-size: 22rpx;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #949494;
        }
    }

    .drawCard_line {
        width: 100%;
        height: 1rpx;
        background: #C0C0C0;
        // margin-bottom: 12rpx;
    }

    .drawCard_bottom {
        display: flex;
        margin-top: 12rpx;

        .couponItem {
            width: 100%;
            align-items: center;
            height: 124rpx;
            display: flex;
            // justify-content: space-between;

            .coupon {
                width: 332rpx;
                height: 74rpx;
                background-size: 100% 100%;
                background-image: url("/static/act/worldCup/couponDetail.png");
                display: flex;
                align-content: center;

                .left {
                    width: 114rpx;
                    height: inherit;
                    font-size: 24rpx;
                    color: #151515;
                }

                .right {
                    flex: 1;
                    height: inherit;
                    font-size: 24rpx;
                    color: #151515;
                }
            }

            .gift {
                width: 124rpx;
                height: 124rpx;
                background: #DFDFDF;
                border-radius: 3rpx;
                margin-right: 32rpx;
            }

            .tips {
                width: 120rpx;
                font-size: 24rpx;
                font-family: FZLanTingHei-R-GBK;
                font-weight: 400;
                color: #151515;
            }
        }
    }
}

.jb {
    justify-content: space-between;
}

.myRank {
    width: 710rpx;
    height: 152rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    margin-top: 14rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 31rpx;

    .myRank_avatar {
        width: 89rpx;
        height: 89rpx;
        // background: #3D1F19;
        border-radius: 50%;
        margin-right: 15rpx;
    }

    .myRank_name {
        flex: 1;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
    }

    .myRank_point {
        display: flex;
        flex-direction: column;

        .now {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 600;
            text-align: right;
            color: #333333;
            margin-bottom: 6rpx;
        }

        .point {
            font-size: 23rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            text-align: right;
        }
    }
}
</style>
