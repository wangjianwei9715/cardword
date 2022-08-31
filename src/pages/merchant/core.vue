<template>
    <view class='content'>
        <view class="pageTopContainer">
            <view class="status"
                :style="{paddingTop:app.statusBarHeight+'px',backgroundColor:`rgba(255,255,255,${scrollTopPercent})`}">
            </view>
            <view class="pageTop" ref="pageTop" id="pageTop"
                :style="{backgroundColor:`rgba(255,255,255,${scrollTopPercent})`}">
                <u-icon name="arrow-left" :color="scrollTopPercent>0.6?'#202124':'#e3ded4'" size="20" @click="goBack">
                </u-icon>
                <view class="pageTitle" :style="{opacity:scrollTopPercent}">商家中心</view>
                <u-icon name="share-square" :color="scrollTopPercent>0.6?'#202124':'#e3ded4'" size="25"
                    @click="onClickShare"></u-icon>
            </view>
        </view>
        <image :src='parsePic(decodeURIComponent(merchantInfo.back_img))' mode='aspectFill' class="merchantBanner" />
        <view class="merchantInfoContainer">
            <view class="infoTop uni-flex">
                <image :src="parsePic(decodeURIComponent(merchantInfo.logo))" mode="aspectFill" class="info-avatar" />
                <view class="info-message">
                    <view class="info-name">{{merchantInfo.name}}</view>
                    <view class="info-introduction">{{merchantInfo.region}} · 210拼成 · {{merchantInfo.fans}}粉丝</view>
                </view>
                <view class="rightEdit flexCenter" v-if="isMerchant" @click="pageJump('/pages/merchant/info')">编辑资料
                </view>
                <followButton :follow="merchantInfo.followed" :width="127" v-else
                    @handleSuccess="($event)=>{merchantInfo.followed=$event.follow}" :height="52" :fontSize="29"
                    :newMerchantPage="true" :followID="alias"></followButton>
                <!-- <view class="followBtton flexCenter" :class="{isFollo:merchantInfo.followed}" v-if="!isMerchant" @click="pageJump('/pages/merchant/info')">关注
                </view> -->
            </view>
            <view class="merchant-introduction">店铺简介：{{merchantInfo.brief_intr}}</view>
        </view>
        <view class="couponContainer uni-flex" v-if="!isMerchant">
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
            <view class="rightReceive flexCenter" @click="onClickGetMore">
                领取<br>更多
            </view>
            <!-- <view class="coupon-receive" @click="pageJump('/pages/merchant/couponManage')">领取更多</view> -->
        </view>
        <view class="ruleContainer" v-if="isMerchant">
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
        <view class="moreContainer" :style="{marginTop:isMerchant?0:30+'rpx'}">
            <view class="more-left">店铺精彩时刻</view>
            <view class="more-right" @click="pageJump('/pages/merchant/niceTime?alias='+alias)">更多</view>
        </view>
        <swiper indicator-dots indicator-active-color="#333333" indicator-color="#CAC6C6" class="niceTimeContainer">
            <swiper-item class="niceTimeItem" v-for="(item,index) in niceTimeList" :key="index">
                <muqian-lazyLoad v-for="(sItem,sNndex) in item" class="niceTimeImage"
                    :style="{marginRight:index==2?0:'17rpx'}" :src="parsePic(decodeURIComponent(sItem.pic))"
                    mode="aspectFill" />
            </swiper-item>
        </swiper>
        
        <u-sticky :offsetTop="0">
            <view class="tagsContainer">
                <view class="tag" :class="{selectTag:index==tag.index}" v-for="(item,index) in tag.list"
                    @click="onTagClick(item,index)">
                    {{item.label}} <text>{{goodsMsg[item.valueKey]}}</text>
                </view>
            </view>
        </u-sticky>

        <view class="goodsList">
            <goodslist :goodsList="goodsList" @send="onClickJumpDetails" :presell="false" />
        </view>
        <empty v-if='!goodsList.length' style="position: relative;bottom: 50rpx;" />
        <bottomDrawer title='领取优惠券' :height='571' heightType='rpx' :needSafeArea='true'
            :showDrawer.sync='receiveCouponShow'>
        </bottomDrawer>
        <couponGetDrawer :couponList="couponList" @lower="lowerCoupon" :showDrawer.sync='couponGetDrawerShow' />
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
        app: any = app
        alias: string = '';
        isMerchant: boolean = false
        ruleList: any = [{
            icon: '/static/merchant/live.png',
            name: '我的直播',
            tipsText: '待直播',
            url: '/pages/live/myLive',
            valueKey: ''
        },
        // {
        //     icon: '/static/merchant/card.png',
        //     name: '拆卡报告',
        //     tipsText: '待制作',
        //     valueKey: ''
        // }, {
        //     icon: '/static/merchant/wul.png',
        //     name: '我的发货',
        //     tipsText: '待发货',
        //     valueKey: ''
        // },
        {
            icon: '/static/merchant/coupon.png',
            name: '优惠券管理',
            tipsText: '查看与创建',
            valueKey: '',
            url: '/pages/merchant/couponManage'
        }, {
            icon: '/static/merchant/cuoka.png',
            name: '代搓卡',
            tipsText: '直播模式',
            valueKey: ''
        }]
        goodsList: any = []
        goodsTotalPage: number = 0
        goodsMsg: any = {
            saleTotal: 0,
            groupTotal: 0,
            sumTotal: 0,
        }
        goodsQuery: any = {
            pageIndex: 1,
            pageSize: 10,
            tp: 100,//1 在售，2 已拼成, 100 全部

        }
        tag: any = {
            index: 0,
            list: [{
                label: '全部',
                valueKey: 'sumTotal',
                value: 100
            }, {
                label: '在售',
                valueKey: 'saleTotal',
                value: 1
            }, {
                label: '已拼成',
                valueKey: 'groupTotal',
                value: 2
            },
                // {
                //     label: '拆卡',
                //     valueKey: ''
                // }
            ]
        }
        merchantInfo: any = {
            name: ""
        };
        niceTimeList: any = []
        receiveCouponShow: boolean = false
        couponQuery: any = {
            fetchFrom: 1,
            fetchSize: 10
        }
        couponGetDrawerShow: boolean = false
        couponList: any = []
        couponIsFetchEnd: boolean = true
        scrollTop: number = 0
        MAX_HEIGHT: number = 0;
        private get scrollTopPercent() {
            return this.scrollTop / (this.MAX_HEIGHT * 2)
        }
        onLoad(query: any) {
            if (query.alias) this.alias = query.alias
            if (query.isMerchant) this.isMerchant = true
            if (this.isMerchant) this.reqMyMerchantData()
            if (!this.isMerchant) this.reqMerchantData()
            this.reqGoodsData()
            this.onEventUI('refreshMerchantInfo', (res: any) => {
                console.log("refreshMerchantInfo", res);
                this.merchantInfo = res
            });
            this.$nextTick(() => {
                const query: any = uni.createSelectorQuery().in(this)
                query
                    .select('#pageTop')
                    .boundingClientRect((data: any) => {
                        this.MAX_HEIGHT = data.height
                    })
                    .exec();
            })
        }

        onShow() {

        }
        onReachBottom() {
            if (this.goodsQuery.pageIndex < this.goodsTotalPage) {
                this.goodsQuery.pageIndex += 1
                this.reqGoodsData()
            }
        }
        onPullDownRefresh() {
            this.goodsQuery.pageIndex += 1
            this.reqGoodsData(() => {
                uni.stopPullDownRefresh()
            })
        }
        onPageScroll(data: any) {
            this.scrollTop = data.scrollTop
        }
        goBack() {
            uni.navigateBack({ delta: 1 })
        }
        onClickShare() {

        }
        onClickRule(item: any) {
            if (!item.url) {
                uni.showToast({
                    title: '维护中',
                    icon: 'none'
                })
                return
            }
            this.pageJump(item.url)
        }
        onTagClick(item: any, index: number) {
            if (this.tag.index === index) return
            this.tag.index = index
            this.goodsQuery.pageIndex = 1
            this.goodsQuery.tp = item.value
            this.reqGoodsData()
        }
        pageJump(url: string, type?: any) {
            if (url == '/pages/merchant/couponManage') {
                uni.navigateTo({
                    url: `/pages/merchant/couponManage?logo=${this.merchantInfo.logo}`
                })
                return
            }
            const jumpType = type ?? "navigateTo"
            //@ts-ignore
            uni[jumpType]({
                url
            })
        }
        assignNiceTimeList(list: any) {
            this.niceTimeList = []
            const copies = Math.ceil(list.length / 3)
            for (let i = 0; i < copies; i++) {
                let arr = list.slice(i == 0 ? 0 : i + 2, 3)
                this.niceTimeList.push(arr)
            }
            console.log(this.niceTimeList);
        }
        // 跳转商品详情
        onClickJumpDetails(id: any) {
            uni.navigateTo({
                url: '/pages/goods/goods_details?id=' + id
            })
        }
        reqMyMerchantData() {
            app.http.Get("dataApi/me/shop/home", {}, (res: any) => {
                console.log(res);
                this.assignNiceTimeList(res.data.rarity_card || [])
                this.merchantInfo = res.data
            })
        }
        reqMerchantData() {
            app.http.Get(`dataApi/merchant/newII/detail/` + this.alias, {}, (res: any) => {
                this.assignNiceTimeList(res.data.rarity_card || [])
                this.merchantInfo = res.data
                console.log(res);
            })
        }
        lowerCoupon() {
            if (!this.couponIsFetchEnd) {
                this.couponQuery.fetchFrom += this.couponQuery.fetchSize
                this.reqMerchantCoupon()
                return
            }
        }
        onClickGetMore() {
            this.couponQuery.fetchFrom = 1
            this.reqMerchantCoupon()
        }
        //获取商家店铺可领取的优惠券
        reqMerchantCoupon(cb?: any) {
            app.http.Get(`merchant/online/coupon/` + this.alias, this.couponQuery, (res: any) => {
                console.log(res);
                this.couponIsFetchEnd = res.isFetchEnd
                const list = res.list || []
                this.couponQuery.fetchFrom == 1 ? this.couponList = list : this.couponList.push(...list)
                this.couponGetDrawerShow = true
                cb && cb()
            })
        }
        reqGoodsData(cb?: any) {
            app.http.Get('dataApi/merchant/1/goodlist/' + this.alias, this.goodsQuery, (res: any) => {
                const list = res.list || []
                this.goodsQuery.pageIndex == 1 ? this.goodsList = list : this.goodsList.push(...list)
                this.goodsTotalPage = res.totalPage
                this.goodsMsg = res
                delete this.goodsMsg.list
                cb && cb()
            })
        }

    }
