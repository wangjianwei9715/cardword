<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-06-19 10:37:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-24 14:42:32
 * @FilePath: \jichao_app_2\src\pages\cardForum\kami\list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="goodsCard" v-for="(item, index) in list" :key="index">
            <view class="merchantWrap">
                <muqian-lazyLoad :src="$parsePic(item.merchantLogo)" class="merchantAvatar"
                    borderRadius="50%"></muqian-lazyLoad>
                <view class="merchantName">{{ item.merchantName }}</view>
            </view>
            <view class="goodsWrap uni-flex">
                <muqian-lazyLoad class="goodsPic" borderRadius="3rpx"
                    :src="$parsePic(item.cover)"></muqian-lazyLoad>
                <view class="goodsInfo">
                    <view class="goodsName u-line-2">{{ item.title }}</view>
                    <view class="price">￥{{ item.price }}</view>
                    <!-- <text class="font">起</text> -->
                </view>
            </view>
            <view class="bottomWrap uni-flex">
                <view class="kamiNum">卡密数量：{{ item.cardNum }}</view>
                <view class="giveButton flexCenter" @click="onClickGive(item)">去赠送</view>
            </view>
        </view>
        <empty v-if="!list || !list.length" />
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import CardForum from "../interface/public";
interface KamiGoods {
    /**商品名称 */
    goodsName: string
    /**商品编号 */
    goodCode: string
    /**商家头像 */
    merchantLogo: string
    /**商家名称 */
    merchantName: string
    /**拼团类型 */
    pintuan_type: number
    /**商品单价 */
    price: number
    /**商品图片 */
    pic: string
    leadGoodOrderCode:string
}
@Component({})
export default class ClassName extends BaseNode {
    queryParams: any = {
        pageIndex: 1,
        pageSize: 10
    }
    list: Array<any> = []
    totalPage: number = 0
    receiveUserInfo: CardForum.RewardUserInfo | any = {}
    code: string = ""
    onLoad(query: any) {
        this.code = query.code
        //@ts-ignore
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('receiveUserInfo', (data: any) => {
            if (data) this.receiveUserInfo = data
            console.log(this.receiveUserInfo);
        })
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
    onClickGive(item: KamiGoods) {
        console.log(item);
        
        uni.navigateTo({
            url: `/pages/cardForum/kami/give?code=${this.code}&leadGoodOrderCode=${item.leadGoodOrderCode}`,
            success: (res) => {
                res.eventChannel.emit('receiveInfo', {
                    ...this.receiveUserInfo,
                    goodCode: item.goodCode
                })
            }
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/cardCircle/cardNo/transfer/good/list`, this.queryParams, (res: any) => {
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
    background-color: #f6f7fb;
}

.goodsCard {
    width: 710rpx;
    box-sizing: border-box;
    padding: 25rpx 35rpx 32rpx 35rpx;
    background-color: #fff;
    margin-top: 20rpx;
}

.merchantWrap {
    border-bottom: 1rpx solid #f2f2f2;
    padding-bottom: 16rpx;
    display: flex;
    align-items: center;

    .merchantAvatar {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        margin-right: 10rpx;
    }

    .merchantName {
        font-size: 21rpx;
        
        
        color: #959695;
    }
}

.goodsWrap {
    margin-top: 28rpx;

    .goodsPic {
        width: 183rpx;
        height: 141rpx;
        border-radius: 3rpx;
        display: block;
    }

    .goodsInfo {
        flex: 1;
        margin-left: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .goodsName {
        font-size: 25rpx;
        
        
        color: #333333;
    }

    .price {
        font-size: 25rpx;
        
        font-weight: bold;
        color: #333333;
    }

    .font {
        font-size: 21rpx;
        
        
        color: #C0C0C0;
        margin-left: 4rpx;
    }
}

.bottomWrap {
    margin-top: 39rpx;
    justify-content: space-between;

    .giveButton {
        width: 149rpx;
        height: 60rpx;
        background: #FA1545;
        border-radius: 3rpx;
        font-size: 25rpx;
        
        font-weight: bold;
        color: #FFFFFF;
    }

    .kamiNum {
        font-size: 25rpx;
        
        
        color: #333333;
    }
}
</style>
