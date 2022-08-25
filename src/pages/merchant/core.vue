<template>
    <view class='content'>
        <image src='/static/index/mp_mini.jpg' mode='aspectFill' class="merchantBanner" />
        <view class="merchantInfoContainer">
            <view class="infoTop uni-flex">
                <image src="/static/index/mp_mini.jpg" mode="aspectFill" class="info-avatar" />
            </view>
        </view>
        <view class="couponContainer uni-flex">
            <view class="coupon-receive" @click="pageJump('/pages/merchant/couponManage')">领取更多</view>
        </view>
        <view class="swiperContainer">
            <u-swiper :list="swiperList" keyName="image" :autoplay="false" circular></u-swiper>
        </view>
        <bottomDrawer title='领取优惠券' :height='571' heightType='rpx' :needSafeArea='true'
            :showDrawer.sync='receiveCouponShow'>

        </bottomDrawer>
    </view>
</template>

<script lang="ts">
    interface MerchantInfo {
        name: string;
    }
    import { app } from "@/app";
    import { Component, Watch } from "vue-property-decorator";
    import BaseNode from "../../base/BaseNode.vue";
    import { parsePic } from "@/tools/util";
    @Component({})
    export default class ClassName extends BaseNode {
        parsePic: any = parsePic;
        ruleList: any = []
        isMerchant:boolean=false
        merchantInof: MerchantInfo = {
            name: ""
        };
        swiperList: any = [{
            image: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
            title: '昨夜星辰昨夜风，画楼西畔桂堂东',
        }, {
            image: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
            title: '身无彩凤双飞翼，心有灵犀一点通'
        }, {
            image: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
            title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
        }];
        receiveCouponShow: boolean = false
        onLoad(){

        }

        onShow(){

        }

        pageJump(url:string,type?:any){
            const jumpType=type ?? "navigateTo"
            //@ts-ignore
            uni[jumpType]({
                url
            })
        }
    }
</script>

<style lang="scss">
    .merchantBanner {
        display: block;
        width: 750rpx;
        z-index: 1;
        height: 400rpx;
    }

    .merchantInfoContainer {
        width: 690rpx;
        height: 300rpx;
        background-color: red;
        box-sizing: border-box;
        margin-top: -100rpx;
        z-index: 2;
    }

    .couponContainer {
        width: 690rpx;
        height: 100rpx;
        background-color: blue;
    }

    .infoTop {
        .info-avatar {
            width: 100rpx;
            height: 100rpx;
        }
    }

    .swiperContainer {
        width: 750rpx;
    }
</style>