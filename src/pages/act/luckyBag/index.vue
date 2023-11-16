<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-11-08 15:32:21
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-11-16 15:02:53
 * @FilePath: \card-world\src\pages\act\luckyBag\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <transitionNav title="2022-2023 国宝系列" ref="transitionNav">

        </transitionNav>
        <view class="bgBack"></view>
        <view class="topContainer">
            <view class="lookTuj" @click="goTuj"></view>
        </view>
        <view class="luckyBagContainer">
            <view class="topLucky uni-flex">
                <view class="left flex1">
                    <view class="myLucky"></view>
                    <view class="subTitle">点击福袋可查看奖励</view>
                </view>
                <navigator url="/pages/act/luckyBag/log" hover-class="none">
                    <view class="menuItem">
                        <image src="/static/act/luckyBag/log.png"></image>
                        <view class="subTitle">福袋记录</view>
                    </view>
                </navigator>
                <navigator url="/pages/act/luckyBag/rule" hover-class="none">
                    <view class="menuItem">
                        <image src="/static/act/luckyBag/rule.png"></image>
                        <view class="subTitle">规则说明</view>
                    </view>
                </navigator>

            </view>
            <swiper class="luckyBagHBox" previous-margin="160rpx" :current="current" next-margin="180rpx"
                @change="swiperChange" @animationfinish="animationfinish">
                <swiper-item v-for="(item, index) in list" @click.stop="onClickLuckyBag(item, index)"
                    :key="'luckyBag' + index">
                    <view class="luckyItem">
                        <view class="bag normal" :class="{ big: index === current, bag_open: item.num && item.state == 2 }">
                        </view>
                        <view class="bagInfo" :class="{ bagInfo_big: index === current }">
                            <image class="merLogo" :src="$parsePic(item.merchantLogo)">
                            </image>
                            <view class="merName u-line-1">{{ item.name }}</view>
                            <view class="subTitle">{{ item.state == 1 ? "待计入" : "可开启" }}{{ item.num }}个</view>
                        </view>
                    </view>
                </swiper-item>
                <swiper-item v-if="list && !list.length">
                    <view class="luckyItem">
                        <view class="bag normal bag_none big">
                        </view>
                        <view class="bagInfo bagInfo_big">
                            <view class="merName">暂未获得福袋</view>
                            <view class="noneBagTips">参与部分22~23国宝有机会获得</view>
                        </view>
                    </view>
                </swiper-item>
            </swiper>
            <view class="openButton openOne" @click="$u.throttle(() => { openBag(1) }, 500)"></view>
            <view class="openButton openAll" @click="$u.throttle(() => { openBag(-1) }, 500)"></view>
            <view class="noticeContainer">
                <swiper class="noticeContainer_swiper" :disable-touch="true" :vertical="true" :autoplay="true" :interval="3000" :circular="true">
                    <swiper-item class="noticeItem uni-flex" v-for="(item, index) in broadcastList"
                        :key="'noticeItem' + index">
                        <image class="avatar" :src="$parsePic(item.avatar)">
                        </image>
                        <view class="text u-line-1">{{ item.content }}</view>
                    </swiper-item>
                </swiper>
            </view>

        </view>
        <view class="subContainer">
            <view class="title"></view>
            <view class="subTitle">点击福袋可查看奖励</view>
            <view class="logoMan"></view>
        </view>
        <u-sticky :customNavHeight="navHeight">
            <view class="selectContainer uni-flex">
                <view class="selectItem" @click="onClickGoodsSelect(item, index)"
                    :class="{ selectItem_select: index == select.index }" v-for="(item, index) in select.list" :key="index">
                    {{
                        item.label }}
                    <view class="priceDot" v-if="index == 3">
                        <image src="/static/act/luckyBag/dot_white.png"
                            v-show="goodsParams.priceOd === 2 || select.index != 3" class="priceDot_pic">
                        </image>
                        <image src="/static/act/luckyBag/dot_yellow.png" v-show="goodsParams.priceOd === 1"
                            style="transform:scaleY(-1)" class="priceDot_pic">
                        </image>
                        <image src="/static/act/luckyBag/dot_white.png"
                            v-show="goodsParams.priceOd === 1 || select.index != 3" class="priceDot_pic"
                            style="transform:scaleY(-1)">
                        </image>
                        <image src="/static/act/luckyBag/dot_yellow.png" v-show="goodsParams.priceOd === 2"
                            class="priceDot_pic">
                        </image>
                    </view>
                </view>
            </view>
        </u-sticky>

        <view class="goodsContainer" v-for="(item, index) in goodsList" @click="goGoodsDetails(item.goodCode)" :key="index">
            <view class="goodsInfo">
                <view style="width: 256rpx;">
                    <muqian-lazyLoad v-if="item.pic != ''" class="goodsPic" :src="getGoodsImg(decodeURIComponent(item.pic))"
                        borderRadius="3rpx"></muqian-lazyLoad>
                </view>
                <view class="goodsPrice">
                    <view class="title u-line-2">{{ item.title }}</view>
                    <view class="flex1"></view>
                    <view class="goodslist-priceMsg uni-flex goodslist-padding">
                        <view class="goodslist-priceMsg-left">
                            ￥
                            <text class="price-text">{{ filterPrice(item.price).integer }}</text>
                            <text class="decimal" v-if="filterPrice(item.price).decimal">{{ filterPrice(item.price).decimal
                            }}</text>
                            <text>{{ goodsManaager.hasLowestPrice(item) ? '起' : '' }}</text>
                        </view>
                        <view v-if="item.state == 0 || item.state == -1" class="goodslist-priceMsg-right">
                            {{ $u.timeFormat(item.startAt, "mm-dd hh:MM") }}开售
                        </view>
                        <view v-else :id="item.goodCode" class="goodslist-priceMsg-right goodslist-plan-desc">
                            {{ goodsManaager.listPlan(item, 'str') }}
                        </view>
                    </view>
                    <view class="goodslist-progress"
                        :class="{ 'goodslist-progress-select': goodsManaager.ifSelectType(item) }">
                        <view class="progressMask" :style="{ width: (100 - goodsManaager.listPlan(item, 'num')) + '%' }">
                        </view>
                    </view>
                </view>
                <view class="watermark"></view>
            </view>
            <view class="merchantInfo">
                <muqian-lazyLoad class="pic" @click.top="goMerchantPage(item.merchantAlias)"
                    :src="$parsePic(decodeURIComponent(item.merchantLogo))" borderRadius="50%"></muqian-lazyLoad>
                <view class="merName" @click.stop="goMerchantPage(item.merchantAlias)">{{ item.merchantName }}</view>
                <view class="flex1"></view>
                <template v-if="item.luckyBagNum && item.luckyBagNum > 0">
                    <view class="smallBag"></view>
                    <view class="bagNum" @click.stop="getGoodsDetail(item)">
                        <text class="x">x</text>
                        {{ item.luckyBagNum }}
                    </view>
                </template>
                <view class="goBuy" v-if="!item.luckyBagNum">去购买</view>
                <view class="rightDot"></view>
            </view>
        </view>
        <u-popup :show="addressShow" @close="addressShow = false" :safeAreaInsetBottom="false" mode="center" round="3rpx">
            <view class="addressContainer">
                <view class="title">
                    确认物流信息
                    <view class="close" @click="addressShow = false"></view>
                </view>
                <view class="address">
                    <text class="default">默认</text> {{ defaultAddress.district }}{{ defaultAddress.detail }}
                </view>
                <view class="namePhone">{{ defaultAddress.name }} {{ defaultAddress.phone }}</view>
                <view class="bottomBtn">
                    <view class="btn flexCenter" @click="onClickAddressEdit">修改</view>
                    <view class="btn flexCenter confirm" @click="onClickAddressConfirm">确认</view>
                </view>
            </view>
        </u-popup>
        <bagPop ref="bagPop" />

        <u-overlay :show="openBagShow" @close="openBagShow = false" :opacity="0.71">
            <view class="rewardPop">
                <view class="title" :class="{ title_more: rewardList.length > 1 }">恭喜您获得以下奖品</view>
                <view class="rewardWrap" v-if="rewardList.length == 1">
                    <image :src="$parsePic(rewardList[0].pic)" mode="aspectFit" class="pic"></image>
                    <view class="name">{{ rewardList[0].name }}</view>
                </view>
                <scroll-view class="rewardWrap_more" :scroll-y="true" v-else>
                    <view class="rewardGrid">
                        <view class="rewardMore_item" v-for="(item, index) in rewardList" :key="'rewardMore_item' + index">
                            <muqian-lazyLoad :src="$parsePic(item.pic)" mode="aspectFit" borderRadius="3rpx"
                                class="pic"></muqian-lazyLoad>
                            <view class="name u-line-1">{{ item.name }}</view>
                        </view>
                    </view>
                </scroll-view>
                <view class="receiveButton flexCenter" @click="openBagShow = false">开心收下</view>
                <view class="tips">
                    <image src="/static/act/luckyBag/i.png" style="width: 24rpx;height: 24rpx;"></image>
                    <text>实物类奖品发货请关注活动页面-福袋记录-奖品明细，优惠券类奖品已发放至我的-优惠券。如有疑问可联系客服</text>
                </view>
            </view>
        </u-overlay>
        <view class="bottomSafeArea" style="height: 20rpx;"></view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component, Watch } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { getGoodsImg } from "@/tools/util";
