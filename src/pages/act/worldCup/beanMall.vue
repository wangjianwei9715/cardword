<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2022-11-07 17:31:24
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2022-11-14 18:12:35
 * @FilePath: \card-world\src\pages\act\worldCup\beanMall.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="mallContainer">
            <view class="selectRow">
                <picker :range="odSearchArr" range-key="label"
                    :value="filterPickerData(odSearchArr, queryParams.od, 'index')"
                    @change="pickerChange($event, odSearchArr, 'od')">
                    <view class="select">
                        <view class="select_text">{{ filterPickerData(odSearchArr, queryParams.od) }}</view>
                        <u-icon name="arrow-down-fill" color="#000" size="18rpx"></u-icon>
                    </view>
                </picker>
                <picker :range="beanSearchArr" range-key="label"
                    :value="filterPickerData(beanSearchArr, queryParams.beanLimit, 'index')"
                    @change="pickerChange($event, beanSearchArr, 'beanLimit')">
                    <view class="select">
                        <view class="select_text">{{ filterPickerData(beanSearchArr, queryParams.beanLimit) }}</view>
                        <u-icon name="arrow-down-fill" color="#000" size="18rpx"></u-icon>
                    </view>
                </picker>
            </view>
            <view class="mallItem" v-for="(item, index) in list" :key="index"
                :style="{ marginRight: (index + 1) % 3 == 0 ? `0rpx` : `14rpx` }">
                <view class="mall_imgBlock">
                    <muqian-lazyLoad class="mall_img" borderRadius="3rpx" @click="prviewImages(item.pic)"
                        :src="$parsePic(decodeURIComponent(item.pic))" />
                    <view class="leftCorner flexCenter">限兑:{{ item.user_max_transaction || '获取中' }}</view>
                    <view class="mall_remaining flexCenter">{{ item.leftNum }}份</view>
                </view>
                <view class="mall_name u-line-2">{{ item.name || '获取中' }}</view>
                <view class="mall_exchange flexCenter" @click="onClickExchange(item)">
                    <text>{{ item.price || '获取中' }}</text>
                    <image src="/static/act/worldCup/smallBean.png" />
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component, Prop } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { parsePic } from "@/tools/util"
@Component({})
export default class ClassName extends BaseNode {
    @Prop({ default: 0 })
    bean!: number;
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 20,
        od: "",
        beanLimit: ":"
    }
    list: any = []
    isFetchEnd: boolean = true
    parsePic = parsePic
    selectGoods: any = {

    }
    odSearchArr: any = [
        {
            label: '默认排序',
            value: ""
        },
        {
            label: '世界豆从高到低',
            value: 'bean:desc'
        },
        {
            label: '世界豆从低到高',
            value: 'bean:asc'
        },
        {
            label: '兑换数从高到低',
            value: 'exchange:desc'
        },
        {
            label: '兑换数从低到高',
            value: 'exchange:asc'
        }
    ]
    beanSearchArr: any = [
        {
            label: '全部世界豆',
            value: ":"
        },
        {
            label: '1-100',
            value: '1:100'
        },
        {
            label: '101-1000',
            value: '101:1000'
        },
        {
            label: '1001-3000',
            value: '1001:3000'
        },
        {
            label: '3000以上',
            value: '3000:'
        }
    ]
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
    pickerChange(event: any, range: any, assignKey: string) {
        const index: number = event.detail.value
        if(this.queryParams[assignKey]==range[index].value) return
        this.queryParams[assignKey] = range[index].value
        this.queryParams.fetchFrom = 1
        this.reqNewData()
    }
    filterPickerData(range: any, value: any, returnType?: string) {
        // const data: any = range.find((item: any) => item.value === value)
        const index: number = range.findIndex((item: any) => item.value === value)
        return returnType == "index" ? index : (range[index].label || "默认排序")
    }
    prviewImages(picString: string) {
        if (!picString) return
        const picArr: any = picString.split(',').map(item => parsePic(decodeURIComponent(item)))
        uni.previewImage({
            current: 0,
            urls: picArr
        })
    }
    onClickExchange(item: any) {
        this.selectGoods = item
        this.beforeExchange()
    }
    beforeExchange() {
        if (this.selectGoods.leftNum <= 0) {
            uni.showModal({
                title: '提示',
                content: `剩余份数不足`,
                showCancel: false,
            })
            return
        }
        if (!this.bean || (this.bean < this.selectGoods.price)) {
            uni.showModal({
                title: '提示',
                content: `世界豆不足，无法兑换，可提高排名或完成每日任务获取`,
                showCancel: false,
            })
            return
        }
        uni.showModal({
            title: '提示',
            content: '确认兑换后将扣除相应的世界豆',
            success: (result: any) => {
                if (result.confirm) this.exchangeGoods(this.selectGoods.id)
            }
        })
    }
    exchangeGoods(id?: any) {
        app.http.Post(`worldCup/bean/shop/exchange/${id}`, {}, (res: any) => {
            app.platform.UINotificationFeedBack('success')
            this.selectGoods.leftNum -= 1
            this.$emit('getNewBean')
            uni.showToast({
                title: '兑换成功',
                icon: 'success'
            })
        }, (err: any) => {
            this.queryParams.fetchFrom = 1
            this.reqNewData()
        })
    }
    reqNewData(cb?: any) {
        app.http.Get(`dataApi/worldCup/bean/shop/good/list`, this.queryParams, (res: any) => {
            const list = res.list || []
            this.isFetchEnd = res.isFetchEnd
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
    align-content: flex-start;
    flex-wrap: wrap;
}

.selectRow {
    width: inherit;
    height: 52rpx;
    display: flex;
    margin-bottom: 20rpx;

    .select {
        width: 216rpx;
        height: 52rpx;
        background: #E9EDEC;
        border-radius: 5rpx;
        margin-right: 15rpx;
        box-sizing: border-box;
        padding: 0 10rpx;
        align-items: center;
        display: flex;
        justify-content: space-between;
    }

    .select_text {
        font-size: 24rpx;
        color: #262626;
    }
}

.mallItem {
    width: 216rpx;
    margin-bottom: 23rpx;
}

.mall_imgBlock {
    width: inherit;
    height: 216rpx;
    background: #FFFFFF;
    border-radius: 5rpx;
    position: relative;
    overflow: hidden;
    margin-bottom: 23rpx;

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
