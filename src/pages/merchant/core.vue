<template>
    <view class='content'>
        <image :src='parsePic(decodeURIComponent(merchantInfo.back_img))' mode='aspectFill' class="merchantBanner" />
        <view class="merchantInfoContainer">
            <view class="infoTop uni-flex">
                <image :src="parsePic(decodeURIComponent(merchantInfo.logo))" mode="aspectFill" class="info-avatar" />
                <view class="info-message">
                    <view class="info-name">{{merchantInfo.name}}</view>
                    <view class="info-introduction">{{merchantInfo.region}} · 210拼成 · {{merchantInfo.fans}}粉丝</view>
                </view>
                <view class="rightEdit flexCenter">编辑资料</view>
            </view>
            <view class="merchant-introduction">店铺简介：{{merchantInfo.brief_intr}}</view>
        </view>
        <!-- v-if="!isMerchant" -->
        <view class="couponContainer uni-flex">
            <view class="leftCoupon uni-flex">
                <view class="leftCoupon-item" style="margin-left: 14rpx;">
                    <view class="price"><text style="font-size: 25rpx;">￥</text>50</view>
                    <view class="couponRight">
                        <view class="manj">满200元可用</view>
                        <view class="type">指定店铺</view>
                    </view>
                </view>
                <view class="leftCoupon-item" style="margin-left: 72rpx;">
                    <view class="price"><text style="font-size: 25rpx;">￥</text>50</view>
                    <view class="couponRight">
                        <view class="manj">满200元可用</view>
                        <view class="type">指定店铺</view>
                    </view>
                </view>
            </view>
            <view class="rightReceive flexCenter">
                领取<br>更多
            </view>
            <!-- <view class="coupon-receive" @click="pageJump('/pages/merchant/couponManage')">领取更多</view> -->
        </view>
        <view class="ruleContainer">
            <view class="ruleItem" v-for="(item,index) in ruleList" :key="index" @click="onClickRule(item)">
                <view class="rule-left flexCenter">
                    <image class="rule-icon" :src="item.icon" mode="widthFix" />
                </view>
                <view class="rule-right">
                    <view class="rule-name">{{item.name}}</view>
                    <view class="rule-tips">{{item.tipsText}}</view>
                </view>
            </view>
        </view>
        <view class="moreContainer">
            <view class="more-left">店铺精彩时刻</view>
            <view class="more-right" @click="pageJump('/pages/merchant/niceTime')">更多</view>
        </view>
        <swiper indicator-dots indicator-active-color="#333333" indicator-color="#CAC6C6" class="niceTimeContainer">
            <swiper-item class="niceTimeItem">
                <image v-for="(item,index) in 3" class="niceTimeImage" :style="{marginRight:index==2?0:'17rpx'}" src=""
                    mode="aspectFill" />
            </swiper-item>
            <swiper-item class="niceTimeItem">
                <image v-for="(item,index) in 3" class="niceTimeImage" :style="{marginRight:index==2?0:'17rpx'}" src=""
                    mode="aspectFill" />
            </swiper-item>
            <swiper-item class="niceTimeItem">
                <image v-for="(item,index) in 3" class="niceTimeImage" :style="{marginRight:index==2?0:'17rpx'}" src=""
                    mode="aspectFill" />
            </swiper-item>
        </swiper>
        <view class="tagsContainer">
            <view class="tag" :class="{selectTag:index==tag.index}" v-for="(item,index) in tag.list"
                @click="onTagClick(item,index)">
                {{item.label}} <text>20</text>
            </view>
        </view>
        <!-- <u-sticky :offsetTop="0">
            
        </u-sticky> -->

        <view class="goodsList">

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
        alias:string='';
        isMerchant: boolean = false
        ruleList: any = [{
            icon: '/static/merchant/live.png',
            name: '我的直播',
            tipsText: '待直播',
            valueKey: ''
        }, {
            icon: '/static/merchant/card.png',
            name: '拆卡报告',
            tipsText: '待制作',
            valueKey: ''
        }, {
            icon: '/static/merchant/wul.png',
            name: '我的发货',
            tipsText: '待发货',
            valueKey: ''
        }, {
            icon: '/static/merchant/coupon.png',
            name: '优惠券管理',
            tipsText: '查看与创建',
            valueKey: '',
            url:'/pages/merchant/couponManage'
        }, {
            icon: '/static/merchant/cuoka.png',
            name: '代搓卡',
            tipsText: '直播模式',
            valueKey: ''
        }]
        tag: any = {
            index: 0,
            list: [{
                label: '全部',
                valueKey: ''
            }, {
                label: '在售',
                valueKey: ''
            }, {
                label: '已拼成',
                valueKey: ''
            }, {
                label: '拆卡',
                valueKey: ''
            }]
        }
        merchantInfo: any = {
            name: ""
        };
        receiveCouponShow: boolean = false
        onLoad(query:any) {
            if(query.alias) this.alias=query.alias
            // this.reqMyMerchantData()
        }

        onShow() {

        }
        onClickRule(item:any){
            if(!item.url){
                uni.showToast({
                    title:'维护中',
                    icon:'none'
                })
                return
            }
            this.pageJump(item.url)
        }
        onTagClick(item: any, index: number) {
            if (this.tag.index === index) return
            this.tag.index = index
        }
        pageJump(url: string, type?: any) {
            const jumpType = type ?? "navigateTo"
            //@ts-ignore
            uni[jumpType]({
                url
            })
        }
        reqMyMerchantData(){
            app.http.Get("me/shop/home",{},(res:any)=>{
                console.log(res);
                this.merchantInfo=res.data
            })
        }
        
    }
