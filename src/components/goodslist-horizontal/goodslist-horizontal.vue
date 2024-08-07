<template>
    <view class="goodslistHorizontal">
        <view class="goodsCard" v-for="(item, index) in goodsList" :key="index" @click="onClickJumpUrl(item.goodCode)">
            <muqian-lazyLoad class="goodsImg" borderRadius="3rpx" :src="$parsePic(item.pic)" />
            <view class="goodsRight">
                <view class="goodsName" :class="{ onLineOver: isOneLine }">{{ item.title }}</view>
                
                <view class="goodsRight-bottom">
                    <view class="goodsMerchant uni-flex" @click.stop="onClickSellerShop(item)">
                        <merchantAvatar :level="item.merchantLevel" :src="decodeURIComponent(item.merchantLogo)"/>
                        <view class="merchantName">{{ item.merchantName }}</view>
                    </view>
                    <view class="goodsPriceContainer">
                        <text>￥</text>
                        <text>{{ filterPrice(item.price).integer }}</text>
                        <text class="decimal"
                            v-if="filterPrice(item.price).decimal">{{ filterPrice(item.price).decimal }}</text>
                        <text class="priceTips">{{ goodsManaager.hasLowestPrice(item) ? '起' : '' }}</text>
                    </view>
                </view>
            </view>
            <view class="progress-box">
                <circleProgress :value="goodsManaager.listPlan(item, 'num')" :widths="124" activeColor="linear-gradient(to bottom right, #FA1545,#FF98BB) " defaultColor="rgba(250, 21, 69, 0.06)" bgColor="#fff">
                    <template slot="inner">
                        <view class="progress-inner">
                            <view class="progress-text">{{goodsManaager.listPlan(item, 'num')}}%</view>
                        </view>
                    </template>
                </circleProgress>
            </view>
            <view class="rankContainer" v-if="needRank" :class="[`rank${index + 1}`]">
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
import { getGoodsImg } from "../../tools/util";
import { app } from "@/app";
import { getGoodsPintuan } from '@/tools/switchUtil';
import { Md5 } from "ts-md5";
@Component({})
export default class ClassName extends BaseComponent {
    goodsManaager = app.goods;
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
    width: 46rpx;
    height:55rpx;
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.rank1 {
    background-image: url('@/static/goods/v2/top1.png');
}

.rank2 {
    background-image: url('@/static/goods/v2/top2.png');
}

.rank3 {
    background-image: url('@/static/goods/v2/top3.png');
}

.goodsCard {
    width: 710rpx;
    height: 220rpx;
    background: #FFFFFF;
    border-radius: 5rpx;
    margin-bottom: 12rpx;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    position: relative;
    padding-right: 20rpx;

    .goodsImg {
        width: 284rpx;
        height: 220rpx;
        background: #333333;
        margin-right: 22rpx;
    }

    .goodsRight {
        flex: 1;
        display: flex;
        height: 180rpx;
        justify-content: space-between;
        flex-direction: column;
        .goodsName {
            // font-size: 25rpx;
            // 
            // 
            // color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            line-height: 34rpx;
            -webkit-line-clamp: 2;
            font-size: 24rpx;
            color: #333333;
        }

        .onLineOver {
            -webkit-line-clamp: 1;
        }

        .goodsType {
            font-size: 21rpx;
            
            
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
            font-weight: bold;
            color: #333333;
            font-size: 26rpx;
            color: #333333;
            letter-spacing: -2rpx;
            text:first-child {
                font-size: 28rpx;
                font-weight: 600;
            }
            .decimal {
                font-size: 14rpx;
            }
            .priceTips {
                margin-left: 14rpx;
                font-size: 24rpx;
                font-weight: 600;
                color: #959695;
            }
        }
        .goodsMerchant {
            height:40rpx;
            align-items: center;
            margin-bottom: 20rpx;
            .merchantLogo {
                width: 40rpx;
                height: 40rpx;
            }

            .merchantName {
                font-size: 20rpx;
                color: #A2A8B4;
            }
        }
    }
}
.progress-box{
    width: 121rpx;
    height:121rpx;
    position: absolute;
    bottom:10rpx;
    right:30rpx;
}
.progress-inner{
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.progress-text{
    width: 100%;
    text-align: center;
    color:#000000;
    font-size: 20rpx;
    font-weight: 600;
}
</style>