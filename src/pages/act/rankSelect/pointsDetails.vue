<template>
    <view class="content">
        <view class="myRank">
            <muqian-lazyLoad class="myRank_avatar" borderRadius="50%" :src="myRank.avatar?$parsePic(decodeURIComponent(myRank.avatar)):defaultAvatar"/>
            <view class="myRank_name">{{myRank.userName || '获取中'}}</view>
            <view class="myRank_point">
                <view class="now">{{myRank.isPass?`当前排名：${myRank.rank}`:'未上榜'}}</view>
                <view class="point">已获得{{myRank.get_score}}活动积分</view>
            </view>
        </view>
        <view class="title">积分明细</view>
        <view class="pointCard" v-for="(item,index) in list" :key="index" @click="toGoods(item)">
            <view class="pointCard_top">
                <view>{{item.merchantName}}</view>
                <view>{{orderGoodsStateStr({good:item})}}</view>
            </view>
            <view class="pointCard_line"></view>
            <view class="pointCard_goods">
                <muqian-lazyLoad class="goodsImage" :src="$parsePic(decodeURIComponent(item.pic))" borderRadius="3rpx" />
                <view class="goodsInfo">
                    <view class="goodsTitle">{{item.goodTitle}}</view>
                    <view class="goodsBottom">
                        <view class="goodsType">{{getGoodsPintuan(item.pintuan_type)}}</view>
                        <view class="goodsTime">
                            <view class="time">{{dateFormatMSHMS(item.created_at)}}</view>
                            <view class="point"
                                :class="{get:item.scoreState==1,freeze:item.scoreState==0,deduction:item.scoreState==2}">
                                {{filterText(item)}}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
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
        fetchSize: 20
    }
    list: any = []
    isFetchEnd: any = true
    totalPage: number = 0;
    myRank: any = {}
    onLoad(query: any) {
        this.reqNewData()
        this.reqMyRank()
    }
    onPullDownRefresh() {
        this.queryParams.fetchFrom = 1
        this.reqNewData(() => {
            uni.stopPullDownRefresh()
        })
    }
    beforeDestroy(): void {
        uni.$emit('resetAn')
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
    toGoods(item:any){
        app.navigateTo.goGoodsDetails(item.goodCode)
    }
    //我的rank
    reqMyRank() {
        app.http.Get('dataApi/selectRank/my/data', {}, (res: any) => {
            this.myRank = res.data || {}
        })
    }
    reqNewData(cb?: any) {
        app.http.Get('dataApi/selectRank/score/record', this.queryParams, (res: any) => {
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
}

.title {
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
        }
    }
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
