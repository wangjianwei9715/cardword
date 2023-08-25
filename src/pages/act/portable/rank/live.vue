<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-03-28 11:08:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-24 14:48:34
 * @FilePath: \jichao_app_2\src\pages\act\portable\rank\live.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <transitionNav ref='transitionNav' :needIconShadow="false" title="幸运抽奖" />
        <view class="topBanner" @click="goLive">
            <view class="mask">
                <view class="play"></view>
                <view class="text">进入直播间</view>
            </view>
        </view>
        <view class="pointBlock flexCenter">幸运抽奖</view>
        <view class="draw_tr" v-for="(item, index) in awardList" :key="index">
            <view class="draw_infoContainer border">
                <muqian-lazyLoad class="draw_img" borderRadius="3rpx" @click="previewImage(item)"
                    :src="$parsePic(item.pic)" />
                <view class="draw_infoRight">
                    <view class="draw_name">{{ item.name }}</view>
                    <view class="draw_condition">
                        <view style="margin-right:30rpx">抽奖数量：{{ item.num || 0 }}</view>
                        <view>参与条件：{{ (item.start_rank == item.end_rank) ? `第${item.start_rank}名` :
                            `第${item.start_rank}-${item.end_rank}名`
                        }}</view>
                    </view>
                </view>
            </view>
            <view class="draw_onPrize">
                <view class="prize_item gray">中奖用户 :</view>
                <template v-if="item.luckyUsers && item.luckyUsers.length">
                    <view class="prize_item" v-for="(prizeItem, prizeIndex) in item.luckyUsers" :key="prizeIndex">
                        <muqian-lazyLoad borderRadius="50%" class="avatar"
                            :src="prizeItem.avatar ? $parsePic(prizeItem.avatar) : defaultAvatar" />
                        <view class="name">{{ prizeItem.userName }}</view>
                    </view>
                </template>
                <template v-else>
                    <view class="prize_item">
                        <view class="name">暂未开奖</view>
                    </view>

                </template>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { orderGoodsStateStr, getGoodsPintuan } from '@/tools/switchUtil'
import { dateFormatMSHMS } from '@/tools/util'
@Component({})
export default class ClassName extends BaseNode {
    queryParams: any = {
        fetchFrom: 1,
        fetchSize: 20,
        activityTp: 3
    }
    orderGoodsStateStr = orderGoodsStateStr
    getGoodsPintuan = getGoodsPintuan
    dateFormatMSHMS = dateFormatMSHMS
    awardList: any = []
    list: any = []
    defaultAvatar: any = app.defaultAvatar
    isFetchEnd: boolean = true
    myRank: any = {}
    roomId: number = 0
    onLoad(query: any) {
        if (query.roomId) this.roomId = +query.roomId
        this.reqNewData()
    }
    onPageScroll(data: any) {
        //@ts-ignore
        this.$refs.transitionNav && this.$refs.transitionNav.setPageScroll(data)
    }
    goLive() {
        if (!this.roomId) {
            app.http.Get('dataApi/home', {}, (res: any) => {
                let addList: any = res.addList || []
                if (addList.length) {
                    const fineItem: any = addList.find((item: any) => {
                        return decodeURIComponent(item.target.page).indexOf('act/portable/container') != -1
                    })
                    if (fineItem) {
                        const page: string = fineItem.target.page;
                        let urlStr = page.split('?')[1]
                        let obj: any = {};
                        let paramsArr = urlStr.split('&')
                        for (let i = 0, len = paramsArr.length; i < len; i++) {
                            // 再通过 = 将每一个参数分割为 key:value 的形式
                            let arr = paramsArr[i].split('=')
                            obj[arr[0]] = arr[1];
                        }
                        this.roomId = obj.roomId
                    }
                }
                if (!this.roomId) {
                    uni.showToast({
                        title: "暂未开启直播",
                        icon: 'none'
                    })
                    return
                }
                app.platform.goZgLive({
                    roomID: +this.roomId,
                    isAnchor: false
                })
            })

            return
        } else {
            app.platform.goZgLive({
                roomID: +this.roomId,
                isAnchor: false
            })
        }


    }
    reqNewData() {
        app.http.Get("dataApi/selectRank/lucky/award/list", { activityTp: 5 }, (res: any) => {
            this.awardList = res.list
        })
    }
}
</script>

<style lang="scss">
page {
    background-color: #1a3439;
    font-family: PingFang SC;
}

.pointBlock {
    width: 750rpx;
    height: 75rpx;
    background-size: 100% 100%;
    background-image: url("@/static/act/portable/liveBack.png");
    font-size: 38rpx;
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    color: #FFFFFF;
    letter-spacing: 2rpx;
    margin-bottom: 26rpx;
}

.topBanner {
    width: 750rpx;
    height: 450rpx;
    position: relative;
    background-size: 100% 100%;
    background-image: url("@/static/act/portable/top.png");

    .mask {
        width: inherit;
        height: inherit;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .38);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .play {
            width: 133rpx;
            height: 133rpx;
            background-size: 100% 100%;
            background-image: url("@/static/act/portable/play.png");
            margin-bottom: 30rpx;
            margin-top: 130rpx;
        }

        .text {
            font-size: 25rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
        }
    }
}

.draw_tr {
    width: 650rpx;
    // height: 223rpx;
    background: #FFFFFF;
    box-shadow: 0rpx 4rpx 13rpx 0rpx #44436A;
    border-radius: 3rpx;
    position: relative;
    box-sizing: border-box;
    padding: 20rpx 20rpx 0rpx 23rpx;
    margin-bottom: 15rpx;

    .draw_infoContainer {
        display: flex;

        margin-bottom: 16rpx;

        .draw_img {
            width: 113rpx;
            height: 113rpx;
            margin-right: 36rpx;
        }
    }

    .border {
        border-bottom: 1rpx solid #E6E6E6;
        padding-bottom: 20rpx;
    }

    .draw_infoRight {
        flex: 1;
        display: flex;
        flex-direction: column;
        // justify-content: space-between;
    }

    .draw_name {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20rpx;
    }

    .draw_condition {

        font-family: PingFang SC;
        font-weight: 400;
        color: #949494;
        display: flex;
        align-items: center;

        view {
            font-size: 21rpx;
        }

        // justify-content: space-between;
    }

    .draw_onPrize {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10rpx;

        .prize_item {
            width: 25%;
            color: #333333;
            display: flex;
            align-items: center;
            margin-bottom: 6rpx;
            font-size: 21rpx;
            font-family: PingFang SC;
            font-weight: 400;
            margin-bottom: 18rpx;

            .avatar {
                width: 34rpx;
                height: 34rpx;
                margin-right: 20rpx;
            }

            .name {
                font-size: 21rpx;
            }
        }

        .gray {
            color: #949494;
        }
    }
}
</style>
