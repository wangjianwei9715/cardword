<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-12-16 16:08:27
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-01-04 10:48:29
 * @FilePath: \card-world\src\pages\mall\detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <u-skeleton rows="4" style="width: 690rpx" :rowsWidth="[`690rpx`, `690rpx`, `690rpx`, `690rpx`]"
            :rowsHeight="[`280rpx`, `40rpx`, `200rpx`, `600rpx`]" :title="false"
            :loading="!goodsDetail.id"></u-skeleton>
        <view class="topImage">
            <image mode="aspectFill" :src="$parsePic(decodeURIComponent(goodsDetail.logo))"></image>
        </view>
        <view class="goodsInfoContainer">
            <view class="goodsName">{{ goodsDetail.name }}</view>
            <view class="goodsInfoBottom">
                <view class="goodsInfoBottom_left">
                    <view class="price">{{ goodsPrice }}</view>
                    <view class="numBlock" v-if="isOnCountDown">
                        <view class="numBlock_left flexCenter">剩{{ goodsDetail.leftNum == -1 ? "∞" : goodsDetail.leftNum
}}份</view>
                        <view class="numBlock_right flexCenter">限兑{{ goodsDetail.limit_num == 0 ? "∞" :
        goodsDetail.limit_num
}}份</view>
                    </view>
                </view>
                <view class="goodsInfoBottom_right">
                    <template v-if="isOnCountDown">
                        <view class="tips">距离开始</view>
                        <view class="timeBlockContainer">
                            <view class="timeBlock flexCenter"
                                v-for="time in getCountDownInfo(nowTimeStamp, goodsDetail.start_at).hours">{{ time }}
                            </view>
                            <view class="colon">:</view>
                            <view class="timeBlock flexCenter"
                                v-for="time in getCountDownInfo(nowTimeStamp, goodsDetail.start_at).minutes">{{ time }}
                            </view>
                            <view class="colon">:</view>
                            <view class="timeBlock flexCenter"
                                v-for="time in getCountDownInfo(nowTimeStamp, goodsDetail.start_at).seconds">{{ time }}
                            </view>
                        </view>
                    </template>
                    <template v-else>
                        <view class="tips">
                            剩余{{ goodsDetail.leftNum == -1 ? "∞" : goodsDetail.leftNum }}限兑{{
        goodsDetail.limit_num == 0
            ? "∞"
            : `${goodsDetail.buy_num}/${goodsDetail.limit_num}`
}}
                        </view>
                    </template>
                </view>
            </view>
        </view>
        <view class="descriptionContainer" v-if="goodsDetail.describe">
            <view class="title">温馨提示</view>
            <view class="desContent">{{ goodsDetail.describe }}</view>
        </view>
        <view class="goodsImgListContainer" v-if="goodsDetail.pic && goodsDetail.pic.length">
            <view class="title">商品详情</view>
            <muqian-lazyLoad class="img" borderRadius="3rpx" @click="onClickPreviewImage(index)" v-for="(item, index) in goodsDetail.pic" :key="index"
                :src="$parsePic(decodeURIComponent(item))"></muqian-lazyLoad>
        </view>
        <view class="bottomSafeArea" style="height: 150rpx"></view>
        <view class="bottomFixedPay">
            <view class="payContainer">
                <view class="payInfo">
                    <view class="price">{{ goodsPrice }}</view>
                    <view class="myPoint">当前卡币:{{ meBeanPoint }}</view>
                </view>
                <view class="exchangeButton flexCenter" @click="onClickExchange"
                    :class="{ exchangeButton_dis: !canExchange }">{{ payText }}</view>
            </view>
            <view class="bottomSafeArea"></view>
        </view>
        <u-popup mode="center" closeable round="3rpx" :show="exchangeModal" @close="exchangeModal = false"
            :safeAreaInsetBottom="false">
            <view class="coninExchange">
                <image class="exchangeImg" :src="$parsePic(decodeURIComponent(goodsDetail.logo))" mode="aspectFill" />
                <view class="exchangeGoodsPrice">
                    <view class="exchangeText">兑换所需：<text style="color: #e53b4b">{{ goodsDetail.price }}卡币</text></view>
                    <view class="exchangeText">当前卡币：<text>{{ meBeanPoint }}</text></view>
                </view>
                <view class="exchangeModalButton flexCenter" @click="onClickPayBeanPoint">确认兑换</view>
                <view class="exchangeTips">确认兑换后积分/支付金额将不予退回</view>
                <!-- <button @click="onClickPayBeanPoint">确认兑换</button> -->
            </view>
        </u-popup>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from "@/base/BaseNode.vue";
