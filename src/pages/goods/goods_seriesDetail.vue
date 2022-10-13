<template>
    <view class="content">
        <view class="detailCard">
            <image class="backImg" mode="aspectFill"
                :src="'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.31/seller/info/1661914607170otf4sr6pif.jpg'" />
            <view class="merchantMask"></view>
            <view class="seriesInfo uni-flex">
                <image class="seriesInfo-avatar" mode="aspectFill"
                    :src="'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.31/seller/info/1661914607170otf4sr6pif.jpg'" />
                <view class="seriesInfo-name">PRIZM</view>
            </view>
            <view class="seriesInfo-introduction">
                球星卡是一种印有篮球明星的卡片，在公元1880年，由美国烟草制造商所推出的。早期的球员卡做为买香烟的赠球星卡是一种印有篮球明星的卡片，在公元1880年，由美国烟草制造商所推出的。早期的球员卡做为买香烟的赠....
            </view>
        </view>
        <view class="seriesCardContainer">
            <scroll-view scroll-x="true" class="cardContainer">
                <view class="uni-flex">
                    <view class="cardBlock" v-for="(item,index) in 10" :key="index" :class="{hasLine:index!=9}">
                        <muqian-lazyLoad class="cardImg" borderRadius="3rpx"
                            :src="'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.31/seller/info/1661914607170otf4sr6pif.jpg'" />
                    </view>
                </view>
            </scroll-view>
            <view class="seriesMore">
                <view>更</view>
                <view>多</view>
                <image class="seriesMore-dot" mode="aspectFill" src="../../static/goods/v2/series_icon_right.png" />
            </view>
        </view>
        <scroll-view scroll-x="true" class="tagContainer">
            <view class="uni-flex" style="height:100%;align-items: center;">
                <view class="tag" v-for="(item,index) in choices" :key="index"
                    :class="{selectTag:queryParams.choice==item || (queryParams.choice=='all'&&item=='全部')}"
                    @click="onClickTag(item)">{{item}}</view>
            </view>
        </scroll-view>
        <goodslist :goodsList="goodsList" />
        <empty v-if="goodsList && !goodsList.length"></empty>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '../../base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    seriesId: any = ''
    seriesDetail: any = {}
    choices: any = ['全部', '6', '213', '123', '13123', '213123123', 'asdasdasd', '123123', '123123213']
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 20,
        choice: "all"
    }
    isFetchEnd: boolean = true
    goodsList: any = []
    onLoad(query: any) {
        this.seriesId = query.seriesId
        this.reqSeriesCards()
        this.reqSeriesDetail()
        this.reqSeriesGoods()
    }
    onPullDownRefresh() {
        this.queryParams.fetchFrom = 1
        this.reqSeriesGoods(() => {
            uni.stopPullDownRefresh()
        })
    }
    onReachBottom() {
        if (this.isFetchEnd) return
        this.queryParams.fetchFrom += this.queryParams.fetchSize
        this.reqSeriesGoods()
    }
    refresh() {
        this.queryParams.fetchFrom = 1
        this.queryParams.fetchSize = 20
        this.reqSeriesGoods()

    }
    onClickTag(item: any) {
        this.queryParams.choice = item == '全部' ? 'all' : item
        this.refresh()
    }
    reqSeriesCards() {
        app.http.Get('dataApi/advertising/iconSeries/rarity/card/list/', {}, (res: any) => {

        })
    }
    reqSeriesGoods(cb?: any) {
        app.http.Get(`dataApi/advertising/iconSeries/good/list/${this.seriesId}`, this.queryParams, (res: any) => {
            const dataList = res.list || []
            this.goodsList = this.queryParams.fetchFrom == 1 ? dataList : [...this.goodsList, ...dataList]
            this.isFetchEnd = res.isFetchEnd
            cb && cb()
        })
    }
    reqSeriesDetail() {
        app.http.Get('dataApi/advertising/iconSeries/detail/' + this.seriesId, {}, (res: any) => {
            this.seriesDetail = res.data
            this.choices = ['全部', ...res.data.choices]
        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #f6f7fb;
}

.detailCard {
    width: 750rpx;
    height: 380rpx;
    position: relative;
}

.backImg {
    width: inherit;
    height: inherit;
    top: 0;
    left: 0;
    position: absolute;
}

.tagContainer {
    width: 710rpx;
    height: 75rpx;
    background: #FFFFFF;
    border-radius: 5rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    margin: 14rpx auto;
    position: relative;
    white-space: nowrap;
    bottom: 26rpx;

    .tag {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #959695;
        margin-right: 61rpx;
    }

    .selectTag {
        font-size: 31rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
    }
}

.seriesCardContainer {
    width: 710rpx;
    height: 172rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    display: flex;
    box-sizing: border-box;
    padding: 29rpx 0 28rpx 23rpx;
    align-items: center;
    position: relative;
    bottom: 26rpx;
    justify-content: space-between;

    .seriesMore {
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #C0C0C0;
        display: flex;
        width: 100rpx;
        flex-direction: column;
        align-items: center;

        .seriesMore-dot {
            width: 7rpx;
            height: 13rpx;
            margin-top: 8rpx;
        }
    }

    .cardContainer {
        display: flex;
        // flex: 1;
        width: 620rpx;
        white-space: nowrap;

        .cardBlock {
            width: 89rpx;
            height: 115rpx;
            margin-right: 26rpx;
            position: relative;
        }

        .hasLine::after {
            content: " ";
            display: block;
            width: 1rpx;
            height: 92rpx;
            background-color: #E2E2E2;
            position: absolute;
            right: -14rpx;
            bottom: 0;
            margin: auto;
            top: 0;
        }

        .cardImg {
            width: inherit;
            height: inherit;

        }
    }
}

.seriesInfo {
    margin-top: 144rpx;
    padding: 0 35rpx;
    align-items: center;
    position: relative;

    .seriesInfo-avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 3rpx;
        margin-right: 28rpx;
    }

    .seriesInfo-name {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
    }
}

.merchantMask {
    width: 100%;
    height: inherit;
    position: absolute;
    background-color: rgba(255, 255, 255, .61);
    top: 0;
    // opacity: .61;
    left: 0;
}

.seriesInfo-introduction {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #E6E6E6;
    padding: 0 36rpx;
    margin-top: 34rpx;
    position: relative;
    line-height: 32rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
</style>
