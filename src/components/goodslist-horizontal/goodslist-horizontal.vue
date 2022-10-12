<template>
    <view class="goodslistHorizontal">
        <view class="goodsCard" v-for="(item,index) in goodsList" :key="index" @click="onClickJumpUrl(item.goodCode)">
            <muqian-lazyLoad class="goodsImg" borderRadius="3rpx" :src="$parsePic(decodeURIComponent(item.pic))" />
            <view class="goodsRight">
                <view class="goodsRight-top">
                    <view class="goodsName">{{item.title}}</view>
                    <view class="goodsProgress uni-flex">
                        <view class="progressContainer">
                            <view class="progress"></view>
                        </view>
                        <view class="progressPercnet">50%</view>
                    </view>
                </view>
                <view class="goodsRight-bottom uni-flex">
                    <view class="goodsPriceContainer">
                        <text>￥</text>
                        <text>{{filterPrice(item.price).integer}}</text>
                        <text class="decimal"
                            v-if="filterPrice(item.price).decimal">{{filterPrice(item.price).decimal}}</text>
                        <text class="priceTips">{{getPriceStart(item)?'起':''}}</text>
                    </view>
                    <view class="goodsMerchant uni-flex" @click.stop="onClickSellerShop(item)">
                        <muqian-lazyLoad class="merchantLogo" borderRadius="50%"
                            :src="$parsePic(decodeURIComponent(item.merchantLogo))" />
                        <view class="merchantName">{{item.merchantName}}</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script lang="ts">
import {
    Component,
    Prop,
    Vue
} from "vue-property-decorator";
import BaseComponent from "@/base/BaseComponent.vue";
import {
    dateFormatMSHMS
} from "@/tools/util"
import {
    getGoodsImg
} from "../../tools/util";
import {
    app
} from "@/app";
import {
    getGoodsPintuan
} from '@/tools/switchUtil';
import {
    Md5
} from "ts-md5";
@Component({})
export default class ClassName extends BaseComponent {
    @Prop({ default: [] })
    goodsList: any;

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
            integer: priceArr[0] + '.',
            decimal: priceArr[1]
        }
    }
    getPriceStart(item: any) {
        return item.isSelect || item.discount != '' || item.pintuan_type == 11
    }
    onClickSellerShop(item: any) {
        if (!item.merchantName) return;
        this.goMerchantPage(item.merchantAlias)
    }
    onClickJumpUrl(id: any) {
        this.$emit("send", id);
    }
}
</script>
<style lang='scss'>
.goodslistHorizontal {
    width: 100%;
}

.goodsCard {
    width: 710rpx;
    height: 216rpx;
    background: #FFFFFF;
    border-radius: 5rpx;
    margin-bottom: 14rpx;
    display: flex;
    box-sizing: border-box;
    padding: 20rpx;
    align-items: center;

    .goodsImg {
        width: 229rpx;
        height: 176rpx;
        background: #333333;
        margin-right: 27rpx;
    }

    .goodsRight {
        flex: 1;
        display: flex;
        height: 176rpx;
        justify-content: space-between;
        flex-direction: column;

        .goodsName {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            line-height: 34rpx;
            -webkit-line-clamp: 2;
        }

        .goodsProgress {
            justify-content: space-between;
            align-items: center;
            margin-top: 18rpx;
        }

        .progressContainer {
            width: 331rpx;
            height: 8rpx;
            background-color: #f6f7fb;
            position: relative;
        }

        .progress {
            width: 50%;
            height: inherit;
            background: linear-gradient(90deg, #F4B5C5 0%, #EA3345 100%);
        }

        .progressPercnet {
            font-size: 23rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #959695;
        }

        .goodsPriceContainer {
            flex: 1;
            font-size: 33rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;

            text:first-child {
                font-size: 18rpx;
                font-weight: 400;
            }

            .decimal {
                font-size: 23rpx;
            }

            .priceTips {
                font-size: 23rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #959695;
                margin-left: 10rpx;
            }
        }

        .goodsMerchant {
            align-items: center;

            .merchantLogo {
                width: 35rpx;
                height: 35rpx;
            }

            .merchantName {
                font-size: 23rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                margin-left: 16rpx;
            }
        }
    }
}
</style>