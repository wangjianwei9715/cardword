<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-12-16 16:19:36
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-12-23 15:29:00
 * @FilePath: \card-world\src\pages\mall\pay.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="publickBlock addressContainer" @click="onClickChangeAddress">
            <view class="addressIcon"></view>
            <view class="addressInfo">
                <template v-if="addressData.id">
                    <view class="addressInfo_lineone">{{ addressData.name }} {{ addressData.phone }}</view>
                    <view class="addressInfo_linetwo">{{ addressData.district }} {{ addressData.detail }}</view>
                </template>
                <template v-else>
                    暂无收货地址
                </template>
            </view>
            <view class="dotRight"></view>
        </view>
        <view class="publickBlock goodsContainer">
            <image class="goodsImg" mode="aspectFill" :src="$parsePic(decodeURIComponent(goodsDetail.logo))"></image>
            <view class="goodsRightInfo">
                <view class="goodsName">{{ goodsDetail.name }}</view>
                <view class="goodsPrice">
                    <text class="symbol" v-if="goodsDetail.pay_tp == 2">￥</text>
                    <!-- 5555+99999999卡币 -->
                    {{ goodsDetail.pay_tp == 2 ? `${goodsDetail.money}+${goodsDetail.price}卡币` :
                            `${goodsDetail.price}卡币`
                    }}
                </view>
            </view>
        </view>
        <view class="publickBlock priceContainer">
            <view class="price_left">商品金额</view>
            <view class="price_right">￥{{ goodsDetail.pay_tp == 2 ? goodsDetail.money : 0 }}</view>
        </view>
        <view class="publickBlock buyReadContainer">
            <view class="buyReadTop" @click="isReadAgreement = !isReadAgreement">
                <view class="bottom-gm-gx" :class="{ 'bottom-gm-check': isReadAgreement }"></view>
                <text>购买须知</text>
            </view>
            <view class="readContent">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida
                dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis
                natoque penatibus et magnis dis parturient
            </view>
        </view>
        <payment :showPayMent="showPayMent" :payChannel="mallPayChannel" @cancelPay="showPayMent = false"
            :payPrice="goodsDetail.money" :countTime="0" @pay="onClickPayGoods" />
        <view class="bottomFixedPay">
            <view class="payContainer">
                <view class="payInfo">
                    <view class="all">合计</view>
                    <view class="price">
                        <text class="moneySymbol">￥</text>
                        {{ goodsDetail.pay_tp == 2 ? goodsDetail.money : 0 }}
                    </view>
                </view>
                <view class="exchangeButton flexCenter" @click="onClickPay">立即支付</view>
            </view>
            <view class="bottomSafeArea"></view>
        </view>

        <!--   -->
        <!-- <view @click="onClickChangeAddress">
            {{ addressData.district || '' }}
            {{ addressData.name || '' }}
            {{ addressData.phone || '' }}
        </view>
        <button @click="isReadAgreement = true">阅读购买协议</button>
        <button class="payButton" @click="onClickPay">支付</button> -->
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
const mallPayChannel: any = [
    {
        android: true,
        channel: "alipay",
        channelId: 1702,
        ios: true,
        name: "支付宝支付"
    },
    {
        android: true,
        channel: "alipay_h5",
        channelId: 1704,
        ios: true,
        name: "支付宝H5支付"
    }
]
@Component({})
export default class ClassName extends BaseNode {
    goodsDetail: any = {}
    mallPayChannel: any = mallPayChannel;
    ID: any = null
    addressData: any = {}
    showPayMent: boolean = false
    isReadAgreement: boolean = false
    orderCode: string = ""//订单编号
    onLoad(query: any) {
        this.ID = query.id
        this.getDefaultAddress()
        this.reqNewData()
    }
    onClickPay() {
        if (!this.addressData.id) {
            uni.showToast({
                title: '请选择一个收货地址',
                icon: 'none'
            })
            app.platform.UINotificationFeedBack('error')
            return
        }
        if (!this.isReadAgreement) {
            uni.showToast({
                title: '请先阅读购买须知,并同意勾选',
                icon: 'none'
            })
            app.platform.UINotificationFeedBack('error')
            return
        }
        //实物
        if (this.goodsDetail.pay_tp == 1 && this.goodsDetail.goodTp == 2) {
            // this.showPayMent = true
            this.creatOrder('default', true)
            return
        }
        this.showPayMent = true


    }
    onClickPayGoods(event: any) {
        //进入创建支付订单流程
        this.creatOrder(event.channel == "alipay" ? "default" : event.channel, false)
    }
    //创建订单
    creatOrder(channel?: string, isTrueGoods?: boolean) {
        uni.showLoading({
            title: ""
        })
        this.showPayMent=false
        app.http.Post(`point/good/toBuy/${this.ID}`, { deliveryId: this.addressData.id, channel }, (res: any) => {
            this.orderCode = res.orderCode
            uni.hideLoading()
            
            if (isTrueGoods) {
                //实物
                app.platform.UINotificationFeedBack('success')
                uni.showModal({
                    title: '卡币商城提示',
                    content: "兑换成功！",
                    showCancel: false,
                    success: (res: any) => {
                        if (res.confirm) this.toOrderDetail()
                    }
                })
            } else {
                //订单创建成功跳转支付宝支付
                app.payment.paymentAlipay(res.sdk, res.alipay.orderInfo, res.orderCode, () => {
                    this.toOrderDetail()
                });
            }
        })
    }
    toOrderDetail() {
        uni.redirectTo({
            url: `/pages/mall/orderDetail?orderCode=${this.orderCode}&pay_tp=${this.goodsDetail.pay_tp}`
        })
    }
    onClickChangeAddress() {
        uni.navigateTo({
            url: "/pages/userinfo/setting_addresses?type=order",
        });
    }
    getDefaultAddress() {
        this.onEventUI("addressSelect", (data) => {
            this.addressData = data.data;
        });
        app.http.Get("me/delivery", {}, (res: any) => {
            if (res.list && res.list.length) {
                this.addressData = res.list.find((item: any) => item.default)
            }
        });

    }
    //获取商品详情
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/point/exchange/good/detail/${this.ID}`, {}, (res: any) => {
            this.goodsDetail = res.data
        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #f6f7fb;
}

.publickBlock {
    width: 710rpx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 3rpx;
    margin-top: 14rpx;
}

.addressContainer {
    height: 140rpx;
    padding: 34rpx 34rpx 36rpx 30rpx;
    display: flex;
    align-items: center;

    .addressIcon {
        background-size: 100% 100%;
        background-image: url('@/static/mall/address.png');
        width: 50rpx;
        height: 65rpx;
    }

    .addressInfo {
        flex: 1;
        margin-left: 22rpx;
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        &_lineone {
            font-size: 29rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
        }

        &_linetwo {
            font-size: 25rpx;
            color: #999999;
            font-family: PingFang SC;
            font-weight: 400;
        }
    }

    .dotRight {
        background-size: 100% 100%;
        background-image: url('@/static/mall/dotRight_pay.png');
        width: 21rpx;
        height: 29rpx;
    }
}

.goodsContainer {
    padding: 36rpx 30rpx;
    display: flex;
    align-items: center;

    .goodsImg {
        width: 173rpx;
        height: 133rpx;
        border-radius: 3rpx;
    }

    .goodsRightInfo {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 133rpx;
        margin-left: 27rpx;
        flex: 1;

        .goodsName {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
        }

        .goodsPrice {
            font-size: 29rpx;
            font-family: PingFang SC;
            font-weight: 600;
            color: #333333;

            .symbol {
                font-size: 21rpx;
            }
        }
    }
}

.priceContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 94rpx;
    padding: 0 30rpx;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
}

.buyReadContainer {
    padding: 36rpx 30rpx 30rpx 30rpx;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;

    .buyReadTop {
        width: 100%;
        display: flex;
        align-items: center;

        text {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            margin-left: 8rpx;
        }
    }

    .readContent {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-top: 22rpx;
    }

    .bottom-gm-gx {
        width: 26rpx;
        height: 26rpx;
        background-image: url(@/static/userinfo/weixuan@2x.png);
        background-size: 100% 100%;
        margin-right: 10rpx;
    }

    .bottom-gm-check {
        background-image: url(@/static/userinfo/pay_gou.png);
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
            // flex-direction: column;
            // justify-content: center;
            align-items: center;

            .moneySymbol {
                font-size: 25rpx;
                font-family: PingFang SC;
                font-weight: 600;
                color: #333333;
            }

            .all {
                font-size: 25rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #949494;
                margin-right: 18rpx;
            }

            .price {
                font-size: 50rpx;
                font-family: PingFang SC;
                font-weight: 600;
                color: #333333;
            }

            // .price {
            //     font-size: 33rpx;
            //     font-family: PingFang SC;
            //     font-weight: 600;
            //     color: #333333;
            //     margin-bottom: 10rpx;
            //     white-space: nowrap;
            // }

            // .myPoint {
            //     font-size: 23rpx;
            //     font-family: PingFang SC;
            //     font-weight: 400;
            //     color: #949494
            // }
        }

        .exchangeButton {
            width: 308rpx;
            height: 82rpx;
            background: #FA1545;
            border-radius: 3rpx;
            font-size: 33rpx;
            font-family: PingFang SC;
            font-weight: 600;
            letter-spacing: 4rpx;
            color: #FFFFFF;
        }

        .exchangeButton_dis {
            background: #aaaaaa;
        }
    }
}
</style>
