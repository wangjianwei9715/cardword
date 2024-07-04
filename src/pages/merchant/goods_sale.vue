<!--
 * @FilePath: \jichao_app_2\src\pages\merchant\goods_sale.vue
 * @Author: wjw
 * @Date: 2022-12-16 16:23:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-19 13:47:39
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
        <advertising :show.sync="adPopup.show" :goodCode="adPopup.goodCode" :slogan="adPopup.slogan" />

        <u-popup :show="showAdSlogan.show" mode="center" @close="showAdSlogan.show=false">
            <view class="popup-content">
                <view class="tipsTitle">广告推广</view>
        
                <view class="slogan-box">
                    <view class="slogan-title">广告标语：</view>
                    <u--input class="slogan-input" v-model="showAdSlogan.slogan" />
                </view>
                <view class="slogan-box" @click="sloganCheck=!sloganCheck">
                    <view class="bottom-gm-gx" :class="{ 'bottom-gm-check': sloganCheck }"></view>设为默认
                </view>
                <view class="slogan-box btn-box">
                    <view class="btn" @click="showAdSlogan.show=false">取消</view>
                    <view class="btn con-btn" @click="onClickConfirmSlogan">确认</view>
                </view>
            </view>
		</u-popup>
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
            goodCode:"",
            slogan:""
        }
        showAdSlogan = {
            show:false,
            goodCode:"",
            slogan:""
        }
        sloganCheck=false;
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
            this.showAdSlogan = {
                show:true,
                goodCode,
                slogan:uni.getStorageSync("adSlogan") || ""
            }
            
        }
        onClickConfirmSlogan(){
            const { goodCode, slogan } = this.showAdSlogan
            if(this.sloganCheck) uni.setStorageSync("adSlogan",slogan);
            this.showAdSlogan.show=false;
            this.sloganCheck=false;
            this.adPopup = {
                show:true,
                goodCode,
                slogan
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
            
            
            color: #88878C;
        }
        .item-status{
            font-size: 23rpx;
            
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
                
                color: #333333;
                line-height: 38rpx;
                margin-right: 10rpx;
                letter-spacing:-2rpx;
            }

            text:last-child {
                font-size: 23rpx;
                
                font-weight: 600;
                color: #959695;
            }
        }
        .item-num{
            font-size: 23rpx;
            
            
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
            
            font-weight: 600;
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
        
        font-weight: 600;
        line-height: 52rpx;
        background: #FA1545;
        color:#FFFFFF
    }
    @mixin lineBox {
        width: 100%;
        box-sizing: border-box;
        display: flex;
    }

    @mixin font($size) {
        font-size: $size;
        font-weight: 600;
        color: #333;
    }

    .popup-content {
        @include lineBox;
        width: 700rpx;
        flex-direction: column;
        align-items: center;
        padding:30rpx 100rpx;

        .title {
            @include font(42rpx)
        }
        .tipsTitle{
            font-weight:bold;
            @include font(32rpx);
            margin-bottom: 100rpx
        }
        .slogan-box{
            @include lineBox;
            flex-wrap: wrap;
            margin-bottom: 20rpx;
            .slogan-title{
                width: 100%;
                @include font(28rpx);
                
            }
            .slogan-input{
                @include font(28rpx);
                margin-top: 10rpx;
                font-weight:400;
            }
        }
        .image {
            width: 292rpx;
            height: 235rpx;
            transform: scale(1.2);
            margin: 76rpx 0 100rpx 0
        }

        .btn {
            @include font(36rpx);
            width: 240rpx;
            height: 80rpx;
            border:0.8px solid #959695;
            border-radius: 3rpx;
            text-align: center;
            line-height: 80rpx;
            margin-top:30rpx;
        }
        .con-btn{
            border:0.8px solid #FA1545;
            background: #FA1545;
            color:#fff;
        }
        .tips {
            @include lineBox;
            font-size: 24rpx;
            
            
            color: #E6E6E6;
            justify-content: center;
            align-items: center;
            .icon {
                width: 24rpx;
                height: 24rpx;
                margin-right: 10rpx;
            }
        }
        .btn-box{
            justify-content: space-between;
        }
        .tips-btn{
            font-size: 28rpx;
            margin-top: 20rpx;
        }
        .bottom-gm-gx {
            width: 30rpx;
            height: 30rpx;
            background: url(@/static/userinfo/weixuan@2x.png) no-repeat center;
            background-size: 100% 100%;
            margin-right: 10rpx;
        }
        .bottom-gm-check {
            width: 30rpx;
            height: 30rpx;
            background: url(@/static/userinfo/pay_gou.png) no-repeat center;
            background-size: 100% 100%;
            margin-right: 10rpx;
        }
    }
</style>