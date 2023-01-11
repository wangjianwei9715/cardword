<!--
 * @Author: lsj a1353474135@163.com
 * @Date: 2023-01-10 16:18:45
 * @LastEditors: lsj a1353474135@163.com
 * @LastEditTime: 2023-01-11 16:04:14
 * @FilePath: \card-world\src\pages\act\imm\rule.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="content">
        <view class="tagContainer">
            <view class="tag flexCenter" v-for="(item, index) in tag.list" @click="onClickTag(index)"
                :class="{ tag_select: index == tag.index }">
                {{
                    item
                }}</view>
        </view>
        <view class="ruleContainer">
            <view class="rule" v-for="(item, index) in (tag.index == 0 ? rule : drawRule)" :key="index">
                <view class="title">{{ item.title }}</view> 
                <view class="desc" v-if="item.desc" v-html="item.desc"></view>
            </view>

        </view>
        <u-table :border="true" style="width: 690rpx;position: relative;bottom: 46rpx;" stripe>
            <u-tr>
                <u-th align="center" style="color:#333">排名</u-th>
                <u-th align="center" style="color:#333" v-if="tag.index == 1">抽取数量</u-th>
                <u-th align="center" style="color:#333">奖品</u-th>
            </u-tr>
            <u-tr v-for="(item, index) in (tag.index == 0 ? awardList : luckList)">
                <u-td align="center" style="font-size: 25rpx;">{{ (item.start_rank == item.end_rank) ? `第${item.start_rank}名` :
                    `第${item.start_rank}-${item.end_rank}名`
                }}</u-td>
                <u-td align="center" style="font-size: 25rpx;" v-if="tag.index == 1">{{ item.num }}</u-td>

                <u-td align="center" style="font-size: 25rpx;">{{ item.name }}</u-td>
            </u-tr>
        </u-table>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import uTable from "@/uni_modules/uni-table/components/uni-table/uni-table.vue"
import uTr from "@/uni_modules/uni-table/components/uni-tr/uni-tr.vue"
import uTd from "@/uni_modules/uni-table/components/uni-td/uni-td.vue"
import uTh from "@/uni_modules/uni-table/components/uni-th/uni-th.vue"
@Component({
    components: {
        uTable,
        uTr,
        uTd,
        uTh
    }
})
export default class ClassName extends BaseNode {
    awardList: any = []
    luckList: any = []
    tag: any = {
        index: 0,
        list: ['积分榜单规则', '幸运抽奖规则']
    }
    rule: any = [
        {
            title: "1.规则说明",
            desc: `2023.01.18~2023.02.03，参与任意拼团可获得积分<span style="color:#FA1545">(拼团成功前为冻结积分，拼成后转为正常积分，未拼成则扣除）</span>，活动结束后10天为积分解冻期，无法再获得新的积分。2023.02.13正式定榜，根据榜单排名发放奖励。`
        },
        {
            title: "2.参与21-22IMM系列获取积分翻倍！",
            desc: ``
        },
        {
            title: "3.奖品发放",
            desc: `优惠券类奖品在定榜后1小时内自动发放至我的-优惠券；实物类奖品请联系客服发放`
        },
        {
            title: "4.奖品清单",
            desc: ``
        }
    ]
    drawRule: any = [
        {
            title: "1.规则说明",
            desc: `2023.02.13定榜后，前1000名用户可参与幸运抽奖，排名越高可抽取奖励越多，抽奖时间为2023.02.14 15:00`
        },
        {
            title: "2.抽奖形式",
            desc: `幸运抽奖将在平台内直播公示，将在random.org网站随机排名作为抽奖结果`
        },
        {
            title: "3.抽奖明细",
            desc: ``
        },
    ]
    onLoad(query: any) {
        this.reqRewardList()
        this.reqRewardListTwo()
    }
    onClickTag(index: number) {
        if (index == this.tag.index) return
        this.tag.index = index
    }
    reqRewardList() {
        app.http.Get('dataApi/selectRank/award/list', { isLucky: 0, activityTp: 4 }, (res: any) => {
            this.awardList = res.list || []

        })
    }
    reqRewardListTwo() {
        app.http.Get('dataApi/selectRank/lucky/award/list', { activityTp: 4 }, (res: any) => {
            this.luckList = res.list || []
        })
    }

}
</script>

<style lang="scss">
page {
    background-color: #f6f7fb;
}

.tagContainer {
    background-color: #fff;
    width: 750rpx;
    height: 100rpx;
    display: flex;
    align-items: center;

    .tag {
        width: 50%;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #959695;
    }

    .tag_select {
        font-weight: 600;
        color: #333333;
    }
}

.ruleContainer {
    padding: 40rpx 36rpx;
}

.rule {
    margin-bottom: 20rpx;
}

.title {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 600;
    color: #333333;
}

.desc {
    font-size: 25rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 40rpx;
    margin-top: 4rpx;
    letter-spacing: 2rpx;
}
</style>
