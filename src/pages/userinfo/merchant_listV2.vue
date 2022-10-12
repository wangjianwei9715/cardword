<template>
    <view class="content">
        <view class="header-banner">
            <statusbar />
            <view class="tab-header">
                <view class="icon-back" @click="onClickBack"></view>
                <view class="header-title">商家列表</view>
                <view class="header-icon">
                    <view class="icon-share"></view>
                </view>
            </view>
        </view>

        <view style="padding-top:88rpx">
            <statusbar />
        </view>
        <view class="topBanner"></view>
        <view style="background-color: #fff;padding-top: 40rpx;">
            <template v-if="onLiveList&&onLiveList.length">
                <view class="merchant_title">正在直播</view>
                <scroll-view scroll-x="true" class="merchantLiveContainer">
                    <view class="uni-flex">
                        <view class="merchantItem" v-for="item in 10">
                            <view class="merchantAvatar_block flexCenter">
                                <muqian-lazyLoad class="avatar" borderRadius="50%"
                                    :src="'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.31/seller/info/1661914607170otf4sr6pif.jpg'">
                                </muqian-lazyLoad>
                            </view>
                            <view class="merchantName">鸾翼球星鸾翼球星鸾翼球星</view>
                        </view>
                    </view>
                </scroll-view>
            </template>
            <view class="merchant_title">
                <view>本周热门</view>
                <view class="followAllButton flexCenter" v-if="!isAllAttention" @click="onClickAllAttention">一键关注</view>
            </view>
            <view class="hotContainer">
                <view class="hot_item" v-for="(item,index) in 10">
                    <view class="hot_picBlock">
                        <muqian-lazyLoad class="hot_pic"
                            :src="'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.31/seller/info/1661914607170otf4sr6pif.jpg'" />
                        <view class="rankItem" v-if="index<=2" :class="[`rank${index+1}`]">
                            <view class="top">TOP</view>
                            <view class="rank">{{index+1}}</view>
                        </view>
                    </view>
                    <view class="hot_name">鸾翼球星鸾翼球星鸾翼球星</view>
                </view>
            </view>
        </view>
        <view class="merchantContainer">
            <view class="merchantCard" v-for="(item,index) in merchantList" :key="index"
                @click="goMerchantPage(item.alias)">
                <view class="merchantCard_top">
                    <muqian-lazyLoad class="merchantBack"
                        :src="'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.31/seller/info/1661914607170otf4sr6pif.jpg'" />
                    <view class="merchantMask"></view>
                    <muqian-lazyLoad class="merchantAvatr"
                        :src="'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.31/seller/info/1661914607170otf4sr6pif.jpg'" />
                    <view class="merchantMsg">
                        <view class="name">鸾翼球星卡社</view>
                        <view class="msg">403拼成 · 3699粉丝</view>
                    </view>
                    <followButton style="z-index: 2" :followID="item.alias" @handleSuccess="followAction($event,item)"
                        :width="120" :height="47" :follow="item.followed" :textArr="['已关注','+关注']" />
                </view>
                <view class="merchantCard_bottom">
                    <view class="uni-flex reativeBlock" v-if="false">
                        <view class="goodsItem">
                            <view class="goodsImgContainer flexCenter">
                                <muqian-lazyLoad class="goodsImg" borderRadius="3rpx"
                                    :src="'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.31/seller/info/1661914607170otf4sr6pif.jpg'" />
                            </view>
                            <view class="goodsName">20-21 National Treasur Hobb 20-21 NationalTreasur Hobb</view>
                            <view class="goodsPrice">
                                <text>￥</text>
                                <text>56</text>
                            </view>
                            <view class="goodsSpell" v-if="false">已拼成</view>
                        </view>
                    </view>
                    <view class="noneMsg flexCenter">暂无相关内容~</view>
                </view>
            </view>
        </view>
        <view class="bottomSafeArea"></view>
    </view>
</template>

