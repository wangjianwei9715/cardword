<template>
    <view class="content">
        <transitionNav ref='transitionNav' :transition="false" :needIconShadow="false" title="发货详情">
        </transitionNav>
        <view class="topSearchContainer">
            <view class="nav" :style="{ height: navHeight + 'px' }"></view>
            <view class="topMenu" :class="{topMenu_three:queryParams.isDetail==1}">
                <view class="menuItem" :class="{ menuItem_select: queryParams.tp == 1 }" @click="onClickMenuItem(1)">
                    待发货
                    <text class="smallNum">{{numInfo.waitDeliveryNum}}</text>
                </view>
                <view class="menuItem" :class="{ menuItem_select: queryParams.tp == 2 }" @click="onClickMenuItem(2)">
                    已发货
                    <text class="smallNum">{{queryParams.isDetail!=1?numInfo.waitReceiveNum+numInfo.doneNum:numInfo.waitReceiveNum}}</text>
                </view>
                <view class="menuItem" v-if="queryParams.isDetail==1" :class="{ menuItem_select: queryParams.tp == 3 }" @click="onClickMenuItem(3)">
                    已完成
                    <text class="smallNum">{{numInfo.doneNum}}</text>
                </view>
            </view>
        </view>
        <view class="nav" :style="{ height: navHeight + 'px' }"></view>
        <view class="fakerTop"></view>
        <view class="deliveyCard" v-for="(item, index) in list" :key="index">
            <view class="card_top uni-flex jb alc">
                <view class="userName">
                    {{ item.userName }}
                </view>
            </view>
            <view class="card_order" v-for="(order) in item.orderList">
                <view class="uni-flex jb alc">
                    <view class="order">
                        订单号:{{ order.code }}
                    </view>
                    <view class="hitNum">
                        (共{{ order.hitNum }}张)
                    </view>
                </view>
                <view class="card_noItem uni-flex" v-for="(no) in order.hitNoList">
                    <view class="picWrap">
                        <muqian-lazyLoad v-if="no.pics && no.pics.length" class="pic"
                            :src="$parsePic(no.pics[0])"></muqian-lazyLoad>
                        <view class="picNum" v-if="no.pics && no.pics.length > 1">{{ no.pics.length }}</view>
                    </view>
                    <view class="noName u-line-3">{{ no.name }}</view>
                </view>
            </view>
            <view class="loadMoreOrder" @click="onClickMoreOrder(item)"
                v-if="queryParams.merge && item.orderList && item.orderList.length < item.totalOrder">
                加载更多订单
            </view>
            <view class="addressWrap uni-flex alc jb">
                <view class="address ">
                    {{ item.receiverInfo.address }}
                </view>
                <view class="copy" @click="onClickCopy(item)">复制</view>
            </view>
            <view class="addressWrap uni-flex alc jb">
                <view class="address ">
                    {{ item.receiverInfo.name + " " + item.receiverInfo.phone }}
                </view>
            </view>
            <view class="wuliuWrap">
                <view class="wuliu_item">
                    <view class="label">物流信息：</view>
                    <view class="input" @click="onClickItemWuliu(item)">
                        <text class="gray"
                            v-if="!item.ziti && !item.wuliuCompanyId && !defaultWuliuCompanyId">待选择</text>
                        <text v-else>{{ wuliuCompanyTxt(item) }}</text>
                    </view>
                    <view class="right_label" v-if="queryParams.tp==1" @click="onClickSetZiti(item)">{{ item.ziti ? "取消自提" : "设置自提" }}</view>
                </view>
                <view class="wuliu_item">
                    <view class="label">单号信息：</view>
                    <view class="input">
                        <view v-if="item.ziti">已设置自提</view>
                        <input v-else placeholder="待填写" :disabled="queryParams.tp == 2" v-model="item.wuliuNo"></input>
                    </view>
                    <view class="right_label" v-if="queryParams.tp == 1">扫码</view>
                </view>
            </view>
            <view class="confirmBtn" v-if="queryParams.tp == 1" @click="onClickSubmit(item)">确认发货信息</view>
        </view>
        <view class="fake" style="height: 200rpx;"></view>
        <view class="bottomAction">
            <view class="actionWrap uni-flex">
                <view class="btn btn_white" @click="companySelectShow = true">默认物流</view>
                <view class="btn" @click="onClickMerge">{{ queryParams.merge == 0 ? '一键合并重复买家' : '一键取消合并重复买家' }}</view>
            </view>
            <view class="bottomSafeArea"></view>
        </view>
        <u-picker :show="companySelectShow" :columns="[companyList]" :closeOnClickOverlay="true" keyName="name"
            @cancel="companySelectShow = false, nowSelect = null" @close="nowSelect = null"
            @confirm="onClickSelect($event)"></u-picker>
        <view class="bottomSafeArea"></view>

    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