import { liveCountDownV2, parsePic } from "@/tools/util";
@Component({})
export default class ClassName extends BaseNode {
    ID: any = null;
    goodsDetail: any = {};
    timer: any = null;
    meBeanPoint: number = 0;
    liveCountDownV2: any = liveCountDownV2;
    exchangeModal: boolean = false;
    nowTimeStamp: any = Math.round(+new Date() / 1000);
    onLoad(query: any) {
        this.timer = setInterval(() => {
            this.getNewTime();
        }, 1000);
        app.platform.hasLoginToken(() => {
            this.ID = query.id;
            this.reqMeCardBean();
        });
    }
    onShow() {
        this.reqNewData();
    }
    onUnload(): void {
        clearInterval(this.timer);
    }
    getNewTime() {
        this.nowTimeStamp = Math.round(+new Date() / 1000);
    }
    private get goodsPrice() {
        if (!this.goodsDetail.id) return "";
        return `${this.goodsDetail.price}卡币${this.goodsDetail.pay_tp == 2 ? `+${this.goodsDetail.money}元` : ""
            }`;
    }
    private get isOnCountDown() {
        return (
            this.goodsDetail.start_at &&
            this.goodsDetail.start_at > 0 &&
            this.nowTimeStamp < this.goodsDetail.start_at
        );
    }
    private get canExchange() {
        let bol: boolean = true;
        if (!this.goodsDetail.id) bol = false;
        if (this.goodsDetail.state == 0) bol = false;
        if (this.goodsDetail.leftNum == 0) bol = false;
        if (
            this.goodsDetail.limit_num != 0 &&
            this.goodsDetail.limit_num <= this.goodsDetail.buy_num
        )
            bol = false;
        if (
            this.goodsDetail.start_at &&
            this.nowTimeStamp < this.goodsDetail.start_at
        )
            bol = false;
        return bol;
    }
    private get payText() {
        if (
            this.goodsDetail.limit_num != 0 &&
            this.goodsDetail.limit_num <= this.goodsDetail.buy_num
        )
            return "兑换已上限";
        return "立即支付";
    }
    goodsDetailTimeChange(event: any, item: any) {
        // console.log(event, item);
        item.startTimeInfo = event;
    }
    //点击立即兑换操作
    onClickExchange() {
        if (!this.canExchange) {
            // uni.showToast({
            //     title: '当前不可兑换',
            //     icon: 'none'
            // })
            return;
        }
        if (this.meBeanPoint < this.goodsDetail.price) {
            uni.showToast({
                title: "很遗憾您的卡币不足暂时无法兑换~",
                icon: "none",
            });
            app.platform.UINotificationFeedBack("error");
            return;
        }
        //混合支付以及实物商品
        if (this.goodsDetail.pay_tp == 2 || this.goodsDetail.goodTp == 2) {
            uni.navigateTo({
                url: `/pages/mall/pay?id=${this.ID}`,
            });
            return;
        }
        //卡币支付
        if (this.goodsDetail.pay_tp == 1) {
            this.exchangeModal = true;
            return;
        }
    }
    //卡币兑换的虚拟类商品确认支付
    onClickPayBeanPoint() {
        if (!this.exchangeModal) return
        uni.showLoading({
            title: "",
            mask: true
        })
        app.http.Post(`point/exchange/exchange/${this.ID}`, {}, (res: any) => {
            this.exchangeModal = false;
            uni.hideLoading()
            app.platform.UINotificationFeedBack("success");

            uni.showToast({
                title: "兑换成功",
            });
            this.meBeanPoint = res.point;
            this.reqNewData();
        });
    }
    onClickPreviewImage(index: number) {
        const urls:any=this.goodsDetail.pic.map((src:any)=>{
            return parsePic(decodeURIComponent(src))
        })
        uni.previewImage({
            urls,
            current: index,
            indicator: "number"
        });
    }
    onClickGoExchangeLog() {
        uni.navigateTo({
            url: `/pages/mall/record_award`,
        });
    }
    //获取个人卡币
    reqMeCardBean(cb?: Function) {
        app.http.Get("dataApi/point/index", {}, (res: any) => {
            this.meBeanPoint = res.point || 0;
            cb && cb();
        });
    }
    //获取商品详情
    reqNewData(cb?: any) {
        app.http.Get(
            `dataApi/point/exchange/good/detail/${this.ID}`,
            {},
            (res: any) => {
                this.goodsDetail = res.data;
            }
        );
    }
    getCountDownInfo(nowTimeStamp: number, endTimeStamp: number) {
        if (!endTimeStamp)
            endTimeStamp = Math.round(
                (new Date(new Date().toLocaleDateString()).getTime() +
                    24 * 60 * 60 * 1000 -
                    1) /
                1000
            );
        let times: any =
            new Date(endTimeStamp * 1000).getTime() -
            new Date(nowTimeStamp * 1000).getTime();
        let ss: any = Math.floor(times / 1000);
        let hh = this.formatNumberZero(Math.floor(ss / 3600));
        ss %= 3600;
        let mm = this.formatNumberZero(Math.floor(ss / 60));
        ss %= 60;
        ss = this.formatNumberZero(ss);
        const timeInfo: any = {
            hours: String(hh).split(""),
            minutes: String(mm).split(""),
            seconds: String(ss).split(""),
        };
        return timeInfo;
    }
    formatNumberZero(val: any) {
        return val < 10 ? "0" + val : val;
    }
}
</script>