</script>

<style lang="scss">
    page {
        font-family: PingFang SC;
    }

    .merchantBanner {
        display: block;
        width: 750rpx;
        z-index: 1;
        height: 353rpx;
    }

    .merchantInfoContainer {
        width: 716rpx;
        height: 215rpx;
        background: #FFFFFF;
        box-shadow: 0rpx 1rpx 12rpx 0rpx #A8AAA9;
        border-radius: 5rpx;
        background-color: #fff;
        box-sizing: border-box;
        padding: 28rpx 30rpx 0 30rpx;
        margin-top: -76rpx;
        z-index: 2;
    }

    .couponContainer {
        width: 706rpx;
        height: 148rpx;
        background-size: 100% 100%;
        background-image: url("../../static/merchant/couponContainer.png");
        margin-top: 28rpx;
        align-items: center;
        box-sizing: border-box;
        padding: 0 34rpx 0 20rpx;
        justify-content: space-between;

        .a {}

        .leftCoupon {
            width: 520rpx;
            /* background-color: rgba(0, 0, 0, .6); */
            height: 148rpx;
            align-items: center;
        }

        .leftCoupon-item {
            display: flex;
            align-items: center;
        }

        .price {
            font-size: 38rpx;
            font-weight: 400;
            color: #FA1545;
            margin-right: 14rpx;
        }

        .couponRight {
            .manj {
                font-size: 21rpx;
                font-weight: bold;
                color: #333333;
            }

            .type {
                font-size: 20rpx;
                font-weight: 400;
                color: #333333;
            }
        }

        .rightReceive {
            width: 125rpx;
            font-size: 29rpx;
            font-weight: bold;
            color: #F6F7FB;
            height: 125rpx;
            background-size: 100% 100%;
            letter-spacing: 2rpx;
            background-image: url("../../static/merchant/receiveButton.png");
        }
    }

    .infoTop {
        .info-avatar {
            width: 111rpx;
            height: 111rpx;
            margin-right: 19rpx;
        }

        .info-message {
            flex: 1;
            margin-top: 10rpx;
        }

        .info-name {
            font-size: 29rpx;
            font-weight: bold;
            color: #333333;
        }

        .info-introduction {
            font-size: 21rpx;
            font-weight: 400;
            color: #7C7C7C;
            margin-top: 10rpx;
        }

        .rightEdit {
            width: 147rpx;
            height: 52rpx;
            background: #F2F2F2;
            border-radius: 3rpx;
            font-size: 29rpx;
            font-weight: 500;
            color: #7C7C7C;
        }
    }

    .merchant-introduction {
        font-size: 23rpx;
        font-weight: 400;
        color: #7C7C7C;
        margin-top: 17rpx;
        letter-spacing: 2rpx;
    }

    .ruleContainer {
        width: 750rpx;
        box-sizing: border-box;
        display: flex;
        padding: 0 28rpx;
        flex-wrap: wrap;
        margin-top: 37rpx;

        .ruleItem {
            width: 33.33%;
            height: 70rpx;
            margin-bottom: 36rpx;
            display: flex;
            align-items: center;
        }

        .rule-left {
            width: 70rpx;
            height: 70rpx;
            background: rgba(230, 228, 227, .6);
            border-radius: 3rpx;
            margin-right: 14rpx;
        }

        .rule-icon {
            width: 36rpx;
        }

        .rule-name {
            font-size: 25rpx;
            font-weight: 500;
            color: #333333;
        }

        .rule-tips {
            font-size: 21rpx;
            font-weight: 400;
            color: #7C7C7C;
        }
    }

    .moreContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 750rpx;
        box-sizing: border-box;
        padding: 0 29rpx;

        .more-left {
            font-size: 33rpx;
            font-weight: bold;
            color: #333333;
        }

        .more-right {
            position: relative;
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            padding-right: 28rpx;
            color: #7B7A7A;
        }

        .more-right::after {
            content: "";
            display: block;
            width: 13rpx;
            height: 21rpx;
            background-size: 100% 100%;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            background-image: url("../../static/merchant/rightIcon.png");
        }
    }

    .niceTimeContainer {
        width: 695rpx;
        height: 350rpx;
        background-size: 100% 100%;
        background-image: url("../../static/merchant/niceTimeContainer.png");
        margin-top: 19rpx;
        box-sizing: border-box;
        padding: 22rpx 24rpx 0 24rpx;

        .niceTimeItem {
            dispaly: flex;
            flex-wrap: nowrap;
        }

        .niceTimeImage {
            width: 204rpx;
            height: 265rpx;
            background: #E6DDDD;
        }
    }

    .niceTimeContainer ::v-deep .uni-swiper-dots {
        bottom: 24rpx;
    }

    .niceTimeContainer ::v-deep .uni-swiper-dot {
        width: 11rpx;
        height: 11rpx;
    }

    .tagsContainer {
        padding: 0 28rpx;
        display: flex;
        justify-content: space-between;
        width: 750rpx;
        box-sizing: border-box;
        margin-top: 61rpx;

        .tag {
            font-size: 29rpx;
            font-weight: bold;
            color: #7B7A7A;

            text {
                margin-left: 6rpx;
            }
        }

        .selectTag {
            font-size: 33rpx;
            font-weight: bold;
            color: #333333;
        }
    }

    .goodsList {
        width: 750rpx;
        height: 1900rpx;
    }
</style>