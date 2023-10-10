<template>
    <view class="content">
        <transitionNav @onClickRule="pageJump(`${mallRouter}/rule`)" @onClickBackPack="pageJump(`${mallRouter}/backpack`)"
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
                    <text>000</text>
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
        <view class="limit-line">本月剩余可兑权重分：9999999/999999999</view>
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
                    <muqian-lazyLoad class="logo" borderRadius="3rpx" :src="$parsePic(item.logo)"></muqian-lazyLoad>
                </view>
                <view class="goodsItem_bottom">
                    <view class="goodsName">{{ item.name }}</view>
                    <view class="goodsPriceBlock">
                        <view class="goodsPriceBlock_bottom">
                            <view class="money">{{ item.pay_tp == 2 ? `${item.money}元` : `${item.price}卡币` }}</view>
                            <view class="leftNum" v-if='item.limit_num != 0 || item.leftNum != -1'>剩余{{ item.leftNum }}
                            </view>
                        </view>
                    </view>
                    <view class="buyBtn" @click="onClickBuy(item)">兑换</view>
                </view>
            </view>
        </view>
        <empty v-if="goodsList && !goodsList.length && successRequest" />
        <view class="bottomSafeArea"></view>

        <mallBuy :popupShow.sync="buyPopup.show" :data="buyPopup.data"/>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { mall } from '../constants/constants'
import mallBuy from '../components/mallBuy.vue';
@Component({
    components:{
        mallBuy
    }
})
export default class ClassName extends BaseNode {
    custonRightIcon: any = mall.custonRightIcon;
    mallRouter = mall.mallRouter;
    goodsList: any = []
    totalPage: number = 0;
    queryParams: any = {
        pageIndex: 1,
        pageSize: 15,
        tp: 100,
        state: 1
    }
    successRequest: boolean = false
    tab: any = {
        index: 0,
        list: [
            { name: '全部', value: 100 },
            { name: '权重', value: 11 }, 
            { name: '广告位', value: 2 },
            { name: '物料', value: 3 },
            { name: '其他', value: 4 }
        ]
    };
    buyPopup = {
        show:false,
        data:{}
    }
    onLoad(query: any) {
        app.platform.hasLoginToken(() => {
            this.reqNewData()
        })
    }
    onPageScroll(data: any) {
        //@ts-ignore
        this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
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
            this.reqNewData(() => { }, false)
        }
    }
    tabChange(item: any, index: any) {
        if (this.tab.index == index) return
        this.tab.index = index
        this.queryParams.tp = item.value
        this.queryParams.pageIndex = 1
        this.reqNewData(() => {
        }, false)
    }
    pageJump(url: string) {
        uni.navigateTo({ url })
    }
    reqNewData(cb?: any, isRefresh?: boolean) {
        if (isRefresh) this.successRequest = false
        app.http.Get(`dataApi/point/exchange/goodlist`, this.queryParams, (res: any) => {
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
        app.platform.UIClickFeedBack(); 
        this.buyPopup = {
            show:true,
            data:item
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
