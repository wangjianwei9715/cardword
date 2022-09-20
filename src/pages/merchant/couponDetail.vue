<template>
    <view class='content' @click="clickTagIndex=-1">
        <navigationShare :navigatetoTitle="goodCode?'指定商品券':'店铺通用券'" rightText='新建'
            @onClickRightText="onClickRightText" />
        <view style="padding-top:88rpx">
            <statusbar />
        </view>
        <view class="goodsContainer" v-if="goodCode">
            <image class="good-image" :src="parsePic(decodeURIComponent(logo))" mode="aspectFill" />
            <view class="good-message">
                <view class="good-name">
                    {{goodName}}
                </view>
                <view class="good-cumulative">累计使用<text>{{totalCouponMoney}}</text>元
                <template v-if="merchantCouponMoney">
                    (包含店铺通用券{{merchantCouponMoney}}元)
                </template>
                </view>
            </view>
        </view>
        <view class="tagContainr" :class="{whiteTagContainer:!goodCode}">
            <view class="tag" :class="{selectTag:index==tag.index}" v-for="(item,index) in tag.list"
                @click="onClickTagChange(item,index)">{{item.label}}
            </view>
        </view>
        <view class="couponItem" v-for="(item, index) in couponList" :key="index">
            <view class="couponItem-top">
                <view class="coupon-name">{{item.name}}</view>
                <view style="flex:1">
                    <view class="coupon-type flexCenter" :class="{greenType:item.getTp==1}">{{item.getTp==1?"线上":"兑换码"}}
                    </view>
                </view>
                <view class="rightPoint" @click.stop="onClickRightMenu(item,index)">
                    <view class="rightMenu" :class="{showRightMenu:index==clickTagIndex}">
                        <view class="menuTag flexCenter" @click.stop="onClickAgainCreate(item)">再次创建</view>
                        <view v-if="item.stateName=='可领取'" class="menuTag flexCenter" @click.stop="onOffLineClick(item)">下线</view>
                    </view>
                </view>
            </view>
            <view class="couponItem-message">
                {{item.stateName}}/有效期{{item.lifeSec}}天/总数{{item.maxNum}}/已领{{item.distribute_num}}/使用{{item.use_num}}
            </view>
            <view class="couponItem-bottom" v-if="item.stateName=='可领取'">
                领取方式：{{item.getTp==1?"店铺或商品详情页":(item.couponCode+(item.couponCodeNum>1?`等${item.couponCodeNum}条`:''))}}
                <image v-if="item.getTp==2" @click="onClickCopy(item)" src="../../static/merchant/copy.png"
                    mode="scaleToFill" />
            </view>
            <view class="couponItem-bottom" v-else>
                {{item.stateName}}
            </view>
        </view>
        <merchantCoupon :showDrawer.sync="createCouponShow" @success="couponCreateSuccess" :goodCode='goodCode' ref='merchantCoupon' />
        <empty v-if='!couponList.length'/>
        <statusbar />
    </view>
</template>

