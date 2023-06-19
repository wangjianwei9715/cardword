<template>
    <view class="content">
        <view class="kamiWrap" v-for="(item, index) in list">
            <view class="kamiPrice">
                <view class="price">卡密单价:￥{{ item.price }}</view>
                <view class="original" @click="onClickOrder(item)">订单></view>
            </view>
            <view class="kamiNameWrap" @click="onClickSelect(item)">
                <view class="name">{{ item.name }}</view>
                <view class="select_none" :class="{ select: selectIds.includes(item.id) }"></view>
            </view>
        </view>
        <view class="fixedWrap">
            <view class="contentWrap">
                <view class="userInfoWrap">
                    <view class="To">To:</view>
                    <image class="avatar" :src="receiveInfo.avatar || app.defaultAvatar"></image>
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
        <u-overlay :show="showGive">
            <view class="giveModal">
                <view class="title">提示</view>
                <view class="tips">确认赠送{{ selectIds.length }}条卡密</view>
                <view class="userWrap">
                    <view class="to">To:</view>
                    <image class="avatar"></image>
                    <view class="userName">{{ receiveInfo.userName || "小卡迷" }}</view>
                </view>
                <view class="bottomWrap">
                    <view class="submit submit_cancel flexCenter" @click="showGive = false">先不了</view>
                    <view class="submit flexCenter" @click="$u.throttle(give, 1000)">确认赠送</view>
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
}
@Component({})
export default class ClassName extends BaseNode {
    app = app
    queryParams: any = {
        pageIndex: 1,
        pageSize: 20
    }
    list: Array<Kami> = [{
        name: "mock卡密名称卡密名称卡密名称卡密名称卡密名称卡密名称卡密名称卡密名称卡密名称卡密",
        id: 1,
        price: 1,
        orderCode: "2",
        // isSelect: false
    },
    {
        name: "mock卡密名称卡密名称卡密名称卡密名称卡密名称卡密名称卡密名称卡密名称卡密名称卡密",
        id: 2,
        price: 2,
        orderCode: "3",
        // isSelect: false
    }]
    selectIds: Array<number> = []
    totalPage: number = 0
    receiveInfo: ReceiveInfo | any = {}
    showGive: boolean = false
    code: string = ""
    onLoad(query: any) {
        // this.reqNewData()
        this.code = query.code
        //@ts-ignore
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('receiveInfo', (data: ReceiveInfo) => {
            if (data) this.receiveInfo = data
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
    onClickSelect(item: Kami) {
        const index: number = this.selectIds.findIndex((id: number) => {
            return id == item.id
        })
        if (index >= 0) {
            this.selectIds.splice(index, 1)
        } else {
            this.selectIds.push(item.id)
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
    give() {
        uni.showLoading({
            title: ""
        })
        const ts: number = Math.round(+new Date() / 1000)
        const data: KamiGiveData = {
            goodCode: this.receiveInfo.goodCode,
            noId: this.selectIds,
            ts,
            sign: Md5.hashStr(`applyTransfer_${ts}_${this.receiveInfo.goodCode}_${this.selectIds.join(",")}_${this.code}`)
        }
        app.http.Post(`cardCircle/send/cardNo/${this.code}`, data, (res: any) => {
            uni.hideLoading()
            uni.showToast({
                title: "赠送成功"
            })
            app.platform.UINotificationFeedBack("success")
            this.showGive = false
        }, (err: any) => {
            uni.hideLoading()
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi`, this.queryParams, (res: any) => {
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
    background-color: #f2f2f2;
}

.fixedWrap {
    background-color: #fff;
    position: fixed;
    z-index: 999;
    bottom: 0;

    .contentWrap {
        width: 750rpx;
        height: 260rpx;
        box-sizing: border-box;
        padding: 0 20rpx;
    }

    .userInfoWrap {
        display: flex;
        align-items: center;
        // padding: 0rpx 20rpx;
        padding-top: 40rpx;

        // margin-top: 40rpx;
        .avatar {
            width: 50rpx;
            height: 50rpx;
            border-radius: 50%;
        }

        .userName {
            color: #000;
        }

        .userId {
            color: #b7b7b7;
        }

        .flex1 {
            flex: 1;
        }

        .bigNum {
            font-weight: bold;
        }
    }

    .submit {
        width: 100%;
        background-color: #fb374e;
        color: #fff;
        font-weight: bold;
        margin-top: 20rpx;
        height: 80rpx;
    }

    .tips {
        text-align: center;
        color: #b7b7b7;
        font-size: 24rpx;
        margin-top: 10rpx;
    }
}

.kamiWrap {
    width: 750rpx;
    box-sizing: border-box;
    padding: 0 30rpx;
    margin-top: 20rpx;
}

.kamiPrice {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .price,
    .original {
        color: #aaaaaa;
    }
}

.kamiNameWrap {
    background-color: #fff;
    padding: 20rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
        width: 580rpx;
    }

    .select {
        width: 40rpx;
        height: 40rpx;
        background-image: url("@/static/live/redCheck.png");
        background-size: 100% 100%;
    }

    .select_none {
        width: 40rpx;
        height: 40rpx;
        outline: 1rpx solid #f2f2f2;
        border-radius: 50%;
    }
}

.giveModal {
    width: 500rpx;
    height: 400rpx;
    background-color: #fff;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 350rpx;
    // z-index: 10076;
    box-sizing: border-box;
    // transform: scale(0);
    // transition: transform 0.2s;
    // pointer-events: none;

    .title {
        color: #000;
        text-align: center;
        font-weight: bold;
    }

    .tips {
        text-align: center;
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
        margin-top: 60rpx;

        .submit {
            width: 200rpx;
            height: 60rpx;
            color: #fff;
            background-color: #fb374e;
            border: 1rpx solid #fb374e;
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
