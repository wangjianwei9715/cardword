<template>
    <view class='content'>
        <bottomDrawer padding="0 24rpx" :title="couponData.goodCode?'商品券':'店铺券'" :height='couponData.getTp==1?686:772'
            heightType='rpx' :needSafeArea='true' :showDrawer.sync='showValue'>
            <view class="sendCouponItem">
                <text class="sendCoupon-left" style="flex: 1;">发放方式</text>
                <view class="checkContainer uni-flex">
                    <view class="checkItem uni-flex" @click="couponData.getTp=1">
                        <view class="noneCheck" :class="{check:couponData.getTp==1}"></view>
                        线上领取
                    </view>
                    <view class="checkItem uni-flex" @click="couponData.getTp=2">
                        <view class="noneCheck" :class="{check:couponData.getTp==2}"></view>
                        线下兑换码
                    </view>
                </view>
            </view>
            <view class="sendCouponItem" v-if="couponData.getTp==2">
                <text class="sendCoupon-left" style="flex: 1;">兑换码形式</text>
                <view class="checkContainer uni-flex">
                    <view class="checkItem uni-flex" @click="couponData.exchangeCodeTp=1">
                        <view class="noneCheck" :class="{check:couponData.exchangeCodeTp==1}"></view>
                        一码一用
                    </view>
                    <view class="checkItem uni-flex" @click="couponData.exchangeCodeTp=2">
                        <view class="noneCheck" :class="{check:couponData.exchangeCodeTp==2}"></view>
                        一码多用
                    </view>
                </view>
            </view>
            <view class="sendCouponItem">
                <text class="sendCoupon-left">优惠券面额</text>
                <input class="couponInput" placeholder-style="color:#333" v-model.number="couponData.amount"
                    placeholder="请输入优惠券面额" type="number">
                <image class="rightCoin" src="../../static/act/playGroup/rightCoin.png" mode="scaleToFill" />
            </view>
            <view class="sendCouponItem">
                <text class="sendCoupon-left">使用条件</text>
                <input class="couponInput" placeholder-style="color:#333" v-model.number="couponData.minUseAmount"
                    placeholder="为0代表创建无门槛券" type="number">
                <image class="rightCoin" src="../../static/act/playGroup/rightCoin.png" mode="scaleToFill" />
            </view>
            <view class="sendCouponItem">
                <text class="sendCoupon-left">数量</text>
                <input class="couponInput" placeholder-style="color:#333" v-model.number="couponData.maxNum"
                    placeholder="请输入" type="number">
                <image class="rightCoin" src="../../static/act/playGroup/rightCoin.png" mode="scaleToFill" />
            </view>
            <view class="sendCouponItem">
                <text class="sendCoupon-left">有效期</text>
                <input class="couponInput" placeholder-style="color:#333" v-model.number="couponData.lifeTime"
                    placeholder="请输入（天）" type="number">
                <image class="rightCoin" src="../../static/act/playGroup/rightCoin.png" mode="scaleToFill" />
            </view>
            <view class="submit flexCenter" @click="onClickSubmit">
                创建
            </view>
        </bottomDrawer>
    </view>
</template>

