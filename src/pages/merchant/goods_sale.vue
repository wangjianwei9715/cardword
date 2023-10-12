<!--
 * @FilePath: \jichao_app_2\src\pages\merchant\goods_sale.vue
 * @Author: wjw
 * @Date: 2022-12-16 16:23:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-10-12 16:33:36
 * Copyright: 2022 .
 * @Descripttion: 
-->
<template>
    <view class="content" style="width: 100%;">
        <navigationbar title="在售管理" :custom="true">
			<template slot="right">
				<view class="extract-btn" @click="onClickShowAd()">主页推广</view>
			</template>
		</navigationbar>
        <view class="goods-item" v-for="(item,index) in listData" :key="index">
            <view class="item-header">
                <view class="item-time">上架时间 {{$u.timeFormat(item.active_at,'yyyy-mm-dd hh:MM')}}</view>
                <view class="item-status">在售</view>
            </view>
            <view class="item-center">
                <muqian-lazyLoad v-if="item.pic!=''" class="item-pic" :src="decodeURIComponent(item.pic)" borderRadius="5rpx"></muqian-lazyLoad>
                <view class="item-info">
                    <view class="item-title u-line-2">{{item.title}}</view>
                    <view class="item-info-bottom">
                        <view class="item-price">
                            ￥<text class="text-price">{{item.price}}</text><text>{{goodsManaager.hasLowestPrice(item)?' 起':''}}</text>
                        </view>
                        <view class="item-num">余{{item.totalNum-(item.currentNum+item.lockNum)}}/{{item.totalNum}}</view>
                    </view>
                </view>
            </view>
            <u-line color="#E8E8E8" margin="27rpx 0rpx 20rpx 0rpx"></u-line>
            <view class="item-bottom">
                <view class="item-rank">权重：{{item.rank}}位</view>
                <view class="item-btn-box">
                    <view class="item-btn btn-details" @click="goGoodsDetails(item.goodCode)">详情</view>
                    <view class="item-btn btn-extract" @click="onClickShowAd(item.goodCode)">广告推广</view>
                    <view class="item-btn btn-extract" @click="onClickShowUpWeight(item.goodCode)">提权</view>
                </view>
            </view>
        </view>

        <upWeight :show.sync="showUpWeight" :equitycard="equitycard" :short_description="short_description" :monthly_cards="monthly_cards" :goodCode="goodCode" @equitycardUse="refresh"/>
        <advertising :show.sync="adPopup.show" :goodCode="adPopup.goodCode" />
    </view>
</template>

<script lang="ts">
    import { app } from "@/app";
    import { Component } from "vue-property-decorator";
    import BaseNode from "../../base/BaseNode.vue";
    import upWeight from "./components/upWeight.vue"
    import advertising from "./components/advertising.vue"
    const ListInitParams = {
        pageIndex: 1,
        pageSize: 10,
        tp:1,
        noMoreData:false
    }
    @Component({
        components:{
            upWeight,
            advertising
        }
    })
    export default class ClassName extends BaseNode {
        goGoodsDetails = app.navigateTo.goGoodsDetails;
        goodsManaager = app.goods;
        listParams = {...ListInitParams};
        listData = [];
        equitycard = [];
        monthly_cards = [];
        short_description = '';
        goodCode = '';
        showUpWeight = false;
        adPopup = {
            show:false,
            goodCode:""
        }
        onLoad(query: any) {
            this.reqNewData()
        }
        onReachBottom() {
            this.reqNewData();
        }
        refresh(){
            this.listParams = {...ListInitParams};
            this.reqNewData();
        }
        reqNewData(cb?: Function) {
            // 获取更多商品
            const { listParams } = this;
            if (listParams.noMoreData)  return;

            app.http.Get("me/shop/good/list", listParams, (data: any) => {
                const arr = data.list || [];
                const list = listParams.pageIndex == 1 ? arr : [...this.listData, ...arr];
                this.listData = app.platform.removeDuplicate(list,'goodCode');
                listParams.noMoreData = data.totalPage <= listParams.pageIndex;
                listParams.pageIndex++;
                if (cb) cb();
            });
        }
        onClickShowUpWeight(goodCode:string){
            app.http.Get('me/shop/equitycard/list',{goodCode,pageIndex:1,pageSize:10},(res:any)=>{
                this.goodCode = goodCode;
                this.short_description = res.short_description;
                this.monthly_cards = res.monthly_cards
                this.equitycard = res.list.map((x:any)=>{
                    return {...x,num:0}
                })
                this.showUpWeight = true
            })
        }
        onClickShowAd(goodCode=""){
            this.adPopup = {
                show:true,
                goodCode
            }
        }
    }
</script>

<style lang="scss">
    page {
        background: $content-bg;
        width: 750rpx;
        box-sizing: border-box;
        padding:28rpx 36rpx;
    }
    .goods-item{
        width: 100%;
        height:343rpx;
        background:#fff;
        border-radius: 5rpx;
        box-sizing: border-box;
        padding: 0 20rpx;
        margin-bottom: 12rpx;
    }
    .item-header{
        width: 100%;
        height:75rpx;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item-time{
            font-size: 23rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #88878C;
        }
        .item-status{
            font-size: 23rpx;
            font-family: PingFang SC;
            font-weight: 600;
            color: #333333;
        }
    }
    .item-center{
        width: 100%;
        height:132rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .item-pic{
            width: 170rpx;
            height:132rpx;
            border-radius: 3rpx;
        }
        .item-info{
            width: 438rpx;
            height:132rpx;
            display: flex;
            flex-wrap: wrap;
        }
        .item-title{
            width: 100%;
            font-size: 25rpx;
            height:68rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 32rpx;
        }
        .item-info-bottom{
            width: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
        }
        .item-price{
            font-size: 18rpx;
            font-family: Impact !important;
            font-weight: 600;
            color: #333333;
            height: 40rpx;
            display: flex;
            align-items: flex-end;

            text.text-price {
                font-size: 33rpx;
                font-family: Impact !important;
                font-weight: 400;
                color: #333333;
                line-height: 38rpx;
                margin-right: 10rpx;
                letter-spacing:-2rpx;
            }

            text:last-child {
                font-size: 23rpx;
                font-family: PingFangSC-Regular;
                font-weight: 500;
                color: #959695;
            }
        }
        .item-num{
            font-size: 23rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #959695;
        }
    }
    .item-bottom{
        width: 100%;
        height:52rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item-rank{
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #383838;
        }
        .item-btn-box{
            height:52rpx;
            display: flex;
            align-items: center;
        }
        .item-btn{
            width: 138rpx;
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
        }
        .btn-details{
            border: 1rpx solid #959695;
            color:#333333
        }
        .btn-extract{
            background: #FA1545;
            margin-left: 28rpx;
            color:#FFFFFF
        }
    }
    .extract-btn{
        width: 138rpx;
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
        color:#FFFFFF
    }
</style>