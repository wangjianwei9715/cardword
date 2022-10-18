<template>
    <view class="content">
        <view class="header-banner">
            <statusbar />
            <view class="tab-header">
                <view class="icon-back" @click="onClickBack"></view>
                <view class="header-title">商家列表</view>
                <!-- <view class="header-icon">
                    <view class="icon-share"></view>
                </view> -->
            </view>
        </view>

        <view style="padding-top:88rpx">
            <statusbar />
        </view>
        <view class="topBanner" @click="toMerchantJoin"></view>
        <view style="background-color: #fff;padding-top: 40rpx;">
            <template v-if="onLiveList&&onLiveList.length">
                <view class="merchant_title">正在直播</view>
                <scroll-view scroll-x="true" class="merchantLiveContainer">
                    <view class="uni-flex" style="height: 180rpx;align-items: center;">
                        <view class="merchantItem" v-for="(item,index) in onLiveList" :key="index"
                            @click="onClickJumpUrl(item)">
                            <view class="merchantAvatar_block flexCenter">
                                <muqian-lazyLoad class="avatar" borderRadius="50%"
                                    :src="$parsePic(decodeURIComponent(item.logo))">
                                </muqian-lazyLoad>
                                <view class="liveEffects"></view>
                            </view>
                            <view class="merchantName">{{item.name}}</view>

                        </view>
                    </view>
                </scroll-view>
            </template>
            <view class="merchant_title">
                <view style="font-size: 31rpx;">本周热门</view>
                <view class="followAllButton flexCenter" v-if="!isAllAttention" @click="onClickAllAttention">一键关注</view>
            </view>
            <view class="hotContainer">
                <view class="hot_item" :style="{marginRight:(index+1)%5==0?`0rpx`:`32rpx`}"
                    v-for="(item,index) in hotRank" :key="index" @click="goMerchantPage(item.alias)">
                    <view class="hot_picBlock">
                        <muqian-lazyLoad class="hot_pic" borderRadius="3rpx"
                            :src="$parsePic(decodeURIComponent(item.logo))" />
                        <view class="rankItem flexCenter" v-if="index<=2" :class="[`rank${index+1}`]">
                            <!-- <view class="top">TOP</view> -->
                            <view class="rank">{{index+1}}</view>
                        </view>
                    </view>
                    <view class="hot_name">{{item.name}}</view>
                </view>
            </view>
        </view>
        <view class="merchantContainer">
            <view class="merchantCard" v-for="(item,index) in merchantList" :key="index"
                @click="goMerchantPage(item.alias)">
                <view class="merchantCard_top">
                    <muqian-lazyLoad class="merchantBack" borderRadius="3rpx"
                        :src="$parsePic(decodeURIComponent(item.back_img || item.logo))" />
                    <view class="merchantMask"></view>
                    <muqian-lazyLoad class="merchantAvatr" borderRadius="3rpx"
                        :src="$parsePic(decodeURIComponent(item.logo))" />
                    <view class="merchantMsg">
                        <view class="name">{{item.name}}</view>
                        <view class="msg">{{item.groupGoodNum}}拼成 · {{item.fans}}粉丝</view>
                    </view>
                    <followButton hideCancel normClass="v2Button" selectClass="v2SelectButton" style="z-index: 2"
                        :followID="item.alias" @handleSuccess="followAction($event,item)" :width="120" :height="47"
                        :follow="item.follow" :textArr="['+关注','已关注']" />
                </view>
                <view class="merchantCard_bottom">
                    <view class="uni-flex reativeBlock" v-if="item.goodData&&item.goodData.length">
                        <view class="goodsItem" v-for="(goodsItem,goodsIndex) in item.goodData"
                            @click.stop="onClickJumpDetails(goodsItem.goodCode)">
                            <view class="goodsImgContainer flexCenter">
                                <muqian-lazyLoad class="goodsImg" borderRadius="3rpx"
                                    :src="$parsePic(decodeURIComponent(goodsItem.pic))" />
                            </view>
                            <view class="goodsName">{{goodsItem.goodName}}</view>
                            <view class="goodsPrice" v-if="goodsItem.status==1">
                                <text>￥</text>
                                <text>{{goodsItem.price}}</text>
                            </view>
                            <view class="goodsSpell" v-else>已拼成</view>
                        </view>
                    </view>
                    <view class="noneMsg flexCenter" v-else>暂无相关内容~</view>
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
    onLiveList: any = []
    isAllAttention: boolean = false
    hotRank: any = []
    merchantParams: any = {
        pageIndex: 1,
        pageSize: 15
    }
    merchantTotalPage: number = 0
    merchantList: any = []
    onLoad() {
        this.refreshAll()
        this.onEventUI("followAction", (res: any) => {
            if (res && res.alias) {
                let findItem = this.merchantList.find((item: any) => {
                    return item.alias == res.alias;
                });
                if (findItem) {
                    findItem.follow = res.follow;
                    findItem.fans = res.fans;
                }
            }
        });
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
        app.platform.hasLoginToken(() => {
            //一键关注
            app.http.Post('merchant/hot/follow/all', {}, (res: any) => {
                uni.showToast({
                    title: '关注成功'
                })
                const list = res.list || []
                if (!list.length) return
                this.merchantList.forEach((item: any) => {
                    if (list.includes(item.alias)) {
                        item.follow = true
                        item.fans += 1
                    }
                })
            })
        })

    }
    onClickJumpUrl(item: any) {
        if (item.third && item.third == 1001) {
            app.platform.goZgLive({
                roomID: item.roomId,
                playCode: item.playCode,
                goodCode: item.goodCode,
                isAnchor: false,
                ...item
            })
            return
        }
        app.platform.goWeChatLive({ playCode: item.playCode, goodCode: item.goodCode })
    }
    toMerchantJoin() {
        app.platform.hasLoginToken(() => {
            uni.navigateTo({
                url: '/pages/userinfo/merchant_join'
            })
        })

    }
    // 跳转商品详情
    onClickJumpDetails(goodCode: any) {
        app.navigateTo.goGoodsDetails(goodCode)
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
        app.platform.pageBack(1)
    }
    reqOnLive() {
        app.http.Get('dataApi/merchant/broadcast/list', {}, (res: any) => {
            this.onLiveList = res.list || []
        })
    }
    reqHotRank() {
        app.http.Get('dataApi/merchant/hot/list', {}, (res: any) => {
            this.hotRank = res.list || []
        })
    }
    reqNewMerchant(cb?: any) {
        app.http.Get('dataApi/merchant/list', this.merchantParams, (res: any) => {
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
    height: 120rpx;
    // background: #BBBCC0;
    background-size: 100% 100%;
    background-image: url('../../static/userinfo/v2/merchantJoin.png');
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
            background-color: rgba(0, 0, 0, .33);
            top: 0;
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
            margin-top: 10rpx;
        }
    }
}

