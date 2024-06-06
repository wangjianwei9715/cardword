<template>
    <view class="content">

        <!-- <transitionNav ref='transitionNav' :needIconShadow="false" title="积分明细" />
        <view class="topBanner">
            
        </view> -->
        <view class="pageBg">
            <image src="/static/act/merchantRank/hammer/back.png"></image>
        </view>
        <view class="nav">
            <view class="status" :style="{ paddingTop: app.statusBarHeight + 'px' }"></view>
            <view class="a uni-flex" style="justify-content: space-between;align-items:center;">
                <view class="pageBack" @click="app.platform.pageBack()"></view>
                <!-- <view class="ruleText flexCenter" @click="onClickRule">规则说明</view> -->
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
        <view class="pointContainer">
            <view
                style="position: absolute;left: 0;right: 0;margin: auto;width: 720rpx;display: flex;flex-direction: column;">

                <image src="/static/act/merchantRank/hammer/back_1.png" style="width: 720rpx;height: 1000rpx;"></image>
                <image src="/static/act/merchantRank/hammer/back_2.png" style="width: 720rpx;height: 910rpx;"></image>
            </view>
            <view class="rankTitle"></view>
            <view class="myRank">
                <muqian-lazyLoad class="avatar" borderRadius="50%"
                    :src="myRank.avatar ? $parsePic(myRank.avatar) : defaultAvatar" />
                <view class="rankInfo">
                    <view class="name">{{ myRank.userName }}</view>
                    <view class="rank">当前排名:{{ myRank.rank }}</view>
                </view>
                <view class="rankPoint">
                    <view style="margin-bottom: 18rpx;color: #950101;">已获取:{{ myRank.get_score }}</view>
                    <view style="color: #A0BED8;">冻结积分:{{ myRank.lock_score }}</view>
                </view>
            </view>
            <scroll-view class="scv" :scroll-y="true" @scrolltolower="reachBottom">
                <view class="pointCard" v-for="(item, index) in list" :key="index" @click="toGoods(item)">
                    <view class="pointCard_top">
                        <view>{{ item.merchantName }}</view>
                        <view>{{ orderGoodsStateStr({ good: item }) }}</view>
                    </view>
                    <view class="pointCard_line"></view>
                    <view class="pointCard_goods">
                        <muqian-lazyLoad class="goodsImage" :src="$parsePic(item.pic)" borderRadius="3rpx" />
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
const activityTp = 10
@Component({})
export default class ClassName extends BaseNode {
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 15,
        activityTp: activityTp
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
    reachBottom() {
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
            url: `/pages/act/merchantRank/publicRule?activityTp=${activityTp}`,
            // animationType:"slide-in-bottom"
        })
    }
    toGoods(item: any) {
        app.navigateTo.goGoodsDetails(item.goodCode)
    }
    reqMyRank() {
        app.http.Get(`dataApi/selectRank/my/data`, { activityTp: activityTp }, (res: any) => {
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
    
    width: 750rpx;
    overflow-x: hidden;
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


.pointContainer {
    margin-top: 0rpx;
    position: relative;
    width: 750rpx;
    height: 2000rpx;
    background-size: 100% 100%;
    // background-image: url("@/static/act/merchantRank/sib/detail.jpg");
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10rpx;
}

.rankTitle {
    width: 344rpx;
    height: 70rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/merchantRank/hammer/point_title.png");
    margin-top: 35rpx;
    position: relative;
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
                
                font-weight: bold;
                color: #060807;
            }
        }
    }

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

    // z-index: 2;
    // height: 1850rpx;
    // background-size: 100% 100%;
    // background-image: url("@/static/act/merchantRank/shuke/bg.png");
    image {
        height: 1943rpx;
        width: inherit;
        display: block;
    }
}

.myRank {
    width: 650rpx;
    height: 160rpx;
    background: rgba(255, 255, 255, 0.66);
    border-radius: 3rpx;
    box-shadow: 0rpx 4rpx 13rpx 0rpx rgba(190, 144, 29, .66);
    // margin: auto;
    // bottom: 70rpx;
    display: flex;
    box-sizing: border-box;
    padding: 0rpx 30rpx;
    display: flex;
    align-items: center;
    // margin-bottom: 50rpx;
    margin-top: 43rpx;
    position: relative;

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
            
            font-weight: bold;
            color: #333333;
            margin-bottom: 18rpx;
        }

        .rank {
            font-size: 23rpx;
            
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
            
            font-weight: 400;
            color: #333333;
        }
    }
}

.scv {
    width: 650rpx;
    max-height: 1520rpx;
    // height: 1540rpx;
    margin: 0 auto;
    margin-top: 51rpx;
    // background-color: red;
    position: relative;
}

.bg {
    width: 750rpx;
}

.noMore {
    font-size: 21rpx;
    
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
            
            font-weight: 400;
            color: #949494;
        }

        .goodsTime {
            display: flex;
            justify-content: space-between;

            .time {
                font-size: 25rpx;
                
                font-weight: 400;
                color: #949494;
            }

            .point {
                font-size: 25rpx;
                
                font-weight: 400;
                color: #A0BED8;
            }

            .get {
                color: #C4232B;
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