</script>

<style lang="scss">
    page {
        font-family: PingFang SC;
    }



    .pageTopContainer {
        position: fixed;
        top: 0;
        z-index: 200;

        .pageTop {
            background-color: rgba(255, 255, 255, 0);
            box-sizing: border-box;
            display: flex;
            align-items: center;
            padding: 0 36rpx;
            justify-content: space-between;
            width: 750rpx;
            height: 88rpx;
            /* transition: all 0.2s linear; */
        }

        .btn-back {

            background: rgba(0, 0, 0, 0);
            font-family: uniicons;
            font-size: 46rpx;
            font-weight: normal;
            font-style: normal;
            color: #3C3C3C;
        }

        .pageTitle {
            font-size: 32rpx;
            color: #3C3C3C;
            position: absolute;
            font-family: HYQiHei;
            font-weight: bold;
            left: 0;
            right: 0;
            margin: auto;
            text-align: center;
            pointer-events: none;
        }

        .rightIcon {
            width: 40rpx;
            height: 40rpx;
            opacity: 0;
        }
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

        .followBtton {
            width: 127rpx;
            height: 52rpx;
            background: #FA1545;
            border-radius: 3rpx;
            font-size: 29rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #F6F7FB;
        }

        .isFollo {

            background: #F2F2F2;
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
        background-color: #fff;
        height: 110rpx;
        align-items: center;
        /* margin-top: 61rpx;
        margin-bottom: 50rpx; */

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
        padding: 0 14rpx;
        box-sizing: border-box;
        width: 750rpx;
        background-color: #f5f7fb;
        padding-top: 20rpx;
    }
</style>