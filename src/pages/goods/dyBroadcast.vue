<template>
    <view class="content">
        <transitionNav ref='transitionNav' title="边播边拆"></transitionNav>
        <view class="header-bg"></view>
        <empty v-if="onSaleList.length==0&&listParams.isFetchEnd"/>
        <view class="list">
            <view class="sale-container" v-for="(item,index) in onSaleList" :key="index">
                <view class="sale-top">
                    <image class="goods-pic" :src="decodeURIComponent(currentGoods(item).pic)" @click="navigateToDetail(currentGoods(item))"/>
                    <view class="sale-merchant" @click="onClickSellerShop(item)">
                        <muqian-lazyLoad class="sale-merchant-image" :src="decodeURIComponent(item.merchantLogo)" />
                        <text class="sale-merchant-name">{{item.merchantName}}</text>
                    </view>
                    <view class="goods-list">
                        <scroll-view class="goods-scroll" scroll-x="true">
                            <view class="scroll-item" :class="{'current-item':item.current == goodIndex}" v-for="(goodItem,goodIndex) in item.goodList" @click="item.current = goodIndex">
                                <image class="scroll-image" :src="decodeURIComponent(goodItem.pic)"/>
                            </view>
                        </scroll-view>
                    </view>
                </view>
                <view class="sale-index">
                    <view class="sale-title" @click="navigateToDetail(currentGoods(item))">
                        <div class="cardicon">
                            <text class="icon-text" :style="{color:goodsTypeData(item).color}">{{goodsTypeData(item).name.slice(0,2)}}</text>
                            <text class="icon-text">{{goodsTypeData(item).name.slice(2)}}</text>
                        </div>
                        <text class="sale-name u-line-1">{{currentGoods(item).goodName}}</text>
                    </view>
                    <view class="sale-content" @click="navigateToDetail(currentGoods(item))">
                        <div class="goods-priceMsg-left">
                            <text class="price-icon">￥</text>
                            <text class="price-text">{{ filterPrice(currentGoods(item).price).integer }}</text>
                            <text class="decimal" v-if="filterPrice(currentGoods(item).price).decimal">{{ filterPrice(currentGoods(item).price).decimal }}</text>
                        </div>
                        <view class="content-right">
                            <view class="plan-text">{{goodsManaager.listPlan(currentGoods(item),'str')}}</view>
                            <view class="goods-progress" :style="progressStyle(item)">
                                <view class="progressMask" :style="{width:(100-goodsManaager.listPlan(currentGoods(item),'num'))+'%'}"></view>
                            </view>
                        </view>
                    </view>
                    <view class="button-container">
                        <view class="btn-dy">
                            <view class="dy-text u-line-1">{{decodeURIComponent(item.dyLink)}}</view>
                            <view class="btn-copy" @click="onClickCopy(item.dyLink)">复制</view>
                        </view>
                        <view class="btn-buy" @click="onClickBuy(currentGoods(item))">购买</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="list more" v-show="moreList.length">
            <view class="more-title">更多直播商家</view>
            <view class="more-container" v-for="(item,index) in moreList" :key="index" @click="onClickSellerShop(item)">
                <image class="more-logo" :src="decodeURIComponent(item.merchantLogo)"/>
                <view class="more-merchant">
                    <view class="more-merchant-name u-line-1">{{item.merchantName}}</view>
                    <view class="more-merchant-time u-line-1">{{item.time}}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { gameplayType } from "@/tools/DataExchange"
