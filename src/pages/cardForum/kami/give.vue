<template>
    <view class="content">
        <template v-for="(item, index) in list">
            <view class="kamiWrap" v-for="kami in item.noList">
                <view class="kamiPrice">
                    <view class="price">卡密单价:
                        <text style="font-weight: bold;margin-left: 8rpx;">￥{{ item.unitPrice }}</text>
                    </view>
                    <view class="original" @click="onClickOrder(item)">订单 ></view>
                </view>
                <view class="kamiNameWrap" @click="onClickSelect(kami)">
                    <view class="name">{{ kami.name }}</view>
                    <view class="select" :class="{ select_select: selectIds.includes(kami.id) }"></view>
                </view>
            </view>
            <view style="margin: 20rpx auto;font-size: 26rpx;" v-if="item.hasMore" @click="onClickGetMore(item)">点击加载更多
            </view>
        </template>
        <view class="fixedWrap">
            <view class="contentWrap">
                <view class="userInfoWrap">
                    <view class="To">To:</view>
                    <image class="avatar" :src="$parsePic(decodeURIComponent(receiveInfo.avatar || app.defaultAvatar))">
                    </image>
                    <view class="userName">{{ receiveInfo.userName || "小卡迷" }}</view>
                    <view class="userId">({{ receiveInfo.userId || "未知用户id" }})</view>
                    <view class="flex1"></view>
                    <view class="selectNum">
                        已选
                        <text class="bigNum">{{ selectIds.length }}</text>
                        条
                    </view>
                </view>
                <view class="submit flexCenter" @click="$u.throttle(onClickSubmit, 1000)">立即赠送</view>
                <view class="tips">表达赞赏/认同/鼓励，赠送后发放至作者账户且不可退回</view>
            </view>
            <view class="bottomSafeArea"></view>
        </view>
        <view class="bottomSafeArea" style="height:328rpx"></view>
        <u-overlay :show="showGive">
            <view class="giveModal" :class="{ giveModal_show: showGive }">
                <view class="title">提示</view>
                <view class="tips">确认赠送{{ selectIds.length }}条卡密</view>
                <view class="userWrap">
                    <view class="to">To:</view>
                    <image class="avatar" :src="$parsePic(decodeURIComponent(receiveInfo.avatar || app.defaultAvatar))">
                    </image>
                    <view class="userName">{{ receiveInfo.userName || "小卡迷" }}</view>
                </view>
                <view class="bottomWrap">
                    <view class="submit submit_cancel flexCenter" @click="showGive = false">先不了</view>
                    <view class="submit flexCenter" @click="give">确认赠送</view>
                </view>
            </view>
        </u-overlay>

        <empty v-if="!list || !list.length"></empty>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import CardForum from "../interface/public";