import bagPop from "./components/bagPop.vue"
const goodsParams: any = Object.freeze({
    fetchFrom: 1,
    fetchSize: 10,
    priceOd: 0,
    tp: 0
})
@Component({
    components: {
        bagPop
    }
})
export default class ClassName extends BaseNode {
    navHeight: any = app.statusBarHeight + uni.upx2px(88)
    select: any = {
        index: 0,
        list: [{ label: "默认", key: "" }, { label: "最新上架", key: "tp", value: 2 }, { label: "即将拼成", key: "tp", value: 1 }, { label: "价格", key: "priceOd" }]
    }
    queryParams: any = {
        pageIndex: 1,
        pageSize: 20
    }
    goodsParams: any = Object.assign({}, JSON.parse(JSON.stringify(goodsParams)))
    goodsList: any = []
    goodsIsFetchEnd: boolean = true
    goodsManaager = app.goods;
    goGoodsDetails: any = app.navigateTo.goGoodsDetails
    getGoodsImg = getGoodsImg
    goMerchantPage: any = app.platform.goMerchantPage
    list: any = []
    broadcastList: any = []
    current: number = 0
    goodsDetail: any = {}
    addressShow: boolean = false
    hasChoiceAddress: boolean = false
    defaultAddress: any = {}
    rewardList: any = []
    openBagShow: boolean = false
    seriesCode: string = "pxbZxN"
    onLoad(query: any) {
        if (query.seriesCode) this.seriesCode = query.seriesCode
        this.hasChoiceAddress = Boolean(uni.getStorageSync("luckyBagAddress"))
        this.reqBroadcast()
        this.reqGoods()
    }
    onShow() {
        this.reqNewData()
    }
    onPullDownRefresh() {
        this.reqNewData()
        setTimeout(() => {
            uni.stopPullDownRefresh()
        }, 300)
    }
    onReachBottom() {
        if (this.goodsIsFetchEnd) return
        this.goodsParams.fetchFrom += this.goodsParams.fetchSize
        this.reqGoods()
    }
    onPageScroll(data: any) {
        //@ts-ignore
        this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
    }
    onClickGoodsSelect(item: any, index: number) {
        if (this.select.index === index && item.label != "价格") return
        this.select.index = index
        const agoPriceOd = this.goodsParams.priceOd
        this.goodsParams = Object.assign({}, JSON.parse(JSON.stringify(goodsParams)))
        if (item.key) {
            if (item.value) this.goodsParams[item.key] = item.value
            if (item.label == "价格") {
                this.goodsParams[item.key] = agoPriceOd == 1 ? 2 : 1
            }
        }
        this.reqGoods()
    }
    onClickLuckyBag(item: any, index: number) {
        this.current = index
        this.$refs.bagPop.showPop(item.goodCode)
    }
    getGoodsDetail(item: any) {
        this.$refs.bagPop.showPop(item.goodCode)
    }
    onClickAddressEdit() {
        uni.navigateTo({
            url: "/pages/userinfo/setting_addresses"
        })
        this.addressShow = false
        return
    }
    onClickAddressConfirm() {
        uni.setStorageSync("luckyBagAddress", this.defaultAddress.id)
        this.hasChoiceAddress = true
        this.addressShow = false
    }
    openBag(num: number) {
        if (!this.list.length) {
            uni.showModal({
                title: "提示",
                content: "前去购买商品获取福袋",
                showCancel: false
            })
            return
        }
        let nowItem: any = this.list[this.current]
        if (nowItem.state == 1) {
            uni.showModal({
                title: "提示",
                content: "等待对应商品拼成后可开启",
                showCancel: false
            })
            return
        }
        if (!this.hasChoiceAddress) {
            app.http.Get("dataApi/me/delivery", {}, (res: any) => {
                this.defaultAddress = (res.list || []).find((item: any) => {
                    return item.default
                })
                if (!this.defaultAddress.id) {
                    uni.showModal({
                        title: "提示",
                        content: "请添加一个默认地址",
                        success: (data: any) => {
                            if (data.confirm) {
                                uni.navigateTo({
                                    url: "/pages/userinfo/setting_addresses"
                                })
                                return
                            }
                        }
                    })
                    return
                }
                this.addressShow = true
            })
            return
        }
        uni.showLoading({
            title: ""
        })
        app.platform.UIClickFeedBack()
        app.http.Post("activity/nt/luckyBag/open", {
            // sponsor: nowItem.sponsor,
            goodCode: nowItem.goodCode,
            tp: num == -1 ? 2 : 1
        }, (res: any) => {
            this.rewardList = res.list || []
            this.openBagShow = true
            uni.hideLoading()
            if (num == 1) {
                nowItem.num -= 1
            } else {
                nowItem.num = 0
            }
            setTimeout(() => {
                this.current = 0
                this.reqNewData()
            }, 1000)
        }, (err: any) => {
            uni.hideLoading()
        })
    }
    swiperChange(event: any) {
        this.current = event.detail.current
    }
    animationfinish() {
        return
        if ((this.current) >= this.list.length - 2) {
            this.reqNewData()
        }
    }
    goTuj() {
        if (this.seriesCode) {
            uni.navigateTo({
                url: `/pages/illustration/seriesDetail?seriesCode=${this.seriesCode}`
            })
        } else {
            app.navigateTo.switchTab(1)
        }
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

    reqNewData(cb?: any) {
        app.http.Get(`dataApi/activity/nt/luckyBag/my`, {}, (res: any) => {
            this.list = res.list || []
            console.log(this.list);

        })
    }
    reqBroadcast() {
        app.http.Get(`dataApi/activity/nt/luckyBag/broadcast`, {}, (res: any) => {
            this.broadcastList = res.list || []
        })
    }
    reqGoods(cb?: any) {
        app.http.Get(`dataApi/activity/nt/luckyBag/good/list`, this.goodsParams, (res: any) => {
            const list = res.list || []
            this.goodsIsFetchEnd = res.isFetchEnd
            this.goodsParams.fetchFrom == 1 ? this.goodsList = list : this.goodsList.push(...list)
            cb && cb()
        })
    }
}
</script>

<style lang="scss">
page {
    background-color: #0e0c0a;
    font-family: PingFang SC;
}

.flex1 {
    flex: 1;
}

.bgBack {
    width: 750rpx;
    height: 1600rpx;
    background-size: 100% 100%;
    background-image: url("/static/act/luckyBag/bg.png");
    position: absolute;
    top: 0;
}

.topContainer {
    position: relative;
    width: 750rpx;
    height: 955rpx;
    background-size: 100% 100%;
    background-image: url("/static/act/luckyBag/topBanner.png");

    .lookTuj {
        position: absolute;
        width: 240rpx;
        height: 72rpx;
        background-size: 100% 100%;
        background-image: url("/static/act/luckyBag/tujButton.png");
        left: 36rpx;
        top: 337rpx;
    }
}

.luckyBagContainer {
    width: 750rpx;
    position: relative;
    box-sizing: border-box;
    // padding: 20rpx 30rpx;
    background-size: 100% 100%;
    background-image: url("/static/act/luckyBag/machine.png");
    // background-color: rgba(0, 0, 0, .5);
    margin-top: -513rpx;
    height: 990rpx;
    padding-top: 138rpx;

    .topLucky {
        // justify-content: space-between;
        padding-left: 72rpx;
        padding-right: 84rpx;

        .left {
            .myLucky {
                width: 268rpx;
                height: 58rpx;
                background-size: 100% 100%;
                background-image: url("/static/act/luckyBag/myLucky.png");
            }
        }

        .subTitle {
            font-size: 22rpx;
            font-family: YouSheBiaoTiHei;
            font-weight: 400;
            color: #834706;
        }

        .menuItem {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 22rpx;

            image {
                width: 50rpx;
                height: 50rpx;
            }
        }
    }

    .openButton {
        width: 277rpx;
        height: 78rpx;
        background-size: 100% 100%;
        position: absolute;
        bottom: 126rpx;
    }

    .openOne {
        background-image: url("/static/act/luckyBag/openOne.png");
        left: 44rpx;
    }

    .openAll {
        background-image: url("/static/act/luckyBag/openAll.png");
        right: 44rpx;
    }

    .noticeContainer {
        width: 632rpx;
        height: 73rpx;
        position: absolute;
        bottom: 15rpx;
        left: 0;
        right: 0;
        margin: auto;
        background-size: 100% 100%;
        background-image: url("/static/act/luckyBag/noticeContainer.png");
        display: flex;
        align-items: center;
        justify-content: center;
        .noticeContainer_swiper{
            width: 632rpx;
            height: 48rpx;
        }
        .noticeItem {
            width: 632rpx;
            box-sizing: border-box;
            padding: 0 35rpx;
            display: flex;
            align-items: center;

            .avatar {
                width: 40rpx;
                height: 40rpx;
                border-radius: 50%;
                display: block;
                margin-right: 18rpx;
            }

            .text {
                font-size: 20rpx;

                font-weight: 500;
                color: #FFFFFF;
            }
        }
    }

    .luckyBagHBox {
        // width: 100%;
        margin: 0 auto;
        width: 630rpx;
        box-sizing: border-box;
        // background-color: rgba(0, 0, 0, .3);
        // margin-top: 110rpx;
        height: 540rpx;

        .luckyItem {
            margin-top: 110rpx;
            width: 310rpx;
            display: flex;
            flex-direction: column;
            align-items: center;

            .bag {
                width: 188rpx;
                height: 173rpx;
                background-size: 100% 100%;
                background-image: url("/static/act/luckyBag/bag_has.png");
            }

            .bag_none {
                background-image: url("/static/act/luckyBag/bag_none.png");
            }

            .bag_open {
                background-image: url("/static/act/luckyBag/bag_open.png");
            }

            .bagInfo {
                display: flex;
                flex-direction: column;
                align-items: center;
                // margin-top: 15rpx;
                transform: translateY(15rpx);
                transition: transform 0.3s;
                position: relative;
                right: 10rpx;

                .merLogo {
                    width: 56rpx;
                    height: 56rpx;
                    // background: #FFFFFF;
                    border-radius: 50%;
                }

                .merName {
                    font-size: 24rpx;

                    font-weight: bold;
                    color: #2A2626;
                    margin-top: 13rpx;
                    text-align: center;
                }
                .noneBagTips{
                    font-size: 20rpx;
                    color: #2A2626;
                    font-weight: normal;
                    margin-top: 4rpx;
                }
                .subTitle {
                    margin-top: 13rpx;
                    text-align: center;
                    font-size: 22rpx;

                    font-weight: 400;
                    line-height: 7rpx;
                    color: #2A2626;
                }
            }

            .bagInfo_big {
                transform: translateY(55rpx);
            }

            .normal {
                transform: scale(1);
                transition: transform 0.3s;
            }

            .big {
                transform: scale(1.4);
            }
        }


    }


}

.subContainer {
    width: 750rpx;
    position: relative;
    height: 190rpx;
    box-sizing: border-box;
    padding-top: 70rpx;
    padding-left: 41rpx;

    .title {
        width: 457rpx;
        height: 126rpx;
        background-size: 100% 100%;
        background-image: url("/static/act/luckyBag/logoMan.png");
        position: relative;
        bottom: 26rpx;
    }

    .subTitle {
        font-size: 22rpx;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #FFEBA9;
        margin-left: 6rpx;
    }

    .logoMan {
        width: 176rpx;
        height: 215rpx;
        background-size: 100% 100%;
        background-image: url("/static/act/luckyBag/logo.png");
        position: absolute;
        right: 0;
        top: 0;
    }
}

.selectContainer {
    width: 750rpx;
    height: 94rpx;
    background-size: 100% 100%;
    background-image: url("/static/act/luckyBag/selectBar.png");
    position: relative;
    box-sizing: border-box;
    padding: 0 56rpx;
    justify-content: space-between;
    align-items: center;

    .selectItem {
        font-size: 24rpx;

        font-weight: 400;
        color: #FFFFFF;
        display: flex;
        align-items: center;

        .priceDot {
            display: flex;
            margin-left: 13rpx;
            flex-direction: column;
            margin-top: 6rpx;

            .priceDot_pic {
                width: 13rpx;
                height: 8rpx;
                margin-bottom: 6rpx;
            }
        }
    }

    .selectItem_select {
        font-weight: bold;
        color: #FFEBA9;
    }
}

.goodsContainer {
    position: relative;
    width: 710rpx;
    border-radius: 5rpx;
    overflow: hidden;
    margin-top: 20rpx;

    .goodsInfo {
        width: 710rpx;
        box-sizing: border-box;
        padding: 0 30rpx;
        padding-top: 31rpx;
        height: 280rpx;
        background-color: #fff5df;
        display: flex;
        justify-content: space-between;
        position: relative;

        .watermark {
            width: 703rpx;
            height: 73rpx;
            background-size: 100% 100%;
            background-image: url("/static/act/luckyBag/watermark.png");
            position: absolute;
            bottom: -33rpx;
            left: 2rpx;
        }

        .goodsPic {
            width: 257rpx;
            height: 198rpx;
            // margin-right: 28rpx;
            // display: block;
            // background: #0E0C0A;
            // border: 0rpx solid #000000;
            border-radius: 3rpx;
        }

        .goodsPrice {
            margin-left: 27rpx;
            display: flex;
            flex-direction: column;
            // justify-content: space-between;
            height: 198rpx;
            box-sizing: border-box;
            padding-top: 18rpx;
            padding-bottom: 18rpx;

            // display: f;
            .title {
                font-size: 26rpx;

                font-weight: 400;
                color: #333333;
                line-height: 34rpx;
                // flex: 1;
            }
        }
    }

    .merchantInfo {
        height: 95rpx;
        background-color: #FDB927;
        position: relative;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 30rpx 0 46rpx;

        .pic {
            width: 54rpx;
            height: 54rpx;
            margin-right: 21rpx;
        }

        .merName {
            font-size: 22rpx;

            font-weight: bold;
            color: #333333
        }

        .smallBag {
            width: 68rpx;
            height: 55rpx;
            background-size: 100% 100%;
            background-image: url("/static/act/luckyBag/smallBag.png");
            position: relative;
            bottom: 4rpx;
        }

        .rightDot {
            width: 14rpx;
            height: 23rpx;
            background-size: 100% 100%;
            background-image: url("/static/act/luckyBag/rightDot.png");
            margin-left: 18rpx;
        }

        .bagNum {
            // display: flex;
            // align-items: flex-end;

            // text-align: justify;
            font-size: 36rpx;

            font-weight: bold;
            color: #333333;
            margin-left: 16rpx;
            // height: 60rpx;
            vertical-align: bottom;

            // v
            .x {
                font-size: 24rpx;

                font-weight: bold;
                color: #333333;

                // vertical-align: bottom;

            }
        }

        .goBuy {
            font-size: 30rpx;

            font-weight: bold;
            color: #333333;
        }
    }
}

.goodslist-priceMsg {
    justify-content: space-between;
    // vertical-align: bottom;
    height: 40rpx;
    display: flex;
    align-items: flex-end;
    position: relative;
    margin-bottom: 15rpx;
    // margin-top: 16rpx;
    align-items: flex-end;

    .goodslist-priceMsg-left {
        font-size: 24rpx;
        font-family: ArialBold !important;
        font-weight: bold;
        color: #333333;
        height: 40rpx;
        margin-bottom: -6rpx;

        text.price-text {
            font-size: 36rpx;
            line-height: 38rpx;
        }

        text.decimal {
            font-size: 23rpx;
        }

        text:last-child {
            font-size: 21rpx;
            font-family: PingFangSC-Regular;
            font-weight: 500;
            color: #333333;
            margin-left: 6rpx;
        }
    }

    .goodslist-priceMsg-right {
        height: 40rpx;
        display: flex;
        align-items: flex-end;
        font-size: 23rpx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #333333;
    }
}

.goodslist-progress {
    // background: #FA1545;
    background: linear-gradient(90deg, #FDB927 0%, #F38519 100%);
    width: 370rpx;
    height: 10rpx;
    position: relative;
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;

    .progressMask {
        height: inherit;
        background-color: #ffffff;
        width: 30%;
    }
}

.goodslist-progress-select {
    background: linear-gradient(90deg, #FDB927 0%, #F38519 100%);
    background-size: 100% 100%;
}



.addressContainer {
    width: 550rpx;
    // min-height: 260rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    padding-bottom: 40rpx;
    display: flex;
    flex-direction: column;

    .title {
        font-size: 36rpx;

        font-weight: bold;
        color: #333333;
        text-align: center;
        width: inherit;
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

    .address {
        .default {
            color: #ffffff;
            background-color: #fdb927;
            // text-align: center;
            padding: 0rpx 14rpx;
            border-radius: 3rpx;
            font-size: 26rpx;
            margin-right: 10rpx;
        }

        padding: 0 40rpx;
        font-size: 26rpx;

        font-weight: 400;
        color: #333333;
        line-height: 39rpx;
    }

    .namePhone {
        font-size: 26rpx;

        font-weight: 400;
        color: #959695;
        padding: 0 40rpx;
        margin-top: 20rpx;
    }

    .bottomBtn {
        display: flex;
        justify-content: space-between;
        padding: 0 40rpx;
        align-items: center;
        margin-top: 51rpx;

        .btn {
            width: 208rpx;
            height: 70rpx;
            border: 1rpx solid #C0C0C0;
            border-radius: 3rpx;
            font-size: 26rpx;

            font-weight: bold;
            color: #333333;
        }

        .confirm {
            border: 1rpx solid #fdb927;
            color: #ffffff;
            background-color: #fdb927;
        }
    }
}

.rewardPop {
    width: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        font-size: 36rpx;
        font-weight: bold;
        color: #FFFFFF;
        margin-bottom: 56rpx;
        margin-top: 300rpx;
    }

    .title_more {
        margin-top: 209rpx;
    }

    @keyframes show {
        0% {
            transform: scale(0);
        }

        100% {
            transform: scale(1);
        }
    }

    .rewardWrap {
        animation: show 0.3s;

        .pic {
            background-color: rgba(0, 0, 0, 0);
        }
    }

    .rewardWrap_more {
        max-height: 700rpx;
        animation: show 0.3s;
        // height: 660rpx;
        // background-color: rgba(255, 255, 255, .3);
        overflow-y: auto;

        .rewardGrid {
            display: grid;
            grid-template-columns: repeat(3, 200rpx);
            // grid-template-rows: repeat(3, 1fr);
            grid-column-gap: 38rpx;
            grid-row-gap: 38rpx;
            justify-content: center;

            .rewardMore_item {
                display: flex;
                flex-direction: column;
                align-items: center;

                .pic {
                    width: 200rpx;
                    height: 200rpx;
                    border-radius: 3rpx;
                    margin-bottom: 19rpx;
                    background-color: rgba(0, 0, 0, 0);
                }

                .name {
                    font-size: 24rpx;
                    font-weight: bold;
                    color: #FFFFFF;
                }
            }
        }
    }

    .pic {
        width: 329rpx;
        height: 329rpx;
        background: #FFFFFF;
        border-radius: 3rpx;
        margin-bottom: 40rpx;
    }

    .name {
        font-size: 30rpx;
        font-weight: bold;
        color: #FFFFFF;
        text-align: center;
    }

    .receiveButton {
        width: 480rpx;
        height: 90rpx;
        background: #fdb927;
        border-radius: 3rpx;
        font-size: 40rpx;
        font-weight: bold;
        color: #FFFFFF;
        margin-bottom: 70rpx;
        margin-top: 60rpx;
    }

    .tips {
        padding: 0 85rpx;
        // display: flex;
        // align-items: center;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #E6E6E6;
        line-height: 37rpx;
        letter-spacing: 2rpx;

        image {
            position: relative;
            margin-right: 10rpx;
            top: 4rpx;
        }
    }


}</style>
