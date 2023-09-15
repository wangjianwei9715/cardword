<template>
    <view class="content">
        <navigationbar title="规则说明" rightFont="12" />
        <view class="descriptionContainer" v-html="ruleHtmlMap[1] || ''">
        </view>
    </view>
</template>

<script lang="ts">
import { app } from "@/app";
import { Component } from "vue-property-decorator";
import BaseNode from '@/base/BaseNode.vue';
import { parsePic, dateFormatMSHMS } from '@/tools/util'
@Component({})
export default class ClassName extends BaseNode {
    pointConfig: any = {}
    awardList: any = []
    app = app
    luckList: any = [
    ]
    activityTp: number = 0
    ruleHtmlMap: any = {
        1: `<view class="des_title">
            活动时间:
            </view>
            <br/>
            <view class="des_content">2023.09.15~2023.10.7</view>
            <br/>
            <br/>
            <view class="des_title">
            活动说明:
            </view>
            <br/>
            <view class="sTitle">话题点赞榜单</view>
            <br/>
            <view class="des_content">
                1、	活动期间，设置 #得物评级 话题活动，玩家参与 #得物评级 话题并发布球星卡相关动态即可参与，在活动结束后将根据点赞数排名获得卡世界全平台无门槛优惠券与得物评级券等排行榜奖励。
                <br />
                2、	若发布多个本发话题动态，则取点赞最高的作品参与；若两名或多名玩家点赞数相同，则按发布时间排名
                <br />
                3、	活动截止后，优惠券奖品自动发放。得物免费卡牌评级/保护通用券请联系客服并提供得物注册手机号，将于5个工作日内发放至得物账户
                <br />
                4、	通过不正当手段刷赞将作废本活动排名
            </view>
            <br/>
            <br />
            <view class="sTitle">晒评级 送礼品</view>
            <br/>
            <view class="des_content">
                1、	活动期间，用户在卡圈参与 #得物评级 话题活动，发布评级相关内容并附上相关证明即可联系客服领取得物评级券+5元无门槛优惠券一张。
                <br />
                2、	参与要求：发布的内容需本人原创并关联“#得物评级”话题。内容需与得物评级相关，如：发布评级后寄回的卡片照；分享评级的过程等等。
                <br />
                3、	领奖说明：发布后请联系卡世界客服并附上原创相关证明，核实后将为您发放奖励。5元无门槛券立即发放，得物免费评级券请向卡世界客服提供得物注册手机号并于5个工作日内发放至您的得物账号
                <br />
            </view>
            <br/>
            <br />
            <view class="sTitle">使用说明</view>
            <view class="des_content">
            1、每张得物免费评级/保护券可免费评级或保护一张卡片，效期自领取后14天内有效，过期作废。
            <br />
            2、得物免费评级/保护券需联系卡世界客服领取。
            <br />
            3、获得得物免费评级/保护券的用户可登录得物app，通过 探索-鉴别服务-评级卡服务 按照操作流程进行评级。
            </view>
            `
    }

}
</script>

<style lang="scss">
page {
    background: $content-bg;
    width: 750rpx;
    overflow-x: hidden;
}

.canLucky {
    width: 207rpx;
    height: 207rpx;
}

.content ::v-deep .descriptionContainer {
    width: 710rpx;
    box-sizing: border-box;
    padding: 38rpx 30rpx 34rpx 30rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    margin-top: 20rpx;

    .des_title {
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-bottom: 10rpx;
    }

    .des_content {
        font-size: 23rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 36rpx;
        letter-spacing: 2rpx;

        view {
            font-size: inherit;
        }


    }

    .sTitle {
        color: #333333;
        font-weight: bold;
        font-family: PingFang SC;
        font-size: 23rpx;
        letter-spacing: 2rpx;
        margin-top: 20rpx;
    }

    .des_gray {
        font-size: 19rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #949494;
        margin-top: 25rpx;
    }

    .red {
        color: #FA1545;
    }
}

.desLine {
    width: 650rpx;
    height: 1rpx;
    background: #C0C0C0;
    margin-top: 105rpx;
    margin-bottom: 33rpx;
}

.spRewardsContainer {
    width: 710rpx;
    background: #FFFFFF;
    border-radius: 3rpx;
    box-sizing: border-box;
    padding: 34rpx 30rpx 35rpx 30rpx;
    margin-top: 20rpx;
    margin-bottom: 40rpx;

    .title {
        font-size: 29rpx;
        font-family: PingFang SC;
        font-weight: bold;
        margin-bottom: 20rpx;
        color: #333333;
    }

    .tips {
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
    }

    .rewardsContainer {
        display: flex;
        // justify-content: space-between;
        flex-wrap: wrap;

        .rewardItem {
            margin-bottom: 22rpx;
            width: 207rpx;

            .rewardImage {
                width: inherit;
                height: 207rpx;
                // background: #DFDFDF;
                border-radius: 3rpx;
                margin-bottom: 15rpx;
            }

            .rewardRank {
                text-align: center;
                font-size: 23rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
            }

            .rewardName {
                font-weight: 400;
                text-align: center;
                margin-top: 10rpx;
                font-size: 24rpx;
                font-family: PingFang SC;
                color: #333333;
            }
        }
    }
}

.topTagContainer {
    display: flex;
    justify-content: space-between;
    padding: 0 40rpx;

    .tagItem {
        width: 68rpx;
        height: 68rpx;
        position: relative;

        image {
            width: inherit;
            height: inherit;
            position: absolute;
            left: 0;
            top: 0;
        }
    }

    .tagTitle {
        white-space: nowrap;
        text-align: center;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        top: 74rpx;
    }

    .tagDes {
        white-space: nowrap;
        text-align: center;
        font-size: 25rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        top: 108rpx;
    }

    .positionCenter {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
    }
}
</style>