import { Md5 } from 'ts-md5';
interface ReceiveInfo extends CardForum.RewardUserInfo {
    /**商品编号 */
    goodCode: string
}
interface Kami {
    /**卡密名称 */
    name: string
    /**卡密编号 */
    id: number
    /**卡密单价 */
    price: number
    /**订单编号 */
    orderCode: string
    /**是否选中 */
    // isSelect: boolean
}
interface KamiGiveData {
    /**商品编号 */
    goodCode: string
    /**卡密ids */
    noId: Array<number>
    /**时间戳 */
    ts: number
    /**签名 */
    sign: string
    userId: number;
}
@Component({})
export default class ClassName extends BaseNode {
    app = app
    queryParams: any = {
        pageIndex: 1,
        pageSize: 20,
        leadGoodOrderCode: ""
    }
    list: Array<any> = []
    selectIds: Array<number> = []
    totalPage: number = 0
    receiveInfo: ReceiveInfo | any = {}
    showGive: boolean = false
    code: string = ""
    onLoad(query: any) {
        this.code = query.code
        this.queryParams.leadGoodOrderCode = query.leadGoodOrderCode

        //@ts-ignore
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('receiveInfo', (data: ReceiveInfo) => {
            if (data) {
                this.receiveInfo = data
                this.reqNewData()
            }
            console.log(this.receiveInfo);
        })
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
    onClickOrder(item: Kami) {
        uni.navigateTo({
            url: "/pages/userinfo/order_details?code=" + item.orderCode
        })
    }
    onClickSelect(kami: any) {
        const index: number = this.selectIds.findIndex((id: number) => {
            return id == kami.id
        })
        if (index >= 0) {
            this.selectIds.splice(index, 1)
        } else {
            this.selectIds.push(kami.id)
        }
    }
    onClickSubmit() {
        // if (!this.receiveInfo.userId) {
        //     uni.showToast({
        //         title: "未知用户id",
        //         icon: "none"
        //     })
        //     return
        // }
        if (!this.selectIds.length) {
            uni.showToast({
                title: "请选择赠送的卡密",
                icon: "none"
            })
            return
        }
        this.showGive = true
    }
    onClickGetMore(item: any) {
        item.queryParams.pageIndex += 1
        app.http.Get(`dataApi/function/userNo/transfer/order/${item.orderCode}/list`, item.queryParams, (res: any) => {
            if (res.totalPage == item.queryParams.pageIndex) item.hasMore = false
            item.noList.push(...(res.list || []))
        })
    }
    give() {
        uni.showLoading({
            title: "",
            mask: true
        })
        const ts: number = Math.round(+new Date() / 1000)
        const data: KamiGiveData = {
            goodCode: this.receiveInfo.goodCode,
            noId: this.selectIds,
            ts,
            userId: this.receiveInfo.userId,
            sign: Md5.hashStr(`applyTransfer_${ts}_${this.receiveInfo.goodCode}_${this.selectIds.join(",")}_${this.receiveInfo.userId}`)
        }
        app.http.Post(`cardCircle/userNo/transfer/applyBatch/${this.code}`, data, (res: any) => {
            uni.hideLoading()
            uni.showToast({
                title: "赠送成功"
            })
            app.platform.UINotificationFeedBack("success")
            this.showGive = false
            this.queryParams.pageIndex = 1
            this.selectIds = []
            setTimeout(() => {
                this.reqNewData()
            }, 500)
        }, (err: any) => {
            uni.hideLoading()
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/function/userNo/transfer/good/${this.receiveInfo.goodCode}/list`, this.queryParams, (res: any) => {
            const list = (res.list || []).map((item: any) => {
                return {
                    ...item,
                    queryParams: {
                        pageIndex: 1,
                        pageSize: 10
                    }
                }
            })
            console.log(list);

            this.totalPage = res.totalPage
            this.queryParams.pageIndex == 1 ? this.list = list : this.list.push(...list)
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #f2f2f2;
}

.fixedWrap {
    background-color: #fff;
    position: fixed;
    z-index: 999;
    bottom: 0;

    .contentWrap {
        width: 750rpx;
        height: 288rpx;
        box-sizing: border-box;
        padding: 0 20rpx;
    }

    .userInfoWrap {
        display: flex;
        align-items: center;
        // padding: 0rpx 20rpx;
        padding-top: 40rpx;

        .To {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
        }

        // margin-top: 40rpx;
        .avatar {
            width: 52rpx;
            height: 52rpx;
            border-radius: 50%;
            margin: 0 10rpx;
        }

        .userName {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #333333;
            margin-right: 10rpx;
        }

        .userId {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #959695;
        }

        .selectNum {
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
        }

        .flex1 {
            flex: 1;
        }

        .bigNum {
            font-size: 24rpx;
            font-weight: bold;
        }
    }

    .submit {
        width: 100%;
        color: #fff;
        font-weight: bold;
        margin-top: 23rpx;
        height: 92rpx;
        background: #FA1545;
        border-radius: 5rpx;
        font-size: 33rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #FFFFFF;
    }

    .tips {
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #C0C0C0;
        margin-top: 22rpx;
        text-align: center;

    }
}

.kamiWrap {
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 30rpx;
    margin-top: 35rpx;
}

.kamiPrice {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10rpx;

    .price,
    .original {
        font-size: 21rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #707070;
    }
}

.kamiNameWrap {
    background-color: #fff;

    display: flex;
    align-items: center;
    justify-content: space-between;
    // width: 710px;
    height: 152rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    padding: 30rpx 25rpx;
    box-sizing: border-box;

    .name {
        // height: 90px;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #707070;
        line-height: 33rpx;
        flex: 1;
    }

    .select {
        width: 47rpx;
        height: 47rpx;
        border: 1rpx solid #959695;
        border-radius: 50%;
        margin-left: 65rpx;
    }

    .select_select {
        background-image: url("@/static/cardForum/kamiCheck.png");
        background-size: 100% 100%;
        border: none;

    }

    // .select_none {
    //     width: 47prx;
    //     height: 47rpx;

    // }
}

.giveModal {
    width: 500rpx;
    // height: 400rpx;
    background-color: #fff;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 350rpx;
    z-index: 10076;
    // box-sizing: border-box;
    transform: scale(0);
    transition: transform 0.2s;
    pointer-events: none;
    border-radius: 3rpx;
    box-sizing: border-box;
    padding-top: 30rpx;
    padding-bottom: 40rpx;

    .title {
        color: #000;
        text-align: center;
        font-weight: bold;
    }

    .tips {
        text-align: center;
        margin-top: 10rpx;
    }

    .userWrap {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30rpx;

        .avatar {
            width: 50rpx;
            height: 50rpx;
            background-color: #000;
            border-radius: 50%;
            margin: 0 20rpx;
        }

        .userName {
            color: #000;
        }
    }

    .bottomWrap {
        display: flex;
        padding: 0 30rpx;
        justify-content: space-between;
        align-items: center;
        margin-top: 30rpx;

        .submit {
            width: 200rpx;
            height: 60rpx;
            color: #fff;
            background-color: #ff003d;
            border: 1rpx solid #ff003d;
        }

        .submit_cancel {
            background-color: #fff;
            border: 1rpx solid #d7d7d7;
            color: #000;
        }
    }
}

.giveModal_show {
    transform: scale(1);
    pointer-events: auto;
}
</style>
