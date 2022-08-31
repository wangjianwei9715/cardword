<template>
    <view class='content'>

        <!-- #ifdef APP-PLUS -->
        <view class="tagContainer">
            <view class="tagItem" @click="onClickTagChange(item,index)" :class="{selectTag:index==tag.index}"
                v-for="(item,index) in tag.list" :key="index">
                {{item.label}}</view>
        </view>
        <view :style="{height:app.statusBarHeight+'px'}" style="width: 750rpx;background-color: #fff;">
        </view>
        <!-- #endif -->
        <!-- #ifdef H5 -->
        <view class="tagContainer" :style="{top:88+'rpx'}">
            <view class="tagItem" @click="onClickTagChange(item,index)" :class="{selectTag:index==tag.index}"
                v-for="(item,index) in tag.list" :key="index">
                {{item.label}}</view>
        </view>
        <view :style="{height:88+'rpx'}" style="width: 750rpx;background-color: #fff;">
        </view>
        <!-- #endif -->
        <view class="msgItem" v-if="queryParams.tp==1">
            <image class="msg-img" :src="parsePic(decodeURIComponent(logo))" mode="aspectFill" />
            <view class="msg-right">
                <view class="msg-name">
                    店铺通用券
                </view>
                <view class="msg-cumulative">累计使用<text style="color:#e9114f">{{shopCouponMoney}}</text>元</view>
                <view class="msg-action uni-flex">
                    <view class="actionButton flexCenter" @click="pageJump(`/pages/merchant/couponDetail`)">
                        查看
                    </view>
                    <view class="actionButton flexCenter redButton" @click="selectItem={},createCouponShow=true">
                        创建
                    </view>
                </view>
            </view>
        </view>
        <view class="msgItem" v-for="(item,index) in goodsList" :key="index">
            <muqian-lazyLoad class="msg-img" :src="parsePic(decodeURIComponent(item.pic))" mode="aspectFill" />
            <view class="msg-right">
                <view class="msg-name">
                    {{item.title}}
                </view>
                <view class="msg-cumulative">累计使用<text style="color:#e9114f">{{item.totalCouponMoney}}</text>元</view>
                <view class="msg-action uni-flex">
                    <view class="actionButton flexCenter"
                        @click="pageJump(`/pages/merchant/couponDetail?goodCode=${item.goodCode}&logo=${item.pic}&goodName=${item.title}`)">
                        查看
                    </view>
                    <view class="actionButton flexCenter redButton" v-if="queryParams.tp==1"
                        @click="onClickCreate(item)">
                        创建
                    </view>
                </view>
            </view>
        </view>
        <merchantCoupon :goodCode="selectItem.goodCode || ''" :showDrawer.sync="createCouponShow" />
        <empty v-if='!goodsList.length'/>
        <statusbar />
        <!-- <view class="previewCoupon" @click="pageJump('/pages/merchant/couponDetail')">查看</view> -->
        <!-- <bottomDrawer title='店铺通用券' :height='571' heightType='rpx' :needSafeArea='true'
            :showDrawer.sync='createCouponShow'>

        </bottomDrawer> -->
    </view>
</template>

<script lang="ts">

    import { app } from "@/app";
    import { Component, Watch } from "vue-property-decorator";
    import BaseNode from "../../base/BaseNode.vue";
    import { parsePic } from "@/tools/util";
    @Component({})
    export default class ClassName extends BaseNode {
        app: any = app
        logo: string = ''
        parsePic: any = parsePic;
        shopCouponMoney: number = 0
        tag: any = {
            index: 0,
            list: [{ label: '可创建', value: 1 }, { label: '拼成商品', value: 2 }]
        }
        queryParams: any = {
            pageIndex: 1,
            pageSize: 20,
            tp: 1//1 可创建优惠券商品，2 拼成商品
        }
        selectItem: any = {}
        totalPage: number = 0
        goodsList: any = []
        createCouponShow: boolean = false;
        onLoad(query: any) {
            if (query.logo) this.logo = query.logo
            this.reqNewData()
        }
        onPullDownRefresh() {
            this.queryParams.pageIndex = 1
            this.reqNewData(() => {
                uni.stopPullDownRefresh()
            })
        }
        onReachBottom() {
            if (this.queryParams.pageIndex < this.totalPage) {
                this.queryParams.pageIndex += 1
                this.reqNewData()
            }
        }
        onClickCreate(item: any) {
            this.selectItem = item
            this.createCouponShow = true
        }
        onClickTagChange(item: any, index: number) {
            if (index == this.tag.index) return
            this.tag.index = index
            this.queryParams.pageIndex = 1
            this.queryParams.tp = item.value
            this.reqNewData()
        }
        pageJump(url: string, type?: any) {
            const jumpType = type ?? "navigateTo"
            //@ts-ignore
            uni[jumpType]({
                url
            })
        }
        reqNewData(cb?: any) {
            uni.showLoading({
                title: ''
            })
            app.http.Get('me/shop/coupon/good/list', this.queryParams, (res: any) => {
                this.shopCouponMoney = res.shopCouponMoney
                this.totalPage = res.totalPage
                const list = res.list || []
                this.queryParams.pageIndex == 1 ? this.goodsList = list : this.goodsList.push(...list)
                console.log(this.goodsList);
                uni.hideLoading()
                cb && cb()
            })
        }
    }
</script>

<style lang="scss">
    page {
        background-color: #f5f7fb;
    }

    .tagContainer {
        width: 750rpx;
        background-color: #fff;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 80rpx;
        position: fixed;
        top: 0;
        z-index: 9;
    }

    .tagItem {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #959699;
    }

    .selectTag {
        font-size: 31rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
    }

    .msgItem {
        width: 722rpx;
        height: 208rpx;
        background: #FFFFFF;
        border-radius: 5rpx;
        box-sizing: border-box;
        padding: 18rpx 24rpx 19rpx 22rpx;
        display: flex;
        align-items: center;
        margin-top: 14rpx;
    }

    .msg-img {
        width: 171rpx;
        height: 171rpx;
        display: block;
        margin-right: 29rpx;
        /* background-color: red; */
    }

    .msg-name {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        margin-bottom: 10rpx;
    }

    .msg-right {
        display: flex;
        flex-direction: column;
        /* justify-content: space-between; */
        height: 100%;
        flex: 1;
    }

    .msg-cumulative {
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #88878C;
        flex: 1;
    }

    .msg-action {
        width: 100%;
        justify-content: flex-end;
    }

    .actionButton {
        width: 119rpx;
        height: 43rpx;
        border: 1rpx solid #7A7A7A;
        border-radius: 3rpx;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        margin-left: 21rpx;
        color: #333333;
    }

    .redButton {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #F6F7FB;
        border: 1rpx solid #E6374C;
        background: #E6374C;
    }
</style>