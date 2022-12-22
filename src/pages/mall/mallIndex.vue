<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-12-16 17:50:05
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-12-22 15:10:47
 * @FilePath: \card-world\src\pages\mall\mallIndex.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <transitionNav @getNavHeight="getNavHeight" @onClickRule="pageJump(`/pages/mall/mallRule`)"
            :toolsMapCustomNew="custonRightIcon" ref='transitionNav' :needRightTools="['客服','卡币规则']"
            :needIconShadow="false" title="卡币商城">
            <template slot="slotLeft">
                <view class="leftTitle">卡币商城</view>
            </template>
        </transitionNav>
        <view class="topBanner"></view>
        <view class="myInfoContainer">
            <view class="myInfo_left">
                <view class="myInfo_left_redFont">我的卡币</view>
                <view class="myInfo_left_point" @click="pageJump(`/pages/mall/record_point`)">
                    <text>{{ myPoint }}</text>
                    <image src="@/static/mall/dotRight.png"></image>
                </view>
            </view>
            <view class="myInfo_right" @click="pageJump(`/pages/mall/record_award`)">
                <view class="myInfo_right_gift"></view>
                <view class="myInfo_right_font">
                    兑换<br>明细
                </view>
            </view>
        </view>
        <u-swiper class="mallSwiper" :list="list3" indicator indicatorMode="line" circular></u-swiper>
        <u-sticky v-if="navHeight" :customNavHeight="navHeight">
            <view class="uTabs">
                <view class="tabsItem" :class="{ tabsItem_select: index == tab.index }" @click="tabChange(item, index)"
                    v-for="(item, index) in tab.list">{{ item.name }}</view>
            </view>
        </u-sticky>
        <view class="goodsContainer">
            <view class="goodsItem" @click="pageJump(`/pages/mall/detail?id=${item.id}`)"
                v-for="(item, index) in goodsList" :key="index">
                <view class="goodsItem_top">
                    <muqian-lazyLoad class="logo" borderRadius="3rpx"
                        :src="$parsePic(decodeURIComponent(item.logo))"></muqian-lazyLoad>
                    <view class="startTimeBlock">
                        <view class="startTimeBlock_leftFont">{{ item.start_at > nowTimeStamp ? '距离开始' : '开抢中' }}</view>
                        <view class="startTimeBlock_rightCountDown"
                            v-if="item.start_at && item.start_at > 0 && nowTimeStamp < item.start_at">
                            <view class="timeBlock flexCenter"
                                v-for="time in getCountDownInfo(nowTimeStamp, item.start_at).hours">{{ time }}</view>
                            <view class="colon">:</view>
                            <view class="timeBlock flexCenter"
                                v-for="time in getCountDownInfo(nowTimeStamp, item.start_at).minutes">{{ time }}</view>
                            <view class="colon">:</view>
                            <view class="timeBlock flexCenter"
                                v-for="time in getCountDownInfo(nowTimeStamp, item.start_at).seconds">{{ time }}</view>
                        </view>
                    </view>
                </view>
                <view class="goodsItem_bottom">
                    <view class="goodsName">{{ item.name }}</view>
                    <view class="goodsPriceBlock">
                        <view class="money" v-if="item.pay_tp == 2">{{ item.price }}卡币</view>
                        <view class="goodsPriceBlock_bottom">
                            <view class="money">{{ item.pay_tp == 2 ? `+${item.money}元` : `${item.price}卡币` }}</view>
                            <view class="leftNum" v-if='item.limit_num != 0 || item.leftNum != -1'>剩余{{ item.leftNum }}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <empty v-if="goodsList && !goodsList.length" />
        <view class="bottomSafeArea"></view>
        <!-- <view class="pages">
            <view @click="toGoodsDetail(item)" v-for="(item, index) in goodsList" :key="index">
                {{ item.name }}
                <u-count-down v-if="item.start_at > 0" style="opacity:0;" :time="item.start_at"
                    @change="itemTimeChange($event, item)" :millisecond="false" format="HH:mm:ss"></u-count-down>
                {{
        Object.keys(item.startTimeInfo).length && item.start_at > nowTimeStamp ?
            `${item.startTimeInfo.days}天${item.startTimeInfo.hours}小时${item.startTimeInfo.minutes}分钟${item.startTimeInfo.seconds}秒`
            : ""
                }}
            </view>
        </view> -->
        <!-- <logisticsPop :visible.sync="visible" logisticsCode="SF666666" /> -->
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
const custonRightIcon = {
    "卡币规则": {
        emitAction: "onClickRule",
        icon: "/static/mall/order.png",
        icon_black: "/static/mall/order_black.png",
        style: {
            width: "29rpx",
            height: "34rpx",
        }
    }
}
@Component({})
export default class ClassName extends BaseNode {
    list3: any = [
        'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.12.16/luckdraw/0/167115924208198rhetzoo.jpg',
        'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.12.16/luckdraw/0/167115924208198rhetzoo.jpg',
        'https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.12.16/luckdraw/0/167115924208198rhetzoo.jpg',
    ]
    custonRightIcon: any = custonRightIcon
    app: any = app
    // visible: boolean = false
    navHeight: number = 0
    myPoint: number = 0;
    nowTimeStamp: any = Math.round(+new Date() / 1000);
    stampTimer: any = null
    goodsList: any = []
    totalPage: number = 0;
    queryParams: any = {
        pageIndex: 1,
        pageSize: 15,
        tp: 100,
        state: 1
    }
    tab: any = {
        index: 0,
        list: [
            {
                name: '全部',
                value: 100
            },
            {
                name: '限时兑换',
                value: 11
            }, {
                name: '卡盒卡包',
                value: 2
            },
            {
                name: '卡具',
                value: 3
            },
            {
                name: '其他',
                value: 4
            }
        ]
    }
    onLoad(query: any) {
        app.platform.hasLoginToken(() => {
            this.reqNewData()
            this.reqMeCardBean()
        })
    }
    onShow() {
        this.startStampTimer()
    }
    onPullDownRefresh() {
        this.queryParams.pageIndex = 1
        this.reqNewData(() => {
            setTimeout(() => {
                uni.stopPullDownRefresh()
            }, 500)
        })
    }
    onReachBottom() {
        if (this.queryParams.pageIndex < this.totalPage) {
            this.queryParams.pageIndex += 1
            this.reqNewData()
        }
    }
    onPageScroll(data: any) {
        //@ts-ignore
        this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
    }
    getNavHeight(event: any) {
        this.navHeight = event
    }
    startStampTimer() {
        this.stampTimer && clearInterval(this.stampTimer)
        this.nowTimeStamp = Math.round(+new Date() / 1000)
        this.stampTimer = setInterval(() => {
            this.nowTimeStamp = Math.round(+new Date() / 1000)
        }, 1000)
    }
    onClickSwiper(item: any) {
        if (!item.path) return
        uni.navigateTo({
            url: item.path
        })
    }
    getCountDownInfo(nowTimeStamp: number, endTimeStamp: number) {
        if (!endTimeStamp) endTimeStamp = Math.round((new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 -
            1) / 1000)
        let times: any = new Date(endTimeStamp * 1000).getTime() - new Date(nowTimeStamp * 1000).getTime();
        let ss: any = Math.floor(times / 1000)
        let hh = this.formatNumberZero(Math.floor(ss / 3600));
        ss %= 3600;
        let mm = this.formatNumberZero((Math.floor(ss / 60)));
        ss %= 60;
        ss = this.formatNumberZero(ss);
        const timeInfo: any = {
            hours: String(hh).split(''),
            minutes: String(mm).split(''),
            seconds: String(ss).split('')
        }
        return timeInfo
    }
    formatNumberZero(val: any) {
        return val < 10 ? "0" + val : val
    }
    tabChange(item: any, index: any) {
        if (this.tab.index == index) return
        this.tab.index = index
        this.queryParams.tp = item.value
        this.queryParams.pageIndex = 1
        this.reqNewData(() => {
        })

    }
    pageJump(url: string) {
        uni.navigateTo({
            url
        })
    }
    //获取个人卡币
    reqMeCardBean(cb?: Function) {
        app.http.Get("dataApi/point/index", {}, (res: any) => {
            this.myPoint = res.point || 0
            cb && cb();
        });
    }
    //获取轮播图
    reqSwiperData() {
        app.http.Get(`dataApi`, {}, (res: any) => {

        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/point/exchange/goodlist`, this.queryParams, (res: any) => {
            const list = (res.list || []).map((item: any) => {
                return {
                    ...item,

                }
            })
            this.totalPage = res.totalPage
            this.queryParams.pageIndex == 1 ? this.goodsList = list : this.goodsList.push(...list)
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #f6f7fb;
}

.topBanner {
    width: 750rpx;
    height: 284rpx;
    background-image: url("@/static/mall/topBack.png");
    background-size: 100% 100%;
}

.myInfoContainer {
    width: 710rpx;
    height: 100rpx;
    background-image: url("@/static/mall/myPointBack.png");
    background-size: 100% 100%;
    margin-top: -48rpx;
    margin-bottom: 12rpx;
    box-sizing: border-box;
    padding: 22rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .myInfo_right {
        display: flex;
        align-items: center;

        &_gift {
            width: 46rpx;
            height: 46rpx;
            background-image: url("@/static/mall/gift.png");
            background-size: 100% 100%;
        }

        &_font {
            margin-left: 16rpx;
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
        }
    }

    .myInfo_left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &_redFont {
            font-size: 33rpx;
            font-family: YouSheBiaoTiHei;
            font-weight: 400;
            color: #FA1545;
        }

        &_point {
            font-size: 33rpx;
            font-family: YouSheBiaoTiHei;
            font-weight: 400;
            color: #333333;
            display: flex;
            align-items: center;

            image {
                width: 13rpx;
                height: 19rpx;
                margin-left: 20rpx;
            }
        }
    }
}

.mallSwiper {
    width: 710rpx;
    height: 155rpx;
    margin-bottom: 12rpx;
}

.uTabs {
    width: 750rpx;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 80rpx;
    background-color: #f6f7fb;

    .tabsItem {
        width: 25%;
        text-align: center;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        white-space: nowrap;
    }

    .tabsItem_select {
        font-size: 40rpx;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #F91E44;
    }

    // background-color: #000;
}

.goodsContainer {
    box-sizing: border-box;
    width: 750rpx;
    padding: 0rpx 14rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.leftTitle {
    font-size: 35rpx;
    font-family: PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
}

.goodsItem {
    width: 356rpx;
    height: 448rpx;
    background: #FFFFFF;
    border-radius: 5rpx;
    margin-bottom: 12rpx;
    box-sizing: border-box;
    padding-bottom: 28rpx;
    display: flex;
    flex-direction: column;
}

.goodsItem_top {
    width: inherit;
    box-sizing: border-box;
    height: 263rpx;
    position: relative;
    overflow: hidden;

    .logo {
        width: 327rpx;
        height: 252rpx;
        background: #EAF2FF;
        border-radius: 3rpx;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        bottom: 0;
        z-index: 1;
    }

    .startTimeBlock {
        width: inherit;
        height: 42rpx;
        background: rgba(0, 0, 0, .38);
        position: absolute;
        display: flex;
        left: 0;
        bottom: 0;
        z-index: 2;
        box-sizing: border-box;
        align-items: center;
        padding: 0 14rpx;
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        justify-content: space-between;

        &_rightCountDown {
            display: flex;
            align-items: center;

            .timeBlock {
                width: 26rpx;
                height: 26rpx;
                background: #FFFFFF;
                border-radius: 3rpx;
                font-size: 21rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #515151;
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

.goodsItem_bottom {
    width: inherit;
    box-sizing: border-box;
    padding: 0 14rpx;
    margin-top: 15rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goodsName {
        font-size: 27rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
    }

    .goodsPriceBlock {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    .goodsPriceBlock_bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .leftNum {
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #999999;
        }
    }

    .money {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #F91E44;
    }
}
</style>
