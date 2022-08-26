<template>
    <view class='content'>
        <navigationShare :navigatetoTitle="isGoods?'指定商品券':'店铺通用券'" rightText='新建'
            @onClickRightText="onClickRightText" />
        <view style="padding-top:88rpx">
            <statusbar />
        </view>
        <view class="goodsContainer" v-if="isGoods">
            <image class="good-image" src="" mode="aspectFill" />
            <view class="good-message">
                <view class="good-name">
                    20-21 篮球 panini prizm prizm prizm panini prizm prizm ...20-21 篮球 panini prizm prizm prizm panini
                    prizm prizm ...20-21 篮球 panini prizm prizm prizm panini prizm prizm ...
                </view>
                <view class="good-cumulative">累计使用<text>333</text>元(包含店铺通用券500元）</view>
            </view>
        </view>
        <u-sticky :offsetTop="app.statusBarHeight+44">
            <view class="tagContainr" :class="{whiteTagContainer:!isGoods}">
                <view class="tag" :class="{selectTag:index==tag.index}" v-for="(item,index) in tag.list">{{item.label}}
                </view>
            </view>
        </u-sticky>
        <view class="couponItem" v-for="(item, index) in 20" :key="index">
            <view class="couponItem-top">
                <view class="coupon-name">满50减20元</view>
                <view style="flex:1">
                    <view class="coupon-type flexCenter">兑换码</view>
                </view>
                <view class="rightPoint" @click.stop="onClickRightMenu(item,index)">
                    <view class="rightMenu" :class="{showRightMenu:index==clickTagIndex}">
                        <view class="menuTag flexCenter">再次创建</view>
                    </view>
                </view>
            </view>
            <view class="couponItem-message">可领取/有效期60天/总数333/已领200/使用150</view>
            <view class="couponItem-bottom">
                领取方式：jds4dsw8dsd657sadf
                <image src="../../static/merchant/copy.png" mode="scaleToFill" />
            </view>
        </view>
        <merchantCoupon :showDrawer.sync="createCouponShow" />
        <statusbar />
    </view>
</template>

<script lang="ts">
    interface Tag {
        index: number;
        list: Array<ListItem>;
    }
    interface ListItem {
        label: string;
    }
    import { app } from "@/app";
    import { Component, Watch } from "vue-property-decorator";
    import BaseNode from "../../base/BaseNode.vue";
    import { parsePic } from "@/tools/util";
    @Component({})
    export default class ClassName extends BaseNode {
        parsePic: any = parsePic;
        app: any = app;
        isGoods: boolean = true;
        tag: Tag = {
            index: 0,
            list: [{ label: "全部" }, { label: "线上优惠券" }, { label: "兑换码" }]
        };
        clickTagIndex:number=-1;
        createCouponShow: boolean = false;
        onLoad() {

        }
        onClickRightMenu(item:any,index:number){
            if(this.clickTagIndex===index){
                this.clickTagIndex=-1
                return
            }
            this.clickTagIndex=index
        }
        onOffLineClick() {
            uni.showModal({
                title: "提示",
                content: "是否下线该优惠券?",
                success: ({ confirm, cancel }) => {
                    confirm && this.offLineAction();
                }
            });
        }
        offLineAction() {
            console.log("下线");
        }
        setClipboardData(data: string) {
            uni.setClipboardData({
                data
            });
        }
        onClickRightText() {
            this.createCouponShow = true;
        }
    }
</script>

<style lang="scss">
    page {
        background: #f5f6fd;
    }

    .goodsContainer {
        width: 750rpx;
        height: 211rpx;
        background: #FFFFFF;
        box-sizing: border-box;
        padding: 36rpx 40rpx 23rpx 36rpx;
        display: flex;
        align-items: center;

        .good-image {
            width: 197rpx;
            height: 152rpx;
            background: #333333;
            border-radius: 3rpx;
            margin-right: 21rpx;
        }

        .good-message {
            flex: 1;
        }

        .good-name {
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
            /* background-color: red; */
            height: 70rpx;
            -webkit-box-orient: vertical;
            margin-bottom: 41rpx;
        }

        .good-cumulative {
            font-size: 23rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #88878C;

            text {
                color: #f02e69;
                font-size: 25rpx;
            }
        }
    }

    .tagContainr {
        width: 750rpx;
        height: 80rpx;
        /* background-color: #fff; */
        box-sizing: border-box;
        display: flex;
        align-items: center;

        .tag {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #959699;
            width: 33.33%;
            text-align: center;
        }

        .selectTag {
            font-size: 31rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
        }
    }

    .whiteTagContainer {
        background-color: #fff;

    }

    .couponItem {
        width: 722rpx;
        height: 177rpx;
        background: #FFFFFF;
        border-radius: 5rpx;
        margin-top: 14rpx;
        box-sizing: border-box;
        padding: 26rpx 26rpx 0rpx 22rpx;
    }

    .couponItem-top {
        width: 100%;
        display: flex;
        position: relative;
        align-items: center;

        .coupon-name {
            font-size: 27rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            margin-right: 17rpx;
        }

        .coupon-type {
            width: 88rpx;
            height: 29rpx;
            background: #EA424A;
            border-radius: 3rpx;
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            width: 88rpx;
        }

        .rightPoint {
            width: 28rpx;
            height: 6rpx;
            position: relative;
            background-size: 100% 100%;
            background-image: url(../../static/merchant/point.png);
            
        }

        .rightMenu {
            width: 117rpx;
            background: #FFFFFF;
            box-shadow: 0rpx 1rpx 8rpx 0rpx #CDCCCC;
            text-align: center;
            position: absolute;right: -20rpx;
            top: 20rpx;
            transform: scale(0);
            pointer-events: none;
            transition: all 0.2s;
            .menuTag {
                width: 100%;
                height: 53rpx;
                font-size: 23rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #333333;
            }
        }
        .showRightMenu{
            transform: scale(1);
            pointer-events: auto;
        }
    }

    .couponItem-message {
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #88878C;
        margin-top: 16rpx;
    }

    .couponItem-bottom {
        display: flex;
        align-items: center;
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-top: 20rpx;

        image {
            width: 23rpx;
            height: 25rpx;
            margin-left: 11rpx;
        }
    }
</style>