<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-11-10 10:41:36
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-11-13 14:43:43
 * @FilePath: \card-world\src\pages\act\luckyBag\components\bagPop.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
    <u-popup :show="show" @close="show = false">
        <view class="goodsBagContainer">
            <view class="title">福袋预览
                <view class="close" @click="show = false"></view>
            </view>
            <view class="goodsMsg">
                <view class="goods">
                    <view class="goods_mer">
                        <image :src="$parsePic(goodsDetail.merchantLogo)" class="merPic"></image>
                        <view class="merName u-line-1">{{ goodsDetail.merchantName }}</view>
                    </view>
                    <view class="goodsCode">商品编号:{{ goodsDetail.goodCode }}</view>
                </view>
                <view class="flex1"></view>
                <view class="bagNum">
                    <view class="num">{{ goodsDetail.luckyBagNum }}</view>
                    <view class="subText">福袋数量</view>
                </view>
                <view class="bagNum" style="margin-left: 70rpx;">
                    <view class="num">{{ goodsDetail.weight }}</view>
                    <view class="subText">单组获得概率</view>
                </view>
            </view>
            <view class="a"
                style="font-size: 26rpx;font-weight: 400;color: #333333;margin-top: 38rpx;margin-bottom: 32rpx;">
                本商品福袋包含以下奖励</view>
            <scroll-view class="rewardScroll" :scroll-y="true">
                <view class="rewardContainer">
                    <view class="rewardItem" v-for="(item, index) in (goodsDetail.list || [])" :key="index">
                        <muqian-lazyLoad :src="$parsePic(item.pic)" borderRadius="3rpx" class="pic"></muqian-lazyLoad>
                        <view class="name u-line-1">{{ item.name }}</view>
                        <view class="num">共{{ item.num }}份</view>
                    </view>
                </view>
                <view class="bottomSafeArea"></view>
            </scroll-view>

        </view>
    </u-popup>
</template>

<script lang="ts">
import { Component, Prop, PropSync } from "vue-property-decorator";
import BaseComponent from "@/base/BaseComponent.vue";
import { app } from "@/app"
@Component({})
export default class ClassName extends BaseComponent {
    goodsDetail: any = {}
    show: boolean = false
    created() {
    }
    mounted() {
        // this.getGoodsDetail()
    }
    destroyed() {
    }
    showPop(goodCode: string) {
        app.http.Get(`dataApi/activity/nt/luckyBag/preview/${goodCode}`, {}, (res: any) => {
            this.goodsDetail=res.data
            this.show = true
        })
    }
    getGoodsDetail() {

    }
}
</script>

<style lang="scss" scoped>
.flex1 {
    flex: 1;
}

.goodsBagContainer {
    width: 750rpx;
    // height: 1004rpx;
    background: #FFFFFF;
    border-radius: 6rpx 6rpx 0rpx 0rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: PingFang SC;

    .title {
        font-size: 36rpx;

        font-weight: bold;
        color: #333333;
        text-align: center;
        width: 750rpx;
        height: 107rpx;
        line-height: 107rpx;
        position: relative;

        .close {
            width: 31rpx;
            height: 31rpx;
            background-size: 100% 100%;
            position: absolute;
            right: 50rpx;
            top: 43rpx;
            background-image: url("/static/act/luckyBag/close.png");
        }
    }

    .goodsMsg {
        width: 710rpx;
        height: 180rpx;
        background: #F6F7FB;
        border-radius: 3rpx;
        display: flex;
        width: 100%;
        box-sizing: border-box;
        padding: 0 34rpx 0 45rpx;
        align-items: center;

        .goods {
            .goods_mer {
                display: flex;
                align-items: center;
                margin-bottom: 15rpx;
            }

            .merPic {
                width: 68rpx;
                height: 68rpx;
                background: #000000;
                border-radius: 50%;
                margin-right: 20rpx;
            }

            .merName {
                font-size: 26rpx;

                font-weight: bold;
                color: #333333;
            }

            .goodsCode {
                font-size: 24rpx;

                font-weight: bold;
                color: #959695;
            }
        }

        .bagNum {
            display: flex;
            flex-direction: column;
            align-items: center;

            .num {
                font-size: 34rpx;

                font-weight: bold;
                color: #333333;
                margin-bottom: 16rpx;
            }

            .subText {
                font-size: 22rpx;
                white-space: nowrap;
                font-weight: 400;
                color: #959695;
            }
        }
    }
}

.rewardScroll {
    height: 620rpx;
}

.rewardContainer {
    width: 750rpx;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(3, 200rpx);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 38rpx;
    grid-row-gap: 26rpx;
    justify-content: center;

    .rewardItem {
        display: flex;
        flex-direction: column;
        align-items: center;

        .pic {
            width: 200rpx;
            height: 200rpx;
            background: #000000;
            border-radius: 3px;
            margin-bottom: 16rpx;
        }

        .name {
            font-size: 24rpx;

            font-weight: bold;
            color: #333333;
            margin-top: 15rpx;
        }

        .num {
            font-size: 22rpx;

            font-weight: 400;
            color: #959695;
        }
    }
}
</style>