.hotContainer {
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0 25rpx;
    width: 750rpx;
    // justify-content: space-between;
    margin-top: 20rpx;

    .hot_item {
        width: 115rpx;
        margin-bottom: 30rpx;
        // margin-right: 32rpx;
    }

    .hot_picBlock {
        width: 115rpx;
        height: 115rpx;
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

        font-size: 23rpx;
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
            bottom: 4rpx;

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

    view {
        // font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
    }
}

.followAllButton {
    width: 130rpx;
    height: 46rpx;
    border: 1rpx solid #C0C0C0;
    border-radius: 3rpx;
    font-size: 22.92rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
}

.merchantLiveContainer {
    width: 750rpx;
    white-space: nowrap;
    margin-top: 24rpx;
    margin-bottom: 31rpx;
}

.merchantItem {
    width: 100rpx;
    margin-right: 50rpx;
}

.merchantAvatar_block {
    width: 100rpx;
    height: 100rpx;
    background: #DCDCDC;
    border-radius: 50%;
    border: 4rpx solid #ff003e;
    // overflow: hidden;
    margin-bottom: 18rpx;
    position: relative;
    margin: 0 auto;

    .avatar {
        width: 100rpx;
        height: 100rpx;
    }

    .liveEffects {
        width: inherit;
        height: inherit;
        border-radius: inherit;
        position: absolute;
        border: 2rpx solid #ff003e;
        left: 50%;
        top: 50%;
        // transform: translate(-50%, -50%) scale(1.1);
        -webkit-animation: animate 1s linear infinite;
    }

    @keyframes animate {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }

        50% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 0.5;
            /*圆形放大的同时，透明度逐渐减小为0*/
        }

        100% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0;
            /*圆形放大的同时，透明度逐渐减小为0*/
        }
    }

}

.merchantName {
    font-size: 22rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    width: 126rpx;
    text-align: center;
    margin: 0 auto;
    margin-top: 10rpx;
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
        font-weight: 600;
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
