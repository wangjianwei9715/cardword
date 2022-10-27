<template>
    <view class="goodslistHorizontal">
        <view class="goodsCard" v-for="(item, index) in goodsList" :key="index" @click="onClickJumpUrl(item.goodCode)">
            <muqian-lazyLoad class="goodsImg" borderRadius="3rpx" :src="$parsePic(decodeURIComponent(item.pic))" />
            <view class="goodsRight">
                <view class="goodsRight-top">
                    <view class="goodsName" :class="{ onLineOver: isOneLine }">{{ item.title }}</view>
                    <view v-if="item.state == 0 || item.state == -1" class="startTime">
                        {{ dateFormatMSHMS(item.startAt) + '开售' }}
                    </view>
                    <view class="goodsProgress uni-flex" v-else>
                        <view class="progressContainer">
                            <view class="progress" :style="{ width: (getPlan(item, 'num')) + '%' }"></view>
                        </view>
                        <view class="progressPercnet">{{ getPlan(item, 'num') + '%' }}</view>
                    </view>
                    <view class="goodsType" v-if="isOneLine">
                        <view>{{ getGoodsPintuan(item.pintuan_type) }}</view>
                        <!-- <view class="goodsTypeLine"></view>
                        <view>1箱</view> -->
                    </view>
                </view>
                <view class="goodsRight-bottom uni-flex">
                    <view class="goodsPriceContainer">
                        <text>￥</text>
                        <text>{{ filterPrice(item.price).integer }}</text>
                        <text class="decimal"
                            v-if="filterPrice(item.price).decimal">{{ filterPrice(item.price).decimal }}</text>
                        <text class="priceTips">{{ getPriceStart(item) ? '起' : '' }}</text>
                    </view>
                    <view class="goodsMerchant uni-flex" @click.stop="onClickSellerShop(item)">
                        <muqian-lazyLoad class="merchantLogo" borderRadius="50%"
                            :src="$parsePic(decodeURIComponent(item.merchantLogo))" />
                        <view class="merchantName">{{ item.merchantName }}</view>
                    </view>
                </view>
            </view>
            <view class="rankContainer" v-if="needRank" :class="[`rank${index + 1}`, index >= 3 ? 'rankOther' : '']">
                <view class="rankTop">TOP</view>
                <view class="rankNum">{{ index + 1 }}</view>
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
    dateFormatMSHMS,
    dateFormatMS
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
    @Prop({ default: false })
    needRank: any;
    @Prop({ default: true })
    lockNum: any;
    @Prop({ default: "normal" })
    type?: string;
    getGoodsPintuan = getGoodsPintuan
    dateFormatMSHMS: any = dateFormatMSHMS
    private get isOneLine() {
        //@ts-ignore
        return ['fresh', 'cheap'].includes(this.type)
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
    getPlan(item: any, type: string) {
        const width = Math.round((Number(this.lockNum?item.lockNum:0) + Number(item.currentNum)) / Number(item.totalNum) * 10000) / 100;
        const saleRatio = item.saleRatio > 0 && item.saleRatio < 1 ? Math.round((item.saleRatio) * 10000) / 100 : 0;
        const str = saleRatio > width ?
            `${saleRatio}%` :
            `余${item.totalNum - (item.currentNum + item.lockNum)}/${item.totalNum}`
        return type == 'str' ? str : Math.max(width, saleRatio)
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

.rankContainer {
    width: 58rpx;
    height: 67rpx;
    background-size: 100% 100%;

    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    flex-direction: column;

    .rankTop {
        font-size: 16rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-top: 4rpx;
    }

    .rankNum {
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        position: relative;
        bottom: 12rpx;
    }
}

.rank1 {
    background-image: url('../../static/goods/v2/rank1.png');
}

.rank2 {
    background-image: url('../../static/goods/v2/rank2.png');
}

.rank3 {
    background-image: url('../../static/goods/v2/rank3.png');
}

.rankOther {
    background-image: url('../../static/goods/v2/rankOther.png');
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
    position: relative;

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
            // font-size: 25rpx;
            // font-family: PingFang SC;
            // font-weight: 400;
            // color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            line-height: 34rpx;
            -webkit-line-clamp: 2;
            font-size: 25rpx;
            font-family: PingFangSC-Light;
            font-weight: 400;
            color: #333333;
        }

        .onLineOver {
            -webkit-line-clamp: 1;
        }

        .goodsProgress {
            justify-content: space-between;
            align-items: center;
            margin-top: 18rpx;
        }

        .startTime {
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: 600;
            color: #454645;
            margin-top: 17rpx;
        }

        .progressContainer {
            // width: 331rpx;
            flex: 1;
            height: 8rpx;
            background-color: #f6f7fb;
            position: relative;
        }

        .progress {
            // width: 50%;
            height: inherit;
            background: linear-gradient(90deg, #F4B5C5 0%, #EA3345 100%);
        }

        .progressPercnet {
            margin-left: 18rpx;
            font-size: 23rpx;
            font-family: PingFang SC;
            font-weight: 400;
            width: 86rpx;
            // background-color: red;
            text-align: right;
            color: #959695;
            white-space: nowrap;
        }

        .goodsType {
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #959695;
            display: flex;
            align-items: center;
            margin-top: 10rpx;

            view {
                font-size: inherit;
                font-family: inherit;
                font-weight: inherit;
                color: inherit;
            }
        }

        .goodsTypeLine {
            width: 2rpx;
            height: 21rpx;
            background-color: #959695;
            margin: 0 16rpx;
        }

        .goodsPriceContainer {
            flex: 1;
            // font-size: 33rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            font-size: 31rpx;
            font-family: ArialBold !important;
            font-weight: 400;
            color: #333333;
            // line-height: 38rpx;
            // margin-right: 10rpx;
            letter-spacing: -2rpx;

            text:first-child {
                font-size: 18rpx;
                font-weight: 600;
            }

            .decimal {
                font-size: 23rpx;
            }

            .priceTips {
                // font-size: 23rpx;
                // font-family: PingFang SC;
                // font-weight: 400;
                // color: #959695;
                margin-left: 10rpx;
                font-size: 23rpx;
                font-family: PingFangSC-Regular;
                font-weight: 500;
                color: #959695;
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