import { filterPrice } from "@/tools/util";
class List {
    fetchFrom=1;
    fetchSize=20;
    isFetchEnd = false
}
@Component({
    components:{
    }
})
export default class ClassName extends BaseNode {
    goodsManaager = app.goods;
    filterPrice = filterPrice;
    onSaleList = [];
    moreList = [];
    listParams = new List()
    onLoad(){
        uni.$on("showPaySuccess", (res) => {
            this.refresh()
        });
        this.refresh()
    }
    onPageScroll(data: any) {
        //@ts-ignore
        this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
    }
    onPullDownRefresh() {
        this.refresh()
    }
    refresh(){
        this.listParams = new List();
        this.moreList = []
        this.getList(() => {
            uni.stopPullDownRefresh()
        })
    }
    onReachBottom() {
        this.getList()
    }
    currentGoods(item:any){
        return item.goodList[item.current]
    }
    goodsTypeData(item) {
        return gameplayType[this.currentGoods(item).pintuanType]
    }
    progressStyle(item){
        const { progressLeft, progressRight } = this.goodsTypeData(item)
        return {
            'background': `linear-gradient(to right,${progressLeft},${progressRight})`
        }
    }
    getList(cb?:Function){
        if(this.listParams.isFetchEnd) return;

        app.http.Get('dataApi/dyBroadcast/merchant/list',this.listParams,(res:any)=>{
            if(res.list){
                const saleList = res.list.map(x=> ({...x,current:0}))
                this.onSaleList = this.listParams.fetchFrom==1 ? saleList : [...this.onSaleList,...saleList];
            };
            if(res.moreList){
                this.moreList = this.listParams.fetchFrom==1 ? res.moreList : [...this.moreList,...res.moreList];
            };
            this.listParams.isFetchEnd = res.isFetchEnd;
            this.listParams.fetchFrom += this.listParams.fetchSize;
            cb?.()
        })
    }
    // 跳转商品详情
    onClickJumpDetails(goodCode: any) {
        app.navigateTo.goGoodsDetails(goodCode)
    }
    onClickSellerShop(item: any) {
        this.goMerchantPage(item.merchantAlias)
    }
    onClickCopy(text){
        uni.setClipboardData({
            data:decodeURIComponent(text),
            showToast:false,
            success: ()=> {
                uni.showToast({
                    title:'已复制抖音直播间链接，可前往抖音粘贴',
                    icon:'none'
                })
            }
        });
    }
    navigateToDetail(item){
        app.navigateTo.goGoodsDetails(item.goodCode,"&referer=dyBroadcast")
    }
    // 购买
    onClickBuy(item) { 
        app.platform.hasLoginToken(() => {
            if ([10,11,12].includes(item.pintuanType)) { 
                // 处理购买自选球队 
                this.navigateToDetail(item)
            } else if ((item.totalNum - (item.currentNum + item.lockNum)) <=0) { 
                // 售罄
                uni.showToast({ title: '该商品已售罄', icon: 'none' }) 
                return 
            } else { 
                // 普通类型购买
                app.http.GetWithCrypto(`dataApi/good/${item.goodCode}/1/detail`, {referer:"dyBroadcast"}, (data: any) => {
                    uni.navigateTo({
                        url: `pay/payGoods?data=${encodeURIComponent(JSON.stringify(data.good))}&payChannel=${encodeURIComponent(JSON.stringify(data.payChannel || []))}`
                    })
                })
            } 
        }) 
    }
}
</script>