<style lang="scss">
page {
    background-color: #f6f7fb;
}

.topImage {
    width: 750rpx;
    height: 577rpx;
    z-index: 1;

    image {
        width: inherit;
        height: inherit;
    }
}

.coninExchange {
    width: 525rpx;
    border-radius: 3rpx;
    box-sizing: border-box;
    padding: 60rpx 80rpx 40rpx 80rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .exchangeGoodsPrice {
        min-width: 316rpx;
        display: flex;
        flex-direction: column;
    }

    .exchangeImg {
        width: 367rpx;
        height: 367rpx;
        border-radius: 3rpx;
        margin-bottom: 38rpx;
    }

    .exchangeText {
        font-size: 29rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
    }

    .exchangeModalButton {
        width: 451rpx;
        height: 90rpx;
        background: #fa1545;
        border-radius: 3rpx;
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: 600;
        letter-spacing: 4rpx;
        color: #ffffff;
        margin-top: 46rpx;
        margin-bottom: 18rpx;
    }

    .exchangeTips {
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #949494;
        white-space: nowrap;
    }
}

.goodsInfoContainer {
    width: 710rpx;
    min-height: 214rpx;
    background: #ffffff;
    border-radius: 3rpx;
    margin-top: -84rpx;
    z-index: 2;
    box-sizing: border-box;
    padding: 37rpx 31rpx 37rpx 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goodsName {
        font-size: 31rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #333333;
    }

    .goodsInfoBottom {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .goodsInfoBottom_left {
            .price {
                font-size: 33rpx;
                font-family: PingFang SC;
                font-weight: 600;
                color: #e53b4b;
            }

            .numBlock {
                width: 190rpx;
                height: 26rpx;
                // background: #000000;
                border-radius: 16rpx;
                overflow: hidden;
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #ffffff;
                display: flex;
                white-space: nowrap;
                margin-top: 12rpx;

                .numBlock_left {
                    font-size: 20rpx;
                    width: 80rpx;
                    background-color: #000000;
                }

                .numBlock_right {
                    flex: 1;
                    background-color: #ffffff;
                    color: #e53b4b;
                    font-size: 20rpx;
                    border-radius: 0rpx 15rpx 16rpx 0rpx;
                    border: 1rpx solid #e53b4b;
                }
            }
        }

        .goodsInfoBottom_right {
            .tips {
                font-size: 21rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #515151;
                text-align: right;
            }

            .timeBlockContainer {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-top: 14rpx;

                .timeBlock {
                    width: 26rpx;
                    height: 26rpx;
                    background: #000000;
                    border-radius: 3rpx;
                    font-size: 21rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #ffffff;
                    margin-left: 4rpx;
                }

                .colon {
                    margin-left: 6rpx;
                    margin-right: 2rpx;
                    font-size: 21rpx;
                }
            }
        }
    }
}

.descriptionContainer {
    width: 710rpx;
    border-radius: 3rpx;
    box-sizing: border-box;
    padding: 35rpx 33rpx;
    background-color: #fff;
    margin-top: 14rpx;

    .title {
        font-size: 31rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #333333;
        margin-bottom: 18rpx;
    }

    .desContent {
        text-align: left;
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
    }
}

.goodsImgListContainer {
    width: 710rpx;
    border-radius: 3rpx;
    box-sizing: border-box;
    padding: 35rpx 30rpx;
    background-color: #fff;
    margin-top: 14rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        font-size: 31rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #333333;
        margin-bottom: 18rpx;
        text-align: left;
        width: 100%;
    }

    .img {
        width: 648rpx;
        height: 499rpx;
        background: #161616;
        border-radius: 3rpx;
        margin-bottom: 23rpx;
    }
}

.bottomFixedPay {
    width: 750rpx;
    position: fixed;
    bottom: 0;
    background-color: #fff;

    .payContainer {
        display: flex;
        box-sizing: border-box;
        width: inherit;
        height: 130rpx;
        align-items: center;
        padding: 20rpx 34rpx 30rpx 34rpx;
        justify-content: space-between;

        .payInfo {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .price {
                font-size: 33rpx;
                font-family: PingFang SC;
                font-weight: 600;
                color: #333333;
                margin-bottom: 10rpx;
                white-space: nowrap;
            }

            .myPoint {
                font-size: 23rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #949494;
            }
        }

        .exchangeButton {
            width: 308rpx;
            height: 82rpx;
            background: #fa1545;
            border-radius: 3rpx;
            font-size: 33rpx;
            font-family: PingFang SC;
            font-weight: 600;
            letter-spacing: 4rpx;
            color: #ffffff;
        }

        .exchangeButton_dis {
            background: #aaaaaa;
        }
    }
}
</style>