<script lang="ts">
import {
    app
} from "@/app";
import {
    Component
} from "vue-property-decorator";
import BaseNode from "../../base/BaseNode.vue";
@Component({})
export default class ClassName extends BaseNode {
    onLiveList: any = [{}]
    isAllAttention: boolean = false
    hotRank: any = []
    merchantParams: any = {
        pageIndex: 1,
        pageSize: 15
    }
    merchantTotalPage: number = 0
    merchantList: any = [1]
    onLoad() {

    }
    onReachBottom() {
        if (this.merchantParams.pageIndex < this.merchantTotalPage) {
            this.merchantParams.pageIndex += 1
            this.reqNewMerchant()
        }
    }
    onPullDownRefresh() {
        this.merchantParams.pageIndex = 1
    }
    refreshAll() {
        this.merchantParams.pageIndex = 1
        this.reqNewMerchant()
        this.reqHotRank()
        this.reqOnLive()
    }
    onClickAllAttention() {
        //一键关注
        app.http.Post('', {}, (res: any) => {
            this.isAllAttention = true
        })
    }
    goLive(item: any) {
        app.platform.goZgLive({
            roomID: item.id,
            merchantAlias: item.merchantAlias || item.alias,
            isAnchor: false,
            type: item.type
        })
    }
    followAction(event: any, item: any) {
        item.followed = event.follow
        item.fans = event.fans
    }
    onClickBack() {
        uni.navigateBack({
            delta: 1
        })
    }
    reqOnLive() {
        app.http.Get('dataApi/', {}, (res: any) => {
            this.onLiveList = res.list || []
        })
    }
    reqHotRank() {
        app.http.Get('dataApi/', {}, (res: any) => {
            this.hotRank = res.list || []
        })
    }
    reqNewMerchant(cb?: any) {
        app.http.Get('dataApi/', this.merchantParams, (res: any) => {
            this.merchantTotalPage = res.totalPage
            const list: any = res.list || []
            this.merchantParams.pageIndex == 1 ? this.merchantList = list : this.merchantList.push(...list)
            cb && cb()
        })
    }
}
</script>

<style lang="scss">
page {
    background-color: #f6f7fb;
}

.topBanner {
    width: 750rpx;
    height: 220rpx;
    background: #BBBCC0;
    // margin-bottom: 40rpx;
}

.merchantContainer {
    margin-top: 30rpx;
    padding: 0 25rpx;
    width: 750rpx;
    box-sizing: border-box;

    .merchantCard {
        width: 100%;
        height: 490rpx;
        // background-color: red;
        border-radius: 3rpx;
        position: relative;
        margin-bottom: 25rpx;
        // 220 270
    }

    .merchantCard_top {
        width: 100%;
        height: 220rpx;
        position: relative;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 29rpx 27rpx 86rpx 29rpx;

        .merchantBack {
            width: 100%;
            height: 220rpx;
            position: absolute;
            top: 0;
            // opacity: .61;
            left: 0;
        }

        .merchantMask {
            width: 100%;
            height: 220rpx;
            position: absolute;
            background-color: rgba(255, 255, 255, .61);
            top: 0;
            // opacity: .61;
            left: 0;
        }

        .merchantAvatr {
            width: 105rpx;
            height: 105rpx;
            border-radius: 3rpx;
            margin-right: 21rpx;
        }

        .merchantMsg {
            z-index: 2;
            flex: 1;

            .name {
                font-size: 29rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #FFFFFF;
                margin-bottom: 16rpx;
            }

            .msg {
                font-size: 21rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
            }
        }
    }

    .merchantCard_bottom {
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        height: 270rpx;
        padding: 0 29rpx;

        .reativeBlock {
            position: relative;
            bottom: 45rpx;
        }

        .goodsItem {
            width: 207rpx;
            margin-right: 12rpx;
        }

        .noneMsg {
            width: inherit;
            height: inherit;
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #959695;
        }

        .goodsImgContainer {
            width: 207rpx;
            height: 163rpx;
            background: #FFFFFF;
            border: 1px solid #E6E6E6;
            border-radius: 3rpx;
            margin-bottom: 12rpx;
        }

        .goodsImg {
            width: 192rpx;
            height: 147rpx;
        }

        .goodsName {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            height: 65rpx;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            line-height: 33rpx;
            -webkit-line-clamp: 2;
        }

        .goodsPrice {
            font-size: 33rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            margin-top: 10rpx;

            text:first-child {
                font-size: 18rpx;
            }
        }

        .goodsSpell {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #959695;
        }
    }
}

