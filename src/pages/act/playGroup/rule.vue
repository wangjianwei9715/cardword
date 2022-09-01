<template>
    <view class='playContent'>
        <view class="rule" v-for="(item,index) in ruleList" :key='index'>
            <view class="title">{{item.title}}</view>
            <view class="desc" v-for="(desc,sIndex) in item.desc" :key='sIndex' v-html="desc"></view>
        </view>
    </view>
</template>

<script lang="ts" scoped>

    import { app } from "@/app";
    import { Component, Watch } from "vue-property-decorator";
    import BaseNode from "../../../base/BaseNode.vue";
    import { parsePic } from "@/tools/util";
    @Component({})
    export default class ClassName extends BaseNode {
        parsePic: any = parsePic
        tab: any = {
            index: 0,
            list: [{ label: '兑奖明细' }, { label: '抽奖明细' }]
        }
        ruleList: any = [
            { title: '活动时间', desc: [`2022.8.31 15:00-2022.9.15 23:59`] },
            { title: '活动说明', desc: [`1.活动期间，玩家完成每日任务即可抽取球员，每日任务0点重置`, `2.凑齐指定球员组合可在活动页面兑换上组优惠券（全平台无门槛，有效期60天），每种组合均可重复兑换，次数不限。兑换成功后自动发放至我的-优惠券`,`3.通过不正当方式获取的奖励奖励将被扣除，包括但不限于刷单、刷小号等`] },
            {
                title: '每日任务', desc: [`任务1：将活动页面分享至微信群或好友（每日可完成1次）
`, `任务2：点击”去分享“，将助力任务分享给好友，好友通过链接打开app，登录并确认助力即可。每为用户每日可帮他人助力3次（每日可完成3次）
`, `任务3：赠送好友一次卡密即可完成（每日可完成1次）`, `任务4：当天消费累计每98元增加1次抽奖机会。 <strong style="color:#ff0730">购买拼团时限＜48小时的商品，将被计算为冻结消费金额，冻结金额暂不统计任务进度，待商品拼成后解冻并计入任务，若商品未拼成将扣除冻结金额</strong>（每日可完成50次）
`]
            }
        ]
        onClickTab(item: any, index: number) {
            if (index == this.tab.index) return
            this.tab.index = index
        }
        pageJump(url: string) {
            uni.navigateTo({
                url
            })
        }
        previewImage(list: any, index: number) {
            const urls = list.map((item: any) => this.parsePic(item.src));
            uni.previewImage({
                urls,
                current: index
            });
        }
        reqNewData(cb?: Function) {

        }
    }
</script>

<style lang="scss" scoped>
    page {
        height: 100%;
        background-color: #fff;
    }

    @font-face {
        font-family: HYLiLiangHeiJ;
        src: url("https://ka-world.oss-cn-shanghai.aliyuncs.com/admin/debug/2022.08.12/seller/info/16602943088150ns2974oh.ttf");
    }

    @font-face {
        font-family: YouSheBiaoTiHei;
        src: url("/static/act/playGroup/YouSheBiaoTiHei-2.ttf");
    }

    .rule {
        padding: 0 32rpx;
        margin-top: 21rpx;
    }

    .title {
        font-size: 27rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-bottom: 4rpx;
    }

    .desc {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #7D8288;
        line-height: 40rpx;
        margin-bottom: 6rpx;
    }
</style>