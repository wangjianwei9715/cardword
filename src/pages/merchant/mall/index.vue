<template>
    <view class="content">
        <transitionNav @onClickRule="pageJump(`${mallRouter}/rule?maxMonthWeight=${merchantInfo.maxMonthWeight}`)" @onClickBackPack="pageJump(`${mallRouter}/backpack?integral=${merchantInfo.integral}`)"
            :toolsMapCustomNew="custonRightIcon" ref='transitionNav' :needRightTools="['背包','积分规则']"
            :needIconShadow="false" title="积分中心">
            <template slot="slotLeft">
                <view class="leftTitle">积分中心</view>
            </template>
        </transitionNav>
        <view class="topBanner"></view>
        <view class="myInfoContainer">
            <view class="myInfo_left">
                <view class="myInfo_left_redFont">商家积分</view>
                <view class="myInfo_left_point" @click="pageJump(`${mallRouter}/record_point`)">
                    <text>{{merchantInfo.integral}}</text>
                    <image src="@/static/mall/dotRight.png"></image>
                </view>
            </view>
            <view class="myInfo_right" @click="pageJump(`${mallRouter}/exchangeLog`)">
                <view class="myInfo_right_gift"></view>
                <view class="myInfo_right_font">
                    我的<br>订单
                </view>
            </view>
        </view>
        <view class="limit-line">本月剩余可兑权重分：{{ availableMonthWeight }}/{{ merchantInfo.maxMonthWeight||0 }}</view>
        <view class="uTabs">
            <view class="tabsItem" :class="{ tabsItem_select: index == tab.index }" @click="tabChange(item, index)"
                v-for="(item, index) in tab.list" :key="index">{{ item.name }}</view>
        </view>
        <u-skeleton rows="4" style="width: 690rpx" :rowsWidth="[`690rpx`, `690rpx`, `690rpx`, `690rpx`, `690rpx`]"
            :rowsHeight="[`252rpx`, `252rpx`, `252rpx`, `252rpx`, `500rpx`]" :title="false"
            :loading="!successRequest"></u-skeleton>
        <view class="goodsContainer">
            <view class="goodsItem" v-for="(item, index) in goodsList" :key="index">
                <view class="goodsItem_top">
                    <muqian-lazyLoad class="logo" borderRadius="3rpx" :src="item.cover"></muqian-lazyLoad>
                    <view class="startTimeBlock" v-if="item.canBuy_at > 0">
                        <view class="startTimeBlock_leftFont">{{ item.canBuy_at > nowTimeStamp ? '距离开始' : '开抢中' }}</view>
                        <view class="startTimeBlock_rightCountDown"
                            v-if="item.canBuy_at && item.canBuy_at > 0 && nowTimeStamp < item.canBuy_at">
                            <view class="timeBlock flexCenter"
                                v-for="(time,tIndex) in getCountDownInfo(nowTimeStamp, item.canBuy_at).hours" :key="`hours${tIndex}`">{{ time }}</view>
                            <view class="colon">:</view>
                            <view class="timeBlock flexCenter"
                                v-for="(time,tIndex) in getCountDownInfo(nowTimeStamp, item.canBuy_at).minutes" :key="`minutes${tIndex}`">{{ time }}</view>
                            <view class="colon">:</view>
                            <view class="timeBlock flexCenter"
                                v-for="(time,tIndex) in getCountDownInfo(nowTimeStamp, item.canBuy_at).seconds" :key="`seconds${tIndex}`">{{ time }}</view>
                        </view>
                    </view>
                </view>
                <view class="goodsItem_bottom">
                    <view class="goodsName u-line-2">{{ item.title }}</view>
                    <view class="goodsPriceBlock">
                        <view class="goodsPriceBlock_bottom">
                            <view class="money">{{item.price}}{{ item.pay_type==payTypeMap.money ? '元' : '积分' }}</view>
                            <view class="flex1"></view>
                            <view class="leftNum" v-if='item.canBuy_at&&item.canBuy_at>0&&item.stock_num'>库存:{{ item.stock_num }}</view>
                            <view class="leftNum" v-if='item.limit_num>0'>限购:{{ item.limit_num }}</view>
                        </view>
                    </view>
                    <view class="buyBtn" @click="onClickBuy(item)">{{item.pay_type==payTypeMap.money?"购买":"兑换"}}</view>
                </view>
            </view>
        </view>
        <empty v-if="goodsList && !goodsList.length && successRequest" />
        <view class="bottomSafeArea"></view>

        <mallBuy :popupShow.sync="buyPopup.show" :id="buyPopup.id" @exchangeSuccess="refreshPages()"/>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { mall, payTypeMap } from '../constants/constants'
