<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-11-07 17:31:24
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-11-11 17:27:52
 * @FilePath: \card-world\src\pages\act\worldCup\beanMall.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="mallContainer">
            <view class="selectRow"></view>
            <view class="mallItem" v-for="(item, index) in list" :key="index"
                :style="{ marginRight: (index + 1) % 3 == 0 ? `0rpx` : `14rpx` }">
                <view class="mall_imgBlock">
                    <muqian-lazyLoad class="mall_img" borderRadius="3rpx"
                        :src="$parsePic(decodeURIComponent(item.pic))" />
                    <view class="leftCorner flexCenter">限兑:{{ item.user_max_transaction || '获取中' }}</view>
                    <view class="mall_remaining flexCenter">{{ item.leftNum }}份</view>
                </view>
                <view class="mall_name u-line-2">{{ item.name || '获取中' }}</view>
                <view class="mall_exchange flexCenter">
                    <text>{{ item.price || '获取中' }}</text>
                    <image src="/static/act/worldCup/smallBean.png" />
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
@Component({})
export default class ClassName extends BaseNode {
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 20,
    }
    list: any = []
    isFetchEnd: boolean = true
    mounted(query: any) {
        this.reqNewData()
    }
    onReachBottomCom() {
        if (this.isFetchEnd) return
        this.queryParams.fetchFrom += this.queryParams.fetchSize
        this.reqNewData()
    }
    onPulldDownRefreshCom() {
        this.queryParams.fetchFrom = 1
        this.reqNewData(() => {
            uni.stopPullDownRefresh()
        })
    }
    exchangeGoods(id?: any) {
        app.http.Post(`worldCup/bean/shop/exchange/${id}`, {}, (res: any) => {
            app.platform.UINotificationFeedBack('success')
            uni.showToast({
                title: '兑换成功',
                icon: 'success'
            })
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/worldCup/bean/shop/good/list`, this.queryParams, (res: any) => {
            const list = res.list || []
            this.isFetchEnd = res.totalPage
            this.queryParams.fetchFrom == 1 ? this.list = list : this.list.push(...list)
            cb && cb()
        })
    }

}
</script>

<style lang="scss">
page {
    font-family: PingFang SC;
}

.mallContainer {
    width: 711rpx;
    margin-top: 18rpx;
    min-height: 1371rpx;
    background: rgba(2, 16, 37, .58);
    border: 1rpx solid;
    border-image: linear-gradient(0deg, rgba(52, 57, 255, .58), rgba(92, 235, 116, .58)) 10 10;
    border-radius: 3rpx;
    box-sizing: border-box;
    padding: 16rpx;
    display: flex;
    flex-wrap: wrap;
}

.selectRow {
    width: inherit;
    height: 52rpx;
    margin-bottom: 20rpx;
}

.mallItem {
    width: 216rpx;
    margin-bottom: 23rpx;
}

.mall_imgBlock {
    width: inherit;
    height: 216rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    position: relative;
    overflow: hidden;

    .leftCorner {
        width: 85rpx;
        height: 28rpx;
        background: linear-gradient(90deg, #238E1A, #37C32C, #37C32C, #238E1A);
        position: absolute;
        left: 0;
        top: 8rpx;
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #fff;
        border-radius: 3rpx;
    }

    .mall_img {
        width: inherit;
        height: inherit;
        position: absolute;
    }

    .mall_remaining {
        width: inherit;
        height: 42rpx;
        background: rgba(19, 47, 34, .66);
        border-radius: 3rpx;
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 26rpx;
        color: #FFFFFF;
    }
}

.mall_name {
    width: inherit;
    font-size: 24rpx;
    font-weight: normal;
    color: #FFFFFF;
    line-height: 30rpx;
    margin-top: 16rpx;
    height: 62rpx;
}

.mall_exchange {
    margin-top: 20rpx;
    width: inherit;
    height: 56rpx;
    background: linear-gradient(0deg, #FFD117, #FFEC19);
    border-radius: 28rpx;
    display: flex;

    text {
        font-size: 26rpx;
        font-weight: normal;
        color: #212121;
        display: block;
    }

    image {
        width: 36rpx;
        height: 38rpx;
        display: block;
        position: relative;
        left: 6rpx;
    }
}
</style>