<style lang="scss">
page {
    background: #F6F7FB;
}
.header-bg {
    width: 750rpx;
    height: 360rpx;
    background: url(@/static/live/v3/banner.png) no-repeat center /100% 100%;
}
.list{
    width: 100%;
    box-sizing: border-box;
    padding: 14rpx;
    .sale-container{
        width: 100%;
        height:810rpx;
        box-sizing: border-box;
        margin-bottom: 30rpx;
        border-radius: 4rpx;
        overflow: hidden;
    }
    .sale-top{
        width: 100%;
        height:554rpx;
        position: relative;
        .goods-pic{
            width: 100%;
            height:inherit;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
        }
        .sale-merchant{
            height:48rpx;
            box-sizing: border-box;
            padding:7rpx 16rpx;
            display: inline-flex;
            align-items: center;
            position: absolute;
            left:21rpx;
            top:21rpx;
            z-index: 2;
            background: rgba(130,130,130,0.53);
            border-radius: 2rpx;
        }
        .sale-merchant-image{
            width: 34rpx;
            height:34rpx;
            border-radius: 50%;
            margin-right: 12rpx;
        }
        .sale-merchant-name{
            font-size: 18rpx;
            color: #FFFFFF;
        }
        .goods-list{
            width: 100%;
            height: 194rpx;
            background: linear-gradient( 180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.61) 100%);
            position: absolute;
            left:0;
            bottom:0;
            z-index: 2;
        }
        .goods-scroll {
            width: 100%;
            padding:17rpx 21rpx 0rpx 21rpx;
            box-sizing: border-box;
            height: 134rpx;
            display: flex;
            white-space: nowrap;
            position: absolute;
            bottom:0;
            left:0;
        }
        .scroll-item{
            display: inline-block;
            width: 128rpx;
            height:100rpx;
            margin-right: 19rpx;
            box-sizing: border-box;
            box-sizing: border-box;
            border:1px solid rgba(0,0,0,0)
        }
        .current-item{
            border:1px solid #FA1545
        }
        .scroll-image{
            width:100%;
            height:100%;
            border-radius: 4rpx;
        }
    }
    .sale-index{
        width: 100%;
        height:256rpx;
        box-sizing: border-box;
        padding:0 27rpx;
        background: #fff;
        .sale-title{
            width: 100%;
            height: 70rpx;
            display: flex;
            align-items: center;
            margin-top: 6rpx;
        }
        .cardicon{
            width: 92rpx;
            height: 32rpx;
            border-radius: 2rpx;
            border: 1rpx solid #E6E6E6;
            margin-right: 17rpx;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .icon-text{
            font-size: 18rpx;
            color: #333333;
            font-weight: 500;
        }
        .sale-name{
            max-width: 580rpx;
            font-size: 28rpx;
            color: #333333;
        }
        .sale-content{
            width: 100%;
            height:46rpx;
            display: flex;
            justify-content: space-between;
            margin-top: 6rpx;
        }
        .goods-priceMsg-left{
            height: 46rpx;
            display: flex;
            align-items: flex-end;
        }
        .price-icon{
            font-size:40rpx;
            font-weight: 600;
            color: #333333;
        }
        .price-text {
            font-size: 40rpx;
            font-weight: 600;
            margin-left: -6rpx;
        }
        .decimal{
            font-size: 22rpx;
            margin-bottom: 5rpx;
            font-weight: 600;
        }
        .content-right{
            width: 526rpx;
        }
        .plan-text{
            width: 526rpx;
            font-size: 20rpx;
            color: #C0C0C0;
            text-align: right;
            margin-bottom: 2rpx;
        }
        .goods-progress {
            background: linear-gradient(to right,#FFBAC9,#FA1545);
            width: 526rpx;
            height: 8rpx;
            display: flex;
            justify-content: flex-end;
            border: 1rpx;
            overflow: hidden;
        }
        .progressMask {
            height: 8rpx;
            background-color: #f3f2f2;
        }
        .button-container{
            width: 100%;
            height:60rpx;
            display: flex;
            justify-content: space-between;
            margin-top: 28rpx;
        }
        .btn-dy{
            width: 487rpx;
            height: 60rpx;
            box-sizing: border-box;
            background: #FFFFFF;
            border-radius: 2rpx;
            border: 1rpx solid #AAAAAA;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .dy-text{
            width: 366rpx;
            height:60rpx;
            line-height: 60rpx;
            box-sizing: border-box;
            padding:0 20rpx 0 26rpx;
            font-size: 20rpx;
            color: #9FA4B0;
        }
        .btn-copy{
            width: 120rpx;
            height: 60rpx;
            background: #333333;
            border-radius: 2rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;
            font-size: 24rpx;
            color: #FFFFFF;
        }
        .btn-buy{
            width: 161rpx;
            height: 60rpx;
            background: #FA1545;
            border-radius: 2rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;
            font-size: 24rpx;
            color: #FFFFFF;
        }
    }
}
.more{
    padding:0 16rpx;
}
.more-title{
    font-weight: 600;
    font-size: 26rpx;
    color: #333333;
    box-sizing: border-box;
    padding-left: 24rpx;
    margin-bottom: 13rpx;
}
.more-container{
    width: 100%;
    height:134rpx;
    background: #FFFFFF;
    border-radius: 4rpx;
    margin-bottom: 14rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 36rpx;
    .more-logo{
        width: 82rpx;
        height:82rpx;
        border-radius: 50%;
        margin-right: 26rpx;
    }
    .more-merchant{
        width: 538rpx;
        height:82rpx;
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        box-sizing: border-box;
        padding:6rpx 0;
    }
    .more-merchant-name{
        width: 100%;
        font-weight: 600;
        font-size: 24rpx;
        color: #333333;
    }
    .more-merchant-time{
        width: 100%;
        font-size: 20rpx;
        color: #A2A8B4;
    }
}
</style>
