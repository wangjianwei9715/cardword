<template>
    <view class="content">
        <view class="topArea">
            <view class="menuContainer" v-if="seriesType.list && seriesType.list.length">
                <u-tabs @change="onClickTag" :lineWidth="0" :lineHeight="0" :list="seriesType.list" :scrollable="true"
                    customType="goods_animeTv" :current="seriesType.index">
                </u-tabs>
            </view>
        </view>
        <view class="goodsMenu">
            <view class="menu" v-for="(item, index) in goodsMenu.list" :key="index"
                :class="{ menu_select: goodsMenu.index == index }" @click="onClickGoodsMenu(item, index)">{{
                    item.label }}</view>
        </view>
        <view class="goodsList">
            <view class="anGoods" v-for="(item, index) in goodsList" :key="index" @click="onClickGoods(item)">
                <muqian-lazyLoad class="pic" borderRadius="3rpx"
                    :src="$parsePic(item.pic)"></muqian-lazyLoad>
                <view class="goodsInfo">
                    <view class="name u-line-1">{{ item.title }}</view>
                    <view class="typePro">
                        <view class="type flexCenter">{{ getGoodsPintuan(item.pintuan_type) }}</view>
                        <view class="progress">
                            <view class="proRed" :style="{ width: (goodsManaager.listPlan(item, 'num')) + '%' }"></view>
                            <view class="text">{{ goodsManaager.listPlan(item, 'str') }}</view>
                        </view>
                    </view>
                    <view class="bottomWrap">
                        <view @click.stop="onClickMerchant(item)" style="display: flex;align-items: center;flex: 1;">
                            <merchantAvatar width="35rpx" height="35rpx" :level="item.merchantLevel"
                                :src="decodeURIComponent(item.merchantLogo)" />
                            <view class="merchantName u-line-1">{{ item.merchantName }}
                            </view>
                        </view>
                        <view class="goodsPriceContainer">
                            <text>￥</text>
                            <text>{{ filterPrice(item.price).integer }}</text>
                            <text class="decimal" v-if="filterPrice(item.price).decimal">{{ filterPrice(item.price).decimal
                            }}</text>
                            <text class="priceTips">{{ goodsManaager.hasLowestPrice(item) ? '起' : '' }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <empty v-if="goodsList && !goodsList.length" />
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import {
    getGoodsPintuan
} from '@/tools/switchUtil';
const queryParams: any = {
    fetchFrom: 1,
    fetchSize: 10,
    od: "",
    // st:null,
}
@Component({})
export default class ClassName extends BaseNode {
    queryParams: any = Object.assign({}, queryParams)
    getGoodsPintuan = getGoodsPintuan
    goodsList: any = []
    totalPage: number = 0
    isEnd: boolean = false
    goodsManaager = app.goods;
    seriesType: any = {
        index: -1,
        list: []
    }
    goodsMenu: any = {
        index: 0,
        list: [
            {
                label: "推荐"
            },
            {
                value: "progress:desc",
                key: "od",
                label: "即将拼成"
            },
            {
                label: "最新上架",
                value: "active_at:desc",
                key: "od",
            },
            {
                value: "price",
                key: "od",
                label: "单价"
            }
        ]

    }
    seriesId: any = null
    onLoad(query: any) {
        if (query.seriesId) {
            this.seriesId = +query.seriesId
            this.queryParams.st = +query.seriesId
        }
        this.getAnimeTvSeriesType()
        this.reqNewData()
    }
    onReachBottom() {
        if (!this.isEnd) {
            this.queryParams.fetchFrom += this.queryParams.fetchSize
            this.reqNewData()
        }
    }
    onPullDownRefresh() {
        this.queryParams.pageIndex = 1
        this.reqNewData(() => {
            setTimeout(() => {
                uni.stopPullDownRefresh()
            }, 500)
        })
    }
    onClickGoods(item: any) {
        app.navigateTo.goGoodsDetails(item.goodCode)
    }
    onClickMerchant(item: any) {
        this.goMerchantPage(item.merchantAlias)
    }
    filterPrice(price: number) {
        let data = {
            integer: 0,
            decimal: 0,
        }
        if (!price) return data
        const priceArr: any = String(price).split('.')
        if (priceArr.length == 1) {
            data.integer = priceArr[0]
            return data
        }
        return {
            integer: priceArr[0],
            decimal: '.' + priceArr[1]
        }
    }
    onClickTag(item: any) {
        if (this.queryParams.st == item.id) {
            this.queryParams = Object.assign({}, queryParams)
            delete this.queryParams.st
            this.seriesType.index = -1
        } else {
            this.queryParams = Object.assign({}, queryParams)
            this.queryParams.st = item.id
            this.seriesType.index = item.index
        }
        this.reqNewData()
    }
    onClickGoodsMenu(item: any, index: number) {
        if (this.goodsMenu.index == index) return
        // this.queryParams = Object.assign({}, queryParams)
        this.queryParams.fetchFrom = 1
        this.goodsMenu.index = index
        if (item.key) {
            this.queryParams[item.key] = item.value
        } else {
            this.queryParams.od = ""
        }
        this.reqNewData()
    }
    getAnimeTvSeriesType() {
        app.http.Get("dataApi/seriesType/list/8", {}, (res: any) => {
            this.seriesType.list = (res.list || []).map((item: any) => {
                return {
                    id: item.id,
                    name: item.title,
                    //@ts-ignore
                    pic_url: this.$parsePic(item.pic_url),
                }
            })
            if (this.seriesId) {
                const index = this.seriesType.list.findIndex((item: any) => {
                    return item.id == this.seriesId
                })
                if (index >= 0) this.seriesType.index = index
            }
        })
    }
    reqNewData(cb?: any) {
        this.queryParams.timeStamp = Math.round(+new Date() / 1000)
        app.http.GetWithCrypto(`dataApi/goodlist/forsale/animeTv`, this.queryParams, (res: any) => {
            const list = res.goodList || []
            this.isEnd = res.isFetchEnd
            this.queryParams.fetchFrom == 1 ? this.goodsList = list : this.goodsList.push(...list)
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #fff;
}

.topArea {
    width: 750rpx;
    height: 485rpx;
    background-size: 100% 100%;
    background-image: url("@/static/goods/animeTvTopNew.png");
    position: relative;
}

.goodsMenu {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 40rpx;
    margin-bottom: 25rpx;

    .menu {
        color: #aeaeae;
        width: 25%;
        text-align: center;
        // margin-right: 10rpx;
        font-size: 28rpx;
        
        font-weight: bold;
        color: #959699;
    }

    .menu_select {
        // color: #fb374e;
        
        font-weight: bold;
        color: #FA1545;
        font-size: 31rpx;
    }
}

.goodsList {
    width: 100%;
}

.menuContainer {
    bottom: -6rpx;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    padding: 0 15rpx;
}

.anGoods {
    width: 750rpx;
    display: flex;
    position: relative;
    margin-bottom: 21rpx;
    box-sizing: border-box;
    padding-right: 20rpx;
    margin-bottom: 20rpx;

    .pic {
        width: 229rpx;
        height: 176rpx;
        margin-right: 26rpx;
    }

    .goodsInfo {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: inherit;

        .name {
            font-size: 25rpx;
            
            font-weight: bold;
            color: #333333;
            margin-bottom: 20rpx;
        }

        .typePro {
            display: flex;
            flex: 1;

            .type {
                font-size: 20rpx;
                
                font-weight: 400;
                color: #949494;
                padding: 0rpx 6rpx;
                height: 28rpx;
                // line-height: 28rpx;
                background: #E6E6E6;
                border-radius: 3rpx;
                margin-right: 17rpx;
                vertical-align: bottom;
            }

            .progress {
                height: 28rpx;
                background: #E6E6E6;
                border-radius: 3rpx;
                // padding: 0 9rpx;
                position: relative;
                width: 152rpx;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;

                .proRed {
                    background-color: #FA1545;
                    position: absolute;
                    left: 0;
                    height: inherit;
                    top: 0;
                    z-index: 1;
                }

                .text {
                    font-size: 20rpx;
                    
                    font-weight: 400;
                    color: #333333;
                    // line-height: 28rpx;
                    z-index: 2;
                    position: relative;
                    vertical-align: bottom;
                }
            }
        }

        .bottomWrap {
            display: flex;
            align-items: center;

            .merchantName {
                font-size: 23rpx;
                
                font-weight: 400;
                color: #333333;
                margin-left: 10rpx;
                flex: 1;
            }

            .goodsPriceContainer {
                // font-size: 33rpx;
                
                font-weight: bold;
                color: #333333;
                font-size: 31rpx;
                font-family: ArialBold !important;
                font-weight: 400;
                color: #333333;
                letter-spacing: -2rpx;

                text:first-child {
                    font-size: 18rpx;
                    font-weight: bold;
                }

                .decimal {
                    font-size: 23rpx;
                }

                .priceTips {
                    margin-left: 10rpx;
                    font-size: 23rpx;
                    
                    font-weight: 500;
                    color: #959695;
                }
            }
        }
    }
}
</style>
