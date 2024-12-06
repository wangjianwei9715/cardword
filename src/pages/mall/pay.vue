<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-12-16 16:19:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-10-12 15:03:32
 * @FilePath: \jichao_app_2\src\pages\mall\pay.vue
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
            <image class="goodsImg" mode="aspectFill" :src="$parsePic(goodsDetail.logo)"></image>
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
                兑换商品不支持退款、退货服务；确认兑换并支付后积分/支付金额将不予退回<br />
                查看详情<text @click="instructionsShow=true">《购买须知》</text>
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
        <u-popup mode="bottom" closeable round="3rpx" :show="instructionsShow" @close="instructionsShow = false"
            :safeAreaInsetBottom="false">
            <view class="instructionsContainer">
                <view class="instructionsContainer-title">购买须知</view>
                <view class="instructionsContainer-desc" v-for="(item, index) in explain" :key="index">{{ item }}
                </view>
            </view>
        </u-popup>
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
    explain = [
        '1、请确认您购买的产品信息，并在正确填写您的收货地址信息后进行订单支付;',
        '2、订单提交前，若您有信息需要修改，请在订单确认页面直接修改，订单提交后，订单信息将无法修改',
        '3、提请注意:除卡具等周边产品外， 卡世界平台兑换类所售相关产品，因其产品属性及价值的特殊性，不适用“七天无理由退换“之规定，均不支持无理由退换货;',
        '4、提请注意:如果您是末满18周岁的未成年人，请在监护人的陪同、指导下购买本产品。已满18周岁的成年人，因任何原因不具备完全民事行为能力的，参照适用本协议之未成年人使用条款之相关约定购买本产品。我们可能会依照平台用户协议，在您支付之前要求您上传一些相关信息，我们会对您的信息保密，请您理解并支持',
        '5、上述信息确认后，您可以点击“继续支付”进入支付环节，订单支付完成后页面会显示您的订单号。提交订单表示您已经阅读并接受了商城的“使用条款”、“隐私政策”及“退換货政策”',
        '6、由于在线销售存在库存更新网络延时的情况，可能会导致您完成订单支付后订单商品已被兑换完提示缺货的情况。如遇该类情况，售后人员会及时通知您，为您进行退款。给您造成的不便，还请谅解',
        '7、兑换成功后，平台将在7个工作日内进行发货；收货地址为用户默认收货地址，兑换前请核实收货地址，若要修改收货地址请在兑换后24小时内联系客服进行修改。',
        '8、商户发货后，如用户未在以下时限内手动确认收货，系统会自动确认收货。①物流发货地址在中国大陆地区:14天;②物流发货地址非中国大陆地区:30天。'
    ]
    instructionsShow: boolean = false
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
        this.showPayMent = false
        app.http.Pay(`point/good/toBuy/${this.ID}`, { deliveryId: this.addressData.id, channel }, (res: any) => {
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
                app.payment.paymentAlipay(res.h5CashierAddress, res.alipay.orderInfo,() => {
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
            
            
            color: #333333;
        }

        &_linetwo {
            font-size: 25rpx;
            color: #999999;
            
            
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
            
            
            color: #333333;
        }

        .goodsPrice {
            font-size: 29rpx;
            
            font-weight: 600;
            color: #333333;

            .symbol {
                font-size: 21rpx;
            }
        }
    }
}

.instructionsContainer {
    height: 1100rpx;
    box-sizing: border-box;
    padding: 40rpx 32rpx;

    &-title {
        width: 100%;
        font-size: 28rpx;
        
        font-weight: 600;
        color: #14151A;
        margin-bottom: 20rpx;
    }

    &-desc {
        font-size: 24rpx;
        
        color: #7D8288;
        line-height: 40rpx;
    }

    border-radius: 3rpx;

}

.priceContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 94rpx;
    padding: 0 30rpx;
    font-size: 25rpx;
    
    
    color: #333333;
}

.buyReadContainer {
    padding: 36rpx 30rpx 30rpx 30rpx;
    font-size: 25rpx;
    
    
    color: #333333;

    .buyReadTop {
        width: 100%;
        display: flex;
        align-items: center;

        text {
            font-size: 25rpx;
            
            
            color: #333333;
            margin-left: 8rpx;
        }
    }

    .readContent {
        font-size: 25rpx;
        
        
        color: #333333;
        margin-top: 22rpx;

        text {
            font-weight: 600;
        }
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
                
                font-weight: 600;
                color: #333333;
            }

            .all {
                font-size: 25rpx;
                
                
                color: #949494;
                margin-right: 18rpx;
            }

            .price {
                font-size: 50rpx;
                
                font-weight: 600;
                color: #333333;
            }

            // .price {
            //     font-size: 33rpx;
            //     
            //     font-weight: 600;
            //     color: #333333;
            //     margin-bottom: 10rpx;
            //     white-space: nowrap;
            // }

            // .myPoint {
            //     font-size: 23rpx;
            //     
            //     
            //     color: #949494
            // }
        }

        .exchangeButton {
            width: 308rpx;
            height: 82rpx;
            background: #FA1545;
            border-radius: 3rpx;
            font-size: 33rpx;
            
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