<script lang="ts">
    import { app } from "@/app";
    import { Component, Watch } from "vue-property-decorator";
    import BaseNode from "../../base/BaseNode.vue";
    import { parsePic } from "@/tools/util";
    @Component({})
    export default class ClassName extends BaseNode {
        parsePic: any = parsePic;
        app: any = app;
        isGoods: boolean = true;
        merchantCouponMoney: number = 0;
        totalCouponMoney: number = 0
        goodCode: any = ""
        logo: string = ""
        goodName: string = ""
        tag: any = {
            index: 0,
            list: [{ label: "全部", value: 100 }, { label: "线上优惠券", value: 1 }, { label: "兑换码", value: 2 }]
        };
        couponList: any = []
        totalPage: number = 0
        clickTagIndex: number = -1;
        createCouponShow: boolean = false;
        queryParams: any = {
            pageIndex: 1,
            pageSize: 15,
            tp: 100
        }
        onLoad(query: any) {
            if (query.goodCode) {
                this.goodCode = query.goodCode
                this.logo = query.logo
                this.goodName = query.goodName
            }
            if(query.totalCouponMoney){
                this.totalCouponMoney=Number(query.totalCouponMoney)
            }
            if(query.merchantCouponMoney){
                this.merchantCouponMoney=Number(query.merchantCouponMoney)
            }
            this.reqNewData()

        }
        onReachBottom() {
            if (this.queryParams.pageIndex < this.totalPage) {
                this.queryParams.pageIndex += 1
                this.reqNewData()
            }
        }
        onPullDownRefresh() {
            this.queryParams.pageIndex = 1
            this.reqNewData(() => {
                uni.stopPullDownRefresh()
            })
        }
        couponCreateSuccess(){
            this.queryParams.pageIndex=1
            this.reqNewData()
            this.clickTagIndex=-1
        }
        onClickRightMenu(item: any, index: number) {
            if (this.clickTagIndex === index) {
                this.clickTagIndex = -1
                return
            }
            this.clickTagIndex = index
        }
        onOffLineClick(item:any) {
            uni.showModal({
                title: "提示",
                content: "是否下线该优惠券?",
                success: ({ confirm, cancel }) => {
                    confirm && this.offLineAction(item);
                    this.clickTagIndex=-1
                }
            });
        }
        onClickTagChange(item: any, index: number) {
            if (this.tag.index == index) return
            this.tag.index = index
            this.queryParams.pageIndex = 1
            this.queryParams.tp = item.value
            this.reqNewData()
        }
        offLineAction(item:any) {
            console.log("下线");
            app.http.Post(`me/shop/good/coupon/cate/putoff/`+item.id,{},(res:any)=>{
                console.log('成功');
                uni.showToast({
                    title:'操作成功',
                    icon:'success'
                })
                this.queryParams.pageIndex=1
                this.reqNewData()
            })
        }
        onClickCopy(item: any) {
            if (item.couponCode && item.couponCodeNum == 1) {
                this.setClipboardData(item.couponCode,'复制成功')
            }
            if (item.couponCode && item.couponCodeNum > 1) {
                app.http.Get(`dataApi/me/shop/get/goodCoupon/${item.id}/code/list`, {}, (res: any) => {
                    console.log(res);
                    const boardString = res.list.join('，')
                    this.setClipboardData(boardString, `已复制${item.couponCodeNum}条卡密`)
                })
            }
        }
        setClipboardData(data: string, msg?: string) {
            uni.setClipboardData({
                data,
                showToast: msg ? true : false,
                success: (res: any) => {
                    if (!msg) return
                    uni.showToast({
                        title: msg
                    })
                }
            });
        }
        onClickAgainCreate(item: any) {
            this.createCouponShow = true
            setTimeout(() => {
                this.$refs.merchantCoupon.couponData = {
                    goodCode: this.goodCode,
                    amount: item.amount,
                    minUseAmount: item.minUseAmount,
                    maxNum: item.maxNum,
                    lifeTime: item.lifeSec,
                    getTp: item.getTp,
                    exchangeCodeTp: item.exchangeCodeTp
                }
            }, 50)
            //填入数据
        }
        onClickRightText() {
            this.createCouponShow = true;
        }
        reqNewData(cb?: any) {
            // const requestUrl=
            const goodsUrl = `dataApi/me/shop/goodCoupon/${this.goodCode}/detail/list`
            const merchantUrl = `dataApi/me/shop/merchantCoupon/detail/list`
            app.http.Get(this.goodCode ? goodsUrl : merchantUrl, this.queryParams, (res: any) => {
                console.log(res);
                // if(this.goodCode)this.totalCouponMoney = res.totalCouponMoney
                this.totalPage = res.totalPage
                const list = res.list || []
                this.queryParams.pageIndex == 1 ? this.couponList = list : this.couponList.push(...list)
                cb && cb()
            })
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

        .greenType {
            background: #59CB7F;
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
            position: absolute;
            right: -20rpx;
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

        .showRightMenu {
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