import mallBuy from '../components/mallBuy.vue';
import { getMerchantIntegral } from '../utils/util';
@Component({
    components:{
        mallBuy
    }
})
export default class ClassName extends BaseNode {
    payTypeMap = payTypeMap
    pageJump = app.navigateTo.pageJump;
    custonRightIcon: any = mall.custonRightIcon;
    mallRouter = mall.mallRouter;
    goodsList: any = []
    totalPage: number = 0;
    queryParams: any = {
        pageIndex: 1,
        pageSize: 20,
        tp: 0,
    }
    successRequest: boolean = false
    nowTimeStamp: any = Math.round(+new Date() / 1000);
    stampTimer:any=null
    tab: any = {
        index: 0,
        list: [
            { name: '全部', value: 0 },
            { name: '权重', value: 2 }, 
            { name: '广告位', value: 3 },
            { name: '实物', value: 1 },
            { name: '其他', value: 100 }
        ]
    };
    buyPopup = {
        show:false,
        id:0
    }
    merchantInfo:any = {};
    onShow(){
        this.refreshPages()
        this.startStampTimer()
    }
    onPageScroll(data: any) {
        //@ts-ignore
        this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
    }
    onPullDownRefresh() {
        this.refreshPages()
    }
    onReachBottom() {
        if (this.queryParams.pageIndex < this.totalPage) {
            this.queryParams.pageIndex += 1
            this.reqNewData(() => { }, false)
        }
    }
    public get availableMonthWeight() : number {
        const { maxMonthWeight, nowMonthWeight } = this.merchantInfo;
        return Math.round( maxMonthWeight-nowMonthWeight ) || 0
    }
    async getMerchantInfo(){
        const info = await getMerchantIntegral();
        this.merchantInfo = {
            integral:info.integral,
            maxMonthWeight:info.maxMonthWeight || 5000,
            nowMonthWeight:info.nowMonthWeight
        }
    }
    startStampTimer() {
        this.stampTimer && clearInterval(this.stampTimer)
        this.nowTimeStamp = Math.round(+new Date() / 1000)
        this.stampTimer = setInterval(() => {
            this.nowTimeStamp = Math.round(+new Date() / 1000)
        }, 1000)
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
    refreshPages(){
        this.queryParams.pageIndex = 1;
        this.getMerchantInfo();
        this.reqNewData(() => {
            setTimeout(() => {
                uni.stopPullDownRefresh()
            }, 500)
        })
    }
    tabChange(item: any, index: any) {
        if (this.tab.index == index) return
        this.tab.index = index
        this.queryParams.tp = item.value
        this.queryParams.pageIndex = 1
        this.reqNewData(() => {
        }, false)
    }
    reqNewData(cb?: any, isRefresh?: boolean) {
        if (isRefresh) this.successRequest = false;
        const { tp, ...rest } = this.queryParams;
        
        app.http.Get(`dataApi/merchant/mall/list`, {...rest,tp:tp>0?tp:null}, (res: any) => {
            const list = res.list || []
            this.totalPage = res.totalPage
            this.queryParams.pageIndex == 1 ? this.goodsList = list : this.goodsList.push(...list)
            this.successRequest = true
            cb && cb()
        }, (err: any) => {
            this.successRequest = true
        })
    }
    onClickBuy(item:any){
        if (item.canBuy_at&&item.canBuy_at>0&&item.canBuy_at>Math.round(+new Date()/1000)){
            uni.showToast({
                title:"倒计时结束后可购买",
                icon:"none"
            })
            return
        }
        app.platform.UIClickFeedBack(); 
        this.buyPopup = {
            show:true,
            id:item.id
        }
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
    // margin-bottom: 12rpx;
    box-sizing: border-box;
    padding: 22rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .myInfo_right {
        display: flex;
        align-items: center;

        &_gift {
            width: 42rpx;
            height: 46rpx;
            background-image: url("@/static/mall/order_.png");
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
    // margin-bottom: 12rpx;
}

.uTabs {
    width: 750rpx;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 80rpx;
    background-color: #f6f7fb;
    margin: 6rpx 0;
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
    padding-bottom: 24rpx;
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

        &_leftFont {
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
        }
    }
}
.flex1{
    flex: 1;
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
        // justify-content: space-between;
        align-items: center;

        .leftNum {
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #999999;
            margin-left: 10rpx;
        }
    }

    .rmbMoney {
        position: relative;
        top: 6rpx;
    }

    .money {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #F91E44;
        position: relative;
    }
}
.buyBtn{
    width: 327rpx;
    height: 52rpx;
    border-radius: 3rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 52rpx;
    background: #FA1545;
    color:#FFFFFF;
    margin:0 auto;
}
.limit-line{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    padding-left: 19rpx;
    font-size: 23rpx;
    color: #999999;
    margin-top: 16rpx;
}
</style>