.hotContainer {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0 25rpx;
    width: 750rpx;
    justify-content: space-between;
    margin-top: 20rpx;

    .hot_item {
        width: 131rpx;
        margin-bottom: 30rpx;
    }

    .hot_picBlock {
        width: 131rpx;
        height: 131rpx;
        background: #DCDCDC;
        border-radius: 3rpx;
        margin-bottom: 13rpx;
        position: relative;
    }

    .hot_pic {
        width: inherit;
        height: inherit;
        position: absolute;
        top: 0;
        left: 0;
    }

    .hot_name {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .rankItem {
        width: 40rpx;
        height: 51rpx;
        background-size: 100% 100%;
        position: absolute;
        top: 0;
        left: 0;

        .top {
            font-size: 15rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            text-align: center;
        }

        .rank {
            font-size: 27rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            text-align: center;
            position: relative;
            bottom: 8rpx;

        }
    }

    .rank1 {
        background-image: url('../../static/userinfo/v2/rank1.png');
    }

    .rank2 {
        background-image: url('../../static/userinfo/v2/rank2.png');
    }

    .rank3 {
        background-image: url('../../static/userinfo/v2/rank3.png');
    }
}

.merchant_title {
    font-size: 31rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    padding: 0 25rpx;
    text-align: left;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.followAllButton {
    width: 141rpx;
    height: 46rpx;
    border: 1rpx solid #C0C0C0;
    border-radius: 3rpx;
    font-size: 23rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
}

.merchantLiveContainer {
    width: 750rpx;
    white-space: nowrap;
    margin-top: 24rpx;
    margin-bottom: 51rpx;
}

.merchantItem {
    width: 126rpx;
    margin-right: 38rpx;
}

.merchantAvatar_block {
    width: 107rpx;
    height: 107rpx;
    background: #DCDCDC;
    border-radius: 50%;
    border: 4rpx solid #ff003e;
    overflow: hidden;
    margin-bottom: 17rpx;

    .avatar {
        width: 107rpx;
        height: 107rpx;
    }
}

.merchantName {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    width: 126rpx;
    text-align: center;
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.merchantItem:first-child {
    margin-left: 25rpx;
}

.header-banner {
    width: 100%;
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    box-sizing: border-box;
    z-index: 10;
    border-bottom: 1px solid #F4F3F2;

    .tab-header {
        width: 100%;
        height: 88rpx;
        display: flex;
        box-sizing: border-box;
        padding: 0 30rpx;
        position: relative;
        z-index: 10;
        align-items: center;
        justify-content: center;
    }

    .icon-back {
        width: 80rpx;
        height: 88rpx;
        background: url(../../static/goods/back@2x.png) no-repeat center;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    .header-title {
        height: 88rpx;
        line-height: 88rpx;
        font-size: 34rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000000;
    }

    .header-icon {
        height: 88rpx;
        display: flex;
        align-items: center;
        position: absolute;
        right: 40rpx;
        top: 0;
    }

    .icon-collect {
        width: 44rpx;
        height: 41rpx;
        background: url(../../static/goods/v2/icon_collect.png) no-repeat center;
        background-size: 100% 100%;
        margin-right: 40rpx;
    }

    .icon-favored {
        background: url(../../static/goods/v2/icon_collect_.png) no-repeat center;
        background-size: 100% 100%;
    }

    .icon-share {
        width: 46rpx;
        height: 46rpx;
        background: url(../../static/userinfo/v2/icon_search.png) no-repeat center;
        background-size: 100% 100%;
    }
}
</style>