<script lang="ts">
    interface CouponData {
        goodCode?: string,//商品code,没有则默认创建商家券
        amount: number | null,//面额
        minUseAmount: number | null,//	满足满减的金额,为0代表创建无门槛券
        maxNum: number | null,//优惠券数量
        lifeTime: number | null,//有效天数，1~90天
        getTp: number,//发放方式， 1 线上领取 2 兑换码
        exchangeCodeTp: number,//兑换码形式，1 一码以用，2 一码多用
    }
    const couponOriginalData = {
        goodCode: "",//商品code,没有则默认创建商家券
        amount: null,//面额
        minUseAmount: null,//	满足满减的金额,为0代表创建无门槛券
        maxNum: null,//优惠券数量
        lifeTime: null,//有效天数，1~90天
        getTp: 1,//发放方式， 1 线上领取 2 兑换码
        exchangeCodeTp: 1,//兑换码形式，1 一码以用，2 一码多用
    }
    import { app } from "@/app";
    import { Component, Watch, PropSync, Prop } from "vue-property-decorator";
    import BaseComponent from "../../base/BaseComponent.vue";
    import { parsePic } from "@/tools/util";
    @Component({})
    export default class ClassName extends BaseComponent {
        @PropSync("showDrawer", {
            type: Boolean
        }) showValue!: Boolean;
        @Prop({ default: '' })
        goodCode?: string
        parsePic: any = parsePic;
        createCouponShow: boolean = true;
        couponData: CouponData = Object.assign({}, couponOriginalData)
        @Watch('showDrawer')
        onShowDrawerChange(val: boolean, oldVal: boolean) {
            // console.log(val);
            if (val) {
                this.refreshData()
                if (this.goodCode) this.couponData.goodCode = this.goodCode
            }

        }
        onClickSubmit() {
            const rep:any = /[\.]/;
            if (!this.couponData.amount || rep.test(this.couponData.amount)) {
                uni.showToast({
                    title: "请输入正确的优惠券面额(整数)",
                    icon: "none"
                });
                return;
            }
            if (!this.couponData.maxNum || rep.test(this.couponData.maxNum)) {
                uni.showToast({
                    title: "请输入正确的发放数量(整数)",
                    icon: "none"
                });
                return;
            }
            if (this.couponData.minUseAmount == null || rep.test(this.couponData.minUseAmount)) {
                uni.showToast({
                    title: "请输入使用条件(整数)",
                    icon: "none"
                });
                return;
            }
            if (this.couponData.maxNum > 1000) {
                uni.showToast({
                    title: "优惠券发放数量超过最大限制(整数)",
                    icon: "none"
                });
                return;
            }
            if (this.couponData.amount > 5000) {
                uni.showToast({
                    title: "面额过大,请核对面额",
                    icon: "none"
                });
                return;
            }
            if (!this.couponData.lifeTime) {
                uni.showToast({
                    title: "请输入有效天数(整数)",
                    icon: "none"
                });
                return;
            }
            if (this.couponData.lifeTime < 1 || this.couponData.lifeTime > 90) {
                uni.showToast({
                    title: "有效天数，1~90天",
                    icon: "none"
                });
                return;
            }
            console.log(this.couponData);
            // this.refreshData()
            uni.showModal({
                title: '提示',
                content: '确认创建优惠券?',
                success: (res: any) => {
                    if (res.confirm) this.createCoupon()
                }
            })

        }
        createCoupon() {
            app.http.Post('me/shop/coupon/create', this.couponData, (res: any) => {
                uni.showToast({
                    title: '创建成功',

                })
                this.showValue = false
                this.$emit('success')
            })
        }
        refreshData() {
            // console.log(Object.assign({}, couponOriginalData));
            this.couponData = Object.assign({}, couponOriginalData)
            if (this.goodCode) this.couponData.goodCode = this.goodCode
            // console.log(this.couponData);
        }
    }
</script>

<style lang="scss">
    .checkContainer {
        justify-content: flex-end;
        align-items: center;

        .checkItem {
            align-items: center;
            margin-left: 24rpx;
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
        }

        .noneCheck {
            width: 26rpx;
            height: 26rpx;
            border: 2rpx solid #333333;
            border-radius: 50%;
            margin-right: 11rpx;
        }

        .check {
            border: 0;
            width: 30rpx;
            height: 30rpx;
            background-size: 100% 100%;
            background-image: url(../../static/act/playGroup/redCheck.png);
        }
    }

    .sendCouponItem {
        width: 100%;
        box-sizing: border-box;
        padding: 0 24rpx;
        /* justify-content: space-between; */
        flex-direction: row;
        align-items: center;
        margin-bottom: 46rpx;
        display: flex;
    }

    .sendCoupon-left {
        font-size: 29rpx;
        font-family: PingFang SC;
        font-weight: 600;
        color: #000;
        flex: 1;
    }

    .couponInput {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000;
        text-align: right;
        width: 340rpx;
        /* background-color: #fff; */
    }

    .submit {
        width: 702rpx;
        height: 92rpx;
        background: #ff404d;
        border-radius: 5rpx;
        color: #fff;

    }

    .rightCoin {
        width: 14rpx;
        height: 22rpx;
        margin-left: 15rpx;
    }

    .placeholder {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
    }
</style>