const navHeight = app.statusBarHeight + uni.upx2px(88)
@Component({})
export default class ClassName extends BaseNode {
    queryParams: any = {
        pageIndex: 1,
        pageSize: 10,
        codes: "",
        tp: 1,
        merge: 0,
        isDetail:0
    }
    defaultWuliuCompanyId: number = 0
    navHeight = navHeight
    list: any = []
    totalPage: number = 0
    companyList: any = []
    companySelectShow: boolean = false
    nowSelect: any = null
    isDetail:boolean=false
    numInfo:any={}
    onLoad(query: any) {
        this.queryParams.codes = query.codes
        this.queryParams.merge = +query.merge
        if(query.isDetail&&+query.isDetail==1){
            this.queryParams.isDetail=1
            this.queryParams.tp=2
        }
        this.reqNewData()
        this.reqWuliuCompany()
        this.reqNumData()
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
    wuliuCompanyTxt(item: any): string {
        if (item.ziti) {
            return "自提"
        }
        if (item.wuliuCompanyId <= 0 && this.defaultWuliuCompanyId == 0) {
            return ""
        }
        const id = item.wuliuCompanyId || this.defaultWuliuCompanyId
        const findItem: any = this.companyList.find((v: any) => {
            return v.id == id
        })
        return findItem.name || ""
    }
    onClickMenuItem(tp: number) {
        if (tp == this.queryParams.tp) {
            return
        }
        this.queryParams.tp = tp
        this.queryParams.pageIndex = 1
        this.reqNewData()
    }
    onClickMoreOrder(item: any) {
        const lastCode = item.orderList[item.orderList.length - 1].code
        app.http.Get(`dataApi/merchant/delivery/more/orders/list`, { tp: this.queryParams.tp, codes: this.queryParams.codes, lastCode, pageSize: 10 }, (res: any) => {
            const list = res.list || []
            item.orderList.push(...list)
        })
    }
    onClickItemWuliu(item: any) {
        if (item.ziti) return
        this.nowSelect = item
        this.companySelectShow = true
    }
    onClickSetZiti(item: any) {
        item.ziti = !item.ziti
    }
    onClickCopy(item:any){
        uni.setClipboardData({
            data:`${item.receiverInfo.address}\r${item.receiverInfo.name} ${item.receiverInfo.phone}`,
            success:()=>{
                uni.showToast({
                    title:"已复制",
                    icon:"none"
                })
            }
        })
    }
    onClickSubmit(item: any) {
        if (!item.ziti) {
            if (!item.wuliuCompanyId) {
                uni.showToast({
                    title: "请选择物流公司",
                    icon: "none"
                })
                return
            }
            if (!item.wuliuNo) {
                uni.showToast({
                    title: "请填写物流单号",
                    icon: "none"
                })
                return
            }
        }
        uni.showModal({
            title: "提示",
            content: "确认发货?",
            success: (res: any) => {
                if (res.confirm) {
                    this.pushApi(item)
                }
            }
        })
    }
    pushApi(item: any) {
        const data: any = {
            codes: this.queryParams.codes,
            wuliuCompanyId: item.wuliuCompanyId || this.defaultWuliuCompanyId,
            no: item.wuliuNo,
            ziti: item.ziti,
            receiverInfo:item.receiverInfo,
            userId: item.userId
        }
        app.http.Post(`merchant/delivery/push`, data, (res: any) => {
            uni.showToast({
                title: "操作成功"
            })
            this.reqNewData()
            this.reqNumData()
        })
    }
    onClickSelect(event: any) {
        if (this.nowSelect == null) {
            this.defaultWuliuCompanyId = event.value[0].id
        } else {
            this.nowSelect.wuliuCompanyId = event.value[0].id
        }
        this.nowSelect = null
        this.companySelectShow = false
    }
    onClickMerge() {
        this.queryParams.pageIndex = 1
        this.queryParams.merge = this.queryParams.merge == 0 ? 1 : 0
        this.reqNewData()
        this.reqNumData()
    }
    reqNumData(){
        app.http.Get(`dataApi/merchant/delivery/more/goods/num`,{codes:this.queryParams.codes,merge:this.queryParams.merge},(res:any)=>{
            this.numInfo=res.data
        })
    }
    reqWuliuCompany() {
        app.http.Get(`dataApi/config/wuliu`, {}, (res: any) => {
            this.companyList = res.list
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/merchant/delivery/more/goods/list`, this.queryParams, (res: any) => {
            const list = res.list || []
            this.totalPage = res.totalPage
            this.queryParams.pageIndex == 1 ? this.list = list : this.list.push(...list)
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #F7F7F7;
}

.jb {
    justify-content: space-between;
}

.alc {
    align-items: center;
}

.deliveyCard {
    box-sizing: border-box;
    width: 710rpx;
    background-color: #ffffff;
    padding: 0 20rpx;
    margin-top: 20rpx;
    padding-bottom: 28rpx;

    .card_top {
        margin-top: 24rpx;
        width: 100%;
        padding-bottom: 24rpx;
        border-bottom: 2rpx solid #F0F0F0;

        .userName {
            font-weight: bold;
            font-size: 28rpx;
            color: #333333;
        }
    }

    .card_order {
        margin-top: 18rpx;
        width: 100%;
        padding-bottom: 24rpx;
        border-bottom: 2rpx solid #F0F0F0;

        .order {
            font-weight: 400;
            font-size: 24rpx;
            color: #333333;
        }

        .hitNum {
            font-weight: 400;
            font-size: 24rpx;
            color: #FA1545;
        }
    }

    .card_noItem {
        margin-top: 16rpx;

        .picWrap {
            width: 80rpx;
            height: 110rpx;
            position: relative;

            margin-right: 20rpx;

            .pic {
                width: 80rpx;
                height: 110rpx;
            }

            .picNum {
                position: absolute;
                width: 24rpx;
                height: 24rpx;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 3rpx;
                font-weight: 400;
                font-size: 20rpx;
                color: #FFFFFF;
                right: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        .noName {
            font-weight: 400;
            font-size: 24rpx;
            color: rgba(0, 0, 0, 0.9);
            line-height: 34rpx;
        }
    }

    .addressWrap {
        margin-top: 20rpx;

        .address {
            font-weight: bold;
            font-size: 24rpx;
            color: #333333;
        }

        .copy {
            font-weight: 400;
            font-size: 24rpx;
            color: #0091FF;
        }
    }

    .loadMoreOrder {
        color: #2791fc;
        text-align: center;
        margin-top: 20rpx;
        width: 100%;
    }

    .wuliuWrap {
        width: 670rpx;
        height: 124rpx;
        background: #F6F7F9;
        border-radius: 3rpx;
        box-sizing: border-box;
        padding: 20rpx 16rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 20rpx;

        .wuliu_item {
            display: flex;
            align-items: center;

            .label {
                font-weight: 400;
                font-size: 24rpx;
                color: #333333;
            }

            .input {
                flex: 1;
                font-size: 24rpx;

                .gray {
                    color: #babdc7;
                }

                input {
                    font-size: 24rpx;
                }
            }

            .right_label {
                font-weight: 400;
                font-size: 24rpx;
                color: #0091FF;
            }
        }
    }

    .confirmBtn {
        font-weight: bold;
        font-size: 28rpx;
        color: #FFFFFF;
        letter-spacing: 2rpx;
        margin-top: 24rpx;
        width: 670rpx;
        height: 72rpx;
        background: #FA1545;
        border-radius: 5rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.bottomAction {
    background-color: #ffffff;
    width: 750rpx;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    padding: 0 32rpx;
    padding-top: 34rpx;

    .actionWrap {
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20rpx;

        .num {
            font-family: PingFangSC, PingFang SC;
            font-weight: 400;
            font-size: 24rpx;
            color: #333333;
        }

        .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: PingFangSC, PingFang SC;
            font-weight: bold;
            font-size: 32rpx;
            color: #FFFFFF;
            width: 470rpx;
            height: 84rpx;
            background-color: #FA1545;
            border-radius: 4rpx;
        }

        .btn_white {
            width: 196rpx;
            height: 84rpx;
            border-radius: 5rpx;
            border: 2rpx solid #E0E0E0;
            font-weight: bold;
            font-size: 32rpx;
            color: #333333;
            background-color: #ffffff
        }
    }
}

.topSearchContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    width: 750rpx;
    padding-top: 14rpx;
    position: fixed;
    top: 0;
    z-index: 2;

    .searchWrap {
        width: 710rpx;
        height: 72rpx;
        background: #F6F6F6;
        border-radius: 5rpx;
        display: flex;
        align-items: center;

        .searchTypeName {
            font-family: PingFangSC, PingFang SC;
            font-weight: 500;
            font-size: 24rpx;
            color: #333333;
            // line-height: 34rpx;
            text-align: center;
            font-style: normal;
            margin-left: 20rpx;
        }

        .searchIcon {
            width: 16rpx;
            height: 12rpx;
            margin-left: 4rpx;
        }

        .gap {
            width: 2rpx;
            height: 36rpx;
            background-color: #DDDDDD;
            // border: 2rpx solid #DDDDDD;
            margin-left: 10rpx;
            margin-right: 16rpx;
        }

        .searchInput {
            flex: 1;
            margin-right: 20rpx;
            font-size: 24rpx;
            color: #333333;
        }
    }
}

.fakerTop {
    height: 100rpx;
}

.topMenu {
    display: flex;
    align-items: center;
    height: 90rpx;
    justify-content: space-between;
    width: 750rpx;
    box-sizing: border-box;
    padding:0 100rpx;
    background-color: #ffffff;
    border-bottom: 2rpx solid #f7f7f7;

    .menuItem {
        width: 180rpx;
        text-align: center;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 28rpx;
        color: #bfbfbf;
        text-align: center;
        font-style: normal;
        position: relative;
        height: 90rpx;
        line-height: 90rpx;
        // margin-right: 100rpx;
    }
    .smallNum{
        font-size:20rpx;
        margin-left:4rpx;
        // position:absolute;
        // right:0;
        // top:0;
    }
    .menuItem_select {
        color: #FA1545;
    }

    .menuItem_select::after {
        content: "";
        width: 180rpx;
        height: 2rpx;
        background: #FA1545;
        position: absolute;
        bottom: 0;
        left: 0;
    }
}
.topMenu_three{
    padding: 0 60rpx;
}
</style>
